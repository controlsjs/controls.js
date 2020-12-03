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
var ngOnAppDoLoading=(typeof ngOnAppDoLoading === 'undefined' ? null : ngOnAppDoLoading);
var ngOnAppLoaded=(typeof ngOnAppLoaded === 'undefined' ? null : ngOnAppLoaded);
var ngOnAppLoadFailed=(typeof ngOnAppLoadFailed === 'undefined' ? null : ngOnAppLoadFailed);
var ngOnAppCreated=(typeof ngOnAppCreated === 'undefined' ? null : ngOnAppCreated);
var ngOnAppLoadProgress=(typeof ngOnAppLoadProgress === 'undefined' ? null : ngOnAppLoadProgress);
var ngOnAppFileLoad=(typeof ngOnAppFileLoad === 'undefined' ? null : ngOnAppFileLoad);
var ngOnAppFileLoaded=(typeof ngOnAppFileLoaded === 'undefined' ? null : ngOnAppFileLoaded);
var ngOnAppFileLoadFailed=(typeof ngOnAppFileLoadFailed === 'undefined' ? null : ngOnAppFileLoadFailed);

function ngCreateHTMLFragment(htmlStr) {
  var frag = document.createDocumentFragment();
  if(frag) {
    var temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) frag.appendChild(temp.firstChild);
  }
  return frag;
}

function ngURLExtractDomain(url){
  var idx=url.indexOf('//');
  if(idx>=0) {
    idx=url.indexOf('/',idx+2);
    if(idx>=0) {
      return url.substring(0,idx);
    }
  }
  return '';
}

function ngLoadApplication(elm, callback, files)
{
  if((typeof ngOnAppLoading === 'function')&&(!ngOnAppLoading())) return false;

  var head=document.getElementsByTagName("head").item(0);
  if(!head) return false;

  var device, lastprogress=0, loadorder=0;
  var apploading=1,appparts=1,apperrors=0,loadedparts=0,readyparts=0,apppath='',appdomain='', appimages={};
  var cssqueue=[];
  var scriptsqueue=[];

  var ua=navigator.userAgent.toLowerCase();
  var cordova = (typeof window.cordova !== 'undefined');
  var winphone = (ua.indexOf("windows phone") != -1);
  var winstoreapp = (typeof Windows !== 'undefined');
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
    appdomain = ngURLExtractDomain(apppath);
    if(apppath.charAt(apppath.length-1)!='/') apppath+='/';
  }

  window.ngLoadAppFiles = function(f, fapppath, fappdomain)
  {
    var url,p,e,ext;
    var oldapppath=apppath;
    var oldappdomain=appdomain;
    if(typeof fapppath!=='undefined') apppath=fapppath;
    if(typeof fappdomain!=='undefined') appdomain=fappdomain;
    try {
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
          case 0: ngLoadAppFile(f[i].File, f[i], null, typeof f[i].Async === 'undefined' ? false : f[i].Async); break;
          case 2: ngLoadAppImg(f[i].File, f[i]); break;
        }
      }

      // Load scripts
      for(var i in f)
        if(f[i].Type === 1){
          ngLoadAppFile(f[i].File, f[i], null, f[i].Async);
        }
    } finally {
      apppath=oldapppath;
      appdomain=oldappdomain;
    }
  }

  function url_domain(url)
  {
    var idx=url.indexOf('//');
    if(idx<0) return window.location.hostname;
    url=url.substring(idx+2,url.length);
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

  function url_addparam(url,p) {
    return url+(url.indexOf('?')>=0?'&':'?')+p;
  }

  function platform_url(url)
  {
    return (cordova && winphone && ((url.indexOf('//')<0) || (url.indexOf('file://')>=0)) ? url_stripparams(url) : url);
  }

  var ishtmlcode=/^\s*\</i;

  function exec_script(code)
  {
    if(ishtmlcode.test(code)) return false;
    if(code.indexOf('/*_SR_BEGIN*/')>=0) {
      if(code.lastIndexOf('/*_SR_END*/')<0) return false;
    }

    if(winstoreapp) {
      MSApp.execUnsafeLocalFunction(function () {
        window["eval"].call(window, code);
      });
    } else
    {
      if(window.execScript) window.execScript(code);
      else window["eval"].call(window, code);
    }
    return true;
  }

  function exec_css(code)
  {
    var o = document.createElement('style');
    if(!o) return false;
    o.setAttribute('type', 'text/css');
    if(o.styleSheet) /* IE */ {
        o.styleSheet.cssText = code;
    }
    else
    {
      o.appendChild(document.createTextNode(code));
    }
    head.appendChild(o);
    return true;
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
  };

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
    if(!notready) apppartready(type, url, data);
  }

  function hasapp() {
    return ((typeof ngApp === 'object') && (ngApp) && (typeof ngApp.Run === 'function'));
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
        var startup = null;

        function runfnc() {
          if(startup) return;
          startup = setTimeout(function() {
            clearTimeout(startup);

            if(typeof ngOnAppLoaded === 'function') ngOnAppLoaded();
            if(readyparts<appparts)
            {
              // ngOnAppLoaded added some files, clear callback and wait for files
              ngOnAppLoaded=null;
              return;
            }
            apploading=0;

            var app=hasapp() ? ngApp : null;
            if((typeof ngApplication === 'function')&&(!app))
            {
              app=new ngApplication((typeof ngStartParams === 'function' ? new ngStartParams() : {}), (elm && (typeof elm==='object' || elm!='') ? elm : 'ngApp'),false);
              if(hasapp()) app=ngApp;
              if((app)&&(apppath!='')) app.AppPath=apppath;
              if(typeof ngOnAppCreated === 'function') ngOnAppCreated(app);
            }

            if((callback)&&(!callback(app))) return;
            if((app)&&(typeof app.Run === 'function')) app.Run();
          },100);
        }

        var run;
        if((apperrors)&&(typeof ngOnAppLoadFailed === 'function')) {
          run=ngOnAppLoadFailed(runfnc);
          if(typeof run==='undefined') run=true;
        } else run=true;
        if(run) runfnc();
      }
    }
  }

  window.ngAppURL = function(url)
  {
    var idx=url.indexOf("//");
    if((idx<0)&&(url!=''))
    {
      if(url.charAt(0)=='/') url=appdomain+url;
      else url=apppath+url;
    }
    var v;
    if(typeof ngAppScriptsVer !== 'undefined') v=ngAppScriptsVer;
    if(v) {
      if((typeof ngDEBUG !== 'undefined')&&(ngDEBUG)) v=-1; // Use current timestamp if ngDEBUG
      if(v<0) v=new Date().getTime();
      url=url_addparam(url,v);
    }
    return platform_url(url);
  };

  window.ngLoadAppScript = function(url, data, loadcallback, async, loadfailcallback)
  {
    if(!data){data = {};}
    data.Type = 1;
    data.File = url;
    if(typeof async !== 'undefined'){data.Async = async;}
    ngLoadAppFile(url, data, loadcallback, async, loadfailcallback);
  };

  window.ngLoadAppCSS = function(url, data, loadcallback, async, loadfailcallback)
  {
    if(!data){data = {};}
    data.Type = 0;
    data.File = url;
    if(typeof async !== 'undefined'){data.Async = async;}
    ngLoadAppFile(url, data, loadcallback, async, loadfailcallback);
  };

  window.ngLoadAppFile = function(url, data, loadcallback, async, loadfailcallback)
  {
    var loadurl=ngAppURL(url);
    var asyncloader=(async!==false)&&(window.XMLHttpRequest)&&
                    ((typeof ngDEBUG === 'undefined')||(!ngDEBUG))&&
                    ((!opera)||((operaver>=11.1)&&(window.location.protocol!='file:')))&&
                    ((cordova)
                 || ((window.location.hostname!='')&&(url_domain(loadurl)==window.location.hostname)));

    if((typeof ngOnAppFileLoad === 'function')&&(!ngOnAppFileLoad(data.Type,url,data))) return;
    appparts++;

    var queue;
    var exec;
    switch(data.Type){
      case 0: queue = cssqueue; exec = exec_css; break;
      case 1: queue = scriptsqueue; exec = exec_script; break;
    }

    function loadfailed(type,url,data) {
      if(typeof loadfailcallback==='function') loadfailcallback(type,url,data);
      if(typeof ngOnAppFileLoadFailed === 'function') ngOnAppFileLoadFailed(type,url,data);
    }

    if(!async) {
      var filedata={ URL: url, LoadURL: loadurl, Data: data, Async: asyncloader, LoadCallback: loadcallback, LoadFailCallback: loadfailed };
      queue.push(filedata);
      if((!asyncloader)&&(queue.length>1)) {return;}
    }

    function loadfile(url, data, loadcallback, asyncloader, loadfailcallback2)
    {
      function fileerror(isasync)
      {
        apperrors++;
        isasync=(isasync===true);
        var c=(typeof console!=='undefined' ? console : null);
        if(c){
          switch(data.Type){
            case 0: c.error('CSS "'+url+'" was not loaded!'); break;
            case 1: c.error('Script "'+url+'" was not loaded!'); break;
          }
        }

        if(async){
          if(typeof loadfailcallback2==='function'){
            loadfailcallback2(data.Type,url,data);
            loadcallback=null;
          }
          if(data.IgnoreError) apperrors--;
        }
        else {
          var li=queue[0];
          if((li)&&(!li.Async)) {
            if(typeof li.LoadFailCallback === 'function') li.LoadFailCallback(li.Data.Type,li.URL,li.Data);
            li.LoadCallback=null;
          }
          if(li.Data.IgnoreError) apperrors--;
        }
        fileloaded(isasync);
      }

      var loaded = false;
      function fileloaded(isasync,code)
      {
        if(loaded) return;
        loaded = true;

        if(async){
          if((typeof code!=='undefined')&&(code!=='')) {
            if(!exec(code)) fileerror(isasync);
          }
          if(typeof loadcallback === 'function') loadcallback(data.Type,url,data);
          apppartloaded(data.Type,url,data);
          return;
        }
        if(isasync===true){
          apppartloaded(data.Type,url,data,true);
        }

        var li=queue[0];
        if(!li.Async){
          if(isasync===true) return;
          queue.splice(0,1);
          if(typeof li.LoadCallback === 'function') li.LoadCallback(li.Data.Type,li.URL,li.Data);
          apppartloaded(li.Data.Type,li.URL,li.Data);
        }

        var code;
        while(queue.length)
        {
          li=queue[0];
          if(!li.Async){
            loadfile(li.LoadURL, li.Data, li.LoadCallback,false, li.LoadFailCallback);
            break;
          }
          code=li.code;
          if(typeof code==='undefined') break;
          if(code!=='') {
            if(!exec(code)) {
              apperrors++;
              var c=(typeof console!=='undefined' ? console : null);
              if(c){
                switch(data.Type){
                  case 0: c.error('CSS "'+li.LoadURL+'" was not loaded! Cannot inject.'); break;
                  case 1: c.error('Script "'+li.LoadURL+'" was not loaded! Cannot execute.'); break;
                }
              }
              if(typeof li.LoadFailCallback === 'function') li.LoadFailCallback(li.Data.Type,li.URL,li.Data);
              li.LoadCallback=null;
            }
          }
          queue.splice(0,1);
          if(typeof li.LoadCallback === 'function') li.LoadCallback(li.Data.Type,li.URL,li.Data);
          apppartready(li.Data.Type,li.URL,li.Data);
        }
      }
      if(asyncloader)
      {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
          if(xmlhttp.readyState == 4){
            if((xmlhttp.status == 200)||(xmlhttp.status == 304)||((xmlhttp.status == 0)&&(!cordova)&&(navigator.onLine!==false))) {
              if(!async) filedata.code=xmlhttp.responseText;
              fileloaded(true,xmlhttp.responseText);
            }
            else{
              if(!async) filedata.code='';
              fileerror(true);
            }
          }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        return;
      }

      var o;
      switch(data.Type) {
        case 0: o = document.createElement("link"); break;
        case 1: o = document.createElement("script"); break;
      }

      if(o) {
        switch(data.Type) {
          case 0:
            o.setAttribute("rel","stylesheet");
            o.setAttribute("type","text/css");
            o.setAttribute("href",url);
            fileloaded();
            break;
          case 1:
            o.onload = fileloaded;
            o.onerror = fileerror;
            o.onreadystatechange = function () {
              if(this.readyState != "loaded" && this.readyState != "complete") return;
              fileloaded();
            };
            o.setAttribute("src",url);
            break;
        }
        head.appendChild(o);
      }
    }

    loadfile(loadurl, data, loadcallback, asyncloader, loadfailed);
  };

  window.ngLoadAppImg = function(url, data, loadcallback, async, loadfailcallback)
  {
    if((typeof ngOnAppFileLoad === 'function')&&(!ngOnAppFileLoad(2,url,data))) return null;
    var i=appimages[url];
    if(typeof i === 'undefined')
    {
      i=new Image;
      appparts++;
      var loaded = false;
      function imgfailed()
      {
        if(loaded) return;
        loaded = true;
        apperrors++;
        if(typeof loadfailcallback === 'function') loadfailcallback(2,url,data);;
        if(typeof ngOnAppFileLoadFailed === 'function') ngOnAppFileLoadFailed(2,url,data);
        apppartloaded(-1,url,data);
      }
      function imgloaded()
      {
        if(loaded) return;
        loaded = true;
        if(typeof loadcallback === 'function') loadcallback(2,url,data);
        apppartloaded(2,url,data);
      }
      i.onload=imgloaded;
      i.onfailure=imgfailed;
      i.onerror=imgfailed;
      appimages[url]=i;
      i.src=ngAppURL(url);
    }
    return i;
  };

  window.ngLoaderBeginLoad = function() {
    appparts++;
  }

  window.ngLoaderEndLoad = function(data) {
    apppartloaded(-1, void 0, data);
  }

  window.ngGetAppFiles = function() {
    var files=[];
    if(ngAppFiles)
    {
      for(var i in ngAppFiles)
        files.push(ngAppFiles[i]);
    }
    if((typeof ngDevice !== 'undefined')&&(typeof ngAppDeviceFiles !== 'undefined'))
    {
      function loaddevicefiles(dev) {
        var devfiles=ngAppDeviceFiles[dev];
        if(typeof devfiles !== 'undefined')
        {
          for(var i in devfiles)
            files.push(devfiles[i]);
        }
      }
      loaddevicefiles(ngDevice);
      if(typeof ngDeviceProfile==='object') {
        for(var p in ngDeviceProfile) {
          if(ngDeviceProfile[p]) {
            loaddevicefiles('*.'+p);
            loaddevicefiles(ngDevice+'.'+p);
          }
        }
      }
    }
    return files;
  }

  function doloading() {
    if((!files)&&(!window.ngLoaderAppFilesUsed))
    {
      window.ngLoaderAppFilesUsed=true;
      if(typeof ngSetDevice === 'function') // Devices present
        ngSetDevice(ngDevice);
      files=window.ngGetAppFiles();
    }

    if(typeof ngOnAppDoLoading === 'function') {
      var options = {
          apppath: apppath,
          appdomain: appdomain,
          elm: elm,
          files: files,
          callback: callback
      };
      if(!ngOnAppDoLoading(options)) return;
      apppath = options.apppath;
      appdomain = options.appdomain;
      files = options.files;
      elm = options.elm;
      callback = options.callback;
    }

    if(files) ngLoadAppFiles(files);
    apppartloaded(-1);
  }

  if(!window.ngLoaderStarted) {
    // Fix for Internet Explorer on Windows Phone 8 which sometimes returns false screen dimensions right after page load.
    // Solution is to wait for a while.
    var loadtimer=setTimeout(function() {
      clearTimeout(loadtimer);
      window.ngLoaderStarted=true;
      doloading();
    },100);
  }
  else doloading();
  return true;
}
