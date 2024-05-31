
// Function to pad page numbers with leading zeros
const pad = (num, size) => num.toString().padStart(size, '0');

$(document).ready(function(){
	
	window.fontSizeValue = localStorage.getItem('fontSize');
		
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
				{ id: 'addTextBox', title: 'Add text box', enabled: 'assets/images/icons/text-box.png', disabled: 'assets/images/icons/text-box-disabled.png' },
				{ id: 'addTextMatte', title: 'Add text matte', enabled: 'assets/images/icons/text-matte.png', disabled: 'assets/images/icons/text-matte-disabled.png' },
				{ id: 'addTextAnimator1', title: 'Add text animator', enabled: 'assets/images/icons/text-animator-1.png', disabled: 'assets/images/icons/text-animator-1-disabled.png' },
				{ id: 'addTextOpacity', title: 'Add text opacity', enabled: 'assets/images/icons/text-opacity-1.png', disabled: 'assets/images/icons/text-opacity-1-disabled.png' },
				{ id: 'addSeparateLines', title: 'Add separate lines', enabled: 'assets/images/icons/separate-lines.png', disabled: 'assets/images/icons/separate-lines-disabled.png' }
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
	
	//************* TODO
	
    var isDragging = false;
    var originalX = 0;
	
    $(document).on('mousedown', '#font-size', function(e) {
        isDragging = true;
        originalX = e.pageX;
	});
	
    $(document).on('mousemove', function(e) {
        if (isDragging) {
            var currentValue = parseInt($('#font-size').val(), 10);
            var dx = e.pageX - originalX;
            
            // Dragging to the left
            if (dx < 0) {
                $('#font-size').val(currentValue - 1);
                originalX = e.pageX; // Update the originalX to the current position
			}
            // Dragging to the right
            else if (dx > 0) {
                $('#font-size').val(currentValue + 1);
                originalX = e.pageX; // Update the originalX to the current position
			}
		}
	});
	
    $(document).on('mouseup', function(e) {
        isDragging = false;
        $('#font-size').trigger('change'); // Manually trigger the change event
	});
	
	// Element used in AEFT
	function hideElements() {
		$('#addTextBox, #addTextMatte, #addTextAnimator1, #addTextOpacity, #addSeparateLines, .breaker').hide();
	}
	
	// Switch statement to set UI elements based on the application name
	switch(appName) {
		case "AEFT":
		$('#header-image').attr('src', 'assets/images/Quran4AEFT.png');
		// Initial check for icon state
		updateIconState();
		// Set interval to periodically check for changes in icon state
		setInterval(updateIconState, 500);
		break;
		
		case "PPRO":	
		$('#header-image').attr('src', 'assets/images/Quran4PPRO.png');
		hideElements();
		break;
		
		case "PHSP":
		case "PHXS":
		$('#header-image').attr('src', 'assets/images/Quran4PHSP.png');
		hideElements();
		break;
		
		case "ILST":	
		$('#header-image').attr('src', 'assets/images/Quran4ILST.png');
		hideElements();
		break;
		
		case "IDSN":	
		$('#header-image').attr('src', 'assets/images/Quran4IDNS.png');
		hideElements();
		break;
	}
	
    $('#about').click(function () {	
		window.location.href = './html/about.html';   
	});
	
    $('#settings').click(function () {	
		window.location.href = './html/settings.html';   
	});
});	