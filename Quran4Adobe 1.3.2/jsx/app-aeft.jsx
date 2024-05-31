var isWindows = ($.os.indexOf("Windows") !== -1);
var separator = isWindows ? "\\" : "/";

// Function to check if a text layer is selected AEFT
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

// Function to find a footage item by name in the project
function findInProject(itemName) {
    var items = app.project.items;
    for (var i = 1; i <= items.length; i++) {
        if (items[i].name === itemName && items[i] instanceof FootageItem) {
            return items[i];
        }
    }
    return null;
}

// Function to add text layer with specific font
function addTextLayerWithFontAEFT(text, fontName, fontSize, addLineBreaks) {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
	}
	
    var textLayer = comp.layers.addText(text);
    var textProperty = textLayer.property("Source Text");
    var textDocument = textProperty.value;
    textDocument.font = fontName;
	textDocument.fontSize = fontSize; // Set font size
	textDocument.justification = ParagraphJustification.CENTER_JUSTIFY; // Center the text
    textProperty.setValue(textDocument);
	// var fontSize = textDocument.fontSize; // Get fontSize of Document
	
    if (addLineBreaks) {
	    // Calculate maximum characters that can fit in one line
        var maxWidth = comp.width;
        var maxChars = Math.floor(maxWidth / (fontSize * 1)); // Adjust factor as needed
        if (text.length > maxChars) {
		    // Insert line breaks
            textLayer.property("Source Text").setValue(text.replace(new RegExp('(.{1,' + maxChars + '})(\\s+|$)', 'g'), '$1\n'));
		}
	}
}

// Define the function to add surah name with specified number
function addSurahNameAEFT(surahNumber, fontSize) {
    var optionText = surahTextMapping[surahNumber];
    var font = "QCF_BSML";
    
    addTextLayerWithFontAEFT(optionText, font, fontSize);
}

// Define the function to add page
function addPageAEFT(pageNumber, fontSize) {
	var optionText = pageTextMapping["P" + pageNumber] || "";
	var font = "QCF_P" + pageNumber;
	
	addTextLayerWithFontAEFT(optionText, font, fontSize);
}

// Define the function to add Verse
function addVerseAEFT(verseKey, fontSize, lineBreak, parentheses, ayaKaws) {
    var verse = verses[verseKey];
    if (!verse) {
        alert("Verse not found.");
        return;
    }
	var firstKaws = ayaKaws.charAt(0);
    var secondKaws = ayaKaws.charAt(1);
	
    var textToAdd = parentheses ? firstKaws + verse.code_v1 + secondKaws : verse.code_v1;
    var fontName = "QCF_P" + ("00" + verse.v1_page).slice(-3);
    addTextLayerWithFontAEFT(textToAdd, fontName, fontSize, lineBreak);
}

// Define the function to add Background (solid & surah-header-1.png)
function addBackgroundAEFT() {
    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }

    // Create a solid layer with the specified color
    var solidColor = [250 / 255, 241 / 255, 228 / 255]; // RGB values for #F66606
    var solidLayer = comp.layers.addSolid(solidColor, "My Solid", comp.width, comp.height, comp.pixelAspect);

    // Check if the PNG is already imported
    var surahHeaderFileName_01 = "surah-header-0001.png";
    var imageItem = findInProject(surahHeaderFileName_01);

    if (!imageItem) {
        // Import PNG into After Effects if not found
        var surahHeaderFilePath_01 = scriptPath + separator + "data" + separator + "images" + separator + surahHeaderFileName_01;
        var pngFile = new File(surahHeaderFilePath_01);
        if (!pngFile.exists) {
            alert("PNG file not found.");
            return;
        }
        imageItem = app.project.importFile(new ImportOptions(pngFile));
        if (!imageItem) {
            alert("Failed to import PNG.");
            return;
        }
    }

    // Add imported footage to composition
    var imageLayer = comp.layers.add(imageItem);
    // Calculate scale factor
    var scaleFactor = (comp.width - 20) / imageLayer.width;
    // Set scale
    imageLayer.scale.setValue([scaleFactor * 100, scaleFactor * 100]);
    // Adjust the Y position of the image layer
    var currentPosition = imageLayer.position.value;
    var newYPosition = imageLayer.height;
    // Update the position
    imageLayer.position.setValue([currentPosition[0], newYPosition]);
}

// Define the function to add TextBox
function addTextBoxAEFT() {
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
	
	var presetFileName = "textBox.ffx";
	var textBoxPresetPath = scriptPath + separator + "data" + separator + "ffx" + separator + presetFileName;
	var presetFile = File(textBoxPresetPath);
	
    // Loop through all selected layers
    for (var i = 0; i < selectedLayers.length; i++) {
        // Check if the current layer is a text layer
        if (selectedLayers[i] instanceof TextLayer) {
            // Apply the preset to the text layer
            selectedLayers[i].applyPreset(presetFile);
		}
	}
}	

// Define the function to add text animator 1
function addTextAnimator1AEFT() {
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

	var presetFileName = "textAnimator-1.ffx";
	var textAnimatorPresetPath_01 = scriptPath + separator + "data" + separator + "ffx" + separator + presetFileName;
	var presetFile = File(textAnimatorPresetPath_01);
	
    // Loop through all selected layers
    for (var i = 0; i < selectedLayers.length; i++) {
        // Check if the current layer is a text layer
        if (selectedLayers[i] instanceof TextLayer) {
            // Apply the preset to the text layer
            selectedLayers[i].applyPreset(presetFile);
		}
	}	
}

// Define the function to add TextMatte
function addTextMatteAEFT() {
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

    // Check if the PNG is already imported
    var mapFileName_01 = "map-0001.png";
    var imageItem = findInProject(mapFileName_01);

    if (!imageItem) {
        // Import PNG into After Effects if not found
        var mapFilePath_01 = scriptPath + separator + "data" + separator + "images" + separator + mapFileName_01;
        var pngFile = new File(mapFilePath_01);
        if (!pngFile.exists) {
            alert("PNG file not found.");
            return;
        }
        imageItem = app.project.importFile(new ImportOptions(pngFile));
        if (!imageItem) {
            alert("Failed to import PNG.");
            return;
        }
    }

	// Assuming the selected layer is the text layer
	var myTextLayer = comp.selectedLayers[0];
	
	// Add the map image to the composition
	var myMapLayer = comp.layers.add(imageItem);
	myMapLayer.moveAfter(myTextLayer);
	
	// Set the track matte of the map layer to the text layer
	// This assumes that the text layer is directly above the map layer
	myMapLayer.trackMatteType = TrackMatteType.ALPHA;
}

// Define the function to add text Opacity
function addTextOpacityAEFT() {
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

	var presetFileName = "opacity-1.ffx";
	var opacityPresetPath_01 = scriptPath + separator + "data" + separator + "ffx" + separator + presetFileName;
	var presetFile = File(opacityPresetPath_01);
	
    // Loop through all selected layers
    for (var i = 0; i < selectedLayers.length; i++) {
        // Check if the current layer is a text layer
        if (selectedLayers[i] instanceof TextLayer) {
            // Apply the preset to the text layer
            selectedLayers[i].applyPreset(presetFile);
		}
	}	
	
}

// Define the function to separate lines
function separateLinesAEFT() {
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