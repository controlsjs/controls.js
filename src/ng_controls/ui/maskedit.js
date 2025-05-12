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

if (typeof(ngUserControls)==='undefined') ngUserControls = {};
ngUserControls['maskedit'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    var ns = this;

    /*  Class: ngMaskEdit
     *  Standard mask edit control (based on <ngToolBar>).
     */
    ngRegisterControlType('ngMaskEdit', function(def, ref, parent) {
      if (typeof(def.Data)==='undefined') def.Data = new Object();
      var mask             = ngVal(def.Data.Mask, '');
      var lockHintCaretPos = ngVal(def.Data.LockHintCaretPos, false);

      ng_MergeDef(def, {
        ParentReferences: false,
        Data: {
          Vertical: true,
          LeftDef: {
            Type: 'ngEdit'
          },
          EditDef: {
            Type: 'ngEdit',
            Data: {
              LockHintCaretPos: lockHintCaretPos,
              TextAlign: 'right'
            }
          },
          StaticDef: {
            Type: 'ngEdit'
          },
          RightDef: {
            Type: 'ngEdit'
          }
        }
      });

      def.OnCreated = ngAddEvent(def.OnCreated, function (c, ref) {
        c.SetMask(mask);
        if(typeof c.Text!=='undefined') {
          c.SetText(c.Text);
          delete c.Text;
        }
        return true;
      });

      if (((typeof(def.W)==='undefined') && ((typeof(def.L)==='undefined') || (typeof(def.R)==='undefined'))) && (typeof(def.Data.AutoSize)==='undefined'))
        def.Data.AutoSize=true;

      var c = ngCreateControlAsType(def, 'ngToolBar', ref, parent);
      if (!c) return c;

      c.AddEvent('OnUpdated', function(c, elm) {
        var lw=0,rw=0;
        var lh=c.Controls.LeftHolder;
        var rh=c.Controls.RightHolder;
        if(lh)
        {
          if(lh.LeftImg)  lw+=ngVal(lh.LeftImg.W,0);
          if(lh.RightImg) lw+=ngVal(lh.RightImg.W,0);
        }
        if(rh)
        {
          if(rh.LeftImg)  rw+=ngVal(rh.LeftImg.W,0);
          if(rh.RightImg) rw+=ngVal(rh.RightImg.W,0);
        }
        if(!c.AutoSize)
        {
          var o=c.Elm();
          ng_BeginMeasureElement(o);
          try
          {
            var mw=ng_ClientWidth(o);
            for (var i in c.Controls)
            {
              if(ngVal(c.Controls[i].MaskType,'')=='') continue;
              mw-=ng_ClientWidth(c.Controls[i].Elm());
            }
            if((c.TextAlign=='right')&&(lh))
            {
              if(lh.SetBounds({W: mw-rw})) lh.Update();
            } else
            {
              if((c.TextAlign=='center')&&(lh)&&(rh))
              {
                var mw2=Math.round(mw/2);
                if(lh.SetBounds({W: mw2-rw})) lh.Update();
                if(rh.SetBounds({W: (mw-mw2)-lw})) rh.Update();
              } else if((rh)&&(rh.SetBounds({W: mw-lw}))) rh.Update();
            }
          } finally { ng_EndMeasureElement(o); }
        } else
        {
          if((lh)&&(lh.SetBounds({W: lw}))) lh.Update();
          if((rh)&&(rh.SetBounds({W: rw}))) rh.Update();
        }
      });

      /*
       *  Group: Properties
       */
      /*  Variable: Mask
       *  ...
       *  Type: string
       *  Default value: (empty string)
       */
      c.Mask = '';
      /*  Variable: TextAlign
       *  ...
       *  Type: string
       *  Default value: *left*
       */
      c.TextAlign = 'left';
      /*  Variable: AutoSize
       *  ...
       *  Type: bool
       *  Default value: (undefined)
       */
      c.AutoSize = void 0;
      /*  Variable: CharWidth
       *  ...
       *  Type: int
       *  Default value: *10*
       */
      c.CharWidth = 10;

      /*  Variable: PartWidths
       *  ...
       *  Type: array
       *  Default value: *new Array()*
       */
      c.PartWidths = new Array();

      /*  Variable: PartDefaultValues
       *  ...
       *  Type: array
       *  Default value: *new Array()*
       */
      c.PartDefaultValues = new Array();

      /*  Variable: PartInitValues
       *  ...
       *  Type: array/string
       *  Default value: *new Array()*
       */
      c.PartInitValues = new Array();

      /*  Variable: DefaultValuesAsHint
       *  ...
       *  Type: bool
       *  Default value: *true*
       */
      c.DefaultValuesAsHint = true;

      /*  Variable: PartDefs
       *  ...
       *  Type: array
       *  Default value: *new Array()*
       */
      c.PartDefs = new Array();

      /*  Variable: Invalid
       *  ...
       *  Type: bool
       *  Default value: *false*
       */
      c.Invalid = false;

      /*  Variable: LockHintCaretPos
       *  ...
       *  Type: bool
       *  Default value: *false*
       */
      c.LockHintCaretPos = false;

      //===== STANDARD METHODS =====

      /*
       *  Group: Methods
       */
      /*  Function: GetText
       *  ...
       *
       *  Syntax:
       *    string *GetText* ()
       *
       *  Returns:
       *    -
       */
      c.GetText = function () {
        if (c.OnGetText) return ngVal(c.OnGetText(c), '');
        if (this.IsEmpty()) return '';

        var parts = c.GetParts();

        var result = '';
        for (var i=0;i<parts.length;i++) result += parts[i].Text;

        return result;
      }

      /*  Function: SetText
       *  ...
       *
       *  Syntax:
       *    void *SetText* (string text)
       *
       *  Parameters:
       *    text - ...
       *
       *  Returns:
       *    -
       */
      c.SetText = function (text) {
        if (c.OnSetText) text = c.OnSetText(text, c);
        if (typeof(text)==='undefined') return;

        c.Clear();
        if (text=='') return;

        var edits = c.GetParts(-1, true);
        if (edits.length==0) return;

        var parts = ns.TextToParts(text,c.GetParts());
        if (parts.length==0) { edits[0].Control.SetText(text); return; }

        var nParts = new Array();
        for (var i=0;i<parts.length;i++) nParts.push((parts[i].Type=='Static' ? void 0 : parts[i].Text));
        c.SetParts(nParts);
      }

      /*  Function: SetFocus
       *  ...
       *
       *  Syntax:
       *    bool *SetFocus* ([bool state = true])
       *
       *  Parameters:
       *    state - ...
       *
       *  Returns:
       *    -
       */
      c.SetFocus = function (state) {
        state = ngVal(state, true);

        if (!state)
        {
          var parts = c.GetParts();
          for (var i=0;i<parts.length;i++) parts[i].Control.SetFocus(false);
        } else c.SetFocusPart(0, true);

        return true;
      }

      /*  Function: GetAlt
       *  ...
       */
      c.GetAlt = ngc_GetAlt;

      //===== CUSTOM METHODS =====

      /*  Function: Clear
       *  ...
       *
       *  Syntax:
       *    bool *Clear* ()
       *
       *  Returns:
       *    -
       */
      c.Clear = function () {
        var parts = c.GetParts(-1, true);
        for (var i=0;i<parts.length;i++) parts[i].Control.SetText('');

        c.Update();

        return true;
      }

      /*  Function: UseInitValues
       *  ...
       *
       *  Syntax:
       *    bool *UseInitValues* ()
       *
       *  Returns:
       *    -
       */
      c.UseInitValues = function () {
        if (ng_typeString(c.PartInitValues)) { c.SetText(c.PartInitValues); return true; }
        if (!ng_typeArray(c.PartInitValues)) return false;

        if (c.PartInitValues.length>0)
        {
          var parts = c.GetParts(-1, true);
          for (var i=0;i<parts.length;i++) if (typeof(c.PartInitValues[parts[i].ID])!=='undefined') parts[i].Control.SetText(c.PartInitValues[parts[i].ID]);
          c.Update();
        }

        return true;
      }

      /*  Function: GetParts
       *  ...
       *
       *  Syntax:
       *    array *GetParts* ([int id = -1, bool editOnly = false])
       *
       *  Parameters:
       *    id - id>=0 (-1 for all parts)
       *    editOnly - ...
       *
       *  Returns:
       *    -
       */
      c.GetParts = function (id, editOnly) {
        id       = ngVal(id, -1);
        editOnly = ngVal(editOnly, false);

        var maskType, text, result = new Array();
        for (var i in c.Controls)
        {
          maskType = ngVal(c.Controls[i].MaskType, '');
          if ((maskType=='') || ((editOnly) && (maskType!='Edit'))) continue;

          var rawText = ngVal(c.Controls[i].GetText(), '');
          var text    = (((rawText=='') && (typeof(c.Controls[i].DefaultValue)!=='undefined')) ? c.Controls[i].DefaultValue : rawText);

          if ((id==-1) || (id==c.Controls[i].MaskID)) result.push(new Object({
            ID: c.Controls[i].MaskID,
            Type: maskType,
            Mask: c.Controls[i].MaskDef,
            RegExp: c.Controls[i].MaskRegExp,

            Text: text,
            RawText: rawText,
            DefaultValue: c.Controls[i].DefaultValue,

            Control: c.Controls[i]
          }));
          if (id==c.Controls[i].MaskID) break;
        }

        return result;
      }

      /*  Function: SetParts
       *  ...
       *
       *  Syntax:
       *    bool *SetParts* (mixed parts [, int id = -1])
       *
       *  Parameters:
       *    parts - array/string
       *    id - id>=0 (-1 for all parts)
       *
       *  Returns:
       *    -
       */
      c.SetParts = function (parts, id) {
        if (typeof(parts)==='undefined') return false;
        if (ng_typeString(parts)) parts = new Array(parts);
        id = ngVal(id, -1);

        var cParts = c.GetParts(id);
        if (id>-1)
        {
          if (cParts.length==0) return false;
          cParts[0].Control.SetText(parts[0]);
        } else for (var i=0;i<cParts.length;i++) if (typeof(parts[cParts[i].ID])!=='undefined') cParts[i].Control.SetText(parts[cParts[i].ID]);
        c.Update();

        return true;
      }

      /*  Function: SetFocusPart
       *  ...
       *
       *  Syntax:
       *    bool *SetFocusPart* (int id [, bool state = true])
       *
       *  Parameters:
       *    id - id>=0
       *    state - ...
       *
       *  Returns:
       *    -
       */
      c.SetFocusPart = function (id, state) {
        if ((typeof(id)==='undefined') || (id<0)) return false;
        state = ngVal(state, true);

        var parts = c.GetParts(id);
        if (parts.length==0) return false;

        parts[0].Control.SetFocus(state);

        return true;
      }

      /*  Function: SetMask
       *  ...
       *
       *  Syntax:
       *    bool *SetMask* (string mask)
       *
       *  Parameters:
       *    mask - ...
       *
       *  Mask:
       *    0 - required digit [0-9]
       *    9 - optional digit [0-9]
       *    C - required letter [A-Za-z]
       *    X - optional letter [A-Za-z]
       *    A - required uppercase letter [A-Z]
       *    a - required lowercase letter [a-z]
       *    Z - optional uppercase letter [A-Z]
       *    z - optional lowercase letter [a-z]
       *    ! - required char
       *    ? - optional char
       *    \ - escape char
       *
       *  Returns:
       *    -
       */
      c.SetMask = function (mask) {
        if (c.OnSetMask) mask = c.OnSetMask(mask, c);
        if (typeof(mask)==='undefined') return false;
        c.Mask = mask;

        var parts = ns.MaskToParts(mask);
        for (var i=0;i<parts.regexp.length;i++) parts.regexp[i] = '^' + parts.regexp[i] + '$';

        //Vytvoreni komponent
        c.Controls.Dispose();

        var doUpdatePartImages = function(){
          if(!c._ignoreImagesUpdate){
            var oldCFocus = this.ControlHasFocus;
            var oldFocus = this.HasFocus;

            this.ControlHasFocus = !!c.ControlHasFocus;
            this.HasFocus = !!c.ControlHasFocus;

            this.DoUpdateImages.callParent();
            this.ControlHasFocus = oldCFocus;
            this.HasFocus = oldFocus;
          }
        };

        var updatePart = function(recursive){
          var oldCFocus = this.ControlHasFocus;
          var oldFocus = this.HasFocus;

          this.ControlHasFocus = !!c.ControlHasFocus;
          this.HasFocus = !!c.ControlHasFocus;

          this.Update.callParent(recursive);
          this.ControlHasFocus = oldCFocus;
          this.HasFocus = oldFocus;
        };

        function doUpdateHideInput(o) {
          var ret=ng_CallParent(this,'DoUpdate',arguments,true);
          if(ret) {
            var o2=document.getElementById(this.ID+'_T');
            if(o2) o2.style.visibility='hidden';
          }
          return ret;
        }

        var def = new Object();
        if (c.OnCreateLeftHolder) c.OnCreateLeftHolder(c, def);
        ng_MergeDef(def, c.LeftDef);
        ng_MergeDef(def, {
          W: 0,
          Data: {
            Enabled: c.Enabled,
            ReadOnly: true
          },
          Events: {
            DoMouseEnter: function (e) {
              if (e) this.Owner.Owner.handleEnterLeave(this, e, 'enter');
            },
            DoMouseLeave: function (e) {
              if (e) this.Owner.Owner.handleEnterLeave(this, e, 'leave');
            }
          },
          Methods: {
            Update: updatePart,
            DoUpdateImages: doUpdatePartImages,
            DoUpdate: doUpdateHideInput
          }
        });
        c.Controls.AddControls({ LeftHolder: def });

        var component, partWidth, partMaskLength, partDefaultValue, partInfo;
        for (var i=0;i<parts.mask.length;i++)
        {
          component = new Object();
          def       = new Object();

          if (c.OnCreatePart)
          {
            partInfo = {
              ID: i,
              Type: parts.type[i],
              Mask: parts.mask[i],
              RegExp: parts.regexp[i]
            };
            c.OnCreatePart(c, partInfo, def, parts);
          }
          if (i<c.PartDefs.length) ng_MergeDef(def, c.PartDefs[i]);
          ng_MergeDef(def, parts.type[i]=='Edit' ? c.EditDef : c.StaticDef);

          partMaskLength = parts.mask[i].length;

          if (i<c.PartWidths.length) partWidth = c.PartWidths[i];
          else partWidth = void 0;

          if (i<c.PartDefaultValues.length) partDefaultValue = c.PartDefaultValues[i];
          else partDefaultValue = void 0;

          if (parts.type[i]=='Edit')
          {
            if (typeof(partWidth)==='undefined') partWidth = partMaskLength*c.CharWidth;
            ng_MergeDef(def, {
              Data: {
                SelectOnFocus: true,
                MaxLength: partMaskLength
              },
              Methods: {
                DoFocus: function(e,elm){
                  c._ignoreImagesUpdate = true;
                  this.DoFocus.callParent(e,elm);
                  c._ignoreImagesUpdate = false;
        
                  this.Owner.Owner.last_focused_edit=this.MaskID;
                  var self = this;
                  if(e) ngApp.InvokeLater(function(){
                    self.Owner.Owner.DoFocus(e,elm);
                  });
                },
                DoBlur: function(e, elm){
                  c._ignoreImagesUpdate = true;
                  this.DoBlur.callParent(e,elm);
                  c._ignoreImagesUpdate = false;
        
                  var self = this;
                  if(e) ngApp.InvokeLater(function(){
                    self.Owner.Owner.DoBlur(e,elm);
                  });
                }
              }
            });
          } else
          {
            ng_MergeDef(def, {
              Data: {
                Text: parts.mask[i],
                ReadOnly: true,
                TextAlign: 'center'
              },
              Methods: {
                DoFocus: function(e,elm){
                  var maskEdit = this.Owner.Owner;
                  var focusid=this.MaskID+1;
                  if((typeof maskEdit.last_focused_edit!=='undefined')&&(maskEdit.last_focused_edit===focusid)) focusid=this.MaskID-1;
                  var parts = maskEdit.GetParts(focusid,true);
                  if(!parts.length) {
                    if(focusid===this.MaskID-1) focusid=this.MaskID+1;
                    else focusid=this.MaskID-1;
                    parts = maskEdit.GetParts(focusid,true);
                  }
                  if(parts.length > 0){maskEdit.SetFocusPart(parts[0].ID);}
                }
              }
            });
          }

          ng_MergeDef(def, {
            W: partWidth,
            Data: {
              Enabled: c.Enabled,
              Hint: (c.DefaultValuesAsHint ? partDefaultValue : ''),

              MaskID: i,
              MaskType: parts.type[i],
              MaskDef: parts.mask[i],
              MaskRegExp: parts.regexp[i],

              DefaultValue: partDefaultValue
            },
            Events: {
              OnKeyDown: function (e, elm) {
                if ((typeof(e)==='undefined') || (typeof(e.Owner.GetCaretPos)==='undefined') || (ngiOS)) return false;
                e.Owner.cursorPos = e.Owner.GetCaretPos();
                if((e.keyCode==KEY_BACK)&&(e.Owner.HintVisible)) { 
                  e.Owner.backHintVisible=true; 
                  if(e.preventDefault)
                    e.preventDefault();
                  else
                    e.returnValue = false;
                  return false; 
                }
                return true;
              },
              OnKeyUp: function (e, elm) {
                if ((typeof(e)==='undefined') || (typeof(e.Owner.GetCaretPos)==='undefined') || (typeof(e.Owner.SetCaretPos)==='undefined') || (typeof(e.Owner.cursorPos)==='undefined') || (ngiOS)) return false;

                var c         = e.Owner;
                var ctrl      = c.Owner.Owner;
                var oldCurPos = c.cursorPos;
                var newCurPos = c.GetCaretPos();
                var textLen   = c.GetText().length;

                var partID, part, parts;
                var caretPos = 0;

                switch (e.keyCode)
                {
                  case KEY_END:
                  case KEY_HOME:
                    parts = ctrl.GetParts(-1, true);
                    if (parts.length==0) break;

                    part = (e.keyCode==KEY_END ? parts[parts.length-1] : parts[0]);
                    var pc = part.Control;

                    var sof=pc.SelectOnFocus;
                    pc.SelectOnFocus=false;
                    try {
                      ctrl.SetFocusPart(part.ID);
                      if (e.keyCode==KEY_END) caretPos = (pc.HintVisible ? pc.GetHint() : pc.GetText()).length;
                      pc.SetCaretPos(caretPos);
                    } finally {
                      pc.SelectOnFocus=sof;
                    }
                    break;
                  case KEY_BACK:
                    if(c.backHintVisible) oldCurPos=newCurPos;
                    delete c.backHintVisible;
                  case KEY_LEFT:
                  case KEY_RIGHT:
                    if (oldCurPos==newCurPos)
                    {
                      var direction = ((e.keyCode==KEY_RIGHT) ? 'R' : 'L');

                      if (((newCurPos==0)       || (c.HintVisible)) && (direction=='L')) partID = c.MaskID-2;
                      if (((newCurPos>=textLen) || (c.HintVisible)) && (direction=='R')) partID = c.MaskID+2;

                      if(typeof partID==='undefined') break;

                      parts = ctrl.GetParts(partID);
                      if (parts.length==0) break;

                      if (typeof(parts[0])==='undefined') break;
                      var pc = parts[0].Control;

                      var sof=pc.SelectOnFocus;
                      pc.SelectOnFocus=false;
                      try {
                        ctrl.SetFocusPart(partID);

                        if (direction=='L') caretPos = (pc.HintVisible ? pc.GetHint() : pc.GetText()).length;
                        pc.SetCaretPos(caretPos);
                      } finally {
                        pc.SelectOnFocus=sof;
                      }
                    }
                  break;
                  default:
                    c.cursorPos = newCurPos;
                  break;
                }

                return (ctrl.LockHintCaretPos ? false : true);
              },
              OnTextChanged: function (o) {
                if (typeof(o)==='undefined') return false;

                if (c.OnTextChanged) c.OnTextChanged(c, o);

                if ((typeof(o.cursorPos)!=='undefined') && (!ngiOS))
                {
                  var ctrl    = o.Owner.Owner;
                  var maxLen  = o.MaskDef.length;
                  var textLen = o.GetText().length;

                  if ((textLen==maxLen) && (o.cursorPos>=textLen)) ctrl.SetFocusPart(o.MaskID+2);
                }

                if(o.AutoSize) o.Update();

                return true;
              },
              DoMouseEnter: function (e) {
                if (e) this.Owner.Owner.handleEnterLeave(this, e, 'enter');
              },
              DoMouseLeave: function (e) {
                if (e) this.Owner.Owner.handleEnterLeave(this, e, 'leave');
              }
            },
            Methods: {
              Update: updatePart,
              DoUpdateImages: doUpdatePartImages
            }
          });

          def.OnCreated = ngAddEvent(def.OnCreated, function (pc, ref) {

            if(pc.CtrlType==='ngEdit')
            {
              if((typeof pc.AutoSize==='undefined')&&(typeof pc.Bounds.W === 'undefined')&&((typeof pc.Bounds.L === 'undefined')||(typeof pc.Bounds.R === 'undefined'))) {
                pc.AutoSize=true;
              }
              ng_OverrideMethod(pc, 'DoUpdate', function(o)
              {
                if(this.AutoSize)
                {
                  if(!ng_CallParent(this,'DoUpdate',arguments,true)) return false;
                  var text=this.GetText();
                  var tw=0;
                  // Measure text
                  if(text!='')
                  {
                    var cls=this.GetClassName('Input',false);
                    if((text!==this.autosize_text)||(cls!==this.autosize_class)) {
                      var nd=document.createElement('div');
                      nd.style.position="absolute";
                      o.appendChild(nd);
                      nd.className=cls;
                      ng_SetInnerHTML(nd,ngHtmlVal(text.replace(/\r\n|[\r\n]/g, ''),false));
                      ng_BeginMeasureElement(nd);
                      this.autosize_textwidth=ng_OuterWidth(nd);
                      ng_EndMeasureElement(nd);
                      o.removeChild(nd);
                      this.autosize_text=text;
                      this.autosize_class=cls;
                    }
                    tw+=this.autosize_textwidth;
                  }
                  var dp,image;
                  if(this.OnGetImg) image=this.OnGetImg(this, 0);
                  else image=this.LeftImg;
                  if(image) {
                    dp=ngc_ImgProps(this.ID+'_IL', (this.ControlHasFocus ? 1 : 0), this.Enabled, image);
                    if(dp) tw+=ngVal(dp.W,0);
                  }
                  if(this.OnGetImg) image=this.OnGetImg(this, 2);
                  else image=this.RightImg;
                  if(image) {
                    dp=ngc_ImgProps(this.ID+'_IL', (this.ControlHasFocus ? 1 : 0), this.Enabled, image);
                    if(dp) tw+=ngVal(dp.W,0);
                  }                    
                  this.SetBounds({W: tw + 2});
                }
                return ng_CallParent(this,'DoUpdate',arguments,true);
              });
            }

            if (!pc.OnGetAlt)
            {
              pc.OnGetAlt = function (o) {
                if (typeof(o)==='undefined') return '';

                var alt = ngVal(o.Alt, '');
                if (alt!='') return alt;

                return ngVal(c.GetAlt(), '');
              }
            }

            return true;
          });

          component[parts.type[i]+'_'+i] = def;
          c.Controls.AddControls(component);
        }

        def = new Object();
        if (c.OnCreateRightHolder) c.OnCreateRightHolder(c, def);
        ng_MergeDef(def, c.RightDef);
        ng_MergeDef(def, {
          W: 0,
          Data: {
            Enabled: c.Enabled,
            ReadOnly: true
          },
          Events: {
            DoMouseEnter: function (e) {
              if (e) this.Owner.Owner.handleEnterLeave(this, e, 'enter');
            },
            DoMouseLeave: function (e) {
              if (e) this.Owner.Owner.handleEnterLeave(this, e, 'leave');
            }
          },
          Methods: {
            Update: updatePart,
            DoUpdateImages: doUpdatePartImages,
            DoUpdate: doUpdateHideInput
          }
        });

        c.Controls.AddControls({ RightHolder: def });
        c.Update();

        c.UseInitValues();

        return true;
      }

      /*  Function: IsValid
       *  ...
       *
       *  Syntax:
       *    bool *IsValid* ([string text = null, bool asArray = false])
       *
       *  Parameters:
       *    text - ...
       *    asArray - ...
       *
       *  Returns:
       *    -
       */
      c.IsValid = function (text, asArray) {
        asArray  = ngVal(asArray, false);

        var parts = c.GetParts();
        if (parts.length==0) return false;

        if(ng_typeString(text)) parts = ns.TextToParts(text,parts);

        var result = new Array();
        var re, test;
        for (var i=0;i<parts.length;i++)
        {
          if (parts[i].Type=='Static') { result.push(void 0); continue; }

          re   = new RegExp(parts[i].RegExp);
          test = re.test(parts[i].Text);
          result.push(test);
        }

        if (asArray) return result;
        for (var i=0;i<result.length;i++) if (result[i]===false) return false;

        return true;
      }

      /*  Function: IsEmpty
       *  ...
       *
       *  Syntax:
       *    bool *IsEmpty* ([bool defaultValueIsEmpty = false, int part = -1, bool asArray = false])
       *
       *  Parameters:
       *    defaultValueIsEmpty - ...
       *    part - part>=0 (-1 for all parts)
       *    asArray - ...
       *
       *  Returns:
       *    -
       */
      c.IsEmpty = function (defaultValueIsEmpty, part, asArray) {
        defaultValueIsEmpty = ngVal(defaultValueIsEmpty, false);
        part                = ngVal(part, -1);
        asArray             = ngVal(asArray, false);

        var parts = c.GetParts(part);
        if (parts.length==0) return false;

        var result = new Array();
        for (var i=0;i<parts.length;i++)
        {
          if (parts[i].Type=='Static') { result.push(void 0); continue; }

          if ((!defaultValueIsEmpty) || (typeof(parts[i].DefaultValue)==='undefined')) result.push(parts[i].RawText=='' ? true : false);
          else result.push(((parts[i].RawText=='') || (parts[i].RawText==parts[i].DefaultValue)) ? true : false);
        }

        if (asArray) return result;
        for (var i=0;i<result.length;i++) if (result[i]===false) return false;

        return true;
      }

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
      c.SetInvalid = function (state, update) {
        state  = ngVal(state, true);
        update = ngVal(update, true);

        if (c.Invalid==state) return true;
        if ((c.OnSetInvalid) && (!ngVal(c.OnSetInvalid(c, state, update), false))) return false;

        c.Invalid = state;
        if (typeof(c.DoSetInvalid)==='function')
        {
          c.DoSetInvalid(c.Controls.LeftHolder, state, update);
          c.DoSetInvalid(c.Controls.RightHolder, state, update);
        }
        c.SetInvalidPart(-1, state, update);

        return true;
      }

      /*  Function: SetInvalidPart
       *  Sets invalid state of part of control.
       *
       *  Syntax:
       *    bool *SetInvalidPart* (int part [, bool state = true, bool update = true])
       *
       *  Parameters:
       *    part - part>=0 (-1 for all parts)
       *    state - ...
       *    update - ...
       *
       *  Returns:
       *    -
       */
      c.SetInvalidPart = function (part, state, update) {
        if (typeof(part)==='undefined') return false;
        state  = ngVal(state, true);
        update = ngVal(update, true);

        if ((c.OnSetInvalidPart) && (!ngVal(c.OnSetInvalidPart(c, part, state, update), false))) return false;

        if (typeof(c.DoSetInvalid)==='function')
        {
          var parts = c.GetParts(part);
          for (var i=0;i<parts.length;i++) c.DoSetInvalid(parts[i].Control, state, update);
        }

        return true;
      }

      c.DoFocus = function(e,elm){
        var parts = this.GetParts();
        var partHasFocus = false;

        for(var i in parts){
          var part = parts[i];
          var ctrl = part.Control;

          if(ctrl.ControlHasFocus || ctrl.HasFocus){
            partHasFocus = true;
          }
        }

        if(!partHasFocus || this.ControlHasFocus){return;}
        this.ControlHasFocus = true;

        this.DoUpdateImages();

        if((this.OnFocus)&&(this.Enabled)){
          this.OnFocus(this);
        }
      };

      c.DoBlur = function(e,elm){
        var parts = this.GetParts();
        var partHasFocus = false;

        for(var i in parts){
          var part = parts[i];
          var ctrl = part.Control;

          if(ctrl.ControlHasFocus || ctrl.HasFocus){
            partHasFocus = true;
          }
        }

        if(partHasFocus || !this.ControlHasFocus){return;}
        this.ControlHasFocus = false;

        this.DoUpdateImages();

        if((this.OnBlur)&&(this.Enabled)){
          this.OnBlur(this);
        }
        delete this.last_focused_edit;
      };

      c.DoUpdateImages = function(){
        var parts = this.GetParts();
        parts.push({ Control: this.Controls.LeftHolder });
        parts.push({ Control: this.Controls.RightHolder });

        for(var i in parts){
          var ctrl = parts[i].Control;

          if(ctrl.DoUpdateImages){
            ctrl.DoUpdateImages();
          }
        }
      };

      //===== HELPER METHODS =====

      c.handleEnterLeave = function (o, e, type) {
        if ((typeof(o)==='undefined') || (typeof(e)==='undefined') || (typeof(type)==='undefined')) return false;
        type = type.toLowerCase();

        var parts = o.Owner.Owner.GetParts();
        parts.push({ Control: o.Owner.LeftHolder });
        parts.push({ Control: o.Owner.RightHolder });

        for (var i=0;i<parts.length;i++)
        {
          switch (type)
          {
            case 'enter':
              ngc_Enter(e, parts[i].Control.Elm(), parts[i].Control.CtrlType);
            break;
            case 'leave':
              ngc_Leave(e, parts[i].Control.Elm(), parts[i].Control.CtrlType);
            break;
            default:
              return false;
            break;
          }
        }

        return true;
      }

      //===== EVENTS =====

      /*
       *  Group: Events
       */
      /*
       *  Event: OnGetText
       */
      c.OnGetText = null;
      /*
       *  Event: OnSetText
       */
      c.OnSetText = null;
      /*
       *  Event: OnSetMask
       */
      c.OnSetMask = null;
      /*
       *  Event: OnTextChanged
       */
      c.OnTextChanged = null;
      /*
       *  Event: OnGetAlt
       */
      c.OnGetAlt = null;

      /*
       *  Event: OnSetInvalid
       */
      c.OnSetInvalid = null;
      /*
       *  Event: OnSetInvalidPart
       */
      c.OnSetInvalidPart = null;

      /*
       *  Event: OnCreatePart
       */
      c.OnCreatePart = null;
      /*
       *  Event: OnCreateLeftHolder
       */
      c.OnCreateLeftHolder = null;
      /*
       *  Event: OnCreateRightHolder
       */
      c.OnCreateRightHolder = null;

      /*
       *  Event: OnFocus
       */
      c.OnFocus = null;
      /*
       *  Event: OnBlur
       */
      c.OnBlur = null;

      return c;
    });

  },

  MaskToParts: function(mask) {
    //Zakladni nastaveni
    var editChars = new Array('0', '9', 'C', 'X', 'A', 'a', 'Z', 'z', '!', '?');
    var metaChars = new Array('\\', '^', '$', '.', '[', ']', '|', '(', ')', '?', '*', '+', '{', '}');
    var parts     = new Object({ mask: new Array(), type: new Array(), regexp: new Array() });
    var regExps   = new Object();

    regExps['0'] = '[0-9]{1}';
    regExps['9'] = '[0-9]?';

    regExps['C'] = '[A-Za-z]{1}';
    regExps['X'] = '[A-Za-z]?';

    regExps['A'] = '[A-Z]{1}';
    regExps['a'] = '[a-z]{1}';
    regExps['Z'] = '[A-Z]?';
    regExps['z'] = '[a-z]?';

    regExps['!'] = '.{1}';
    regExps['?'] = '.?';

    if(ng_typeString(mask)) {
      mask = mask.split('');

      //Parsovani masky
      var escapeNext = false;

      var part     = '';
      var lastPart = '';
      var lastIdx  = 0;
      for (var i=0;i<mask.length;i++)
      {
        if ((mask[i]=='\\') && (!escapeNext)) { escapeNext = true; continue; }

        if ((ng_inArray(mask[i], editChars)) && (!escapeNext)) part = 'Edit';
        else part = 'Static';

        if (lastPart=='') { parts.mask.push(''); parts.type.push(part); parts.regexp.push(''); }

        if ((lastPart!='') && (lastPart!=part)) { lastIdx = parts.mask.push('')-1; parts.type.push(part); parts.regexp.push(''); }
        parts.mask[lastIdx] += mask[i];
        if (part=='Edit') parts.regexp[lastIdx] += regExps[mask[i]];
        else parts.regexp[lastIdx] += (!ng_inArray(mask[i], metaChars) ? mask[i] : '\\'+mask[i]);

        lastPart   = part;
        escapeNext = false;
      }
    }

    return parts;
  },

  TextToParts: function (text,parts) {
    if (typeof(text)==='undefined') return false;
    if ((!ng_typeArray(parts)) || (parts.length==0)) return false;

    var regExps = new Array();

    regExps[0] = '';
    for (var i=0;i<parts.length;i++) regExps[0] += '('+parts[i].RegExp.substring(1, parts[i].RegExp.length-1)+')';

    var regExp;
    for (var i=parts.length-1;i>=0;i-=2)
    {
      regExp = '';
      for (var j=0;j<=i;j++) regExp += (parts[j].Type=='Edit' ? '(.*)' : '('+parts[j].RegExp.substring(1, parts[j].RegExp.length-1)+')');

      if ((i==parts.length-1) && (parts[i].Type!='Edit')) i++;
      if ((i>0) || (regExp!='(.*)')) regExps.push(regExp);
    }

    var re, result;
    for (var i=0;i<regExps.length;i++)
    {
      regExps[i] = '^'+regExps[i]+'$';

      re     = new RegExp(regExps[i], 'g');
      result = re.exec(text);
      if (result) break;
    }

    if (!result) return new Array();

    result.shift();
    for (var i=0;i<parts.length;i++) parts[i].Text = result[i];

    return parts;
  },

  MaskToRegexp: function (mask) {
    var parts = this.MaskToParts(mask);
    var fullRegexp = '';

    for(var i in parts.regexp){
      var regexp = parts.regexp[i];
      if(ng_typeString(regexp)) fullRegexp += regexp;
    }

    return '^'+fullRegexp+'$';
  },

  ValidateText: function (text, mask) {
    if(!ng_typeString(text)) return false;

    var regexp = this.MaskToRegexp(mask);
    regexp = new RegExp(regexp, 'g');
    return !!regexp.exec(text);
  }
};
