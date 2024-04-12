$(document).ready(function(){
	
	//const csInterface = new CSInterface(); // Created in index.html
	
    $('#addBasmalaButton').click(function () {	
		// Send a message to the After Effects extension
		csInterface.evalScript('addTextLayerWithFont("321", "QCF_BSML")');
	});
	
    $('#addSurahNameButton').click(function () {
		var chapterNumber = $('.selected .surah-number span').text();
		
		csInterface.evalScript('addSurahName('+ chapterNumber +')');
	});
	
    $('#addPageButton').click(function () {
		var surahNumber = $('.selected .page-number span').text();
		
		csInterface.evalScript('addPage("'+ surahNumber +'")');
	});
	
    $('#addAyaButton').click(function () {
		var verseKey = $('#verseInputField').val();
		var isChecked = $("#addLineBreaks").prop("checked");
		
		csInterface.evalScript('addVerse("'+ verseKey +'", '+ isChecked +')');
	});
	
    $('#addBackground').click(function () {
		csInterface.evalScript('addBackground()');
	});
	
    $('#addTextBox').click(function () {
		csInterface.evalScript('addTextBox()');
	});
	
    $('#addSeparateLines').click(function () {
		csInterface.evalScript('separateLines()');
	});
});