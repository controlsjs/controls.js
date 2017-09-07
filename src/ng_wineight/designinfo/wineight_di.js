/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014-2016 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

if (typeof ngUserControls === 'undefined') ngUserControls = {};
var WinEight_DesignInfo = {
  OnInit: function() {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('wePanel',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wePanel'),
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('weFrame',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wePanel'),
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('weColorPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weGreen'),
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('weColorFrame',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weGreen'),
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weText',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weTextLight'),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weSmallText',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weSmallTextLight')
        })
      };
    });
    
    ngRegisterControlDesignInfo('weCaption',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weCaptionLight')
        })
      };
    });
    
    ngRegisterControlDesignInfo('weTitle',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weTitleLight')
        })
      };
    });
    
    ngRegisterControlDesignInfo('weImage',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weImage')
        })
      };
    });
    
    function weCheckBoxDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weCheckBoxLight'),
          "Data": {
            "TextAlign": {
              Types: {
                'string': {
                  DefaultValue: 'right',
                  EditorOptions: {
                    Items: ['left','right']
                  }
                }
              }
            },
            "LeftImg": ng_DIProperty('image', 'WinEightControls.Images.CheckBoxLeftLight', { Level: 'advanced' }),
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weCheckBox',weCheckBoxDI);
    
    ngRegisterControlDesignInfo('weRadioButton',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weRadioLight')
        })
      };
      ng_MergeVar(di,weCheckBoxDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weToggleSwitch',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weToggleSwitchLight'),
          "Events": {
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "DoAcceptGestures": ng_DIPropertyEvent('function(c, g) {}', { Level: 'basic' }),
            "DoGesture": ng_DIPropertyEvent('function(c) { return false; }', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,weCheckBoxDI(d,c,ref));
      return di;
    });
    
    function weButtonDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weButtonLight'),
          "Data": {
            "LeftImg": ng_DIProperty('image', 'WinEightControls.Images.ButtonDark.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_DIProperty('image', 'WinEightControls.Images.ButtonDark.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_DIProperty('image', 'WinEightControls.Images.ButtonDark.RightImg', { Level: 'advanced' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weButton',weButtonDI);
    
    ngRegisterControlDesignInfo('weAppButton',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weAppButtonLight'),
          "Data": {
            "MenuVAlign": ng_DIProperty('string', 'bottom', { Level: 'advanced' }),
            "MenuHAlign": ng_DIProperty('string', 'center', { Level: 'advanced' }),
            "MenuOverlapY": ng_DIProperty('integer',10,{ Level: 'basic' }),
            "MiddleImg": ng_DIProperty('image', 'WinEightControls.Images.AppButtonLight', { Level: 'advanced' })
          },
          "Events": {
            "OnGetImg": ng_DIPropertyEvent('function(c, b, idx) { return ""; }', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,weButtonDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weLabel',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weLabelLight')
        })
      };
      ng_MergeVar(di,weButtonDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weLink',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weLink')
        })
      };
      ng_MergeVar(di,weButtonDI(d,c,ref));
      return di;
    });
    
    function weGroupDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weGroupBoxLight')
        })
      };
    }
    ngRegisterControlDesignInfo('weGroup',weGroupDI);
    ngRegisterControlDesignInfo('weGroupBox',function(d,c,ref) {
      var di=weGroupDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    
    function weEditDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weEditLight'),
          "Data": {
            "LeftImg": ng_DIProperty('image', 'WinEightControls.Images.EditLight.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_DIProperty('image', 'WinEightControls.Images.EditLight.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_DIProperty('image', 'WinEightControls.Images.EditLight.RightImg', { Level: 'advanced' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weEdit',weEditDI);
    ngRegisterControlDesignInfo('weEditBox',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    
    function weEditBoxBtnDI(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "Buttons": { Level: 'advanced' },
          "Methods": {
            "Elipsis": ng_DIProperty('function','function(text) { ng_CallParent(this, "Elipsis", arguments); }')
          },
          "Events": {
            "OnElipsis": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      return di;
    };
    ngRegisterControlDesignInfo('weEditBoxBtn',function(d,c,ref) {
      var di=weEditBoxBtnDI(d,c,ref);
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    });
    
    function weSearchBoxDI(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "Buttons": { Level: 'advanced' },
          "Methods": {
            "Search": ng_DIProperty('function','function(text) { ng_CallParent(this, "Search", arguments); }')
          }
        })
      };
      return di;
    }
    ngRegisterControlDesignInfo('weSearchBox',function(d,c,ref) {
      var di=weSearchBoxDI(d,c,ref);
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    });
    
    function weEditNumDI(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "Data": {
            "TextAlign": ng_DIProperty('string', 'center', { Level: 'advanced' })
          }
        })
      };
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    }
    ngRegisterControlDesignInfo('weEditNum', weEditNumDI);
    ngRegisterControlDesignInfo('weEditBoxNum',function(d,c,ref) {
      var di=weEditNumDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function weColorEditDI(d,c,ref) {
      return {
        NewControl: {
          _noMerge: true,
          Default: {
            Properties: {
              "W": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": { Value: 'FFFFFF' }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "TextAlign": ng_DIProperty('string', 'center', { Level: 'advanced' })
          },
          "Methods": {
            "GetColor": ng_DIProperty('function','function() { return ng_CallParent(this, "GetColor", arguments); }')
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weColorEdit',function(d,c,ref) {
      var di=weColorEditDI(d,c,ref);
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weColorEditBox',function(d,c,ref) {
      var di=weColorEditDI(d,c,ref);
      ng_MergeVar(di,weEditDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    function weMaskEditDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "Data": {
            "H": ng_DIProperty('integer', 'WinEightControls.Images.EditLight.MiddleImg.H', { Level: 'advanced' }),
            "LeftDef": { Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: {
                    "W": ng_DIProperty('integer', 'WinEightControls.Images.EditLight.LeftImg.W', { Level: 'advanced' }),
                    "LeftImg": ng_DIProperty('image', 'WinEightControls.Images.EditLight.LeftImg', { Level: 'advanced' }),
                    "MiddleImg": ng_DIProperty('image', 'WinEightControls.Images.EditLight.MiddleImg', { Level: 'advanced' })
                  }
                }
              }
            },
            "EditDef": { Level: 'advanced',
              Types: {
                'control': {
                  Type: 'weEdit',
                  ObjectProperties: {
                    "MiddleImg": ng_DIProperty('image', 'WinEightControls.Images.EditLight.MiddleImg', { Level: 'advanced' })
                  }
                }
              }
            },
            "StaticDef": { Level: 'advanced',
              Types: {
                'control': {
                  Type: 'weLabel',
                  ObjectProperties: {
                    "MiddleImg": ng_DIProperty('image', 'WinEightControls.Images.EditLight.MiddleImg', { Level: 'advanced' })
                  }
                }
              }
            },
            "RightDef": { Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: {
                    "W": ng_DIProperty('integer', 'WinEightControls.Images.EditLight.RightImg.W', { Level: 'advanced' }),
                    "MiddleImg": ng_DIProperty('image', 'WinEightControls.Images.EditLight.MiddleImg', { Level: 'advanced' }),
                    "RightImg": ng_DIProperty('image', 'WinEightControls.Images.EditLight.RightImg', { Level: 'advanced' })
                  }
                }
              }
            }
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weMaskEdit',weMaskEditDI);
    ngRegisterControlDesignInfo('weMaskEditBox',function(d,c,ref) {
      var di=weMaskEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    ngRegisterControlDesignInfo('weDropDown',weEditDI);
    ngRegisterControlDesignInfo('weDropDownList',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    
    function weMemoDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weMemoLight', { Level: 'advanced' }),
          "Data": {
            "Frame": ng_DIProperty('img_frame', 'WinEightControls.Images.MemoLight', { Level: 'advanced' })
          },
          "Events": {
            "OnFocus": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnBlur": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' }),
            "DoMouseLeave": ng_DIPropertyEvent('function(c, e, mi) { return true; }', { Level: 'basic' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('weMemo', weMemoDI);
    
    function wePagesDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wePagesLight', { Level: 'advanced' }),
          "Data": {
            "PagesIndent": ng_DIProperty('integer', 20, { Level: 'advanced' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('wePages', wePagesDI);
    ngRegisterControlDesignInfo('weSections',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weSectionsLight', { Level: 'advanced' }),
          "Data": {
            "PageImages": ng_DIProperty('image', 'WinEightControls.Images.Sections', { Level: 'advanced' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weToolBar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weToolBarLight', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('weProgressBar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weProgressBar', { Level: 'advanced' }),
          "Smooth": ng_DIPropertyBool(true),
          "Data": {
            "MiddleImg": ng_DIProperty('image', 'WinEightControls.Images.ProgressBar.MiddleImg', { Level: 'advanced' }),
            "BarImg": ng_DIProperty('image', 'WinEightControls.Images.ProgressBar.BarImg', { Level: 'advanced' })
          }
        })
      };
    });
    
    // TODO: newControl?
    function weProgressImgDI(d,c,ref) {
      return {
        NewControl: {
          _noMerge: true,
          Default: {
            Properties: {
            }
          }
        },
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weLabelLight', { Level: 'advanced' }),
          "Data": {
            "TextAlign": ng_DIProperty('string', 'center', { Level: 'advanced' }),
            "HTMLEncode": ng_DIPropertyBool(false)
          }/*,
          "Events": {
            "OnGetText": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' })
          }*/
        })
      };
    };
    ngRegisterControlDesignInfo('weProgressRing', weProgressImgDI);
    ngRegisterControlDesignInfo('weProgressDot', weProgressImgDI);
    ngRegisterControlDesignInfo('weProgressLine', weProgressImgDI);

    function weListDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weListBoxLight', { Level: 'advanced' }),
          Data: {
            "TreeImg": ng_DIProperty('image', 'WinEightControls.Images.TreeImgTriangle', { Level: 'advanced' })
          },
          "Methods": {
            "DoUpdate": ng_DIProperty('function','function() { ng_CallParent(this, "DoUpdate", arguments); }')
          },
          "Events": {
            "OnGetCheckImg": ng_DIPropertyEvent('function(c,item) { return true; }', { Level: 'basic' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weList',weListDI);
    ngRegisterControlDesignInfo('weListBox',function(d,c,ref) {
      var di=weListDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    ngRegisterControlDesignInfo('weTreeList',weListDI);

    function wePageListDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weListBoxLight', { Level: 'advanced' }),
          Data: {
            "AverageItemHeight" : ng_DIProperty('integer', 38, { Level: 'advanced' })
          },
          "ModifyControls": {
            "List": ng_DIPropertyControl('weList', { Level: 'basic' }, 'ngList'),
            "Loading": ng_DIPropertyControl('weProgressDot', { Level: 'advanced' }),
            "Paging": {
              Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: ng_DIProperties({
                    "className": ng_DIProperty('string', 'wePageListPagingLight', { Level: 'advanced' })
                  })
                }
              }
            },
            "FirstPage": ng_DIPropertyControl('weFlatButton', { Level: 'advanced' }, 'ngButton'),
            "PrevPage": ng_DIPropertyControl('weFlatButton', { Level: 'advanced' }, 'ngButton'),
            "PageNo": ng_DIPropertyControl('weEdit', { Level: 'advanced' }, 'ngEdit'),
            "Page0": ng_DIPropertyControl('weFlatButton', { Level: 'advanced' }, 'ngButton'),
            "NextPage": ng_DIPropertyControl('weFlatButton', { Level: 'advanced' }, 'ngButton'),
            "LastPage": ng_DIPropertyControl('weFlatButton', { Level: 'advanced' }, 'ngButton')
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wePageList',wePageListDI);
    ngRegisterControlDesignInfo('wePageTreeList',function(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "ModifyControls": {
            "List": ng_DIPropertyControl('weTreeList', { Level: 'basic' }, 'ngList')
          }
        })
      };
      ng_MergeVar(di,wePageListDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weAlignPanel',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wePanel', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('weAlignFrame',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wePanel', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('weSplitPanel',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weSplitPanelLight', { Level: 'advanced' }),
          "Data": {
            "HandleImg": ng_DIProperty('image', 'WinEightControls.Images.VSplitLight', { Level: 'advanced' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weDropPanel',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weDropPanelLight', { Level: 'advanced' }),
          "ModifyControls": {
            "Button": {
              Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: ng_DIProperties({
                    "Data": {
                      "MiddleImg": ng_DIProperty('image', 'WinEightControls.Images.DropPanelButtonMiddleLight', { Level: 'advanced' }),
                      "Img": ng_DIProperty('image', 'WinEightControls.Images.DropPanelButtonLight', { Level: 'advanced' }),
                      "TextAlign": ng_DIProperty('string', 'right', { Level: 'advanced' }),
                      "ImgIndent": ng_DIProperty('integer', 20, { Level: 'advanced' })
                    }
                  })
                }
              }
            }
          }
        })
      };
    });
    
    function weWindowDI(d,c,ref) {
      var th = ngVal(d.Theme, WinEightControls.Theme),
          themestr = th ? 'Light' : 'Dark',
          frameimg = 'WinEightControls.Images.Window'+themestr,
          capimg= 'WinEightControls.Images.WindowCaption'+themestr;
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_DIProperties({
          "CloseBtn": ng_DIPropertyBool(false, { Level: 'basic', Order: 0.31 }),
          "MaxBtn": ng_DIPropertyBool(false, { Level: 'basic', Order: 0.31 }),
          "MinBtn": ng_DIPropertyBool(false, { Level: 'basic', Order: 0.31 }),
          "Data": {
            "BackgroundColor": null,
            "FormID": { Level: 'advanced' },
            "Frame": { Level: 'advanced',
                       Types: {
                         'img_frame': {
                           ObjectProperties: {
                             "LeftTop": ng_DIProperty('image', frameimg+'.LeftTop', { Level: 'advanced' }),
                             "Top": ng_DIProperty('image', frameimg+'.Top', { Level: 'advanced' }),
                             "RightTop": ng_DIProperty('image', frameimg+'.RightTop', { Level: 'advanced' }),
                             "Left": ng_DIProperty('image', frameimg+'.Left', { Level: 'advanced' }),
                             "Right": ng_DIProperty('image', frameimg+'.Right', { Level: 'advanced' }),
                             "LeftBottom": ng_DIProperty('image', frameimg+'.LeftBottom', { Level: 'advanced' }),
                             "Bottom": ng_DIProperty('image', frameimg+'.Bottom', { Level: 'advanced' }),
                             "RightBottom": ng_DIProperty('image', frameimg+'.RightBottom', { Level: 'advanced' })
                           }
                         }
                       }
            },
            "CaptionImg": { DefaultType: 'object', Level: 'advanced',
                            Types: {
                              'object': {
                                ObjectProperties: {
                                  "LeftImg": ng_DIProperty('image', capimg+'.LeftImg', { Level: 'advanced' }),
                                  "MiddleImg": ng_DIProperty('image', capimg+'.MiddleImg', { Level: 'advanced' }),
                                  "RightImg": ng_DIProperty('image', capimg+'.RightImg', { Level: 'advanced' })
                                }
                              }
                            }
            }
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weWindow',function(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weWindow', { Level: 'advanced' })
        })
      };
      ng_MergeVar(di,weWindowDI(d,c,ref));
      return di;
    });    
    ngRegisterControlDesignInfo('weDialog',function(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weDialog', { Level: 'advanced' }),
          "CloseBtn": ng_DIPropertyBool(true),
          "Data": {
            "Modal": ng_DIPropertyBool(true),
            "Visible": ng_DIPropertyBool(false),
            "Sizeable": ng_DIPropertyBool(false),
            "Centered": ng_DIPropertyBool(true)
          }
        })
      };
      ng_MergeVar(di,weWindowDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weHint',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weHint', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('weTextHint',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weTextHint', { Level: 'advanced' }),
          "ModifyControls": {
            "Hint": ng_DIPropertyControl('weText', { Level: 'advanced' }, 'ngText')
          }
        })
      };
    });
    
    function weMessageDlgDI(d,c,ref) {
      return {
        ControlCategory: 'Dialogs',
        IsContainer: false,
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','weDialog',{Level: 'advanced'}),
          "ModifyControls": {
            "Title": ng_DIPropertyControl('weCaption', { Level: 'advanced' }, 'ngText'),
            "Message": ng_DIPropertyControl('weText', { Level: 'advanced' }, 'ngText'),
            "OK": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "Yes": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "No": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "Cancel": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "CheckBox": ng_DIPropertyControl('weCheckBox', { Level: 'advanced' }, 'ngCheckBox')
          }
        })
      };
    };
    ngRegisterControlDesignInfo('weMessageDlg',weMessageDlgDI);
    ngRegisterControlDesignInfo('weDlgMessageBox',function(d,c,ref) {
      var di=weMessageDlgDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    
    function dlgInputBoxDI(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','weMessageDlg',{Level: 'advanced'})
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weDlgInputBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('weEdit', { Level: 'advanced' }, 'ngEdit')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDlgDropDownBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('weDropDown', { Level: 'advanced' }, 'ngDropDown')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDlgDropDownListBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('weDropDownList', { Level: 'advanced' }, 'ngDropDownList')
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDlgMemoBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('weMemo', { Level: 'advanced' }, 'ngMemo')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgListBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','weMessageDlg',{Level: 'advanced'}),
          "ModifyControls": {
            "List": ng_DIPropertyControl('weList', { Level: 'advanced' }, 'ngList')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgProgressBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Progress": ng_DIPropertyControl('weProgressBar', { Level: 'advanced' }, 'ngProgressBar')
          }
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgWaitBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Progress": ng_DIPropertyControl('weProgressLine', { Level: 'advanced' }, 'ngText')
          }
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgAbout',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','weDlgMessageBox',{Level: 'advanced'}),
          "DlgIcon": ng_DIProperty(['null','ngListStringItems'],undefined, { InitType: 'ngListItems', Level: 'basic' }),
          "ModifyControls": {
            "Message": { DefaultType: 'control', Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: ng_DIProperties({
                    "className": ng_DIProperty('string', 'weAboutMessageLight', { Level: 'advanced' })
                  })
                }
              }
            },
            "AppInfo": ng_DIPropertyControl('weListBox', { Level: 'advanced' }, 'ngList', ng_DIProperties({
              "className": ng_DIProperty('string', 'weTextListBoxLight', { Level: 'advanced' })
            }))
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weCalendar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weCalendarLight', { Level: 'advanced' })
        })
      };
    });
    
    function weEditDateDI(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weEditLight', { Level: 'advanced' }),
          "DropDown": ng_DIPropertyControl('weCalendar', { Level: 'basic' }, 'ngCalendar', ng_DIProperties({
            "Data": {
              "className": ng_DIProperty('string', 'weCalendarLight', { Level: 'advanced' })
            }
          }))
        })
      };
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weEditDate',weEditDateDI);
    
    function weEditTimeDI(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weEditLight', { Level: 'advanced' }),
          "DropDown": ng_DIPropertyControl('weList', { Level: 'basic' }, 'ngList'),
          "Events": {
            "OnDropDown": ng_DIPropertyEvent('function(c, l) { return true; }', { Level: 'basic' }),
            "OnListItemChanged": ng_DIPropertyEvent('function(c, l, it, oit) { return false; }', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weEditTime',weEditTimeDI);

    ngRegisterControlDesignInfo('weColorPickerBox',function(d,c,ref) {
      return {
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 320 }
            }
          }
        },
        Properties: ng_DIProperties({
          'Data': {
            'AutoHeight': ng_DIPropertyBool(true, { Level: 'basic' }),
            'AsToolbar': ng_DIPropertyBool(true, { Level: 'basic' }),
            'Vertical': ng_DIPropertyBool(true, { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('weColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 150 }
            }
          }
        }
      };
    });

    ngRegisterControlDesignInfo('weColorPickerDropDown',function(d,c,ref) {
      return {
        ControlCategory: 'Edits',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 200 }
            }
          }
        },
        Properties: ng_DIProperties({
          'DropDown': ng_DIPropertyControl('weColorPickerBox', { Level: 'basic' }, 'weColorPickerBox', ng_DIProperties({
            'Data': {
              'MaxHeight': ng_DIProperty('integer',600,{ Level: 'basic' })
            }
          }))
        })
      };
    });

    ngRegisterControlDesignInfo('weColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        NewControl: {
          _noMerge:true
        },
        Properties: ng_DIProperties({
          'ModifyControls': {
            'Picker': ng_DIPropertyControl('weColorPickerBox', { Level: 'basic' }, 'weColorPickerBox', ng_DIProperties({
              'W': ng_DIProperty('bounds',296,{ Level: 'basic' })
            }))
          }
        }, { "ModifyControls": { Level: 'basic' } })
      };
    });
    
    /********************************/
    
    ngRegisterControlDesignInfo('weMenu',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weMenuLight', { Level: 'advanced' }),
          "ModifyControls": {
            "SubMenuDef": ng_DIPropertyControl('weMenu', { Level: 'advanced' }, 'ngMenu')
          },
          "Events": {
            "OnGetCheckImg": ng_DIPropertyEvent('function(c, l, i) { return true; }', { Level: 'basic' }),
            "OnGetItemImg": ng_DIPropertyEvent('function(c, l, it, id, level) { return ""; }', { Level: 'basic' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weMenuBar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weMenuBarLight', { Level: 'advanced' }),
          "ModifyControls": {
            "SubMenuDef": ng_DIPropertyControl('weMenu', { Level: 'advanced' }, 'ngMenu')
          }
        })
      };
    });
    
    /*ngRegisterControlDesignInfo('weMenuBarButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weMenuBarButton', { Level: 'advanced' })
        })
      };
    });*/
    
    ngRegisterControlDesignInfo('weSplitButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weSplitButtonLight', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_DIProperty('image', 'WinEightControls.Images.ButtonDark.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_DIProperty('image', 'WinEightControls.Images.ButtonDark.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_DIProperty('image', 'WinEightControls.Images.ButtonDark.MenuRightBtnImg', { Level: 'advanced' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weFileUploader',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weFileUploaderLight', { Level: 'advanced' }),
          "ModifyControls": {
            "ListFiles": ng_DIPropertyControl('weList', { Level: 'advanced' }, 'ngList'),
            "DragAndDropInfo": ng_DIPropertyControl('weSmallText', { Level: 'advanced' }),
            "BtnAddFile": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "BtnRemoveFiles": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton')
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weViewModelForm',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "ErrorHint": ng_DIPropertyControl('weTextHint', { Level: 'advanced' }, 'ngTextHint')
          }
        })
      };
    });
    
    function weEditFieldDI (d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "Data": {
            "HintX": ng_DIProperty('integer',19,{ Level: 'basic' }),
            "HintY": ng_DIProperty('integer',27,{ Level: 'basic' })
          },
          "ErrorHint": ng_DIPropertyControl('weTextHint', { Level: 'advanced' }, 'ngTextHint')
        })
      };
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weEditField',weEditFieldDI);
    ngRegisterControlDesignInfo('weSearchBoxField',function(d,c,ref) {
      var di=weSearchBoxDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weEditBoxBtnField',function(d,c,ref) {
      var di=weEditBoxBtnDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weEditNumField',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weColorEditField',function(d,c,ref) {
      var di=weColorEditDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDropDownField',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDropDownListField',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    ngRegisterControlDesignInfo('weEditDateField',function(d,c,ref) {
      var di=weEditDateDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weEditTimeField',function(d,c,ref) {
      var di=weEditTimeDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weMemoField',function(d,c,ref) {
      var di=weMemoDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    
    /*ngRegisterControlDesignInfo('weDBViewModelForm',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "Events": {
            "OnDeleteQuery": ng_DIPropertyEvent('function(c,querytxt,successfnc,failfnc) {}', { Level: 'basic' }),
            "OnChangedQuery": ng_DIPropertyEvent('function(c,querytxt,successfnc,failfnc) {}', { Level: 'basic' })
          }
        })
      };
    });*/
    
    ngRegisterControlDesignInfo('weDBToolBar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'weToolBar', { Level: 'advanced' }),
          "ModifyControls": {
            "New": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "Delete": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "Insert": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "Update": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "Cancel": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton')
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weDataSet',wePageListDI);

    ngRegisterControlDesignInfo('weDBDataSet',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "NewRecord": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "LoadRecord": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "DeleteRecord": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton'),
            "Refresh": ng_DIPropertyControl('weButton', { Level: 'advanced' }, 'ngButton')
          }
        })
      };
      ng_MergeVar(di,wePageListDI(d,c,ref));
      return di;
    });
    
  }
};
ngUserControls['wineight_designinfo'] = WinEight_DesignInfo;