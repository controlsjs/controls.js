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

(function(window) {
  /**
   *  Class: ngSysContainer
   *  This class implements non-visual container control.
   *
   *  Syntax:
   *    new *ngSysContainer* ([string id])
   *
   *  Parameters:
   *    id - control ID
   *
   *  See also:
   *    Abstract class <ngSysControl>
   */
  window.ngSysContainer = function(id)
  {
    ngSysControl(this, id, 'ngSysContainer');
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
    this.timer_id=null;
    this.timer_repeat=void 0;
    this.timer_interval=void 0;
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
  window.ngTimer = function(callback,interval,repeat) {
    this.timer_id=null;
    this.timer_interval=void 0;
    this.timer_repeat=void 0;
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
    if(e) ng_CallParent(this,'Start',[]);
    else ng_CallParent(this,'Stop',[]);
  }

  function ngstm_DoCreate(def,ref) {
    var e;
    if((typeof def.Data === 'object')&&(def.Data)) e=ngVal(def.Data.Enabled,this.Enabled);
    else e=this.Enabled;
    if(ngVal(e,true)) ng_CallParent(this,'Start',[]);
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
   *    Abstract class <ngSysControl> and <ngTimer> class.
   */
  window.ngSysTimer = function(id)
  {
    ngSysControl(this, id, 'ngSysTimer');
    ngTimer.apply(this);
    this.DoSetEnabled = ngstm_DoSetEnabled;
    this.DoCreate = ngstm_DoCreate;
    this.DoDispose = ngstm_DoDispose;
    ng_OverrideMethod(this,'Start',ngstm_Start);
    ng_OverrideMethod(this,'Stop',ngstm_Stop);
    ngControlCreated(this);
  }

  function ngsrpc_DoDispose() {
    if(ngVal(this.id,'')!='') delete ngRPCByID[this.id];
    return true;
  }

  function ngsrpc_sendRequest() {
    return this.Enabled ? ng_CallParent(this,'sendRequest',arguments,false) : false;
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
   *    Abstract class <ngSysControl> and <ngRPC> class.
   */
  window.ngSysRPC = function(id)
  {
    ngSysControl(this, id, 'ngSysRPC');
    ngRPC.apply(this, [id]);
    this.DoDispose = ngsrpc_DoDispose;
    ng_OverrideMethod(this,'sendRequest',ngsrpc_sendRequest);
    ngControlCreated(this);
  }

  // --- ngSysURLParams ----------------------------------------------------------

  function ngsurl_DoDispose() {
    if(this._inittimer) clearTimeout(this._inittimer);
    this._inittimer=null;

    if((typeof ngApp==='object')&&(ngApp)) {
      ngApp.RemoveEvent('OnParamsChanged',this._paramschanged);
    }
    return true;
  }

  function ngsurl_DoSetEnabled(s) {
    this.Enabled=s;
    if(s) {
      if(!this._initialized) {
        var self=this;
        this._inittimer=setTimeout(function() {
          self.Initialize();
        },1);
      }
      else {
        this.URLParamsChanged();

        if((this._params_changed)&&(this._update_cnt<=0)) {
          this._params_changed=false;
          this.DoParamsChanged();
        }
      }
    }
    else {
      if(this._inittimer) clearTimeout(this._inittimer);
      this._inittimer=null;
    }
  }

  function ngsurl_URLParamsChanged() {
    if((!this.Enabled)||(!this._initialized)) return;

    var changed=false;
    for(var i in this.Params) {
      var val=this.GetParam(i);
      if(val!==this.Params[i]) {
        if((!this.OnUpdate)||(ngVal(this.OnUpdate(this,i,val),false))) {
          changed=true;
          this.Params[i]=val;
        }
      }
    }
    if(changed) {
      this.DoParamsChanged();
    }
  }

  function ngsurl_DoCreate(def,ref) {
    if((typeof ngApp!=='object')||(!ngApp)) return;

    ngApp.AddEvent('OnParamsChanged',this._paramschanged);

    if(this.Enabled) {
      var self=this;
      this._inittimer=setTimeout(function() {
        self.Initialize();
      },1);
    }
  }

  function ngsurl_Initialize() {
    if((typeof ngApp!=='object')||(!ngApp)) return;

    if(this._initialized) return;

    try {
      this.SetEnabled(true);
      if(this._inittimer) clearTimeout(this._inittimer);
      this._inittimer=null;

      for(var i in this.Params) {
        var val=this.GetParam(i);
        if((!this.OnInit)||(ngVal(this.OnInit(this,i,val),false))) {
          ngApp.PersistParam(i, true);
        }
        this.Params[i]=val;
      }
      if(this.OnInitialized) this.OnInitialized(this);
    }
    finally {
      this._initialized=true;
    }
  }

  function ngsurl_DoParamsChanged()
  {
    if((this._update_cnt>0)||(!this.Enabled)||(!this._initialized)) this._params_changed = true;
    else if(this.OnParamsChanged) this.OnParamsChanged(this);
  }

  function ngsurl_BeginUpdate() {
    this._update_cnt++;
    if((typeof ngApp==='object')&&(ngApp))
      ngApp.BeginUpdateParams();
  }

  function ngsurl_EndUpdate() {
    if((typeof ngApp==='object')&&(ngApp))
      ngApp.EndUpdateParams();

    this._update_cnt--;
    if(this._update_cnt<=0) {
      this._update_cnt=0;
      if((this._params_changed)&&(this.Enabled)&&(this._initialized)) {
        this._params_changed=false;
        this.DoParamsChanged();
      }
    }
  }

  function ngsurl_SetParam(p,v) {
    if((typeof ngApp!=='object')||(!ngApp)) return;

    var nv,changed=false;

    if((typeof this.Params[p] === 'undefined')&&(typeof ngApp.ParamType(p) === 'undefined')) {
      ngApp.PersistParam(p, true);
    }
    else if((!this.Enabled)||(!this._initialized)) return;

    if((typeof this.DefaultValues[p]!=='undefined')&&((typeof v === 'undefined')||(v=='')||(v===null)||(v==this.DefaultValues[p]))) {
      v=void 0;
      nv=this.DefaultValues[p];
    }
    else nv=v;
    if(nv!==this.Params[p]) {
      this.Params[p]=nv;
      changed=true;
    }
    if((this.Enabled)&&(this._initialized)) {
      if(this.OnSetParam) v=this.OnSetParam(this,p,v);
      ngApp.SetClientParam(p, v);
      if(changed) this.DoParamsChanged();
    }
  }

  function ngsurl_GetParam(p) {
    if((typeof ngApp!=='object')||(!ngApp)) return;

    var v=ngApp.Param(p);
    if(this.OnGetParam) v=this.OnGetParam(this,p,v);

    if(((typeof v === 'undefined')||(v=='')||(v===null))&&(typeof this.DefaultValues[p]!=='undefined')) v=this.DefaultValues[p];
    return v;
  }

  function ngsurl_GetValues() {
    var vals={};
    for(var i in this.Params) {
      vals[i]=this.GetParam(i);
    }
    return vals;
  }

  function ngsurl_SetValues(vals) {
    if(!ng_EmptyVar(vals)) {
      if((typeof ngApp!=='object')||(!ngApp)) return;
      this.BeginUpdate();
      try {
        for(var i in vals) {
          this.SetParam(i,vals[i]);
        }
      } finally {
        this.EndUpdate();
      }
    }
  }

  window.ngSysURLParams = function(id)
  {
    ngSysControl(this, id, 'ngSysURLParams');

    this._initialized=false;
    this._inittimer=null;
    this._update_cnt=0;
    this._params_changed=false;

    /*
    *  Group: Properties
    */
    /*  Variable: DefaultValues
    *  ...
    *  Type: object
    *  Default value: {}
    */
    this.DefaultValues = {};

    /*  Variable: Params
    *  ...
    *  Type: object
    *  Default value: {}
    */
    this.Params = {};

    var self=this;

    this._paramschanged = function() {
      self.URLParamsChanged(self);
    };

    this.URLParamsChanged=ngsurl_URLParamsChanged;
    this.DoParamsChanged = ngsurl_DoParamsChanged;
    this.DoCreate = ngsurl_DoCreate;
    this.DoDispose = ngsurl_DoDispose;
    this.DoSetEnabled = ngsurl_DoSetEnabled;

    /*
    *  Group: Methods
    */
    /*  Function: GetParam
    *  Gets current value of parameter.
    *
    *  Syntax:
    *    mixed *GetParam* (string name)
    *
    *  Parameters:
    *    name - name of parameter
    *
    *  Returns:
    *    Current value of parameter.
    */
    this.GetParam = ngsurl_GetParam;
    /*  Function: SetParam
    *  Sets value of parameter.
    *
    *  Syntax:
    *    void *SetParam* (string name, mixed value)
    *
    *  Parameters:
    *    name - name of parameter
    *    value - new value of parameter
    *
    *  Returns:
    *    -
    */
    this.SetParam = ngsurl_SetParam;

    /*  Function: GetValues
    *  Gets current value of all parameters.
    *
    *  Syntax:
    *    object *GetValues* ()
    *
    *  Returns:
    *    Object with parameters value.
    */
    this.GetValues = ngsurl_GetValues;
    /*  Function: SetValues
    *  Sets value of multiple parameters.
    *
    *  Syntax:
    *    void *SetValues* (object values)
    *
    *  Parameters:
    *    values - object with values to be set
    *
    *  Returns:
    *    -
    */
    this.SetValues = ngsurl_SetValues;

    /*  Function: Initialize
    *  Forces initialization of URL parameters.
    *  If not called manually the initialization occurs right after
    *  the execution is returned back to browser.
    *
    *  Syntax:
    *    void *Initialize* ()
    *
    *  Returns:
    *    -
    */
    this.Initialize=ngsurl_Initialize;

    /*  Function: BeginUpdate
    *  Prevents the updating of parameters until the <EndUpdate> method is called.
    *
    *  Syntax:
    *    void *BeginUpdate* ()
    *
    *  Returns:
    *    -
    *
    *  See also:
    *    <EndUpdate>
    */
    this.BeginUpdate=ngsurl_BeginUpdate;
    /*  Function: EndUpdate
    *  Performs application parameters update deferred by a call to <BeginUpdate>.
    *
    *  Syntax:
    *    void *EndUpdate* ()
    *
    *  Returns:
    *    -
    *
    *  See also:
    *    <BeginUpdate>
    */
    this.EndUpdate=ngsurl_EndUpdate;

    /*
    *  Group: Events
    */
    /*
    *  Event: OnInit
    */
    this.OnInit = null;
    /*
    *  Event: OnUpdate
    */
    this.OnUpdate = null;
    /*
    *  Event: OnGetParam
    */
    this.OnGetParam = null;
    /*
    *  Event: OnSetParam
    */
    this.OnSetParam = null;
    /*
    *  Event: OnInitialized
    */
    this.OnInitialized = null;
    /*
    *  Event: OnParamsChanged
    */
    this.OnParamsChanged = null;

    ngControlCreated(this);
  }
})(window);

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['system'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'System',

  OnInit: function() {
    function ngSysContainer_Create(def, ref, parent)
    {
      def.ParentReferences=ngVal(def.ParentReferences, false);
      return new ngSysContainer;
    }

    ngRegisterControlType('ngSysContainer', ngSysContainer_Create);
    ngRegisterControlType('ngSysTimer', function() { return new ngSysTimer; });
    ngRegisterControlType('ngSysRPC', function() { return new ngSysRPC; });
    ngRegisterControlType('ngSysURLParams', function() { return new ngSysURLParams; });
  }
};
