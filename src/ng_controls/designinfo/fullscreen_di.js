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
ngUserControls['fullscreen_designinfo'] = {
  OnControlCreated: function(def,c)
  {
    if((ngHASDESIGNINFO())&&(c)&&(!def.CtrlInheritanceDepth))
    {
      ng_MergeVar(c.DesignInfo, {
        Properties: ng_diProperties({
          "Events": {
            "OnEnteringFullScreen": ng_diEvent('function(c, options) { return true; }', { Level: 'advanced' }),
            "OnEnterFullScreen": ng_diEvent('function(c, options) { }', { Level: 'advanced' }),
            "OnExitingFullScreen": ng_diEvent('function(c, options) { return true; }', { Level: 'advanced' }),
            "OnExitFullScreen": ng_diEvent('function(c, options) { return true; }', { Level: 'advanced' })
          }
        })
      });
    }
  }
};