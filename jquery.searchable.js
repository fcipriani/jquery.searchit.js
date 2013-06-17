  (function ( $ ) {

    $.fn.searchable = function( options ) {

      var $t = this;

      var opts = $.extend( {}, $.fn.searchable.defaults, options );

      if (opts.action) {
        switch (opts.action.toLowerCase()) {
          case "reset":
            var o = _opts($t);
            o.filtered = (options.filtered == undefined) ? _opts($t).filtered : options.filtered;
            $t.data('opts', o);

            _resetListBox($t, _opts($t).textField, opts.filtered || _opts($t).filtered);
            break;
          case "findnext":
            _findElementsInListBox($t, _opts($t).textField, true);
            break;
        }
        return;
      }

      $t.data('opts', opts);

      if (_opts($t).textField) {
        _opts($t).textField.keyup( function (event) {
          setTimeout(_findElementsInListBox($t, $(this), false), 50);
        })      
      }

      $t.find("option").each( function (index) {
        _opts($t).optionsCache.push(this);
      });

      function _findElementsInListBox(lb, txt, findNext) {
        var searchText = txt.val().toLowerCase();
        
        if (!findNext)
          _opts(lb).lastSearchedIndex = 0;

        _opts(lb).optionsFiltered = [];
        var count = _opts(lb).optionsCache.length;
        var filter = _opts(lb).filtered;

        $.each(_opts(lb).optionsCache, function (index, value) {
          if (( (_opts(lb).wholeWord && $(value).text().toLowerCase() == searchText)
                || (!_opts(lb).wholeWord && $(value).text().toLowerCase().indexOf(searchText) > -1)
              )
              &&
              (
                (findNext == true && index > _opts(lb).lastSearchedIndex)
                || findNext == false)
              ) 
          {
            if (filter) {
              _opts(lb).optionsFiltered.push(value);
            } else {
              lb.val($(value).val());
              _opts(lb).lastSearchedIndex = index;
              return false;
            }
          }

          if (! --count && filter) {
            _filterListBox(lb);
          }    
        });      
      }

      function _opts(lb) {
        return lb.data('opts');
      }

      function _filterListBox(lb) {
        lb.empty();

        if (_opts(lb).optionsFiltered.length == 0) {
          lb.append("<option>" + _opts(lb).noElementText + "</option>");
        } else {
          $.each(_opts(lb).optionsFiltered, function (index, value) {
            lb.append(value);
          });
        }
      }

      function _resetListBox(lb, txt, filter) {
        setTimeout(function () {
          lb.empty();

          if (filter)
            _findElementsInListBox(lb, txt, false);
          else {
            $.each(_opts(lb).optionsCache, function (index, value) {
              lb.append(value);
            });
            _findElementsInListBox(lb, txt, false);
          }
        }, 50);
      }      

    }

    $.fn.searchable.defaults = {
      textField: null,
      filtered: false,
      wholeWord: false,
      noElementText: "No element found",
      optionsCache: [],
      optionsFiltered: [],
      lastSearchedIndex: 0
    }    

  }(jQuery))