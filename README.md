jquery.searchit.js
====================

A small and simple jquery plugin to make any listbox (select) searchable. 

Usage:
------
$(listboxselector).searchit( { [options] } )

Examples:
--------
	// Simple
	$("#listBox").searchit();
	// Passing some setup options
	$("#listBox").searchit({textFields:$(".myTextFields"), noElementText:"No matches", size:10});

Setup options and defaults:
-----------------

	// The text fields (input type="text") where to type the search text. Must be a jquery object.
	// If not provided (default), a text field will be created above each dropdown on the fly. 
	textFields: null,										

	// Text fields css class
	textFieldClass: null,								

	// Hides the dropdowns and show them right under the text fields when something is typed.
	dropDown: true,											

	// The dropdown css class
	dropDownClass: null,

	// Number visible options in the dropdowns
	size: 5,

	// Text to show when no element matches the typed text
	noElementText: "No elements found",

	// Load the currently selected option in the text fields at startup
	loadSelectedOption: false		

Demo: 
-----
http://jsfiddle.net/QuYJD/17/
