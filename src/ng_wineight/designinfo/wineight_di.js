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

    var undefined;
    ngRegisterControlDesignInfo('wePanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wePanel'),
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('weFrame',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wePanel'),
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('weColorPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weGreen'),
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('weColorFrame',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weGreen'),
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weText',function(d,c,ref) {
      return {
        ControlCategory: 'Label',
        Properties: ng_diProperties({
          "className": ng_diString('weTextLight'),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weSmallText',function(d,c,ref) {
      return {
        ControlCategory: 'Label',
        Properties: ng_diProperties({
          "className": ng_diString('weSmallTextLight')
        })
      };
    });
    
    ngRegisterControlDesignInfo('weCaption',function(d,c,ref) {
      return {
        ControlCategory: 'Label',
        Properties: ng_diProperties({
          "className": ng_diString('weCaptionLight')
        })
      };
    });
    
    ngRegisterControlDesignInfo('weTitle',function(d,c,ref) {
      return {
        ControlCategory: 'Label',
        Properties: ng_diProperties({
          "className": ng_diString('weTitleLight')
        })
      };
    });
    
    ngRegisterControlDesignInfo('weImage',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_diProperties({
          "className": ng_diString('weImage')
        })
      };
    });
    
    function weCheckBoxDI(d,c,ref) {
      return {
        ControlCategory: 'Checkbox & Radio',
        Properties: ng_diProperties({
          "className": ng_diString('weCheckBoxLight'),
          "Data": {
            "TextAlign": ng_diStringValues('right', ['left','right']),
            "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.CheckBoxLeftLight', { Level: 'advanced' }),
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weCheckBox',weCheckBoxDI);
    
    ngRegisterControlDesignInfo('weRadioButton',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "className": ng_diString('weRadioLight')
        })
      };
      ng_MergeVar(di,weCheckBoxDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weToggleSwitch',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "className": ng_diString('weToggleSwitchLight'),
          "Events": {
            "OnGetText": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "DoAcceptGestures": ng_diEvent('function(c, g) {}', { Level: 'basic' }),
            "DoGesture": ng_diEvent('function(c) { return false; }', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,weCheckBoxDI(d,c,ref));
      return di;
    });
    
    function weButtonDI(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": ng_diString('weButtonLight'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.ButtonDark.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.ButtonDark.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WinEightControls.Images.ButtonDark.RightImg', { Level: 'advanced' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weButton',weButtonDI);
    
    ngRegisterControlDesignInfo('weAppButton',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "className": ng_diString('weAppButtonLight'),
          "Data": {
            "MenuVAlign": ng_diString('bottom', { Level: 'advanced' }),
            "MenuHAlign": ng_diString('center', { Level: 'advanced' }),
            "MenuOverlapY": ng_diInteger(10,{ Level: 'basic' }),
            "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.AppButtonLight', { Level: 'advanced' })
          },
          "Events": {
            "OnGetImg": ng_diEvent('function(c, b, idx) { return ""; }', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,weButtonDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weLabel',function(d,c,ref) {
      var di = {
        ControlCategory: 'Label',
        Properties: ng_diProperties({
          "className": ng_diString('weLabelLight')
        })
      };
      ng_MergeVar(di,weButtonDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weLink',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "className": ng_diString('weLink')
        })
      };
      ng_MergeVar(di,weButtonDI(d,c,ref));
      return di;
    });
    
    function weGroupDI(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weGroupBoxLight')
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
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": ng_diString('weEditLight'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.EditLight.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.EditLight.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WinEightControls.Images.EditLight.RightImg', { Level: 'advanced' })
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
        Properties: ng_diProperties({
          "Buttons": { Level: 'advanced' },
          "Methods": {
            "Elipsis": ng_diFunction('function(text) { ng_CallParent(this, "Elipsis", arguments); }')
          },
          "Events": {
            "OnElipsis": ng_diEvent('function(c) {}', { Level: 'basic' })
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
        Properties: ng_diProperties({
          "Buttons": { Level: 'advanced' },
          "Methods": {
            "Search": ng_diFunction('function(text) { ng_CallParent(this, "Search", arguments); }')
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
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "Data": {
            "TextAlign": ng_diString('center', { Level: 'advanced' })
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
        Properties: ng_diProperties({
          "Data": {
            "TextAlign": ng_diString('center', { Level: 'advanced' })
          },
          "Methods": {
            "GetColor": ng_diFunction('function() { return ng_CallParent(this, "GetColor", arguments); }')
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
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "Data": {
            "H": ng_diInteger(WinEightControls.Images.EditLight.MiddleImg.H, { Level: 'advanced' }),
            "LeftDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WinEightControls.Images.EditLight.LeftImg.W, { Level: 'advanced' }),
              "Data": {
                "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.EditLight.LeftImg', { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.EditLight.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', null, { Level: 'advanced' })
              }
            }), { Level: 'advanced' }),
            "EditDef": ng_diControl('weEdit', ng_diProperties({
              "Data": {
                "LeftImg": ng_diTypeVal('image', null, { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.EditLight.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', null, { Level: 'advanced' })
              }
            }), { Level: 'advanced' }),
            "StaticDef": ng_diControl('weLabel', ng_diProperties({
              "Data": {
                "LeftImg": ng_diTypeVal('image', null, { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.EditLight.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', null, { Level: 'advanced' })
              }
            }), { Level: 'advanced' }),
            "RightDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WinEightControls.Images.EditLight.RightImg.W, { Level: 'advanced' }),
              "Data": {
                "LeftImg": ng_diTypeVal('image', null, { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.EditLight.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', 'WinEightControls.Images.EditLight.RightImg', { Level: 'advanced' })
              }
            }), { Level: 'advanced' })
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

    ngRegisterControlDesignInfo('weDropDown',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      di.ControlCategory='Dropdown';
      return di;
    });
    ngRegisterControlDesignInfo('weDropDownList',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    
    function weMemoDI(d,c,ref) {
      return {
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": ng_diString('weMemoLight', { Level: 'advanced' }),
          "Data": {
            "Frame": ng_diTypeVal('img_frame', 'WinEightControls.Images.MemoLight', { Level: 'advanced' })
          },
          "Events": {
            "OnFocus": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnBlur": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "DoMouseLeave": ng_diEvent('function(c, e, mi) { return true; }', { Level: 'basic' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('weMemo', weMemoDI);
    
    function wePagesDI(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wePagesLight', { Level: 'advanced' }),
          "Data": {
            "PagesIndent": ng_diInteger(20, { Level: 'advanced' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('wePages', wePagesDI);
    ngRegisterControlDesignInfo('weSections',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weSectionsLight', { Level: 'advanced' }),
          "Data": {
            "PageImages": ng_diTypeVal('image', 'WinEightControls.Images.Sections', { Level: 'advanced' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weToolBar',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weToolBarLight', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('weProgressBar',function(d,c,ref) {
      return {
        ControlCategory: 'Progress',
        Properties: ng_diProperties({
          "className": ng_diString('weProgressBar', { Level: 'advanced' }),
          "Smooth": ng_diBoolean(true),
          "Data": {
            "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.ProgressBar.MiddleImg', { Level: 'advanced' }),
            "BarImg": ng_diTypeVal('image', 'WinEightControls.Images.ProgressBar.BarImg', { Level: 'advanced' })
          }
        })
      };
    });
    
    // TODO: newControl?
    function weProgressImgDI(d,c,ref) {
      return {
        ControlCategory: 'Progress',
        NewControl: {
          _noMerge: true,
          Default: {
            Properties: {
            }
          }
        },
        Properties: ng_diProperties({
          "className": ng_diString('weLabelLight', { Level: 'advanced' }),
          "Data": {
            "TextAlign": ng_diString('center', { Level: 'advanced' }),
            "HTMLEncode": ng_diBoolean(false)
          }/*,
          "Events": {
            "OnGetText": ng_diEvent('function(c) { return true; }', { Level: 'basic' })
          }*/
        })
      };
    };
    ngRegisterControlDesignInfo('weProgressRing', weProgressImgDI);
    ngRegisterControlDesignInfo('weProgressDot', weProgressImgDI);
    ngRegisterControlDesignInfo('weProgressLine', weProgressImgDI);

    function weListDI(d,c,ref) {
      return {
        ControlCategory: 'List',
        Properties: ng_diProperties({
          "className": ng_diString('weListBoxLight', { Level: 'advanced' }),
          Data: {
            "TreeImg": ng_diTypeVal('image', 'WinEightControls.Images.TreeImgTriangle', { Level: 'advanced' })
          },
          "Methods": {
            "DoUpdate": ng_diFunction('function() { ng_CallParent(this, "DoUpdate", arguments); }')
          },
          "Events": {
            "OnGetCheckImg": ng_diEvent('function(c,item) { return true; }', { Level: 'basic' })
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
        ControlCategory: 'List',
        Properties: ng_diProperties({
          "className": ng_diString('weListBoxLight', { Level: 'advanced' }),
          Data: {
            "AverageItemHeight" : ng_diInteger(38, { Level: 'advanced' })
          },
          "ModifyControls": {
            "List": ng_diControl('weList', null, { Level: 'basic' }, { InheritedFrom: 'ngList' }),
            "Loading": ng_diControl('weProgressDot', null, { Level: 'advanced' }),
            "Paging": ng_diControl(undefined, {
              "className": ng_diString('wePageListPagingLight', { Level: 'advanced' })
            }, { Level: 'advanced' }),
            "FirstPage": ng_diControl('weFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "PrevPage": ng_diControl('weFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "PageNo": ng_diControl('weEdit', null, { Level: 'advanced' }, { InheritedFrom: 'ngEdit' }),
            "Page0": ng_diControl('weFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "NextPage": ng_diControl('weFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "LastPage": ng_diControl('weFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wePageList',wePageListDI);
    ngRegisterControlDesignInfo('wePageTreeList',function(d,c,ref) {
      var di={
        ControlCategory: 'List',
        IsContainer: true,
        Properties: ng_diProperties({
          "ModifyControls": {
            "List": ng_diControl('weTreeList', null, { Level: 'basic' }, { InheritedFrom: 'ngList' })
          }
        })
      };
      ng_MergeVar(di,wePageListDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weAlignPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wePanel', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('weAlignFrame',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wePanel', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('weSplitPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weSplitPanelLight', { Level: 'advanced' }),
          "Data": {
            "HandleImg": ng_diTypeVal('image', 'WinEightControls.Images.VSplitLight', { Level: 'advanced' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weDropPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weDropPanelLight', { Level: 'advanced' }),
          "ModifyControls": {
            "Button": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.DropPanelButtonMiddleLight', { Level: 'advanced' }),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.DropPanelButtonLight', { Level: 'advanced' }),
                "TextAlign": ng_diString('right', { Level: 'advanced' }),
                "ImgIndent": ng_diInteger(20, { Level: 'advanced' })
              }
            }), { Level: 'advanced' })
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
        ControlCategory: 'Window',
        IsContainer: true,
        Properties: ng_diProperties({
          "CloseBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "MaxBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "MinBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "Data": {
            "BackgroundColor": null,
            "FormID": { Level: 'advanced' },
            "Frame": ng_diType('img_frame', { Level: 'advanced' }, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', frameimg+'.LeftTop', { Level: 'advanced' }),
                "Top": ng_diTypeVal('image', frameimg+'.Top', { Level: 'advanced' }),
                "RightTop": ng_diTypeVal('image', frameimg+'.RightTop', { Level: 'advanced' }),
                "Left": ng_diTypeVal('image', frameimg+'.Left', { Level: 'advanced' }),
                "Right": ng_diTypeVal('image', frameimg+'.Right', { Level: 'advanced' }),
                "LeftBottom": ng_diTypeVal('image', frameimg+'.LeftBottom', { Level: 'advanced' }),
                "Bottom": ng_diTypeVal('image', frameimg+'.Bottom', { Level: 'advanced' }),
                "RightBottom": ng_diTypeVal('image', frameimg+'.RightBottom', { Level: 'advanced' })
              }
            }),
            "CaptionImg": ng_diObject({
              "LeftImg": ng_diTypeVal('image', capimg+'.LeftImg', { Level: 'advanced' }),
              "MiddleImg": ng_diTypeVal('image', capimg+'.MiddleImg', { Level: 'advanced' }),
              "RightImg": ng_diTypeVal('image', capimg+'.RightImg', { Level: 'advanced' })
            }, { Level: 'advanced' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weWindow',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('weWindow', { Level: 'advanced' })
        })
      };
      ng_MergeVar(di,weWindowDI(d,c,ref));
      return di;
    });    
    ngRegisterControlDesignInfo('weDialog',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('weDialog', { Level: 'advanced' }),
          "CloseBtn": ng_diBoolean(true),
          "Data": {
            "Modal": ng_diBoolean(true),
            "Visible": ng_diBoolean(false),
            "Sizeable": ng_diBoolean(false),
            "Centered": ng_diBoolean(true)
          }
        })
      };
      ng_MergeVar(di,weWindowDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weHint', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('weTextHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        Properties: ng_diProperties({
          "className": ng_diString('weTextHint', { Level: 'advanced' }),
          "ModifyControls": {
            "Hint": ng_diControl('weText', null, { Level: 'advanced' }, { InheritedFrom: 'ngText' })
          }
        })
      };
    });
    
    function weMessageDlgDI(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
        IsContainer: false,
        Properties: ng_diProperties({
          "DialogType": ng_diString('weDialog',{Level: 'advanced'}),
          "ModifyControls": {
            "Title": ng_diControl('weCaption', null, { Level: 'advanced' }, { InheritedFrom: 'ngText' }),
            "Message": ng_diControl('weText', null, { Level: 'advanced' }, { InheritedFrom: 'ngText' }),
            "OK": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Yes": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "No": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Cancel": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "CheckBox": ng_diControl('weCheckBox', null, { Level: 'advanced' }, { InheritedFrom: 'ngCheckBox' })
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
        Properties: ng_diProperties({
          "DialogType": ng_diString('weMessageDlg',{Level: 'advanced'})
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weDlgInputBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('weEdit', null, { Level: 'advanced' }, { InheritedFrom: 'ngEdit' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDlgDropDownBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('weDropDown', null, { Level: 'advanced' }, { InheritedFrom: 'ngDropDown' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDlgDropDownListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('weDropDownList', null, { Level: 'advanced' }, { InheritedFrom: 'ngDropDownList' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDlgMemoBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('weMemo', null, { Level: 'advanced' }, { InheritedFrom: 'ngMemo' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DialogType": ng_diString('weMessageDlg',{Level: 'advanced'}),
          "ModifyControls": {
            "List": ng_diControl('weList', null, { Level: 'advanced' }, { InheritedFrom: 'ngList' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgProgressBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Progress": ng_diControl('weProgressBar', null, { Level: 'advanced' }, { InheritedFrom: 'ngProgressBar' })
          }
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgWaitBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Progress": ng_diControl('weProgressLine', null, { Level: 'advanced' }, { InheritedFrom: 'ngText' })
          }
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgAbout',function(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
        Properties: ng_diProperties({
          "DialogType": ng_diString('weDlgMessageBox',{Level: 'advanced'}),
          "DlgIcon": ng_diMixed(['null','ngListStringItems'], { InitType: 'ngListItems', Level: 'basic' }),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "className": ng_diString('weAboutMessageLight', { Level: 'advanced' })
            }), { Level: 'advanced' }),
            "AppInfo": ng_diControl('weListBox', ng_diProperties({
              "className": ng_diString('weTextListBoxLight', { Level: 'advanced' })
            }), { Level: 'advanced' }, { InheritedFrom: 'ngList' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weCalendar',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_diProperties({
          "className": ng_diString('weCalendarLight', { Level: 'advanced' })
        })
      };
    });
    
    function weEditDateDI(d,c,ref) {
      var di={
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": ng_diString('weEditLight', { Level: 'advanced' }),
          "DropDown": ng_diControl('weCalendar', ng_diProperties({
            "Data": {
              "className": ng_diString('weCalendarLight', { Level: 'advanced' })
            }
          }), { Level: 'basic' }, { InheritedFrom: 'ngCalendar' })
        })
      };
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weEditDate',weEditDateDI);
    
    function weEditTimeDI(d,c,ref) {
      var di={
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": ng_diString('weEditLight', { Level: 'advanced' }),
          "DropDown": ng_diControl('weList', null, { Level: 'basic' }, { InheritedFrom: 'ngList' }),
          "Events": {
            "OnDropDown": ng_diEvent('function(c, l) { return true; }', { Level: 'basic' }),
            "OnListItemChanged": ng_diEvent('function(c, l, it, oit) { return false; }', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weEditTime',weEditTimeDI);

    ngRegisterControlDesignInfo('weColorPickerBox',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 320 }
            }
          }
        },
        Properties: ng_diProperties({
          'Data': {
            'AutoHeight': ng_diBoolean(true, { Level: 'basic' }),
            'AsToolbar': ng_diBoolean(true, { Level: 'basic' }),
            'Vertical': ng_diBoolean(true, { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('weColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
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
        ControlCategory: 'Dropdown',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 200 }
            }
          }
        },
        Properties: ng_diProperties({
          'DropDown': ng_diControl('weColorPickerBox', ng_diProperties({
            'Data': {
              'MaxHeight': ng_diInteger(600,{ Level: 'basic' })
            }
          }), { Level: 'basic' }, { InheritedFrom: 'weColorPickerBox' })
        })
      };
    });

    ngRegisterControlDesignInfo('weColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        NewControl: {
          _noMerge:true
        },
        Properties: ng_diProperties({
          'ModifyControls': {
            'Picker': ng_diControl('weColorPickerBox', ng_diProperties({
              'W': ng_diTypeVal('bounds',296,{ Level: 'basic' })
            }), { Level: 'basic' }, { InheritedFrom: 'weColorPickerBox' })
          }
        }, { "ModifyControls": { Level: 'basic' } })
      };
    });
    
    /********************************/
    
    ngRegisterControlDesignInfo('weMenu',function(d,c,ref) {
      return {
        ControlCategory: 'Menu',
        Properties: ng_diProperties({
          "className": ng_diString('weMenuLight', { Level: 'advanced' }),
          "ModifyControls": {
            "SubMenuDef": ng_diControl('weMenu', null, { Level: 'advanced' }, { InheritedFrom: 'ngMenu' })
          },
          "Events": {
            "OnGetCheckImg": ng_diEvent('function(c, l, i) { return true; }', { Level: 'basic' }),
            "OnGetItemImg": ng_diEvent('function(c, l, it, id, level) { return ""; }', { Level: 'basic' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weMenuBar',function(d,c,ref) {
      return {
        ControlCategory: 'Menu',
        Properties: ng_diProperties({
          "className": ng_diString('weMenuBarLight', { Level: 'advanced' }),
          "ModifyControls": {
            "SubMenuDef": ng_diControl('weMenu', null, { Level: 'advanced' }, { InheritedFrom: 'ngMenu' })
          }
        })
      };
    });
    
    /*ngRegisterControlDesignInfo('weMenuBarButton',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('weMenuBarButton', { Level: 'advanced' })
        })
      };
    });*/
    
    ngRegisterControlDesignInfo('weSplitButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": ng_diString('weSplitButtonLight', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.ButtonDark.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.ButtonDark.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WinEightControls.Images.ButtonDark.MenuRightBtnImg', { Level: 'advanced' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weFileUploader',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_diProperties({
          "className": ng_diString('weFileUploaderLight', { Level: 'advanced' }),
          "ModifyControls": {
            "ListFiles": ng_diControl('weList', null, { Level: 'advanced' }, { InheritedFrom: 'ngList' }),
            "DragAndDropInfo": ng_diControl('weSmallText', null, { Level: 'advanced' }),
            "BtnAddFile": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "BtnRemoveFiles": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weViewModelForm',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "ModifyControls": {
            "ErrorHint": ng_diControl('weTextHint', null, { Level: 'advanced' }, { InheritedFrom: 'ngTextHint' })
          }
        })
      };
    });
    
    function weEditFieldDI (d,c,ref) {
      var di = {
       ControlCategory: 'Edit Field',
        Properties: ng_diProperties({
          "Data": {
            "HintX": ng_diInteger(19,{ Level: 'basic' }),
            "HintY": ng_diInteger(27,{ Level: 'basic' })
          },
          "ErrorHint": ng_diControl('weTextHint', null, { Level: 'advanced' }, { InheritedFrom: 'ngTextHint' })
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
      di.ControlCategory='Edit Field';
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
      di.ControlCategory='Dropdown Field';
      return di;
    });
    ngRegisterControlDesignInfo('weDropDownListField',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory='Dropdown Field';
      return di;
    });
    ngRegisterControlDesignInfo('weEditDateField',function(d,c,ref) {
      var di=weEditDateDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('weEditTimeField',function(d,c,ref) {
      var di=weEditTimeDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('weMemoField',function(d,c,ref) {
      var di=weMemoDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    
    ngRegisterControlDesignInfo('weDBViewModelForm',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "Events": {
            "OnDeleteQuery": ng_diEvent('function(c,querytxt,successfnc,failfnc) {}', { Level: 'basic' }),
            "OnChangedQuery": ng_diEvent('function(c,querytxt,successfnc,failfnc) {}', { Level: 'basic' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weDBToolBar',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weToolBar', { Level: 'advanced' }),
          "ModifyControls": {
            "New": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Delete": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Insert": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Update": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Cancel": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weDataSet', function(d,c,ref) {
      var di = {
        ControlCategory: 'Dataset'
      };
      ng_MergeVar(di,wePageListDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('weDBDataSet',function(d,c,ref) {
      var di = {
        ControlCategory: 'Dataset',
        Properties: ng_diProperties({
          "ModifyControls": {
            "NewRecord": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "LoadRecord": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "DeleteRecord": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Refresh": ng_diControl('weButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
      ng_MergeVar(di,wePageListDI(d,c,ref));
      return di;
    });
    
  }
};
ngUserControls['wineight_designinfo'] = WinEight_DesignInfo;