// reverseText
function reverseTextKeepLines(text) {
    // Split the text into lines
    var lines = text.split('\r');
    // Reverse each line individually
    for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split('').reverse().join('');
	}
    // Join the lines back into a single string
    return lines.join('\r');
}

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
	// newTextFrame.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
	for (var i = 0; i < newTextFrame.paragraphs.length; i++) {
			newTextFrame.paragraphs[i].paragraphAttributes.justification = Justification.CENTER;
	}
	
	// Center the text frame horizontally and vertically
    var doc = app.activeDocument;
    var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    var artboardCenter = [(artboard.artboardRect[0] + artboard.artboardRect[2]) / 2, (artboard.artboardRect[1] + artboard.artboardRect[3]) / 2];
    
    // Update the position after the text frame has been resized to fit the multiline text
    newTextFrame.left = artboardCenter[0] - (newTextFrame.width / 2);
    newTextFrame.top = artboardCenter[1] + (newTextFrame.height / 2);
    
    // Redraw the document to apply changes
    app.redraw();
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
	var reversedText = reverseTextKeepLines(optionText);
	var fontName = "QCF_P" + pageNumber;
	addTextLayer(reversedText, fontName, fontSize);
}

// Function to add Verse
function addVerseILST(verseKey, fontSize, lineBreak, parentheses, ayaKaws) {
	var verse = verses[verseKey];
	if (!verse) {
		alert("Verse not found.");
		return;
	}
	var firstKaws = ayaKaws.charAt(0);
	var secondKaws = ayaKaws.charAt(1);
	
	var textToAdd = parentheses ? firstKaws + verse.code_v1 + secondKaws : verse.code_v1;
	var reversedText = reverseTextKeepLines(textToAdd);
	var fontName = "QCF_P" + ("00" + verse.v1_page).slice(-3); // Generate font name dynamically
	if (lineBreak) {
		// Get the width of the active document
		var documentWidth = app.activeDocument.width;
		var maxChars = Math.floor(documentWidth / (fontSize * 1)); // Adjust factor as needed
		if (textToAdd.length > maxChars) {
			textToAdd = textToAdd.replace(new RegExp('(.{1,' + maxChars + '})(\\s+|$)', 'g'), '$1\r');
		    // Remove any trailing newline characters
            textToAdd = textToAdd.replace(/\r+$/, '');
		}
		var reversedText = reverseTextKeepLines(textToAdd);	
	}
	addTextLayer(reversedText, fontName, fontSize);
}