// Function to pad page numbers with leading zeros
function pad(num, size) {
	let s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

$(document).ready(function(){
	
	// Loop through page numbers from 2 to 604
	/*
		<div class="page">
		<div class="page-arabic"><span>ص</span></div>
		<div class="page-number"><span>002</span></div>
		</div>
	*/
	for (var i = 2; i <= 604; i++) {
		// Create a new page-container div
		var pageContainer = $('<div class="page-container"></div>');
		// Create a new page div
		var pageDiv = $('<div class="page"></div>');
		// Create a new page-arabic div with the span containing the page number
		var pageArabicDiv = $('<div class="page-arabic"><span>ص</span></div>');
		// Create a new page-number div with the span containing the page number
		var pageNumberDiv = $('<div class="page-number"><span>' + pad(i, 3) + '</span></div>');
		// Append page-arabic and page-number divs to page div
		pageDiv.append(pageArabicDiv, pageNumberDiv);
		// Append page div to page-container div
		pageContainer.append(pageDiv);
		// Append the whole page-container to body
		$('#pages-container').append(pageContainer);
	}
	
	// Update selection when clicking on chapter container
	$('.page-container').click(function() {
		$('.page-container').removeClass('selected');
		$('.page-arabic').css('background-color', ''); // Reset bg color for all chapter numbers
		$(this).addClass('selected');
		$(this).find('.page-arabic').css('background-color', '#2ca4ab'); // Set bg color for selected chapter number
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
		
		var $visibleChapter = $('.page-container:visible').first();
		if ($visibleChapter.length > 0) {
			$('.page-container').removeClass('selected');
			$visibleChapter.addClass('selected');
			$('.page-arabic').css('background-color', '');
			$visibleChapter.find('.page-arabic').css('background-color', '#2ca4ab');
		}
	});
	
	// Update selection when clicking on chapter container
	$('.surah-container').click(function() {
		$('.surah-container').removeClass('selected');
		$('.surah-number').css('background-color', ''); // Reset bg color for all chapter numbers
		$(this).addClass('selected');
		$(this).find('.surah-number').css('background-color', '#2ca4ab'); // Set bg color for selected chapter number
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
		
		var $visibleChapter = $('.surah-container:visible').first();
		if ($visibleChapter.length > 0) {
			$('.surah-container').removeClass('selected');
			$visibleChapter.addClass('selected');
			$('.surah-number').css('background-color', '');
			$visibleChapter.find('.surah-number').css('background-color', '#2ca4ab');
		}
	});
	
	// updateIconState
	function updateIconState() {
		csInterface.evalScript('isTextLayerSelected()', function(result) {
			const icons = [
				{ id: 'addTextBox', enabled: 'images/icons/text-box.png', disabled: 'images/icons/text-box-disabled.png' },
				{ id: 'addSeparateLines', enabled: 'images/icons/separate-lines.png', disabled: 'images/icons/separate-lines-disabled.png' }
			];
			
			icons.forEach(icon => {
				const element = document.getElementById(icon.id);
				const enabledSrc = icon.enabled;
				const disabledSrc = icon.disabled;
				
				element.src = (result === 'true') ? enabledSrc : disabledSrc;
				
				if (result === 'true') {
					element.classList.add('iconEnabled');
					} else {
					element.classList.remove('iconEnabled');
				}
			});
		});
	}
	
	// Initial check
	updateIconState();
	
	// Check periodically for changes
	setInterval(updateIconState, 500);
});	