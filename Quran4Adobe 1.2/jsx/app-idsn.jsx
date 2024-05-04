
// Function to add a text frame with specified content, font, and size
function addTextFrame(content, fontName, fontSize) {
    if (app.documents.length === 0) {
        alert("No document is open. Please open a document in Adobe InDesign.");
        return;
	}
    var doc = app.activeDocument;
    
    // Get the current measurement units of the document
    var horizontalUnits = doc.viewPreferences.horizontalMeasurementUnits;
    var verticalUnits = doc.viewPreferences.verticalMeasurementUnits;
    
    // Define a temporary large geometric bounds
    var tempBounds = [
        convertUnits(1, MeasurementUnits.INCHES, verticalUnits),
        convertUnits(1, MeasurementUnits.INCHES, horizontalUnits),
        doc.documentPreferences.pageHeight - convertUnits(1, MeasurementUnits.INCHES, verticalUnits),
        doc.documentPreferences.pageWidth - convertUnits(1, MeasurementUnits.INCHES, horizontalUnits)
	];
    
    var textFrame = doc.pages[0].textFrames.add({ geometricBounds: tempBounds });
    var newText = textFrame.insertionPoints.item(0);
    newText.contents = content;
    newText.appliedFont = app.fonts.item(fontName);
    newText.pointSize = fontSize;
    newText.justification = Justification.CENTER_ALIGN;
	newText.composer = "Adobe World-Ready Paragraph Composer";
    
    // Fit the frame to the content
    textFrame.fit(FitOptions.FRAME_TO_CONTENT);
    
    // Calculate the center position of the page using the document's current measurement units
    var pageWidth = doc.documentPreferences.pageWidth;
    var pageHeight = doc.documentPreferences.pageHeight;
    
    // Calculate the new position for the frame to be centered
    var frameWidth = textFrame.geometricBounds[3] - textFrame.geometricBounds[1];
    var frameHeight = textFrame.geometricBounds[2] - textFrame.geometricBounds[0];
    var newCenterX = (pageWidth - frameWidth) / 2;
    var newCenterY = (pageHeight - frameHeight) / 2;
    
    // Set the new geometric bounds to center the frame
    textFrame.geometricBounds = [
        newCenterY,
        newCenterX,
        newCenterY + frameHeight,
        newCenterX + frameWidth
	];
}

// Helper function to convert units
function convertUnits(value, fromUnits, toUnits) {
    var conversionFactor = 1;
    switch (fromUnits) {
        case MeasurementUnits.INCHES:
		if (toUnits === MeasurementUnits.PIXELS) {
			conversionFactor = 72; // Assuming 72 pixels per inch
            } else if (toUnits === MeasurementUnits.CENTIMETERS) {
			conversionFactor = 2.54;
            } else if (toUnits === MeasurementUnits.POINTS) {
			conversionFactor = 72;
		}
		// Add more cases if needed for other unit conversions
		break;
        // The default case assumes the conversion factor is 1
	}
    return value * conversionFactor;
}

// Function to insert text at the cursor position with specified font
function insertTextCursor(content, fontName) {
    // Get the current insertion point
    var insertionPoint = app.selection[0];
	
    // Define the font properties
	// var fontName = fontName; // Desired font name
	// var fontSize = 12; // Change this to your desired font size
	// var fontColor = "Black"; // Change this to your desired font color
	
    // Set font properties for the insertion point
    insertionPoint.appliedFont = app.fonts.itemByName(fontName);
	// insertionPoint.pointSize = fontSize;
	// insertionPoint.fillColor = insertionPoint.parentStory.insertionPoints[-1].fillColor;
	
    // Set the content of the insertion point
    insertionPoint.contents = content;
}	

// Helper function to determine if the selection is an insertion point
function isInsertionPoint() {
    return app.selection.length > 0 && app.selection[0] instanceof InsertionPoint;
}

// Function to add Basmala
function addBasmalaIDSN(fontSize) {
    var content = "321"; 
    var fontName = "QCF_BSML";
	isInsertionPoint() ? insertTextCursor(content, fontName) : addTextFrame(content, fontName, fontSize);
}

// Function to add Surah Name
function addSurahNameIDSN(surahNumber, fontSize) {
    var optionText = surahTextMapping[surahNumber] || "";
    isInsertionPoint() ? insertTextCursor(optionText, "QCF_BSML") : addTextFrame(optionText, "QCF_BSML", fontSize);
}

// Function to add Page Number
function addPageIDSN(pageNumber, fontSize) {
	var optionText = pageTextMapping["P" + pageNumber] || "";
	var fontName = "QCF_P" + pageNumber;
    isInsertionPoint() ? insertTextCursor(optionText, fontName) : addTextFrame(optionText, fontName, fontSize);
}

// Function to add Verse
function addVerseIDSN(verseKey, fontSize, parentheses) {
	var verse = verses[verseKey];
	if (!verse) {
		alert("Verse not found.");
		return;
	}
	
	var textToAdd = parentheses ? "ﱫ" + verse.code_v1 + "ﱪ" : verse.code_v1;
	var fontName = "QCF_P" + ("00" + verse.v1_page).slice(-3);
	
    isInsertionPoint() ? insertTextCursor(textToAdd, fontName) : addTextFrame(textToAdd, fontName, fontSize);
}		