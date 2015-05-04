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
 *  Group: Window
 *    
 */

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
var OnStartModal = null;
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
var OnStopModal = null;

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
         o=document.createElement('div');
         o.id="NGMODALWINDOW_CURTAIN";
         o.className='ngModalCurtain';
         o.style.position='absolute';
         o.style.left='0%';
         o.style.top='0%';
         o.style.width='100%';
         o.style.height='100%';
         o.style.display='block';
         o.style.zIndex=ngModalZIndexDelta;

         var parent=((typeof ngApp === 'object')&&(ngApp) ? ngApp.Elm() : document.body);
         parent.appendChild(o);
      }
      else 
      {
        o.style.zIndex=ngModalZIndexDelta;
        o.style.display='block';
        o.style.visibility='visible'; // IE7 sometimes don't hide elements if display is none
        // IE7 redraw fix
        var fix7=o.offsetLeft;
      } 
    }
  }  
  ngModalCnt++;
  if(ngModalCnt>1)
  {
    var o = document.getElementById('NGMODALWINDOW_CURTAIN');
    if(o) o.style.zIndex=(ngModalCnt*ngModalZIndexDelta);
  }
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
  if(ngModalCnt<=0)
  {
    ngModalCnt=0;
    if((!OnStopModal)||(ngVal(OnStopModal(),false))) 
    {
      var o = document.getElementById('NGMODALWINDOW_CURTAIN');
      if(o) 
      {
        o.style.display='none';
        o.style.visibility='hidden'; // IE7 sometimes don't hide elements if display is none
        // IE7 redraw fix
        var fix7=o.offsetLeft;
      }
    }
  }
  else
  {
    var o = document.getElementById('NGMODALWINDOW_CURTAIN');
    if(o) o.style.zIndex=(ngModalCnt*ngModalZIndexDelta);
  }
}

// --- Window create helper fnc ------------------------------------------------

/**
 *  Function: ngCreateWindow
 *  Creates window by definition.
 *  
 *  Syntax:
 *    object *ngCreateWindow* (object def, object parent)
 *    
 *  Returns:
 *    Created window object (<ngWindow>). 
 */
function ngCreateWindow(def,parent)
{
  if(!def) return null;
  var cnt=0,wname='';
  if(typeof def==='string')
  {
    var ndef=new Object;
    ndef.Window={ Type: def };
    wname='Window';
    def=ndef;
  }
  else
  {
    for(var i in def) 
    {
      cnt++;
      if(cnt>1)
      {
        var ndef=new Object;
        ndef.Window=ng_CopyVar(def);
        wname='Window';
        def=ndef;
        break;
      }
      else wname=i;
    }
    if(wname=='') return null;
  }
  var lref=new ngControls(def,parent);
  var c=ngVal(lref[wname],null);
  if(c) 
  {
    c.Owner=null;
    if(c.Visible) c.Update();
  }
  return c;
}

// --- ngWindow ----------------------------------------------------------------

function ngw_DoResize(o)
{
  if((this.Moveable)||(this.Sizeable))
  {
    if(this.CheckBounds()) { this.SetBounds(); this.Update(); } 
  }
  return ng_Align(o);
}

function ngw_OnVisibleChanged(c)
{
  if(c.Visible)
  {
    if(c.Centered) c.Center();
    c.SetFocus();
  }
  if(c.Modal)
  {
    if(c.Visible) ngStartModalControl();
    else ngStopModalControl();
    var o=c.Elm();
    if(o)
    {
      if(c.Visible) o.style.zIndex=(ngModalCnt*ngModalZIndexDelta)+1;
      else          o.style.zIndex=Math.round((ngModalCnt+0.5)*ngModalZIndexDelta);
    }
  }
}

function ngw_Show()
{
  this.SetVisible(true);
}

function ngw_Hide()
{
  this.SetVisible(false);
}
  
function ngw_Close()
{
  if((this.OnClose)&&(!ngVal(this.OnClose(this),false))) return;
  this.Hide();
  if(this.DisposeOnClose) 
  {
    var owner=this.Owner;
    this.Dispose();
    if((owner)&&(typeof owner === 'object')) // remove reference
    {
      for(var i in owner)
      {
        if(owner[i]==this) 
        {
          delete owner[i];
          break;
        }
      }
    }
  }
  else this.Release();
}

function ngw_Restore()
{
  if(!this.StateBounds) return;  
  this.StateBounds=null;
  this.CheckBounds();
  this.SetBounds();
  this.ControlsPanel.SetVisible(true);
  this.Update();
}

function ngw_Center()
{
  var o=this.Elm();
  if(!o) return;
  var po=o.offsetParent;
  if((po)&&(po==document.body)) po=null;
  var pw=(po ? ng_ClientWidth(po) : ng_WindowWidth()); 
  var ph=(po ? ng_ClientHeight(po) : ng_WindowHeight()); 

  var b=this.Bounds;
  
  b.L=Math.round((pw-b.W)/2);
  b.T=Math.round((ph-b.H)/2);
  this.SetBounds();
}

function ngw_CalcAutoSize()
{
  if(!ngVal(this.ControlsPanel,false)) return;
  var cc=this.ControlsPanel.ChildControls;
  if(typeof cc !== 'undefined')
  {
    this.ControlsPanel.SetScrollBars(ssNone);

    var o=this.Elm();
    if(!o) return;
    var po=o.offsetParent;
    if((po)&&(po==document.body)) po=null;
    var pw=(po ? ng_ClientWidth(po) : ng_WindowWidth()); 
    var ph=(po ? ng_ClientHeight(po) : ng_WindowHeight());
    
    // set to max size (eliminate scrollbars)
    ng_SetClientWidth(o,pw);
    ng_SetClientHeight(o,ph);
  
    var minl=-1,mint=-1,minr=-1,minb=-1,maxw=0,maxh=0;
    var maxl=0,maxt=0,maxr=0,maxb=0;
    var c,co,w,h;
    for(var i=0;i<cc.length;i++) 
    {
      c=cc[i];
      if((!c)||(!c.Visible)) continue;
      co=c.Elm();
      if(!co) continue;
      
      ng_BeginMeasureElement(co);
      if((typeof c.Bounds.R === 'undefined')||(typeof c.Bounds.L === 'undefined')) 
      {
        w=ng_OuterWidth(co);
        if(w>maxw) maxw=w;
        if(typeof c.Bounds.L !== 'undefined') 
        {
          if(c.Bounds.L+w>maxl) maxl=c.Bounds.L+w; 
          if((c.Bounds.L<minl)||(minl<0)) minl=c.Bounds.L;
        }        
        else 
        {
          if(c.Bounds.R+w>maxr) maxr=c.Bounds.R+w; 
          if((c.Bounds.R<minr)||(minr<0)) minr=c.Bounds.R;
        }
      }
      if((typeof c.Bounds.B === 'undefined')||(typeof c.Bounds.T === 'undefined')) 
      {
        h=ng_OuterHeight(co);
        if(h>maxh) maxh=h;
        if(typeof c.Bounds.T !== 'undefined') 
        {
          if(c.Bounds.T+h>maxt) maxt=c.Bounds.T+h; 
          if((c.Bounds.T<mint)||(mint<0)) mint=c.Bounds.T;
        }        
        else 
        {
          if(c.Bounds.B+h>maxb) maxb=c.Bounds.B+h; 
          if((c.Bounds.B<minb)||(minb<0)) minb=c.Bounds.B;
        }
      }
      ng_EndMeasureElement(co);
    }
    w=maxw;
    h=maxh;
    if((minl>=0)&&(maxl-minl)>w) w=maxl-minl;
    if((minr>=0)&&(maxr-minr)>w) w=maxr-minr;
    if((mint>=0)&&(maxt-mint)>h) h=maxt-mint;
    if((minb>=0)&&(maxb-minb)>h) h=maxb-minb;
      
    if(minl>=0) w+=minl;
    else if(minr>=0) w+=minr;
    if(minr>=0) w+=minr;
    else if(minl>=0) w+=minl;
    
    if(mint>=0) h+=mint;
    else if(minb>=0) h+=minb;
    if(minb>=0) h+=minb;
    else if(mint>=0) h+=mint;
    if(w<=0) w=undefined;
    if(h<=0) h=undefined;
    var changed=this.SetClientRect({W: w, H: h });
    this.SetBounds();
    if(changed) this.Update();
  }  
}

function ngw_Minimize()
{
  if((this.IsMinimized())||(this.IsMaximized())) this.Restore();
  if((this.OnMinimize)&&(!ngVal(this.OnMinimize(this),false))) return;
  this.ControlsPanel.SetVisible(false);
  if(typeof this.MinimizedBounds === 'undefined')
  {
    var th=0;
    var image=this.CaptionImg.LeftImg;
    if(image)
    {
      dp=ngc_ImgProps(this.ID+'_IL', 0, this.Enabled, image);
      if(dp.H>th) th=dp.H;
    }
  
    image=this.CaptionImg.RightImg;
    if(image)
    {
      dp=ngc_ImgProps(this.ID+'_IR', 0, this.Enabled, image);
      if(dp.H>th) th=dp.H;
    }
  
    image=this.CaptionImg.MiddleImg;
    if(image)
    {
      dp=ngc_ImgProps(this.ID+'_IM', 0, this.Enabled, image);
      if(dp.H>th) th=dp.H;
    }  
    this.StateBounds=ng_CopyVar(this.Bounds);
    this.StateBounds.H=th;
  }
  else
  {
    this.StateBounds=ng_CopyVar(this.MinimizedBounds);
    ng_MergeVar(this.StateBounds,this.Bounds);    
  }
  this.SetBounds();
  this.Update();
}

function ngw_Maximize()
{
  if((this.IsMinimized())||(this.IsMaximized())) this.Restore();
  if((this.OnMaximize)&&(!ngVal(this.OnMaximize(this),false))) return;
  this.StateBounds={L:0,T:0,R:0,B:0};
  this.SetBounds();
  this.ControlsPanel.SetVisible(true);
  this.Update();
}

function ngw_IsMaximized()
{
  return ((this.StateBounds)&&(this.StateBounds.L==0)&&(this.StateBounds.T==0)&&(this.StateBounds.R==0)&&(this.StateBounds.B==0));
}

function ngw_IsMinimized()
{
  return ((this.ControlsPanel)&&(!this.ControlsPanel.Visible));
}

function ngw_SetBounds(props)
{
  if(this.StateBounds)
  {
    var o = this.Elm();
    if(!o) return;
    ng_SetBounds(o, this.StateBounds);  
  }
  else this.SetBoundsEx(props);
}

function ngw_CheckBounds()
{
  var o=this.Elm();
  if(!o) return false;
  var po=o.offsetParent;
  if((po)&&(po==document.body)) po=null;
  
  var pw=(po ? ng_ClientWidth(po) : ng_WindowWidth()); 
  var ph=(po ? ng_ClientHeight(po) : ng_WindowHeight()); 

  var cb=this.Bounds;
  if((this.ControlsPanel)&&(!this.ControlsPanel.Visible)&&(this.StateBounds)) cb=this.StateBounds;
  var ob=ng_CopyVar(cb);
  
  if(this.Sizeable)
  {
    if(cb.W>pw) cb.W=pw; 
    if(cb.H>ph) cb.H=ph; 
  }
  if(!this.IsMinimized())
  {
    if(ngVal(cb.W,0)<this.MinWidth)  cb.W=this.MinWidth;
    if(ngVal(cb.H,0)<this.MinHeight) cb.H=this.MinHeight;
  }
  if(!this.IsMaximized())
  {
    if((this.MaxWidth>0)&&(ngVal(cb.W,0)>this.MaxWidth))   cb.W=this.MaxWidth;
    if((this.MaxHeight>0)&&(ngVal(cb.H,0)>this.MaxHeight)) cb.H=this.MaxHeight;
  }

  if(this.Moveable)
  {
    var r=cb.L+cb.W;
    var b=cb.T+cb.H;
    if(r>pw) cb.L=pw-cb.W;  
    if(b>ph) cb.T=ph-cb.H; 
    if(cb.L<0) cb.L=0; 
    if(cb.T<0) cb.T=0; 
  }
  return ((ob.L!=cb.L)||(ob.T!=cb.T)||(ob.W!=cb.W)||(ob.H!=cb.H));
}

function ngw_DoPtrClick(pi)
{
  if(pi.EventID!=='window') return;
  if(this.OnClick) 
  {
    var e=this.PointerInfo.Event;
    e.win=this;    
    this.OnClick(e);
  }
}

function ngw_DoPtrDblClick(pi)
{
  if(pi.EventID!=='window') return;
  if(this.OnDblClick) 
  {
    var e=this.PointerInfo.Event;
    e.win=this;    
    this.OnDblClick(e);
  }
}
function ngw_IsDragEvent(eid)
{
  switch(eid)
  { 
    case 'left': 
    case 'right':
    case 'top': 
    case 'lefttop':
    case 'righttop': 
    case 'bottom': 
    case 'leftbottom':
    case 'rightbottom':
    case 'window':
      return true;
  }
  return false;
}

function ngw_DoPtrStart(pi)
{  
  if(!ngw_IsDragEvent(pi.EventID)) 
  {
    this.MouseType = -1; 
    return;
  }

  this.MouseBounds = ng_CopyVar(this.StateBounds ? this.StateBounds : this.Bounds);

  var cur='',mt=-1;
  switch(pi.EventID)
  { 
    case 'window': mt=0; break;
    case 'left': cur='w-resize'; mt=1; break;
    case 'right': cur='e-resize'; mt=2; break;
    case 'top': cur='n-resize'; mt=4; break;
    case 'lefttop': cur='nw-resize'; mt=5; break;
    case 'righttop': cur='ne-resize'; mt=6; break;
    case 'bottom': cur='s-resize'; mt=8; break;
    case 'leftbottom': cur='sw-resize'; mt=9; break;
    case 'rightbottom': cur='se-resize'; mt=10; break;
  }
  this.MouseType = mt;
  var f=document.getElementById(this.ID+'_M');
  if(f)
  {
    if(cur!='') f.style.cursor=cur;
    if(mt>0)
    {
      var o=this.Elm();
      if(o) 
      {
        o.style.overflow='visible';
        o.style.overflowX='visible';
        o.style.overflowY='visible';
      }
      pi.FrameHorzBorder = ng_GetCurrentStylePx(f,'border-left-width') + ng_GetCurrentStylePx(f,'border-right-width') + ng_GetCurrentStylePx(f,'margin-left') + ng_GetCurrentStylePx(f,'margin-right');
      pi.FrameVertBorder = ng_GetCurrentStylePx(f,'border-top-width') + ng_GetCurrentStylePx(f,'border-bottom-width') + ng_GetCurrentStylePx(f,'margin-top') + ng_GetCurrentStylePx(f,'margin-bottom');

      var w=(o ? ng_ClientWidth(o)-pi.FrameHorzBorder : 0)
      var h=(o ? ng_ClientHeight(o)-pi.FrameVertBorder : 0);
      if(w<0) w=0;
      if(h<0) h=0;
      ng_setBounds(f,0,0,w,h); 
      f.style.display="block";
    }
  }
}

function ngw_DoPtrDrag(pi)
{
  if(this.MouseType<0) return false;

  var o = this.Elm();
  if(!o) return false;

  var dx = pi.X - pi.StartX;
  var dy = pi.Y - pi.StartY;
  if(this.MouseType==0) // Move
  {  
    if(((dx)||(dy))&&(!this.IsMaximized()))
    {
      var pos={ L: this.MouseBounds.L+dx, T: this.MouseBounds.T+dy };
      if(this.OnMouseMoving) this.OnMouseMoving(this,pos);
      
      this.Bounds.L=pos.L;
      this.Bounds.T=pos.T;
      if(this.StateBounds)
      {
        this.StateBounds.L=this.Bounds.L;
        this.StateBounds.T=this.Bounds.T;
      }
      this.CheckBounds();
      this.SetBounds();      
      pi.WinMove=true;
    }
  }
  else // Resize
  {
    var rect = {
      L: 0,
      T: 0,
      W: ng_ClientWidth(o)-pi.FrameHorzBorder,
      H: ng_ClientHeight(o)-pi.FrameVertBorder
    };
    var po=o.offsetParent;
    if((po)&&(po==document.body)) po=null;
    var pw=(po ? ng_ClientWidth(po) : ng_WindowWidth()); 
    var ph=(po ? ng_ClientHeight(po) : ng_WindowHeight()); 
    
    if(this.MouseType & 1) // Left
    {
      if(this.Bounds.L+dx<0) dx=-this.Bounds.L;
      rect.L=dx;
      rect.W-=dx;
    }
    if(this.MouseType & 2) // Right
    {
      if(this.Bounds.L+this.Bounds.W+dx>pw) dx=pw-this.Bounds.L-this.Bounds.W;
      rect.W+=dx;
    }
    if(this.MouseType & 4) // Top
    {
      if(this.Bounds.T+dy<0) dy=-this.Bounds.T;
      rect.T=dy;
      rect.H-=dy;
    }
    if(this.MouseType & 8) // Bottom
    {
      if(this.Bounds.T+this.Bounds.H+dy>ph) dy=ph-this.Bounds.T-this.Bounds.H;
      rect.H+=dy;
    }

    // Check minimal width/height
    var mw=this.MinWidth-pi.FrameHorzBorder;
    var mh=this.MinHeight-pi.FrameVertBorder;
    if(mw<0) mw=1;
    if(mh<0) mh=1;
    if(rect.W<mw) 
    {
      if(this.MouseType & 1) rect.L+=rect.W-mw; 
      rect.W=mw;
    }
    if(rect.H<mh) 
    {
      if(this.MouseType & 4) rect.T+=rect.H-mh; 
      rect.H=mh;
    }
    // Check maximal width/height
    mw=(this.MaxWidth ? this.MaxWidth-pi.FrameHorzBorder : 0);
    mh=(this.MaxHeight ? this.MaxHeight-pi.FrameVertBorder : 0);
    if(mw<0) mw=1;
    if(mh<0) mh=1;
    if((mw)&&(rect.W>mw)) 
    {
      if(this.MouseType & 1) rect.L+=rect.W-mw;       
      rect.W=mw;
    }
    if((mh)&&(rect.H>mh)) 
    {
      if(this.MouseType & 4) rect.T+=rect.H-mh; 
      rect.H=mh;
    }
    
    if(this.OnMouseResizing) this.OnMouseResizing(this,rect);

    o.style.overflow='visible';
    o.style.overflowX='visible';
    o.style.overflowY='visible';
    var f=document.getElementById(this.ID+'_M');
    if(f) 
    {
      ng_setBounds(f,rect.L,rect.T,rect.W,rect.H);
      f.style.display="block";
    }
  }
  return true;
}

function ngw_DoPtrEnd(pi)
{
  if(this.MouseType<0) return;
  var o = this.Elm();
  if(o) 
  {
    var pi = this.PointerInfo;
    if(!pi) return;
    var dx = pi.X - pi.StartX;
    var dy = pi.Y - pi.StartY;

    o.style.overflow='visible';
    o.style.overflowX='visible';
    o.style.overflowY='visible';

    if(this.MouseType==0) // Move
    {
      if(((dx)||(dy))&&(!this.IsMaximized()))
      {
        var pos={ L: this.MouseBounds.L+dx, T: this.MouseBounds.T+dy };
        if(this.OnMouseMoving) this.OnMouseMoving(this,pos);
  
        this.Bounds.L=pos.L;
        this.Bounds.T=pos.T;
        if(this.StateBounds)
        {
          this.StateBounds.L=this.Bounds.L;
          this.StateBounds.T=this.Bounds.T;
        }
        this.CheckBounds();
        this.SetBounds();      
        pi.WinMove=true;
      }
      if((pi.WinMove)&&(this.OnMouseMove)) this.OnMouseMove(this);
    }
    else    
    {  
      var po=o.offsetParent;
      if((po)&&(po==document.body)) po=null;
      var pw=(po ? ng_ClientWidth(po) : ng_WindowWidth()); 
      var ph=(po ? ng_ClientHeight(po) : ng_WindowHeight());
      
      var rect=ng_CopyVar(this.Bounds); 
      if(this.MouseType & 1) // Left
      {
        if(rect.L+dx<0) dx=-rect.L;
        rect.L+=dx;
        rect.W-=dx;
      }
      if(this.MouseType & 2) // Right
      {
        if(rect.L+rect.W+dx>pw) dx=pw-rect.L-rect.W;
        rect.W+=dx;
      }
      if(this.MouseType & 4) // Top
      {
        if(rect.T+dy<0) dy=-rect.T;
        rect.T+=dy;
        rect.H-=dy;
      }
      if(this.MouseType & 8) // Bottom
      {
        if(rect.T+rect.H+dy>ph) dy=ph-rect.T-rect.H;
        rect.H+=dy;
      }
      if(rect.W<this.MinWidth) 
      {
        if(this.MouseType & 1) rect.L+=rect.W-this.MinWidth; 
        rect.W=this.MinWidth;
      }
      if(rect.H<this.MinHeight) 
      {
        if(this.MouseType & 4) rect.T+=rect.H-this.MinHeight; 
        rect.H=this.MinHeight;
      }
      if((this.MaxWidth>0)&&(rect.W>this.MaxWidth)) 
      {
        if(this.MouseType & 1) rect.L+=rect.W-this.MaxWidth;       
        rect.W=this.MaxWidth;
      }
      if((this.MaxHeight>0)&&(rect.H>this.MaxHeight)) 
      {
        if(this.MouseType & 4) rect.T+=rect.H-this.MaxHeight; 
        rect.H=this.MaxHeight;
      }  
      if(this.OnMouseResizing) this.OnMouseResizing(this,rect);

      var f=document.getElementById(this.ID+'_M');
      if(f) f.style.display="none";

      this.Bounds=ng_CopyVar(rect); 
      this.CheckBounds();
      this.SetBounds();
      this.Update();

      if(this.OnMouseResize) this.OnMouseResize(this);
    }
  }
  this.MouseType = -1;
}

function ngw_SetClientRect(v)
{
  if(!ngVal(v,false)) return false;

  var noimg = {L:0,T:0,aL:0,aT:0,oT:0,oL:0,W:0,H:0};
  var dp=new Object;
  var changed=false;
  
  if(typeof v.W !== 'undefined') 
  {
    dp.Left =(typeof this.Frame.Left === 'undefined' ? noimg : ngc_ImgProps(this.ID+'_L', 0, this.Enabled, this.Frame.Left));
    dp.Right =(typeof this.Frame.Right === 'undefined' ? noimg : ngc_ImgProps(this.ID+'_R', 0, this.Enabled, this.Frame.Right));
    var nw=v.W+dp.Left.W+dp.Right.W;
    if(ngVal(this.Bounds.W,-1)!=nw)
    {
      changed=true;
      this.Bounds.W=nw;
      this.Bounds.R=undefined;
    }
  }
  
  if(typeof v.H !== 'undefined')
  {
    dp.Bottom =(typeof this.Frame.Bottom === 'undefined' ? noimg : ngc_ImgProps(this.ID+'_B', 0, this.Enabled, this.Frame.Bottom));
    var bh=dp.Bottom.H;
    var th=0;
    
    var image=this.CaptionImg.LeftImg;
    if(image)
    {
      dp=ngc_ImgProps(this.ID+'_IL', 0, this.Enabled, image);
      if(dp.H>th) th=dp.H;
    }
  
    image=this.CaptionImg.RightImg;
    if(image)
    {
      dp=ngc_ImgProps(this.ID+'_IR', 0, this.Enabled, image);
      if(dp.H>th) th=dp.H;
    }
  
    image=this.CaptionImg.MiddleImg;
    if(image)
    {
      dp=ngc_ImgProps(this.ID+'_IM', 0, this.Enabled, image);
      if(dp.H>th) th=dp.H;
    }
    var nh=v.H+th+bh;
    if(ngVal(this.Bounds.H,-1)!=nh)
    {
      changed=true;
      this.Bounds.H=nh;
      this.Bounds.B=undefined;
    }
  }  
  if(changed) this.CheckBounds();
  return changed;  
}

function ngw_GetClientRect()
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

var ngw_inautosize=0;

function ngw_Update(recursive)
{
  if(this.AutoSize) {
    if(ngw_inautosize<(ngIExplorer6 ? 2 : 1))
    {
      ngw_inautosize++;
      try {
        this.CalcAutoSize();
      }
      finally
      {
        ngw_inautosize--;
      }
    }
  }
}

function ngw_DoUpdate(o)
{
  var frame=document.getElementById(this.ID+'_F');
  if(!frame) return true;

  var cclass=this.BaseClassName;
  var html=new ngStringBuilder;
  var w=ng_ClientWidth(o);
  var h=ng_ClientHeight(o);
  var l=0,t=0,dp;
  var maximized=this.IsMaximized();
  var minimized=this.IsMinimized();
  var moveable = (this.Moveable && (!maximized));
  var sizeable = (this.Sizeable && (!maximized)&&(!minimized));

  var text=this.GetText();
  if(this.HTMLEncode) text=ng_htmlEncode(text);
  
  var cstyle=(moveable ? 'cursor: move;' : '');
  var gestures='';
  if((this.OnClick)||(this.OnDblClick))
  {
    if(this.OnClick) gestures='tap'; 
    if(this.OnDblClick) 
    {
      if(gestures!='') gestures+=' ';
      gestures+='doubletap';
    } 
  }
  if(moveable)
  {
    if(gestures!='') gestures+=' ';
    gestures+='drag';
  }
  var cattrs=(gestures!='' ? ngc_PtrEventsHTML(this,'window',gestures) : '') 
  var th=0, lw=0, rw=0, bl=0, br=0, bw=0;

  var caphtml=new ngStringBuilder;
  var image=this.CaptionImg.LeftImg;
  if(image)
  {
    dp=ngc_ImgProps(this.ID+'_IL', 0, this.Enabled, image);
    ngc_Img(caphtml,dp,"position:absolute; left: 0px;"+cstyle,cattrs+ngVal(image.Attrs,''));
    lw=dp.W;
    if(dp.H>th) th=dp.H;
  }

  image=this.CaptionImg.RightImg;
  if(image)
  {
    dp=ngc_ImgProps(this.ID+'_IR', 0, this.Enabled, image);
    ngc_Img(caphtml,dp,"position:absolute; left: "+(w-dp.W)+"px;"+cstyle,cattrs+ngVal(image.Attrs,''));
    rw=dp.W;
    if(dp.H>th) th=dp.H;
  }

  image=this.CaptionImg.MiddleImg;
  if(image)
  {
    dp=ngc_ImgProps(this.ID+'_IM', 0, this.Enabled, image);
    ngc_ImgSW(caphtml,dp,lw,w-lw-rw,cstyle,cattrs+ngVal(image.Attrs,''));
    if(dp.H>th) th=dp.H;
  }  
  var attrs=new Object;
  var styles=new Object;
  if((moveable)&&(sizeable))
  {
    styles.Left = 'cursor: w-resize;';
     attrs.Left = ngc_PtrEventsHTML(this,'left','drag');
    styles.Top = 'cursor: n-resize;';
     attrs.Top = ngc_PtrEventsHTML(this,'top','drag');
    styles.LeftTop = 'cursor: nw-resize;';
     attrs.LeftTop = ngc_PtrEventsHTML(this,'lefttop','drag');
    styles.RightTop = 'cursor: ne-resize;';
     attrs.RightTop = ngc_PtrEventsHTML(this,'righttop','drag');
    styles.LeftBottom = 'cursor: sw-resize;';
     attrs.LeftBottom = ngc_PtrEventsHTML(this,'leftbottom','drag');
  }
  if(sizeable)
  {
    styles.Right = 'cursor: e-resize;';
     attrs.Right = ngc_PtrEventsHTML(this,'right','drag');
    styles.Bottom = 'cursor: s-resize;';
     attrs.Bottom = ngc_PtrEventsHTML(this,'bottom','drag');
    styles.RightBottom = 'cursor: se-resize;';
     attrs.RightBottom = ngc_PtrEventsHTML(this,'rightbottom','drag');
  }
  
  var framehtml=new ngStringBuilder;
  var fdp=new Object;
  ngc_ImgBox(framehtml, this.ID, 'ngWindow', 0, this.Enabled, 0,0,w,h,false, this.Frame, styles, attrs, undefined, fdp);

  bl=fdp.Left.W;
  if(fdp.LeftTop.W>bl) bl=fdp.LeftTop.W;
  if((this.Buttons)&&(this.Buttons.length>0))
  {    
    var b,bs,bt,img,a;

    br=fdp.Right.W;
    if(fdp.RightTop.W>br) br=fdp.RightTop.W;

    for(var i=0;i<this.Buttons.length;i++)
    {
      b=this.Buttons[i];
      b.Enabled=this.Enabled;
      if((b.BaseClassName=='')||(b.BaseClassName==b.CtrlType)) b.BaseClassName=cclass+'Button'; 
      if(!b.Visible) continue;
      if(b.ID=='') b.Attach(this.ID+'_B'+(i+1));
      bs=ngb_SimpleRect(b);
      bt=(th-bs.H)/2;
      a=ngVal(b.ButtonAlign,'');
      if(a=='left')
      {
        b.Bounds.L=bl;
        bl+=bs.W;
      }
      else 
      {
        b.Bounds.L=w-br-bw-bs.W;
        bw+=bs.W;
      }
      b.Bounds.T=bt;
      b.Bounds.W=bs.W;
      caphtml.append('<div id="'+b.ID+'" class="'+b.BaseClassName+'" style="position: absolute; z-index:1; left:'+b.Bounds.L+'px; top: '+b.Bounds.T+'px; width: '+bs.W+'px; height: '+bs.H+'px"></div>');
    }
  }
  image=this.GetImg();
  if(image)
  {
    dp=ngc_ImgProps(this.ID+'_I', 0, this.Enabled, image);
    ngc_Img(caphtml,dp,"position:absolute; z-index: 1; left: "+bl+"px;top:"+((th-dp.H)/2)+"px;"+cstyle,cattrs+ngVal(image.Attrs,''));
    bl+=dp.W;
  }

  if(text!='') caphtml.append('<div id="'+this.ID+'_C" class="'+cclass+(this.Enabled ? "Caption" : "CaptionDisabled")+'" style="position: absolute; overflow: hidden; text-overflow: ellipsis; left: '+bl+'px;top: 0px; width: '+(w-bl-br-bw)+'px;'+cstyle+'" '+cattrs+'>'+text+'</div>');
  html.append('<div style="position:absolute;left:0px;top:0px;width:'+w+'px;height:'+th+'px; overflow: hidden;">');
  html.append(caphtml);
  html.append('</div>');
  html.append(framehtml);
  
  this.ControlsPanel.Bounds.T=th;
  this.ControlsPanel.Bounds.L=fdp.Left.W;
  this.ControlsPanel.Bounds.R=fdp.Right.W;
  this.ControlsPanel.Bounds.B=fdp.Bottom.H;  
  this.ControlsPanel.SetBounds();
    
  ng_SetInnerHTML(frame,html.toString());
  o.style.overflow='hidden';
  o.style.overflowX='hidden';
  o.style.overflowY='hidden';
  if(this.BackgroundColor=='') this.BackgroundColor=document.body.style.backgroundColor;
  o.style.backgroundColor=this.BackgroundColor;
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

function ngw_KeyUp(e)
{
  if(!e) e=window.event;
  var w=ngGetControlById(this.id, 'ngWindow');
  if((w)&&(w.Enabled))
  {
    if(((e.keyCode==13)||(e.keyCode==27))&&(ngVal(w.IgnoreDefFormBtn,false))) { w.IgnoreDefFormBtn=undefined; return; }
    var ret=false;
    switch(e.keyCode)
    {
      case 13:
        ret=nge_DefFormButton2(w.ControlsPanel, 1);
        break;
      case 27:
        ret=nge_DefFormButton2(w.ControlsPanel, 0); 
        break;
    }
    if(ret)         
    {
      if(e.stopPropagation) e.stopPropagation();         
      else e.cancelBubble = true;
    }
  }
}

function ngw_DoAttach(o,oid)
{
  if(o)
  {
    if((!ngAndroid) // DIVs with enabled focus on Android 4.3 has tap highlight which cannot be disabled
     &&(o.getAttribute("tabindex")==null)) o.setAttribute("tabindex",0);
    o.onkeyup = ngw_KeyUp;
  }

  if((oid!=this.ID)&&(oid!='')) ng_EndAutoResize(oid);
  if((this.Moveable)||(this.Sizeable))
    ng_StartAutoResize(o,'win');
  else
    ng_EndAutoResize(o,'win');
}

function ngw_DoRelease(o)
{
  o.style.display='none';
  var frame=document.getElementById(this.ID+'_F');
  if(frame) ng_SetInnerHTML(frame,'');
}

function ngw_DoCreate(def, ref, elm, parent)
{
  var cclass=this.BaseClassName;

  if(((typeof def.W !== 'undefined')||(typeof def.CW !== 'undefined')||((typeof def.L !== 'undefined')&&(typeof def.R !== 'undefined')))
   &&((typeof def.H !== 'undefined')||(typeof def.CH !== 'undefined')||((typeof def.T !== 'undefined')&&(typeof def.B !== 'undefined')))
   &&((typeof def.Data === 'undefined')||(typeof def.Data.AutoSize === 'undefined')))
    this.AutoSize=false;

  if((typeof def.CW !== 'undefined')||(typeof def.CH !== 'undefined'))
  {
    if(this.SetClientRect({W: def.CW, H: def.CH}))
      this.SetBounds();
  }
  if(typeof def.Buttons === 'object')
  {
    var ldefs=new Object;
    var b;
    for(var i=0;i<def.Buttons.length;i++)
    {
      b=ng_CopyVar(def.Buttons[i]);
      ldefs['B'+i]=b;      
    }
    var lref=ngCreateControls(ldefs,undefined,null);
    if((typeof this.Buttons !== 'object')||(!this.Buttons)) this.Buttons=new Array();
    for(var i=0;i<def.Buttons.length;i++)
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
  def.ParentReferences = ngVal(def.ParentReferences,false);
  if(!def.ParentReferences) 
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

  if(typeof this.FormID === 'undefined') this.FormID = this.ID; // Windows are forms as default

  elm.style.zIndex=Math.round((ngModalCnt+0.5)*ngModalZIndexDelta);

  var nd=document.createElement('div');
  nd.id=this.ID+'_F';
  nd.style.position="absolute";
  nd.style.zIndex="800";
  elm.appendChild(nd);

  var nd2=document.createElement('div');
  nd2.id=this.ID+'_M';
  nd2.className=cclass+"Fence";
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

  //ng_AppendInnerHTML(elm,'<div id="'+this.ID+'_F" style="position: absolute;z-index:800;"></div>'
  //              +'<div id="'+this.ID+'_M" class="'+cclass+'Fence" style="display:none;position: absolute; z-index: 801; font-size:0px;line-height:0px;left:0px;top:0px;width:0px;height:0px;"></div>');
}

function ngw_OnDOMFocus(e)
{
  var lo=ngModalCnt*ngModalZIndexDelta;
  if(!lo) return;
  
  if (!e) e = window.event;
  var elm =  e.srcElement || e.target;
  if((!elm) || (elm == document) || (elm==window) || (elm.tagName == 'BODY')) return;

  var p=elm;
  var z,zi=0;
  while((p)&&(p!=window))
  {
    try
    {
      z=ng_GetCurrentStylePx(p,'z-index');
      if(z>zi) zi=z;
    }
    catch(e) { }
    p=p.parentNode;
  }
  if((lo)&&(zi<lo)) 
  { 
    try
    {
      elm.blur();
    }
    catch(e) { } 
  }
}

/*function ngw_Dispose()
{
  if((typeof this.Controls === 'object')&&(typeof this.Controls.Dispose === 'function')) this.Controls.Dispose();
  this.DefaultDispose();
}*/

var ngw_initialized = false;

/**
 *  Class: ngWindow
 *  This class implements a generic window control. 
 *
 *  Syntax:
 *    new *ngWindow* ([string id])
 *    
 *  Parameters:
 *    id - parent element
 *    
 *  See also:
 *    Abstract class <ngControl>.    
 */
function ngWindow(id)
{
  ngControl(this, id, 'ngWindow');
  this.DoCreate = ngw_DoCreate;
  this.OnVisibleChanged = ngw_OnVisibleChanged;
  this.DoResize = ngw_DoResize;
  this.DoAttach = ngw_DoAttach;
  this.DoRelease = ngw_DoRelease;
  this.DoUpdate = ngw_DoUpdate;
  this.DoPtrClick = ngw_DoPtrClick;
  this.DoPtrDblClick = ngw_DoPtrDblClick;
  this.DoPtrStart = ngw_DoPtrStart;
  this.DoPtrDrag = ngw_DoPtrDrag;
  this.DoPtrEnd = ngw_DoPtrEnd;
  
  this.AddEvent('Update',ngw_Update);

  this.SetBoundsEx = this.SetBounds;
  this.SetBounds = ngw_SetBounds;

  this.StateBounds = null;

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
   *  Variable: ParentReferences
   *  ...
   *  Type: bool
   *  Default value: *false*
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

  /*  Variable: BackgroundColor
   *  ...
   *  Type: string
   */
  this.BackgroundColor = '';
  /*  Variable: Sizeable
   *  ...
   *  Type: bool
   *  Default value: *true*   
   */
  this.Sizeable = true;
  /*  Variable: Moveable
   *  ...
   *  Type: bool
   *  Default value: *true*   
   */
  this.Moveable = true;
  /*  Variable: Modal
   *  ...
   *  Type: bool
   *  Default value: *false*   
   */
  this.Modal = false;  
  /*  Variable: DisposeOnClose
   *  ...
   *  Type: bool
   *  Default value: *false*   
   */
  this.DisposeOnClose = false;
  /*  Variable: AutoSize
   *  ...
   *  Type: bool
   *  Default value: *true*   
   */
  this.AutoSize = true;
  /*  Variable: Centered
   *  ...
   *  Type: bool
   *  Default value: *false*   
   */
  this.Centered = false;
  
  /*  Variable: MinimizedBounds
   *  ...
   *  Type: object
   *  Default value: *undefined*   
   */
  //this.MinimizedBounds=undefined;
  
  /*  Variable: MinWidth
   *  ...
   *  Type: int
   *  Default value: *100*   
   */
  this.MinWidth = 100;
  /*  Variable: MinHeight
   *  ...
   *  Type: int
   *  Default value: *100*   
   */
  this.MinHeight = 50;
  
  /*  Variable: MaxWidth
   *  ...
   *  Type: int
   *  Default value: *0*   
   */
  this.MaxWidth = 0;
  /*  Variable: MaxHeight
   *  ...
   *  Type: int
   *  Default value: *0*   
   */
  this.MaxHeight = 0;
  
  /*  Variable: Buttons
   *  ...
   *  Type: object
   */
  this.Buttons = null;
    
  /*  Variable: Img
   *  ...
   *  Type: object
   */
  this.Img = null;
  /*  Variable: Frame
   *  ...
   *  Type: object
   */
  this.Frame = new Object;
  /*  Variable: CaptionImg
   *  ...
   *  Type: object
   */
  this.CaptionImg = new Object;

  /*
   *  Group: Methods
   */
   
  /*  Function: Show
   *  Makes a window visible.   
   *   
   *  Syntax:
   *    void *Show* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.Show = ngw_Show;
  /*  Function: Hide
   *  Makes a window invisible.   
   *   
   *  Syntax:
   *    void *Hide* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.Hide = ngw_Hide;
  
  /*  Function: Close
   *  Closes the window.   
   *   
   *  Syntax:
   *    void *Close* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.Close = ngw_Close;
  
  /*  Function: Minimize
   *  Shrinks the window.   
   *   
   *  Syntax:
   *    void *Minimize* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.Minimize = ngw_Minimize;
  /*  Function: Maximize
   *  Expands the window to its maximal size.   
   *   
   *  Syntax:
   *    void *Maximize* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.Maximize = ngw_Maximize;
  /*  Function: Restore
   *  Restores a window to its normal size.   
   *   
   *  Syntax:
   *    void *Restore* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.Restore = ngw_Restore;
  /*  Function: Center
   *  Centers the window.   
   *   
   *  Syntax:
   *    void *Restore* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.Center = ngw_Center;
  
  /*  Function: CalcAutoSize
   *  Calculates automatic window dimensions.   
   *   
   *  Syntax:
   *    void *CalcAutoSize* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.CalcAutoSize = ngw_CalcAutoSize;
  
  /*  Function: GetClientRect
   *  Gets client rectangle dimensions.   
   *   
   *  Syntax:
   *    object *GetClientRect* ()
   *     
   *  Returns:
   *    Rectangle dimensions in format { W: width, H: height }.     
   */
  this.GetClientRect = ngw_GetClientRect;
  
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
  this.SetClientRect = ngw_SetClientRect;
  
  /*  Function: IsMaximized
   *  Determines if window is maximized.   
   *   
   *  Syntax:
   *    bool *IsMaximized* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.IsMaximized = ngw_IsMaximized;

  /*  Function: IsMinimized
   *  Determines if window is miminized.   
   *   
   *  Syntax:
   *    bool *IsMinimized* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.IsMinimized = ngw_IsMinimized;
  /*  Function: SetText
   *  Sets window caption.   
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
   *  Gets window caption.   
   *   
   *  Syntax:
   *    string *GetText* (void)
   *     
   *  Returns:
   *    Window caption.     
   */
  this.GetText=ngc_GetText;
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
  
//  this.DefaultDispose = this.Dispose;
//  this.Dispose = ngw_Dispose;

  this.CheckBounds = ngw_CheckBounds;
  this.MouseType=-1;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnGetText
   */     
  this.OnGetText = null;  
  /*
   *  Event: OnGetImg
   */     
  this.OnGetImg = null;
  /*
   *  Event: OnClick
   */     
  this.OnClick = null;
  /*
   *  Event: OnDblClick
   */     
  this.OnDblClick = null;
  
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
  /*
   *  Event: OnClose
   */     
  this.OnClose = null;
  /*
   *  Event: OnMouseMoving
   */     
  this.OnMouseMoving = null;
  /*
   *  Event: OnMouseMove
   */     
  this.OnMouseMove = null;
  /*
   *  Event: OnMouseResizing
   */     
  this.OnMouseResizing = null;
  /*
   *  Event: OnMouseResize
   */     
  this.OnMouseResize = null;
  
  if(!ngw_initialized)
  {
    if (window.addEventListener) 
    {
      window.addEventListener("focus",ngw_OnDOMFocus,true);    
    }
    else if(window.attachEvent)
    {
      window.attachEvent('onfocus', ngw_OnDOMFocus);
    }
    ngw_initialized = true;
  }
 
  ngControlCreated(this);
}

// --- ngHint ------------------------------------------------------------------

/**
 *  Function: ngCreateHint
 *  Creates hint by definition.
 *  
 *  Syntax:
 *    object *ngCreateHint* (object def, object parent)
 *    
 *  Returns:
 *    Created hint object (<ngHint>). 
 */
function ngCreateHint(def,parent)
{
  if(typeof def==='string') def={Type: def};
  ng_MergeDef(def, {
    Data: {
      DiscardOnHide: true,
      IsPopup: true
    }
  }); 
  return ngCreateWindow(def,parent);
}

/**
 *  Function: ngPopupHint
 *  Creates hint by definition.
 *  
 *  Syntax:
 *    object *ngPopupHint* (object def, int x, int y, string anchor, object parent)
 *    
 *  Returns:
 *    Created hint object (<ngHint>). 
 */
function ngPopupHint(def,x,y,anchor,parent)
{
  var h=ngCreateHint(def,parent);
  if(h) h.Popup(x,y,anchor);
  return h;
}

/**
 *  Function: ngPopupCtrlHint
 *  Creates hint by definition.
 *  
 *  Syntax:
 *    object *ngPopupCtrlHint* (object def, object ctrl, string anchor, object parent)
 *    
 *  Returns:
 *    Created hint object (<ngHint>). 
 */
function ngPopupCtrlHint(def,ctrl,anchor,parent)
{
  if(typeof ctrl.HintTimeout !== 'undefined') 
  {
    if(typeof def==='string') def={Type: def};
    ng_MergeDef(def, {
      Data: {
        AutoHideTimeout: ctrl.HintTimeout
      }
    });
  } 
  var h=ngCreateHint(def,parent);
  if(h) h.PopupCtrl(ctrl,anchor);
  return h;
}

function ngh_DoAttach(o)
{
  var handle=document.getElementById(this.ID+'_A');
  if(handle)
  {
    var t=this.CtrlType;
    handle.onmouseover = function(e) { ngc_Enter(e, this, t); }
    handle.onmouseout  = function(e) { ngc_Leave(e, this, t); }
  }
}

function ngh_BorderCollision(p, l, t, r, b)
{
  var area=0;
  var minx=p.MinX,maxx=p.MaxX;
  var miny=p.MinY,maxy=p.MaxY;
    
  if(minx<l)  { area+=(l-minx)*(maxy-miny); minx=l; }
  if(maxx>=r) { area+=(maxx-r)*(maxy-miny); maxx=r; }   
  if(miny<t)  area+=(t-miny)*(maxx-minx);
  if(maxy>=b) area+=(maxy-b)*(maxx-minx);
  
  if((p.AffectedArea<0)||(area>p.AffectedArea)) p.AffectedArea=area;        
  return area;  
}

function ngh_BoundRectCollision(p, l, t, r, b)
{
  var minx=p.MinX,maxx=p.MaxX;
  var miny=p.MinY,maxy=p.MaxY;
  
  if(minx<l) minx=l;
  if(maxx<l) maxx=l;
  if(miny<t) miny=t;
  if(maxy<t) maxy=t;

  if(minx>r) minx=r;
  if(maxx>r) maxx=r;
  if(miny>b) miny=b;
  if(maxy>b) maxy=b;

  var area=(maxx-minx)*(maxy-miny);  
  if((p.AffectedArea<0)||(area>p.AffectedArea)) p.AffectedArea=area;        
  return area;  
}

function ngh_FindAnchor(w,h,anchors,popupx,popupy,pw,ph)
{
  if(typeof popupx==='undefined') popupx=this.PopupX;
  if(typeof popupy==='undefined') popupy=this.PopupY;
  if(typeof popupx==='undefined') popupx=ngVal(this.Bounds.L,0);
  if(typeof popupy==='undefined') popupy=ngVal(this.Bounds.T,0);
  
  var dp,x,y;
  var o=this.Elm();
  if((!o)||(typeof popupx==='undefined')||(typeof popupy==='undefined'))
  {
    return { Anchor: '', AnchorObj: null, AffectedArea: -1 };
  }
  if((typeof w==='undefined')||(typeof h==='undefined'))
  {
    ng_BeginMeasureElement(o);
    if(typeof w==='undefined') w=ng_OuterWidth(o); 
    if(typeof h==='undefined') h=ng_OuterHeight(o);
    ng_EndMeasureElement(o);
  }
  
  // parent  
  if((typeof pw==='undefined')||(typeof ph==='undefined'))
  {
    var po=o.offsetParent;
    if((po)&&(po==document.body)) po=null;
    if(po)
    {
      ng_BeginMeasureElement(po);
      if(typeof pw==='undefined') pw=ng_ClientWidth(po); 
      if(typeof ph==='undefined') ph=ng_ClientHeight(po); 
      ng_EndMeasureElement(po);
    }
    else 
    {
      if(typeof pw==='undefined') pw=ng_WindowWidth();
      if(typeof ph==='undefined') ph=ng_WindowHeight();
    }
  }

  var anchor=null,anchorid='';
  if((typeof anchors !== 'object')||(!anchors))
  {
    if(this.PreferredAnchors)
    {
      var a;
      anchors=new Object;
      for(var i in this.PreferredAnchors)
      {
        a=this.Anchors[this.PreferredAnchors[i]];
        if((a)&&(typeof a==='object')) anchors[this.PreferredAnchors[i]]=a;
      }
      for(var i in this.Anchors)
      {
        a=this.Anchors[i];
        if((a)&&(typeof a==='object')&&(typeof anchors[i] === 'undefined')) anchors[i]=a;
      }
    }
    else anchors=this.Anchors;
  }

  var noimg={L:0,T:0,aL:0,aT:0,oT:0,oL:0,W:0,H:0};
  var p,minanchor=null,minanchorid='',minarea=-1;
  if((typeof anchors === 'object')&&(anchors))
    for(var i in anchors)
    {
      anchor=anchors[i];
      anchorid=i;
      if((!anchor)||(typeof anchor!=='object')) { anchor=null; anchorid=''; continue; }
      p={ 
        AffectedArea: -1,
        PopupX: popupx,
        PopupY: popupy,
        MinX: popupx, 
        MinY: popupy, 
        MaxX: popupx, 
        MaxY: popupy,
        W: w,
        H: h,
        ParentW: pw,
        ParentH: ph,
        Anchor: i,
        AnchorObj: anchor
      };
      dp=(ngVal(anchor.Img,null) ? ngc_ImgDrawProps(this.ID+'_AI', 'ngHint', this.ID, 0, this.Enabled, anchor.Img) : noimg);
      x=popupx;
      y=popupy;
      if(typeof anchor.L !== 'undefined') x-=anchor.L;
      if(typeof anchor.T !== 'undefined') y-=anchor.T;
      if(typeof anchor.R !== 'undefined') x-=w-dp.W-anchor.R;
      if(typeof anchor.B !== 'undefined') y-=h-dp.H-anchor.B;
      if(typeof anchor.HX !== 'undefined') x-=anchor.HX; 
      if(typeof anchor.HY !== 'undefined') y-=anchor.HY; 
      if(x<p.MinX) p.MinX=x;
      if(x>p.MaxX) p.MaxX=x;
      if(y<p.MinY) p.MinY=y;
      if(y>p.MaxY) p.MaxY=y;

      if(x+w<p.MinX) p.MinX=x+w;
      if(x+w>p.MaxX) p.MaxX=x+w;
      if(y+h<p.MinY) p.MinY=y+h;
      if(y+h>p.MaxY) p.MaxY=y+h;

      if(typeof anchor.L !== 'undefined') x+=anchor.L;
      if(typeof anchor.T !== 'undefined') y+=anchor.T;
      if(typeof anchor.R !== 'undefined') x+=w-dp.W-anchor.R;
      if(typeof anchor.B !== 'undefined') y+=h-dp.H-anchor.B;
      if(x<p.MinX) p.MinX=x;
      if(x>p.MaxX) p.MaxX=x;
      if(y<p.MinY) p.MinY=y;
      if(y>p.MaxY) p.MaxY=y;
      x+=dp.W;
      y+=dp.H;
      if(x<p.MinX) p.MinX=x;
      if(x>p.MaxX) p.MaxX=x;
      if(y<p.MinY) p.MinY=y;
      if(y>p.MaxY) p.MaxY=y;

      if(this.OnCheckPlacement) this.OnCheckPlacement(this,p);
      else this.BorderCollision(p,0,0,pw,ph); 
      
      if(!ngVal(p.AffectedArea,-1)) { minarea=0; break; }
      
      if((p.AffectedArea>0)&&((p.AffectedArea<minarea)||(minarea<0))) { minanchor=anchor; minanchorid=i; minarea=p.AffectedArea; }      
      anchor=null;
      anchorid='';       
    }
  if(!anchor) { anchor=minanchor; anchorid=minanchorid; } // take anchor with minimal overflow
  return { Anchor: anchorid, AnchorObj: anchor, AffectedArea: minarea };
}

function ngh_DoUpdate(o)
{
  var x,y,dp,anchor = null, anchorid='';

  if(typeof this.PopupX === 'undefined') this.PopupX=ngVal(this.Bounds.L,0);
  if(typeof this.PopupY === 'undefined') this.PopupY=ngVal(this.Bounds.T,0);
  
  delete this.PopupAnchor;
  
  ng_BeginMeasureElement(o);
  var w=ng_OuterWidth(o); 
  var h=ng_OuterHeight(o);
  ng_EndMeasureElement(o);
  
  if(this.Anchor == 'auto') // auto anchor detection
  {
    var ai=this.FindAnchor(w,h);
    anchor=ai.AnchorObj;
    anchorid=ai.Anchor;
  }  
  else
  {
    if((typeof this.Anchors === 'object')&&(this.Anchors))
    {
      anchor=ngVal(this.Anchors[this.Anchor],null);
      if(anchor) anchorid=this.Anchor;
    }
  }
  if((typeof anchor!=='object')||(!anchor)) // take first
  {
    if((typeof this.Anchors === 'object')&&(this.Anchors))
    {
      if(this.PreferredAnchors)
      {
        var a;
        for(var i in this.PreferredAnchors)
        {
          a=this.Anchors[this.PreferredAnchors[i]];
          if((a)&&(typeof a==='object')) { anchor=a; anchorid=this.PreferredAnchors[i]; break; }
        }
      }
      if(!anchor)
        for(var i in this.Anchors)
        {
          anchor=this.Anchors[i];
          anchorid=i;
          if((anchor)&&(typeof anchor==='object')) break;
        }
    }
  }
  var handle=document.getElementById(this.ID+'_A');
  if(handle)
  {
    if((typeof anchor!=='object')||(!anchor)) 
    {
      handle.style.visibility='hidden';
      x=this.PopupX;
      y=this.PopupY;
      ng_setLeftTop(o,x,y);
      this.Bounds.L=x;
      this.Bounds.T=y;
    }
    else
    {
      var noimg={L:0,T:0,aL:0,aT:0,oT:0,oL:0,W:0,H:0};
      
      this.PopupAnchor=anchorid;
      var image=new ngStringBuilder;
      dp=(ngVal(anchor.Img,null) ? ngc_ImgDrawProps(this.ID+'_AI', 'ngHint', this.ID, 0, this.Enabled, anchor.Img) : noimg)
      if((!dp.W)&&(!dp.H)) handle.style.visibility='hidden';
      else
      {
        ngc_Img(image,dp,"position:absolute;",ngVal(anchor.Img.Attrs,''));
    
        ng_SetClientWidth(handle,dp.W)
        ng_SetClientHeight(handle,dp.H)
        ng_SetInnerHTML(handle,image.toString());
        handle.style.visibility='visible';
      }
      
      if(ngIExplorer)
      { 
        if(typeof anchor.L !== 'undefined') handle.style.pixelLeft=anchor.L; 
        if(typeof anchor.T !== 'undefined') handle.style.pixelTop=anchor.T; 
        if(typeof anchor.R !== 'undefined') handle.style.pixelLeft=w-dp.W-anchor.R;
        if(typeof anchor.B !== 'undefined') handle.style.pixelTop=h-dp.H-anchor.B;
      }
      else
      {
        if(typeof anchor.L !== 'undefined') { handle.style.left=anchor.L+'px'; handle.style.right=''; }
        if(typeof anchor.T !== 'undefined') { handle.style.top=anchor.T+'px'; handle.style.bottom=''; }
        if(typeof anchor.R !== 'undefined') { handle.style.right=anchor.R+'px'; handle.style.left=''; }
        if(typeof anchor.B !== 'undefined') { handle.style.bottom=anchor.B+'px'; handle.style.top=''; }
      }
      
      x=this.PopupX;
      y=this.PopupY;
      if(typeof anchor.L !== 'undefined') x-=anchor.L;
      if(typeof anchor.T !== 'undefined') y-=anchor.T;
      if(typeof anchor.R !== 'undefined') x-=w-dp.W-anchor.R;
      if(typeof anchor.B !== 'undefined') y-=h-dp.H-anchor.B;
      if(typeof anchor.HX !== 'undefined') x-=anchor.HX; 
      if(typeof anchor.HY !== 'undefined') y-=anchor.HY; 
      ng_setLeftTop(o,x,y);
      this.Bounds.L=x;
      this.Bounds.T=y;
    }
  }

  var frame=document.getElementById(this.ID+'_F');
  if(!frame) return true;

  var html=new ngStringBuilder;
  var w=ng_ClientWidth(o);
  var h=ng_ClientHeight(o);  
  var l=0,t=0;

  var dp=new Object;
  ngc_ImgBox(html, this.ID, 'ngHint', 0, this.Enabled, 0,0,w,h,false, this.Frame, '', '', undefined, dp);

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
  
  ng_SetInnerHTML(frame,html.toString());
  return true;
}

function ngh_SetClientRect(v)
{
  if(!ngVal(v,false)) return false;

  var noimg = {L:0,T:0,aL:0,aT:0,oT:0,oL:0,W:0,H:0};
  var dp=new Object;
  var changed=false;
  
  if(typeof v.W !== 'undefined') 
  {
    dp.Left =((!this.ControlsInside) || typeof this.Frame.Left === 'undefined' ? noimg : ngc_ImgDrawProps(this.ID+'_L', 'ngHint', this.ID, 0, this.Enabled, this.Frame.Left));
    dp.Right =((!this.ControlsInside) || typeof this.Frame.Right === 'undefined' ? noimg : ngc_ImgDrawProps(this.ID+'_R', 'ngHint', this.ID, 0, this.Enabled, this.Frame.Right))
    var nw=v.W+dp.Left.W+dp.Right.W;
    if(ngVal(this.Bounds.W,-1)!=nw)
    {
      changed=true;
      this.Bounds.W=nw;
      this.Bounds.R=undefined;
    }

    if(this.Bounds.W<this.MinWidth) { changed=true; this.Bounds.W=this.MinWidth; }
    if((this.MaxWidth>0)&&(this.Bounds.W>this.MaxWidth)) { changed=true; this.Bounds.W=this.MaxWidth; }
  }
  
  if(typeof v.H !== 'undefined')
  {
    dp.Top =((!this.ControlsInside) || typeof this.Frame.Top === 'undefined' ? noimg : ngc_ImgDrawProps(this.ID+'_B', 'ngHint', this.ID, 0, this.Enabled, this.Frame.Top));
    dp.Bottom =((!this.ControlsInside) || typeof this.Frame.Bottom === 'undefined' ? noimg : ngc_ImgDrawProps(this.ID+'_B', 'ngHint', this.ID, 0, this.Enabled, this.Frame.Bottom));

    var nh=v.H+dp.Top.H+dp.Bottom.H;
    if(ngVal(this.Bounds.H,-1)!=nh)
    {
      changed=true;
      this.Bounds.H=nh;
      this.Bounds.B=undefined;
      if(this.Bounds.H<this.MinHeight) { changed=true; this.Bounds.H=this.MinHeight; }
      if((this.MaxHeight>0)&&(this.Bounds.H>this.MaxHeight)) { changed=true; this.Bounds.H=this.MaxHeight; }
    }
  }  
  return changed;
}

function ngh_GetClientRect()
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

function ngh_DoRelease(o)
{
  o.style.display='none';
  var frame=document.getElementById(this.ID+'_F');
  if(frame) ng_SetInnerHTML(frame,'');
}

function ngh_DoCreate(def, ref, elm, parent)
{
  var cclass=this.BaseClassName;

  if(((typeof def.W !== 'undefined')||(typeof def.CW !== 'undefined')||((typeof def.L !== 'undefined')&&(typeof def.R !== 'undefined')))
   &&((typeof def.H !== 'undefined')||(typeof def.CH !== 'undefined')||((typeof def.T !== 'undefined')&&(typeof def.B !== 'undefined')))
   &&((typeof def.Data === 'undefined')||(typeof def.Data.AutoSize === 'undefined')))
    this.AutoSize=false;

  if((typeof def.CW !== 'undefined')||(typeof def.CH !== 'undefined'))
  {
    if(this.SetClientRect({W: def.CW, H: def.CH}))
      this.SetBounds();
  }

  var ldefs=new Object;
  if(typeof def.ControlsPanel === 'object') ldefs.ControlsPanel = ng_CopyVar(def.ControlsPanel);
  else ldefs.ControlsPanel = new Object;
    
  ng_MergeDef(ldefs.ControlsPanel, {
    Type: 'ngPanel',
    id: this.ID+'_P',
    className: cclass+'ControlsPanel',
    ScrollBars: ssAuto,
    L: 0, T: 0, R: 0, B: 0
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

  elm.style.zIndex=Math.round((ngModalCnt+0.6)*ngModalZIndexDelta);

  this.SetScrollBars(ssDefault);

  var nd=document.createElement('div');
  nd.id=this.ID+'_F';
  nd.style.position="absolute";
  nd.style.zIndex="800";
  elm.appendChild(nd);

  var nd2=document.createElement('div');
  nd2.id=this.ID+'_A';
  nd2.style.position="absolute";
  nd2.style.zIndex="801";
  elm.appendChild(nd2);

  //ng_AppendInnerHTML(elm,'<div id="'+this.ID+'_F" style="position: absolute;z-index:800;"></div><div id="'+this.ID+'_A" style="position: absolute;z-index:801;"></div>');
}

function ngh_DoPopup(x,y,anchor)
{
  this.SetVisible(false);
  this.PopupX = x;
  this.PopupY = y;
  delete this.PopupElm;
  if(typeof anchor!=='undefined') this.Anchor=anchor;
  this.SetVisible(true);
}

function ngh_Popup(x,y,anchor)
{
  var info = {
    PopupX: x,
    PopupY: y,
    Anchor: anchor
  };
  if((this.OnPopup)&&(!ngVal(this.OnPopup(this,info),false))) return;
  this.DoPopup(info.PopupX,info.PopupY,info.Anchor);
}

function ngh_PopupCtrl(c,anchor)
{
  var o=null;
  // detect if it is control or just element
  if(typeof c === 'string') 
  {
    var nc=ngGetControlById(c);
    if(!nc) c=document.getElementById(c);
    else c=nc;
  }
  if(typeof c.Elm === 'function') o=c.Elm();
  else { o=c; c=null; }
   
  if(!o) return;
  
  var p=this.Elm();
  if(p) p=p.parentNode;
  else p=ngApp.Elm();

  var pos=ng_ParentPosition(o, p);
  var x=(c ? c.HintX : undefined);
  if(typeof x==='undefined') x=Math.floor(ng_OuterWidth(o)/3);
  var y=(c ? c.HintY : undefined);
  if(typeof y==='undefined') y=Math.floor(ng_OuterHeight(o)/2);

  var info = {
    PopupX: pos.x+x,
    PopupY: pos.y+y,
    PopupElm: o,
    Anchor: anchor
  };
  if((this.OnPopup)&&(!ngVal(this.OnPopup(this,info),false))) return;
  this.DoPopup(info.PopupX,info.PopupY,info.Anchor);
  this.PopupElm = info.PopupElm; 
}

function ngh_SetVisible(v)
{
  v=ngVal(v,true);
  if(this.Visible==v) return;
  if(this.HintAutoHideTimer) clearTimeout(this.HintAutoHideTimer); this.HintAutoHideTimer=null;
  if(!v) 
  {
    delete this.PopupX;
    delete this.PopupY;
    delete this.PopupElm;
    delete this.PopupAnchor; 
    if(this.DisposeOnHide) 
    {
      var self=this;
      var dispose_timer=setTimeout(function() {
        clearTimeout(dispose_timer);
        var owner=self.Owner;
        self.Dispose();
        if((owner)&&(typeof owner === 'object')) // remove reference
        {
          for(var i in owner)
          {
            if(owner[i]==self) 
            {
              delete owner[i];
              break;
            }
          }
        }
      },1);
    }
  }
  else
  {
    var ht=ngVal(this.AutoHideTimeout,0);
    if(ht>0) this.HintAutoHideTimer = setTimeout("ngh_HintAutoHideTimer('"+this.ID+"')",ht);
  }
}

function ngh_HintAutoHideTimer(id)
{
  var c=ngGetControlById(id,'ngHint');
  if(c) c.SetVisible(false);
}

/**
 *  Class: ngHint
 *  This class implements a generic hint control. 
 *
 *  Syntax:
 *    new *ngHint* ([string id])
 *    
 *  Parameters:
 *    id - parent element
 *    
 *  See also:
 *    Abstract class <ngControl>.    
 */
function ngHint(id)
{
  ngControl(this, id, 'ngHint');

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
  /*  Variable: AutoSize
   *  ...
   *  Type: bool
   *  Default value: *true*   
   */
  this.AutoSize = true;
  /*  Variable: MinWidth
   *  ...
   *  Type: int
   *  Default value: *0*   
   */
  this.MinWidth = 0;
  /*  Variable: MinHeight
   *  ...
   *  Type: int
   *  Default value: *0*   
   */
  this.MinHeight = 0;
  
  /*  Variable: MaxWidth
   *  ...
   *  Type: int
   *  Default value: *0*   
   */
  this.MaxWidth = 0;
  /*  Variable: MaxHeight
   *  ...
   *  Type: int
   *  Default value: *0*   
   */
  this.MaxHeight = 0;
  /*  Variable: Anchor
   *  ...
   *  Type: string
   *  Default value: *'auto'*   
   */
  this.Anchor = 'auto';

  /*  Variable: Anchors
   *  ...
   *  Type: object
   */
  this.Anchors = null;

  /*  Variable: PreferredAnchors
   *  ...
   *  Type: array
   */
  this.PreferredAnchors = null;
    
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

  /*  Variable: AutoHideTimeout
   *  Defines the timeout in milliseconds when hint automatically hides itself (0=disabled).
   *  Type: integer
   *  Default value: *0*         
   */
  //c.AutoHideTimeout = 0;
  /*  Variable: DisposeOnHide
   *  ...
   *  Type: bool
   *  Default value: *false*   
   */
  this.DisposeOnHide = false;

  /*  Variable: PopupX
   *  Horizontal popup position in pixels.
   *  Type: integer
   *  Default value: *undefined*         
   */
  //this.PopupX = undefined;
  /*  Variable: PopupY
   *  Vertical popup position in pixels.
   *  Type: integer
   *  Default value: *undefined*         
   */
  //this.PopupY = undefined;
  /*  Variable: PopupElm
   *  Element to which hint was aligned during popup. 
   *  Type: integer
   *  Default value: *undefined*         
   */
  //this.PopupElm = undefined;

  this.DoCreate = ngh_DoCreate;
  this.DoRelease = ngh_DoRelease;
  this.DoUpdate = ngh_DoUpdate;
  this.FindAnchor = ngh_FindAnchor;
  this.AddEvent('Update',ngw_Update);

  /*
   *  Group: Methods
   */
  /*  Function: Popup
   *  Popups hint at specified position.
   *   
   *  Syntax:
   *    void *Popup* (integer x, integer y [, string anchor])
   *     
   *  Returns:
   *    -     
   */
  this.Popup = ngh_Popup;

  /*  Function: PopupCtrl
   *  Popups hint along specified control.
   *   
   *  Syntax:
   *    void *PopupCtrl* (object ctrl [, string anchor])
   *     
   *  Returns:
   *    -     
   */
  this.PopupCtrl = ngh_PopupCtrl;
     
  /*  Function: GetClientRect
   *  Gets client rectangle dimensions.   
   *   
   *  Syntax:
   *    object *GetClientRect* ()
   *     
   *  Returns:
   *    Rectangle dimensions in format { W: width, H: height }.     
   */
  this.GetClientRect = ngh_GetClientRect;
  
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
  this.SetClientRect = ngh_SetClientRect;
  /*  Function: CalcAutoSize
   *  Calculates automatic window dimensions.   
   *   
   *  Syntax:
   *    void *CalcAutoSize* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.CalcAutoSize = ngw_CalcAutoSize;

  /*  Function: BorderCollision
   *  Calculates the border overflow of popup.     
   *  Helper function for placement calculation. 
   *   
   *  Syntax:
   *    int *BorderCollision* (object placement, int left, int top, int right, int bottom)
   *     
   *  Parameters:
   *    
   *  Returns:
   *    Affected area.     
   */
  this.BorderCollision = ngh_BorderCollision;

  /*  Function: BoundRectCollision
   *  Calculates the collision of popup and given boundary rectangle.     
   *  Helper function for placement calculation. 
   *   
   *  Syntax:
   *    int *BoundRectCollision* (object placement, int left, int top, int right, int bottom)
   *     
   *  Parameters:
   *    
   *  Returns:
   *    Affected area.     
   */
  this.BoundRectCollision = ngh_BoundRectCollision;
  
  /*
   *  Group: Events
   */   
  /*
   *  Event: OnCheckPlacement
   */     
  this.OnCheckPlacement = null;
  
  /*
   *  Event: OnPopup
   */     
  this.OnPopup = null;

  this.AddEvent(ngh_SetVisible,'SetVisible');

  this.DoPopup = ngh_DoPopup;

  this.AddEvent('DoAttach',ngh_DoAttach);
  
  this.Visible=false;
 
  ngControlCreated(this);
}


/**
 *  Function: ngCreateTextHint
 *  Creates hint by definition.
 *  
 *  Syntax:
 *    object *ngCreateTextHint* (object def, string text, object parent)
 *    
 *  Returns:
 *    Created hint object (<ngHint>). 
 */
function ngCreateTextHint(def,text,parent)
{
  if(typeof def==='string') def={Type: def};
  ng_MergeDef(def, {
    Data: {
      Text: text
    }
  }); 
  return ngCreateHint(def,parent);
}

/**
 *  Function: ngPopupTextHint
 *  Creates hint by definition.
 *  
 *  Syntax:
 *    object *ngPopupTextHint* (object def, int x, int y, string text, string anchor, object parent)
 *    
 *  Returns:
 *    Created hint object (<ngHint>). 
 */
function ngPopupTextHint(def,x,y,text,anchor,parent)
{
  var h=ngCreateTextHint(def,text,parent);
  if(h) h.Popup(x,y,anchor);
  return h;
}

/**
 *  Function: ngPopupCtrlTextHint
 *  Creates hint by definition.
 *  
 *  Syntax:
 *    object *ngPopupCtrlTextHint* (object def, object ctrl, string text, string anchor, object parent)
 *    
 *  Returns:
 *    Created hint object (<ngHint>). 
 */
function ngPopupCtrlTextHint(def,ctrl,text,anchor,parent)
{
  if(typeof text === 'undefined')
  {
    if(typeof ctrl.GetHint === 'function') text=ctrl.GetHint();
    else text=ngVal(ctrl.Hint,'');
  }
  if(typeof ctrl.HintTimeout !== 'undefined') 
  {
    if(typeof def==='string') def={Type: def};
    ng_MergeDef(def, {
      Data: {
        AutoHideTimeout: ctrl.HintTimeout
      }
    });
  } 
  var h=ngCreateTextHint(def,text,parent);
  if(h) h.PopupCtrl(ctrl,anchor);
  return h;
}

/*  Class: ngTextHint
 *  Simple hint text component (based on <ngHint>).
 */
function nghtxt_SetText(text)
{
  if(this.OnSetText) text=this.OnSetText(text,this);
  if((!this.Controls)||(!this.Controls.Hint)) return;
  if(text!=this.Text)
  {
    this.Text=text;
    this.Controls.Hint.SetText(text);
    if(this.AutoSize) this.Update();
  }
}

function nghtxt_OnGetText(text)
{
  var h=this.Owner.Owner;
  return (h ? h.GetText() : '')
}

function nghtxt_DoPtrClick(pi)
{
  if(pi.EventID==='control')
  {
    if(this.OnClick) 
    {
      var e=pi.Event;
      e.Owner=this;
      this.OnClick(e);
      pi.PreventDefault=true;    
    }
  }
}

function nghtxt_HintDoPtrClick(pi)
{
  if(pi.EventID==='control')
  {
    var p=this.ParentControl;
    while(p)
    {
      if(p.CtrlType==='ngHint') 
      {
        p.DoPtrClick(pi); // propagate click from text to hint
        break;
      }
      p=p.ParentControl;
    }
  }
}
          
function nghtxt_DoMeasureText(o,to)
{
  var w,h,to=null;
  if(!o) o=this.Elm();
  if(!to) 
  {
    var c=this.Controls.Hint;
    if(c) to=c.Elm();
  }
  
  if(this.AutoSize)
  {
    var noimg = {L:0,T:0,aL:0,aT:0,oT:0,oL:0,W:0,H:0};
    var dp=new Object;

    dp.Left =((!this.ControlsInside) || typeof this.Frame.Left === 'undefined' ? noimg : ngc_ImgDrawProps(this.ID+'_L', 'ngHint', this.ID, 0, this.Enabled, this.Frame.Left));
    dp.Right =((!this.ControlsInside) || typeof this.Frame.Right === 'undefined' ? noimg : ngc_ImgDrawProps(this.ID+'_R', 'ngHint', this.ID, 0, this.Enabled, this.Frame.Right))
    dp.Top =((!this.ControlsInside) || typeof this.Frame.Top === 'undefined' ? noimg : ngc_ImgDrawProps(this.ID+'_B', 'ngHint', this.ID, 0, this.Enabled, this.Frame.Top));
    dp.Bottom =((!this.ControlsInside) || typeof this.Frame.Bottom === 'undefined' ? noimg : ngc_ImgDrawProps(this.ID+'_B', 'ngHint', this.ID, 0, this.Enabled, this.Frame.Bottom));

    if((to)&&((typeof c.Bounds.R === 'undefined')||(typeof c.Bounds.L === 'undefined')))
    {
      w=ng_OuterWidth(to)+dp.Left.W+dp.Right.W; 
      if(typeof c.Bounds.R === 'undefined') w+=2*c.Bounds.L;
      else w+=2*c.Bounds.R;
    }
    
    if((to)&&((typeof c.Bounds.T === 'undefined')||(typeof c.Bounds.B === 'undefined')))
    {
      h=ng_OuterHeight(to)+dp.Top.H+dp.Bottom.H;
      if(typeof c.Bounds.B === 'undefined') h+=2*c.Bounds.T;
      else h+=2*c.Bounds.B;
    }
  }
  if(typeof w==='undefined') w=ng_OuterWidth(o);
  if(typeof h==='undefined') h=ng_OuterHeight(o);

  return { W: w, H: h};
}

function nghtxt_DoHintUpdate(o)
{
  var anchor=this.Anchor;
  var ret;
  try
  {
    var c=this.Controls.Hint;
    if((c)&&(this.AutoSize)&&(c.AutoSize)) // Calculate text size only if ngHint and ngText has AutoSize 
    {
      if(ngw_inautosize>0)
      {
        this.Anchor=ngVal(this.PopupAnchor,anchor); // Keep "hardly selected" anchor for autosize
      }    
      else
      { 
        var found='';
        var po=o.offsetParent;
        if((po)&&(po==document.body)) po=null;
        var pw=(po ? ng_ClientWidth(po) : ng_WindowWidth()); 
        var ph=(po ? ng_ClientHeight(po) : ng_WindowHeight());     
          
        var to=c.Elm();
        ng_setLeftTop(o,-10000,-10000); // hide
        ng_BeginMeasureElement(to);
        try
        {
          var anchors,p_anchors;
          if(anchor!=='auto')
          {
            p_anchors=new Object;
            anchors=new Object;
            if((typeof this.Anchors === 'object')&&(this.Anchors))
            {
              p_anchors[this.Anchor]=this.Anchors[this.Anchor];
            }
          }
          else
          {
            if(this.PreferredAnchors)
            {
              var a;
              anchors=new Object;
              p_anchors=new Object;
              for(var i in this.PreferredAnchors)
              {
                a=this.Anchors[this.PreferredAnchors[i]];
                if((a)&&(typeof a==='object')) p_anchors[this.PreferredAnchors[i]]=a;
              }
              for(var i in this.Anchors)
              {
                a=this.Anchors[i];
                if((a)&&(typeof a==='object')&&(typeof p_anchors[i] === 'undefined')) anchors[i]=a;
              }
            }
            else anchors=this.Anchors;
          }
  
          // Draw non-wrapped
          c.AutoSizeMode='auto';
          c.Update();
  
          var nwsz=this.DoMeasureText(o,to);
          if(nwsz.W<this.MinWidth) nwsz.W=this.MinWidth;
          if((this.MaxWidth<=0)||(nwsz.W<this.MaxWidth))
          {
            if(typeof p_anchors !== 'undefined')
            {
              // Test preffered non-wraped         
              var ai=this.FindAnchor(nwsz.W,nwsz.H,p_anchors);
              if((!ai.AffectedArea)&&(ai.AnchorObj)) found=ai.Anchor; // no collision, use found
            }
            else
            {
              // Test non-wraped         
              var ai=this.FindAnchor(nwsz.W,nwsz.H,anchors);
              if((!ai.AffectedArea)&&(ai.AnchorObj)) found=ai.Anchor; // no collision, use found
            }
          }
          if(found==='')
          {
            var minarea=-1,minwidth;
            var minfound='';
            var popupx=this.PopupX;
            if(typeof popupx==='undefined') popupx=ngVal(this.Bounds.L,0);
            
            var noimg = {L:0,T:0,aL:0,aT:0,oT:0,oL:0,W:0,H:0};
            var dp=new Object;
  
            // calculate frame width
            var fw=((!this.ControlsInside) || typeof this.Frame.Left === 'undefined' ? 0 : this.Frame.Left.W);
            fw+=((!this.ControlsInside) || typeof this.Frame.Right === 'undefined' ? 0 : this.Frame.Right.W);
        
            if((to)&&((typeof c.Bounds.R === 'undefined')||(typeof c.Bounds.L === 'undefined')))
            {
              if(typeof c.Bounds.R === 'undefined') fw+=2*c.Bounds.L;
              else fw+=2*c.Bounds.R;
            }
  
            var self=this;
            function check_anchors(anchors)
            {
              var sz,ai,tw,an,a,x;
              for(var i in anchors)
              {
                a=anchors[i];
                if((!a)||(typeof a!=='object')) continue;
                
                x=popupx;
                tw=0;
                if(typeof a.L !== 'undefined') 
                {
                  x-=a.L;
                  if(typeof a.HX !== 'undefined') x-=a.HX;
                  tw=pw-x;
                }               
                else if(typeof a.R !== 'undefined') 
                {
                  tw=x+a.R;
                  if(a.Img) tw+=a.Img.W;
                  if(typeof a.HX !== 'undefined') tw-=a.HX;
                }
  
                if(tw<self.MinWidth) tw=self.MinWidth;
                if((self.MaxWidth>0)&&(tw>self.MaxWidth)) tw=self.MaxWidth;
                tw-=fw;
                if((typeof c.MinWidth !== 'undefined')&&(tw<c.MinWidth)) tw=c.MinWidth;
                if(tw<=0) continue;
                
                c.AutoSizeMode='vertical'; // try wrap-ups
                ng_SetClientWidth(to,tw);
                c.Update();
                sz=self.DoMeasureText(o,to);
                an=new Object;
                an[i]=a;
                ai=self.FindAnchor(sz.W,sz.H,an);
                if((!ai.AffectedArea)&&(ai.AnchorObj)) 
                {
                  found=ai.Anchor;
                  minarea=0;
                  minwidth=tw;
                  break;
                }
                else
                {
                  if((ai.AffectedArea>0)&&((ai.AffectedArea<minarea)||(minarea<0))) { minfound=ai.Anchor; minarea=ai.AffectedArea; minwidth=tw; }      
                }
              }
            }
                      
            if(typeof p_anchors !== 'undefined') check_anchors(p_anchors);
            if(found==='') 
            {
              check_anchors(anchors);
              if(typeof p_anchors !== 'undefined')
              {
                // Test anchors non-wraped         
                var ai=this.FindAnchor(nwsz.W,nwsz.H,anchors);
                if((!ai.AffectedArea)&&(ai.AnchorObj)) 
                {
                  // Change back to non-wrapped
                  c.AutoSizeMode='auto';
                  c.Update();
                  found=ai.Anchor; minarea=0; // no collision, use found
                }
                else
                {
                  if((ai.AffectedArea>0)&&((ai.AffectedArea<minarea)||(minarea<0)))  
                  { 
                    // Change back to non-wrapped
                    c.AutoSizeMode='auto';
                    c.Update();
                    found=ai.Anchor; minarea=ai.AffectedArea; 
                  }      
                }
              }
            }
            if((found==='')&&(minfound!='')) 
            {
              ng_SetClientWidth(to,minwidth);
              c.Update();
              found=minfound;
            }
          }
          if(found!=='') this.Anchor=found;
          else {
            if(c.AutoSizeMode!=='auto') {
              c.AutoSizeMode='auto';
              c.Update();
            }
          }
        }
        finally
        {
          ng_EndMeasureElement(to);
        }
      }
    }
    ret=this.__DefaultDoUpdate(o);
  }
  finally
  {
    if(typeof anchor!=='undefined') this.Anchor=anchor;
    else delete this.Anchor;
  }
  return ret;
}

function Create_ngTextHint(def, ref, parent)
{
  ng_MergeDef(def, {
    /*
     *  Group: Definition
     */
    /*  Variable: ParentReferences
     *  ...
     *  Type: bool
     *  Default value: *false*         
     */
    ParentReferences: false,
    Data: {
      /*
       *  Group: Methods
       */
      /*  Function: SetText
       *  Sets hint text.
       *   
       *  Syntax:
       *    void *SetText* (string text)
       *     
       *  Returns:
       *    -     
       */   
      SetText: nghtxt_SetText,
      /*  Function: GetText
       *  Gets hint text.
       *   
       *  Syntax:
       *    string *GetText* ()
       *     
       *  Returns:
       *    Hint text.     
       */   
      GetText: ngc_GetText,
      /*
       *  Group: Events
       */
      /*
       *  Event: OnClick
       */     
      OnClick: null,
      /*  Event: OnSetText
       */
      OnSetText: null,      
      /*  Event: OnGetText
       */
      OnGetText: null
    },
    ControlsPanel: {
      Data: {
        Gestures: {
          tap: true
        }
      }
    },
    /*
     *  Group: Controls
     */
    Controls: {
      /*  Object: Hint
       *  <ngText>       
       */
      Hint: {
        Type: 'ngText',
        Events: {
          OnGetText: nghtxt_OnGetText
        }
      }
    }
  });
  // Add tap gesture to child controls 
  function regdeftap(d)
  {
    if(!d) return;
    if(typeof d.Data === 'undefined') d.Data={};
    if(typeof d.Data.Gestures === 'undefined') d.Data.Gestures={};
    d.Data.Gestures.tap=true;
    if(typeof d.Controls !== 'undefined') {
      for(var i in d.Controls)
        regdeftap(d.Controls[i]);
    }
  }  
  regdeftap(def);
  
  def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
    // Add tap handling to child controls
    function regtap(ctrl)
    {
      var cc=ctrl.ChildControls;
      if(typeof cc !== 'undefined')
        for(var i=cc.length-1;i>=0;i--) 
        {
          cc[i].AddEvent('DoPtrClick',nghtxt_HintDoPtrClick);
          regtap(cc[i]);
        }
    }    
    regtap(c);    
  });
  var c=ngCreateControlAsType(def, 'ngHint', ref, parent);
  if(c) {
    c.__DefaultDoUpdate = c.DoUpdate;
    c.DoUpdate = nghtxt_DoHintUpdate;
    c.DoPtrClick = nghtxt_DoPtrClick;
    c.DoMeasureText = nghtxt_DoMeasureText;
  }
  return c;
}

// --- Controls Registration ---------------------------------------------------

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['window'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    ngRegisterControlType('ngWindow', function() { return new ngWindow; });
    ngRegisterControlType('ngHint', function() { return new ngHint; });
    ngRegisterControlType('ngTextHint', Create_ngTextHint);
  }
};
