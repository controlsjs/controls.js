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
ngUserControls['panels_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;
    var undefined;

    ngRegisterControlDesignInfo('ngDropPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,

        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: ng_diProperties({
          "ParentReferences": { Level: 'advanced' },
          "W": { Exclude: ['CW'] },
          "H": { Exclude: ['CH'] },
          "CW": ng_diInteger(0, { Order: 0.141, Exclude: ['W'], Level: 'advanced' }),
          "CH": ng_diInteger(0, { Order: 0.142, Exclude: ['H'], Level: 'advanced' }),
          "DroppedDown": ng_diBoolean(false, { Level: 'basic' }),
          "ControlsPanel": ng_diControl('ngPanel', undefined, { Level: 'advanced', IsContainer: false }),
          "Button": ng_diControl('ngButton', undefined, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
          "Events": {
            "OnDropDown": ng_diEvent('function(c, state) { return true; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngSplitPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        TargetContainer: function(control, target_control, control_elm, target_elm)
        {
          var id = ngVal(target_control.ID, '');
          var part = id.substring(id.lastIndexOf('_') + 1);
          switch (part) {
            case 'P1': return 'Controls1';
            case 'P2': return 'Controls2';
            default: return '';
          }
        },

        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 400 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: ng_diProperties({
          "ParentReferences": { Level: 'advanced' },
          "Controls1": ng_diControls(undefined, { Level: 'basic', Order: 0.65, ContainerProperty: true, PropertyGroup: 'Controls' }, {
            ChildDesignInfo: {
              PropertyGroup: 'Controls'
            }
          }),
          "Controls2": ng_diControls(undefined, { Level: 'basic', Order: 0.66, ContainerProperty: true, PropertyGroup: 'Controls' }, {
            ChildDesignInfo: {
              PropertyGroup: 'Controls'
            }
          }),
          "ControlsPanel1": ng_diControl('ngPanel', undefined, { Level: 'advanced', IsContainer: false }),
          "ControlsPanel2": ng_diControl('ngPanel', undefined, { Level: 'advanced', IsContainer: false }),
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "PanelAlign": ng_diStringValues('left', ['left','right','top','bottom'], { Level: 'basic' }),
            "ResizeMode": ng_diTypeVal('bitmask', ngspResizeNone, { Level: 'basic' }, {
              EditorOptions: {
                BitMaskIdentifiers: [
                  {Value: ngspResizeNone,        ID: 'ngspResizeNone'},
                  {Value: ngspResizeSize,        ID: 'ngspResizeSize'},
                  {Value: ngspResizeMinSize,     ID: 'ngspResizeMinSize'},
                  {Value: ngspResizeMaxSize,     ID: 'ngspResizeMaxSize'},
                  {Value: ngspResizeAutoMinimize,ID: 'ngspResizeAutoMinimize'},
                  {Value: ngspResizeAutoMaximize,ID: 'ngspResizeAutoMaximize'}
                ]
              }
            }),
            "Size": ng_diInteger(200, { Level: 'basic' }),
            "MinSize": ng_diInteger(0, { Level: 'basic' }),
            "MaxSize": ng_diInteger(0, { Level: 'basic' }),
            "AutoMinimize": ng_diInteger(0, { Level: 'basic' }),
            "AutoMaximize": ng_diInteger(0, { Level: 'basic' }),
            "HandleVisible": ng_diBoolean(true, { Level: 'basic' }),
            "MoverStartImg": ng_diType('image', { Level: 'advanced' }),
            "MoverMiddleImg": ng_diType('image', { Level: 'advanced' }, {
              EditorOptions: {
                HorizontalImages: true
              }
            }),
            "MoverEndImg": ng_diType('image', { Level: 'advanced' }),
            "HandleImg": ng_diType('image', { Level: 'advanced' })
          },
          "Events": {
            "OnResize": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnHandleClick": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnHandleEnter": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnHandleLeave": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnSizeChanging": ng_diEvent('function(c, cursize) { return true; }', { Level: 'basic' }),
            "OnSizeChanged": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnMinimize": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnMaximize": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnRestore": ng_diEvent('function(c) { return true; }', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetImg": ng_diEvent('function(c, imgidx) { return null; }', { Level: 'basic' })
          }
        })
      };
    });
  }
};