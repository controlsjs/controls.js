/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014-2016 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

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
 *    id - control ID
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
  if(this.HTMLEncode) text=ng_htmlEncode(text,true);

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
 *    id - control ID
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
   *  Default value: <ngDefaultHTMLEncoding>
   */
  this.HTMLEncode = ngVal(ngDefaultHTMLEncoding,false);
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
 *    id - control ID
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
 *    id - control ID
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

// --- ngButton ----------------------------------------------------------------

var ngb_RadioGroups = {};

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
  if((!this.Enabled)||(ngVal(this.ReadOnly,false))) return;

  if(typeof e === 'undefined') e=new Object;
  e.Owner = this;
  e.btn = this;

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
 *    id - control ID
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
   *  Default value: <ngDefaultHTMLEncoding>
   */
  this.HTMLEncode = ngVal(ngDefaultHTMLEncoding,false);

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
/*  Variable: RadioAllowUncheck
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
    if((!this.RadioAllowUncheck)&&(typeof b.RadioGroup!=='undefined')) b.Check(1);
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
  if(typeof c.RadioAllowUncheck === 'undefined') c.RadioAllowUncheck=false;
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

  var lref=ngCreateControls(ldefs,undefined,elm);
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
 *    id - control ID
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
   *  Default value: <ngDefaultHTMLEncoding>
   */
  this.HTMLEncode = ngVal(ngDefaultHTMLEncoding,false);
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
  /*
   *  Event: OnSetText
   */
  this.OnSetText = null;

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
var KEY_END = 35;
var KEY_HOME = 36;
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
  var ii=ng_Expand2Id(id);
  var c=ngGetControlById(ii.id1);
  if((!c)||(!ngVal(c.Suggestion,false))||(ii.id2!=c.SuggestionCmdID)) return;

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
          c.SuggestionCmdID=ngVal(c.SuggestionCmdID,-1)+1;
          if(c.SuggestionCmdID>99) c.SuggestionCmdID=0;

          url=ng_AddURLParam(url,"S="+ng_URLEncode(c.ID+'_'+c.SuggestionCmdID));
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

function nge_SuggestionCancelRefresh()
{
  if(this.SuggestionTimer) clearTimeout (this.SuggestionTimer);
  this.SuggestionTimer=null;
  this.SuggestionCmdID=ngVal(this.SuggestionCmdID,-1)+1;
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

  if(ng_IsInactiveModalElm(to)) return;
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

function nge_SetHintCaret(c)
{
  c.SetCaretPos((c.TextAlign==='right' ? c.GetHint().length : 0));
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

    var hintvisible=edit.HintVisible;
    if(((v == '')&&((!edit.HasFocus)||(nge_HintStyle(edit)===ngHintHideOnInput))) || (hintvisible))
    {
      var hint=edit.GetHint();
      if(hint!='') {
        nge_ShowHint(edit,elm,hint);
        if((edit.LockHintCaretPos)||(!hintvisible)) nge_SetHintCaret(edit);
      }
      else nge_HideHint(edit,elm);
    }
  }
}

function nge_KeyDown(e,elm)
{
  if(!e) e=window.event;
  var edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngEdit');
  if((edit)&&(edit.Enabled)&&(!edit.ReadOnly))
  {
    var et=ngGetControlByElement(e.target || e.srcElement || e.originalTarget);
    if((et)&&(et!==edit)) return;

    e.Owner=edit;
    if((edit.OnKeyDown)&&(!ngVal(edit.OnKeyDown(e,elm),false))) return false;
    if((edit.LockHintCaretPos)&&(edit.HintVisible))
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
  if((edit)&&(edit.Enabled)&&(!edit.ReadOnly))
  {
    var et=ngGetControlByElement(e.target || e.srcElement || e.originalTarget);
    if((et)&&(et!==edit)) return;

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
          if(s===hint.length) ev=val.length-1;
          if(s<eh) ev=s-1;
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
  if((edit)&&(edit.Enabled)&&(!edit.ReadOnly))
  {
    var et=ngGetControlByElement(e.target || e.srcElement || e.originalTarget);
    if((et)&&(et!==edit)) return;

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
  if((pi.EventID==='control')&&(this.Enabled)&&(!this.ReadOnly))
  {
    if((this.DropDownType==ngeDropDownList)&&(this.DropDownControl))
    {
      if(this.DropDownControl.Visible) this.HideDropDown();
      else this.DropDown();
    }
    else
    {
      if((this.LockHintCaretPos)&&(this.HintVisible)&&(nge_HintStyle(this)===ngHintHideOnInput)) nge_SetHintCaret(this);
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

// ngMobileKeyboardActive:
// 0 - not active
// 1 - focus, waiting for resize
// 2 - blur, waiting for resize
// 3 - focus, resize occurred

function nge_BeginMobileKeyboard()
{
  // Mobile keyboards sometimes forces application resize or hides part of the application.
  // To prevent this add temporary margin to application's container.
  var ae=((typeof ngApp === 'object')&&(ngApp) ? ngApp.Elm() : null);
  if((ae)&&(ngVal(ngApp.MobileKeyboardFix,true))) {

    if(ngMobileKeyboardActive==2)
    {
      if(ngApp.MobileKeyboardTimer) clearTimeout(ngApp.MobileKeyboardTimer);
      delete ngApp.MobileKeyboardTimer;
      return;
    }
    ngMobileKeyboardActive=1;
    ngApp.SavedAppHeight=ae.style.height;
    ngApp.SavedAppBottom=ae.style.bottom;
    ngApp.SavedAppMarginBottom=ae.style.marginBottom;

    ng_SetClientHeight(ae,ng_ClientHeight(ae));
    ae.style.bottom='';
    ae.style.marginBottom=ng_WindowHeight()+'px';

    ng_IE7RedrawFix(document.body);

    // Disable MobileKeyboard mode if there will be no resize during following 1sec
    if(ngApp.MobileKeyboardTimer) clearTimeout(ngApp.MobileKeyboardTimer);
    ngApp.MobileKeyboardTimer=setTimeout(function() {
      clearTimeout(ngApp.MobileKeyboardTimer);
      delete ngApp.MobileKeyboardTimer;
      nge_FinishMobileKeyboard();
    },1000);
  }
}

function nge_EndMobileKeyboard()
{
  var ae=((typeof ngApp === 'object')&&(ngApp) ? ngApp.Elm() : null);
  if((ae)&&(typeof ngApp.SavedAppHeight!=='undefined'))
  {
    if(ngApp.MobileKeyboardTimer) clearTimeout(ngApp.MobileKeyboardTimer);
    ngApp.MobileKeyboardTimer=setTimeout(function() {
      clearTimeout(ngApp.MobileKeyboardTimer);
      delete ngApp.MobileKeyboardTimer;
      nge_FinishMobileKeyboard();
    }, (ngMobileKeyboardActive==1 ? 10 : 1000));
    ngMobileKeyboardActive=2;
  }
}

function nge_FinishMobileKeyboard() {
  ngMobileKeyboardActive=0;
  var ae=((typeof ngApp === 'object')&&(ngApp) ? ngApp.Elm() : null);
  if((ae)&&(typeof ngApp.SavedAppHeight!=='undefined'))
  {
    ae.style.bottom=ngApp.SavedAppBottom;
    ae.style.height=ngApp.SavedAppHeight;
    ae.style.marginBottom=ngApp.SavedAppMarginBottom;

    ng_IE7RedrawFix(document.body);

    delete ngApp.SavedAppBottom;
    delete ngApp.SavedAppHeight;
    delete ngApp.SavedAppMarginBottom;

    var aw=ng_ClientWidth(ae);
    var ah=ng_ClientHeight(ae);
    if((aw!==ngApp.LastResizeW)||(ah!==ngApp.LastResizeH)) nga_DoResize();
  }
}

function nge_DoFocus(e, elm)
{
  this.HasFocus=true;
  this.DoUpdateImages();
  nge_BeginMobileKeyboard();

  if((this.LockHintCaretPos)&&(this.HintVisible)) nge_SetHintCaret(this);
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
  if(o.value!=hint) o.value=hint;
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
  if(l){
    l.SetVisible(false);

    if(this._origDDWidth!==null){
      var o=l.Elm();
      if(o) o.style.width=this._origDDWidth;
      this._origDDWidth=null;
    }
  }
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

    var op=o.parentNode;
    var pos=ng_ParentPosition(po,op,true);
    this._origDDWidth=o.style.width;

    if(typeof this.DropDownWidth !== 'undefined')
    {
      if(this.DropDownWidth>0) ng_SetOuterWidth(o,this.DropDownWidth);
    }
    else if(lw<ew) { ng_SetOuterWidth(o,ew); lw=ew; }
    var maxh=ngVal(l.MaxHeight,150);
    if(lh>maxh) { ng_SetOuterHeight(o,maxh); lh=maxh; }

    var wh=ng_ClientHeightEx(op);
    var ww=ng_ClientWidthEx(op);
    var left,top;
    if(((pos.x+lw<=ww-20)&&(this.DropDownAlign=='left'))||((pos.x+ew-lw)<0))
    {
      if(pos.x+lw>ww) {
        left=ww-lw;
        if(left<0) left=0;
      }
      else left=pos.x;
    }
    else left=pos.x+ew-lw;

    if((pos.y+eh+lh>wh-20)&&((pos.y-lh)>=0))
    {
      top=pos.y-lh;
    }
    else
    {
      if(pos.y+eh+lh>wh) {
        top=wh-lh;
        if(top<0) top=0;
      }
      else top=pos.y+eh;
    }
    left+=ng_ScrollX(op);
    top+=ng_ScrollY(op);
    o.style.left=left+'px';
    o.style.top=top+'px';
    o.style.zIndex='100000';

    l.Bounds.L=left;
    l.Bounds.T=top;

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
  var paddingRight_CF=(((((ngIExplorer)&&(ngIExplorerVersion<11))||(ngOpera))&&(this.TextAlign==='right')) ? '1px' : '');  //Cursor fix, see http://blog.lysender.com/2008/12/disappearing-cursor-on-textbox/
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
    if(paddingRight_CF!='') to.style.paddingRight = paddingRight_CF;
    to.style.left=(lw+bl)+'px';
    to.style.top=this.OffsetTop+'px';
    to.style.width=tw+'px';
    if((this.HintVisible)&&(to.value!=hint))
    {
      to.value=hint;
      if(this.LockHintCaretPos) nge_SetHintCaret(this);
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
    html.append('" style="border:0px; white-space: nowrap;text-align:'+this.TextAlign+';position: absolute; z-index:1;left:'+(lw+bl)+'px;top:'+this.OffsetTop+'px;width:'+(tw)+'px;'+(paddingRight_CF!='' ? 'padding-right:'+paddingRight_CF+';' : ''));
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
        if(ng_IsInactiveModalElm(o)) return;
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
  if(ro==this.ReadOnly) return true;
  if ((this.OnSetReadOnly) && (!ngVal(this.OnSetReadOnly(this,ro), false))) return false;

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

  if (this.OnReadOnlyChanged) this.OnReadOnlyChanged(this,ro);

  return true;
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
    if(this.InDesignMode) d.DropDown.Data.Visible=false; // DropDowns are always invisible in FormEditor
    var lref=ngCreateControls({ Control: d.DropDown },undefined,(typeof ngApp === 'object')&&(ngApp) ? ngApp.TopElm() : document.body);
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
 *    id - control ID
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

  /*  Variable: LockHintCaretPos
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.LockHintCaretPos = true;

  /*  Variable: Invalid
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.Invalid = false;

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
  /*  Function: SuggestionCancelRefresh
   *  Cancels pending suggestion refresh.
   *
   *  Syntax:
   *    void *SuggestionCancelRefresh* ()
   *
   *  Returns:
   *    -
   */
  this.SuggestionCancelRefresh = nge_SuggestionCancelRefresh;

  this.DoUpdateImages = nge_DoUpdateImages;
  this.DoUpdate = nge_DoUpdate;
  this.SetFocus = nge_SetFocus;

  /*  Function: SetInvalid
   *  Sets invalid state of control.
   *
   *  Syntax:
   *    bool *SetInvalid* ([bool state = true, bool update = true])
   *
   *  Parameters:
   *    state - ...
   *    update - ...
   *
   *  Returns:
   *    -
   */
  this.SetInvalid = ngc_SetInvalid;

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
   *  Event: OnSetInvalid
   */
  this.OnSetInvalid = null;

  /*
   *  Event: OnSetReadOnly
   */
  this.OnSetReadOnly = null;

  /*
   *  Event: OnReadOnlyChanged
   */
  this.OnReadOnlyChanged = null;

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
    if((e)&&(e.Enabled)&&(!e.ReadOnly))
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
  var n=parseInt(e.Text,10);
  if((e.Text=='')||(isNaN(n)))
  {
    if(typeof e.DefaultNum!=='undefined')
    {
      n=e.DefaultNum;
      e.Text=''+n;
    }
    else return e.Text;
  }
  if((typeof e.MinNum !== 'undefined')&&(n<e.MinNum)) e.Text=''+e.MinNum;
  if((typeof e.MaxNum !== 'undefined')&&(n>e.MaxNum)) e.Text=''+e.MaxNum;
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
      case 38: if(!c.ReadOnly) this.DoUp();   return false;
      case 40: if(!c.ReadOnly) this.DoDown(); return false;
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
    if(typeof n!=='undefined')
    {
      var nn=n;
      if(ngVal(this.StepRound,false)) nn=Math.ceil(n/this.Step)*this.Step;
      if(n==nn) n+=this.Step;
      else n=nn;
    }
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
    if(typeof n!=='undefined')
    {
      var nn=n;
      if(ngVal(this.StepRound,false))  nn=Math.floor(n/this.Step)*this.Step;
      if(n==nn) n-=this.Step;
      else n=nn;
    }
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
    var n=parseInt(this.GetText(),10);
    if(isNaN(n)) return;// undefined;
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
    if((isNaN(n))||(typeof n==='undefined')) n=this.DefaultNum;
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
      if((!e)||(e.ReadOnly)) return;
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
      if((!e)||(e.ReadOnly)) return;
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

function ngem_SetHintCaret(c)
{
  var p=0;
  if(c.TextAlign==='right')
  {
    var hint=c.GetHint();
    p=hint.indexOf('\n');
    if(p<0) p=hint.indexOf('\r');
    if(p<0) p=hint.length;
  }
  c.SetCaretPos(p);
}

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

    var hintvisible=edit.HintVisible;
    if(((v == '')&&((!edit.HasFocus)||(nge_HintStyle(edit)===ngHintHideOnInput))) || (hintvisible))
    {
      var hint=edit.GetHint();
      if(hint!='') {
        edit.HintVisible=true;
        elm.className = edit.GetClassName('Input',hint);
        elm.value=hint;
        if((edit.LockHintCaretPos)||(!hintvisible)) ngem_SetHintCaret(edit);
      }
      else edit.HintVisible=false;
    }
  }
}

function ngem_KeyPress(e,elm)
{
  if(!e) e=window.event;
  var edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngMemo');
  if((edit)&&(edit.Enabled)&&(!edit.ReadOnly))
  {
    var et=ngGetControlByElement(e.target || e.srcElement || e.originalTarget);
    if((et)&&(et!==edit)) return;

    e.Owner=edit;
    if((edit.OnKeyPress)&&(!ngVal(edit.OnKeyPress(e,elm),false))) return false;
  }
}

function ngem_KeyDown(e,elm)
{
  if(!e) e=window.event;
  var edit=ngGetControlById(elm.id.substring(0,elm.id.length-2), 'ngMemo');
  if((edit)&&(edit.Enabled)&&(!edit.ReadOnly))
  {
    var et=ngGetControlByElement(e.target || e.srcElement || e.originalTarget);
    if((et)&&(et!==edit)) return;

    e.Owner=edit;
    if((edit.OnKeyDown)&&(!ngVal(edit.OnKeyDown(e,elm),false))) return false;

    if((edit.LockHintCaretPos)&&(edit.HintVisible))
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
  if((edit)&&(edit.Enabled)&&(!edit.ReadOnly))
  {
    var et=ngGetControlByElement(e.target || e.srcElement || e.originalTarget);
    if((et)&&(et!==edit)) return;

    e.Owner=edit;
    nge_KeyUpHint(edit,elm,'Input');

    if((edit.OnKeyUp)&&(!ngVal(edit.OnKeyUp(e,elm),false))) return false;
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

  if((this.LockHintCaretPos)&&(this.HintVisible)) ngem_SetHintCaret(this);
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
      if(this.LockHintCaretPos) ngem_SetHintCaret(this);
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
    html.append(ng_htmlEncode(this.Text == '' ? hint : this.Text).replace(/\n/g, "&#13;&#10;"));
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
    if((this.LockHintCaretPos)&&(this.HintVisible)&&(nge_HintStyle(this)===ngHintHideOnInput)) ngem_SetHintCaret(this);
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
 *    id - control ID
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

  /*  Variable: LockHintCaretPos
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.LockHintCaretPos = true;

  /*  Variable: Invalid
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.Invalid = false;

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

  /*  Function: SetInvalid
   *  Sets invalid state of control.
   *
   *  Syntax:
   *    bool *SetInvalid* ([bool state = true, bool update = true])
   *
   *  Parameters:
   *    state - ...
   *    update - ...
   *
   *  Returns:
   *    -
   */
  this.SetInvalid = ngc_SetInvalid;

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

  /*
   *  Event: OnSetInvalid
   */
  this.OnSetInvalid = null;

  /*
   *  Event: OnSetReadOnly
   */
  this.OnSetReadOnly = null;

  /*
   *  Event: OnReadOnlyChanged
   */
  this.OnReadOnlyChanged = null;

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
  if(ctrl)
  {
    var i,p=ctrl.ParentControl;
    while(p)
    {
      for(i=0;i<this.Pages.length;i++)
        if(p==this.Pages[i].ControlsPanel) return i;
      p=p.ParentControl;
    }
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
        if(image) { ngc_Img(html,image,"position:absolute; left: "+tx+"px;",ngVal(image.Attrs,'')); tx+=image.W; }
        tl=tx;
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

      var lref=ngCreateControls(ldefs,undefined,elm);
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
 *    id - control ID
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
   *  Default value: <ngDefaultHTMLEncoding>
   */
  this.HTMLEncode = ngVal(ngDefaultHTMLEncoding,false);

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
      ng_IE7RedrawFix(document.body);
    }
  }
  if(c.Visible!=v)
  {
    c.Visible=v;
    if(v) c.Update(true);
    c.ParentControl.Update(false);
    if(c.OnVisibleChanged) c.OnVisibleChanged(c);
  }
  return false;
}

function ngtbc_SetBounds(props) {
  var ret=this.tb_SetBounds.apply(this,arguments);
  if(ret) this.tb_boundschanged=true;
  return ret;
}

function ngtbc_Measure(c,o) {
  var cw,ch;
  var parent=c.ParentControl;

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
  if(parent.Vertical) ch+=ngVal(c.ToolBarIndent,0);
  else                cw+=ngVal(c.ToolBarIndent,0);
  ch+=ngVal(c.ToolBarVPadding,parent.VPadding);
  cw+=ngVal(c.ToolBarHPadding,parent.HPadding);
  return {cw: cw, ch:ch};
}

function ngtbc_DoUpdate(o)
{
  var parent=this.ParentControl;
  if((ngVal(this.ToolBarAutoUpdate,true))&&(parent)&&(!parent.tb_update)&&(!ngVal(this.ToolBarIgnore,false)))
  {
    var ret=true;
    var changed=false;
    if(this.tb_indent!=this.ToolBarIndent) changed=true;
    else {
      var m=ngtbc_Measure(this,o);
      if((this.tb_height!=m.ch)||(this.tb_width!=m.cw)) changed=true;
    }
    if((!changed)&&(typeof this.ngc_DoUpdate==='function')) {
      this.tb_boundschanged=false;
      var tbw=this.ToolBarWidth;
      var tbh=this.ToolBarHeight;
      var ret=this.ngc_DoUpdate(o);
      if((ret)&&(this.tb_boundschanged)) {
        if((this.ToolBarWidth!==tbw)||(this.ToolBarHeight!==tbh)) changed=true;
        else {
          var m=ngtbc_Measure(this,o);
          if((this.tb_height!=m.ch)||(this.tb_width!=m.cw)) changed=true;
        }
      }
    }
    if((ret)&&(changed)) {
      this.ParentControl.Update();
      return true;
    }
    return ret;
  }
  else {
    if(typeof this.ngc_DoUpdate==='function')
      return this.ngc_DoUpdate(o);
  }

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
    c.tb_SetBounds=c.SetBounds;
    c.SetBounds=ngtbc_SetBounds;
  }
  c.tb_fncregistered=true;
}

function ngtb_UnregisterControl(c)
{
  if((typeof c!=='object')||(!c)) return;

  if(c.DoUpdate==ngtbc_DoUpdate)
  {
    if(typeof c.ngc_DoUpdate === 'function')
    {
      c.DoUpdate=c.ngc_DoUpdate;
      delete c.ngc_DoUpdate;
    }
    c.RemoveEvent('OnSetVisible',ngtbc_OnSetVisible);
    if(typeof c.tb_SetBounds === 'function')
    {
      c.SetBounds = c.tb_SetBounds;
      delete c.tb_SetBounds;
    }
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
    var vpadding,hpadding,lastnowrap=-1,ctrlvpadding,ctrlhpadding;

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

      ctrlhpadding=hpadding=ngVal(c.ToolBarHPadding,this.HPadding);
      ctrlvpadding=vpadding=ngVal(c.ToolBarVPadding,this.VPadding);

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
      c.tb_width=cw+ctrlhpadding;
      c.tb_height=ch+ctrlvpadding;
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
 *    id - control ID
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
 *    id - control ID
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
  if((frame.src!=this.opened_url)&&((!this.InDesignMode)||(this.DesignLive)))
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
  if((br)&&((!this.InDesignMode)||(this.DesignLive)))
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
 *    id - control ID
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

// --- ngSysAction -------------------------------------------------------------

var ngact_RadioGroups = {};

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
        try {
          for(var i=0;i<cc.length;i++)
          {
            c=cc[i];
            if(c.Control.ActionCheck) c.Control.ActionCheck(state, c.Data);
          }
        }
        finally {
          this.in_action_check = false;
        }
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
    try {
      for(var i=0;i<cc.length;i++)
      {
        c=cc[i];
        if(c.Control.ActionClick) c.Control.ActionClick(e,c.Data);
      }
    }
    finally {
      this.in_action_click = false;
    }
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
        try {
          for(var i=0;i<cc.length;i++)
          {
            c=cc[i];
            if(c.Control.ActionSetVisible) c.Control.ActionSetVisible(v, c.Data);
          }
        }
        finally {
          this.in_action_visible = false;
        }
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
 *    id - control ID
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

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['coreui'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
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

    // Derived controls
    ngRegisterControlType('ngFrame', ngFrame_Create);
    ngRegisterControlType('ngRadioButton', ngRadioCheckBox_Create);
    ngRegisterControlType('ngCheckBox', ngRadioCheckBox_Create);
    ngRegisterControlType('ngDropDownList', function(def, ref, parent) { return ngDropDown_Create(def, ref, parent, 'ngEdit', true); });
    ngRegisterControlType('ngDropDown', function(def, ref, parent) { return ngDropDown_Create(def, ref, parent, 'ngEdit', false); });
    ngRegisterControlType('ngEditNum', ngEditNum_Create);

    ngRegisterControlType('ngSysAction', function() { return new ngSysAction; });
  }
};