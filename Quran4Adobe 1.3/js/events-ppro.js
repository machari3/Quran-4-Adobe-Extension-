$(document).ready(function(){
	
	//const csInterface = new CSInterface(); // Created in index.html
	
    const basmalaMogrtPath = extensionRoot + '/data/mogrt/Basmala.mogrt';
	const surahNameMogrtPath = extensionRoot + '/data/mogrt/Surah-name.mogrt';
	const pageMogrtPath = extensionRoot + '/data/mogrt/Page.mogrt';
	const backgroundPath = extensionRoot + '/data/mogrt/Background-1.mogrt';
	
    $('#addBasmalaButton').click(function () {	
		csInterface.evalScript('addBasmalaMogrt(File("' + basmalaMogrtPath + '"), ' + window.fontSizeValue + ')');
	});
	
    $('#addSurahNameButton').click(function () {
		const chapterNumber = $('.selected .surah-number span').text();
		csInterface.evalScript('addSurahNameMogrt(File("' + surahNameMogrtPath +'"),' + chapterNumber + ', ' + window.fontSizeValue + ')');
	});
	
    $('#addPageButton').click(function () {
		const pageNumber = $('.selected .page-number span').text();
		csInterface.evalScript('addPageMogrt(File("' + pageMogrtPath +'"), "' + pageNumber + '", ' + window.fontSizeValue + ')');
	});
	
    $('#addAyaButton').click(function () {
		const verseKey = $('#verseInputField').val();
		const lineBreak = $("#addLineBreaks").prop("checked");
		const parentheses = $("#addParentheses").prop("checked");
		csInterface.evalScript('addVerseMogrt(File("' + pageMogrtPath +'"), "' + verseKey + '", '+ window.fontSizeValue + ', '+ lineBreak + ', '+ parentheses + ')');
	});
	
    $('#addBackground').click(function () {
		csInterface.evalScript('addBackgroundMogrt(File("' + backgroundPath + '"))');
	});
});	