
// Function to add text frame with specified content, font, and size
function addTextFrame(content, fontName, fontSize) {
    // Check if a document is open
    if (app.documents.length > 0) {
        // Reference the active document
        var doc = app.activeDocument;

        // Create a text frame on the first page
        var textFrame = doc.pages[0].textFrames.add({
            geometricBounds: [72, 72, doc.documentPreferences.pageHeight - 72, doc.documentPreferences.pageWidth - 72] // Adjust geometricBounds as per your requirement
        });

        // Add text to the text frame
        var newText = textFrame.insertionPoints.item(0);
        newText.contents = content;
        newText.appliedFont = app.fonts.item(fontName); // Set the font
        newText.pointSize = fontSize; // Set the font size
        newText.justification = Justification.CENTER_ALIGN; // Set text alignment to center
    } else {
        alert("No document is open. Please open a document in Adobe InDesign.");
    }
}

// Function to add Basmala
function addBasmalaIDSN(fontSize) {
    addTextFrame("321", "QCF_BSML", fontSize);
}

// Function to add Surah Name
function addSurahNameIDSN(surahNumber, fontSize) {
    var optionText = surahTextMapping[surahNumber] || "";
    addTextFrame(optionText, "QCF_BSML", fontSize);
}

// Function to add Page Number
function addPageIDSN(pageNumber, fontSize) {
    var optionText = pageTextMapping["P" + pageNumber] || "";
    var fontName = "QCF_P" + pageNumber;
    addTextFrame(optionText, fontName, fontSize);
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
    addTextFrame(textToAdd, fontName, fontSize);
}