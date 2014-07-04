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
  var width=0, height=0;
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
  return {
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
    SupportsTouch: ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch) || navigator.msMaxTouchPoints ? true : false)
  };   
}

function ngDetectDevice()
{
  var device;
  if((typeof ngDevices === 'object')&&(ngDevices)) 
  {
    var di=ngGetDeviceInfo();
    var maxpts=0, minprops=10000;
    var defaultdevice;
    var ua=navigator.userAgent.toLowerCase();
    
    function evalprops(dev, props)
    {
      var req,neg,v,prefix,match;
      var pts=0,numprops=0;
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
            if(((!neg)&&(di[p]>=v))||((neg)&&(di[p]<v))) match=true;
            break;
          case 'Max':
            p=p.substring(3,p.length);
            if(((!neg)&&(di[p]<v))||((neg)&&(di[p]>=v))) match=true;
            break;
          default:
            switch(p)
            {
              case 'IsMobile':
                req=false;numprops--;
                break;
              case 'IExplorer':
                v=(eval("/*@cc_on!@*/false"))==v; 
                if(!neg==v) match=true;
                break;
              case 'FireFox':
                v=((ua.indexOf("firefox") != -1)==v);
                if(!neg==v) match=true;
                break;
              case 'Chrome':
                v=((ua.indexOf("chrome") != -1)==v);
                if(!neg==v) match=true;
                break;
              case 'Safari':
                v=((ua.indexOf("safari") != -1)==v);
                if(!neg==v) match=true;
                break;              
              case 'Opera': 
                v=((ua.indexOf("opera") != -1)==v);
                if(!neg==v) match=true;
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
                if(((!neg)&&(di[p]==v))||((neg)&&(di[p]!=v))) match=true;
                break;
            }
            break;
        }
        if(match) pts++;
        else if(req) { pts=-10000; break; } 
      } 
      if(!numprops) {
        if(typeof defaultdevice === 'undefined') defaultdevice=dev;
      }
      else
      {
        if((pts>=0)&&((pts>maxpts)||((pts==maxpts)&&(numprops<minprops))))
        {
          maxpts=pts;
          minprops=numprops;
          device=dev;
        }
      }
    }
    
    var devprops,hasobjects;
    for(var dev in ngDevices)
    {
      devprops=ngDevices[dev];
      hasobjects=false;
      for(var p in devprops)
        if(typeof devprops[p]==='object') 
        {
          hasobjects=true;
          evalprops(dev, devprops[p]);
        }        
      if(!hasobjects) evalprops(dev, devprops);        
    }
    if(typeof device==='undefined') device=defaultdevice;
  }
  return device;
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
