
// Function to add text layer with specified content, font, and size
function addTextLayer(content, fontName, fontSize) {
	// Create a new text frame
    var newTextLayer = app.activeDocument.artLayers.add();
    newTextLayer.kind = LayerKind.TEXT;
	// Set text content
    newTextLayer.textItem.contents = content;
	// Get the text item
    var textItem = newTextLayer.textItem;
	// Set font
    textItem.font = fontName;
	// Specify the font size
    textItem.size = fontSize;
    // Set text alignment to center
    textItem.justification = Justification.CENTER;
	// Refresh the document
	app.activeDocument = app.activeDocument;
}

// Function to add Basmala
function addBasmalaPHSP(fontSize) {
    addTextLayer("321", "QCF_BSML", fontSize);
}

// Function to add Surah Name
function addSurahNamePHSP(surahNumber, fontSize) {
    var optionText = surahTextMapping[surahNumber] || "";
    addTextLayer(optionText, "QCF_BSML", fontSize);
}

// Function to add Page Number
function addPagePHSP(pageNumber, fontSize) {
    var optionText = pageTextMapping["P" + pageNumber] || "";
    var fontName = "QCF_P" + pageNumber;
    addTextLayer(optionText, fontName, fontSize);
}

// Function to add Verse
function addVersePHSP(verseKey, fontSize, lineBreak, parentheses) {
    var verse = verses[verseKey];
    if (!verse) {
        alert("Verse not found.");
        return;
	}
	
	var textToAdd = parentheses ? "ﱫ" + verse.code_v1 + "ﱪ" : verse.code_v1;
	var fontName = "QCF_P" + ("00" + verse.v1_page).slice(-3); // Generate font name dynamically
	if (lineBreak) {
		// Get the width of the active document
		var documentWidth = app.activeDocument.width;
		var maxChars = Math.floor(documentWidth / (fontSize * 1)); // Adjust factor as needed
		if (textToAdd.length > maxChars) {
			textToAdd = textToAdd.replace(new RegExp('(.{1,' + maxChars + '})(\\s+|$)', 'g'), '$1\r')
		}
	}
	addTextLayer(textToAdd, fontName, fontSize);
}

// Define the function to add a solid color layer and place an image (surah-header-1.png)  
function addBackgroundPSD() {
    var doc = app.activeDocument;
    
    // Add a solid color layer
    var colorLayer = doc.artLayers.add();
    colorLayer.name = "Solid Color";
    colorLayer.kind = LayerKind.NORMAL;
    
    // Set the color of the solid layer
    var solidColor = new SolidColor();
    solidColor.rgb.red = 250;
    solidColor.rgb.green = 241;
    solidColor.rgb.blue = 228;
    colorLayer.fillOpacity = 100;
    colorLayer.blendMode = BlendMode.NORMAL;
    doc.selection.selectAll();
    doc.selection.fill(solidColor);
    doc.selection.deselect();
	
    // Open the PNG file as a separate document
    var pngFilePath = scriptPath + "%5Cdata%5Cimages%5Csurah-header-1.png";                
    var pngFile = new File(pngFilePath);
    if (!pngFile.exists) {
        alert("PNG file not found.");
        return;
	}
    var pngDoc = app.open(pngFile);
	
    // Duplicate the image into the target document as a new layer
    var pngLayer = pngDoc.activeLayer.duplicate(doc, ElementPlacement.PLACEATBEGINNING);
    // Close the PNG document without saving
    pngDoc.close(SaveOptions.DONOTSAVECHANGES);
	
    // Calculate the scale factor and set the scale of the PNG layer
    var scaleFactor = (doc.width - 20) / pngLayer.bounds[2];
    pngLayer.resize(scaleFactor * 100, scaleFactor * 100, AnchorPosition.TOPLEFT);//AnchorPosition.MIDDLECENTER
	
	// Move the PNG layer to the top left corner of the document
	pngLayer.translate(10, 20); //(xOffset, yOffset);	
}