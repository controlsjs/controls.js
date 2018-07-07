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

var ngOnDeviceChanged=(typeof ngOnDeviceChanged === 'undefined' ? null : ngOnDeviceChanged);
var ngOnGetDeviceInfo=(typeof ngOnGetDeviceInfo === 'undefined' ? null : ngOnGetDeviceInfo);
var ngDevice=(typeof ngDevice === 'undefined' ? undefined : ngDevice);
var ngDeviceProfile=(typeof ngDeviceProfile === 'undefined' ? undefined : ngDeviceProfile);

function ngDeviceReset(device)
{
  if((typeof ngDevices === 'object')&&(ngDevices))
  {
    if((typeof device==='undefined')||(typeof ngDevices[device] === 'object'))
    {
      var url=window.location.href;
      var i1=url.indexOf('?');
      var i2=url.indexOf('#');
      var url1='';
      var url2='',url3;
      if(i2>=0) 
      {
        url2=url.substr(i2);
        url=url.substr(0,i2);  
      }
      if(i1>=0) 
      { 
        url1=url.substr(i1+1);
        url=url.substr(0,i1);
      }
      i1=url1.indexOf('appdevice=');
      if(i1>=0)
      {
        i2=url1.indexOf('&',i1);
        if(i2>=0) url3=url1.substr(i2+1);
        else url3='';
        url1=url1.substr(0,i1);

        if(typeof device!=='undefined')
        {
          url1+='appdevice='+device;
        }
        else if(i1>0) url1=url1.substr(0,i1-1);
        if(url3!='') 
        {
          if(url1!='') url1+='&';
          url1+=url3;
        }
      }
      else
      {
        if(typeof device!=='undefined')
        {
          if(url1!='') url1+='&';
          url1+='appdevice='+device;
        }
      }          
      if(url1!='') url+='?'+url1;
      url+=url2;
      if(window.location.href==url)
        window.location.reload();
      else
        window.location.href=url;
    }  
  } 
}

function ngGetDeviceInfo()
{
  var width=0, height=0,undefined;
  var ua=navigator.userAgent.toLowerCase();
  if(typeof(window.innerWidth)=='number') {width=window.innerWidth; height=window.innerHeight;}
  else if(document.documentElement&&document.documentElement.clientWidth) {width=document.documentElement.clientWidth; height=document.documentElement.clientHeight;}
  else if(document.body&&document.body.clientWidth) {width=document.body.clientWidth; height=document.body.clientHeight;}

/*
  // Get DPI ... not working :(  
  var dpi_x, dpi_y;
  dpi_x = screen.deviceXDPI; // IE
  dpi_y = screen.deviceYDPI;
  if(typeof dpi_x === 'undefined')
  {
     var matchMedia = window.matchMedia || window.msMatchMedia;
     if (matchMedia) 
     {
       for(var i=1;i<600;i++)
       {
         if(matchMedia('(max-resolution: '+i+'dpi)').matches)
         {
           dpi_x=i; dpi_y=i;
           break;
         }
       }
     }*/
  /*
    var nd=document.createElement('div');
    nd.style.position="absolute";
    nd.style.left="-1in";
    nd.style.top="-1in";
    nd.style.width="1in";
    nd.style.height="1in";
    document.body.appendChild(nd);
    
    function getcompstyle(o,s)
    {
      var val;
      if(document.defaultView && document.defaultView.getComputedStyle)
      { 
        var cstyle=document.defaultView.getComputedStyle(o, '');
        if(cstyle) val = cstyle.getPropertyValue(s);
      }
      else if(o.currentStyle) 
      {
        s = s.replace(/\-(\w)/g, function (s, p){ return p.toUpperCase(); });
        val = o.currentStyle[s];
      }
      return val;
    }
    dpi_x = parseInt(getcompstyle(nd,'width'));
    dpi_y = parseInt(getcompstyle(nd,'height'));
    
    
    //dpi_x = parseInt(nd.offsetWidth);
    //dpi_y = parseInt(nd.offsetHeight);
    document.body.removeChild(nd);
*/
  //  if(dpi_x<=0) dpi_x=96;    // no DPI, assume default screen
  //  if(dpi_y<=0) dpi_y=dpi_x; // no horizontal DPI, set as vertical 
    
/*  }  
  if(typeof dpi_x === 'undefined') dpi_x=96;
  if(typeof dpi_y === 'undefined') dpi_y=96;
*/
  var colordepth=window.screen.colorDepth;
  if(typeof colordepth === 'undefined') colordepth=24;
  
  var scrwidth=screen.width;
  if(typeof scrwidth === 'undefined') scrwidth=width;  
  var scrheight=screen.height;
  if(typeof scrheight === 'undefined') scrheight=height;  

//  var inwidth=width / dpi_x;
//  var inheight=height / dpi_y;

  //var inscrwidth=scrwidth / dpi_x;
//  var inscrheight=scrheight / dpi_y;

  //var diagonal=Math.sqrt(inwidth*inwidth+inheight*inheight);
  //var scrdiagonal=Math.sqrt(inscrwidth*inscrwidth+inscrheight*inscrheight);
  var scrorientation=window.orientation;
  if(typeof scrorientation === 'undefined') scrorientation = (scrwidth>scrheight ? 90 : 0);
  var orientation=(width>height ? 90 : 0)  
  var landscape = (orientation==90);
  var scrlandscape = (Math.abs(scrorientation % 180)==90);
  var di={
    ScreenWidth: scrwidth,
    ScreenHeight: scrheight,
//    ScreenWidthInInches: inscrwidth,
//    ScreenHeightInInches: inscrheight,
//    ScreenWidthInMillimeters: inscrwidth * 25.4, 
//    ScreenHeightInMillimeters: inscrheight * 25.4,
//    ScreenDiagonalInInches: scrdiagonal, 
//    ScreenDiagonalInMillimeters: scrdiagonal * 25.4,         
//    ScreenAspectRatio: (inscrheight > 0 ? inscrwidth/inscrheight : 0),
    ScreenOrientation: scrorientation,
    ScreenLandscape: scrlandscape,
    ScreenPortrait: !scrlandscape,
    DevicePixelRatio: (typeof window.devicePixelRatio === 'undefined' ? 1 : window.devicePixelRatio),

    Width: width,
    Height: height,
//    WidthInInches: inwidth,
//    HeightInInches: inheight,
//    WidthInMillimeters: inwidth * 25.4, 
//    HeightInMillimeters: inheight * 25.4,
//    DiagonalInInches: diagonal, 
//    DiagonalInMillimeters: diagonal * 25.4,    
//    AspectRatio: (inheight > 0 ? inwidth/inheight : 0),
    Orientation: orientation,
    Landscape: landscape,
    Portrait: !landscape,
     
//    PixelRatio: dpi_x/dpi_y,
//    ResolutionX: dpi_x,       
//    ResolutionY: dpi_y,
//    Resolution: (dpi_x > dpi_y ? dpi_x : dpi_y), 

    ColorDepth: colordepth,
    SupportsTouch: ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch) || navigator.msMaxTouchPoints ? true : false),

    IExplorer: eval("/*@cc_on!@*/false"),
    FireFox: (ua.indexOf("firefox") != -1),
    Chrome:  (ua.indexOf("chrome") != -1),
    Safari:  (ua.indexOf("safari") != -1),
    Opera:   (ua.indexOf("opera") != -1),
    Android: (ua.indexOf("android") != -1),
    iOS:     ( ua.match(/(ipad|iphone|ipod)/g) ? true : false ),
    WindowsPhone: (ua.indexOf("windows phone") != -1),
    Cordova: (typeof window.cordova !== 'undefined'),
    WinStoreApp: (typeof Windows !== 'undefined')
  };
  di.FireFoxVersion = (di.FireFox ? parseInt( ua.match( /firefox\/(.*)$/ )[1] ) : undefined);
  di.FireFoxOS = di.FireFox && (ua.indexOf("mobile") != -1);
  di.OperaVersion = (di.Opera ? parseFloat(window.opera.version()) : undefined);
  di.IExplorerVersion = (di.IExplorer ? parseInt( ua.match( /msie (\d+)/ )[1] ) : undefined);
  if((!di.IExplorer)&&(ua.match(/trident/))) // IE>=11 detection
  {
    var v=ua.match( /rv\:(\d+)/ );
    if(!v) v=ua.match( /msie (\d+)/ );
    if(v)
    {
      di.IExplorer = true;
      di.IExplorerVersion = parseInt(v[1]);
    }
  }
  di.UsingTouch = (di.SupportsTouch)&&(di.Android || di.iOS || di.WindowsPhone || (ua.indexOf("mobile") != -1) || (ua.indexOf("tablet") != -1));
  if((typeof ngAppDeviceInfo === 'object')&&(ngAppDeviceInfo)) {
    for(var i in ngAppDeviceInfo)
      di[i]=ngAppDeviceInfo[i];
  }
  if(typeof ngOnGetDeviceInfo === 'function') ngOnGetDeviceInfo(di);
  return di;
}

function ngDetectDevice(extinfo)
{
  var device;
  if((typeof ngDevices === 'object')&&(ngDevices)) 
  {
    var di=ngGetDeviceInfo();
    var ua=navigator.userAgent.toLowerCase();
    
    function evalprops(dev, props, profile)
    {
      var req,neg,v,val,prefix,match;
      var pts=0,numprops=0,priority=0.5;
      for(var p in props)
      {
        v=props[p];
        numprops++;
        prefix=p.substr(0,3);
        if(prefix=='Opt')
        {
          p=p.substring(3,p.length);
          prefix=p.substr(0,3);
          req=false;
        }
        else req=true;
        if(prefix=='Not')
        {
          p=p.substring(3,p.length);
          prefix=p.substr(0,3);
          neg=true;
        }
        else neg=false;
        match=false;
        switch(prefix)
        {
          case 'Min':
            p=p.substring(3,p.length);
            if(typeof di[p] === 'undefined') break;
            if(((!neg)&&(di[p]>=v))||((neg)&&(di[p]<v))) match=true;
            break;
          case 'Max':
            p=p.substring(3,p.length);
            if(typeof di[p] === 'undefined') break;
            if(((!neg)&&(di[p]<v))||((neg)&&(di[p]>=v))) match=true;
            break;
          default:
            switch(p)
            {
              case 'Priority':
                priority=v;
              case 'IsMobile':
                req=false;numprops--;
                break;
              case 'UserAgent':
                v=(navigator.userAgent.indexOf(v) != -1);
                if(!neg==v) match=true;
                break;
              case 'UserAgentIC':
                v=(ua.indexOf(v.toLowerCase()) != -1);
                if(!neg==v) match=true;
                break;
              default:
                val=di[p];
                if(val === 'undefined') break;
                if(val === 'function') val=val(p,dev,props);
                else if(((!neg)&&(val==v))||((neg)&&(val!=v))) match=true;
                break;
            }
            break;
        }
        if(match) pts++;
        else if(req) { pts=-10000; break; }
      }
      if(profile.charAt(0)==='_') priority=-1;
      if(priority>1) priority=1;
      return { numprops: numprops, pts: pts, matched: (numprops>0)&&(pts!=-10000), priority: priority };
    }
    
    var devprops,e,numobjects,firstdev;
    var eprops={};
    for(var dev in ngDevices)
    {
      if(typeof firstdev==='undefined') firstdev=dev;
      devprops=ngDevices[dev];
      numobjects=0;
      eprops[dev]={};
      for(var p in devprops)
        if(typeof devprops[p]==='object') 
        {
          numobjects++
          e=evalprops(dev, devprops[p], p);
          eprops[dev][p]=e;
        }
      if(!numobjects) {
        e=evalprops(dev, devprops, '');
        eprops[dev]=e;
      }
      else eprops[dev]._numobjects=numobjects;
    }
    var maxpts=0, minprops=10000, maxpriority=-1;
    var defaultdevice,p;

    function cmpe(dev,e) {
      if(!e.numprops) {
        if(typeof defaultdevice === 'undefined') defaultdevice=dev;
      }
      if((!e.matched)||(e.priority<0)) return;
      if((e.priority>maxpriority)||((maxpriority==e.priority)&&(e.pts>maxpts))||((maxpriority==e.priority)&&(e.pts==maxpts)&&(e.numprops<minprops)))
      {
        maxpriority=e.priority;
        maxpts=e.pts;
        minprops=e.numprops;
        device=dev;
      }
    }

    var p;
    for(var d in eprops) {
      p=eprops[d];
      if(p._numobjects>0) {
        delete p._numobjects;
        for(var pp in p) {
          cmpe(d,p[pp]);
          p[pp]=p[pp].matched;
        }
      }
      else { cmpe(d,p); eprops[d]=p._matched; }
    }

    if(typeof device==='undefined') device=defaultdevice;
    if(typeof device==='undefined') device=firstdev;

    if((typeof extinfo==='object')&&(extinfo)) {
      extinfo.DeviceInfo=di;
      extinfo.Device=device;
      extinfo.DevicesStatus=eprops;
      if(typeof eprops[device]==='object') extinfo.DeviceProfile=eprops[device];
      else delete extinfo.DeviceProfile;
    }
  }
  return device;
}
  
function ngSetDevice(device,dinfo) {
  if(typeof dinfo === 'undefined') {
    var dinfo={};
    ngDetectDevice(dinfo);
    if((typeof device==='undefined')||(device=='')) device=dinfo.Device;
  }
  ngDevice=device;
  if((typeof device!=='undefined')&&(typeof dinfo.DevicesStatus[device]==='object')) ngDeviceProfile=dinfo.DevicesStatus[device];
  else { var undefined; ngDeviceProfile=undefined; }
  dinfo.Device=device;
  dinfo.DeviceProfile=ngDeviceProfile;
  if(typeof ngOnDeviceChanged==='function') ngOnDeviceChanged(dinfo);
}

function ngLoadAppDeviceCSS(device, url, data)
{
  if((typeof ngDevice === 'undefined')||(ngDevice!=device)) return;
  return ngLoadAppCSS(url,data);
}

function ngLoadAppDeviceScript(device, url, data, loadcallback, async)
{
  if((typeof ngDevice === 'undefined')||(ngDevice!=device)) return;
  return ngLoadAppScript(url,data,loadcallback,async);
}

function ngLoadAppDeviceImg(device, url, data, loadcallback)
{
  if((typeof ngDevice === 'undefined')||(ngDevice!=device)) return;
  return ngLoadAppImg(url,data,loadcallback);
}
