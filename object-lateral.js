(function () {
  var ObjectLateral = function () {}, 
      Lateral;

  ObjectLateral.prototype = {
    /**
      Private Methods
    */
    _inArray: function( arg, _a ) {
      for ( var i = 0, _len = _a.length; i < _len; i++ ) {
        if ( _a.indexOf(arg) >= 0 ) {
          return true; // || index?
        }        
      }
      return false;
    },
    
    _unique: function(_a) {
      var _r = [];

      for ( var i = 0, _len = _a.length; i < _len; i++ ) {
        if ( !$._inArray(_a[i], _r) ) {
          _r.push(_a[i]);
        }          
      }        
      return _r;
    },
    _merge: function( _a, _b ) {
      var i = 0, _len = _b.length;

      for ( ; i < _len ; i++ ) {
        _a.push(_b[i]);
      }
      return this._unique(_a);
    },
    _extend:   function(_obj, _new) { 
      for (var _n in _new) { 
        if (_new.hasOwnProperty(_n)) { 
          var _nProp  = _new[_n],
              _oProp  = _obj[_n]; 
        } 
        _obj[_n] = (_oProp && typeof _nProp == 'object' && typeof _oProp == 'object') ? 
                      this._merge(_oProp, _nProp) : _nProp; 
      } 
      return _obj; 
    },   
    _parser:  function  (_str) {
      //  Even scarier then before.
      var _arr  = eval('[' + _str + ']'), 
          _len  = _arr.length, 
          i     = 0, 
          _ret  = {};       

      for ( ; i < _len; i++ ) {
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
//  A string... Pointlessly formatted as JSON... But who cares, its just for fun right?
//  after all, this is just a crummy json parser wanna-be.
var string       = "{ A: { pet:'dog', aArr: ['i', 'am', 'an', 'array'] }, B:{ pet:'cat', bObj: { a: 'foo', b:'bar', c:'baz' } },C:{ pet:'dinosaur', methodA: function() { return 'a method' } }}"; 
//  http://getfirebug.com or go home.
console.log( Lateral.toObject(string) );