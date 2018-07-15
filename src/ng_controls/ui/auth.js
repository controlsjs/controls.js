/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2017 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

/**
 *  Group: Auth Controls
 */

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['auth_controls'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    var undefined;

    function ngauth_ShowCapsLockWarning(s) {
      if((this.OnShowCapsLockWarning)&&(!ngVal(this.OnShowCapsLockWarning(this),false))) return;
      if(this.Controls.CapsLockWarn) this.Controls.CapsLockWarn.SetVisible(!!s);
    };

    function ngauth_CapsOnKeyDown(e) {
      if((e.keyCode==20)||(e.keyCode==13)||(e.keyCode==27)) {
        var c=e.Owner.Owner.Owner;
        c.ShowCapsLockWarning(false);
        c.UserClosedCapsWarn=(e.keyCode == 27 ? true : false);
      }
      return true;
    };

    function ngauth_CapsOnKeyPress(e) {
      if((e.altKey)||(e.ctrlKey)) return true;
      var ch = String.fromCharCode(e.keyCode | e.which);
      if(ch.toUpperCase() === ch.toLowerCase()) return true;
      var c=e.Owner.Owner.Owner;
      if((e.shiftKey && ch.toLowerCase() === ch) ||
        (!e.shiftKey && ch.toUpperCase() === ch)) {
        if(!c.UserClosedCapsWarn) c.ShowCapsLockWarning(true);
      } else {
        c.UserClosedCapsWarn=false;
        c.ShowCapsLockWarning(false);
      }
      return true;
    };

    function Create_ngLoginForm(def,ref,parent) {
      var c;
      var compact=ngVal(def.CompactMode,false);
      var showorganization=ngVal(def.ShowOrganization,false);
      var showrememberme=ngVal(def.ShowRememberMe,false);
      ng_MergeDef(def, {
        ParentReferences: false,
        Data: {
          SettingsName: 'ngLoginForm',
          ErrorMessage: '',
          AutoSize: true
        },
        Events: {
          OnLogin: null,
          OnLoginSuccess: null,
          OnLoginFailed: null,
          OnLoginFinished: null,
          OnShowProgress: null,
          OnHideProgress: null,
          OnShowCapsLockWarning: null,
          OnGetSettings: null,
          OnSetSettings: null
        },
        Methods: {
          SetErrorMessage: function(msg) {
            if(c.ErrorMessage!=msg) {
              c.ErrorMessage=msg;
              c.SetErrorState(true);
            }
          },
          SetErrorState: function(s) {
            if((c.ErrorMessage=='')||(!s)) c.Controls.Error.SetVisible(false);
            else {
              c.Controls.Error.SetText(c.ErrorMessage);
              c.Controls.Error.SetVisible(true);
            }
          },
          Clear: function() {
            var ctrls=c.Controls;
            if(ctrls.Organization) ctrls.Organization.SetText('');
            ctrls.Login.SetText('');
            ctrls.Password.SetText('');
            ctrls.RememberMe.Check(0);
            c.SetErrorMessage('');
            c.ShowCapsLockWarning(false);
            c.UserClosedCapsWarn=false;
          },
          SetFocus: function(s) {
            s=ngVal(s,true);
            var ctrls=c.Controls;
            if(s) {
              if(!c.Visible) return;
              if((ctrls.Organization)&&(ctrls.Organization.Visible)&&(ctrls.Organization.GetText()==''))
                ctrls.Organization.SetFocus();
              else
                if((ctrls.Login)&&(ctrls.Login.GetText()==''))
                  ctrls.Login.SetFocus();
                else
                  if(ctrls.Password) ctrls.Password.SetFocus();
            }
            else {
              if((ctrls.Organization)&&(ctrls.Organization.Visible)) ctrls.Organization.SetFocus(false);
              ctrls.Login.SetFocus(false);
              ctrls.Password.SetFocus(false);
            }
          },
          ShowCapsLockWarning: ngauth_ShowCapsLockWarning,
          GetLoginCredentials: function () {
            var data={};
            var ctrls=c.Controls;
            if((ctrls.Organization)&&(ctrls.Organization.Visible)) data.Organization=ctrls.Organization.GetText();
            data.Login=ctrls.Login.GetText();
            data.Password=ctrls.Password.GetText();
            return data;
          },
          SetLoginCredentials: function (data) {
            if(!ng_IsObjVar(data)) return;
            var ctrls=c.Controls;
            if((ctrls.Organization)&&(ctrls.Organization.Visible)) ctrls.Organization.SetText(ngNullVal(data.Organization,''));
            ctrls.Login.SetText(ngNullVal(data.Login,''));
            ctrls.Password.SetText(ngNullVal(data.Password,''));
          },
          ShowProgress: function(s) {
            c.SetEnabled(!s);
            if((v)&&(c.OnShowProgress)) {
              c.OnShowProgress(c);
              return;
            }
            if((!v)&&(c.OnHideProgress)) {
              c.OnHideProgress(c);
              return;
            }
            if((typeof c.Controls.Progress === 'object')&&(typeof c.Controls.Progress.SetVisible === 'function')) this.Controls.Progress.SetVisible(s);
          },
          DoSetSettings: function(data) {
            if((!c.OnSetSettings)||(!ngVal(c.OnSetSettings(c,data),true))) {
              if((typeof ngApp!=='undefined')&&(ng_IsObjVar(ngApp.Settings))&&(typeof ngApp.Settings.Set==='function')) ngApp.Settings.Set(c.SettingsName,data);
              else ngDEBUGWARN('ngLoginForm: Settings is not present but Remember Me feature is active!');
            }
          },
          DoGetSettings: function() {
            var data;
            if(c.OnGetSettings) data=c.OnGetSettings(c);
            if(!ng_IsObjVar(data)) {
              if((typeof ngApp!=='undefined')&&(ng_IsObjVar(ngApp.Settings))&&(typeof ngApp.Settings.Get==='function')) data=ngApp.Settings.Get(c.SettingsName);
              else ngDEBUGWARN('ngLoginForm: Settings is not present but Remember Me feature is active!');
            }
            return data;
          },
          DoLogin: function() {
            if((c.Controls.RememberMe.Visible)&&(c.SettingsName!='')&&(!c.Controls.RememberMe.Checked)) {
              c.DoSetSettings(void 0);
            }
            c.SetErrorMessage('');
            c.ShowProgress(true);
            if(c.OnLogin) {
              var rememberme;
              if(c.Controls.RememberMe.Visible) rememberme=!!c.Controls.RememberMe.Checked;
              if(!ngVal(c.OnLogin(c,c.GetLoginCredentials(),rememberme),false)) c.ShowProgress(false);
            }
          },
          Login: function(data) {
            c.SetLoginCredentials(data);
            c.DoLogin();
          },
          LoginFinished: function(errmsg)
          {
            if((c.OnLoginFinished)&&(!ngVal(c.OnLoginFinished(c,errmsg),false))) return;
            c.ShowProgress(false);
            errmsg=ngNullVal(errmsg,'');
            c.SetErrorMessage(ngTxt(errmsg,errmsg));
          },
          LoginSuccess: function() {
            var ctrls=c.Controls;
            if((ctrls.RememberMe.Visible)&&(c.SettingsName!='')&&(ctrls.RememberMe.Checked==1))
            {
              var rememberme=false;
              var data,o;
              data={};
              if((ctrls.Organization)&&(ctrls.Organization.Visible)) {
                o=ctrls.Organization.GetText();
                if(o!='') { data.Organization=o; rememberme=true; }
              }
              o=ctrls.Login.GetText();
              if(o!='') { data.Login=o; rememberme=true; }
              if(rememberme) c.DoSetSettings(data);
            }

            if((c.OnLoginSuccess)&&(!ngVal(c.OnLoginSuccess(c),false))) return;
            c.LoginFinished();
            c.Controls.Password.SetText('');
          },
          LoginFailed: function(errmsg) {
            if((c.OnLoginFailed)&&(!ngVal(c.OnLoginFailed(c,errmsg),false))) return;
            c.LoginFinished(ngVal(errmsg,'ngauthErrLogin'));
            c.SetFocus();
          }
        },
        Controls: {
          OrganizationLabel: {
            Type: 'ngButton',
            Data: {
              ToolBarBreak: true,
              Visible: (showorganization ? true : false),
              ngTextD: 'ngauthOrganization'
            }
          },
          Organization: {
            Type: 'ngEdit',
            L: 0, R: 0,
            Data: {
              ngHintD: (compact ? 'ngauthOrganization' : undefined),
              Visible: (showorganization ? true : false)
            },
            Events: {
              OnKeyUp: function(e) {
                if((e.keyCode==13)&&(c.Controls.Login.Visible)) {
                  c.Controls.Login.SetFocus();
                  return false;
                }
                return true;
              }
            }
          },
          LoginLabel: {
            Type: 'ngButton',
            Data: {
              ToolBarBreak: true,
              ngTextD: 'ngauthLogin'
            }
          },
          Login: {
            Type: 'ngEdit',
            L: 0, R: 0,
            Data: {
              ngHintD: (compact ? 'ngauthLogin' : undefined)
            },
            Events: {
              OnKeyUp: function(e) {
                if((e.keyCode==13)&&(c.Controls.Password.Visible)) {
                  c.Controls.Password.SetFocus();
                  return false;
                }
                return true;
              }
            }
          },
          PasswordLabel: {
            Type: 'ngButton',
            Data: {
              ToolBarBreak: true,
              ngTextD: 'ngauthLoginPassword'
            }
          },
          Password: {
            Type: 'ngEdit',
            L: 0, R: 0,
            Data: {
              Password: true,
              ngHintD: (compact ? 'ngauthLoginPassword' : undefined)
            },
            Events: {
              OnFocus: function(c) {
                if(typeof document.msCapsLockWarningOff!=='undefined') {
                  c.__msCapsLockWarningOff=document.msCapsLockWarningOff;
                  document.msCapsLockWarningOff=true;
                }
              },
              OnBlur: function(c) {
                if(typeof document.msCapsLockWarningOff!=='undefined') {
                  document.msCapsLockWarningOff = c.__msCapsLockWarningOff;
                  delete c.__msCapsLockWarningOff;
                }
                c.Owner.Owner.ShowCapsLockWarning(false);
                c.Owner.Owner.UserClosedCapsWarn=false;
              }
            },
            BeforeEvents: {
              OnKeyDown: ngauth_CapsOnKeyDown,
              OnKeyPress: ngauth_CapsOnKeyPress,
              OnKeyUp: function(e) {
                if((e.keyCode==13)&&(c.Controls.Login.Visible)) {
                  e.Owner.SetFocus(false);
                  c.Controls.LoginBtn.Click();
                  return false;
                }
                return true;
              }
            }
          },
          CapsLockWarn: {
            Type: 'ngText',
            L: 0, R: 0,
            Data: {
              Visible: false,
              ToolBarBreak: true,
              ngTextD: 'ngauthLoginWarnCapsLock'
            }
          },
          RememberMe: {
            Type: 'ngCheckBox',
            Data: {
              ToolBarBreak: true,
              Visible: showrememberme ? true : false,
              ngTextD: 'ngauthLoginRemember'
            }
          },
          LoginBtn: {
            Type: 'ngButton',
            Data: {
              ToolBarBreak: true,
              ngTextD: 'ngauthLoginBtn'
            },
            Events: {
              OnClick: function(e) {
                c.DoLogin();
              }
            }
          },
          Error: {
            Type: 'ngText',
            L: 0, R: 0,
            Data: {
              ToolBarBreak: true
            }
          }
        }
      });
      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if((c.Controls.RememberMe.Visible)&&(c.SettingsName!=''))
        {
          var ctrls=c.Controls;
          var data,rememberme=0;
          var data=c.DoGetSettings();
          if(ng_IsObjVar(data)) {
            if((ngNullVal(data.Organization,'')!='')&&(ctrls.Organization)&&(ctrls.Organization.Visible)) { ctrls.Organization.SetText(data.Organization); rememberme=1; }
            if(ngNullVal(data.Login,'')!='') { ctrls.Login.SetText(data.Login); rememberme=1; }
          }
          ctrls.RememberMe.Check(rememberme);
        }
      });
      if(compact) {
        delete def.Controls.OrganizationLabel;
        delete def.Controls.LoginLabel;
        delete def.Controls.PasswordLabel;
      }
      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if(c.ErrorMessage!='') c.SetErrorState(true);
      });
      c=ngCreateControlAsType(def, 'ngToolBar', ref, parent);
      return c;
    }

    function Create_ngPasswordForm(def,ref,parent) {
      var c;
      var showoldpassword=ngVal(def.ShowOldPassword,false);
      var compact=ngVal(def.CompactMode,false);
      ng_MergeDef(def, {
        ParentReferences: false,
        Data: {
          NewPasswordStrength: {
            MinLength: 0,
            MaxLength: 0,
            Digits: false,
            LowerCase: false,
            UpperCase: false,
            RegExp: ''
          },
          ErrorMessage: '',
          AutoSize: true
        },
        Events: {
          OnValidateNewPassword: null,
          OnNewPasswordErrorMessage: null,
          OnShowCapsLockWarning: null
        },
        Methods: {
          SetFocus: function(s) {
            s=ngVal(s,true);
            if(s) {
              if(!c.Visible) return;
              if(c.Controls.OldPassword.Visible) c.Controls.OldPassword.SetFocus();
              else c.Controls.NewPassword.SetFocus();
            }
            else {
              c.Controls.OldPassword.SetFocus(false);
              c.Controls.NewPassword.SetFocus(false);
              c.Controls.ConfirmNewPassword.SetFocus(false);
            }
          },
          SetErrorMessage: function(msg) {
            if(c.ErrorMessage!=msg) {
              c.ErrorMessage=msg;
              c.SetErrorState(true);
            }
          },
          SetErrorState: function(s) {
            if((c.ErrorMessage=='')||(!s)) c.Controls.Error.SetVisible(false);
            else {
              c.Controls.Error.SetText(c.ErrorMessage);
              c.Controls.Error.SetVisible(true);
            }
          },
          ShowCapsLockWarning: ngauth_ShowCapsLockWarning,
          Clear: function() {
            c.ClearPasswords();
            c.SetErrorMessage('');
          },
          GetPasswords: function(includeconfirm) {
            var data={};
            var ctrls=c.Controls;
            if((ctrls.OldPassword)&&(ctrls.OldPassword.Visible)) data.OldPassword=ctrls.OldPassword.GetText();
            var newpass=ctrls.NewPassword.GetText();
            if(includeconfirm) {
              data.NewPassword=newpass;
              data.ConfirmNewPassword=ctrls.ConfirmNewPassword.GetText();
            }
            else if(newpass===ctrls.ConfirmNewPassword.GetText()) data.NewPassword=newpass;
            return data;
          },
          SetPasswords: function(p) {
            if(!ng_IsObjVar(data)) return;
            var ctrls=c.Controls;
            if((ctrls.OldPassword)&&(ctrls.OldPassword.Visible)) ctrls.OldPassword.SetText(ngNullVal(data.OldPassword,''));
            var newpass=ngNullVal(data.NewPassword,'');
            ctrls.NewPassword.SetText(newpass);
            ctrls.ConfirmNewPassword.SetText(ngNullVal(data.ConfirmNewPassword,newpass));
          },
          ClearPasswords: function(newonly) {
            var ctrls=c.Controls;
            if(!newonly) ctrls.OldPassword.SetText('');
            ctrls.NewPassword.SetInvalid(false);
            ctrls.NewPassword.SetText('');
            ctrls.ConfirmNewPassword.SetInvalid(false);
            ctrls.ConfirmNewPassword.SetText('');
          },
          GetNewPassword: function(novalidate) {
            var data=c.GetPasswords(true);
            if(novalidate) return ngVal(data.NewPassword,'');
            var err=c.ValidateNewPassword(data);
            var msg=c.GetNewPasswordErrorMessage(err)
            return (msg=='' ? ngVal(data.NewPassword,'') : false);
          },
          ValidateNewPassword: function(data, strength) {
            if(typeof data==='undefined') data=c.GetPasswords(true);
            if(typeof strength==='undefined') strength=ngVal(c.NewPasswordStrength,{});

            var pwd=data.NewPassword;
            var pwdlen=pwd.length;
            var ret={};
            ret.ErrConfirmNewPassword=(data.NewPassword!='')&&(pwd!==data.ConfirmNewPassword);
            ret.ErrMinLength=((ngVal(strength.MinLength,0)>0)&&(pwdlen<strength.MinLength));
            ret.ErrMaxLength=((ngVal(strength.MaxLength,0)>0)&&(pwdlen>strength.MaxLength));
            ret.ErrDigits=((strength.Digits)&&(!/(?=.*[0-9])/.test(''+pwd)));
            ret.ErrLowerCase=((strength.LowerCase)&&(!/(?=.*[a-z])/.test(pwd)));
            ret.ErrUpperCase=((strength.UpperCase)&&(!/(?=.*[A-Z])/.test(pwd)));
            ret.ErrRegExp=((ngVal(strength.RegExp,'')!='')&&(!new RegExp(strength.RegExp).test(pwd)));

            if(c.OnValidateNewPassword) c.OnValidateNewPassword(c,ret,data,strength);

            return ret;
          },
          GetNewPasswordErrorMessage: function(err) {
            var msg;
            if(typeof err==='undefined') err=c.ValidateNewPassword();
            if(c.OnNewPasswordErrorMessage) {
              msg=c.OnNewPasswordErrorMessage(c,err);
              if(typeof err!=='undefined') return err;
            }
            err=ngVal(err,{});
            if(err.ErrMinLength) return ngTxt('ngauthErrNewPasswordMinLength');
            if(err.ErrMaxLength) return ngTxt('ngauthErrNewPasswordMaxLength');
            if(err.ErrDigits) return ngTxt('ngauthErrNewPasswordDigits');
            if(err.ErrLowerCase) return ngTxt('ngauthErrNewPasswordLowerCase');
            if(err.ErrUpperCase) return ngTxt('ngauthErrNewPasswordUpperCase');
            if(err.ErrRegExp) return ngTxt('ngauthErrNewPasswordRegExp');

            if(err.ErrConfirmNewPassword) return ngTxt('ngauthErrConfirmNewPassword');
            return '';

          },
          CheckNewPassword: function(ignoreemptyconfirm) {
            var err;
            var data=c.GetPasswords(true);
            if(data.NewPassword=='') err={};
            else err=c.ValidateNewPassword(data);
            if((data.ConfirmNewPassword==='')&&(ignoreemptyconfirm)) delete err.ErrConfirmNewPassword;
            var msg=c.GetNewPasswordErrorMessage(err)
            var ctrls=c.Controls;
            var invalid=(msg!='');
            ctrls.NewPassword.SetInvalid(invalid);
            ctrls.ConfirmNewPassword.SetInvalid(invalid);
            c.SetErrorMessage(msg);
          }
        },
        Controls: {
          OldPasswordLabel: {
            Type: 'ngButton',
            Data: {
              Visible: (showoldpassword ? true : false),
              ToolBarBreak: true,
              ngTextD: 'ngauthOldPassword'
            }
          },
          OldPassword: {
            Type: 'ngEdit',
            L: 0, R: 0,
            Data: {
              Visible: (showoldpassword ? true : false),
              ngHintD: (compact ? 'ngauthOldPassword' : undefined),
              Password: true
            },
            Events: {
              OnFocus: function(c) {
                if(typeof document.msCapsLockWarningOff!=='undefined') {
                  c.__msCapsLockWarningOff=document.msCapsLockWarningOff;
                  document.msCapsLockWarningOff=true;
                }
              },
              OnBlur: function(c) {
                if(typeof document.msCapsLockWarningOff!=='undefined') {
                  document.msCapsLockWarningOff = c.__msCapsLockWarningOff;
                  delete c.__msCapsLockWarningOff;
                }
                var t=window.setTimeout(function() {
                  window.clearTimeout(t);
                  c.Owner.Owner.ShowCapsLockWarning(false);
                  c.Owner.Owner.UserClosedCapsWarn=false;
                },1);
              },
              OnKeyDown: ngauth_CapsOnKeyDown,
              OnKeyPress: ngauth_CapsOnKeyPress,
              OnKeyUp: function(e) {
                if((e.keyCode==13)&&(c.Controls.NewPassword.Visible)) {
                  c.Controls.NewPassword.SetFocus();
                  return false;
                }
                return true;
              }
            }
          },
          NewPasswordLabel: {
            Type: 'ngButton',
            Data: {
              ToolBarBreak: true,
              ngTextD: 'ngauthNewPassword'
            }
          },
          NewPassword: {
            Type: 'ngEdit',
            L: 0, R: 0,
            Data: {
              ngHintD: (compact ? 'ngauthNewPassword' : undefined),
              Password: true
            },
            Events: {
              OnKeyDown: ngauth_CapsOnKeyDown,
              OnKeyPress: ngauth_CapsOnKeyPress,
              OnKeyUp: function(e) {
                if((e.keyCode==13)&&(c.Controls.ConfirmNewPassword.Visible)) {
                  c.Controls.ConfirmNewPassword.SetFocus();
                  return false;
                }
                return true;
              },
              OnFocus: function(c) {
                if(typeof document.msCapsLockWarningOff!=='undefined') {
                  c.__msCapsLockWarningOff=document.msCapsLockWarningOff;
                  document.msCapsLockWarningOff=true;
                }
              },
              OnBlur: function(c) {
                if(typeof document.msCapsLockWarningOff!=='undefined') {
                  document.msCapsLockWarningOff = c.__msCapsLockWarningOff;
                  delete c.__msCapsLockWarningOff;
                }
                var t=window.setTimeout(function() {
                  window.clearTimeout(t);
                  c.Owner.Owner.ShowCapsLockWarning(false);
                  c.Owner.Owner.UserClosedCapsWarn=false;
                  c.Owner.Owner.CheckNewPassword(true);
                },1);
              }
            }
          },
          ConfirmNewPasswordLabel: {
            Type: 'ngButton',
            Data: {
              ToolBarBreak: true,
              ngTextD: 'ngauthConfirmNewPassword'
            }
          },
          ConfirmNewPassword: {
            Type: 'ngEdit',
            L: 0, R: 0,
            Data: {
              ngHintD: (compact ? 'ngauthConfirmNewPassword' : undefined),
              Password: true
            },
            Events: {
              OnKeyDown: ngauth_CapsOnKeyDown,
              OnKeyPress: ngauth_CapsOnKeyPress,
              OnFocus: function(c) {
                if(typeof document.msCapsLockWarningOff!=='undefined') {
                  c.__msCapsLockWarningOff=document.msCapsLockWarningOff;
                  document.msCapsLockWarningOff=true;
                }
              },
              OnBlur: function(c) {
                if(typeof document.msCapsLockWarningOff!=='undefined') {
                  document.msCapsLockWarningOff = c.__msCapsLockWarningOff;
                  delete c.__msCapsLockWarningOff;
                }
                var t=window.setTimeout(function() {
                  window.clearTimeout(t);
                  c.Owner.Owner.ShowCapsLockWarning(false);
                  c.Owner.Owner.UserClosedCapsWarn=false;
                  c.Owner.Owner.CheckNewPassword();
                },1);
              }
            }
          },
          CapsLockWarn: {
            Type: 'ngText',
            L: 0, R: 0,
            Data: {
              Visible: false,
              ToolBarBreak: true,
              ngTextD: 'ngauthLoginWarnCapsLock'
            }
          },
          Error: {
            Type: 'ngText',
            L: 0, R: 0,
            Data: {
              ToolBarBreak: true
            }
          }
        }
      });
      if(compact) {
        delete def.Controls.OldPasswordLabel;
        delete def.Controls.NewPasswordLabel;
        delete def.Controls.ConfirmNewPasswordLabel;
      }
      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if(c.ErrorMessage!='') c.SetErrorState(true);
      });
      c=ngCreateControlAsType(def, 'ngToolBar', ref, parent);
      return c;
    }

    function Create_ngLoginButton(def,ref,parent) {
      var c;
      ng_MergeDef(def, {
        Data: {
          HTMLEncode: false,
          UserName: undefined
        },
        Menu: {
          Type: 'ngMenu',
          Data: {
            Items: [
              { ngTextD: 'ngauthLogoutBtn', OnMenuClick: function(it, m) {
                  if(c.OnLogoutClick) c.OnLogoutClick(c);
                  return true;
                }
              }
            ]
          }
        },
        Methods: {
          LoggedIn: function(username) {
            username=ngVal(username,'');
            if(c.UserName===username) return;
            c.UserName=username;
            c.Update();
          },
          LoggedOut: function() {
            if(typeof c.UserName=='undefined') return;
            c.UserName=undefined;
            c.Update();
          }
        },
        OverrideEvents: {
          OnClick: function(e) {
            if(typeof c.UserName==='undefined') {
              if(c.OnLoginClick) c.OnLoginClick(c);
              return;
            }
            if(c.Menu) ng_CallParent(c,'OnClick',arguments);
            else {
              if(c.OnLogoutClick) c.OnLogoutClick(c);
            }
          }
        },
        Events: {
          OnLoginClick: null,
          OnLogoutClick: null,
          OnGetUserName: null,
          OnGetText: function(c) {
            var username=c.UserName;
            if(typeof username==='undefined') return ngTxt('ngauthLoginBtn');
            if(c.OnGetUserName) username=c.OnGetUserName(c,username);
            username=ngNullVal(username,'');
            if(username!='') return ng_htmlEncode(username);
            if(!c.Menu) return ngTxt('ngauthLogoutBtn');
            return ngTxt('ngauthLoggedInBtn');
          }
        }
      });
      c=ngCreateControlAsType(def, 'ngButton', ref, parent);
      return c;
    }

    ngRegisterControlType('ngLoginForm', Create_ngLoginForm);
    ngRegisterControlType('ngPasswordForm', Create_ngPasswordForm);
    ngRegisterControlType('ngLoginButton', Create_ngLoginButton);
  }
};
