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
ngUserControls['lib_hammer_plugins'] = {

  OnInit: function () {
    if(!ngHammerJS()) return;

    // Activate Plugins
    if(ngDEBUG) {
      if(typeof Hammer.plugins.fakeMultitouch==='function') Hammer.plugins.fakeMultitouch()
    }
    if(typeof Hammer.plugins.showTouches==='function') Hammer.plugins.showTouches()
  }
}
