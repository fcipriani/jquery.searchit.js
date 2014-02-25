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

	// Provide custom text fields where select will be attached, must be a jquery object.
	// If multiple text fields are provided, select objects will be attached to them
	// in the order they are found
	textFields: null,										

	// Text fields css class
	textFieldClass: null,								

	// Show the select object as a custom dropdown right under the text fields. If it is false,
	// the dropdowns won't be touched, typing in the text field will work as quick selection
	dropDown: true,											

	// The dropdown css class
	dropDownClass: null,

	// Number visible options in the dropdowns
	size: 5,

	// Text to show when no element matches the typed text
	noElementText: "No elements found",

	// Load the currently selected option in the text field at startup
	loadSelectedOption: false		

Demo: 
-----
http://jsfiddle.net/QuYJD/17/
