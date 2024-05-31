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
		const lineBreak = $("#addLineBreaks").prop("checked");
		const parentheses = $("#addParentheses").prop("checked");
		const ayaKaws = localStorage.getItem('kawsValue');
        csInterface.evalScript('addVerseAEFT("'+ verseKey +'", ' + window.fontSizeValue + ', '+ lineBreak + ', ' + parentheses + ', "' + ayaKaws + '")');
	});
	
    $('#addBackground').click(function () {
		csInterface.evalScript('addBackgroundAEFT()');
	});
	
    $('#addTextBox').click(function () {
		csInterface.evalScript('addTextBoxAEFT()');
	});
	
    $('#addTextAnimator1').click(function () {
		csInterface.evalScript('addTextAnimator1AEFT()');
	});
	
    $('#addTextMatte').click(function () {
		csInterface.evalScript('addTextMatteAEFT()');
	});
	
    $('#addTextOpacity').click(function () {
		csInterface.evalScript('addTextOpacityAEFT()');
	});
	
    $('#addSeparateLines').click(function () {
		csInterface.evalScript('separateLinesAEFT()');
	});
});	