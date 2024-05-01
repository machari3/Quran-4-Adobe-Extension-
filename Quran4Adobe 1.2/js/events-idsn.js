$(document).ready(function(){
	
	//const csInterface = new CSInterface(); // Created in index.html
	
    $('#addBasmalaButton').click(function () {	
        csInterface.evalScript('addBasmalaIDSN(' + window.fontSizeValue + ')');
	});
	
    $('#addSurahNameButton').click(function () {
		const chapterNumber = $('.selected .surah-number span').text();
        csInterface.evalScript('addSurahNameIDSN(' + chapterNumber + ', ' + window.fontSizeValue + ')');
	});
	
    $('#addPageButton').click(function () {
		const pageNumber = $('.selected .page-number span').text();
		csInterface.evalScript('addPageIDSN("'+ pageNumber +'", ' + window.fontSizeValue + ')');
	});
	
    $('#addAyaButton').click(function () {
		const verseKey = $('#verseInputField').val();
		const isChecked = $("#addLineBreaks").prop("checked");
        csInterface.evalScript('addVerseIDSN("'+ verseKey +'", ' + window.fontSizeValue + ')');
	});
});	