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
  }
};