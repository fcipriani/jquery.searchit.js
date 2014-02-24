(function ( $ ) {

	$.fn.searchit = function( options ) {

		return this.each( function() {

			$.fn.searchit.globals = $.fn.searchit.globals ||
			{
				counter: 0
			}
			var $counter = $.fn.searchit.globals.counter;

			var $t = $(this);
			var opts = $.extend( {}, $.fn.searchit.defaults, options );
			var selectedValue = $t.find("option:selected").text();
			
			// Changed property name, backward compatibility stuff
			if (opts.textField && !opts.textFields) opts.textFields = opts.textField;

			// Use provided text fields, one for each select object
			if (opts.textFields && opts.textFields.length > 1)
				opts.textFields = $(opts.textFields[$counter]);
				
			// Build a text field if not available
			if (opts.textFields == null) {
				$t.before("<input type='textbox' id='__searchit" + $counter + "'><br>");
				opts.textFields = $('#__searchit' + $counter);
			}          
			if (opts.loadSelectedOption) {
				// gwincr11 suggestion
				opts.textFields.val(selectedValue);
			}

			// Use provided css class
			if (opts.textFieldClass)
				opts.textFields.addClass(opts.textFieldClass);
			// Make select nicer
			if (opts.dropDown) {
				$t.css("padding", "5px")
					.css("margin", "-5px -20px -5px -5px");

				$t.wrap("<div id='__searchitWrapper" + $counter + "' />");
				opts.wrp = $('#__searchitWrapper' + $counter);
				opts.wrp.css("display", "inline-block")
					.css("vertical-align", "top")
					.css("overflow", "hidden")
					.css("border", "solid grey 1px")
					.css("position", "absolute")
					.hide();
				if (opts.dropDownClass)
					opts.wrp.addClass(opts.dropDownClass);
			} 

			opts.optionsFiltered = [];
			opts.optionsCache = [];

			// Save listbox current content
			$t.find("option").each( function (index) {
				opts.optionsCache.push(this);
			});      

			// Save options 
			$t.data('opts', opts);

			// Hook listbox click
			$t.click( function(event) {
				_opts($t).textFields.val($(this).find(":selected").text());
				_opts($t).wrp.hide();
				event.stopPropagation();  
			});

			// Hook html page click to close dropdown
			$("html").click( function() {
				_opts($t).wrp.hide();
			});

			// Hook the keyboard and we're done
			_opts($t).textFields.keydown( function (event) {
				if (event.keyCode == 13 || event.keyCode == 9) {
					$(this).val($t.find(":selected").text());
					_opts($t).wrp.hide();
					return;
				}
			});
			_opts($t).textFields.keyup( function (event) {
				if (event.keyCode != 13 && event.keyCode != 9) {
					setTimeout(_findElementsInListBox($t, $(this)), 50);
				}
			});

			// Incremente counter so we have unique field ids
			$.fn.searchit.globals.counter++;      

		})


		function _findElementsInListBox(lb, txt) {

			if (!lb.is(":visible")) {
				_showlb(lb);
			}
			
			_opts(lb).optionsFiltered = [];
			var count = _opts(lb).optionsCache.length;
			var dropDown = _opts(lb).dropDown;
			var searchText = txt.val().toLowerCase();

			// find match (just the old classic loop, will make the regexp later)
			$.each(_opts(lb).optionsCache, function (index, value) {
				if ($(value).text().toLowerCase().indexOf(searchText) > -1)
				{
					// save matching items 
					_opts(lb).optionsFiltered.push(value);
				}

				// Trigger a listbox reload at the end of cycle    
				if (! --count) {
					_filterListBox(lb);
				}
			});
		}

		function _opts(lb) {
			return lb.data('opts');
		}

		function _showlb(lb) {
			if (_opts(lb).dropDown) {
				var tf = _opts(lb).textFields;          
				lb.attr("size", _opts(lb).size);
				_opts(lb).wrp.show().offset({
					top: tf.offset().top + tf.outerHeight(), 
					left: tf.offset().left
				});
				_opts(lb).wrp.css("width", tf.outerWidth() + "px");
				lb.css("width", (tf.outerWidth() + 25) + "px");
			}
		}

		function _filterListBox(lb) {
			lb.empty();

			if (_opts(lb).optionsFiltered.length == 0) {
				lb.append("<option>" + _opts(lb).noElementText + "</option>");
			} else {
				$.each(_opts(lb).optionsFiltered, function (index, value) {
					lb.append(value);
				});
				lb[0].selectedIndex = 0;
			}
		}
	}

	$.fn.searchit.defaults = {
		// backward compatibility
		textField: null,
		
		// Provide custom text fields where select will be attached, must be a jquery object.
		// If multiple text fields are provided, select objects will be attached to them
		// in the order they are found
		textFields: null,										

		// Text fields css class
		textFieldClass: null,								

		// Show the select object as a custom dropdown under the text fields. If it is false,
		// the select object will be left where it is, and typing in the text field will
		// work as a quick select
		dropDown: true,											

		// The dropdown css class
		dropDownClass: null,

		// Number of the visible options in the select object
		size: 5,

		// Text to show when no element matches the typed text
		noElementText: "No elements found",

		// Load the currently selected option in the text field
		loadSelectedOption: false		
	}    

}(jQuery))
