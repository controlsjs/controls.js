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
