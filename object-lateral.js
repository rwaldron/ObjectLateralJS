(function () {
  var ObjectLateral = function () {}, 
      Lateral;

  ObjectLateral.prototype = {
    /**
      Private Methods
    */
    _inArray: function( arg, _arr ) {
      var i = 0, _len = _arr.length;
      for ( ; i < _len; i++ ) {
        if ( _arr.indexOf(arg) >= 0 ) {
          return true; // || index?
        }        
      }
      return false;
    },
    _unique: function(_arr) {
      var i = 0, _len = _arr.length, _ret = [];
      for ( ; i < _len; i++ ) {
        if ( !this._inArray(_arr[i], _ret) ) {
          _ret.push(_arr[i]);
        }          
      }        
      return _ret;
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
      var _arr  = eval('[' + _str + ']'), i = 0, _len = _arr.length, _ret  = {};  
      //  It's especially great because it doesnt waste ANY time checking ANYTHING ;)

      for ( ; i < _len; i++ ) {
        this._extend(_ret, _arr[i]);
      }
      return _ret;
    },
    /**
      Public Methods
    */
    //  Convert a string into an object... duh.
    toObject: function (_str) {
      return this._parser(_str);
    },
    //  Merge two objects... n00b.
    extendLaterals: function(_objA, _objB) {
      return this._extend(_objA, _objB);
    },
    eventLateral:   function (_evt, _el, _obj) {
      //maybe this could suck less...
      var siblings  = _el.parentNode.childNodes, 
          i         = 0, 
          _len      = siblings.length, 
          _lateralTag   = _el.tagName;
      
      
      for(  ; i<_len; i++) {
        if ( _lateralTag == siblings[i].tagName) {
          siblings[i].addEventListener(_evt, function (e) {
            if ( e.target.tagName == _el.tagName && e.target !== _el ) {
              this.lateral  = objectA;
              
              //  This crap is for demo purpose only. whatever.
              console.group('Object laterally passed to:');
              console.log(this);
              console.log('Right click the above element and click "Inspect in DOM tab, scroll down to the "lateral" member');
              console.log(this.lateral);
              console.log('Click the element above to view the contents of the "lateral" member in the DOM tab');
              //console.log('Right click the above element and click "Inspect in DOM tab, scroll down to the "lateral" member');
              console.groupEnd();
            }
    
          }, false);
          
        }
      }
    },
    toss: function (_evt, _el, _obj) {
      return this.eventLateral(_evt, _el, _obj);
    }
  };
  window.Lateral = new ObjectLateral();
})();

//  USAGE:
//  A string... Pointlessly formatted as JSON... But who cares, its just for fun right?
//  after all, this is just a crummy json parser wanna-be.
var string       = "{ A: { pet:'dog', aArr: ['i', 'am', 'an', 'array'] }, B:{ pet:'cat', bObj: { a: 'foo', b:'bar', c:'baz' } },C:{ pet:'dinosaur', cMeth: function() { return 'a method' } }}"; 
//  http://getfirebug.com or go home.
console.log( Lateral.toObject(string) );


NEW:
var objectA = { foo:'bar' }, 
    objectB = { zoo:'baz' };

console.log( Lateral.extendLaterals(objectA, objectB) );


NEWER:
document.addEventListener('DOMContentLoaded', function () {
  
  var pres  = document.getElementsByTagName('pre');
  for( var i = 0, _len = pres.length; i<_len; i++ ) {
    Lateral.eventLateral('click', pres[i], objectA);
  }
}, false);

console.log('Click anywhere in the light blue code sections to pass some objects around laterally!');