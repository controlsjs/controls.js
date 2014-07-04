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
  var progress=0;
  var progress_timer=0;
    
  function anim_progress()
  {
    if(progress<curprogress) {
      progress++;
      var o=document.getElementById('ngLoadProgress');
      if(o) o.innerHTML=progress+' %';
    }
    else 
    {
      clearInterval(progress_timer);
      progress_timer=0;
    }            
  }   
  
  ngOnAppLoadProgress = function(p) {
    if(curprogress!=p) {
      curprogress=p;
      var i=1000/(curprogress-p);
      if(i<10) i=10;
      if(progress_timer) clearInterval(progress_timer);
      progress_timer=setInterval(anim_progress, i);
    }          
  }
})();
