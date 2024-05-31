var isWindows = ($.os.indexOf("Windows") !== -1);
var separator = isWindows ? "\\" : "/";

// Function to add text layer with specified content, font, and size
function addTextLayer(content, fontName, fontSize) {
	var doc = app.activeDocument;
	// Create a new text frame
    var newTextLayer = doc.artLayers.add();
    newTextLayer.kind = LayerKind.TEXT;
	// Set text content
    newTextLayer.textItem.contents = content;
	newTextLayer.textItem.position = Array(20, 20); 
	// Get the text item
    var textItem = newTextLayer.textItem;
	// Set font
    textItem.font = fontName;
	// Specify the font size
    textItem.size = fontSize;
    // Set text alignment to center
    textItem.justification = Justification.CENTER;
	// Set text to center of doc
	textItem.position = Array(doc.width/2, doc.height/2); 
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
function addVersePHSP(verseKey, fontSize, lineBreak, parentheses, ayaKaws) {
    var verse = verses[verseKey];
    if (!verse) {
        alert("Verse not found.");
        return;
	}
	var firstKaws = ayaKaws.charAt(0);
    var secondKaws = ayaKaws.charAt(1);
	
	var textToAdd = parentheses ? firstKaws + verse.code_v1 + secondKaws : verse.code_v1;
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
    var surahHeaderFileName_01 = "surah-header-0001.png";
    var surahHeaderFilePath_01 = scriptPath + separator + "data" + separator + "images" + separator + surahHeaderFileName_01; 
    var pngFile = new File(surahHeaderFilePath_01);
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