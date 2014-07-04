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

