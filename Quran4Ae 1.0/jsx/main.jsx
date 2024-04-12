
// Function to add text layer with specific font
function addTextLayerWithFont(text, fontName, addLineBreaks) {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
	}
	
    var textLayer = comp.layers.addText(text);
    var textProperty = textLayer.property("Source Text");
    var textDocument = textProperty.value;
    textDocument.font = fontName;
    textProperty.setValue(textDocument);
	var fontSize = textDocument.fontSize;
	// textDocument.fontSize = fontSize; // Set font size
	
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