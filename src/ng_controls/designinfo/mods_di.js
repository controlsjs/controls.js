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

if (typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['mods_designinfo'] = {
  OnControlCreated: function(def,c)
  {
    if((ngHASDESIGNINFO())&&(c)&&(!def.CtrlInheritanceDepth)&&(!ngIsSysControl(c)))
    {
      // modAlignTo
      ng_MergeVar(c.DesignInfo, {
        Properties: ng_diProperties({
          "Data": {
            "AlignToID": ng_diStringRefName({ Level: 'optional', Order: 0.8 })
          }
        })
      });
    }
  },

  OnFormEditorInit: function(FE)
  {
    var types = [
      // ngLayoutConstraintRef
      {
        TypeID: 'ngAlignToRef',
        TypeBase: 'string',
        Name: 'AlignTo ID',
        ShortName: 'ref',
        Basic: false,
        Options: {
          Editor: 'ngfeEditor_DropDown',
          EditorOptions: {
            Items: function(api) {
              var items=[];
              var actrls=ngUserControls['mods'] ? ngUserControls['mods'].AlignToControls : null;
              if(actrls) {
                for(var i in actrls) items.push(i);
              }
              items.sort();
              return items;
            }
          }
        }
      }
    ];
    FormEditor.RegisterPropertyType(types);
  },

  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('modCenter',function(d,c,ref) {
      return {
        ControlCategory: false,
        Properties: ng_diProperties({
          "L": { Level: 'optional' },
          "T": { Level: 'optional' },
          "R": { Level: 'optional' },
          "B": { Level: 'optional' },
          "Data": {
            "VCenter": ng_diBoolean(true, { Level: 'basic' }),
            "HCenter": ng_diBoolean(true, { Level: 'basic' }),
            "CenterOffsetX": ng_diInteger(0, { Level: 'basic' }),
            "CenterOffsetY": ng_diInteger(0, { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('modSizeLimit',function(d,c,ref) {
      return {
        ControlCategory: false,
        Properties: ng_diProperties({
          "Data": {
            "WMin": ng_diInteger(0, { Level: 'basic' }),
            "WMax": ng_diInteger(100, { Level: 'basic' }),
            "WAlign": ng_diStringValues('left', ['left','right'], { Level: 'basic' }),

            "HMin": ng_diInteger(0, { Level: 'basic' }),
            "HMax": ng_diInteger(100, { Level: 'basic' }),
            "HAlign": ng_diStringValues('top', ['top','bottom'], { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('modClickable',function(d,c,ref) {
      return {
        ControlCategory: false,
        Properties: ng_diProperties({
          "Events": {
            "OnClick": ng_diEvent('function(e) { }', { Level: 'basic' }),
            "OnDblClick": ng_diEvent('function(e) { }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('modAlignTo',function(d,c,ref) {
      return {
        ControlCategory: false,
        Properties: ng_diProperties({
          "Data": {
            "AlignToControl": ng_diType('ngAlignToRef', { Level: 'basic'}),
            "AlignToBounds": ng_diObject({
              "LtoR": ng_diBoolean(false, { Level: 'basic', Order: 0.5,   DisplayName: 'Left as right side of (LtoR)' }),
              "LtoL": ng_diBoolean(false, { Level: 'basic', Order: 0.502, DisplayName: 'Left as left side of (LtoL)' }),
              "TtoB": ng_diBoolean(false, { Level: 'basic', Order: 0.504, DisplayName: 'Top as bottom side of (TtoB)' }),
              "TtoT": ng_diBoolean(false, { Level: 'basic', Order: 0.506, DisplayName: 'Top as top side of (TtoT)' }),
              "RtoL": ng_diBoolean(false, { Level: 'basic', Order: 0.508, DisplayName: 'Right as left side of (RtoL)' }),
              "RtoR": ng_diBoolean(false, { Level: 'basic', Order: 0.510, DisplayName: 'Right as right side of (RtoR)' }),
              "BtoT": ng_diBoolean(false, { Level: 'basic', Order: 0.512, DisplayName: 'Bottom as top side of (BtoT)' }),
              "BtoB": ng_diBoolean(false, { Level: 'basic', Order: 0.514, DisplayName: 'Bottom as bottom side of (BtoB)' }),
              "W":    ng_diBoolean(false, { Level: 'basic', Order: 0.516, DisplayName: 'Width (W)' }),
              "H":    ng_diBoolean(false, { Level: 'basic', Order: 0.518, DisplayName: 'Height (H)' })
            }, { Level: 'basic' })
          }
        })
      };
    });
  }
};
