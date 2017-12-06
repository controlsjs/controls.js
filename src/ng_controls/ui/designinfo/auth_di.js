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

if (typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['auth_controls_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;
    var undefined;

    ngRegisterControlDesignInfo('ngLoginForm',function(d,c,ref) {
      return {
        ControlCategory: 'Form',
        NewControl: {
          Default: {
            Properties: {
            }
          }
        },
        Properties: ng_diProperties({
          "CompactMode": ng_diBoolean(false, { Level: 'basic' }),
          "ShowOrganization": ng_diBoolean(false, { Level: 'basic' }),
          "ShowRememberMe": ng_diBoolean(false, { Level: 'basic' }),
          "Data": {
            "SettingsName": ng_diString('ngLoginForm', { Level: 'basic' }),
            "ErrorMessage": ng_diString('', { Level: 'advanced' }),
            "AutoSize": ng_diBoolean(true, { Level: 'advanced' })
          },
          "Events": {
            "OnLogin": ng_diEvent('function(c, cred, rememberme) { return true; }', { Level: 'basic' }),
            "OnLoginSuccess": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnLoginFailed": ng_diEvent('function(c, errmsg) { return true; }', { Level: 'basic' }),
            "OnLoginFinished": ng_diEvent('function(c,errmsg) { return true; }', { Level: 'advanced' }),
            "OnShowProgress": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnHideProgress": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnShowCapsLockWarning": ng_diEvent('function(c) {}', { Level: 'advanced' }),
            "OnGetSettings": ng_diEvent('function(c) { var data; return data; }', { Level: 'advanced' }),
            "OnSetSettings": ng_diEvent('function(c, data) { return true; }', { Level: 'advanced' }),
          },
          "Methods": {
            "DoSetSettings": ng_diFunction('function(data) { return ng_CallParent(this, "DoSetSettings", arguments, data); }'),
            "DoGetSettings": ng_diFunction('function() { return ng_CallParent(this, "DoGetSettings", arguments); }'),
            "DoLogin": ng_diFunction('function() { ng_CallParent(this, "DoLogin", arguments); }')
          },
          "ModifyControls": {
            'OrganizationLabel': ng_diControl('ngLabel', ng_diProperties({
              "Data": {
                "ToolBarBreak": ng_diBoolean(true),
                "ngTextD": ng_diString('ngauthOrganization')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngLabel' }),
            'Organization': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
            'LoginLabel': ng_diControl('ngLabel', ng_diProperties({
              "Data": {
                "ToolBarBreak": ng_diBoolean(true),
                "ngTextD": ng_diString('ngauthLogin')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngLabel' }),
            'Login': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
            'PasswordLabel': ng_diControl('ngLabel', ng_diProperties({
              "Data": {
                "ToolBarBreak": ng_diBoolean(true),
                "ngTextD": ng_diString('ngauthPassword')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngLabel' }),
            'Password': ng_diControl('ngEdit', ng_diProperties({
              "Data": {
                "Password": ng_diBoolean(true)
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
            'CapsLockWarn': ng_diControl('ngText', ng_diProperties({
              "Data": {
                "Visible": ng_diBoolean(false),
                "ToolBarBreak": ng_diBoolean(true),
                "ngTextD": ng_diString('ngauthLoginWarnCapsLock')
              }
            }), { Level: 'basic' }),
            'RememberMe': ng_diControl('ngCheckBox', ng_diProperties({
              "Data": {
                "ToolBarBreak": ng_diBoolean(true),
                "ngTextD": ng_diString('ngauthLoginRemember')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngCheckBox' }),
            'LoginBtn': ng_diControl('ngButton', ng_diProperties({
              "Data": {
                "ToolBarBreak": ng_diBoolean(true),
                "ngTextD": ng_diString('ngauthLoginBtn')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            'Error': ng_diControl('ngText', ng_diProperties({
              "L": ng_diTypeVal('bounds', 0),
              "R": ng_diTypeVal('bounds', 0),
              "Data": {
                "ToolBarBreak": ng_diBoolean(true)
              }
            }), { Level: 'basic' })
          }
        })
      };
    });
    ngRegisterControlDesignInfo('ngPasswordForm',function(d,c,ref) {
      return {
        ControlCategory: 'Form',
        Properties: ng_diProperties({
          "CompactMode": ng_diBoolean(false, { Level: 'basic' }),
          "ShowOldPassword": ng_diBoolean(false, { Level: 'basic' }),
          "Data": {
            "NewPasswordStrength": ng_diObject({
              "MinLength": ng_diInteger(0, { Level: 'basic' }),
              "MaxLength": ng_diInteger(0, { Level: 'basic' }),
              "Digits": ng_diBoolean(false, { Level: 'basic' }),
              "UpperCase": ng_diBoolean(false, { Level: 'basic' }),
              "LowerCase": ng_diBoolean(false, { Level: 'basic' }),
              "RegExp": ng_diString('', { Level: 'basic' })
            }, { Level: 'basic' }),
            "ErrorMessage": ng_diString('', { Level: 'advanced' }),
            "AutoSize": ng_diBoolean(true, { Level: 'advanced' })
          },
          "Events": {
            "OnValidateNewPassword": ng_diEvent('function(c,ret,data,strength) {}', { Level: 'basic' }),
            "OnShowCapsLockWarning": ng_diEvent('function(c) {}', { Level: 'advanced' })
          },
          "OverrideEvents": {
            "OnNewPasswordErrorMessage": ng_diEvent('function(c,err) { var msg; return msg; }', { Level: 'basic' })
          },
          "ModifyControls": {
            'OldPasswordLabel': ng_diControl('ngLabel', ng_diProperties({
              "Data": {
                "ToolBarBreak": ng_diBoolean(true),
                "ngTextD": ng_diString('ngauthOldPassword')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngLabel' }),
            'OldPassword': ng_diControl('ngEdit', ng_diProperties({
              "Data": {
                "Password": ng_diBoolean(true)
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
            'NewPasswordLabel': ng_diControl('ngLabel', ng_diProperties({
              "Data": {
                "ToolBarBreak": ng_diBoolean(true),
                "ngTextD": ng_diString('ngauthNewPassword')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngLabel' }),
            'NewPassword': ng_diControl('ngEdit', ng_diProperties({
              "Data": {
                "Password": ng_diBoolean(true)
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
            'ConfirmNewPasswordLabel': ng_diControl('ngLabel', ng_diProperties({
              "Data": {
                "ToolBarBreak": ng_diBoolean(true),
                "ngTextD": ng_diString('ngauthConfirmNewPassword')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngLabel' }),
            'ConfirmNewPassword': ng_diControl('ngEdit', ng_diProperties({
              "Data": {
                "Password": ng_diBoolean(true)
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
            'CapsLockWarn': ng_diControl('ngText', ng_diProperties({
              "Data": {
                "Visible": ng_diBoolean(false),
                "ToolBarBreak": ng_diBoolean(true),
                "ngTextD": ng_diString('ngauthLoginWarnCapsLock')
              }
            }), { Level: 'basic' }),
            'Error': ng_diControl('ngText', ng_diProperties({
              "Data": {
                "ToolBarBreak": ng_diBoolean(true)
              }
            }), { Level: 'basic' })
          }
        })
      };
    });
    ngRegisterControlDesignInfo('ngLoginButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        NewControl: {
          Default: {
            Properties: {
            }
          }
        },
        NewControl: {
          Default: {
            Properties: {
              "Menu": {
                ObjectProperties: {
                  "Type": { Type: 'string', Value: 'ngMenu' }
                }
              }
            }
          }
        },
        Properties: ng_diProperties({
          "Menu": ng_diControl('ngMenu', {
            "Type": { Required: true }
          }, { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngMenu' }),
          "Data": {
            "UserName": ng_diMixed(['undefined','string'], { InitType: 'string', Level: 'hidden' })
          },
          "Methods": {
            "LoggedIn": ng_diFunction('function(username) { ng_CallParent(this, "LoggedIn", arguments); }'),
            "LoggedOut": ng_diFunction('function() { ng_CallParent(this, "LoggedOut", arguments); }')
          },
          "Events": {
            "OnLoginClick": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnLogoutClick": ng_diEvent('function(c) {}', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetUserName": ng_diEvent('function(c, username) { return username; }', { Level: 'advanced' })
          }
        })
      };
    });
  }
};