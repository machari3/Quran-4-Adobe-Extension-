
// Function to add text layer with specified content, font, and size
function addTextLayer(content, fontName, fontSize) {
    // Create a new text frame
    var newTextFrame = app.activeDocument.textFrames.add();
    // Set text content
    newTextFrame.contents = content;
    // Get the text range
    var textRange = newTextFrame.textRange;
    // Set font
    textRange.characterAttributes.textFont = app.textFonts.getByName(fontName);
    // Specify the font size
    textRange.characterAttributes.size = fontSize;
    // Set text alignment to center
    newTextFrame.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
}

// Function to add Basmala
function addBasmalaILST(fontSize) {
    addTextLayer("321", "QCF_BSML", fontSize);
}

// Function to add Surah Name
function addSurahNameILST(surahNumber, fontSize) {
    var optionText = surahTextMapping[surahNumber] || "";
    addTextLayer(optionText, "QCF_BSML", fontSize);
}

// Function to add Page Number
function addPageILST(pageNumber, fontSize) {
    var optionText = pageTextMapping["P" + pageNumber] || "";
    var fontName = "QCF_P" + pageNumber;
    addTextLayer(optionText, fontName, fontSize);
}

// Function to add Verse
function addVerseILST(verseKey, fontSize, lineBreak, parentheses) {
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