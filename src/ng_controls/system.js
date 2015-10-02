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
        try {
          for(var i=0;i<cc.length;i++)
          {
            c=cc[i];
            if(c.Control.ActionCheck) c.Control.ActionCheck(state, c.Data);
          }
        }
        finally {
          this.in_action_check = false;
        }
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
    try {
      for(var i=0;i<cc.length;i++)
      {
        c=cc[i];
        if(c.Control.ActionClick) c.Control.ActionClick(e,c.Data);
      }
    }
    finally {
      this.in_action_click = false;
    }
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
        try {
          for(var i=0;i<cc.length;i++)
          {
            c=cc[i];
            if(c.Control.ActionSetVisible) c.Control.ActionSetVisible(v, c.Data);
          }
        }
        finally {
          this.in_action_visible = false;
        }
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

// --- ngTimer -----------------------------------------------------------------

function ngtm_DoTimer() {
  if(this.OnTimer) return this.OnTimer(this,this.timer_tickcnt);
  else return false;
}

function ngtm_IsStarted() {
  return(this.timer_id!==null);
}

function ngtm_Start() {
  if(this.IsStarted()) return;

  this.timer_interval=ngVal(this.Interval,0);
  this.timer_repeat=ngVal(this.Repeat,true);

  if(((this.OnStart)&&(!ngVal(this.OnStart(this),false)))
    ||(this.timer_interval<=0)
    ||((typeof this.timer_repeat==='number')&&(this.timer_repeat<=0)))
  {
    this.Stop();
    return;
  }

  var self=this;
  this.timer_tickcnt=0;
  if(this.timer_repeat) {
    this.timer_id=setInterval(
      function() {
        self.timer_tickcnt++;
        if((!ngVal(self.DoTimer(),false))
         ||((typeof self.timer_repeat==='number')&&(self.timer_tickcnt>=self.timer_repeat)))
          self.Stop();
      }, this.timer_interval);
  }
  else this.timer_id=setTimeout(function() { self.timer_tickcnt++; self.DoTimer(); self.Stop(); }, this.timer_interval);
}

function ngtm_Stop() {
  if(!this.IsStarted()) return;

  if(this.OnStop) this.OnStop(this,this.timer_tickcnt);

  if(this.timer_id) {
    if(this.timer_repeat)
      clearInterval(this.timer_id);
    else
      clearTimeout(this.timer_id);
  }
  var undefined;
  this.timer_id=null;
  this.timer_repeat=undefined;
  this.timer_interval=undefined;
}

function ngtm_Restart() {
  this.Stop();
  this.Start();
}

/**
 *  Class: ngTimer
 *  This class implements timer object.
 *
 *  Syntax:
 *    new *ngTimer* ([function callback=null, int interval=1000, mixed repeat=true])
 *
 *  Parameters:
 *    callback - the function that will be executed
 *    interval - the number of milliseconds to wait before executing the code
 *    repeat - if FALSE the execution occurs only once; can be also a number when limited number of execution is required
 */
function ngTimer(callback,interval,repeat) {
  var undefined;
  this.timer_id=null;
  this.timer_interval=undefined;
  this.timer_repeat=undefined;
  this.timer_tickcnt=0;

  this.DoTimer = ngtm_DoTimer;

  this.AddEvent = ngObjAddEvent;
  this.RemoveEvent = ngObjRemoveEvent;

  /*
   *  Group: Properties
   */
  /*  Variable: Interval
   *  ...
   *  Type: integer
   *  Default value: 1000
   */
  this.Interval=ngVal(interval,1000);
  /*  Variable: Repeat
   *  ...
   *  Type: bool
   *  Default value: true
   */
  this.Repeat=ngVal(repeat,true);

  /*
   *  Group: Methods
   */
  /*  Function: Start
   *  Starts timer.
   *
   *  Syntax:
   *    void *Start* ()
   *
   *  Returns:
   *    -
   */
  this.Start = ngtm_Start;
  /*  Function: Stop
   *  Stops timer.
   *
   *  Syntax:
   *    void *Stop* ()
   *
   *  Returns:
   *    -
   */
  this.Stop = ngtm_Stop;
  /*  Function: Restart
   *  Restarts timer.
   *
   *  Syntax:
   *    void *Restart* ()
   *
   *  Returns:
   *    -
   */
  this.Restart = ngtm_Restart;
  /*  Function: IsStarted
   *  Tests if timer is running.
   *
   *  Syntax:
   *    bool *IsStarted* ()
   *
   *  Returns:
   *    TRUE if timer is running.
   */
  this.IsStarted = ngtm_IsStarted;
  /*
   *  Group: Events
   */
  /*
   *  Event: OnTimer
   */
  this.OnTimer=ngVal(callback,null);
  /*
   *  Event: OnStart
   */
  this.OnStart=null;
  /*
   *  Event: OnStop
   */
  this.OnStop=null;
}

function ngstm_DoSetEnabled(e) {
  this.Enabled=e;
  if(e) this.Start.original.apply(this);
  else this.Stop.original.apply(this);
}

function ngstm_DoCreate(def,ref) {
  var e;
  if((typeof def.Data === 'object')&&(def.Data)) e=ngVal(def.Data.Enabled,this.Enabled);
  else e=this.Enabled;
  if(ngVal(e,true)) this.Start.original.apply(this);
}

function ngstm_DoDispose() {
  this.Stop();
  return true;
}

function ngstm_Start() {
  this.SetEnabled(true);
}

function ngstm_Stop() {
  this.SetEnabled(false);
}

/**
 *  Class: ngSysTimer
 *  This class implements timer non-visual control.
 *
 *  Syntax:
 *    new *ngSysTimer* ([string id])
 *
 *  Parameters:
 *    id - control ID
 *
 *  See also:
 *    Abstract class <ngControl> and <ngTimer> class.
 */
function ngSysTimer(id)
{
  ngSysControl(this, id, 'ngSysTimer');
  ngTimer.apply(this);
  this.DoSetEnabled = ngstm_DoSetEnabled;
  this.DoCreate = ngstm_DoCreate;
  this.DoDispose = ngstm_DoDispose;
  var orig=this.Start;
  this.Start = ngstm_Start;
  this.Start.original=orig;

  var orig=this.Stop;
  this.Stop = ngstm_Stop;
  this.Stop.original=orig;

  ngControlCreated(this);
}

function ngsrpc_DoDispose() {
  if(ngVal(this.id,'')!='') delete ngRPCByID[this.id];
  return true;
}

function ngsrpc_sendRequest(url, nocache) {
  if(!this.Enabled) return false;
  return this.sendRequest.original.apply(this,[url,nocache]);
}
/**
 *  Class: ngSysRPC
 *  This class implements ngRPC non-visual control.
 *
 *  Syntax:
 *    new *ngSysRPC* ([string id])
 *
 *  Parameters:
 *    id - control ID
 *
 *  See also:
 *    Abstract class <ngControl> and <ngRPC> class.
 */
function ngSysRPC(id)
{
  ngSysControl(this, id, 'ngSysRPC');
  ngRPC.apply(this, [id]);
  var orig=this.sendRequest;
  this.DoDispose = ngsrpc_DoDispose;
  this.sendRequest = ngsrpc_sendRequest;
  this.sendRequest.original=orig;
  ngControlCreated(this);
}

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['system'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'System',

  OnInit: function() {
    ngRegisterControlType('ngSysAction', function() { return new ngSysAction; });
    ngRegisterControlType('ngSysTimer', function() { return new ngSysTimer; });
    ngRegisterControlType('ngSysRPC', function() { return new ngSysRPC; });
  }
};