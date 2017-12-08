/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2008-2016 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

/**
 *  Variable: ngControlsVer
 *  Main version of the Controls framework.
 */
var ngControlsVer    = 5;
/**
 *  Variable: ngControlsSubVer
 *  Subversion of the Controls framework.
 */
var ngControlsSubVer = 0;
/**
 *  Variable: ngControlsAPIVersion
 *  Version of the Controls framework evaluated as string.
 */
var ngControlsVersion = ngControlsVer+'.'+ngControlsSubVer;
/**
 *  Variable: ngControlsAPICopyright
 *  Controls framework copyright information.
 */
var ngControlsCopyright = 'Copyright &copy 2008-2016 Position s.r.o.';

/**
 *  Variable: ngApp
 *  Reference to running <ngApplication> object.
 */
var ngApp = null;
/**
 *  Variable: ngDESIGNINFO
 *  TRUE if controls design info present.
 */
var ngDESIGNINFO = (typeof ngDESIGNINFO === 'undefined' ? 0 : ngDESIGNINFO);
var ngDESIGNINFOCnt=0;

var ngDesignInfoNotInheritedProps = [ 'MissingDI', 'ControlCategory', 'Image', 'IsContainer' ];

/**
 *  Function: ngHASDESIGNINFO
 *  Tests if controls design info is enabled.
 *
 *  Syntax:
 *    mixed *ngHASDESIGNINFO* ()
 *
 *  Returns:
 *    DesignInfo state (0=disabled).
 */
function ngHASDESIGNINFO() {
  return ((ngHASDEBUG())&&(ngDESIGNINFO)&&(ngDESIGNINFOCnt>0));
}

function ngDesignInfoBegin() {
  ngDESIGNINFOCnt++;
}

function ngDesignInfoEnd() {
  ngDESIGNINFOCnt--;
  if (ngDESIGNINFOCnt<0) ngDESIGNINFOCnt=0;
}

/**
 *  Variable: ngc_Lang
 *  Application languages resource strings/objects.
 */
/*<>*/

if(typeof ngc_Lang === 'undefined') ngc_Lang={};
if(typeof ngc_Lang['en'] === 'undefined') ngc_Lang['en']={};
ngc_Lang['en']['ngAppOldControlsVersion']='Application requires newer version of Controls.js!\nRequired %s.%s, used %s.%s.\n\nApplication terminated!';
ngc_Lang['en']['ngEmptyString']=''; // Don't define that in other languages

/**
 *  Variable: ngc_SupportedLangs
 *  Application supported languages. Associative array, keys are languages.
 */
if(typeof ngc_SupportedLangs === 'undefined') ngc_SupportedLangs={};
/**
 *  Variable: ngc_SupportedLangsLocked
 *  If application supported languages can not be changed.
 */
if(typeof ngc_SupportedLangsLocked === 'undefined') ngc_SupportedLangsLocked=false;

/**
 *  Variable: ngIE6AlignFix
 *  If TRUE, the controls API fixes right align property in IE6. Turn off
 *  if you don't care about pixels precision and prefer slightly faster rendering.
 *
 *  Default value: *true*
 */
if(typeof ngIE6AlignFix === 'undefined') ngIE6AlignFix = true;

/**
 *  Variable: ngDefaultHTMLEncoding
 *  Default setting for HTML encoding.
 *  If TRUE, the components encode HTML special characters by default.
 *
 *  Default value: *false*
 */
if(typeof ngDefaultHTMLEncoding === 'undefined') ngDefaultHTMLEncoding = false;

/**
 *  Function: ngLang
 *  Defines resource string/object.
 *
 *  Syntax: *ngLang* (string id, mixed data [,string lng] [,boolean allowOverride])
 *
 *  Returns:
 *  -
 */
function ngLang(id,data,lng,allowOverride)
{
  if(typeof id==='undefined') return;
  if(typeof lng === 'undefined') lng=ng_cur_lng;
  if(typeof allowOverride === 'undefined') allowOverride=true;
  lng=''+lng;
  if(lng=='') return;
  if(typeof ngc_Lang === 'undefined') ngc_Lang={};
  if(typeof ngc_Lang[lng] === 'undefined') ngc_Lang[lng]={};
  if((typeof ngc_Lang[lng][id] === 'undefined') || allowOverride) ngc_Lang[lng][id]=data;

  var li=ngExtractLangId(lng);
  if(typeof ngc_Lang[li.Lang] === 'undefined') ngc_Lang[li.Lang]={};
  var sublang=ngMakeLangId(li.Lang,li.LangCountry);
  if(typeof ngc_Lang[sublang] === 'undefined') ngc_Lang[sublang]={};
}

var ng_cur_lng = 'en';
var ng_cur_lng_stack = new Array();

/**
 *  Function: ngBeginLang
 *  Begins block of locale definition with id lngid.
 *
 *  Syntax: *ngLang* (string lngid)
 *
 *  Returns:
 *  -
 */
function ngBeginLang(lng)
{
  ng_cur_lng_stack.push(ng_cur_lng);
  ng_cur_lng=lng;
}

/**
 *  Function: ngBeginLang
 *  End block of locale definition.
 *
 *  Syntax: *ngLang* (string lngid)
 *
 *  Returns:
 *  Actual locale id.
 */
function ngEndLang()
{
  if(ng_cur_lng_stack.length>0) ng_cur_lng=ng_cur_lng_stack.pop();
  return ng_cur_lng;
}

/**
 *  Function: ngNormalizeLang
 *  Normalize language.
 *
 *  Syntax: string *ngNormalizeLang* (string lngid)
 *
 *  Returns:
 *    Normalized language.
 */
function ngNormalizeLang(lng)
{
  var li=ngExtractLangId(lng);
  lng = (''+li.Lang).replace(/^\s+|\s+$/g,"").toLowerCase(); // trim + lowercase
  return lng;
}

/**
 *  Function: ngExtractLangId
 *  Extracts language, country and variant from given identifier.
 *
 *  Syntax: object *ngExtractLangId* (string lngid)
 *
 *  Returns:
 *    Object with extracted language info.
 */
function ngExtractLangId(lngid)
{
  var lng,cntry,variant;
  var d=new RegExp('([a-z]*)([-\._|]([a-z]*)([-\._|]([a-z]*))?)?').exec((''+lngid).toLowerCase());
  if(d) {
    lng=d[1];
    cntry=d[3];
    variant=d[5];
    if(cntry=='') variant='';
    if(lng=='') {
      cntry='';
      variant='';
    }
  }
  return {
    Lang: lng,
    LangCountry: cntry,
    LangVariant: variant
  };
}

/**
 *  Function: ngMakeLangId
 *  Combines language, country and variant to language identifier.
 *
 *  Syntax: string *ngMakeLangId* (lang [, country, variant, separator='-'])
 *
 *  Returns:
 *    Language identifier.
 */
function ngMakeLangId(lang, country, variant, separator)
{
  if(!separator) separator='-';
  return lang+(country ? separator+country+(variant ? separator + variant : '') : '');
}

/**
 *  Function: ngGetSupportedLangs
 *  Gets application supported languages
 *
 *  Syntax: array *ngGetSupportedLangs* ()
 *
 *  Returns:
 *    Array of supported languages.
 */
function ngGetSupportedLangs()
{
  var res = new Array;
  if(typeof ngc_SupportedLangs!=='object' || !ngc_SupportedLangs)
    ngc_SupportedLangs = {};
  for(var k in ngc_SupportedLangs)
    res.push(k);

  if(res.length==0 && typeof ngc_Lang==='object' && ngc_Lang) {
    var i;
    for(var k in ngc_Lang) {
      if(k==='cz') k='cs';
      k=ngNormalizeLang(k);
      for(i=res.length-1;i>=0;i--) if(res[i]===k) break;
      if(i<0) res.push(k);
    }
  }

  return res;
}

/**
 *  Function: ngGetSupportedLang
 *  Gets application supported language.
 *
 *  Syntax: string *ngGetSupportedLang* (string lang)
 *
 *  Returns:
 *    same value as given by parameter lang if lang is supported,
 *    otherwise returns first of supported languages
 */
function ngGetSupportedLang(lng)
{
  var pos,deflang='en';
  var lng=''+ngNullVal(lng,deflang);
  var arr=false;

  if(typeof ngc_SupportedLangs!=='object' || !ngc_SupportedLangs)
    ngc_SupportedLangs = {};
  else
    for(var k in ngc_SupportedLangs) { arr=true; break; };

  lng = ngNormalizeLang(lng);
  if((lng=='')||(arr && !ngc_SupportedLangs[lng])||(!arr && typeof ngc_Lang[lng]==='undefined'))
  {
    switch(lng)
    {
      case 'cs':
        if((arr && ngc_SupportedLangs['cz'])||(!arr && typeof ngc_Lang['cz']!=='undefined')) return lng;
        break;
      case 'cz':
        if((arr && ngc_SupportedLangs['cs'])||(!arr && typeof ngc_Lang['cs']!=='undefined')) return lng;
        break;
      case 'sk':
        if((arr && (ngc_SupportedLangs['cs'] || ngc_SupportedLangs['cz']))
        ||(!arr && (typeof ngc_Lang['cs']!=='undefined' || typeof ngc_Lang['cz']!=='undefined'))) return 'cs';
        break;
    }
    if(((lng=='cs')||(lng=='cz'))&&((arr && ngc_SupportedLangs['sk'])||(!arr && typeof ngc_Lang['sk']!=='undefined'))) return 'sk';
    if((arr && ngc_SupportedLangs[deflang])||!arr) lng=deflang;
    else for(var k in ngc_SupportedLangs) { lng = k; break; }
  }
  return lng;
}

/**
 *  Function: ngIsSupportedLang
 *  Checks if given language is supported by application.
 *
 *  Syntax: boolean *ngIsSupportedLang* (string lang)
 *
 *  Returns:
 *    True if language is supported, or false if not.
 */
function ngIsSupportedLang(lng)
{
  return (ngGetSupportedLang(lng)===ngNormalizeLang(lng));
}

/**
 *  Function: ngSetSupportedLang
 *  Sets application supported language(s).
 *
 *  Syntax: boolean *ngSetSupportedLang* (mixed lang[, mixed lang1[, mixed lang2[, mixed ...]]])
 *
 *  Returns:
 *    True if supported languages were set.
 */
function ngSetSupportedLang()
{
  if(ngc_SupportedLangsLocked) return false;
  
  ngc_SupportedLangs={};
  ngAddSupportedLang.apply(this,arguments);
  return true;
}

/**
 *  Function: ngAddSupportedLang
 *  Adds application supported language(s).
 *
 *  Syntax: boolean *ngAddSupportedLang* (mixed lang[, mixed lang1[, mixed lang2[, mixed ...]]])
 *
 *  Returns:
 *    True if supported languages were added.
 */
function ngAddSupportedLang()
{
  if(ngc_SupportedLangsLocked) return false;
 
  var lng, empty, lang;
  for(var k in arguments)
  {
    lng = arguments[k];
    if(typeof lng==='string')
      lng = lng.split(';');
    if(typeof lng==='object' && lng)
    {
      if(typeof ngc_SupportedLangs!=='object' || !ngc_SupportedLangs)
        ngc_SupportedLangs={};
      for(var l in lng)
      {
        if(typeof lng[l]==='string')
        {
          lang = ngNormalizeLang(lng[l]);
          if(lang!=='') ngc_SupportedLangs[lang]=true;
        }
        else
        {
          lang = ngNormalizeLang(l);
          if(lang!=='') ngc_SupportedLangs[lang]=true;
        }
      }
    }
  }
  return true;
}

/**
 *  Function: ngTxt
 *  Gets locale text.
 *
 *  Syntax: string *ngTxt* (string id [, mixed defaultvalue])
 *
 *  Returns:
 *  Locale text.
 */
function ngTxt(t, defval)
{
  var lang,sublang,mainlang;
  if((typeof ngApp === 'object') && ngApp)
  {
    mainlang=ngApp.Lang;
    if(ngApp.LangCountry) sublang=ngApp.Lang+'-'+ngApp.LangCountry;
    if(ngApp.LangVariant) lang=ngApp.Lang+'-'+ngApp.LangCountry+'-'+ngApp.LangVariant;
  }
  else mainlang='en';

  function gettxt2(def,lng,t,olng)
  {
    var l=def[lng];
    if(typeof l === 'undefined') return l;
    var txt=l[t];
    if((typeof txt!=='undefined')&&(olng)&&(olng!==lng))
    {
      if(typeof def[olng]==='undefined') def[olng]={};
      def[olng][t]=ng_CopyVar(txt);
    }
    return txt;
  }

  function gettxt(def,t)
  {
    var txt;
    if(lang) {
      txt=gettxt2(def,lang,t);
      if(typeof txt!=='undefined') return txt;
    }
    if(sublang) {
      txt=gettxt2(def,sublang,t,lang)
      if(typeof txt!=='undefined') return txt;
    }
    if(mainlang) {
      txt=gettxt2(def,mainlang,t,lang ? lang : sublang);
      if(typeof txt!=='undefined') return txt;
      switch(mainlang)
      {
        case 'cs':
          txt=gettxt2(def,'cz',t,(sublang ? sublang : mainlang));
          if(typeof txt!=='undefined') return txt;
          break;
        case 'cz':
          txt=gettxt2(def,'cs',t,(sublang ? sublang : mainlang));
          if(typeof txt!=='undefined') return txt;
          break;
      }
    }
    if(mainlang!=='en') txt=gettxt2(def,'en',t,mainlang);
    return txt;
  }

  var txt;
  if((typeof ngDevice !== 'undefined')&&(typeof ngc_Lang['DEV_'+ngDevice] !== 'undefined'))
  {
    txt=gettxt(ngc_Lang['DEV_'+ngDevice],t);
    if(typeof txt==='undefined') txt=gettxt(ngc_Lang,t);
  }
  else txt=gettxt(ngc_Lang,t);

  if(typeof txt==='undefined')
  {
    txt=defval;
    if(typeof txt==='undefined')
    {
      txt=t;
      if(ngHASDEBUG()) ngDEBUGWARN('[ngTxt] Missing string for ID "%s"',t);
    }
  }
  return txt;
}

/**
 *  Function: ngRes
 *  Gets locale resource object.
 *
 *  Syntax: object *ngRes* (string id)
 *
 *  Returns:
 *  Locale resource object.
 */
function ngRes(rid)
{
  var lang,sublang,mainlang;
  if((typeof ngApp === 'object') && ngApp)
  {
    mainlang=ngApp.Lang;
    if(ngApp.LangCountry) sublang=ngApp.Lang+'-'+ngApp.LangCountry;
    if(ngApp.LangVariant) lang=ngApp.Lang+'-'+ngApp.LangCountry+'-'+ngApp.LangVariant;
  }
  else mainlang='en';

  function getres2(def,lng,rid,baseres)
  {
    var l=def[lng];
    if(typeof l === 'undefined') return l;
    var res=l[rid];
    if(typeof res === 'undefined') return res;
    var r=ng_CopyVar(res);
    if(baseres) ng_MergeDef(r,baseres,true);
    return r;
  }

  function getres(def,rid, warn)
  {
    var res;
    var le=def['en'];
    var eres=(typeof le === 'undefined' ? le : le[rid]);

    if(lang) {
      res=getres2(def,lang,rid,eres);
      if(typeof res!=='undefined') return res;
    }
    if(sublang) {
      res=getres2(def,sublang,rid,eres);
      if(typeof res!=='undefined') return res;
    }
    if((mainlang)&&(mainlang!=='en')) {
      res=getres2(def,mainlang,rid,eres);
      if(typeof res!=='undefined') return res;
      switch(mainlang)
      {
        case 'cs':
          res=getres2(def,'cz',rid,eres);
          if(typeof res!=='undefined') return res;
          break;
        case 'cz':
          res=getres2(def,'cs',rid,eres);
          if(typeof res!=='undefined') return res;
          break;
      }
    }
    if((ngHASDEBUG())&&(typeof eres==='undefined')&&(warn))
      ngDEBUGWARN('[ngRes] Missing resource for ID "%s"',rid);
    return ng_CopyVar(eres);
  }

  if((typeof ngDevice !== 'undefined')&&(typeof ngc_Lang['DEV_'+ngDevice] !== 'undefined'))
  {
    var dres=getres(ngc_Lang['DEV_'+ngDevice],rid,false);
    if(typeof dres !== 'undefined') return dres;
  }
  return getres(ngc_Lang,rid,true);
}

// --- ngModal -----------------------------------------------------------------

/**
 *  Group: Events
 */
/**
 *  Event: OnStartModal
 *  Occurs when modal window curtain is going to be displayed.
 *
 *  Syntax:
 *    bool *OnStartModal* ()
 *
 *  Returns:
 *    FALSE if curtain shouldn't be displayed.
 */
var OnStartModal = OnStartModal || null;
/**
 *  Event: OnStopModal
 *  Occurs when modal window curtain is going to be removed.
 *
 *  Syntax:
 *    bool *OnStopModal* ()
 *
 *  Returns:
 *    FALSE if curtain shouldn't be removed.
 */
var OnStopModal = OnStopModal || null;
/**
 *  Event: OnModalChanged
 *  Occurs when modal window curtain has changed.
 *
 *  Syntax:
 *    void *OnModalChanged* (object o, boolean up)
 *
 * Parameters:
 *    o - Curtain node
 *    up - If curtain has gone up or down
 *
 *  Returns:
 *    -
 */
var OnModalChanged = OnModalChanged || null;

/**
 *  Variable: ngModalClassName
 *  CSS class used for modal curtain.
 */
var ngModalClassName = 'ngModalCurtain';

var ngModalZIndexDelta = 10000;
var ngModalCnt=0;

/**
 *  Function: ngStartModalControl
 *  Shows modal window curtain.
 *
 *  Syntax:
 *    void *ngStartModalControl* ()
 *
 *  Returns:
 *    -
 */
function ngStartModalControl()
{
  if(!ngModalCnt)
  {
    if((!OnStartModal)||(ngVal(OnStartModal(),false)))
    {
      var o = document.getElementById('NGMODALWINDOW_CURTAIN');
      if(!o)
      {
         var parent=((typeof ngApp === 'object')&&(ngApp) ? ngApp.TopElm() : document.body);
         o=document.createElement('div');
         o.id="NGMODALWINDOW_CURTAIN";
         o.className=ngModalClassName;
         o.style.position='absolute';
         o.style.left=ng_ScrollX(parent)+'px';
         o.style.top=ng_ScrollY(parent)+'px';
         o.style.width='100%';
         o.style.height='100%';
         o.style.display='block';
         o.style.zIndex=ngModalZIndexDelta;
         if(parent) {
           parent.appendChild(o);
           parent.onscroll=ngAddEvent(parent.onscroll,function() {
             if(ngModalCnt>0) {
               o.style.left=ng_ScrollX(parent)+'px';
               o.style.top=ng_ScrollY(parent)+'px';
             }
           });
         }
      }
      else
      {
        var parent=o.parentNode;
        o.className=ngModalClassName;
        o.style.left=ng_ScrollX(parent)+'px';
        o.style.top=ng_ScrollY(parent)+'px';
        o.style.zIndex=ngModalZIndexDelta;
        o.style.display='block';
        o.style.visibility='visible'; // IE7 sometimes don't hide elements if display is none
        ng_IE7RedrawFix(o);
      }
    }
  }
  ngModalCnt++;
  var o = document.getElementById('NGMODALWINDOW_CURTAIN');
  if(ngModalCnt>1)
  {
    if(o) o.style.zIndex=(ngModalCnt*ngModalZIndexDelta);
  }

  if(OnModalChanged) OnModalChanged(o,true);
}

/**
 *  Function: ngStopModalControl
 *  Hides modal window curtain.
 *
 *  Syntax:
 *    void *ngStopModalControl* ()
 *
 *  Returns:
 *    -
 */
function ngStopModalControl()
{
  ngModalCnt--;
  var o = document.getElementById('NGMODALWINDOW_CURTAIN');
  if(ngModalCnt<=0)
  {
    ngModalCnt=0;
    if((!OnStopModal)||(ngVal(OnStopModal(),false)))
    {
      o = document.getElementById('NGMODALWINDOW_CURTAIN');
      if(o)
      {
        o.style.display='none';
        o.style.visibility='hidden'; // IE7 sometimes don't hide elements if display is none
        ng_IE7RedrawFix(o);
      }
    }
  }
  else
  {
    if(o) o.style.zIndex=(ngModalCnt*ngModalZIndexDelta);
  }
  if(OnModalChanged) OnModalChanged(o,false);
}

/**
 *  Function: ng_IsInactiveModalElm
 *  Tests if given element if under modal curtain.
 *
 *  Syntax:
 *    bool *ng_IsInactiveModalElm* (object elm)
 *
 *  Parameters:
 *    elm - DOM element object
 *
 *  Returns:
 *    TRUE if element is under modal curtain.
 */
function ng_IsInactiveModalElm(elm) {
  if(!ngModalCnt) return false;
  if((!elm) || (elm == document) || (elm==window) || (elm.tagName == 'BODY')) return false;

  var lo=ngModalCnt*ngModalZIndexDelta;
  if(lo<=0) return false;

  var p=elm;
  var z,zi=0;
  while((p)&&(p!=document))
  {
    try
    {
      z=ng_GetCurrentStylePx(p,'z-index');
      if(z>zi) zi=z;
    }
    catch(e) { }
    p=p.parentNode;
  }
  return (zi<lo);
}

function ngw_OnDOMFocus(e)
{
  if (!e) e = window.event;
  var elm =  e.srcElement || e.target;
  if(ng_IsInactiveModalElm(elm))
  {
    try {
      elm.blur();
    }
    catch(e) { }
  }
}

if(window.addEventListener)
  window.addEventListener("focus",ngw_OnDOMFocus,true);
else if(window.attachEvent)
  window.attachEvent('onfocus', ngw_OnDOMFocus);

// --- Functions ---------------------------------------------------------------

var ssNone       = 0;
var ssDefault    = 1;
var ssAuto       = 2;
var ssBoth       = 3;
var ssHorizontal = 4;
var ssVertical   = 5;

function ng_SetScrollBars(o, v)
{
  if(o)
    switch(v)
    {
      case ssNone:       o.style.overflow='hidden'; o.style.overflowX='hidden'; o.style.overflowY='hidden'; break;
      case ssAuto:       o.style.overflow='auto';   o.style.overflowX='auto';   o.style.overflowY='auto';   break;
      case ssBoth:       o.style.overflow='scroll'; o.style.overflowX='scroll'; o.style.overflowY='scroll'; break;
      case ssHorizontal: o.style.overflow='scroll'; o.style.overflowX='scroll'; o.style.overflowY='hidden'; break;
      case ssVertical:   o.style.overflow='scroll'; o.style.overflowX='hidden'; o.style.overflowY='scroll'; break;
      case ssDefault:    o.style.overflow='visible'; o.style.overflowX='visible'; o.style.overflowY='visible'; break;
    }
}

function ng_GetScrollBars(o)
{
  var ox=ng_GetCurrentStyle(o,'overflow-x');
  var oy=ng_GetCurrentStyle(o,'overflow-y');
  if((ox=='')||(oy==''))
  {
    var of=ng_GetCurrentStyle(o,'overflow');
    if(of=='') of='hidden';
    if(ox=='') ox=of;
    if(oy=='') oy=of;
  }
  var sb=ssNone;
  if((ox=='auto')||(oy=='auto')) sb=ssAuto;
  else {
    if((ox=='scroll')&&(oy=='scroll')) sb=ssBoth;
    else {
      if((ox=='visible')&&(oy=='visible')) sb=ssDefault;
      else {
        if(ox=='scroll') sb=ssHorizontal;
        else if(oy=='scroll') sb=ssVertical;
      }
    }
  }
  return sb;
}

function ng_ToAbsPath(path,lib)
{
  if((typeof path !== 'string')||(path=='')) return path;
  if(ng_IsAbsPath(path)) return path;
  path = path.replace(/\\/g, '/');
  if((typeof lib !== 'undefined')&&(lib!=''))
    return ngLibPath(lib) + path;
  if((typeof ngApp === 'object')&&(ngApp))
    return ngApp.AppPath + path;
  return window.location.href.substr(0, window.location.href.indexOf('#'))+path;
}

function ng_SetOpacity(o,v)
{
  if(typeof o==='string') o=document.getElementById(o);
  if(!o) return;
  if(v<0) v=0;
  if(v>1) v=1;
  o.style.opacity=v;
  o.style.filter='alpha(opacity=' + v*100 + ')';
}

function ng_Align(o)
{
  var ret=0,aret=0;
  var o,l,t,r,b;

  if(typeof o==='string') o=document.getElementById(o);
  if(!o) return 0;
  l=o.getAttribute('FL');
  r=o.getAttribute('FR');
  t=o.getAttribute('FT');
  b=o.getAttribute('FB');
  if((!ng_nullAttr(l))&&(!ng_nullAttr(r))) ret|=4;
  else
  {
    if(!ng_nullAttr(r)) ret|=1;
    else
    {
      if((o.style.left!='')&&(o.style.right!='')) aret|=4;
      else  if(o.style.right!='') aret|=1;
    }
  }

  if((!ng_nullAttr(t))&&(!ng_nullAttr(b))) ret|=8;
  else
  {
    if(!ng_nullAttr(b)) ret|=2;
    else
    {
      if((o.style.top!='')&&(o.style.bottom!='')) aret|=8;
      else  if(o.style.bottom!='') aret|=2;
    }
  }

  if(ret)
  {
    var po=o.parentNode;
    if(ret & 5)
    {
      var pw,w;
      pw=ng_ClientWidthEx(po);
      if(ret & 4)
      {
        w=(pw-r-l);
        if(w<0) w=0;
        ng_SetOuterWidth(o,w)
      }
      else if(ret & 1)
      {
        w=ng_OuterWidth(o);
        o.style.pixelLeft=(pw-r-w);
      }
    }

    if(ret & 10)
    {
      var ph,h;
      ph=ng_ClientHeightEx(po);
      if(ret & 8)
      {
        h=(ph-b-t);
        if(h<0) h=0;
        ng_SetOuterHeight(o,h);
      }
      else if(ret & 2)
      {
        h=ng_OuterHeight(o);
        o.style.pixelTop=(ph-b-h);
      }
    }
  }
  return ret|aret;
}

function ng_CanSelectElm(e)
{
  if((e)&&(e.style.visibility!=='hidden')&&(e.style.display!=='none')&&(!e.disabled))
  {
    switch(e.nodeName)
    {
      case 'INPUT':
      case 'TEXTAREA':
        return true;
    }
  }
  return false;
}

function ng_CanFocusElm(e)
{
  if((e)&&(e.style.visibility!=='hidden')&&(e.style.display!=='none')&&(!e.disabled))
  {
    if((ngIExplorer)&&(e.attributes.tabIndex)&&(e.attributes.tabIndex.specified)) return true;

    switch(e.nodeName)
    {
      case 'A':
      case 'AREA':
      //case 'BODY': // IE only :(
      case 'BUTTON':
      case 'FRAME':
      case 'IFRAME':
      // case 'IMG': // ??? MS says it is
      case 'INPUT':
      case 'OBJECT':
      case 'SELECT':
      case 'TEXTAREA':
        return true;
    }
    if(e.getAttribute("tabIndex")!==null)
      return true;
  }
  return false;
}

// --- Controls ----------------------------------------------------------------

var ngControlsIDs = {};
var ngControlImages = '';
var ngRegisteredControlTypes = {};
var ngOnRegisterControlType = ngOnRegisterControlType || null;
var ngRegisteredControlDesignInfos = {};
var ngOnRegisterControlDesignInfo = ngOnRegisterControlDesignInfo || null;
var ngMouseInControls = {};
var ngCurrentLib = '';
var ngCurrentUserControls = '';
var ngCurrentControlsGroup = '';

/**
 *  Function: ngGetControlById
 *  Gets control object by ID.
 *
 *  Syntax:
 *    object *ngGetControlById* (string id [, string ctrltype])
 *
 *  Parameters:
 *    id - control ID
 *    ctrltype - control type
 *
 *  Returns:
 *    Reference to control object.
 */
function ngGetControlById(id, type)
{
  if(id=='') return null;
  var c=ngControlsIDs[id];
  if(!c) return null;
  if((typeof type !== 'undefined')&&(ngVal(c.CtrlType,-1)!=type)) return null;
  return c;
}

/**
 *  Function: ngGetControlByElement
 *  Gets control object by DOM element.
 *
 *  Syntax:
 *    object *ngGetControlByElement* (mixed elm [, string ctrltype])
 *
 *  Parameters:
 *    elm - DOM element or element id
 *    ctrltype - control type
 *
 *  Returns:
 *    Reference to element's parent control object.
 */
function ngGetControlByElement(elm, type)
{
  if(typeof elm==='string') elm=document.getElementById(elm);
  if(!elm) return null;
  var c,p=elm;
  while((p)&&(p!==document))
  {
    c=ngGetControlById(p.id, type);
    if(c) break;
    p=p.parentNode;
  }
  return c;
}

/**
 *  Function: ngRegisterControlType
 *  Registers new control type.
 *
 *  Syntax:
 *    void *ngRegisterControlType* (string type, mixed def)
 *
 *  Parameters:
 *    type - unique control type identifier
 *    def - definition of control
 *
 *  Definition of control:
 *    string def - alias to existing control type
 *    object def - registration by definition, ancesor is defined by def.Type
 *    function def - registration by factory function(def,ref,parent)
 *
 *  Returns:
 *    -
 */
function ngRegisterControlType(type, def)
{
  if(typeof type!=='string') return;
  if ((ngOnRegisterControlType)&&(!ngVal(ngOnRegisterControlType(type,def),false))) return;

  switch(typeof def)
  {
    case 'function':
      if(typeof ngRegisteredControlTypes[type] === 'function') {
        ngDEBUGWARN('Duplicated registration of component type "%s".',ngVal(type,''),def);
      }
      if((ngCurrentLib!='')&&(typeof def.Lib === 'undefined')) def.Lib = ngCurrentLib;
      if((ngCurrentControlsGroup!='')&&(typeof def.ControlsGroup === 'undefined')) def.ControlsGroup = ngCurrentControlsGroup;
      if((ngCurrentUserControls!='')&&(typeof def.UserControls === 'undefined')) def.UserControls = ngCurrentUserControls;
      ngRegisteredControlTypes[type]=def;
      break;
    case 'object':
      if((typeof def.Type==='undefined')||(def.Type==type)) break;

      ngRegisterControlType(type, function(cdef,ref,parent) {
        var fdef=ng_CopyVar(def);
        var newtype=fdef.Type;
        delete fdef.Type;
        ng_MergeDef(cdef, fdef, true);
        return ngCreateControlAsType(cdef, newtype, ref, parent);
      });
      break;
    case 'string':
      if(type==def) return;
      ngRegisterControlType(type, function(cdef,ref,parent) {
        return ngCreateControlAsType(cdef, def, ref, parent);
      });
      break;
  }
}

/**
 *  Function: ngRegisterControlDesignInfo
 *  Registers new control design info.
 *
 *  Syntax:
 *    void *ngRegisterControlType* (string type, function di)
 *
 *  Parameters:
 *    type - control type identifier
 *    di - design info factory function(def,ref,parent)
 *
 *  Returns:
 *    -
 */
function ngRegisterControlDesignInfo(type, di)
{
  if((!ngHASDEBUG())||(!ngDESIGNINFO)||(typeof type!=='string')) return;
  if ((ngOnRegisterControlDesignInfo)&&(!ngVal(ngOnRegisterControlDesignInfo(type,di),false))) return;

  switch(typeof di)
  {
    case 'function':
      if(typeof ngRegisteredControlDesignInfos[type] === 'function') {
        ngDEBUGWARN('Duplicated registration of design info "%s".',ngVal(type,''),di);
      }
      if((ngCurrentLib!='')&&(typeof di.Lib === 'undefined')) di.Lib = ngCurrentLib;
      if((ngCurrentControlsGroup!='')&&(typeof di.ControlsGroup === 'undefined')) di.ControlsGroup = ngCurrentControlsGroup;
      if((ngCurrentUserControls!='')&&(typeof di.UserControls === 'undefined')) di.UserControls = ngCurrentUserControls;
      ngRegisteredControlDesignInfos[type]=di;
      break;
    case 'object':
      if(!di) return;

      di=ng_CopyVar(di);
      ngRegisterControlDesignInfo(type,function(d, c, ref) {
        return di;
      });
      break;
    case 'string':
      if(type==di) return;
      ngRegisterControlDesignInfo(type,function(d, c, ref) {
        var createfnc=ngRegisteredControlDesignInfos[di];
        var idi;
        if(typeof createfnc==='function') idi=createfnc.apply(arguments);
        delete idi.IsBasic;
        return idi;
      });
      break;
  }
}

// --- Control creation --------------------------------------------------------

var ngCtrlCnt=1;

function ngCreateControlId(baseid)
{
  var id='';
  baseid=ngVal(baseid,'');
  for(var i=0;i<100;i++)
  {
    id=baseid+ngCtrlCnt;
    ngCtrlCnt++;
    if(!ngGetControlById(id)) break;
  }
  return id;
}

var ngOnCreateControl = ngOnCreateControl || null;
var ngOnCreateUnknownControl = ngOnCreateUnknownControl || null;
var ngOnControlCreated = ngOnControlCreated || null;

function ngControlCreated(obj)
{
  if(ngOnCreateControl) ngOnCreateControl(obj);
}

// --- ngCreateControls --------------------------------------------------------

if(typeof ngUserControls === 'undefined') ngUserControls = {};

function ngUsrCtrlSetImages(obj, images)
{
  if((typeof obj !== 'object')||(!obj)) return;
  if(typeof obj._noMerge==='undefined') obj._noMerge=true;
  if(typeof obj.Src==='undefined') obj.Src=images;
  for(var i in obj)
    if(typeof obj[i] === 'object') ngUsrCtrlSetImages(obj[i], images);
}

function ngUsrCtrlSetImagesArray(obj, images)
{
  if((typeof obj !== 'object')||(!obj)) return;
  if(typeof obj._noMerge==='undefined') obj._noMerge=true;
  if(typeof obj.Src==='undefined') obj.Src=images[0];
  else if(typeof obj.Src==='number') obj.Src=images[obj.Src];
  for(var i in obj)
    if(typeof obj[i] === 'object') ngUsrCtrlSetImagesArray(obj[i], images);
}

function ngInitUserControls()
{
  if(typeof ngUserControls === 'undefined') return;
  var uc;
  var oldcl=ngCurrentLib;
  var olduc=ngCurrentUserControls;
  var oldcg=ngCurrentControlsGroup;
  for(var i in ngUserControls)
  {
    uc=ngUserControls[i];
    if((typeof uc === 'undefined')||(uc.initialized)) continue;
    try
    {
      ngCurrentLib=ngVal(uc.Lib,'');
      ngCurrentUserControls=i;
      ngCurrentControlsGroup=ngVal(uc.ControlsGroup,ngCurrentLib);
      if(typeof uc.OnInit === 'function') uc.OnInit();
      if((typeof uc.ControlImages === 'string')&&(ngControlImages!=uc.ControlImages))
      {
        uc.ControlImages=ng_URL(ng_ToAbsPath(uc.ControlImages, uc.Lib));
        ng_PreloadImage(uc.ControlImages);
        ngUsrCtrlSetImages(uc.Images, uc.ControlImages);
      }
      else if((typeof uc.ControlImages === 'object')&&(typeof uc.ControlImages.length === 'number'))
      {
        for(var j=0;j<uc.ControlImages.length;j++)
        {
          uc.ControlImages[j]=ng_URL(ng_ToAbsPath(uc.ControlImages[j], uc.Lib));
          if(ngControlImages!=uc.ControlImages[j]) ng_PreloadImage(uc.ControlImages[j]);
        }
        if(uc.ControlImages.length>0) ngUsrCtrlSetImagesArray(uc.Images, uc.ControlImages);
      }
      uc.initialized=true;
    }
    finally
    {
      ngCurrentLib=oldcl;
      ngCurrentUserControls=olduc;
      ngCurrentControlsGroup=oldcg;
    }
  }
}


/**
 *  Function: ng_MergeDef
 *  Merges two control definitions.
 *
 *  Syntax:
 *    void *ng_MergeDef* (mixed dst, mixed def [, bool allowundefined=false, function callback])
 *
 *  Parameters:
 *    dst - destination definition
 *    def - definition to be merged
 *    allowundefined - if FALSE (default), undefined values in parameter var are ignored
 *    callback - optional callback function
 *
 *  Returns:
 *    -
 */
function ng_MergeDef(dst,def,allowundefined,callback)
{
  function merge_events(d,o,before,override)
  {
    var isdarr,isoarr,j;
    var isdfnc,isofnc;

    for(var i in o)
    {
      if((typeof d[i]==='undefined')||((!override)&&(d[i]===null))) { d[i]=o[i]; continue; }
      isdarr=ng_IsArrayVar(d[i]);
      isdfnc=(typeof d[i]==='function');
      if((isdarr)||(isdfnc))
      {
        isoarr=ng_IsArrayVar(o[i]);
        isofnc=(typeof o[i]==='function');
        if((isoarr)||(isofnc))
        {
          if(isdfnc) d[i]=[d[i]];
          if(isofnc)
          {
            if(!before) d[i].splice(0,0,o[i]);
            else d[i].push(o[i]);
          }
          else
          {
            if(!before)
            {
              for(j=0;j<o[i].length;j++)
                d[i].splice(j,0,o[i][j]);
            }
            else
            {
              for(j=0;j<o[i].length;j++)
                d[i].push(o[i][j]);
            }
          }
        }
      }
    }
  }

  def=ng_CopyVar(def);
  if(!ngVal(allowundefined,false)) def=ng_CleanUndefined(def);
  ng_MergeVar(dst,def,true,function(d,o) {

    if((typeof callback === 'function')&&(!ngVal(callback(d,o),true))) return false;
    if(d._noMerge===true) return false;

    if((typeof d.OnCreating === 'function')&&(typeof o.OnCreating === 'function')) {
      d.OnCreating = ngAddEvent(d.OnCreating, o.OnCreating);
      delete o.OnCreating;
    }

    if((typeof d.OnCreated === 'function')&&(typeof o.OnCreated === 'function')) {
      d.OnCreated = ngAddEvent(d.OnCreated, o.OnCreated);
      delete o.OnCreated;
    }

    if((typeof d.Methods === 'object')&&(typeof o.Methods === 'object')&&(d.Methods)&&(o.Methods))
    {
      merge_events(d.Methods,o.Methods,false,true);
      delete o.Methods;
    }
    if((typeof d.Events === 'object')&&(typeof o.Events === 'object')&&(d.Events)&&(o.Events))
    {
      merge_events(d.Events,o.Events,false);
      delete o.Events;
    }
    if((typeof d.AfterEvents === 'object')&&(typeof o.AfterEvents === 'object')&&(d.AfterEvents)&&(o.AfterEvents))
    {
      merge_events(d.AfterEvents,o.AfterEvents,false);
      delete o.AfterEvents;
    }
    if((typeof d.BeforeEvents === 'object')&&(typeof o.BeforeEvents === 'object')&&(d.BeforeEvents)&&(o.BeforeEvents))
    {
      merge_events(d.BeforeEvents,o.BeforeEvents,true);
      delete o.BeforeEvents;
    }
    if((typeof d.OverrideEvents === 'object')&&(typeof o.OverrideEvents === 'object')&&(d.OverrideEvents)&&(o.OverrideEvents))
    {
      merge_events(d.OverrideEvents,o.OverrideEvents,false,true);
      delete o.OverrideEvents;
    }
    return true;
  });
}

/**
 *  Function: ng_MergeDI
 *  Merges two control DesignInfos.
 *
 *  Syntax:
 *    void *ng_MergeDI* (mixed dst, mixed def [, bool allowundefined=false, function callback])
 *
 *  Parameters:
 *    dst - destination definition
 *    def - definition to be merged
 *    allowundefined - if FALSE (default), undefined values in parameter var are ignored
 *    callback - optional callback function
 *
 *  Returns:
 *    -
 */
function ng_MergeDI(dst,def,allowundefined,callback)
{
  def=ng_CopyVar(def);
  if(!ngVal(allowundefined,false)) def=ng_CleanUndefined(def);
  if((def.NewControl)&&(typeof def.NewControl==='object')&&(typeof def.NewControl._noMerge === 'undefined'))
    def.NewControl._noMerge=true;
  ng_MergeVarReplace(dst,def,true,function(d,o) {

    if((typeof callback === 'function')&&(!ngVal(callback(d,o),true))) return false;
    if(o._noMerge===true) {
      var dref=d['_byRef'];
      var oref=o ? o['_byRef'] : null;
      var ex={};
      for(var i in o) {
        ex[i]=true;
        if((oref)&&(oref[i])) ng_SetByRef(d,i,o[i]);
        else {
          if(dref) delete dref[i];
          d[i]=ng_CopyVar(o[i]);
        }
      }
      for(var i in d) {
        if(!ex[i]) delete d[i];
      }
      delete d._noMerge;
      return false;
    }

    if((typeof d.OnActionsMenuCreating === 'function')&&(typeof o.OnActionsMenuCreating === 'function')) {
      o.OnActionsMenuCreating = ng_OverrideFunction(d.OnActionsMenuCreating,o.OnActionsMenuCreating,o);
    }

    return true;
  });
}

/**
 *  Function: ngCreateControl
 *  Creates control by definition.
 *
 *  Syntax:
 *    object *ngCreateControl* (object def, object ref, mixed parent)
 *
 *  Parameters:
 *    def - control definition
 *    ref - reference owner (object where reference to control is stored)
 *    parent - string ID or object of parent DIV element
 *
 *  Returns:
 *    Reference to new control object.
 */
function ngCreateControl(d,ref,parent)
{
  var j,uc,c=null;

  d.CtrlInheritanceDepth=ngVal(d.CtrlInheritanceDepth,0)+1;
  try
  {
    for(j in ngUserControls)
    {
      uc=ngUserControls[j];
      if(typeof uc.OnCreateControl === 'function') c=uc.OnCreateControl(d, ref, parent);
      if(c) break;
    }
    if(!c)
    {
      var createfnc=ngRegisteredControlTypes[d.Type];
      if(typeof createfnc === 'function') c=createfnc(d, ref, parent);
    }
    if(!c)
    {
      if(typeof ngOnCreateUnknownControl === 'function')
        c=ngOnCreateUnknownControl(d,ref,parent);
    }
  }
  finally
  {
    d.CtrlInheritanceDepth--;
  }
  if(!c)
  {
    ngDEBUGWARN('Component type "%s" not found.',ngVal(d.Type,''),d);
    return null;
  }

  c.CtrlInheritedFrom.push(d.Type);
  c.DefType = d.Type;
  c.Owner = ref;

  if(typeof d.Data !== 'undefined')
    for(var i in d.Data)
      c[i]=d.Data[i];

  if(!d.CtrlInheritanceDepth) // do it only on top component
  {
    if(typeof d.Methods !== 'undefined')
      for(var i in d.Methods)
        ng_OverrideMethod(c,i,d.Methods[i]);

    if(typeof d.BeforeEvents !== 'undefined')
      for(var i in d.BeforeEvents)
        c.AddEvent(d.BeforeEvents[i],i);

    if(typeof d.AfterEvents !== 'undefined') // alias to d.Events
      for(var i in d.AfterEvents)
        c.AddEvent(i,d.AfterEvents[i]);

    if(typeof d.Events !== 'undefined')
      for(var i in d.Events)
        c.AddEvent(i,d.Events[i]);

    if(typeof d.OverrideEvents !== 'undefined')
      for(var i in d.OverrideEvents)
        ng_OverrideMethod(c,i,d.OverrideEvents[i]);

    // Handle string resources
    if((typeof c.ngText !== 'undefined')&&(ngVal(c.Text,'')==''))
      c.Text=ngTxt(c.ngText);
    if((typeof c.ngTextD !== 'undefined')&&(!c.OnGetText))
      c.OnGetText = ngc_GetResText;

    if((typeof c.ngAlt !== 'undefined')&&(ngVal(c.Alt,'')==''))
      c.Alt=ngTxt(c.ngAlt);
    if((typeof c.ngAltD !== 'undefined')&&(!c.OnGetAlt))
      c.OnGetAlt = ngc_GetResAlt;

    if((typeof c.ngHint !== 'undefined')&&(ngVal(c.Hint,'')==''))
      c.Hint=ngTxt(c.ngHint);
    if((typeof c.ngHintD !== 'undefined')&&(!c.OnGetHint))
      c.OnGetHint = ngc_GetResHint;
  }

  var hasdi=ngHASDESIGNINFO();
  if(hasdi) {
    if((typeof c.DesignInfo!=='object')||(!c.DesignInfo)) c.DesignInfo={};
    else delete c.DesignInfo['IsBasic']; // IsBasis is always not inherited

    var createdifnc=ngRegisteredControlDesignInfos[d.Type];
    if(typeof createdifnc === 'function') {
      for(var i=0;i<ngDesignInfoNotInheritedProps.length;i++) {
        delete c.DesignInfo[ngDesignInfoNotInheritedProps[i]];
      }
      var di=createdifnc(d, c, ref);
      if((di)&&(typeof di === 'object')) {
        ng_MergeDI(c.DesignInfo,di);
      }
    }
    else c.DesignInfo['MissingDI'] = true;

    for(j in ngUserControls)
    {
      uc=ngUserControls[j];
      if(typeof uc.OnControlDesignInfo === 'function')
      {
        var di = uc.OnControlDesignInfo(d,c,ref);
        if((di)&&(typeof di === 'object')) {
          ng_MergeDI(c.DesignInfo,di);
        }
      }
    }
  }
  for(j in ngUserControls)
  {
    uc=ngUserControls[j];
    if(typeof uc.OnControlCreated === 'function') uc.OnControlCreated(d,c,ref);
  }
  if(!hasdi) delete c.DesignInfo;
  return c;
}

/**
 *  Function: ngCreateControlAsType
 *  Creates control by definition and type. Control type is passed as parameter
 *  and type in definition is ignored.
 *
 *  Syntax:
 *    object *ngCreateControlAsType* (object def, string ctrltype, object ref, mixed parent)
 *
 *  Parameters:
 *    def - control definition
 *    ctrltype - control type
 *    ref - reference owner (object where reference to control is stored)
 *    parent - string ID or object of parent DIV element
 *
 *  Returns:
 *    Reference to new control object.
 */
function ngCreateControlAsType(def,type, ref,parent)
{
  var oldtype = def.Type;
  def.Type = type;

  var ret = ngCreateControl(def,ref,parent);
  def.Type = oldtype;
  if(ret) ret.DefType=def.Type;
  return ret;
}

var ngCreateControlsOptions = null;
var ngCreateControlsLevel = 0;
var ngOnCreateControlsError = null;

function ngCreateControls(defs,ref,parent,options)
{
  var uc,i,j,c,cc,d,oc,celm,parentCtrl=null;
  if(typeof ref === 'undefined') ref=new Object;
  if(typeof defs === 'undefined') return ref;
  var oldoptions=ngCreateControlsOptions;
  if(!options)
  {
    if(oldoptions) options = oldoptions;
    else options = new Object;
  }
  else
  {
    if((oldoptions)&&(options!==oldoptions)) {
      if(oldoptions.OnCreated) ngObjAddEvent.apply(options, ['OnCreated', oldoptions.OnCreated]);
      if(oldoptions.OnCreating) ngObjAddEvent.apply(options, ['OnCreating', oldoptions.OnCreating]);
    }
  }
  if((!ngCreateControlsLevel)||((!options.CreatedControls)&&((!oldoptions)||(!oldoptions.CreatedControls)))) ng_SetByRef(options,'CreatedControls',[]);
  else if(options!==oldoptions) ng_SetByRef(options,'CreatedControls',oldoptions.CreatedControls);

  ngCreateControlsOptions=options;
  try
  {
    ngCreateControlsLevel++;
    try
    {
      if(typeof parent === 'undefined') parent=ngApp.Elm();
      if(typeof parent === 'string') parentCtrl=ngGetControlById(parent);
      else
      {
        if((typeof parent === 'object')&&(parent))
        {
          if(typeof parent.Elm === 'function')
          {
            parentCtrl=parent;
            parent=parent.Elm();
          }
          else parentCtrl=ngGetControlByElement(parent);
        }
      }
      for(i in defs)
      {
        if((options.ModifyControls)&&(typeof options.ModifyControls[i]!=='undefined'))
        {
          d=options.ModifyControls[i];
          delete options.ModifyControls[i];
          if((typeof d !== 'object')||(!d)) continue;

          ng_MergeDef(d,defs[i]);
          defs[i]=d;
        }
        else
        {
          d=defs[i];
          if((typeof d !== 'object')||(!d)) continue;
        }
        if(typeof parent !== 'undefined') d.parent=ngVal(d.parent,parent);
        if(d.OnCreating)
        {
          oc=d.OnCreating;
          delete d.OnCreating;
          if(!ngVal(oc(d,ref,parent,options),false)) continue;
        }
        if((options.OnCreating)&&(!ngVal(options.OnCreating(d,ref,parent,options),false))) continue;
        c=ngCreateControl(d,ref,parent);
        if((c)&&(i!=''))
        {
          ngAddChildControl(parentCtrl,c);

          var cinfo={
            Control: c,
            Options: null,
            OnCreated: d.OnCreated,
            Ref: ref
          };
          if(options.OnCreated) ngObjAddEvent.apply(cinfo, ['OnCreated', options.OnCreated]);
          delete d.OnCreated;
          celm=c.Create(d, ref);
          d.OnCreated=cinfo.OnCreated;

          if((ngHASDEBUG())&&(typeof ref[i]!=='undefined')&&(ref[i]!==null))
          {
            ngDEBUGWARN('Reference "%s" was overwritten by %o. References: %o',i,c,ref);
          }
          ref[i]=c;
          options.CreatedControls.push(cinfo);

          var prefs=ngVal(d.ParentReferences,true);
          if(!prefs)
          {
            var nref;
            if(typeof c.Controls !== 'undefined') nref=c.Controls;
            else
            {
              nref=new Object;
              c.Controls=nref;
            }
            nref.Owner=ngVal(nref.Owner, c);
            if(typeof nref.Dispose     !=='function') nref.Dispose     = function()                { ngDisposeControls(this); }
            if(typeof nref.AddControls !=='function') nref.AddControls = function(defs, newparent) { ngCreateControls(defs,this,ngVal(newparent, ng_EmptyVar(this.Owner) ? undefined : this.Owner.ID)); }
          }
          if(typeof d.Controls !== 'undefined')
          {
            var oldmodify=options.ModifyControls;
            if((!prefs)&&(options.ModifyControls)) delete options.ModifyControls; // reset modify controls
            try
            {
              if(typeof d.ModifyControls !== 'undefined')
              {
                ng_MergeDef(d.ModifyControls, options.ModifyControls, true);
                options.ModifyControls=d.ModifyControls;
              }
              ngCreateControls(d.Controls,(prefs ? ref : nref),celm);
            }
            finally
            {
              if(cinfo.OnCreated) cinfo.Options = ng_CopyVar(options);
              if((!oldmodify)&&(ngHASDEBUG())&&(options.ModifyControls))
              {
                for(var q in options.ModifyControls)
                  ngDEBUGWARN('Component referenced by "%s" doesn\'t have an subcomponent "%s" which should be modified.',i,q,ref);
              }
              options.ModifyControls=oldmodify;
            }
          }
          else if(cinfo.OnCreated) cinfo.Options = ng_CopyVar(options);
        }
        else if(i!='') ngDEBUGWARN('Component referenced by "%s" was not created.',i,ref);
      }
    }
    catch(e)
    {
      ngDEBUGERROR(e);
      if(typeof ngOnCreateControlsError === 'function') ngOnCreateControlsError(e,d,defs,ref,parent,options);
    }
    ngCreateControlsLevel--;
    if(!ngCreateControlsLevel)
    {
      var cinfo,c;
      cc=options.CreatedControls
      for(var i=0;i<cc.length;i++)
      {
        cinfo=cc[i];
        c=cinfo.Control;
        if(typeof c.ChildHandling!=='undefined') {
          // Update children
          c.SetChildControlsEnabled(c.Enabled);
        }
        oc=cinfo.OnCreated;
        if(oc)
        {
          ngCreateControlsOptions=cinfo.Options;
          c.OnCreated=oc;
          oc(c,cinfo.Ref,cinfo.Options);
          ngCreateControlsOptions=options;
        }
        if(ngOnControlCreated) ngOnControlCreated(c,cinfo.Ref,options);
      }
    }
  }
  finally
  {
    ngCreateControlsOptions=oldoptions;
  }
  return ref;
}

function ngCloneRefs(ref,lref)
{
  var c;
  if(ngHASDEBUG())
  {
    for(var i in lref)
    {
      c=lref[i];
      c.Owner=ref;
      if((typeof ref[i]!=='undefined')&&(ref[i]!==null))
      {
        ngDEBUGWARN('Reference "%s" was overwritten by %o. References: %o',i,c,ref);
      }
      ref[i]=c;
    }
  }
  else
  {
    for(var i in lref)
    {
      c=lref[i];
      c.Owner=ref;
      ref[i]=c;
    }
  }
}

function ngUpdateControls(ref)
{
  if(typeof ref === 'undefined') return;
  var c,p;
  var upd_id={};
  var upd=new Array();
  for(var i in ref)
  {
    c=ref[i];
    if(c)
    {
      upd[upd.length]=c;
      upd_id[c.ID]=true;
    }
  }
  for(var i=0;i<upd.length;i++)
  {
    c=upd[i];
    p=c.ParentControl;
    while(p)
    {
      if(upd_id[p.ID]) break;
      p=p.ParentControl;
    }
    if((!p)&&(typeof c.Update==='function')) c.Update(true);
  }
}

function ngReleaseControls(ref)
{
  if(typeof ref === 'undefined') return;
  var c;
  for(var i in ref)
  {
    c=ref[i];
    if((c)&&(typeof c.Release==='function')) c.Release();
  }
}

function ngDisposeControls(ref)
{
  if(typeof ref === 'undefined') return;
  var c;
  for(var i in ref)
  {
    c=ref[i];
    if((c)&&(typeof c === 'object')&&(i!='Owner')&&(i!='Parent'))
    {
      if(typeof c.Dispose==='function') c.Dispose();
      try {
        delete ref[i];
      }
      catch(e) { }
    }
  }
}

var ngLateUpdateControls = null;
var ngLateUpdateControlsTimer = null;
var ngLateUpdateInProgress = false;

function ngProcessLateUpdates() {
  if(ngLateUpdateInProgress) return;

  if(ngLateUpdateControlsTimer) clearTimeout(ngLateUpdateControlsTimer);
  ngLateUpdateControlsTimer=null;

  if(ngLateUpdateControls!==null) {
    ngUpdatingLateUpdateControls = true;
    try {
      var c;
      for(var i in ngLateUpdateControls) {
        c=ngLateUpdateControls[i];
        if((c)&&(typeof c.Update === 'function')) c.Update();
      }
      ngLateUpdateControls=null;
    }
    finally {
      ngLateUpdateInProgress = false;
    }
  }
}

function ngResetCtrlLateUpdate(c) {
  if((ngLateUpdateControls!==null)&&(c.ID!='')&&(typeof ngLateUpdateControls[c.ID]!=='undefined'))
    ngLateUpdateControls[c.ID]=null;
}

function ngCreateControlHTML(props)
{
  if(typeof props==='undefined') props=new Object;
  if(typeof props==='string')
  {
    var np=new Object;
    np.id=props;
    props=np;
  }
  var id=ngVal(props.id,'');

  if(id=='') id=ngCreateControlId(props.Type);

  var left=props.L;
  var top=props.T;
  var right=props.R;
  var bottom=props.B;

  var width=props.W;
  var height=props.H;
  if(typeof left === 'number') left+='px';
  if(typeof right === 'number') right+='px';
  if(typeof top === 'number') top+='px';
  if(typeof bottom === 'number') bottom+='px';
  if(typeof width === 'number') width+='px';
  if(typeof height === 'number') height+='px';

  var attrs='';
  var html='<DIV id="'+id+'"';

  if(typeof props.className !== 'undefined') html+=' class="'+props.className+'"';

  html+=' style="position: absolute; display:none;';
  if(typeof top !== 'undefined') html+='top: '+top+';';
  if(typeof left !== 'undefined') html+='left: '+left+';';
  if(typeof width !== 'undefined') html+='width: '+width+';';
  if(typeof height !== 'undefined') html+='height: '+height+';';

  if((typeof props.B !== 'undefined')||(typeof props.R !== 'undefined'))
  {
    if(ngIExplorer6)
    {
      var alignfix=ngVal(props.IE6AlignFix, ngIE6AlignFix);
      if((alignfix)||((typeof props.T !== 'undefined')&&(typeof props.B !== 'undefined')))
      {
        if(typeof props.T !== 'undefined') attrs+='FT="'+props.T+'" ';
        if(typeof props.B !== 'undefined') attrs+='FB="'+props.B+'" ';
      }
      else
      {
        if(typeof bottom !== 'undefined') html+='bottom: '+bottom+';';
      }

      if((alignfix)||((typeof props.L !== 'undefined')&&(typeof props.R !== 'undefined')))
      {
        if(typeof props.R !== 'undefined') attrs+='FR="'+props.R+'" ';
        if(typeof props.L !== 'undefined') attrs+='FL="'+props.L+'" ';
      }
      else
      {
        if(typeof right !== 'undefined') html+='right: '+right+';';
      }
    }
    else
    {
      if(typeof bottom !== 'undefined') html+='bottom: '+bottom+';';
      if(typeof right !== 'undefined') html+='right: '+right+';';
    }
  }
  html+=ngVal(props.style,'')+'" '+attrs+ngVal(props.attrs,'')+'>';
  if(typeof props.innerHTML !== 'undefined') html+=props.innerHTML;
  html+='</DIV>';
  return html;
}

// --- ngControl (abstract) ----------------------------------------------------

var ngChildEnabledAsParent    = 0;
var ngChildEnabledParentAware = 1;
var ngChildEnabledIndependent = 2;

function ngc_Elm()
{
  return document.getElementById(this.ID);
}

function ngc_CtrlInheritsFrom(type)
{
  if(typeof this.CtrlInheritedFrom !== 'undefined')
    for(var i=0;i<this.CtrlInheritedFrom.length;i++)
      if(this.CtrlInheritedFrom[i]==type) return true;
  return false;
}

function ngc_Create(props, ref)
{
  if(typeof props==='undefined') props=new Object;
  var parent=props.parent;
  var id=ngVal(props.id,'');

  if(typeof parent === 'string') {
    var o=document.getElementById(parent);
    if(o) parent=o;
    else {
      switch(parent) {
        case '__appelm':    parent=(((typeof ngApp === 'object')&&(ngApp)) ? ngApp.Elm() : null); break;
        case '__apptopelm': parent=(((typeof ngApp === 'object')&&(ngApp)) ? ngApp.TopElm() : null); break;
        case '__docbody':   parent=document.body; break;
      }
    }
  }
  if(!parent) return null;

  if(id=='') id=ngCreateControlId(props.Type);

  var f = document.getElementById(id);
  var nd = f;
  if(!nd)
  {
    if(props.OnCreateHTMLElement)
    {
      nd=props.OnCreateHTMLElement(props,ref,this);
      if(!nd) return null;
    }
    else nd=document.createElement(ngVal(props.DOMTagName,'div'));
    nd.id=id;
    nd.style.display='none';
  }
  else
  {
    p=f.getAttribute('FT'); if(!ng_nullAttr(p)) { this.Bounds.T=p; }
    else this.Bounds.T=ng_GetStylePx(f.style.top);
    p=f.getAttribute('FB'); if(!ng_nullAttr(p)) { this.Bounds.B=p; }
    else this.Bounds.B=ng_GetStylePx(f.style.bottom);
    p=f.getAttribute('FL'); if(!ng_nullAttr(p)) { this.Bounds.L=p; }
    else this.Bounds.L=ng_GetStylePx(f.style.left);
    p=f.getAttribute('FR'); if(!ng_nullAttr(p)) { this.Bounds.R=p; }
    else this.Bounds.R=ng_GetStylePx(f.style.right);

    if((ngVal(this.Bounds.L,'') == '')||(ngVal(this.Bounds.R,'') == ''))
    { this.Bounds.W=ng_StyleWidth(f); }
    if((ngVal(this.Bounds.T,'') == '')||(ngVal(this.Bounds.B,'') == ''))
    { this.Bounds.H=ng_StyleHeight(f); }

    ng_SetInnerHTML(f,'');
  }
  nd.style.position='absolute';
  if(typeof props.className !== 'undefined') nd.className=props.className;

  var sb=ngVal(props.ScrollBars,this.ScrollBars);
  ng_SetScrollBars(nd, ngVal(sb, ssNone));
  this.ScrollBars=sb;

  if(typeof props.L !== 'undefined') this.Bounds.L=props.L;
  if(typeof props.T !== 'undefined') this.Bounds.T=props.T;
  if(typeof props.R !== 'undefined') this.Bounds.R=props.R;
  if(typeof props.B !== 'undefined') this.Bounds.B=props.B;
  if(typeof props.W !== 'undefined') this.Bounds.W=props.W;
  if(typeof props.H !== 'undefined') this.Bounds.H=props.H;

  if(typeof props.innerHTML !== 'undefined') ng_SetInnerHTML(nd,props.innerHTML);
  if(typeof props.Opacity !== 'undefined') ng_SetOpacity(nd,props.Opacity);
  if(typeof props.style !== 'undefined')
  {
    for(var i in props.style)
      nd.style[i]=props.style[i];
  }

  if(!f) parent.appendChild(nd);

  if(id!='') ngControlsIDs[id]=this;
  if(this.Visible) {
    if((this.IsPopup===true)&&(!ngc_ActivatePopup(this))) this.Visible=false;
  }
  else ngc_DeactivatePopup(this);
  this.Attach(nd);
  this.SetBounds();
  if(this.DoCreate) this.DoCreate(props, ref, nd,parent);

  if(props.OnCreated) props.OnCreated(this, ref);
  return nd;
}

function ngc_SetBounds(props)
{
  var changed=false;
  if(typeof props!=='undefined')
  {
    if(typeof this.Bounds === 'undefined') this.Bounds=new Object;
    for(var i in props)
    {
      switch(i)
      {
        case 'L':
        case 'T':
        case 'R':
        case 'B':
        case 'W':
        case 'H':
          if((this.Bounds[i]!=props[i])||(typeof this.Bounds[i]!==typeof props[i])) { this.Bounds[i]=props[i]; changed=true; }
          break;
        case 'IE6AlignFix':
          if(this.IE6AlignFix!=props.IE6AlignFix) { this.IE6AlignFix=props.IE6AlignFix; if(ngIExplorer6) changed=true; }
          break;
      }
    }
  }
  else changed=true;
  if(changed)
  {
    var o = this.Elm();
    if(o)
    {
      props=this.Bounds;
      if(typeof props==='undefined') return changed;
      props.IE6AlignFix=this.IE6AlignFix;
      ng_SetBounds(o, props);
      delete props.IE6AlignFix;
    }
  }
  return changed;
}

function ngc_SetScrollBars(v)
{
  this.ScrollBars=v;
  ng_SetScrollBars(this.Elm(),v);
}

function ngc_SetPopup(p)
{
  if(this.IsPopup!=p)
  {
    if(this.Visible)
    {
      if(p) ngc_ActivatePopup(this);
      else  ngc_DeactivatePopup(this);
    }
    this.IsPopup=p;
  }
}

function ngc_SetOpacity(v)
{
  ng_SetOpacity(this.Elm(),v);
}

function ngc_Attach(o)
{
  var id;
  if(typeof o === 'undefined') o=this.ID;
  if(typeof o === 'string') {
    id=o;
    o=document.getElementById(id);
  }
  else id=o.id;
  var oid=this.ID;
  if(id!=this.ID)
  {
    if(this.ID!='') {
      if(ngControlsIDs[this.ID]===this) delete ngControlsIDs[this.ID];
    }
    if(id!='') ngControlsIDs[id]=this;
    this.ID=id;
  }
  if(o)
  {
    if(o.className!='')
    {
      var bcls=o.className;
      var bi=bcls.indexOf(' ');
      if(bi>=0) bcls=bcls.substr(0,bi);
      this.BaseClassName=bcls;
    }
    if(this.DoSetVisible) this.DoSetVisible(o, this.Visible);
    else
    {
      o.style.display=(this.Visible ? 'block' : 'none');
    }

    var t=this.CtrlType;
    o.onmouseover = function(e) { ngc_Enter(e, this, t); }
    o.onmouseout  = function(e) { ngc_Leave(e, this, t); }
    o.style.webkitTapHighlightColor='rgba(0,0,0,0)';
    o.style.webkitTapHighlightColor='transparent'; /* For some Androids */
    o.style.msTouchAction='none';
  }
  if((id!='')&&(this.DoAttach)) this.DoAttach(o,oid);

  var has_scroll=((typeof this.ScrollBars !== 'undefined')&&(this.ScrollBars!==ssNone));
  if((o)&&(!o.ngpointers)&&((this.DoAcceptGestures)||(has_scroll)||(typeof this.Gestures !== 'undefined')))
  {
    var gestures=((typeof this.Gestures === 'object')&&(this.Gestures) ? ng_CopyVar(this.Gestures) : {});
    if((has_scroll)&&(typeof gestures.drag === 'undefined')) gestures.drag=true;
    if(this.DoAcceptGestures) this.DoAcceptGestures(o,gestures);
    if(!ng_EmptyVar(gestures)) {
      var g=[];
      for(var i in gestures)
        if(gestures[i]) g.push(i);
      if(g.length>0)
        ngc_PtrListener(this, o, 'control', g);
    }
  }
}

function ngc_Release()
{
  var c,cc=this.ChildControls;
  if(typeof cc !== 'undefined')
    for(var i=cc.length-1;i>=0;i--)
    {
      c=cc[i];
      if((c)&&(typeof c.Release === 'function')) c.Release();
    }

  var o=this.Elm();
  if(o)
  {
    var mi = ngMouseInControls[this.ID];
    if((typeof mi !== 'undefined')&&(mi.Object==this)) ngc_Leave(null, mi.Element, this.CtrlType);
    if(this.DoRelease) this.DoRelease(o);
    else
    {
      o.style.display='none';
      ng_SetInnerHTML(o,'');
    }
  }
}

function ngc_Dispose()
{
  var cc=this.ChildControls;
  if(typeof cc !== 'undefined')
  {
    var c;
    for(var i=cc.length-1;i>=0;i--)
    {
      c=cc[i];
      if((c)&&(typeof c.Dispose === 'function')) c.Dispose();
    }
  }

  var id=this.ID;
  ngc_DeactivatePopup(this);
  if((!this.DoDispose)||(ngVal(this.DoDispose(),false)))
  {
    ngRemoveChildControl(this.ParentControl,this);
    var o=this.Elm();
    if(o)
    {
      o.style.display='none';
      ng_SetInnerHTML(o,'');
      if(o.parentNode) o.parentNode.removeChild(o);
    }
    try
    {
      for(var i in this)
        delete this[i];
    }
    catch(e)
    {
    }
  }
  if(id!='') {
    if(ngControlsIDs[id]===this) delete ngControlsIDs[id];
  }
}

function ngc_Enable()
{
  this.SetEnabled(true);
}

function ngc_Disable()
{
  this.SetEnabled(false);
}

function ngc_SetChildControlsEnabled(v,p)
{
  var cc=this.ChildControls;
  if((typeof cc === 'undefined')||(!cc.length)) return;
  switch(ngVal(this.ChildHandling,0) & 7) // 3bits are reserved form enabled state handling
  {
    case 0: // ngChildEnabledAsParent
      this._changingchildenabled=true;
      try
      {
        if(typeof this.DoSetChildEnabled === 'function') {
          for(var i=0;i<cc.length;i++) {
            if(cc[i]) this.DoSetChildEnabled(cc[i],v,p);
          }
        }
        else {
          for(var i=0;i<cc.length;i++) {
            if(cc[i]) cc[i].SetEnabled(v,p);
          }
        }
      }
      finally
      {
        delete this._changingchildenabled;
      }
      break;
    case 1: // ngChildEnabledParentAware
      this._changingchildenabled=true;
      try
      {
        var self=this,undefined;
        function setenabled(v,p)
        {
          if(self._changingchildenabled) return;

          this._intEnabled=ngVal(v,true);
          var cc=this.ChildControls;
          if((typeof cc !== 'undefined')&&((ngVal(this.ChildHandling,0) & 7)===0 /* ngChildEnabledAsParent */)) {
            for(var i=0;i<cc.length;i++) cc[i].SetEnabled(v,p);
          }
        }

        function disablechildcontrols(f)
        {
          var c,ch;
          for(var i=0;i<f.ChildControls.length;i++)
          {
            c=f.ChildControls[i];
            if(!c) continue;
            if((typeof c.ChildControls !== 'undefined')&&((ngVal(c.ChildHandling,0) & 7)===0 /* ngChildEnabledAsParent */)) {
              disablechildcontrols(c);
            }
            if((typeof c.SetEnabled === 'function')&&(typeof c._intEnabled === 'undefined'))
            {
              c._intEnabled=ngVal(c.Enabled,true);
              c._intSetEnabled = c.SetEnabled;
              if(typeof self.DoSetChildEnabled === 'function') self.DoSetChildEnabled(c,false,f);
              else c.SetEnabled(false);
              c.SetEnabled=setenabled;
            }
          }
        }

        function enablechildcontrols(f)
        {
          var c;
          for(var i=0;i<f.ChildControls.length;i++)
          {
            c=f.ChildControls[i];
            if(!c) continue;
            if(typeof c._intEnabled!=='undefined')
            {
              var s=c._intEnabled;
              c.SetEnabled=c._intSetEnabled;
              if(typeof self.DoSetChildEnabled === 'function') self.DoSetChildEnabled(c,s,f);
              else c.SetEnabled(s);
              delete c._intSetEnabled;
              delete c._intEnabled;
            }
            if((typeof c.ChildControls !== 'undefined')&&((ngVal(c.ChildHandling,0) & 7)===0 /* ngChildEnabledAsParent */)) {
              enablechildcontrols(c);
            }
          }
        }
        if(v) enablechildcontrols(this);
        else  disablechildcontrols(this);
      }
      finally
      {
        delete this._changingchildenabled;
      }
      break;
    case 2: // ngChildEnabledIndependent
      break;
  }
}

function ngc_SetEnabled(v,p)
{
  v=ngVal(v,true);
  if(this.Enabled!=v)
  {
    if((this.OnSetEnabled)&&(!ngVal(this.OnSetEnabled(this,v,p),false))) return;

    p=ngVal(p,this);
    this.SetChildControlsEnabled(v,p);

    if(this.DoSetEnabled) this.DoSetEnabled(v);
    else
    {
      this.Enabled=v;
      if(this.Update) this.Update();
    }
    if(this.OnEnabledChanged) this.OnEnabledChanged(this,p);
  }
}

function ngc_SetFocus(state)
{
  var o=this.Elm();
  if(o) {
    try {
      if(ngVal(state,true)) {
        if(ng_IsInactiveModalElm(o)) return;
        o.focus();
      }
      else o.blur();
    } catch(e) { }
  }
}

function ngc_SetVisible(v)
{
  v=ngVal(v,true);
  if(this.Visible!=v)
  {
    var pa=true;
    if((this.OnSetVisible)&&(!ngVal(this.OnSetVisible(this,v),false))) return;
    if(this.ID!='')
    {
      var o = this.Elm();
      if(o)
      {
        if(v) {
          if((this.IsPopup===true)&&(!ngc_ActivatePopup(this))) return;
        }
        else ngc_DeactivatePopup(this);
        if(this.DoSetVisible) this.DoSetVisible(o, v);
        else
        {
          o.style.display=(v ? 'block' : 'none');
          o.style.visibility=(v ? 'visible' : 'hidden'); // IE7 sometimes don't hide elements if display is none
        }

        ng_IE7RedrawFix(document.body);
      }
    }
    if(this.Visible!=v)
    {
      this.Visible=v;
      if(v) this.Update(true);

      // IE7 redraw fix
      var o=this.Elm();
      if(o) { ng_IE7RedrawFix(o); }

      if(this.OnVisibleChanged) this.OnVisibleChanged(this);

      if((!v)&&(!ngIExplorer))
      {
        // Events onblur and onmouseout (Update+SetVisible) not invoked properly
        var simmoevent={ type: 'mouseout' };
        function fix_blur_mouseout(c)
        {
          if(c.SetFocus) c.SetFocus(false);
          var cc=c.ChildControls;
          if(typeof cc !== 'undefined')
            for(var i=0;i<cc.length;i++)
              fix_blur_mouseout(cc[i]);
          ngc_Leave(simmoevent, c.Elm(), c.CtrlType);
        }
        fix_blur_mouseout(this);
      }
    }
    else ngc_DeactivatePopup(this);
  }
}

function ngc_SetInvalid(state, update)
{
  state  = ngVal(state, true);
  update = ngVal(update, true);

  if (this.Invalid==state) return true;
  if ((this.OnSetInvalid) && (!ngVal(this.OnSetInvalid(this, state, update), false))) return false;

  this.Invalid = state;
  if (typeof(this.DoSetInvalid)==='function') this.DoSetInvalid(state, update);

  return true;
}

function ngc_Align(o)
{
  var r=0;
  if(typeof o === 'undefined') o=this.Elm();
  if(typeof o === 'string') o=document.getElementById(o);
  if(typeof this.DoResize !== 'function') r=ng_Align(o);
  else if(o) r=this.DoResize(o);
  return r;
}

function ngc_UpdateLater(s) {
  if(ngVal(s,true)) {
    if(ngLateUpdateInProgress) {
      this.Update();
      return;
    }
    if(this.ID!='') {
      if(!ngLateUpdateControls) ngLateUpdateControls={};
      if(ngLateUpdateControls[this.ID]===this) return;

      ngLateUpdateControls[this.ID]=this;
      if(!ngLateUpdateControlsTimer) ngLateUpdateControlsTimer=setTimeout(function() { nga_ProcessInvokeLater(); ngProcessLateUpdates(); },1);

      function updateafter(c) {
        var cc=c.ChildControls;
        if(typeof cc !== 'undefined')
        {
          for(var i=0;i<cc.length;i++)
          {
            c=cc[i];
            if((c.ID!='')&&(ngLateUpdateControls[c.ID])) {
              delete ngLateUpdateControls[c.ID]; // put child after parent
              ngLateUpdateControls[c.ID]=c;
            }
            updateafter(c);
          }
        }
      }
      updateafter(this);

      if(this.OnUpdateLater) this.OnUpdateLater(this,true);
    }
  }
  else {
    if((ngLateUpdateControls===null)||(this.ID=='')||(typeof ngLateUpdateControls[this.ID]==='undefined')||(ngLateUpdateControls[this.ID]===null)) return;
    ngLateUpdateControls[this.ID]=null;
    if((this.OnUpdateLater)&&(!ngLateUpdateInProgress)) this.OnUpdateLater(this,false);
  }
}

function ngc_WillUpdateLater() {
  return ((this.ID!='')&&(ngLateUpdateControls!==null)&&(ngLateUpdateControls[this.ID]));
}

function ngc_Update(recursive)
{
  ngResetCtrlLateUpdate(this);

  if(!this.Visible) return;
  var p=this.ParentControl;
  while(p)
  {
    if(!p.Visible) return;
    p=p.ParentControl;
  }
  if((this.OnUpdate)&&(!ngVal(this.OnUpdate(this),false))) return;

  var o=this.Elm();
  if(o)
  {
    o.style.display = (this.Visible ? 'block' : 'none');
    if(ngIExplorer6)
    {
      var cw=ng_ClientWidth(o);
      var ch=ng_ClientHeight(o);
    }
    var ret=true;
    if(this.DoUpdate) ret=ngVal(this.DoUpdate(o),false);
  }
  if(ret)
  {
    if(ngVal(recursive,true))
    {
      var cc=this.ChildControls;
      if(typeof cc !== 'undefined')
      {
        var c;
        for(var i=0;i<cc.length;i++)
        {
          c=cc[i];
          if(c.Update) c.Update(true);
        }
      }
    }
  }

  if(!ret) return;

  if(o)
  {
    ret=this.Align(o);
    if(ngIExplorer6)
    {
      if((this.DoUpdate)&&((ret & 4)||(ret & 8))) this.DoUpdate(o);

      var nw,nh;
      ng_BeginMeasureElement(o);
      for(var i=0;i<2;i++)
      {
        nw=ng_ClientWidth(o);
        nh=ng_ClientHeight(o);
        if((cw!=nw)||(ch!=nh))
        {
          var cc=this.ChildControls;
          if(typeof cc !== 'undefined')
          {
            for(var i=0;i<cc.length;i++)
            {
              ret=cc[i].Align();
              if((ret & 4)||(ret & 8)) cc[i].Update();
            }
          }
        } else break;
        cw=nw; ch=nh;
      }
      ng_EndMeasureElement(o);
    }
    ng_IE7RedrawFix(o);
  }
  this.Attach();
  if(this.OnUpdated) this.OnUpdated(this,o);
}

function ngc_Enter(e, elm, type)
{
  if(!e) e=window.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  var o=ngGetControlByElement(elm, type);
  if(o)
  {
    var pi=o.PointerInfo;
    if((pi)&&(pi.Touch)&&(pi.EndTime)&&((new Date().getTime()-pi.EndTime)<200))
    {
      return;
    }
    var mi = ngMouseInControls[o.ID];
    if((typeof mi !== 'undefined')&&(mi.Element)&&(mi.Object)&&(ng_inDOM(mi.Element)))
    {
      if(mi.Object===o) return; // already in control
      ngc_Leave(e, mi.Element, mi.Object.CtrlType);
    }

    try {
      mi=new Object();
      mi.Object=o;
      mi.Element=o.Elm();
      mi.EnterElement=elm;
      ngMouseInControls[o.ID] = mi;

      if(o.DoMouseEnter) o.DoMouseEnter(e, mi, mi.Element);
      else if(o.OnMouseEnter) o.OnMouseEnter(o);
    }
    finally {
      o.MouseInControl=true;
    }
  }
}

function ngc_Leave(e, elm, type)
{
  if(!e) e=window.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  var o=ngGetControlByElement(elm, type);
  if(o)
  {
    var mi = ngMouseInControls[o.ID];
    if(typeof mi === 'undefined') return;
    delete ngMouseInControls[o.ID];

    try {
      mi.LeaveElement=elm;
      if(o.DoMouseLeave) o.DoMouseLeave(e, mi, mi.Element);
      else if(o.OnMouseLeave) o.OnMouseLeave(o);
    }
    finally {
      o.MouseInControl=false;
    }
  }
}

function ngc_Focus(e, elm, type)
{
  if(!e) e=window.event;
  var o=ngGetControlByElement(elm, type);
  if((o)&&(!o.ControlHasFocus))
  {
    if(ng_IsInactiveModalElm(elm)) return;

    o.ControlHasFocus=true;
    if(o.DoFocus) o.DoFocus(e, elm);
    else if(o.OnFocus) o.OnFocus(o);
  }
}

function ngc_Blur(e, elm, type)
{
  if(!e) e=window.event;
  if(ngIExplorer)
  {
    // IE fires onfocus and onblur events even tabindex attribute is not set (DIVs with dimensions)
    // check if new focused item is child element and if yes refocus original

    var ai=document.activeElement;
    if((ai)&&(!ng_CanFocusElm(ai)))
    {
      var p=ai.parentNode;
      while((p)&&(p!=document))
      {
        if(p==elm)
        {
          elm.focus();
          return;
        }
        p=p.parentNode;
      }
    }
  }
  var o=ngGetControlByElement(elm, type);
  if((o)&&(o.ControlHasFocus))
  {
    try {
      if(o.DoBlur) o.DoBlur(e, elm);
      else if(o.DoBlur) o.DoBlur(o);
    }
    finally {
      o.ControlHasFocus=false;
    }
  }
}

function ngc_CtrlBringToFront(c)
{
  var cc=this.ChildControls;
  if((typeof cc === 'undefined')||(!cc.length)) return;

  for(var i=0;i<cc.length;i++)
    if(cc[i]==c)
    {
      cc.splice(i,1);
      cc.splice(0,0,c);
      break;
    }
}

function ngc_CtrlSendToBack(c)
{
  var cc=this.ChildControls;
  if((typeof cc === 'undefined')||(!cc.length)) return;

  for(var i=0;i<cc.length;i++)
    if(cc[i]==c)
    {
      cc.splice(i,1);
      cc[cc.length]=c;
      break;
    }
}

function ngc_ctrlInsert(cc,c,p,o)
{
  if(c==p) return;
  var fix=-1,dix=-1;
  for(var i=0;i<cc.length;i++)
  {
    if(cc[i]==p) fix=i;
    if(cc[i]==c) dix=i;
    if((fix>=0)&&(dix>=0))
    {
      cc.splice(dix,1);
      if(dix<fix) fix--;
      cc.splice(fix+o,0,c);
      break;
    }
  }
}

function ngc_CtrlInsertAfter(c,p)
{
  var cc=this.ChildControls;
  if((typeof cc === 'undefined')||(!cc.length)) return;

  ngc_ctrlInsert(cc,c,p,1);
}

function ngc_CtrlInsertBefore(c,p)
{
  var cc=this.ChildControls;
  if((typeof cc === 'undefined')||(!cc.length)) return;

  ngc_ctrlInsert(cc,c,p,0);
}

function ngc_GetResText()
{
  return ngTxt(this.ngTextD);
}

function ngc_GetResAlt()
{
  return ngTxt(this.ngAltD);
}

function ngc_GetResHint()
{
  return ngTxt(this.ngHintD);
}

function ngc_GetText()
{
  if(this.OnGetText) return ngVal(this.OnGetText(this),'');
  else return this.Text;
}

function ngc_GetAlt()
{
  if(this.OnGetAlt) return ngVal(this.OnGetAlt(this),'');
  else return this.Alt;
}

function ngc_GetImg()
{
  if(this.OnGetImg) return this.OnGetImg(this);
  else return this.Img;
}

function ngc_GetHint()
{
  if(this.OnGetHint) return ngVal(this.OnGetHint(this),'');
  else return this.Hint;
}

function ngc_SetText(text)
{
  if(this.OnSetText) text=this.OnSetText(text,this);
  if(text!=this.Text)
  {
    this.Text=text;
    this.Update();
  }
}

/**
 *  Class: ngControl
 *  This is an abstract class for all visual controls.
 *
 *  Syntax:
 *    new *ngControl* (object obj, string id, string ctrltype)
 *
 *  Parameters:
 *    obj - implementation of control object
 *    id - control ID
 *    ctrltype -  control type
 */
function ngControl(obj, id, type)
{
  /*
   *  Group: Definition
   */
  /*
   *  Variable: Type
   *  ...
   *  Type: string
   */
  /*<>*/
  /*
   *  Variable: L
   *  ...
   *  Type: integer/string
   */
  /*<>*/
  /*
   *  Variable: T
   *  ...
   *  Type: integer/string
   */
  /*<>*/
  /*
   *  Variable: W
   *  ...
   *  Type: integer/string
   */
  /*<>*/
  /*
   *  Variable: H
   *  ...
   *  Type: integer/string
   */
  /*<>*/
  /*
   *  Variable: R
   *  ...
   *  Type: integer/string
   */
  /*<>*/
  /*
   *  Variable: B
   *  ...
   *  Type: integer/string
   */
  /*<>*/
  /*
   *  Variable: ScrollBars
   *  ...
   *  Type: integer
   *  Default value: *ssNone*
   */
  /*<>*/
  /*
   *  Variable: Data
   *  ...
   *  Type: object
   */
  /*<>*/
  /*
   *  Variable: style
   *  ...
   *  Type: object
   */
  /*<>*/
  /*
   *  Variable: Opacity
   *  ...
   *  Type: double
   */
  /*<>*/
  /*
   *  Variable: className
   *  ...
   *  Type: string
   */
  /*<>*/
  /*
   *  Variable: innerHTML
   *  ...
   *  Type: string
   */
  /*<>*/
  /*
   *  Variable: id
   *  ...
   *  Type: string
   */
  /*<>*/
  /*
   *  Variable: parent
   *  ...
   *  Type: string/object
   */
  /*<>*/
  /*
   *  Variable: Controls
   *  ...
   *  Type: object
   */
  /*<>*/
  /*
   *  Variable: ParentReferences
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  /*<>*/
  /*
   *  Variable: IE6AlignFix
   *  ...
   *  Type: bool
   *  Default value: global variable *IE6AlignFix*
   */
  /*<>*/
  /*
   *  Event: OnCreated
   */
  /*<>*/
  /*
   *  Event: OnCreateHTMLElement
   */
  /*<>*/

  /*
   *  Group: Properties
   */

  /*  Variable: ID
   *  Control identificator.
   *  Type: string
   */
  obj.ID = ngVal(id,'');

  /*  Variable: CtrlType
   *  Control type.
   *  Type: string
   */
  obj.CtrlType = type;

  /*  Variable: CtrlInheritedFrom
   *  Control inheritance info.
   *  Type: array
   */
  obj.CtrlInheritedFrom = [ ];

  /*  Variable: BaseClassName
   *  Control CSS base class.
   *  Type: string
   */
  obj.BaseClassName = type;

  /*  Variable: Enabled
   *  Controls whether the control responds to mouse, keyboard.
   *  Type: bool
   */
  obj.Enabled = true;

  /*  Variable: Visible
   *  Determines whether the control is visible.
   *  Type: bool
   */
  obj.Visible = true;

  /*  Variable: Bounds
   *  Specifies the position of the control.
   *  Type: object
   */
  obj.Bounds = new Object;

  /*  Variable: Owner
   *  If present, contains reference to object which holds reference to the
   *  control.
   *  Type: object
   */
  //obj.Owner = null;
  /*  Variable: ParentControl
   *  If present, contains reference to the parent of the control.
   *  Type: object
   */
  //obj.ParentControl = null;

  /*  Variable: ChildControls
   *  If present, contains references to child controls.
   *  Type: array
   */
  //obj.ChildControls = new Array();

  /*  Variable: ChildHandling
   *  If present, describes how control state changes influence control children.
   *  Type: integer
   *
   *  Constants:
   *  - ngChildEnabledAsParent
   *  - ngChildEnabledParentAware
   *  - ngChildEnabledIndependent
   */
  //obj.ChildHandling = 0;

  /*  Variable: Gestures
   *  If present, the properties of object represents gestures and values
   *  specifies if gesture is enabled or not (true/false).
   *  Type: object
   */
  //obj.Gestures = undefined;


  /*
   *  Group: Methods
   */

  /*  Function: Enable
   *  Enables control.
   *
   *  Syntax:
   *    void *Enable* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.Enable = ngc_Enable;

  /*  Function: Disable
   *  Disables control.
   *
   *  Syntax:
   *    void *Disable* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.Disable = ngc_Disable;

  /*  Function: SetEnabled
   *  Sets enabled state of the control.
   *
   *  Syntax:
   *    void *SetEnabled* (bool enabled [, object parent])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.SetEnabled = ngc_SetEnabled;

  /*  Function: SetChildControlsEnabled
   *  Sets enabled state of control's children.
   *
   *  Syntax:
   *    void *SetChildControlsEnabled* (bool enabled [, object parent])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.SetChildControlsEnabled = ngc_SetChildControlsEnabled;

  /*  Function: SetVisible
   *  Sets control visibility.
   *
   *  Syntax:
   *    void *SetVisible* (bool visible)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.SetVisible = ngc_SetVisible;

  /*  Function: SetFocus
   *  Sets focus on the control.
   *
   *  Syntax:
   *    void *SetFocus* ([bool state=true])
   *
   *  Parameters:
   *    state - control is focused if TRUE or blured if FALSE
   *
   *  Returns:
   *    -
   */
  obj.SetFocus = ngc_SetFocus;

  /*  Function: Elm
   *  Gets access to container DIV element object.
   *
   *  Syntax:
   *    object *Elm* ()
   *
   *  Returns:
   *    Element object.
   */
  obj.Elm = ngc_Elm;

  /*  Function: CtrlInheritsFrom
   *  Checks if control is inherited from given type.
   *
   *  Syntax:
   *    bool *CtrlInheritsFrom* (string type)
   *
   *  Returns:
   *    TRUE if control is an ancestor of given type.
   */
  obj.CtrlInheritsFrom = ngc_CtrlInheritsFrom;

  /*  Function: Create
   *  Creates control DIV container.
   *
   *  Syntax:
   *    void *Create* (props, ref)
   *
   *  Returns:
   *    -
   */
  obj.Create = ngc_Create;

  /*  Function: Dispose
   *  Destroys the control.
   *
   *  Syntax:
   *    void *Dispose* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.Dispose = ngc_Dispose;

  /*  Function: SetBounds
   *  Updates or sets position of the control.
   *
   *  Syntax:
   *    void *SetBounds* ([object props])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.SetBounds = ngc_SetBounds;

  /*  Function: SetScrollBars
   *  Sets scroll bars apperance.
   *
   *  Syntax:
   *    void *SetScrollBars* (integer type)
   *
   *  Parameters:
   *    type - ssNone, ssAuto, ssBoth, ssVertical, ssHorizontal
   *
   *  Returns:
   *    -
   */
  obj.SetScrollBars = ngc_SetScrollBars;
  /*  Function: SetPopup
   *  Sets if control work as popup.
   *
   *  Syntax:
   *    void *SetPopup* (bool state)
   *
   *  Parameters:
   *    state - if TRUE, control work as popup
   *
   *  Returns:
   *    -
   */
  obj.SetPopup = ngc_SetPopup;
  /*  Function: SetOpacity
   *  Sets control opacity.
   *
   *  Syntax:
   *    void *SetOpacity* (double opacity)
   *
   *  Parameters:
   *    opacity - control opacity from interval <0,1>
   *
   *  Returns:
   *    -
   */
  obj.SetOpacity = ngc_SetOpacity;

  /*  Function: Align
   *  Aligns control to its position.
   *
   *  Syntax:
   *    int *Align* (object elm)
   *
   *  Parameters:
   *
   *  Returns:
   *    Align flags.
   */
  obj.Align = ngc_Align;

  /*  Function: Attach
   *  Attaches control to DIV container.
   *
   *  Syntax:
   *    void *Attach* ([mixed id])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.Attach = ngc_Attach;

  /*  Function: Release
   *  Clears control's DIV container.
   *
   *  Syntax:
   *    void *Release* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.Release = ngc_Release;

  /*  Function: Update
   *  Redraws control.
   *
   *  Syntax:
   *    void *Update* (bool recursive)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.Update = ngc_Update;

  /*  Function: UpdateLater
   *  Sets state of late update for control.
   *
   *  Syntax:
   *    void *UpdateLater* ([bool state=true])
   *
   *  Parameters:
   *    state - if TRUE the controls is marked for late update.
   *
   *  Returns:
   *    -
   */
  obj.UpdateLater = ngc_UpdateLater;

  /*  Function: WillUpdateLater
   *  Checks if control was marked for late update.
   *
   *  Syntax:
   *    bool *WillUpdateLater* ()
   *
   *  Returns:
   *    TRUE if control was marked for late update.
   */
  obj.WillUpdateLater = ngc_WillUpdateLater;

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
  obj.AddEvent = ngObjAddEvent;
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
  obj.RemoveEvent = ngObjRemoveEvent;

  /*
   *  Event: OnSetEnabled
   */
  obj.OnSetEnabled     = null;
  /*
   *  Event: OnEnabledChanged
   */
  obj.OnEnabledChanged = null;
  /*
   *  Event: OnSetVisible
   */
  obj.OnSetVisible     = null;
  /*
   *  Event: OnVisibleChanged
   */
  obj.OnVisibleChanged = null;
  /*
   *  Event: OnUpdate
   */
  obj.OnUpdate         = null;
  /*
   *  Event: OnUpdated
   */
  obj.OnUpdated        = null;
  /*
   *  Event: OnUpdateLater
   */
  obj.OnUpdateLater    = null;
  /*
   *  Event: OnMouseEnter
   */
  obj.OnMouseEnter     = null;

  /*
   *  Event: OnMouseLeave
   */
  obj.OnMouseLeave     = null;

  if ((ngHASDESIGNINFO())&&(typeof ngControlDesignInfo === 'function')) ngControlDesignInfo(obj);
}

function ngcs_Create(props, ref)
{
  var id=ngVal(props.ID,'');
  if(id=='')
  {
    if(typeof props.Data === 'object') id=ngVal(props.Data.ID,'');
    if(id=='') id=ngCreateControlId(props.Type);
  }
  this.ID=id;
  if(id!='') ngControlsIDs[id]=this;

  if(this.DoCreate) this.DoCreate(props, ref);
  if(props.OnCreated) props.OnCreated(this, ref);
  return null;
}

/**
 *  Class: ngSysControl
 *  This is an abstract class for all non-visual controls.
 *
 *  Syntax:
 *    new *ngSysControl* (object obj, string id, string ctrltype)
 *
 *  Parameters:
 *    obj - implementation of control object
 *    id - control ID
 *    ctrltype -  control type
 */
function ngSysControl(obj, id, type)
{
  /*
   *  Group: Properties
   */

  /*  Variable: ID
   *  Control identificator.
   *  Type: string
   */
  obj.ID = ngVal(id,'');

  /*  Variable: CtrlType
   *  Control type.
   *  Type: string
   */
  obj.CtrlType = type;
  /*  Variable: CtrlInheritedFrom
   *  Control inheritance info.
   *  Type: array
   */
  obj.CtrlInheritedFrom = [ ];

  /*  Variable: Enabled
   *  Controls whether the control responds to mouse, keyboard.
   *  Type: bool
   */
  obj.Enabled = true;

  /*  Variable: Owner
   *  If present, contains reference to object which holds reference to the
   *  control.
   *  Type: object
   */
  //obj.Owner = null;
  /*  Variable: ParentControl
   *  If present, contains reference to the parent of the control.
   *  Type: object
   */
  //obj.ParentControl = null;

  /*  Variable: ChildControls
   *  If present, contains references to child controls.
   *  Type: array
   */
  //obj.ChildControls = new Array();

  /*  Variable: ChildHandling
   *  If present, describes how control state changes influence control children.
   *  Type: integer
   *
   *  Constants:
   *  - ngChildEnabledAsParent
   *  - ngChildEnabledParentAware
   *  - ngChildEnabledIndependent
   */
  //obj.ChildHandling = 0;

  /*
   *  Group: Methods
   */

  /*  Function: CtrlInheritsFrom
   *  Checks if control is inherited from given type.
   *
   *  Syntax:
   *    bool *CtrlInheritsFrom* (string type)
   *
   *  Returns:
   *    TRUE if control is an ancestor of given type.
   */
  obj.CtrlInheritsFrom = ngc_CtrlInheritsFrom;
  /*  Function: Enable
   *  Enables control.
   *
   *  Syntax:
   *    void *Enable* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.Enable = ngc_Enable;

  /*  Function: Disable
   *  Disables control.
   *
   *  Syntax:
   *    void *Disable* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.Disable = ngc_Disable;

  /*  Function: SetEnabled
   *  Sets enabled state of the control.
   *
   *  Syntax:
   *    void *SetEnabled* (bool enabled [, object parent])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.SetEnabled = ngc_SetEnabled;

  /*  Function: SetChildControlsEnabled
   *  Sets enabled state of control's children.
   *
   *  Syntax:
   *    void *SetChildControlsEnabled* (bool enabled [, object parent])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.SetChildControlsEnabled = ngc_SetChildControlsEnabled;

  /*  Function: Elm
   *  Gets access to container DIV element object.
   *
   *  Syntax:
   *    object *Elm* ()
   *
   *  Returns:
   *    Element object.
   */
  obj.Elm = function() { return null; }

  /*  Function: Create
   *  Creates control.
   *
   *  Syntax:
   *    void *Create* (props, ref)
   *
   *  Returns:
   *    -
   */
  obj.Create = ngcs_Create;
  /*  Function: Dispose
   *  Destroys the control.
   *
   *  Syntax:
   *    void *Dispose* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  obj.Dispose = ngc_Dispose;

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
  obj.AddEvent = ngObjAddEvent;
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
  obj.RemoveEvent = ngObjRemoveEvent;

  /*
   *  Event: OnSetEnabled
   */
  obj.OnSetEnabled     = null;
  /*
   *  Event: OnEnabledChanged
   */
  obj.OnEnabledChanged = null;

  if ((ngHASDESIGNINFO())&&(typeof ngSysControlDesignInfo === 'function')) ngSysControlDesignInfo(obj);
}

// --- ngControl - children ----------------------------------------------------

var ngOnAddChildControl = ngOnAddChildControl || null;

function ngAddChildControl(parentobj, obj)
{
  if((!parentobj)||(!obj)) return;
  if(typeof parentobj.ChildControls === 'undefined') parentobj.ChildControls = new Array();
  if (ngOnAddChildControl) ngOnAddChildControl(parentobj,obj);
  parentobj.ChildControls[parentobj.ChildControls.length]=obj;
  if(!obj.ParentControl) obj.ParentControl=parentobj;
}

function ngRemoveChildControl(parentobj, obj)
{
  if((!parentobj)||(!obj)) return;
  var cc=parentobj.ChildControls;
  if(typeof cc === 'undefined') return;
  var c;
  for(var i=cc.length-1;i>=0;i--)
  {
    c=cc[i];
    if(c==obj) cc.splice(i,1);
  }
  if(!cc.length) delete parentobj.ChildControls;
  if(obj.ParentControl==parentobj) obj.ParentControl=null;
}

function ngSavePropState(parentobj, prop, recursive, states)
{
  if(!parentobj) return null;
  if(typeof prop==='undefined') prop='Enabled';
  if(typeof states==='undefined')
  {
    states=new Object;
    states['_Prop']=prop;
    states['_Parent']=parentobj;
  }

  var v=parentobj[prop];
  states[parentobj.ID]=v;
  if((ngVal(recursive,false))&&(typeof parentobj.ChildControls !== 'undefined'))
  {
    var c,nc=new Array();
    for(var i=0;i<parentobj.ChildControls.length;i++)
    {
      ngSavePropState(parentobj.ChildControls[i],prop,true,states);
    }
  }
  return states;
}

function ngRestorePropState(states, update)
{
  var c;
  var prop=states['_Prop'];
  for(var i in states)
  {
    if(i.charAt(0)=='_') continue;
    c=ngGetControlById(i);
    if(c)
    {
      c[prop]=states[i];
    }
  }
  c=states['_Parent'];
  if((c)&&(ngVal(update,true))) c.Update(true);
}

function ngcReattachChildren(c)
{
  if(typeof c.ChildControls !== 'undefined')
  {
    var cc;
    for(var i=0;i<c.ChildControls.length;i++)
    {
      cc=c.ChildControls[i];
      ngcReattachChildren(cc);
      cc.Attach();
    }
  }
}

// --- ngControl - popups ------------------------------------------------------

var ngc_ActivePopups = {};
var ngc_PopupsInitialized = false;

function ngc_HidePopups()
{
  for(var popupgrp in ngc_ActivePopups)
  {
    var dd=ngc_ActivePopups[popupgrp];
    if(dd) ngc_HidePopup(dd);
  }
}

function ngc_GetPopupGroup(ctrl)
{
  var popupgrp=ctrl.PopupGroup;
  if((typeof popupgrp==='undefined')||(popupgrp=='')) popupgrp='default';
  return popupgrp;
}

function ngc_HidePopup(ctrl)
{
  if(!ctrl) return false;
  var popupgrp=ngc_GetPopupGroup(ctrl);

  var ret=false;
  var dd=ngc_ActivePopups[popupgrp];
  if(dd===ctrl)
  {
    ctrl.SetVisible(false);
    if(!ctrl.Visible) ret=true;
    if((ret)&&(ngc_ActivePopups[popupgrp]===ctrl)) // safe check if SetVisible don't call ngc_DeactivatePopup
      ngc_ActivePopups[popupgrp]=null;
  }
  return ret;
}

function ngc_DeactivatePopup(ctrl)
{
  if(!ctrl) return;
  var popupgrp=ngc_GetPopupGroup(ctrl);

  var dd=ngc_ActivePopups[popupgrp];
  if(dd===ctrl) ngc_ActivePopups[popupgrp]=null;
}

function ngc_IsActivePopup(ctrl)
{
  if(!ctrl) return false;
  var popupgrp=ngc_GetPopupGroup(ctrl);
  var dd=ngc_ActivePopups[popupgrp];
  return(dd===ctrl);
}

function ngc_ActivatePopup(ctrl)
{
  if(!ctrl) return;
  var popupgrp=ngc_GetPopupGroup(ctrl);

  if(!ngc_PopupsInitialized)
  {
    ngc_PopupsInitialized=true;

    function onmousewheel(e)
    {
      if (!e) e = window.event;
      var target = e.target || e.srcElement || e.originalTarget;

      for(var popupgrp in ngc_ActivePopups)
      {
        var dd=ngc_ActivePopups[popupgrp];
        if(dd)
        {
          if(ngModalCnt) {
            var ddo=dd.Elm();
            if(ng_IsInactiveModalElm(ddo)) continue;
          }

          var t = target;
          if(t)
          {
            if((!dd.OnIsInsidePopup)||(!ngVal(dd.OnIsInsidePopup(dd,t,1,e),true)))
            {
              if(typeof dd.IsInsidePopup === 'function')
              {
                if(!ngVal(dd.IsInsidePopup(t,1,e),true)) t=null;
              }
              else
              {
                var ad=(dd ? dd.Elm() : null);
                while(t)
                {
                  if(t===ad) break;
                  t=t.parentNode;
                }
              }
            }
          }
          if(!t) ngc_HidePopup(dd);
        }
      }
    }

    function onpointerdown(pi)
    {
      var ret=true;
      var target = pi.GetTarget();
      for(var popupgrp in ngc_ActivePopups)
      {
        var dd=ngc_ActivePopups[popupgrp];
        if(dd)
        {
          if(ngModalCnt) {
            var ddo=dd.Elm();
            if(ng_IsInactiveModalElm(ddo)) continue;
          }

          var t = target;
          if(t)
          {
            if(t)
            {
              if((!dd.OnIsInsidePopup)||(!ngVal(dd.OnIsInsidePopup(dd,t,0,pi),true)))
              {
                if(typeof dd.IsInsidePopup === 'function')
                {
                  if(!ngVal(dd.IsInsidePopup(t,0,pi),true)) t=null;
                }
                else
                {
                  var ad=(dd ? dd.Elm() : null);
                  while(t)
                  {
                    if(t===ad) break;
                    t=t.parentNode;
                  }
                }
              }
            }
            if(!t)
            {
              if(typeof dd.DoClickOutside === 'function')
              {
                if(ngVal(dd.DoClickOutside(pi),false)) ngc_HidePopup(dd);
              }
              else if((!dd.OnClickOutside)||(ngVal(dd.OnClickOutside(dd,pi),false)))
                ngc_HidePopup(dd);

              if(ret) {
                ng_DocumentDeselect();
                pi.EventPreventDefault();
                pi.StopPropagation=true;
                ngc_disabledocselect(pi.StartElement);
                ret=false;
              }
            }
          }
        }
      }
      return ret;
    }

    document.onmousewheel = ngAddEvent(document.onmousewheel, onmousewheel);
    if (window.addEventListener)
      window.addEventListener('DOMMouseScroll', onmousewheel, false);
    ngOnPointerDown = ngAddEvent(ngOnPointerDown,onpointerdown);
  }

  var dd=ngc_ActivePopups[popupgrp];
  if(typeof dd==='undefined') // not initialized
  {
    ngc_ActivePopups[popupgrp]=null;
    dd=null;
  }
  if(dd!==ctrl) ngc_HidePopup(dd);
  if(ngc_ActivePopups[popupgrp]!==null) return false; // cannot hide previous Popup

  ngc_ActivePopups[popupgrp]=ctrl;
  return true;
}

// --- Pointer events ----------------------------------------------------------

var ngOnPointerDown = ngOnPointerDown || null;

var ngDblClickMouseTimeout = 500;
var ngDblClickMouseThreshold = 10;
var ngDblClickTouchTimeout = 500;
var ngDblClickTouchThreshold = 20;

var ngCurrentPtrControl = null;
var ngCurrentPtrDblClick = null;
var ngPtrIgnoredEvent = null;

var ngPointersInitialized = false;
var ngAcceptMouseGestures;

var ngc_docselectinfo=null;
var ngc_elmfromptcheck=false;
var ngc_elmfromptrel=true;

function ngc_enabledocselect()
{
  var dsi=ngc_docselectinfo;
  if(dsi)
  {
    ngc_docselectinfo=null;
    if(typeof dsi.oldonselect != 'undefined') document.onselectstart=dsi.oldonselect;
    if(dsi.elm) dsi.elm.style.MozUserSelect=dsi.oldmozuserselect;
  }
}

function ngc_disabledocselect(elm)
{
  ngc_enabledocselect();
  var dsi={
     elm: elm,
     oldonselect: document.onselectstart
  }
  document.onselectstart =  function () { return false; };
  if(elm)
  {
    dsi.oldmozuserselect=elm.style.MozUserSelect;
    elm.style.MozUserSelect="none";
  }
  ngc_docselectinfo=dsi;
}

function ngc_eventref(e) {
  if((ngIExplorer)&&(e)&&(ngIExplorerVersion<=8)) {
    // in IE<=8 reference to window.event doesn't survive, need copy
    var ne={ts:new Date().getTime()};
    for(var i in e) ne[i]=e[i];
    return ne;
  }
  return e;
}

function ngc_ptrevignore(e)
{
  if((e)&&(e.gesture)) e=e.gesture.srcEvent;
  ngPtrIgnoredEvent=ngc_eventref(e);
}

function ngc_ptrevisignored(e)
{
  var ie=ngPtrIgnoredEvent;
  if((e)&&(e.gesture)) e=e.gesture.srcEvent;
  if(ie)
  {
    if(ie===e) return true;
    if((ngIExplorer)&&(ngIExplorerVersion<=8)) {
      // in IE<=8 window.event returns always new instance :(
      if((ie.type===e.type)&&(ie.clientX===e.clientX)&&(ie.clientY===e.clientY)&&(ie.altKey===e.altKey)&&(ie.ctrlKey===e.ctrlKey)&&(ie.srcElement===e.srcElement)&&(ie.button===e.button))
      {
        if((new Date().getTime()-ie.ts)<500) return true;
      }
    }
  }
  return false;
}

function ngc_elementFromPoint(x,y)
{
  if(!document.elementFromPoint) return null;

  var sx,sy;
  if((!ngc_elmfromptcheck)||(ngc_elmfromptrel)) {
    sx=ng_DocumentScrollX();
    sy=ng_DocumentScrollY();
  }

  if((!ngc_elmfromptcheck)&&((sy>0)||(sx>0)))
  {
    ngc_elmfromptcheck=true;
    var doc=null;
    if(sy>0) doc=document.elementFromPoint(0,sy+ng_DocumentClientHeight()-1);
    else     doc=document.elementFromPoint(sx+ng_DocumentClientWidth()-1, 0);
    ngc_elmfromptrel = (doc===null)||(doc.tagName.toUpperCase()==='HTML');
  }

  if(ngc_elmfromptrel)
  {
    x-=sx;
    y-=sy;
  }
  return document.elementFromPoint(x,y);
}

function ngc_ptrstart(c, eid, elm, e, gestures)
{
  if(!e) e = window.event;

  if(ngc_ptrevisignored(e)) return;

  var touch=((e.gesture)&&(Hammer)&&((e.gesture.pointerType===Hammer.POINTER_TOUCH)||(e.gesture.pointerType===Hammer.POINTER_PEN)));
  ngUsingTouch=touch;

  if((!e.gesture)&&((e.button!=0) && (!ngIExplorer || e.button!=1))) // not left click
    return;

  var pos=ngc_DoGetPointerPos(c,e,null);

  function gettarget()
  {
     var e=this.Event;
    if((this.TargetEvent!=e)
     ||(typeof this.TargetX==='undefined')||(typeof this.TargetY==='undefined')
     ||(this.TargetX!=this.X)||(this.TargetY!=this.Y))
    {
      var target;
      if(document.elementFromPoint) target=ngc_elementFromPoint(this.X,this.Y);
      else target = e.target || e.srcElement || e.originalTarget;
      this.Target=target;
      this.TargetX=this.X;
      this.TargetY=this.Y;
      this.TargetEvent=e;
    }
    return this.Target;
  }

  function gettargetctrl(type)
  {
    var ot=this.Target;
    var target=this.GetTarget();
    if(typeof type!=='undefined')
      return ngGetControlByElement(target,type);

    if((!this.TargetControl)||(ot!==this.Target))
      this.TargetControl=ngGetControlByElement(target);
    return this.TargetControl;
  }

  function inelm(p,ielm)
  {
    var t=p.GetTarget();
    var tc;
    while(t)
    {
      if(t==ielm) return true;
      tc=ngGetControlById(t.id);
      if(tc)
      {
        p.TargetControl=tc;
        break;
      }
      t=t.parentNode;
    }
    return false;
  }

  function insrcelm()
  {
    return inelm(this,this.SrcElement);
  }

  function indstelm()
  {
    return inelm(this,this.DstElement);
  }

  function preventdefault()
  {
    if(e) {
      if(e.gesture)
        e.gesture.preventDefault();
      else
      {
        if(e.preventDefault)
          e.preventDefault();
        else
          e.returnValue = false;
      }
    }
  }

  function stoppropagation()
  {
    var e=this.Event;
    if(e) {
      if((e.gesture)&&(e.gesture.stopPropagation)) e.gesture.stopPropagation();
      if(e.stopPropagation) e.stopPropagation();
      else e.cancelBubble = true;
    }
  }
  var pi={
      Owner: c,
      X: pos.x,
      Y: pos.y,
      StartX: pos.x,
      StartY: pos.y,
      StartElement: elm,
      StartTime: new Date().getTime(),
      StartEvent: ngc_eventref(e),
      StartEventID: eid,
      Event: e,
      EventID: eid,
      CanFocus: true,
      Gestures: ng_CopyVar(gestures),
      Touch: touch,
      PointerType: (e.gesture ? e.gesture.pointerType : 'mouse'),
      GetTarget: gettarget,
      GetTargetControl: gettargetctrl,
      SrcTarget: e.target || e.srcElement || e.originalTarget,
      SrcElement: elm,
      DstElement: elm,
      IsInSrcElement: insrcelm,
      IsInDstElement: indstelm,
      PreventDefault: true,
      PreventSelect: true,
      DocumentDeselect: true,
      //StopPropagation: undefined,
      EventPreventDefault: preventdefault,
      EventStopPropagation: stoppropagation,
      OnGesture: null,
      OnPointerUp: null
  };
  if((!c)&&(elm===document.body)&&(eid==='document')) {
    pi.PreventDefault=false;
    pi.PreventSelect=false,
    pi.DocumentDeselect=false;
  }

  if(pi.SrcTarget)
  {
    if(pi.SrcTarget.onclick) pi.PreventDefault=false;
    else
    {
      if(ng_CanFocusElm(pi.SrcTarget)) pi.PreventDefault=false;
      if(ng_CanSelectElm(pi.SrcTarget)) pi.PreventSelect=false;
    }
  }

  if((ngOnPointerDown)&&(!ngVal(ngOnPointerDown(pi),false)))
  {
    if(pi.StopPropagation) ngc_ptrevignore(e);
    return;
  }
  if(c)
  {
    var dci=c.DblClickInfo;
    if(dci)
    {
      var threshold = (pi.Touch ? ngDblClickTouchThreshold : ngDblClickMouseThreshold);
      if((Math.abs(pi.X-dci.X)<threshold)&&(Math.abs(pi.Y-dci.Y)<threshold))
      {
        if(dci.Timer) clearTimeout(dci.Timer);
        pi.DblClickInfo=dci;
      }
      delete c.DblClickInfo;
    }
    if((c.DoPointerDown)&&(!ngVal(c.DoPointerDown(pi),false)))
    {
      if(pi.StopPropagation) ngc_ptrevignore(e);
      return;
    }
    if((c.OnPointerDown)&&(!ngVal(c.OnPointerDown(c, pi),false)))
    {
      if(pi.StopPropagation) ngc_ptrevignore(e);
      return;
    }
    if(c.Enabled)
    {
      ngCurrentPtrControl=c;

      c.PointerInfo = pi;
      if(touch)
      {
        c.Touching = true;
        delete c.MouseDown;
      }
      else
      {
        c.MouseDown = true;
        delete c.Touching;
      }
    }
    if(pi.Touch)
    {
      ngc_Enter(e, elm, c.CtrlType);
    }
    if(c.Enabled)
    {
      if(c.DoPtrStart) c.DoPtrStart(pi);
      if(c.OnPtrStart) c.OnPtrStart(c, pi);
    }
  }
  if((pi.CanFocus)&&(pi.PreventDefault))
  {
    var ai=document.activeElement;
    var doblur=true;
    var p=pi.SrcTarget;
    var focuselm=null;
    while((p)&&(p!=document))
    {
      if(ng_CanFocusElm(p))
      {
        if(ngIExplorer) {
          try { // p.focus in IExplorer scrolls content to top-left, use setActive instead
            p.setActive();
          }
          catch(ex) {
            p.focus();
          }
        }
        else p.focus();
        doblur=false;
        break;
      }
      if(p==ai) {doblur=false; break;}
      p=p.parentNode;
    }
    if((doblur)&&(ai)) ai.blur();
  }
  if(pi.DocumentDeselect) ng_DocumentDeselect();
  if(pi.PreventSelect) ngc_disabledocselect(pi.StartElement);
  if(pi.PreventDefault) pi.EventPreventDefault();
  if((typeof pi.StopPropagation === 'undefined')||(pi.StopPropagation)) ngc_ptrevignore(e);
}

function ngc_ptrend(e)
{
  ngc_enabledocselect();
  var c=ngCurrentPtrControl;
  if(c)
  {
    ngCurrentPtrControl = null;
  }
  else
  {
    c=ngCurrentPtrDblClick; // IE<9 doesn't fire MouseDown on double click
    if(!c) return false;

    var dci=c.DblClickInfo;
    if(dci)
    {
      var pi=c.PointerInfo;
      if(pi)
      {
        var threshold = (pi.Touch ? ngDblClickTouchThreshold : ngDblClickMouseThreshold);
        if((Math.abs(pi.X-dci.X)<threshold)&&(Math.abs(pi.Y-dci.Y)<threshold))
        {
          if(dci.Timer) clearTimeout(dci.Timer);
          pi.DblClickInfo=dci;
        }
      }
      delete c.DblClickInfo;
    }
  }

  if(!e) e=window.event;

  ngc_ptrevignore(null);
  ngCurrentPtrDblClick = null;

  var pi=c.PointerInfo;
  if(pi)
  {
    var er=ngc_eventref(e);
    pi.Event=er;
    pi.EndEvent=er;
    pi.EndEventID=pi.EventID;
    c.GetPointerPos(e);
    pi.EndX=pi.X;
    pi.EndY=pi.Y;
    pi.EndTime=new Date().getTime();
    if((pi.Touch)&&(c.MouseInControl))
    {
      ngc_Leave(e, pi.StartElement, c.CtrlType);
    }
    if(pi.OnPointerUp) pi.OnPointerUp(pi);
  }

  var ret=false;
  if((!c.OnPointerUp)||(ngVal(c.OnPointerUp(c, pi),false)))
  {
    ret=true;

    if((pi)&&((pi.Gestures.tap)||(pi.Gestures.doubletap)))
    {
      if((pi.GetTargetControl()==c)||(pi.EndTime-pi.StartTime<200))
      {
        var dci=null;
        if((pi.Gestures.doubletap)&&(c.DoPtrDblClick))
        {
          dci=pi.DblClickInfo;
          if(!dci)
          {
            if(typeof pi.Click === 'undefined') pi.Click=true;
            if(pi.DblClick!==false) {
              dci={
                StartElement: pi.StartElement,
                StartTime: pi.StartTime,
                EndTime: pi.EndTime,
                X: pi.X,
                Y: pi.Y
              };
            }
          }
          else
          {
            ngCurrentPtrDblClick=null;
            if(dci.Timer) clearTimeout(dci.Timer);

            pi.DblClickStartTime=dci.StartTime;
            pi.DblClickEndTime=dci.EndTime;
            pi.DblClickStartElement=dci.StartElement;

            // clear selection caused by double click
            ng_DocumentDeselect();

            if(typeof pi.DblClick === 'undefined') pi.DblClick=true;

            dci=null;
          }
        }
        else if(typeof pi.Click === 'undefined') pi.Click=true;
      }
    }

    if(c.DoPtrEnd) c.DoPtrEnd(pi);
    if(c.OnPtrEnd) c.OnPtrEnd(c, pi);

    var doclick=((pi)&&(pi.Click)&&(c.DoPtrClick));
    if(dci)
    {
      ngCurrentPtrDblClick=c;
      c.DblClickInfo=dci;
      dci.Timer=setTimeout(function () {
        clearTimeout(dci.Timer);
        delete c.DblClickInfo;
        ngCurrentPtrDblClick=null;
        if((doclick)&&(c.DoPtrClick)) c.DoPtrClick(pi);
      },Math.round((pi.Touch ? ngDblClickTouchTimeout : ngDblClickMouseTimeout)/2));
    }
    else
    {
      if(doclick)
      {
        var timer=setTimeout(function () {
          clearTimeout(timer);
          if(c.DoPtrClick) c.DoPtrClick(pi);
        },1);
      }
    }

    if((pi)&&(pi.DblClick)&&(c.DoPtrDblClick))
    {
      c.DoPtrDblClick(pi);
    }
  }
  delete c.MouseDown;
  delete c.Touching;
  return ret;
}

function ngc_HandleScrollGesture(c,pi,elm)
{
  if(pi.Gesture==='drag')
  {
    var dx=Math.round(pi.X-pi.StartX);
    var dy=Math.round(pi.Y-pi.StartY);
    if((dx)||(dy)) {

      if(typeof pi.ScrollControl === 'undefined')
      {
        var e=(elm ? elm : c.Elm());
        if(!e) return false;

        var st;
        if(elm)
        {
          if(typeof e.sbtype!=='undefined') st=e.sbtype; // has saved scroll bar type (Android)
          else
          {
            st=ng_GetScrollBars(e);
            if(ngAndroid) e.sbtype=st; // ScrollBars are set to ssNone on Android, save scroll bar type
          }
        }
        else
        {
          st=c.ScrollBars;
          if(typeof st==='undefined') {
            st=ng_GetScrollBars(e);
            c.ScrollBars=st;
          }
        }

        if((st===ssNone)||(st===ssDefault)) return false;

        if(ngAndroid) {
          // Android doesn't support scrollTop/Left if CSS overflow is set to scroll or auto :(
          ng_SetScrollBars(e,ssNone);
        }

        if((e.scrollHeight > e.clientHeight)||(e.scrollWidth > e.clientWidth)) // has overflow content
        {
          var ost=e.scrollTop;
          var osl=e.scrollLeft;

          if((st===ssAuto)||(st===ssBoth)||(st===ssHorizontal))
            e.scrollLeft=osl-dx;
          if((st===ssAuto)||(st===ssBoth)||(st===ssVertical))
            e.scrollTop=ost-dy;

          pi.ScrollControl = c;
          pi.ScrollElm  = e;
          pi.ScrollTop  = ost;
          pi.ScrollLeft = osl;
          pi.ScrollType=st;
          return true;
        }
      }
      else
        if(pi.ScrollControl === c)
        {
          var st=pi.ScrollType;
          if(st===ssNone) return false;

          var stop,sleft;
          if((st===ssAuto)||(st===ssBoth)||(st===ssHorizontal))
            sleft = pi.ScrollLeft-dx;
          if((st===ssAuto)||(st===ssBoth)||(st===ssVertical))
            stop = pi.ScrollTop -dy;
          if(sleft<0) sleft=0;
          if(stop<0) stop=0;

          if(((typeof sleft!=='undefined')||(typeof stop!=='undefined'))
           &&((sleft != pi.ScrollLeft)||(stop != pi.ScrollTop)))
          {
            if(pi.ScrollTimer) clearTimeout(pi.ScrollTimer);
            pi.ScrollTimer=setTimeout(function() {
              clearTimeout(pi.ScrollTimer); pi.ScrollTimer=null;
              if(typeof stop!=='undefined') pi.ScrollElm.scrollTop=stop;
              if(typeof sleft!=='undefined') pi.ScrollElm.scrollLeft=sleft;
            },1);
          }

          if((Math.abs(dx)>20)||(Math.abs(dy)>20))
          {
            delete pi.Gestures.tap;
            delete pi.Gestures.doubletap;
            pi.Scroll=true;
          }
          return true;
        }
    }
  }
  else
  {
    if(pi.ScrollControl === c)
    {
      var st=pi.ScrollType;
      if(st===ssNone) return false;
      if(pi.Gesture==='swipe') return true;
      if((st!==ssVertical)&&((pi.Gesture==='swipeleft')||(pi.Gesture==='swiperight'))) return true;
      if((st!==ssHorizontal)&&((pi.Gesture==='swipeup')||(pi.Gesture==='swipedown'))) return true;
    }
  }
  return false;
}

function ngc_ptrgesture(e,gesture)
{
  if(e.ngGestureHandled) return false;

  var c=ngCurrentPtrControl;
  if(!c) return false;

  var pi=c.PointerInfo;
  if(!pi) return false;

  gesture=ngVal(gesture,e.type);

  pi.Event=e;
  pi.Gesture=gesture;

  if(pi.OnGesture) pi.OnGesture(pi);

  var ret=false;
  if(gesture==='drag')
  {
    if(!c.Visible)
    {
      ngc_ptrend(e);
      return false;
    }
    c.GetPointerPos(e);
    if(pi.Touch)
    {
      var tc=pi.GetTargetControl();
      if((c.MouseInControl)&&(tc!=c))  ngc_Leave(e, c.Elm(), c.CtrlType);
      if((!c.MouseInControl)&&(tc==c)) ngc_Enter(e, c.Elm(), c.CtrlType);
    }
    if(pi.Gestures.drag)
    {
      if(c.DoPtrDrag) ret=ngVal(c.DoPtrDrag(pi),true);
      if(c.OnPtrDrag) ret=ngVal(c.OnPtrDrag(c, pi),true) || ret;
      if(ret) return false;
    }
  }

  if(!pi.Touch)
  {
    if(typeof ngAcceptMouseGestures !== 'undefined') {
      if(!ngAcceptMouseGestures) return false;
    }
  }

  var accept;
  var p=c;
  try
  {
    while((p)&&(pi.Gesture!=''))
    {
      accept=true;
      if((typeof p.AcceptGestures !== 'undefined')&&(!p.AcceptGestures)) accept=false;
      if(!pi.Touch)
      {
        if(typeof p.AcceptMouseGestures !== 'undefined') {
          if(!p.AcceptMouseGestures) accept=false;
        }
        else if(typeof ngAcceptMouseGestures === 'undefined') accept=false;
      }
      if(accept) {
        ret=false;
        if(p.DoGesture) ret=ngVal(p.DoGesture(pi),true) || ret;
        if(p.OnGesture) ret=ngVal(p.OnGesture(p,pi),true) || ret;
        if(!ret) ret=ngc_HandleScrollGesture(p,pi);
        if(ret) break;
      }
      p=p.ParentControl;
    }
    if(ret) e.ngGestureHandled=true;
  }
  finally
  {
    delete pi.Gesture;
  }
  return ret;
}

function ngc_PtrListener(c, elm, eid, gestures, ev)
{
  if(typeof elm==='string') elm=document.getElementById(elm);
  if(!elm) return;

  if((typeof gestures === 'undefined')||(!gestures)) gestures=[];
  else if(typeof gestures==='string') gestures=gestures.split(' ');
  if(typeof eid==='undefined') eid='';

  if(c.DoAcceptPtrGestures) c.DoAcceptPtrGestures(elm,eid,gestures,ev);

  var gstates={};
  for(var i=0;i<gestures.length;i++)
  {
    if(gstates[gestures[i]]) { // duplicate gesture
      gestures.splice(i,1);
      i--;
      continue;
    }
    gstates[gestures[i]]=true;
  }

  if(!gstates['touch'])
  {
    gstates['touch']=true;
    gestures.push('touch');
  }
  if(!gstates['drag'])
  {
    gestures.push('drag');
  }
  if(!gstates['release'])
  {
    gstates['release']=true;
    gestures.push('release');
  }

  function mousedown(e)
  {
    ngc_ptrstart(c,eid,elm,e,gstates);
  }

  if(!elm.ngpointers)
  {
    elm.ngpointers={}; // must be object for IE<8 which serialize 'common' element property values into innerHTML
    if(!ngPointersInitialized) ngc_InitPointers();
    if(!c.GetPointerPos) c.GetPointerPos = ngc_GetPointerPos;

    if(ngHammerJSVer()===1) // HammerJS library v1.x is present
    {
      var opts={ drag_min_distance : 1, hold_threshold: 30 };
      if(c.DoGetPtrOptions) c.DoGetPtrOptions(eid, opts);

      var ous=Hammer.defaults.stop_browser_behavior.userSelect;
      try
      {
        Hammer.defaults.stop_browser_behavior.userSelect='text'; // allow mouse selection by default
        elm.hammer=Hammer(elm, opts);
      }
      finally
      {
        Hammer.defaults.stop_browser_behavior.userSelect=ous;
      }

      function touch(e)
      {
        if(!e.gesture) return;

        switch(e.type)
        {
          case 'touch':
            ngc_ptrstart(c,eid,elm,e,gstates);
            break;
          case 'release':
            if(!e.ngReleaseHandled) {
              e.ngReleaseHandled=true;
              ngc_ptrend(e);
            }
            break;
          case 'tap':
          case 'doubletap':
            // ignore, handled by ptrstart/end
            break;
          default:
            ngc_ptrgesture(e);
            break;
        }
      }
      for(var t=0; t<gestures.length; t++)
          elm.addEventListener(gestures[t], touch, false);

      if(ev)
      {
        // Check if hammer is not already registered on some parent node,
        // if yes, event delegation is not needed
        var found=false;
        var p=elm.parentNode;
        while(p)
        {
          if(p.ngpointers) { found=true; break; }
          p=p.parentNode;
        }
        if(!found) elm.hammer.eventStartHandler(ev);
        return;
      }
    }
    else
    {
      if(!ev)
      {
        if(elm.addEventListener) { // W3C DOM
          elm.addEventListener('mousedown',mousedown,false);
        }
        else
        if(elm.attachEvent) // IE DOM
        {
          elm.attachEvent("onmousedown",mousedown);
        }
        else { // No much to do
          elm['onmousedown']=ngAddEvent(elm['onmousedown'],mousedown);
        }
      }
    }
  }

  if(ev) mousedown(ev);
}

function ngc_PtrEvents(c, eid, gestures, elm)
{
  if(!c) return '';

  if(typeof gestures === 'undefined') gestures='';
  else if(typeof gestures!=='string') gestures=gestures.join(' ');
  if(typeof eid==='undefined') eid='';
  if(typeof elm==='undefined') elm=c.Elm();

  function mousedown(e)
  {
    ngc_ptrev(e,elm,gestures,eid);
  }

  if(!c.GetPointerPos) c.GetPointerPos = ngc_GetPointerPos;
  var evs = ngPtrStartEvents();
  for(var k in evs)
  {
    if(elm.addEventListener) { // W3C DOM
      elm.addEventListener(evs[k],mousedown,false);
    }
    else
    if(elm.attachEvent) // IE DOM
    {
      elm.attachEvent('on'+evs[k],mousedown);
    }
    else { // No much to do
      elm['on'+evs[k]]=ngAddEvent(elm['onmousedown'],mousedown);
    }
  }
}

function ngc_PtrEventsHTML(c, eid, gestures)
{
  if(!c) return '';

  if(typeof gestures === 'undefined') gestures='';
  else if(typeof gestures!=='string') gestures=gestures.join(' ');
  if(typeof eid==='undefined') eid='';

  if(!c.GetPointerPos) c.GetPointerPos = ngc_GetPointerPos;
  return ngPtrHTMLStartEvents('','ngc_ptrev(event,this,\''+gestures+'\',\''+eid+'\')');
}

function ngc_ptrev(e,elm,gestures,eid)
{
  if(elm.hammer) return; // hammer will handle pointer, nothing to do

  var c=ngGetControlByElement(elm);
  if(!c) return;
  if(!e) e = window.event;
  ngc_PtrListener(c, elm, eid, gestures, e);
}

function ngc_DoGetPointerPos(c,e,pi)
{
  var ret;
  if (!e) e = window.event;
  if (!e) return;
  if((c)&&(typeof pi === 'undefined')) pi=c.PointerInfo;

  if((e.gesture)&&(Hammer)) // Hammer event
  {
    var px=e.gesture.center.pageX;
    var py=e.gesture.center.pageY;
    if(typeof px === 'undefined')
    {
      px=e.gesture.center.clientX+ng_DocumentScrollX();
      py=e.gesture.center.clientY+ng_DocumentScrollY();
    }
    if(c)
    {
      if(e.gesture.pointerType===Hammer.POINTER_MOUSE)
      {
        c.MouseX=px;
        c.MouseY=py;
      }
      else
      {
        c.TouchX=px;
        c.TouchY=py;
      }
    }
    if(pi) {
      pi.X=px;
      pi.Y=py;
    }
    return new ScreenPt(px,py);
  }
  else
  {
    var ox,oy;

    if(c) {
      ox = c.MouseX;
      oy = c.MouseY;
    }
    else {
      ox = 0;
      oy = 0;
    }

    var px = e.pageX;
    var py = e.pageY;
    if(typeof px === 'undefined')
    {
      px=e.clientX+ng_DocumentScrollX();
      py=e.clientY+ng_DocumentScrollY();
    }

    // IE fix, include frame size if not in fullscreen
    if((ngIExplorer)&&(ngIExplorerVersion<=7)&&(screen.width>document.body.offsetWidth)) // fixed in IE8
    {
      px-=2;
      py-=2;
    }
    // firefox fix:
    if(isNaN(px)) px=ox;
    if(isNaN(py)) py=oy;

    if(c) {
      c.MouseX = px;
      c.MouseY = py;
    }
    if(pi) {
      pi.X=px;
      pi.Y=py;
    }
    return new ScreenPt(px,py);
  }
}

function ngc_GetPointerPos(e)
{
  return ngc_DoGetPointerPos(this,e)
}

function ngc_InitPointers()
{
  if(ngPointersInitialized) return;

  if(ngHammerJSVer()!==1) // HammerJS library v1.x is NOT present
  {
    if(ngHammerJS()) {
      ngDEBUGWARN('Incompatible version of Hammer.js - '+Hammer.VERSION+' (1.x required). Controls.js touch events base support is disabled.');
    }

    function doc_mouse_down(e)
    {
      ngc_ptrstart(null, 'document', document.body, e, ['touch']);
    }

    function mouse_up(e)
    {
      ngc_ptrend(e);
    }

    function mouse_move(e)
    {
      var c=ngCurrentPtrControl;
      if(!c) return;

      if(!e) e=window.event;
      if((ngIExplorer)&&(ngIExplorerVersion<9)&&(!e.button)) // detected mouse up outside window for IE<9
      {
        mouse_up(e);
        return;
      }
      if(c.MouseDown)
      {
        ngc_ptrgesture(e,'drag');
      }
    }

    function mouse_out(e)
    {
      if (!e) e = window.event;

      if((ngCurrentPtrControl)&&(!ngIExplorer)&&(!e.relatedTarget)) // moved outside window, stop mousedown
      {
        mouse_up(e);
      }
      return true;
    }

    document.onmousedown   = ngAddEvent(doc_mouse_down, document.onmousedown); // handle top-level/document mouse down
    document.onmousemove   = ngAddEvent(mouse_move, document.onmousemove);
    document.onmouseup     = ngAddEvent(mouse_up, document.onmouseup);
    document.onmouseout    = ngAddEvent(document.onmouseout, mouse_out);
  }
  else
  {
    function touch(e)
    {
      if((e.gesture)&&(e.type==='touch'))
        ngc_ptrstart(null,'document',document.body,e,['touch']);
    }
    document.hammer=Hammer(document);
    document.addEventListener('touch', touch, false); // handle top-level/document touch
  }
  ngPointersInitialized = true;
}

// --- ngApplication -----------------------------------------------------------

var ngaStateStopped = 0;
var ngaStateRunning = 1;
var ngaStateInitializing = 2;
var ngaStateTerminated = -1;

var APPPARAM_SERVER = 1
var APPPARAM_CLIENT = 2;
var APPPARAM_URL    = 4;

function nga_Elm()
{
  var appid=ngVal(this.ElmID,'ngApp');
  if(appid=='') appid='ngApp';

  var o=document.getElementById(appid);
  if(!o) o=document.body;
  return o;
}

function nga_TopElm()
{
  var appid=ngVal(this.TopElmID,null);
  if(appid===null) return this.Elm();

  var o=null;
  if(appid!='') o=document.getElementById(appid);
  if(!o) o=document.body;
  return o;
}

function nga_GetLang()
{
  var l=ngc_Lang[this.Lang];
  if(typeof l === 'undefined') { this.Lang='en'; l=ngc_Lang['en']; }
  return l;
}

function nga_SetLangById(lngid)
{
  var li=ngExtractLangId(lngid);
  return this.SetLang(li.Lang,li.LangCountry,li.LangVariant);
}

function nga_SetLang(language, country, variant)
{
  var undefined;

  var changed=false;
  if(language !== this.Lang) changed=true;
  else {
    if(typeof country==='undefined') country=this.LangCountry;
    else if(country!==this.LangCountry) changed=true;

    if(!changed) {
      if(typeof variant==='undefined') variant=this.LangVariant;
      else if(variant!==this.LangVariant) changed=true;
    }
  }
  if(changed) {
    if(!country) {
      country=undefined;
      variant=undefined;
    }
    if(!language) {
      language=undefined;
      country=undefined;
      variant=undefined;
    }
    var oldlang = {
      Lang: this.Lang,
      LangCountry: this.LangCountry,
      LangVariant: this.LangVariant
    };
    this.Lang = typeof language === 'string' ? language.toLowerCase() : undefined;
    this.LangCountry = typeof country === 'string' ? country.toLowerCase() : undefined;
    this.LangVariant = typeof variant === 'string' ? variant.toLowerCase() : undefined;
    if(this.OnLangChanged) this.OnLangChanged(this, oldlang);
  }
  return changed;
}

function nga_DetectLangEx(defaultlang)
{
  var lng=ngVal(this.StartParams.Lang,'');
  if(lng=='') lng=ngVal(ng_GET('lang'),'');
  if(lng=='') lng=this.Lang;
  if(lng=='')
  {
    if (navigator.userLanguage) // Explorer
      lng = navigator.userLanguage;
    else if (navigator.language) // FF
      lng = navigator.language;
  }
  if(lng=='') lng=ngVal(defaultlang,'');
  return ngExtractLangId(lng);
}

function nga_DetectLang(defaultlang)
{
  var li=this.DetectLangEx(defaultlang);
  return ngNormalizeLang(li.Lang);
}

function nga_Text(t, defval)
{
  return ngTxt(t, defval);
}

function nga_Resource(rid)
{
  return ngRes(rid);
}

var nga_RunTimer=null;
function nga_DoRunFinal()
{
  if((ngApp.OnRun)&&(!ngVal(ngApp.OnRun(),false))) {
    if(ngApp.State === ngaStateInitializing) ngApp.State = ngaStateTerminated;
    return;
  }
  ngApp.State = ngaStateRunning;

  if(typeof ngMain === 'function') ngMain();

  ngApp.SetOnParamsChanged = nga_SetOnParamsChanged;
  ngApp.SetOnParamsChanged(ngApp.OnParamsChanged);

  if(ngApp.OnRunFinished) ngApp.OnRunFinished();
  if(ngApp.OnRunInternalFinished) ngApp.OnRunInternalFinished();

  var o=document.getElementById('ngAppLoading');
  if(o) o.className='ngAppLoaded';

  ng_IE7RedrawFix(document.body);
}

function nga_DoRun()
{
  if(nga_RunTimer) clearTimeout(nga_RunTimer); nga_RunTimer=null;

  ngApp.State = ngaStateInitializing;

  // Language detection
  ngAddSupportedLang(ngVal(ngApp.StartParams.SupportedLangs, ''));
  ngc_SupportedLangsLocked = (ngApp.StartParams.SupportedLangsLocked === true);
  var li=ngApp.DetectLangEx();
  var lng=ngGetSupportedLang(li.Lang);
  if(lng!==li.Lang) {
    var undefined;
    ngApp.Lang=lng;
    ngApp.LangCountry=undefined;
    ngApp.LangVariant=undefined;
  }
  else {
    ngApp.Lang=li.Lang;
    ngApp.LangCountry=li.LangCountry;
    ngApp.LangVariant=li.LangVariant;
  }

  // Controls version check
  var reqver,reqsubver;
  if(typeof ngApp.StartParams.ReqControlsVer === 'undefined')
  {
    reqver=ngControlsVer;
    reqsubver=ngControlsSubVer;
  }
  else
  {
    reqver=parseInt(ngApp.StartParams.ReqControlsVer);
    reqsubver=parseInt(ngVal(ngApp.StartParams.ReqControlsSubVer,0));
  }
  if((reqver>ngControlsVer)||((reqver==ngControlsVer)&&(reqsubver>ngControlsSubVer)))
  {
    ngApp.State = ngaStateTerminated;

    var o=document.getElementById('ngAppLoading');
    if(o) o.style.display='none';

    alert(ng_htmlDecode(ng_sprintf(ngTxt('ngAppOldControlsVersion'),reqver,reqsubver,ngControlsVer,ngControlsSubVer)));
    return;
  }

  var ae=ngApp.Elm();
  if(ae) {
    var aw=ng_ClientWidth(ae);
    var ah=ng_ClientHeight(ae);

    ngApp.LastResizeW=aw;
    ngApp.LastResizeH=ah;

    if(typeof ngSetDevice === 'function')
    {
      if((typeof ngAppDeviceInfo !=='object')||(!ngAppDeviceInfo)) ngAppDeviceInfo={};
      ngAppDeviceInfo.AppWidth=aw;
      ngAppDeviceInfo.AppHeight=ah;
      ngSetDevice(ngDevice);
    }
  }

  ng_PreloadImagesBegin();
  ngControlImages=ng_URL(ngControlImages);
  ngInitUserControls();
  if(ngControlImages!='') ng_PreloadImage(ngControlImages);

  try{ window.focus(); } catch(e) { } // FF3 fix

  if(typeof ngInit === 'function') ngInit();
  ng_PreloadImagesEnd(nga_DoRunFinal);
}

function nga_BeginAsyncInit()
{
  ng_PreloadImagesBegin();
}

function nga_EndAsyncInit(callback)
{
  ng_PreloadImagesEnd(callback);
}

function nga_Run()
{
  nga_RunTimer=setTimeout(nga_DoRun,100);
}

function nga_SetTitle(t)
{
  if(ngVal(t,'')!='') { try { document.title=ngTxt(t,t); } catch(e) { } }
}

function nga_MessageBox(text,yesno)
{
  if(!ngVal(yesno,false)) alert(ng_htmlDecode(ngTxt(text,text)));
  else return confirm(ng_htmlDecode(ngTxt(text,text)));
}

function ng_SetBounds(o,props)
{
  var left=props.L;
  var top=props.T;
  var right=props.R;
  var bottom=props.B;
  var width=props.W;
  var height=props.H;

  if(typeof left === 'number')   left+='px';
  if(typeof right === 'number')  right+='px';
  if(typeof top === 'number')    top+='px';
  if(typeof bottom === 'number') bottom+='px';
  if(typeof width === 'number')  width =(width <=0 ? '0px' : width+'px');
  if(typeof height === 'number') height=(height<=0 ? '0px' : height+'px');

  if(typeof top !== 'undefined') o.style.top=top;
  else o.style.top='';
  if(typeof left !== 'undefined') o.style.left=left;
  else o.style.left='';

  if((typeof props.B !== 'undefined')||(typeof props.R !== 'undefined'))
  {
    if(ngIExplorer6)
    {
      var alignfix=ngVal(props.IE6AlignFix, ngIE6AlignFix);
      if((typeof props.B !== 'undefined')&&((alignfix)||(typeof props.T !== 'undefined')))
      {
        if((typeof props.T === 'undefined')||(typeof props.H === 'undefined'))
        {
          if(typeof props.T !== 'undefined') o.setAttribute('FT',props.T);
          else if(!ng_nullAttr(o.getAttribute('FT'))) o.setAttribute('FT','');
          if(typeof props.B !== 'undefined') o.setAttribute('FB',props.B);
          else if(!ng_nullAttr(o.getAttribute('FB'))) o.setAttribute('FB','');
        }
      }
      else
      {
        if(!ng_nullAttr(o.getAttribute('FT'))) o.setAttribute('FT','');
        if(!ng_nullAttr(o.getAttribute('FB'))) o.setAttribute('FB','');

        if(typeof bottom !== 'undefined') o.style.bottom=bottom;
        else o.style.bottom='';
      }

      if((typeof props.R !== 'undefined')&&((alignfix)||(typeof props.L !== 'undefined')))
      {
        if((typeof props.L === 'undefined')||(typeof props.W === 'undefined'))
        {
          if(typeof props.L !== 'undefined') o.setAttribute('FL',props.L);
          else if(!ng_nullAttr(o.getAttribute('FL'))) o.setAttribute('FL','');
          if(typeof props.R !== 'undefined') o.setAttribute('FR',props.R);
          else if(!ng_nullAttr(o.getAttribute('FR'))) o.setAttribute('FR','');
        }
      }
      else
      {
        if(!ng_nullAttr(o.getAttribute('FL'))) o.setAttribute('FL','');
        if(!ng_nullAttr(o.getAttribute('FR'))) o.setAttribute('FR','');

        if(typeof right !== 'undefined') o.style.right=right;
        else o.style.right='';
      }
    }
    else
    {
      if(typeof bottom !== 'undefined') o.style.bottom=bottom;
      else o.style.bottom='';
      if(typeof right !== 'undefined') o.style.right=right;
      else o.style.right='';
    }
  }
  else
  {
    if(!ng_nullAttr(o.getAttribute('FT'))) o.setAttribute('FT','');
    if(!ng_nullAttr(o.getAttribute('FB'))) o.setAttribute('FB','');
    if(!ng_nullAttr(o.getAttribute('FL'))) o.setAttribute('FL','');
    if(!ng_nullAttr(o.getAttribute('FR'))) o.setAttribute('FR','');
  }
  if(typeof width !== 'undefined') o.style.width=width;
  else o.style.width='';
  if(typeof height !== 'undefined') o.style.height=height;
  else o.style.height='';

  ng_SetAutoResize(o);
}

var ngAutoRSync=1;
var ngAutoResize=null;
var ngAutoResizeRefs=null;
var ngAutoResizeCnt=0;
var ngAutoResizeTimer=null;

function ng_StartAutoResize(o,ref)
{
  if(typeof o === 'string') o=document.getElementById(o);
  if((!o)||(o.id=='')) return;

  if(!ngAutoResize) ngAutoResize={};
  if(!ngAutoResizeRefs) ngAutoResizeRefs={};
  if(typeof ngAutoResize[o.id] === 'undefined')
  {
    ngAutoResizeCnt++;
    ngAutoResize[o.id]=ngAutoRSync;
  }
  var r=ngAutoResizeRefs[o.id];
  if(typeof r === 'undefined')
  {
    r={};
    ngAutoResizeRefs[o.id]=r;
  }
  r[ref]=true;
}

function ng_EndAutoResize(o,ref)
{
  if(typeof o === 'string') o=document.getElementById(o);
  if((!o)||(o.id=='')) return;

  if((ngAutoResize)&&(typeof ngAutoResize[o.id] !== 'undefined'))
  {
    var r=ngAutoResizeRefs[o.id];
    if(typeof r !== 'undefined') delete r[ref];
    var cnt=0;
    for(var i in r)
    {
      if(typeof r[i]!=='undefined') { cnt=1; break; }
    }
    if(!cnt)
    {
      ngAutoResizeCnt--;
      delete ngAutoResize[o.id];
      if(ngAutoResizeCnt<=0) { ngAutoResize=null; ngAutoResizeRefs=null; }
    }
  }
}

function ng_SetAutoResize(o)
{
  if(typeof o === 'string') o=document.getElementById(o);
  if((!o)||(o.id=='')) return;
  var r=o.getAttribute('FR');
  var b=o.getAttribute('FB');
  if((!ng_nullAttr(r))||(!ng_nullAttr(b))||((o.style.left!='')&&(o.style.right!=''))||((o.style.top!='')&&(o.style.bottom!='')))
  {
    ng_StartAutoResize(o,'bounds');
    ng_Align(o.id);
  }
  else
  {
    ng_EndAutoResize(o,'bounds');
  }
}

function nga_OnResize(e)
{
  if((typeof ngApp === 'undefined')||(!ngApp))
  {
    if(ngAutoResizeTimer) clearTimeout(ngAutoResizeTimer); ngAutoResizeTimer=null;
    if((ngAutoResize)&&(ngAutoResizeCnt>0)) ngAutoResizeTimer=setTimeout(nga_DoResize, 100);
    return;
  }
  var ae=ngApp.Elm();
  if(ae)
  {
    if(ngApp.MobileKeyboardTimer) {
      clearTimeout(ngApp.MobileKeyboardTimer);
      delete ngApp.MobileKeyboardTimer;
      switch(ngMobileKeyboardActive)
      {
        case 1:
          ngMobileKeyboardActive=3;
          var ai=document.activeElement;
          if(ai) {
            var ac=ngGetControlByElement(ai);
            if(ac) ai=ac.Elm();
          }
          if((ai)&&(ai.scrollIntoView)) {
            var pp=ng_ParentPosition(ai);
            if((pp.y<0)||((pp.y+ng_OuterHeight(ai))>ng_WindowHeight())) ai.scrollIntoView();
          }
          break;
        case 2: nge_FinishMobileKeyboard(); break;
      }
    }

    var aw=ng_ClientWidth(ae);
    var ah=ng_ClientHeight(ae);
    if((aw===ngApp.LastResizeW)&&(ah===ngApp.LastResizeH)) return;

    if(typeof ngDetectDevice === 'function')
    {
      if((typeof ngAppDeviceInfo !=='object')||(!ngAppDeviceInfo)) ngAppDeviceInfo={};
      ngAppDeviceInfo.AppWidth=aw;
      ngAppDeviceInfo.AppHeight=ah;
    }
    ngApp.LastResizeW=aw;
    ngApp.LastResizeH=ah;
  }

  ngc_HidePopups();

  if(ngAutoResizeTimer) clearTimeout(ngAutoResizeTimer); ngAutoResizeTimer=null;
  if((ngApp.OnDeviceChanged)||((ngAutoResize)&&(ngAutoResizeCnt>0))) ngAutoResizeTimer=setTimeout(nga_DoResize, 100);
}

function nga_DoResizeElement(id)
{
  var o=document.getElementById(id);
  if((!o)||(ngAutoResize[id]==ngAutoRSync)) return;

  var pobjs=new Array();
  var p=o.parentNode;
  while(p)
  {
    if(ngAutoResize[p.id]) pobjs[pobjs.length]=p.id;
    p=p.parentNode;
  }

  for(var i=pobjs.length-1;i>=0;i--)
    nga_DoResizeElement(pobjs[i]);

  var c=ngGetControlById(id);
  if(!c)
  {
    var r=ng_Align(o);
    ngAutoResize[id]=ngAutoRSync;
    return;
  }
  var po=c.ParentControl;
  while(po)
  {
    if(typeof ngAutoResize[po.ID] !== 'undefined') return;
    po=po.ParentControl;
  }
  nga_DoResizeControl(c,true);
}

function nga_DoResizeControl(c,doupdate)
{
  var update=false;
  if(typeof ngAutoResize[c.ID] !== 'undefined')
  {
    if(doupdate)
    {
      var r=c.Align(c.ID);
      if(((r&4)||(r&8))&&(c.Update)) { update=true; doupdate=false; }
    }
    ngAutoResize[c.ID]=ngAutoRSync;
  }
  if((typeof c.ChildControls !== 'undefined')&&(c.ChildControls.length>0))
  {
    for(var i=0;i<c.ChildControls.length;i++)
      nga_DoResizeControl(c.ChildControls[i],doupdate);
  }
  if(update) c.Update();
}

function nga_DoResize()
{
  if(ngAutoResizeTimer) clearTimeout(ngAutoResizeTimer); ngAutoResizeTimer=null;
  if((ngApp.OnDeviceChanged)&&(typeof ngDetectDevice === 'function'))
  {
    var dinfo={};
    var device = ngDetectDevice(dinfo);
    if((ngDevice!=device)||(!ng_VarEquals(dinfo.DeviceProfile,ngDeviceProfile)))
    {
      if(ngVal(ngApp.OnDeviceChanged(device,dinfo),false)) {
        ngSetDevice(dinfo.Device,dinfo);
      }
    }
  }
  if((!ngAutoResize)||(ngAutoResizeCnt<=0)) return;

  ngAutoRSync++;
  for(var i in ngAutoResize)
    nga_DoResizeElement(i);
}

function nga_GetRPC()
{
  if(!this.RPC) this.RPC=new ngRPC('ngApp');
  return this.RPC;
}

function nga_sendRPCRequest(url,nocache)
{
  var lngmodified=false,devmodified=false,dbgmodified=false;
  if(typeof this.Params === 'object')
  {
    if((typeof ngDevice !== 'undefined')&&(typeof this.Params.appdevice === 'undefined')) {
      this.Params.appdevice=ngDevice;
      devmodified=true;
    }

    if((typeof this.Params.lang === 'undefined')&&(typeof ngApp === 'object')) {
      this.Params.lang=ngMakeLangId(ngApp.Lang,ngApp.LangCountry,ngApp.LangVariant);
      lngmodified=true;
    }

    if((ngHASDEBUG())&&(typeof this.Params.appdebug === 'undefined')) {
      this.Params.appdebug=ngDEBUG;
      dbgmodified=true;
    }
  }
  var ret=this.sendRequestDefault(url, nocache);
  if(lngmodified) delete this.Params.lang;
  if(devmodified) delete this.Params.appdevice;
  if(dbgmodified) delete this.Params.appdebug;

  return ret;
}

function nga_AddRPCLang(rpc)
{
  rpc.sendRequestDefault = rpc.sendRequest;
  rpc.sendRequest = nga_sendRPCRequest;
  return true;
}


function nga_BuildURLParams(url, type)
{
  var hash='';
  var v,client,t,pi;
  if(typeof this.ParamInfo !== 'undefined')
  {
    for(var i in this.ParamInfo)
    {
      pi = this.ParamInfo[i];
      if((typeof pi === 'undefined')||(!pi)) continue;

      t=ngVal(pi.Type, APPPARAM_URL);
      if(!(t & type)) continue;

      v=this.Param(i);
      if(!ngVal(pi.Persist,false)) continue;

      client=t & APPPARAM_CLIENT;
      if(typeof pi.Encode === 'function')
      {
        if((typeof v==='undefined')||(typeof v==='function')) continue;
        v=pi.Encode(i)+'='+pi.Encode(v);
      }
      else
      {
        if(this.OnEncodeParam) v=this.OnEncodeParam(this, i, v);
        else
        {
          if((typeof v==='undefined')||(typeof v==='function')) continue;

          if(client) v=ng_HashEncode(i)+'='+ng_HashEncode(v);
          else       v=ng_URLEncode(i)+'='+ng_URLEncode(v);
        }
      }

      if((typeof v==='undefined')||(typeof v==='function')) continue;
      if(client)
      {
        if(hash!='') hash+='@';
        hash+=v;
      }
      else url=ng_AddURLParam(url,v)
    }
  }
  if(hash!='')
  {
    if(url.indexOf('#')!=-1) url=url+'@';
    else url=url+'#';
    url=url+hash;
  }
  return url;
}

function nga_CallURL(url)
{
  url=this.BuildURLParams(url,APPPARAM_CLIENT | APPPARAM_URL);
  if(this.OnCallURL) url=this.OnCallURL(this, url);
  return url;
}

function nga_Call(url)
{
  url=this.CallURL(url);
  if(this.OnCall) url=this.OnCall(this, url);
  if(url=='') return;
  ng_Redirect(url,false);
}

function nga_CallServerURL(url)
{
  url=this.BuildURLParams(url,APPPARAM_SERVER);
  if(this.OnCallServerURL) url=this.OnCallServerURL(this, url);
  return url;
}

function nga_CallServer(url, nocache)
{
  this.CallServerEx(url,undefined,nocache);
}

function nga_CallServerEx(url, params, nocache)
{
  url=this.CallServerURL(url);
  if(this.OnServerCall) url=this.OnServerCall(this, url, nocache, params);
  if(url=='') return;
  var rpc=this.GetRPC();
  var oldparams=rpc.Params;
  if(typeof params!=='undefined') rpc.Params=params;
  rpc.sendRequest(url, nocache);
  rpc.Params=oldparams;
}

function nga_Param(p)
{
  if(!this.params_parsed)
  {
    this.params_parsed=true;
    this.ParseParams();
  }
  var v=ng_GET(p);
  if(this.OnGetParam) v=this.OnGetParam(this,p,v);
  return v;
}

function nga_SetParam(p, v, type)
{
  if(!this.params_parsed)
  {
    this.params_parsed=true;
    this.ParseParams();
  }
  if(typeof p === 'object')
  {
    this.BeginUpdateParams();
    for(var i in p) this.SetParam(i,p[i],type);
    this.EndUpdateParams();
    return;
  }
  if(p=='') return;

  this.BeginUpdateParams();
  if(this.OnSetParam) v=this.OnSetParam(this,p,v,type);
  var changed=false;

  if(v === null){v = undefined;}
  if(ngURLParams[p] != v) changed=true;
  ngURLParams[p] = v;
  if(typeof v === 'undefined')
  {
    if(typeof this.ParamInfo !== 'undefined')
    {
      var pi = this.ParamInfo[p];
      if(typeof pi !=='undefined' && (pi.Type & APPPARAM_CLIENT)&&(changed)) this.params_changed=true;
    }
  }
  else
  {
    if(typeof type !== 'undefined')
    {
      if(typeof this.ParamInfo === 'undefined') this.ParamInfo={};
      var pi = this.ParamInfo[p];
      if(typeof pi === 'undefined') { pi=new Object; this.ParamInfo[p] = pi; }
      pi.Type=type;
      if((pi.Type & APPPARAM_CLIENT)&&(changed)) this.params_changed=true;
    }
  }
  this.EndUpdateParams();
}

function nga_SetParamEncodingFnc(param, encodefnc, decodefnc)
{
  if(typeof this.ParamInfo === 'undefined') this.ParamInfo={};
  var pi = this.ParamInfo[param];
  if(typeof pi === 'undefined') { pi=new Object; this.ParamInfo[param] = pi; }
  pi.Encode=encodefnc;
  pi.Decode=decodefnc;
}

function nga_SetClientParam(p, v)
{
  this.SetParam(p,v,APPPARAM_CLIENT);
}

function nga_SetURLParam(p, v)
{
  this.SetParam(p,v,APPPARAM_URL);
}

function nga_SetServerParam(p,v)
{
  this.SetParam(p,v,APPPARAM_SERVER);
}

function nga_ParamType(p)
{
  if(!this.params_parsed)
  {
    this.params_parsed=true;
    this.ParseParams();
  }
  if(typeof this.ParamInfo === 'undefined') return undefined;
  var pi = this.ParamInfo[p];
  if((typeof pi === 'undefined')||(!pi)) return undefined;
  return ngVal(pi.Type,APPPARAM_URL);
}

function nga_PersistParam(p, v)
{
  if(typeof p === 'object')
  {
    for(var i=0;i<p.length;i++)
      this.PersistParam(p[i],v);
    return;
  }
  if(p=='') return;
  v=ngVal(v,true);

  if(typeof this.ParamInfo === 'undefined')
  {
    if(v) this.ParamInfo = {};
    else return;
  }
  var pi = this.ParamInfo[p];
  if((typeof pi === 'undefined')||(!pi))
  {
    if(v) { pi=new Object; this.ParamInfo[p] = pi; }
    else return;
  }
  pi.Persist = v;
}

function nga_SetParamType(p, type)
{
  type=ngVal(type,APPPARAM_URL);
  if(typeof p === 'object')
  {
    for(var i=0;i<p.length;i++)
      this.SetParamType(p[i],type);
    return;
  }
  if(p=='') return;

  if(!this.params_parsed)
  {
    this.params_parsed=true;
    this.ParseParams();
  }
  if(typeof this.ParamInfo === 'undefined') this.ParamInfo = {};
  var pi = this.ParamInfo[p];
  if((typeof pi === 'undefined')||(!pi)) { pi=new Object; this.ParamInfo[p] = pi; }
  pi.Type = type;
}

function nga_BeginUpdateParams()
{
  this.params_update_cnt++;
}

function nga_EndUpdateParams()
{
  this.params_update_cnt--;
  if(this.params_update_cnt<=0)
  {
    if(this.params_changed) this.UpdateParams();
    this.params_update_cnt = 0;
  }
}

function nga_ParseParams2(url, septag)
{
  var obj={};
  if(url=='') return obj;
  var vars = url.split(septag);
  var s;
  for(var i=0;i<vars.length;i++)
  {
    s=vars[i].split('=');
    if(s[0].substr(0,4)=='amp;') s[0]=s[0].substr(4);
    obj[ ng_unescape(s[0]) ] = (s.length>1 ? s[1] : null);
  }
  return obj;
}

function nga_ParseParams(url)
{
  ngURLParams = {};
  var url=ngVal(url,window.location.href);
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
  var urlparams=nga_ParseParams2(url1,'&');
  for(var i in urlparams)
    ngURLParams[i]=urlparams[i];

  var clientparams=nga_ParseParams2(url2,'@');
  for(var i in clientparams)
    ngURLParams[i]=clientparams[i];

  var pi,v;
  if(typeof this.ParamInfo === 'undefined') this.ParamInfo = {};
  for(var i in urlparams)
  {
    pi = this.ParamInfo[i];
    if(typeof pi === 'undefined')
    {
      pi=new Object;
      this.ParamInfo[i]=pi;
    }
    pi.Type=APPPARAM_URL;

    v=urlparams[i];
    if(typeof pi.Decode === 'function')
    {
      if((typeof v==='undefined')||(typeof v==='function')) continue;
      v=pi.Decode(v);
    }
    else
    {
      if(this.OnDecodeParam) v=this.OnDecodeParam(this, i, v);
      else
      {
        if((typeof v==='undefined')||(typeof v==='function')) continue;
        v=ng_unescape(v);
      }
    }
    if((typeof v==='undefined')||(typeof v==='function')) continue;
    ngURLParams[i]=v;
  }

  for(var i in clientparams)
  {
    pi = this.ParamInfo[i];
    if(typeof pi === 'undefined')
    {
      pi=new Object;
      this.ParamInfo[i]=pi;
    }
    pi.Type=APPPARAM_CLIENT;

    v=clientparams[i];
    if(typeof pi.Decode === 'function')
    {
      if((typeof v==='undefined')||(typeof v==='function')) continue;
      v=pi.Decode(v);
    }
    else
    {
      if(this.OnDecodeParam) v=this.OnDecodeParam(this, i, v);
      else
      {
        if((typeof v==='undefined')||(typeof v==='function')) continue;
        v=ng_unescape(v);
      }
    }
    if((typeof v==='undefined')||(typeof v==='function')) continue;
    ngURLParams[i]=v;
  }

  ngURLParamsParsed=true;
  this.LocationHash = window.location.hash;
}

function nga_UpdateParams()
{
  this.params_changed=false;
  if(typeof this.ParamInfo === 'undefined') return;

  var params='';
  var pi,v;
  for(var i in this.ParamInfo)
  {
    pi = this.ParamInfo[i];
    if((typeof pi === 'undefined')||(!pi)) continue;
    if(!(ngVal(pi.Type,APPPARAM_URL)&APPPARAM_CLIENT)) continue;
    v=this.Param(i);
    if(!ngVal(pi.Persist,false))
    {
      delete this.ParamInfo[i];
      delete ngURLParams[i];
      continue;
    }
    if(typeof pi.Encode === 'function')
    {
      if((typeof v === 'undefined')||(typeof v === 'function')) continue;
      v=pi.Encode(i)+'='+pi.Encode(v);
    }
    else
    {
      if(this.OnEncodeParam) v=this.OnEncodeParam(this, i, v);
      else
      {
        if((typeof v === 'undefined')||(typeof v === 'function')) continue;
        v=ng_HashEncode(i)+'='+ng_HashEncode(v);
      }
    }
    if((typeof v === 'undefined')||(typeof v === 'function')) continue;
    if(params!='') params+='@';
    params+=v;
  }
  if((params!='')||(window.location.hash!='')) params='#'+params;

  if(window.location.hash!=params)
  {
    try
    {
      window.location.hash=params;
    }
    catch(e)
    {
    }
    this.LocationHash = window.location.hash;
    var o=document.getElementById('ngAppHistFix');
    if((o)&&(ngIExplorer&&ngIExplorerVersion<9)) nga_WriteIFRAMEHistory(o,params);
    nga_CheckParamChange();
  }
}

function nga_WriteIFRAMEHistory(elm, hash)
{
  if(ngWinStoreApp) return;

  var doc=(elm.contentDocument ? elm.contentDocument : elm.contentWindow.document);
  if(doc)
  {
    doc.open();
    if(doc.domain!=document.domain) doc.domain=document.domain; //IE8 and older changes domain back after open, must set again
    doc.write('<html><body onload="if(parent) { if(parent.window.location.hash!=\''+hash+'\') { parent.window.location.hash=\''+hash+'\'; parent.nga_CheckParamChange(); } }"></body></html>');
    doc.close();
  }
}

var nga_CheckParamChangeMode;

function nga_CheckParamChange()
{
  if(typeof nga_CheckParamChangeMode==='undefined')
  {
    nga_CheckParamChangeMode=0; // timer
    if(('onhashchange' in window)&&((!ngIExplorer)||(ngIExplorerVersion>7))) // supported from IE8
    {
      window.onhashchange = ngAddEvent(window.onhashchange,nga_CheckParamChange);
      nga_CheckParamChangeMode=1; // event
    }
  }
  if((typeof ngApp !== 'object') || (!ngApp)) return;
  if(ngApp.url_history_timer) clearTimeout(ngApp.url_history_timer); ngApp.url_history_timer=null;
  try
  {
    if(ngApp.LocationHash!=window.location.hash)
    {
      ngApp.DoParamsChanged();
    }
    if(!nga_CheckParamChangeMode)
      ngApp.url_history_timer=setTimeout('nga_CheckParamChange()',300);
  }
  catch(e)
  {
  }
}

function nga_DoParamsChanged()
{
  this.ParseParams();
  if(this.OnInternalParamsChanged) this.OnInternalParamsChanged(this);
  if(this.OnParamsChanged) this.OnParamsChanged(this);
}

function nga_SetOnParamsChanged2(fnc)
{
  this.OnParamsChanged=fnc;
}

function nga_InitParamsChanged()
{
  var o=document.getElementById('ngAppHistFix');
  if(!o)
  {
    if(ngIExplorer&&ngIExplorerVersion<9) // IE history fix
    {
      o = document.createElement("iframe");
      o.src = "javascript:void((function(){document.open();if(document.domain!=\'"+document.domain+"\') document.domain=\'"+document.domain+"\';document.close();"+
      "if(typeof parent.nga_WriteIFRAMEHistory==\"function\")parent.nga_WriteIFRAMEHistory(parent.document.getElementById('ngAppHistFix'),parent.ngApp.LocationHash);})())";
    }
    if(ngOpera) // Opera history fix
    {
      o=document.createElement("img");
      o.src="javascript:location.href='javascript:nga_CheckParamChange();';";
    }
    if(o)
    {
      var parent=(typeof ngApp === 'object' && ngApp ? ngApp.Elm() : document.body);

      o.id="ngAppHistFix";
      o.style.visibility="hidden";
      o.style.position="absolute";
      o.style.left="0px";
      o.style.top="0px";
      o.style.width="0px";
      o.style.height="0px";
      parent.appendChild(o);
    }
    nga_CheckParamChange();
  }
}

function nga_SetOnParamsChanged(fnc)
{
  this.OnParamsChanged=fnc;
  if(typeof fnc === 'function') nga_InitParamsChanged();
}

function nga_FloatVersion(strver)
{
  strver = strver.replace(/[^0-9.]/g, '');
  return parseFloat(strver);
}

function nga_RegisterAPI(id, api, version, owner)
{
  if(ngVal(id,'')=='') return false;
  if(typeof api !== 'object') return false;
  api.StrVersion=ngVal(version,ngVal(api.StrVersion,ngVal(''+api.Version,'1.0')));
  api.Version=nga_FloatVersion(api.StrVersion);

  if(typeof owner==='undefined')
  {
    if((typeof ngCurModule !== 'undefined')&&(ngCurModule)) owner=ngCurModule;
    else owner=this;
  }
  if(typeof api.Owner==='undefined') api.Owner=owner;

  var apidock=this.APIs[id];
  if(typeof apidock==='undefined')
  {
    apidock=new Object;
    apidock.ID=id;
    apidock.Versions={};
    this.APIs[id]=apidock;
  }
  var lapi,i;
  for(i=0;i<apidock.Versions.length;i++)
  {
    lapi=apidock.Versions[i];
    if(lapi.Version==api.Version)
    {
      if(lapi.Owner==api.Owner) // already exists
        return false;
      break;
    }
    if(lapi.Version<api.Version) break;
  }
  if(typeof api.AddEvent === 'undefined' )    api.AddEvent    = ngObjAddEvent;
  if(typeof api.RemoveEvent === 'undefined' ) api.RemoveEvent = ngObjRemoveEvent;

  apidock.Versions.splice(i,0,api);
  return true;
}

function nga_UnregisterAPI(id, owner, version)
{
  if(ngVal(id,'')=='') return false;
  var apidock=this.APIs[id];
  if(typeof apidock==='undefined') return false;

  version=ngVal(version,'');

  if((typeof owner==='undefined')&&(version=='')) // delete all
  {
    delete this.APIs[id];
    return true;
  }

  var ver=(version!='' ? nga_FloatVersion(version) : 0);

  var api,i,ret=false;
  for(var i=apidock.Versions.length-1;i>=0;i--)
  {
    api=apidock.Versions[i];
    if(((typeof owner!=='undefined')&&(api.Owner==owner))
    ||((version!='')&&(api.Version==ver)))
    {
      ret=true;
      apidock.Versions.splice(i,1);
    }
  }
  if(!apidock.Versions.length) delete this.APIs[id];
  return ret;
}

function nga_GetAPIAll(id, minreqversion, maxreqversion)
{
  var found=new Array();
  var apidock=this.APIs[id];
  if(typeof apidock==='undefined') return found; // API not exists
  var apis=apidock.Versions;

  if(!apis.length) return found; // no APIs versions

  minreqversion=ngVal(minreqversion,'');
  maxreqversion=ngVal(maxreqversion,'');

  var j,api=null;
  var minreqver=(minreqversion!='' ? nga_FloatVersion(minreqversion) : 0);
  var maxreqver=(maxreqversion!='' ? nga_FloatVersion(maxreqversion) : 0);
  var owners=new Array();
  for(var i=0;i<apis.length;i++)
  {
    api=apis[i];
    if((maxreqversion!='')&&(api.Version>maxreqver)) continue;
    if((minreqversion!='')&&(api.Version<minreqver)) // not found
      break;
    for(j=owners.length-1;j>=0;j--)
      if(owners[j]==api.Owner) break;
    if(j>=0) continue; // owner already used
    found[found.length]=api;
    owners[owners.length]=api.Owner;
  }
  return found;
}

function nga_GetAPIAllByStrVersion(id, strver)
{
  var found=new Array();
  var apidock=this.APIs[id];
  if(typeof apidock==='undefined') return found; // API not exists

  var j,api,apis=apidock.Versions;
  var owners=new Array();
  for(var i=0;i<apis.length;i++)
  {
    api=apis[i];
    if(api.StrVersion!=strver) continue;

    for(j=owners.length-1;j>=0;j--)
      if(owners[j]==api.Owner) break;
    if(j>=0) continue; // owner already used
    found[found.length]=api;
    owners[owners.length]=api.Owner;
  }
  return found;
}

function nga_GetAPI(id, minreqversion, maxreqversion)
{
  var apidock=this.APIs[id];
  if(typeof apidock==='undefined') return null; // API not exists
  var apis=apidock.Versions;

  if(!apis.length) return null; // no APIs versions

  minreqversion=ngVal(minreqversion,'');
  maxreqversion=ngVal(maxreqversion,'');

  if((minreqversion=='')&&(maxreqversion=='')) // take top most version
    return apis[0];

  var api=null;
  var minreqver=(minreqversion!='' ? nga_FloatVersion(minreqversion) : 0);
  var maxreqver=(maxreqversion!='' ? nga_FloatVersion(maxreqversion) : 0);
  for(var i=0;i<apis.length;i++)
  {
    api=apis[i];
    if((maxreqversion!='')&&(api.Version>maxreqver)) continue;
    if((minreqversion!='')&&(api.Version<minreqver)) // not found
      return null;
    break;
  }
  return api;
}

function nga_GetAPIByStrVersion(id, strver)
{
  var apidock=this.APIs[id];
  if(typeof apidock==='undefined') return null; // API not exists

  var apis=apidock.Versions;
  for(var i=0;i<apis.length;i++)
    if(apis[i].StrVersion==strver) return apis[i];
  return null;
}

function nga_ProcessInvokeLater()
{
  if(!ngApp) return;
  clearTimeout(ngApp.invokelater_timer);
  ngApp.invokelater_timer=null;

  if(ngApp.invokelater_events.length>0)
  {
    var fnc=ngApp.invokelater_events[0];
    ngApp.invokelater_events.splice(0,1);
    if(typeof fnc==='function') fnc();
    if(ngApp.invokelater_events.length>0)
      ngApp.invokelater_timer=setTimeout(nga_ProcessInvokeLater,1);
  }
}

function nga_InvokeLater(fnc)
{
  if(typeof fnc!=='function') return;

  if(!this.invokelater_timer)
    this.invokelater_timer=setTimeout(nga_ProcessInvokeLater,1);
  this.invokelater_events.push(fnc);
}

/**
 *  Class: ngApplication
 *  This class encapsulates web application.
 *
 *  Syntax:
 *    new *ngApplication* ([object startparams = { }, string elm = 'ngApp', bool autorun=true])
 *
 *  Parameters:
 *    startparams - application startup parameters
 *    elm - application container DIV id
 *    autorun - run application after object creation
 */
function ngApplication(startparams, elm, autorun)
{
  ngApp=this;

  // Set path if running as part of Controls.js library
  var cjs=(typeof ngLib==='object' && ngLib ? ngLib['controls.js'] : null);
  if((typeof cjs==='object')&&(cjs)) {
    var l={ path: cjs.path+(ngDEBUG ? 'debug' : 'release')+'/libs/ng_controls/' };
    if(typeof cjs.URL!=='undefined') l.URL=cjs.URL;
    ngLib['ng_controls']=l;
  }

  if(typeof startparams !== 'undefined') this.StartParams=startparams;
  else this.StartParams=new Object;

  if(ngIExplorer6) // fix background image cache in IE6
  {
    try {
      document.execCommand("BackgroundImageCache", false, true);
    } catch(e) {}
  }

  /*
   *  Group: Properties
   */
  /*  Variable: AppPath
   *  ...
   *  Type: string
   */
  this.AppPath='';
  try
  {
    var path=ng_StripURLParams(''+window.location.href);
    if((path.length>0)&&(path.charAt(path.length-1)==='/')) this.AppPath=path;
    {
      var i=path.lastIndexOf('/'); // strip script name
      if(i>0)
      {
        if(path.charAt(i-1)=='/') path+='/';
        else path=path.substring(0,i+1);
        this.AppPath=path;
      }
    }
  }
  catch(e)
  {
  }

  /*  Variable: Lang
   *  ...
   *  Type: string
   */
  this.Lang='';

  /*  Variable: LangCountry
   *  ...
   *  Type: string
   */
  this.LangCountry='';

  /*  Variable: LangVariant
   *  ...
   *  Type: string
   */
  this.LangVariant='';

  /*  Variable: ElmID
   *  ...
   *  Type: string
   */
  if(typeof elm==='object') elm=elm.id;
  this.ElmID = ngVal(elm,'ngApp');

  /*  Variable: TopElmID
   *  ...
   *  Type: string
   *  Default value: null
   */
  this.TopElmID = null;

  /*  Variable: StartParams
   *  ...
   *  Type: object
   */
  //this.StartParams=new Object;
  /*  Variable: LocationHash
   *  ...
   *  Type: string
   */
  this.LocationHash = '';
  try
  {
    this.LocationHash = window.location.hash;
  }
  catch(e)
  {
  }

  /*  Variable: State
   *  ...
   *  Type: integer
   */
  this.State = ngaStateStopped;

  /*  Variable: MobileKeyboardFix
   *  ...
   *  Type: bool
   */
  this.MobileKeyboardFix=true;

  /*
   *  Group: Methods
   */
  /*  Function: GetLang
   *  Gets existing application language.
   *
   *  Syntax:
   *    string *GetLang* ()
   *
   *  Returns:
   *    -
   */
  this.GetLang=nga_GetLang;

  /*  Function: SetLang
   *  Sets application language, language country and language variant.
   *
   *  Syntax:
   *    bool *SetLang* (string language [, string country, string variant])
   *
   *  Returns:
   *    TRUE if application language properties was changed.
   */
  this.SetLang=nga_SetLang;
  /*  Function: SetLangById
   *  Sets application language properties by language identifier.
   *
   *  Syntax:
   *    bool *SetLangById* (string langid)
   *
   *  Returns:
   *    TRUE if application language properties was changed.
   */
  this.SetLangById=nga_SetLangById;

  /*  Function: DetectLang
   *  Detects language.
   *
   *  Syntax:
   *    string *DetectLang* ([string defaultlang])
   *
   *  Returns:
   *    Detected language.
   */
  this.DetectLang=nga_DetectLang;
  /*  Function: DetectLangEx
   *  Detects language, language country and language variant.
   *
   *  Syntax:
   *    object *DetectLangEx* ([string defaultlang])
   *
   *  Returns:
   *    Detected language properties.
   */
  this.DetectLangEx=nga_DetectLangEx;
  /*  Function: Text
   *  Gets resource string by application language.
   *
   *  Syntax:
   *    string *Text* (string restext, string defval)
   *
   *  Returns:
   *    -
   */
  this.Text=nga_Text;
  /*  Function: Resource
   *  Gets resource by application language.
   *
   *  Syntax:
   *    object *Resource* (string resid)
   *
   *  Returns:
   *    -
   */
  this.Resource=nga_Resource;

  /*  Function: BeginAsyncInit
   *  Signal asynchronous initialization is in process.
   *
   *  Syntax:
   *    void *BeginAsyncInit* ()
   *
   *  Returns:
   *    -
   */
  this.BeginAsyncInit=nga_BeginAsyncInit;
  /*  Function: EndAsyncInit
   *  Signal asynchronous initialization is finished.
   *
   *  Syntax:
   *    void *EndAsyncInit* ([function callback=null])
   *
   *  Parameters:
   *    callback - callback function called after all asynchronous initialization
   *    processes are finished
   *
   *  Returns:
   *    -
   */
  this.EndAsyncInit=nga_EndAsyncInit;
  /*  Function: Run
   *  Executes the application.
   *
   *  Syntax:
   *    void *Run* ()
   *
   *  Returns:
   *    -
   */
  this.Run=nga_Run;
  /*  Function: SetTitle
   *  Sets application title.
   *
   *  Syntax:
   *    void *SetTitle* (string restext)
   *
   *  Returns:
   *    -
   */
  this.SetTitle=nga_SetTitle;
  /*  Function: MessageBox
   *  Displays a message to user.
   *
   *  Syntax:
   *    bool *MessageBox* (string restext [, bool yesno=false])
   *
   *  Returns:
   *    -
   */
  this.MessageBox=nga_MessageBox;
  /*  Function: Alert
   *  Displays a message to user.
   *
   *  Syntax:
   *    void *Alert* (string restext)
   *
   *  Returns:
   *    -
   */
  this.Alert=nga_MessageBox;
  /*  Function: Confirm
   *  Displays a message with Yes or No buttons to user.
   *
   *  Syntax:
   *    bool *Confirm* (string restext)
   *
   *  Returns:
   *    -
   */
  this.Confirm=function(t) { return this.MessageBox(t,true); }

  this.params_parsed = false;

  /*  Function: Param
   *  Gets application input parameter (from URL).
   *
   *  Syntax:
   *    string *Param* (string paramname)
   *
   *  Returns:
   *    -
   */
  this.Param = nga_Param;

  /*  Function: SetParam
   *  Sets application parameter value (and optionaly its type).
   *
   *  Syntax:
   *    void *SetParam* (mixed param, string value[, int type])
   *
   *  Returns:
   *    -
   */
  this.SetParam = nga_SetParam;
  /*  Function: SetClientParam
   *  Sets application client parameter value.
   *
   *  Syntax:
   *    void *SetClientParam* (mixed param, string value)
   *
   *  Returns:
   *    -
   */
  this.SetClientParam = nga_SetClientParam;
  /*  Function: SetURLParam
   *  Sets application URL parameter value.
   *
   *  Syntax:
   *    void *SetURLParam* (mixed param, string value)
   *
   *  Returns:
   *    -
   */
  this.SetURLParam = nga_SetURLParam;
  /*  Function: SetServerParam
   *  Sets application server parameter value.
   *
   *  Syntax:
   *    void *SetServerParam* (mixed param, string value)
   *
   *  Returns:
   *    -
   */
  this.SetServerParam = nga_SetServerParam;

  /*  Function: ParamType
   *  Gets application parameter type.
   *
   *  Syntax:
   *    enum *ParamType* (string paramname)
   *
   *  Constants:
   *    APPPARAM_SERVER - ...
   *    APPPARAM_CLIENT - ...
   *    APPPARAM_URL - ...
   *
   *  Returns:
   *    -
   */
  this.ParamType = nga_ParamType;
  /*  Function: SetParamType
   *  Sets application parameter type.
   *
   *  Syntax:
   *    void *SetParamType* (mixed param, enum paramtype)
   *
   *  Returns:
   *    -
   */
  this.SetParamType=nga_SetParamType;

  /*  Function: SetParamEncodingFnc
   *  Sets application parameter encoding and decoding functions.
   *
   *  Syntax:
   *    void *SetParamEncodingFnc* (string paramname, function encodefnc, function decodefnc)
   *
   *  Returns:
   *    -
   */
  this.SetParamEncodingFnc = nga_SetParamEncodingFnc;

  /*  Function: PersistParam
   *  Sets application parameter persistence.
   *
   *  Syntax:
   *    void *PersistParam* (mixed param [, bool persistent=true])
   *
   *  Returns:
   *    -
   */
  this.PersistParam = nga_PersistParam;

  /*  Function: ParseParams
   *  Parse application parameters from browser's or given URL.
   *
   *  Syntax:
   *    void *ParseParams* ([string url])
   *
   *  Returns:
   *    -
   */
  this.ParseParams = nga_ParseParams;
  /*  Function: UpdateParams
   *  Update application client parameters.
   *
   *  Syntax:
   *    void *UpdateParams* ()
   *
   *  Returns:
   *    -
   */
  this.UpdateParams = nga_UpdateParams;
  this.DoParamsChanged = nga_DoParamsChanged;

  this.params_changed = false;
  this.params_update_cnt = 0;
  /*  Function: BeginUpdateParams
   *  Prevents the updating of application client parameters until the <EndUpdateParams> method is called.
   *
   *  Syntax:
   *    void *BeginUpdateParams* ()
   *
   *  Returns:
   *    -
   */
  this.BeginUpdateParams = nga_BeginUpdateParams;
  /*  Function: EndUpdateParams
   *  Performs application client parameters update deferred by a call to <BeginUpdateParams>.
   *
   *  Syntax:
   *    void *EndUpdateParams* ()
   *
   *  Returns:
   *    -
   */
  this.EndUpdateParams = nga_EndUpdateParams;

  this.url_history_timer=null;
  this.invokelater_events = new Array();

  /*  Function: InvokeLater
   *  Invokes event after all remaining JavaScript code is executed
   *  and flow is returned back to browser.
   *
   *  Syntax:
   *    void *InvokeLater* (function event)
   *
   *  Parameters:
   *    event - event to be called
   *
   *  Returns:
   *    -
   */
  this.InvokeLater=nga_InvokeLater;

  this.BuildURLParams = nga_BuildURLParams;
  this.CallURL = nga_CallURL;

  /*  Function: Call
   *  Call application on another URL.
   *
   *  Syntax:
   *    void *Call* (string url)
   *
   *  Returns:
   *    -
   */
  this.Call=nga_Call;

  this.RPC=null;
  this.CallServerURL = nga_CallServerURL;

  ngOnRPCCreated=ngAddEvent(ngOnRPCCreated, nga_AddRPCLang);

  /*  Function: CallServer
   *  Call server on specified URL.
   *
   *  Syntax:
   *    void *CallServer* (string url, bool nocache)
   *
   *  Returns:
   *    -
   */
  this.CallServer=nga_CallServer;
  /*  Function: CallServerEx
   *  Call server on specified URL with parameters.
   *
   *  Syntax:
   *    void *CallServerEx* (string url, object parameters, bool nocache)
   *
   *  Returns:
   *    -
   */
  this.CallServerEx=nga_CallServerEx;
  this.GetRPC=nga_GetRPC;

  /*  Function: Elm
   *  Gets access to application container DIV element object.
   *
   *  Syntax:
   *    object *Elm* ()
   *
   *  Returns:
   *    Element object.
   *
   *  See also:
   *    <ElmID>
   */
  this.Elm = nga_Elm;

  /*  Function: TopElm
   *  Gets access to application's top DIV element object.
   *  Used for popups, menus, ...
   *
   *  Syntax:
   *    object *TopElm* ()
   *
   *  Returns:
   *    Element object.
   *
   *  See also:
   *    <TopElmID>
   */
  this.TopElm = nga_TopElm;

  this.AddEvent = ngObjAddEvent;
  this.RemoveEvent = ngObjRemoveEvent;
  this.SetOnParamsChanged = nga_SetOnParamsChanged2;

  this.APIs = new Object;

  /*  Function: RegisterAPI
   *  Registers new application API.
   *
   *  Syntax:
   *    bool *RegisterAPI* (string id, object api, string version, mixed owner)
   *
   *  Returns:
   *    TRUE if API was successfuly registered.
   */
  this.RegisterAPI = nga_RegisterAPI;

  /*  Function: UnregisterAPI
   *  Unregisters existing application API.
   *
   *  Syntax:
   *    bool *UnregisterAPI* (string id [, mixed owner, string version])
   *
   *  Returns:
   *    TRUE if API was successfuly unregistered.
   */
  this.UnregisterAPI = nga_UnregisterAPI;

  /*  Function: GetAPI
   *  Gets application API by selected id.
   *
   *  Syntax:
   *    object *GetAPI* (string id [, string minreqversion, string maxreqversion])
   *
   *  Returns:
   *    API object or null if not found.
   */
  this.GetAPI = nga_GetAPI;

  /*  Function: GetAPIAll
   *  Gets all application API by selected id.
   *
   *  Syntax:
   *    array *GetAPIAll* (string id [, string minreqversion, string maxreqversion])
   *
   *  Returns:
   *    list of APIs
   */
  this.GetAPIAll = nga_GetAPIAll;

  /*  Function: GetAPIByStrVersion
   *  Gets exact application API by its string version.
   *
   *  Syntax:
   *    object *GetAPIByStrVersion* (string id, string strversion)
   *
   *  Returns:
   *    API object or null if not found.
   */
  this.GetAPIByStrVersion = nga_GetAPIByStrVersion;

  /*  Function: GetAPIAllByStrVersion
   *  Gets all APIs which matches exact string version.
   *
   *  Syntax:
   *    array *GetAPIAllByStrVersion* (string id, string strversion)
   *
   *  Returns:
   *    list of APIs
   */
  this.GetAPIAllByStrVersion = nga_GetAPIAllByStrVersion;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnRun
   */
  this.OnRun = null;
  /*
   *  Event: OnRunFinished
   */
  this.OnRunFinished = null;
  this.OnRunInternalFinished = null;

  /*
   *  Event: OnParamsChanged
   */
  this.OnParamsChanged = null;
  this.OnInternalParamsChanged = null;

  /*
   *  Event: OnSetParam
   */
  this.OnSetParam = null;
  /*
   *  Event: OnGetParam
   */
  this.OnGetParam = null;
  /*
   *  Event: OnDecodeParam
   */
  this.OnDecodeParam = null;
  /*
   *  Event: OnEncodeParam
   */
  this.OnEncodeParam = null;

  /*
   *  Event: OnCallURL
   */
  this.OnCallURL = null;
  /*
   *  Event: OnCall
   */
  this.OnCall = null;
  /*
   *  Event: OnCallServerURL
   */
  this.OnCallServerURL = null;
  /*
   *  Event: OnServerCall
   */
  this.OnServerCall = null;

  /*
   *  Event: OnMapParamsChanged
   */
  //this.OnMapParamsChanged = null; - defined in controls_map.js

  /*
   *  Event: OnLangChanged
   */
  this.OnLangChanged = null;
  /*
   *  Event: OnDeviceChanged
   */
  this.OnDeviceChanged = null;

  window.onresize = ngAddEvent(window.onresize, nga_OnResize);

  if(ngVal(autorun,true)) this.Run();
}

// --- ngControls --------------------------------------------------------------

/**
 *  Class: ngControls
 *  This class represents references to a group of controls.
 *
 *  Syntax:
 *    new *ngControls* (object defs [, mixed parent])
 *
 *  Parameters:
 *    defs - controls definition
 *    parent - parent DIV container
 */
function ngControls(defs,parent)
{
  if(typeof parent==='undefined')
  {
    var appid;
    if((typeof ngApp === 'object')&&(ngApp)) appid=ngApp.ElmID;
    else appid='ngApp';
    var o=document.getElementById(appid);
    if(o) parent=o;
  }
  if(typeof defs === 'object') ngCreateControls(defs,this,parent);

  /*
   *  Group: Methods
   */

  /*  Function: Update
   *  Redraws all controls.
   *
   *  Syntax:
   *    void *Update* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.Update = function() { ngUpdateControls(this); }

  /*  Function: Release
   *  Clears all control's DIV containers.
   *
   *  Syntax:
   *    void *Release* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.Release = function() { ngReleaseControls(this); }

  /*  Function: Dispose
   *  Destroys all controls.
   *
   *  Syntax:
   *    void *Dispose* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.Dispose = function() { ngDisposeControls(this); }

  /*  Function: AddControls
   *  Adds controls.
   *
   *  Syntax:
   *    void *AddControls* (defs, parent)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.AddControls = function(defs, parent) { ngCreateControls(defs,this,parent); }
}
