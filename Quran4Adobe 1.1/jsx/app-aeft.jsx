﻿
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
function addVerseAEFT(verseKey, fontSize, lineBreak) {
	var verse = verses[verseKey];
	if (verse) {
		var textToAdd = verse.code_v1;
		var fontName = "QCF_P" + ("00" + verse.v1_page).slice(-3); // Generate font name dynamically
		if (lineBreak) {
			addTextLayerWithFontAEFT(textToAdd, fontName, fontSize, true);
			} else {
			addTextLayerWithFontAEFT(textToAdd, fontName, fontSize, false);
		}
		
        } else {
		alert("Verse not found.");
	}
}

// Define the function to add Background (solid & surah-header.png)
function addBackgroundAEFT() { 
	
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
	
	// Path to the preset
	var myPresetPath = scriptPath + "%5Cdata%5Cffx%5CtextBox.ffx";
	
	var presetFile = File(myPresetPath);
	
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