// Define a global variable to store the script path (extensionRoot)
var scriptPath; 

// Define the function to set the script path from index.html
function setScriptPath(path) {
    scriptPath = path;
}

// Define the function to add surah name with specified number
function addSurahName(surahNumber) {
    var optionText = surahTextMapping[surahNumber];
    var font = "QCF_BSML";
    
    addTextLayerWithFont(optionText, font);
}

// Define the function to add page
function addPage(pageNumber) {
	var optionText = pageTextMapping["P" + pageNumber] || "";
	var font = "QCF_P" + pageNumber;
	
	addTextLayerWithFont(optionText, font);
}

// Define the function to add Verse
function addVerse(verseKey, lineBreak) {
	var verse = verses[verseKey];
	if (verse) {
		var textToAdd = verse.code_v1;
		var fontName = "QCF_P" + ("00" + verse.v1_page).slice(-3); // Generate font name dynamically
		if (lineBreak) {
			addTextLayerWithFont(textToAdd, fontName, true);
			} else {
			addTextLayerWithFont(textToAdd, fontName, false);
		}
		
        } else {
		alert("Verse not found.");
	}
}

// Define the function to add Background (solid & surah-header.png)
function addBackground() { 
	
    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
	}
	
	// Create a solid layer with the specified color
	var solidColor = [250 / 255, 241 / 255, 228 / 255]; // RGB values for #F66606
    var solidLayer = comp.layers.addSolid(solidColor, "My Solid", comp.width, comp.height, comp.pixelAspect);
	// Import PNG into After Effects
    var pngFilePath = scriptPath + "%5Cimages%5Csurah-header.png"; // Specify the file path of the PNG image
    var pngFile = new File(pngFilePath);
    if (!pngFile.exists) {
        alert("PNG file not found.");
        return;
	}
	
    var importedFootage = app.project.importFile(new ImportOptions(pngFile));
    if (!importedFootage) {
        alert("Failed to import PNG.");
        return;
	}
	
	// Add imported footage to composition
    var imageLayer = comp.layers.add(importedFootage);
	// Calculate scale factor
    var scaleFactor = (comp.width - 20) / imageLayer.width;
	// Set scale
    imageLayer.scale.setValue([scaleFactor * 100, scaleFactor * 100]);
	// TODO: adjust the position, etc., of the image layer
}

// Define the function to add TextBox
function addTextBox() {
    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
	}
	
	// Check if the layer is a text layer
    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length === 0 || !(selectedLayers[0] instanceof TextLayer)) {
        alert("Please select a text layer.");
        return;
	}
	
    var textLayer = selectedLayers[0];
    var textDocument = textLayer.property("ADBE Text Properties").property("ADBE Text Document").value;
    textDocument.applyFill = true;
    textDocument.fillColor = [0, 0, 0];
    textLayer.property("ADBE Text Properties").property("ADBE Text Document").setValue(textDocument);
	
	// Add Fill effect
	try {
		var fillEffect = textLayer.Effects.addProperty("ADBE Fill");
		fillEffect.property("Color").setValue([0.980392, 0.945098, 0.894118, 1]);
		} catch (e) {
		// Show alert if an error occurs
		alert("Failed to add Fill effect: " + e.message);
	}
	
	// Add CC RepeTile effect
	try {
		var repeTileEffect = textLayer.Effects.addProperty("CC RepeTile");
		repeTileEffect.property("Expand Right").setValue(50);
		repeTileEffect.property("Expand Left").setValue(50);
		repeTileEffect.property("Expand Down").setValue(10);
		repeTileEffect.property("Expand Up").setValue(10);
		} catch (e) {
		// Show alert if an error occurs
		alert("Failed to add CC RepeTile effect: " + e.message);
	}
	
	// Add Shift Channels effect
	try {
		var shiftChannelsEffect = textLayer.Effects.addProperty("ADBE Shift Channels");
		// Set "Take Alpha From" to "Full On"
		shiftChannelsEffect.property(1).setValue(9); // Property index for "Take Alpha From"
		} catch (e) {
		// Show alert if an error occurs
		alert("Failed to add Shift Channels effect: " + e.message);
	}
	
	// Add CC Composite effect
	try {
		var ccCompositeEffect = textLayer.Effects.addProperty("CC Composite");
		} catch (e) {
		// Show alert if an error occurs
		alert("Failed to add CC Composite effect: " + e.message);
	}
	
	// Deselect the layer
    textLayer.selected = false;	
}					

// Define the function to separate lines
function separateLines() {
	var comp = app.project.activeItem;
	if (!(comp && comp instanceof CompItem)) {
		alert("Please select a composition.");
		return;
	}
	
	var selectedLayers = comp.selectedLayers;
	if (selectedLayers.length === 0 || !(selectedLayers[0] instanceof TextLayer)) {
		alert("Please select a text layer.");
		return;
	}
	
	var textLayer = selectedLayers[0];
	var textValue = textLayer.property("ADBE Text Properties").property("ADBE Text Document").value.text;
	var lines = textValue.split("\r");
	
	for (var i = 0; i < lines.length; i++) {
		var newTextLayer = comp.layers.addText(lines[i]);
		newTextLayer.position.setValue(textLayer.position.value);
		newTextLayer.moveAfter(textLayer);
		newTextLayer.property("ADBE Text Properties").property("ADBE Text Document").setValue(lines[i]);
	}
	
	textLayer.remove();
}

// Function to check if a text layer is selected
function isTextLayerSelected() {
  var comp = app.project.activeItem;
  if (comp && comp instanceof CompItem) {
    var selectedLayers = comp.selectedLayers;
    for (var i = 0; i < selectedLayers.length; i++) {
      if (selectedLayers[i] instanceof TextLayer) {
        return true;
      }
    }
  }
  return false;
}

// Exporting function for use in HTML panel
//this.isTextLayerSelected = isTextLayerSelected;