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
ngUserControls['dragndrop_designinfo'] = {
  OnControlCreated: function(def,c)
  {
    if((ngHASDESIGNINFO())&&(c)&&(!def.CtrlInheritanceDepth)&&(!ngIsSysControl(c)))
    {
      ng_MergeVar(c.DesignInfo, {        
        Properties: ng_diProperties({
          "Methods": {
            "DoDragDrop": ng_diFunction('function(di,pi) { ng_CallParent(this, "DoDragDrop", arguments); }', { Level: 'optional' }),
            "DoDragOver": ng_diFunction('function(di,pi) { return ng_CallParent(this, "DoDragOver", arguments, false); }', { Level: 'optional' }),
            "DoDragEnter": ng_diFunction('function(di,pi) { ng_CallParent(this, "DoDragEnter", arguments); }', { Level: 'optional' }),
            "DoDragLeave": ng_diFunction('function(di,pi) { ng_CallParent(this, "DoDragLeave", arguments); }', { Level: 'optional' })
          },
          "Events": {
            "OnDragStart": ng_diEvent('function(c, di, pi) { return true; }', { Level: 'optional' }),
            "OnDragStarted": ng_diEvent('function(c, di, pi) {  }', { Level: 'optional' }),
            "OnDrag": ng_diEvent('function(c, di, pi) {  }', { Level: 'optional' }),
            "OnDragOver": ng_diEvent('function(c, di, pi) { return true; }', { Level: 'optional' }),
            "OnDragEnter": ng_diEvent('function(c, di, pi) {  }', { Level: 'optional' }),
            "OnDragLeave": ng_diEvent('function(c, di, pi) {  }', { Level: 'optional' }),
            "OnDragDrop": ng_diEvent('function(c, di, pi) {  }', { Level: 'optional' }),
            "OnDragEnd": ng_diEvent('function(c, di, pi) {  }', { Level: 'optional' }),
            "OnDragFinished": ng_diEvent('function(c, di, pi) {  }', { Level: 'optional' }),
            "OnDragCanceled": ng_diEvent('function(c, di, pi) {  }', { Level: 'optional' })
          }
        })
      });
    }
  },
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('modDragNDrop',function(d,c,ref) {
      return {
        ControlCategory: false,
        Properties: ng_diProperties({
          "Data": {
            "DragStartThreshold": ng_diInteger(4, { Level: 'advanced' }),
            "DragStartByTouch": ng_diBoolean(false, { Level: 'advanced' }),
            "DragGroup": ng_diString('', { Level: 'basic' }),
            "DragDropGroup": ng_diMixed([
              'undefined',
              'string',
              ng_diArrayOf('string')], { InitType: 'string', Level: 'basic' }),
            "DragAxis": ng_diMixed([
              'undefined',
              ng_diStringValues('vertical', ['vertical','horizontal'])
            ], { InitType: 'string', Level: 'advanced' })
          },
          "Methods": {
            "DoDragStart": ng_diFunction('function(di,pi) { return ng_CallParent(this, "DoDragStart", arguments, false); }', { Level: 'advanced' }),
            "DoDragStarted": ng_diFunction('function(di,pi) { ng_CallParent(this, "DoDragStarted", arguments); }', { Level: 'advanced' }),
            "DoDrag": ng_diFunction('function(di,pi) { ng_CallParent(this, "DoDrag", arguments); }', { Level: 'advanced' }),
            "DoDragEnd": ng_diFunction('function(di,pi) { ng_CallParent(this, "DoDragEnd", arguments); }', { Level: 'advanced' })
          },
          "Events": {
            "OnDragStart": { Level: 'basic' },
            "OnDragStarted": { Level: 'advanced' },
            "OnDrag": { Level: 'advanced' },
            "OnDragEnd": { Level: 'advanced' },
            "OnDragFinished": { Level: 'basic' },
            "OnDragCanceled": { Level: 'basic' }
          }
        })
      };
    });
  }
};
