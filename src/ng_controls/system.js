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

// --- ngSysAction -------------------------------------------------------------

var ngact_RadioGroups = new Array();

function ngact_CheckRadioGroup()
{
  var state=ngVal(this.Checked,0);
  if((typeof this.RadioGroup !== 'undefined')&&(state)&&(ngact_RadioGroups[this.RadioGroup]!=this))
  {
    var uncheck=ngact_RadioGroups[this.RadioGroup];
    ngact_RadioGroups[this.RadioGroup]=this;
    if((uncheck)&&(typeof uncheck.Check==='function')) uncheck.Check(0);
  }
}

function ngact_Check(state)
{
  state=ngVal(state,1);
  if(ngVal(this.Checked,0)!=state)
  {
    this.Checked=state;
    if(this.OnCheckChanged) this.OnCheckChanged(this);
    if(this.Checked==state)
    {
      var cc=this.ActionControls;
      if(cc)
      {
        var c;
        this.in_action_check = true;
        for(var i=0;i<cc.length;i++)
        {
          c=cc[i];
          if(c.Control.ActionCheck) c.Control.ActionCheck(state, c.Data);
        }
        this.in_action_check = false;
      }
    }
  }
}

function ngact_Click(e)
{
  if(typeof e === 'undefined') e=new Object;
  e.Owner = this;
  e.action = this;
  if(!this.Enabled) return;
  if((this.OnClick)&&(!ngVal(this.OnClick(e),false))) return;

  var cc=this.ActionControls;
  if(cc)
  {
    var c;
    this.in_action_click = true;
    for(var i=0;i<cc.length;i++)
    {
      c=cc[i];
      if(c.Control.ActionClick) c.Control.ActionClick(e,c.Data);
    }
    this.in_action_click = false;
  }
}

function ngact_AddControl(ctrl,data)
{
  if(!ctrl) return;

  data=ngVal(data,null);
  if(!this.ActionControls) this.ActionControls=new Array();
  var cc=this.ActionControls;
  if(cc)
  {
    var c;
    for(var i=0;i<cc.length;i++)
    {
      c=cc[i];
      if((c.Control==ctrl)&&(c.Data==data)) return;
    }
    cc[cc.length] = { Control: ctrl, Data: data };
  }
}

function ngact_RemoveControl(ctrl, data)
{
  if((!ctrl)||(!this.ActionControls)) return;

  data=ngVal(data,null);
  var cc=this.ActionControls;
  if(cc)
  {
    var c;
    for(var i=cc.length-1;i>=0;i--)
    {
      c=cc[i];
      if((c.Control==ctrl)&&(c.Data==data)) cc.splice(i, 1);
    }
    if(!cc.length) this.ActionControls=null;
  }
}

function ngact_SetVisible(v)
{
  v=ngVal(v,true);
  if(this.Visible!=v)
  {
    if((this.OnSetVisible)&&(!ngVal(this.OnSetVisible(this,v),false))) return;
    this.Visible=v;
    if(this.OnVisibleChanged) this.OnVisibleChanged(this);
    if(this.Visible==v)
    {
      var cc=this.ActionControls;
      if(cc)
      {
        var c;
        this.in_action_visible = true;
        for(var i=0;i<cc.length;i++)
        {
          c=cc[i];
          if(c.Control.ActionSetVisible) c.Control.ActionSetVisible(v, c.Data);
        }
        this.in_action_visible = false;
      }
    }
  }
}

function ngact_Update()
{
  if((this.OnUpdate)&&(!ngVal(this.OnUpdate(this),false))) return;

  var cc=this.ActionControls;
  if(cc)
  {
    var c;
    for(var i=0;i<cc.length;i++)
    {
      c=cc[i];
      if(c.Control.ActionUpdate) c.Control.ActionUpdate(c.Data);
    }
  }

  if(this.OnUpdated) this.OnUpdated(this,null);
}

/**
 *  Class: ngSysAction
 *  This class implements action non-visual control.
 *
 *  Syntax:
 *    new *ngSysAction* ([string id])
 *
 *  Parameters:
 *    id - control ID
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngSysAction(id, text)
{
  ngSysControl(this, id, 'ngSysAction');

  /*
   *  Group: Properties
   */
  /*  Variable: Text
   *  ...
   *  Type: string
   */
  this.Text = ngVal(text,'');

  /*  Variable: Alt
   *  ...
   *  Type: string
   */
  this.Alt = '';

  /*  Variable: Checked
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  //this.Checked = undefined;
  //optional:
  /*  Variable: RadioGroup
   *  ...
   *  Type: string
   *  Default value: *undefined*
   */
  // this.RadioGroup = undefined;

  /*  Variable: Img
   *  ...
   *  Type: object
   */
  //this.Img = undefined;
  /*  Variable: Visible
   *  Determines whether the control is visible.
   *  Type: bool
   */
  this.Visible = true;


  this.ActionControls = null;

  /*
   *  Group: Methods
   */
  /*  Function: Check
   *  Sets new button check state.
   *
   *  Syntax:
   *    void *Check* (int newval)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.Check = ngact_Check;

  /*  Function: Click
   *  Clicks the button.
   *
   *  Syntax:
   *    void *Click* ([event ev])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.Click = ngact_Click;

  /*  Function: SetText
   *  Sets new button text.
   *
   *  Syntax:
   *    void *SetText* (string text)
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.SetText = ngc_SetText;

  this.Update = ngact_Update;
  this.GetImg = ngc_GetImg;
  this.GetText = ngc_GetText;
  this.GetAlt = ngc_GetAlt;
  this.SetVisible = ngact_SetVisible;
  this.AddControl = ngact_AddControl;
  this.RemoveControl = ngact_RemoveControl;
  this.CheckRadioGroup = ngact_CheckRadioGroup;
  this.in_action_check = false;
  this.in_action_click = false;
  this.in_action_visible = false;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnSetText
   */
  this.OnSetText = null;
  /*
   *  Event: OnGetText
   */
  this.OnGetText = null;
  /*
   *  Event: OnGetAlt
   */
  this.OnGetAlt = null;

  /*
   *  Event: OnCheckChanged
   */
  this.OnCheckChanged = null;

  /*
   *  Event: OnClick
   */
  this.OnClick = null;

  /*
   *  Event: OnGetImg
   */
  this.OnGetImg = null;
  /*
   *  Event: OnSetVisible
   */
  this.OnSetVisible     = null;
  /*
   *  Event: OnVisibleChanged
   */
  this.OnVisibleChanged = null;
  /*
   *  Event: OnUpdate
   */
  this.OnUpdate = null;

  ngControlCreated(this);
}

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['system'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'System',

  OnInit: function() {
    ngRegisterControlType('ngSysAction', function() { return new ngSysAction; });
  }
};