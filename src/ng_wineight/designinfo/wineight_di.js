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

  var WinEight_DesignInfo = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'wePanel':
        case 'weColorPanel':
        case 'weWebBrowser':
        case 'weFrame':
        case 'weColorFrame':
        case 'weMenuBarButton':
          di = {
            Properties: {
            }
          };
          break;

        case 'weText':
        case 'weSmallText':
        case 'weCaption':
        case 'weTitle':
          di = {
            ControlCategory: 'Labels',
            Properties: {
              className: { dVal: 'wxpText' }
            }
          };
          break;

        case 'weImage':
          di = {
            Properties: {
              className: { dVal: 'wxpImage' }
            }
          };
          break;

        case 'weButton':
        case 'weAppButton':
          di = {
            Properties: {
              className: { dVal: 'wxpButton' }
            }
          };
          break;

        case 'weGroup':
        case 'weGroupBox':
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

        case 'weEdit':
        case 'weEditBox':
          if (typeof def.DropDown !== 'undefined') var cls = 'wxpDropDown';
            else var cls = 'wxpEdit';

          di = {
            Properties: {
              className: { dVal: cls },
              DropDown: { dVal: "{Type:'weList'}" },
              Data: {
                properties: {
                  Invalid: { type: 'boolean', dVal: 'false' }
                }
              }
            }
          };
          break;

        case 'weMemo':
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

        case 'wePages':
        case 'weSections':
          di = {
            Properties: {
              className: { dVal: 'wxpPages' }
            }
          }
          break;

        case 'weToolBar':
          di = {
            Properties: {
              className: { dVal: 'wxpToolBar' }
            }
          }
          break;

        case 'weProgressBar':
        case 'weProgressRing':
        case 'weProgressLine':
          di = {
            ControlCategory: 'Misc',
            Properties: {
              className: { dVal: 'wxpProgressBar' }
            }
          }
          break;

        case 'weProgressDot':
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


        case 'weCheckBox':
        case 'weToggleSwitch':
          di = {
            Properties: {
              className: { dVal: 'wxpCheckBox' }
            }
          };
          break;

        case 'weRadioButton':
          di = {
            Properties: {
              className: { dVal: 'wxpRadio' }
            }
          };
          break;

        case 'weDropDown':
        case 'weDropDownList':
          di = {
            AddData: {
              InitProperties: {
                'DropDown': { value: "{Type:'weList',Data:{Items: [{Text:'Item 1'},{Text:'Item 2'}]}}" }
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

        case 'weEditNum':
        case 'weEditBoxNum':
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

        case 'weList':
        case 'weListBox':
          di = {
            Properties: {
              className: { dVal: 'wxpListBox' },
              TreeImg: { type: 'string', dVal: '',
                items: ['triangle','folder','plusminus']
              }
            }
          };
          break;

        case 'weTreeList':
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

        case 'wePageList':
        case 'wePageTreeList':
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

        case 'weWindow':
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

        case 'weDialog':
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

        case 'weHint':
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

        case 'weTextHint':
          di = {
            Properties: {
              className: { dVal: 'wxpTextHint' }
            }
          };
          break;

        case 'weMenu':
          di = {
            Properties: {
              className: { dVal: 'wxpMenu' }
            }
          };
          break;

        case 'weMenuBar':
          di = {
            AddData: {
              InitProperties: {
                Menu: { value: "{ Type: 'weMenu', Data: { Items: [ { Text: 'Menu 1',OnMenuClick: null, SubMenu: [ { Text: 'SubMenu 1' }, { Text: 'SubMenu 2' } ] }, { Text: 'Menu 2',OnMenuClick: null, SubMenu: [ { Text: 'SubMenu 1' }, { Text: 'SubMenu 2' } ] } ] } }" }
              }
            },
            Properties: {
              className: { dVal: 'wxpMenuBar' }
            }
          };
          break;

        case 'weSplitButton':
          di = {
            Properties: {
              className: { dVal: 'wxpSplitButton' }
            }
          };
          break;

        case 'weSplitPanel':
          di = {
            Properties: {
              className: { dVal: 'wxpSplitPanel' },
              Mover: { type: 'string', dVal: 'handle', readOnly: true,
                items: ['handle','both','controls1','controls2','none']
              }
            }
          };
          break;

        case 'weDropPanel':
          di = {
            Properties: {
              className: { dVal: 'wxpDropPanel' }
            }
          };
          break;


        case 'weCalendar':
          di = {
            Properties: {
              className: { dVal: 'wxpCalendar' }
            }
          };
          break;

        case 'weEditDate':
          di = {
            Properties: {
              className: { dVal: 'wxpEdit' },
              DropDown: { dVal: "{Type: 'weCalendar'}" }
            }
          };
          break;

        case 'weEditTime':
          di = {
            Properties: {
              className: { dVal: 'wxpEdit' },
              DropDown: { dVal: "{Type: 'weList'}" }
            }
          };
          break;

        case 'weColorPickerBox':
          di = {
            AddData: {
              InitProperties: {
                'W' : { value: 296 },
                'H' : merge_undefined
              }
            },
            Properties: {
              Data: {
                properties: {
                  AutoHeight: { dVal: 'true' }
                }
              }
            }
          };
          break;

        case 'weColorButton':
          di = {
            AddData: {
              InitProperties: {
                'W' : { value: 80 }
              }
            }
          };
          break;

        case 'weColorPickerDropDown':
          di = {
            AddData: {
              InitProperties: {
                'W' : { value: 300 }
              }
            }
          };
          break;

        case 'weColorPickerHint':
          di = {
            AddData: {
              InitProperties: {
                'W' : merge_undefined,
                'H' : merge_undefined
              }
            }
          };
          break;

        case 'weColorPickerButton':
          di = {
            Properties: {
            }
          };
          break;

        case 'weLabel':
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

        case 'weLink':
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

        case 'weEditBoxBtn':
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

        case 'weSearchBox':
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

        case 'weColorEdit':
        case 'weColorEditBox':
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

        // panels
        case 'weAlignPanel':
        case 'weAlignFrame':

        // dialogs
        case 'weMessageDlg':
        case 'weDlgMessageBox':
        case 'weDlgInputBox':
        case 'weDlgDropDownBox':
        case 'weDlgDropDownListBox':
        case 'weDlgMemoBox':
        case 'weDlgListBox':
        case 'weDlgProgressBox':
        case 'weDlgWaitBox':
        case 'weDlgAbout':

        case 'weMaskEdit':
        case 'weMaskEditBox':

        // viewmodel_controls
        case 'weViewModelForm':
        case 'weEditField':
        case 'weSearchBoxField':
        case 'weEditBoxBtnField':
        case 'weSearchBoxField':
        case 'weEditNumField':
        case 'weColorEditField':
        case 'weDropDownField':
        case 'weDropDownListField':
        case 'weEditDateField':
        case 'weEditTimeField':
        case 'weMemoField':

        // dbviewmodel
        case 'weDBViewModelForm':
        case 'weDBToolBar':
        case 'weDataSet':
        case 'weDBDataSet':
          di = {
            Properties: {
            }
          };
          break;

        // fileuploader
        case 'weFileUploader':
          di = {
            Properties: {
              Base: { dVal: 'wePanel' }
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
        ng_MergeVar(di, {
          Properties: {
            Theme: { type: 'integer', readOnly: true, dVal: 'WE_LIGHT',
              items: ['WE_DARK','WE_LIGHT']
            },
            ColorScheme: { type: 'string', readOnly: true, dVal: 'Green',
              items: ['White','Blue','Green','Yellow','Gray','LtGray','DkGray','Maroon','LtBlue']
            },
            BackgroundColor: { type: 'string', dVal: 'Auto' }
          }
        });
        def.DesignInfo = di;
      }

    }
  }

  ngUserControls['wineight_designinfo'] = WinEight_DesignInfo;
}