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

function ng_SetAlignToID(c, id)
{
  if(!ngIsControl(c)) return;

  var mods=ngUserControls['mods'];
  if(ngNullVal(id,'')==='') {
    id=ngNullVal(c.AlignToID,'');
    if(id!=='') {
      delete mods.AlignToControls[id];
      var ac=mods.AlignedControls[id];
      if(ng_IsArrayVar(ac)) {
        for(var i=ac.length-1;i>=0;i--) if(typeof ac[i].SetAlignToControl==='function') ac[i].SetAlignToControl(null);
      }
      if(c.DoDispose.removeOverride) c.DoDispose.removeOverride(ng_SetAlignToID.DoDispose);
    }
    delete c.AlignToID;
    return;
  }
  id=''+id;
  if(c.AlignToID===id) return;
  c.AlignToID=id;
  ng_OverrideMethod(c,'DoDispose',ng_SetAlignToID.DoDispose);

  if(typeof mods.AlignToControls[id]!=='undefined') {
    ngDEBUGWARN('Duplicated definition of AlignToID "'+id+'"!')
    ngDEBUGWARN(mods.AlignToControls[id],id);
    ngDEBUGWARN(c,id);
  }
  mods.AlignToControls[id]=c;
  var ac=mods.AlignedControls[id];
  if(ng_IsArrayVar(ac)) {
    for(var i=0;i<ac.length;i++) if(typeof ac[i].SetAlignToControl==='function') ac[i].SetAlignToControl(c);
  }
}
ng_SetAlignToID.DoDispose=function() {
  if(typeof this.AlignToID!=='undefined') ng_SetAlignToID(this, '');
  return ng_CallParent(this,'DoDispose',arguments,true);
};

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['mods'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Mods',

  AlignToControls: {},
  AlignedControls: {},

  OnControlCreated: function(def,c) {
    // modAlignTo
    if((ng_IsObjVar(def.Data))&&(def.Data.AlignToID!=='undefined')) {
      var id=ngNullVal(def.Data.AlignToID,'');
      delete def.Data.AlignToID;
      if(id!=='') {
        c.AlignToID=null;
        ng_SetAlignToID(c, id);
      }
    }
  },

  OnInit: function() {
    var mods=this;

    ngRegisterControlMod('modCenter', function text(def, ref, parent, modtype) {
      ng_MergeDef(def, {
        Data: {
          VCenter: true,
          HCenter: true,
          CenterOffsetX: 0,
          CenterOffsetY: 0
        },
        BeforeEvents: {
          OnUpdate: function(c) {
            if((c.HCenter)||(c.VCenter)) {
              var bounds={};
              if(c.HCenter) {
                bounds.L='50%';
                bounds.R=void 0;
              }
              if(c.VCenter) {
                bounds.T='50%';
                bounds.B=void 0;
              }
              c.SetBounds(bounds);
            }
            return true;
          }
        },
        Events: {
          OnUpdated: function(c,o) {
            if(c.HCenter) o.style.marginLeft=-Math.round(ng_OuterWidth(o)/2-ngVal(c.CenterOffsetX,0))+'px';
            if(c.VCenter) o.style.marginTop=-Math.round(ng_OuterHeight(o)/2-ngVal(c.CenterOffsetY,0))+'px';
          }
        }
      });
      return ngCreateControlAsType(def, modtype, ref, parent);
    });

    function size_boundtype(b) {
      var ret={
        type: 'px',
        value: b
      };
      if(typeof b==='number') return ret;
      var i,c,sb=''+b;
      for(i=sb.length-1;i>=0;i--) {
        c=sb.charAt(i);
        if(((c>='0')&&(c<='9'))||(c==='.')) break;
      }
      ret.type=sb.substr(i+1).toLowerCase();
      ret.value=parseFloat(sb.substr(0,i+1));
      return ret;
    }

    function size_translatebound(b, s, p)
    {
      var bt=size_boundtype(s);
      if(bt.type==='%') {
        bt.value=(bt.value*p/100);
        bt.type='px';
      }
      if((b==='R')||(b==='B')) bt.value=p-bt.value;
      return (bt.type==='px' ? bt.value : void 0);
    }

    ngRegisterControlMod('modSizeLimit', function(def, ref, parent, modtype) {
      ng_MergeDef(def, {
        Data: {
          WMin: void 0,
          WMax: void 0,
          WAlign: 'left',

          HMin: void 0,
          HMax: void 0,
          HAlign: 'top'
        },
        Methods: {
          GetRealBounds: function(bounds) {
            if(typeof bounds==='undefined') bounds=this.Bounds;
            var elm=this.Elm();
            var ret={ W: void 0, H: void 0 };
            if(!elm) return ret;
            var bt,m,pelm=elm.parentNode;
            if(typeof bounds.W==='undefined')
            {
              var pw=pelm ? ng_ClientWidthEx(pelm) : ng_DocumentClientWidth();
              var l=size_translatebound('L',bounds.L,pw);
              var r=size_translatebound('R',bounds.R,pw);
              ret.W=r-l;
              m=ng_GetCurrentStylePx(elm,'margin-left'); if(m>0) ret.W-=m;
              m=ng_GetCurrentStylePx(elm,'margin-right'); if(m>0) ret.W-=m;
              m=ng_GetCurrentStylePx(elm,'padding-left'); if(m>0) ret.W-=m;
              m=ng_GetCurrentStylePx(elm,'padding-right'); if(m>0) ret.W-=m;
              m=ng_GetCurrentStylePx(elm,'border-left-width'); if(m>0) ret.W-=m;
              m=ng_GetCurrentStylePx(elm,'border-right-width'); if(m>0) ret.W-=m;
              if(ret.W<0) ret.W=0;
            }
            else {
              bt=size_boundtype(bounds.W);
              if(bt.type==='px') ret.W=bt.value;
            }
            if(typeof bounds.H==='undefined')
            {
              var ph=pelm ? ng_ClientHeightEx(pelm) : ng_DocumentClientHeight();
              var t=size_translatebound('T',bounds.T,ph);
              var b=size_translatebound('B',bounds.B,ph);
              ret.H=b-t;
              m=ng_GetCurrentStylePx(elm,'margin-top'); if(m>0) ret.H-=m;
              m=ng_GetCurrentStylePx(elm,'margin-bottom'); if(m>0) ret.H-=m;
              m=ng_GetCurrentStylePx(elm,'padding-top'); if(m>0) ret.H-=m;
              m=ng_GetCurrentStylePx(elm,'padding-bottom'); if(m>0) ret.H-=m;
              m=ng_GetCurrentStylePx(elm,'border-top-width'); if(m>0) ret.H-=m;
              m=ng_GetCurrentStylePx(elm,'border-bottom-width'); if(m>0) ret.H-=m;
              if(ret.H<0) ret.H=0;
            }
            else {
              bt=size_boundtype(bounds.H);
              if(bt.type==='px') ret.H=bt.value;
            }
            return ret;
          },
          SetBounds: function(props) {
            if(this.SizeLimitBounds)
            {
              var self=this;
              var ret,setboundsfnc=ng_SetBounds;
              try {
                ng_SetBounds=function(o, props) {
                  var lprops={};
                  for(var i in self.SizeLimitBounds) lprops[i]=self.SizeLimitBounds[i];
                  for(var i in props) if(!(i in lprops)) lprops[i]=props[i];
                  setboundsfnc.apply(this,[o,lprops]);
                };
                ret=ng_CallParent(this, 'SetBounds', arguments, false);
              } finally {
                ng_SetBounds=setboundsfnc;
              }
              return ret;
            }
            else return ng_CallParent(this, 'SetBounds', arguments, false);
          }
        },
        BeforeEvents: {
          OnUpdate: function(c) {
            var props;
            if((c.WMin)||(c.WMax)||(c.HMin)||(c.HMax)) {
              var rb=c.GetRealBounds();
              var props,lw,lh;
              if(typeof rb.W!=='undefined')
              {
                if((c.WMin)&&(rb.W<c.WMin)) lw=c.WMin;
                if((c.WMax)&&(rb.W>c.WMax)) lw=c.WMax;
              }
              if(typeof rb.H!=='undefined')
              {
                if((c.HMin)&&(rb.H<c.HMin)) lh=c.HMin;
                if((c.HMax)&&(rb.H>c.HMax)) lh=c.HMax;
              }
              if(typeof lw!=='undefined') {
                if(!props) props={};
                props.W=lw;
                if((typeof this.Bounds.L!=='undefined')&&(typeof this.Bounds.R!=='undefined')) {
                  if(c.WAlign==='right') props.L=void 0;
                  else                   props.R=void 0;
                }
              }
              if(typeof lh!=='undefined') {
                if(!props) props={};
                props.H=lh;
                if((typeof this.Bounds.T!=='undefined')&&(typeof this.Bounds.B!=='undefined')) {
                  if(c.HAlign==='bottom') props.T=void 0;
                  else                    props.B=void 0;
                }
              }
            }
            if(typeof props!==typeof c.SizeLimitBounds) {
              c.SizeLimitBounds=props;
              c.SetBounds();
            }
            return true;
          }
        }
      });
      return ngCreateControlAsType(def, modtype, ref, parent);
    });

    ngRegisterControlMod('modClickable', function(def, ref, parent, modtype) {
      ng_MergeDef(def, {
        Methods: {
          DoAcceptGestures: function(o,gestures) {
            var args=[];
            if(typeof this.OnClick==='function')    gestures.tap=true;
            if(typeof this.OnDblClick==='function') gestures.doubletap=true;
            args.push(o);
            args.push(gestures);
            for(var i=2;i<arguments.length;i++) args.push(arguments[i]);
            ng_CallParent(this,'DoAcceptGestures',args);
          },
          DoPtrClick: function(pi) {
            var ret=ng_CallParent(this,'DoPtrClick',arguments);
            if(pi.EventID==='control') {
              this.Click(pi.StartEvent);
            }
            return ret;
          },
          DoPtrDblClick: function(pi) {
            var ret=ng_CallParent(this,'DoPtrDblClick',arguments);
            if(pi.EventID==='control') {
              this.DblClick(pi.StartEvent);
            }
            return ret;
          },
          Click: function(e) {
            if((!this.Enabled)||(ngVal(this.ReadOnly,false))) return;
            if(!e) e={};
            e.Owner=this;
            if(this.OnClick) this.OnClick(e);
          },
          DblClick: function(e) {
            if((!this.Enabled)||(ngVal(this.ReadOnly,false))) return;
            if(!e) e={};
            e.Owner=this;
            if(this.OnDblClick) this.OnDblClick(e);
          }
        },
        Events: {
          OnClick: null,
          OnDblClick: null
        }
      });
      return ngCreateControlAsType(def, modtype, ref, parent);
    });


    function ngmod_AlignToSetBounds(bounds)
    {
      var changed=ng_CallParent(this,'SetBounds',arguments,false);
      if(changed) {
        var cid=ngVal(this.AlignToID,'');
        var dac=mods.AlignedControls ? mods.AlignedControls[cid] : null;
        if(ng_IsArrayVar(dac)) {
          var ac;
          for(var i=0;i<dac.length;i++) {
            ac=dac[i];
            if(typeof ac.DoAlignToBounds==='function') ac.DoAlignToBounds();
            ac.ModAlignToBoundsChanged=true;
          }
        }
        this.ModAlignToBoundsChanged=true;
      }
      return changed;
    }

    function ngmod_AlignToUpdate(recursive)
    {
      ng_CallParent(this,'Update',arguments);
      if(this.ModAlignToBoundsChanged) {
        delete this.ModAlignToBoundsChanged;
        var cid=ngVal(this.AlignToID,'');
        var dac=mods.AlignedControls ? mods.AlignedControls[cid] : null;
        if(ng_IsArrayVar(dac)) {
          var ac;
          for(var i=0;i<dac.length;i++) {
            ac=dac[i];
            if((ac.ModAlignToBoundsChanged)&&(typeof ac.Update==='function')) {
              delete ac.ModAlignToBoundsChanged;
              ac.Update();
            }
          }
        }
      }
    }

    ngRegisterControlMod('modAlignTo', function(def, ref, parent, modtype) {
      ng_MergeDef(def, {
        Data: {
          AlignToControl: null,
          AlignToBounds: {
            LtoL: false,
            LtoR: false,
            TtoT: false,
            TtoB: false,
            RtoR: false,
            RtoL: false,
            BtoB: false,
            BtoT: false,
            W: false,
            H: false
          }
        },
        Methods: {
          DoCreate: function(def, ref, elm, parent)
          {
            if(this.AlignToControl) {
              var ac=this.AlignToControl;
              this.AlignToControl=null;
              this.SetAlignToControl(ac);
            }
            ng_CallParent(this,'DoCreate',arguments);
          },
          DoDispose: function()
          {
            this.SetAlignToControl(null);
            return true;
          },
          Align: function(o) {
            var r=ng_CallParent(this,'Align',arguments,0);
            if((ngIsControl(this.AlignToControl))&&(ng_IsObjVar(this.AlignToBounds))) {
              var po=this.AlignToControl.Elm();
              if(po) {
                var pret=0;
                var l=po.getAttribute('FL');
                var r=po.getAttribute('FR');
                var t=po.getAttribute('FT');
                var b=po.getAttribute('FB');
                if((!ng_nullAttr(l))&&(!ng_nullAttr(r))) pret|=4;
                else
                {
                  if(!ng_nullAttr(r)) pret|=1;
                  else
                  {
                    if((po.style.left!='')&&(po.style.right!='')) pret|=4;
                    else if(po.style.right!='') pret|=1;
                  }
                }

                if((!ng_nullAttr(t))&&(!ng_nullAttr(b))) pret|=8;
                else
                {
                  if(!ng_nullAttr(b)) pret|=2;
                  else
                  {
                    if((po.style.top!='')&&(po.style.bottom!='')) pret|=8;
                    else if(po.style.bottom!='') pret|=2;
                  }
                }
                r|=pret;
                if(pret) ng_StartAutoResize(o,'modalignto');
                else ng_EndAutoResize(o,'modalignto');
              }
            }
            else ng_EndAutoResize(o,'modalignto');
            return r;
          },
          DoAlignToBounds: function()
          {
            if(this.InAlignToBounds) return false;
            var ab=this.AlignToBounds;
            if(!ng_IsObjVar(ab)) return false;
            var ac=this.AlignToControl;
            if(!ngIsControl(ac)) return false;
            var o=this.Elm();
            o=o ? o.parentNode : null;
            var po=ac.Elm();
            if((!o)||(!po)) return false;

            var changed=false;
            this.InAlignToBounds=true;
            try {
              var bounds={};

              var pos,ppos;
              var ow,oh;
              var pw,ph;
              function relpos()
              {
                if(typeof pos==='undefined') pos=ng_ParentPosition(o);
                if(typeof ppos==='undefined') ppos=ng_ParentPosition(po);
              }

              function width()
              {
                if(typeof ow==='undefined') ow=ng_ClientWidth(po);
                return ow;
              }

              function height()
              {
                if(typeof oh==='undefined') oh=ng_ClientHeight(po);
                return oh;
              }

              function parent_width()
              {
                if(typeof pw==='undefined') pw=ng_ClientWidthEx(o);
                return pw;
              }

              function parent_height()
              {
                if(typeof ph==='undefined') ph=ng_ClientHeightEx(o);
                return ph;
              }

              function Lleft() {
                relpos();
                return ppos.x-pos.x;
              }

              function Rleft() {
                return Rright()+width();
              }

              function Lright() {
                return Lleft()+width();
              }

              function Rright() {
                return parent_width()-Lright();
              }

              function Ttop() {
                relpos();
                return ppos.y-pos.y;
              }

              function Btop() {
                return Bbottom()+height();
              }

              function Tbottom() {
                return Ttop()+height();
              }

              function Bbottom() {
                return parent_height()-Tbottom();
              }

              if(ab.LtoL) bounds.L=Lleft();
              if(ab.LtoR) bounds.L=Lright();
              if(ab.RtoL) bounds.R=Rleft();
              if(ab.RtoR) bounds.R=Rright();

              if(ab.TtoT) bounds.T=Ttop();
              if(ab.TtoB) bounds.T=Tbottom();
              if(ab.BtoT) bounds.B=Btop();
              if(ab.BtoB) bounds.B=Bbottom();

              if(ab.W) {
                if(po.style.width!='') bounds.W=ng_StyleWidth(po);
                else {
                  var w=width();
                  var p=ng_GetCurrentStylePx(po,'padding-left'); if(p>0) w-=p;
                      p=ng_GetCurrentStylePx(po,'padding-right'); if(p>0) w-=p;
                  bounds.W=w;
                }
              }
              if(ab.H) {
                if(po.style.height!='') bounds.H=ng_StyleHeight(po);
                else {
                  var h=height();
                  var p=ng_GetCurrentStylePx(po,'padding-top'); if(p>0) h-=p;
                      p=ng_GetCurrentStylePx(po,'padding-bottom'); if(p>0) h-=p;
                  bounds.H=h;
                }
              }

              if(!ng_EmptyVar(bounds)) {
                changed=this.SetBounds(bounds);
              }
            } finally {
              this.InAlignToBounds=false;
            }
            return changed;
          },
          DoUpdate: function(o)
          {
            delete this.ModAlignToBoundsChanged;
            this.DoAlignToBounds();
            return ng_CallParent(this,'DoUpdate',arguments,true);
          },
          SetAlignToControl: function(c)
          {
            if(c==='') c=null;

            var oc=this.AlignToControl;
            if(oc===c) return;

            var cid,oid;
            if(ngIsControl(c)) cid=ngVal(c.AlignToID,'');
            else cid=c ? ngNullVal(c,'') : '';

            if(ngIsControl(oc)) {
              oid=ngVal(oc.AlignToID,'');
              if(cid===oid) return;
              // remove alignment
              oc.SetBounds.removeOverride(ngmod_AlignToSetBounds);
              oc.Update.removeOverride(ngmod_AlignToUpdate);
            }
            else oid=oc ? ngNullVal(oc,'') : '';

            if((oid!=='')&&(cid!==oid))
            {
              if(mods.AlignedControls) {
                var dac=mods.AlignedControls[oid];
                if(ng_IsArrayVar(dac)) {
                  for(var i=dac.length-1;i>=0;i--) if(dac[i]===this) dac.splice(i,1);
                  if(!dac.length) delete mods.AlignedControls[oid];
                }
              }
            }
            if(cid!=='') {
              if(!ng_IsArrayVar(mods.AlignedControls[cid])) mods.AlignedControls[cid]=[];
              var dac=mods.AlignedControls[cid];
              for(var i=dac.length-1;i>=0;i--) if(dac[i]===this) break;
              if(i<0) dac.push(this);

              var ac=mods.AlignToControls[cid];
              if(ngIsControl(ac)) c=ac;
            }
            if(c===this) {
              ngDEBUGERROR(c.ID+': Cannot align to myself!',c);
              c=null;
            }
            this.AlignToControl=c;
            if(ngIsControl(c))
            {
               // add alignment
               ng_OverrideMethod(c,'SetBounds',ngmod_AlignToSetBounds);
               ng_OverrideMethod(c,'Update',ngmod_AlignToUpdate);
               this.DoAlignToBounds();
            }
          }
        }
      });
      return ngCreateControlAsType(def, modtype, ref, parent);
    });
  }
};
