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
 *  Group: Panels 
 */

// --- ngAlignPanel ------------------------------------------------------------

var alNone   = 0;
var alClient = 1;
var alLeft   = 2;
var alRight  = 3;
var alTop    = 4;
var alBottom = 5;

function ngapc_OnSetVisible(c,v)
{
  if((!ngVal(c.AlignAutoUpdate,true))||(!c.ParentControl)) return true;
  
  var a=ngVal(c.ControlAlign,alNone);
  if((a==this.align_control)&&((a==alNone)||(a==alClient))) return true;

  
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
    c.ParentControl.Update();
    if(c.OnVisibleChanged) c.OnVisibleChanged(c);
  }
  return false;
}

function ngapc_DoUpdate(o)
{
  if((ngVal(this.AlignAutoUpdate,true))&&(this.ParentControl))
  {
    var a=ngVal(this.ControlAlign,alNone);
    // test if dimensions changed
    if((a!=this.align_control)
     ||(((a==alLeft)||(a==alRight))&&(this.align_w!=this.Bounds.W))
     ||(((a==alTop)||(a==alBottom))&&(this.align_h!=this.Bounds.H)))
    {
      this.ParentControl.Update();
      return true;  
    }
  }

  if(typeof this.ngc_DoUpdate==='function') 
    return this.ngc_DoUpdate(o);

  return true;
}

function ngap_OuterHeight(o,v)
{
  v+=ng_GetCurrentStylePx(o,'margin-top') + ng_GetCurrentStylePx(o,'margin-bottom');
  v+=ng_GetCurrentStylePx(o,'border-top-width') + ng_GetCurrentStylePx(o,'border-bottom-width');
  v+=ng_GetCurrentStylePx(o,'padding-top') + ng_GetCurrentStylePx(o,'padding-bottom');
  return v;
}

function ngap_OuterWidth(o,v)
{
  v+=ng_GetCurrentStylePx(o,'margin-left') + ng_GetCurrentStylePx(o,'margin-right');
  v+=ng_GetCurrentStylePx(o,'border-left-width') + ng_GetCurrentStylePx(o,'border-right-width');
  v+=ng_GetCurrentStylePx(o,'padding-left') + ng_GetCurrentStylePx(o,'padding-right');
  return v;
}

function ngap_RegisterControl(c)
{
  if((typeof c!=='object')||(!c)) return;
  
  if(c.DoUpdate!=ngapc_DoUpdate)
  {
    c.ngc_DoUpdate=c.DoUpdate;
    c.DoUpdate=ngapc_DoUpdate;
    c.AddEvent(ngapc_OnSetVisible,'OnSetVisible');
  }
  c.align_fncregistered=true;
}

function ngap_UnreegisterControl(c)
{
  if((typeof c!=='object')||(!c)) return;
  
  if(c.DoUpdate==ngapc_DoUpdate)
  {
    if(typeof c.ngc_DoUpdate === 'function') 
    {
      c.DoUpdate=c.ngc_DoUpdate;
      delete c.ngc_DoUpdate;
    } 
    c.RemoveEvent('OnSetVisible',ngapc_OnSetVisible);
  }
  if(typeof c.align_fncregistered!=='undefined')
    c.align_fncregistered=false;
}

function ngap_Update(recursive)
{
  if(!this.Visible) return;
  var p=this.ParentControl;
  while(p)
  {
    if(!p.Visible) return;
    p=p.ParentControl;
  }

  if(this.align_update) return;
  this.align_update=true;

  var to=null;
  var onupdated=this.OnUpdated;
  this.OnUpdated=null;
  try
  {
    var c,a,o,x,y;
    var l,t,r,b,maxx,maxy,autosize,w,h;
    var cc,changed=false;
    for(var k=0;k<2;k++)
    {
      cc=this.ChildControls;
      if((typeof cc !== 'undefined')&&(cc.length>0)) 
      {
        to=this.Elm();
        if(to)
        {
          this.Align(to);
          autosize=this.AutoSize;
          l=0;t=0;r=0;b=0;
          maxx=0;maxy=0;
          ng_BeginMeasureElement(to);
          w=ng_OuterWidth(to);
          h=ng_OuterHeight(to);
          ng_EndMeasureElement(to);
        
          for(var i=0;i<cc.length;i++) 
          {
            c=cc[i];
            if(!c) continue;
            c.Update(false);
            a=ngVal(c.ControlAlign,alNone);
            if(a==alNone) 
            {
              o=(autosize ? c.Elm() : null);
              if((o)&&(c.Visible))
              {
                ng_BeginMeasureElement(o);
                x=ng_GetCurrentStylePx(o,'left')+ng_OuterWidth(o);
                y=ng_GetCurrentStylePx(o,'top')+ng_OuterHeight(o);
                ng_EndMeasureElement(o);
                
                if(x>maxx) maxx=x;
                if(y>maxy) maxy=y;
              }
              continue;
            }
            if((a!=alClient)&&((typeof c.align_fncregistered === 'undefined')||(!c.align_fncregistered)))
            {
              ngap_RegisterControl(c);
            }
            var co=c.Elm();
            switch(a)
            {
              case alTop:
                c.Bounds.T=t;
                c.Bounds.L=l;
                c.Bounds.R=r;
                if((c.align_h==c.Bounds.H)&&(typeof c.align_oh!=='undefined'))
                {
                  c.Bounds.H=c.align_oh;
                  delete c.align_oh;
                }
                else c.Bounds.H=ngVal(c.Bounds.H,0);
                delete c.Bounds.B;
                delete c.Bounds.W;
                if(c.Visible) t+=ngap_OuterHeight(co,c.Bounds.H);
                if((!autosize)&&(t+b>h))
                {
                  if(typeof c.align_oh==='undefined') c.align_oh=c.Bounds.H; 
                  c.Bounds.H-=t+b-h; 
                  if(c.Bounds.H<0) c.Bounds.H=0; 
                  t=(h-b); 
                }          
                else delete c.align_oh;
                c.align_h=c.Bounds.H;
                break;
              case alBottom:
                c.Bounds.B=b;
                c.Bounds.L=l;
                c.Bounds.R=r;
                if((c.align_h==c.Bounds.H)&&(typeof c.align_oh!=='undefined'))
                {
                  c.Bounds.H=c.align_oh;
                  delete c.align_oh;
                }
                else c.Bounds.H=ngVal(c.Bounds.H,0);
                delete c.Bounds.T;
                delete c.Bounds.W;
                if(c.Visible) b+=ngap_OuterHeight(co,c.Bounds.H);
                if((!autosize)&&(t+b>h))
                { 
                  if(typeof c.align_oh==='undefined') c.align_oh=c.Bounds.H; 
                  c.Bounds.H-=t+b-h; 
                  if(c.Bounds.H<0) c.Bounds.H=0; 
                  b=(h-t); 
                }
                else delete c.align_oh;
                c.align_h=c.Bounds.H;
                break;
              case alLeft:
                c.Bounds.L=l;
                c.Bounds.T=t;
                c.Bounds.B=b;
                if((c.align_w==c.Bounds.W)&&(typeof c.align_ow!=='undefined'))
                {
                  c.Bounds.W=c.align_ow;
                  delete c.align_ow;
                }
                else c.Bounds.W=ngVal(c.Bounds.W,0);
                delete c.Bounds.R;
                delete c.Bounds.H;
                if(c.Visible) l+=ngap_OuterWidth(co,c.Bounds.W);
                if((!autosize)&&(l+r>w))
                { 
                  if(typeof c.align_ow==='undefined') c.align_ow=c.Bounds.W; 
                  c.Bounds.W-=l+r-w; 
                  if(c.Bounds.W<0) c.Bounds.W=0; 
                  l=(w-r); 
                }
                else delete c.align_ow;
                c.align_w=c.Bounds.W;
                break;
              case alRight:
                c.Bounds.R=r;
                c.Bounds.T=t;
                c.Bounds.B=b;
                if((c.align_w==c.Bounds.W)&&(typeof c.align_ow!=='undefined'))
                {
                  c.Bounds.W=c.align_ow;
                  delete c.align_ow;
                }
                else c.Bounds.W=ngVal(c.Bounds.W,0);
                delete c.Bounds.L;
                delete c.Bounds.H;
                if(c.Visible) r+=ngap_OuterWidth(co,c.Bounds.W);
                if((!autosize)&&(l+r>w))
                { 
                  if(typeof c.align_ow==='undefined') c.align_ow=c.Bounds.W; 
                  c.Bounds.W-=l+r-w; 
                  if(c.Bounds.W<0) c.Bounds.W=0; 
                  r=(w-l); 
                }
                else delete c.align_ow;
                c.align_w=c.Bounds.W;
                break;
              case alClient:
                autosize=false;
                c.Bounds.L=l;
                c.Bounds.R=r;
                c.Bounds.T=t;
                c.Bounds.B=b;
                delete c.Bounds.W;
                delete c.Bounds.H;
                break;
            }
            c.align_control=a;
            c.SetBounds();
          }
          if(autosize)          
          {
            if(l+r>0) w=l+r;
            if(t+b>0) h=t+b;
            if(w<maxx) w=maxx;
            if(h<maxy) h=maxy;
            if(w<0) w=0;
            if(h<0) h=0;
            ng_SetOuterWidth(to,w);
            ng_SetOuterHeight(to,h);
    
            var cbw=ng_StyleWidth(to);
            var cbh=ng_StyleHeight(to);
            if((this.Bounds.W!=cbw)||(this.Bounds.H!=cbh))
            {
              this.Bounds.W=cbw;
              if((typeof this.Bounds.L !== 'undefined')&&(typeof this.Bounds.R !== 'undefined')) delete this.Bounds.R;
              this.Bounds.H=cbh;
              if((typeof this.Bounds.T !== 'undefined')&&(typeof this.Bounds.B !== 'undefined')) delete this.Bounds.B;
              this.SetBounds();
            }
          }
        }
      }
      this.ngc_Update(recursive);          
      cc=this.ChildControls;
      if((typeof cc !== 'undefined')&&(cc.length>0)) 
      {
        to=this.Elm();
        if(to)
        {
          for(var i=0;i<cc.length;i++) 
          {
            c=cc[i];
            if(!c) continue;
            a=ngVal(c.ControlAlign,alNone);
            if(a==alNone) continue; 
            if((a!=this.align_control)
             ||(((a==alLeft)||(a==alRight))&&(this.align_w!=this.Bounds.W))
             ||(((a==alTop)||(a==alBottom))&&(this.align_h!=this.Bounds.H)))
            {
              changed=true;
              break;
            }
          }
        }
      }
      if(!changed) break;
    }   
    this.align_update=false;
    if(!to) to=this.Elm();
    this.OnUpdated=onupdated;
    if(this.OnUpdated) this.OnUpdated(this,to);
  } finally {  
    this.OnUpdated=onupdated;
  }    
}

/*  Class: ngAlignPanel (ngAlignFrame)
 *  Standard align panel control (based on <ngPanel>/<ngFrame>).
 */
/*
 *  Group: Properties
 */
/*  Variable: AutoSize
 *  ...
 *  Type: bool
 *  Default value: *false*         
 */
/*<>*/
/*
 *  Group: Child Controls Properties
 */
/*  Variable: ControlAlign
 *  ...
 *  Type: integer
 *  Default value: *alNone*         
 */
/*<>*/
/*  Variable: AlignAutoUpdate
 *  ...
 *  Type: bool
 *  Default value: *true*         
 */
/*<>*/

function ngAlignPanel_Create(def,ref,parent) 
{
  var c=ngCreateControlAsType(def, (def.Type=='ngAlignFrame' ? 'ngFrame' : 'ngPanel'), ref, parent);
  c.AutoSize=false;
  c.ngc_Update = c.Update;
  c.Update = ngap_Update;

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
  c.CtrlBringToFront=ngc_CtrlBringToFront;
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
  c.CtrlSendToBack=ngc_CtrlSendToBack;
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
  c.CtrlInsertAfter=ngc_CtrlInsertAfter;
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
  c.CtrlInsertBefore=ngc_CtrlInsertBefore;
  return c;
}

// --- ngSplitPanel ------------------------------------------------------------
               
function ngs_DoPtrStart(pi)
{
  if(pi.EventID!=='handle') return;
  this.MouseDownSize = this.Size;
  if(this.IsMinimized()) this.MouseDownSize = 0;
  if(this.IsMaximized()) 
  {
    var o=this.Elm();
    if(o) {
      switch(this.PanelAlign)
      {
        case 'left':
        case 'right':      
          this.MouseDownSize = (ng_ClientWidth(o)-this.HandleSize());
          break;
        case 'top':
        case 'bottom':      
          this.MouseDownSize = (ng_ClientHeight(o)-this.HandleSize());
          break;
      }
    }
  }

  var m=document.getElementById(this.ID+'_M');
  var h=document.getElementById(this.ID+'_H');
  if((m)&&(h)) 
  {
    m.style.left=h.style.left;
    m.style.top=h.style.top;
    m.style.width=h.style.width;
    m.style.height=h.style.height;
    m.style.display='block';
  }

  this.MouseDown = true;
  this.DoUpdateImages();
}

function ngs_DoPtrEnd(pi)
{
  if(pi.EventID!=='handle') return;
  var m=document.getElementById(this.ID+'_M');
  if(m) m.style.display='none';

  var di = this.PointerInfo;
  var dx = di.EndX - di.StartX;
  var dy = di.EndY - di.StartY;
  if((di.StartTime+300>di.EndTime)&&(Math.abs(dx)<2)&&(Math.abs(dy)<2)) this.DoHandleClick();
  else
  {
    var s=this.MouseDownSize;
    this.Restore();
    switch(this.PanelAlign)
    {
      case 'left':   this.SetSize(s+dx); break;
      case 'right':  this.SetSize(s-dx); break;
      case 'top':    this.SetSize(s+dy); break;
      case 'bottom': this.SetSize(s-dy); break;
    }
  }

  this.MouseDown = false;
  this.DoUpdateImages();
}

function ngs_DoPtrDrag(pi)
{
  if(pi.EventID!=='handle') return false;
  var o=this.Elm();
  var m=document.getElementById(this.ID+'_M');
  if((m)&&(o))
  {
    var w=ng_ClientWidth(o)
    var h=ng_ClientHeight(o)
    var hs=this.HandleSize();

    var pi=this.PointerInfo;    
    var dx = pi.X - pi.StartX;
    var dy = pi.Y - pi.StartY;
    var s=this.MouseDownSize;
    switch(this.PanelAlign)
    {
      case 'left':   s+=dx; break;
      case 'right':  s-=dx; break;
      case 'top':    s+=dy; break;
      case 'bottom': s-=dy; break;
    }
    if((this.MaxSize>0)&&(s>this.MaxSize)) s=this.MaxSize;
    if(s<this.MinSize) s=this.MinSize;

    if((s<=this.AutoMinimize)&&(!this.IsMinimized())) s=0; 
    if(s<0) s=0;
    switch(this.PanelAlign)
    {
      case 'left':
      case 'right':   
        if((w-hs-s<=this.AutoMaximize)&&(!this.IsMaximized())) s=w-hs; 
        if(s>w-hs) s=w-hs;
        break;
      case 'top':
      case 'bottom': 
        if((h-hs-s<=this.AutoMaximize)&&(!this.IsMaximized())) s=h-hs; 
        if(s>h-hs) s=h-hs;
        break;
    }
    switch(this.PanelAlign)
    {
      case 'left':
        m.style.left=s+'px';
        break;
      case 'right':   
        m.style.left=(w-hs-s)+'px';
        break;
      case 'top':
        m.style.top=s+'px';
        break;
      case 'bottom': 
        m.style.top=(h-hs-s)+'px';
        break;
    }
    return true;
  }
  return false;
}

var ngs_CurrentHandleId='';

function ngs_HandleEnter(e, elm, c)
{
  if(!e) e=window.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  if(ngs_CurrentHandleId!='') 
  {
    var o=document.getElementById(ngs_CurrentHandleId);
    ngs_HandleLeave(e,o);
  }
  ngs_CurrentHandleId=elm.id;
  var o=document.getElementById(elm.id);
  if(o)
  {
    var cn=o.className;
    var i=cn.indexOf('_Focus');
    if(i<0) cn=cn+'_Focus';
    o.className=cn;
  }
  ngc_EnterImg(elm.id+'S');
  ngc_EnterImgS(elm.id+'M');
  ngc_EnterImg(elm.id+'E');
  ngc_EnterImg(elm.id+'I');

  if ((c)&&(c.OnHandleEnter)) c.OnHandleEnter(c);
}

function ngs_HandleLeave(e, elm, c)
{
  if(!e) e=window.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  if(ngs_CurrentHandleId==elm.id) ngs_CurrentHandleId='';
  var o=document.getElementById(elm.id);
  if(o)
  {
    var cn=o.className;
    var i=cn.indexOf('_Focus');
    if(i>=0) cn=cn.substring(0,i);
    o.className=cn; 
  }
  ngc_LeaveImg(elm.id+'S');
  ngc_LeaveImgS(elm.id+'M');
  ngc_LeaveImg(elm.id+'E');
  ngc_LeaveImg(elm.id+'I');

  if ((c)&&(c.OnHandleEnter)) c.OnHandleEnter(c);
}

function ngs_DoHandleClick()
{
  if((this.OnHandleClick)&&(!ngVal(this.OnHandleClick(this),false))) return;
  if((this.IsMinimized())||(this.IsMaximized())) this.Restore();
  else this.Minimize();
}

function ngs_GetImg(idx)
{
  var image=null;
  if(this.OnGetImg) image=this.OnGetImg(this, idx);
  else 
  {
    switch(idx) 
    {
      case 0: image=this.MoverStartImg; break;
      case 1: image=this.MoverMiddleImg; break;
      case 2: image=this.MoverEndImg; break;
      case 3: image=this.HandleImg; break;
    }
  }
  return ngVal(image,null);
}

function ngs_HandleSize()
{
  if(!this.HandleVisible) return 0;

  var img,dp,hs=0;
  switch(this.PanelAlign)
  {
    case 'left':
    case 'right':
      for(var i=0;i<4;i++)
      {
        img=this.GetImg(i);
        if(!img) continue;
        dp=ngc_ImgDrawProps(this.ID+'_MS', 'ngSplitPanel', this.ID, this.MouseDown, this.Enabled, img);
        if(dp.W>hs) hs=dp.W;
      }
      break;
    case 'top':
    case 'bottom':
      for(var i=0;i<4;i++)
      {
        img=this.GetImg(i);
        if(!img) continue;
        dp=ngc_ImgDrawProps(this.ID+'_MS', 'ngSplitPanel', this.ID, this.MouseDown, this.Enabled, img);
        if(dp.H>hs) hs=dp.H;
      }
      break;
  }
  return hs;
}


function ngs_Restore()
{
  if((!this.IsMinimized())&&(!this.IsMaximized())) return;
  if((this.OnRestore)&&(!ngVal(this.OnRestore(this),false))) return;
  this.ControlsPanel1.SetVisible(true);
  this.ControlsPanel2.SetVisible(true);
  this.__restore=true;
  try {   
    this.SetSize(this.Size);
  } finally {
    delete this.__restore;
  }
}

function ngs_IsMinimized()
{
  return (!this.ControlsPanel1.Visible);
}

function ngs_Maximize()
{
  if((this.IsMinimized())||(this.IsMaximized())) this.Restore();
  if((this.OnMaximize)&&(!ngVal(this.OnMaximize(this),false))) return;
  this.ControlsPanel2.SetVisible(false);
  this.SetSize(this.Size);
}

function ngs_IsMaximized()
{
  return (!this.ControlsPanel2.Visible);
}

function ngs_Minimize()
{
  if((this.IsMinimized())||(this.IsMaximized())) this.Restore();
  if((this.OnMinimize)&&(!ngVal(this.OnMinimize(this),false))) return;
  this.ControlsPanel1.SetVisible(false);
  this.SetSize(this.Size);
}

function ngs_SetSize(size)
{
  var changed=(size!=this.Size);
  
  var cursize=this.Size;
  this.Size=size;
  if((changed)&&(this.OnSizeChanging)&&(!ngVal(this.OnSizeChanging(this,cursize),false))) 
  {
    this.Size=cursize;
    return;
  }
  if((this.MaxSize>0)&&(this.Size>this.MaxSize)) this.Size=this.MaxSize;
  if(this.Size<this.MinSize) this.Size=this.MinSize;
      
  var o=this.Elm();
  if((!this.__restore)&&(this.Size<=this.AutoMinimize)&&(!this.IsMinimized())) 
  {
    this.Size=cursize;
    this.Minimize();
    o=null; // don't set size
  }

  if(o)
  {
    var w=ng_ClientWidth(o);
    var h=ng_ClientHeight(o);

    var handle=document.getElementById(this.ID+'_H');
    
    var ms,s2,s1=Math.round(this.Size);
    var hs=this.HandleSize();
    var min=this.IsMinimized();
    var max=this.IsMaximized();
  
    if(handle) handle.style.display=(this.HandleVisible ? 'block' : 'none');
    switch(this.PanelAlign)
    {
      case 'left':
      case 'right':
        if((!this.__restore)&&(w-hs>0)&&(w-hs-this.Size<=this.AutoMaximize)&&(!this.IsMaximized())) 
        { 
          this.Size=cursize; 
          this.Maximize(); 
          min=true; max=true; // don't set bounds 
          break; 
        }
        s2=(min ? w-hs : w-hs-Math.round(this.Size));
        if(max) { s1=w-hs; s2=0; }
        if(min) { s1=0; }
        if(s1<0) s1=0;
        if(s1>w-hs) s1=w-hs;
        if((!min)&&(!max)) this.Size=s1;
        if(s2<0) s2=0;
        if(s2>w-hs) s2=w-hs;
        if(!min) this.ControlsPanel1.Bounds.W=s1;  
        if(!max) this.ControlsPanel2.Bounds.W=s2;
        ms=(this.PanelAlign == 'left' ? s1 : s2)+'px';
        if(handle)
        {
          handle.style.left=ms;
          handle.style.width=hs+'px';
          handle.style.height=h+'px';
        }
        break;          
      case 'top':
      case 'bottom':
        if((!this.__restore)&&(h-hs>0)&&(h-hs-this.Size<=this.AutoMaximize)&&(!this.IsMaximized())) 
        { 
          this.Size=cursize; 
          this.Maximize();
          min=true; max=true; // don't set bounds
          break; 
        }
        s2=(min ? h-hs : h-hs-Math.round(this.Size));
        if(max) { s1=h-hs; s2=0; }
        if(min) { s1=0; }
        if(s1<0) s1=0;
        if(s1>h-hs) s1=h-hs;
        if((!min)&&(!max)) this.Size=s1;
        if(s2<0) s2=0;
        if(s2>h-hs) s2=h-hs;
        if(!min) this.ControlsPanel1.Bounds.H=s1;          
        if(!max) this.ControlsPanel2.Bounds.H=s2;
        ms=(this.PanelAlign == 'top' ? s1 : s2)+'px';
        if(handle)
        {
          handle.style.top=ms;
          handle.style.height=hs+'px';          
          handle.style.width=w+'px';          
        }
        break;          
    }
    if(!min) 
    {
      this.ControlsPanel1.SetBounds();
      this.ControlsPanel1.Update();
    }
    if(!max) 
    {
      this.ControlsPanel2.SetBounds();
      this.ControlsPanel2.Update();
    }
  }
  if((changed)&&(this.OnSizeChanged)) this.OnSizeChanged(this);
}

function ngs_DoUpdate(o)
{
  var handle=document.getElementById(this.ID+'_H');
  if(!handle) return true;

  var cclass=this.BaseClassName;
  var html=new ngStringBuilder;
  var ldim=0,resize=false;
  var w=ng_ClientWidth(o);
  var h=ng_ClientHeight(o);

  switch(this.PanelAlign)
  {
    case 'left':
    case 'right':
      if(ngVal(this.LastDim,w)!=w) resize=true;
      ldim=w;
      break;
    case 'top':
    case 'bottom':
      if(ngVal(this.LastDim,h)!=h) resize=true;
      ldim=h;
      break;
  }
  if(resize)
  {
    if((((!this.OnResize)||(ngVal(this.OnResize(this),false))))&&(ldim>0 && this.LastDim>0))
    {
      var r=ldim/this.LastDim;
      if(this.ResizeMode & ngspResizeSize)         this.Size*=r;
      if(this.ResizeMode & ngspResizeMinSize)      this.MinSize*=r;
      if(this.ResizeMode & ngspResizeMaxSize)      this.MaxSize*=r;
      if(this.ResizeMode & ngspResizeAutoMinimize) this.AutoMinimize*=r;
      if(this.ResizeMode & ngspResizeAutoMaximize) this.AutoMaximize*=r;
    }  
  }
  this.SetSize(this.Size);  
  var img,dp,ss=0,es=0;
  var mh=0,mw=0;
  
  switch(this.PanelAlign)
  {
    case 'left':
    case 'right':
      handle.style.cursor = (this.Enabled ? 'col-resize' : 'default');
      img=this.GetImg(0);
      if(img)
      {
        dp=ngc_ImgDrawProps(this.ID+'_HS', 'ngSplitPanel', this.ID, this.MouseDown, this.Enabled, img);
        ngc_Img(html,dp,"position:absolute; top: 0px;",ngVal(img.Attrs,''));
        ss=dp.H;
        if(dp.W>mw) mw=dp.W;
      }
      
      img=this.GetImg(2);
      if(img)
      {
        dp=ngc_ImgDrawProps(this.ID+'_HE', 'ngSplitPanel', this.ID, this.MouseDown, this.Enabled, img);
        ngc_Img(html,dp,"position:absolute; top: "+(h-dp.H)+"px;",ngVal(img.Attrs,''));
        if(dp.W>mw) mw=dp.W;
        es=dp.H;
      }
  
      img=this.GetImg(1);
      if(img)
      {
        dp=ngc_ImgDrawProps(this.ID+'_HM', 'ngSplitPanel', this.ID, this.MouseDown, this.Enabled, img);
        ngc_ImgSH(html,dp,ss,h-ss-es,'',ngVal(img.Attrs,''));
        if(dp.W>mw) mw=dp.W;
      }
  
      img=this.GetImg(3);
      if(img)
      {
        dp=ngc_ImgDrawProps(this.ID+'_HI', 'ngSplitPanel', this.ID, this.MouseDown, this.Enabled, img);
        ngc_Img(html,dp,"position:absolute;z-index:1;top: "+Math.round((h-dp.H)/2)+"px;",ngVal(img.Attrs,''));
        if(dp.W>mw) mw=dp.W;
      }
      break;
    case 'top':
    case 'bottom':
      handle.style.cursor = (this.Enabled ? 'row-resize' : 'default');
      img=this.GetImg(0);
      if(img)
      {
        dp=ngc_ImgDrawProps(this.ID+'_HS', 'ngSplitPanel', this.ID, this.MouseDown, this.Enabled, img);
        ngc_Img(html,dp,"position:absolute; left: 0px;",ngVal(img.Attrs,''));
        ss=dp.W;
        if(dp.H>mh) mh=dp.H;
      }
      
      img=this.GetImg(2);
      if(img)
      {
        dp=ngc_ImgDrawProps(this.ID+'_HE', 'ngSplitPanel', this.ID, this.MouseDown, this.Enabled, img);
        ngc_Img(html,dp,"position:absolute; left: "+(w-dp.W)+"px;",ngVal(img.Attrs,''));
        if(dp.H>mh) mh=dp.H;
        es=dp.W;
      }
  
      img=this.GetImg(1);
      if(img)
      {
        dp=ngc_ImgDrawProps(this.ID+'_HM', 'ngSplitPanel', this.ID, this.MouseDown, this.Enabled, img);
        ngc_ImgSW(html,dp,ss,w-ss-es,'',ngVal(img.Attrs,''));
        if(dp.H>mh) mh=dp.H;
      }
  
      img=this.GetImg(3);
      if(img)
      {
        dp=ngc_ImgDrawProps(this.ID+'_HI', 'ngSplitPanel', this.ID, this.MouseDown, this.Enabled, img);
        ngc_Img(html,dp,"position:absolute;z-index:1;left: "+Math.round((w-dp.W)/2)+"px;",ngVal(img.Attrs,''));
        if(dp.H>mh) mh=dp.H;
      }
      break;
  }
  ng_SetInnerHTML(handle,html.toString());

  var cn=cclass+(this.Enabled ? 'Handle' : 'HandleDisabled');
  if(ngs_CurrentHandleId==handle.id) cn+='_Focus';
  handle.className=cn; 

  this.LastDim=ldim;
  return true;
}

function ngs_DoUpdateImages()
{
  for(var i=0;i<4;i++){
    img=this.GetImg(i);
    if(img)
    {
      var pfix = '';
      
      switch(i)
      {
        case 0: pfix='_HS'; break;
        case 1: pfix='_HM'; break;
        case 2: pfix='_HE'; break;
        case 3: pfix='_HI'; break;
      }
      
      ngc_ChangeImg(this.ID+pfix,this.MouseDown,this.Enabled,img);
    }
  }
}

function ngs_DoAttach(o)
{
  var h=document.getElementById(this.ID+'_H');
  if(h) 
  {
    var c=this;
    h.onmouseover = function(e) { ngs_HandleEnter(e,this,c); }
    h.onmouseout  = function(e) { ngs_HandleLeave(e,this,c); }
    ngc_PtrListener(this, h, 'handle','drag');
  }
}

function ngs_DoRelease(o)
{
  o.style.display='none';
  var handle=document.getElementById(this.ID+'_H');
  if(handle) ng_SetInnerHTML(handle,'');
}

function ngs_DoCreate(def, ref, elm, parent)
{
  var cclass=this.BaseClassName;

  var w=ng_ClientWidth(elm);
  var h=ng_ClientHeight(elm);

  var hs=this.HandleSize();
  if((this.MaxSize>0)&&(this.Size>this.MaxSize)) this.Size=this.MaxSize;
  if(this.Size<this.MinSize) this.Size=this.MinSize;
  
  // Panel1
  
  var ldefs=new Object;
  if(typeof def.ControlsPanel1 === 'object') ldefs.ControlsPanel = ng_CopyVar(def.ControlsPanel1);
  else if(typeof def.ControlsPanel === 'object') ldefs.ControlsPanel = ng_CopyVar(def.ControlsPanel);
  else ldefs.ControlsPanel = new Object;

  var ld=ldefs.ControlsPanel;    
  ng_MergeDef(ld, {
    Type: 'ngPanel',
    className: cclass+'ControlsPanel',
    id: this.ID+'_P1',
    ScrollBars: ssAuto
  });
  
  var s=Math.round(this.Size);
  switch(this.PanelAlign)
  {
    case 'left':
      ld.L=0; ld.W=s;  
      ld.T=0; ld.B=0;
      break;
    case 'right':
      ld.R=0; ld.W=s;  
      ld.T=0; ld.B=0;
      break;          
    case 'top':
      ld.T=0; ld.H=s;
      ld.L=0; ld.R=0;  
      break;
    case 'bottom':
      ld.B=0; ld.H=s;
      ld.L=0; ld.R=0;  
      break;          
  }
  ld.Controls=def.Controls1;
  ld.ModifyControls=def.ModifyControls1;

  var lref=ngCreateControls(ldefs,undefined,this.ID);

  this.ControlsPanel1=lref.ControlsPanel;
  this.ControlsPanel1.Owner=this;
  delete lref.ControlsPanel;
  ngCloneRefs(ref,lref);

  // Panel2
  ldefs=new Object;
  if(typeof def.ControlsPanel2 === 'object') ldefs.ControlsPanel = ng_CopyVar(def.ControlsPanel2);
  else if(typeof def.ControlsPanel === 'object') ldefs.ControlsPanel = ng_CopyVar(def.ControlsPanel);
  else ldefs.ControlsPanel = new Object;

  ld=ldefs.ControlsPanel;    
  ng_MergeDef(ld, {
    Type: 'ngPanel',
    className: cclass+'ControlsPanel',
    id: this.ID+'_P2',
    ScrollBars: ssAuto
  });

  s=w-hs-Math.round(this.Size);
  if(s<0) s=0;
  switch(this.PanelAlign)
  {
    case 'left':
      ld.R=0; ld.W=s;  
      ld.T=0; ld.B=0;          
      break;     
    case 'right':  
      ld.L=0; ld.W=s;  
      ld.T=0; ld.B=0;          
      break;     
    case 'top':
      ld.B=0; ld.H=s;
      ld.L=0; ld.R=0;  
      break;     
    case 'bottom':
      ld.T=0; ld.H=s;
      ld.L=0; ld.R=0;  
      break;     
  }
  ld.Controls=def.Controls2;
  ld.ModifyControls=def.ModifyControls2;
  lref=ngCreateControls(ldefs,undefined,this.ID);  

  this.ControlsPanel2=lref.ControlsPanel;
  this.ControlsPanel2.Owner=this;
  delete lref.ControlsPanel;
  ngCloneRefs(ref,lref);

  var nd=document.createElement('div');
  nd.id=this.ID+'_H';
  nd.className=cclass+'Handle';
  nd.style.position="absolute";
  elm.appendChild(nd);
  ngc_PtrEventsHTML(this,'handle','drag')

  var nd2=document.createElement('div');
  nd2.id=this.ID+'_M';
  nd2.className=cclass+'Mover';
  nd2.style.display="none";
  nd2.style.position="absolute";
  nd2.style.zIndex="801";
  nd2.style.fontSize="0px";
  nd2.style.lineHeight="0px";
  nd2.style.left="0px";
  nd2.style.top="0px";
  nd2.style.width="0px";
  nd2.style.height="0px";
  elm.appendChild(nd2);
  
/*
  ng_AppendInnerHTML(elm,'<div id="'+this.ID+'_H" class="'+cclass+'Handle" style="position: absolute;"'+ngc_PtrEventsHTML(this,'handle','drag')+'></div>')
//  ng_AppendInnerHTML(elm,'<div id="'+this.ID+'_H" class="'+cclass+'Handle" style="position: absolute;"></div>'
                +'<div id="'+this.ID+'_M" class="'+cclass+'Mover"  style="display:none;position: absolute; z-index: 801; font-size:0px;line-height:0px;left:0px;top:0px;width:0px;height:0px;"></div>');
                */
}

var ngs_initialized = false;

var ngspResizeNone = 0;
var ngspResizeSize = 1;
var ngspResizeMinSize = 2;
var ngspResizeMaxSize = 4;
var ngspResizeAutoMinimize = 8;
var ngspResizeAutoMaximize = 16; 

/**
 *  Class: ngSplitPanel
 *  This class implements a generic split panel control. 
 *
 *  Syntax:
 *    new *ngSplitPanel* ([string id])
 *    
 *  Parameters:
 *    id - control ID
 *    
 *  See also:
 *    Abstract class <ngControl>.    
 */
function ngSplitPanel(id)
{
  ngControl(this, id, 'ngSplitPanel');

  /*
   *  Group: Definition
   */
  /*
   *  Variable: Controls1
   *  ...
   *  Type: object
   */
  /*
   *  Variable: Controls2
   *  ...
   *  Type: object
   */
  /*<>*/
  /*
   *  Variable: ControlsPanel1
   *  Controls panel definition.
   *  Type: object
   */
  /*<>*/
  /*
   *  Variable: ControlsPanel2
   *  Controls panel definition.
   *  Type: object
   */
  /*<>*/
  
  /*
   *  Group: Properties
   */
  /*  Variable: PanelAlign
   *  ...
   *  Type: string
   *  Default value: *'left'*   
   */
  this.PanelAlign = 'left';  
  /*  Variable: ResizeMode
   *  ...
   *  Type: enum
   *  
   *  Constants:
   *    ngspResizeSize - ...
   *    ngspResizeMinSize - ...
   *    ngspResizeMaxSize - ...
   *    ngspResizeAutoMinimize - ...
   *    ngspResizeAutoMaximize - ... 
   *      
   *  Default value: *ngspResizeSize*   
   */
  this.ResizeMode = ngspResizeSize; 
  
  /*  Variable: Size
   *  ...
   *  Type: int
   *  Default value: *200*   
   */
  this.Size = 200;
  /*  Variable: MinSize
   *  ...
   *  Type: int
   *  Default value: *0*   
   */
  this.MinSize = 0;
  /*  Variable: MaxSize
   *  ...
   *  Type: int
   *  Default value: *0*   
   */
  this.MaxSize = 0;
  /*  Variable: AutoMinimize
   *  ...
   *  Type: int
   *  Default value: *0*   
   */
  this.AutoMinimize = 0;
  /*  Variable: AutoMaximize
   *  ...
   *  Type: int
   *  Default value: *0*   
   */
  this.AutoMaximize = 0;
  
  /*  Variable: HandleVisible
   *  ...
   *  Type: bool
   *  Default value: *true*   
   */
  this.HandleVisible = true;

  /*  Variable: MoverStartImg
   *  ...
   *  Type: object
   */
  this.MoverStartImg = null;
  /*  Variable: MoverMiddleImg
   *  ...
   *  Type: object
   */
  this.MoverMiddleImg = null;
  /*  Variable: MoverEndImg
   *  ...
   *  Type: object
   */
  this.MoverEndImg = null;
  /*  Variable: HandleImg
   *  ...
   *  Type: object
   */
  this.HandleImg = null;
  
  this.MouseDown = false;

  /*
   *  Group: Methods
   */
  /*  Function: SetSize
   *  Changes size of split panel.     
   *   
   *  Syntax:
   *    void *SetSize* (int size)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.SetSize = ngs_SetSize;

  /*  Function: Minimize
   *  Minimizes split panel.     
   *   
   *  Syntax:
   *    void *Minimize* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.Minimize = ngs_Minimize;
  /*  Function: Maximize
   *  Maximizes split panel.     
   *   
   *  Syntax:
   *    void *Maximize* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.Maximize = ngs_Maximize;
  /*  Function: Restore
   *  Restores split panel to its normal size.     
   *   
   *  Syntax:
   *    void *Restore* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.Restore  = ngs_Restore;
  
  /*  Function: IsMaximized
   *  Determines if split panel is maximized.     
   *   
   *  Syntax:
   *    bool *IsMaximized* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.IsMaximized = ngs_IsMaximized;
  /*  Function: IsMinimized
   *  Determines if split panel is minimized.     
   *   
   *  Syntax:
   *    bool *IsMinimized* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.IsMinimized = ngs_IsMinimized;
 
  this.DoCreate = ngs_DoCreate;
  this.DoRelease = ngs_DoRelease;
  this.DoUpdate = ngs_DoUpdate;
  this.DoAttach = ngs_DoAttach;
  this.DoPtrStart = ngs_DoPtrStart;
  this.DoPtrDrag = ngs_DoPtrDrag;
  this.DoPtrEnd = ngs_DoPtrEnd;
  this.DoUpdateImages = ngs_DoUpdateImages;

  this.GetImg = ngs_GetImg;
  this.HandleSize = ngs_HandleSize;
  
  this.DoHandleClick = ngs_DoHandleClick;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnGetImg
   */     
  this.OnGetImg = null;

  /*
   *  Event: OnResize
   */     
  this.OnResize = null;  
  /*
   *  Event: OnHandleClick
   */     
  this.OnHandleClick = null;
  /*
   *  Event: OnSizeChanging
   */     
  this.OnSizeChanging = null;
  /*
   *  Event: OnSizeChanged
   */     
  this.OnSizeChanged = null;  
  /*
   *  Event: OnMinimize
   */     
  this.OnMinimize = null;
  /*
   *  Event: OnMaximize
   */     
  this.OnMaximize = null;
  /*
   *  Event: OnRestore
   */     
  this.OnRestore = null;
  
  ngControlCreated(this);
}

// --- ngDropPanel -------------------------------------------------------------

function ngdp_BtnClick(e)
{
  if((e.Owner)&&(e.Owner.Owner))
    e.Owner.Owner.SetDropDown(e.Owner.Checked == 1 ? false : true);
}

function ngdp_DoUpdate(o)
{
  var bh=0;
  var dropdown=false;
  var btntop=(typeof this.Bounds.T === 'undefined');
  if(btntop) 
  {
    if(typeof this.Bounds.T!=='undefined')
    {
      delete this.Bounds.T;
      this.SetBounds();
    }
  }
  else 
  {
    if(typeof this.Bounds.B!=='undefined')
    {
      delete this.Bounds.B;
      this.SetBounds();
    }
  }

  var b=this.Button;
  if(b)
  {
    if(b.Checked==1) dropdown=true;
    if(btntop)
    {
      b.SetBounds({T: 0, B: undefined});      
    }
    else
    {
      b.SetBounds({B: 0, T: undefined});
    }
    if(b.ID=='') b.Attach(this.ID+'_B');
    b.Parent=this;
    b.Update();
    var bo=b.Elm();
    if(bo) bh=ng_OuterHeight(bo);
  }
  if(!dropdown)
  {
    if(this.ControlsPanel.Visible)
    {
      var po=this.ControlsPanel.Elm();
      if(po) 
      {
        var ch=ng_ClientHeight(po);
        if(ch>bh) this.PanelHeight=ch;
      }
      
      this.ControlsPanel.SetVisible(false);
    }

    ng_SetClientHeight(o,bh);
    var cbh=ng_StyleHeight(o);
    if(this.Bounds.H!=cbh)
    {
      this.Bounds.H=cbh;
      this.SetBounds();
    }
  }
  else
  {
    if(!this.ControlsPanel.Visible)
    {
      ng_SetClientHeight(o,bh+this.PanelHeight);
    }
    var cbh=ng_StyleHeight(o);
    if(this.Bounds.H!=cbh)
    {
      this.Bounds.H=cbh;
      this.SetBounds();
    }

    this.ControlsPanel.Bounds.T=(btntop ? bh : 0);
    this.ControlsPanel.Bounds.L=0;
    this.ControlsPanel.Bounds.R=0;
    this.ControlsPanel.Bounds.B=(btntop ? 0 : bh);
    this.ControlsPanel.SetBounds();
    this.ControlsPanel.SetVisible(true);
  }
  
  return true;
}

function ngdp_SetBounds(props)
{
  if(typeof props!=='undefined') 
  {
    // changing height, update PanelHeight and check dropdown
    if(typeof props.H !== 'undefined') 
    {
      var bh=0;
      var dropdown=false;
      if(this.Button)
      {
        var o=this.Button.Elm();
        if(o) bh=ng_OuterHeight(o);
        if(this.Button.Checked==1) dropdown=true;
      }
      this.PanelHeight=props.H - bh;
      if(!dropdown) this.Bounds.H=0;
    }
  }
  return this.DefaultSetBounds(props);
}

function ngdp_SetClientRect(v)
{
  if(!ngVal(v,false)) return;

  if(typeof v.W !== 'undefined') 
  {
    this.Bounds.W=v.W;
  }
  
  if(typeof v.H !== 'undefined')
  {
    var bh=0;
    var dropdown=false;
    if(this.Button)
    {
      var o=this.Button.Elm();
      if(o) bh=ng_OuterHeight(o);
      if(this.Button.Checked==1) dropdown=true;
    }
    this.PanelHeight=v.H;
    this.Bounds.H=(dropdown ? v.H : 0)+bh;
  }  
}

function ngdp_GetClientRect()
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

function ngdp_DoRelease(o)
{
  o.style.display='none';
}

function ngdp_DoCreate(def, ref, elm, parent)
{
  var cclass=this.BaseClassName;

  var bh=0;
  var btntop=(typeof def.T === 'undefined');

  if(typeof def.Button === 'undefined') def.Button=new Object;
  ng_MergeDef(def.Button, {
    Type: 'ngButton',
    L: 0, R: 0,
    id: this.ID+'_B',
    Data: {
      Checked: (ngVal(def.DroppedDown,false) ? 1 : 0) 
    },
    Events: {
      OnClick: ngdp_BtnClick
    }
  });   
  if(typeof def.B === 'undefined') { def.Button.B=0; def.Button.T=undefined; }
  else { def.Button.T=0; delete def.Button.B; }
  var lref=ngCreateControls({ Control: def.Button },undefined,this.ID);
  if(typeof lref.Control !== 'undefined') // dropdown successfuly created
  {
    lref.Control.Owner=this;
    this.Button=lref.Control;
    this.Button.Parent=this;
  }
  else this.Button=null;

  var b=this.Button;
  if(b)
  {
    if((b)&&(b.ID=='')) b.Attach(this.ID+'_B');
    b.Update();
    var bo=b.Elm();
    if(bo) bh=ng_OuterHeight(bo);
  }
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
  ldefs.ControlsPanel.T=(btntop ? bh : 0);
  ldefs.ControlsPanel.B=(btntop ? 0 : bh);
  
  var lref=ngCreateControls(ldefs,undefined,this.ID);

  this.ControlsPanel=lref.ControlsPanel;
  this.ControlsPanel.Owner=this;
  delete lref.ControlsPanel;
  ngCloneRefs(ref,lref);

  delete def.Controls;
  delete def.ModifyControls;
}

function ngdp_IsDroppedDown()
{
  return ((this.Button)&&(this.Button.Checked==1));
}

function ngdp_SetDropDown(dd)
{
  if(this.IsDroppedDown()!=dd)
  {
    if((this.OnDropDown)&&(!ngVal(this.OnDropDown(this,dd),false))) return;
    
    if(this.Button) 
    {
      this.Button.Check(dd ? 1 : 0);
      this.Update();
    }
  }
}

function ngdp_ToggleDropDown()
{
  this.SetDropDown(!this.IsDroppedDown());
}

/**
 *  Class: ngDropPanel
 *  This class implements a generic drop-down panel control. 
 *
 *  Syntax:
 *    new *ngDropPanel* ([string id])
 *    
 *  Parameters:
 *    id - control ID
 *    
 *  See also:
 *    Abstract class <ngControl>.    
 */
function ngDropPanel(id)
{
  ngControl(this, id, 'ngDropPanel');

  /*
   *  Group: Definition
   */
  /*
   *  Variable: DroppedDown
   *  Determines if panel is dropped down when created.
   *  Type: bool (default: false)
   */
  /*<>*/
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
  /*  Variable: Button
   *  ...
   *  Type: object
   */
   
  this.Button = null;
  
  /*
   *  Group: Methods
   */
 this.IsDroppedDown = ngdp_IsDroppedDown;
 this.SetDropDown = ngdp_SetDropDown;
 this.ToggleDropDown = ngdp_ToggleDropDown;
  
  /*  Function: GetClientRect
   *  Gets client rectangle dimensions.   
   *   
   *  Syntax:
   *    object *GetClientRect* ()
   *     
   *  Returns:
   *    Rectangle dimensions in format { W: width, H: height }.     
   */
  this.GetClientRect = ngdp_GetClientRect;
  
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
  this.SetClientRect = ngdp_SetClientRect;
  
  this.DefaultSetBounds = this.SetBounds;
  this.SetBounds = ngdp_SetBounds;

  this.DoCreate = ngdp_DoCreate;
  this.DoRelease = ngdp_DoRelease;
  this.DoUpdate = ngdp_DoUpdate;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnDropDown
   */     
  this.OnDropDown = null;
 
  ngControlCreated(this);
}

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['panels'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    ngRegisterControlType('ngAlignPanel', ngAlignPanel_Create); 
    ngRegisterControlType('ngAlignFrame', ngAlignPanel_Create); 

    ngRegisterControlType('ngDropPanel', function() { return new ngDropPanel; }); 

    ngRegisterControlType('ngSplitPanel', function() { return new ngSplitPanel; });

  }
};
