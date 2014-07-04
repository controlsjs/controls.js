// $Id: clipboard.js 5845 2014-01-30 12:08:35Z tulach $
//
// Copyright (c) 2009-2013  Position s.r.o.
// All rights reserved.


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
  OnInit: function() {
    if((typeof ngApp === 'object')&&(ngApp)) ngApp.Clipboard = new ngClipboard;
  }
};
