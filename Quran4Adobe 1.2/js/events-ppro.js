$(document).ready(function(){
	
	//const csInterface = new CSInterface(); // Created in index.html
	
    const basmalaMogrtPath = extensionRoot + '/data/mogrt/Basmala.mogrt';
	const surahNameMogrtPath = extensionRoot + '/data/mogrt/Surah-name.mogrt';
	const PageMogrtPath = extensionRoot + '/data/mogrt/Page.mogrt';
	
    $('#addBasmalaButton').click(function () {	
		csInterface.evalScript('addBasmalaMogrt(File("' + basmalaMogrtPath + '"), ' + window.fontSizeValue + ')');
	});
	
    $('#addSurahNameButton').click(function () {
		const chapterNumber = $('.selected .surah-number span').text();
		csInterface.evalScript('addSurahNameMogrt(File("' + surahNameMogrtPath +'"),' + chapterNumber + ', ' + window.fontSizeValue + ')');
	});
	
    $('#addPageButton').click(function () {
		const pageNumber = $('.selected .page-number span').text();
		csInterface.evalScript('addPageMogrt(File("' + PageMogrtPath +'"), "' + pageNumber + '", ' + window.fontSizeValue + ')');
	});
	
    $('#addAyaButton').click(function () {
		const verseKey = $('#verseInputField').val();
		const isChecked = $("#addLineBreaks").prop("checked");
		csInterface.evalScript('addVerseMogrt(File("' + PageMogrtPath +'"), "' + verseKey + '", '+ window.fontSizeValue + ', true)');
	});
});	