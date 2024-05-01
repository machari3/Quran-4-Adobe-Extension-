
// Function to add text frame with specified content, font, and size
function addTextFrame(content, fontName, fontSize) {
    // Check if a document is open
    if (app.documents.length > 0) {
        // Reference the active document
        var doc = app.activeDocument;

        // Create a text frame on the first page
        var textFrame = doc.pages[0].textFrames.add({
            geometricBounds: [500, 1000, 100, 200] // Adjust geometricBounds as per your requirement
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
function addVerseIDSN(verseKey, fontSize, lineBreak) {
    var verse = verses[verseKey];
    if (verse) {
        var textToAdd = verse.code_v1;
        var fontName = "QCF_P" + ("00" + verse.v1_page).slice(-3); // Generate font name dynamically
      /*  if (lineBreak) {
            // Get the width of the active document
            var documentWidth = app.activeDocument.documentPreferences.pageWidth;
            var maxChars = Math.floor(documentWidth / (fontSize * 0.6)); // Adjust factor as needed
            if (textToAdd.length > maxChars) {
                textToAdd = textToAdd.replace(new RegExp('(.{1,' + maxChars + '})(\\s+|$)', 'g'), '$1\r');
            }
	  }*/
        addTextFrame(textToAdd, fontName, fontSize);
    } else {
        alert("Verse not found.");
    }
}