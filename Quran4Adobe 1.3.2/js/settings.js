
$(document).ready(function(){
	
	// Function to save default settings if not present in localStorage
	function saveDefaultSettings() {
		// Check if 'fontSize' is not found in localStorage
		if (!localStorage.getItem('fontSize')) {
			// Set default 'fontSize'
			localStorage.setItem('fontSize', '80');
		}
		
		// Check if 'kawsValue' is not found in localStorage
		if (!localStorage.getItem('kawsValue')) {
			// Set default 'kawsValue'
			localStorage.setItem('kawsValue', 'ﱫﱪ');
		}
	}
	
	// Function to load settings or set default values
	function loadSettings() {
		// Set default values
		var defaultFontSize = '80';
		var defaultKawsValue = 'ﱫﱪ';
		
		// Check for saved fontSize in localStorage
		var savedFontSize = localStorage.getItem('fontSize') || defaultFontSize;
		var savedKawsValue = localStorage.getItem('kawsValue') || defaultKawsValue;
		
		// Update the value of the font-size input
		$('#font-size').val(savedFontSize);
				
		// Check the saved or default radio button
		var radios = document.getElementsByName('optionsRadios');
		for (var i = 0; i < radios.length; i++) {
			if (radios[i].value === savedKawsValue) {
				radios[i].checked = true;
				break;
			}
		}
	}
	
	// Call saveDefaultSettings when the script loads
	saveDefaultSettings();
	
	// loadSettings();
	loadSettings();
	
	$('#font-size').on('change', function() {
		var selectedFontSize = $(this).val();
		localStorage.setItem('fontSize', selectedFontSize);
		window.fontSizeValue = localStorage.getItem('fontSize');
	});
	
	$('input[name="optionsRadios"]').on('change', function() {
		var selectedValue = $(this).val();
		localStorage.setItem('kawsValue', selectedValue);
	});
});	