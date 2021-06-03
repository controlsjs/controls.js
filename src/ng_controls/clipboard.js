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
if(typeof ngc_Lang === 'undefined') ngc_Lang={};
if(typeof ngc_Lang['en'] === 'undefined') ngc_Lang['en']={};
ngc_Lang['en']['ngClipboardCTRLC']='CTRL+C';

function ngclip_SetText(text, onsucc, onfail)
{
  function dosucc() {
    if(onsucc) onsucc(text);
  }
  
  function dofail()
  {
    if(onfail) onfail(text);
    else window.prompt(ngTxt('ngClipboardCTRLC'),text);
  }

  try { 
    if(!navigator.clipboard) {
      if(window.clipboardData) {
        window.clipboardData.setData(ngIExplorer ? 'Text' : 'text/plain', text);
        if(onsucc) ngApp.InvokeLater(dosucc);
      } else {
        var tempInput = document.createElement("textarea");
        try {        
          tempInput.style.position='absolute';
          tempInput.style.left='-1000px';
          tempInput.style.top='-1000px';
          tempInput.style.width='100px';
          tempInput.style.height='100px';
          if(typeof ngModalCnt!=='undefined') tempInput.style.zIndex=(ngModalCnt+1)*ngModalZIndexDelta;
          else tempInput.style.zIndex=10000000;
          tempInput.value = text;
          document.body.appendChild(tempInput);
          tempInput.select();
          if(tempInput.setSelectionRange) tempInput.setSelectionRange(0, 99999); /* For mobile devices */
          document.execCommand("copy");
          document.body.removeChild(tempInput);
          if(onsucc) ngApp.InvokeLater(dosucc);
        } catch(e) {
          document.body.removeChild(tempInput);
          ngApp.InvokeLater(dofail);          
        }      
      }
    } else {
      navigator.clipboard.writeText(text).then(dosucc,dofail);
    }    
  } catch(e) {
    ngApp.InvokeLater(dofail);          
  }
  return true;  
}

function ngClipboard()
{
  this.SetText = ngclip_SetText;
  this.IsSupported = true;// !!(ngIExplorer || navigator.clipboard);
}

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['clipboard'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    if((typeof ngApp === 'object')&&(ngApp)) ngApp.Clipboard = new ngClipboard;
  }
};
