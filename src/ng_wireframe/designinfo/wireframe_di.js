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

  var WireframeControls_DesignInfo = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'wfrPanel':
        case 'wfrWebBrowser':
        case 'wfrFrame':
        case 'wfrMenuBarButton':
          di = {
            Properties: {
            }
          };
          break;

        case 'wfrText':
          di = {
            Properties: {
              className: { dVal: 'wxpText' }
            }
          };
          break;

        case 'wfrImage':
          di = {
            Properties: {
              className: { dVal: 'wxpImage' }
            }
          };
          break;

        case 'wfrButton':
          di = {
            Properties: {
              className: { dVal: 'wxpButton' }
            }
          };
          break;

        case 'wfrGroup':
        case 'wfrGroupBox':
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

        case 'wfrEdit':
        case 'wfrEditBox':
          if (typeof def.DropDown !== 'undefined') var cls = 'wxpDropDown';
            else var cls = 'wxpEdit';

          di = {
            Properties: {
              className: { dVal: cls },
              DropDown: { dVal: "{Type:'wfrList'}" },
              Data: {
                properties: {
                  Invalid: { type: 'boolean', dVal: 'false' }
                }
              }
            }
          };
          break;

        case 'wfrMemo':
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

        case 'wfrPages':
          di = {
            Properties: {
              className: { dVal: 'wxpPages' }
            }
          }
          break;

        case 'wfrToolBar':
          di = {
            Properties: {
              className: { dVal: 'wxpToolBar' }
            }
          }
          break;

        case 'wfrProgressBar':
          di = {
            Properties: {
              className: { dVal: 'wxpProgressBar' }
            }
          }
          break;

        case 'wfrCheckBox':
          di = {
            Properties: {
              className: { dVal: 'wxpCheckBox' }
            }
          };
          break;

        case 'wfrRadioButton':
          di = {
            Properties: {
              className: { dVal: 'wxpRadio' }
            }
          };
          break;

        case 'wfrDropDown':
        case 'wfrDropDownList':
          di = {
            AddData: {
              InitProperties: {
                'DropDown': { value: "{Type:'wfrList',Data:{Items: [{Text:'Item 1'},{Text:'Item 2'}]}}" }
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

        case 'wfrEditNum':
        case 'wfrEditBoxNum':
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

        case 'wfrList':
        case 'wfrListBox':
          di = {
            Properties: {
              className: { dVal: 'wxpListBox' },
              TreeImg: { type: 'string', dVal: '',
                items: ['triangle','folder','plusminus']
              }
            }
          };
          break;

        case 'wfrTreeList':
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

        case 'wfrPageList':
        case 'wfrPageTreeList':
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

        case 'wfrWindow':
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

        case 'wfrDialog':
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

        case 'wfrHint':
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

        case 'wfrTextHint':
          di = {
            Properties: {
              className: { dVal: 'wxpTextHint' }
            }
          };
          break;

        case 'wfrMenu':
          di = {
            Properties: {
              className: { dVal: 'wxpMenu' }
            }
          };
          break;

        case 'wfrMenuBar':
          di = {
            AddData: {
              InitProperties: {
                Menu: { value: "{ Type: 'wfrMenu', Data: { Items: [ { Text: 'Menu 1',OnMenuClick: null, SubMenu: [ { Text: 'SubMenu 1' }, { Text: 'SubMenu 2' } ] }, { Text: 'Menu 2',OnMenuClick: null, SubMenu: [ { Text: 'SubMenu 1' }, { Text: 'SubMenu 2' } ] } ] } }" }
              }
            },
            Properties: {
              className: { dVal: 'wxpMenuBar' }
            }
          };
          break;

        case 'wfrSplitButton':
          di = {
            Properties: {
              className: { dVal: 'wxpSplitButton' }
            }
          };
          break;

        case 'wfrSplitPanel':
          di = {
            Properties: {
              className: { dVal: 'wxpSplitPanel' },
              Mover: { type: 'string', dVal: 'handle', readOnly: true,
                items: ['handle','both','controls1','controls2','none']
              }
            }
          };
          break;

        case 'wfrDropPanel':
          di = {
            Properties: {
              className: { dVal: 'wxpDropPanel' }
            }
          };
          break;


        case 'wfrCalendar':
          di = {
            Properties: {
              className: { dVal: 'wxpCalendar' }
            }
          };
          break;

        case 'wfrEditDate':
          di = {
            Properties: {
              className: { dVal: 'wxpEdit' },
              DropDown: { dVal: "{Type: 'wfrCalendar'}" }
            }
          };
          break;

        case 'wfrEditTime':
          di = {
            Properties: {
              className: { dVal: 'wxpEdit' },
              DropDown: { dVal: "{Type: 'wfrList'}" }
            }
          };
          break;

        case 'wfrFlatButton':
          di = {
            Properties: {
              className: { dVal: 'wxpFlatButton' }
            }
          };
          break;

        case 'wfrLabel':
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

        case 'wfrLink':
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

        case 'wfrEditBoxBtn':
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

        case 'wfrSearchBox':
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

        case 'wfrColorEdit':
        case 'wfrColorEditBox':
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

        case 'wfrProgressDot':
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
        case 'wfrAlignPanel':
        case 'wfrAlignFrame':

        // dialogs
        case 'wfrMessageDlg':
        case 'wfrDlgMessageBox':
        case 'wfrDlgInputBox':
        case 'wfrDlgDropDownBox':
        case 'wfrDlgDropDownListBox':
        case 'wfrDlgMemoBox':
        case 'wfrDlgListBox':
        case 'wfrDlgProgressBox':
        case 'wfrDlgWaitBox':
        case 'wfrDlgAbout':

        // maskedit
        case 'wfrMaskEdit':
        case 'wfrMaskEditBox':

        // viewmodel_controls
        case 'wfrViewModelForm':
        case 'wfrEditField':
        case 'wfrSearchBoxField':
        case 'wfrEditBoxBtnField':
        case 'wfrSearchBoxField':
        case 'wfrEditNumField':
        case 'wfrColorEditField':
        case 'wfrDropDownField':
        case 'wfrDropDownListField':
        case 'wfrEditDateField':
        case 'wfrEditTimeField':
        case 'wfrMemoField':

        // dbviewmodel
        case 'wfrDBViewModelForm':
        case 'wfrDBToolBar':
        case 'wfrDataSet':
        case 'wfrDBDataSet':
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

  ngUserControls['wfs_designinfo'] = WireframeControls_DesignInfo;
}