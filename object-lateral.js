(function () {
  var ObjectLateral = function () {}, 
      Lateral;

  ObjectLateral.prototype = {
    /**
      Private Methods
    */
    _parser:   function (_str) {
      var _arr  = eval('[' + _str + ']'), 
          _ret  = {};       
      //  Even scarier then before.
      for ( var i = 0, _len = _arr.length; i < _len; i++ ) {
        for( var member in _arr[i] ) {
          _ret[member]  =   _arr[i][member];
        }
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
var string       = "{ propA:'dog' },{ propB:'cat' },{ propC:'hamster' }"; 
//  http://getfirebug.com or go home.
console.log( Lateral.toObject(string) );