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
var ngControlsCopyright = 'Copyright &copy 2008-2014 Position s.r.o.';

/**
 *  Variable: ngApp
 *  Reference to running <ngApplication> object.
 */
var ngApp = null;
/**
 *  Variable: ngc_Lang
 *  Application languages resource strings/objects.
 */
/*<>*/
if(typeof ngc_Lang === 'undefined') ngc_Lang=new Array();
if(typeof ngc_Lang['en'] === 'undefined') ngc_Lang['en']=new Array();
ngc_Lang['en']['ngAppOldControlsVersion']='Application requires newer version of Controls.js!\nRequired %s.%s, used %s.%s.\n\nApplication terminated!';

/**
 *  Variable: ngIE6AlignFix
 *  If TRUE, the controls API fixes right align property in IE6. Turn off
 *  if you don't care about pixels precision and prefer slightly faster rendering.
 *
 *  Default value: *true*
 */
var ngIE6AlignFix = true;

/**
 *  Function: ngLang
 *  Defines resource string/object.
 *
 *  Syntax: *ngLang* (string id, mixed data [,string lng])
 *
 *  Returns:
 *  -
 */
function ngLang(id,data,lng)
{
  if(typeof id==='undefined') return;
  if(typeof lng === 'undefined') lng=ng_cur_lng;
  lng=''+lng;
  if(lng=='') return;
  if(lng=='cs') lng='cz';
  if(typeof ngc_Lang      === 'undefined') ngc_Lang=new Array();
  if(typeof ngc_Lang[lng] === 'undefined') ngc_Lang[lng]=new Array();
  ngc_Lang[lng][id]=data;
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
  var lang=((typeof ngApp === 'object') && ngApp ? ngApp.Lang : 'en');

  function gettxt(def,t)
  {
    var l=def[lang];
    var txt=(typeof l === 'undefined' ? l : l[t]);
    if((typeof txt==='undefined')&&(lang!='en'))
    {
      l=def['en'];
      txt=(typeof l === 'undefined' ? l : l[t]);
    }
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
    if(typeof txt==='undefined') txt=t;
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
  var lang=((typeof ngApp === 'object') && ngApp ? ngApp.Lang : 'en');

  function getres(def,rid)
  {
    var le=def['en'];
    var eres=(typeof le === 'undefined' ? le : le[rid]);
    if(lang=='en') return ng_CopyVar(eres);

    var l=def[lang];
    var res=(typeof l === 'undefined' ? l : l[rid]);
    if(typeof res === 'undefined') return ng_CopyVar(eres);
    if(typeof eres === 'undefined') return ng_CopyVar(res);

    var r=ng_CopyVar(res);
    ng_MergeDef(r,eres,true);
    return r;
  }

  if((typeof ngDevice !== 'undefined')&&(typeof ngc_Lang['DEV_'+ngDevice] !== 'undefined'))
  {
    var dres=getres(ngc_Lang['DEV_'+ngDevice],rid);
    if(typeof dres !== 'undefined') return dres;
  }
  return getres(ngc_Lang,rid);
}

// --- Functions ---------------------------------------------------------------

function ng_Expand2Id(eid)
{
  var id1='';
  var id2='';
  if(typeof eid === 'string')
  {
    var i=eid.indexOf('_');
    if(i>=0)
    {
      id1=eid.substring(0,i);
      id2=eid.substring(i+1,eid.length);
    }
  }
  return {id1: id1, id2: id2};
}

function ng_OutlineHTML(t,c)
{
  c=ngVal(c,'');
  if(c=='') return t;

  var html=new ngStringBuilder;
  for(var i=0;i<3;i++)
    for(var j=0;j<3;j++)
    {
      if((i!=1)||(j!=1))
      {
        html.append("<span style=\"position: absolute; left:"+(i-1)+"px; top:"+(j-1)+"px; color: "+c+"\">");
        html.append(t);
        html.append("</span>")
      }
    }
  html.append("<span style=\"position: absolute; left:0px; top:0px;\">");
  html.append(t);
  html.append("</span><span style=\"visibility:hidden;margin-left:2px;\">"+t+"</span>");
  return html.toString();
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
      if((po)&&(po!=document.body)) pw=ng_ClientWidth(po);
      else pw=ng_WindowWidth();
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
      if((po)&&(po!=document.body)) ph=ng_ClientHeight(po);
      else ph=ng_WindowHeight();
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

function ng_SetOpacity(o,v)
{
  if(typeof o==='string') o=document.getElementById(o);
  if(!o) return;
  if(v<0) v=0;
  if(v>1) v=1;
  o.style.opacity=v;
  o.style.filter='alpha(opacity=' + v*100 + ')';
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

// --- Images ------------------------------------------------------------------

var ng_CreateImageHTML = function(id,url,left,top,width, height, style, attr, innerHTML)
{
  if(ngIExplorer6) ng_CreateImageHTML=ng_CreateImageHTMLIE6;
  else             ng_CreateImageHTML=ng_CreateImageHTMLNotIE6;
  return ng_CreateImageHTML(id,url,left,top,width, height, style, attr, innerHTML);
}

function ng_CreateImageHTMLNotIE6(id,url,left,top,width, height, style, attr, innerHTML)
{
  if(typeof attr==='undefined') attr='';
  if(typeof style==='undefined') style='';
  if(typeof innerHTML==='undefined') innerHTML='';
  if(url!='')
    style = "background: transparent url('"+url+"') no-repeat scroll "+(-left)+"px "+(-top)+(top==0 ? "pt" : "px")+";" + style;
  else
    if(ngIExplorer) style = "background: transparent url('"+ngEmptyURL+"');" + style;
  return '<span id="'+id+'" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:'+width+'px;height:'+height+'px;'+style+'" '+attr+'>'+innerHTML+'</span>';
}

function ng_CreateImageHTMLIE6(id,url,left,top,width, height, style, attr, innerHTML)
{
  if(typeof attr==='undefined') attr='';
  if(typeof style==='undefined') style='';
  if(typeof innerHTML==='undefined') innerHTML='';
  if(url!='')
    innerHTML = '<span id="'+id+'_png" unselectable="on" style="position:absolute;font-size:0;line-height:0;left:'+(-left)+'px;top:'+(-top)+'px;width:'+(left+width)+'px;height:'+(top+height)+'px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+url+'\');"></span>'+innerHTML;
  else
    style = "background: transparent url('"+ngEmptyURL+"');" + style;
  return '<span id="'+id+'" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:'+width+'px;height:'+height+'px;'+style+'" '+attr+'>'+innerHTML+'</span>';
}

function ng_CreateImageHTMLSW(id,l,w,url,left,top,width,height, style, attr, innerHTML)
{
  if(typeof attr==='undefined') attr='';
  if(typeof style==='undefined') style='';
  if(typeof innerHTML==='undefined') innerHTML='';
  if((typeof width === 'undefined')||(url==''))
  {
    if((ngIExplorer6)&&(url!=''))
    {
      var img=ng_PreloadImage(url);
      if(!img) return '';
      width=img.width;
    }
    else
    {
      if(url!='')
        style = "background: transparent url('"+url+"') repeat-x scroll "+(-left)+"px "+(-top)+(top==0 ? "pt" : "px")+";" + style;
      else
        if(ngIExplorer) style = "background: transparent url('"+ngEmptyURL+"');" + style;
      return '<span id="'+id+'_1" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:'+w+'px;height:'+height+'px;'+style+'left:'+l+'px;" '+attr+'>'+innerHTML+'</span>';
    }
  }
  if(width<=0) return '';
  var html=new ngStringBuilder;
  var i=1;
  while(w>0)
  {
    if(w<width) width=w;
    html.append(ng_CreateImageHTML(id+'_'+i,url,left,top,width,height,style+'left:'+l+'px;',attr,innerHTML))
    w-=width;
    l+=width;
    i++;
  }
  return html.toString();
}

function ng_CreateImageHTMLSH(id,t,h,url,left,top,width,height, style, attr,innerHTML)
{
  if(typeof attr==='undefined') attr='';
  if(typeof style==='undefined') style='';
  if(typeof innerHTML==='undefined') innerHTML='';
  if((typeof height==='undefined')||(url==''))
  {
    if((ngIExplorer6)&&(url!=''))
    {
      var img=ng_PreloadImage(url);
      if(!img) return '';
      height=img.height;
    }
    else
    {
      if(url!='')
        style = "background: transparent url('"+url+"') repeat-y scroll "+(-left)+"px "+(-top)+(top==0 ? "pt" : "px")+";" + style;
      else
        if(ngIExplorer) style = "background: transparent url('"+ngEmptyURL+"');" + style;
      return '<span id="'+id+'_1" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:'+width+'px;height:'+h+'px;'+style+'top:'+t+'px" '+attr+'>'+innerHTML+'</span>';
    }
  }
  if(height<=0) return '';
  var html=new ngStringBuilder;
  var i=1;
  while(h>0)
  {
    if(h<height) height=h;
    html.append(ng_CreateImageHTML(id+'_'+i,url,left,top,width,height,style+'top:'+t+'px;',attr,innerHTML))
    h-=height;
    t+=height;
    i++;
  }
  return html.toString();
}

function ng_SwapImageHTML(id, left, top)
{
  var o;
  if((typeof left==='undefined')||(typeof top==='undefined')) return;
  if(ngIExplorer6)
  {
    o=document.getElementById(id+'_png');
    if(o)
    {
      o.style.pixelLeft=-left;
      o.style.pixelTop=-top;
      return;
    }
  }
  o=document.getElementById(id);
  if(o) o.style.backgroundPosition=(-left)+"px "+(-top)+(top==0 ? "pt" : "px");
}

function ng_CreateBoxHTML(id, url, left, top, width, height, innersize, images, style, innerHTML)
{
  var img;
  var html=new ngStringBuilder;

  var noimg = {L:0,T:0,W:0,H:0};
  style='position:absolute;'+style;
  var dp=new Object;
  dp.Left =(typeof images.Left === 'undefined' ? noimg : images.Left);
  dp.Top =(typeof images.Top === 'undefined' ? noimg : images.Top);
  dp.Right =(typeof images.Right === 'undefined' ? noimg : images.Right);
  dp.Bottom =(typeof images.Bottom === 'undefined' ? noimg : images.Bottom);
  dp.LeftTop =(typeof images.LeftTop === 'undefined' ? noimg : images.LeftTop);
  dp.RightTop =(typeof images.RightTop === 'undefined' ? noimg : images.RightTop);
  dp.LeftBottom =(typeof images.LeftBottom === 'undefined' ? noimg : images.LeftBottom);
  dp.RightBottom =(typeof images.RightBottom === 'undefined' ? noimg : images.RightBottom);

  if(innersize)
  {
    width+=dp.Left.W;
    width+=dp.Right.W;
    height+=dp.Top.H;
    height+=dp.Bottom.H;
  }
  img=dp.LeftTop;
  if(img.W) html.append(ng_CreateImageHTML(id+'_LT', ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left:"+left+"px;top: "+top+"px;"));

  img=dp.Top;
  if(img.W) html.append(ng_CreateImageHTMLSW(id+'_T', dp.LeftTop.W,(width-dp.LeftTop.W-dp.RightTop.W), ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"top: "+top+"px;"));

  img=dp.RightTop;
  if(img.W) html.append(ng_CreateImageHTML(id+'_RT', ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left:"+(left+width-img.W)+"px;top: "+top+"px;"));

  img=dp.Left;
  if(img.W) html.append(ng_CreateImageHTMLSH(id+'_L',top+(dp.LeftTop.H ? dp.LeftTop.H : dp.Top.H),(height-(dp.LeftTop.H ? dp.LeftTop.H : dp.Top.H)-(dp.LeftBottom.H ? dp.LeftBottom.H : dp.Bottom.H)), ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left: "+left+"px;"));

  img=dp.Right;
  if(img.W) html.append(ng_CreateImageHTMLSH(id+'_R',top+(dp.RightTop.H ? dp.RightTop.H : dp.Top.H),(height-(dp.RightTop.H ? dp.RightTop.H : dp.Top.H)-(dp.RightBottom.H ? dp.RightBottom.H : dp.Bottom.H)), ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left: "+(left+width-img.W)+"px;"));

  img=dp.LeftBottom;
  if(img.W) html.append(ng_CreateImageHTML(id+'_LB', ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left:"+left+"px;top: "+(top+height-img.H)+"px;"));

  img=dp.Bottom;
  if(img.W) html.append(ng_CreateImageHTMLSW(id+'_B', dp.LeftBottom.W,(width-dp.LeftBottom.W-dp.RightBottom.W), ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"top: "+(top+height-img.H)+"px;"));

  img=dp.RightBottom;
  if(img.W) html.append(ng_CreateImageHTML(id+'_RB', ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left:"+(left+width-img.W)+"px;top: "+(top+height-img.H)+"px;"));

  if(typeof innerHTML !== 'undefined')
  {
    html.append('<div id="'+id+'_C" style="'+style+'overflow:auto; left:'+(left+dp.Left.W)+'px;top:'+(top+dp.Top.W)+'px;width:'+(width-dp.Left.W-dp.Right.W)+'px;height:'+(height-dp.Top.H-dp.Bottom.H)+'px;">');
    html.append(innerHTML);
    html.append('</div>');
  }
  return html.toString();
}

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

// --- Controls ----------------------------------------------------------------

var ngControlsIDs = new Array();
var ngControlImages = '';
var ngRegisteredControlTypes = new Array();
var ngMouseInControls = new Array();

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

function ngRegisterControlType(type, def)
{
  if(typeof type!=='string') return;

  switch(typeof def)
  {
    case 'function':
      if(typeof ngRegisteredControlTypes[type] === 'function') {
        ngDEBUGWARN('Duplicated registration of component type "%s".',ngVal(type,''),def);
      }
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
      ngRegisterControlType(type, function(cdef,ref,parent) {
        return ngCreateControlAsType(cdef, def, ref, parent);
      });
      break;
  }
}

ngRegisterControlType('ngPanel', function() { return new ngPanel; });
ngRegisterControlType('ngText', function() { return new ngText; });
ngRegisterControlType('ngImage', function() { return new ngImage; });
ngRegisterControlType('ngImageMap', function() { return new ngImageMap; });
ngRegisterControlType('ngButton', function() { return new ngButton; });
ngRegisterControlType('ngGroup', function() { return new ngGroup; });
ngRegisterControlType('ngEdit', function() { return new ngEdit; });
ngRegisterControlType('ngMemo', function() { return new ngMemo; });
ngRegisterControlType('ngPages', function() { return new ngPages; });
ngRegisterControlType('ngToolBar', function() { return new ngToolBar; });
ngRegisterControlType('ngProgressBar', function() { return new ngProgressBar; });
ngRegisterControlType('ngWebBrowser', function() { return new ngWebBrowser; });
ngRegisterControlType('ngSysAction', function() { return new ngSysAction; });

// Derived controls
ngRegisterControlType('ngFrame', ngFrame_Create);
ngRegisterControlType('ngRadioButton', ngRadioCheckBox_Create);
ngRegisterControlType('ngCheckBox', ngRadioCheckBox_Create);
ngRegisterControlType('ngDropDownList', function(def, ref, parent) { return ngDropDown_Create(def, ref, parent, 'ngEdit', true); });
ngRegisterControlType('ngDropDown', function(def, ref, parent) { return ngDropDown_Create(def, ref, parent, 'ngEdit', false); });
ngRegisterControlType('ngEditNum', ngEditNum_Create);

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

var ngOnCreateControl = null;

function ngControlCreated(obj)
{
  if(ngOnCreateControl) ngOnCreateControl(obj);
}

// --- ngCreateControls --------------------------------------------------------

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();

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
  for(var i in ngUserControls)
  {
    uc=ngUserControls[i];
    if(typeof uc === 'undefined') continue;
    if(typeof uc.OnInit === 'function') uc.OnInit();
    if((typeof uc.ControlImages === 'string')&&(ngControlImages!=uc.ControlImages))
    {
      uc.ControlImages=ng_URL(uc.ControlImages);
      ng_PreloadImage(uc.ControlImages);
      ngUsrCtrlSetImages(uc.Images, uc.ControlImages);
    }
    else if((typeof uc.ControlImages === 'object')&&(typeof uc.ControlImages.length === 'number'))
    {
      for(var j=0;j<uc.ControlImages.length;j++)
      {
        uc.ControlImages[j]=ng_URL(uc.ControlImages[j]);
        if(ngControlImages!=uc.ControlImages[j]) ng_PreloadImage(uc.ControlImages[j]);
      }
      if(uc.ControlImages.length>0) ngUsrCtrlSetImagesArray(uc.Images, uc.ControlImages);
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
  function merge_events(d,o,before)
  {
    var isdarr,isoarr,j;
    var isdfnc,isofnc;

    for(var i in o)
    {
      if((typeof d[i]==='undefined')||(d[i]===null)) { d[i]=o[i]; continue; }
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
  var j,c,uc;
  c=null; uc=null;

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

  c.CtrlInheritedFrom[c.CtrlInheritedFrom.length] = d.Type;
  c.DefType = d.Type;
  c.Owner = ref;

  if(typeof d.Data !== 'undefined')
    for(var i in d.Data)
      c[i]=d.Data[i];

  if(!d.CtrlInheritanceDepth) // do it only on top component
  {
    if(typeof d.BeforeEvents !== 'undefined')
      for(var i in d.BeforeEvents)
        c.AddEvent(d.BeforeEvents[i],i);

    if(typeof d.AfterEvents !== 'undefined') // alias to d.Events
      for(var i in d.AfterEvents)
        c.AddEvent(i,d.AfterEvents[i]);

    if(typeof d.Events !== 'undefined')
      for(var i in d.Events)
        c.AddEvent(i,d.Events[i]);

    if(typeof d.OverrideEvents !== 'undefined') // alias to d.Data
      for(var i in d.OverrideEvents)
        c[i]=d.OverrideEvents[i];

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

  if(uc)
    for(j in ngUserControls)
    {
      uc=ngUserControls[j];
      if(typeof uc.OnControlCreated === 'function') uc.OnControlCreated(d,c,ref);
    }
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

function ngCreateControls(defs,ref,parent,options)
{
  var uc,i,j,c,d,oc,celm,parentCtrl=null;
  if(typeof ref === 'undefined') ref=new Object;
  if(typeof defs === 'undefined') return ref;
  if(typeof options === 'undefined')
  {
    if(ngCreateControlsOptions) options = ngCreateControlsOptions;
    else options = new Object;
  }
  var oldoptions=ngCreateControlsOptions;
  ngCreateControlsOptions=options;
  try
  {
    if(!options.CreatedControls) ng_SetByRef(options,'CreatedControls',new Array());
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
          else if(ngVal(parent.id,'')!='') parentCtrl=ngGetControlById(parent.id);
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

          var cinfo=new Object;
          cinfo.Control=c;
          cinfo.Options=null;
          cinfo.OnCreated=d.OnCreated;
          cinfo.Ref=ref;
          delete d.OnCreated;
          celm=c.Create(d, ref);
          d.OnCreated=cinfo.OnCreated;

          if((ngHASDEBUG())&&(typeof ref[i]!=='undefined')&&(ref[i]!==null))
          {
            ngDEBUGWARN('Reference "%s" was overwritten by %o. References: %o',i,c,ref);
          }
          ref[i]=c;

          cinfo.OnCreated=d.OnCreated;
          options.CreatedControls[options.CreatedControls.length]=cinfo;

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
              ngCreateControls(d.Controls,(prefs ? ref : nref),c.ID,options);
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
    }
    ngCreateControlsLevel--;
    if(!ngCreateControlsLevel)
    {
      var cinfo,c;
      for(var i=0;i<options.CreatedControls.length;i++)
      {
        cinfo=options.CreatedControls[i];
        oc=cinfo.OnCreated;
        cinfo.OnCreated=null;
        if(oc)
        {
          ngCreateControlsOptions=cinfo.Options;
          c=cinfo.Control;
          c.OnCreated=oc;
          oc(c,cinfo.Ref,cinfo.Options);
        }
        if(options.OnCreated) options.OnCreated(c,cinfo.Ref,cinfo.Options);
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
  var upd_id=new Array();
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

  if((parent)&&(typeof parent === 'string')) parent=document.getElementById(parent);
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
    else nd=document.createElement('div');
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
    if(this.ID!='') delete ngControlsIDs[this.ID];
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
  if(id!='') delete ngControlsIDs[id];
}

function ngc_Enable()
{
  this.SetEnabled(true);
}

function ngc_Disable()
{
  this.SetEnabled(false);
}

function ngc_SetEnabled(v,p)
{
  v=ngVal(v,true);
  if(this.Enabled!=v)
  {
    if((this.OnSetEnabled)&&(!ngVal(this.OnSetEnabled(this,v,p),false))) return;

    p=ngVal(p,this);
    if(typeof this.SetChildControlsEnabled === 'function')
    {
      this.SetChildControlsEnabled(v,p);
    }
    else
    {
      var cc=this.ChildControls;
      if(typeof cc !== 'undefined')
        for(var i=0;i<cc.length;i++) cc[i].SetEnabled(v,p);
    }

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
  if(o) { try { if(ngVal(state,true)) o.focus(); else o.blur(); } catch(e) { } }
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
        if((!v)&&(!ngIExplorer))
        {
          function blur_hidden(c)
          {
            if(c.SetFocus) c.SetFocus(false);
            var cc=c.ChildControls;
            if(typeof cc !== 'undefined')
              for(var i=0;i<cc.length;i++)
                blur_hidden(cc[i]);
          }
          blur_hidden(this);
        }
        // IE7 redraw fix
        var fix7=document.body.offsetLeft;
      }
    }
    if(this.Visible!=v)
    {
      this.Visible=v;
      if(v) this.Update(true);

      // IE7 redraw fix
      var o=this.Elm();
      if(o) { var fix7=o.offsetLeft; }

      if(this.OnVisibleChanged) this.OnVisibleChanged(this);
    }
    else ngc_DeactivatePopup(this);
  }
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

function ngc_Update(recursive)
{
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
    // IE7 redraw fix
    var fix7=o.offsetLeft;
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
   *  Event: OnMouseEnter
   */
  obj.OnMouseEnter     = null;

  /*
   *  Event: OnMouseLeave
   */
  obj.OnMouseLeave     = null;
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
}

// --- ngControl - children ----------------------------------------------------

function ngAddChildControl(parentobj, obj)
{
  if((!parentobj)||(!obj)) return;
  if(typeof parentobj.ChildControls === 'undefined') parentobj.ChildControls = new Array();
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
      for(var popupgrp in ngc_ActivePopups)
      {
        var dd=ngc_ActivePopups[popupgrp];
        if(dd)
        {
          if (!e) e = window.event;
          var t = e.target || e.srcElement || e.originalTarget;

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
      for(var popupgrp in ngc_ActivePopups)
      {
        var dd=ngc_ActivePopups[popupgrp];
        if(dd)
        {
          var t=pi.GetTarget();
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
              ret=false;
              ng_DocumentDeselect();
              pi.EventPreventDefault();
              pi.StopPropagation=true;
              ngc_disabledocselect(pi.StartElement);
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

var ngOnPointerDown = null;

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

function ngc_ptrevignore(e)
{
  if((e)&&(e.gesture)) e=e.gesture.srcEvent;
  if((e)&&(ngIExplorerVersion<=8)) {
    e={ ts: new Date().getTime(),
        type: e.type,
        button: e.button,
        clientX: e.clientX,
        clientY: e.clientY,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        srcElement: e.srcElement
      }
  }
  ngPtrIgnoredEvent=e;
}

function ngc_ptrevisignored(e)
{
  var ie=ngPtrIgnoredEvent;
  if((e)&&(e.gesture)) e=e.gesture.srcEvent;
  if(ie)
  {
    if(ie===e) return true;
    if(ngIExplorerVersion<=8) {
      // in IE<=8 window.event returns always new instance :(
      if((ie.type===e.type)&&(ie.clientX===e.clientX)&&(ie.clientY===e.clientY)&&(ie.altKey===e.altKey)&&(ie.ctrlKey===e.ctrlKey)&&(ie.srcElement===e.srcElement)&&(ie.button===e.button))
      {
        if((new Date().getTime()-ie.ts)<500) return true;
      }
    }
  }
  return false;
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
      if(document.elementFromPoint) target=document.elementFromPoint(this.X, this.Y);
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
      StartEvent: e,
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
  }

  if(!e) e=window.event;

  ngc_ptrevignore(null);
  ngCurrentPtrDblClick = null;

  var pi=c.PointerInfo;
  if(pi)
  {
    pi.Event=e;
    pi.EndEvent=e;
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

    var doclick=((pi.Click)&&(c.DoPtrClick));
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

    if((pi.DblClick)&&(c.DoPtrDblClick))
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

    if(ngHammerJS()) // HammerJS library is present
    {
      var opts={ drag_min_distance : 1, hold_threshold: 30 };
      if(c.DoGetPtrOptions) c.DoGetPtrOptions(eid, opts);

      var ous=Hammer.defaults.stop_browser_behavior.userSelect;
      try
      {
        Hammer.defaults.stop_browser_behavior.userSelect=''; // allow mouse selection by default
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

    var px = (e.clientX ? e.clientX : e.offsetX);
    var py = (e.clientY ? e.clientY : e.offsetY);

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

  if(!ngHammerJS()) // HammerJS library is NOT present
  {
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

// --- Control images ----------------------------------------------------------

function ngc_ChangeImage(dp)
{
  ng_SwapImageHTML(dp.id, dp.aL, dp.aT);
  var o=document.getElementById(dp.id);
  if(o)
  {
    if((dp.L!=dp.oL)||(dp.T!=dp.oT))
    {
      o.setAttribute('L',dp.L);
      o.setAttribute('T',dp.T);
      o.setAttribute('oL',dp.oL);
      o.setAttribute('oT',dp.oT);
    }
    else
    {
      if(!ng_nullAttr(o.getAttribute('L'))) o.setAttribute('L','');
      if(!ng_nullAttr(o.getAttribute('T'))) o.setAttribute('T','');
      if(!ng_nullAttr(o.getAttribute('oL'))) o.setAttribute('oL','');
      if(!ng_nullAttr(o.getAttribute('oT'))) o.setAttribute('oT','');
    }
    return true;
  }
  return false;
}

function ngc_ChangeImageS(dp)
{
  var i,id=dp.id;
  for(i=1;i<1000;i++)
  {
    dp.id=id+'_'+i;
    if(!ngc_ChangeImage(dp)) break;
  }
  dp.id=id;
  return(i>1);
}

function ngc_ChangeImg(id,state,enabled,image)
{
  if(image)
  {
    var dp=ngc_ImgProps(id, state, enabled, image);
    ngc_ChangeImage(dp);
  }
}

function ngc_ChangeImgS(id,state,enabled,image)
{
  if(image)
  {
    var dp=ngc_ImgProps(id, state, enabled, image);
    ngc_ChangeImageS(dp);
  }
}

function ngc_ChangeBox(id,state,enabled,images)
{
  if(!images) return;
  if(typeof images.Left !== 'undefined')
    ngc_ChangeImgS(id+'_L',state,enabled,images.Left);
  if(typeof images.Top !== 'undefined')
    ngc_ChangeImgS(id+'_T',state,enabled,images.Top);
  if(typeof images.Right !== 'undefined')
    ngc_ChangeImgS(id+'_R',state,enabled,images.Right);
  if(typeof images.Bottom !== 'undefined')
    ngc_ChangeImgS(id+'_B',state,enabled,images.Bottom);
  if(typeof images.LeftTop !== 'undefined')
    ngc_ChangeImg(id+'_LT',state,enabled,images.LeftTop);
  if(typeof images.RightTop !== 'undefined')
    ngc_ChangeImg(id+'_RT',state,enabled,images.RightTop);
  if(typeof images.LeftBottom !== 'undefined')
    ngc_ChangeImg(id+'_LB',state,enabled,images.LeftBottom);
  if(typeof images.RightBottom !== 'undefined')
    ngc_ChangeImg(id+'_RB',state,enabled,images.RightBottom);
}

function ngc_EnterImg(id)
{
  var o=document.getElementById(id);
  if(o)
  {
    var l=o.getAttribute('oL');
    var t=o.getAttribute('oT');
    if((!ng_nullAttr(l))&&(!ng_nullAttr(t))) ng_SwapImageHTML(id, l, t)
    return true;
  }
  else return false;
}

function ngc_LeaveImg(id)
{
  var o=document.getElementById(id);
  if(o)
  {
    var l=o.getAttribute('L');
    var t=o.getAttribute('T');
    if((!ng_nullAttr(l))&&(!ng_nullAttr(t))) ng_SwapImageHTML(id, l, t)
    return true;
  }
  return false;
}

function ngc_EnterImgS(id)
{
  for(var i=1;i<1000;i++)
    if(!ngc_EnterImg(id+'_'+i)) break;
}

function ngc_LeaveImgS(id)
{
  for(var i=1;i<1000;i++)
    if(!ngc_LeaveImg(id+'_'+i)) break;
}

function ngc_EnterBox(id)
{
  ngc_EnterImg(id+'_LT');
  ngc_EnterImgS(id+'_T');
  ngc_EnterImg(id+'_RT');
  ngc_EnterImgS(id+'_L');
  ngc_EnterImgS(id+'_R');
  ngc_EnterImg(id+'_LB');
  ngc_EnterImgS(id+'_B');
  ngc_EnterImg(id+'_RB');
}

function ngc_LeaveBox(id)
{
  ngc_LeaveImg(id+'_LT');
  ngc_LeaveImgS(id+'_T');
  ngc_LeaveImg(id+'_RT');
  ngc_LeaveImgS(id+'_L');
  ngc_LeaveImgS(id+'_R');
  ngc_LeaveImg(id+'_LB');
  ngc_LeaveImgS(id+'_B');
  ngc_LeaveImg(id+'_RB');
}

function ngc_Img(html,dp,style,attrs,innerHTML)
{
  html.append(ng_CreateImageHTML(dp.id,dp.Src,dp.aL,dp.aT,dp.W,dp.H,style,(((dp.L!=dp.oL)||(dp.T!=dp.oT)) ? ' L="'+dp.L+'" T="'+dp.T+'" oL="'+dp.oL+'" oT="'+dp.oT+'" ' : '')+attrs,innerHTML));
}

function ngc_ImgSW(html,dp,l,w,style,attrs,innerHTML)
{
  html.append(ng_CreateImageHTMLSW(dp.id,l,w,dp.Src,dp.aL,dp.aT,dp.W, dp.H,"position:absolute;"+style,(((dp.L!=dp.oL)||(dp.T!=dp.oT)) ? ' L="'+dp.L+'" T="'+dp.T+'" oL="'+dp.oL+'" oT="'+dp.oT+'" ' : '')+attrs,innerHTML));
}

function ngc_ImgSH(html,dp,t,h,style,attrs,innerHTML)
{
  html.append(ng_CreateImageHTMLSH(dp.id,t,h,dp.Src,dp.aL,dp.aT,dp.W, dp.H,"position:absolute;"+style,(((dp.L!=dp.oL)||(dp.T!=dp.oT)) ? ' L="'+dp.L+'" T="'+dp.T+'" oL="'+dp.oL+'" oT="'+dp.oT+'" ' : '')+attrs,innerHTML));
}

function ngc_ImgBox(html, id, type, s, enabled, left, top, width, height, innersize, images, style, attrs, innerHTML, dp)
{
  var img;
  var ltstyle,tstyle,rtstyle,lstyle,rstyle,lbstyle,bstyle,rbstyle,cstyle;
  var ltattrs,tattrs,rtattrs,lattrs,rattrs,lbattrs,battrs,rbattrs,cattrs;
  var sz,d1,d2;

  var noimg = {L:0,T:0,aL:0,aT:0,oT:0,oL:0,W:0,H:0};
  var gstyle='position:absolute;';
  if(typeof style==='string') gstyle+=style;
  if(typeof style==='object')
  {
    ltstyle=ngVal(style.LeftTop,'');
    tstyle=ngVal(style.Top,'');
    rtstyle=ngVal(style.RightTop,'');
    lstyle=ngVal(style.Left,'');
    rstyle=ngVal(style.Right,'');
    lbstyle=ngVal(style.LeftBottom,'');
    bstyle=ngVal(style.Bottom,'');
    rbstyle=ngVal(style.RightBottom,'');
    cstyle=ngVal(style.Content,'');
  }
  else ltstyle=tstyle=rtstyle=lstyle=rstyle=lbstyle=bstyle=rbstyle=cstyle='';
  var gattrs='';
  if(typeof attrs==='string') gattrs+=attrs;
  if(typeof attrs==='object')
  {
    ltattrs=ngVal(attrs.LeftTop,'');
    tattrs=ngVal(attrs.Top,'');
    rtattrs=ngVal(attrs.RightTop,'');
    lattrs=ngVal(attrs.Left,'');
    rattrs=ngVal(attrs.Right,'');
    lbattrs=ngVal(attrs.LeftBottom,'');
    battrs=ngVal(attrs.Bottom,'');
    rbattrs=ngVal(attrs.RightBottom,'');
    cattrs=ngVal(attrs.Content,'');
  }
  else ltattrs=tattrs=rtattrs=lattrs=rattrs=lbattrs=battrs=rbattrs=cattrs='';

  if(typeof dp==='undefined') dp=new Object;
  dp.Left =(typeof images.Left === 'undefined' ? noimg : ngc_ImgProps(id+'_L', s, enabled, images.Left));
  dp.Top =(typeof images.Top === 'undefined' ? noimg : ngc_ImgProps(id+'_T', s, enabled, images.Top));
  dp.Right =(typeof images.Right === 'undefined' ? noimg : ngc_ImgProps(id+'_R', s, enabled, images.Right));
  dp.Bottom =(typeof images.Bottom === 'undefined' ? noimg : ngc_ImgProps(id+'_B', s, enabled, images.Bottom));
  dp.LeftTop =(typeof images.LeftTop === 'undefined' ? noimg : ngc_ImgProps(id+'_LT', s, enabled, images.LeftTop));
  dp.RightTop =(typeof images.RightTop === 'undefined' ? noimg : ngc_ImgProps(id+'_RT', s, enabled, images.RightTop));
  dp.LeftBottom =(typeof images.LeftBottom === 'undefined' ? noimg : ngc_ImgProps(id+'_LB', s, enabled, images.LeftBottom));
  dp.RightBottom =(typeof images.RightBottom === 'undefined' ? noimg : ngc_ImgProps(id+'_RB', s, enabled, images.RightBottom));

  if(innersize)
  {
    width+=dp.Left.W;
    width+=dp.Right.W;
    height+=dp.Top.H;
    height+=dp.Bottom.H;
  }
  sz=dp.LeftTop.W+dp.RightTop.W;
  if(sz>width)
  {
    d1=Math.round((sz-width)/2);
    d2=(sz-width)-d1;
    dp.LeftTop.W-=d1;
    dp.RightTop.W-=d2;
    dp.RightTop.L+=d2;
    dp.RightTop.oL+=d2;
    dp.RightTop.aL+=d2;
  }
  sz=dp.LeftBottom.W+dp.RightBottom.W;
  if(sz>width)
  {
    d1=Math.round((sz-width)/2);
    d2=(sz-width)-d1;
    dp.LeftBottom.W-=d1;
    dp.RightBottom.W-=d2;
    dp.RightBottom.L+=d2;
    dp.RightBottom.oL+=d2;
    dp.RightBottom.aL+=d2;
  }
  sz=dp.LeftTop.H+dp.LeftBottom.H;
  if(sz>height)
  {
    d1=Math.round((sz-height)/2);
    d2=(sz-height)-d1;
    dp.LeftTop.H-=d1;
    dp.LeftBottom.H-=d2;
    dp.LeftBottom.T+=d2;
    dp.LeftBottom.oT+=d2;
    dp.LeftBottom.aT+=d2;
  }
  sz=dp.RightTop.H+dp.RightBottom.H;
  if(sz>height)
  {
    d1=Math.round((sz-height)/2);
    d2=(sz-height)-d1;
    dp.RightTop.H-=d1;
    dp.RightBottom.H-=d2;
    dp.RightBottom.T+=d2;
    dp.RightBottom.oT+=d2;
    dp.RightBottom.aT+=d2;
  }

  img=dp.LeftTop;
  if(img.W) ngc_Img(html,img,gstyle+ltstyle+"left:"+left+"px;top: "+top+"px;",gattrs+ltattrs);

  img=dp.Top;
  if(img.H) ngc_ImgSW(html,img,dp.LeftTop.W,(width-dp.LeftTop.W-dp.RightTop.W),gstyle+tstyle+"top: "+top+"px;",gattrs+tattrs);

  img=dp.RightTop;
  if(img.W) ngc_Img(html,img,gstyle+rtstyle+"left:"+(left+width-img.W)+"px;top: "+top+"px;",gattrs+rtattrs);

  img=dp.Left;
  if(img.W) ngc_ImgSH(html,img,top+(dp.LeftTop.H ? dp.LeftTop.H : dp.Top.H),(height-(dp.LeftTop.H ? dp.LeftTop.H : dp.Top.H)-(dp.LeftBottom.H ? dp.LeftBottom.H : dp.Bottom.H)),gstyle+lstyle+"left: "+left+"px;",gattrs+lattrs);

  img=dp.Right;
  if(img.W) ngc_ImgSH(html,img,top+(dp.RightTop.H ? dp.RightTop.H : dp.Top.H),(height-(dp.RightTop.H ? dp.RightTop.H : dp.Top.H)-(dp.RightBottom.H ? dp.RightBottom.H : dp.Bottom.H)),gstyle+rstyle+"left: "+(left+width-img.W)+"px;",gattrs+rattrs);

  img=dp.LeftBottom;
  if(img.W) ngc_Img(html,img,gstyle+lbstyle+"left:"+left+"px;top: "+(top+height-img.H)+"px;",gattrs+lbattrs);

  img=dp.Bottom;
  if(img.H) ngc_ImgSW(html,img,dp.LeftBottom.W,(width-dp.LeftBottom.W-dp.RightBottom.W),gstyle+bstyle+"top: "+(top+height-img.H)+"px;",gattrs+battrs);

  img=dp.RightBottom;
  if(img.W) ngc_Img(html,img,gstyle+rbstyle+"left:"+(left+width-img.W)+"px;top: "+(top+height-img.H)+"px;",gattrs+rbattrs);

  if(typeof innerHTML !== 'undefined')
  {
    html.append('<div id="'+id+'_CB" style="'+gstyle+cstyle+'left:'+(left+dp.Left.W)+'px;top:'+(top+dp.Top.H)+'px;width:'+(width-dp.Left.W-dp.Right.W)+'px;height:'+(height-dp.Top.H-dp.Bottom.H)+'px;" '+gattrs+cattrs+'>');
    html.append(innerHTML);
    html.append('</div>');
  }
}

function ngc_ImgProps(id, s, enabled, o)
{
  var v=new Object;
  v.id=id;
  v.W=o.W;
  v.H=o.H;
  v.Src=ngVal(o.Src,ngControlImages);
  if(!enabled)
  {
    switch(s)
    {
      case 0:
      case false:
        v.L=o.DL; v.T=o.DT;
        v.oL=o.oDL; v.oT=o.oDT;
        break;
      case 1:
      case true:
        v.L=o.DSL; v.T=o.DST;
        v.oL=o.oDSL; v.oT=o.oDST;
        break;
      case 2:
        v.L=o.DGL; v.T=o.DGT;
        v.oL=o.oDGL; v.oT=o.oDGT;
        break;
    }
    v.L=ngVal(v.L, o.DL);
    v.T=ngVal(v.T, o.DT);
    v.oL=ngVal(v.oL, o.oDL);
    v.oT=ngVal(v.oT, o.oDT);

    if((typeof v.L === 'undefined')&&(typeof v.T === 'undefined')) enabled=true;
    else
    {
      v.L=ngVal(v.L, o.L);
      v.T=ngVal(v.T, o.T);
    }
  }
  if(enabled)
  {
    switch(s)
    {
      case 0:
      case false:
        v.L=o.L; v.T=o.T;
        v.oL=o.oL; v.oT=o.oT;
        break;
      case 1:
      case true:
        v.L=o.SL; v.T=o.ST;
        v.oL=o.oSL; v.oT=o.oST;
        break;
      case 2:
        v.L=o.GL; v.T=o.GT;
        v.oL=o.oGL; v.oT=o.oGT;
        break;
    }
    v.L=ngVal(v.L, o.L);
    v.T=ngVal(v.T, o.T);
    v.oL=ngVal(v.oL, o.oL);
    v.oT=ngVal(v.oT, o.oT);
  }
  v.oL=ngVal(v.oL, v.L);
  v.oT=ngVal(v.oT, v.T);

  v.aL=v.L; v.aT=v.T;

  return v;
}

function ngc_ImgDrawProps(id, type, ctrlid, s, enabled, o)
{
  return ngc_ImgProps(id, s, enabled, o);
}

// --- ngApplication -----------------------------------------------------------

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

function nga_GetLang()
{
  var l=ngc_Lang[this.Lang];
  if(typeof l === 'undefined') { this.Lang='en'; l=ngc_Lang['en']; }
  return l;
}

function nga_Text(t, defval)
{
  return ngTxt(t, defval);
}

function nga_Resource(rid)
{
  return ngRes(rid);
}

nga_RunTimer=null;
function nga_DoRunFinal()
{
  if((ngApp.OnRun)&&(!ngVal(ngApp.OnRun(),false))) return;

  if(typeof ngMain === 'function') ngMain();

  ngApp.SetOnParamsChanged = nga_SetOnParamsChanged;
  ngApp.SetOnParamsChanged(ngApp.OnParamsChanged);

  if(ngApp.OnRunFinished) ngApp.OnRunFinished();
  if(ngApp.OnRunInternalFinished) ngApp.OnRunInternalFinished();

  var o=document.getElementById('ngAppLoading');
  if(o) o.className='ngAppLoaded';

  // IE7 Fix redraw
  var fix7=document.body.offsetLeft;
}

function nga_DoRun()
{
  if(nga_RunTimer) clearTimeout(nga_RunTimer); nga_RunTimer=null;

  // Language detection
  var lng=ngVal(ngApp.StartParams.Lang,'');
  if(lng=='') lng=ngVal(ng_GET('lang'),'');

  if(lng=='cs') lng='cz';
  if((lng=='')||(typeof ngc_Lang[lng]==='undefined'))
  {
    if (navigator.userLanguage) // Explorer
      lng = navigator.userLanguage;
    else if (navigator.language) // FF
      lng = navigator.language;
    if(lng=='cs') lng='cz';
    if((lng=='')||(typeof ngc_Lang[lng]==='undefined'))
    {
      if((lng=='cz')&&(typeof ngc_Lang['sk']!=='undefined')) lng='sk';
      else
      {
        if((lng=='sk')&&(typeof ngc_Lang['cz']!=='undefined')) lng='cz';
        else lng='en';
      }
    }
  }
  ngApp.Lang=lng;

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
    var o=document.getElementById('ngAppLoading');
    if(o) o.style.display='none';

    alert(ng_sprintf(ngTxt('ngAppOldControlsVersion'),reqver,reqsubver,ngControlsVer,ngControlsSubVer));
    return;
  }

  ng_PreloadImagesBegin();
  ngControlImages=ng_URL(ngControlImages);
  ngInitUserControls();
  if(ngControlImages!='') ng_PreloadImage(ngControlImages);

  try{ window.focus(); } catch(e) { } // FF3 fix

  if(typeof ngInit === 'function') ngInit();
  ng_PreloadImagesEnd(nga_DoRunFinal);
}

function nga_Run()
{
  nga_RunTimer=setTimeout("nga_DoRun();",100);
}

function nga_SetTitle(t)
{
  if(ngVal(t,'')!='') { try { document.title=this.Text(t); } catch(e) { } }
}

function nga_MessageBox(text,yesno)
{
  if(!ngVal(yesno,false)) alert(this.Text(text));
  else return confirm(this.Text(text));
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

  if(!ngAutoResize) ngAutoResize=new Array();
  if(!ngAutoResizeRefs) ngAutoResizeRefs=new Array();
  if(typeof ngAutoResize[o.id] === 'undefined')
  {
    ngAutoResizeCnt++;
    ngAutoResize[o.id]=ngAutoRSync;
  }
  var r=ngAutoResizeRefs[o.id];
  if(typeof r === 'undefined')
  {
    r=new Array;
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
    if((ngAutoResize)&&(ngAutoResizeCnt>0)) ngAutoResizeTimer=setTimeout("nga_DoResize()", 100);
    return;
  }
  var ae=ngApp.Elm();
  if(ae)
  {
    if(ngApp.MobileKeyboardTimer) clearTimeout(ngApp.MobileKeyboardTimer);
    delete ngApp.MobileKeyboardTimer;

    var aw=ng_ClientWidth(ae);
    var ah=ng_ClientHeight(ae);
    if((aw===ngApp.LastResizeW)&&(ah===ngApp.LastResizeH)) return;

    ngApp.LastResizeW=aw;
    ngApp.LastResizeH=ah;
  }

  ngc_HidePopups();

  if(ngAutoResizeTimer) clearTimeout(ngAutoResizeTimer); ngAutoResizeTimer=null;
  if((ngApp.OnDeviceChanged)||((ngAutoResize)&&(ngAutoResizeCnt>0))) ngAutoResizeTimer=setTimeout("nga_DoResize()", 100);
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

  c=ngGetControlById(id);
  if(!c)
  {
    r=ng_Align(o);
    ngAutoResize[id]=ngAutoRSync;
    return;
  }
  po=c.ParentControl;
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

function nga_DoResize(e)
{
  if(ngAutoResizeTimer) clearTimeout(ngAutoResizeTimer); ngAutoResizeTimer=null;
  if((ngApp.OnDeviceChanged)&&(typeof ngDetectDevice === 'function'))
  {
    var device = ngDetectDevice();
    if(ngDevice!=device)
    {
      if(ngVal(ngApp.OnDeviceChanged(device),false))
        ngDevice=device;
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
      this.Params.lang=ngApp.Lang;
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
      if(typeof this.ParamInfo === 'undefined') this.ParamInfo=new Array();
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
  if(typeof this.ParamInfo === 'undefined') this.ParamInfo=new Array();
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
    if(v) this.ParamInfo = new Array();
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

  if(typeof this.ParamInfo === 'undefined') this.ParamInfo = new Array();
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
  var arr=new Array();
  if(url=='') return arr;
  var vars = url.split(septag);
  var s;
  for(var i=0;i<vars.length;i++)
  {
    s=vars[i].split('=');
    if(s[0].substr(0,4)=='amp;') s[0]=s[0].substr(4);
    arr[ ng_unescape(s[0]) ] = (s.length>1 ? s[1] : null);
  }
  return arr;
}

function nga_ParseParams(url)
{
  ngURLParams = new Array();
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
  if(typeof this.ParamInfo === 'undefined') this.ParamInfo = new Array();
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
    ngApp.LocationHash = params;
    try
    {
      window.location.hash=params;
    }
    catch(e)
    {
    }
    var o=document.getElementById('ngAppHistFix');
    if((o)&&(ngIExplorer)) nga_WriteIFRAMEHistory(o,params);
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
    if(ngIExplorer) // IE history fix (todo: check IE8)
    {
      o = document.createElement("iframe");
    }
    if(ngOpera) // Opera history fix
    {
      o=document.createElement("img");
      o.src="javascript:location.href='javascript:nga_CheckParamChange();';";
    }
    if(o)
    {
      var parent=(typeof ngApp !== 'undefined' ? ngApp.Elm() : document.body);

      o.id="ngAppHistFix";
      o.style.visibility="hidden";
      o.style.position="absolute";
      o.style.left="0px";
      o.style.top="0px";
      o.style.width="0px";
      o.style.height="0px";
      parent.appendChild(o);
      if(ngIExplorer) nga_WriteIFRAMEHistory(o, ngApp.LocationHash);
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
    apidock.Versions=new Array();
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
      ngApp.invokelater_timer=setTimeout("nga_ProcessInvokeLater()",1);
  }
}

function nga_InvokeLater(fnc)
{
  if(typeof fnc!=='function') return;

  if(!this.invokelater_timer)
    this.invokelater_timer=setTimeout("nga_ProcessInvokeLater()",1);
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
    var path=''+window.location.href;
    var i=path.lastIndexOf('#'); // strip parameters
    if(i>=0) path=path.substring(0,i);
    var i=path.lastIndexOf('?');
    if(i>=0) path=path.substring(0,i);
    i=path.lastIndexOf('.php');
    if(i<0) i=path.lastIndexOf('.html');
    if(i<0) i=path.lastIndexOf('.asp');
    if(i<0) i=path.lastIndexOf('.jsp');
    if(i>0) {
      i=path.lastIndexOf('/'); // strip script name
      if(i>0)
      {
        if(path.charAt(i-1)=='/') path+='/';
        else path=path.substring(0,i+1);
        this.AppPath=path;
      }
    }
    else
    {
      if(path.length>0)
      {
        if(path.charAt(path.length-1)!='/') path+='/';
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
  /*  Variable: ElmID
   *  ...
   *  Type: string
   */
  if(typeof elm==='object') elm=elm.id;
  this.ElmID = ngVal(elm,'ngApp');

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
   */
  this.Elm = nga_Elm;

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
   *  Event: OnDeviceChanged
   */
  this.OnDeviceChanged = null

  var ae=this.Elm();
  if(ae) {
    ngApp.LastResizeW=ng_ClientWidth(ae);
    ngApp.LastResizeH=ng_ClientHeight(ae);
  }
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
    if(typeof ngApp !== 'undefined') appid=ngApp.ElmID;
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

// --- ngPanel -----------------------------------------------------------------

function ngp_DoRelease(o)
{
  o.style.display='none';
}

/**
 *  Class: ngPanel
 *  This class implements a generic panel control.
 *
 *  Syntax:
 *    new *ngPanel* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */

function ngPanel(id)
{
  ngControl(this, id, 'ngPanel');
  this.DoRelease = ngp_DoRelease;
  ngControlCreated(this);
}

// --- ngFrame -----------------------------------------------------------------

/*  Class: ngFrame
 *  Standard frame control (based on <ngPanel>).
 */
/*
 *  Group: Definition
 */
/*  Variable: ParentReferences
 *  ...
 *  Type: bool
 *  Default value: *false*
 */
/*<>*/

function ngFrame_Create(def, ref, parent)
{
  def.ParentReferences=ngVal(def.ParentReferences, false);
  return ngCreateControlAsType(def, 'ngPanel', ref, parent);
}

// --- ngText ------------------------------------------------------------------

function ngt_DoCreate(d, ref, elm, parent)
{
  var as='';
  if((typeof d.W === 'undefined')&&((typeof d.L === 'undefined')||(typeof d.R === 'undefined')))
    as='horizontal';
  if((typeof d.H === 'undefined')&&((typeof d.T === 'undefined')||(typeof d.B === 'undefined')))
    as=(as == 'horizontal' ? 'auto' : 'vertical');

  if(as!='')
  {
    if((!d.Data)||(typeof d.Data.AutoSizeMode === 'undefined')) this.AutoSizeMode=as;
    if((!d.Data)||(typeof d.Data.AutoSize === 'undefined')) this.AutoSize=true;
  }
}

function ngt_DoUpdate(o)
{
  var cclass=this.BaseClassName;

  var text=this.GetText();
  var alt=this.GetAlt();
  if(this.HTMLEncode) text=ng_htmlEncode(text);

  if((this.AutoSize)&&(ngIExplorer)&&(ng_GetStylePx(o.style.height)==0)) o.style.height='1px';  // IE7 Measure fix

  var dstyle='';
  if((this.AutoSize)&&((this.AutoSizeMode=='auto')||(this.AutoSizeMode=='horizontal')))
    dstyle+='white-space: nowrap; ';
  if((!this.AutoSize)||(this.AutoSizeMode=='vertical')) dstyle+='width:'+ng_ClientWidth(o)+'px; ';
  if((!this.AutoSize)||(this.AutoSizeMode=='horizontal')) dstyle+='height:'+ng_ClientHeight(o)+'px; ';

  var html=new ngStringBuilder;
  html.append('<span id="'+this.ID+'_T" class="'+cclass+'Text'+(this.Enabled ? '': 'Disabled')+'" style="position:absolute;'+dstyle+'text-align:'+this.TextAlign+';"');
  if(alt!='') html.append(' title="'+ng_htmlEncode(alt)+'"');
  html.append('>');
  html.append(text);
  html.append('</span>');
  ng_SetInnerHTML(o,html.toString());
  if(this.AutoSize)
  {
    var o2=document.getElementById(this.ID+'_T');
    if(o2)
    {
      if((this.AutoSizeMode=='auto')||(this.AutoSizeMode=='horizontal'))
      {
        var tw=ng_ClientWidth(o2);
        if((typeof this.MinWidth !== 'undefined')&&(tw<this.MinWidth)) tw=this.MinWidth;
        ng_SetStyleWidth(o,tw);
        ng_SetStyleWidth(o2,tw);;
      }

      if((this.AutoSizeMode=='auto')||(this.AutoSizeMode=='vertical'))
      {
        var th=ng_ClientHeight(o2);
        if((typeof this.MinHeight !== 'undefined')&&(th<this.MinHeight)) th=this.MinHeight;
        ng_SetStyleHeight(o,th);
        ng_SetStyleHeight(o2,th);
      }
      var changed=false;
      if((typeof this.Bounds.T === 'undefined')||(typeof this.Bounds.B === 'undefined'))
      {
        var cbh=ng_StyleHeight(o);
        if(this.Bounds.H!=cbh)
        {
          this.Bounds.H=cbh;
          changed=true;
        }
      }
      if((typeof this.Bounds.L === 'undefined')||(typeof this.Bounds.R === 'undefined'))
      {
        var cbw=ng_StyleWidth(o);
        if(this.Bounds.W!=cbw)
        {
          this.Bounds.W=cbw;
          changed=true;
        }
      }
      if(changed) this.SetBounds();
    }
  }
  return true;
}

function ngt_DoPtrStart(pi)
{
  if((this.CanSelect)&&(pi.EventID=='control'))
  {
    pi.PreventDefault=false;
    pi.DocumentDeselect=false;
    pi.PreventSelect=false;
  }
  else pi.StopPropagation=false;
}

function ngt_DoAcceptGestures(o,gestures)
{
  gestures.touch=true;
}

/**
 *  Class: ngText
 *  This class implements a generic static text control.
 *
 *  Syntax:
 *    new *ngText* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */

function ngText(id)
{
  ngControl(this, id, 'ngText');
  this.DoCreate = ngt_DoCreate;
  this.DoUpdate = ngt_DoUpdate;
  this.DoPtrStart = ngt_DoPtrStart;
  this.DoAcceptGestures=ngt_DoAcceptGestures;

  /*
   *  Group: Properties
   */

  /*  Variable: TextAlign
   *  ...
   *  Type: string
   *  Default value: *'left'*
   */
  this.TextAlign = 'left';

  /*  Variable: AutoSize
   *  ...
   *  Type: bool
   */
  this.AutoSize = false;

  /*  Variable: AutoSizeMode
   *  ...
   *  Type: string
   *  Default value: *'auto'*
   */
  this.AutoSizeMode='auto';
  /*  Variable: MinWidth
   *  ...
   *  Type: integer
   *  Default value: *undefined*
   */
  // this.MinWidth = undefined;
  /*  Variable: MinHeight
   *  ...
   *  Type: integer
   *  Default value: *undefined*
   */
  // this.MinHeight = undefined;

  /*  Variable: Text
   *  ...
   *  Type: string
   */
  this.Text = '';

  /*  Variable: Alt
   *  ...
   *  Type: string
   */
  this.Alt = '';

  /*  Variable: HTMLEncode
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.HTMLEncode = false;
  /*  Variable: CanSelect
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.CanSelect = true;

  /*
   *  Group: Methods
   */
  /*  Function: SetText
   *  Sets new text content.
   *
   *  Syntax:
   *    void *SetText* (string text)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.SetText = ngc_SetText;
  /*  Function: GetText
   *  Gets text content.
   *
   *  Syntax:
   *    string *GetText* (void)
   *
   *  Returns:
   *    Text content.
   */
  this.GetText=ngc_GetText;

  /*  Function: GetAlt
   *  Gets alt text.
   *
   *  Syntax:
   *    string *GetAlt* (void)
   *
   *  Returns:
   *    Alt text.
   */
  this.GetAlt=ngc_GetAlt;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnSetText
   */
  this.OnSetText = null;
  /*
   *  Event: OnGetText
   */
  this.OnGetText = null;
  /*
   *  Event: OnGetAlt
   */
  this.OnGetAlt = null;

  ngControlCreated(this);
}

// --- ngImage -----------------------------------------------------------------

function ngi_DoCreate(d, ref, elm, parent)
{
  if(((typeof d.Data === 'undefined')||(typeof d.Data.AutoSize === 'undefined'))
   &&((typeof d.W !== 'undefined')||((typeof d.L !== 'undefined')&&(typeof d.R !== 'undefined')))
   &&((typeof d.H !== 'undefined')||((typeof d.T !== 'undefined')&&(typeof d.B !== 'undefined'))))
    this.AutoSize=false;
}

function ngi_DoUpdate(o)
{
  var alt=this.GetAlt();
  var image=this.GetImg();

  var html=new ngStringBuilder;
  if(image)
  {
    var dp=ngc_ImgProps(this.ID+'_I', 0, this.Enabled, image);
    if(typeof dp.W === 'undefined')
    {
      ngc_ImgSW(html,dp,0,ng_ClientWidth(o),"position:absolute;",(alt!='' ? 'title="'+ng_htmlEncode(alt)+'"' : '')+ngVal(image.Attrs,''));
      if(this.AutoSize)
      {
        ng_SetClientHeight(o,dp.H);
        var cbh=ng_StyleHeight(o);
        if(this.Bounds.H!=cbh)
        {
          this.Bounds.H=cbh;
          this.SetBounds();
        }
      }
    }
    else
    {
      if(typeof dp.H === 'undefined')
      {
        ngc_ImgSH(html,dp,0,ng_ClientHeight(o),"position:absolute;",(alt!='' ? 'title="'+ng_htmlEncode(alt)+'"' : '')+ngVal(image.Attrs,''));
        if(this.AutoSize)
        {
          ng_SetClientWidth(o,dp.W);
          var cbw=ng_StyleWidth(o);
          if(this.Bounds.W!=cbw)
          {
            this.Bounds.W=cbw;
            this.SetBounds();
          }
        }
      }
      else
      {
        ngc_Img(html,dp,"position:absolute;",(alt!='' ? 'title="'+ng_htmlEncode(alt)+'"' : '')+ngVal(image.Attrs,''));
        if(this.AutoSize)
        {
          ng_SetClientWidth(o,dp.W);
          ng_SetClientHeight(o,dp.H);
          var cbw=ng_StyleWidth(o);
          var cbh=ng_StyleHeight(o);
          if((this.Bounds.W!=cbw)||(this.Bounds.H!=cbh))
          {
            this.Bounds.W=cbw;
            this.Bounds.H=cbh;
            this.SetBounds();
          }
        }
      }
    }
  }
  ng_SetInnerHTML(o,html.toString());
  return true;
}

/**
 *  Class: ngImage
 *  This class implements a generic image control.
 *
 *  Syntax:
 *    new *ngImage* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngImage(id)
{
  ngControl(this, id, 'ngImage');
  this.DoCreate = ngi_DoCreate;
  this.DoUpdate = ngi_DoUpdate;

  /*
   *  Group: Properties
   */
  /*  Variable: Alt
   *  ...
   *  Type: string
   */
  this.Alt = '';
  /*  Variable: Img
   *  ...
   *  Type: object
   */
  this.Img = null;
  /*  Variable: AutoSize
   *  ...
   *  Type: bool
   */
  this.AutoSize = true;

  /*
   *  Group: Methods
   */
  /*  Function: GetAlt
   *  Gets alt text.
   *
   *  Syntax:
   *    string *GetAlt* (void)
   *
   *  Returns:
   *    Alt text.
   */
  this.GetAlt=ngc_GetAlt;

  /*  Function: GetImg
   *  Gets image.
   *
   *  Syntax:
   *    object *GetImg* (void)
   *
   *  Returns:
   *    The image.
   */
  this.GetImg=ngc_GetImg;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnGetAlt
   */
  this.OnGetAlt = null;
  /*
   *  Event: OnGetImg
   */
  this.OnGetImg = null;

  ngControlCreated(this);
}

// --- ngImageMap --------------------------------------------------------------

function ngimgmap_DoCreate(d, ref, elm, parent)
{
  if(((typeof d.W !== 'undefined')||((typeof d.L !== 'undefined')&&(typeof d.R !== 'undefined')))&&((typeof d.Data === 'undefined')||(typeof d.Data.AutoSize === 'undefined')))
    this.AutoSize=false;
}

function imgm_DoPtrStart(pi)
{
  var eid=pi.EventID;
  if(eid.substr(0,3)==='shp')
  {
    var inelm=pi.IsInSrcElement();
    if(!inelm) // elementFromPoint has problem to detect area elements (FireFox)
    {
      pi.SrcElement=document.getElementById(this.ID+'_HM');
    }
    if(pi.Touch) {
      var bi=parseInt(eid.substring(3,eid.length));
      imgm_EnterShape(this,bi);
      pi.InShapeElm=true;
    }
  }
}

function imgm_DoPtrDrag(pi)
{
  var eid=pi.EventID;
  if(eid.substr(0,3)==='shp')
  {
    if(pi.Touch)
    {
      var bi=parseInt(eid.substring(3,eid.length));
      var inelm=pi.IsInSrcElement();
      if((inelm)&&(!pi.InShapeElm))
      {
        imgm_EnterShape(this,bi);
        pi.InShapeElm=true;
      }
      else if((!inelm)&&(pi.InShapeElm))
      {
        imgm_LeaveShape(this,bi);
        pi.InShapeElm=false;
      }
    }
    return true;
  }
  return false;
}

function imgm_DoPtrEnd(pi)
{
  var eid=pi.EventID;
  if(eid.substr(0,3)==='shp')
  {
    if((pi.Touch)&&(pi.InShapeElm)) {
      var bi=parseInt(eid.substring(3,eid.length));
      imgm_LeaveShape(this,bi);
    }
    delete pi.InShapeElm;
  }
}

function imgm_DoPtrClick(pi)
{
  var eid=pi.EventID;
  if(eid.substr(0,3)==='shp')
  {
    if((pi.EndTime-pi.StartTime>=200)&&(!pi.IsInSrcElement())) return;
    var bi=parseInt(eid.substring(3,eid.length));
    var e=pi.Event;
    e.Owner=this;
    e.imap=this;
    e.imapshpidx=bi;
    if((bi>=0)&&(bi<this.Shapes.length))
    {
      var s=ngVal(this.Shapes[bi],null);
      e.imapshp=s;
      if((s)&&(s.OnClick)&&(!ngVal(s.OnClick(e),false))) return;
      if(this.OnShapeClick) this.OnShapeClick(e);
    }
  }
}

function imgm_LeaveShape(p,bi)
{
  if((bi>=0)&&(bi<p.Shapes.length))
  {
    var s=ngVal(p.Shapes[bi],null);
    ngc_ChangeImg(p.ID+'_I', 0, p.Enabled, p.GetImg());
    var o=p.Elm();
    try { if(o) o.style.cursor=ngVal(p.Cursor,'default'); } catch(e) { }

    if((s)&&(s.OnMouseLeave)&&(!ngVal(s.OnMouseLeave(s,p,bi),false))) return;
    if(p.OnMouseShapeLeave) p.OnMouseShapeLeave(p,bi);
  }
}

function imgm_EnterShape(p,bi)
{
  if((bi>=0)&&(bi<p.Shapes.length))
  {
    var s=ngVal(p.Shapes[bi],null);
    var img=(s ? ngVal(s.Img,null) : null);
    ngc_ChangeImg(p.ID+'_I', 0, p.Enabled, img);
    var clickev=((p.OnShapeClick)||((s)&&(s.OnClick)))&&(p.Enabled);
    var o=p.Elm();
    try { if(o) o.style.cursor=(s && s.Cursor ? s.Cursor : (clickev ? 'pointer' : 'default')); } catch(e) { }

    if((s)&&(s.OnMouseEnter)&&(!ngVal(s.OnMouseEnter(s,p,bi),false))) return;
    if(p.OnMouseShapeEnter) p.OnMouseShapeEnter(p,bi);
  }
}

function imgm_MO(e,o,id,bi)
{
  if(!e) e=windows.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  var p=ngGetControlById(id);
  if(p) imgm_EnterShape(p,bi)
}

function imgm_MU(e,o,id,bi)
{
  if(!e) e=windows.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  var p=ngGetControlById(id);
  if(p) imgm_LeaveShape(p,bi)
}

function imgm_nop() { }

function ngimgmap_DoMouseEnter(e, mi, elm)
{
  ngc_EnterImg(this.ID+'_I');
  if(this.OnMouseEnter) this.OnMouseEnter(this);
}

function ngimgmap_DoMouseLeave(e, mi)
{
  if(this.OnMouseLeave) this.OnMouseLeave(this);
  ngc_LeaveImg(this.ID+'_I');
  var o=this.Elm();
  try { if(o) o.style.cursor=ngVal(this.Cursor,'default'); } catch(e) { }
}

function ngimgmap_DoUpdate(o)
{
  var salt;

  var alt=this.GetAlt();
  var image=this.GetImg();

  var html=new ngStringBuilder;
  if(image)
  {
    var dp=ngc_ImgProps(this.ID+'_I', 0, this.Enabled, image);
    ngc_Img(html,dp,"position:absolute;",(alt!='' ? 'title="'+ng_htmlEncode(alt)+'"' : '')+ngVal(image.Attrs,''));
    if(this.AutoSize)
    {
      ng_SetClientWidth(o,dp.W);
      ng_SetClientHeight(o,dp.H);
      var cbw=ng_StyleWidth(o);
      var cbh=ng_StyleHeight(o);
      if((this.Bounds.W!=cbw)||(this.Bounds.H!=cbh))
      {
        this.Bounds.W=cbw;
        this.Bounds.H=cbh;
        this.SetBounds();
      }
    }
  }
  var w=ng_ClientWidth(o);
  var h=ng_ClientHeight(o);

  var imgmap=new ngStringBuilder();
  for(var i=0;i<this.Shapes.length;i++)
  {
    var s=this.Shapes[i];
    if(ngVal(s.Coords,'')=='') continue;

    if(this.OnGetShapeAlt) salt=ngVal(this.OnGetShapeAlt(this,i),'');
    else salt=ngVal(s.Alt,'');

    var clickev=((this.OnShapeClick)||(s.OnClick))&&(this.Enabled);
    imgmap.append('<area shape="'+ngVal(s.Shape,'rect')+'" coords="'+s.Coords+'" title="'+ng_htmlEncode(salt)+'"');
    if(clickev)
    {
      imgmap.append(' '+ngc_PtrEventsHTML(this,'shp'+i,'tap drag'));
    }
    imgmap.append(' onmouseover="imgm_MO(event,this,\''+this.ID+'\','+i+');" onmouseout="imgm_MU(event,this,\''+this.ID+'\','+i+')" />');
  }
  if(!imgmap.empty())
  {
    if(ngFireFox1x) imgmap.append('<area href="javascript:imgm_nop();" shape="rect" coords="0,0,'+w+','+h+'" />');

    html.append('<img id="'+this.ID+'_HM" src="'+ngEmptyURL+'" style="position:absolute; width:'+w+'px; height:'+h+'px; z-index: 10;" alt="'+ng_htmlEncode(alt)+'" border="0" usemap="#'+this.ID+'_IMAP" />');
    html.append('<map id="'+this.ID+'_IM" name="'+this.ID+'_IMAP">');
    html.append(imgmap);
    html.append('</map>');
  }
  ng_SetInnerHTML(o,html.toString());
  return true;
}

/**
 *  Class: ngImageMap
 *  This class implements a generic imagemap control.
 *
 *  Syntax:
 *    new *ngImageMap* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngImageMap(id)
{
  ngControl(this, id, 'ngImageMap');

  this.DoCreate = ngimgmap_DoCreate;
  this.DoUpdate = ngimgmap_DoUpdate;
  this.DoMouseEnter = ngimgmap_DoMouseEnter;
  this.DoMouseLeave = ngimgmap_DoMouseLeave;
  this.DoPtrStart = imgm_DoPtrStart;
  this.DoPtrDrag = imgm_DoPtrDrag;
  this.DoPtrEnd = imgm_DoPtrEnd;
  this.DoPtrClick = imgm_DoPtrClick;

  /*
   *  Group: Properties
   */
  /*  Variable: Alt
   *  ...
   *  Type: string
   */
  this.Alt = '';
  /*  Variable: Img
   *  ...
   *  Type: object
   */
  this.Img = null;
  /*  Variable: Cursor
   *  ...
   *  Type: string
   */
//  this.Cursor = undefined;
  /*  Variable: AutoSize
   *  ...
   *  Type: bool
   */
  this.AutoSize = true;

  /*  Variable: Shapes
   *  ...
   *  Type: array
   */
  this.Shapes = new Array();
  /*
   *  Group: Methods
   */
  /*  Function: GetAlt
   *  Gets alt text.
   *
   *  Syntax:
   *    string *GetAlt* (void)
   *
   *  Returns:
   *    Alt text.
   */
  this.GetAlt=ngc_GetAlt;

  /*  Function: GetImg
   *  Gets image.
   *
   *  Syntax:
   *    object *GetImg* (void)
   *
   *  Returns:
   *    The image.
   */
  this.GetImg=ngc_GetImg;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnGetAlt
   */
  this.OnGetAlt = null;
  /*
   *  Event: OnGetImg
   */
  this.OnGetImg = null;

  /*
   *  Event: OnGetShapeAlt
   */
  this.OnGetShapeAlt = null;

  /*
   *  Event: OnShapeClick
   */
  this.OnShapeClick = null;
  /*
   *  Event: OnMouseEnter
   */
  this.OnMouseEnter = null;
  /*
   *  Event: OnMouseLeave
   */
  this.OnMouseLeave = null;

  /*
   *  Event: OnMouseShapeEnter
   */
  this.OnMouseShapeEnter = null;
  /*
   *  Event: OnMouseShapeLeave
   */
  this.OnMouseShapeLeave = null;

  ngControlCreated(this);
}

// --- ngSysAction -------------------------------------------------------------

var ngact_RadioGroups = new Array();

function ngact_CheckRadioGroup()
{
  var state=ngVal(this.Checked,0);
  if((typeof this.RadioGroup !== 'undefined')&&(state)&&(ngact_RadioGroups[this.RadioGroup]!=this))
  {
    var uncheck=ngact_RadioGroups[this.RadioGroup];
    ngact_RadioGroups[this.RadioGroup]=this;
    if((uncheck)&&(typeof uncheck.Check==='function')) uncheck.Check(0);
  }
}

function ngact_Check(state)
{
  state=ngVal(state,1);
  if(ngVal(this.Checked,0)!=state)
  {
    this.Checked=state;
    if(this.OnCheckChanged) this.OnCheckChanged(this);
    if(this.Checked==state)
    {
      var cc=this.ActionControls;
      if(cc)
      {
        var c;
        this.in_action_check = true;
        for(var i=0;i<cc.length;i++)
        {
          c=cc[i];
          if(c.Control.ActionCheck) c.Control.ActionCheck(state, c.Data);
        }
        this.in_action_check = false;
      }
    }
  }
}

function ngact_Click(e)
{
  if(typeof e === 'undefined') e=new Object;
  e.Owner = this;
  e.action = this;
  if(!this.Enabled) return;
  if((this.OnClick)&&(!ngVal(this.OnClick(e),false))) return;

  var cc=this.ActionControls;
  if(cc)
  {
    var c;
    this.in_action_click = true;
    for(var i=0;i<cc.length;i++)
    {
      c=cc[i];
      if(c.Control.ActionClick) c.Control.ActionClick(e,c.Data);
    }
    this.in_action_click = false;
  }
}

function ngact_AddControl(ctrl,data)
{
  if(!ctrl) return;

  data=ngVal(data,null);
  if(!this.ActionControls) this.ActionControls=new Array();
  var cc=this.ActionControls;
  if(cc)
  {
    var c;
    for(var i=0;i<cc.length;i++)
    {
      c=cc[i];
      if((c.Control==ctrl)&&(c.Data==data)) return;
    }
    cc[cc.length] = { Control: ctrl, Data: data };
  }
}

function ngact_RemoveControl(ctrl, data)
{
  if((!ctrl)||(!this.ActionControls)) return;

  data=ngVal(data,null);
  var cc=this.ActionControls;
  if(cc)
  {
    var c;
    for(var i=cc.length-1;i>=0;i--)
    {
      c=cc[i];
      if((c.Control==ctrl)&&(c.Data==data)) cc.splice(i, 1);
    }
    if(!cc.length) this.ActionControls=null;
  }
}

function ngact_SetVisible(v)
{
  v=ngVal(v,true);
  if(this.Visible!=v)
  {
    if((this.OnSetVisible)&&(!ngVal(this.OnSetVisible(this,v),false))) return;
    this.Visible=v;
    if(this.OnVisibleChanged) this.OnVisibleChanged(this);
    if(this.Visible==v)
    {
      var cc=this.ActionControls;
      if(cc)
      {
        var c;
        this.in_action_visible = true;
        for(var i=0;i<cc.length;i++)
        {
          c=cc[i];
          if(c.Control.ActionSetVisible) c.Control.ActionSetVisible(v, c.Data);
        }
        this.in_action_visible = false;
      }
    }
  }
}

function ngact_Update()
{
  if((this.OnUpdate)&&(!ngVal(this.OnUpdate(this),false))) return;

  var cc=this.ActionControls;
  if(cc)
  {
    var c;
    for(var i=0;i<cc.length;i++)
    {
      c=cc[i];
      if(c.Control.ActionUpdate) c.Control.ActionUpdate(c.Data);
    }
  }

  if(this.OnUpdated) this.OnUpdated(this,null);
}

/**
 *  Class: ngSysAction
 *  This class implements action non-visual control.
 *
 *  Syntax:
 *    new *ngSysAction* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngSysAction(id, text)
{
  ngSysControl(this, id, 'ngSysAction');

  /*
   *  Group: Properties
   */
  /*  Variable: Text
   *  ...
   *  Type: string
   */
  this.Text = ngVal(text,'');

  /*  Variable: Alt
   *  ...
   *  Type: string
   */
  this.Alt = '';

  /*  Variable: Checked
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  //this.Checked = undefined;
  //optional:
  /*  Variable: RadioGroup
   *  ...
   *  Type: string
   *  Default value: *undefined*
   */
  // this.RadioGroup = undefined;

  /*  Variable: Img
   *  ...
   *  Type: object
   */
  //this.Img = undefined;
  /*  Variable: Visible
   *  Determines whether the control is visible.
   *  Type: bool
   */
  this.Visible = true;


  this.ActionControls = null;

  /*
   *  Group: Methods
   */
  /*  Function: Check
   *  Sets new button check state.
   *
   *  Syntax:
   *    void *Check* (int newval)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.Check = ngact_Check;

  /*  Function: Click
   *  Clicks the button.
   *
   *  Syntax:
   *    void *Click* ([event ev])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.Click = ngact_Click;

  /*  Function: SetText
   *  Sets new button text.
   *
   *  Syntax:
   *    void *SetText* (string text)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.SetText = ngc_SetText;

  this.Update = ngact_Update;
  this.GetImg = ngc_GetImg;
  this.GetText = ngc_GetText;
  this.GetAlt = ngc_GetAlt;
  this.SetVisible = ngact_SetVisible;
  this.AddControl = ngact_AddControl;
  this.RemoveControl = ngact_RemoveControl;
  this.CheckRadioGroup = ngact_CheckRadioGroup;
  this.in_action_check = false;
  this.in_action_click = false;
  this.in_action_visible = false;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnSetText
   */
  this.OnSetText = null;
  /*
   *  Event: OnGetText
   */
  this.OnGetText = null;
  /*
   *  Event: OnGetAlt
   */
  this.OnGetAlt = null;

  /*
   *  Event: OnCheckChanged
   */
  this.OnCheckChanged = null;

  /*
   *  Event: OnClick
   */
  this.OnClick = null;

  /*
   *  Event: OnGetImg
   */
  this.OnGetImg = null;
  /*
   *  Event: OnSetVisible
   */
  this.OnSetVisible     = null;
  /*
   *  Event: OnVisibleChanged
   */
  this.OnVisibleChanged = null;
  /*
   *  Event: OnUpdate
   */
  this.OnUpdate = null;

  ngControlCreated(this);
}

// --- ngButton ----------------------------------------------------------------

var ngb_RadioGroups = new Array();

function ngb_SimpleRect(b)
{
  var r=new Object;
  if(b.AutoSize)
  {
    var img;
    r.W=0;
    r.H=0;
    for(var j=-1;j<3;j++)
    {
      img=b.GetImg(j)
      if(!img) continue;
      if(j!=1) r.W+=img.W;
      if(img.H>r.H) r.H=img.H;
    }
  }
  else
  {
    r.W=b.Bounds.W;
    r.H=b.Bounds.H;
  }
  return r;
}

function ngb_GetClassName(cls)
{
  if(this.OnGetClassName)
  {
    var text=this.GetText();

    var c=this.OnGetClassName(this, cls, text);
    if(ngVal(c,'')!='') cls=c;
  }
  if(!this.Enabled) cls+='Disabled';
  else
  {
    switch(this.Checked)
    {
      case true:
      case 1: cls+='Checked'; break;
      case 2: cls+='Grayed'; break;
    }
  }
  return this.BaseClassName+cls;
}

function ngb_Check(state)
{
  var action = this.GetAction();
  if((action)&&(!action.in_action_check))
  {
    action.Check(state);
    return;
  }
  state=ngVal(state,1);
  if(ngVal(this.Checked,0)!=state)
  {
    this.Checked=state;
    if(this.OnCheckChanged) this.OnCheckChanged(this);
    if(this.Checked==state) this.Update();
  }
}

function ngb_Click(e)
{
  var action = this.GetAction();
  if((action)&&(!action.in_action_click))
  {
    action.Click(e);
    return;
  }

  if(typeof e === 'undefined') e=new Object;
  e.Owner = this;
  e.btn = this;

  if((!this.Enabled)||(ngVal(this.ReadOnly,false))) return;
  if((this.OnClick)&&(!ngVal(this.OnClick(e),false))) return;
}

function ngb_GetClickInfo(e,elm)
{
  e.Owner=ngGetControlByElement(elm,'ngButton');
  e.btn=e.Owner;
  e.btnObj=elm;
}

function ngb_GetImg(idx)
{
  var image=null;
  if(this.OnGetImg) image=this.OnGetImg(this, idx);
  else
  {
    switch(idx)
    {
      case -1: image=this.Img; break;
      case 0: image=this.LeftImg; break;
      case 1: image=this.MiddleImg; break;
      case 2: image=this.RightImg; break;
    }
  }
  return ngVal(image,null);
}

function ngb_DoCreate(d, ref, elm, parent)
{
  if(((typeof d.W !== 'undefined')||((typeof d.L !== 'undefined')&&(typeof d.R !== 'undefined')))&&((typeof d.Data === 'undefined')||(typeof d.Data.AutoSize === 'undefined')))
    this.AutoSize=false;
}

function ngb_SetAction(ac)
{
  if(typeof ac === 'string')
  {
    ac=ngGetControlById(ac);
    if(!ac) return null;
  }
  ac=ngVal(ac,null);

  var oac=ngVal(this.Action,null);
  if(oac == ac) return ac;

  if((oac)&&(oac.RemoveControl)) oac.RemoveControl(this);
  this.Action=ac;
  if((ac)&&(ac.AddControl)) ac.AddControl(this);
  this.SyncAction();
  this.Update();
  return ac;
}

function ngb_GetAction()
{
  var ac=ngVal(this.Action,null);
  if(typeof ac === 'string') ac=this.SetAction(ac);
  return ac;
}

function ngb_SyncAction(action)
{
  if(typeof action === 'undefined') action = this.GetAction();
  if(action)
  {
    this.Visible = action.Visible;
    this.Enabled = action.Enabled;
    this.Checked = action.Checked;
    this.Img = action.GetImg();
    this.Text = action.GetText();
    this.Alt = action.GetAlt();
  }
}

function ngb_DoUpdate(o)
{
  var action = this.GetAction();
  this.SyncAction(action);

  var cclass=this.BaseClassName;

  var state=ngVal(this.Checked,0);
  var imgstate=state;
  if(action) action.CheckRadioGroup();
  else
    if((typeof this.RadioGroup !== 'undefined')&&(state)&&(ngb_RadioGroups[this.RadioGroup]!=this))
    {
      var uncheck=ngb_RadioGroups[this.RadioGroup];
      ngb_RadioGroups[this.RadioGroup]=this;
      if(uncheck && typeof uncheck.Check=='function') uncheck.Check(0);
    }

  var html=new ngStringBuilder;
  var image,dp,bdp,event;
  if((ngIExplorer)&&(ng_GetStylePx(o.style.height)==0)) o.style.height='1px';  // IE7 Measure fix
  var w=ng_ClientWidth(o),aw=-1,tw=0,ctw=0,th=0,lw=0,rw=0;

  var text=this.GetText();
  var alt=this.GetAlt();
  if(this.HTMLEncode) text=ng_htmlEncode(text);

  var btnimage=this.GetImg(-1);
  if(btnimage)
  {
    bdp=ngc_ImgProps(this.ID+'_I', imgstate, this.Enabled, btnimage);
    if(bdp.H>th) th=bdp.H;
  }

  var txtclass=this.GetClassName('Btn');

  // Measure text
  if(text!='')
  {
    ng_SetInnerHTML(o,'<div id="'+this.ID+'_T" class="'+txtclass+'" style="position:absolute; visibility: hidden; white-space: nowrap;"><div class="'+cclass+'Text">'+text+'</div></div>');
    var o2=document.getElementById(this.ID+'_T');
    if(o2)
    {
      ng_BeginMeasureElement(o2);
      ctw=ng_ClientWidth(o2)
      tw=ng_OuterWidth(o2);
      var mh=ng_OuterHeight(o2);
      ng_EndMeasureElement(o2);
      if(mh>th) th=mh;
    }
  }
  if(this.AutoSize)
  {
    aw=tw;
    if(btnimage) aw+=this.ImgIndent+bdp.W;
  }

  var images=null;
  image=this.GetImg(0);
  if(image)
  {
    if(!images) images=new ngStringBuilder;
    dp=ngc_ImgProps(this.ID+'_IL', imgstate, this.Enabled, image);
    ngc_Img(images,dp,"position:absolute; left: 0px;",ngVal(image.Attrs,''));
    lw=dp.W;
    if(dp.H>th) th=dp.H;
  }

  image=this.GetImg(2);
  if(image)
  {
    if(!images) images=new ngStringBuilder;
    dp=ngc_ImgProps(this.ID+'_IR', imgstate, this.Enabled, image);
    rw=dp.W;
  }

  var bw=(aw>=0 ? aw+lw+rw : w);
  if((typeof this.MinWidth !== 'undefined')&&(bw<this.MinWidth))
  {
    bw=this.MinWidth;
    if(aw>=0) aw=bw-lw-rw;
  }

  if(image)
  {
    ngc_Img(images,dp,"position:absolute; left: "+(aw>=0 ? lw+aw : (bw-rw))+"px;",ngVal(image.Attrs,''));
    if(dp.H>th) th=dp.H;
  }

  image=this.GetImg(1);
  if(image)
  {
    if(!images) images=new ngStringBuilder;
    dp=ngc_ImgProps(this.ID+'_IM', imgstate, this.Enabled, image);
    ngc_ImgSW(images,dp,lw,(aw>=0 ? aw : bw-lw-rw),'',ngVal(image.Attrs,''));
    if(dp.H>th) th=dp.H;
  }

  var hasclick=(this.Enabled)&&(action ? (action.OnClick)||(this.OnClick) : this.OnClick);
  var hasdblclick=(this.OnDblClick)&&(this.Enabled);
  var gestures='';
  if(hasclick) gestures='tap';
  if(hasdblclick)
  {
    if(gestures!='') gestures+=' ';
    gestures+='doubletap';
  }
  html.append('<span '+ngc_PtrEventsHTML(this,'btn',gestures)+(alt!='' ? ' title="'+ng_htmlEncode(alt)+'"' : '')+' style="position:absolute; left:0px;top:0px;width:'+bw+'px;height:'+th+'px;');
  if(typeof this.Cursor !== 'undefined')
  {
    if(this.Cursor!='') html.append('cursor:'+this.Cursor+';');
  }
  else html.append(hasclick || hasdblclick ? 'cursor:pointer;' : 'cursor:default;');
  html.append('">');
  if(btnimage)
  {
    var l=0,il;
    switch(this.TextAlign)
    {
      case 'right':
        if(this.ImgAlign=='right') { l=bw-rw-tw-bdp.W-this.ImgIndent; il=bw-rw-bdp.W; }
        else { il=bw-rw-tw-bdp.W-this.ImgIndent; l=bw-rw-tw;  }
        break;
      case 'center':
        l=Math.round((bw-(tw+this.ImgIndent+bdp.W))/2);
        if(this.ImgAlign=='right') { il=l+tw+this.ImgIndent; }
        else { il=l; l+=this.ImgIndent+bdp.W; }
        break;
      default:
        if(this.ImgAlign=='right') { l=lw; il=lw+tw+this.ImgIndent; }
        else { il=lw; l=lw+bdp.W+this.ImgIndent; }
        break;
    }
    html.append('<span id="'+this.ID+'_T" class="'+txtclass+'" style="white-space: nowrap;position: absolute; z-index:1;left:'+l+'px;top:0px;width:'+(aw-(tw-ctw)-bdp.W-this.ImgIndent)+'px;'+(th>0 ? 'line-height: '+th+'px;' : '')+'"><div class="'+cclass+'Text">'+text+'</div></span>');
    ngc_Img(html,bdp,"position:absolute;z-index:1;left: "+il+"px;top:"+Math.round((th-bdp.H)/2)+"px;",'');
  }
  else html.append('<span id="'+this.ID+'_T" class="'+txtclass+'" style="white-space: nowrap;text-align:'+this.TextAlign+';position: absolute; z-index:1;left:0px;top:0px;width:'+(bw-(tw-ctw))+'px;'+(th>0 ? 'line-height: '+th+'px;' : '')+'"><div class="'+cclass+'Text">'+text+'</div></span>');
  if(images)
  {
    html.append('<span style="position: absolute;z-index:0;left:0px;">');
    html.append(images);
    html.append('</span>');
  }
  html.append('</span>');
  ng_SetInnerHTML(o,html.toString());

  var cbw=this.Bounds.W;
  if(this.AutoSize)
  {
    if(ng_ClientWidth(o)!=bw)
    {
      ng_SetClientWidth(o,bw);
      cbw=ng_StyleWidth(o);
    }
  }
  ng_SetClientHeight(o,th);
  var cbh=ng_StyleHeight(o);
  if((cbw!=this.Bounds.W)||(cbh!=this.Bounds.H))
  {
    this.Bounds.W=cbw;
    this.Bounds.H=cbh;
    this.SetBounds();
  }
  return true;
}

function ngb_DoMouseEnter(e, mi, elm)
{
  var o=document.getElementById(this.ID+'_T');
  if(o)
  {
    var cn=o.className;
    var i=cn.indexOf('_Focus');
    if(i<0) cn=cn+'_Focus';
    o.className=cn;
  }
  ngc_EnterImg(this.ID+'_I');
  ngc_EnterImg(this.ID+'_IL');
  ngc_EnterImgS(this.ID+'_IM');
  ngc_EnterImg(this.ID+'_IR');
  if(this.OnMouseEnter) this.OnMouseEnter(this);
}

function ngb_DoMouseLeave(e, mi)
{
  if(this.OnMouseLeave) this.OnMouseLeave(this);

  var o=document.getElementById(this.ID+'_T');
  if(o)
  {
    var cn=o.className;
    var i=cn.indexOf('_Focus');
    if(i>=0) cn=cn.substring(0,i);
    o.className=cn;
  }
  ngc_LeaveImg(this.ID+'_I');
  ngc_LeaveImg(this.ID+'_IL');
  ngc_LeaveImgS(this.ID+'_IM');
  ngc_LeaveImg(this.ID+'_IR');
}

function ngb_DoPtrClick(pi)
{
  if(pi.EventID!=='btn') return;
  ngb_GetClickInfo(pi.Event,pi.StartElement);
  this.Click(pi.Event);
}

function ngb_DoPtrDblClick(pi)
{
  if(pi.EventID!=='btn') return;
  ngb_GetClickInfo(pi.Event,pi.StartElement);
  if(this.OnDblClick) this.OnDblClick(pi.Event);
}

function ngb_SetText(text)
{
  var action = this.GetAction();
  if(action)
  {
    action.SetText(text);
    return;
  }

  if(this.OnSetText) text=this.OnSetText(text,this);
  if(text!=this.Text)
  {
    this.Text=text;
    this.Update();
  }
}

function ngb_SetVisible(s)
{
  var action = this.GetAction();
  if((action)&&(!action.in_action_visible))
  {
    action.SetVisible(s);
    return;
  }
  this.DefaultSetVisible(s);
}

function ngb_SetEnabled(s)
{
  var action = this.GetAction();
  if(action)
  {
    action.SetEnabled(s);
    return;
  }
  this.DefaultSetEnabled(s);
}

/**
 *  Class: ngButton
 *  This class implements a generic button control.
 *
 *  Syntax:
 *    new *ngButton* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngButton(id, text)
{
  ngControl(this, id, 'ngButton');

  /*
   *  Group: Properties
   */
  /*  Variable: Action
   *  ...
   *  Type: mixed
   */
  this.Action = null;
  /*  Variable: Text
   *  ...
   *  Type: string
   */
  this.Text = ngVal(text,'');

  /*  Variable: TextAlign
   *  ...
   *  Type: string
   *  Default value: 'center'
   */
  this.TextAlign = 'center';

  /*  Variable: Alt
   *  ...
   *  Type: string
   */
  this.Alt = '';

  /*  Variable: HTMLEncode
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.HTMLEncode = false;

  /*  Variable: AutoSize
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.AutoSize = true;
  /*  Variable: MinWidth
   *  ...
   *  Type: integer
   *  Default value: *undefined*
   */
  // this.MinWidth = undefined;

  /*  Variable: Checked
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.Checked = 0;
  //optional:
  /*  Variable: RadioGroup
   *  ...
   *  Type: string
   *  Default value: *undefined*
   */
  // this.RadioGroup = undefined;

  /*  Variable: Cursor
   *  ...
   *  Type: string
   *  Default value: *'pointer'*
   */
  // this.Cursor = 'pointer';

  /*  Variable: ReadOnly
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  // this.ReadOnly = false;

  this.DoMouseEnter = ngb_DoMouseEnter;
  this.DoMouseLeave = ngb_DoMouseLeave;
  this.DoPtrClick = ngb_DoPtrClick;
  this.DoPtrDblClick = ngb_DoPtrDblClick;

  /*  Variable: Img
   *  ...
   *  Type: object
   */
  this.Img = null;
  /*  Variable: ImgAlign
   *  ...
   *  Type: string
   *  Default value: *'left'*
   */
  this.ImgAlign = 'left';

  /*  Variable: ImgIndent
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.ImgIndent = 0;

  /*  Variable: LeftImg
   *  ...
   *  Type: object
   */
  this.LeftImg = null;

  /*  Variable: MiddleImg
   *  ...
   *  Type: object
   */
  this.MiddleImg = null;

  /*  Variable: RightImg
   *  ...
   *  Type: object
   */
  this.RightImg = null;

  /*
   *  Group: Methods
   */
  /*  Function: Check
   *  Sets new button check state.
   *
   *  Syntax:
   *    void *Check* (int newval)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.Check = ngb_Check;

  /*  Function: Click
   *  Clicks the button.
   *
   *  Syntax:
   *    void *Click* ([event ev])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.Click = ngb_Click;

  /*  Function: SetText
   *  Sets new button text.
   *
   *  Syntax:
   *    void *SetText* (string text)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.SetText = ngb_SetText;
  /*  Function: GetText
   *  Gets text content.
   *
   *  Syntax:
   *    string *GetText* (void)
   *
   *  Returns:
   *    Text content.
   */
  this.GetText=ngc_GetText;

  /*  Function: GetAlt
   *  Gets alt text.
   *
   *  Syntax:
   *    string *GetAlt* (void)
   *
   *  Returns:
   *    Alt text.
   */
  this.GetAlt=ngc_GetAlt;

  this.GetImg = ngb_GetImg;
  this.GetClassName = ngb_GetClassName;
  this.DoCreate = ngb_DoCreate;
  this.DoUpdate = ngb_DoUpdate;
  this.DefaultSetVisible = this.SetVisible;
  this.SetVisible = ngb_SetVisible;
  this.DefaultSetEnabled = this.SetEnabled;
  this.SetEnabled = ngb_SetEnabled;

  this.GetAction = ngb_GetAction;
  this.SetAction = ngb_SetAction;
  this.SyncAction = ngb_SyncAction;
  this.ActionSetVisible = this.SetVisible;
  this.ActionCheck = this.Check;
  this.ActionClick = this.Click;
  this.ActionUpdate = this.Update;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnSetText
   */
  this.OnSetText = null;
  /*
   *  Event: OnGetText
   */
  this.OnGetText = null;
  /*
   *  Event: OnGetAlt
   */
  this.OnGetAlt = null;

  /*
   *  Event: OnCheckChanged
   */
  this.OnCheckChanged = null;

  /*
   *  Event: OnDblClick
   */
  this.OnDblClick = null;
  /*
   *  Event: OnClick
   */
  this.OnClick = null;

  /*
   *  Event: OnMouseEnter
   */
  this.OnMouseEnter = null;
  /*
   *  Event: OnMouseLeave
   */
  this.OnMouseLeave = null;

  /*
   *  Event: OnGetImg
   */
  this.OnGetImg = null;

  /*
   *  Event: OnGetClassName
   */
  this.OnGetClassName = null;

  ngControlCreated(this);
}

// --- ngCheckBox --------------------------------------------------------------

/*  Class: ngCheckBox
 *  Standard check box control (based on <ngButton>).
 */
/*
 *  Group: Properties
 */
/*  Variable: AllowGrayed
 *  ...
 *  Type: bool
 *  Default value: *false*
 */
/*<>*/

/*  Class: ngRadioButton
 *  Standard radio button control (based on <ngButton>).
 */
/*
 *  Group: Properties
 */
/*  Variable: AllowGrayed
 *  ...
 *  Type: bool
 *  Default value: *false*
 */
/*<>*/

function ngRadioCheckBox_Create(d, ref, parent)
{
  var c=ngCreateControlAsType(d, 'ngButton', ref, parent);
  if(!c) return c;
  c.OnClick = function(e)
  {
    var b=e.Owner;
    if((!b)||(b.Action)) return;
    if(typeof b.RadioGroup !== 'undefined') b.Check(1);
    else
    {
      var s=ngVal(b.Checked,0);
      switch(s)
      {
        case 0:
        case false:
          if(ngVal(b.AllowGrayed,false)) s=2;
          else s=1;
          break;
        case 1:
        case true:
          s=0;
          break;
        default:
          s=1;
          break;
      }
      b.Check(s);
    }
  }
  if(typeof c.ReadOnly === 'undefined')    c.ReadOnly=false;
  if(typeof c.AllowGrayed === 'undefined') c.AllowGrayed=false;
  if((d.Type == 'ngRadioButton')&&(typeof c.RadioGroup === 'undefined')) c.RadioGroup='default';
  return c;
}

// --- ngGroup ------------------------------------------------------------------

function ngg_DoUpdate(o)
{
  var cclass=this.BaseClassName;

  var frame=document.getElementById(this.ID+'_F');
  if(!frame) return true;

  var html=new ngStringBuilder;
  var w=ng_ClientWidth(o);
  var h=ng_ClientHeight(o);
  var l=0,t=0;

  var text=this.GetText();
  if(this.HTMLEncode) text=ng_htmlEncode(text);

  var dp=new Object;
  ngc_ImgBox(html, this.ID, 'ngGroup', 0, this.Enabled, 0,0,w,h,false, this.Frame, '', '', undefined, dp);

  if(this.ControlsInside)
  {
    this.ControlsPanel.Bounds.T=dp.Top.H;
    this.ControlsPanel.Bounds.L=dp.Left.W;
    this.ControlsPanel.Bounds.R=dp.Right.W;
    this.ControlsPanel.Bounds.B=dp.Bottom.H;
  }
  else
  {
    this.ControlsPanel.Bounds.T=0;
    this.ControlsPanel.Bounds.L=0;
    this.ControlsPanel.Bounds.R=0;
    this.ControlsPanel.Bounds.B=0;
  }
  this.ControlsPanel.SetBounds();

  if(text!='') html.append('<div id="'+this.ID+'_C" class="'+cclass+(this.Enabled ? "Caption" : "CaptionDisabled")+'" style="position: absolute; left: '+l+'px;top: '+t+'px;">'+text+'</div>');
  ng_SetInnerHTML(frame,html.toString());
  return true;
}

function ngg_SetClientRect(v)
{
  if(!ngVal(v,false)) return;

  var noimg = {L:0,T:0,aL:0,aT:0,oT:0,oL:0,W:0,H:0};
  var dp=new Object;

  if(typeof v.W !== 'undefined')
  {
    dp.Left =((!this.ControlsInside) || typeof this.Frame.Left == 'undefined' ? noimg : ngc_ImgProps(this.ID+'_L', 0, this.Enabled, this.Frame.Left));
    dp.Right =((!this.ControlsInside) || typeof this.Frame.Right == 'undefined' ? noimg : ngc_ImgProps(this.ID+'_R', 0, this.Enabled, this.Frame.Right));
    this.Bounds.W=v.W+dp.Left.W+dp.Right.W;
    delete this.Bounds.R;
  }

  if(typeof v.H !== 'undefined')
  {
    dp.Top =((!this.ControlsInside) || typeof this.Frame.Top == 'undefined' ? noimg : ngc_ImgProps(this.ID+'_B', 0, this.Enabled, this.Frame.Top));
    dp.Bottom =((!this.ControlsInside) || typeof this.Frame.Bottom == 'undefined' ? noimg : ngc_ImgProps(this.ID+'_B', 0, this.Enabled, this.Frame.Bottom));

    this.Bounds.H=v.H+dp.Top.H+dp.Bottom.H;
    delete this.Bounds.B;
  }
}

function ngg_GetClientRect()
{
  var w,h;
  if(ngVal(this.ControlsPanel,false))
  {
    var o=this.ControlsPanel.Elm();
    if(o)
    {
      w=ng_ClientWidth(o);
      h=ng_ClientHeight(o);
    }
  }
  return { W: w, H: h};
}

function ngg_DoRelease(o)
{
  o.style.display='none';
  var frame=document.getElementById(this.ID+'_F');
  if(frame) ng_SetInnerHTML(frame,'');
}

function ngg_DoCreate(def, ref, elm, parent)
{
  var cclass=this.BaseClassName;

  if((typeof def.CW !== 'undefined')||(typeof def.CH !== 'undefined'))
  {
    this.SetClientRect({W: def.CW, H: def.CH});
    this.SetBounds();
  }
  var ldefs=new Object;
  if(typeof def.ControlsPanel === 'object') ldefs.ControlsPanel = ng_CopyVar(def.ControlsPanel);
  else ldefs.ControlsPanel = new Object;
  ng_MergeDef(ldefs.ControlsPanel, {
    Type: 'ngPanel',
    className: cclass+'ControlsPanel',
    id: this.ID+'_P',
    ScrollBars: ssAuto,
    L:0,T:0,R:0,B:0
  });
  ldefs.ControlsPanel.Controls=def.Controls;
  ldefs.ControlsPanel.ModifyControls=def.ModifyControls;

  var lref=ngCreateControls(ldefs,undefined,this.ID);
  if(!ngVal(def.ParentReferences,true))
  {
    this.Controls = new Object;
    this.Controls.Owner = this;
    this.Controls.AddControls = function(defs, newparent) { ngCreateControls(defs,this,ngVal(newparent,ldefs.ControlsPanel.id)); }
    ref=this.Controls;
  }
  this.ControlsPanel=lref.ControlsPanel;
  this.ControlsPanel.Owner=this;
  delete lref.ControlsPanel;
  ngCloneRefs(ref,lref);

  delete def.Controls;
  delete def.ModifyControls;

  var nd=document.createElement('div');
  nd.id=this.ID+'_F';
  nd.style.position="absolute";
  nd.style.zIndex="800";
  elm.appendChild(nd);
//  ng_AppendInnerHTML(elm,'<div id="'+this.ID+'_F" style="position: absolute;z-index:800;"></div>');
}

/**
 *  Class: ngGroup
 *  This class implements a generic group control.
 *
 *  Syntax:
 *    new *ngGroup* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngGroup(id)
{
  ngControl(this, id, 'ngGroup');

  /*
   *  Group: Definition
   */
  /*
   *  Variable: CW
   *  ClientRect width.
   *  Type: integer
   */
  /*<>*/
  /*
   *  Variable: CH
   *  ClientRect height.
   *  Type: integer
   */
  /*<>*/
  /*
   *  Variable: ControlsPanel
   *  Controls panel definition.
   *  Type: object
   */
  /*<>*/
  /*
   *  Group: Properties
   */
  /*  Variable: Text
   *  ...
   *  Type: string
   */
  this.Text = '';
  /*  Variable: HTMLEncode
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.HTMLEncode = false;
  /*  Variable: Frame
   *  ...
   *  Type: object
   */
  this.Frame = new Object;
  /*  Variable: ControlsInside
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.ControlsInside = true;

  /*
   *  Group: Methods
   */
  /*  Function: GetText
   *  Gets text content.
   *
   *  Syntax:
   *    string *GetText* (void)
   *
   *  Returns:
   *    Text content.
   */
  this.GetText=ngc_GetText;
  /*  Function: GetClientRect
   *  Gets client rectangle dimensions.
   *
   *  Syntax:
   *    object *GetClientRect* ()
   *
   *  Returns:
   *    Rectangle dimensions in format { W: width, H: height }.
   */
  this.GetClientRect = ngg_GetClientRect;

  /*  Function: SetClientRect
   *  Sets client rectangle dimensions.
   *
   *  Syntax:
   *    void *SetClientRect* (object rect)
   *
   *  Parameters:
   *    rect - { W: width, H: height }
   *  Returns:
   *    -
   */
  this.SetClientRect = ngg_SetClientRect;

  this.DoCreate = ngg_DoCreate;
  this.DoRelease = ngg_DoRelease;
  this.DoUpdate = ngg_DoUpdate;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnGetText
   */
  this.OnGetText = null;

  ngControlCreated(this);
}

// --- ngEdit ------------------------------------------------------------------

var ngHintHideOnFocus = 0;
var ngHintHideOnInput = 1;

var ngDefaultHintStyle; // = undefined... autodetect by platform;

var ngeDropDownEdit = 0;
var ngeDropDownList = 1;

var KEY_BACK = 8;
var KEY_TAB = 9;
var KEY_RETURN = 13;
var KEY_SHIFT = 16;
var KEY_CONTROL = 17;
var KEY_MENU = 18;
var KEY_PAUSE = 19;
var KEY_CAPITAL = 20;
var KEY_ESC = 27;
var KEY_PRIOR = 33;
var KEY_NEXT = 34;
var KEY_HOME = 35;
var KEY_END = 36;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_INSERT = 45;
var KEY_DELETE = 46;
var KEY_LWIN = 91;
var KEY_RWIN = 92;
var KEY_APPS = 93;
var KEY_NUMPAD0 = 96;
var KEY_NUMPAD1 = 97;
var KEY_NUMPAD2 = 98;
var KEY_NUMPAD3 = 99;
var KEY_NUMPAD4 = 100;
var KEY_NUMPAD5 = 101;
var KEY_NUMPAD6 = 102;
var KEY_NUMPAD7 = 103;
var KEY_NUMPAD8 = 104;
var KEY_NUMPAD9 = 105;
var KEY_MULTIPLY = 106;
var KEY_ADD = 107;
var KEY_SUBSTRACT = 109;
var KEY_DECIMAL = 110;
var KEY_DIVIDE = 111;
var KEY_F1 = 112;
var KEY_F2 = 113;
var KEY_F3 = 114;
var KEY_F4 = 115;
var KEY_F5 = 116;
var KEY_F6 = 117;
var KEY_F7 = 118;
var KEY_F8 = 119;
var KEY_F9 = 120;
var KEY_F10 = 121;
var KEY_F11 = 122;
var KEY_F12 = 123;
var KEY_NUMLOCK = 144;
var KEY_SCROLL = 145;

function nge_HintStyle(c)
{
  // FireFox on Android doesn't process key events :(
  // therefore hint must be hidden on focus.
  // Default browser and Doplhin has problems with hint style, phone keyboard and showing keyboard
  if((ngAndroid)&&(!ngChrome)) return ngHintHideOnFocus;

  // Password requires input type changing which cause to lose caret position,
  // thus hint style must be ngHintHideOnFocus.
  if(c)
  {
    if(c.Password) return ngHintHideOnFocus;
    if((c.MaxLength>0)&&(ngWindowsPhone)) return ngHintHideOnFocus; // Windows Phone doesn't handle dynamic changing of length attribute properly
    if(typeof c.HintStyle!=='undefined') return c.HintStyle;
  }
  if(typeof ngDefaultHintStyle!=='undefined') return ngDefaultHintStyle;

  return ngHintHideOnInput;
}

function nge_SuggestionResults(id,txt,data)
{
  var c=ngGetControlById(id);
  if((!c)||(!ngVal(c.Suggestion,false))) return;

  if(txt!=c.GetText()) return;

  var dd=c.DropDownControl;
  if(!dd) return;

  if((c.OnSuggestionData)&&(!ngVal(c.OnSuggestionData(c,txt,data),false))) return;

  if(c.OnSuggestionResults)
  {
    var res=new Object;
    res.found=false;
    res.needupdate=false;

    if(!ngVal(c.OnSuggestionResults(c,txt,data,res),false)) return;

    if((dd.Visible)&&(res.needupdate)&&(res.found))
    {
      dd.SetItemFocus(null);
      dd.Update();
    }
    c.SuggestionFound=res.found;
  }
  else
  {
    if((typeof data==='undefined')||(data.length==0)) c.SuggestionFound=false;
    else
    {
      dd.Clear();
      dd.AddItems(data);
      if(dd.Visible)
      {
        dd.SetItemFocus(null);
        dd.Update();
      }
      c.SuggestionFound=true;
    }
  }
  if(c.SuggestionFound)
  {
    var dd=c.DropDownControl;
    if(dd) dd.SetItemFocus(null);
    c.DropDown();
  }
  else
  {
    c.HideDropDown();
  }
}

function nge_Suggestion(id)
{
  var c=ngGetControlById(id);
  if((!c)||(!ngVal(c.Suggestion,false))) return;
  if(c.SuggestionTimer) clearTimeout(c.SuggestionTimer);
  c.SuggestionTimer=null;

  var txt=c.GetText();
  if(txt=='') { c.HideDropDown(); c.SuggestionLastSearch=''; return; }
  if(ngVal(c.SuggestionLastSearch,'')!=txt)
  {
    if(c.OnSuggestionSearch)
    {
      var res=new Object;
      res.found=false;
      res.needupdate=false;

      if(!ngVal(c.OnSuggestionSearch(c,txt,res),false)) return;

      var dd=c.DropDownControl;
      if((dd)&&(dd.Visible)&&(res.needupdate)&&(res.found))
      {
        dd.SetItemFocus(null);
        dd.Update();
      }
      c.SuggestionFound=res.found;
      c.SuggestionLastSearch=txt;
    }
    else
    {
      c.SuggestionLastSearch=txt;

      var url=ngVal(c.SuggestionURL,'');
      var ignorecase=ngVal(c.SuggestionIgnoreCase,true);
      var partial=ngVal(c.SuggestionPartial,2);
      if(c.OnSuggestionURL) url=c.OnSuggestionURL(c,url);
      else
      {
        if(url!='')
        {
          url=ng_AddURLParam(url,"S="+ng_URLEncode(c.ID));
          if((typeof c.SuggestionType !== 'undefined')&&(c.SuggestionType!='')) url=ng_AddURLParam(url,"T="+ng_URLEncode(c.SuggestionType));
          url=ng_AddURLParam(url,"Q="+ng_URLEncode(txt)+"&IC="+(ignorecase ? '1' : '0')+"&P="+partial);
        }
      }
      if(url!='') // Server suggestions
      {
        if(!c.SuggestionRPC) c.SuggestionRPC=new ngRPC(c.ID);
        c.SuggestionRPC.sendRequest(url);
        return;
      }
      else // Client suggestions
      {
        var found=false;
        var needupdate=false;
        var dd=c.DropDownControl;
        if(dd)
        {
          if(ignorecase) txt=txt.toLowerCase();
          var cid='';
          if(dd.Columns.length>0) cid=ngVal(c.SuggestionSearchColumn,dd.Columns[0].ID);

          var t,v;
          if(c.OnSuggestionCompareItem) partial=-1;
          else if(partial==-1) partial=2;
          dd.Scan(function(list, it, parent, userdata) {
            if(dd.Columns.length>0) t=ngVal(it.Text[cid],'');
            else t=it.Text;
            if(ignorecase) t=t.toLowerCase();
            switch(partial)
            {
              case -1:
                v=ngVal(c.OnSuggestionCompareItem(c,txt,t,list,it,parent),false);
                break;
              case 1:
                if(txt.length>t.length) return false;
                v=(t.substring(0,txt.length)==txt);
                break;
              case 2:
                v=(t.indexOf(txt)>=0)
                break;
              default:
                v=(t==txt);
                break;
            }
            if(it.Visible!=v)
            {
              it.Visible=v;
              needupdate=true;
            }
            if(it.Visible) found=true;
            return true;
          });
          if((dd.Visible)&&(needupdate)&&(found))
          {
            dd.SetItemFocus(null);
            dd.Update();
          }
        }
        c.SuggestionFound=found;
      }
    }
    if(c.SuggestionFound)
    {
      var dd=c.DropDownControl;
      if(dd) dd.SetItemFocus(null);
      c.DropDown();
    }
    else c.HideDropDown();
  }
  else c.HideDropDown();
}

function nge_SuggestionRefresh(forcerequery, delay)
{
  var dd=this.DropDownControl;
  if(!dd) return;

  if(this.SuggestionTimer) clearTimeout(this.SuggestionTimer);

  if(ngVal(forcerequery,false)) this.SuggestionLastSearch='';

  var o=dd.Elm();
  if((o)&&(o.style.height!=''))
  {
    o.style.display='none';
    o.style.height='';
  }
  if(typeof delay==='undefined') delay=ngVal(this.SuggestionDelay,200);
  this.SuggestionTimer=setTimeout("nge_Suggestion('"+this.ID+"')",delay);
}

function nge_GetCaretPos()
{
  var to=(this.ControlHasFocus ? document.getElementById(this.ID+'_T') : null);
  if(!to) return; // undefined

  var pos = 0;
  // IE Support
  if (document.selection) {
    to.focus();
    var Sel = document.selection.createRange ();
    Sel.moveStart ('character', -to.value.length);
    pos = Sel.text.length;
  }
  // Firefox support
  else if (to.selectionStart || to.selectionStart == '0')
    pos = to.selectionStart;
  return pos;
}


function nge_SetCaretPos(pos)
{
  var to=document.getElementById(this.ID+'_T');
  if(!to) return;

  if(to.setSelectionRange)
  {
    to.focus();
    to.setSelectionRange(pos,pos);
  }
  else if (to.createTextRange) {
    var range = to.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

function nge_TextChanged(event, elm, edit)
{
  if(typeof edit==='undefined') edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngEdit');
  if(edit)
  {
    var v=elm.value;

    if((!edit.HintVisible)&&(edit.Text!=v))
    {
      edit.Text=v;
      if(edit.OnTextChanged) edit.OnTextChanged(edit);
      elm.className = edit.GetClassName('Input');
    }

    if(((v == '')&&((!edit.HasFocus)||(nge_HintStyle(edit)===ngHintHideOnInput))) || (edit.HintVisible))
    {
      var hint=edit.GetHint();
      if(hint!='') {
        nge_ShowHint(edit,elm,hint);
        edit.SetCaretPos(0);
      }
      else nge_HideHint(edit,elm);
    }
  }
}

function nge_KeyDown(e,elm)
{
  if(!e) e=window.event;
  var edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngEdit');
  if((edit)&&(edit.Enabled))
  {
    e.Owner=edit;
    if((edit.OnKeyDown)&&(!ngVal(edit.OnKeyDown(e),false))) return false;
    if(edit.HintVisible)
    {
      switch(e.keyCode)
      {
        case 35: // End
        case 36: // Home
        case 37: // Left
        case 39: // Right
        case 38: // Up
        case 40: // Down
        case 8:  // Backspace
        case 46: // Delete
        case 33: // PgUp
        case 34: // PgDown
          if(e.preventDefault) e.preventDefault();
          e.returnValue = false;
          break;
      }
    }

    if(ngVal(edit.Suggestion,false)) // Suggestion keys
    {
      var dd=edit.DropDownControl;
      switch(e.keyCode)
      {
        case 33: // PgUp
        case 34: // PgDown
        case 38: // Up
        case 40: // Down
          if((dd)&&(dd.Visible))
          {
            var o=dd.Elm();
            if((o)&&(o.onkeydown)) o.onkeydown(e);
            edit=null;
            break;
          }
          break;
        case 37: // Left
        case 39: // Right
          if((dd)&&(dd.Visible))
          {
            var it=dd.GetItemFocus();
            if((it)&&(typeof it.Items !== 'undefined')&&(it.Items.length>0))
            {
              if(e.keyCode==37) dd.Collapse(it);
              else dd.Expand(it);
              if(e.preventDefault) e.preventDefault();
              e.returnValue = false;
            }
          }
          break;
      }
    }
  }
}

function nge_DefFormButton2(ctrl, t)
{
  var c,cc=ctrl.ChildControls;
  if(typeof cc !== 'undefined')
  {
    for(var i=0;i<cc.length;i++)
    {
      c=cc[i];
      if((c)&&(c.Click)&&(c.Enabled)&&(c.Visible)&&(ngVal(c.FormID,'')==''))
      {
        if(((t)&&(ngVal(c.Default,false)))||((!t)&&(ngVal(c.Cancel,false)))) {
          var timer=setTimeout(function () { // Fire Click later
            clearTimeout(timer);
            if(typeof c.Click==='function') c.Click();
          },10);
          return true;
        }
      }
    }

    for(var i=0;i<cc.length;i++)
    {
      c=cc[i];
      if((ngVal(c.FormID,'')=='')&&(c.Visible)&&(nge_DefFormButton2(c,t))) return true;
    }
  }
  return false;
}

function nge_DefFormButton(ctrl, t)
{
  var p=ctrl.ParentControl;
  if(p)
  {
    var c,cc=p.ChildControls;
    if(typeof cc !== 'undefined')
      for(var i=0;i<cc.length;i++)
      {
        c=cc[i];
        if((c)&&(c!=ctrl)&&(c.Click)&&(c.Enabled)&&(c.Visible)&&(ngVal(c.FormID,'')==''))
        {
          if(((t)&&(ngVal(c.Default,false)))||((!t)&&(ngVal(c.Cancel,false))))
          {
            var timer=setTimeout(function () { // Fire Click later
              clearTimeout(timer);
              if(typeof c.Click==='function') c.Click();
            },10);
            return true;
          }
        }
      }

    if((ngVal(p.FormID,'')=='')&&(nge_DefFormButton(p, t))) return true;

    if(typeof cc !== 'undefined')
      for(var i=0;i<cc.length;i++)
      {
        c=cc[i];
        if((c)&&(c!=ctrl)&&(c.Visible)&&(ngVal(c.FormID,'')=='')&&(nge_DefFormButton2(c,t))) return true;
      }
  }
  return false;
}

function nge_KeyPress(e,elm)
{
  if(!e) e=window.event;
  var edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngEdit');
  if((edit)&&(edit.Enabled))
  {
    e.Owner=edit;
    if((edit.OnKeyPress)&&(!ngVal(edit.OnKeyPress(e,elm),false))) return false;
  }
}

function nge_KeyUpHint(edit,elm,clsid)
{
  if(edit.HintVisible)
  {
    var hint=edit.GetHint();
    if(hint!='') {
      var val=elm.value;
      var s=0,ev,eh;
      for(ev=val.length-1,eh=hint.length-1;(ev>=0)&&(eh>=0);ev--,eh--)
        if(val.charAt(ev)!=hint.charAt(eh)) break;

      if((ev>=0)||(eh>=0))
      {
        if(eh>=0) {
          for(s=0;(s<ev)&&(s<hint.length);s++)
            if(val.charAt(s)!=hint.charAt(s)) break;
          if(s===hint.length) {
            ev=val.length-1;
          }
        }
        nge_HideHint(edit,elm,val.substr(s,ev-s+1));
      }
    }
    else nge_HideHint(edit,elm);
  }
}

function nge_KeyUp(e,elm)
{
  if(!e) e=window.event;
  var edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngEdit');
  if((edit)&&(edit.Enabled))
  {
    e.Owner=edit;
    nge_KeyUpHint(edit,elm,'Input');

    if((edit.OnKeyUp)&&(!ngVal(edit.OnKeyUp(e,elm),false))) return false;

    nge_TextChanged(e,elm,edit);
    if(ngVal(edit.Suggestion,false)) // Suggestion keys
    {
      var dd=edit.DropDownControl;
      switch(e.keyCode)
      {
        case 35: // End
        case 36: // Home
        case 37: // Left
          break;
        case 9:  // Tab
          if(!dd) break;
        case 27: // Esc
          if(edit.SuggestionTimer) clearTimeout(edit.SuggestionTimer);
          edit.SuggestionTimer=null;
          edit.HideDropDown();
          break;
        case 39: // Right
        case 13: // Enter
          if((dd)&&(dd.Visible))
          {
            var fi=dd.GetItemFocus();
            if(fi)
            {
              if((e.keyCode==39)&&(fi)&&(typeof fi.Items !== 'undefined')&&(fi.Items.length>0))
                break;
              dd.SetItemFocus(null);
              if(edit.SuggestionTimer) clearTimeout(edit.SuggestionTimer);
              edit.SuggestionTimer=null;
              dd.SelectDropDownItem(fi);
              edit=null;
            }
          }
          break;
        case 33: // PgUp
        case 34: // PgDown
        case 38: // Up
        case 40: // Down
          if((dd)&&(dd.Visible))
          {
            var o=dd.Elm();
            if((o)&&(o.onkeyup)) o.onkeyup(e);
            edit=null;
            break;
          }
          if(e.keyCode!=40) break;
        default:
          if(elm.value=='')
          {
            if(edit.SuggestionTimer) clearTimeout(edit.SuggestionTimer);
            edit.SuggestionTimer=null;
            edit.HideDropDown();
          }
          else
          {
            edit.SuggestionRefresh();
          }
          if(e.keyCode==40) edit=null;
          break;
      }
    }
    if((e.keyCode==40)&&(edit)) edit.DropDown(); // Down
    if((e.keyCode==13)&&(edit)) // Enter
    {
      var handled=false;
      if(edit.Buttons)
      {
        var btn;
        for(var i=0;i<edit.Buttons.length;i++)
        {
          btn=edit.Buttons[i];
          if((ngVal(btn.Default,false))&&(typeof btn.Click === 'function'))
          {
            var timer=setTimeout(function () { // Fire Click later
              clearTimeout(timer);
              if(typeof btn.Click==='function') btn.Click(e);
            },10);
            handled=true;
            break;
          }
        }
      }
      if((!handled)&&(nge_DefFormButton(edit, 1))) handled=true;
      if((!handled)&&(edit.Buttons)&&(edit.Buttons.length>0)&&(edit.Buttons[0].Default!==false)&&(typeof edit.Buttons[0].Click === 'function'))
      {
        btn=edit.Buttons[0];
        var timer=setTimeout(function () { // Fire Click later
          clearTimeout(timer);
          if(typeof btn.Click==='function') btn.Click(e);
        },10);
        handled=true;
      }

      if(handled)
      {
        edit.SetFocus(false);
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
      }
    }
    if((e.keyCode==27)&&(edit)) // Escape
    {
      var handled=false;
      if(edit.Buttons)
      {
        var btn;
        for(var i=0;i<edit.Buttons.length;i++)
        {
          btn=edit.Buttons[i];
          if((ngVal(btn.Cancel,false))&&(typeof btn.Click === 'function'))
          {
            var timer=setTimeout(function () { // Fire Click later
              clearTimeout(timer);
              if(typeof btn.Click==='function') btn.Click(e);
            },10);
            handled=true;
            break;
          }
        }
      }
      if((!handled)&&(nge_DefFormButton(edit, 0))) handled=true;
      if(handled)
      {
        edit.SetFocus(false);
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
      }
    }
  }
}

function nge_SetText(text)
{
  if(this.OnSetText) text=this.OnSetText(text,this);
  if(text!=this.Text)
  {
    this.Text=text;
    var o=document.getElementById(this.ID+'_T');
    if(o)
    {
      var hintvisible=false;
      if(text=='')
      {
        var hint=this.GetHint();
        if((hint!='')&&((!this.HasFocus)||(nge_HintStyle(this)===ngHintHideOnInput))) {
          hintvisible=true;
          nge_ShowHint(this,o,hint);
        }
        else o.value=text;
      }
      else o.value=text;
      if((this.HintVisible)&&(!hintvisible)) nge_HideHint(this,o);
    }
    if(this.OnTextChanged) this.OnTextChanged(this);
    if(o) o.className = this.GetClassName('Input',hint);
  }
}

function nge_DoAcceptGestures(o,gestures)
{
  gestures.tap=true;
}

function nge_DoGesture(pi)
{
  if((pi.Owner===this)&&(pi.Gesture==='drag'))
  {
    if(this.HasFocus)
      return true;
  }
  return false;
}


function nge_DoPtrStart(pi)
{
  if(pi.EventID==='control')
  {
    if((this.DropDownType==ngeDropDownList)&&(this.DropDownControl))
    {
      pi.CanFocus=false;
      pi.PreventDefault=true;
      pi.PreventSelect=true;
    }
    else
    {
      pi.PreventDefault=false;
    }
  }
}

function nge_DoPtrClick(pi)
{
  if(pi.EventID==='control')
  {
    if((this.DropDownType==ngeDropDownList)&&(this.DropDownControl))
    {
      if(this.DropDownControl.Visible) this.HideDropDown();
      else this.DropDown();
    }
    else
    {
      if((this.HintVisible)&&(nge_HintStyle(this)===ngHintHideOnInput)) this.SetCaretPos(0);
    }
  }
}

function nge_DoUpdateImages()
{
  var image, focus=(this.HasFocus ? 1 : 0);
  if(this.OnGetImg) image=this.OnGetImg(this, 0);
  else image=this.LeftImg;

  ngc_ChangeImg(this.ID+'_IL', focus, this.Enabled, image);

  if(this.OnGetImg) image=this.OnGetImg(this, 2);
  else image=this.RightImg;
  ngc_ChangeImg(this.ID+'_IR', focus, this.Enabled, image);

  if(this.OnGetImg) image=this.OnGetImg(this, 1);
  else image=this.MiddleImg;
  ngc_ChangeImgS(this.ID+'_IM', focus, this.Enabled, image);
}

var ngMobileKeyboardActive=0;

function nge_BeginMobileKeyboard()
{
  // Mobile keyboards sometimes forces application resize or hides part of the application.
  // To prevent this add temporary margin to application's container.
  var ae=((typeof ngApp !== 'undefined')&&(ngApp) ? ngApp.Elm() : null);
  if((ae)&&(ngVal(ngApp.MobileKeyboardFix,true))) {
    if(ngMobileKeyboardActive===2)
    {
      ngMobileKeyboardActive=1;
      return;
    }
    ngMobileKeyboardActive=1;
    ngApp.SavedAppHeight=ae.style.height;
    ngApp.SavedAppBottom=ae.style.bottom;
    ngApp.SavedAppMarginBottom=ae.style.marginBottom;

    // Disable MobileKeyboard mode if there will be no resize during following 3secs
    if(ngApp.MobileKeyboardTimer) clearTimeout(ngApp.MobileKeyboardTimer);
    ngApp.MobileKeyboardTimer=setTimeout(function() {
      delete ngApp.MobileKeyboardTimer;
      clearTimeout(ngApp.MobileKeyboardTimer);
      nge_EndMobileKeyboard();
    },3000);

    ng_SetClientHeight(ae,ng_ClientHeight(ae));
    ae.style.bottom='';
    ae.style.marginBottom=ng_WindowHeight();
  }
}

function nge_EndMobileKeyboard()
{
  var ae=((typeof ngApp !== 'undefined')&&(ngApp) ? ngApp.Elm() : null);
  if((ae)&&(typeof ngApp.SavedAppHeight!=='undefined'))
  {
    if(ngApp.MobileKeyboardTimer) clearTimeout(ngApp.MobileKeyboardTimer);
    delete ngApp.MobileKeyboardTimer;

    if(ngMobileKeyboardActive===2) return;
    ngMobileKeyboardActive=2;
    ngApp.InvokeLater(function() {
      if(ngMobileKeyboardActive!==2) return;
      ngMobileKeyboardActive=0;
      ae.style.bottom=ngApp.SavedAppBottom;
      ae.style.height=ngApp.SavedAppHeight;
      ae.style.marginBottom=ngApp.SavedAppMarginBottom;
      delete ngApp.SavedAppBottom;
      delete ngApp.SavedAppHeight;
      delete ngApp.SavedAppMarginBottom;
    });
  }

}

function nge_DoFocus(e, elm)
{
  this.HasFocus=true;
  this.DoUpdateImages();
  nge_BeginMobileKeyboard();

  if(this.HintVisible) this.SetCaretPos(0);
  if((this.DropDownControl)&&(this.DropDownControl.Visible)) this.HideDropDown();
  if((this.OnFocus)&&(this.Enabled)) this.OnFocus(this);

  if((this.Text == '')&&(nge_HintStyle(this)===ngHintHideOnFocus))
  {
    nge_HideHint(this,elm,'')
  }
}

function nge_DoSetEnabled(v)
{
  this.Enabled=v;
  if((!v)&&(this.ControlHasFocus))
  {
    this.SetFocus(false);
    this.HasFocus=false;
    if(this.OnBlur) this.OnBlur(this);
  }
  if(this.Update) this.Update();
}

function nge_DoBlur(e, elm)
{
  this.HasFocus=false;
  nge_EndMobileKeyboard();

  if((this.OnBlur)&&(this.Enabled)) this.OnBlur(this);
  if((this.Text == '')&&(!this.HintVisible))
  {
    var o=document.getElementById(this.ID+'_T');
    if(o)
    {
      var hint=this.GetHint();
      if(hint!='') {
        nge_ShowHint(this,o,hint);
      }
    }
  }
  this.DoUpdateImages();
}

function nge_ShowHint(c,o,hint)
{
  c.HintVisible=true;
  o.className = c.GetClassName('Input',hint);
  o.value=hint;
  if(ngIExplorer && ngIExplorerVersion<=8)
  {
    if(o.getAttribute("type")!=="text")
    {
      var pwd=c.Password;
      var hasfocus=c.HasFocus;
      c.Password=false;
      c.Update();
      c.Password=pwd;
      if(hasfocus)
        ngApp.InvokeLater(function() {
          var o=document.getElementById(c.ID+'_T')
          if(o) o.focus();
        });
      return;
    }
  }
  else
    o.setAttribute("type","text");
  o.removeAttribute("maxlength");
}

function nge_HideHint(c,o,val)
{
  c.HintVisible=false;
  o.className = c.GetClassName('Input');
  if(c.Password) {
    if(ngIExplorer && ngIExplorerVersion<=8)
    {
      c.Update();
      ngApp.InvokeLater(function() {
        var o=document.getElementById(c.ID+'_T')
        if(o) o.focus();
      });
      return;
    }
    else
      o.setAttribute("type","password");
  }
  if(c.MaxLength>0) o.setAttribute("maxlength",c.MaxLength);
  if(typeof val !== 'undefined') o.value=(c.MaxLength>0 ? val.substr(0,c.MaxLength) : val);
}

function nge_OnDropDownSetVisible(l,v)
{
  if(!v) // hiding dropdown
  {
    if(!l.__hidingdropdown)
    {
      l.__hidingdropdown=true;
      try
      {
        var e=l.DropDownOwner;
        if(e)
        {
          if((e.OnHideDropDown)&&(!ngVal(e.OnHideDropDown(e,l),false))) return false;
          if(typeof l.DoHideDropDown === 'function')
          {
            l.DoHideDropDown(this);
            return false;
          }
        }
      }
      finally
      {
        delete l.__hidingdropdown;
      }
    }
  }
  return true;
}

function nge_HideDropDown()
{
  var l=this.DropDownControl;
  if(l) l.SetVisible(false);
}

function nge_IsInsidePopup(t,intype,e)
{
  var ad=this.Elm();
  var ac=((intype!==1) && this.DropDownOwner ? this.DropDownOwner.Elm() : null); // edit is not considered as inside when mouse wheel is used
  while(t)
  {
    if((t===ac)||(t===ad)) break;
    t=t.parentNode;
  }
  return (t ? true : false);
}

function nge_DropDown()
{
  if((!this.Enabled)||(this.ReadOnly)) return;
  var l=this.DropDownControl;
  if(!l) return;

  if((this.OnDropDown)&&(!ngVal(this.OnDropDown(this,l),false))) return;

  var po=this.Elm();
  var o=l.Elm();
  if((o)&&(po))
  {
    if(!l.Visible)
    {
      o.style.left='-10000px';
      o.style.top='-10000px';
    }

    if(typeof l.DoDropDown === 'function') l.DoDropDown(this);
    else
    {
      l.SetVisible(true);
      l.SetFocus();
    }
    if(!l.Visible) return;

    o=l.Elm();
    if(!o) return;

    ng_BeginMeasureElement(po);
    var ew=ng_OuterWidth(po);
    var eh=ng_OuterHeight(po);
    ng_EndMeasureElement(po);

    ng_BeginMeasureElement(o);
    var lw=ng_OuterWidth(o);
    var lh=ng_OuterHeight(o);
    ng_EndMeasureElement(o);

    var pos=ng_ParentPosition(po,ngApp ? ngApp.Elm() : undefined);

    if(typeof this.DropDownWidth !== 'undefined')
    {
      if(this.DropDownWidth>0) ng_SetOuterWidth(o,this.DropDownWidth);
    }
    else if(lw<ew) { ng_SetOuterWidth(o,ew); lw=ew; }
    var maxh=ngVal(l.MaxHeight,150);
    if(lh>maxh) { ng_SetOuterHeight(o,maxh); lh=maxh; }

    if(((pos.x+lw<=ng_WindowWidth()-20)&&(this.DropDownAlign=='left'))||((pos.x+ew-lw)<0))
    {
      o.style.left=pos.x+'px';
    }
    else o.style.left=(pos.x+ew-lw)+'px';

    if((pos.y+eh+lh>ng_WindowHeight()-20)&&((pos.y-lh)>=0))
    {
      o.style.top=(pos.y-lh)+'px';
    }
    else o.style.top=(pos.y+eh)+'px';
    o.style.zIndex='100000';

    l.Update();
    if(typeof l.DoDropDownFinished === 'function') l.DoDropDownFinished(this);
  }
}

function nge_SetDropDownControl(l)
{
  var ol=this.DropDownControl;
  if(ol)
  {
    ol.RemoveEvent('OnSetVisible',nge_OnDropDownSetVisible);
    ol.RemoveEvent('IsInsidePopup',nge_IsInsidePopup);

    if(typeof ol.SetDropDownOwner === 'function') ol.SetDropDownOwner(null);
    delete ol.DropDownOwner;
  }
  this.DropDownControl=l;
  if(l)
  {
    l.DropDownOwner=this;
    l.IsPopup=true;
    l.AddEvent(nge_OnDropDownSetVisible,'OnSetVisible');
    l.AddEvent('IsInsidePopup',nge_IsInsidePopup);

    if(typeof l.SetDropDownOwner === 'function') l.SetDropDownOwner(this);
  }
}

function nge_GetClassName(cls, hint)
{
  if(typeof hint === 'undefined') hint=this.GetHint();
  var text=this.GetText();

  if(this.OnGetClassName)
  {
    var c=this.OnGetClassName(this, cls, text, hint);
    if(ngVal(c,'')!='') cls=c;
  }
  if(((this.DefaultText!='')&&(text==this.DefaultText))||(this.HintVisible)) cls+='Hint';
  if(!this.Enabled) cls+='Disabled';
  return this.BaseClassName+cls;
}

function nge_DoUpdate(o)
{
  var html=new ngStringBuilder;

  var cclass=this.BaseClassName;

  var image,dp;
  if((ngIExplorer)&&(ng_GetStylePx(o.style.height)==0)) o.style.height='1px';  // IE7 Measure fix
  var width=ng_ClientWidth(o);
  var w=width,th=0,lw=0,rw=0,bw=0,bl=0;
  var alt=this.GetAlt();
  var hint=(((!this.ControlHasFocus)||(nge_HintStyle(this)===ngHintHideOnInput)) ? this.GetHint() : '');

  var images=null;
  if(this.OnGetImg) image=this.OnGetImg(this, 0);
  else image=this.LeftImg;
  if(image)
  {
    if(!images) images=new ngStringBuilder;
    dp=ngc_ImgProps(this.ID+'_IL', (this.ControlHasFocus ? 1 : 0), this.Enabled, image);
    ngc_Img(images,dp,"position:absolute; left: 0px;",ngVal(image.Attrs,''));
    lw=dp.W;
    if(dp.H>th) th=dp.H;
  }

  if(this.OnGetImg) image=this.OnGetImg(this, 2);
  else image=this.RightImg;
  if(image)
  {
    if(!images) images=new ngStringBuilder;
    dp=ngc_ImgProps(this.ID+'_IR', (this.ControlHasFocus ? 1 : 0), this.Enabled, image);
    ngc_Img(images,dp,"position:absolute; left: "+(width-dp.W)+"px;",ngVal(image.Attrs,''));
    rw=dp.W;
    if(dp.H>th) th=dp.H;
  }

  if(this.OnGetImg) image=this.OnGetImg(this, 1);
  else image=this.MiddleImg;
  if(image)
  {
    if(!images) images=new ngStringBuilder;
    dp=ngc_ImgProps(this.ID+'_IM', (this.ControlHasFocus ? 1 : 0), this.Enabled, image);
    ngc_ImgSW(images,dp,lw,width-lw-rw,'',ngVal(image.Attrs,''));
    if(dp.H>th) th=dp.H;
  }
  var readonly=(!this.Enabled)||(this.ReadOnly)||(this.DropDownType == ngeDropDownList);
  // If focused, we cannot use innerHTML because the input element must not be removed from DOM
  var to=(this.ControlHasFocus ? document.getElementById(this.ID+'_T') : null);
  if(to) {
    var ts=o.firstChild; // get top span
    if(!ts) to=null;
    if(to && ngIExplorer && ngIExplorerVersion<=8)
    {
      var inptype = to.getAttribute("type");
      if(((this.Password)&&(!this.HintVisible) && inptype!=='password') || inptype!=='text') to=null;
    }
  }
  if(to) // updating DOM
  {
    if(alt!='') ts.setAttribute("title",alt);
    else        ts.removeAttribute("title");
  }
  else html.append('<span '+(alt!='' ? ' title="'+ng_htmlEncode(alt)+'"' : '')+'>');

  if((this.Buttons)&&(this.Buttons.length>0))
  {
    var b,img,a,br;
    for(var i=0;i<this.Buttons.length;i++)
    {
      b=this.Buttons[i];
      b.Enabled=this.Enabled;
      if((b.BaseClassName=='')||(b.BaseClassName==b.CtrlType)) b.BaseClassName=cclass+'Button';
      if(!b.Visible) continue;
      if(b.ID=='') b.Attach(this.ID+'_B'+(i+1));
      br=ngb_SimpleRect(b);
      if(br.H>th) th=br.H;
      a=ngVal(b.ButtonAlign,'');
      if(a=='left')
      {
        b.Bounds.L=(lw+bl);
        lw+=br.W;
      }
      else
      {
        b.Bounds.L=(w-rw-bw-br.W);
        bw+=br.W;
      }
      b.Bounds.T=0;
      b.Bounds.W=br.W;
      html.append('<div id="'+b.ID+'" class="'+b.BaseClassName+'" style="position: absolute; z-index:1; left:'+b.Bounds.L+'px; top: 0px; width: '+br.W+'px; height: '+br.H+'px"></div>');
    }
  }

  ng_SetClientHeight(o,th);
  var cbh=ng_StyleHeight(o);
  if(this.Bounds.H!=cbh)
  {
    this.Bounds.H=cbh;
    this.SetBounds();
  }

  var tw=(w-bw-bl-lw-rw-2);
  if(tw<0) tw=0;
  if(to) // updating DOM
  {
    // remove all except the input element
    var nx,n=ts.lastChild;
    while(n)
    {
      nx=n.previousSibling;
      if(n!=to) ts.removeChild(n);
      n=nx;
    }

    // create DOM before input element
    var temp = document.createElement('div');
    ng_SetInnerHTML(temp,html.toString());

    // insert DOM before input element
    n=temp.firstChild;
    while(n)
    {
      nx=n.nextSibling;
      ts.insertBefore(n, to);
      n=nx;
    }

    // update input element
    to.className=this.GetClassName('Input',hint);

    if(!ngIExplorer || ngIExplorerVersion>8)
    {
      if((this.Password)&&(!this.HintVisible))    to.setAttribute("type","password");
      else                                        to.setAttribute("type","text");
    }

    if((this.MaxLength>0)&&(!this.HintVisible)) to.setAttribute("maxlength",this.MaxLength);
    else                                        to.removeAttribute("maxlength");

    if(readonly)
    {
      to.setAttribute("readonly","readonly");
      if(ngIExplorer) this.SetFocus(false);
    }
    else to.removeAttribute("readonly");

    to.style.textAlign=this.TextAlign;
    to.style.left=(lw+bl)+'px';
    to.style.top=this.OffsetTop+'px';
    to.style.width=tw+'px';
    if((this.HintVisible)&&(to.value!=hint))
    {
      to.value=hint;
      this.SetCaretPos(0);
    }

    if(images)
    {
      html.clear();
      html.append('<span style="position: absolute;z-index:0;left:0px;">');
      html.append(images);
      html.append('</span>');

      // create DOM after input element
      temp = document.createElement('div');
      ng_SetInnerHTML(temp,html.toString());

      // append DOM after input element
      n=temp.firstChild;
      while(n)
      {
        nx=n.nextSibling;
        ts.appendChild(n);
        n=nx;
      }
    }
  }
  else
  {
    this.HintVisible=(this.Text=='')&&(hint!='');
    html.append('<input type=');
    if((this.Password)&&(!this.HintVisible)) html.append('"password" ');
    else html.append('"text" ');
    if(readonly) html.append('readonly="readonly" ');
    html.append('id="'+this.ID+'_T" class="'+this.GetClassName('Input',hint));
    html.append('" style="border:0px; white-space: nowrap;text-align:'+this.TextAlign+';position: absolute; z-index:1;left:'+(lw+bl)+'px;top:'+this.OffsetTop+'px;width:'+(tw)+'px;');
    if(readonly) html.append("cursor: default;");
    html.append('" value="'+ng_htmlEncode(this.Text=='' ? hint : this.Text)+'" ');
    if((this.MaxLength>0)&&(!this.HintVisible)) html.append('maxlength="'+this.MaxLength+'" ');
    html.append('onkeydown="nge_KeyDown(event,this)" onkeyup="nge_KeyUp(event,this)" onkeypress="nge_KeyPress(event,this)" onchange="nge_TextChanged(event,this)"');
    html.append(' onfocus="ngc_Focus(event,this,\'ngEdit\')" onblur="ngc_Blur(event,this,\'ngEdit\')"');
    html.append(' />');
    if(images)
    {
      html.append('<span style="position: absolute;z-index:0;left:0px;">');
      html.append(images);
      html.append('</span>');
    }
    html.append('</span>');
    ng_SetInnerHTML(o,html.toString());
  }

  if((this.Buttons)&&(this.Buttons.length>0))
  {
    var b,biw,img;
    for(var i=0;i<this.Buttons.length;i++)
    {
      b=this.Buttons[i];
      b.Parent=this;
      b.Update();
    }
  }
  return true;
}

function nge_SetFocus(state)
{
  state=ngVal(state,true);
  if(state==this.HasFocus) return;

  var o=document.getElementById(this.ID+'_T');
  if(o)
  {
    try {
      if(state)
      {
        o.focus();
        if((this.SelectOnFocus)&&(!this.HintVisible)) o.select();
      }
      else o.blur();
    } catch(e) { }
  }
}

function nge_SetReadOnly(ro)
{
  ro=ngVal(ro,true);
  if(ro==this.ReadOnly) return;

  this.ReadOnly=ro;
  var o=document.getElementById(this.ID+'_T');
  if(o)
  {
    if(ro)
    {
      o.setAttribute("readonly","readonly");
      o.style.cursor='default';
      if((ngIExplorer)&&(this.ControlHasFocus)) this.SetFocus(false);
    }
    else
    {
      o.removeAttribute("readonly");
      o.style.cursor='';
    }
  }
}

function nge_DoMouseEnter(e, mi, elm)
{
  var o=document.getElementById(this.ID+'_T');
  if(o)
  {
    var cn=o.className;
    var i=cn.indexOf('_Focus');
    if(i<0) cn=cn+'_Focus';
    o.className=cn;
  }
  ngc_EnterImg(this.ID+'_IL');
  ngc_EnterImgS(this.ID+'_IM');
  ngc_EnterImg(this.ID+'_IR');
  if(this.OnMouseEnter) this.OnMouseEnter(this);
}

function nge_DoMouseLeave(e, mi)
{
  if(this.OnMouseLeave) this.OnMouseLeave(this);

  var o=document.getElementById(this.ID+'_T');
  if(o)
  {
    var cn=o.className;
    var i=cn.indexOf('_Focus');
    if(i>=0) cn=cn.substring(0,i);
    o.className=cn;
  }
  ngc_LeaveImg(this.ID+'_IL');
  ngc_LeaveImgS(this.ID+'_IM');
  ngc_LeaveImg(this.ID+'_IR');
}

function nge_DoCreate(d, ref, elm, parent)
{
  if((typeof d.DropDown !== 'undefined')&&(typeof this.SetDropDownControl === 'function'))
  {
    ng_MergeDef(d.DropDown, {
      L: 0, T: 0,
      id: this.ID+'_DD',
      Data: {
        Visible: false
      }
    });
    var lref=ngCreateControls({ Control: d.DropDown });
    if(typeof lref.Control !== 'undefined') // dropdown successfuly created
    {
      lref.Control.Owner=this;
      this.SetDropDownControl(lref.Control);
    }
  }
  if(typeof d.Buttons === 'object')
  {
    var ldefs=new Object;
    var b;
    for(var i=0;i<d.Buttons.length;i++)
    {
      b=ng_CopyVar(d.Buttons[i]);
      ldefs['B'+i]=b;
    }
    var lref=ngCreateControls(ldefs,undefined,null);
    if((typeof this.Buttons !== 'object')||(!this.Buttons)) this.Buttons=new Array();
    for(var i=0;i<d.Buttons.length;i++)
    {
      b=lref['B'+i];
      if(b)
      {
        b.Owner=this;
        this.Buttons[this.Buttons.length]=b;
      }
    }
    if(!this.Buttons.length) this.Buttons=null;
  }
}

function nge_DoDispose()
{
  this.HideDropDown();
  if(this.DropDownControl) this.DropDownControl.Dispose();
  return true;
}

/**
 *  Class: ngEdit
 *  This class implements a generic edit control.
 *
 *  Syntax:
 *    new *ngEdit* ([string id, string text=''])
 *
 *  Parameters:
 *    id - parent element
 *    text - edit text
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngEdit(id, text)
{
  ngControl(this, id, 'ngEdit');
  this.DoCreate = nge_DoCreate;
  this.DoDispose = nge_DoDispose;
  this.DoAcceptGestures = nge_DoAcceptGestures;
  this.DoGesture = nge_DoGesture;

  /*
   *  Group: Definition
   */
  /*
   *  Variable: DropDown
   *  ...
   *  Type: object
   */
  /*<>*/

  /*
   *  Group: Properties
   */
  /*  Variable: Text
   *  ...
   *  Type: string
   */
  this.Text = ngVal(text,'');
  /*  Variable: DefaultText
   *  ...
   *  Type: string
   */
  this.DefaultText = '';
  /*  Variable: TextAlign
   *  ...
   *  Type: string
   *  Default value: *'left'*
   */
  this.TextAlign = 'left';
  /*  Variable: Alt
   *  ...
   *  Type: string
   */
  this.Alt = '';
  /*  Variable: Hint
   *  ...
   *  Type: string
   */
  this.Hint = '';
  /*  Variable: HintStyle
   *  ...
   *  Type: integer
   */
  //this.HintStyle = undefined;
  /*  Variable: ReadOnly
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.ReadOnly = false;
  /*  Variable: Password
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.Password = false;
  /*  Variable: MaxLength
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.MaxLength = 0;

  /*  Variable: LeftImg
   *  ...
   *  Type: object
   */
  this.LeftImg = null;
  /*  Variable: MiddleImg
   *  ...
   *  Type: object
   */
  this.MiddleImg = null;
  /*  Variable: RightImg
   *  ...
   *  Type: object
   */
  this.RightImg = null;
  /*  Variable: OffsetTop
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.OffsetTop = 0;

  /*  Variable: HasFocus
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.HasFocus=false;

  /*  Variable: SelectOnFocus
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.SelectOnFocus=true;

  /*  Variable: Buttons
   *  ...
   *  Type: array
   *  Default value: *null*
   */
  this.Buttons = null;

  /*  Variable: DropDownType
   *  ...
   *  Type: enum
   *
   *  Constants:
   *  ngeDropDownEdit - ...
   *  ngeDropDownList - ...
   *
   *  Default value: *ngeDropDownEdit*
   */
  this.DropDownType = ngeDropDownEdit;

  /*  Variable: DropDownControl
   *  ...
   *  Type: object
   *  Default value: *null*
   */
  this.DropDownControl = null;

  /*  Variable: DropDownWidth
   *  ...
   *  Type: integer
   *  Default value: *undefined*
   */
  this.DropDownWidth = undefined;
  /*  Variable: DropDownAlign
   *  ...
   *  Type: string
   *  Default value: *'left'*
   */
  this.DropDownAlign = 'left';

  /*  Variable: Suggestion
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  //this.Suggestion=false;

  /*  Variable: SuggestionDelay
   *  ...
   *  Type: int
   *  Default value: *200*
   */
  //this.SuggestionDelay=200;

  /*  Variable: SuggestionSearchColumn
   *  ...
   *  Type: string
   *  Default value: *''*
   */
  //this.SuggestionSearchColumn='';

  /*  Variable: SuggestionIgnoreCase
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  //this.SuggestionIgnoreCase=true;

  /*  Variable: SuggestionPartial
   *  ...
   *  Type: int
   *  Default value: *2*
   */
  //this.SuggestionPartial=2

  /*  Variable: SuggestionURL
   *  ...
   *  Type: string
   *  Default value: *''*
   */
  //this.SuggestionURL='';

  /*  Variable: SuggestionType
   *  ...
   *  Type: string
   *  Default value: *''*
   */
  //this.SuggestionType='';

  /*
   *  Group: Methods
   */
  /*  Function: SetText
   *  Sets edit text.
   *
   *  Syntax:
   *    void *SetText* (string text)
   *
   *  Returns:
   *    -
   */
  this.SetText = nge_SetText;
  /*  Function: GetText
   *  Gets edit text.
   *
   *  Syntax:
   *    string *GetText* ()
   *
   *  Returns:
   *    -
   */
  this.GetText = ngc_GetText;
  /*  Function: GetAlt
   *  Gets alt text.
   *
   *  Syntax:
   *    string *GetAlt* (void)
   *
   *  Returns:
   *    Alt text.
   */
  this.GetAlt=ngc_GetAlt;
  /*  Function: GetHint
   *  Gets hint text.
   *
   *  Syntax:
   *    string *GetHint* (void)
   *
   *  Returns:
   *    Hint text.
   */
  this.GetHint=ngc_GetHint;

  /*  Function: SetReadOnly
   *  Sets readonly state of control.
   *
   *  Syntax:
   *    void *SetReadOnly* ([bool ro=true])
   *
   *  Parameters:
   *    ro - readonly state
   *
   *  Returns:
   *    -
   */
  this.SetReadOnly=nge_SetReadOnly;

  /*  Function: GetCaretPos
   *  Gets caret position.
   *
   *  Syntax:
   *    int *GetCaretPos* ()
   *
   *  Returns:
   *    Caret position or undefined if edit is not focused.
   */
  this.GetCaretPos = nge_GetCaretPos;

  /*  Function: SetCaretPos
   *  Sets caret position.
   *
   *  Syntax:
   *    void *SetCaretPos* (int pos)
   *
   *  Parameters:
   *    ro - caret position
   *
   *  Returns:
   *    -
   */
  this.SetCaretPos = nge_SetCaretPos;

  this.GetClassName = nge_GetClassName;
  this.DoMouseEnter = nge_DoMouseEnter;
  this.DoMouseLeave = nge_DoMouseLeave;
  this.DoSetEnabled = nge_DoSetEnabled;
  this.DoFocus = nge_DoFocus;
  this.DoBlur = nge_DoBlur;
  this.DoPtrStart = nge_DoPtrStart;
  this.DoPtrClick = nge_DoPtrClick;

  /*  Function: SetDropDownControl
   *  Assigns drop down control to edit box.
   *
   *  Syntax:
   *    void *SetDropDownControl* (object control)
   *
   *  Returns:
   *    -
   */
  this.SetDropDownControl = nge_SetDropDownControl;
  /*  Function: DropDown
   *  Shows drop down.
   *
   *  Syntax:
   *    void *DropDown* ()
   *
   *  Returns:
   *    -
   */
  this.DropDown = nge_DropDown;
  /*  Function: HideDropDown
   *  Hides drop down.
   *
   *  Syntax:
   *    void *HideDropDown* ()
   *
   *  Returns:
   *    -
   */
  this.HideDropDown = nge_HideDropDown;

  /*  Function: SuggestionRefresh
   *  Refreshes suggestion content.
   *
   *  Syntax:
   *    void *SuggestionRefresh* ([bool forcerequery=false, delay=undefined])
   *
   *  Returns:
   *    -
   */
  this.SuggestionRefresh = nge_SuggestionRefresh;

  this.DoUpdateImages = nge_DoUpdateImages;
  this.DoUpdate = nge_DoUpdate;
  this.SetFocus = nge_SetFocus;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnSetText
   */
  this.OnSetText = null;
  /*
   *  Event: OnGetText
   */
  this.OnGetText = null;

  /*
   *  Event: OnTextChanged
   */
  this.OnTextChanged = null;
  /*
   *  Event: OnGetAlt
   */
  this.OnGetAlt = null;
  /*
   *  Event: OnGetHint
   */
  this.OnGetHint = null;
  /*
   *  Event: OnGetClassName
   */
  this.OnGetClassName = null;

  /*
   *  Event: OnDropDown
   */
  this.OnDropDown = null;
  /*
   *  Event: OnHideDropDown
   */
  this.OnHideDropDown = null;
  /*
   *  Event: OnClickOutside
   */
  this.OnClickOutside = null;

  /*
   *  Event: OnKeyDown
   */
  this.OnKeyDown = null;
  /*
   *  Event: OnKeyUp
   */
  this.OnKeyUp = null;
  /*
   *  Event: OnKeyPress
   */
  this.OnKeyPress = null;

  /*
   *  Event: OnMouseEnter
   */
  this.OnMouseEnter = null;
  /*
   *  Event: OnMouseLeave
   */
  this.OnMouseLeave = null;

  /*
   *  Event: OnFocus
   */
  this.OnFocus = null;
  /*
   *  Event: OnBlur
   */
  this.OnBlur = null;

  /*
   *  Event: OnGetImg
   */
  this.OnGetImg = null;

  /*
   *  Event: OnSuggestionSetText
   */
  // c.OnSuggestionSetText=null;
  /*
   *  Event: OnSuggestionSearch
   */
  // c.OnSuggestionSearch=null;
  /*
   *  Event: OnSuggestionCompareItem
   */
  // c.OnSuggestionCompareItem=null;
  /*
   *  Event: OnSuggestionURL
   */
  // c.OnSuggestionURL=null;
  /*
   *  Event: OnSuggestionResults
   */
  // c.OnSuggestionResults=null;
  /*
   *  Event: OnSuggestionData
   */
  // c.OnSuggestionData=null;

  ngControlCreated(this);
}

// --- ngDropDown --------------------------------------------------------------

function ngDropDown_Add(c)
{
  var b=new ngButton;
  c.DropDownButton=b;
  b.OnPtrStart=function(b,pi)
  {
    if(pi.EventID==='btn')
    {
      pi.CanFocus=false;
      pi.PreventDefault=true;
    }
  }

  b.OnClick = function(ci)
  {
    var e=(ci.Owner ? ci.Owner.Parent : null);
    if(e)
    {
      var l=e.DropDownControl;
      if((l)&&(l.Visible)) e.HideDropDown();
      else e.DropDown();
    }
  }
  c.Buttons=new Array(b);
}
/*  Class: ngDropDown
 *  Standard drop down control (based on <ngEdit>).
 */
/*<>*/
/*  Class: ngDropDownList
 *  Standard drop down list control (based on <ngEdit>).
 */
/*<>*/
function ngDropDown_Create(def, ref, parent,basetype,dropdownlist)
{
  var c=ngCreateControlAsType(def, ngVal(basetype,'ngEdit'), ref, parent);
  if(!c) return c;

  if(dropdownlist)
  {
    c.DropDownType=ngeDropDownList;
    c.SelectOnFocus=true;
  }
  ngDropDown_Add(c);
  if(typeof def.DropDown === 'undefined') def.DropDown=new Object;
  return c;
}

// --- ngEditNum ---------------------------------------------------------------

function ngedn_GetText(e)
{
  var n=parseInt(e.Text);
  if((e.Text=='')||(isNaN(n)))
  {
    n=ngVal(e.DefaultNum,0);
    e.Text=''+n;
  }
  if((typeof this.MinNum !== 'undefined')&&(n<e.MinNum)) e.Text=''+e.MinNum;
  if((typeof this.MaxNum !== 'undefined')&&(n>e.MaxNum)) e.Text=''+e.MaxNum;
  return e.Text;
}

/*  Class: ngEditNum
 *  Standard edit number control with spin buttons (based on <ngEdit>).
 */
/*<>*/

function ngEditNum_Create(def, ref, parent)
{
  /*
   *  Group: Definition
   */
  /*  Variable: ArrowsAlign
   *
   *  Constants:
   *    'left' - ...
   *    'right' - ...
   *    'both' - ...
   */
  /*<>*/
  var align=ngVal(def.ArrowsAlign, 'right');
  /*  Variable: Arrows
   *
   *  Constants:
   *    'none' - ...
   *    'leftright' - ...
   *    'updown' - ...
   */
  /*<>*/
  var type=ngVal(def.Arrows,'leftright');

  var c=ngCreateControlAsType(def, 'ngEdit', ref, parent);
  if(!c) return c;
  c.TextAlign=(align=='both' ? 'center' : 'right');
  c.OnGetText = ngedn_GetText;

  c.AddEvent('OnKeyUp',function(e,elm) {
    switch(e.keyCode)
    {
      case 38: this.DoUp();   return false;
      case 40: this.DoDown(); return false;
    }
    return true;
  });
  /*
   *  Group: Properties
   */
  /*  Variable: Step
   *  ...
   *  Type: integer
   *  Default value: *1*
   */
  /*<>*/
  c.Step=1;
  /*  Variable: StepRound
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  /*<>*/
  /*  Variable: MinNum
   *  ...
   *  Type: integer
   */
  /*<>*/
  /*  Variable: MaxNum
   *  ...
   *  Type: integer
   */
  /*<>*/
  /*  Variable: DefaultNum
   *  ...
   *  Type: integer
   *  Default value: *0*
   */
  /*<>*/
  c.DefaultNum=0;

  /*
   *  Group: Methods
   */
  /*  Function: DoUp
   *  Increase value by <Step>.
   *
   *  Syntax:
   *    void *DoUp* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  c.DoUp = function() {
    var n=this.GetNum();
    var nn=n;
    if(ngVal(this.StepRound,false)) nn=Math.ceil(n/this.Step)*this.Step;
    if(n==nn) n+=this.Step;
    else n=nn;
    this.SetNum(n);
  }
  /*  Function: DoDown
   *  Decrease value by <Step>.
   *
   *  Syntax:
   *    void *DoDown* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  c.DoDown = function() {
    var n=this.GetNum();
    var nn=n;
    if(ngVal(this.StepRound,false))  nn=Math.floor(n/this.Step)*this.Step;
    if(n==nn) n-=this.Step;
    else n=nn;
    this.SetNum(n);
  }
  /*  Function: GetNum
   *  Gets number.
   *
   *  Syntax:
   *    int *GetNum* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  c.GetNum = function() {
    if(this.OnGetNum) return this.OnGetNum(this);
    var n=parseInt(this.GetText());
    if(isNaN(n)) return undefined;
    if((typeof this.MinNum !== 'undefined')&&(n<this.MinNum)) n=this.MinNum;
    if((typeof this.MaxNum !== 'undefined')&&(n>this.MaxNum)) n=this.MaxNum;
    return n;
  };
  /*  Function: SetNum
   *  Sets number.
   *
   *  Syntax:
   *    void *SetNum* (int n)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  c.SetNum = function(n) {
    if(isNaN(n)) n=this.DefaultNum;
    n=ngVal(n,this.DefaultNum);
    n=ngVal(n,0);
    if(this.OnSetNum) { this.OnSetNum(this,n); return; }
    if((typeof this.MinNum !== 'undefined')&&(n<this.MinNum)) n=this.MinNum;
    if((typeof this.MaxNum !== 'undefined')&&(n>this.MaxNum)) n=this.MaxNum;
    this.SetText(''+n);
  }
  /*  Variable: ButtonUp
   *  ...
   *  Type: <ngButton>
   */
  c.ButtonUp=null;
  /*  Variable: ButtonDown
   *  ...
   *  Type: <ngButton>
   */
  c.ButtonDown=null;
  if(type!='none')
  {
    c.ButtonUp=new ngButton();
    if(align=='left') c.ButtonUp.ButtonAlign='left';
    c.ButtonUp.Default = false;
    c.ButtonUp.OnClick = function(ci)
    {
      var e=(ci.Owner ? ci.Owner.Parent : null);
      if(!e) return;
      if((e.OnUp)&&(!ngVal(e.OnUp(ci, e.GetNum()),false))) return;
      e.DoUp();
      if(!ci.Owner.Touching) e.SetFocus();
    }
    c.ButtonDown=new ngButton();
    if((align=='left')||(align=='both')) c.ButtonDown.ButtonAlign='left';
    c.ButtonDown.Default = false;
    c.ButtonDown.OnClick = function(ci)
    {
      var e=(ci.Owner ? ci.Owner.Parent : null);
      if(!e) return;
      if((e.OnDown)&&(!ngVal(e.OnDown(ci, e.GetNum()),false))) return;
      e.DoDown();
      if(!ci.Owner.Touching) e.SetFocus();
    }
    if(align=='left') c.Buttons=new Array(c.ButtonDown,c.ButtonUp);
    else              c.Buttons=new Array(c.ButtonUp,c.ButtonDown);
  }

  /*
   *  Group: Events
   */
  /*
   *  Event: OnGetNum
   */
  /*
   *  Event: OnSetNum
   */
  /*
   *  Event: OnUp
   */
  /*
   *  Event: OnDown
   */
  return c;
}

// --- ngMemo ------------------------------------------------------------------

function ngem_TextChanged(event, elm, edit)
{
  if(typeof edit==='undefined') edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngMemo');
  if(edit)
  {
    var v=elm.value;
    if((!edit.HintVisible)&&(edit.Text!=v))
    {
      edit.Text=v;
      if(edit.OnTextChanged) edit.OnTextChanged(edit);
      elm.className = edit.GetClassName('Input');
    }

    if(((v == '')&&((!edit.HasFocus)||(nge_HintStyle(edit)===ngHintHideOnInput))) || (edit.HintVisible))
    {
      var hint=edit.GetHint();
      if(hint!='') {
        edit.HintVisible=true;
        elm.className = edit.GetClassName('Input',hint);
        elm.value=hint;
        edit.SetCaretPos(0);
      }
      else edit.HintVisible=false;
    }
  }
}

function ngem_KeyPress(e,elm)
{
  if(!e) e=window.event;
  var edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngMemo');
  if((edit)&&(edit.Enabled))
  {
    e.Owner=edit;
    if((edit.OnKeyPress)&&(!ngVal(edit.OnKeyPress(e),false))) return false;
  }
}

function ngem_KeyDown(e,elm)
{
  if(!e) e=window.event;
  var edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngMemo');
  if((edit)&&(edit.Enabled))
  {
    e.Owner=edit;
    if((edit.OnKeyDown)&&(!ngVal(edit.OnKeyDown(e),false))) return false;

    if(edit.HintVisible)
    {
      switch(e.keyCode)
      {
        case 35: // End
        case 36: // Home
        case 37: // Left
        case 39: // Right
        case 38: // Up
        case 40: // Down
        case 8:  // Backspace
        case 46: // Delete
        case 33: // PgUp
        case 34: // PgDown
          if(e.preventDefault) e.preventDefault();
          e.returnValue = false;
          break;
      }
    }

    if(e.keyCode==13)
    {
      // prevent parent window(s) fire default button
      var pc=edit.ParentControl;
      while(pc)
      {
        if(pc.CtrlType=='ngWindow') pc.IgnoreDefFormBtn=true;
        pc=pc.ParentControl;
      }
    }
  }
  return false;
}

function ngem_KeyUp(e,elm)
{
  if(!e) e=window.event;
  var edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngMemo');
  if((edit)&&(edit.Enabled))
  {
    e.Owner=edit;
    nge_KeyUpHint(edit,elm,'Input');

    if((edit.OnKeyUp)&&(!ngVal(edit.OnKeyUp(e),false))) return false;
    ngem_TextChanged(e,elm,edit);
    if((e.keyCode==27)&&(edit))
    {
      nge_DefFormButton(edit, 0);
    }
  }
}

function ngem_SetText(text)
{
  if(this.OnSetText) text=this.OnSetText(text,this);
  if(text!=this.Text)
  {
    this.Text=text;
    var o=document.getElementById(this.ID+'_T');
    if(o)
    {
      this.HintVisible=false;
      if(text=='')
      {
        var hint=this.GetHint();
        if((hint!='')&&((!this.HasFocus)||(nge_HintStyle(this)===ngHintHideOnInput))) {
          this.HintVisible=true;
          o.value = hint;
        }
        else o.value=text;
      }
      else o.value=text;
    }
    if(this.OnTextChanged) this.OnTextChanged(this);
    if(o) o.className = this.GetClassName('Input', hint);
  }
}

function ngem_DoFocus(e, elm)
{
  this.HasFocus=true;
  this.DoUpdateImages();
  nge_BeginMobileKeyboard();

  if(this.HintVisible) this.SetCaretPos(0);
  if((this.OnFocus)&&(this.Enabled)) this.OnFocus(this);

  if((this.Text == '')&&(nge_HintStyle(this)===ngHintHideOnFocus))
  {
    this.HintVisible=false;
    elm.value='';
    elm.className = this.GetClassName('Input');
  }
}

function ngem_DoBlur(e, elm)
{
  this.HasFocus=false;
  nge_EndMobileKeyboard()
  if((this.OnBlur)&&(this.Enabled)) this.OnBlur(this);
  if((this.Text == '')&&(!this.HintVisible))
  {
    var o=document.getElementById(this.ID+'_T');
    if(o)
    {
      var hint=this.GetHint();
      if(hint!='') {
        this.HintVisible=true;
        o.className = this.GetClassName('Input',hint);
        o.value=hint;
      }
    }
  }
  this.DoUpdateImages();
}

function ngem_DoUpdateImages()
{
  ngc_ChangeBox(this.ID, (this.HasFocus ? 1 : 0), this.Enabled, this.Frame);
}

function ngem_DoUpdate(o)
{
  var html=new ngStringBuilder;

  var cclass=this.BaseClassName;

  var l=0,t=0;
  var w=ng_ClientWidth(o);
  var h=ng_ClientHeight(o);

  var dp=new Object;
  ngc_ImgBox(html, this.ID, 'ngMemo', (this.HasFocus ? 1 : 0), this.Enabled, 0,0,w,h,false, this.Frame, '', { Content: 'class="'+cclass+'Back"' }, '', dp);

  var alt=this.GetAlt();
  var hint=(((!this.ControlHasFocus)||(nge_HintStyle(this)===ngHintHideOnInput)) ? this.GetHint() : '');

  l+=dp.Left.W; w-=(dp.Left.W + dp.Right.W);
  t+=dp.Top.H;  h-=(dp.Top.H + dp.Bottom.H);
  if(w<0) w=0;
  if(h<0) h=0;

  var readonly=(!this.Enabled)||(this.ReadOnly);
  // If focused, we cannot use innerHTML because the input element must not be removed from DOM
  var to=(this.ControlHasFocus ? document.getElementById(this.ID+'_T') : null);
  if(to) // updating DOM
  {
    // remove all except the input element
    var nx,n=o.lastChild;
    while(n)
    {
      nx=n.previousSibling;
      if(n!=to) o.removeChild(n);
      n=nx;
    }

    // create DOM before input element
    var temp = document.createElement('div');
    ng_SetInnerHTML(temp,html.toString());

    // insert DOM before input element
    n=temp.firstChild;
    while(n)
    {
      nx=n.nextSibling;
      o.insertBefore(n, to);
      n=nx;
    }

    // update input element
    to.className=this.GetClassName('Input',hint);
    if(alt!='')  to.setAttribute("title",alt);
    else         to.removeAttribute("title");
    if(readonly)
    {
      to.setAttribute("readonly","readonly");
      if(ngIExplorer) this.SetFocus(false);
    }
    else to.removeAttribute("readonly");
    to.style.textAlign=this.TextAlign;
    to.style.left=l+'px';
    to.style.top=t+'px';
    to.style.width=w+'px';
    to.style.height=h+'px';
    if((this.HintVisible)&&(to.value!=hint))
    {
      to.value=hint;
      this.SetCaretPos(0);
    }
  }
  else
  {
    this.HintVisible=(this.Text=='')&&(hint!='');
    html.append('<textarea ');
    if(alt!='') html.append('title="'+ng_htmlEncode(alt)+'" ');
    if(readonly) html.append('readonly="readonly" ');
    html.append('id="'+this.ID+'_T" class="'+this.GetClassName('Input',hint));
    html.append('" style="border:0px; margin:0px 0px 0px 0px; padding: 0px 0px 0px 0px; overflow: auto; text-align:'+this.TextAlign+';position: absolute; z-index:1;left:'+l+'px;top:'+t+'px;width:'+w+'px;height:'+h+'px;" ');
    html.append('onkeydown="ngem_KeyDown(event,this)" onkeyup="ngem_KeyUp(event,this)" onkeypress="ngem_KeyPress(event,this)" onchange="ngem_TextChanged(event,this)"');
    html.append(' onfocus="ngc_Focus(event,this,\'ngMemo\')" onblur="ngc_Blur(event,this,\'ngMemo\')"');
    html.append('>');
    html.append(ng_htmlEncode(this.Text == '' ? hint : this.Text));
    html.append('</textarea>');

    ng_SetInnerHTML(o,html.toString());
  }
  return true;
}

function ngem_DoMouseEnter(e, mi, elm)
{
  var o=document.getElementById(this.ID+'_T');
  if(o)
  {
    var cn=o.className;
    var i=cn.indexOf('_Focus');
    if(i<0) cn=cn+'_Focus';
    o.className=cn;
  }
  ngc_EnterBox(this.ID);
  if(this.OnMouseEnter) this.OnMouseEnter(this);
}

function ngem_DoMouseLeave(e, mi)
{
  if(this.OnMouseLeave) this.OnMouseLeave(this);

  var o=document.getElementById(this.ID+'_T');
  if(o)
  {
    var cn=o.className;
    var i=cn.indexOf('_Focus');
    if(i>=0) cn=cn.substring(0,i);
    o.className=cn;
  }
  ngc_LeaveBox(this.ID);
}

function ngem_DoAcceptGestures(o,gestures)
{
  gestures.drag=true;
  gestures.tap=true;
}

function ngem_DoPtrStart(pi)
{
  if(pi.EventID==='control')
  {
    pi.PreventDefault=false;
  }
}

function ngem_DoPtrClick(pi)
{
  if(pi.EventID==='control')
  {
    if((this.HintVisible)&&(nge_HintStyle(this)===ngHintHideOnInput)) this.SetCaretPos(0);
  }
}

/**
 *  Class: ngMemo
 *  This class implements a generic memo control.
 *
 *  Syntax:
 *    new *ngMemo* ([string id, string text=''])
 *
 *  Parameters:
 *    id - parent element
 *    text - memo text
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngMemo(id, text)
{
  ngControl(this, id, 'ngMemo');

  this.DoAcceptGestures = ngem_DoAcceptGestures;
  this.DoGesture = nge_DoGesture;
  this.DoPtrStart = ngem_DoPtrStart;
  this.DoPtrClick = ngem_DoPtrClick;

  /*
   *  Group: Properties
   */
  /*  Variable: Text
   *  ...
   *  Type: string
   */
  this.Text = ngVal(text,'');
  /*  Variable: DefaultText
   *  ...
   *  Type: string
   */
  this.DefaultText = '';
  /*  Variable: TextAlign
   *  ...
   *  Type: string
   *  Default value: *'left'*
   */
  this.TextAlign = 'left';
  /*  Variable: Alt
   *  ...
   *  Type: string
   */
  this.Alt = '';
  /*  Variable: Hint
   *  ...
   *  Type: string
   */
  this.Hint = '';
  /*  Variable: HintStyle
   *  ...
   *  Type: integer
   */
  //this.HintStyle = undefined;
  /*  Variable: ReadOnly
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.ReadOnly = false;
  /*  Variable: Frame
   *  ...
   *  Type: object
   */
  this.Frame = new Object;

  /*  Variable: HasFocus
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.HasFocus=false;

  /*  Variable: SelectOnFocus
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.SelectOnFocus=true;

  /*
   *  Group: Methods
   */
  /*  Function: SetText
   *  Sets memo text.
   *
   *  Syntax:
   *    void *SetText* (string text)
   *
   *  Returns:
   *    -
   */
  this.SetText = ngem_SetText;
  /*  Function: GetText
   *  Gets memo text.
   *
   *  Syntax:
   *    string *GetText* ()
   *
   *  Returns:
   *    Memo text.
   */
  this.GetText = ngc_GetText;
  /*  Function: GetAlt
   *  Gets alt text.
   *
   *  Syntax:
   *    string *GetAlt* (void)
   *
   *  Returns:
   *    Alt text.
   */
  this.GetAlt=ngc_GetAlt;
  /*  Function: GetHint
   *  Gets hint text.
   *
   *  Syntax:
   *    string *GetHint* (void)
   *
   *  Returns:
   *    Hint text.
   */
  this.GetHint=ngc_GetHint;

  /*  Function: SetReadOnly
   *  Sets readonly state of control.
   *
   *  Syntax:
   *    void *SetReadOnly* ([bool ro=true])
   *
   *  Parameters:
   *    ro - readonly state
   *
   *  Returns:
   *    -
   */
  this.SetReadOnly=nge_SetReadOnly;

  /*  Function: GetCaretPos
   *  Gets caret position.
   *
   *  Syntax:
   *    int *GetCaretPos* ()
   *
   *  Returns:
   *    Caret position or undefined if edit is not focused.
   */
  this.GetCaretPos = nge_GetCaretPos;

  /*  Function: SetCaretPos
   *  Sets caret position.
   *
   *  Syntax:
   *    void *SetCaretPos* (int pos)
   *
   *  Parameters:
   *    ro - caret position
   *
   *  Returns:
   *    -
   */
  this.SetCaretPos = nge_SetCaretPos;

  this.GetClassName = nge_GetClassName;
  this.DoMouseEnter = ngem_DoMouseEnter;
  this.DoMouseLeave = ngem_DoMouseLeave;
  this.DoSetEnabled = nge_DoSetEnabled;
  this.DoFocus = ngem_DoFocus;
  this.DoBlur = ngem_DoBlur;

  this.DoUpdateImages = ngem_DoUpdateImages;
  this.DoUpdate = ngem_DoUpdate;
  this.SetFocus = nge_SetFocus;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnSetText
   */
  this.OnSetText = null;
  /*
   *  Event: OnGetText
   */
  this.OnGetText = null;

  /*
   *  Event: OnTextChanged
   */
  this.OnTextChanged = null;
  /*
   *  Event: OnGetAlt
   */
  this.OnGetAlt = null;
  /*
   *  Event: OnGetHint
   */
  this.OnGetHint = null;
  /*
   *  Event: OnGetClassName
   */
  this.OnGetClassName = null;

  /*
   *  Event: OnKeyDown
   */
  this.OnKeyDown = null;
  /*
   *  Event: OnKeyUp
   */
  this.OnKeyUp = null;
  /*
   *  Event: OnKeyPress
   */
  this.OnKeyPress = null;

  /*
   *  Event: OnMouseEnter
   */
  this.OnMouseEnter = null;
  /*
   *  Event: OnMouseLeave
   */
  this.OnMouseLeave = null;

  /*
   *  Event: OnFocus
   */
  this.OnFocus = null;
  /*
   *  Event: OnBlur
   */
  this.OnBlur = null;

  ngControlCreated(this);
}

// --- ngPages -----------------------------------------------------------------

var ngpg_CurrentPageId='';

function ngpg_DoPtrClick(pi)
{
  var eid=pi.EventID;
  if(eid.substr(0,4)!=='page') return;
  var pg=eid.substring(4,eid.length);
  var e=pi.Event;
  e.Owner=this;
  e.pages=this;
  e.page=pg;
  if((this.OnClick)&&(!ngVal(this.OnClick(e),false))) return;
  if(pg!='') this.SetPage(parseInt(pg));
}

function ngpg_DoPtrDblClick(pi)
{
  var eid=pi.EventID;
  if(eid.substr(0,4)!=='page') return;
  var pg=eid.substring(4,eid.length);
  var e=pi.Event;
  e.Owner=this;
  e.pages=this;
  e.page=pg;
  if((this.OnDblClick)&&(!ngVal(this.OnDblClick(e),false))) return;
}

function ngpg_DoPtrStart(pi)
{
  if(pi.Touch)
  {
    var eid=pi.EventID;
    if(eid.substr(0,4)==='page')
    {
      ngpg_EnterPg(pi.Event,pi.SrcElement);
    }
  }
}

function ngpg_DoPtrDrag(pi)
{
  if(pi.Touch)
  {
    var eid=pi.EventID;
    if(eid.substr(0,4)==='page')
    {
      if(!pi.IsInSrcElement())
      {
        if(ngpg_CurrentPageId==pi.SrcElement.id)
          ngpg_LeavePg(pi.Event,pi.SrcElement);
      }
      else
      {
        if(ngpg_CurrentPageId!=pi.SrcElement.id)
          ngpg_EnterPg(pi.Event,pi.SrcElement);
      }
    }
  }
  return false;
}

function ngpg_DoPtrEnd(pi)
{
  if(pi.Touch)
  {
    var eid=pi.EventID;
    if(eid.substr(0,4)==='page')
    {
      if(pi.IsInSrcElement())
      {
        if(ngpg_CurrentPageId==pi.SrcElement.id)
          ngpg_LeavePg(pi.Event,pi.SrcElement);
      }
    }
  }
}

function ngpg_EnterPg(e,elm)
{
  if(!e) e=window.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  var cn=elm.className;
  if(ngpg_CurrentPageId!='')
  {
    var o=document.getElementById(ngpg_CurrentPageId);
    ngpg_LeavePg(e,o);
  }
  ngpg_CurrentPageId=elm.id;
  var i=cn.indexOf('_Focus');
  if(i<0) cn=cn+'_Focus';
  elm.className=cn;
  ngc_EnterImg(elm.id+'_IL');
  ngc_EnterImgS(elm.id+'_IM');
  ngc_EnterImg(elm.id+'_IR');
}

function ngpg_LeavePg(e,elm)
{
  if(!e) e=window.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  var cn=elm.className;
  if(ngpg_CurrentPageId==elm.id) ngpg_CurrentPageId='';
  var i=cn.indexOf('_Focus');
  if(i>=0) cn=cn.substring(0,i);
  elm.className=cn;
  ngc_LeaveImg(elm.id+'_IL');
  ngc_LeaveImgS(elm.id+'_IM');
  ngc_LeaveImg(elm.id+'_IR');
}

function ngpg_ChangePageState(p, s)
{
  var pid=this.ID+'_'+p;
  var o=document.getElementById(pid);
  if(o)
  {
    var co=this.Elm();
    if(!co) return;
    var cclass=this.BaseClassName;

    var cn='';
    var pimage=(this.PageImages.length ? this.PageImages[p % this.PageImages.length] : new Object);

    var enabled=((this.Enabled)&&(this.Pages[p])&&(ngVal(this.Pages[p].Enabled,true)));
    if(!enabled) cn='PageDisabled';
    else cn=(s ? 'PageSelected' : 'Page');

    var i=o.className.indexOf('_Focus');
    if(i>=0) cn+='_Focus';
    o.className=cclass + cn;
    if(pimage.LeftImg) ngc_ChangeImage(ngpg_ImgDrawProps(pid+'_IL', s, enabled, pimage.LeftImg));
    if(pimage.MiddleImg) ngc_ChangeImageS(ngpg_ImgDrawProps(pid+'_IM', s, enabled, pimage.MiddleImg));
    if(pimage.RightImg) ngc_ChangeImage(ngpg_ImgDrawProps(pid+'_IR', s, enabled, pimage.RightImg));
  }
}

function ngpg_GetPageByText(txt)
{
  if(ngVal(txt,'')=='') return -1;
  var pg,text;
  for(i=0;i<this.Pages.length;i++)
  {
    pg=this.Pages[i];

    if(this.OnGetText) text=ngVal(this.OnGetText(this, i),'');
    else text=ngVal((pg ? pg.Text : ''),'');

    if(text == txt) return i;
  }
  return -1;
}

function ngpg_GetPageById(id)
{
  if(ngVal(id,'')=='') return -1;
  var pg;
  for(i=0;i<this.Pages.length;i++)
  {
    pg=this.Pages[i];
    if(!pg) continue;
    if(pg.id == id) return i;
  }
  return -1;
}

function ngpg_GetIdByPage(page)
{
  if (ngVal(page, -1)<0) return '';

  if (typeof(this.Pages[page])=='undefined') return '';
  if (typeof(this.Pages[page].id)=='undefined') return '';

  return this.Pages[page].id;
}

function ngpg_GetPageObjById(id)
{
  var idx=this.GetPageById(id);
  if(idx<0) return null;
  return this.Pages[idx];
}

function ngpg_GetPageByControl(ctrl)
{
  var i,p=ctrl.ParentControl;
  while(p)
  {
    for(i=0;i<this.Pages.length;i++)
      if(p==this.Pages[i].ControlsPanel) return i;
    p=p.ParentControl;
  }
  return -1;
}

function ngpg_GetPageObjByControl(ctrl)
{
  var idx=this.GetPageByControl(ctrl);
  if(idx<0) return null;
  return this.Pages[idx];
}

function ngpg_SetPageByControl(ctrl)
{
  var idx=this.GetPageByControl(ctrl);
  if(idx<0) return false;
  this.SetPage(idx);
  return (this.Page==idx);
}

function ngpg_SetPage(p)
{
  if(typeof p === 'string')
  {
    var s=p;
    p=this.GetPageById(s);
    if(p<0) p=this.GetPageByText(s);
    if(p<0) p=s;
  }
  p=parseInt(p);
  if((p<0)||(p>=this.Pages.length)||(isNaN(p))) return;
  if(p!=this.Page)
  {
    if((this.OnPageChanging)&&(!ngVal(this.OnPageChanging(this,p),false))) return;

    var op=this.Page;
    this.Page=p;

    var pg=this.Pages[op];
    if((typeof pg!=='undefined')&&(pg.ControlsPanel))
      pg.ControlsPanel.SetVisible(false);

    if(this.PagesVisible)
    {
      if(this.row1pages[p])
      {
        this.ChangePageState(p,1);
        this.ChangePageState(op,0);
      }
      else this.Update();
    }

    pg=this.Pages[p];
    if((typeof pg!=='undefined')&&(pg.ControlsPanel))
      pg.ControlsPanel.SetVisible(true);

    if(this.OnPageChanged) this.OnPageChanged(this,op);
  }
}

function ngpg_ImgDrawProps(id, s, enabled,o)
{
  var v=ngc_ImgProps(id,s,enabled,o);
  if(ngpg_CurrentPageId==id.substring(0,id.length-3)) { v.aL=v.oL; v.aT=v.oT; }
  else { v.aL=v.L; v.aT=v.T; }
  return v;
}

function ngpg_DoRelease(o)
{
  o.style.display='none';
  this.row1pages = new Array();
}

function ngpg_DoUpdate(o)
{
  var frame=document.getElementById(this.ID+'_F');
  if(!frame) return true;

  var cclass=this.BaseClassName;

  var html=new ngStringBuilder;
  var w=ng_ClientWidth(o);
  var h=ng_ClientHeight(o);

  this.row1pages = new Array();
  if(this.PagesVisible)
  {
    var i,j,dp,pid,image,pimage,x,y, tx, txtclass, tw, rh=0, th,tl,mw, s, text, alt;

    var swapy = (this.PagesVAlign == 'bottom');
    var swapx = (this.PagesAlign == 'right');

    var pw=w-this.PagesIndent;
    if((this.PagesSize>0)&&(pw>this.PagesSize)) pw=this.PagesSize;
    if(this.PagesSize<0) pw+=this.PagesSize;
    if(swapx)
    {
      if(swapy) image=this.Frame.LeftBottom;
      else image=this.Frame.LeftTop;
    }
    else
    {
      if(swapy) image=this.Frame.RightBottom;
      else image=this.Frame.RightTop;
    }
    if(typeof image !== 'undefined') pw-=image.W;


    var tab,pg,enabled;
    var row = new Object;
    row.Tabs = new Array();
    var rows = new Array();
    rows[0]=row;
    var selrow = 0;

    y=0; x=0;
    for(i=0,j=0;i<this.Pages.length;i++)
    {
      pg=this.Pages[i];
      if((pg)&&(!ngVal(pg.Visible,true))) continue;
      s=(i==this.Page ? 1 : 0);

      if(this.OnGetText) text=ngVal(this.OnGetText(this, i),'');
      else text=ngVal((pg ? pg.Text : ''),'');
      if(this.HTMLEncode) text=ng_htmlEncode(text);

      if(this.OnGetAlt) alt=ngVal(this.OnGetAlt(this, i),'');
      else alt=ngVal((pg ? pg.Alt : ''),'');

      enabled=(this.Enabled)&&(ngVal(pg.Enabled,true));
      if(enabled)
      {
        if(s) txtclass='PageSelected';
        else  txtclass='Page';
      }
      else txtclass='PageDisabled';
      txtclass=cclass+txtclass;

      pid=this.ID+'_'+i;
      pimage=(this.PageImages.length ? this.PageImages[j] : new Object);

      tab = new Object;
      tab.Enabled = enabled;
      tab.Page = i;
      tab.Text = text;
      tab.Alt = alt;
      tab.id=pid;
      tab.txtclass=txtclass;

      th=0;
      tw=0;
      tx=0;
      mw=0;

      image=pimage.LeftImg;
      if(image)
      {
        dp=ngpg_ImgDrawProps(pid+'_IL', s, enabled, image);
        dp.Attrs=image.Attrs;
        mw+=dp.W;
        tab.LeftImg = dp;
      } else tab.LeftImg = null;
      image=pimage.MiddleImg;
      if(image)
      {
        dp=ngpg_ImgDrawProps(pid+'_IM', s, enabled, image);
        dp.Attrs=image.Attrs;
        tab.MiddleImg = dp;
      } else tab.MiddleImg = null;
      image=pimage.RightImg;
      if(image)
      {
        dp=ngpg_ImgDrawProps(pid+'_IR', s, enabled, image);
        dp.Attrs=image.Attrs;
        mw+=dp.W;
        tab.RightImg = dp;
      } else tab.RightImg = null;
      image=pimage.Separator;
      if(image)
      {
        dp=ngpg_ImgDrawProps(pid+'_IS', s, this.Enabled, image);
        dp.Attrs=image.Attrs;
        tab.Separator = dp;
      }
      else tab.Separator = null;

      // Measure text
      if(text!='')
      {
        ng_SetInnerHTML(frame,'<div id="'+this.ID+'_T" class="'+txtclass+'" style="position:absolute; visibility: hidden; white-space: nowrap;"><div class="'+cclass+'PageText">'+text+'</div></div>');
        var o2=document.getElementById(this.ID+'_T');
        if(o2)
        {
          if(typeof pg.W!=='undefined') tw=pg.W-mw;
          else
          {
            tw=ng_ClientWidth(o2);
            if((typeof pg.MinWidth!=='undefined')&&(tw+mw<pg.MinWidth)) tw=pg.MinWidth-mw;
          }
          th=ng_ClientHeight(o2);
        }
      }

      dp = tab.LeftImg;
      if(dp)
      {
        tx+=dp.W;
        if(dp.H>th) th=dp.H;
      }
      tl=tx;
      dp = tab.MiddleImg;
      if((dp)&&(dp.H>th)) th=dp.H;
      tx+=tw;
      dp = tab.RightImg;
      if(dp)
      {
        if(dp.H>th) th=dp.H;
        tx+=dp.W;
      }

      dp=tab.Separator;
      if((dp)&&(dp.H>th)) th=dp.H;

      tab.w=tx;
      tab.tw=tw;
      tab.th=th;

      if((x+tx>pw)&&(row.Tabs.length>0))
      {
        dp=row.Tabs[row.Tabs.length-1];
        if(dp.Separator) { x-=dp.Separator.W; dp.w-=dp.Separator.W; }
        dp.Separator=null;

        row.h=rh;
        row.w=x;
        row=new Object;
        row.Tabs = new Array();
        rows[rows.length]=row;
        if((this.MaxRows>0)&&(rows.length>this.MaxRows)) break;
        y=y+rh; // changed from y+=rh - IE9 strange bug
        x=0; rh=0;
      }
      if(image) { tx+=image.W;  tab.w=tx; }
      if(th>rh) rh=th;
      row.Tabs[row.Tabs.length] = tab;
      if(s) selrow=rows.length-1;

      x+=tx;
      j++; if(j>=this.PageImages.length) j=0;
    }
    if(row.Tabs.length>0)
    {
      dp=row.Tabs[row.Tabs.length-1];
      if(dp.Separator) { x-=dp.Separator.W; dp.w-=dp.Separator.W; }
      dp.Separator=null;

      row.h=rh;
      row.w=x;
    } else rows.length=rows.length-1;
    y-=(this.RowOverlap * (rows.length-1));
    var ch=y+rh;
    for(i=0;i<this.Pages.length;i++)
    {
      pg=this.Pages[i];
      if((pg)&&(pg.ControlsPanel))
      {
        if(swapy)
        {
          if(pg.ControlsPanel.Bounds.B != ch)
          {
            pg.ControlsPanel.Bounds.B = ch;
            pg.ControlsPanel.SetBounds();
          }
        }
        else
        {
          if(pg.ControlsPanel.Bounds.T != ch)
          {
            pg.ControlsPanel.Bounds.T = ch;
            pg.ControlsPanel.SetBounds();
          }
        }
      }
    }

    if(swapy) { ngc_ImgBox(html, this.ID, 'ngPages', 0, this.Enabled, 0,0,w,h-y,false, this.Frame); y=h; }
    else      { ngc_ImgBox(html, this.ID, 'ngPages', 0, this.Enabled, 0,y,w,h-y,false, this.Frame); y=0; }

    dp=new Array(rows.length);
    for(j=selrow,i=0;i<rows.length;i++)
    {
      dp[rows.length-i-1]=rows[j++];
      if(j>=rows.length) j=0;
    }
    rows=dp;

    // Draw tabs
    for(i=0;i<rows.length;i++)
    {
      row=rows[i];
      if((!swapy)||(i>0)) row.h-=this.RowOverlap;
      if((rows.length>1)&&(row.Tabs.length>0))
      {
        tw=Math.floor((pw-row.w)/row.Tabs.length);
        tx=0;
        x=0;
        for(j=0;j<row.Tabs.length;j++)
        {
          tab=row.Tabs[j];
          tab.tw+=tw;
          tab.w+=tw;
          if(tab.LeftImg) tx+=tab.LeftImg.W;
          tx+=tab.tw;
          if(tab.RightImg) tx+=tab.RightImg.W;
          if(tab.Separator) tx+=tab.Separator.W;
        }
        tx=pw-tx;
        if(tx>0)
        {
          x=Math.floor(row.Tabs.length/(tx));
          if(x<=0) x=1;
          for(j=0;(j<row.Tabs.length)&&(tx>0);j++)
          {
            tab=row.Tabs[j];
            if(!(j%x)) { tab.tw++; tab.w++; tx--; }
          }
         }
      }
      if(swapy) y-=row.h;
      x=this.PagesIndent;
      for(j=0;j<row.Tabs.length;j++)
      {
        tab=row.Tabs[j];
        if(i==rows.length-1) this.row1pages[tab.Page]=true;
        tx=0;
        html.append('<div style="position:absolute; left:'+(swapx ? w-x-tab.w : x)+'px; top:'+y+'px;">');

        if(swapx)
        {
          image=tab.Separator;
          if(image) { ngc_Img(html,image,"position:absolute; left: "+tx+"px;",ngVal(image.Attrs,''));  tx+=image.W; }
        }
        html.append('<div id="'+tab.id+'" class="'+tab.txtclass+'" ');
        if(tab.Alt!='') html.append('title="'+tab.Alt+'" ');
        if(tab.Enabled)
        {
          if(typeof this.Cursor !== 'undefined')
          {
            if(this.Cursor!='') html.append('style="cursor:'+this.Cursor+';" ');
          }
          else html.append('style="cursor:pointer;" ');
          html.append(ngc_PtrEventsHTML(this,'page'+tab.Page,'tap drag'+(this.OnDblClick ? ' doubletap' : ''))+' ');
        }
        else html.append('style="cursor:default;" ');
        html.append('onmouseover="ngpg_EnterPg(event,this);" onmouseout="ngpg_LeavePg(event,this);">');
        image=tab.LeftImg;
        if(image) { ngc_Img(html,image,"position:absolute; left: "+tx+"px;",ngVal(image.Attrs,'')); tx+=image.W; tl=tx; }
        else tl=0;
        image=tab.MiddleImg;
        if(image) { ngc_ImgSW(html,image,tx,tab.tw,"",ngVal(image.Attrs,'')); tx+=tab.tw; }
        image=tab.RightImg;
        if(image) { ngc_Img(html,image,"position:absolute; left: "+tx+"px;",ngVal(image.Attrs,''));  tx+=image.W; }
        html.append('<div id="'+tab.id+'_T" style="position:absolute; left:'+tl+'px; overflow: hidden; top:0px; width:'+tab.tw+'px; text-align: '+this.TextAlign+'; white-space: nowrap;'+(tab.th>0 ? 'line-height:'+tab.th+'px;' : '')+'"><div class="'+cclass+'PageText">'+tab.Text+'</div></div>');
        html.append('</div>');

        if(!swapx)
        {
          image=tab.Separator;
          if(image) { ngc_Img(html,image,"position:absolute; left: "+tx+"px;",ngVal(image.Attrs,''));  tx+=image.W; }
        }
        html.append('</div>');
        x+=tx;
      }
      if(!swapy) y+=row.h;
    }
  } else ngc_ImgBox(html, this.ID, 'ngPages', 0, this.Enabled, 0,0,w,h, false, this.Frame);

  ng_SetInnerHTML(frame,html.toString());
  return true;
}

function ngpg_DoCreate(d, ref, elm, parent)
{
  if((typeof d.Pages !== 'undefined')&&(typeof this.Pages === 'object'))
  {
    var pg,p,pgclass=this.BaseClassName+'ControlsPanels';
    for(var i in d.Pages)
    {
      p=d.Pages[i];
      pg = new Object;
      var cntrls=p.Controls;
      delete p.Controls;
      ng_MergeDef(pg,p);
      p.Controls=cntrls;

      this.Pages[i]=pg;

      var ldefs=new Object;
      ldefs.ControlsPanel = new Object;
      ng_MergeDef(ldefs.ControlsPanel, p.ControlsPanel);
      ng_MergeDef(ldefs.ControlsPanel, d.ControlsPanel);

      ng_MergeDef(ldefs.ControlsPanel, {
        Type: 'ngPanel',
        className: pgclass,
        id: this.ID+'_P'+i,
        ScrollBars: ssAuto,
        L:0,T:0,R:0,B:0,
        Data: {
          Visible: false
        }
      });
      ldefs.ControlsPanel.Controls=p.Controls;
      ldefs.ControlsPanel.ModifyControls=p.ModifyControls;
      if(i==this.Page) ldefs.ControlsPanel.Data.Visible=true;

      var lref=ngCreateControls(ldefs,undefined,this.ID);
      if(!ngVal(d.ParentReferences,true))
      {
        (function (pg,pgid,pages) {
          pg.Controls = new Object;
          pg.Controls.Owner = pages;
          pg.Controls.AddControls = function(defs, newparent) { ngCreateControls(defs,pg,ngVal(newparent,pgid)); }
        })(pg,ldefs.ControlsPanel.id,this);
        ref=pg.Controls;
      }
      pg.ControlsPanel=lref.ControlsPanel;
      pg.ControlsPanel.Owner=this;
      delete lref.ControlsPanel;
      ngCloneRefs(ref,lref);
    }
  }
  var nd=document.createElement('div');
  nd.id=this.ID+'_F';
  nd.style.position="absolute";
  nd.style.zIndex="800";
  elm.appendChild(nd);

//  ng_AppendInnerHTML(elm,'<div id="'+this.ID+'_F" style="position: absolute;z-index:800;"></div>');
}

/**
 *  Class: ngPages
 *  This class implements a generic page control.
 *
 *  Syntax:
 *    new *ngPages* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngPages(id)
{
  ngControl(this, id, 'ngPages');
  this.DoCreate = ngpg_DoCreate;
  /*
   *  Group: Definition
   */
  /*
   *  Variable: Pages
   *  ...
   *  Type: array
   */
  /*<>*/
  /*
   *  Variable: ControlsPanel
   *  Controls panel definition.
   *  Type: object
   */
  /*<>*/

  /*
   *  Group: Properties
   */
  /*  Variable: Page
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.Page = 0;
  /*  Variable: PagesVisible
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.PagesVisible = true;
  /*  Variable: PagesIndent
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.PagesIndent = 0;
  /*  Variable: PagesSize
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.PagesSize = 0;
  /*  Variable: MaxRows
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.MaxRows = 0;
  /*  Variable: PagesAlign
   *  ...
   *  Type: string
   *  Default value: *'left'*
   */
  this.PagesAlign = 'left';
  /*  Variable: PagesVAlign
   *  ...
   *  Type: string
   *  Default value: *'top'*
   */
  this.PagesVAlign = 'top';
  /*  Variable: TextAlign
   *  ...
   *  Type: string
   *  Default value: *'center'*
   */
  this.TextAlign = 'center';
  /*  Variable: HTMLEncode
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.HTMLEncode = false;

  /*  Variable: Pages
   *  ...
   *  Type: array
   */
  this.Pages = new Array();

  /*  Variable: RowOverlap
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.RowOverlap = 0;
  /*  Variable: PageImages
   *  ...
   *  Type: array
   */
  this.PageImages = new Array();
  /*  Variable: Frame
   *  ...
   *  Type: object
   */
  this.Frame = new Object;

  /*
   *  Group: Methods
   */
  /*  Function: SetPage
   *  Sets current page index.
   *
   *  Syntax:
   *    void *SetPage* (mixed page)
   *
   *  Returns:
   *    -
   */
  this.SetPage = ngpg_SetPage;

  /*  Function: GetPageById
   *  Gets page index by page id.
   *
   *  Syntax:
   *    int *GetPageById* (string id)
   *
   *  Returns:
   *    Page index or -1 if not found.
   */
  this.GetPageById = ngpg_GetPageById;

  /*  Function: GetIdByPage
   *  Gets page id by page index.
   *
   *  Syntax:
   *    string *GetIdByPage* (int page)
   *
   *  Returns:
   *    Page id or empty string if not found.
   */
  this.GetIdByPage = ngpg_GetIdByPage;

  /*  Function: GetPageObjById
   *  Gets page object by page id.
   *
   *  Syntax:
   *    object *GetPageObjById* (string id)
   *
   *  Returns:
   *    Page object or null if not found.
   */
  this.GetPageObjById = ngpg_GetPageObjById;

  /*  Function: GetPageByText
   *  Gets page index by page text caption.
   *
   *  Syntax:
   *    int *GetPageByText* (string text)
   *
   *  Returns:
   *    Page index or -1 if not found.
   */
  this.GetPageByText = ngpg_GetPageByText;

  /*  Function: GetPageByControl
   *  Gets page index by control placed on page.
   *
   *  Syntax:
   *    int *GetPageByControl* (object control)
   *
   *  Returns:
   *    Page index or -1 if not found.
   */
  this.GetPageByControl = ngpg_GetPageByControl;

  /*  Function: GetPageObjByControl
   *  Gets page object by control placed on page.
   *
   *  Syntax:
   *    int *GetPageObjByControl* (object control)
   *
   *  Returns:
   *    Page object or null if not found.
   */
  this.GetPageObjByControl = ngpg_GetPageObjByControl;

  /*  Function: SetPageByControl
   *  Sets page by control placed on page.
   *
   *  Syntax:
   *    bool *SetPageByControl* (object control)
   *
   *  Returns:
   *    TRUE if page was successfuly set.
   */
  this.SetPageByControl = ngpg_SetPageByControl;

  this.row1pages = new Array();
  this.ChangePageState = ngpg_ChangePageState;
  this.DoRelease = ngpg_DoRelease;
  this.DoPtrStart = ngpg_DoPtrStart;
  this.DoPtrDrag = ngpg_DoPtrDrag;
  this.DoPtrEnd = ngpg_DoPtrEnd;
  this.DoUpdate = ngpg_DoUpdate;
  this.DoPtrClick = ngpg_DoPtrClick;
  this.DoPtrDblClick = ngpg_DoPtrDblClick;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnPageChanging
   */
  this.OnPageChanging = null;
  /*
   *  Event: OnPageChanged
   */
  this.OnPageChanged = null;

  /*
   *  Event: OnGetText
   */
  this.OnGetText = null;
  /*
   *  Event: OnGetAlt
   */
  this.OnGetAlt = null;

  /*
   *  Event: OnClick
   */
  this.OnClick = null;
  /*
   *  Event: OnDblClick
   */
  this.OnDblClick = null;

  ngControlCreated(this);
}

// --- ngToolBar ---------------------------------------------------------------

function ngtb_DoCreate(d, ref, elm, parent)
{
  if(typeof d.Data==='undefined') d.Data=new Object;
  var vertical=ngVal(d.Data.Vertical,this.Vertical);
  if(vertical)
  {
    if((typeof d.W === 'undefined')&&((typeof d.L === 'undefined')||(typeof d.R === 'undefined'))&&(typeof d.Data.AutoSize === 'undefined'))
      this.AutoSize=true;
  }
  else
  {
    if((typeof d.H === 'undefined')&&((typeof d.T === 'undefined')||(typeof d.B === 'undefined'))&&(typeof d.Data.AutoSize === 'undefined'))
      this.AutoSize=true;
  }
}

function ngtb_DoRelease(o)
{
  o.style.display='none';
}

function ngtbc_OnSetVisible(c,v)
{
  if((!ngVal(c.ToolBarAutoUpdate,true))||(ngVal(c.ToolBarIgnore,false))||(!c.ParentControl)) return true;

  if(c.ID!='')
  {
    var o = c.Elm();
    if(o)
    {
      if(c.DoSetVisible) c.DoSetVisible(o, v);
      else
      {
        o.style.display=(v ? 'block' : 'none');
        o.style.visibility=(v ? 'visible' : 'hidden'); // IE7 sometimes don't hide elements if display is none
      }
      // IE7 redraw fix
      var fix7=document.body.offsetLeft;
    }
  }
  if(c.Visible!=v)
  {
    c.Visible=v;
    c.ParentControl.Update();
    if(c.OnVisibleChanged) c.OnVisibleChanged(c);
  }
  return false;
}

function ngtbc_DoUpdate(o)
{
  var parent=this.ParentControl;
  if((ngVal(this.ToolBarAutoUpdate,true))&&(parent)&&(!parent.tb_update)&&(!ngVal(this.ToolBarIgnore,false)))
  {
    var changed=false;
    if(this.tb_indent!=this.ToolBarIndent) changed=true;
    else
    {
      var cw,ch;
      var vpadding=ngVal(this.ToolBarVPadding,parent.VPadding);
      var hpadding=ngVal(this.ToolBarHPadding,parent.HPadding);

      if((typeof this.ToolBarWidth!=='undefined')||(typeof this.ToolBarHeight!=='undefined'))
      {
        if(typeof this.ToolBarWidth!=='undefined') cw=this.ToolBarWidth;
        else cw=ng_OuterWidth(o);
        if(typeof this.ToolBarHeight!=='undefined') ch=this.ToolBarHeight;
        else ch=ng_OuterHeight(o);
      }
      else
      {
        ng_BeginMeasureElement(o);
        cw=ng_OuterWidth(o);
        ch=ng_OuterHeight(o);
        ng_EndMeasureElement(o);
      }

      if(parent.Vertical) ch+=ngVal(this.ToolBarIndent,0);
      else                cw+=ngVal(this.ToolBarIndent,0);
      if((this.tb_height!=ch+vpadding)||(this.tb_width!=cw+hpadding)) changed=true;
    }
    if(changed)
    {
      this.ParentControl.Update();
      return true;
    }
  }

  if(typeof this.ngc_DoUpdate==='function')
    return this.ngc_DoUpdate(o);

  return true;
}

function ngtb_RegisterControl(c)
{
  if((typeof c!=='object')||(!c)||(c.tb_fncregistered)) return;

  if(c.DoUpdate!=ngtbc_DoUpdate)
  {
    c.ngc_DoUpdate=c.DoUpdate;
    c.DoUpdate=ngtbc_DoUpdate;
    c.AddEvent(ngtbc_OnSetVisible,'OnSetVisible');
  }
  c.tb_fncregistered=true;
}

function ngtb_UnreegisterControl(c)
{
  if((typeof c!=='object')||(!c)) return;

  if(c.DoUpdate==ngtbc_DoUpdate)
  {
    if(typeof c.ngc_DoUpdate === 'function')
    {
      c.DoUpdate=c.ngc_DoUpdate;
      delete c.ngc_DoUpdate;
    }
    c.RemoveEvent(ngtbc_OnSetVisible,'OnSetVisible');
  }
  if(typeof c.tb_fncregistered!=='undefined')
    c.tb_fncregistered=false;
}

function ngtb_Update(recursive)
{
  if(!this.Visible) return;
  var p=this.ParentControl;
  while(p)
  {
    if(!p.Visible) return;
    p=p.ParentControl;
  }

  if(this.tb_update) return;
  this.tb_update=true;

  recursive=ngVal(recursive,true);

  var onupdated=this.OnUpdated;
  this.OnUpdated=null;
  try
  {
    this.ngc_Update(recursive);

    this.tb_update=false;

    var to=this.Elm();
    if(!to) return;

    var cc=this.ChildControls;
    if(typeof cc === 'undefined') return;

    to.style.display = (this.Visible ? 'block' : 'none');

    if((this.AutoSize)&&(ngIExplorer)) // IE7 Measure fix
    {
      if(this.Vertical)
      {
        if(ng_GetStylePx(to.style.width)==0) to.style.width='1px';
      }
      else
      {
        if(ng_GetStylePx(to.style.height)==0) to.style.height='1px';
      }
    }

    var w=ng_ClientWidth(to);
    var h=ng_ClientHeight(to);

    var o,c,cw,ch,x=0,y=0,mw=0,mh=0,sw=0,sh=0,wrap,ix,iy;
    var vpadding,hpadding,lastnowrap=-1;

    this.tb_update=true;
    for(var i=0;i<cc.length;i++)
    {
      c=cc[i];
      if(ngVal(c.ToolBarIgnore,false)) continue;
      if(!c.tb_fncregistered) ngtb_RegisterControl(c);
      if(!c.Visible) continue;
      if(!recursive) c.Update(false);
      o=c.Elm();
      if(!o) continue;
      hpadding=ngVal(c.ToolBarHPadding,this.HPadding);
      vpadding=ngVal(c.ToolBarVPadding,this.VPadding);
      if((this.Vertical)&&(!y)) hpadding=0;
      if((!this.Vertical)&&(!x)) vpadding=0;
      if((typeof c.ToolBarWidth!=='undefined')||(typeof c.ToolBarHeight!=='undefined'))
      {
        if(typeof c.ToolBarWidth!=='undefined') cw=c.ToolBarWidth;
        else cw=ng_OuterWidth(o);
        if(typeof c.ToolBarHeight!=='undefined') ch=c.ToolBarHeight;
        else ch=ng_OuterHeight(o);
      }
      else
      {
        ng_BeginMeasureElement(o);
        cw=ng_OuterWidth(o);
        ch=ng_OuterHeight(o);
        ng_EndMeasureElement(o);
      }

      wrap=false;
      if(this.Vertical)
      {
        ix=ngVal(c.ToolBarIndent,0); iy=0;
        cw+=ix;

        if(((this.Wrapable)&&(y+ch>h))||(ngVal(c.ToolBarBreak,false))) { x+=mw+hpadding; y=0; mw=0; wrap=true; }
        if(cw>mw) mw=cw;
      }
      else
      {
        iy=ngVal(c.ToolBarIndent,0); ix=0;
        ch+=iy;

        if(((this.Wrapable)&&(x+cw>w))||(ngVal(c.ToolBarBreak,false))) { y+=mh+vpadding; x=0; mh=0; wrap=true; }
        if(ch>mh) mh=ch;
      }
      if((wrap)&&(ngVal(c.ToolBarNoWrap,false)))
      {
        var oldi=i--;
        for(;i>=0;i--)
        {
          c=cc[i];
          if((ngVal(c.ToolBarIgnore,false))||(!c.Visible)||(ngVal(c.ToolBarNoWrap,false))) continue;
          break;
        }
        if((i>0)&&(i!=lastnowrap)) { lastnowrap=i; continue; }
        i=oldi;
        c=cc[i];
      }

      if(this.HAlign == 'right') c.Bounds.R = x+ix;
      else c.Bounds.L = x+ix;
      if(this.VAlign == 'bottom') c.Bounds.B = y+iy;
      else c.Bounds.T = y+iy;
      c.SetBounds();

      if(x+cw>sw) sw=x+cw;
      if(y+ch>sh) sh=y+ch;

      c.tb_indent=c.ToolBarIndent;
      c.tb_width=cw+hpadding;
      c.tb_height=ch+vpadding;
      if(this.Vertical) y+=ch+vpadding;
      else x+=cw+hpadding;
    }
    if(this.AutoSize)
    {
      var changed=false;
      if(this.Vertical)
      {
        ng_SetClientWidth(to,sw);
        var cbw=ng_StyleWidth(to);
        if(this.Bounds.W!=cbw)
        {
          changed=true;
          this.Bounds.W=cbw;
          this.SetBounds();
        }
      }
      else
      {
        ng_SetClientHeight(to,sh);
        var cbh=ng_StyleHeight(to);
        if(this.Bounds.H!=cbh)
        {
          changed=true;
          this.Bounds.H=cbh;
          this.SetBounds();
        }
      }
      if((ngIExplorer6)&&(changed)&&((this.HAlign=='right')||(this.VAlign=='bottom'))) this.ngc_Update(recursive);
    }
    this.tb_update=false;
    this.OnUpdated=onupdated;
    if(this.OnUpdated) this.OnUpdated(this,to);
  } finally {
    this.OnUpdated=onupdated;
  }
}

/**
 *  Class: ngToolBar
 *  This class implements a generic toolbar control.
 *
 *  Syntax:
 *    new *ngToolBar* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngToolBar(id)
{
  ngControl(this, id, 'ngToolBar');

  /*
   *  Group: Properties
   */
  /*  Variable: AutoSize
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.AutoSize = false;
  /*  Variable: Vertical
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.Vertical = false;

  /*  Variable: VPadding
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.VPadding = 0;
  /*  Variable: HPadding
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.HPadding = 0;

  /*  Variable: VAlign
   *  ...
   *  Type: string
   *  Default value: *'top'*
   */
  this.VAlign = 'top';
  /*  Variable: HAlign
   *  ...
   *  Type: string
   *  Default value: *'left'*
   */
  this.HAlign = 'left';
  /*  Variable: Wrapable
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.Wrapable = true;

  /*
   *  Group: Methods
   */
  /*  Function: CtrlBringToFront
   *
   *  Syntax:
   *    void *CtrlBringToFront* (object ctrl)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.CtrlBringToFront=ngc_CtrlBringToFront;
  /*  Function: CtrlSendToBack
   *
   *  Syntax:
   *    void *CtrlSendToBack* (object ctrl)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.CtrlSendToBack=ngc_CtrlSendToBack;
  /*  Function: CtrlInsertAfter
   *
   *  Syntax:
   *    void *CtrlInsertAfter* (object ctrl, object whichctrl)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.CtrlInsertAfter=ngc_CtrlInsertAfter;
  /*  Function: CtrlInsertBefore
   *
   *  Syntax:
   *    void *CtrlInsertBefore* (object ctrl, object whichctrl)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.CtrlInsertBefore=ngc_CtrlInsertBefore;

  /*
   *  Group: Child Controls Properties
   */
  /*  Variable: ToolBarIgnore
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  /*<>*/
  /*  Variable: ToolBarAutoUpdate
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  /*<>*/
  /*  Variable: ToolBarIndent
   *  ...
   *  Type: integer
   *  Default value: *0*
   */
  /*<>*/
  /*  Variable: ToolBarHPadding
   *  ...
   *  Type: integer
   *  Default value: *undefined*
   */
  /*<>*/
  /*  Variable: ToolBarVPadding
   *  ...
   *  Type: integer
   *  Default value: *undefined*
   */
  /*<>*/
  /*  Variable: ToolBarWidth
   *  ...
   *  Type: integer
   *  Default value: *undefined*
   */
  /*<>*/
  /*  Variable: ToolBarHeight
   *  ...
   *  Type: integer
   *  Default value: *undefined*
   */
  /*<>*/
  /*  Variable: ToolBarBreak
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  /*<>*/
  /*  Variable: ToolBarNoWrap
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  /*<>*/

  this.DoCreate = ngtb_DoCreate;
  this.DoRelease = ngtb_DoRelease;
  this.ngc_Update = this.Update;
  this.Update = ngtb_Update;

  ngControlCreated(this);
}

// --- ngProgressBar -----------------------------------------------------------

function npb_DoUpdate(o)
{
  var p=(this.process_cnt ? 25 : this.Position);
  if(p<0) p=0;
  if(p>100) p=100;

  var html=new ngStringBuilder;
  var image,dp;
  if((ngIExplorer)&&(ng_GetStylePx(o.style.height)==0)) o.style.height='1px';  // IE7 Measure fix
  var w=ng_ClientWidth(o);
  var th=0,lw=0,rw=0;

  image=this.LeftImg;
  if(image)
  {
    dp=ngc_ImgProps(this.ID+'_IL', 0, this.Enabled, image);
    ngc_Img(html,dp,"position:absolute; left: 0px;",ngVal(image.Attrs,''));
    lw=dp.W;
    if(dp.H>th) th=dp.H;
  }
  image=this.RightImg;
  if(image)
  {
    dp=ngc_ImgProps(this.ID+'_IR', 0, this.Enabled, image);
    ngc_Img(html,dp,"position:absolute; left: "+(w-dp.W)+"px;",ngVal(image.Attrs,''));
    rw=dp.W;
    if(dp.H>th) th=dp.H;
  }

  var pw=w-lw-rw;
  image=this.MiddleImg;
  if(image)
  {
    dp=ngc_ImgProps(this.ID+'_IM', 0, this.Enabled, image);
    ngc_ImgSW(html,dp,lw,pw,'',ngVal(image.Attrs,''));
    if(dp.H>th) th=dp.H;
  }

  image=this.BarImg;
  if(image)
  {
    dp=ngc_ImgProps(this.ID+'_B', 0, this.Enabled, image);
    if(dp.H>0)
    {
      var step=dp.W;
      if(typeof step==='undefined') step=Math.floor((pw+9)/10);
      if(p==100) p=pw;
      else
      {
        p=(pw*p/100.0);
        if((!this.Smooth) || (this.process_cnt))
        {
          p/=step;
          p=Math.round(p);
          p*=step;
        }
        p=Math.round(p);
        if(p>pw) p=pw;
      }
      ngc_ImgSW(html,dp,lw,p,'',ngVal(image.Attrs,''));
      if(dp.H>th) th=dp.H;
    }
  }
  ng_SetClientHeight(o,th);
  var cbh=ng_StyleHeight(o);
  if(this.Bounds.H!=cbh)
  {
    this.Bounds.H=cbh;
    this.SetBounds();
  }
  ng_SetInnerHTML(o,html.toString());
  return true;
}

function npb_SetPosition(p)
{
  if(p==this.Position) return;

  this.Position=p;
  if(!this.process_cnt) this.Update();
}

function npb_UpdateProcess(cid)
{
  var c=ngGetControlById(cid, 'ngProgressBar');
  if(c)
  {
    if(c.process_timer) clearTimeout(c.process_timer); c.process_timer=null;

    var o=c.Elm();
    if(o)
    {
      var dp,lw=0;
      var w=ng_ClientWidth(o);

      var image=c.LeftImg;
      if(image)
      {
        dp=ngc_ImgProps(c.ID+'_IL', 0, c.Enabled, image);
        lw=dp.W;
        w-=dp.W;
      }
      image=c.RightImg;
      if(image)
      {
        dp=ngc_ImgProps(c.ID+'_IR', 0, c.Enabled, image);
        w-=dp.W;
      }
      image=c.BarImg;
      if(image)
      {
        dp=ngc_ImgProps(c.ID+'_B', 0, c.Enabled, image);

        var p=c.process_pos;
        var s=(w/10);
        if(s<=0) s=1;
        p+=s*c.process_dir;
        var step=dp.W;
        if(typeof step==='undefined') step=Math.floor((w+9)/10);
        var pw=(w/4);
        pw=Math.round(pw/step);
        pw*=step;
        if(p>w-pw) { p=w-pw; c.process_dir*=-1; }
        if(p<0) { p=0; c.process_dir*=-1; }
        p=(c.process_dir==1 ? Math.ceil(p) : Math.floor(p));
        c.process_pos=p;
        var bid=c.ID+'_B_';
        lw+=p;
        for(var i=1;i<100;i++)
        {
          o=document.getElementById(bid+i);
          if(!o) break;
          ng_setLeftTop(o,lw,0);
          lw+=dp.W;
        }
        c.process_timer=setTimeout("npb_UpdateProcess('"+c.ID+"')",120);
      }
    }
  }
}

function npb_BeginProcess()
{
  this.process_cnt++;
  if(this.process_cnt==1)
  {
    this.Update();
    this.process_pos = 0;
    this.process_dir = 1;
    this.process_timer=setTimeout("npb_UpdateProcess('"+this.ID+"')",120);
  }
}

function npb_EndProcess()
{
  this.process_cnt--;
  if(this.process_cnt<=0)
  {
    if(this.process_timer) clearTimeout(this.process_timer); this.process_timer=null;
    this.process_cnt=0;
    this.Update();
  }
}

function npb_DoDispose()
{
  if(this.process_timer) clearTimeout(this.process_timer); this.process_timer=null;
  return true;
}

function ngpb_OnVisibleChanged(c)
{
  if(c.Visible)
  {
    if(this.process_cnt>0)
    {
      this.process_timer=setTimeout("npb_UpdateProcess('"+this.ID+"')",120);
    }
  }
  else
  {
    if(this.process_timer) clearTimeout(this.process_timer); this.process_timer=null;
  }
}


/**
 *  Class: ngProgressBar
 *  This class implements a generic progress bar control.
 *
 *  Syntax:
 *    new *ngProgressBar* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngProgressBar(id)
{
  ngControl(this, id, 'ngProgressBar');

  this.DoDispose = npb_DoDispose;
  this.OnVisibleChanged=ngpb_OnVisibleChanged

  /*
   *  Group: Properties
   */
  /*  Variable: Position
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.Position = 0;
  /*  Variable: Smooth
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.Smooth = false;

  /*  Variable: LeftImg
   *  ...
   *  Type: object
   */
  this.LeftImg = null;
  /*  Variable: MiddleImg
   *  ...
   *  Type: object
   */
  this.MiddleImg = null;
  /*  Variable: RightImg
   *  ...
   *  Type: object
   */
  this.RightImg = null;
  /*  Variable: BarImg
   *  ...
   *  Type: object
   */
  this.BarImg = null;

  /*
   *  Group: Methods
   */
  /*  Function: SetPosition
   *  Sets position of progress in interval 0-100.
   *
   *  Syntax:
   *    void *SetPosition* (int pos)
   *
   *  Returns:
   *    -
   */
  this.SetPosition = npb_SetPosition;

  this.process_cnt = 0;
  this.process_timer = null;

  /*  Function: BeginProcess
   *  Starts waiting animation.
   *
   *  Syntax:
   *    void *BeginProcess* ()
   *
   *  Returns:
   *    -
   */
  this.BeginProcess = npb_BeginProcess;
  /*  Function: EndProcess
   *  Ends waiting animation.
   *
   *  Syntax:
   *    void *EndProcess* ()
   *
   *  Returns:
   *    -
   */
  this.EndProcess = npb_EndProcess;

  this.DoUpdate = npb_DoUpdate;

  // events
  ngControlCreated(this);
}

// --- ngWebBrowser ------------------------------------------------------------

function ngwb_DoCreate(def, ref, elm, parent)
{
  var url=(ngIExplorer && (ngIExplorerVersion < 8) ? 'javascript:' : 'about:blank');
  ng_SetInnerHTML(elm,'<iframe src="'+url+'" id="'+this.ID+'_F" style="position: absolute;" frameborder="0" allowtransparency="yes"></iframe>');
}

function ngwb_DoUpdate(o)
{
  var frame=this.GetBrowser();
  if(!frame) return true;

  var w=ng_ClientWidth(o);
  var h=ng_ClientHeight(o);
  ng_SetClientWidth(frame,w);
  ng_SetClientHeight(frame,h);

  var url=this.GetURL();
  if(frame.src!=this.opened_url)
  {
    frame.src=url;
    this.opened_url=frame.src;
  }
  return true;
}

function ngwb_SetURL(url)
{
  if((this.OnSetURL)&&(!ngVal(this.OnSetURL(this,url),false))) return;
  this.URL=url;
  var br=this.GetBrowser()
  if(br)
  {
    br.src=url;
    this.opened_url=br.src;
  }
}

function ngwb_GetURL()
{
  var url=this.URL;
  if(this.OnGetURL) url=this.OnGetURL(this,url);
  return url;
}

function ngwb_GetBrowser()
{
  var frame=document.getElementById(this.ID+'_F');
  return frame;
}

function ngwb_GetDocument()
{
  var br=this.GetBrowser()
  if(!br) return null;
  try
  {
    return (br.contentDocument ? br.contentDocument : br.contentWindow.document);
  }
  catch(e)
  {
    return null;
  }
}

function ngwb_SetHTML(html, allowdelayed)
{
  if(this.OnSetHTML)
  {
    html=this.OnSetHTML(this,html);
    if(html=='') return;
  }
  if(this.opened_url!='') this.SetURL('about:blank');

  var doc=this.GetDocument();
  if(doc)
  {
    try
    {
      doc.open();
      if(typeof html==='object')
      {
        if(html)
          for(var i in html)
            doc.write(html[i]);
      }
      else doc.write(html);
      doc.close();
      return;
    }
    catch(e)
    {
    }
  }
  if(ngVal(allowdelayed, true))
  {
    // we don't have access to document, try it later
    var c=this;
    this.set_html_timeout=setTimeout(function(e) {
      if(c.set_html_timeout) clearTimeout(c.set_html_timeout); c.set_html_timeout=null;
      c.SetHTML(html,false);
    },200);
  }
}

/**
 *  Class: ngWebBrowser
 *  This class implements a web browser control.
 *
 *  Syntax:
 *    new *ngWebBrowser* ([string id])
 *
 *  Parameters:
 *    id - parent element
 *
 *  See also:
 *    Abstract class <ngControl>.
 */

function ngWebBrowser(id)
{
  ngControl(this, id, 'ngWebBrowser');
  this.DoCreate = ngwb_DoCreate;
  this.DoUpdate = ngwb_DoUpdate;

  /*
   *  Group: Properties
   */
  /*  Variable: URL
   *  ...
   *  Type: string
   */
  this.URL = '';

  /*
   *  Group: Methods
   */
  /*  Function: SetURL
   *  Sets browser URL.
   *
   *  Syntax:
   *    void *SetURL* (string url)
   *
   *  Returns:
   *    -
   */
  this.SetURL = ngwb_SetURL;
  /*  Function: GetURL
   *  Gets browser URL.
   *
   *  Syntax:
   *    string *GetURL* ()
   *
   *  Returns:
   *    The URL.
   */
  this.GetURL = ngwb_GetURL;
  /*  Function: SetHTML
   *  Sets HTML code directly into browser.
   *
   *  Syntax:
   *    void *SetHTML* (string html [, bool allowdelayed=true])
   *
   *  Returns:
   *    -
   */
  this.SetHTML = ngwb_SetHTML;
  /*  Function: GetBrowser
   *  Gets browser IFRAME element.
   *
   *  Syntax:
   *    object *GetBrowser* ()
   *
   *  Returns:
   *    IFRAME element.
   */
  this.GetBrowser = ngwb_GetBrowser;
  /*  Function: GetDocument
   *  Gets browser document object.
   *
   *  Syntax:
   *    object *GetDocument* ()
   *
   *  Returns:
   *    Document object.
   */
  this.GetDocument = ngwb_GetDocument;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnSetURL
   */
  this.OnSetURL = null;
  /*
   *  Event: OnGetURL
   */
  this.OnGetURL = null;
  /*
   *  Event: OnSetHTML
   */
  this.OnSetHTML = null;

  ngControlCreated(this);
}
