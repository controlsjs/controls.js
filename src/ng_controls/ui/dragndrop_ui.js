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
ngUserControls['dragndrop_ui'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    var dropgroupid=0;

    function getdropgroup(prefix)
    {
      dropgroupid++;
      prefix=''+ngVal(prefix,'dgroup');
      return prefix+dropgroupid;      
    }

    if(ngUserControls['layouts'])
    {
      function ngvhlaydd_getBound(p) {
        if(typeof p.HAlign!=='undefined') {
          return p.HAlign==='right' ? 'R' : 'L';
        }
        return p.VAlign==='bottom' ? 'B' : 'T';
      }
    
      function ngvhlaydd_DoDragStart(di,pi)
      {
        var startidx=-1;
        var cc=this.ChildControls;
        if((cc)&&(cc.length)) {
          var ctrl=di.DragStartControl;
          while(ctrl)
          {
            for(var i=0;i<cc.length;i++) {
              if(cc[i]===ctrl) {
                startidx=i;
                break;
              }
            }
            ctrl=ctrl.ParentControl;
          }
        }
        if(startidx>=0) {
          var ds=cc[startidx];
          di.DragSource=ds;
          di.DragGroup=ngVal(ds.DragGroup,this.DragGroup);
          di.DragAxis=ngVal(ds.DragAxis,this.DragAxis);
          di.DragType='control';
          di.DragData= {
            DragControl: ds,
            Owner: this,
            ChildIndex: startidx
          }
        }
        else {
          if((this.OnDragStart)&&(ngVal(this.OnDragStart(this, di, pi),false))) return true;
          return false;
        }
        return ng_CallParent(this,'DoDragStart',arguments,false);
      }

      function ngvhlaydd_DoCreateDragHint(o, bound)
      {
        var cclass=this.BaseClassName;
        if(cclass==='') return null;

        var dh = document.createElement("div");
        dh.style.position="absolute";
        dh.style.zIndex=((ngModalCnt+1)*ngModalZIndexDelta-10);
        dh.className=cclass+'DragHint'+bound;
        o.appendChild(dh);
        return dh;
      }

      function ngvhlaydd_DoUpdateDragHint(dh, bound, v)
      {
        switch(bound)
        {
          case 'L': dh.style.left=v+'px'; break;
          case 'R': dh.style.right=v+'px'; break;
          case 'T': dh.style.top=v+'px'; break;
          case 'B': dh.style.bottom=v+'px'; break;
        }
      }

      function ngvhlaydd_DoDisposeDragHint(dh)
      {
        if(dh.parentNode) dh.parentNode.removeChild(dh);
      }

      function ngvhlaydd_DoRemoveDragHint(di)
      {
        var dh=this.DragHint;
        if(dh) {
          delete this.DragHint;
          if(di) di.DragHintElements=void 0;
          this.DoDisposeDragHint(dh);
        }
      }
    
      function ngvhlaydd_DoDragOver(di,pi)
      {
        var ret=ng_CallParent(this,'DoDragOver',arguments,false);
        if((!ret)&&(di.DragType==='control')) {
          var dpos=ngVal(this.DragDropPosition,'');
          if(dpos==='') dpos='none';
          if(dpos==='none') return false;

          var dc=di.DragData.DragControl;
          if(!ngIsControl(dc)) return false;

          if(dpos!=='pointer') {
            if(dc.ParentControl===this) return false;
          }  

          var o=this.Elm();
          if(o) {
            var bound=ngvhlaydd_getBound(this);
            var vert=((bound==='T')||(bound==='B'));
    
            var dh=this.DragHint;
            if((!dh)&&(this.DragShowHint)) {
              var o=this.Elm();
              if(o) {
                dh=this.DoCreateDragHint(o, bound);
                this.DragHint=dh;
              }
            }
            if((dh)&&(!this.DragShowHint)) {
              this.DoRemoveDragHint(di);
              dh=null;
            }

            var v;
            if(dpos==='pointer') {
              var pos=di.GetDragTargetPos(pi);
              if(vert) {
                v=pos.y;
                if(typeof o.scrollTop!=='undefined') v+=o.scrollTop;
              }
              else {
                v=pos.x;
                if(typeof o.scrollLeft!=='undefined') v+=o.scrollLeft;
              }
              if(bound==='R') v=ng_ClientWidth(o)-v;
              else if(bound==='B') v=ng_ClientHeight(o)-v;
            }
    
            var target=null;
            var targetidx=-1;
    
            var cc=this.ChildControls;
            var len=cc ? cc.length : 0;
            var insertlast=(dpos==='last');
            var lastctrl,c;
            if((len)&&(dpos!=='first'))
            {
              for(var i=len-1;i>=0;i--) {
                c=cc[i]
                if((c)&&(c.Visible)&&(!c.IgnoreLayout)) { lastctrl=c; len=i+1; break; }
              }
              if((lastctrl)&&(!insertlast)&&(v<lastctrl.Bounds[bound])) lastctrl=null;
            } else lastctrl=null;
            var co=lastctrl ? lastctrl.Elm() : null;
            var ev,cv2;
            if(co) {
              if(vert) {
                var oh=ng_OuterHeight(co);
                cv2=oh/2;
                ev=oh-(dh ? ng_OuterHeight(dh) : 0);
              }
              else {
                var ow=ng_OuterWidth(co);
                cv2=ow/2;
                ev=ow-(dh ? ng_OuterWidth(dh) : 0);
              } 
              if(!insertlast) {
                if(v<lastctrl.Bounds[bound]+cv2) {
                  if(v>=lastctrl.Bounds[bound]) { target=lastctrl; targetidx=len-1; }
                  lastctrl=null;
                }
              }
            } else ev=0;
    
            if((!lastctrl)&&(!target)&&(len)&&(dpos==='pointer')) {
              var i,p=null,pidx=-1;
              for(i=0;i<len;i++)
              {
                c=cc[i];
                if((!c)||(!c.Visible)||(c.IgnoreLayout)) continue;
                if(v<c.Bounds[bound]) break;
                p=c;
                pidx=i;
              }
              if(i>=len) c=null;
              if(p)
              {
                co=p.Elm();
                if(co) cv2=(vert ? ng_OuterHeight(co) : ng_OuterWidth(co))/2;
                else cv2=0;
                if(v<p.Bounds[bound]+cv2) { target=p; targetidx=pidx; }
                else { target=c; targetidx=i; }
              }
            }
            if(dpos==='pointer') {
              di.DragContext.InsertBefore=target;
              di.DragContext.InsertBeforeIdx=targetidx;
            }
            else {
              delete di.DragContext.InsertBefore;
              delete di.DragContext.InsertBeforeIdx;
            }
            if(dh) {
              di.DragHintElements=dh;
              if(target) v=target.Bounds[bound];
              else {
                if(lastctrl) v=lastctrl.Bounds[bound]+ev;
                else v=0;
              }
              this.DoUpdateDragHint(dh,bound,v);
            }
          }
          ret=true;
        }
        return ret;
      }
    
      function ngvhlaydd_DoDragLeave(di,pi)
      {
        this.DoRemoveDragHint(di);
      }

      function ngvhlaydd_DoDragDropControl(ctrl, insertbefore, di, pi)
      {
        if((!ctrl)||(ctrl===insertbefore)) return;
        if(!ngIsControl(ctrl)) return;
        if((insertbefore)&&(!ngIsControl(insertbefore))) return;
        var pc=ctrl.ParentControl;
        if(!pc) return;

        var dpos=ngVal(this.DragDropPosition,'');
        if(dpos==='') dpos='none';
        if(dpos==='none')  return;
        if(dpos!=='pointer') {
          if(pc===this) return;
          insertbefore=null;          
        }

        var o=ctrl.Elm();
        if((!o)||(!o.parentNode)) return;
        var io=insertbefore ? insertbefore.Elm() : null;
        if(io) {
          if(!io.parentNode) return;
          o.parentNode.removeChild(o);
          io.parentNode.insertBefore(o, io);
        }
        else {
          io=this.Elm();
          if(!io) return;
          o.parentNode.removeChild(o);
          if(dpos==='first') io.insertBefore(o, io.firstChild);
          else io.appendChild(o);
        }
        if(pc!==this) {
          ngRemoveChildControl(pc,ctrl);
          ngAddChildControl(this,ctrl);
        }
        if(insertbefore) this.CtrlInsertBefore(ctrl, insertbefore);
        else {
          if(dpos==='first') this.CtrlBringToFront(ctrl);
          else this.CtrlSendToBack(ctrl);
        }
        var bound=ngvhlaydd_getBound(this);
        var bounds={};
        if((bound==='T')||(bound==='B'))
        {
          if(typeof ctrl.Bounds.W==='undefined') {
            if(typeof ctrl.Bounds.L==='undefined') bounds.L=0;
            if(typeof ctrl.Bounds.R==='undefined') bounds.R=0;
          }
          else {
            if((typeof ctrl.Bounds.L==='undefined')&&(typeof ctrl.Bounds.R==='undefined')) bounds.L=0;
          }
        } else {
          if(typeof ctrl.Bounds.H==='undefined') {
            if(typeof ctrl.Bounds.T==='undefined') bounds.T=0;
            if(typeof ctrl.Bounds.B==='undefined') bounds.B=0;
          }
          else {
            if((typeof ctrl.Bounds.T==='undefined')&&(typeof ctrl.Bounds.B==='undefined')) bounds.T=0;
          }
        }
        if(!ng_EmptyVar(bounds)) ctrl.SetBounds(bounds);
        if(this.OnDragDropedControl) this.OnDragDropedControl(this, ctrl, insertbefore, di, pi);
        if(pc!==this) pc.Update();
        this.Update();
      }
    
      function ngvhlaydd_DoDragDrop(di,pi)
      {
        this.DoRemoveDragHint(di);
        if(di.DragType==='control') {          
          var dc=di.DragData.DragControl;
          var ins=ngVal(di.DragContext.InsertBefore,null);
          if((this.OnDragDropControl)&&(!ngVal(this.OnDragDropControl(this,dc,ins,di,pi),false))) return;
          this.DoDragDropControl(dc, ins, di, pi);  
        }
      }
    
      function Create_DnDLayout(def, ref, parent, modtype)
      {
        ng_MergeDef(def,{
          Data: {
            DragShowHint: true,
            DragDropPosition: 'pointer' // 'none', 'first','last'
          },
          Methods: {
            DoDragStart: ngvhlaydd_DoDragStart,
            DoDragOver: ngvhlaydd_DoDragOver,
            DoDragLeave: ngvhlaydd_DoDragLeave,
            DoDragDrop: ngvhlaydd_DoDragDrop,
            DoCreateDragHint: ngvhlaydd_DoCreateDragHint,
            DoUpdateDragHint: ngvhlaydd_DoUpdateDragHint,
            DoRemoveDragHint: ngvhlaydd_DoRemoveDragHint,
            DoDisposeDragHint: ngvhlaydd_DoDisposeDragHint,
            DoDragDropControl: ngvhlaydd_DoDragDropControl            
          },
          Events: {
            OnDragDropControl: null,
            OnDragDropedControl: null            
          }
        });
        var c=ngCreateControlAsType(def, modtype, ref, parent);
        if((c)&&(typeof c.DragGroup==='undefined')&&(typeof c.DragDropGroup==='undefined')) {
          c.DragGroup=getdropgroup();
          c.DragDropGroup=c.DragGroup;
        }
        return c;
      }

      ngRegisterControlMod('ngVLayoutDnD', ['modDragNDrop','ngVLayout'], Create_DnDLayout);
      ngRegisterControlMod('ngHLayoutDnD', ['modDragNDrop','ngHLayout'], Create_DnDLayout);
    }

  }
};