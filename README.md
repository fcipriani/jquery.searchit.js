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

	// Provide custom text fields where the dropdowns will be attached. Must be a jquery object.
	// If multiple text fields are provided, dropdowns will be attached to them
	// in the order they are found
	textFields: null,										

	// Text fields css class
	textFieldClass: null,								

	// Hides the dropdowns and show them right under the text fields when something is typed.
	// If false, existing dropdowns won't be touched, and typing in the text field will work 
	// as a quick selection
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
