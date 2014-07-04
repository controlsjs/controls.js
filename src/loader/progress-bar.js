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

(function() {
  var curprogress=0;
  var o=null;
  
  function update_progress() {
    if(o) o.style.width=(curprogress*2)+'px';
  }
  
  ngOnAppLoadProgress = function(p) {
    if(!o) o=document.getElementById('ngLoadProgress');
    curprogress=p;
    if(o) setTimeout(update_progress,1);
  }
})();

