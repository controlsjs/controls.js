/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2018 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

/**
 *  Group: Layouts
 */
if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['layouts'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Basic',

  OnInit: function() {

    function layout_dim(def) {
      if((typeof def.L==='undefined')&&(typeof def.R==='undefined'))
      {
        def.L=0;
        if(typeof def.W==='undefined') def.R=0;
      }
      if((typeof def.T==='undefined')&&(typeof def.B==='undefined'))
      {
        def.T=0;
        if(typeof def.H==='undefined') def.B=0;
      }
    }

    function layout_methods(def) {
      ng_MergeDef(def,{
        Methods: {
          CtrlBringToFront: ngc_CtrlBringToFront,
          CtrlSendToBack: ngc_CtrlSendToBack,
          CtrlInsertAfter: ngc_CtrlInsertAfter,
          CtrlInsertBefore: ngc_CtrlInsertBefore
        }
      });
    }

    function Create_PageLayout(def, ref, parent) {
      layout_dim(def);
      ng_MergeDef(def, {
        Data: {
          PagesVisible: false
        }
      });
      return ngCreateControlAsType(def, 'ngPages', ref, parent);
    }

    ngRegisterControlType('ngPageLayout', Create_PageLayout);

    function ngvhlay_setSize(vert,p,v) {
      var b={};
      if(vert) {
        if((typeof p.MinHeight !== 'undefined')&&(v<p.MinHeight)) v=p.MinHeight;
        if((typeof p.MaxHeight !== 'undefined')&&(v>p.MaxHeight)) v=p.MaxHeight;
        b.H=v;
        if(typeof p.Bounds.T!=='undefined') b.B=void 0;
        else b.T=void 0;
        p.SetBounds({H: v});
      } else {
        if((typeof p.MinWidth !== 'undefined')&&(v<p.MinWidth)) v=p.MinWidth;
        if((typeof p.MaxWidth !== 'undefined')&&(v>p.MaxWidth)) v=p.MaxWidth;
        b.W=v;
        if(typeof p.Bounds.L!=='undefined') b.R=void 0;
        else b.L=void 0;
      }
      p.SetBounds(b);
    }

    function ngvhlay_findChild(cc, c, reverse, chidx)
    {
      var i;
      if(typeof chidx==='undefined') chidx=c._layout_child;
      if(typeof chidx==='undefined') chidx=0;
      for(i=0;i<cc.length;i++)
      {
        chidx=chidx%cc.length;
        if(cc[chidx]===c) break;
        if(reverse) {
          chidx--;
          if(chidx<0) chidx=cc.length-1;
        }
        else chidx++;
      }
      if(i>=cc.length) {
        delete c._layout_child;
        return -1; // not a child
      }
      c._layout_child=chidx;
      return chidx;
    }

    function ngvhlay_getBound(p) {
      if(typeof p.HAlign!=='undefined') {
        return p.HAlign==='right' ? 'R' : 'L';
      }
      return p.VAlign==='bottom' ? 'B' : 'T';
    }

    function ngvhlay_reflowChildren(cc, c, chidx, p)
    {
      var ctrl=c;
      var bound=ngvhlay_getBound(p);
      var vert=((bound==='T')||(bound==='B'));
      var t=c.Bounds[bound];
      var padname=vert ? 'VPadding' : 'HPadding';
      var padding=0,ppadding=ngVal(p[padname],0);
      padname='Layout'+padname;
      var o,b={};
      function setbounds(i) {
        if((c)&&(c.Visible)&&(!c.IgnoreLayout)) {
          padding=ngVal(c[padname],ppadding);
          o=c.Elm();
          if(o) t+=(vert ? ng_OuterHeight(o) : ng_OuterWidth(o));
          t+=padding;
        }
        c=cc[i];
        if((c)&&(!c.IgnoreLayout)) {
          b[bound]=t;
          c.SetBounds(b);
        }
      }
      if(p.Reverse) {
        var stop=p.AutoSize ? -1 : 0;
        for(var i=chidx-1;i>=stop;i--) setbounds(i);
      } else {
        var len=cc.length;
        if(p.AutoSize) len++;
        for(var i=chidx+1;i<len;i++) setbounds(i);
      }
      var s=t-padding;
      if(p.AutoSize) ngvhlay_setSize(vert, p, s);

      var po=p.Elm();
      if(po) {
        var w=ng_ClientWidth(po);
        var h=ng_ClientHeight(po);
        if(typeof p._layout_width === 'undefined') p._layout_width=w;
        if(typeof p._layout_height === 'undefined') p._layout_height=h;
        if((p._layout_width!==w)||(p._layout_height!==h)) // Scrollbars changed, redraw
        {
          p._layout_width=w;
          p._layout_height=h;
          p.UpdateChildren();
        }
      }
    }

    function ngvhlay_CtrlSetBounds(props) {
      var ret=ng_CallParent(this,'SetBounds',arguments,false);
      if((ret)&&(props)&&(!this._layout_ctrl_updating)&&(!this.IgnoreLayout)) {
        var p=this.ParentControl;
        var cc=p ? p.ChildControls : null;
        if((cc)&&(cc.length)) {
          var bound=ngvhlay_getBound(p);
          var vert=((bound==='T')||(bound==='B'));
          if(((vert)&&(typeof props.H!=='undefined'))||((!vert)&&(typeof props.W!=='undefined'))) {
            var chidx=ngvhlay_findChild(cc, this, p.Reverse);
            if(chidx>=0) ngvhlay_reflowChildren(cc, this, chidx, p);
          }
        }
      }
      return ret;
    }

    function ngvhlay_CtrlDoUpdate(o) {
      if(typeof this._layout_ctrl_updating_old==='undefined') this._layout_ctrl_updating_old=this._layout_ctrl_updating;
      this._layout_ctrl_updating=true;
      return ng_CallParent(this,'DoUpdate',arguments,true);
    }

    function ngvhlay_CtrlUpdate(c) {
      var p=c.ParentControl;
      if((p)&&(!c.IgnoreLayout)) {
        var cc=p.ChildControls;
        if((cc)&&(cc.length)) {
          var chidx=ngvhlay_findChild(cc, c, p.Reverse, p._layout_updating ? p._layout_child_idx : c._layout_child);
          if(chidx<0) return true; // not a child

          var bound=ngvhlay_getBound(p);
          var vert=((bound==='T')||(bound==='B'));

          var t;
          if(((!p.Reverse)&&(!chidx))||((p.Reverse)&&(chidx===cc.length-1))) t=0;
          else {
            var prev = ngvhlay_findPrev(cc, p.Reverse ? chidx+1 : chidx-1, p.Reverse);
            if(!prev) t=0;
            else {
              var po=prev.Elm();
              t=po ? prev.Bounds[bound]+(vert ? ng_OuterHeight(po)+ngVal(prev.LayoutVPadding,ngVal(p.VPadding,0)) : ng_OuterWidth(po)+ngVal(prev.LayoutHPadding,ngVal(p.HPadding,0)) ) : 0;
            }
          }
          var b={};
          b[bound]=t;
          switch(bound) {
            case 'T': b.B=void 0; break;
            case 'B': b.T=void 0; break;
            case 'L': b.R=void 0; break;
            case 'R': b.L=void 0; break;
          }
          c.SetBounds(b);
          return true;
        }
      }
      delete c._layout_child;
      return true;
    }

    function ngvhlay_CtrlUpdated(c,o) {
      this._layout_ctrl_updating=this._layout_ctrl_updating_old;
      delete this._layout_ctrl_updating_old;
      if(typeof this._layout_ctrl_updating==='undefined') delete this._layout_ctrl_updating;

      var p=c.ParentControl;
      if((!p)||(p._layout_updating)||(typeof c._layout_child === 'undefined')) return;

      var cc=p.ChildControls;
      if((!cc)||(!cc.length)) return;

      ngvhlay_reflowChildren(cc, c, c._layout_child, p);
    }

    function ngvhlay_CtrlVisibleChanged(c) {
      if((c.Visible)||(c.IgnoreLayout)) return;
      var p=c.ParentControl;
      if(!p) return;
      var cc=p.ChildControls;
      if((!cc)||(!cc.length)) return;

      var chidx=ngvhlay_findChild(cc, c, p.Reverse);
      if(chidx<0) return;
      ngvhlay_reflowChildren(cc, c, chidx, p);
    }

    function ngvhlay_AddChildControl(ctrl) {
      ctrl.AddEvent(ngvhlay_CtrlUpdate,'OnUpdate');
      ctrl.AddEvent('OnUpdated',ngvhlay_CtrlUpdated);
      ctrl.AddEvent('OnVisibleChanged',ngvhlay_CtrlVisibleChanged);
      ng_OverrideMethod(ctrl,'DoUpdate',ngvhlay_CtrlDoUpdate);
      ng_OverrideMethod(ctrl,'SetBounds',ngvhlay_CtrlSetBounds);
    }

    function ngvhlay_RemoveChildControl(ctrl) {
      ctrl.RemoveEvent('OnUpdate',ngvhlay_CtrlUpdate);
      ctrl.RemoveEvent('OnUpdated',ngvhlay_CtrlUpdated);
      ctrl.RemoveEvent('OnVisibleChanged',ngvhlay_CtrlVisibleChanged);
      if(ng_IsOverriden(ctrl.DoUpdate)) ctrl.DoUpdate.removeOverride(ngvhlay_CtrlDoUpdate);
      if(ng_IsOverriden(ctrl.SetBounds)) ctrl.SetBounds.removeOverride(ngvhlay_CtrlSetBounds);
    }

    function ngvhlay_UpdateChildren(recursively)
    {
      var cc=this.ChildControls;
      if((!cc)||(!cc.length)) return;
      if(typeof recursive==='undefined') recursive=true;
      var c;

      var old_layout_updating=this._layout_updating;
      var old_layout_child_idx=this._layout_child_idx;
      this._layout_updating=true;
      try {
        if(this.Reverse) {
          this._layout_child_idx=cc.length-1;
          for(var i=cc.length-1;i>=0;i--)
          {
            this._layout_child_idx=i;
            c=cc[i];
            if(c.Update) c.Update(recursive);
          }
        }
        else {
          this._layout_child_idx=0;
          for(var i=0;i<cc.length;i++)
          {
            this._layout_child_idx=i;
            c=cc[i];
            if(c.Update) c.Update(recursive);
          }
        }
      }
      finally {
        this._layout_updating=old_layout_updating;
        if(typeof this._layout_updating==='undefined') delete this._layout_updating;
        this._layout_child_idx=old_layout_child_idx;
        if(typeof this._layout_child_idx==='undefined') delete this._layout_child_idx;
      }
    }

    function ngvhlay_DoUpdate(o)
    {
      this._layout_width=ng_ClientWidth(o);
      this._layout_height=ng_ClientHeight(o);

      return ng_CallParent(this,'DoUpdate',arguments,true);
    }

    function ngvhlay_findPrev(cc, i, reverse) {
      var prev=cc[i];
      if((!prev.Visible)||(prev.IgnoreLayout)) {
        if(reverse) {
          for(++i;i<cc.length;i++) {
            prev=cc[i];
            if((prev.Visible)&&(!prev.IgnoreLayout)) break;
          }
          if(i>=cc.length) prev=null;
        }
        else {
          for(--i;i>=0;i--) {
            prev=cc[i];
            if((prev.Visible)&&(!prev.IgnoreLayout)) break;
          }
          if(i<0) prev=null;
        }
      }
      return prev;
    }

    function ngvhlay_calcSize(vert,cc,bound,reverse) {
      var prev = ngvhlay_findPrev(cc, reverse ? 0 : cc.length-1, reverse);
      if(!prev) return 0;
      var po=prev.Elm();
      return po ? prev.Bounds[bound]+(vert ? ng_OuterHeight(po) : ng_OuterWidth(po)) : 0;
    }

    function ngvhlay_Updated()
    {
      var bound=ngvhlay_getBound(this);
      var vert=((bound==='T')||(bound==='B'));

      var s;
      var cc=this.ChildControls;
      if(this.AutoSize) {
        if((cc)&&(cc.length>0)) s=ngvhlay_calcSize(vert,cc,bound,this.Reverse);
        else s=0;
      }

      if(typeof s==='undefined') s=(vert ? this.Bounds.H : this.Bounds.W);

      if(typeof s!=='undefined') ngvhlay_setSize(vert, this, s);

      if((cc)&&(cc.length>0)) {
        var o=this.Elm();
        var w=ng_ClientWidth(o);
        var h=ng_ClientHeight(o);
        if((this._layout_width!==w)||(this._layout_height!==h))
        {
          this._layout_width=w;
          this._layout_height=h;
          // Scrollbars changed, redraw
          this.UpdateChildren();
        }
      }
    }

    function Create_VLayout(def, ref, parent) {
      layout_dim(def);
      layout_methods(def);
      ng_MergeDef(def, {
        ScrollBars: ssAuto,
        Data: {
          AutoSize: false,
          VPadding: 0,
          VAlign: 'top',
          Reverse: false,
          MinHeight: void 0,
          MaxHeight: void 0
        },
        Methods: {
          DoUpdate: ngvhlay_DoUpdate,
          UpdateChildren: ngvhlay_UpdateChildren
        },
        Events: {
          OnUpdated: ngvhlay_Updated,
          OnAddChildControl: ngvhlay_AddChildControl,
          OnRemoveChildControl: ngvhlay_RemoveChildControl
        }
      });
      return ngCreateControlAsType(def, 'ngPanel', ref, parent);
    }

    ngRegisterControlType('ngVLayout', Create_VLayout);

    function Create_HLayout(def, ref, parent) {
      layout_dim(def);
      layout_methods(def);
      ng_MergeDef(def, {
        ScrollBars: ssAuto,
        Data: {
          AutoSize: false,
          HPadding: 0,
          HAlign: 'left',
          Reverse: false,
          MinWidth: void 0,
          MaxWidth: void 0
        },
        Methods: {
          DoUpdate: ngvhlay_DoUpdate,
          UpdateChildren: ngvhlay_UpdateChildren
        },
        Events: {
          OnUpdated: ngvhlay_Updated,
          OnAddChildControl: ngvhlay_AddChildControl,
          OnRemoveChildControl: ngvhlay_RemoveChildControl
        }
      });
      return ngCreateControlAsType(def, 'ngPanel', ref, parent);
    }
    ngRegisterControlType('ngHLayout', Create_HLayout);

    function ngclay_CtrlUpdate(c) {
      var p=this.IgnoreLayout ? null : this.ParentControl;
      if(p) {
        var bounds={};
        if(p.HCenter) {
          bounds.L='50%';
          bounds.R=void 0;
        }
        if(p.VCenter) {
          bounds.T='50%';
          bounds.B=void 0;
        }
        this.SetBounds(bounds);
      }
      return true;
    }

    function ngclay_CtrlUpdated(c,o) {
      var p=this.IgnoreLayout ? null : this.ParentControl;
      if(!p) return;
      if(p.HCenter) {
        o.style.marginLeft=-Math.round(ng_OuterWidth(o)/2-ngVal(this.CenterOffsetX,0)-ngVal(p.CenterOffsetX,0))+'px';
      }
      if(p.VCenter) {
        o.style.marginTop=-Math.round(ng_OuterHeight(o)/2-ngVal(this.CenterOffsetY,0)-ngVal(p.CenterOffsetY,0))+'px';
      }
    }

    function ngclay_AddChildControl(ctrl) {
      ctrl.AddEvent(ngclay_CtrlUpdate,'OnUpdate');
      ctrl.AddEvent('OnUpdated',ngclay_CtrlUpdated);
    }

    function ngclay_RemoveChildControl(ctrl) {
      ctrl.RemoveEvent('OnUpdate',ngclay_CtrlUpdate);
      ctrl.RemoveEvent('OnUpdated',ngclay_CtrlUpdated);
    }

    function Create_CenterLayout(def, ref, parent) {
      layout_dim(def,true,false);
      layout_methods(def);
      ng_MergeDef(def, {
        ScrollBars: ssNone,
        Data: {
          CenterOffsetX: 0,
          CenterOffsetY: 0,
          VCenter: true,
          HCenter: true
        },
        Events: {
          OnAddChildControl: ngclay_AddChildControl,
          OnRemoveChildControl: ngclay_RemoveChildControl
        }
      });

      return ngCreateControlAsType(def, 'ngPanel', ref, parent);
    }
    ngRegisterControlType('ngCenteredLayout', Create_CenterLayout);


  }
};
