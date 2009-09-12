(function () {
  var ObjectLateral = function () {}, 
      Lateral;

  ObjectLateral.prototype = {
    /**
      Private Methods
    */
    _parser:   function (_str) {
      var _arr  = _str.split('}{'), 
          _ret  = {}, 
          _new, _data;

      for ( var i = 0, _len = _arr.length; i < _len; i++ ) {
        _data           = ( ( _arr[i].replace( '{' , '').replace('}', '') ).replace( /^\s+|\s+$/g, '') ).split(':'), 
                          //  Hideous. But seriously, who cares? Submit a patch?
        _ret[_data[0]]  = ( _data[1].replace(/'/g, '') ).replace( /^\s+|\s+$/g, '');
      }
      return _ret;
    },
    /**
      Public Methods
    */
    toObject: function (_str) {
      return this._parser(_str);
    }
  };
  window.Lateral = new ObjectLateral();
})();


//  USAGE:
//  Pointlessly odd format... But who cares, its just for fun right?
var string       = "{ propA:'dog' }{ propB:'cat' }{ propC:'hamster' }"; 
//  http://getfirebug.com or go home.
console.log( Lateral.toObject(string) );