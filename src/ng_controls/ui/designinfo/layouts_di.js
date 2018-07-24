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

if (typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['layouts_designinfo'] = {

  OnFormEditorInit: function(FE)
  {
    var types = [
      // ngLayoutConstraintRef
      {
        TypeID: 'ngLayoutConstraintRef',
        TypeBase: 'string',
        Name: 'Layout ID',
        ShortName: 'ref',
        Basic: false,
        Options: {
          Editor: 'ngfeEditor_DropDown',
          EditorOptions: {
            Items: function(api) {
              var p=FormEditor.GetControlRefById(api.GetParentControlID());
              var items=[];
              if(p) {
                var cc=p.ChildControls;
                if((cc)&&(cc.length)) {
                  var lid,added={};
                  for(var i=0;i<cc.length;i++) {
                    lid=ngVal(cc[i].LayoutID,'');
                    if((lid!='')&&(!added[lid])) {
                      items.push(lid);
                      added[lid]=true;
                    }
                  }
                }
              }
              items.sort();
              return items;
            }
          }
        }
      },
      // ngLayoutConstraintGuideRef
      {
        TypeID: 'ngLayoutConstraintGuideRef',
        TypeBase: 'string',
        Name: 'Guideline',
        ShortName: 'gl',
        Basic: false,
        Options: {
          Editor: 'ngfeEditor_DropDown',
          EditorOptions: {
            Items: function(api) {
              var p=FormEditor.GetControlRefById(api.GetParentControlID());
              var items=[];
              if(p) {
                var cc=p.Guidelines;
                if((typeof cc==='object')&&(cc)) {
                  for(var i in cc) items.push(i);
                }
              }
              items.sort();
              return items;
            }
          }
        }
      },

      // ngLayoutConstraints
      {
        TypeID: 'ngLayoutConstraints',
        TypeBase: 'object',
        Name: 'ngLayoutConstraints',
        ShortName: 'con',
        Basic: false,
        Options: {
          Add: false,
          ObjectProperties: {
            "LtoL": ng_diMixed(['ngLayoutConstraintRef', ng_diArrayOf(ng_diType('ngLayoutConstraintRef', { Level: 'basic'}))], { Level: 'basic', Order: 0.5, DisplayName: 'Left as left side of (LtoL)' }),
            "LtoLMargin": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.501, DisplayName: 'Left as left side with margin (LtoLMargin)' }),
            "LtoR": ng_diMixed(['ngLayoutConstraintRef', ng_diArrayOf(ng_diType('ngLayoutConstraintRef', { Level: 'basic'}))], { Level: 'basic', Order: 0.502, DisplayName: 'Left as right side of (LtoR)' }),
            "LtoRMargin": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.503, DisplayName: 'Left as right side with margin (LtoRMargin)' }),
            "TtoT": ng_diMixed(['ngLayoutConstraintRef', ng_diArrayOf(ng_diType('ngLayoutConstraintRef', { Level: 'basic'}))], { Level: 'basic', Order: 0.504, DisplayName: 'Top as top side of (TtoT)' }),
            "TtoTMargin": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.505, DisplayName: 'Top as top side with margin (TtoTMargin)' }),
            "TtoB": ng_diMixed(['ngLayoutConstraintRef', ng_diArrayOf(ng_diType('ngLayoutConstraintRef', { Level: 'basic'}))], { Level: 'basic', Order: 0.506, DisplayName: 'Top as bottom side of (TtoB)' }),
            "TtoBMargin": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.507, DisplayName: 'Top as bottom side with margin (TtoBMargin)' }),
            "RtoR": ng_diMixed(['ngLayoutConstraintRef', ng_diArrayOf(ng_diType('ngLayoutConstraintRef', { Level: 'basic'}))], { Level: 'basic', Order: 0.508, DisplayName: 'Right as right side of (RtoR)' }),
            "RtoRMargin": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.509, DisplayName: 'Right as right side with margin (RtoRMargin)' }),
            "RtoL": ng_diMixed(['ngLayoutConstraintRef', ng_diArrayOf(ng_diType('ngLayoutConstraintRef', { Level: 'basic'}))], { Level: 'basic', Order: 0.510, DisplayName: 'Right as left side of (RtoL)' }),
            "RtoLMargin": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.511, DisplayName: 'Right as left side with margin (RtoLMargin)' }),
            "BtoB": ng_diMixed(['ngLayoutConstraintRef', ng_diArrayOf(ng_diType('ngLayoutConstraintRef', { Level: 'basic'}))], { Level: 'basic', Order: 0.512, DisplayName: 'Bottom as bottom side of (BtoB)' }),
            "BtoBMargin": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.513, DisplayName: 'Bottom as bottom side with margin (BtoBMargin)' }),
            "BtoT": ng_diMixed(['ngLayoutConstraintRef', ng_diArrayOf(ng_diType('ngLayoutConstraintRef', { Level: 'basic'}))], { Level: 'basic', Order: 0.514, DisplayName: 'Bottom as top side of (BtoT)' }),
            "BtoTMargin": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.515, DisplayName: 'Bottom as top side with margin (BtoTMargin)' }),

            "LMin":  ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.6,   DisplayName: 'Left no less then (LMin)' }),
            "LMax":  ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.601, DisplayName: 'Left no greater then (LMax)' }),
            "LMinR": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.602, DisplayName: 'Left no less from right then (LMinR)' }),
            "LMaxR": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.603, DisplayName: 'Left no greater from right then (LMaxR)' }),
            "TMin":  ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.604, DisplayName: 'Top no less then (TMin)' }),
            "TMax":  ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.605, DisplayName: 'Top no greater then (TMax)' }),
            "TMinB": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.606, DisplayName: 'Top no less from bottom then (TMinB)' }),
            "TMaxB": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.607, DisplayName: 'Top no greater from bottom then (TMaxB)' }),
            "RMin":  ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.608, DisplayName: 'Right no less then (RMin)' }),
            "RMax":  ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.609, DisplayName: 'Right no greater then (RMax)' }),
            "RMinL": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.610, DisplayName: 'Right no less from left then (RMinL)' }),
            "RMaxL": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.611, DisplayName: 'Right no greater from left then (RMaxL)' }),
            "BMin":  ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.612, DisplayName: 'Bottom no less then (BMin)' }),
            "BMax":  ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.613, DisplayName: 'Bottom no greater then (BMax)' }),
            "BMinT": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.614, DisplayName: 'Bottom no less from top then (BMinT)' }),
            "BMaxT": ng_diMixed(['bounds','ngLayoutConstraintGuideRef'], { Level: 'basic', Order: 0.615, DisplayName: 'Bottom no greater from top then (BMaxT)' })
          }
        }
      }
    ];
    FormEditor.RegisterPropertyType(types);
  },

  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngPageLayout',function(d,c,ref) {
      return {
        ControlCategory: 'Layout',
        IsContainer: true,

        NewControl: {
          Default: {
            Properties: {
              // TODO: Solve how to disable positioning and use default values
              "L": { Value: 0 },
              "T": { Value: 0 },
              "R": { Value: 0 },
              "B": { Value: 0 },
              "Pages": {
                ObjectProperties: {
                  "0": {
                    ObjectProperties: {
                      Text: { Value: 'Page 1', Type: 'string' }
                    }
                  }
                }
              }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "HiResControl": { Level: 'optional' },
            "PagesVisible": ng_diBoolean(false, { Level: 'optional' }),
            "PagesIndent": { Level: 'optional' },
            "PagesSize": { Level: 'optional' },
            "MaxRows": { Level: 'optional' },
            "PagesAlign": { Level: 'optional' },
            "PagesVAlign": { Level: 'optional' },
            "TextAlign": { Level: 'optional' },
            "HTMLEncode": { Level: 'optional' },
            "RowOverlap": { Level: 'optional' },
            "PageImages": { Level: 'optional' },
            "Frame": { Level: 'optional' }
          },
          "OverrideEvents": {
            "OnGetText": { Level: 'optional' },
            "OnGetAlt": { Level: 'optional' }
          },
          "Events": {
            "OnClick": { Level: 'optional' },
            "OnDblClick": { Level: 'optional' }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngVLayout',function(d,c,ref) {
      return {
        ControlCategory: 'Layout',
        IsContainer: true,

        NewControl: {
          Default: {
            Properties: {
              // TODO: Solve how to disable positioning and use default values
              "L": { Value: 0 },
              "T": { Value: 0 },
              "R": { Value: 0 },
              "B": { Value: 0 }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "HiResControl": { Level: 'optional' },
            "AutoSize": ng_diBoolean(false, { Level: 'basic' }),
            "VPadding": ng_diInteger(0, { Level: 'basic' }),
            "VAlign": ng_diStringValues('top', ['top','bottom'], { Level: 'basic' }),
            "Reverse": ng_diBoolean(false, { Level: 'basic' }),
            "MinHeight": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic' }),
            "MaxHeight": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic' })
          }
        },
        {
          "Controls": ng_diControls(undefined, { Level: 'basic' }, {
            ChildDesignInfo: ng_diControl(undefined, ng_diProperties({
              "Data": {
                "IgnoreLayout": ng_diBoolean(false, { Level: 'basic', Order: 0.8 }),
                "LayoutVPadding": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic', Order: 0.81 })
              }
            }))
          })
        })
      };
    });

    ngRegisterControlDesignInfo('ngHLayout',function(d,c,ref) {
      return {
        ControlCategory: 'Layout',
        IsContainer: true,

        NewControl: {
          Default: {
            Properties: {
              // TODO: Solve how to disable positioning and use default values
              "L": { Value: 0 },
              "T": { Value: 0 },
              "R": { Value: 0 },
              "B": { Value: 0 }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "HiResControl": { Level: 'optional' },
            "AutoSize": ng_diBoolean(false, { Level: 'basic' }),
            "HPadding": ng_diInteger(0, { Level: 'basic' }),
            "HAlign": ng_diStringValues('left', ['left','right'], { Level: 'basic' }),
            "Reverse": ng_diBoolean(false, { Level: 'basic' }),
            "MinWidth": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic' }),
            "MaxWidth": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic' })
          }
        },
        {
          "Controls": ng_diControls(undefined, { Level: 'basic' }, {
            ChildDesignInfo: ng_diControl(undefined, ng_diProperties({
              "Data": {
                "IgnoreLayout": ng_diBoolean(false, { Level: 'basic', Order: 0.8 }),
                "LayoutHPadding": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic', Order: 0.81 })
              }
            }))
          })
        })
      };
    });

    ngRegisterControlDesignInfo('ngCenteredLayout',function(d,c,ref) {
      return {
        ControlCategory: 'Layout',
        IsContainer: true,

        NewControl: {
          Default: {
            Properties: {
              // TODO: Solve how to disable positioning and use default values
              "L": { Value: 0 },
              "T": { Value: 0 },
              "R": { Value: 0 },
              "B": { Value: 0 }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "HiResControl": { Level: 'optional' },
            "VCenter": ng_diBoolean(true, { Level: 'basic' }),
            "HCenter": ng_diBoolean(true, { Level: 'basic' }),
            "CenterOffsetX": ng_diInteger(0, { Level: 'basic' }),
            "CenterOffsetY": ng_diInteger(0, { Level: 'basic' })
          }
        },
        {
          "Controls": ng_diControls(undefined, { Level: 'basic' }, {
            ChildDesignInfo: ng_diControl(undefined, ng_diProperties({
              "Data": {
                "IgnoreLayout": ng_diBoolean(false, { Level: 'basic', Order: 0.8 }),
                "CenterOffsetX": ng_diInteger(0, { Level: 'basic', Order: 0.81 }),
                "CenterOffsetY": ng_diInteger(0, { Level: 'basic', Order: 0.81 })
              }
            }))
          })
        })
      };
    });

    ngRegisterControlDesignInfo('ngConstraintLayout',function(d,c,ref) {
      return {
        ControlCategory: 'Layout',
        IsContainer: true,

        NewControl: {
          Default: {
            Properties: {
              // TODO: Solve how to disable positioning and use default values
              "L": { Value: 0 },
              "T": { Value: 0 },
              "R": { Value: 0 },
              "B": { Value: 0 }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "Guidelines": ng_diObject(undefined, { Level: 'basic' }, {
              ChildDesignInfo:  ng_diType('bounds', { Level: 'basic' })
            })
          }
        },
        {
          "Controls": ng_diControls(undefined, { Level: 'basic' }, {
            ChildDesignInfo: ng_diControl(undefined, ng_diProperties({
              "id": { Level: 'basic' },
              "Data": {
                "LayoutID": ng_diStringRefName({ Level: 'basic', Order: 0.8 }),
                "LayoutConstraints": ng_diType('ngLayoutConstraints', { Level: 'basic', Order: 0.81 })
              }
            }))
          })
        })
      };
    });
  }
};