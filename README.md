## jQuery Translate

I hate how no one uses CSS3 animations when using jQuery cause the damn animate method is so easy to just throw stuff at and have it work cross browser. But why dumb down modern browsers with TLBR stuff. Let move the web forward.

```javascript
$(ele).translate({
	x : "10px", // at current version this has to be a string with unit
	y : "10px",
	duration : 500
})
``` 
jQuery translate fallsback to `margin-top` and `margin-left` and it you need position absolute stuff just try adding in `fallback : "tlbr"`
