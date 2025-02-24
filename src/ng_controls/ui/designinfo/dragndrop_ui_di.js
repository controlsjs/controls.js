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
ngUserControls['dragndrop_ui_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    function Create_ngVLayoutDnD_DI(d,c,ref) {
      return {
        ControlCategory: 'Layout',
        IsContainer: true,
        Properties: ng_diProperties({
          "Data": {
            "DragShowHint": ng_diBoolean(true, { Level: 'basic' }),
            "DragDropPosition": ng_diStringValues('pointer', ['none', 'pointer', 'first', 'last'], { Level: 'basic' }),
            "DragGroup": ng_diStringRefName(),
            "DragDropGroup": ng_diStringRefName()
          },
          "Methods": {
            "DoDragOver": { Level: 'advanced' },
            "DoDragEnter": { Level: 'advanced' },
            "DoDragLeave": { Level: 'advanced' },
            "DoDragDrop": { Level: 'advanced' },
            "DoCreateDragHint": ng_diFunction('function(o, bound) { return ng_CallParent(this, "DoDragStart", arguments, null); }', { Level: 'advanced' }),
            "DoUpdateDragHint": ng_diFunction('function(dh, bound, v) { ng_CallParent(this, "DoUpdateDragHint", arguments); }', { Level: 'advanced' }),
            "DoDisposeDragHint": ng_diFunction('function(dh) { ng_CallParent(this, "DoDisposeDragHint", arguments); }', { Level: 'advanced' }),
            "DoRemoveDragHint": ng_diFunction('function(di) { ng_CallParent(this, "DoRemoveDragHint", arguments); }', { Level: 'advanced' }),
            "DoDragDropControl": ng_diFunction('function(ctrl, insertbefore, di, pi) { ng_CallParent(this, "DoDragDropControl", arguments); }', { Level: 'advanced' })
          },
          "Events": {
            "OnDragDropControl": ng_diEvent('function(c, ctrl, insertbefore, di, pi) { return true; }', { Level: 'basic' }),
            "OnDragDropedControl": ng_diEvent('function(c, ctrl, insertbefore, di, pi) { }', { Level: 'basic' }),
            "OnDragOver": { Level: 'basic' },
            "OnDragEnter": { Level: 'advanced' },
            "OnDragLeave": { Level: 'advanced' },
            "OnDragDrop": { Level: 'advanced' }
          }
        })
      };
    }

    ngRegisterControlDesignInfo('ngVLayoutDnD',Create_ngVLayoutDnD_DI);
    ngRegisterControlDesignInfo('ngHLayoutDnD',Create_ngVLayoutDnD_DI);    
  }
};