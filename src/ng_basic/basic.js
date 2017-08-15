/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

/** 
 *  Variable: ngLibsURL
 *  Default main URL location of the libraries. 
 *  If not specified the URL is automaticaly detected based on location of ng_basic 
 *  library or controls.js script.
 */  
//var ngLibsURL;

/**
 *  Variable: ngHTTPProtocol
 *  Used protocol (http:// or https://).
 */
var ngHTTPProtocol='http://';

/**
 *  Variable: ngEmptyURL
 *  URL to non-existent content. 
 *   
 *  Usually used for reseting image URL.
 *   
 *  Default value: ngLibPath('ng_basic', 'empty.gif?nop');
 */ 

var ua=navigator.userAgent.toLowerCase();

/** 
 *  Variable: ngOpera
 *  TRUE if user is using the Opera browser.
 */  
var ngOpera = (ua.indexOf("opera") != -1);

/** 
 *  Variable: ngOperaVersion
 *  Float number identifying Opera browser version
 */
var ngOperaVersion = (ngOpera ? parseFloat(window.opera.version()) : undefined);

/** 
 *  Variable: ngIExplorer
 *  TRUE if user is using the Internet Explorer browser.
 */  
var ngIExplorer = eval("/*@cc_on!@*/false"); 
/** 
 *  Variable: ngIExplorerVersion
 *  Version of the Internet Explorer browser.
 */  
var ngIExplorerVersion = (ngIExplorer ? parseInt( ua.match( /msie (\d+)/ )[1] ) : undefined);

if((!ngIExplorer)&&(ua.match(/trident/))) // IE>=11 detection
{
  var v=ua.match( /rv\:(\d+)/ );
  if(!v) v=ua.match( /msie (\d+)/ );
  if(v)
  {  
    ngIExplorer = true;
    ngIExplorerVersion = parseInt(v[1]);
  }
}

/** 
 *  Variable: ngIExplorer6
 *  TRUE if user is using the Internet Explorer version 6 or lower.
 */  
var ngIExplorer6 = ngIExplorer && ( ngIExplorerVersion < 7 ); 

/**
 *  Variable: ngEdge
 *  TRUE if user is using the Microsoft Edge browser.
 */
var ngEdge = (ua.indexOf("edge") != -1);

/**
 *  Variable: ngEdgeVersion
 *  Version of the Microsoft Edge browser.
 */
var ngEdgeVersion = (ngEdge ? parseInt( ua.match( /edge\/(.*)$/ )[1] ) : undefined);

/** 
 *  Variable: ngFireFox
 *  TRUE if user is using the Firefox browser.
 */  
var ngFireFox = (ua.indexOf("firefox") != -1);
/** 
 *  Variable: ngFireFoxVersion
 *  Version of the Firefox browser.
 */  
var ngFireFoxVersion = (ngFireFox ? parseInt( ua.match( /firefox\/(.*)$/ )[1] ) : undefined);

/** 
 *  Variable: ngFireFox1x
 *  TRUE if user is using the Firefox browser version 1.x.
 */  
var ngFireFox1x = ((ngFireFox)&&(ua.indexOf("firefox/1.")!=-1));
/** 
 *  Variable: ngFireFox2x
 *  TRUE if user is using the Firefox browser version 2.x.
 */  
var ngFireFox2x = ((ngFireFox)&&(ua.indexOf("firefox/2.")!=-1));
/** 
 *  Variable: ngChrome
 *  TRUE if user is using the Chrome browser.
 */  
var ngChrome = (ua.indexOf("chrome") != -1);
/** 
 *  Variable: ngSafari
 *  TRUE if user is using the Safari browser.
 */  
var ngSafari = (ua.indexOf("safari") != -1);
/** 
 *  Variable: ngAndroid
 *  TRUE if device uses Android OS.
 */  
var ngAndroid = (ua.indexOf("android") != -1);
/** 
 *  Variable: ngiOS
 *  TRUE if device uses Apple iOS.
 */  
var ngiOS = ( ua.match(/(ipad|iphone|ipod)/g) ? true : false );
/** 
 *  Variable: ngWindowsPhone
 *  TRUE if device uses Windows Phone OS.
 */  
var ngWindowsPhone = (ua.indexOf("windows phone") != -1);
/** 
 *  Variable: ngFireFoxOS
 *  TRUE if device uses FireFox OS.
 */  
var ngFireFoxOS = ngFireFox && (ua.indexOf("mobile") != -1);
/** 
 *  Variable: ngCordova
 *  TRUE if running inside Apache Cordova (PhoneGap)
 */  
var ngCordova = (typeof window.cordova !== 'undefined');
/** 
 *  Variable: ngWinStoreApp
 *  TRUE if running as Windows Store App
 */  
var ngWinStoreApp = (typeof Windows !== 'undefined');
/** 
 *  Variable: ngSupportsTouch
 *  TRUE if browser supports touch.
 */  
var ngSupportsTouch = ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch) || navigator.msMaxTouchPoints ? true : false);
/** 
 *  Variable: ngUsingTouch
 *  TRUE if user uses touch as a primary input.
 */  
var ngUsingTouch = (ngSupportsTouch)&&(ngAndroid || ngiOS || ngWindowsPhone || (ua.indexOf("mobile") != -1) || (ua.indexOf("tablet") != -1));
/** 
 *  Variable: ngFirebug
 *  TRUE if Firebug present (useful for debug informations).
 */  
var ngFirebug = !!(window.console && (window.console.firebug || window.console.exception));

/** 
 *  Section: Debug Functions  
 */
var ngDEBUG = (typeof ngDEBUG === 'undefined' ? 0 : ngDEBUG);

/** 
 *  Function: ngASSERT
 *  Checks the given assertion and displays description if assertion is FALSE and debug is enabled.
 *  
 *  Syntax:
 *    void *ngASSERT* (bool assertion [, mixed description])
 *  
 *  Parameters:
 *    assertion - if FALSE the description is displayed  
 *    description - description to be displayed
 *        
 *  Returns: 
 *    -
 */  
var ngASSERT;

/** 
 *  Function: ngDEBUGLOG
 *  Displays log message in console if debug is enabled.
 *  
 *  Syntax:
 *    void *ngDEBUGLOG* (args)
 *    
 *  Returns:
 *    -   
 */ 
var ngDEBUGLOG;
/** 
 *  Function: ngDEBUGWARN
 *  Displays warning message in console if debug is enabled.
 *  
 *  Syntax:
 *    void *ngDEBUGWARN* (args)
 *    
 *  Returns:
 *    -   
 */ 
var ngDEBUGWARN;
/** 
 *  Function: ngDEBUGERROR
 *  Displays error message in console if debug is enabled.
 *  
 *  Syntax:
 *    void *ngDEBUGERROR* (args)
 *    
 *  Returns:
 *    -   
 */ 
var ngDEBUGERROR;

(function() {
  if((ngDEBUG)&&(typeof console!=='undefined')) {
    var c=console;
    function bind(f, thisArg) {
      if ((typeof f.bind === 'undefined') || (typeof f.bind === 'unknown')) { // IE < 10
        if(typeof Function.prototype.bind === 'function') 
          return Function.prototype.bind.call(f, thisArg);
        else 
          return f;
      }
      else
        return f.bind(thisArg);
    }
    ngDEBUGLOG=bind(c.log, c);
    ngDEBUGWARN=bind(c.warn, c);
    ngDEBUGERROR=bind(c.error, c);
  
    if(c.assert) ngASSERT=bind(c.assert,c);
    else 
    {
      ngASSERT=function(cond,msg) {
        if(!cond) ngDEBUGERROR('Assertion failed' + (typeof msg==='undefined' ? '' : ': '+msg));
      }
    }
  }
  else
  {
    ngDEBUG=0;
    function nop() { };
    
    ngASSERT=nop;
    ngDEBUGLOG=nop;
    ngDEBUGLOGEX=nop;
    ngDEBUGWARN=nop;
    ngDEBUGERROR=nop;
  }
  if(typeof window.cl === 'undefined') window.cl = ngDEBUGLOG;  //Alias for console.log();
})();

/** 
 *  Function: ngHASDEBUG
 *  Tests if debug is enabled.   
 *  
 *  Syntax:
 *    mixed *ngHASDEBUG* ()
 *  
 *  Returns: 
 *    Debug state (0=disabled).
 */  
function ngHASDEBUG() {
  return ngDEBUG;
}

/** 
 *  Section: Helper Functions  
 */

/** 
 *  Function: ngHammerJS
 *  Checks if HammerJS library is present.  
 *  
 *  Syntax:
 *    bool *ngHammerJS* ()
 *  
 *  Returns: 
 *    TRUE if HammerJS library is present.
 */  
function ngHammerJS()
{
  return (typeof Hammer === 'function')&&((typeof ngHammerJSDisabled === 'undefined')||(!ngHammerJSDisabled))&&((!ngIExplorer)||(ngIExplorerVersion>=9))&&((!ngOpera)||(ngOperaVersion>=10.5));
}

/**
 *  Function: ngHammerJSVer
 *  Gets HammerJS library major version.
 *
 *  Syntax:
 *    integer *ngHammerJSVer* ()
 *
 *  Returns:
 *    HammerJS library major version number or undefined if HammerJS is not present.
 */
function ngHammerJSVer()
{
  if(ngHammerJS()) return parseInt(Hammer.VERSION,10);
}

var ngPointerStartEvents;

/** 
 *  Function: ngPtrStartEvents
 *  Gets input pointer start events (mousedown, touchstart, ...).   
 *  
 *  Syntax:
 *    array *ngPtrStartEvents* ()
 *  
 *  Returns: 
 *    List of supported events.
 */  
function ngPtrStartEvents()
{
  if(typeof ngPointerStartEvents === 'undefined')
  {
    if(ngHammerJSVer()===1) // HammerJS library v1.x is present
    {  
      if(!Hammer.READY) Hammer.event.determineEventTypes();
      ngPointerStartEvents=Hammer.EVENT_TYPES[Hammer.EVENT_START].split(' ');
    }
    else ngPointerStartEvents=['mousedown'];
  }
  return ngPointerStartEvents;
}

/** 
 *  Function: ngPtrHTMLStartEvents
 *  Renders supported pointer start events as HTML (onmousedown, ontouchstart, ...).   
 *  
 *  Syntax:
 *    mixed *ngPtrHTMLStartEvents* (mixed html, string event)
 *  
 *  Parameters:
 *    html - string or ngStringBuilder object
 *    event - event code as text
 *        
 *  Returns: 
 *    Rendered html.
 */  
function ngPtrHTMLStartEvents(html,ev)
{
  var evs=ngPtrStartEvents();
  if(ng_IsObjVar(html))
  {
    if((html)&&(html.append))
      for(var i=0;i<evs.length;i++)
        html.append(' on'+evs[i]+'="'+ev+'"');
  }
  else
    for(var i=0;i<evs.length;i++)
      html+=' on'+evs[i]+'="'+ev+'"';
  return html;
}

/**
 *  Variable: ngURLParams
 *  Parsed URL parameters. 
 *  Use function <ng_GET> to get values of parameters.
 */    
var ngURLParams = {};
var ngURLParamsParsed=false;

/** 
 *  Variable: ngURLDefaultEscaping
 *  Defines default URL escaping scheme.
 *  
 *  Constants:
 *    URL_ESCAPING_UTF8 - standard UTF-8 URL escaping (default)
 *    URL_ESCAPING_UNICODE - UNICODE URL escaping (uses %uXXXX)
 */ 
var ngURLDefaultEscaping = (typeof ngURLDefaultEscaping !== 'undefined' ? ngURLDefaultEscaping : 0);

var URL_ESCAPING_UTF8    = 0;
var URL_ESCAPING_UNICODE = 1;

/**
 * Variable: ngURLSafeChars
 * URL safe chars.
 * These characters aren't encoded in function <ng_URLEncode>.
 */
var ngURLSafeChars = { 45:1,46:1,95:1,126:1 };

/**
 * Variable: ngHashSafeChars
 * Hash(fragment) safe chars
 * These characters aren't encoded in function <ng_HashEncode>.
 */
var ngHashSafeChars = { 33: 1, 36: 1, 95: 1, 39: 1, 40: 1, 41: 1, 42: 1, 44: 1, 45: 1, 46: 1,
                        38: 1, 47: 1, 58: 1, 59: 1, 126:1 };                     
    
/**
 *  Class: ScreenPt
 *  This class represents screen point.  
 *  
 *  Syntax:
 *    new *ScreenPt* (int posx, int posy);
 */
/*
 *  Group: Properties
 */  
/*  Variable: x
 *  Screen X coordinate.
 */
/*  Variable: y
 *  Screen Y coordinate.
 */

function ScreenPt(posx, posy) {
  this.x=posx;
  this.y=posy;
}

/**
 *  Function: ngVal
 *  Substitutes undefined values with defaults.   
 *  
 *  Syntax:
 *    mixed *ngVal* (mixed val, mixed defval)
 *     
 *  Parameters: 
 *    val - value to be checked
 *    defval -  default value if val is undefined
 *    
 *  Returns:
 *    Function returns defval if type of val is undefined.  
 */               
function ngVal(v, defv)
{
  return (v === void 0 ? defv : v);
}

/**
 *  Function: ngNullVal
 *  Substitutes undefined or null values with defaults.   
 *  
 *  Syntax:
 *    mixed *ngNullVal* (mixed val, mixed defval)
 *     
 *  Parameters: 
 *    val - value to be checked
 *    defval -  default value if val is undefined
 *    
 *  Returns:
 *    Function returns defval if type of val is undefined or if val is null  
 */               
function ngNullVal(v, defv)
{
  return ((v === void 0) || (v === null) ? defv : v);
}

/**
 *  Function: ngLibPath
 *  Gets client library path.
 *  
 *  Syntax: string *ngLibPath* (string lib [, string file])
 *  
 *  Returns: 
 *    Client library path.         
 */
function ngLibPath(lib,file)
{
  if(lib=='') return ngVal(file,'');
  if(ng_IsFullURL(file)) return file;
  file=ngVal(file,'');
  if(file.charAt(0)==='/') file=file.substr(1);

  lib=lib.toLowerCase();
  var l=(ng_IsObjVar(window.ngLib) ? window.ngLib[lib] : null);

  var path;
  var url='';

  if(ng_IsObjVar(l)) {
    if(ng_IsFullURL(l.path))
    {
      url=l.path;
      path='';
    }
    else {
      path=ngVal(l.path,'');
      if(path.charAt(0)==='/') {
        if(typeof l.URL !== 'undefined') {
          url = l.URL;
          path=path.substr(1);
        }
      }
      else {
        url=ngVal(l.URL,ngLibsURL);
      }
    }
  }
  else {
    url = ngLibsURL;
    path=lib+'/';
  }

  if((url)&&(url.length>0)&&(url.charAt(url.length-1)!=='/')) {
    url+='/';
  }

  return ng_URL(url+path+file);
}

/**
 *  Function: ngLibVersion
 *  Gets client library version.
 *  
 *  Syntax: mixed *ngLibVersion* (string id)
 *  
 *  Returns: 
 *    Used library version or FALSE if library is not found.         
 */
function ngLibVersion(lib)
{
  if((lib=='')||(typeof ngLib === 'undefined')) return false;
  lib=lib.toLowerCase();
  var l=ngLib[lib];
  if(!ng_IsObjVar(l)) return false;
  return ngVal(l.version,false);                                 
} 
 
function ng_SetLibsURL(path)
{ 
  if(path!='')
  {
    if(path.charAt(path.length-1)==='/') path=path.substring(0,path.length-1);
    if(ngEmptyURL.substring(0,ngLibsURL.length)==ngLibsURL) {
      ngEmptyURL=ng_URL(path+ngEmptyURL.substring(ngLibsURL.length,ngEmptyURL.length));
    }
    ngLibsURL=path;
  }
}

function ng_DetectLibsURL()
{
  if((typeof ngLib!=='object')||(!ngLib)) ngLib={};

  if((typeof ngLib['controls.js'] === 'undefined')
    &&(typeof ngLib['ng_basic'] === 'undefined'))
  {
    // no paths, try detect library paths from loaded scripts
    var scripts=document.getElementsByTagName("script");
    function setlibpath(lib,path)
    {
      if(typeof ngLib[lib] !== 'undefined') return;
      var l={};
      if(ng_IsFullURL(path)) { l.URL=path; l.path=''; }
      else { l.path=path; l.URL=''; }
      ngLib[lib]=l;
    }

    function detect(type)
    {
      var idx=-1,s;
      for(var i=0;i<scripts.length;i++)
      {
        s=scripts[i].src;
        if(ngVal(s,'') == '') continue;
        switch(type)
        {
          case 0:
          case 3: 
            // Check if standalone libraries are used
            idx=s.indexOf(type===0 ? "/ng_controls/" : "/ng_basic/");
            if(idx>=0)
            {
              if(typeof ngLibsURL === 'undefined') ngLibsURL=s.substring(0,idx+1);
              return true;
            }
            break;
          case 4:
          case 5:
            // Check ng_basic library files
            idx=s.indexOf(type===4 ? "basic.js" : "empty.js");
            if(idx>=0) {
              setlibpath('ng_basic', s.substr(0,idx));
              return true;
            }
            break;
          case 1:
            // Check controls*.js file usage
            idx=s.lastIndexOf('#');
            if(idx>=0) s=s.substr(0,idx);
            idx=s.lastIndexOf('?');
            if(idx>=0) s=s.substr(0,idx);

            idx=s.lastIndexOf("controls");
            if(idx>=0) {
              var jidx=s.indexOf(".js",idx);
              if(jidx<0) break;
              if(s.substr(idx,jidx).indexOf('/')>=0) break;
              s=s.substr(0,idx);
              if(s.substr(s.length-7,7)==='/debug/') s=s.substr(0,s.length-7);
              if(s.substr(s.length-9,9)==='/release/') s=s.substr(0,s.length-9);
              setlibpath('controls.js', s.substr(0,idx));
              return true;
            }
            break;
          case 2:
            // Check if apploader is used (Position specific)
            idx=s.indexOf("apploader=");
            if(idx>=0) {
              if(typeof ngLibsURL === 'undefined') {
                idx=s.lastIndexOf("/",idx);
                if(idx>0) ngLibsURL=s.substring(0,idx+1)+'libs/';
              }
              return true;
            }
            break;
        }
      }
      return false;
    }
    for(var i=0;i<6;i++)
      if(detect(i)) break;
  }

  // Set path if running as part of Controls.js library
  var lib=ngLib['controls.js'];
  if((typeof lib==='object')&&(lib)) {
    var l={ path: lib.path+(ngDEBUG ? 'debug' : 'release')+'/libs/ng_basic/' };
    if(typeof lib.URL!=='undefined') l.URL=lib.URL;
    ngLib['ng_basic']=l;
  }

  if(typeof ngLibsURL === 'undefined') ngLibsURL='libs/'; // not found :(, use default path
}

var ngPreloadedImages={};
var ngPreloadImgCnt=0;
var ngPreloadImgCallback=null;

/**
 *  Function: ng_PreloadImage
 *  Pre-loads image into browser's memory.  
 *  
 *  If image was already pre-loaded the function simply returns existing 
 *  reference to the image class.  
 *    
 *  Syntax:
 *    image *ng_PreloadImage* (string url)
 *     
 *  Parameters: 
 *    url - image URL
 *    
 *  Returns:
 *    The image class (created by *new Image*) of the pre-loaded image.  
 */               
function ng_PreloadImage(url) 
{ 
  var i=ngPreloadedImages[url];
  if(typeof i === 'undefined')
  {
    i=new Image; 
    i.onload=ng_PreloadImgDone;
    i.onfailure=ng_PreloadImgDone
    i.onerror=ng_PreloadImgDone;
    ngPreloadImgCnt++; 
    ngPreloadedImages[url]=i;
    i.src=ng_URL(url); 
  } 
  return i;
}

function ng_PreloadImgDone()
{
  ngPreloadImgCnt--;
  if((ngPreloadImgCnt<=0)&&(typeof ngPreloadImgCallback === 'function')) 
  { 
    ngPreloadImgCnt=0;
    var f=ngPreloadImgCallback; 
    ngPreloadImgCallback=null;
    f();
  }
}

/**
 *  Function: ng_PreloadImagesBegin
 *  Starts preloading images block.    
 *  
 *  Syntax:
 *    void *ng_PreloadImagesBegin* ()
 *     
 *  Returns:
 *    -  
 *    
 *  See also:
 *    <ng_PreloadImagesEnd>, <ng_PreloadImage>
 */               
function ng_PreloadImagesBegin()
{
  ngPreloadImgCnt++;
}

/**
 *  Function: ng_PreloadImagesEnd
 *  Ends preloading images block and call callback function after all images are loaded.    
 *  
 *  Syntax:
 *    void *ng_PreloadImagesEnd* ([function callback])
 *     
 *  Parameters:
 *    callback - callback function called after all images loaded via <ng_PreloadImage> are loaded into browser
 *       
 *  Returns:
 *    -  
 *    
 *  See also:
 *    <ng_PreloadImagesBegin>, <ng_PreloadImage>   
 */               
function ng_PreloadImagesEnd(callback)
{
  ngPreloadImgCallback=ngAddEvent(ngPreloadImgCallback,callback);
  ng_PreloadImgDone();
}

/**
 *  Function: ng_ReloadImage
 *  Re-loads image in browser's memory.  
 *  
 *  Instead of <ng_PreloadImage> this function always creates new image class.
 *    
 *  Syntax:
 *    image *ng_ReloadImage* (string url)
 *     
 *  Parameters: 
 *    url - image URL
 *    
 *  Returns:
 *    The image class (created by *new Image*) of the loaded image.  
 */               
function ng_ReloadImage(url) 
{
  delete ngPreloadedImages[url];
  return ng_PreloadImage(url); 
}

/**
 *  Function: ng_AddURLParam
 *  Adds new parameter(s) to URL.
 *   
 *  This function properly handles parameter separators (? or &).  
 *  
 *  Syntax:
 *    string *ng_AddURLParam* (string url, string param)
 *    
 *  Parameters:
 *    url - original URL
 *    param - parameter(s) to be added to original URL
 *        
 *  Returns:
 *    URL with parameters.
 */          
function ng_AddURLParam(url, param)
{
  if(url.indexOf('?')!=-1) url=url+'&';
  else url=url+'?';
  url=url+param;
  return url
}

/**
 *  Function: ng_StripURLParams
 *  Strip parameters from URL.
 *  
 *  Syntax:
 *    string *ng_StripURLParams* (string url)
 *    
 *  Parameters:
 *    url - original URL
 *        
 *  Returns:
 *    URL without parameters.
 */          
function ng_StripURLParams(url)
{
  var i=url.indexOf('?');
  if(i>=0) url=url.substr(0,i);
  i=url.indexOf('#');
  if(i>=0) url=url.substr(0,i);
  return url;
}

/**
 *  Function: ng_IsFullURL
 *  Tests if given URL is full-length URL.
 *
 *  Syntax:
 *    bool *ng_IsFullURL* (string url)
 *
 *  Parameters:
 *    url - test URL
 *
 *  Returns:
 *    TRUE if URL is full-length URL.
 */
function ng_IsFullURL(url)
{
  if((typeof url !== 'string')||(url=='')) return false;
  if(url.substr(0,2)==='//') return true;

  url=ng_StripURLParams(url);
  return (url.indexOf("://")>0);
}

/**
 *  Function: ng_IsAbsPath
 *  Tests if given URL path is an absolute path (full-length URL or starts with a slash).
 *
 *  Syntax:
 *    bool *ng_IsAbsPath* (string path)
 *
 *  Parameters:
 *    path - test path
 *
 *  Returns:
 *    TRUE if path is URL is full-length URL.
 */
function ng_IsAbsPath(path)
{
  if((typeof path !== 'string')||(path=='')) return false;
  var c=path.charAt(0);
  return ((c==='/')||(c==="\\")||(ng_IsFullURL(path)));
}

function ng_URLCWP(url)
{
  return ((url.substr(0,7)==='file://') || (!ng_IsFullURL(url)) ? ng_StripURLParams(url) : url); // WindowsPhone local file system URL's don't support URL parameters
}

function ng_URLStd(url) { return url; }

/**
 *  Function: ng_URL
 *  Handles platform specific URL.
 *  
 *  Syntax:
 *    string *ng_URL* (string url)
 *    
 *  Parameters:
 *    url - original URL
 *        
 *  Returns:
 *    Platform compatible URL.
 */          
var ng_URL = (ngCordova && ngWindowsPhone ? ng_URLCWP : ng_URLStd);

/**
 *  Function: ng_unescape
 *  JavaScript unescape with proper handling of plus (+) character.   
 *  
 *  Syntax:
 *    string *ng_unescape* (string str [, int escscheme])
 *    
 *  Parameters:
 *    str - string to be unescaped
 *    escscheme - escaping scheme (uses ngURLDefaultEscaping if not specified)   
 *    
 *  Returns:
 *    Unescaped string.      
 */ 
function ng_unescape(str,escscheme)
{
  if(typeof escscheme === 'undefined')
  {
    if(new RegExp('%u[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]').test(str)) escscheme=1; // %u detected, use UNICODE
    else escscheme=ngURLDefaultEscaping;
  }
  switch(escscheme)
  {
    case 0: // URL_ESCAPING_UTF8
      return ng_UTF8ParamDecode(str);
    case 1: // URL_ESCAPING_UNICODE
    	str=''+str;
      var i=str.indexOf('+');
    	while(i>=0)
    	{
    		str=str.substring(0,i)+'%20'+str.substring(i+1, str.length);
    		i=str.indexOf('+');
    	}
    	return unescape(str);
  }
  return str;	
}

/**
 *  Function: ng_htmlEncode
 *  Encodes special HTML characters (&, <, >, ") to its HTML form.
 *  
 *  Syntax:
 *    string *ng_htmlEncode* (string text [,bool replacecrlf=false])
 *    
 *  Parameters:
 *    text - text with special characters
 *    replacecrlf - if TRUE, function replaces CRLF (or CR or LF) with <br /> HTML tag 
 *    
 *  Returns:
 *    Text with encoded special HTML characters.
 */           
function ng_htmlEncode(s, replacecrlf) 
{
  var str = ''+s;
  if(str=='') return str;

  str = str.replace(/&/g, "&amp;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/"/g, "&quot;");
  if(ngVal(replacecrlf,false))
    str = str.replace(/\r\n|[\r\n]/g,"\<br /\>");
  return str;
} 

/**
 *  Function: ng_htmlDecode
 *  Decode special HTML characters and remove HTML tags (&amp;, &lt;, &gt;, &quot;) to its native form.
 *  
 *  Syntax:
 *    string *ng_htmlDecode* (string text [,bool replacecrlf=false, bool replacespaces=false])
 *    
 *  Parameters:
 *    text - text with HTML encoded characters
 *    replacecrlf - if TRUE replaces CRLF with spaces 
 *    
 *  Returns:
 *    Text with decoded characters.
 */           
function ng_htmlDecode(s, replacecrlf, replacespaces) 
{
  var str = ''+s;
  if(str=='') return str;

  str = str.replace(/\<\/div\>\</g, "</div>\n<"); // turn </div><...> to </div>CR<...>
  if(ngVal(replacecrlf,false)) {
    str = str.replace(/\r\n|[\r\n]/g," "); // CRLF
  }
  str = str.replace(/\<br(|[/ \t].*?)\>/g, "\n"); // <br>
  str = str.replace(/\<p.*?\>/g, "\n"); // <p>
  str = str.replace(/\<\/p\>/g, "\n\n"); // </p>
  str = str.replace(/\<.*?\>/g, ""); // remove all tags
  if(replacespaces) 
  {
    str = str.replace(/[ \t]*([\r\n])/g, "$1"); // srip lineend whitespace
    str = str.replace(/[ \t]+/g, " "); // replace multiple spaces
  }
  str = str.replace(/&amp;/g, "&");
  str = str.replace(/&lt;/g, "<");
  str = str.replace(/&gt;/g, ">");
  str = str.replace(/&quot;/g, "\"");
  str = str.replace(/&nbsp;/g, " ");
  return str;
} 

/**
 *  Function: ng_sprintf
 *  Formats string (PHP like sprintf function).
 *  
 *  Syntax:
 *    string *ng_sprintf* (string format [, mixed arg1, mixed arg2, ...])
 *    
 *  Parameters:
 *    format - text with format characters
 *    arg1..N - arguments 
 *    
 *  Returns:
 *    Formated text.
 */           
function ng_sprintf()
{
  if(!arguments || arguments.length < 1) return;
  
  var str = arguments[0];
  str=str.replace(/\n/g, '\\n');
  str=str.replace(/\r/g, '\\r');
  var re = /([^%]*)%('.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/;
  var a,b,percent, numSubstitutions = 0, numMatches = 0
  a = b = percent = [];
  while (a = re.exec(str))
  {
    var leftpart = a[1], pPad = a[2], pJustify = a[3], pMinLength = a[4];
    var pPrecision = a[5], pType = a[6], rightPart = a[7];
  
    numMatches++;
    if(pType == '%') { subst = '_'; percent[percent.length]=leftpart.length; padding=''; }
    else
    {
      numSubstitutions++;
      if (numSubstitutions >= arguments.length)
      {
        ngDEBUGERROR("Error! Not enough function arguments (" + (arguments.length - 1)
           + ", excluding the string) for the number of substitution parameters in string \""+arguments[0]+"\".");
        break;
      }
      var param = arguments[numSubstitutions];
      var pad = '';
      if (pPad && pPad.substr(0,1) == "'") pad = pPad.substr(1,1);
      else if (pPad) pad = pPad;
      var justifyRight = true;
      if (pJustify && pJustify === '-') justifyRight = false;
      var minLength = -1;
      if (pMinLength) minLength = parseInt(pMinLength);
      var precision = -1;
      if (pPrecision && pType == 'f') precision = parseInt(pPrecision.substring(1));
      var subst = param;
      switch (pType)
      {
        case 'b': subst = parseInt(param).toString(2); break;
        case 'c': subst = String.fromCharCode(parseInt(param)); break;
        case 'd': subst = parseInt(param) ? parseInt(param) : 0; break;
        case 'u': subst = Math.abs(param); break;
        case 'o': subst = parseInt(param).toString(8); break;
        case 's': subst = ('' + param).replace(/%/g, '%%'); break;
        case 'x': subst = ('' + parseInt(param).toString(16)).toLowerCase(); break;
        case 'X': subst = ('' + parseInt(param).toString(16)).toUpperCase(); break;
        case 'f':
          param=parseFloat(param);
          if(isNaN(param)) param=0;
          if (precision > -1)
          {
            var sig = (param<0) ? '-' : '';
            var tmp = Math.round(Math.abs(param) * Math.pow(10, precision)).toString();
            while(tmp.length<=precision) tmp='0'+tmp;
            subst = sig + tmp.substr(0, tmp.length - precision) + (precision > 0 ? '.' + tmp.substr(tmp.length - precision, precision) : '');
          }
          else
            subst = param;
          break;
      }
      var padLeft = minLength - subst.toString().length;
      if (padLeft > 0)
      {
        var arrTmp = new Array(padLeft+1);
        var padding = arrTmp.join(pad ? pad:' ');
      }
      else
      {
        var padding = '';
      }
    }
    str=leftpart+(justifyRight ? padding+subst : subst+padding)+rightPart;
  }
  for(var i=0;i<percent.length;i++)
    str=str.substring(0,percent[i])+'%'+str.substring(percent[i]+1,str.length);
  str=str.replace(/\\n/g, '\n');
  str=str.replace(/\\r/g, '\r');
  return str;
}

/**
 *  Function: ng_URLEncode
 *  Encodes special characters in URL.
 *  
 *  Function also properly handles UTF-8 characters (>255).
 * 
 *  Syntax:
 *    string *ng_URLEncode* (string url [, bool allasunicode=false, array safechars, int escscheme ])
 *    
 *  Parameters:
 *    url - url to be encoded
 *    allasunicode - encode all characters as UNICODE (applicable only if escscheme is URL_ESCAPING_UNICODE)
 *    safechars - list of characters which are not encoded
 *    escscheme - escaping scheme (uses ngURLDefaultEscaping if not specified)   
 *    
 *  Returns:
 *    URL with encoded characters.
 */            
function ng_URLEncode(str,allasunicode,safechars,escscheme) 
{ 
  var res=''; 
  str=''+str;
  switch(ngVal(escscheme,ngURLDefaultEscaping))
  {
    case 0: // URL_ESCAPING_UTF8
      res=ng_UTF8Encode(str,safechars);
      break;
    case 1: // URL_ESCAPING_UNICODE
      var len = str.length; 
      var charOrd;
      var hexValStr;
      
      if(typeof safechars === 'undefined')
        safechars = ngURLSafeChars;
       
      allasunicode=ngVal(allasunicode,false);
        
      for(var i = 0; i < len; i++) 
      { 
        charOrd = str.charCodeAt(i);
        if ((charOrd >= 65 && charOrd <= 90) || (charOrd >= 97 && charOrd <= 122) || (charOrd >= 48 && charOrd <= 57) || (safechars[charOrd])) 
        {
          res += str.charAt(i); 
        } 
        else 
        { 
          if (charOrd==37) { res +='%u0025'; continue; } // %
          if(allasunicode)
          {
            res += '%u';
            if (charOrd <= 255) res+='00'; 
          }
          else
          {
            res += '%'; 
            if (charOrd > 255) res += 'u';
          } 
          hexValStr = charOrd.toString(16); 
          if ((hexValStr.length) % 2 == 1) hexValStr = '0' + hexValStr; 
          res += hexValStr; 
        } 
      }
      break;
    default:
      res=str;
      break;
  } 
  return res;
}

/**
 *  Function: ng_HashEncode
 *  Encodes special characters in hash(fragment) part of URL.
 * 
 *  Syntax:
 *    string *ng_HashEncode* (string s [, array safechars, int escscheme ])
 *    
 *  Parameters:
 *    s - string to be encoded
 *    safechars - list of characters which are not encoded
 *    escscheme - escaping scheme (uses ngURLDefaultEscaping if not specified)   
 *    
 *  Returns:
 *    Encoded string.
 */            
function ng_HashEncode(s,safechars,escscheme)
{
  return ng_URLEncode(s,true,ngVal(safechars,ngHashSafeChars),escscheme);
}

/*
 * hex/dec encoding helpers 
 */ 
var utf8_decToHexChar=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
var utf8_charCodeToDec={48:0,49:1,50:2,51:3,52:4,53:5,54:6,55:7,56:8,57:9,65:10,66:11,67:12,68:13,69:14,70:15,97:10,98:11,99:12,100:13,101:14,102:15};

function utf8_decToStrHex(dec) { 
  return utf8_decToHexChar[dec >> 4] + utf8_decToHexChar[dec & 0xF]; 
} 

function utf8_strHexToDec(s, i) {
  if (s.charCodeAt(i)==37) { // percent encoded char
    var h1=utf8_charCodeToDec[s.charCodeAt(++i)];
    if (typeof h1 != 'undefined') {
      var h2=utf8_charCodeToDec[s.charCodeAt(++i)];
      if (typeof h2 !== 'undefined') return ((h1<<4)+h2);
    }
  }
  return 0; // non-encoded char
}

/**
 *  Function: ng_UTF8Encode
 *  Encodes characters in url to utf-8 representation.
 *  
 *  Syntax:
 *    string *ng_UTF8Encode* (string url)
 *    
 *  Returns:
 *    URL with encoded characters.
 */            
function ng_UTF8Encode(str,safechars) {
  var len = str.length; 
  var res = new String();
  var chEn = new String();
  var charOrd = new Number(); 
  var pos = 0;

  if(typeof safechars === 'undefined')
    safechars = ngURLSafeChars;

  for(i=0; i<len; i++) {
    charOrd = str.charCodeAt(i);
    if ((charOrd >= 65 && charOrd <= 90) || (charOrd >= 97 && charOrd <= 122) || (charOrd >= 48 && charOrd <= 57) || (safechars[charOrd])) 
      continue;

    if(charOrd<128) chEn = '%'+ utf8_decToStrHex(charOrd); //reserved chars, percent encoded 
    else if(charOrd<2048) { //128 .. 2047 - 11 bit number, 2 byte UTF-8 starting with %C
      chEn = '%'+utf8_decToStrHex((charOrd >> 6) | 0xC0); //First byte: 110x.xxx (C and first 5bits in charOrd)
      chEn +='%'+utf8_decToStrHex((charOrd & 0x3F) | 0x80); //Second byte: 10xx.xxxx ("10" signature and rest 6 bits in charOrd) 
    }
      else if(charOrd<65536) { //2048 .. 65535 - 16 bit number, 3 byte UTF-8 starting with %E
        chEn = '%'+utf8_decToStrHex((charOrd >> 12) | 0xE0); //First byte: 1110.xxxx (E and first 4bits in charOrd)
        chEn +='%'+utf8_decToStrHex(((charOrd >> 6) & 0x3F) | 0x80); //Second byte: 10xx.xxxx (following 6 bits) 
        chEn +='%'+utf8_decToStrHex((charOrd & 0x3F) | 0x80); //Third byte: 10xxxxxx (last 6 bits) 
      }
        else { // 65536 .. 4194303 - 22 bit number, 4 byte UTF-8 starting with %F
          chEn = '%'+utf8_decToStrHex((charOrd >> 18) | 0xF0); //First byte: 1110.xxxx (F and first 4bits in charOrd)
          chEn +='%'+utf8_decToStrHex(((charOrd >> 12) & 0x3F) | 0x80); //Second byte: 10xx.xxxx (following 6 bits) 
          chEn +='%'+utf8_decToStrHex(((charOrd >> 6) & 0x3F) | 0x80); //Third byte: 10xx.xxxx (following 6 bits) 
          chEn +='%'+utf8_decToStrHex((charOrd & 0x3F) | 0x80); //Fourth byte: 10xxxxxx (last 6 bits) 
        }

    if(pos<i) res+=str.substring(pos, i);
    res+=chEn;
    pos=i+1;
  }

  if (pos) {
    if (pos<len) res+=str.substring(pos, len);
    return res;
  }  
  return str; 
}

/**
 *  Function: ng_UTF8Decode
 *  JavaScript decode URI with characters in utf-8 representation.
 *  
 *  Syntax:
 *    string *ng_UTF8Decode* (string str)
 *    
 *  Parameters:
 *    str - string to be decoded
 *    
 *  Returns:
 *    Decoded string.      
 */ 
function ng_UTF8Decode(str) {
  var len = str.length; 
  var res = new String(); 
  var charOrd=0,charCnt=0;
  var B1=0,B2=0,B3=0,B4=0;
  
  var i=0,pos=0;
  while (i<len) {
    B1=utf8_strHexToDec(str, i);
    if (B1) { // encoded char
      charOrd=0;charCnt=0;

      if (B1<128) { charCnt=3;charOrd=B1; } //ASCII encoded char (1 byte UTF-8)
      else if (B1<192) { charCnt=3; } // char is not UTF-8 (under C0)
        else if (B1<224) { //C0 .. E0 - 2 byte UTF-8 (f.i. %C2%B0)
          charCnt=6;
          B2 = utf8_strHexToDec(str, i+3);
          if ((B2>127) && (B2<192)) charOrd=(((B1 & 0x1F) << 6) | (B2 & 0x3F));
        }
          else if (B1<240) { //E0 .. F0 - 3 byte UTF-8
            charCnt=9;
            B2 = utf8_strHexToDec(str, i+3);
            if ((B2>127) && (B2<192)) {
              B3 = utf8_strHexToDec(str, i+6);
              if ((B3>127) && (B3<192)) charOrd=(((B1 & 0xF) << 12) | ((B2 & 0x3F) << 6) | (B3 & 0x3F));
            }
          }
            else { //F0 ... - 4 byte UTF-8
              charCnt=12;              
              B2 = utf8_strHexToDec(str, i+3);
              if ((B2>127) && (B2<192)) {
                B3 = utf8_strHexToDec(str, i+6);
                if ((B3>127) && (B3<192)) {
                  B4 = utf8_strHexToDec(str, i+9);
                  if ((B4>127) && (B4<192)) charOrd=(((B1 & 0x7) << 18) | ((B2 & 0x3F) << 12) | ((B3 & 0x3F) << 6) | (B4 & 0x3F));
                }
              }
            }

      if (charOrd) {
        if(pos<i) res+=str.substring(pos, i);
        res+=String.fromCharCode(charOrd);
        i+=charCnt;
        pos=i;
      }
      else i+=charCnt;
    }
    else i++;
  }
  
  if (pos) {
    if (pos<len) res+=str.substring(pos, len);
    return res;
  }
  
  return str;
}

/**
 *  Function: ng_UTF8ParamEncode
 *  Encodes characters in URI parameter to utf-8 representation.
 *  
 *  Syntax:
 *    string *ng_UTF8ParamEncode* (string url)
 *    
 *  Returns:
 *    URL with encoded characters.
 */            
function ng_UTF8ParamEncode(str) {
  return ng_UTF8Encode(str);
}

/**
 *  Function: ng_UTF8ParamDecode
 *  JavaScript decode URI parameter in utf-8 representation.
 *  
 *  Syntax:
 *    string *ng_UTF8ParamDecode* (string str)
 *    
 *  Parameters:
 *    str - string to be decoded
 *    
 *  Returns:
 *    Decoded string.      
 */ 
function ng_UTF8ParamDecode(str)
{
	str=''+str;
  var i=str.indexOf('+');
	while(i>=0)
	{
		str=str.substring(0,i)+'%20'+str.substring(i+1, str.length);
		i=str.indexOf('+');
	}
  return ng_UTF8Decode(str); 
}

/**
 *  Function: ng_inDOM
 *  Determines if element is present in browser's document object model (DOM).
 *  
 *  Syntax:
 *    bool *ng_inDOM* (object elm)
 *  
 *  Parameters:
 *    elm - element object
 *       
 *  Returns:
 *    TRUE if object is in DOM, FALSE if not.        
 */  
function ng_inDOM(e)
{
  if(ng_IsObjVar(e))
    while(e)
    {
      if(e.tagName == 'BODY') return true;
      e = e.parentNode;
    }
  return false;  
}

function ng_containsDOM(container, containee) 
{
  var isParent = false;
  do {
    if ((isParent = container == containee))
      break;
    containee = containee.parentNode;
  }
  while (containee != null);
  return isParent;
}

/**
 *  Function: ng_WindowWidth
 *  Returns window width.
 *  
 *  Syntax:
 *    int *ng_WindowWidth* ()
 *  
 *  Returns:
 *    Width of browser's window.        
 */  
function ng_WindowWidth()
{
  var width=0;
  if(typeof(window.innerWidth)=='number') {width=window.innerWidth;}
  else if(document.documentElement&&document.documentElement.clientWidth) {width=document.documentElement.clientWidth;}
  else if(document.body&&document.body.clientWidth) {width=document.body.clientWidth;}
  if(!width) width=100;
  return width;
}

/**
 *  Function: ng_WindowHeight
 *  Returns window height.
 *  
 *  Syntax:
 *    int *ng_WindowHeight* ()
 *  
 *  Returns:
 *    Height of browser's window.        
 */  
function ng_WindowHeight()
{
  var height=0;
  if(typeof(window.innerHeight)=='number'){height=window.innerHeight;}
  else if(document.documentElement&&document.documentElement.clientHeight){height=document.documentElement.clientHeight;}
  else if(document.body&&document.body.clientHeight){height=document.body.clientHeight;}
  if(!height) height=100;
  return height;
}

/**
 *  Function: ng_DocumentClientWidth
 *  Returns document area width.
 *
 *  Syntax:
 *    int *ng_DocumentClientWidth* ()
 *
 *  Returns:
 *    Width of document area of the window that is available for writing to.
 */
function ng_DocumentClientWidth()
{
  var width=10000000000;
  if(document.documentElement&&document.documentElement.clientWidth){width=document.documentElement.clientWidth;}
  if(document.body&&document.body.clientWidth){width=Math.min(document.body.clientWidth,width);}
  if((width===10000000000)||(isNaN(width))) return ng_WindowWidth();
  return width;
}

/**
 *  Function: ng_DocumentClientHeight
 *  Returns document area height.
 *
 *  Syntax:
 *    int *ng_DocumentClientHeight* ()
 *
 *  Returns:
 *    Height of document area of the window that is available for writing to.
 */
function ng_DocumentClientHeight()
{
  var height=10000000000;
  if(document.documentElement&&document.documentElement.clientHeight){height=document.documentElement.clientHeight;}
  if(document.body&&document.body.clientHeight){height=Math.min(document.body.clientHeight,height);}
  if((height===10000000000)||(isNaN(height))) return ng_WindowHeight();
  return height;
}

function ng_SetInnerHTML_Std(o, t, append) 
{
  if(append) 
  {
    if(t==='') return;
    t=o.innerHTML+t;
  }
  o.innerHTML = t;
}

function ng_SetInnerHTML_WinStore(o, t, append) 
{
  MSApp.execUnsafeLocalFunction(function () {
    if(append) 
    {
      if(t==='') return;
      t=o.innerHTML+t;
    }
    o.innerHTML = t;
  });
  //WinJS.Utilities.setInnerHTMLUnsafe(o, t);
}

/**
 *  Function: ng_SetInnerHTML
 *  Handles platform specific setting of element's innerHTML.
 *  
 *  Syntax:
 *    void *ng_SetInnerHTML* (element o, string content [, bool append=false])
 *    
 *  Parameters:
 *    o - DOM element which innerHTML should be updated
 *    content - text 
 *    append - if TRUE, the content is added to existing innerHTML     
 *    
 *  Returns:
 *    - 
 */      
var ng_SetInnerHTML = (ngWinStoreApp ? ng_SetInnerHTML_WinStore : ng_SetInnerHTML_Std); 

/**
 *  Function: ng_AppendInnerHTML
 *  Appends text to element's innerHTML. 
 *  The innerHTML is modified only if text is not empty.
 *  
 *  Syntax:
 *    void *ng_AppendInnerHTML* (element o, string content)
 *    
 *  Parameters:
 *    o - DOM element which innerHTML should be updated
 *    content - text 
 *    
 *  Returns:
 *    - 
 */      
function ng_AppendInnerHTML(o, t)
{
  ng_SetInnerHTML(o, t, true);
} 

/**
 *  Function: ng_DocumentDeselect
 *  Removes document selection.
 *  
 *  Syntax:
 *    void *ng_DocumentDeselect* ()
 *    
 *  Returns:
 *    - 
 */      
function ng_DocumentDeselect()
{
  if(document.selection && document.selection.empty) {
    document.selection.empty();
  } else if(window.getSelection) {
    var sel = window.getSelection();
    sel.removeAllRanges();
  }
}
  
/**
 *  Function: ng_DocumentScrollX
 *  Gets actual document horizontal scroll offset.
 *  
 *  Syntax:
 *    int *ng_DocumentScrollX* ()
 *    
 *  Returns:
 *    Horizontal scroll offset in pixels. 
 */      
function ng_DocumentScrollX()
{
  var scrOfX = 0;
  if( typeof( window.pageYOffset ) === 'number' ) {
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    scrOfX = document.documentElement.scrollLeft;
  }
  return scrOfX;
}

/**
 *  Function: ng_DocumentScrollY
 *  Gets actual document vertical scroll offset.
 *  
 *  Syntax:
 *    int *ng_DocumentScrollY* ()
 *    
 *  Returns:
 *    Vertical scroll offset in pixels. 
 */      
function ng_DocumentScrollY()
{
  var scrOfY = 0;
  if( typeof( window.pageYOffset ) === 'number' ) {
    scrOfY = window.pageYOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    scrOfY = document.body.scrollTop;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    scrOfY = document.documentElement.scrollTop;
  }
  return scrOfY;
}

/**
 *  Function: ng_ScrollX
 *  Gets actual element's horizontal scroll offset.
 *  Handles properly document.body element.
 *
 *  Syntax:
 *    int *ng_ScrollX* (elm)
 *
 *  Parameters:
 *    elm - object element
 *
 *  Returns:
 *    Horizontal scroll offset in pixels.
 */
function ng_ScrollX(elm)
{
  if((elm===document.body)||((elm)&&(elm.nodeName==='HTML'))) return ng_DocumentScrollX();
  return elm ? elm.scrollLeft : 0;
}

/**
 *  Function: ng_ScrollY
 *  Gets actual element's vertical scroll offset.
 *  Handles properly document.body element.
 *
 *  Syntax:
 *    int *ng_ScrollY* (elm)
 *
 *  Parameters:
 *    elm - object element
 *
 *  Returns:
 *    Vertical scroll offset in pixels.
 */
function ng_ScrollY(elm)
{
  if((elm===document.body)||((elm)&&(elm.nodeName==='HTML'))) return ng_DocumentScrollY();
  return elm ? elm.scrollTop : 0;
}

/**
 *  Function: ng_ParentPosition
 *  Determines absolute position to parent object or document.  
 *  
 *  Syntax:
 *    int *ng_ParentPosition* (object obj[, object parent=document.body, bool docrelative=false])
 *    
 *  Parameters:
 *    obj - element object
 *    parent - element object 
 *    docrelative - controls origin when  parent is document.body,
 *                  if TRUE the position is relative to document,
 *                  if FALSE (default) the position is relative to screen
 *    
 *  Returns:
 *    Object with properties x and y. 
 */         
function ng_ParentPosition(o, parent, docrelative)
{
  var n=o,pn;
  var x=0,y=0;
  if(typeof parent === 'undefined') parent=document.body;

  var docelm=document.documentElement;
  while((n)&&(n!=parent)&&(n!=docelm)) {
    pn=n.offsetParent;
    x += (n.offsetLeft + n.clientLeft);
    y += (n.offsetTop + n.clientTop);
    if(pn)
    {
      if((pn!=docelm)&&(pn!=document.body)) {
  		  x -= pn.scrollLeft;
  		  y -= pn.scrollTop;
		  }
      else {
        if(docrelative) {
          x -= ng_DocumentScrollX();
          y -= ng_DocumentScrollY();
        }
      }
  		if(ngFireFox) {
		    x+=ng_GetCurrentStylePx(pn,'border-left-width');
		    y+=ng_GetCurrentStylePx(pn,'border-top-width');
      }
      else
      {
        if(ngOpera) {
  		    x-=ng_GetCurrentStylePx(pn,'border-left-width');
  		    y-=ng_GetCurrentStylePx(pn,'border-top-width');
  		  }
      }
    }
    n=pn;
  }
  return {x: x, y: y};
}

/**
 *  Function: ng_nullAttr
 *  Determines if element attribute is not defined.  
 *  
 *  Syntax:
 *    bool *ng_nullAttr* (object attr)
 *    
 *  Parameters:
 *    attr - element attribute
 *    
 *  Returns:
 *    TRUE if attribute is not set. 
 */         
function ng_nullAttr(v)
{
  if(typeof v === 'number') return false;
  if((typeof v === 'string')&&(v=='')) return true;
  if((typeof v==='object')&&(v==null)) return true;
  return false;
}

function ng_GetStylePx2(p)
{
  p=ngVal(p,'');
  if(p=='') return;  
  if((p.length>2)&&(p.substring(p.length-2)=='px')) p=ng_GetStylePx(p.substring(0,p.length-2));
  return p;
}

function ng_GetStylePx(v)
{
  var tv=typeof v;
  if(tv==='number') return v; 
  if((v=='')||(tv==='undefined')) return 0;
  v=parseInt(v,10);
  return (isNaN(v) ? 0 : v);
}

function ng_IE7RedrawFix(e)
{
  //IE redraw fix
  return e.offsetLeft;
}

/**
 *  Function: ng_GetCurrentStyle
 *  Gets current (computed) style of element.
 *  
 *  Syntax:
 *    string *ng_GetCurrentStyle* (object elm, string style)
 *    
 *  Parameters:
 *    elm - object element
 *    style - name of the style, for example 'margin-right' 
 *    
 *  Returns:
 *    Value of requested style.
 *              
 */
function ng_GetCurrentStyle(o,s)
{
  var val;
  if(document.defaultView && document.defaultView.getComputedStyle)
  { 
    var cstyle=document.defaultView.getComputedStyle(o, '');
    if(cstyle) val = cstyle.getPropertyValue(s);
  }
  else if(o.currentStyle) 
  {
    s = s.replace(/\-(\w)/g, function (s, p){ return p.toUpperCase(); });
    val = o.currentStyle[s];
  }
  return val;
}

/**
 *  Function: ng_BeginMeasureElement
 *  Prepares element for dimension measurement.
 *  Makes sure all parent object have proper display style. 
 *  
 *  Syntax:
 *    array *ng_BeginMeasureElement* (object elm)
 *    
 *  Parameters:
 *    elm - object element
 *    
 *  Returns:
 *    List of modified objects.
 *    
 *  See also:  
 *  <ng_EndMeasureElement>              
 */
function ng_BeginMeasureElement(o)
{
  if((o)&&(o!==document.body)&&((!o.offsetHeight)||(!o.offsetWidth)))
  {
    if(typeof o.measure_info !== 'undefined') return o.measure_info;
    
    var arr = new Array();
    var p = o;
    var displaystyle=(ngIExplorer ? '' : 'inherit');
    //iterate through parent nodes
    while((p)&&(p!=document))
    {
      if(typeof p.measure_info !== 'undefined') break;
      if((p)&&(p.style)&&(p.style.display === 'none')) //if display is none save parent and change it to inherit
      {
        arr.push(p);
        p.style.display = displaystyle;
      }
      p = p.parentNode;
    }
    //compute height and width again
    ng_IE7RedrawFix(o);

    if(arr.length)
    {
      o.measure_info = arr;
      return arr;
    }    
  }
  return undefined;
}

/**
 *  Function: ng_EndMeasureElement
 *  Finishes element dimension measurement.
 *  Restores display states of parent object if modified. 
 *  
 *  Syntax:
 *    void *ng_EndMeasureElement* (object elm)
 *    
 *  Parameters:
 *    elm - object element
 *    
 *  Returns:
 *    -
 *    
 *  See also:  
 *  <ng_BeginMeasureElement>              
 */
function ng_EndMeasureElement(o)
{
  if((o)&&(typeof o.measure_info !== 'undefined')) 
  {
    var undefined;
    var arr=o.measure_info;
    o.measure_info=undefined; // cannot delete - not supported in IE<=7

    var p;
    for (var i = (arr.length - 1); i >= 0; i--)
    {
      p=arr[i];
      if((p)&&(p.style)) p.style.display = 'none';
    }
  }  
}

/**
 *  Function: ng_GetCurrentStylePx
 *  Extracts pixels value from current (computed) style of element.
 *  
 *  Syntax:
 *    int *ng_GetCurrentStylePx* (object elm, string style)
 *    
 *  Parameters:
 *    elm - object element
 *    style - name of the style, for example 'margin-right' 
 *    
 *  Returns:
 *    Pixels value of requested style.
 *              
 */
function ng_GetCurrentStylePx(o,s)
{
  return ng_GetStylePx(ng_GetCurrentStyle(o,s));
}

/**
 *  Function: ng_StyleWidth
 *  Gets element width defined by style property.
 *  
 *  Syntax:
 *    int *ng_StyleWidth* (object elm)
 *    
 *  Parameters:
 *    elm - object element
 *    
 *  Returns:
 *    Width in pixels.          
 */
function ng_StyleWidth(o) 
{ 
  return (typeof o.style.pixelWidth !== 'undefined' ? ng_GetStylePx(o.style.pixelWidth) : ng_GetStylePx(o.style.width)); 
}

/**
 *  Function: ng_StyleHeight
 *  Gets element height defined by style property.
 *  
 *  Syntax:
 *    int *ng_StyleHeight* (object elm)
 *    
 *  Parameters:
 *    elm - object element
 *    
 *  Returns:
 *    Height in pixels.          
 */
function ng_StyleHeight(o)
{
 return (typeof o.style.pixelHeight !== 'undefined' ? ng_GetStylePx(o.style.pixelHeight) : ng_GetStylePx(o.style.height));
}

/**
 *  Function: ng_SetStyleWidth
 *  Sets element width defined by style property.
 *  
 *  Syntax:
 *    void *ng_SetStyleWidth* (object elm, int v)
 *    
 *  Parameters:
 *    elm - object element
 *    v - width in pixels 
 *    
 *  Returns:
 *    -          
 */
function ng_SetStyleWidth(o,v)
{
  if(typeof o.style.pixelWidth !== 'undefined') o.style.pixelWidth=v;
  else o.style.width=v+'px';
}

/**
 *  Function: ng_SetStyleHeight
 *  Sets element height defined by style property.
 *  
 *  Syntax:
 *    void *ng_SetStyleHeight* (object elm, int v)
 *    
 *  Parameters:
 *    elm - object element
 *    v - height in pixels 
 *    
 *  Returns:
 *    -          
 */
function ng_SetStyleHeight(o,v)
{
  if(typeof o.style.pixelHeight !== 'undefined') o.style.pixelHeight=v;
  else o.style.height=v+'px';
}

/**
 *  Function: ng_OuterWidth
 *  Gets element outer width.
 *  
 *  Syntax:
 *    int *ng_OuterWidth* (object elm)
 *    
 *  Parameters:
 *    elm - object element
 *    
 *  Returns:
 *    Width in pixels.          
 */
function ng_OuterWidth(o)
{
  ng_IE7RedrawFix(o);
  var w=ng_GetStylePx(o.offsetWidth);
  if(!w)
  {
    ng_BeginMeasureElement(o);
    w=ng_GetStylePx(o.offsetWidth);
    ng_EndMeasureElement(o);
  }
  return w + ng_GetCurrentStylePx(o,'margin-left') + ng_GetCurrentStylePx(o,'margin-right');
}

/**
 *  Function: ng_OuterHeight
 *  Gets element outer height.
 *  
 *  Syntax:
 *    int *ng_OuterHeight* (object elm)
 *    
 *  Parameters:
 *    elm - object element
 *    
 *  Returns:
 *    Height in pixels.          
 */
function ng_OuterHeight(o)
{
  ng_IE7RedrawFix(o);
  var h=ng_GetStylePx(o.offsetHeight);
  if(!h)
  {
    ng_BeginMeasureElement(o);
    h=ng_GetStylePx(o.offsetHeight);
    ng_EndMeasureElement(o);
  }
  return h + ng_GetCurrentStylePx(o,'margin-top') + ng_GetCurrentStylePx(o,'margin-bottom');
}

/**
 *  Function: ng_SetOuterWidth
 *  Sets element outer width.
 *  
 *  Syntax:
 *    void *ng_SetOuterWidth* (object elm, int v)
 *    
 *  Parameters:
 *    elm - object element
 *    v - width in pixels 
 *    
 *  Returns:
 *    -          
 */
function ng_SetOuterWidth(o,v)
{
  v-=ng_GetCurrentStylePx(o,'margin-left') + ng_GetCurrentStylePx(o,'margin-right');
  v-=ng_GetCurrentStylePx(o,'border-left-width') + ng_GetCurrentStylePx(o,'border-right-width');
  v-=ng_GetCurrentStylePx(o,'padding-left') + ng_GetCurrentStylePx(o,'padding-right');
  ng_SetStyleWidth(o,v);
}

/**
 *  Function: ng_SetOuterHeight
 *  Sets element outer height.
 *  
 *  Syntax:
 *    void *ng_SetOuterHeight* (object elm, int v)
 *    
 *  Parameters:
 *    elm - object element
 *    v - height in pixels 
 *    
 *  Returns:
 *    -          
 */
function ng_SetOuterHeight(o,v)
{
  v-=ng_GetCurrentStylePx(o,'margin-top') + ng_GetCurrentStylePx(o,'margin-bottom');
  v-=ng_GetCurrentStylePx(o,'border-top-width') + ng_GetCurrentStylePx(o,'border-bottom-width');
  v-=ng_GetCurrentStylePx(o,'padding-top') + ng_GetCurrentStylePx(o,'padding-bottom');
  ng_SetStyleHeight(o,v);
}

/**
 *  Function: ng_ClientWidth
 *  Gets element client width.
 *  
 *  Syntax:
 *    int *ng_ClientWidth* (object elm)
 *    
 *  Parameters:
 *    elm - object element
 *    
 *  Returns:
 *    Width in pixels.          
 */
function ng_ClientWidth(o)
{
  if(!o) return 0;
  ng_IE7RedrawFix(o);
  var w=ng_GetStylePx(o.clientWidth);
  if(!w) 
  {
    ng_BeginMeasureElement(o);
    w=ng_GetStylePx(o.clientWidth);
    ng_EndMeasureElement(o);
    if((!w)&&(o.style.width!=''))
    {
      w=ng_StyleWidth(o);
      w+=ng_GetCurrentStylePx(o,'padding-left') + ng_GetCurrentStylePx(o,'padding-right');
    }
  }
  return w;
}

/**
 *  Function: ng_ClientWidthEx
 *  Gets element client width.
 *  Extended version of <ng_ClientWidth>.
 *  Handles properly document.body element.
 *
 *  Syntax:
 *    int *ng_ClientWidthEx* (object elm)
 *
 *  Parameters:
 *    elm - object element
 *
 *  Returns:
 *    Width in pixels.
 */
function ng_ClientWidthEx(o)
{
  if((o===document.body)||((o)&&(o.nodeName==='HTML'))) return ng_DocumentClientWidth();
  return ng_ClientWidth(o);
}

/**
 *  Function: ng_ClientHeight
 *  Gets element client height.
 *  
 *  Syntax:
 *    int *ng_ClientHeight* (object elm)
 *    
 *  Parameters:
 *    elm - object element
 *    
 *  Returns:
 *    Height in pixels.          
 */
function ng_ClientHeight(o)
{
  if(!o) return 0;  
  ng_IE7RedrawFix(o);
  var h=ng_GetStylePx(o.clientHeight);
  if(!h) 
  {
    ng_BeginMeasureElement(o);
    h=ng_GetStylePx(o.clientHeight);
    ng_EndMeasureElement(o);
    if((!h)&&(o.style.height!=''))
    {
      h=ng_StyleHeight(o);
      h+=ng_GetCurrentStylePx(o,'padding-top') + ng_GetCurrentStylePx(o,'padding-bottom');
    }
  }
  return h;
}

/**
 *  Function: ng_ClientHeightEx
 *  Gets element client height.
 *  Extended version of <ng_ClientHeight>.
 *  Handles properly document.body element.
 *
 *  Syntax:
 *    int *ng_ClientHeightEx* (object elm)
 *
 *  Parameters:
 *    elm - object element
 *
 *  Returns:
 *    Height in pixels.
 */
function ng_ClientHeightEx(o)
{
  if((o===document.body)||((o)&&(o.nodeName==='HTML'))) return ng_DocumentClientHeight();
  return ng_ClientHeight(o);
}

/**
 *  Function: ng_SetClientWidth
 *  Sets element client width.
 *  
 *  Syntax:
 *    void *ng_SetClientWidth* (object elm, int v)
 *    
 *  Parameters:
 *    elm - object element
 *    v - width in pixels 
 *    
 *  Returns:
 *    -          
 */
function ng_SetClientWidth(o,v)
{
  v-=ng_GetCurrentStylePx(o,'padding-left') + ng_GetCurrentStylePx(o,'padding-right');
  ng_SetStyleWidth(o,v);
}

/**
 *  Function: ng_SetClientHeight
 *  Sets element client height.
 *  
 *  Syntax:
 *    void *ng_SetClientHeight* (object elm, int v)
 *    
 *  Parameters:
 *    elm - object element
 *    v - height in pixels 
 *    
 *  Returns:
 *    -          
 */
function ng_SetClientHeight(o,v)
{
  v-=ng_GetCurrentStylePx(o,'padding-top') + ng_GetCurrentStylePx(o,'padding-bottom');
  ng_SetStyleHeight(o,v);
}

/**
 *  Function: ng_setLeftTop
 *  Sets element left, top. Optimized for IE if used.
 *  
 *  Syntax:
 *    void *ng_setLeftTop* (object obj, int left, int top)
 *    
 *  Parameters:
 *    obj - object element
 *    left - left position in pixels
 *    top - top position in pixels
 *    
 *  Returns:
 *    -         
 */
function ng_setLeftTopNotIE(o, l, t)
{
  o.style.left=l+'px';
  o.style.top=t+'px';
}

function ng_setLeftTopIE(o, l, t)
{
  o.style.pixelLeft=l;
  o.style.pixelTop=t;
}

var ng_setLeftTop = ngIExplorer ? ng_setLeftTopIE : ng_setLeftTopNotIE;

/**
 *  Function: ng_setBounds
 *  Sets element left, top, width and height. Optimized for IE if used.
 *  
 *  Syntax:
 *    void *ng_setBounds* (object obj, int left, int top, int width, int height)
 *    
 *  Parameters:
 *    obj - object element
 *    left - left position in pixels
 *    top - top position in pixels
 *    width - width of element in pixels
 *    height - height of element in pixels       
 *    
 *  Returns:
 *    -         
 */
function ng_setBoundsNotIE(o, l, t, w, h)
{
  o.style.left=l+'px';
  o.style.top=t+'px';
  o.style.width=w+'px';
  o.style.height=h+'px';
}

function ng_setBoundsIE(o, l, t, w, h)
{
  o.style.pixelLeft=l;
  o.style.pixelTop=t;
  o.style.pixelWidth=w;
  o.style.pixelHeight=h;
}

var ng_setBounds = ngIExplorer ? ng_setBoundsIE : ng_setBoundsNotIE;

function ng_ProcessURLParams2(url, septag)
{
  if(url=='') return;
  var vars = url.split(septag);
  for(var i=0;i<vars.length;i++)
  {
    s=vars[i].split('=');
    if(s[0].substr(0,4)=='amp;') s[0]=s[0].substr(4);
    ngURLParams[ ng_unescape(s[0]) ] = (s.length>1 ? ng_unescape(s[1]) : null);
  }
}

function ng_ProcessURLParams(url)
{
  ngURLParams = {};
  url=ngVal(url,window.location.href);
  var i1=url.indexOf('?');
  var i2=url.indexOf('#');
  var url1='';
  var url2='';
  if(i2>=0) 
  {
    url2=url.substr(i2+1);
    url=url.substr(0,i2);  
  }
  if(i1>=0) url1=url.substr(i1+1);
  ng_ProcessURLParams2(url1,'&');
  ng_ProcessURLParams2(url2,'@');
  ngURLParamsParsed=true;
}


/**
 *  Function: ng_GET
 *  Gets value of page URL parameter. 
 *   
 *  Syntax:
 *    string *ng_GET* (string paramname)
 *    
 *  Parameters:
 *    paramname - parameter name
 *    
 *  Returns:
 *    Value of the parameter.
 *    
 *  Example:
 *    > http://server/?P1=a&P2=b&amp;P3=c#P4=d@P5=e
 *    
 *    > var p1=ng_GET('P1');   
 */       
function ng_GET(p)
{
  if(!ngURLParamsParsed) ng_ProcessURLParams();
  return ngURLParams[p];
}

/**
 *  Function: ng_GetURLSafeCharsEncoded
 *  Gets array, where keys are url encoded URL safe chars (RFC1738) and values are just URL safe chars  
 *  
 *  Syntax:
 *    array *ng_GetURLSafeCharsEncoded* ()
 *   
 *  Returns:
 *    Value of global variable ngURLSafeCharsEncoded      
 */
function ng_GetURLSafeCharsEncoded()
{
  if(typeof ngURLSafeCharsEncoded=='undefined')
  {
    ngURLSafeCharsEncoded = {};
    for(var k in ngURLSafeChars)
      ngURLSafeCharsEncoded['%' + parseInt(k).toString(16)] = String.fromCharCode(k);
  }
  return ngURLSafeCharsEncoded;
}

/**
 *  Function: ng_Redirect
 *  Redirects user to specified URL.
 *   
 *  Syntax:
 *    void *ng_Redirect* (string url, bool topframe = true)
 *    
 *  Parameters:
 *    url - target url
 *    topframe - redirect  
 *    
 *  Returns:
 *    TRUE if location was set.
 */       
function ng_Redirect(url, topframe)
{
  url=ng_URL(url);
  topframe=ngVal(topframe, true);
  try {
    var p=parent;
    if((topframe)&&(p!=window))
    {
      while(p)
      {
        if(p.parent==p) break;
        p=p.parent;
      }
      p.location.href=url;
    }
    else document.location.href=url;
    return true;  
  }
  catch(e) {
    return false;
  }
}

/**
 *  Function: ng_InIFRAME
 *  Tests if page is opened in IFRAME.
 *   
 *  Syntax:
 *    bool *ng_InIFRAME* (void)
 *    
 *  Parameters:
 *    - 
 *    
 *  Returns:
 *    TRUE if page is in IFRAME.
 */       
function ng_InIFRAME()
{
  return (parent!=window);
}

/**
 *  Function: ng_SetByRef
 *  Sets value as reference into object property.
 *   
 *  Syntax:
 *    void *ng_SetByRef* (object obj, string prop [, mixed value])
 *    
 *  Parameters:
 *    obj - object where property will be set
 *    prop - property name
 *    value - value of property     
 *    
 *  Returns:
 *    - 
 */       
function ng_SetByRef(obj,prop,val)
{
  if((!obj)||(!prop)||(prop=='')) return;
  if(typeof obj['_byRef'] === 'undefined') obj['_byRef']=new Object;
  obj['_byRef'][prop]=true;
  if(arguments.length>2) 
    obj[prop]=val;
}

/**
 *  Function: ng_SetByVal
 *  Sets copy of given value into object property.
 *   
 *  Syntax:
 *    void *ng_SetByVal* (object obj, string prop [, mixed value])
 *    
 *  Parameters:
 *    obj - object where property will be set
 *    prop - property name
 *    value - value of property     
 *    
 *  Returns:
 *    - 
 */       
function ng_SetByVal(obj,prop,val)
{
  if((!obj)||(!prop)||(prop=='')) return;
  if(obj['_byRef']) delete obj['_byRef'][prop];
  if(arguments.length>2) 
    obj[prop]=ng_CopyVar(val);
}

/**
 *  Function: ng_CopyVar
 *  Creates true copy of variable.
 *   
 *  Syntax:
 *    mixed *ng_CopyVar* (mixed var)
 *    
 *  Parameters:
 *    var - variable to be copied 
 *    
 *  Returns:
 *    New variable. 
 */       
function ng_CopyVar(o)
{                                    
  var ri={ cnt: 0, src: [], dst: [] };
  var r=ng_copyvar_int(o,ri);
  if((ri.cnt!=0)&&(ri.src.length))
    ng_copyvar_fixref(r,ri);
  return r; 
}

function ng_type_date(d) { 
  return Object.prototype.toString.call(d) === '[object Date]';
}

function ng_copyvar_int(o, ri)
{
  if((o)&&(typeof o === 'object'))
  {
    if(ng_type_date(o)) return new Date(o);

    var r;
    if(ng_IsArrayVar(o)) {
      r=[];
      for(var i in o)
        r[i]=ng_copyvar_int(o[i],ri);
      return r;
    }
    r=new Object;
    ri.src[ri.src.length]=o;
    ri.dst[ri.dst.length]=r;
    var oref=o['_byRef'];
    if(oref)
    {
      for(var i in o) 
        if(!oref[i]) r[i]=ng_copyvar_int(o[i],ri);
        else { r[i]=o[i]; ri.cnt++; }
    }
    else for(var i in o) r[i]=ng_copyvar_int(o[i],ri);
    
    if(typeof r.__clone === 'function') r.__clone(o);
    return r;
  }    
  return o;
}

function ng_copyvar_fixref(o, ri)
{
  if((!o)||(typeof o !== 'object')||(ng_type_date(o))) return;

  if(typeof o.length === 'number') // array 
  { 
    var ix;
    var arr=true; 
    for(var i in o) 
    {
      if(!o.hasOwnProperty(i)) continue;
      ix=(typeof i!=='number' ? parseInt(i) : i);
      if((isNaN(ix))||(ix<0)||(ix>=o.length)) // probably not array at all
      {
        arr=false;
        break;
      }  
      ng_copyvar_fixref(o[i],ri);
    }
    if(arr) return;
  }
  var oref=o['_byRef'];
  if(oref)
  {
    for(var i in o)
    { 
      if(!oref[i]) ng_copyvar_fixref(o[i],ri);
      else 
      {
        for(var j=0;j<ri.src.length;j++)
          if(o[i]==ri.src[j]) {
            o[i]=ri.dst[j];
            break;
          } 
        ri.cnt--; 
      }
      if(!ri.cnt) break;
    }
  }
  else 
    for(var i in o) 
    {
      ng_copyvar_fixref(o[i],ri);
      if(!ri.cnt) break;
    }
}

var merge_undefined;

/**
 *  Function: ng_MergeVar
 *  Merges two objects.
 *   
 *  Syntax:
 *    void *ng_MergeVar* (object dst, object var [, bool allowundefined=false, function callback])
 *    
 *  Parameters:
 *    dst - destination object
 *    var - object to be merged
 *    allowundefined - if FALSE (default), undefined values in parameter var are ignored
 *    callback - optional callback function 
 *    
 *  Returns:
 *    - 
 */       
function ng_MergeVar(d,o,allowundefined,callback)
{  
  if((!d)||(typeof d !== 'object')||(ng_type_date(d))||(typeof o!=='object')||(ng_type_date(o))) return;
  if(!ngVal(allowundefined,false)) o=ng_CleanUndefined(ng_CopyVar(o));
  
  if((typeof callback === 'function')&&(!ngVal(callback(d,o),true))) return;
  if((typeof d.__merge === 'function')&&(!ngVal(d.__merge(o),true))) return;
  
  var dref=d['_byRef'];
  
  var ex={};
  for(var i in d) ex[i]=true;
  if((o)&&((dref)||o['_byRef']))
  {
    var oref=o['_byRef'];
    for(var i in o) {
      if(ex[i]!==true) {
        if(((!oref)||(!oref[i]))
         &&((!dref)||(!dref[i]))) d[i]=ng_CopyVar(o[i]);
        else d[i]=o[i];
      }
      else
      { 
        if(((!oref)||(!oref[i]))
           &&((!dref)||(!dref[i]))&&(!ng_IsArrayVar(d[i]))) ng_MergeVar(d[i],o[i],true,callback);
      }
    }
  }
  else
  {
    for(var i in o) 
    {
      if(ex[i]!==true) d[i]=ng_CopyVar(o[i]);
      else 
      {
        if(!ng_IsArrayVar(d[i])) ng_MergeVar(d[i],o[i],true,callback);
      }
    }
  }
}

/**
 *  Function: ng_MergeVarReplace
 *  Merges two objects, the properties of destination object are replaced.
 *
 *  Syntax:
 *    void *ng_MergeVarReplace* (object dst, object var [, bool allowundefined=false, function callback])
 *
 *  Parameters:
 *    dst - destination object
 *    var - object to be merged
 *    allowundefined - if FALSE (default), undefined values in parameter var are removed from dst
 *    callback - optional callback function
 *
 *  Returns:
 *    -
 */
function ng_MergeVarReplace(d,o,allowundefined,callback)
{
  if((!d)||(typeof d !== 'object')||(ng_type_date(d))||(typeof o!=='object')||(ng_type_date(o))) return;

  if((typeof callback !== 'function')||(ngVal(callback(d,o),true))) {
    if((typeof d.__mergereplace !== 'function')||(ngVal(d.__mergereplace(o),true))) {
      var dref=d['_byRef'];
      var oref=o ? o['_byRef'] : null;
      for(var i in o)
      {
        if(((!oref)||(!oref[i]))&&(o[i])&&(typeof o[i] === 'object')&&(!ng_type_date(o[i]))&&(!ng_IsArrayVar(o[i])))
        {
          if((!d[i])||(typeof d[i]!=='object')||((dref)&&(dref[i]))) {
            if(dref) delete dref[i];
            d[i]={};
          }
          ng_MergeVarReplace(d[i],o[i],true,callback);
        }
        else
        {
          if((oref)&&(oref[i])) ng_SetByRef(d,i,o[i]);
          else {
            if(dref) delete dref[i];
            d[i]=ng_CopyVar(o[i]);
          }
        }
      }
    }
  }
  if(!ngVal(allowundefined,false)) ng_CleanUndefined(d);
}

/**
 *  Function: ng_CleanUndefined
 *  Removes all undefined properties in object.
 *   
 *  Syntax:
 *    mixed *ng_CleanUndefined* (mixed obj)
 *    
 *  Parameters:
 *    obj - object to be cleaned
 *     
 *  Returns:
 *    Input obj parameter.      
 */  
function ng_CleanUndefined(d)
{
  if((!d)||(typeof d !== 'object')||(ng_type_date(d))) return d;
  var dref=d['_byRef'];
  var del=[];
  for(var i in d) 
  {
    if(typeof d[i]==='undefined') del.push(i); // don't delete in foreach
    else if(((!dref)||(!dref[i]))&&(!ng_IsArrayVar(d[i]))) ng_CleanUndefined(d[i]);
  }
  for(var i=del.length-1;i>=0;i--)
    delete d[del[i]];
  return d;
}

/**
 *  Function: ng_VarEquals
 *  Tests if value of one variable equals to value of second variable.
 *  Function handles date types and objects. 
 *   
 *  Syntax:
 *    bool *ng_VarEquals* (mixed a, mixed b [, bool noobj=false])
 *    
 *  Parameters:
 *    a - first variable 
 *    b - second variable
 *    noobj - if TRUE don't compare objects  
 *    
 *  Returns:
 *    TRUE if values of variables are equal.    
 *  
 */       
function ng_VarEquals(a,b,noobj)
{
  if(a===b) return true;  
  if(typeof a !== typeof b) return (a==b);
  if(typeof a !=='object') return false;   

  var adate=ng_type_date(a);
  var bdate=ng_type_date(b);
  if(adate || bdate)
    return ((adate==bdate)&&(a.getTime() == b.getTime()));

  if(a || b)
  {
    if((!a)||(!b)||(noobj)) return false;

    if(typeof a.__equals === 'function') return ngVal(a.__equals(b),false);
    if(typeof b.__equals === 'function') return ngVal(b.__equals(a),false);

    var keys={};
    for(var i in a) keys[i]=true;      
    for(var i in b) keys[i]=true;      
    delete keys._byRef;

    var aref=a['_byRef'];
    var bref=b['_byRef'];
    for(var i in keys)
      if(!ng_VarEquals(a[i],b[i],((aref)&&(aref[i]))||((bref)&&(bref[i])))) return false;
  }
  return true;
}

// Array polyfill
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

/**
 *  Function: ng_IsObjVar
 *  Detects if variable is a valid object.
 *
 *  Syntax:
 *    bool *ng_IsObjVar* (mixed var)
 *
 *  Parameters:
 *    var - variable to be checked
 *
 *  Returns:
 *    TRUE if variable is a valid object.
 */
function ng_IsObjVar(v) {
  return ((typeof v==='object')&&(v));
}

/**
 *  Function: ng_IsArrayVar
 *  Detects if variable is indexed array.
 *   
 *  Syntax:
 *    bool *ng_IsArrayVar* (mixed var)
 *    
 *  Parameters:
 *    var - variable to be checked 
 *    
 *  Returns:
 *    TRUE if variable is indexed array. 
 */
window.ng_IsArrayVar=Array.isArray;

/**
 *  Function: ng_EmptyVar
 *  Detects if variable is empty (not set).
 *   
 *  Syntax:
 *    bool *ng_EmptyVar* (mixed var)
 *    
 *  Parameters:
 *    var - variable to be checked 
 *    
 *  Returns:
 *    TRUE if variable is empty. 
 */       
function ng_EmptyVar(o)
{
  switch(typeof o)
  {
    case 'undefined': return true;
    case 'string': return (o=='');
    case 'integer': return (o==0);
    case 'object':
      if(!o) return true;
      if(o.length>0) return false;
      for(var i in o)
        return false;
      return true;
    case 'boolean': return (!o);
  }
  return false;
}

/**
 *  Function: ngAddEvent
 *  Adds new function to existing event handler (callback).  
 * 
 *  Syntax:
 *    function *ngAddEvent* (function oldevent, function appendevent)
 *    
 *  Parameters:
 *    oldevent - old event handler
 *    appendevent - function to be added to existing event handler
 *    
 *  Returns:
 *    New event handler function that calls both event handlers (oldevent 
 *    function and than appendevent function).               
 */
function ngAddEvent(ev, fce) {
  if(typeof(fce)=='function') // only functions can be added to event handlers 
  {              
    if(typeof(ev)=='function') return function() { var r1=ev.apply(this,arguments); var r2=fce.apply(this,arguments); return ((typeof r1 === typeof r2) && (r1 == r2) ? r1 : undefined); } // add new function to functions chain
    return fce; // event handler not set, return added function
  }
  return ev;
}

function ngObjAddEvent(ev, fce, once) {
  var swap=false;
  if(typeof fce === 'string')
  {
    var c=fce;
    fce=ev;
    ev=c;
    swap=true;
  }
  if(ng_IsArrayVar(fce))
  {
    if(swap) {
      for(var i=fce.length-1;i>=0;i--)
        ngObjAddEvent.apply(this,[fce[i],ev,once]);
    }
    else
    {
      for(var i=0;i<fce.length;i++)
        ngObjAddEvent.apply(this,[ev,fce[i],once]);
    }
    return;
  }
  if(typeof fce === 'function') // only functions can be added to event handlers 
  { 
    if(typeof this[ev] === 'function') 
    { 
      var evlist=this[ev].events;
      if(typeof evlist === 'undefined') {
        var oldfnc=this[ev];
        if((once)&&(fce===oldfnc)) return;
        
        evlist=[];
        var self=this;
        var handler=function() {
          var r,ret,undefined;
          var oldproc=handler.inprocess;
          handler.inprocess=true;
          try {
            for(var i=0;i<evlist.length;i++)
            {
              if(!evlist[i]) continue;
              r=evlist[i].apply(self,arguments);
              if(!i) ret=r;
              else if(r !== ret) ret=undefined;
            }
          }
          finally {
            if(handler.changed)
            {
              delete handler.changed;
              for(var i=evlist.length-1;i>=0;i--)
                if(!evlist[i]) evlist.splice(i,1);
              if(!evlist.length)
              {
                if(self[ev]) self[ev]=null;
                delete handler.events;
              }
              else if(evlist.length==1)
              {
                if(self[ev]) self[ev]=evlist[0];
                delete handler.events;
              }
            }
            handler.inprocess=oldproc;
          }
          return ret;
        }      
        handler.events=evlist;
        this[ev]=handler;
        evlist.push(oldfnc);
      }
      if(once)
      {
        for(var i=0;i<evlist.length;i++)
          if(evlist[i]===fce) return;
      }
      if(swap) evlist.splice(0,0,fce);
      else     evlist.push(fce);
      // add new function to functions chain
    }
    else this[ev]=fce; // event handler not set, return added function
  }
  else {
    if((fce === null)&&(typeof this[ev] === 'undefined')) this[ev] = null;
  }
}

function ngObjRemoveEvent(ev, fce) 
{
  if(typeof fce === 'string')
  {
    var c=fce;
    fce=ev;
    ev=c;
  }
  if(ng_IsArrayVar(fce))
  {
    for(var i=0;i<fce.length;i++)
      ngObjRemoveEvent.apply(this,[ev,fce[i]]);
    return;
  }
  if(typeof(fce)=='function') // only functions can be added to event handlers 
  { 
    var handler=this[ev];
    if(!handler) return;
    if(handler===fce) { this[ev] = null; return; }
    var evlist=handler.events;
    if(typeof evlist !== 'undefined')
    {
      var inproc=handler.inprocess;
      for(var i=evlist.length-1;i>=0;i--) 
        if(evlist[i]===fce) {
          if(inproc) {
            handler.changed=true;
            evlist[i]=null;
          }
          else evlist.splice(i,1);
        }
      if(!inproc) {
        if(!evlist.length)
        {
          this[ev]=null;
          delete handler.events;
        }
        else if(evlist.length==1)
        {
          this[ev]=evlist[0];
          delete handler.events;
        }
      }
    } 
  }
}

/**
 *  Function: ng_OverrideMethod
 *  Overrides method of class. Original implementation of the method is available
 *  through added callParent().
 *
 *  Syntax:
 *    void *ng_OverrideMethod* (object class, string metod, function fnc)
 *
 *  Parameters:
 *    class - the class which method will be overriden
 *    method - name of the method to be override
 *    fnc - new implementation of the method
 *
 *  Returns:
 *    -
 */
function ng_OverrideMethod(cls,method,fnc) {
  if(ng_IsArrayVar(fnc))
  {
    for(var i=0;i<fnc.length;i++)
      ng_OverrideMethod(cls,method,fnc[i]);
    return;
  }
  var parent=cls[method];
  if((typeof parent==='function')&&(typeof fnc==='function')) {
    var evlist=parent.overrides;
    var dive=0;
    if(typeof evlist === 'undefined') {
      evlist=[fnc,parent];
      var handler = function() {
        var ret,olddive=dive;
        dive=0;
        try {
          ret=evlist[0].apply(cls,arguments);
        } finally {
          dive=olddive;
        }
        return ret;
      };
      handler.hasParent = function() {
        return ((dive+1)<evlist.length);
      };
      handler.callParent = function() {
        var ret;
        try {
          ret=evlist[++dive].apply(cls,arguments);
        }
        finally {
          dive--;
        }
        return ret;
      };
      handler.removeOverride = function(rfnc) {
        for(var i=evlist.length-2;i>=0;i--) {
          if(evlist[i]===rfnc) {
            if((dive>0)&&(dive>=i)) throw new Error('Cannot remove override of function in the middle of its invocation.');
            evlist.splice(i,1);
          }
        }
      };
      handler.overrides = evlist;
      cls[method] = handler;
    }
    else {
      if(dive>0) throw new Error('Cannot override function in the middle of its invocation.');
      evlist.splice(0,0,fnc);
    }
  }
  else cls[method]=fnc;
}

/**
 *  Function: ng_OverrideFunction
 *  Overrides function. Original implementation of function is available
 *  through added callParent().
 *
 *  Syntax:
 *    function *ng_OverrideFunction* (function oldfnc, function fnc [, object thisarg])
 *
 *  Parameters:
 *    olfnc - function to be overriden
 *    fnc - new implementation of the function
 *    thisarg - optional context in which functions are called
 *
 *  Returns:
 *    Overriden function (not same as fnc).
 */
function ng_OverrideFunction(oldfnc,fnc,thisarg) {
  if((typeof oldfnc!=='function')||(typeof fnc!=='function')) return (typeof fnc!=='function' || !thisarg ? fnc : fnc.bind(thisarg));
  else {
    if(!thisarg) thisarg=this;
    var parentfnc=function() {
      return oldfnc.apply(thisarg,arguments);
    };
    var newfnc = function() {
      newfnc.callParent = parentfnc;
      return fnc.apply(thisarg,arguments);
    }
    return newfnc;
  }
}

/**
 *  Function: ng_IsOverriden
 *  Tests if class method or function is overriden.
 *
 *  Syntax:
 *    bool *ng_IsOverriden* (function impl)
 *
 *  Parameters:
 *    impl - class method or function to be tested
 *
 *  Returns:
 *    TRUE if class method of function was overriden.
 */
function ng_IsOverriden(fnc) {
  return ((typeof fnc==='function')&&(typeof fnc.callParent === 'function')&&((typeof fnc.overrides !== 'object')||(fnc.overrides.length>1)));
}

/**
 *  Function: ng_CallParent
 *  Invoke original implementation of method if method was overriden
 *  by <ng_OverrideMethod>.
 *
 *  Syntax:
 *    mixed *ng_CallParent* (object class, string metod, array args [, mixed retval = undefined])
 *
 *  Parameters:
 *    class - the class which method should be called
 *    method - name of the method to be called
 *    args - method arguments in a form of array
 *    retval - return value if method was not overriden
 *
 *  Returns:
 *    Value returned by original implementation of method or value of retval parameter
 *    if method was not overriden.
 */
function ng_CallParent(cls,method,args,retval) {
  var fnc=cls[method];
  if((ng_IsOverriden(fnc))&&(fnc.hasParent())) return fnc.callParent.apply(cls,args);
  return retval;
}

/**
 *  Function: ng_CallParentEx
 *  Invoke original implementation of method if method was overriden
 *  by <ng_OverrideMethod>.
 *
 *  Syntax:
 *    mixed *ng_CallParentEx* (object class, string metod, array args)
 *
 *  Parameters:
 *    class - the class which method should be called
 *    method - name of the method to be called
 *    args - method arguments in a form of array
 *
 *  Returns:
 *    Object with property named ReturnValue where value returned by original
 *    implementation of method is stored or null if method was not overriden.
 */
function ng_CallParentEx(cls,method,args) {
  var fnc=cls[method];
  if((ng_IsOverriden(fnc))&&(fnc.hasParent())) return { ReturnValue: fnc.callParent.apply(cls,args) };
  return null;
}

// --- ngCookies ---------------------------------------------------------------

function ngSetCookie(name, value, expires, path, domain, secure, escapevalue)
{
  escapevalue = ngVal(escapevalue, true);
  var cookie_string = name+'='+(escapevalue ? ng_URLEncode(value) : value);
  if (typeof expires !== 'undefined') cookie_string+='; expires='+expires.toGMTString();
  if(path) cookie_string += '; path='+escape(path);
  if(domain) cookie_string += '; domain='+escape(domain);
  if(secure) cookie_string += '; secure';  
  document.cookie = cookie_string;
}

function ngCookieExpires(delta)
{
  var expires = new Date();  // current date & time
  expires.setTime(expires.getTime() + delta*1000);
  return expires;
}

function ngDeleteCookie(cookie_name, path, domain, secure)
{
  ngSetCookie(cookie_name, '', ngCookieExpires(-1), path, domain, secure);
}

function ngGetCookie(cookie_name)
{ 
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
  return( results ? ng_unescape(results[2]) : undefined);
}

function ngSetCookieByURL(name, value, expires, url, escapevalue)
{
  var secure=false,domain,path;
  url=ng_StripURLParams(url);
  var idx=url.indexOf("//");
  if(idx>=0) 
  {
    if(url.substring(0,idx) == 'https:') secure=true;
    url=url.substring(idx+2,url.length);

    idx=url.indexOf('/');
    if(idx>=0)
    {
      domain=url.substring(0,idx);
      url=url.substring(idx,url.length);
      path=url;
    }
    else domain=url;

    if(typeof domain === 'string')
    {
      idx=domain.indexOf('.');
      if(idx>=0) domain=domain.substring(idx+1,domain.length);
      else domain=undefined;
    }
  }
  else
  {
    path=url;
  }

  ngSetCookie(name, value, expires, path, undefined, secure, escapevalue);
}

// --- ngRPC -------------------------------------------------------------------

var rpcNone            = 0;
var rpcAuto            = 1;
var rpcScript          = 2;
var rpcIFrame          = 3;
var rpcHttpRequest     = 4;
var rpcHttpRequestPOST = 5;
var rpcHttpRequestGET  = 6;
var rpcJSON            = 7;
var rpcJSONPOST        = 8;
var rpcJSONGET         = 9;
var rpcData            = 10;
var rpcDataPOST        = 11;
var rpcDataGET         = 12;
var rpcUser            = 99;

var rpcMaxGetLength    = 2000;

var ngOnRPCCreated     = null;
var ngOnAnyRPCRequest  = null;

var ngRPCLastID = 0;
var ngRPCByID = {};

function getRPCByID(rpcid)
{
  rpcid=''+ngVal(rpcid,'');
  if((rpcid=='')||(!ngRPCByID)) return null;
  return ngVal(ngRPCByID[rpcid],null);
}

var rpcHeadElement = null;

function ngrpc_sendScriptRequest(url)
{
  if((this.OnSendRequest)&&(!ngVal(this.OnSendRequest(this, url, null),false))) return true;

  if(!rpcHeadElement)
  {
    rpcHeadElement = document.getElementsByTagName("head").item(0);
    if(!rpcHeadElement) return false;
  } 
  var sid=this.id+'S';
  var o = document.getElementById(sid);
  if(o) rpcHeadElement.removeChild(o); 
  o = document.createElement("script");  
  o.setAttribute("src",ng_URL(url)); 
  o.setAttribute("id",sid); 
  rpcHeadElement.appendChild(o);
  if(this.OnRequestSent) this.OnRequestSent(this, url, null);
  return true;
}

function ngrpc_sendIFrameRequest(url, params)
{
  var fid=this.id+'F';
  var ifrm = document.getElementById(fid);
  if(!ifrm)
  {
    ifrm = document.createElement('iframe');
    ifrm.id = fid;
    ifrm.style.visibility = "hidden";
    document.body.appendChild(ifrm);
    ng_IE7RedrawFix(document.body);
  }
  var doc = (ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document);
  if (!doc) return false;

  try
  {
    doc.open();
    doc.write('<html><body><form action="'+ng_URL(url)+'" method="'+(ng_EmptyVar(this.HTTPMethod) ? "POST" : this.HTTPMethod)+'" id="'+this.id+'">');
    var v;
    if(ng_IsObjVar(params))
    {
      // In URL_ESCAPING_UTF8 iframe encodes values itself, so no standard encoding is required
      if(ngURLDefaultEscaping==0) /* URL_ESCAPING_UTF8 */ ngURLDefaultEscaping=-1; // None
      try
      {
        for(var i in params)
        {                                        
          v=this.EncodeParam(i,params[i]);
          if(typeof v === 'undefined') continue;          
          doc.write('<input type="hidden" name="'+ng_htmlEncode(i)+'" value="'+ng_htmlEncode(v)+'" />');
        }
      }
      finally
      {
        if(ngURLDefaultEscaping==-1) /* URL_ESCAPING_UTF8 */ ngURLDefaultEscaping=0; // None
      }
    }
    if((this.OnIFrameRequest)&&(!ngVal(this.OnIFrameRequest(this,doc,url),false))) return false;
    doc.write('</form></body></html>');
    doc.close();
  }
  catch(e)
  {
    ngDEBUGERROR('ngRPC: Failed to create IFRAME form!',e);
    return false;
  }
  
  if((this.OnSendRequest)&&(!ngVal(this.OnSendRequest(this, url, doc),false))) return true;

  var frm=doc.getElementById(this.id);
  if(frm) 
  { 
    frm.submit(); 
    if(this.OnRequestSent) this.OnRequestSent(this, url, doc);
    return true; 
  }
  return false;          
}

function ngrpc_sendHttpRequest(url, callback, reqinfo)
{
  reqinfo.URL=url;
  if(this.OnSendRequest)
  {
    if(!ngVal(this.OnSendRequest(this, reqinfo.URL, reqinfo),false)) return true;
  }
  reqinfo.PostParams=ngVal(reqinfo.PostParams,null);
  reqinfo.ReqHeaders=ngVal(reqinfo.ReqHeaders,null);
  reqinfo.Method = ngVal(reqinfo.Method, (ng_EmptyVar(this.HTTPMethod) ? (typeof reqinfo.PostParams === 'string' ? 'POST' : 'GET') : this.HttpMethod));
  var xmlhttp=null;
  try {
    if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari      
    else 
    {
      try { xmlhttp=new ActiveXObject('Msxml2.XMLHTTP'); }   // code for IE6, IE5
      catch (e) { xmlhttp=new ActiveXObject('Microsoft.XMLHTTP'); }
    }
    if((!xmlhttp)&&(window.createRequest)) xmlhttp = window.createRequest();
  }
  catch(e)
  {
    ngDEBUGERROR('ngRPC: Failed to create XMLHttpRequest!',e);
    return false;
  }
  if(!xmlhttp) return false;
  reqinfo.XMLHttp=xmlhttp;
  if(callback)
  {
    var rpc=this;
    xmlhttp.onreadystatechange=function()
    {
      if((rpc.OnHTTPReadyStateChanged)&&(!ngVal(rpc.OnHTTPReadyStateChanged(rpc,xmlhttp,reqinfo),false))) return;
      if(xmlhttp.readyState==4) 
      {
        if((xmlhttp.status==200)||(xmlhttp.status==304)||(xmlhttp.status==0)) callback(rpc, xmlhttp.responseText, xmlhttp, reqinfo);
        else if(rpc.OnHTTPRequestFailed) rpc.OnHTTPRequestFailed(rpc,xmlhttp,reqinfo);                   
      }      
    }
  }
  if(typeof reqinfo.PostParams === 'string')
  {
    if(!reqinfo.ReqHeaders) reqinfo.ReqHeaders=new Object;
    if(typeof reqinfo.ReqHeaders['Content-type'] === 'undefined')
      reqinfo.ReqHeaders['Content-type'] = 'application/x-www-form-URLencoded';
    if(typeof reqinfo.ReqHeaders['Content-length'] === 'undefined')
      reqinfo.ReqHeaders['Content-length'] = reqinfo.PostParams.length;
    if(typeof reqinfo.ReqHeaders['Connection'] === 'undefined')
      reqinfo.ReqHeaders['Connection'] = 'close';
  }
  
  if((this.OnHTTPRequest)&&(!ngVal(this.OnHTTPRequest(this,reqinfo),false))) return false;
  xmlhttp.open(reqinfo.Method,ng_URL(reqinfo.URL),(callback ? true : false));
  if(reqinfo.ReqHeaders)
  {
    for(var i in reqinfo.ReqHeaders)
      xmlhttp.setRequestHeader(i,reqinfo.ReqHeaders[i]);
  }
  xmlhttp.send(reqinfo.PostParams);
  if(this.OnRequestSent) this.OnRequestSent(this, reqinfo.URL, reqinfo);
  return (callback ? true : xmlhttp.responseText);
}

function ngrpc_EncodeParam(n,v)
{
  if(typeof v === 'undefined') return v;
  if(this.OnEncodeParam) v=this.OnEncodeParam(this,n,v);
  else 
  {
    if((typeof v === 'object')&&(v))
    {
      if(typeof v.GetText === 'function') v=v.GetText();
      else if(typeof v.toString === 'function') v=v.toString();
    }
    v=ng_URLEncode(v);
  }
  return v;
}

function ngrpc_GetURLParams()
{
  var v,urlparams='';
  for(var i in this.Params)
  {
    v=this.EncodeParam(i,this.Params[i]);
    if(typeof v === 'undefined') continue; 
    if(urlparams!='') urlparams+='&'
    urlparams+=i+'='+v;
  }
  return urlparams;
}

function ngrpc_domain(url)
{
  url=ng_StripURLParams(url);
  var idx=url.indexOf('//');
  if(idx<0) return window.location.hostname;
  url=url.substring(idx+2,url.length);
  idx=url.indexOf('/');
  if(idx>=0) url=url.substring(0,idx);
  idx=url.indexOf(':');
  if(idx>=0) url=url.substring(0,idx);
  return url;
}

function ngrpc_sendRequest(url, nocache)
{
  if(this.Type == rpcNone) return false;

  url=ngVal(url, this.URL);
  nocache=ngVal(nocache, this.nocache);

  if((this.OnRequest)||(ngOnAnyRPCRequest))
  {
    var reqinfo = {
      URL: url,
      nocache: nocache
    };
    if((this.OnRequest)&&(!ngVal(this.OnRequest(this,reqinfo),false))) return false;
    if((ngOnAnyRPCRequest)&&(!ngVal(ngOnAnyRPCRequest(this,reqinfo),false))) return false;
    url=reqinfo.URL;
    nocache=reqinfo.nocache;
  }
  if(nocache) url=ng_AddURLParam(url,'_t='+new Date().getTime()); 

  var v,params='';
  var type=this.Type;
  switch(this.Type)
  {
    case rpcAuto:
    case rpcScript:
    case rpcHttpRequest:
    case rpcHttpRequestPOST:
    case rpcHttpRequestGET:
    case rpcJSON:
    case rpcJSONPOST:
    case rpcJSONGET:
    case rpcData:
    case rpcDataPOST:
    case rpcDataGET:
      params=this.GetURLParams();
      if((type===rpcAuto)||(type===rpcHttpRequest)||(type===rpcJSON)||(type===rpcData)) // determine req. type by params length 
      {        
        if((type===rpcAuto)&&(!ngCordova)&&(ngrpc_domain(url)!=window.location.hostname))
        {
          type=rpcScript;
        }
        else
        {
          type=rpcHttpRequest;
          var i=url.indexOf('?');
          if(i>=0) 
          {
            params=ng_AddURLParam(url.substr(i,url.length),params);
            if((params.length)&&(params.charAt(0)==='?')) params=params.substr(1,params.length);
            url=url.substr(0,i);
          }
          if(params.length>rpcMaxGetLength) 
          {
            switch(this.Type)
            {
              case rpcAuto:
              case rpcHttpRequest:
                type=rpcHttpRequestPOST;
                break;
              case rpcJSON:
                type=rpcJSONPOST;
                break;
              case rpcData:
                type=rpcDataPOST;
                break;
            }
          }
          else
          {
            switch(this.Type)
            {
              case rpcAuto:
              case rpcHttpRequest:
                type=rpcHttpRequestGET;
                break;
              case rpcJSON:
                type=rpcJSONGET;
                break;
              case rpcData:
                type=rpcDataGET;
                break;
            }
          }
        }
      }
      break;
  }
  switch(type)
  {
    case rpcScript:
      if(params!='') url=ng_AddURLParam(url, params);
      return this.sendScriptRequest(url);

    case rpcIFrame:
      return this.sendIFrameRequest(url,this.Params);

    case rpcHttpRequestPOST:    
    case rpcHttpRequestGET:    
    case rpcJSONPOST:
    case rpcJSONGET:
    case rpcDataPOST:
    case rpcDataGET:
      var ri={ ReqHeaders: { RPC: 1 } };
      if((type===rpcHttpRequestGET)||(type===rpcJSONGET)||(type===rpcDataGET))
      {
        if(params!='') url=ng_AddURLParam(url, params);
      }
      else ri.PostParams=params;
      return this.sendHttpRequest(url, function(rpc, response, xmlhttp, reqinfo) {
        if((rpc.OnReceivedData)&&(!ngVal(rpc.OnReceivedData(rpc, response, xmlhttp, reqinfo),false))) 
          return;

        switch(type)
        {
          case rpcHttpRequestGET:
          case rpcHttpRequestPOST:    
            if(ngWinStoreApp) {
              MSApp.execUnsafeLocalFunction(function () {
                  window["eval"].call(window, '(function() {'+response+'})();');
              });
            } else {
              new Function(response)();
            }
            break;
          case rpcJSONGET:
          case rpcJSONPOST:
            try {
              var data=JSON.parse(response);
            } 
            catch(e) 
            { 
              ngDEBUGERROR('ngRPC: JSON parsing failed!',e);
              if(rpc.OnHTTPRequestFailed) rpc.OnHTTPRequestFailed(rpc,xmlhttp);
              break;
            }
            if(rpc.OnReceivedJSON) rpc.OnReceivedJSON(rpc, data, xmlhttp); 
            break;
          case rpcDataGET:
          case rpcDataPOST:
            break;
        }
      }, ri);
      
    case rpcUser:
      if(!this.OnSendRequest) return false;
      if(!ngVal(this.OnSendRequest(this, url),false)) return false;
      if(this.OnRequestSent) this.OnRequestSent(this, url, null);
      return  true;
  }
  return false;
} 

function ngrpc_clearParams()
{
  this.Params=new Object;
}

function ngrpc_SetParam(n,v)
{
  if((typeof n==='undefined')||(n=='')) return;
  this.Params[n]=v;
}

function ngrpc_GetParam(n)
{
  return this.Params[n];
}

/**
 *  Class: ngRPC
 *  Remote Procedure Call.
 *   
 *  This class is used for asynchronous communication with server.
 *  
 *  Syntax:
 *    new *ngRPC* ([string id='', string url='', bool nocache=false])
 *    
 *  Parameters:
 *    id - unique ID of RPC class  
 *    url - request URL      
 *    nocache - if TRUE, unique timestamp is added to every request to prevent caching results  
 */   
function ngRPC(id,url,nocache)
{
  if(ngVal(id,'')=='')
  {
    ngRPCLastID++;
    id='ngRPC'+ngRPCLastID;
  }
  this.id=id+'_RPC';
  ngRPCByID[id]=this;
  
  this.sendScriptRequest = ngrpc_sendScriptRequest;
  this.sendIFrameRequest = ngrpc_sendIFrameRequest;
  this.sendHttpRequest = ngrpc_sendHttpRequest;
  this.GetURLParams = ngrpc_GetURLParams;
  this.EncodeParam = ngrpc_EncodeParam;

  /*
   *  Group: Properties
   */
  /*  Variable: nocache
   *  If TRUE, unique timestamp is added to every request to prevent caching
   *  of results.
   *  
   *  Default value: *false*  
   */ 
  this.nocache=ngVal(nocache,false);
  /*  Variable: Type
   *  Type of RPC call.
   *  
   *  Type: integer
   *  Default value: *rpcAuto*  
   */ 
  this.Type=rpcAuto;
  /*  Variable: HTTPMethod
   *  Used http method (if http request). If empty, autodetect.
   *  
   *  Type: string
   *  Default value: *''* (autodetect)  
   */ 
  this.HTTPMethod='';
  /*  Variable: URL
   *  Default RPC URL.
   *  
   *  Type: string
   *  Default value: *''*  
   */ 
  this.URL=ngVal(url,'');
  /*  Variable: Params
   *  RPC Parameters.
   *  
   *  Type: object
   *  Default value: *{ }*  
   */ 
  this.Params=new Object;
    
  /*
   *  Group: Methods
   */
  /*  Function: SetParam
   *  Sets request parameter.
   *  
   *  Syntax:
   *    void *SetParam* (string name, mixed value)
   *    
   *  Parameters:
   *    name - parameter name
   *    value - parameter value
   *    
   *  Returns:
   *    -
   */          
  this.SetParam = ngrpc_SetParam;
  /*  Function: GetParam
   *  Gets value of request parameter.
   *  
   *  Syntax:
   *    mixed *GetParam* (string name)
   *    
   *  Parameters:
   *    name - parameter name
   *    
   *  Returns:
   *    Value of parameter.
   */          
  this.GetParam = ngrpc_GetParam;
  /*  Function: sendRequest
   *  Sends request to the server.
   *  
   *  Syntax:
   *    void *sendRequest* (string url)
   *    
   *  Parameters:
   *    url - URL with parameters
   *    
   *  Returns:
   *    -
   */          
  this.sendRequest = ngrpc_sendRequest;
  /*  Function: clearParams
   *  Clears RPC parameters.
   *  
   *  Syntax:
   *    void *clearParams* ()
   *    
   *  Returns:
   *    -
   */          
  this.clearParams = ngrpc_clearParams;
  
  /*
   *  Group: Events
   */
  /*  Function: AddEvent
   *  Adds new function to the event handler (callback).   
   *   
   *  Syntax:
   *    void *AddEvent* (string event, function handler)
   *    
   *    void *AddEvent* (function handler, string event)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.AddEvent = ngObjAddEvent;
  /*  Function: RemoveEvent
   *  Removes function from the event handler (callback).   
   *   
   *  Syntax:
   *    void *RemoveEvent* (string event, function handler)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.RemoveEvent = ngObjRemoveEvent;
  /*
   *  Event: OnEncodeParam
   */     
  this.OnEncodeParam = null;
  /*
   *  Event: OnRequest
   */     
  this.OnRequest = null;
  /*
   *  Event: OnSendRequest
   */     
  this.OnSendRequest = null;
  /*
   *  Event: OnRequestSent
   */       
  this.OnRequestSent = null;
  /*
   *  Event: OnIFrameRequest
   */     
  this.OnIFrameRequest = null;
  /*
   *  Event: OnHTTPRequest
   */     
  this.OnHTTPRequest = null;
  /*
   *  Event: OnHTTPReadyStateChanged
   */     
  this.OnHTTPReadyStateChanged = null;
  /*
   *  Event: OnHTTPRequestFailed
   */     
  this.OnHTTPRequestFailed = null;
  /*
   *  Event: OnReceivedJSON
   */     
  this.OnReceivedJSON = null;
  /*
   *  Event: OnReceivedData
   */     
  this.OnReceivedData = null;
  
  if(ngOnRPCCreated) ngOnRPCCreated(this);
}

/**
 *  Class: ngRDS
 *  Remote Data Service based on <ngRPC> class.
 *   
 *  This class is used for getting asynchronous data from server.
 *  
 *  Syntax:
 *    new *ngRDS* ([string id='', string url='', function callback = null, bool nocache=false])
 *    
 *  Parameters:
 *    id - unique ID of RPC class  
 *    url - request URL
 *    callback - function which is called after data was received       
 *    nocache - if TRUE, unique timestamp is added to every request to prevent caching results  
 */   
function ngRDS(id,url,callback,nocache)
{
  this.__rpc=ngRPC;
  this.__rpc(id,url,nocache);
  delete this.__rpc;

  this.Type=rpcJSON;
  if(typeof callback === 'function')
  {
    this.OnReceivedJSON = function(rpc, response, xmlhttp) {
      callback(rpc, response, xmlhttp);
    }; 
    this.OnReceivedData = function(rpc, response, xmlhttp) {
      if((rpc.Type===rpcJSON)||(rpc.Type===rpcJSONGET)||(rpc.Type===rpcJSONPOST)) return true;
      callback(rpc, response, xmlhttp);
    };
  }
}

// --- ngStringBuilder ---------------------------------------------------------

/**
 *  Class: ngStringBuilder
 *  This class realizes fast concatenation of strings.
 *  
 *  Standard JavaScript string concatenation is quite slow. This class utilizes
 *  the fact that array joining is much faster than standard string 
 *  concatenation.    
 *    
 *  Syntax:
 *    new *ngStringBuilder* (mixed value)
 *   
 *  The statement:  
 *    > s = s1 + s2 + s3;
 *     
 *  can be replaced with:
 *    > var sb = new ngStringBuilder(s1);
 *    > sb.append(s2);
 *    > sb.append(s3);
 *    > s = sb.toString();
 *  
 */ 
// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
function ngStringBuilder(value)
{
  this.strings = new Array("");

  /** 
   *  Function: append 
   *  Appends the given value to the end of this instance.
   *  
   *  Syntax:
   *    <ngStringBuilder> *append* (mixed value)
   *    
   *  Parameters:
   *    value - string, array or other ngStringBuilder class
   *             
   *  Returns: 
   *    This instance of ngStringBuilder. 
   *    Helps function chaining - sb.append('a').append('b').append('c').
   */                     
  this.append = function (value)
  {
    if(value) 
    {
      if(typeof value === 'string') this.strings.push(value);
      else
      {
        if(value.strings)  for(var i=0;i<value.strings.length;i++) this.strings.push(value.strings[i]);
        else               for(var i=0;i<value.length;i++) this.strings.push(value[i]);
      }
    }
    return this;
  }
  
  /**
   *  Function: clear
   *  Clears the string buffer.
   *  
   *  Syntax:
   *    void *clear* ()
   *  
   *  Returns:
   *    -
   */                     
  this.clear = function ()
  {
    this.strings.length = 1;
  }
  
  /**
   *  Function: empty
   *  Tests if string buffer is empty.
   *  
   *  Syntax:
   *    bool *empty* ()
   *    
   *  Returns:
   *    TRUE if string buffer is empty.
   */                     
  this.empty = function ()
  {
    return (this.strings.length <= 1);
  }
  
  /**
   *  Function: toString
   *  Converts this instance to a String.
   *  
   *  Syntax:
   *    string *toString* ()
   *    
   *  Returns:
   *    String with concatenated values.
   *    
   *  See also:
   *    <append>         
   */                     
  this.toString = function ()
  {
    return this.strings.join("");
  }

  this.append(value);
}

(function() {
  var url=document.location.href;
  var idx=url.indexOf("://");
  if(idx>=0) 
  {
    ngHTTPProtocol=url.substring(0,idx+3);
    if(ngHTTPProtocol=='file://') ngHTTPProtocol='http://';
  }    
})();

ng_DetectLibsURL();

ngEmptyURL = ngLibPath('ng_basic', 'empty.gif?nop');
