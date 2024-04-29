$(document).ready(function(){
	
	//const csInterface = new CSInterface(); // Created in index.html
	
    $('#addBasmalaButton').click(function () {	
        csInterface.evalScript('addTextLayerWithFontAEFT("321", "QCF_BSML", ' + window.fontSizeValue + ')');
	});
	
    $('#addSurahNameButton').click(function () {
		const chapterNumber = $('.selected .surah-number span').text();
        csInterface.evalScript('addSurahNameAEFT(' + chapterNumber + ', ' + window.fontSizeValue + ')');
	});
	
    $('#addPageButton').click(function () {
		const pageNumber = $('.selected .page-number span').text();
		csInterface.evalScript('addPageAEFT("'+ pageNumber +'", ' + window.fontSizeValue + ')');
	});
	
    $('#addAyaButton').click(function () {
		const verseKey = $('#verseInputField').val();
		const isChecked = $("#addLineBreaks").prop("checked");
        csInterface.evalScript('addVerseAEFT("'+ verseKey +'", ' + window.fontSizeValue + ', '+ isChecked +')');
	});
	
    $('#addBackground').click(function () {
		csInterface.evalScript('addBackgroundAEFT()');
	});
	
    $('#addTextBox').click(function () {
		csInterface.evalScript('addTextBoxAEFT()');
	});
	
    $('#addSeparateLines').click(function () {
		csInterface.evalScript('separateLinesAEFT()');
	});
});	