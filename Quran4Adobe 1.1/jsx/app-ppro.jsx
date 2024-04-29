
// Function to add Basmala
function addBasmalaMogrt(basmalaMogrtPath, fontSize) {
    var project = app.project;
    var sequence = project.activeSequence;
    var time = sequence.getPlayerPosition();
	
    var mogrtItem = sequence.importMGT(basmalaMogrtPath.fsName, time, 0, 0);
	
	if (mogrtItem) {
		
        var mogrtComponent = mogrtItem.getMGTComponent();
        
        if (mogrtComponent) {
			var textProperty = mogrtComponent.properties.getParamForDisplayName("Text");
            var currentText = textProperty.getValue();
			
			var newText = currentText.replace(/"fontSizeEditValue":\[70\]/g, '"fontSizeEditValue":\[' + fontSize + '\]');
			
			// Set the modified text value
			textProperty.setValue(newText);
			
			} else {
            alert("Failed to access Essential Graphics properties.");
		}
	}	
	
    if (!mogrtItem) {
		alert("Failed to import .mogrt file.");
	}
}

// Function to add Surah Name
function addSurahNameMogrt(file, surahNumber, fontSize) {
    var project = app.project;
    var sequence = project.activeSequence;
    var time = sequence.getPlayerPosition();
    
    var mogrtItem = sequence.importMGT(file.fsName, time, 0, 0);
	
	var optionText = surahTextMapping[surahNumber];
    
    if (mogrtItem) {
		
        var mogrtComponent = mogrtItem.getMGTComponent();
        
        if (mogrtComponent) {
            var textProperty = mogrtComponent.properties.getParamForDisplayName("Text");
            var currentText = textProperty.getValue();
			
            var newText = currentText.replace(/"textEditValue":"\] \\/g, '"textEditValue":"' + optionText); // Replace "textEditValue" with the desired Surah name
			
			var newText = currentText.replace(/"fontSizeEditValue":\[70\]/g, '"fontSizeEditValue":\[' + fontSize + '\]');
			
			// Set the modified text value
			textProperty.setValue(newText);
			
			} else {
            alert("Failed to access Essential Graphics properties.");
		}
		} else {
        alert("Failed to import .mogrt file.");
	}
}

// Function to add Page
function addPageMogrt(file, pageNumber, fontSize) {
    var project = app.project;
    var sequence = project.activeSequence;
    var time = sequence.getPlayerPosition();
    
    var mogrtItem = sequence.importMGT(file.fsName, time, 0, 0);
	
    var optionText = pageTextMapping["P" + pageNumber] || "";
    var font = "QCF_P" + pageNumber;
    
    if (mogrtItem) {
		
        var mogrtComponent = mogrtItem.getMGTComponent();
        
        if (mogrtComponent) {
			
            var textProperty = mogrtComponent.properties.getParamForDisplayName("Text");
            
            var currentText = textProperty.getValue();
            var newText = currentText.replace(/"textEditValue":"[^"]*"/, '"textEditValue":"' + optionText + '"'); // Replace "textEditValue" with the desired page
            var newText = newText.replace(/QCF_P003/g, font); 
			var newText = newText.replace(/"fontSizeEditValue":\[55\]/g, '"fontSizeEditValue":\[' + fontSize + '\]');
			
			// Set the modified text value
			textProperty.setValue(newText);
			
			} else {
            alert("Failed to access Essential Graphics properties.");
		}
		} else {
        alert("Failed to import .mogrt file.");
	}
}

// Function to add Verse
function addVerseMogrt(file, verseKey, fontSize, lineBreak) {
    var project = app.project;
    var sequence = project.activeSequence;
    var time = sequence.getPlayerPosition();
    
    var mogrtItem = sequence.importMGT(file.fsName, time, 0, 0);
	
	var verse = verses[verseKey];
	
	if (verse) {
		var textToAdd = verse.code_v1;
		var fontName = "QCF_P" + ("00" + verse.v1_page).slice(-3); // Generate font name dynamically
		
		if (lineBreak) {
			var maxWidth = sequence.frameSizeHorizontal;
			var maxChars = Math.floor(maxWidth / (fontSize * 1)); // Adjust factor as needed
			if (textToAdd.length > maxChars) {
				var textToAdd = textToAdd.replace(new RegExp('(.{1,' + maxChars + '})(\\s+|$)', 'g'), '$1\n')
			}
		} 
		
		if (mogrtItem) {
			
			var mogrtComponent = mogrtItem.getMGTComponent();
			
			if (mogrtComponent) {
				
				var textProperty = mogrtComponent.properties.getParamForDisplayName("Text");
				
				var currentText = textProperty.getValue();
				var newText = currentText.replace(/"textEditValue":"[^"]*"/, '"textEditValue":"' + textToAdd + '"'); // Replace "textEditValue" with the desired Aya
				var newText = newText.replace(/QCF_P003/g, fontName); 
				var newText = newText.replace(/"fontSizeEditValue":\[55\]/g, '"fontSizeEditValue":\[' + fontSize + '\]');
				
				// Set the modified text value
				textProperty.setValue(newText);
				
				} else {
				alert("Failed to access Essential Graphics properties.");
			}
			} else {
			alert("Failed to import .mogrt file.");
		}
		
        } else {
		alert("Verse not found.");
	}
}