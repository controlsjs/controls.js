/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2026 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

if (typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['coreextui_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngTextEllipsis',function(d,c,ref) {
      return {
        ControlCategory: 'Label',
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true },
                  "LengthLimit": { Value: 1000 },
                  "HTMLEncode": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "LengthLimit": ng_diInteger(1000, { Level: 'basic' }),
            "MaxWordLength": ng_diInteger(10, { Level: 'basic' }),
            "EllipsisText": ng_diString('…', { Level: 'basic', Editor: 'ngfeEditor_Lang' }),
            "EllipsisLangRes": ng_diBoolean(true, { Level: 'advanced' }),

            "ShowMore": ng_diBoolean(false, { Level: 'basic' }),
            "ShowMoreText": ng_diString('ngTextEllipsis_ShowMore_Long', { Level: 'basic', Editor: 'ngfeEditor_Lang' }),
            "ShowMoreLangRes": ng_diBoolean(true, { Level: 'advanced' }),
            "ShowMoreAlign": ng_diStringValues('after', ['after','before'], { Level: 'basic' }),
            "ShowMoreHTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),

            "ShowLess": ng_diBoolean(false, { Level: 'basic' }),
            "ShowLessText": ng_diString('ngTextEllipsis_ShowLess_Long', { Level: 'basic', Editor: 'ngfeEditor_Lang' }),
            "ShowLessLangRes": ng_diBoolean(true, { Level: 'advanced' }),
            "ShowLessAlign": ng_diStringValues('after', ['after','before'], { Level: 'basic' }),
            "ShowLessHTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),

            "Expanded": ng_diBoolean(false, { Level: 'basic' })
          },
          "Events": {
            "OnExpanding": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnExpanded": ng_diEvent('function(c) { }', { Level: 'basic' }),
            "OnCollapsing": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnCollapsed": ng_diEvent('function(c) { }', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetEllipsisText": ng_diEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetShowMoreText": ng_diEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetShowLessText": ng_diEvent('function(c) { return ""; }',{ Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngImageMap',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        IsBasic: true,
        Properties: ng_diProperties({
          "Data": {
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": ng_diString('', { Level: 'basic' }),
            "AutoSize": ng_diBoolean(true, { Level: 'advanced' }),
            "Img": ng_diType('image', { Level: 'basic' }),
            "Cursor": ng_diType('css_cursor', { Level: 'basic' }),
            "Shapes": ng_diArrayOf('ngImageShape', { Level: 'basic' })
          },
          "Events": {
            "OnShapeClick": ng_diEvent('function(e) { }', { Level: 'basic' }),
            "OnMouseEnter":  { },
            "OnMouseLeave":  { },
            "OnMouseShapeEnter": ng_diEvent('function(c, shapeidx) { }', { Level: 'advanced' }),
            "OnMouseShapeLeave": ng_diEvent('function(c, shapeidx) { }', { Level: 'advanced' })
          },
          "OverrideEvents": {
            "OnGetImg": ng_diEvent('function(c) { return null; }', { Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetShapeAlt": ng_diEvent('function(c, shapeidx) { return ""; }', { Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngWebBrowser',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        IsBasic: true,
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "URL": ng_diType('url', { Level: 'basic' }),
            "DesignLive": ng_diBoolean(false, { Level: 'basic', Order: 0.95 })
          },
          "OverrideEvents": {
            "OnGetURL": ng_diEvent('function(c, url) { return url; }', { Level: 'basic' }),
            "OnSetHTML": ng_diEvent('function(c, html) { return html; }', { Level: 'basic' })
          },
          "Events": {
            "OnSetURL": ng_diEvent('function(c, url) { return true; }', { Level: 'basic' })
          }

        })
      };
    });
  }
};

