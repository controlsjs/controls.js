/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2025 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */
if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['fullscreen'] = {
  Lib: 'ng_controls',

  OnInit: function() {

    function apperrorfullscreen() {
      var onfail=ngApp.FullScreenModeFail;
      delete ngApp.FullScreenModeFail;
      delete ngApp.FullScreenModeSuccess;

      ngApp.InFullScreenMode = false;
      ngApp.DoExitFullScreenMode();

      if(onfail) onfail();
    }

    function updateappfullscreen()
    {
      var elm=ngApp.GetFullScreenModeElement();
      var fs=(elm!==null);

      var onsucc=ngApp.FullScreenModeSuccess;
      delete ngApp.FullScreenModeFail;
      delete ngApp.FullScreenModeSuccess;
      if(ngVal(ngApp.InFullScreenMode,false)!==fs) {
        ngApp.InFullScreenMode = fs;
        if(fs) ngApp.DoEnterFullScreenMode(elm);
        else ngApp.DoExitFullScreenMode();
      }
      if(onsucc) onsucc();
    }

    if(!('InFullScreenMode' in ngApp)) ngApp.InFullScreenMode = false;
    if(!('FullScreenModeElm' in ngApp)) ngApp.FullScreenModeElm = null;

    if(!('OnEnterFullScreenMode' in ngApp)) ngApp.OnEnterFullScreenMode = null;
    if(!('OnExitFullScreenMode' in ngApp))  ngApp.OnExitFullScreenMode = null;

    if(document.addEventListener) {
      var vendors=['','moz','webkit','ms'];
      for(var i in vendors) {
        document.addEventListener(vendors[i]+"fullscreenchange", updateappfullscreen, false);
        document.addEventListener(vendors[i]+"fullscreenerror", apperrorfullscreen, false);
      }
    }

    ngApp.IsFullScreenModeAvailable = function() {
      var enabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullScreenEnabled || document.msFullScreenElement;
      return ngVal(enabled,false);
    };

    ngApp.GetFullScreenModeElement = function() {
      var elm=document.fullscreenElement || document.mozFullScreenElement || document.webkitFullScreenElement || document.msFullScreenEnabled;
      return ngVal(elm,null);
    };

    ngApp.DoEnterFullScreenMode = function(elm) {
      if((ngApp.FullScreenModeElm)&&(ngApp.FullScreenModeElm!==elm)) {
        ngApp.DoExitFullScreenMode();
      }
      if(typeof ngApp.FullScreenMobileKeyboardFix==='undefined') ngApp.FullScreenMobileKeyboardFix=ngApp.MobileKeyboardFix;
      ngApp.MobileKeyboardFix=false;
      ngApp.FullScreenModeElm=elm;
      if(ngApp.OnEnterFullScreenMode) ngApp.OnEnterFullScreenMode(elm);
    };

    ngApp.DoExitFullScreenMode = function() {
      var elm=ngApp.FullScreenModeElm;
      if(typeof ngApp.FullScreenMobileKeyboardFix!=='undefined') ngApp.MobileKeyboardFix=ngApp.FullScreenMobileKeyboardFix;
      delete ngApp.FullScreenMobileKeyboardFix;
      delete ngApp.FullScreenModeElm;
      if(ngApp.FullScreenControl) ngApp.ExitFullScreen();
      if(ngApp.OnExitFullScreenMode) ngApp.OnExitFullScreenMode(elm);
    };

    ngApp.RequestFullScreenMode = function(o, onsuccess, onfail)
    {
      if(!o) o=ngApp.TopElm();
      if((o)&&(!ngApp.FullScreenModeElm)&&(!ngApp.GetFullScreenModeElement()))
      {
        function reqfullstreen(prop)
        {
          ngApp.FullScreenModeElm = o;
          ngApp.FullScreenModeSuccess=onsuccess;
          ngApp.FullScreenModeFail=onfail;
          o[prop]();
          return true;
        }

        if (o.requestFullScreen) {
          return reqfullstreen('requestFullScreen');
        } else if (o.mozRequestFullScreen) {
          return reqfullstreen('mozRequestFullScreen');
        } else if (o.webkitRequestFullScreen) {
          return reqfullstreen('webkitRequestFullScreen');
        } else if (o.msRequestFullScreen) {
          return reqfullstreen('msRequestFullScreen');
        }
      }
      if(onfail) ngApp.InvokeLater(onfail);
      return false;
    };

    ngApp.ExitFullScreenMode = function(onsuccess, onfail)
    {
      if(ngApp.FullScreenModeElm)
      {
        function exitfullstreen(prop)
        {
          ngApp.FullScreenModeSuccess=onsuccess;
          ngApp.FullScreenModeFail=onfail;
          document[prop]();
          return true;
        }

        if (document.exitFullScreen) {
          return exitfullstreen('exitFullScreen');
        } else if (document.mozCancelFullScreen) {
          return exitfullstreen('mozCancelFullScreen');
        }
        else if (document.webkitCancelFullScreen) {
          return exitfullstreen('webkitCancelFullScreen');
        }
        else if (document.msExitFullScreen) {
          return exitfullstreen('msExitFullScreen');
        }
      }
      if(onfail) ngApp.InvokeLater(onfail);
      return false;
    };

    if(!('FullScreenOptions' in ngApp)) ngApp.FullScreenOptions=void 0;
    if(!('FullScreenControl' in ngApp)) ngApp.FullScreenControl=null;

    if(!('OnEnteringFullScreen' in ngApp)) ngApp.OnEnteringFullScreen = null;
    if(!('OnEnterFullScreen' in ngApp))    ngApp.OnEnterFullScreen = null;
    if(!('OnExitingFullScreen' in ngApp))  ngApp.OnExitingFullScreen = null;
    if(!('OnExitFullScreen' in ngApp))     ngApp.OnExitFullScreen = null;

    function disposefullscr()
    {
      if(ngApp.FullScreenControl===this) ngApp.ExitFullScreen();
    }

    function fullscreensetbound(props)
    {
      // just update bounds but don't set them
      if(typeof props!=='undefined')
      {
        if(typeof this.Bounds === 'undefined') this.Bounds=new Object;
        for(var i in props)
        {
          switch(i)
          {
            case 'L':
            case 'T':
            case 'R':
            case 'B':
            case 'W':
            case 'H':
              this.Bounds[i]=props[i];
              break;
            case 'IE6AlignFix':
              this.IE6AlignFix=props.IE6AlignFix;
              break;
          }
        }
      }
      return false;
    }

    ngApp.FullScreen = function(c, options)
    {
      if(!c) return false;
      if(ngApp.FullScreenControl) {
        if(ngApp.FullScreenControl===c) return true;
        ngApp.ExitFullScreen();
        if(ngApp.FullScreenControl) return false;
      }
      var o=c.Elm();
      if(!o) return false;
      var parent=o.parentNode;
      if(!parent) return false;

      if(!ng_IsObjVar(options)) options={};

      if((ngApp.OnEnteringFullScreen)&&(!ngVal(ngApp.OnEnteringFullScreen(c, options),true))) return false;
      if((c.OnEnteringFullScreen)&&(!ngVal(c.OnEnteringFullScreen(c, options),true))) return false;

      ng_MergeVar(options, {
        FullScreenMode: true,
        KeyEvents: true,
        BackgroundColor: color,
        Bounds: {
          L: 0, T: 0, R: 0, B: 0, W: void 0, H: void 0
        }
      }, true);
      var color=options.BackgroundColor;
      if(typeof color==='undefined') color=ng_GetBackgroundColor(o);

      var fo = document.getElementById('NGFULLSCREEN');
      if(!fo)
      {
        var p=ngApp.TopElm();
        fo=document.createElement('div');
        fo.id="NGFULLSCREEN";
        fo.style.position='absolute';
        fo.style.left=ng_ScrollX(p)+'px';
        fo.style.top=ng_ScrollY(p)+'px';
        fo.style.width='100%';
        fo.style.height='100%';
        fo.style.display='block';
        if(p) {
          p.appendChild(fo);
          p.onscroll=ngAddEvent(p.onscroll,function() {
            if(ngModalCnt>0) {
              fo.style.left=ng_ScrollX(p)+'px';
              fo.style.top=ng_ScrollY(p)+'px';
            }
          });
        }
      }
      else
      {
        var p=fo.parentNode;
        fo.style.left=ng_ScrollX(p)+'px';
        fo.style.top=ng_ScrollY(p)+'px';
        fo.style.display='block';
        fo.style.visibility='visible'; // IE7 sometimes don't hide elements if display is none
        ng_IE7RedrawFix(fo);
      }
      var oldanim=ngANIM;
      ngANIM=0;
      try {
        ngStartModalControl();
      } finally {
        ngANIM=oldanim;
      }

      fo.className=ngVal(options.BackgroundClassName,'ngFullScreen');
      fo.style.zIndex=(ngModalCnt*ngModalZIndexDelta)+1;
      fo.style.backgroundColor=color;

      parent.removeChild(o);
      fo.appendChild(o);
      c.Attach();
      c._FullScreenParentElm=parent;
      c.InFullScreen=true;
      c.AddEvent(disposefullscr, 'Dispose');
      ng_OverrideMethod(c,'SetBounds',fullscreensetbound);
      ngApp.FullScreenControl = c;
      ngApp.FullScreenOptions = options;

      if(ng_IsObjVar(options.Bounds)) {
        c._FullScreenBounds=ng_CopyVar(options.Bounds);
        ng_SetBounds(o, options.Bounds);
        c.Update();
      }
      else delete c._FullScreenBounds;

      if(c.OnEnterFullScreen) c.OnEnterFullScreen(c, options);
      if(ngApp.OnEnterFullScreen) ngApp.OnEnterFullScreen(c, options);

      if(options.FullScreenMode) ngApp.RequestFullScreenMode(null, options.OnEnterFullScreenMode, options.OnEnterFullScreenModeFailed);
      if(ngVal(options.SetFocus,true)) {
        ngApp.InvokeLater(function() {
          if((ng_IsObjVar(options.SetFocus))&&(typeof options.SetFocus.SetFocus === 'function')) options.SetFocus.SetFocus();
          else if(typeof c.SetFocus === 'function') c.SetFocus();
        });
      }
      return true;
    };

    ngApp.ExitFullScreen = function() {
      var c = ngApp.FullScreenControl;
      if(!c) return false;
      var fo = document.getElementById('NGFULLSCREEN');
      if(!fo) return false;
      var parent = c._FullScreenParentElm;
      if(!parent) return false;
      var o=c.Elm();
      if(!o) return false;
      var options = ngApp.FullScreenOptions;
      if(!ng_IsObjVar(options)) options={};

      if((ngApp.OnExitingFullScreen)&&(!ngVal(ngApp.OnExitingFullScreen(c, options),true))) return false;
      if((c.OnExitingFullScreen)&&(!ngVal(c.OnExitingFullScreen(c, options),true))) return false;

      var oldanim=ngANIM;
      ngANIM=0;
      try {
        ngStopModalControl();
      } finally {
        ngANIM=oldanim;
      }

      fo.removeChild(o);
      parent.appendChild(o);
      c.Attach();
      c._FullScreenParentElm=parent;

      fo.style.display='none';
      fo.style.visibility='hidden'; // IE7 sometimes don't hide elements if display is none
      ng_IE7RedrawFix(fo);

      var bounds=c._FullScreenBounds;

      delete c._FullScreenBounds;
      delete c._FullScreenParentElm;
      delete c.FullScreen;
      c.RemoveEvent('Dispose',disposefullscr);
      c.SetBounds.removeOverride(fullscreensetbound);

      ngApp.FullScreenOptions=void 0;
      ngApp.FullScreenControl=null;

      if(ng_IsObjVar(bounds)) {
        if(c.SetBounds()) c.Update();
      }

      if(c.OnExitFullScreen) c.OnExitFullScreen(c, options);
      if(ngApp.OnExitFullScreen) ngApp.OnExitFullScreen(c, options);

      if(options.FullScreenMode) ngApp.ExitFullScreenMode(options.OnExitFullScreenMode, options.OnExitFullScreenModeFailed);
      return true;
    }

    ngApp.ToggleFullScreen = function(c, options)
    {
      if(ngApp.FullScreenControl===c) {
        return ngApp.ExitFullScreen();
      }
      else return ngApp.FullScreen(c, options);
    }

    function fullscreenkeydown(e) {
      if((e.keyCode===27)&&(ngApp.FullScreenControl))
      {
        var options = ngApp.FullScreenOptions;
        if(!ng_IsObjVar(options)) options={};

        if((options.KeyEvents)&&(ngApp.ExitFullScreen())) {
          if(e.preventDefault) e.preventDefault();
          e.returnValue = false;
        }
      }
    }

    if(typeof window.addEventListener === 'function'){
      window.addEventListener("keydown",fullscreenkeydown,true);
    }
    else if(typeof window.attachEvent === 'function'){
      window.attachEvent('onkeydown',fullscreenkeydown);
    }
    updateappfullscreen();
  }
};
