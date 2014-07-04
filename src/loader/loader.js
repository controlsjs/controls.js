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

var ngOnAppLoading=(typeof ngOnAppLoading === 'undefined' ? null : ngOnAppLoading);
var ngOnAppLoaded=(typeof ngOnAppLoaded === 'undefined' ? null : ngOnAppLoaded);
var ngOnAppCreated=(typeof ngOnAppCreated === 'undefined' ? null : ngOnAppCreated);
var ngOnAppLoadProgress=(typeof ngOnAppLoadProgress === 'undefined' ? null : ngOnAppLoadProgress);
var ngOnAppFileLoad=(typeof ngOnAppFileLoad === 'undefined' ? null : ngOnAppFileLoad);
var ngOnAppFileLoaded=(typeof ngOnAppFileLoaded === 'undefined' ? null : ngOnAppFileLoaded);

function ngCreateHTMLFragment(htmlStr) {     
  var frag = document.createDocumentFragment();
  if(frag) {     
    var temp = document.createElement('div');
    temp.innerHTML = htmlStr;     
    while (temp.firstChild) frag.appendChild(temp.firstChild);
  }
  return frag; 
}

function ngLoadApplication(elm, callback, files)
{
  if((typeof ngOnAppLoading === 'function')&&(!ngOnAppLoading())) return false;
  
  var head=document.getElementsByTagName("head").item(0);
  if(!head) return false;

  var device, lastprogress=0, loadorder=0;
  var apploading=1,appparts=1,loadedparts=0,readyparts=0,apppath='',appdomain='', appimages={};
  var scriptsqueue=[];

  var ua=navigator.userAgent.toLowerCase();
  var cordova = (typeof window.cordova !== 'undefined');
  var winphone = (ua.indexOf("windows phone") != -1);
  var opera = (ua.indexOf("opera") != -1);
  var operaver;
  if(opera) operaver=parseFloat(window.opera.version());


  var oScripts = document.getElementsByTagName("script");
  var s,idx,out="";
  for (var i=0; i<oScripts.length; i++)
  {
    if(typeof oScripts[i].src !== 'undefined')
    {
      s=oScripts[i].src;
      idx=s.indexOf("apploader=");
      if(idx>=0) 
      {
        idx=s.indexOf("?");
        if(idx>=0)
        {
          apppath=s.substring(0,idx);
          idx=apppath.lastIndexOf('/');
          if(idx<=0) apppath='';
          else apppath=apppath.substring(0,idx+1);
          break;
        }
      }      
    }
  }
  if(apppath!='')
  {
    idx=apppath.indexOf('://');
    if(idx>=0) {
      for(idx+=3;idx<apppath.length;idx++)
        if(apppath.charAt(idx)=='/')
        {
          appdomain=apppath.substring(0,idx);
          break;
        }    
    }
    if(apppath.charAt(apppath.length-1)!='/') apppath+='/';
  }
  
  function loadappfiles(f)
  {
    var url,p,e,ext;
    
    // load CSS and images first  
    for(var i in f)
    {
      if(typeof f[i] === 'string') f[i]={ File: f[i] };
      if(typeof f[i].Type === 'undefined')
      {
        url=url_stripparams(f[i].File);
        p=url.lastIndexOf('/');
        if(p<0) p=url.lastIndexOf("\\");
        e=url.lastIndexOf('.');
        if(e>p)
        {
          ext=url.substring(e+1).toLowerCase();
          switch(ext)
          {
            case 'js':  f[i].Type=1; break;
            case 'css': f[i].Type=0; break;
            case 'png': 
            case 'jpg': 
            case 'gif': 
            case 'jpeg': 
            case 'bmp':
                        f[i].Type=2; break;
          }
        }
      }
      switch(f[i].Type)
      {
        case 0: ngLoadAppCSS(f[i].File, f[i]); break;
        case 2: ngLoadAppImg(f[i].File, f[i]); break;
      }
    }
    // Load scripts
    for(var i in f)
      if(f[i].Type===1) ngLoadAppScript(f[i].File, f[i], null, f[i].Async); 
  }

  function url_domain(url)
  {
    var idx=url.indexOf('://');
    if(idx<0) return window.location.hostname;
    url=url.substring(idx+3,url.length);
    idx=url.indexOf('/');
    if(idx>=0) url=url.substring(0,idx);
    idx=url.indexOf(':');
    if(idx>=0) url=url.substring(0,idx);
    return url;
  }
  
  function url_stripparams(url)
  {
    var i=url.indexOf('?');
    if(i>=0) url=url.substr(0,i);
    i=url.indexOf('#');
    if(i>=0) url=url.substr(0,i);
    return url;
  }
  
  function platform_url(url)
  {
    return (cordova && winphone && (url_domain(url)==window.location.hostname) ? url_stripparams(url) : url); 
  }
  
  function exec_script(code)
  {
    if(typeof Windows !== 'undefined') /* WinStoreApp */ {
      MSApp.execUnsafeLocalFunction(function () {
        window["eval"].call(window, code);
      });
    } else 
    {
      if(window.execScript) window.execScript(code); 
      else window["eval"].call(window, code);
    }
  }
  
  window.ngInitializeAppUnits = function() {
    if(typeof ngAppUnits === 'object')
    {
      for(var i in ngAppUnits)
        if(typeof ngAppUnits[i].LoadOrder==='undefined')
          ngAppUnits[i].LoadOrder=loadorder++;

      ngAppUnits.sort(function(u1,u2){ 
        if(typeof u1.Priority === 'undefined') u1.Priority=0.5;
        if(typeof u2.Priority === 'undefined') u2.Priority=0.5;
        if(u1.Priority<0) u1.Priority=0;
        if(u2.Priority<0) u2.Priority=0;
        if(u1.Priority>1.0) u1.Priority=1.0;
        if(u2.Priority>1.0) u2.Priority=1.0;
        if(u1.Priority>u2.Priority) return -1;
        if(u1.Priority<u2.Priority) return 1;
        return (u1.LoadOrder-u2.LoadOrder);
      });

      for(var i in ngAppUnits)
        if(!ngAppUnits[i].Initialized)
        {
          ngAppUnits[i].Initialized=true;
          if(typeof ngAppUnits[i].OnInit === 'function') ngAppUnits[i].OnInit();
        }
    }
  }
  
  function apppartloaded(type, url, data, notready)
  {
    loadedparts++;    
    if((apploading)&&(typeof ngOnAppLoadProgress === 'function')) 
    {
      var p=appparts>0 ? Math.round(loadedparts*100/appparts) : 0;
      if(p>lastprogress)
      {
        ngOnAppLoadProgress(p);
        lastprogress=p;
      }
    }
    if(!notready) apppartready(type, url, data)
  }
  
  function apppartready(type, url, data)
  {
    readyparts++;
    if((type>=0)&&(typeof ngOnAppFileLoaded === 'function')) ngOnAppFileLoaded(type, url, data);

    if(readyparts===appparts)
    {
      // Initialize application units
      ngInitializeAppUnits();

      if((apploading)&&(readyparts===appparts)) 
      {
        var startup = setTimeout(function() {
          clearTimeout(startup);
      
          if(typeof ngOnAppLoaded === 'function') ngOnAppLoaded();
          if(readyparts<appparts)
          {
            // ngOnAppLoaded added some files, clear callback and wait for files
            ngOnAppLoaded=null;
            return;
          }
          apploading=0;
          
          if(typeof ngApplication === 'function') 
          {
            new ngApplication((typeof ngStartParams === 'function' ? new ngStartParams() : {}), (elm && (typeof elm==='object' || elm!='') ? elm : 'ngApp'),false);
            if((ngApp)&&(apppath!='')) ngApp.AppPath=apppath;
            if(typeof ngOnAppCreated === 'function') ngOnAppCreated(ngApp);
          }
          
          if((callback)&&(!callback(ngApp))) return;
          if(ngApp) ngApp.Run();
        },100);
      }
    }
  }
  
  window.ngAppURL = function(url)
  {
    url=platform_url(url);
    var idx=url.indexOf("://");
    if((idx>=0)||(url=='')) return url;
    
    if(url.charAt(0)=='/') return appdomain+url;
    return apppath+url;
  }

  window.ngLoadAppCSS = function(url, data)
  {
    if((typeof ngOnAppFileLoad === 'function')&&(!ngOnAppFileLoad(0,url,data))) return;
    var o = document.createElement("link");  
    o.setAttribute("rel","stylesheet"); 
    o.setAttribute("type","text/css"); 
    o.setAttribute("href",ngAppURL(url)); 
    head.appendChild(o);
  }  
  
  window.ngLoadAppScript = function(url, data, loadcallback, async)
  {
    var asyncloader=(window.XMLHttpRequest)&&
                    ((typeof ngDEBUG === 'undefined')||(!ngDEBUG))&&
                    ((!opera)||((operaver>=11.1)&&(window.location.protocol!='file:')))&&
                    ((typeof Windows !== 'undefined') /* WinStoreApp */                     
                  || ((url_domain(url)==window.location.hostname)&&(window.location.hostname!='')));
    
    if((typeof ngOnAppFileLoad === 'function')&&(!ngOnAppFileLoad(1,url,data))) return;
    appparts++;
    
    if(!async) {
      var scriptdata={URL: url, Data: data, Async: asyncloader, LoadCallback: loadcallback };
      scriptsqueue.push(scriptdata);
      if((!asyncloader)&&(scriptsqueue.length>1)) return;    
    }    
    
    function loadscript(url, data, loadcallback, asyncloader)
    {
      function scripterror(isasync)
      {
        var c=(typeof console!=='undefined' ? console : null);
        if(c) c.error('Script "'+url+'" was not loaded!');
        scriptloaded(isasync);
      }
      
      var loaded = false;
      function scriptloaded(isasync,code)
      {                                       
        if(loaded) return;
        loaded = true;
  
        if(async)
        {
          if((typeof code!=='undefined')&&(code!=='')) {
            exec_script(code);             
          }
          if(typeof loadcallback === 'function') loadcallback(1,url,data);
          apppartloaded(1,url,data);
          return;
        }
        if(isasync===true) apppartloaded(1,url,data,true);
        var li=scriptsqueue[0];                      
        if(!li.Async)
        {                 
          if(isasync===true) return; 
          scriptsqueue.splice(0,1);
          if(typeof li.LoadCallback === 'function') li.LoadCallback(1,li.URL,li.Data);
          apppartloaded(1,li.URL,li.Data);   
        }
                            
        var code;
        while(scriptsqueue.length)
        {
          li=scriptsqueue[0];                      
          if(!li.Async) 
          { 
            loadscript(li.URL, li.Data, li.LoadCallback,false);
            break;
          }              
          code=li.code;
          if(typeof code==='undefined') break;
          if(code!=='') exec_script(code);  
          scriptsqueue.splice(0,1);
          if(typeof li.LoadCallback === 'function') li.LoadCallback(1,li.URL,li.Data);
          apppartready(1,li.URL,li.Data);
        }
      }

      var scripturl=ngAppURL(url);
      if(asyncloader) 
      {
        var xmlhttp=new XMLHttpRequest();       
        xmlhttp.onreadystatechange=function()
        {
          if(xmlhttp.readyState==4)
          {
            if((xmlhttp.status==200)||(xmlhttp.status==304)||(xmlhttp.status==0))
            { 
              if(!async) scriptdata.code=xmlhttp.responseText;
              scriptloaded(true,xmlhttp.responseText);
            }
            else
            { 
              if(!async) scriptdata.code='';
              scripterror(true);
            }
          }
        }
        xmlhttp.open('GET',scripturl,true);
        xmlhttp.send();
        return;
      }
    
      var o = document.createElement("script");
      o.onload = scriptloaded;
      o.onerror = scripterror; 
      o.onreadystatechange= function () {
        if(this.readyState != "loaded" && this.readyState != "complete") return;
        scriptloaded();
      }
      o.setAttribute("src",scripturl);
      head.appendChild(o);
    }
    
    loadscript(url, data, loadcallback, asyncloader);
  }  

  window.ngLoadAppImg = function(url, data, loadcallback)
  {
    if((typeof ngOnAppFileLoad === 'function')&&(!ngOnAppFileLoad(2,url,data))) return null;
    var i=appimages[url];
    if(typeof i === 'undefined')
    {
      i=new Image; 
      appparts++;
      var loaded = false;
      function imgloaded()
      {
        if(loaded) return;
        loaded = true;
        if(typeof loadcallback === 'function') loadcallback(2,url,data);
        apppartloaded(2,url,data);   
      }
      i.onload=imgloaded;
      i.onfailure=imgloaded;
      i.onerror=imgloaded;
      appimages[url]=i;
      i.src=ngAppURL(url);
    }
    return i;
  }

  // Fix for Internet Explorer on Windows Phone 8 which sometimes returns false screen dimensions right after page load.
  // Solution is to wait for a while.   
  var loadtimer=setTimeout(function() { 
    clearTimeout(loadtimer);

    if(!files) 
    {
      files=[];
      if(ngAppFiles) 
      {
        for(var i in ngAppFiles)
          files.push(ngAppFiles[i]);
      }
  
      if(typeof ngDetectDevice === 'function') // Devices present
      {
        if(typeof ngDevice === 'undefined') ngDevice=ngDetectDevice();
        if((typeof ngDevice !== 'undefined')&&(typeof ngAppDeviceFiles !== 'undefined'))
        {
          var devfiles=ngAppDeviceFiles[ngDevice];
          if(typeof devfiles !== 'undefined')
          {
            for(var i in devfiles)
              files.push(devfiles[i]);
          }
        }
      }
    }
    
    if(files) loadappfiles(files);
    apppartloaded(-1);
    
  },100);   
  return true;
}
