/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014-2015 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

if(ngHASDESIGNINFO()) {

  if(typeof ngUserControls === 'undefined') ngUserControls = new Array();

  var WinXP_DesignInfo = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'stdPanel':
        case 'stdWebBrowser':
        case 'stdFrame':
        case 'stdMenuBarButton':
          di = {
            Properties: {
            }
          };
          break;

        case 'stdText':
          di = {
            Properties: {
              className: { dVal: 'wxpText' }
            }
          };
          break;

        case 'stdImage':
          di = {
            Properties: {
              className: { dVal: 'wxpImage' }
            }
          };
          break;

        case 'stdButton':
          di = {
            Properties: {
              className: { dVal: 'wxpButton' }
            }
          };
          break;

        case 'stdGroup':
        case 'stdGroupBox':
          di = {
            Properties: {
              className: { dVal: 'wxpGroupBox' },
              Data: {
                properties: {
                  Frame: { type: 'object', dVal: '{}', lvl: 2 }
                }
              }
            }
          };
          break;

        case 'stdEdit':
        case 'stdEditBox':
          if (typeof def.DropDown !== 'undefined') var cls = 'wxpDropDown';
            else var cls = 'wxpEdit';

          di = {
            Properties: {
              className: { dVal: cls },
              DropDown: { dVal: "{Type:'stdList'}" },
              Data: {
                properties: {
                  Invalid: { type: 'boolean', dVal: 'false' }
                }
              }
            }
          };
          break;

        case 'stdMemo':
          di = {
            Properties: {
              className: { dVal: 'wxpMemo' },
              Data: {
                properties: {
                  Invalid: { type: 'boolean', dVal: 'false' }
                }
              }
            }
          };
          break;

        case 'stdPages':
          di = {
            Properties: {
              className: { dVal: 'wxpPages' }
            }
          }
          break;

        case 'stdToolBar':
          di = {
            Properties: {
              className: { dVal: 'wxpToolBar' }
            }
          }
          break;

        case 'stdProgressBar':
          di = {
            Properties: {
              className: { dVal: 'wxpProgressBar' }
            }
          }
          break;

        case 'stdCheckBox':
          di = {
            Properties: {
              className: { dVal: 'wxpCheckBox' }
            }
          };
          break;

        case 'stdRadioButton':
          di = {
            Properties: {
              className: { dVal: 'wxpRadio' }
            }
          };
          break;

        case 'stdDropDown':
        case 'stdDropDownList':
          di = {
            AddData: {
              InitProperties: {
                'DropDown': { value: "{Type:'stdList',Data:{Items: [{Text:'Item 1'},{Text:'Item 2'}]}}" }
              }
            },
            Properties: {
              className: { dVal: 'wxpEdit' },
              Data: {
                properties: {
                  Invalid: { type: 'boolean', dVal: 'false' }
                }
              }
            }
          };
          break;

        case 'stdEditNum':
        case 'stdEditBoxNum':
          di = {
            Properties: {
              className: { dVal: 'wxpEdit' },
              Data: {
                properties: {
                  Invalid: { type: 'boolean', dVal: 'false' }
                }
              }
            }
          };
          break;

        case 'stdList':
        case 'stdListBox':
          di = {
            Properties: {
              className: { dVal: 'wxpListBox' },
              TreeImg: { type: 'string', dVal: '',
                items: ['triangle','folder','plusminus']
              }
            }
          };
          break;

        case 'stdTreeList':
          di = {
            AddData: {
              InitProperties: {
                'TreeImg': {},
                'Data.Items': { value: "[{Text:'Item 1'},{Text:'Item 2',Items:[{Text:'SubItem 1'},{Text:'SubItem 2'}]}]" }
              }
            },
            Properties: {
              className: { dVal: 'wxpListBox' },
              TreeImg: { type: 'string', dVal: 'plusminus',
                items: ['triangle','folder','plusminus']
              }
            }
          };
          break;

        case 'stdPageList':
        case 'stdPageTreeList':
          di = {
            Properties: {
              className: { dVal: 'wxpListBox' },
              Controls: {
                properties: {
                  Loading: { cType: 'ngControl' }
                }
              }
            }
          };
          break;

        case 'stdWindow':
          di = {
            AddData: {
              InitProperties: {
                CloseBtn: { value: 'true' },
                MaxBtn: { value: 'true' },
                MinBtn: { value: 'true' }
              }
            },
            Properties: {
              className: { dVal: 'wxpWindow' },
              CloseBtn: { type: 'boolean', dVal: 'false' },
              HelpBtn: { type: 'boolean', dVal: 'false' },
              MaxBtn: { type: 'boolean', dVal: 'false' },
              MinBtn: { type: 'boolean', dVal: 'false' }
            }
          };
          break;

        case 'stdDialog':
          di = {
            ControlCategory: 'Dialogs',
            Properties: {
              className: { dVal: 'wxpDialog' },
              CloseBtn: { type: 'boolean' },
              HelpBtn: { type: 'boolean', dVal: 'false' },
              MaxBtn: { type: 'boolean', dVal: 'false' },
              MinBtn: { type: 'boolean', dVal: 'false' }
            }
          };
          break;

        case 'stdHint':
          di = {
            AddData: {
              InitProperties: {
                'Data.Anchor': { value: 'auto' }
              }
            },
            Properties: {
              className: { dVal: 'wxpHint' },
              Data: {
                properties: {
                  Anchor: {
                    items: ['auto','topleft','topright','bottomright','bottomleft','lefttop','leftbottom','righttop','rightbottom']
                  }
                }
              }
            }
          };
          break;

        case 'stdTextHint':
          di = {
            Properties: {
              className: { dVal: 'wxpTextHint' }
            }
          };
          break;

        case 'stdMenu':
          di = {
            Properties: {
              className: { dVal: 'wxpMenu' }
            }
          };
          break;

        case 'stdMenuBar':
          di = {
            AddData: {
              InitProperties: {
                Menu: { value: "{ Type: 'stdMenu', Data: { Items: [ { Text: 'Menu 1',OnMenuClick: null, SubMenu: [ { Text: 'SubMenu 1' }, { Text: 'SubMenu 2' } ] }, { Text: 'Menu 2',OnMenuClick: null, SubMenu: [ { Text: 'SubMenu 1' }, { Text: 'SubMenu 2' } ] } ] } }" }
              }
            },
            Properties: {
              className: { dVal: 'wxpMenuBar' }
            }
          };
          break;

        case 'stdSplitButton':
          di = {
            Properties: {
              className: { dVal: 'wxpSplitButton' }
            }
          };
          break;

        case 'stdSplitPanel':
          di = {
            Properties: {
              className: { dVal: 'wxpSplitPanel' },
              Mover: { type: 'string', dVal: 'handle', readOnly: true,
                items: ['handle','both','controls1','controls2','none']
              }
            }
          };
          break;

        case 'stdDropPanel':
          di = {
            Properties: {
              className: { dVal: 'wxpDropPanel' }
            }
          };
          break;


        case 'stdCalendar':
          di = {
            Properties: {
              className: { dVal: 'wxpCalendar' }
            }
          };
          break;

        case 'stdEditDate':
          di = {
            Properties: {
              className: { dVal: 'wxpEdit' },
              DropDown: { dVal: "{Type: 'stdCalendar'}" }
            }
          };
          break;

        case 'stdEditTime':
          di = {
            Properties: {
              className: { dVal: 'wxpEdit' },
              DropDown: { dVal: "{Type: 'stdList'}" }
            }
          };
          break;

        case 'stdFlatButton':
          di = {
            Properties: {
              className: { dVal: 'wxpFlatButton' }
            }
          };
          break;

        case 'stdLabel':
          di = {
            ControlCategory: 'Labels',
            AddData: {
              InitProperties: {
                'Data.Text': { value: 'Label' }
              }
            },
            Properties: {
              className: { dVal: 'wxpLabel' }
            }
          };
          break;

        case 'stdLink':
          di = {
            ControlCategory: 'Buttons',
            AddData: {
              InitProperties: {
                'Data.Text': { value: 'Link' }
              }
            },
            Properties: {
              className: { dVal: 'wxpLink' }
            }
          };
          break;

        case 'stdEditBoxBtn':
          di = {
            AddData: {
              InitProperties: {
                'Events': {},
                'Events.OnElipsis': {}
              }
            },
            Properties: {
              className: { dVal: 'wxpEdit' },
              Events: {
                properties: {
                  OnElipsis: { type: 'function', dVal: 'function(e, text) { }' }
                }
              }
            }
          };
          break;

        case 'stdSearchBox':
          di = {
            AddData: {
              InitProperties: {
                'Events': {},
                'Events.OnSearch': {}
              }
            },
            Properties: {
              className: { dVal: 'wxpEdit' },
              Events: {
                properties: {
                  OnSearch: { type: 'function', dVal: 'function(e, text) { }' }
                }
              }
            }
          };
          break;

        case 'stdColorEdit':
        case 'stdColorEditBox':
          di = {
            AddData: {
              InitProperties: {
                'Data.Text': { value: '' }
              }
            },
            Properties: {
              className: { dVal: 'wxpEdit' },
              DropDown: { dVal: 'null' },
              Data: {
                properties: {
                  TextAlign: { dVal: 'center' }
                }
              }
            }
          };
          break;

        case 'stdProgressDot':
          di = {
            ControlCategory: 'Misc',
            AddData: {
              InitProperties: {
                'Data.Text': { value: '' }
              }
            },
            Properties: {
              className: { dVal: 'wxpLabel' },
              Data: {
                properties: {
                  TextAlign: { dVal: 'center' }
                }
              }
            }
          };
          break;

        // panels
        case 'stdAlignPanel':
        case 'stdAlignFrame':

        // dialogs
        case 'stdMessageDlg':
        case 'dlgMessageBox':
        case 'dlgInputBox':
        case 'dlgDropDownBox':
        case 'dlgDropDownListBox':
        case 'dlgMemoBox':
        case 'dlgListBox':
        case 'dlgProgressBox':
        case 'dlgWaitBox':
        case 'dlgAbout':

        // maskedit
        case 'stdMaskEdit':
        case 'stdMaskEditBox':

        // viewmodel_controls
        case 'stdViewModelForm':
        case 'stdEditField':
        case 'stdSearchBoxField':
        case 'stdEditBoxBtnField':
        case 'stdSearchBoxField':
        case 'stdEditNumField':
        case 'stdColorEditField':
        case 'stdDropDownField':
        case 'stdDropDownListField':
        case 'stdEditDateField':
        case 'stdEditTimeField':
        case 'stdMemoField':

        // dbviewmodel
        case 'stdDBViewModelForm':
        case 'stdDBToolBar':
        case 'stdDataSet':
        case 'stdDBDataSet':
          di = {
            Properties: {
            }
          };
          break;

      }

      if(typeof di!=='undefined') {
        ng_MergeVar(di, {
          Properties: {
            Type: { dVal: c.DefType }
          }
        });
        ng_MergeVar(di, def.DesignInfo);
        def.DesignInfo = di;
      }

    }
  }

  ngUserControls['winxp_designinfo'] = WinXP_DesignInfo;
}