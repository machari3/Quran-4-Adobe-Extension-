
// Function to pad page numbers with leading zeros
const pad = (num, size) => num.toString().padStart(size, '0');

$(document).ready(function(){
		
	// Get font size 
	window.fontSizeValue = $('#font-size').val();
	
	$('#font-size').on('input', function() {
		window.fontSizeValue = $(this).val();
	});
	
	const $pagesContainer = $('#pages-container');
	
	// Loop through page numbers from 2 to 604 and create page elements
	for (let i = 2; i <= 604; i++) {
		const pageNumber = pad(i, 3);
		const pageContainer = $(`
			<div class="page-container">
			<div class="page">
			<div class="page-arabic"><span>ص</span></div>
			<div class="page-number"><span>${pageNumber}</span></div>
			</div>
			</div>
		`);
		$pagesContainer.append(pageContainer);
	}
	
	// Update selection when clicking on Page container
	$pagesContainer.on('click', '.page-container', function() {
		$('.page-container').removeClass('selected').find('.page-arabic').css('background-color', '');
		$(this).addClass('selected').find('.page-arabic').css('background-color', '#2ca4ab');
	});
	
	// Search functionality
	$('#searchPageInput').keyup(function() {
		var filter = $(this).val().toUpperCase();
		$('.page-container').each(function() {
			var text = $(this).text().toUpperCase();
			if (text.indexOf(filter) > -1) {
				$(this).show();
				} else {
				$(this).hide();
				$(this).removeClass('selected'); // Remove 'selected' class from hidden containers
			}
		});
		
		var $visiblePage = $('.page-container:visible').first();
		if ($visiblePage.length > 0) {
			$('.page-container').removeClass('selected');
			$visiblePage.addClass('selected');
			$('.page-arabic').css('background-color', '');
			$visiblePage.find('.page-arabic').css('background-color', '#2ca4ab');
		}
	});
	
	const $surahContainer = $('#surah-list');
	
	// Update selection when clicking on Surah container
	$surahContainer.on('click', '.surah-container', function() {
		$('.surah-container').removeClass('selected').find('.surah-number').css('background-color', '');
		$(this).addClass('selected').find('.surah-number').css('background-color', '#2ca4ab');
	});
	
	// Search functionality
	$('#searchInput').keyup(function() {
		var filter = $(this).val().toUpperCase();
		$('.surah-container').each(function() {
			var text = $(this).text().toUpperCase();
			if (text.indexOf(filter) > -1) {
				$(this).show();
				} else {
				$(this).hide();
				$(this).removeClass('selected'); // Remove 'selected' class from hidden containers
			}
		});
		
		var $visibleSurah = $('.surah-container:visible').first();
		if ($visibleSurah.length > 0) {
			$('.surah-container').removeClass('selected');
			$visibleSurah.addClass('selected');
			$('.surah-number').css('background-color', '');
			$visibleSurah.find('.surah-number').css('background-color', '#2ca4ab');
		}
	});
	
	// updateIconState
	function updateIconState() {
		csInterface.evalScript('isTextLayerSelected()', function(result) {
			const icons = [
				{ id: 'addTextBox', title: 'Add text box', enabled: 'images/icons/text-box.png', disabled: 'images/icons/text-box-disabled.png' },
				{ id: 'addSeparateLines', title: 'Add separate lines', enabled: 'images/icons/separate-lines.png', disabled: 'images/icons/separate-lines-disabled.png' }
			];
			
			icons.forEach(icon => {
				const element = document.getElementById(icon.id);
				const enabledSrc = icon.enabled;
				const disabledSrc = icon.disabled;
				
				element.src = (result === 'true') ? enabledSrc : disabledSrc;
				
				if (result === 'true') {
					element.classList.add('iconEnabled');
					element.title = icon.title;
					} else {
					element.classList.remove('iconEnabled');
					element.title = '';
				}
			});
		});
	}
	
	//
	switch(appName) {
		case "AEFT":
		// Initial check for icon state
		updateIconState();
		// Set interval to periodically check for changes in icon state
		setInterval(updateIconState, 500);
		break;
		
		case "PPRO":	
		$('#header-image').attr('src', 'images/Quran4PPRO.png');
		$('#addTextBox').hide();
		$('#addSeparateLines').hide();
		break;
		
		case "PHSP":
		case "PHXS":
		$('#header-image').attr('src', 'images/Quran4PHSP.png');
		$('#addTextBox').hide();
		$('#addSeparateLines').hide();
		break;
		
		case "ILST":	
		$('#header-image').attr('src', 'images/Quran4ILST.png');
		$('#addBackground').hide();
		$('#addTextBox').hide();
		$('#addSeparateLines').hide();
		break;
		
		case "IDSN":	
		$('#header-image').attr('src', 'images/Quran4IDNS.png');
		$('#addBackground').hide();
		$('#addTextBox').hide();
		$('#addSeparateLines').hide();
		$('#lineBreaks').hide();
		break;
	}
	
    $('#about').click(function () {	
      window.location.href = 'about.html';   
	});

});	