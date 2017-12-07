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
    ngRegisterControlDesignInfo('stdPanel', 'ngPanel');

    ngRegisterControlDesignInfo('stdFrame', 'ngFrame');

    ngRegisterControlDesignInfo('stdAlignPanel','ngAlignPanel');

    ngRegisterControlDesignInfo('stdAlignFrame','ngAlignFrame');

    ngRegisterControlDesignInfo('stdText',function(d,c,ref) {
      return {
        ControlCategory: 'Label',
        Properties: {
          "className": ng_diString('wxpText')
        }
      };
    });
    ngRegisterControlDesignInfo('stdImage',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: {
          "className": ng_diString('wxpImage')
        }
      };
    });
    ngRegisterControlDesignInfo('stdCheckBox',function(d,c,ref) {
      return {
        ControlCategory: 'Checkbox & Radio',
        Properties: ng_diProperties({
          "className": ng_diString('wxpCheckBox'),
          "Data": {
            "TextAlign": ng_diString('right'),
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.CheckBoxLeft')
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdRadioButton',function(d,c,ref) {
      return {
        ControlCategory: 'Checkbox & Radio',
        Properties: ng_diProperties({
          "className": ng_diString('wxpRadio'),
          "Data": {
            "TextAlign": ng_diString('right'),
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.RadioLeft')
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": ng_diString('wxpButton'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.Button.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Button.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.Button.RightImg')
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdFlatButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: {
          "className": ng_diString('wxpFlatButton')
        }
      };
    });
    ngRegisterControlDesignInfo('stdLabel',function(d,c,ref) {
      return {
        ControlCategory: 'Label',
        Properties: {
          "className": ng_diString('wxpLabel')
        }
      };
    });
    ngRegisterControlDesignInfo('stdLink',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: {
          "className": ng_diString('wxpLink')
        }
      };
    });

    function stdGroupDI(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wxpGroupBox'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
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
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": ng_diString('wxpEdit'),
          "DropDown": ng_diControl(undefined, {
            "className": ng_diString('wxpDropDown')
          }),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.RightImg')
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
            "TextAlign": ng_diString('center')
          },
          "Methods": {
            "GetColor": ng_diFunction('function() { return ng_CallParent(this, "GetColor", arguments, ""); }')
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
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "Data": {
            "H": ng_diInteger(WinXPControls.Images.Edit.MiddleImg.H),
            "LeftDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WinXPControls.Images.Edit.LeftImg.W),
              "Data": {
                "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.LeftImg'),
                "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.MiddleImg')
              }
            })),
            "EditDef": ng_diControl('stdEdit', ng_diProperties({
              "Data": {
                "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.MiddleImg')
              }
            })),
            "StaticDef": ng_diControl('stdLabel', ng_diProperties({
              "Data": {
                "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.MiddleImg')
              }
            })),
            "RightDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WinXPControls.Images.Edit.RightImg.W),
              "Data": {
                "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.MiddleImg'),
                "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.Edit.RightImg')
              }
            }))
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

    ngRegisterControlDesignInfo('stdDropDown',function(d,c,ref) {
      var di=stdEditDI(d,c,ref);
      di.ControlCategory='Dropdown';
      return di;
    });

    ngRegisterControlDesignInfo('stdDropDownList',function(d,c,ref) {
      var di=stdEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    
    function stdMemoDI(d,c,ref) {
      return {
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": ng_diString('wxpMemo'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WinXPControls.Images.Memo.LeftTop'),
                "Top": ng_diTypeVal('image', 'WinXPControls.Images.Memo.Top'),
                "RightTop": ng_diTypeVal('image', 'WinXPControls.Images.Memo.RightTop'),
                "Left": ng_diTypeVal('image', 'WinXPControls.Images.Memo.Left'),
                "Right": ng_diTypeVal('image', 'WinXPControls.Images.Memo.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WinXPControls.Images.Memo.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WinXPControls.Images.Memo.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WinXPControls.Images.Memo.RightBottom')
              }
            })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('stdMemo', stdMemoDI);
    
    ngRegisterControlDesignInfo('stdPages',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: {
          "className": ng_diString('wxpPages')
        }
      };
    });
    
    ngRegisterControlDesignInfo('stdToolBar',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: {
          "className": ng_diString('wxpToolBar')
        }
      };
    });
    
    ngRegisterControlDesignInfo('stdWebBrowser', 'ngWebBrowser');
    
    ngRegisterControlDesignInfo('stdProgressBar',function(d,c,ref) {
      return {
        ControlCategory: 'Progress',
        Properties: ng_diProperties({
          "className": ng_diString('wxpProgressBar'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.ProgressBar.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.ProgressBar.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.ProgressBar.RightImg'),
            "BarImg": ng_diTypeVal('image', 'WinXPControls.Images.ProgressBar.BarImg')
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdProgressDot',function(d,c,ref) {
      return {
        ControlCategory: 'Progress',
        NewControl: {
          Default: {
            Properties: {
            }
          }
        },
        Properties: ng_diProperties({
          "className": ng_diString('wxpLabel'),
          "Data": {
            "TextAlign": ng_diString('center'),
            "HTMLEncode": ng_diBoolean(false)
          }
        })
      };
    });

    function stdListDI(d,c,ref) {
      return {
        ControlCategory: 'List',
        Properties: ng_diProperties({
          "className": ng_diString('wxpListBox'),
          "TreeImg": ng_diStringValues('', ['plusminus','triangle','folder'], { Level: 'basic' })
        })
      };
    }
    ngRegisterControlDesignInfo('stdList',stdListDI);
    ngRegisterControlDesignInfo('stdListBox',function(d,c,ref) {
      var di=stdListDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    ngRegisterControlDesignInfo('stdTreeList',function(d,c,ref) {
      var di={
        Properties: {
          "TreeImg": ng_diString('plusminus')
        }
      };
      ng_MergeVar(di,stdListDI(d,c,ref));
      return di;
    });

    function stdPageListDI(d,c,ref) {
      return {
        ControlCategory: 'List',
        Properties: ng_diProperties({
          "className": ng_diString('stdListBox'),
          Data: {
            "AverageItemHeight" : ng_diInteger(20)
          },
          "ModifyControls": {
            "List": ng_diControl('stdList',ng_diProperties({
              "style": {
                "border": ng_diString('0px', { Level: 'basic' })
              }
            })),
            "Loading": ng_diControl('stdProgressDot',ng_diProperties({
              "L": ng_diTypeVal('bounds', 10),
              "T": ng_diTypeVal('bounds', 10),
              "Data": {
                "Visible": ng_diBoolean(false)
              }
            })),
            "Paging": ng_diControl(undefined, {
              "className": ng_diString('wxpPageListPaging')
            }),
            "FirstPage": ng_diControl('stdFlatButton',ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.PagingFirst'),
                "Text": ng_diString('')
              }
            })),
            "PrevPage": ng_diControl('stdFlatButton',ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.PagingPrev'),
                "Text": ng_diString('')
              }
            })),
            "PageNo": ng_diControl('stdEdit',ng_diProperties({
              "W": ng_diTypeVal('bounds', 30),
              "className": ng_diString('wxpPgListPgNo'),
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.PgListPgNo.LeftImg'),
                "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.PgListPgNo.MiddleImg'),
                "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.PgListPgNo.RightImg'),
                "Text": ng_diString('1'),
                "TextAlign": ng_diString('center')
              }
            })),
            "Page0": ng_diControl('stdFlatButton',ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "MinWidth": ng_diInteger(18),
                "Text": ng_diString('1'),
                "TextAlign": ng_diString('center')
              }
            })),
            "NextPage": ng_diControl('stdFlatButton',ng_diProperties({
              "Data": {
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.PagingNext'),
                "Text": ng_diString(''),
                "ImgAlign": ng_diString('right'),
                "ToolBarHPadding": ng_diInteger(5)
              }
            })),
            "LastPage": ng_diControl('stdFlatButton',ng_diProperties({
              "Data": {
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.PagingLast'),
                "ImgAlign": ng_diString('right'),
                "Text": ng_diString('')
              }
            }))
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdPageList',stdPageListDI);
    ngRegisterControlDesignInfo('stdPageTreeList',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "ModifyControls": {
            "List": ng_diControl('stdTreeList')
          }
        })
      };
      ng_MergeVar(di,stdPageListDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('stdSplitPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wxpSplitPanel'),
          "Mover": ng_diStringValues('handle', ['handle','both','controls1','controls2'], { Level: 'basic' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdDropPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wxpDropPanel'),
          "ControlsPanel": ng_diControl('ngGroup',ng_diProperties({
            "style": {
              "backgroundColor": ng_diTypeVal('css_colors', '#FFFFFF', { Level: 'advanced' })
            },
            "Data": {
              "Frame": ng_diType('img_frame', {}, {
                ObjectProperties: {
                  "Left": ng_diTypeVal('image', 'WinXPControls.Images.DropPanel.Left'),
                  "Right": ng_diTypeVal('image', 'WinXPControls.Images.DropPanel.Right')
                }
              })
            }
          }))
        })
      };
    });
    
    function stdWindowDI(d,c,ref) {
      return {
        ControlCategory: 'Window',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wxpWindow'),
          "CloseBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "HelpBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "MaxBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "MinBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "Data": {
            "BackgroundColor": null,
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WinXPControls.Images.Window.LeftTop'),
                "Top": ng_diTypeVal('image', 'WinXPControls.Images.Window.Top'),
                "RightTop": ng_diTypeVal('image', 'WinXPControls.Images.Window.RightTop'),
                "Left": ng_diTypeVal('image', 'WinXPControls.Images.Window.Left'),
                "Right": ng_diTypeVal('image', 'WinXPControls.Images.Window.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WinXPControls.Images.Window.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WinXPControls.Images.Window.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WinXPControls.Images.Window.RightBottom')
              }
            }),
            "CaptionImg": ng_diObject({
              "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.WindowCaption.LeftImg'),
              "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.WindowCaption.MiddleImg'),
              "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.WindowCaption.RightImg')
            })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdWindow',stdWindowDI);
    ngRegisterControlDesignInfo('stdDialog',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('wxpDialog'),
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
        ControlCategory: 'Hint',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wxpHint'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WinXPControls.Images.Hint.LeftTop'),
                "Top": ng_diTypeVal('image', 'WinXPControls.Images.Hint.Top'),
                "RightTop": ng_diTypeVal('image', 'WinXPControls.Images.Hint.RightTop'),
                "Left": ng_diTypeVal('image', 'WinXPControls.Images.Hint.Left'),
                "Right": ng_diTypeVal('image', 'WinXPControls.Images.Hint.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WinXPControls.Images.Hint.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WinXPControls.Images.Hint.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WinXPControls.Images.Hint.RightBottom')
              }
            }),
            "Anchors": ng_diObject({
              "topleft": ng_diObject({
                "L": ng_diInteger(15),
                "T": ng_diInteger(-11),
                "HX": ng_diInteger(22),
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.HintAnchorsImg.topleft')
              },undefined,undefined,'ngHintAnchor'),
              "topright": ng_diObject({
                "R": ng_diInteger(22),
                "T": ng_diInteger(-11),
                "HX": ng_diInteger(6),
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.HintAnchorsImg.topright')
              },undefined,undefined,'ngHintAnchor'),
              "bottomright": ng_diObject({
                "R": ng_diInteger(22),
                "B": ng_diInteger(-2),
                "HX": ng_diInteger(10),
                "HY": ng_diInteger(15),
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.HintAnchorsImg.bottomright')
              },undefined,undefined,'ngHintAnchor'),
              "bottomleft": ng_diObject({
                "L": ng_diInteger(15),
                "B": ng_diInteger(-2),
                "HX": ng_diInteger(22),
                "HY": ng_diInteger(15),
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.HintAnchorsImg.bottomleft')
              },undefined,undefined,'ngHintAnchor'),
              "lefttop": ng_diObject({
                "L": ng_diInteger(-9),
                "T": ng_diInteger(13),
                "HY": ng_diInteger(22),
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.HintAnchorsImg.lefttop')
              },undefined,undefined,'ngHintAnchor'),
              "leftbottom": ng_diObject({
                "L": ng_diInteger(-9),
                "B": ng_diInteger(23),
                "HY": ng_diInteger(6),
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.HintAnchorsImg.leftbottom')
              },undefined,undefined,'ngHintAnchor'),
              "righttop": ng_diObject({
                "R": ng_diInteger(-3),
                "T": ng_diInteger(13),
                "HX": ng_diInteger(15),
                "HY": ng_diInteger(22),
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.HintAnchorsImg.righttop')
              },undefined,undefined,'ngHintAnchor'),
              "rightbottom": ng_diObject({
                "R": ng_diInteger(-3),
                "B": ng_diInteger(22),
                "HX": ng_diInteger(15),
                "HY": ng_diInteger(10),
                "Img": ng_diTypeVal('image', 'WinXPControls.Images.HintAnchorsImg.rightbottom')
              },undefined,undefined,'ngHintAnchor')
            })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdTextHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        Properties: ng_diProperties({
          "className": ng_diString('wxpTextHint'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WinXPControls.Images.TextHint.LeftTop'),
                "Top": ng_diTypeVal('image', 'WinXPControls.Images.TextHint.Top'),
                "RightTop": ng_diTypeVal('image', 'WinXPControls.Images.TextHint.RightTop'),
                "Left": ng_diTypeVal('image', 'WinXPControls.Images.TextHint.Left'),
                "Right": ng_diTypeVal('image', 'WinXPControls.Images.TextHint.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WinXPControls.Images.TextHint.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WinXPControls.Images.TextHint.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WinXPControls.Images.TextHint.RightBottom')
              }
            }),
            "Anchors": ng_diObject({
              "topleft": ng_diObject({
                "L": ng_diInteger(6),
                "T": ng_diInteger(-15)
              },undefined,undefined,'ngHintAnchor'),
              "bottomleft": ng_diObject({
                "L": ng_diInteger(6),
                "T": ng_diInteger(-5)
              },undefined,undefined,'ngHintAnchor'),
              "topright": ng_diObject({
                "R": ng_diInteger(15),
                "T": ng_diInteger(-15)
              },undefined,undefined,'ngHintAnchor'),
              "bottomright": ng_diObject({
                "R": ng_diInteger(15),
                "T": ng_diInteger(-5)
              },undefined,undefined,'ngHintAnchor')
            })
          },
          "ModifyControls": {
            "Hint": ng_diControl('stdText', {
              "L": ng_diTypeVal('bounds', 5),
              "T": ng_diTypeVal('bounds', 2)
            }, { Level: 'advanced' })
          }
        })
      };
    });
    
    function stdMessageDlgDI(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
        IsContainer: false,
        Properties: ng_diProperties({
          "DlgCheckBox": ng_diObject({
            "Checked": ng_diTypeValues('integer', 0, ['Unchecked','Checked','Grayed'], { Level: 'basic' }, { InitValue: 1 }),
            "AllowGrayed": ng_diBoolean(false, { Level: 'basic' }),
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_diString('',{ Level: 'basic' }),
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": ng_diString('', { Level: 'basic' }),
            "HTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' })
          }, { Level: 'basic' }),
          "DialogType": ng_diString('stdDialog'),
          "ModifyControls": {
            "Message": ng_diControl('stdText'),
            "Content": ng_diControl(undefined, {
              "L": ng_diTypeVal('bounds', 15),
              "R": ng_diTypeVal('bounds', 15),
              "H": ng_diTypeVal('bounds', 15)
            }),
            "Buttons": ng_diControl(undefined, ng_diProperties({
              "H": ng_diTypeVal('bounds', 23),
              "Data": {
                "HPadding": ng_diInteger(10)
              }
            })),
            "OK": ng_diControl('stdButton', { "W": ng_diTypeVal('bounds', 80) }),
            "Yes": ng_diControl('stdButton', { "W": ng_diTypeVal('bounds', 80) }),
            "No": ng_diControl('stdButton', { "W": ng_diTypeVal('bounds', 80) }),
            "Cancel": ng_diControl('stdButton', { "W": ng_diTypeVal('bounds', 80) }),
            "CheckBox": ng_diControl('stdCheckBox', {
              "B": ng_diTypeVal('bounds', 10)
            }, { Level: 'basic' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('stdMessageDlg',stdMessageDlgDI);
    ngRegisterControlDesignInfo('dlgMessageBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgIcon": ng_diMixed([ // TODO: Check collision between identifier and image_reference
            ng_diStringValues('mbIconInformation', ['mbIconInformation','mbIconWarning','mbIconQuestion', 'mbIconError'], {}, {}, 'identifier'),
            ng_diType('image')
          ], { Level: 'basic' }),
          "ModifyControls": {
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 10)
            }),
            "Icon": ng_diControl('stdImage', {
              "L": ng_diTypeVal('bounds', 15),
              "T": ng_diTypeVal('bounds', 15)
            }, { Level: 'basic' }, { InheritedFrom: 'ngImage' })
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      return di;
    });
    
    function dlgInputBoxDI(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DialogType": ng_diString('stdMessageDlg'),
          "DlgButtons": ng_diTypeVal('bitmask', { value: mbOK|mbCancel }), // TODO: Check default value
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "MinWidth": ng_diInteger(250)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 30)
            }),
            "Edit": ng_diControl('stdEdit', {
              "T": ng_diTypeVal('bounds', 2)
            }, { Level: 'basic' }, { InheritedFrom: 'ngEdit' })
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('dlgInputBox',dlgInputBoxDI);

    ngRegisterControlDesignInfo('dlgDropDownBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('stdDropDown', {
              "DropDown": ng_diControl('stdList')
            }, { Level: 'basic' }, { InheritedFrom: 'ngDropDown' })
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
            "Edit": ng_diControl('stdDropDownList', {
              "DropDown": ng_diControl('stdList')
            }, { Level: 'basic' }, { InheritedFrom: 'ngDropDownList' })
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
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 110)
            }),
            "Edit": ng_diControl('stdMemo', {
              "H": ng_diTypeVal('bounds', 100)
            }, { Level: 'basic' }, { InheritedFrom: 'ngMemo' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgAllowEmpty": ng_diBoolean(false, { Level: 'basic' }),
          "DlgItems": ng_diMixed(['ngListItems','ngListStringItems'], { Level: 'basic', Collapsed: false }),
          "DialogType": ng_diString('stdMessageDlg'),
          "DlgButtons": ng_diTypeVal('bitmask', { value: mbOK|mbCancel }), // TODO: Check default value
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "MinWidth": ng_diInteger(300)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 265)
            }),
            "List": ng_diControl('stdList', ng_diProperties({
              "T": ng_diTypeVal('bounds', 2),
              "H": ng_diTypeVal('bounds', 250),
              "Data": {
                "SelectType": ng_diIntegerIdentifiers('nglSelectSingle')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngList' })
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgProgressBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgButtons": ng_diTypeVal('bitmask', { value: mbNone }), // TODO: Check default value
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "MinWidth": ng_diInteger(230)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 30)
            }),
            "Progress": ng_diControl('stdProgressBar', {
              "T": ng_diTypeVal('bounds', 5)
            }, { Level: 'basic' }, { InheritedFrom: 'ngProgressBar' })
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgWaitBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgButtons": ng_diTypeVal('bitmask', { value: mbNone }), // TODO: Check default value
          "ModifyControls": {
            "Message": ng_diControl(undefined, {
              "L": ng_diTypeVal('bounds', 40)
            }),
            "Progress": ng_diControl('stdProgressDot', {
              "L": ng_diTypeVal('bounds', 15),
              "T": ng_diTypeVal('bounds', 15)
            }, { Level: 'basic' }, { InheritedFrom: 'ngProgressDot' })
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgAbout',function(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
        Properties: ng_diProperties({
          "DialogType": ng_diString('dlgMessageBox'),
          "DlgIcon": ng_diNull(),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "className": ng_diString('wxpAboutMessage'),
              "Data": {
                "MinWidth": ng_diInteger(260)
              }
            })),
            "AppInfo": ng_diControl('stdTreeList', ng_diProperties({
              "style": {
                "border": ng_diString('0px', { Level: 'basic' })
              },
              "TreeImg": ng_diString('triangle'),
              "Data": {
                "DefaultIndent": ng_diInteger(0)
              }
            }))
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdCalendar',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: {
          "className": ng_diString('wxpCalendar')
        }
      };
    });
    
    function stdEditDateDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('wxpEdit'),
          "DropDown": ng_diControl('stdCalendar', ng_diProperties({
            "className": ng_diString('wxpCalendar wxpDropDown'),
            "style": {
              "padding": ng_diString('10px', { Level: 'basic' })
            }
          }), { Level: 'basic' })
        })
      };
      ng_MergeVar(di,stdEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('stdEditDate',stdEditDateDI);
    
    function stdEditTimeDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('wxpEdit'),
          "DropDown": ng_diControl('stdList', ng_diProperties({
            "className": ng_diString('wxpDropDown')
          }), { Level: 'basic' })
        })
      };
      ng_MergeVar(di,stdEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('stdEditTime',stdEditTimeDI);

    function colorpicker_barButtonDef() {
      return ng_diControl('stdButton')
    }
    function colorpicker_sliderDef() {
      return ng_diControl('stdLabel', ng_diProperties({
        'L': ng_diTypeVal('bounds',5),
        'T': ng_diTypeVal('bounds',18),
        'R': ng_diTypeVal('bounds',5),
        'H': ng_diTypeVal('bounds',19),
        'className': ng_diString('wxpColorPickerSlider'),
        'Data': {
          'WithEditBounds': ng_diObject({ 'R': ng_diInteger(60) }),
          'WithoutEditBounds': ng_diObject({ 'R': ng_diInteger(5) })
        }
      }));
    }

    function colorpicker_editDef() {
      return ng_diControl('stdEdit', {
        'R': ng_diTypeVal('bounds',5),
        'W': ng_diTypeVal('bounds',50),
        'T': ng_diTypeVal('bounds',18)
      });
    }

    function colorpicker_labelDef() {
      return ng_diControl('stdLabel', ng_diProperties({
        'L': ng_diTypeVal('bounds',5),
        'R': ng_diTypeVal('bounds',5),
        'T': ng_diTypeVal('bounds',2),
        'Data': {
          'TextAlign': ng_diString('left')
        }
      }));
    }

    ngRegisterControlDesignInfo('stdColorPickerBox',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 200 }
            }
          }
        },
        Properties: ng_diProperties({
          'className': ng_diString('wxpColorPicker'),
          'Data': {
            'AutoHeight': ng_diBoolean(true),
            'AsToolbar': ng_diBoolean(true),
            'Vertical': ng_diBoolean(true)
          },
          'ModifyControls': {
            'ModeBar': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',28),
              'ModifyControls': {
                'Bar': ng_diControl(undefined, ng_diProperties({
                  'L': ng_diTypeVal('bounds',5),
                  'R': ng_diTypeVal('bounds',5),
                  'T': ng_diTypeVal('bounds',5),
                  'H': ng_diTypeVal('bounds',23),
                  'ModifyControls': {
                    'Env_H_SV': ng_diControl(undefined, ng_diProperties({
                      'W': ng_diTypeVal('bounds','33%'),
                      'ModifyControls': {
                        'H_SV': colorpicker_barButtonDef()
                      }
                    })),
                    'Env_HSV': ng_diControl(undefined, ng_diProperties({
                      'L': ng_diTypeVal('bounds','33%'),
                      'R': ng_diTypeVal('bounds','33%'),
                      'ModifyControls': {
                        'HSV': colorpicker_barButtonDef()
                      }
                    })),
                    'Env_RGB': ng_diControl(undefined, ng_diProperties({
                      'W': ng_diTypeVal('bounds','33%'),
                      'ModifyControls': {
                        'RGB': colorpicker_barButtonDef()
                      }
                    }))
                  }
                }))
              }
            })),
            'Hue_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',39),
              'ModifyControls': {
                'Hue': colorpicker_sliderDef(),
                'HueEdit': colorpicker_editDef(),
                'HueLabel': colorpicker_labelDef()
              }
            })),
            'Saturation_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',39),
              'ModifyControls': {
                'Saturation': colorpicker_sliderDef(),
                'SaturationEdit': colorpicker_editDef(),
                'SaturationLabel': colorpicker_labelDef()
              }
            })),
            'Value_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',39),
              'ModifyControls': {
                'Value': colorpicker_sliderDef(),
                'ValueEdit': colorpicker_editDef(),
                'ValueLabel': colorpicker_labelDef()
              }
            })),
            'Red_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',39),
              'ModifyControls': {
                'Red': colorpicker_sliderDef(),
                'RedEdit': colorpicker_editDef(),
                'RedLabel': colorpicker_labelDef()
              }
            })),
            'Green_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',39),
              'ModifyControls': {
                'Green': colorpicker_sliderDef(),
                'GreenEdit': colorpicker_editDef(),
                'GreenLabel': colorpicker_labelDef()
              }
            })),
            'Blue_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',39),
              'ModifyControls': {
                'Blue': colorpicker_sliderDef(),
                'BlueEdit': colorpicker_editDef(),
                'BlueLabel': colorpicker_labelDef()
              }
            })),
            'Alpha_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',39),
              'ModifyControls': {
                'Alpha': colorpicker_sliderDef(),
                'AlphaEdit': colorpicker_editDef(),
                'AlphaLabel': colorpicker_labelDef()
              }
            })),
            'SatVal_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',192),
              'ModifyControls': {
                'SatVal': ng_diControl(undefined, ng_diProperties({
                  'L': ng_diTypeVal('bounds',5),
                  'R': ng_diTypeVal('bounds',5),
                  'T': ng_diTypeVal('bounds',18),
                  'className': ng_diString('wxpColorPickerSatVal'),
                  'ModifyControls': {
                    'Cursor': ng_diControl('ngImage', ng_diProperties({
                      'Data': {
                        'Img': ng_diTypeVal('image', 'WinXPControls.Images.ColorPicker.SatValCursor')
                      }
                    }))
                  }
                })),
                'SatValLabel': colorpicker_labelDef()
              }
            })),
            'Hex_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',39),
              'ModifyControls': {
                'AHexEdit': ng_diControl('ngEdit', ng_diProperties({
                  'L': ng_diTypeVal('bounds',5),
                  'W': ng_diTypeVal('bounds',80),
                  'T': ng_diTypeVal('bounds',18),
                  'Data': {
                    'TextAlign': ng_diString('left')
                  }
                })),
                'HexEdit': ng_diControl('stdEdit', ng_diProperties({
                  'R': ng_diTypeVal('bounds',5),
                  'W': ng_diTypeVal('bounds',80),
                  'T': ng_diTypeVal('bounds',18),
                  'Data': {
                    'TextAlign': ng_diString('left')
                  }
                })),
                'HexLabel': ng_diControl('stdLabel', ng_diProperties({
                  'R': ng_diTypeVal('bounds',5),
                  'L': ng_diTypeVal('bounds','50%'),
                  'T': ng_diTypeVal('bounds',2),
                  'Data': {
                    'TextAlign': ng_diString('right')
                  }
                })),
                'AHexLabel': ng_diControl('stdLabel', ng_diProperties({
                  'L': ng_diTypeVal('bounds',5),
                  'R': ng_diTypeVal('bounds','50%'),
                  'T': ng_diTypeVal('bounds',2),
                  'Data': {
                    'TextAlign': ng_diString('left')
                  }
                }))
              }
            })),
            'Preview_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',39),
              'ModifyControls': {
                'From': ng_diControl('stdColorButton', {
                  'L': ng_diTypeVal('bounds',5),
                  'W': ng_diTypeVal('bounds',80),
                  'T': ng_diTypeVal('bounds',18)
                }),
                'FromLabel': ng_diControl('stdLabel', ng_diProperties({
                  'L': ng_diTypeVal('bounds',5),
                  'W': ng_diTypeVal('bounds',80),
                  'T': ng_diTypeVal('bounds',2),
                  'Data': {
                    'TextAlign': ng_diString('left')
                  }
                })),
                'To': ng_diControl('stdColorButton', {
                  'R': ng_diTypeVal('bounds',5),
                  'W': ng_diTypeVal('bounds',80),
                  'T': ng_diTypeVal('bounds',18)
                }),
                'ToLabel': ng_diControl('stdLabel', ng_diProperties({
                  'R': ng_diTypeVal('bounds',5),
                  'W': ng_diTypeVal('bounds',80),
                  'T': ng_diTypeVal('bounds',2),
                  'Data': {
                    'TextAlign': ng_diString('right')
                  }
                })),
                'PreviewIcon': ng_diControl('ngButton', ng_diProperties({
                  'L': ng_diTypeVal('bounds','50%'),
                  'T': ng_diTypeVal('bounds',18),
                  'style': {
                    'marginLeft': ng_diTypeVal('css_dim_px', '-5px', { Level: 'advanced' })
                  },
                  'Data': {
                    'Img': ng_diTypeVal('image', 'WinXPControls.Images.ColorPicker.PreviewIcon')
                  }
                }))
              }
            }))
          }
        })
      };
    });

    ngRegisterControlDesignInfo('stdColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 80 }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "BackgroundImg": ng_diTypeVal('image', 'WinXPControls.Images.ColorButton.Background'),
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.ColorButton.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.ColorButton.MiddleImg'),
            "RightImg":ng_diTypeVal('image', 'WinXPControls.Images.ColorButton.RightImg')
          }
        })
      };
    });

    ngRegisterControlDesignInfo('stdColorPickerDropDown',function(d,c,ref) {
      return {
        ControlCategory: 'Dropdown',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 200 }
            }
          }
        },
        Properties: ng_diProperties({
          'CreateFrom': ng_diString('stdDropDown'),
          'Data': {
            'TextAlign': ng_diString('center'),
            'DropDownAlign': ng_diString('right')
          },
          'DropDown': ng_diControl('stdColorPickerBox', ng_diProperties({
            'W': ng_diTypeVal('bounds',196),
            'H': ng_diTypeVal('bounds',309),
            'Data': {
              'MaxHeight': ng_diInteger(480,{ Level: 'basic' })
            },
            'ModifyControls': {
              'Buttons': ng_diControl(undefined, ng_diProperties({
                'R': ng_diTypeVal('bounds',10),
                'H': ng_diTypeVal('bounds',28),
                'ModifyControls': {
                  'Submit': ng_diControl('stdButton', {
                    'L': ng_diTypeVal('bounds',5),
                    'T': ng_diTypeVal('bounds',5),
                    'W': ng_diTypeVal('bounds','50%')
                  }),
                  'Cancel': ng_diControl('stdButton', {
                    'R': ng_diTypeVal('bounds',-5),
                    'T': ng_diTypeVal('bounds',5),
                    'W': ng_diTypeVal('bounds','50%')
                  })
                }
              }))
            }
          }))
        })
      };
    });

    ngRegisterControlDesignInfo('stdColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        NewControl: {
          Default: {
          }
        },
        Properties: ng_diProperties({
          'CreateFrom': ng_diString('stdHint'),
          'ModifyControls': {
            'Picker': ng_diControl('stdColorPickerBox', ng_diProperties({
              'W': ng_diTypeVal('bounds',196),
              'ModifyControls': {
                'Buttons': ng_diControl(undefined, ng_diProperties({
                  'R': ng_diTypeVal('bounds',10),
                  'H': ng_diTypeVal('bounds',28),
                  'ModifyControls': {
                    'Submit': ng_diControl('stdButton', {
                      'L': ng_diTypeVal('bounds',5),
                      'T': ng_diTypeVal('bounds',5),
                      'W': ng_diTypeVal('bounds','50%')
                    }),
                    'Cancel': ng_diControl('stdButton', {
                      'R': ng_diTypeVal('bounds',-5),
                      'T': ng_diTypeVal('bounds',5),
                      'W': ng_diTypeVal('bounds','50%')
                    })
                  }
                }))
              }
            }))
          }
        })
      };
    });

    ngRegisterControlDesignInfo('stdColorPickerButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 80 }
            }
          }
        },
        Properties: ng_diProperties({
          "CreateFrom": ng_diString('stdColorButton'),
          "HintDef": ng_diControl('stdColorPickerHint')
        })
      };
    });

    
    ngRegisterControlDesignInfo('stdMenu',function(d,c,ref) {
      return {
        ControlCategory: 'Menu',
        Properties: ng_diProperties({
          "className": ng_diString('wxpMenu'),
          "Data": {
            "SubMenuImg": ng_diTypeVal('image', 'WinXPControls.Images.SubMenu'),
            "SubMenuDef": ng_diControl('stdMenu')
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdMenuBar',function(d,c,ref) {
      return {
        ControlCategory: 'Menu',
        Properties: ng_diProperties({
          "className": ng_diString('wxpMenuBar'),
          "Data": {
            "SubMenuDef": ng_diControl('stdMenu')
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdMenuBarButton','ngMenuBarButton');
    
    ngRegisterControlDesignInfo('stdSplitButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": ng_diString('wxpSplitButton'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinXPControls.Images.Button.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WinXPControls.Images.Button.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WinXPControls.Images.Button.MenuRightBtnImg')
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdFileUploader',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_diProperties({
          "className": ng_diString('wxpFileUploader'),
          "ModifyControls": {
            "ListFiles": ng_diControl('stdList'),
            "DragAndDropInfo": ng_diControl('stdText', ng_diProperties({
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '-6px', { Level: 'advanced' })
              }
            })),
            "Buttons": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "HPadding": ng_diInteger(10),
                "VPadding": ng_diInteger(10)
              }
            })),
            "BtnAddFile": ng_diControl('stdButton'),
            "BtnRemoveFiles": ng_diControl('stdButton')
          }
        })
      };
    });

    ngRegisterControlDesignInfo('stdLoginForm',function(d,c,ref) {
      return {
        ControlCategory: 'Form',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 200 }
            }
          }
        },
        Properties: ng_diProperties({
          "W": ng_diTypeVal('bounds',200),
          "Data": {
            "VPadding": ng_diInteger(2)
          },
          "ModifyControls": {
            "OrganizationLabel": ng_diControl('stdLabel'),
            "Organization": ng_diControl('stdEdit'),
            "LoginLabel": ng_diControl('stdLabel'),
            "Login": ng_diControl('stdEdit'),
            "PasswordLabel": ng_diControl('stdLabel'),
            "Password": ng_diControl('stdEdit'),
            "CapsLockWarn": ng_diControl('stdText', ng_diProperties({
              "className": ng_diString('wxpLoginFormCapsLogWarn'),
              "style": {
                "marginBottom": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            })),
            "RememberMe": ng_diControl('stdCheckBox'),
            "LoginBtn": ng_diControl('stdButton', ng_diProperties({
             'W': ng_diTypeVal('bounds',100),
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '10px', { Level: 'advanced' })
              }
            })),
            "Progress": ng_diControl('stdProgressDot', ng_diProperties({
              "style": {
                "marginLeft": ng_diTypeVal('css_dim_px', '10px', { Level: 'advanced' }),
                "marginTop": ng_diTypeVal('css_dim_px', '12px', { Level: 'advanced' })
              },
              "Data": {
                "Visible": ng_diBoolean(false)
              }
            }), { Level: 'basic' }),
            "Error": ng_diControl('stdText', ng_diProperties({
              "className": ng_diString('wxpLoginFormErrorMessage'),
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            }))
          }
        })
      }
    });

    ngRegisterControlDesignInfo('stdPasswordForm',function(d,c,ref) {
      return {
        ControlCategory: 'Form',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 200 }
            }
          }
        },
        Properties: ng_diProperties({
          "W": ng_diTypeVal('bounds',200),
          "Data": {
            "VPadding": ng_diInteger(2)
          },
          "ModifyControls": {
            "OldPasswordLabel": ng_diControl('stdLabel'),
            "OldPassword": ng_diControl('stdEdit'),
            "NewPasswordLabel": ng_diControl('stdLabel'),
            "NewPassword": ng_diControl('stdEdit'),
            "ConfirmNewPasswordLabel":  ng_diControl('stdLabel'),
            "ConfirmNewPassword": ng_diControl('stdEdit'),
            "CapsLockWarn": ng_diControl('stdText', ng_diProperties({
              "className": ng_diString('wxpLoginFormCapsLogWarn'),
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            })),
            "Error": ng_diControl('stdText', ng_diProperties({
              "className": ng_diString('wxpLoginFormErrorMessage'),
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            }))
          }
        })
      }
    });

    ngRegisterControlDesignInfo('stdLoginButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": ng_diString('wxpLink'),
          "Menu": ng_diControl('stdMenu')
        })
      };
    });

    ngRegisterControlDesignInfo('stdViewModelForm',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "ModifyControls": {
            "ErrorHint": ng_diControl('stdTextHint', {
              "className": ng_diString('wxpEditFieldError')
            })
          }
        })
      };
    });
    
    function stdEditFieldDI (d,c,ref) {
      var di = {
        ControlCategory: 'Edit Field',
        Properties: ng_diProperties({
          "Data": {
            "HintX": ng_diInteger(0)
          },
          "ErrorHint": ng_diControl('stdTextHint', {
            "className": ng_diString('wxpEditFieldError')
          })
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
      di.ControlCategory='Edit Field';
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
      di.ControlCategory='Dropdown Field';
      return di;
    });
    ngRegisterControlDesignInfo('stdDropDownListField',function(d,c,ref) {
      var di=stdEditDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      di.ControlCategory='Dropdown Field';
      return di;
    });
    ngRegisterControlDesignInfo('stdEditDateField',function(d,c,ref) {
      var di=stdEditDateDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('stdEditTimeField',function(d,c,ref) {
      var di=stdEditTimeDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('stdMemoField',function(d,c,ref) {
      var di=stdMemoDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });

    ngRegisterControlDesignInfo('stdDataSet',function(d,c,ref) {
      var di = {
        ControlCategory: 'Dataset'
      };
      ng_MergeVar(di,stdPageListDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('stdDBViewModelForm','ngDBViewModelForm');
    
    ngRegisterControlDesignInfo('stdDBToolBar',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        //IsContainer: true, // TODO: Check why ModifyControls not work with this
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 260 },
              "H": { Value: 22 }
            }
          }
        },
        Properties: ng_diProperties({
          "className": ng_diString('wxpToolBar'),
          "W": ng_diTypeVal('bounds', 260),
          "Data": {
            "HPadding": ng_diInteger(5)
          },
          "ModifyControls": {
            "New": ng_diControl('stdButton', {
              "W": ng_diTypeVal('bounds', 60)
            }),
            "Delete": ng_diControl('stdButton', ng_diProperties({
              "W": ng_diTypeVal('bounds', 60),
              "Data": {
                "ToolBarHPadding": ng_diInteger(10)
              }
            })),
            "Insert": ng_diControl('stdButton', {
              "W": ng_diTypeVal('bounds', 60)
            }),
            "Update": ng_diControl('stdButton', {
              "W": ng_diTypeVal('bounds', 60)
            }),
            "Cancel": ng_diControl('stdButton', {
              "W": ng_diTypeVal('bounds', 60)
            })
          }
        })
      };
    });
    

    ngRegisterControlDesignInfo('stdDBDataSet',function(d,c,ref) {
      var di = {
        ControlCategory: 'Dataset',
        Properties: ng_diProperties({
          "ModifyControls": {
            "NewRecord": ng_diControl('stdFlatButton', ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(5)
              }
            })),
            "LoadRecord": ng_diControl('stdFlatButton', ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(5)
              }
            })),
            "DeleteRecord": ng_diControl('stdFlatButton', ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(10)
              }
            })),
            "Refresh": ng_diControl('stdFlatButton', ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(10)
              }
            }))
          }
        })
      };
      ng_MergeVar(di,stdPageListDI(d,c,ref));
      return di;
    });
  }
};
ngUserControls['winxp_designinfo'] = WinXP_DesignInfo;