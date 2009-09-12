(function () {
  var ObjectLateral = function () {}, 
      Lateral;

  ObjectLateral.prototype = {
    /**
      Private Methods
    */
    _extend:   function(_obj, _new) { 
      for (var _n in _new) { 
        if (_new.hasOwnProperty(_n)) { 
          var _nProp  = _new[_n],
              _oProp  = _obj[_n]; 
        } 
        _obj[_n] = (_oProp && typeof _nProp == 'object' && typeof _oProp == 'object') ? 
                      this.merge(_oProp, _nProp) : _nProp; 
      } 
      return _obj; 
    },   
    _parser:  function  (_str) {
      //  Even scarier then before.
      var _arr  = eval('[' + _str + ']'), 
          _ret  = {};       
      
      for ( var i = 0, _len = _arr.length; i < _len; i++ ) {
        this._extend(_ret, _arr[i]);
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
var string       = "{ propA:'dog' },{ propB:'cat', bObj: { a: 'foo', b:'bar', c:'baz' } },{ propC:'hamster', methodA: function() { return 'a method' } }"; 
//  http://getfirebug.com or go home.
console.log( Lateral.toObject(string) );