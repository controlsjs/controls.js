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
var WinXP_DesignInfo = {
  OnInit: function() {
    if(!ngDESIGNINFO) return;

    var undefined;
    ngRegisterControlDesignInfo('stdPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_diProperties({
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdFrame',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_diProperties({
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });
/*    ngRegisterControlDesignInfo('stdAlignPanel',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('stdAlignFrame',function(d,c,ref) {
      return {
      };
    });*/
    ngRegisterControlDesignInfo('stdText',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdText'),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdImage',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdImage')
        })
      };
    });
    ngRegisterControlDesignInfo('stdCheckBox',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdCheckBox'),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "TextAlign": ng_diStringValues('right', ['left','right']),
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.CheckBoxLeft', { Level: 'advanced' }),
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdRadioButton',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdRadio'),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "TextAlign": ng_diStringValues('right', ['left','right']),
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.RadioLeft', { Level: 'advanced' }),
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdButton',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdButton'),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.DefButton.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.DefButton.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.DefButton.RightImg', { Level: 'advanced' })
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdFlatButton',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdFlatButton'),
          "style": {
            "color": { Level: 'advanced' },
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": { Level: 'advanced' },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdLabel',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdLabel'),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": { Level: 'advanced' },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdLink',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdLink'),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": { Level: 'advanced' },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });

    function stdGroupDI(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdGroupBox'),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "Frame": ng_diType('img_frame', { Level: 'advanced' }, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WinXPControls.Images.GroupBox.LeftTop'),
                "Top": ng_diTypeVal('image', 'WinXPControls.Images.GroupBox.Top'),
                "RightTop": ng_diTypeVal('image', 'WinXPControls.Images.GroupBox.RightTop'),
                "Left": ng_diTypeVal('image', 'WinXPControls.Images.GroupBox.Left'),
                "Right": ng_diTypeVal('image', 'WinXPControls.Images.GroupBox.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WinXPControls.Images.GroupBox.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WinXPControls.Images.GroupBox.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WinXPControls.Images.GroupBox.RightBottom')
              }
            })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdGroup',stdGroupDI);
    ngRegisterControlDesignInfo('stdGroupBox',function(d,c,ref) {
      var di=stdGroupDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function stdEditDI(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdEdit'),
          "DropDown": ng_diControl(undefined, {
            "className": ng_diString('stdDropDown', { Level: 'advanced' })
          }),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.RightImg', { Level: 'advanced' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdEdit',stdEditDI);
    ngRegisterControlDesignInfo('stdEditBox',function(d,c,ref) {
      var di=stdEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    
    function stdEditBoxBtnDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "Buttons": { Level: 'advanced' },
          "Events": {
            "OnElipsis": ng_diEvent('function(c, text) {}', { Level: 'basic' })
          }
        })
      };
      return di;
    };
    ngRegisterControlDesignInfo('stdEditBoxBtn',function(d,c,ref) {
      var di=stdEditBoxBtnDI(d,c,ref);
      ng_MergeVar(di,stdEditDI(d,c,ref));
      return di;
    });
    
    function stdSearchBoxDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "Buttons": { Level: 'advanced' },
          "Methods": {
            "Search": ng_diFunction('function(text) { ng_CallParent(this, "Search", arguments); }')
          },
          "Events": {
            "OnSearch": ng_diEvent('function(c, text) {}', { Level: 'basic' })
          }
        })
      };
      return di;
    }
    ngRegisterControlDesignInfo('stdSearchBox',function(d,c,ref) {
      var di=stdSearchBoxDI(d,c,ref);
      ng_MergeVar(di,stdEditDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('stdEditNum', stdEditDI);
    ngRegisterControlDesignInfo('stdEditBoxNum',function(d,c,ref) {
      var di=stdEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function stdColorEditDI(d,c,ref) {
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
    ngRegisterControlDesignInfo('stdColorEdit',function(d,c,ref) {
      var di=stdColorEditDI(d,c,ref);
      ng_MergeVar(di,stdEditDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('stdColorEditBox',function(d,c,ref) {
      var di=stdColorEditDI(d,c,ref);
      ng_MergeVar(di,stdEditDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    function stdMaskEditDI(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "Data": {
            "H": ng_diInteger(WinXPControls.Images.Edit.MiddleImg.H, { Level: 'advanced' }),
            "LeftDef": ng_diCotnrol(undefined, ng_diProperties({
              "W": ng_diInteger(WinXPControls.Images.Edit.LeftImg.W, { Level: 'advanced' }),
              "Data": {
                "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.LeftImg', { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', null, { Level: 'advanced' })
              }
            }), { Level: 'advanced' }),
            "EditDef": ng_diControl('stdEdit', ng_diProperties({
              "Data": {
                "LeftImg": ng_diTypeVal('image', null, { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', null, { Level: 'advanced' })
              }
            }), { Level: 'advanced' }),
            "StaticDef": ng_diControl('stdLabel', ng_diProperties({
              "Data": {
                "LeftImg": ng_diTypeVal('image', null, { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', null, { Level: 'advanced' })
              }
            }), { Level: 'advanced' }),
            "RightDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WinXPControls.Images.Edit.RightImg.W, { Level: 'advanced' }),
              "Data": {
                "LeftImg": ng_diTypeVal('image', null, { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.RightImg', { Level: 'advanced' })
              }
            }), { Level: 'advanced' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdMaskEdit',stdMaskEditDI);
    ngRegisterControlDesignInfo('stdMaskEditBox',function(d,c,ref) {
      var di=stdMaskEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    ngRegisterControlDesignInfo('stdDropDown',stdEditDI);
    ngRegisterControlDesignInfo('stdDropDownList',function(d,c,ref) {
      var di=stdEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    
    function stdMemoDI(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdMemo', { Level: 'advanced' }),
          "Data": {
            "Frame": ng_diTypeVal('img_frame', 'WinXPControls.Images.Memo', { Level: 'advanced' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('stdMemo', stdMemoDI);
    
    ngRegisterControlDesignInfo('stdPages',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdPages', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdToolBar',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdToolBar', { Level: 'advanced' })
        })
      };
    });
    
    /*ngRegisterControlDesignInfo('stdWebBrowser',function(d,c,ref) {
      return {
      };
    });*/
    
    ngRegisterControlDesignInfo('stdProgressBar',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdProgressBar', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.ProgressBar.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.ProgressBar.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.ProgressBar.RightImg', { Level: 'advanced' }),
            "BarImg": ng_diTypeVal('image', 'WinXPControls.Images.ProgressBar.BarImg', { Level: 'advanced' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdProgressDot',function(d,c,ref) {
      return {
        NewControl: {
          _noMerge: true,
          Default: {
            Properties: {
            }
          }
        },
        Properties: ng_diProperties({
          "className": ng_diString('stdLabel', { Level: 'advanced' }),
          "Data": {
            "TextAlign": ng_diString('center', { Level: 'advanced' }),
            "HTMLEncode": ng_diBoolean(false)
          }
        })
      };
    });

    function stdListDI(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdListBox', { Level: 'advanced' }),
          Data: {
            "TreeImg": ng_diTypeVal('image', 'WinXPControls.Images.TreeImgTriangle', { Level: 'advanced' })
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
    ngRegisterControlDesignInfo('stdList',stdListDI);
    ngRegisterControlDesignInfo('stdListBox',function(d,c,ref) {
      var di=stdListDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    ngRegisterControlDesignInfo('stdTreeList',stdListDI);

    function stdPageListDI(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdListBox', { Level: 'advanced' }),
          Data: {
            "AverageItemHeight" : ng_diInteger(20, { Level: 'advanced' })
          },
          "ModifyControls": {
            "List": ng_diControl('stdList', null, { Level: 'basic' }, { InheritedFrom: 'ngList' }),
            "Loading": ng_diControl('stdProgressDot', null, { Level: 'advanced' }),
            "Paging": ng_diControl(undefined, {
              "className": ng_diString('stdPageListPaging', { Level: 'advanced' })
            }, { Level: 'advanced' }),
            "FirstPage": ng_diControl('stdFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "PrevPage": ng_diControl('stdFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "PageNo": ng_diControl('stdEdit', null, { Level: 'advanced' }, { InheritedFrom: 'ngEdit' }),
            "Page0": ng_diControl('stdFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "NextPage": ng_diControl('stdFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "LastPage": ng_diControl('stdFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdPageList',stdPageListDI);
    ngRegisterControlDesignInfo('stdPageTreeList',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "ModifyControls": {
            "List": ng_diControl('stdTreeList', null, { Level: 'basic' }, { InheritedFrom: 'ngList' })
          }
        })
      };
      ng_MergeVar(di,stdPageListDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('stdSplitPanel',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdSplitPanel', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdDropPanel',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdDropPanel', { Level: 'advanced' })
        })
      };
    });
    
    function stdWindowDI(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_diProperties({
          "CloseBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "HelpBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "MaxBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "MinBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "Data": {
            "BackgroundColor": null,
            "FormID": { Level: 'advanced' },
            "Frame": ng_diType('img_frame', { Level: 'advanced' }, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WinXPControls.Images.Window.LeftTop', { Level: 'advanced' }),
                "Top": ng_diTypeVal('image', 'WinXPControls.Images.Window.Top', { Level: 'advanced' }),
                "RightTop": ng_diTypeVal('image', 'WinXPControls.Images.Window.RightTop', { Level: 'advanced' }),
                "Left": ng_diTypeVal('image', 'WinXPControls.Images.Window.Left', { Level: 'advanced' }),
                "Right": ng_diTypeVal('image', 'WinXPControls.Images.Window.Right', { Level: 'advanced' }),
                "LeftBottom": ng_diTypeVal('image', 'WinXPControls.Images.Window.LeftBottom', { Level: 'advanced' }),
                "Bottom": ng_diTypeVal('image', 'WinXPControls.Images.Window.Bottom', { Level: 'advanced' }),
                "RightBottom": ng_diTypeVal('image', 'WinXPControls.Images.Window.RightBottom', { Level: 'advanced' })
              }
            }),
            "CaptionImg": ng_diObject({
              "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.WindowCaption.LeftImg', { Level: 'advanced' }),
              "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.WindowCaption.MiddleImg', { Level: 'advanced' }),
              "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.WindowCaption.RightImg', { Level: 'advanced' })
            }, { Level: 'advanced' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdWindow',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('stdWindow', { Level: 'advanced' })
        })
      };
      ng_MergeVar(di,stdWindowDI(d,c,ref));
      return di;
    });    
    ngRegisterControlDesignInfo('stdDialog',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('stdDialog', { Level: 'advanced' }),
          "CloseBtn": ng_diBoolean(true),
          "Data": {
            "Modal": ng_diBoolean(true),
            "Visible": ng_diBoolean(false),
            "Sizeable": ng_diBoolean(false),
            "Centered": ng_diBoolean(true)
          }
        })
      };
      ng_MergeVar(di,stdWindowDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('stdHint',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdHint', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdTextHint',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdTextHint', { Level: 'advanced' }),
          "ModifyControls": {
            "Hint": ng_diControl('stdText', null, { Level: 'advanced' }, { InheritedFrom: 'ngText' })
          }
        })
      };
    });
    
    function stdMessageDlgDI(d,c,ref) {
      return {
        ControlCategory: 'Dialogs',
        IsContainer: false,
        Properties: ng_diProperties({
          "DialogType": ng_diString('stdDialog',{Level: 'advanced'}),
          "ModifyControls": {
            "Message": ng_diControl('stdText', null, { Level: 'advanced' }, { InheritedFrom: 'ngText' }),
            "OK": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Yes": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "No": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Cancel": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "CheckBox": ng_diControl('stdCheckBox', null, { Level: 'advanced' }, { InheritedFrom: 'ngCheckBox' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('stdMessageDlg',stdMessageDlgDI);
    ngRegisterControlDesignInfo('dlgMessageBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Icon": ng_diControl('stdImage', null, { Level: 'advanced' }, { InheritedFrom: 'ngText' })
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      return di;
    });
    
    function dlgInputBoxDI(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DialogType": ng_diString('stdMessageDlg',{Level: 'advanced'})
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('dlgInputBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('stdEdit', null, { Level: 'advanced' }, { InheritedFrom: 'ngEdit' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('dlgDropDownBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('stdDropDown', null, { Level: 'advanced' }, { InheritedFrom: 'ngDropDown' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('dlgDropDownListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('stdDropDownList', null, { Level: 'advanced' }, { InheritedFrom: 'ngDropDownList' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('dlgMemoBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('stdMemo', null, { Level: 'advanced' }, { InheritedFrom: 'ngMemo' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DialogType": ng_diString('stdMessageDlg',{Level: 'advanced'}),
          "ModifyControls": {
            "List": ng_diControl('stdList', null, { Level: 'advanced' }, { InheritedFrom: 'ngList' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgProgressBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Progress": ng_diControl('stdProgressBar', null, { Level: 'advanced' }, { InheritedFrom: 'ngProgressBar' })
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgWaitBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Progress": ng_diControl('stdProgressDot', null, { Level: 'advanced' }, { InheritedFrom: 'ngProgressDot' })
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgAbout',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "DialogType": ng_diString('dlgMessageBox',{Level: 'advanced'}),
          "DlgIcon": ng_diMixed(['null','ngListStringItems'], { InitType: 'ngListItems', Level: 'basic' }),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "className": ng_diString('stdAboutMessage', { Level: 'advanced' })
            }), { Level: 'advanced' }),
            "AppInfo": ng_diControl('stdTreeList', undefined, { Level: 'advanced' }, { InheritedFrom: 'ngTreeList' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdCalendar',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdCalendar', { Level: 'advanced' })
        })
      };
    });
    
    function stdEditDateDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('stdEdit', { Level: 'advanced' }),
          "DropDown": ng_diControl('stdCalendar', ng_diProperties({
            "Data": {
              "className": ng_diString('stdCalendar', { Level: 'advanced' })
            }
          }), { Level: 'basic' },  { InheritedFrom: 'stdCalendar' })
        })
      };
      ng_MergeVar(di,stdEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('stdEditDate',stdEditDateDI);
    
    function stdEditTimeDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('stdEdit', { Level: 'advanced' }),
          "DropDown": ng_diControl('stdList', ng_diProperties({
            "Data": {
              "className": ng_diString('stdDropDown', { Level: 'advanced' })
            }
          }), { Level: 'basic' }, { InheritedFrom: 'ngList' }),
          "Events": {
            "OnDropDown": ng_diEvent('function(c, l) { return true; }', { Level: 'basic' }),
            "OnListItemChanged": ng_diEvent('function(c, l, it, oit) { return false; }', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,stdEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('stdEditTime',stdEditTimeDI);

    ngRegisterControlDesignInfo('stdColorPickerBox',function(d,c,ref) {
      return {
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 200 }
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

    ngRegisterControlDesignInfo('stdColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 100 }
            }
          }
        }
      };
    });

    ngRegisterControlDesignInfo('stdColorPickerDropDown',function(d,c,ref) {
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
        Properties: ng_diProperties({
          'DropDown': ng_diControl('stdColorPickerBox', ng_diProperties({
            'Data': {
              'MaxHeight': ng_diInteger(480,{ Level: 'basic' })
            }
          }), { Level: 'basic' }, { InheritedFrom: 'stdColorPickerBox' })
        })
      };
    });

    ngRegisterControlDesignInfo('stdColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        NewControl: {
          _noMerge:true
        },
        Properties: ng_diProperties({
          'ModifyControls': {
            'Picker': ng_diControl('stdColorPickerBox', ng_diProperties({
              'W': ng_diTypeVal('bounds',196,{ Level: 'basic' })
            }), { Level: 'basic' }, { InheritedFrom: 'stdColorPickerBox' })
          }
        }, { "ModifyControls": { Level: 'basic' } })
      };
    });
    
    ngRegisterControlDesignInfo('stdMenu',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdMenu', { Level: 'advanced' }),
          "ModifyControls": {
            "SubMenuDef": ng_diControl('stdMenu', null, { Level: 'advanced' }, { InheritedFrom: 'ngMenu' })
          },
          "Events": {
            "OnGetCheckImg": ng_diEvent('function(c, l, i) { return true; }', { Level: 'basic' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdMenuBar',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdMenuBar', { Level: 'advanced' })
        })
      };
    });
    
    /*ngRegisterControlDesignInfo('stdMenuBarButton',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdMenuBarButton', { Level: 'advanced' })
        })
      };
    });*/
    
    ngRegisterControlDesignInfo('stdSplitButton',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdSplitButton', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.Button.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Button.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.Button.MenuRightBtnImg', { Level: 'advanced' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdFileUploader',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdFileUploader', { Level: 'advanced' }),
          /*"Events": {
            "OnError": ng_diEvent('function(c, error, data) {}', { Level: 'basic' }),
            "OnUploadProgress": ng_diEvent('function(c, p) { return true; }', { Level: 'basic' }),
            "OnShowWaiting": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnHideWaiting": ng_diEvent('function(c) {}', { Level: 'basic' })
          },*/
          "ModifyControls": {
            "ListFiles": ng_diControl('stdList', null, { Level: 'advanced' }, { InheritedFrom: 'ngList' }),
            "DragAndDropInfo": ng_diControl('stdText', null, { Level: 'advanced' }),
            "BtnAddFile": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "BtnRemoveFiles": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdViewModelForm',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "ModifyControls": {
            "ErrorHint": ng_diControl('stdTextHint', ng_diProperties({
              "className": ng_diString('stdEditFieldError', { Level: 'advanced' })
            }), { Level: 'advanced' }, { InheritedFrom: 'ngTextHint' })
          }
        })
      };
    });
    
    function stdEditFieldDI (d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "Data": {
            "HintX": ng_diInteger(0,{ Level: 'basic' })
          },
          "ErrorHint": ng_diControl('stdTextHint', ng_diProperties({
            "className": ng_diString('stdEditFieldError', { Level: 'advanced' })
          }), { Level: 'advanced' }, { InheritedFrom: 'ngTextHint' })
        })
      };
      ng_MergeVar(di,stdEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('stdEditField',stdEditFieldDI);
    ngRegisterControlDesignInfo('stdSearchBoxField',function(d,c,ref) {
      var di=stdSearchBoxDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('stdEditBoxBtnField',function(d,c,ref) {
      var di=stdEditBoxBtnDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('stdEditNumField',function(d,c,ref) {
      var di=stdEditDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('stdColorEditField',function(d,c,ref) {
      var di=stdColorEditDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('stdDropDownField',function(d,c,ref) {
      var di=stdEditDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('stdDropDownListField',function(d,c,ref) {
      var di=stdEditDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    ngRegisterControlDesignInfo('stdEditDateField',function(d,c,ref) {
      var di=stdEditDateDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('stdEditTimeField',function(d,c,ref) {
      var di=stdEditTimeDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('stdMemoField',function(d,c,ref) {
      var di=stdMemoDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('stdDataSet',stdPageListDI);
    
    /*ngRegisterControlDesignInfo('stdDBViewModelForm',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "Events": {
            "OnDeleteQuery": ng_diEvent('function(c,querytxt,successfnc,failfnc) {}', { Level: 'basic' }),
            "OnChangedQuery": ng_diEvent('function(c,querytxt,successfnc,failfnc) {}', { Level: 'basic' })
          }
        })
      };
    });*/
    
    ngRegisterControlDesignInfo('stdDBToolBar',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('stdToolBar', { Level: 'advanced' }),
          "ModifyControls": {
            "New": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Delete": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Insert": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Update": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Cancel": ng_diControl('stdButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
    });
    

    ngRegisterControlDesignInfo('stdDBDataSet',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "NewRecord": ng_diControl('stdFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "LoadRecord": ng_diControl('stdFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "DeleteRecord": ng_diControl('stdFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Refresh": ng_diControl('stdFlatButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
      ng_MergeVar(di,stdPageListDI(d,c,ref));
      return di;
    });
  }
};
ngUserControls['winxp_designinfo'] = WinXP_DesignInfo;