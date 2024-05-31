$(document).ready(function(){
	
	//const csInterface = new CSInterface(); // Created in index.html
	
    $('#addBasmalaButton').click(function () {	
        csInterface.evalScript('addBasmalaILST(' + window.fontSizeValue + ')');
	});
	
    $('#addSurahNameButton').click(function () {
		const chapterNumber = $('.selected .surah-number span').text();
        csInterface.evalScript('addSurahNameILST(' + chapterNumber + ', ' + window.fontSizeValue + ')');
	});
	
    $('#addPageButton').click(function () {
		const pageNumber = $('.selected .page-number span').text();
		csInterface.evalScript('addPageILST("'+ pageNumber +'", ' + window.fontSizeValue + ')');
	});
	
    $('#addAyaButton').click(function () {
		const verseKey = $('#verseInputField').val();
		const lineBreak = $("#addLineBreaks").prop("checked");
		const parentheses = $("#addParentheses").prop("checked");
		const ayaKaws = localStorage.getItem('kawsValue');
        csInterface.evalScript('addVerseILST("'+ verseKey +'", ' + window.fontSizeValue + ', ' + lineBreak + ', ' + parentheses + ', "' + ayaKaws + '")');
	});
});	