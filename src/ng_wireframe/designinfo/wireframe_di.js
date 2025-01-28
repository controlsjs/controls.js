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
var WireframeControls_DesignInfo = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    var undefined;

    ngRegisterControlDesignInfo('wfrPanel', 'ngPanel');

    ngRegisterControlDesignInfo('wfrFrame', 'ngFrame');

    ngRegisterControlDesignInfo('wfrToolBar',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: {
          "className": ng_diString('wfrToolBar')
        }
      };
    });
    ngRegisterControlDesignInfo('wfrText',function(d,c,ref) {
      return {
        ControlCategory: 'Label',
        Properties: {
          "className": ng_diString('wfrText')
        }
      };
    });
    ngRegisterControlDesignInfo('wfrButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": ng_diString('wfrButton'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.Button.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Button.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.Button.RightImg'),
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.ButtonMultiLine.LeftTop'),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.ButtonMultiLine.Top'),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.ButtonMultiLine.RightTop'),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.ButtonMultiLine.Left'),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.ButtonMultiLine.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.ButtonMultiLine.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.ButtonMultiLine.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.ButtonMultiLine.RightBottom')
              }
            })
           }
        })
       };
    });
    ngRegisterControlDesignInfo('wfrCheckBox',function(d,c,ref) {
      return {
        ControlCategory: 'Checkbox & Radio',
        Properties: ng_diProperties({
          "className": ng_diString('wfrCheckBox'),
          "Data": {
            "TextAlign": ng_diString('right'),
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.CheckBoxLeft')
           }
        })
       };
    });
    ngRegisterControlDesignInfo('wfrRadioButton',function(d,c,ref) {
      return {
        ControlCategory: 'Checkbox & Radio',
        Properties: ng_diProperties({
          "className": ng_diString('wfrRadio'),
          "Data": {
            "TextAlign": ng_diString('right'),
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.RadioLeft')
          }
        })
       };
    });
    ngRegisterControlDesignInfo('wfrLabel',function(d,c,ref) {
      return {
        ControlCategory: 'Label',
        Properties: {
          "className": ng_diString('wfrLabel'),
          "Data": {
            "CanSelectText": ng_diBoolean(true)
          }          
        }
      };
    });
    ngRegisterControlDesignInfo('wfrLink',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: {
          "className": ng_diString('wfrLink')
        }
      };
    });

    function wfrEditDI(d,c,ref) {
      return {
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": ng_diString('wfrEdit'),
          "DropDown": ng_diControl(undefined, {
            "className": ng_diString('wfrDropDown')
          }),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.RightImg')
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wfrEdit',wfrEditDI);
    ngRegisterControlDesignInfo('wfrEditBox',function(d,c,ref) {
      var di=wfrEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function wfrEditBoxBtnDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "Buttons": { Level: 'advanced' },
          "Data": {
            "RightImg": ng_diNull()
          },
          "Methods": {
            "Elipsis": ng_diFunction('function() { ng_CallParent(this, "Elipsis", arguments); }', { Level: 'advanced' })
          },
          "Events": {
            "OnElipsis": ng_diEvent('function(c, text) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('wfrEditBoxBtn', wfrEditBoxBtnDI);

    ngRegisterControlDesignInfo('wfrEditNum', wfrEditDI);
    ngRegisterControlDesignInfo('wfrEditBoxNum', function(d,c,ref) {
      var di=wfrEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function wfrColorEditDI(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "Data": {
            "RightImg": ng_diNull(),
            "TextAlign": ng_diString('center')
          },
          "Methods": {
            "GetColor": ng_diFunction('function() { return ng_CallParent(this, "GetColor", arguments, ""); }')
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wfrColorEdit',function(d,c,ref) {
      var di=wfrColorEditDI(d,c,ref);
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrColorEditBox',function(d,c,ref) {
      var di=wfrColorEditDI(d,c,ref);
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    function wfrMaskEditDI(d,c,ref) {
      return {
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": ng_diString('wfrMaskEdit'),
          "H": ng_diInteger(WireframeControls.Images.Edit.MiddleImg.H),
          "Data": {
            "LeftDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WireframeControls.Images.Edit.LeftImg.W),
              "Data": {
                "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.LeftImg'),
                "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.MiddleImg')
              }
            })),
            "EditDef": ng_diControl('wfrEdit', ng_diProperties({
              "Data": {
                "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.MiddleImg')
              }
            })),
            "StaticDef": ng_diControl('wfrLabel', ng_diProperties({
              "Data": {
                "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.MiddleImg')
               }
            })),
            "RightDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WireframeControls.Images.Edit.RightImg.W),
              "Data": {
                "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.MiddleImg'),
                "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.RightImg')
              }
            }))
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wfrMaskEdit',wfrMaskEditDI);
    ngRegisterControlDesignInfo('wfrMaskEditBox',function(d,c,ref) {
      var di=wfrMaskEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function wfrDropDownDI(d,c,ref) {
      return {
        ControlCategory: 'Dropdown',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "DropDown": { Value: "{ Type: 'wfrList' }"}
            }
          }
        },
        Properties: ng_diProperties({
          "Buttons": { Level: 'advanced' },
          "Data": {
            "RightImg": ng_diNull()
          },
          "DropDown": ng_diControl('wfrListBox', ng_diProperties({
            "Data": {
              "Frame": ng_diType('img_frame', {}, {
                ObjectProperties: {
                  "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.DropDownBox.LeftTop'),
                  "Top": ng_diTypeVal('image', 'WireframeControls.Images.DropDownBox.Top'),
                  "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.DropDownBox.RightTop'),
                  "Left": ng_diTypeVal('image', 'WireframeControls.Images.DropDownBox.Left'),
                  "Right": ng_diTypeVal('image', 'WireframeControls.Images.DropDownBox.Right'),
                  "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.DropDownBox.LeftBottom'),
                  "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.DropDownBox.Bottom'),
                  "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.DropDownBox.RightBottom')
                }
              })
            }
          }))
        })
      };
    }

    ngRegisterControlDesignInfo('wfrDropDown',function(d,c,ref) {
      var di=wfrDropDownDI(d,c,ref);
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDropDownList',function(d,c,ref) {
      var di=wfrDropDownDI(d,c,ref);
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    });

    function wfrSearchBoxDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "Buttons": { Level: 'advanced' },
          "Data": {
            "RightImg": ng_diNull()
          },
          "Methods": {
            "Search": ng_diFunction('function(text) { ng_CallParent(this, "Search", arguments); }', { Level: 'advanced' })
          },
          "Events": {
            "OnSearch": ng_diEvent('function(c, text) {}', { Level: 'basic' })
          }
        })
      };
      return di;
    }

    ngRegisterControlDesignInfo('wfrSearchBox', function(d,c,ref) {
      var di=wfrSearchBoxDI(d,c,ref);
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('wfrProgressBar',function(d,c,ref) {
      return {
        ControlCategory: 'Progress',
        Properties: ng_diProperties({
          "className": ng_diString('wfrProgressBar'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.ProgressBar.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.ProgressBar.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.ProgressBar.RightImg'),
            "BarImg": ng_diTypeVal('image', 'WireframeControls.Images.ProgressBar.BarImg')
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrProgressDot',function(d,c,ref) {
      return {
        ControlCategory: 'Progress',
        NewControl: {
          Default: {
            Properties: {
            }
          }
        },
        Properties: ng_diProperties({
          "className": ng_diString('wfrLabel'),
          "Data": {
            "TextAlign": ng_diString('center'),
            "HTMLEncode": ng_diBoolean(false)
          }
        })
      };
    });

    function wfrListDI(d,c,ref) {
      return {
        ControlCategory: 'List',
        Properties: ng_diProperties({
          "className": ng_diString('wfrListBox'),
          "Data": {
            "TreeImg": ng_diTypeVal('image', 'WireframeControls.Images.TreeImgTriangle'),
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.List.Box.LeftTop'),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.List.Box.Top'),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.List.Box.RightTop'),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.List.Box.Left'),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.List.Box.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.List.Box.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.List.Box.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.List.Box.RightBottom')
              }
            })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wfrList', wfrListDI);
    ngRegisterControlDesignInfo('wfrListBox',function(d,c,ref) {
      var di=wfrListDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    ngRegisterControlDesignInfo('wfrTreeList',wfrListDI);

    function wfrCheckListDI(d,c,ref) {
      return {
        ControlCategory: 'List'
      };
    }    
    ngRegisterControlDesignInfo('wfrCheckList',wfrCheckListDI);

    function wfrPageListDI(d,c,ref) {
      return {
        ControlCategory: 'List',
        Properties: ng_diProperties({
          "className": ng_diString('wfrListBox'),
          "Data": {
            "AverageItemHeight" : ng_diInteger(24)
          },
          "ModifyControls": {
            "List": ng_diControl('wfrList'),
            "Loading": ng_diControl('wfrProgressDot', ng_diProperties({
              "L": ng_diTypeVal('bounds', 15),
              "T": ng_diTypeVal('bounds', 15),
              "Data": {
                "Visible": ng_diBoolean(false)
              }
            }), { Level: 'basic' }),
            "NoData": ng_diControl('wfrText', ng_diProperties({
              "L": ng_diTypeVal('bounds', 15),
              "T": ng_diTypeVal('bounds', 15),
              "Data": {
                "Visible": ng_diBoolean(false)
              }
            }), { Level: 'basic' }),
            "Paging": ng_diControl(undefined, {
              "className": ng_diString('wfrPageListPaging')
            }),
            'FirstPage': ng_diControl('ngButton', ng_diProperties({
              "className": ng_diString('wfrPgListPagingButton'),
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.PagingFirst'),
                "Text": ng_diString('')
              }
            })),
            'PrevPage': ng_diControl('ngButton', ng_diProperties({
              "className": ng_diString('wfrPgListPagingButton'),
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.PagingPrev'),
                "Text": ng_diString('')
              }
            })),
            'PageNo': ng_diControl('wfrEdit', ng_diProperties({
              "W": ng_diTypeVal('bounds', 30),
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "Text": ng_diString('1'),
                "TextAlign": ng_diString('center')
              }
            })),
            'Page0': ng_diControl('ngButton', ng_diProperties({
              "className": ng_diString('wfrPgListPagingButton'),
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "MinWidth": ng_diInteger(22),
                "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.PagingPage'),
                "Text": ng_diString('1'),
                "TextAlign": ng_diString('center')
              }
            })),
            'NextPage': ng_diControl('ngButton', ng_diProperties({
              "className": ng_diString('wfrPgListPagingButton'),
              "Data": {
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.PagingNext'),
                "Text": ng_diString(''),
                "ImgAlign": ng_diString('right'),
                "ToolBarHPadding": ng_diInteger(5)
              }
            })),
            'LastPage': ng_diControl('ngButton', ng_diProperties({
              "className": ng_diString('wfrPgListPagingButton'),
              "Data": {
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.PagingLast'),
                "ImgAlign": ng_diString('right'),
                "Text": ng_diString('')
              }
            }))
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wfrPageList',wfrPageListDI);
    ngRegisterControlDesignInfo('wfrPageTreeList',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "ModifyControls": {
            "List": ng_diControl('wfrTreeList')
          }
        })
      };
      ng_MergeVar(di,wfrPageListDI(d,c,ref));
      return di;
    });

    function wfrGroupDI(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wfrGroupBox'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.Group.Box.LeftTop'),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.Group.Box.Top'),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.Group.Box.RightTop'),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.Group.Box.Left'),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.Group.Box.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.Group.Box.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.Group.Box.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.Group.Box.RightBottom')
              }
            })
          }
        })
      };
    }

    ngRegisterControlDesignInfo('wfrGroup',wfrGroupDI);
    ngRegisterControlDesignInfo('wfrGroupBox',function(d,c,ref) {
      var di=wfrGroupDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function wfrWindowDI(d,c,ref) {
      return {
        ControlCategory: 'Window',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wfrWindow'),
          "CloseBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "MaxBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "MinBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "Data": {
            "BackgroundColor": null,
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.LeftTop'),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.Top'),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.RightTop'),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.Left'),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.RightBottom')
              }
            }),
            "CaptionImg": ng_diObject({
              "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.Window.Caption.LeftImg'),
              "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Window.Caption.MiddleImg'),
              "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.Window.Caption.RightImg')
            })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wfrWindow',wfrWindowDI);

    ngRegisterControlDesignInfo('wfrDialog',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('wfrDialog'),
          "CloseBtn": ng_diBoolean(true),
          "Data": {
            "Modal": ng_diBoolean(true),
            "Visible": ng_diBoolean(false),
            "Sizeable": ng_diBoolean(false),
            "Centered": ng_diBoolean(true)
          }
        })
      };
      ng_MergeVar(di,wfrWindowDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('wfrHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wfrHint'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.Hint.Frame.LeftTop'),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.Hint.Frame.Top'),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.Hint.Frame.RightTop'),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.Hint.Frame.Left'),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.Hint.Frame.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.Hint.Frame.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.Hint.Frame.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.Hint.Frame.RightBottom')
              }
            }),
            "Anchors": ng_diObject({
              "topleft": ng_diObject({
                "L": ng_diInteger(7),
                "T": ng_diInteger(-32),
                "HX": ng_diInteger(13),
                "HY": ng_diInteger(1),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.topleft')
              },undefined,undefined,'ngHintAnchor'),
              "topcenter": ng_diObject({
                "L": ng_diInteger(90),
                "T": ng_diInteger(-32),
                "HX": ng_diInteger(9),
                "HY": ng_diInteger(1),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.topcenter')
              },undefined,undefined,'ngHintAnchor'),
              "topright": ng_diObject({
                "R": ng_diInteger(7),
                "T": ng_diInteger(-32),
                "HX": ng_diInteger(8),
                "HY": ng_diInteger(1),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.topright')
              },undefined,undefined,'ngHintAnchor'),
              "bottomright": ng_diObject({
                "R": ng_diInteger(7),
                "B": ng_diInteger(-32),
                "HX": ng_diInteger(8),
                "HY": ng_diInteger(39),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.bottomright')
              },undefined,undefined,'ngHintAnchor'),
              "bottomcenter": ng_diObject({
                "L": ng_diInteger(90),
                "B": ng_diInteger(-32),
                "HX": ng_diInteger(9),
                "HY": ng_diInteger(39),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.bottomcenter')
              },undefined,undefined,'ngHintAnchor'),
              "bottomleft": ng_diObject({
                "L": ng_diInteger(7),
                "B": ng_diInteger(-32),
                "HX": ng_diInteger(13),
                "HY": ng_diInteger(39),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.bottomleft')
              },undefined,undefined,'ngHintAnchor'),
              "lefttop": ng_diObject({
                "L": ng_diInteger(-32),
                "T": ng_diInteger(7),
                "HX": ng_diInteger(1),
                "HY": ng_diInteger(13),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.lefttop')
              },undefined,undefined,'ngHintAnchor'),
              "leftcenter": ng_diObject({
                "L": ng_diInteger(-32),
                "T": ng_diInteger(55),
                "HX": ng_diInteger(1),
                "HY": ng_diInteger(9),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.leftcenter')
              },undefined,undefined,'ngHintAnchor'),
              "leftbottom": ng_diObject({
                "L": ng_diInteger(-32),
                "B": ng_diInteger(7),
                "HX": ng_diInteger(1),
                "HY": ng_diInteger(8),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.leftbottom')
              },undefined,undefined,'ngHintAnchor'),
              "righttop": ng_diObject({
                "R": ng_diInteger(-32),
                "T": ng_diInteger(7),
                "HX": ng_diInteger(39),
                "HY": ng_diInteger(13),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.righttop')
              },undefined,undefined,'ngHintAnchor'),
              "rightcenter": ng_diObject({
                "R": ng_diInteger(-32),
                "T": ng_diInteger(55),
                "HX": ng_diInteger(39),
                "HY": ng_diInteger(9),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.rightcenter')
              },undefined,undefined,'ngHintAnchor'),
              "rightbottom": ng_diObject({
                "R": ng_diInteger(-32),
                "B": ng_diInteger(7),
                "HX": ng_diInteger(39),
                "HY": ng_diInteger(8),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.Hint.AnchorsImg.rightbottom')
              },undefined,undefined,'ngHintAnchor')
            })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrTextHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        Properties: ng_diProperties({
          "className": ng_diString('wfrTextHint'),
          "Data": {
            "showAnchors": ng_diBoolean(true, { Level: 'basic' }),
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.Frame.LeftTop'),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.Frame.Top'),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.Frame.RightTop'),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.Frame.Left'),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.Frame.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.Frame.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.Frame.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.Frame.RightBottom')
              }
            }),
            "Anchors": ng_diObject({
              "topleft": ng_diObject({
                "L": ng_diInteger(0),
                "T": ng_diInteger(-19),
                "HX": ng_diInteger(0),
                "HY": ng_diInteger(0),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.AnchorsImg.topleft')
              },undefined,undefined,'ngHintAnchor'),
              "topright": ng_diObject({
                "R": ng_diInteger(0),
                "T": ng_diInteger(-19),
                "HX": ng_diInteger(21),
                "HY": ng_diInteger(0),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.AnchorsImg.topright')
              },undefined,undefined,'ngHintAnchor'),
              "bottomleft": ng_diObject({
                "L": ng_diInteger(0),
                "B": ng_diInteger(-19),
                "HX": ng_diInteger(0),
                "HY": ng_diInteger(27),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.AnchorsImg.bottomleft')
              },undefined,undefined,'ngHintAnchor'),
              "bottomright": ng_diObject({
                "R": ng_diInteger(0),
                "B": ng_diInteger(-19),
                "HX": ng_diInteger(21),
                "HY": ng_diInteger(27),
                "Img": ng_diTypeVal('image', 'WireframeControls.Images.TextHint.AnchorsImg.bottomright')
              },undefined,undefined,'ngHintAnchor')
            })
          },
          "ModifyControls": {
            "Hint": ng_diControl('wfrText', {
              "L": ng_diTypeVal('bounds', 5),
              "T": ng_diTypeVal('bounds', 2)
            }, { Level: 'advanced' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrCalendar',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_diProperties({
          "className": ng_diString('wfrCalendar'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.Calendar.Frame.LeftTop'),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.Calendar.Frame.Top'),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.Calendar.Frame.RightTop'),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.Calendar.Frame.Left'),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.Calendar.Frame.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.Calendar.Frame.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.Calendar.Frame.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.Calendar.Frame.RightBottom')
              }
            }),
            "ImgDay": ng_diTypeVal('image', 'WireframeControls.Images.Calendar.ImgDay'),
            "ImgNow": ng_diTypeVal('image', 'WireframeControls.Images.Calendar.ImgNow')
          }
        })
      };
    });

    function wfrEditDateDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('wfrEdit'),
          "DropDown": ng_diControl('wfrCalendar', {
            "className": ng_diString('wfrCalendar')
          }, { Level: 'basic' }),
          "Data": {
            "RightImg": ng_diNull()
          }
        })
      };
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('wfrEditDate',wfrEditDateDI);

    function wfrEditTimeDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('wfrEdit'),
          "DropDown": ng_diControl('wfrdList', ng_diProperties({
            "className": ng_diString('wfrDropDown')
          }), { Level: 'basic' }),
          "Data": {
            "RightImg": ng_diNull()
          }
        })
      };
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('wfrEditTime',wfrEditTimeDI);

    function wfrMemoDI(d,c,ref) {
      return {
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": ng_diString('wfrMemo'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.Memo.Frame.LeftTop'),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.Memo.Frame.Top'),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.Memo.Frame.RightTop'),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.Memo.Frame.Left'),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.Memo.Frame.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.Memo.Frame.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.Memo.Frame.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.Memo.Frame.RightBottom')
              }
            })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('wfrMemo', wfrMemoDI);

    ngRegisterControlDesignInfo('wfrPages',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wfrPages'),
          "ControlsPanel": ng_diControl(undefined,{
            "L": ng_diTypeVal('bounds', 5),
            "T": ng_diTypeVal('bounds', 5),
            "R": ng_diTypeVal('bounds', 5),
            "B": ng_diTypeVal('bounds', 5)
          }),
          "Data": {
            "PageImages": ng_diArray(undefined, {
              ObjectProperties: {
                0: ng_diObject({
                    "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.Pages.PagesUp[0].LeftImg'),
                    "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Pages.PagesUp[0].MiddleImg'),
                    "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.Pages.PagesUp[0].RightImg'),
                    "Separator": ng_diTypeVal('image', 'WireframeControls.Images.Pages.PagesUp[0].Separator')
                  })
              }
            }),
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.Pages.BoxUp.LeftTop'),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.Pages.BoxUp.Top'),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.Pages.BoxUp.RightTop'),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.Pages.BoxUp.Left'),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.Pages.BoxUp.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.Pages.BoxUp.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.Pages.BoxUp.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.Pages.BoxUp.RightBottom')
              }
            })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrSplitPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: {
          "className": ng_diString('wfrSplitPanel'),
          "Mover": ng_diStringValues('handle', ['handle','none'], { Level: 'basic' })
        }
      };
    });

    ngRegisterControlDesignInfo('wfrDropPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('wfrDropPanel'),
          "ControlsPanel": ng_diControl(undefined,ng_diProperties({
            "style": {
              "backgroundColor": ng_diTypeVal('css_colors', '#FFFFFF', { Level: 'advanced' })
            },
            "Data": {
              "Frame": ng_diType('img_frame', {}, {
                ObjectProperties: {
                  "Left": ng_diTypeVal('image', 'WireframeControls.Images.DropPanel.Left'),
                  "Right": ng_diTypeVal('image', 'WireframeControls.Images.DropPanel.Right')
                }
              })
            }
          }))
        })
      };
    });

    ngRegisterControlDesignInfo('wfrMenu',function(d,c,ref) {
      return {
        ControlCategory: 'Menu',
        Properties: ng_diProperties({
          "className": ng_diString('wfrMenu'),
          "Data": {
            "SubMenuDef": ng_diControl('wfrMenu'),
            "SubMenuImg": ng_diTypeVal('image', 'WireframeControls.Images.Menu.SubMenu'),
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.Menu.Frame.LeftTop'),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.Menu.Frame.Top'),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.Menu.Frame.RightTop'),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.Menu.Frame.Left'),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.Menu.Frame.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.Menu.Frame.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.Menu.Frame.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.Menu.Frame.RightBottom')
              }
            }),
            "SeparatorImg": ng_diTypeVal('image', 'WireframeControls.Images.Menu.Separator')
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrMenuBar',function(d,c,ref) {
      return {
        ControlCategory: 'Menu',
        Properties: ng_diProperties({
          "className": ng_diString('wfrMenuBar'),
          "Data": {
            "SubMenuDef": ng_diControl('wfrMenu')
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrMenuBarButton',function(d,c,ref) {
      return {
        ControlCategory: false,
        Properties: ng_diProperties({
          "className": ng_diString('wfrMenuBarButton'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.MenuBar.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.MenuBar.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.MenuBar.RightImg')
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrSplitButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": ng_diString('wfrSplitButton'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.Button.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Button.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.Menu.SplitButton')
          }
        })
      };
    });

    function wfrMessageDlgDI(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
        IsContainer: false,
        Properties: ng_diProperties({
          "DlgCheckBox": ng_diObject({
            "Checked": ng_diTypeValues('integer', 0, ['Unchecked','Checked','Grayed'], { Level: 'basic' }, { InitValue: 1 }),
            "AllowGrayed": ng_diBoolean(false, { Level: 'basic' }),
            "ngText": ng_diString('', { DisplayName: 'Text Resource (ngText)', Level: 'advanced' }, { Editor: 'ngfeEditor_Lang' }),
            "ngTextD": ng_diString('', { DisplayName: 'Text Resource (ngTextD)', Level: 'basic' }, { Editor: 'ngfeEditor_Lang' }),
            "Text": ng_diString('',{ Level: 'basic' }),
            "ngAlt": ng_diString('', { DisplayName: 'Alt Resource (ngAlt)', Level: 'advanced' }, { Editor: 'ngfeEditor_Lang' }),
            "ngAltD": ng_diString('', { DisplayName: 'Alt Resource (ngAltD)', Level: 'basic' }, { Editor: 'ngfeEditor_Lang' }),
            "Alt": ng_diString('', { Level: 'basic' }),
            "HTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' })
          }, { Level: 'basic' }),
          "DialogType": ng_diString('wfrDialog'),
          "ModifyControls": {
            "Message": ng_diControl('wfrText'),
            "Content": ng_diControl(undefined, {
              "L": ng_diTypeVal('bounds', 15),
              "R": ng_diTypeVal('bounds', 15),
              "H": ng_diTypeVal('bounds', 15)
            }),
            "Buttons": ng_diControl('wfrToolBar', ng_diProperties({
              "H": ng_diTypeVal('bounds', 27),
              "Data": {
                "HPadding": ng_diInteger(10)
              }
            })),
            "OK": ng_diControl('wfrButton', { "W": ng_diTypeVal('bounds', 80) }),
            "Yes": ng_diControl('wfrButton', { "W": ng_diTypeVal('bounds', 80) }),
            "No": ng_diControl('wfrButton', { "W": ng_diTypeVal('bounds', 80) }),
            "Cancel": ng_diControl('wfrButton', { "W": ng_diTypeVal('bounds', 80) }),
            "CheckBox": ng_diControl('wfrCheckBox', {
              "B": ng_diTypeVal('bounds', 10)
            }, { Level: 'basic' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('wfrMessageDlg',wfrMessageDlgDI);
    ngRegisterControlDesignInfo('wfrDlgMessageBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgIcon": ng_diMixed([
            ng_diNull(),
            ng_diType('image')
          ], { Level: 'basic' }),
          "ModifyControls": {
            "Message": ng_diControl(undefined, {
              "L": ng_diTypeVal('bounds', 25),
              "T": ng_diTypeVal('bounds', 25)
            }),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 20)
            }),
            "Icon": ng_diControl('ngImage', {
              "L": ng_diTypeVal('bounds', 15),
              "T": ng_diTypeVal('bounds', 20)
            }, { Level: 'basic' }, { InheritedFrom: 'ngImage' })
          }
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    function wfrDlgInputBoxDI(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgAllowEmpty": ng_diBoolean(false, { Level: 'basic' }),
          "DialogType": ng_diString('wfrMessageDlg'),
          "DlgButtons": ng_diTypeVal('bitmask', mbOK|mbCancel),
          "DlgHint": ng_diString('', { Level: 'basic' }),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "MinWidth": ng_diInteger(250)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 40)
            }),
            "Edit": ng_diControl('wfrEdit', {
              "T": ng_diTypeVal('bounds', 2)
            }, { Level: 'basic' }, { InheritedFrom: 'ngEdit' })
          }
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('wfrDlgInputBox',wfrDlgInputBoxDI);

    ngRegisterControlDesignInfo('wfrDlgDropDownBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgItems": ng_diMixed(['ngListItems','ngListStringItems'], { Collapsed: false, Level: 'basic' }),
          "ModifyControls": {
            "Edit": ng_diControl('wfrDropDown', {
              "DropDown": ng_diControl('wfrList')
            }, { Level: 'basic' }, { InheritedFrom: 'ngDropDown' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDlgDropDownListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgItems": ng_diMixed(['ngListItems','ngListStringItems'], { Collapsed: false, Level: 'basic' }),
          "ModifyControls": {
            "Edit": ng_diControl('wfrDropDownList', {
              "DropDown": ng_diControl('wfrList')
            }, { Level: 'basic' }, { InheritedFrom: 'ngDropDownList' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDlgDropDownTreeListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgItems": ng_diMixed(['ngListItems','ngListStringItems'], { Collapsed: false, Level: 'basic' }),
          "ModifyControls": {
            "Edit": ng_diControl('wfrDropDownList', {
              "DropDown": ng_diControl('wfrTreeList')
            }, { Level: 'basic' }, { InheritedFrom: 'ngDropDownList' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDlgMemoBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 120)
            }),
            "Edit": ng_diControl('wfrMemo', {
              "H": ng_diTypeVal('bounds', 100)
            }, { Level: 'basic' }, { InheritedFrom: 'ngMemo' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('wfrDlgListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgAllowEmpty": ng_diBoolean(false, { Level: 'basic' }),
          "DlgItems": ng_diMixed(['ngListItems','ngListStringItems'], { Level: 'basic', Collapsed: false }),
          "DialogType": ng_diString('wfrMessageDlg'),
          "DlgButtons": ng_diTypeVal('bitmask', mbOK|mbCancel),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "MinWidth": ng_diInteger(300)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 265)
            }),
            "List": ng_diControl('wfrList', ng_diProperties({
              "T": ng_diTypeVal('bounds', 2),
              "H": ng_diTypeVal('bounds', 250),
              "Data": {
                "SelectType": ng_diIntegerIdentifiers('nglSelectSingle')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngList' })
          }
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    ngRegisterControlDesignInfo('wfrDlgProgressBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgButtons": ng_diTypeVal('bitmask', mbNone),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "MinWidth": ng_diInteger(250)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 30)
            }),
            "Progress": ng_diControl('wfrProgressBar', {
              "T": ng_diTypeVal('bounds', 5)
            }, { Level: 'basic' }, { InheritedFrom: 'ngProgressBar' })
          }
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    ngRegisterControlDesignInfo('wfrDlgWaitBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgButtons": ng_diTypeVal('bitmask', mbNone),
          "ModifyControls": {
            "Message": ng_diControl(undefined, {
              "L": ng_diTypeVal('bounds', 45)
            }),
            "Progress": ng_diControl('wfrProgressDot', {
              "L": ng_diTypeVal('bounds', 15),
              "T": ng_diTypeVal('bounds', 13)
            }, { Level: 'basic' }),
            "Content": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "Visible": ng_diBoolean(false)
              }
            }))
          }
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    ngRegisterControlDesignInfo('wfrDlgAbout',function(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
        Properties: ng_diProperties({
          "DialogType": ng_diString('wfrDlgMessageBox'),
          "DlgIcon": ng_diNull(),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "className": ng_diString('wfrAboutMessage'),
              "Data": {
                "MinWidth": ng_diInteger(260)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 220)
            }),
            "AppInfo": ng_diControl('wfrTreeList', ng_diProperties({
              "H": ng_diTypeVal('bounds', 200),
              "Data": {
                "Frame": ng_diNull(),
                "DefaultIndent": ng_diInteger(0)
              }
            })),
            "Buttons": ng_diControl(undefined, ng_diProperties({
              "H": ng_diTypeVal('bounds', 47),
              "Data": {
                "VAlign": ng_diString('bottom')
              }
            }))
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrLoginForm',function(d,c,ref) {
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
            "OrganizationLabel": ng_diControl('wfrLabel'),
            "Organization": ng_diControl('wfrEdit'),
            "LoginLabel": ng_diControl('wfrLabel'),
            "Login": ng_diControl('wfrEdit'),
            "PasswordLabel": ng_diControl('wfrLabel'),
            "Password": ng_diControl('wfrEdit'),
            "CapsLockWarn": ng_diControl('wfrText', ng_diProperties({
              "style": {
                "marginBottom": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            })),
            "RememberMe": ng_diControl('wfrCheckBox'),
            "LoginBtn": ng_diControl('wfrButton', ng_diProperties({
             'W': ng_diTypeVal('bounds',100),
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '10px', { Level: 'advanced' })
              }
            })),
            "Progress": ng_diControl('wfrProgressDot', ng_diProperties({
              "style": {
                "marginLeft": ng_diTypeVal('css_dim_px', '10px', { Level: 'advanced' }),
                "marginTop": ng_diTypeVal('css_dim_px', '12px', { Level: 'advanced' })
              },
              "Data": {
                "Visible": ng_diBoolean(false)
              }
            }), { Level: 'basic' }),
            "Error": ng_diControl('wfrText', ng_diProperties({
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            }))
          }
        })
      }
    });

    ngRegisterControlDesignInfo('wfrPasswordForm',function(d,c,ref) {
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
            "OldPasswordLabel": ng_diControl('wfrLabel'),
            "OldPassword": ng_diControl('wfrEdit'),
            "NewPasswordLabel": ng_diControl('wfrLabel'),
            "NewPassword": ng_diControl('wfrEdit'),
            "ConfirmNewPasswordLabel":  ng_diControl('wfrLabel'),
            "ConfirmNewPassword": ng_diControl('wfrEdit'),
            "CapsLockWarn": ng_diControl('wfrText', ng_diProperties({
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            })),
            "Error": ng_diControl('wfrText', ng_diProperties({
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            }))
          }
        })
      }
    });

    ngRegisterControlDesignInfo('wfrLoginButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": ng_diString('wfrLink'),
          "Menu": ng_diControl('wfrMenu')
        })
      };
    });

    ngRegisterControlDesignInfo('wfrViewModelForm',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: {
          "ErrorHint": ng_diControl('wfrTextHint', {
            "className": ng_diString('wfrEditFieldError')
          })
        }
      };
    });

    function wfrEditFieldDI (d,c,ref) {
      var di = {
        ControlCategory: 'Edit Field',
        Properties: ng_diProperties({
          "Data": {
            "HintX": ng_diInteger(10),
            "HintY": ng_diInteger(17)
          },
          "ErrorHint": ng_diControl('wfrTextHint', ng_diProperties({
            "className": ng_diString('wfrEditFieldError'),
            "Data": {
              "Anchor": ng_diString('topleft|bottomleft|left')
            }
          }))
        })
      };
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    };

    ngRegisterControlDesignInfo('wfrEditField',wfrEditFieldDI);
    ngRegisterControlDesignInfo('wfrSearchBoxField',function(d,c,ref) {
      var di=wfrSearchBoxDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });

    ngRegisterControlDesignInfo('wfrEditBoxBtnField',function(d,c,ref) {
      var di=wfrEditBoxBtnDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('wfrEditNumField',function(d,c,ref) {
      var di=wfrEditDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('wfrColorEditField',function(d,c,ref) {
      var di=wfrColorEditDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDropDownField',function(d,c,ref) {
      var di=wfrEditDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      di.ControlCategory='Dropdown Field';
      return di;
    });
    ngRegisterControlDesignInfo('wfrDropDownListField',function(d,c,ref) {
      var di=wfrEditDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      di.ControlCategory='Dropdown Field';
      return di;
    });
    ngRegisterControlDesignInfo('wfrEditDateField',function(d,c,ref) {
      var di=wfrEditDateDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('wfrEditTimeField',function(d,c,ref) {
      var di=wfrEditTimeDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('wfrMemoField',function(d,c,ref) {
      var di=wfrMemoDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
  }
};
ngUserControls['wfr_designinfo'] = WireframeControls_DesignInfo;