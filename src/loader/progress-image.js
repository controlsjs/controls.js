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

var ngLoaderDirection = (typeof ngLoaderDirection !== 'undefined' ? ngLoaderDirection : 0); 
// 0 - left to right, 1 - top to bottom, 2 - right to left, 3 - bottom to top

(function() {

  var img_w=-1,img_h=-1,po=null;
  var curprogress=0;
  
  function update_progress() {
    if(po) 
    {
      var v;
      if((ngLoaderDirection===1)||(ngLoaderDirection===3)) v=Math.round(curprogress*(img_h/100)); 
      else v=Math.round(curprogress*(img_w/100)); 
      switch(ngLoaderDirection)
      {
        default:
        case 0: po.style.width=v+'px'; break;
        case 1: po.style.height=v+'px'; break;
        case 2: po.style.width=(img_w-v)+'px'; break;
        case 3: po.style.height=(img_h-v)+'px'; break;
      }
    }
  }
  
  ngOnAppLoadProgress = function(p) {
    var o;
    curprogress=p;
    if(img_w===-1)
    {
      o=document.getElementById('ngProgress');
      if(o) {
        var img=document.getElementById('ngImgProgress');
        var p1=document.getElementById('ngProgress1');
        var p2=document.getElementById('ngProgress2');
        if((p1)&&(p2)&&(img)) 
        {
          img_w=parseInt(img.width,10);
          img_h=parseInt(img.height,10);
          o.style.marginLeft=-Math.round(img_w/2)+'px';
          o.style.marginTop=-Math.round(img_h/2)+'px';
          o.style.width=img_w+'px';
          o.style.height=img_h+'px';
          
          if((ngLoaderDirection===2)||(ngLoaderDirection===3)) po=p1;
          else po=p2;
          if((ngLoaderDirection===1)||(ngLoaderDirection===3))
          {
            po.style.width=img_w+'px';
            if(ngLoaderDirection===1) po.style.height='0px';
            else po.style.height=img_h+'px';
            po.className='ngLoadVert'; 
          }
          else
          {
            po.style.height=img_h+'px';
            if(ngLoaderDirection!==2) po.style.width='0px';
            else po.style.width=img_w+'px';
            po.className='ngLoadHorz'; 
          }
          po.style.zIndex=1;
        }            
        o.style.visibility='visible';
        setTimeout(update_progress,1);
        return;              
      }
      else { img_w=0; img_h=0; }                    
    }
    setTimeout(update_progress,1);
  }
})();

