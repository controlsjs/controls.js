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

if (typeof ngUserControls === 'undefined') ngUserControls = [];
ngUserControls['ngColorControls_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    var undefined;
    ngRegisterControlDesignInfo('ngColorPicker',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_DIProperties({
          "Data": {
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerBox',function(d,c,ref) {
      return {
        ControlCategory: 'Misc'
      };
    });

    ngRegisterControlDesignInfo('ngColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons'
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerDropDown',function(d,c,ref) {
      return {
        ControlCategory: 'Edits'
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Containers'
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons'
      };
    });
  }
};