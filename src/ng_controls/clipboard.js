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

function ngclip_SetTextNone(text)
{
  // not supported
  return false;
}

function ngclip_SetTextIE(text)
{
  try { 
    window.clipboardData.setData('Text',text);
    return true;
  } catch(e) { }
  return false;  
}

function ngClipboard()
{
  
  if(ngIExplorer)
  {
    this.SetText = ngclip_SetTextIE;
    this.IsSupported = true;
  }
  else
  {
    this.IsSupported = false;
    this.SetText = ngclip_SetTextNone;
  }  
}

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['clipboard'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    if((typeof ngApp === 'object')&&(ngApp)) ngApp.Clipboard = new ngClipboard;
  }
};
