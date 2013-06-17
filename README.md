jquery.searchable.js
====================

A small jquery plugin to make any listbox searchable. Items in the listbox will be hilighted as the user types in a search text. Can be used in "filter" mode where the listbox shows only the items containing the search text.

Usage:
 $(jquerySelector).searchable( { options } )

Example:
 Just fill your listbox, then make it searchable passing the textbox to use 

 $("#listBox").searchable({
  textField: $("#search")
 });

Options defaults:
 textField: null
 filtered: false,
 wholeWord: false,
 noElementText: "No element found",
 optionsCache: [],
 optionsFiltered: [],
 lastSearchedIndex: 0

DEMO: 
 http://jsfiddle.net/D5KJP