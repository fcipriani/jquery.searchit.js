jquery.searchable.js
====================

A small jquery plugin to make any listbox searchable. Items in the listbox will be hilighted as the user types the search text. Can be used in "filter" mode where the listbox shows only the items containing the search text.

Usage:
------
$(jquerySelector).searchable( { options } )

Example:
--------
Just pick your listbox, then make it searchable specifying the text box you'll use to type:

	$("#listBox").searchable({
 		textField: $("#search")
	});

Option list and defaults:
-----------------

	textField: null
	filtered: false,
	wholeWord: false,
	noElementText: "No element found",
	optionsCache: [],
	optionsFiltered: [],
	lastSearchedIndex: 0

Demo: 
-----
http://jsfiddle.net/fabriziocip/QuYJD/