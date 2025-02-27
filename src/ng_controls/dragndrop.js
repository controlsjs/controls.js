/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2025 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */
if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['dragndrop'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Mods',

  DragStartThreshold: 4,
  DragStartByTouch: false,
  DragElementOpacity: 0.5,
  DragMinDropDelay: 200, // ms
  AutoScrollMargin: 30,

  OnInit: function() {

    var dragndrop=this;

    var ctrl_down=false, alt_down=false, shift_down=false;
    var current_drag = null;

    // Fix for duplicated DOM IDs and scroll

    var tmp=0;
    function sanitizeclone(co,o,scrollinfo)
    {
      if (co.hasChildNodes()) {
        for (var i = 0; i < co.childNodes.length; i++) {
          sanitizeclone(co.childNodes[i],o && i < o.childNodes.length ? o.childNodes[i] : null, scrollinfo);
        }
      }
      if(o) {
        if((typeof o.scrollTop!=='undefined') &&(o.scrollTop!=0))  scrollinfo.push({Elm: co, Type:'scrollTop',Value: o.scrollTop});
        if((typeof o.scrollLeft!=='undefined')&&(o.scrollLeft!=0)) scrollinfo.push({Elm: co, Type:'scrollLeft',Value: o.scrollLeft});
      }
      if(co.id!='') co.id='__dragndrop'+tmp++;
    }

    function clone(o, parent) {
      var co=o.cloneNode(true);
      if(tmp>100000000) tmp=0;
      var scrollinfo=[];
      sanitizeclone(co,o,scrollinfo);

      // prevent user interaction by adding overlay
      var ol = document.createElement("div");
      ol.style.position="absolute";
      ol.style.zIndex="100000";
      ol.style.left="0px";
      ol.style.top="0px";
      ol.style.right="0px";
      ol.style.bottom="0px";
      co.appendChild(ol);
      
      if(parent) parent.appendChild(co);
      if(scrollinfo.length>0) {
        var si;
        for(var i=0;i<scrollinfo.length;i++) {
          si=scrollinfo[i];
          si.Elm[si.Type]=si.Value;
        }
      }
      return co;
    }

    this.CreateDragElement = function(o, parent) {
      var m,w,h;
      if(arguments.length===1) parent=document.body;
      ng_BeginMeasureElement(o);
      try {
        w=ng_GetStylePx(o.offsetWidth);
        m=ng_GetCurrentStylePx(o,'border-left-width'); if(m>0) w-=m;
        m=ng_GetCurrentStylePx(o,'border-right-width'); if(m>0) w-=m;
        m=ng_GetCurrentStylePx(o,'padding-left'); if(m>0) w-=m;
        m=ng_GetCurrentStylePx(o,'padding-right'); if(m>0) w-=m;
      
        h=ng_GetStylePx(o.offsetHeight);
        m=ng_GetCurrentStylePx(o,'border-top-width'); if(m>0) h-=m;
        m=ng_GetCurrentStylePx(o,'border-bottom-width'); if(m>0) h-=m;
        m=ng_GetCurrentStylePx(o,'padding-top'); if(m>0) h-=m;
        m=ng_GetCurrentStylePx(o,'padding-bottom'); if(m>0) h-=m;
      } finally {
        ng_EndMeasureElement(o);
      }
      var de=clone(o, parent);
      de.style.position='absolute';
      de.style.right='';
      de.style.bottom='';
      de.style.width=w+'px';
      de.style.height=h+'px';
      de.style.zIndex=((ngModalCnt+1)*ngModalZIndexDelta-1);
      return de;
    };

    function doautoscroll(t,di,pi,dir)
    {
      if(di.AutoScrollElement!==t)
      {
        di.AutoScrollElement=t;
        di.AutoScrollStartX=pi.X;
        di.AutoScrollStartY=pi.Y;
      }
      var dx=0,dy=0;
      switch(dir)
      {
        case 'left':
          if(pi.X<di.AutoScrollStartX) dx=(pi.X-di.AutoScrollStartX);
          break;          
        case 'right':
          if(pi.X>di.AutoScrollStartX) dx=(pi.X-di.AutoScrollStartX);
          break;
        case 'top':
          if(pi.Y<di.AutoScrollStartY) dy=(pi.Y-di.AutoScrollStartY);
          break;
        case 'bottom':
          if(pi.Y>di.AutoScrollStartY) dy=(pi.Y-di.AutoScrollStartY);
          break;
      }
      if(dx) {
        dx=Math.round(dx/3);
        if(dx>5) dx=5;
        if(dx<-5) dx=-5;
        t.scrollLeft=t.scrollLeft+dx;
      }
      if(dy) {
        dy=Math.round(dy/3);
        if(dy>5) dy=5;
        if(dy<-5) dy=-5;
        t.scrollTop=t.scrollTop+dy;
      }

      di.AutoScrollDirection=dir;
      if(di.ScrollTimer) clearTimeout(di.ScrollTimer);
      di.ScrollTimer=setTimeout(function() {
        clearTimeout(di.ScrollTimer);
        delete di.ScrollTimer;
        if(current_drag===di) dragover(di, di.DragStartControl.PointerInfo);
      }, 16);
      return true;
    }

    function dragover(di, pi, dt)
    {
      var autoscroll;
      di.LastDragTime = di.DragTime;
      di.DragTime = new Date().getTime();
      if(di.ScrollTimer) autoscroll=true;
      di.CtrlKey=ctrl_down;
      di.ShiftKey=shift_down;
      di.AltKey=alt_down;
      if(!di.DragSource) return;
      var de=di.DragElement;
      if(de) {
        var dstyle=de.style.display;
        de.style.display='none';
        pi.TargetEvent=null;// force reevaluate target        
      }
      var dhstyle;
      var dh=di.DragHintElements;
      if(dh)
      {
        pi.TargetEvent=null;// force reevaluate target        
        if(ng_IsArrayVar(dh)) {
          dhstyle=[];
          var dho;
          for(var i=0;i<dh.length;i++) {
            dho=dh[i];
            dhstyle.push(dho.style.display);
            dho.style.display='none';
          }
        }
        else {
          dhstyle=dh.style.display;
          dh.style.display='none';
        }
      }

      var lastdt=di.DragTarget;
      var lastctx=di.DragContext;
      var lastdh=dh;
      di.DragTarget=null;
      di.DragTargetX=void 0;
      di.DragTargetY=void 0;
      di.DragElementX=(di.DragAxis==='vertical' ? di.DragStartX : pi.X)-di.DragSourceX;
      di.DragElementY=(di.DragAxis==='horizontal' ? di.DragStartY : pi.Y)-di.DragSourceY;

      if('DragSourceElementVisibility' in di) {
        var se=di.DragSourceElement;
        if(se) {
          se.style.visibility=di.DragSourceElementVisibility;
          pi.TargetEvent=null;// force reevaluate target
        }
      }
      if(typeof dt==='undefined') dt=pi.GetTargetControl();

      if(de) de.style.display=dstyle;
      if(('DragSourceElementVisibility' in di)&&(se)) se.style.visibility='hidden';
      if(dh)
      {
        if(ng_IsArrayVar(dh)) {
          for(var i=0;i<dh.length;i++) {
            dh[i].style.display=dhstyle[i];
          }
        }
        else dh.style.display=dhstyle;
      }
  
      if((di.AutoScroll)&&((pi.Target)&&((di.DragTime-di.LastDragTime)>200))||((di.AutoScrollElement)&&(!autoscroll))) {
        var th=di.AutoScrollMargin;
        var vscroll, hscroll, ss, pp, sc;
        var t=di.AutoScrollElement && (!autoscroll) ? di.AutoScrollElement : pi.Target;
        while(t) {
          hscroll=(typeof t.scrollLeft!=='undefined')&&(t.scrollWidth > t.clientWidth);
          vscroll=(typeof t.scrollTop!=='undefined')&&(t.scrollHeight > t.clientHeight);
          if((vscroll)||(hscroll)) {
            ss=ng_GetScrollBars(t);
            if(ss!==ssDefault) {
              if(ss===ssHorizontal) vscroll=false;
              else if(ss===ssVertical) hscroll=false;
              if((vscroll)||(hscroll)) {
                pp=ng_ParentPosition(t);
                if(hscroll) {
                  var x=pi.X-pp.x;
                  if((x>=0)&&(x<th)&&(t.scrollLeft>0)) {
                    sc=t.scrollLeft-1;
                    t.scrollLeft=sc;
                    if(t.scrollLeft===sc) {
                      doautoscroll(t,di,pi,'left');
                      break;
                    }
                  }
                  var w=ng_ClientWidth(t);
                  if((x<=w)&&(x>w-th)) {
                    sc=t.scrollLeft+1;
                    t.scrollLeft=sc;
                    if(t.scrollLeft===sc) {
                      doautoscroll(t,di,pi,'right');
                      break;
                    }
                  }                
                }
                if(vscroll) {
                  var y=pi.Y-pp.y;
                  if((y>=0)&&(y<th)&&(t.scrollTop>0)) {
                    sc=t.scrollTop-1;
                    t.scrollTop=sc;
                    if(t.scrollTop===sc) {                   
                      doautoscroll(t,di,pi,'top');
                      break;
                    }
                  }
                  var h=ng_ClientHeight(t);
                  if((y<=h)&&(y>h-th)) {
                    sc=t.scrollTop+1;
                    t.scrollTop=sc;
                    if(t.scrollTop===sc) {
                      doautoscroll(t,di,pi,'bottom');
                    }
                  }                
                }
              }
            }
          }
          if(t===di.AutoScrollElement) break;
          t=t.parentNode;
        }
      }
      if((!di.ScrollTimer)&&(di.AutoScrollElement)&&(!autoscroll)) {
        if(di.ScrollTimer) clearTimeout(di.ScrollTimer);
        delete di.ScrollTimer;
        di.AutoScrollElement=null;
        di.AutoScrollStartX=void 0;
        di.AutoScrollStartY=void 0;
        di.AutoScrollDirection='';
      }

      var accept;
      var dg=di.DragGroup;
      if(dg==='') dg=void 0;
      try {
        while(dt) {
          accept=false;
          di.DragTarget=dt;
          di.DragTargetX=void 0;
          di.DragTargetY=void 0;    
          di.DragContext=(dt === lastdt ? lastctx : {});
          di.DragHintElements=(dt === lastdt ? lastdh : void 0);

          if((typeof dt.DragDropGroup!=='undefined')&&(dt.DragDropGroup!==''))
          {
            var i;
            if(dg) {
              if(dt === lastdt) i=0; // target not changes, assume we already accepted this before
              else {
                if(ng_IsArrayVar(dt.DragDropGroup)) {
                  for(i=dt.DragDropGroup.length-1;i>=0;i--) {
                    if(dt.DragDropGroup[i]===dg) break;
                  }
                } else i=(dt.DragDropGroup===dg) ? 0 : -1;
              }
              if((i>=0)&&(!dt.DoDragOver)&&(!dt.OnDragOver)) { // accept when group matches and no handlers are available
                accept=true;
                break;
              }
            } else i=-1;

            if(i<0) {
              dt=dt.ParentControl;
              continue;
            }
          }

          if((dt.DoDragOver)&&(ngVal(dt.DoDragOver(di, pi),false))) accept=true;                      
          if((dt.OnDragOver)&&(di.DragTarget))
          {
            if(dt!==di.DragTarget)
            {
              di.DragTargetX=void 0;
              di.DragTargetY=void 0;
              di.DragContext=(di.DragTarget === lastdt ? lastctx : {});
              di.DragHintElements=(di.DragTarget === lastdt ? lastdh : void 0);
            }          
            if(ngVal(dt.OnDragOver(dt, di, pi),false)) accept=true;
          }

          if((accept)&&(di.DragTarget)) {
            if(dt!==di.DragTarget)
            {
              dt=di.DragTarget;
              di.DragTargetX=void 0;
              di.DragTargetY=void 0;
              di.DragContext=(dt === lastdt ? lastctx : {});
              di.DragHintElements=(dt === lastdt ? lastdh : void 0);
            }
            break;
          }
          dt=dt.ParentControl;
        }
      } finally {
        if(!accept) { 
          dt=null;
          di.DragTarget=null; 
          di.DragTargetX=void 0;
          di.DragTargetY=void 0;
        }
        if(lastdt!==dt) {
          if(lastdt) {
            var ctx=di.DragContext;
            var dhe=di.DragHintElements;
            di.DragContext=lastctx;
            di.DragHintElements=lastdh;
            try {
              if(di.OnDragLeave) di.OnDragLeave(di, pi, lastdt);
              if(lastdt.DoDragLeave) lastdt.DoDragLeave(di, pi);
              if(lastdt.OnDragLeave) lastdt.OnDragLeave(lastdt, di, pi);
            } finally {
              di.DragContext=ctx;
              di.DragHintElements=dhe;
            }
          }
          if(dt) {
            if(di.OnDragEnter) di.OnDragEnter(di, pi, lastdt);
            if(dt.DoDragEnter) dt.DoDragEnter(di, pi);
            if(dt.OnDragEnter) dt.OnDragEnter(dt, di, pi);
          }
        }
        if(!dt) di.DragContext=void 0;
      }
      if(di.OnDrag) di.OnDrag(di, pi, accept, lastdt);
      var ds=di.DragSource;
      if((ds)&&(ds.DoDrag)) ds.DoDrag(di,pi);

      if(de) {
        ng_setLeftTop(de,di.DragElementX, di.DragElementY);
        if((accept)&&(typeof di.DragCursor!=='undefined')) de.style.cursor=di.DragCursor;
        if((!accept)&&(typeof di.DragCursorNoDrop!=='undefined')) de.style.cursor=di.DragCursorNoDrop;
      }

      if(((di.DragSourceElementVisible)&&('DragSourceElementVisibility' in di))
        ||((!di.DragSourceElementVisible)&&(!('DragSourceElementVisibility' in di))))        
      {
        var o=di.DragSourceElement;
        if(o) {
          if(!di.DragSourceElementVisible) {
            di.DragSourceElementVisibility=ngVal(o.style.visibility,'visible');
            o.style.visibility='hidden';
          }
          else 
          {
            o.style.visibility=di.DragSourceElementVisibility;
            delete di.DragSourceElementVisibility;
          }
          ng_IE7RedrawFix(o);
        }
      }
    }

    function dragend(di, pi)
    {
      di.LastDragTime = di.DragTime;
      di.DragTime = new Date().getTime();
      if(di.ScrollTimer) {
        clearTimeout(di.ScrollTimer);
        delete di.ScrollTimer;
      }
      if(!di.DragSource) return;
      var dt=di.DragTarget;
      if(dt) {
        if(di.OnDragDrop) di.OnDragDrop(di,pi);
        if(dt.DoDragDrop) dt.DoDragDrop(di, pi);
        if(dt.OnDragDrop) dt.OnDragDrop(dt, di, pi);  
      }
      var ds=di.DragSource;
      if((!di.DragSourceElementVisible)&&('DragSourceElementVisibility' in di)) {
        var o=di.DragSourceElement;
        if(o) {
          var sc,visible=true;
          if((ds)&&(ds.Elm()===o)) sc=ds;
          else sc=ngGetControlByElement(o);
          if(sc) {
            while(sc)
            {
              if(!sc.Visible) { visible=false; break; }
              sc=sc.ParentControl;
            }
          }
          if(visible) o.style.visibility=di.DragSourceElementVisibility;
        }
        delete di.DragSourceElementVisibility;
      }
      if(di.OnDragEnd) di.OnDragEnd(di,pi);
      if(ds) {
        if(ds.DoDragEnd) ds.DoDragEnd(di,pi);
        delete ds.DragInfo;
      }
      var de=di.DragElement;
      if(de) {
        if(de.parentNode) de.parentNode.removeChild(de);
      }
      ng_IE7RedrawFix(document.body);
      di.DragSource=null;
      di.DragSourceX=0,
      di.DragSourceY=0,
      di.DragElement=null;
      di.DragTarget=null;
      di.DragTargetX=void 0;
      di.DragTargetY=void 0;
      current_drag=null;
    }

    function childdragstart(c,di,pi)
    {
      var p=di.DragSource;
      while(p)
      {
        if(p.CtrlInheritsFrom('modDragNDrop')) {
          di.DragSource=p;
          if((c!==p)&&(!p.DoDragStart(di,pi))) return false;
          return true;
        }
        p=p.ParentControl;
      }
      return false;
    }

    function addchildctrl(c)
    {
      if(c.CtrlInheritsFrom('modDragNDrop')) return;
      registerdragdrop(c);
      if((typeof this.DragStartThreshold!=='undefined')&&(typeof ctrl.DragStartThreshold==='undefined')) ctrl.DragStartThreshold=this.DragStartThreshold;
      if((typeof this.DragStartByTouch!=='undefined')&&(typeof ctrl.DragStartByTouch==='undefined')) ctrl.DragStartByTouch=this.DragStartByTouch;
      c.AddEvent('OnDragStart',childdragstart, true);
      if(c.ChildControls) {
        var cc=c.ChildControls;
        for(var i=0;i<cc.length;i++) addchildctrl(cc[i]);
      }
    }

    function removechildctrl(c)
    {      
      if(c.CtrlInheritsFrom('modDragNDrop')) return;
      c.RemoveEvent('OnDragStart',childdragstart);
      unregisterdragdrop(c);
      if(c.ChildControls) {
        var cc=c.ChildControls;
        for(var i=0;i<cc.length;i++) removechildctrl(cc[i]);
      }
    }

    function dragdispose()
    {
      var di=this.DragInfo;
      if((di)&&(di.DragSource===this)) {
        var pi=di.DragStartControl.PointerInfo;
        dragover(di, pi, null);
        dragend(di, pi);
      }
      ng_CallParent(this,'Dispose',arguments);
    }

    function dragsetvisible(v)
    {        
      ng_CallParent(this,'SetVisible',arguments);
      if((this.DragInfo)&&(!this.Visible)) {
        var di=this.DragInfo;
        if(di.DragSource===this) {
          var pi=di.DragStartControl.PointerInfo;
          dragover(di, pi, null);
          dragend(di, pi);
        }
      }
    }

    function acceptgestures(o,gestures) {
      var args=[];
      gestures.drag=true;
      gestures.hold=true;
      args.push(o);
      args.push(gestures);
      for(var i=2;i<arguments.length;i++) args.push(arguments[i]);
      ng_CallParent(this,'DoAcceptGestures',args);
    }

    function ptrstart(pi)
    {
      ng_CallParent(this,'DoPtrStart',arguments);
      pi.StopPropagation=true;
      pi.DocumentDeselect=true;
      pi.PreventSelect=true;  
      pi.Gestures.drag=true;            
      pi.Gestures.hold=true;
    }

    function dogesture(pi)
    {
      if(pi.Gesture==='hold') {
        ptrdrag.apply(this,[pi]);
        return true;
      }
      return false;
    }

    function dragtargetpos(pi)
    {
      var ret={ x: 0, y: 0 };
      var dt=this.DragTarget;
      if(dt) {
        if((typeof this.DragTargetX==='undefined')||(typeof this.DragTargetY==='undefined')) {
          var o=dt.Elm();
          if(o) {
            var pp=ng_ParentPosition(o);
            this.DragTargetX = (pi.X-pp.x);
            this.DragTargetY = (pi.Y-pp.y);
          } else {
            this.DragTargetX = 0;            
            this.DragTargetY = 0;
          }
        }
        ret.x=this.DragTargetX;
        ret.y=this.DragTargetY;
      }
      return ret;
    }

    function ptrdrag(pi)
    {
      var hold=(pi.Gesture==='hold');
      if((pi.Gesture==='drag')||(hold))
      {
        var dx=Math.round(pi.X-pi.StartX);
        var dy=Math.round(pi.Y-pi.StartY);
        if((dx)||(dy)||(hold)) {
          var di=pi.DragNDrop;
          if(!di) {
            if((pi.Gesture==='drag')&&(pi.Touch)&&(!ngVal(this.DragStartByTouch, dragndrop.DragStartByTouch))) return;
            var d=ngVal(this.DragStartThreshold,dragndrop.DragStartThreshold);
            if((Math.abs(dx)>d)||(Math.abs(dy)>d)||(hold))
            {
              di = {
                DragType: void 0,
                DragData: void 0,

                DragAxis: void 0,
                DragGroup: void 0,
                DragContext: void 0,
                DragHintElements: void 0,

                DragSource: this,
                DragSourceElement: null,
                DragSourceElementVisible: false,
                DragSourceX: 0,
                DragSourceY: 0,
                DragElement: null,
                DragElementX: void 0,
                DragElementY: void 0,
                DragElementOpacity: dragndrop.DragElementOpacity,
                DragElementBackgroundColor: 'inherit',
                DragCursor: void 0,
                DragCursorNoDrop: 'no-drop',
                DragMinDropDelay: dragndrop.DragMinDropDelay,
                DragStartControl: this,
                DragStartX: pi.StartX,
                DragStartY: pi.StartY,

                DragTarget: null,
                GetDragTargetPos: dragtargetpos,
                DragTargetX: void 0,
                DragTargetY: void 0,

                DragTime: new Date().getTime(),
                LastDragTime: null,

                AutoScroll: true,
                AutoScrollMargin: dragndrop.AutoScrollMargin,
                AutoScrollElement: null,
                AutoScrollDirection: '',
                AutoScrollStartX: void 0,
                AutoScrollStartY: void 0,

                KeyCode: void 0,
                CtrlKey: ctrl_down,
                ShiftKey: shift_down,
                AltKey: alt_down,

                OnDragStarted: null,
                OnDrag: null,
                OnDragEnter: null,
                OnDragLeave: null,
                OnDragDrop: null,
                OnDragEnd: null,
                OnKeyDown: null,
                OnKeyUp: null
              };
              di.AddEvent = ngObjAddEvent;
              di.RemoveEvent = ngObjRemoveEvent;
              if(this.DoDragStart(di,pi))
              {
                var ds=di.DragSource;
                if((!ds)||(!ds.Visible)) return;

                if(typeof di.DragGroup==='undefined') di.DragGroup=ngVal(ds.DragGroup,'');
                if(typeof di.DragAxis==='undefined') di.DragAxis=ngVal(ds.DragAxis,'');

                if(typeof di.DragData==='undefined') di.DragData={ DragControl: ds };
                if(ngVal(di.DragType,'')==='') di.DragType=ng_IsObjVar(di.DragData) && ngIsControl(di.DragData.DragControl) ? 'control' : 'data';

                current_drag=di;
                var de=di.DragElement;
                var o;
                if(di.DragSourceElement) o=di.DragSourceElement;
                else {
                  o=ds.Elm();
                  if(o) di.DragSourceElement=o;
                }
                if(o) {
                  var pp=ng_ParentPosition(o);
                  var sx=(pi.StartX-pp.x);
                  var sy=(pi.StartY-pp.y);

                  var m;
                  m=ng_GetCurrentStylePx(o,'border-left-width'); if(m>0) sx+=m;
                  m=ng_GetCurrentStylePx(o,'margin-left'); if(m>0) sx+=m;
                  m=ng_GetCurrentStylePx(o,'border-top-width'); if(m>0) sy+=m;
                  m=ng_GetCurrentStylePx(o,'margin-top'); if(m>0) sy+=m;
          
                  di.DragSourceX = sx;
                  di.DragSourceY = sy;

                  if(!de) {
                    de=dragndrop.CreateDragElement(o, document.body);
                    if(de) di.DragElement=de;  
                  }
                  if(de) {
                    var bc=di.DragElementBackgroundColor;
                    if(ngVal(bc,'')!=='') {
                      if(bc==='inherit') bc=ng_GetBackgroundColor(o);
                      de.style.backgroundColor=bc;
                    }
                  }
                  if(!di.DragSourceElementVisible) {
                    di.DragSourceElementVisibility=ngVal(o.style.visibility,'visible');
                    o.style.visibility='hidden';
                    ng_IE7RedrawFix(o);
                  } else delete di.DragSourceElementVisibility;
                }
                if(typeof di.DragElementX==='undefined') di.DragElementX=(di.DragAxis==='vertical' ? di.DragStartX : pi.X)-di.DragSourceX;
                if(typeof di.DragElementY==='undefined') di.DragElementY=(di.DragAxis==='horizontal' ? di.DragStartY : pi.Y)-di.DragSourceY;
                if(de) {
                  if(!ng_inDOM(de)) document.body.appendChild(de);
                  if(typeof di.DragCursor==='undefined') di.DragCursor=de.style.cursor;
                  if(typeof di.DragCursorNoDrop!=='undefined') de.style.cursor=di.DragCursorNoDrop;
                  else if(typeof di.DragCursor!=='undefined') de.style.cursor=di.DragCursor;
                  if(typeof di.DragElementOpacity!=='undefined') ng_SetOpacity(de,di.DragElementOpacity);
                  ng_setLeftTop(de, di.DragElementX, di.DragElementY);
                }
                ds.DragInfo=di;
                pi.DragNDrop=di;
                if(di.OnDragStarted) di.OnDragStarted(di,pi);
                if(ds.DoDragStarted) ds.DoDragStarted(di,pi);
                return;
              }
            }
          }
          else {
            dragover(di,pi);
            return;
          }
        }            
      }           
      ng_CallParent(this,'DoGesture',arguments);
    }

    function ptrend(pi)
    {
      var di=pi.DragNDrop;
      if(di) {
        var mt=ngVal(di.DragMinDropDelay,0);
        if((mt>0)&&((pi.EndTime-pi.StartTime)<mt)) dragover(di, pi, null);
        else dragover(di, pi);
        dragend(di, pi);
      }
      ng_CallParent(this,'DoPtrEnd',arguments);
      if(di) delete pi.DragNDrop;
    }  

    function dodragstart(di,pi)
    {
      if((this.OnDragStart)&&(!ngVal(this.OnDragStart(this, di, pi),false))) return false;
      return true;
    }

    function dodragstarted(di,pi)
    {
      if(this.OnDragStarted) this.OnDragStarted(this, di, pi);
    }

    function dodrag(di, pi)
    {
      if(this.OnDrag) this.OnDrag(this, di, pi);
    }

    function dodragend(di, pi)
    {
      if(this.OnDragEnd) this.OnDragEnd(this, di, pi);
      if(di.DragTarget) {
        if(this.OnDragFinished) this.OnDragFinished(this, di, pi);
      } else {
        if(this.OnDragCanceled) this.OnDragCanceled(this, di, pi);
      }
    }

    function registerdragdrop(c)
    {
      c.AddEvent('OnAddChildControl',addchildctrl, true);
      c.AddEvent('OnRemoveChildControl',removechildctrl, true);
      ng_OverrideMethod(c,'Dispose',dragdispose);
      ng_OverrideMethod(c,'SetVisible',dragsetvisible);
      ng_OverrideMethod(c,'DoAcceptGestures',acceptgestures);
      ng_OverrideMethod(c,'DoGesture',dogesture);
      ng_OverrideMethod(c,'DoPtrStart',ptrstart);
      ng_OverrideMethod(c,'DoPtrDrag',ptrdrag);
      ng_OverrideMethod(c,'DoPtrEnd',ptrend);
      if(!c.DoDragStart)   c.DoDragStart=dodragstart;
      if(!c.DoDragStarted) c.DoDragStarted=dodragstarted;
      if(!c.DoDrag)        c.DoDrag=dodrag;
      if(!c.DoDragEnd)     c.DoDragEnd=dodragend;
    }

    function unregisterdragdrop(c)
    {
      if(c.RemoveEvent) {
        c.RemoveEvent('OnAddChildControl',addchildctrl);      
        c.RemoveEvent('OnRemoveChildControl',removechildctrl);
      }
      if(ng_IsOverriden(c.Dispose)) c.Dispose.removeOverride(dragdispose);
      if(ng_IsOverriden(c.SetVisible)) c.SetVisible.removeOverride(dragsetvisible);
      if(ng_IsOverriden(c.DoAcceptGestures)) c.DoAcceptGestures.removeOverride(acceptgestures);
      if(ng_IsOverriden(c.DoGesture)) c.DoGesture.removeOverride(dogesture);
      if(ng_IsOverriden(c.DoPtrStart)) c.DoPtrStart.removeOverride(ptrstart);
      if(ng_IsOverriden(c.DoPtrDrag)) c.DoPtrDrag.removeOverride(ptrdrag);
      if(ng_IsOverriden(c.DoPtrEnd)) c.DoPtrEnd.removeOverride(ptrend);
    }

    ngRegisterControlMod('modDragNDrop', function text(def, ref, parent, modtype) {
      ng_MergeDef(def, {
        Data: {
          DragStartThreshold: void 0,
          DragStartByTouch: void 0,
          DragGroup: void 0,
          DragDropGroup: void 0,
          DragAxis: '' // 'vertical', 'horizontal'
        },
        Events: {
          OnDragStart: null,
          OnDragStarted: null,
          OnDrag: null,
          OnDragEnd: null,
          OnDragFinished: null,
          OnDragCanceled: null
        }
      });
      var c=ngCreateControlAsType(def, modtype, ref, parent);
      if(c) registerdragdrop(c);
      return c;
    });


    function dockeydown(e)
    {
      if(!e) e=window.event;
      if(e.ctrlKey)  ctrl_down=true;
      if(e.altKey)   alt_down=true;
      if(e.shiftKey) shift_down=true;

      if((document.activeElement) && ((document.activeElement.tagName == "INPUT") || (document.activeElement.tagName == "TEXTAREA"))) return true;

      var di=current_drag;
      if(di) {
        di.KeyCode = e.keyCode;
        if(di.OnKeyDown) di.OnKeyDown(di, e);
        var pi=di.DragStartControl.PointerInfo;
        dragover(di, pi);
      }
      return true;
    }

    function dockeyup(e)
    {
      if(!e) e=window.event;

      if(!e.ctrlKey)  ctrl_down=false;
      if(!e.altKey)   alt_down=false;
      if(!e.shiftKey) shift_down=false;

      if((document.activeElement) && ((document.activeElement.tagName == "INPUT") || (document.activeElement.tagName == "TEXTAREA"))) return true;

      var di=current_drag;
      if(di)
      {
        di.KeyCode = e.keyCode;
        if((di)&&(di.OnKeyUp)) di.OnKeyUp(di, e);
        di.KeyCode = void 0;
        var pi=di.DragStartControl.PointerInfo;
        if(e.keyCode===27) {
          dragover(di, pi, null);
          dragend(di, pi);    
        }
        else {
          dragover(di, pi);
        }
      }
      return true;
    }

    document.onkeydown = ngAddEvent(document.onkeydown, dockeydown);
    document.onkeyup   = ngAddEvent(document.onkeyup,   dockeyup);
  }
};
