(function($, exports){
  
  var Translate = function(context){
    if(!(this instanceof Translate)){
      return new Translate(context);
    }
    this.prefix = function(property){
      var 
        ele = document.body || document.documentElement,
        style = ele.style,
        vendors = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];

      if(typeof style[property] === "string"){
        return property; // return property its good
      }

      property = property.charAt(0).toUpperCase() + property.substr(1);

      for(var i = 0; i < vendors.length; i += 1){
        if(typeof style[vendors[i] + property] === "string"){
          return vendors[i] + property; // return prefixed property
        }
      }

      return null;
    };
    this.transition = this.prefix("transition");
    this.transform = (this.transition) ? this.prefix("transform") : null;
    this.mover = (this.transition) ? "css" : "animate";
    this.prefixed = (this.transition) ? 
      "-" + this.transform.split(/tran/i).join("-tran").toLowerCase() : 
      null;
    this.Duration = function(duration){
      if(this.transition){
        return (duration / 1000) + "s";
      }
      return duration;
    };
    this.Css = function(options){

      var obj = {};
      // transform
      // translate(0, 0);
      if(!options.x){
        options.x = 0;
      }

      if(!options.y){
        options.y = 0;
      }
      // setting x value
      obj[(this.transform) ? 
        // falling back
        this.transform : 
        (options.fallback === "tlbr") ?
        "left" :
        "margin-left"
      ] = ( (this.transform) ? "translate(" : "" ) + options.x;

      // setting y value
      if(this.transform){
        obj[this.transform] +=  ", " + options.y + ")";
      } else {
        obj[(options.fallback === "tlbr") ?
          "top" :
          "margin-top"
        ] = options.y;
      }

      if(this.transition){
        obj[this.transition] = this.prefixed + " " + 
          ((options.duration) ? this.Duration(options.duration) : ".5s");
      }

      return obj;
    };

    if(context && context() instanceof jQuery){
      var that = this;
      return function( options ){

        if ( 'number' === typeof arguments[1] ) {
          options.duration = arguments[1];
        }

        var ele = $(this),
          css = that.Css(options),
          callback,
          obj = {};

        if ( 'function' === typeof arguments[2] ) {
          callback = arguments[2];
        }

        ele[that.mover](css, options.duration, callback)
          .one(
            "transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd",
            function ( ) {
              obj[that.transition] = "none";
              ele.css(obj);
              if ( callback ) callback( );
          });
        return this;
      };
    }
    return this;
  };

  exports._Translate = Translate;
  $.fn.translate = Translate($);

}(jQuery, this));