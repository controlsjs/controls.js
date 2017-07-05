/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

// Libs
var ngLibsURL=(typeof ngLibsURL !== 'undefined' ? ngLibsURL : 'libs/');
if(typeof ngLib === 'undefined') ngLib={};
(function() {
  var path,url;
  var clib=ngLib['controls.js'];
  if((typeof clib === 'object')&&(clib)) {
    path=clib.path;
    url=clib.URL;
  }
  if(typeof path==='undefined') path='Controls.js/';
  path+=(ngDEBUG ? 'debug/' : 'release/');
  function lib(l) {
   if(typeof ngLib[l] !== 'undefined') return;
   var lb={ path: path+'libs/'+l+'/' }; if(typeof url!=='undefined') lb.URL=url;
   ngLib[l]=lb;
  }
  lib('ng_basic');
  lib('ng_controls');
  lib('ng_wineight');
  lib('ng_winxp');
  lib('ng_wireframe');
})();
