## jQuery Translate

[![Greenkeeper badge](https://badges.greenkeeper.io/jcblw/jquery-translate.svg)](https://greenkeeper.io/)

I hate how no one uses CSS3 animations when using jQuery cause the damn `animate` method is so easy to just throw stuff at and have it work cross browser. But why dumb down modern browsers with TLBR stuff. Lets move the web forward.

## Usage

```javascript
$( ele ).translate(
	{
		x : '20px', // x coordinate
		y : '20px'	// y coordinate
		// z coordinate not yet supported
		// currently only string values are supported
	}, 
	1000, // duration
	function ( ) { // callback after animation
		console.log( 'Animation Done' )
	}
);
```

callback after animation, this is a callback that will fire after the animation has ran.

## Fallback

jQuery translate fallsback to `margin-top` and `margin-left` and it you need position absolute stuff just try adding in `fallback : "tlbr"`
