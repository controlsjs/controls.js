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
    ngRegisterControlDesignInfo('wfrPanel',function(d,c,ref) {
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
    ngRegisterControlDesignInfo('wfrFrame',function(d,c,ref) {
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
    /* wfrAlignPanel */
    /* wfrAlignFrame */
    ngRegisterControlDesignInfo('wfrToolBar',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        Properties: ng_diProperties({
          "className": ng_diString('wfrToolBar', { Level: 'advanced' })
        })
      };
    });
    ngRegisterControlDesignInfo('wfrText',function(d,c,ref) {
      return {
        ControlCategory: 'Labels',
        Properties: ng_diProperties({
          "className": ng_diString('wfrText', { Level: 'advanced' }),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('wfrButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        Properties: ng_diProperties({
          "className": ng_diString('wfrButton', { Level: 'advanced' }),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.DefButton.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.DefButton.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.DefButton.RightImg', { Level: 'advanced' })
           }
        })
       };
    });
    ngRegisterControlDesignInfo('wfrCheckBox',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        Properties: ng_diProperties({
          "className": ng_diString('wfrCheckBox', { Level: 'advanced' }),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.CheckBoxLeft', { Level: 'advanced' }),
            "MiddleImg": { Level: 'advanced' },
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.CheckBoxRight', { Level: 'advanced' })
           }
        })
       };
    });
    ngRegisterControlDesignInfo('wfrRadioButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        Properties: ng_diProperties({
          "className": ng_diString('wfrRadio', { Level: 'advanced' }),
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.RadioLeft', { Level: 'advanced' }),
            "MiddleImg": { Level: 'advanced' },
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.RadioRight', { Level: 'advanced' })
          }
        })
       };
    });
    ngRegisterControlDesignInfo('wfrLabel',function(d,c,ref) {
      return {
        ControlCategory: 'Labels',
        Properties: ng_diProperties({
          "className": ng_diString('wfrLabel', { Level: 'advanced' }),
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
    ngRegisterControlDesignInfo('wfrLink',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        Properties: ng_diProperties({
          "className": ng_diString('wfrLink', { Level: 'advanced' }),
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

    function wfrEditDI(d,c,ref) {
      return {
        ControlCategory: 'Edits',
        Properties: ng_diProperties({
          "className": ng_diString('wfrEdit'),
          "DropDown": ng_diControl(undefined, {
            "className": ng_diString('wfrDropDown', { Level: 'advanced' })
          }),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.RightImg', { Level: 'advanced' })
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
            "TextAlign": ng_diString('center', { Level: 'advanced' })
          },
          "Methods": {
            "GetColor": ng_diFunction('function() { ng_CallParent(this, "GetColor", arguments); }')
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
        Properties: ng_diProperties({
          "Data": {
            "H": ng_diInteger(WireframeControls.Images.Edit.MiddleImg.H, { Level: 'advanced' }),
            "LeftDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WireframeControls.Images.LeftImg.W, { Level: 'advanced' }),
              "Data": {
                "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.LeftImg', { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', null, { Level: 'advanced' })
              }
            }), { Level: 'advanced' }),
            "EditDef": ng_diControl('wfrEdit', ng_diProperties({
              "Data": {
                "LeftImg": ng_diTypeVal('image', null, { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', null, { Level: 'advanced' })
              }
            }), { Level: 'advanced' }),
            "StaticDef": ng_diControl('wfrLabel', ng_diProperties({
              "Data": {
                "LeftImg": ng_diTypeVal('image', null, { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', null, { Level: 'advanced' })
               }
            }), { Level: 'advanced' }),
            "RightDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WireframeControls.Images.Edit.RightImg.W, { Level: 'advanced' }),
              "Data": {
                "LeftImg": ng_diTypeVal('image', null, { Level: 'advanced' }),
                "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
                "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.Edit.RightImg', { Level: 'advanced' })
              }
            }), { Level: 'advanced' })
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

    ngRegisterControlDesignInfo('wfrDropDown',wfrEditDI);
    ngRegisterControlDesignInfo('wfrDropDownList',wfrEditDI);

    function wfrSearchBoxDI(d,c,ref) {
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
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    }
    ngRegisterControlDesignInfo('wfrSearchBox', wfrSearchBoxDI);

    ngRegisterControlDesignInfo('wfrProgressBar',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrProgressBar', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.ProgressBar.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.ProgressBar.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.ProgressBar.RightImg', { Level: 'advanced' }),
            "BarImg": ng_diTypeVal('image', 'WireframeControls.Images.ProgressBar.BarImg', { Level: 'advanced' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrProgressDot',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrLabel', { Level: 'advanced' }),
          "Data": {
            "TextAlign": ng_diString('center', { Level: 'advanced' }),
            "HTMLEncode": ng_diBoolean(false)
          }
        })
      };
    });

    function wfrListDI(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrListBox', { Level: 'advanced' }),
          "Data": {
            "TreeImg": ng_diTypeVal('image', 'WireframeControls.Images.TreeImgTriangle', { Level: 'advanced' })
          },
          "Methods": {
            "DoUpdate": ng_diFunction('function() { ng_CallParent(this, "DoUpdate", arguments); }')
          },
          "Events": {
            "OnGetCheckImg": ng_diEvent('function(c,item) { return true; }', { Level: 'basic' }),
            "OnUpdated": ng_diEvent('function(c) { return true; }', { Level: 'basic' })
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
    ngRegisterControlDesignInfo('wfrTreeList',function(d,c,ref) {
      var di=wfrListDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function wfrPageListDI(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrListBox', { Level: 'advanced' }),
          "Data": {
            "AverageItemHeight" : ng_diInteger(20, { Level: 'advanced' })
          },
          "Methods": {
            "DoUpdate": ng_diFunction('function() { ng_CallParent(this, "DoUpdate", arguments); }')
          },
          "ModifyControls": {
            "List": ng_diControl('wfrList', undefined, { Level: 'basic' }, { InheritedFrom: 'ngList' }),
            "Loading": ng_diControl('wfrProgressDot', undefined, { Level: 'advanced' }),
            "Paging": ng_diControl(undefined, undefined, {
              "className": ng_diString('wxpPageListPaging', { Level: 'advanced' })
            }, { Level: 'advanced' }),
            'FirstPage': ng_DIPropertyControl(
              'ngButton', { Level: 'advanced' }, 'ngButton',
              ng_diProperties({
                "className": ng_diString('wfrPgListPagingButton', { Level: 'advanced' }),
                "Data": {
                  "ToolBarHPadding": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'advanced', Order: 0.8 }),
                  "Img": ng_diTypeVal('image', 'WireframeControls.Images.PagingFirst', { Level: 'advanced' })
                }
              })
            ),
            'PrevPage': ng_DIPropertyControl(
              'ngButton', { Level: 'advanced' }, 'ngButton',
              ng_diProperties({
                "className": ng_diString('wfrPgListPagingButton', { Level: 'advanced' }),
                "Data": {
                  "ToolBarHPadding": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'advanced', Order: 0.8 }),
                  "Img": ng_diTypeVal('image', 'WireframeControls.Images.PagingPrev', { Level: 'advanced' })
                }
              })
            ),
            'PageNo': ng_DIPropertyControl(
              'wfrEdit', { Level: 'advanced' }, 'wfrEdit',
              ng_diProperties({
                "Data": {
                  "ToolBarHPadding": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'advanced', Order: 0.8 }),
                  "Text": ng_diString('1', { Level: 'advanced' }),
                  "TextAlign": ng_diString('center', { Level: 'advanced' })
                }
              })
            ),
            'Page0': ng_DIPropertyControl(
              'ngButton', { Level: 'advanced' }, 'ngButton',
              ng_diProperties({
                "className": ng_diString('wfrPgListPagingButton', { Level: 'advanced' }),
                "Data": {
                  "ToolBarHPadding": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'advanced', Order: 0.8 }),
                  "MinWidth": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'advanced', Order: 0.8 }),
                  "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.PagingPage', { Level: 'advanced' }),
                  "TextAlign": ng_diString('center', { Level: 'advanced' }),
                  "Text": ng_diString('1', { Level: 'advanced' })
                }
              })
            ),
            'NextPage': ng_DIPropertyControl(
              'ngButton', { Level: 'advanced' }, 'ngButton',
              ng_diProperties({
                "className": ng_diString('wfrPgListPagingButton', { Level: 'advanced' }),
                "Data": {
                  "ToolBarHPadding": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'advanced', Order: 0.8 }),
                  "ImgAlign": ng_diString('right', { Level: 'advanced' }),
                  "Img": ng_diTypeVal('image', 'WireframeControls.Images.PagingNext', { Level: 'advanced' })
                }
              })
            ),
            'LastPage': ng_DIPropertyControl(
              'ngButton', { Level: 'advanced' }, 'ngButton',
              ng_diProperties({
                "className": ng_diString('wfrPgListPagingButton', { Level: 'advanced' }),
                "Data": {
                  "ToolBarHPadding": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'advanced', Order: 0.8 }),
                  "ImgAlign": ng_diString('right', { Level: 'advanced' }),
                  "Img": ng_diTypeVal('image', 'WireframeControls.Images.PagingLast', { Level: 'advanced' })
                }
              })
            )
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wfrPageList',wfrPageListDI);
    ngRegisterControlDesignInfo('wfrPageTreeList',wfrPageListDI);

    ngRegisterControlDesignInfo('wfrGroup',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrGroupBox', { Level: 'advanced' })
        })
      };
    });

    ngRegisterControlDesignInfo('wfrGroupBox',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrGroupBox', { Level: 'advanced' })
        }),
        ControlCategory: false
      };
    });

    function wfrWindowDI(d,c,ref) {
      return {
        ControlCategory: 'Containers',
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
                "LeftTop": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.LeftTop', { Level: 'advanced' }),
                "Top": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.Top', { Level: 'advanced' }),
                "RightTop": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.RightTop', { Level: 'advanced' }),
                "Left": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.Left', { Level: 'advanced' }),
                "Right": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.Right', { Level: 'advanced' }),
                "LeftBottom": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.LeftBottom', { Level: 'advanced' }),
                "Bottom": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.Bottom', { Level: 'advanced' }),
                "RightBottom": ng_diTypeVal('image', 'WireframeControls.Images.Window.Frame.RightBottom', { Level: 'advanced' })
              }
            }),
            "CaptionImg": ng_diObject({
              "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.Window.Caption.LeftImg', { Level: 'advanced' }),
              "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Window.Caption.MiddleImg', { Level: 'advanced' }),
              "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.Window.Caption.RightImg', { Level: 'advanced' })
            }, { Level: 'advanced' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wfrWindow',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('wfrWindow', { Level: 'advanced' })
        })
      };
      ng_MergeVar(di,wfrWindowDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('wfrDialog',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('wfrDialog', { Level: 'advanced' }),
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
        Properties: ng_diProperties({
          "className": ng_diString('wfrHint', { Level: 'advanced' })
        })
      };
    });

    ngRegisterControlDesignInfo('wfrTextHint',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrTextHint', { Level: 'advanced' })
        })
      };
    });

    ngRegisterControlDesignInfo('wfrCalendar',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrCalendar', { Level: 'advanced' }),
          "Events": {
            "OnUpdated": ng_diEvent('function(calendar) { return true; }', { Level: 'advanced' })
          }
        })
      };
    });

    function wfrEditDateDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": ng_diString('wfrEdit', { Level: 'advanced' }),
          "ModifyControls": {
            "DropDown": ng_diControl('wfrCalendar', ng_diProperties({
              "padding": ng_diString('', { Level: 'optional' })
            }), { Level: 'advanced' }, { InheritedFrom: 'ngCalendar' })
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
          "className": ng_diString('wfrEdit', { Level: 'advanced' }),
          "Events": {
            "OnDropDown": ng_diEvent('function(c, l) { return true; }', { Level: 'basic' }),
            "OnListItemChanged": ng_diEvent('function(c, l, it, oit) { return false; }', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('wfrEditTime',wfrEditTimeDI);

    function wfrMemoDI(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrMemo', { Level: 'advanced' }),
          "Data": {
            "Frame": ng_diTypeVal('img_frame', 'WireframeControls.Images.Memo', { Level: 'advanced' })
          },
          "Methods": {
            "DoMouseLeave": ng_diFunction('function(e, mi, elm) { ng_CallParent(this, "DoMouseLeave", arguments); }', { Level: 'advanced'} )
          }
        })
      };
    };
    ngRegisterControlDesignInfo('wfrMemo', wfrMemoDI);

    ngRegisterControlDesignInfo('wfrSplitPanel',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrSplitPanel', { Level: 'advanced' })
        })
      };
    });

    ngRegisterControlDesignInfo('wfrDropPanel',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrDropPanel', { Level: 'advanced' })
        })
      };
    });

    ngRegisterControlDesignInfo('wfrMenu',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrMenu', { Level: 'advanced' }),
          "Data": {
            "SubMenuDef": ng_diControl('wfrMenu', undefined, { Level: 'advanced' }),
            "SubMenuImg": ng_diTypeVal('image', 'WireframeControls.Images.Menu.SubMenu', { Level: 'advanced' }),
            "Frame": ng_diTypeVal('img_frame', 'WireframeControls.Images.Menu.Frame', { Level: 'advanced' }),
            "SeparatorImg": ng_diTypeVal('image', 'WireframeControls.Images.Menu.Separator', { Level: 'advanced' })
          },
          "Methods": {
            "DoUpdate": ng_diFunction('function(c) { ng_CallParent(this, "DoUpdate", arguments); }'),
            "DrawItemText": ng_diFunction('function(html, it, id, level) { ng_CallParent(this, "DrawItemText", arguments); }', { Level: 'advanced' })
          },
          "Events": {
            "OnGetCheckImg": ng_diEvent('function(c,item) { return true; }', { Level: 'basic' }),
            "OnUpdated": ng_diEvent('function(c) { return true; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrMenuBar',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrMenuBar', { Level: 'advanced' }),
          "Data": {
            "SubMenuDef": ng_diControl('wfrMenu', undefined, { Level: 'advanced' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrMenuBarButton',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrMenuBarButton', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.MenuBar.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.MenuBar.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.MenuBar.RightImg', { Level: 'advanced' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrSplitButton',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "className": ng_diString('wfrSplitButton', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WireframeControls.Images.Button.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_diTypeVal('image', 'WireframeControls.Images.Button.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_diTypeVal('image', 'WireframeControls.Images.Menu.SplitButton', { Level: 'advanced' })
          }
        })
      };
    });

    function wfrMessageDlgDI(d,c,ref) {
      return {
        ControlCategory: 'Dialogs',
        IsContainer: false,
        Properties: ng_diProperties({
          "DialogType": ng_diString('wfrDialog',{Level: 'advanced'}),
          "ModifyControls": {
            "Message": ng_diControl('wfrText', null, { Level: 'advanced' }, { InheritedFrom: 'ngText' }),
            "OK": ng_diControl('wfrButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Yes": ng_diControl('wfrButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "No": ng_diControl('wfrButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "Cancel": ng_diControl('wfrButton', null, { Level: 'advanced' }, { InheritedFrom: 'ngButton' }),
            "CheckBox": ng_diControl('wfrCheckBox', null, { Level: 'advanced' }, { InheritedFrom: 'ngCheckBox' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('wfrMessageDlg',wfrMessageDlgDI);
    ngRegisterControlDesignInfo('wfrMessageBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Icon": ng_diControl('ngImage', null, { Level: 'advanced' }, { InheritedFrom: 'ngText' })
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
          "DialogType": ng_diString('wfrMessageDlg',{Level: 'advanced'})
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('wfrDlgInputBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('wfrEdit', null, { Level: 'advanced' }, { InheritedFrom: 'ngEdit' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDlgDropDownBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('wfrDropDown', null, { Level: 'advanced' }, { InheritedFrom: 'ngDropDown' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDlgDropDownListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('wfrDropDownList', null, { Level: 'advanced' }, { InheritedFrom: 'ngDropDownList' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDlgDropDownTreeListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('wfrDropDownList', null, { Level: 'advanced' }, { InheritedFrom: 'ngDropDownList' })
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
            "Edit": ng_diControl('wfrMemo', null, { Level: 'advanced' }, { InheritedFrom: 'ngMemo' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('wfrDlgListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DialogType": ng_diString('wfrMessageDlg',{Level: 'advanced'}),
          "ModifyControls": {
            "List": ng_diControl('wfrList', null, { Level: 'advanced' }, { InheritedFrom: 'ngList' })
          },
          "Events": {
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
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
          "ModifyControls": {
            "Progress": ng_diControl('wfrProgressBar', null, { Level: 'advanced' }, { InheritedFrom: 'ngProgressBar' })
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
          "ModifyControls": {
            "Progress": ng_diControl('wfrProgressDot', null, { Level: 'advanced' }, { InheritedFrom: 'ngProgressDot' })
          }
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    ngRegisterControlDesignInfo('wfrDlgAbout',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "DialogType": ng_diString('wfrDlgMessageBox',{Level: 'advanced'}),
          "DlgIcon": ng_diMixed(['null','ngListStringItems'], { InitType: 'ngListItems', Level: 'basic' }),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "className": ng_diString('wfrAboutMessage', { Level: 'advanced' })
            }), { Level: 'advanced' }),
            "AppInfo": ng_diControl('wfrTreeList', undefined, { Level: 'advanced' }, { InheritedFrom: 'ngTreeList' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrViewModelForm',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "ModifyControls": {
            "ErrorHint": ng_diControl('wfrTextHint', ng_diProperties({
              "className": ng_diString('wfrEditFieldError', { Level: 'advanced' })
            }), { Level: 'advanced' }, { InheritedFrom: 'ngTextHint' })
          }
        })
      };
    });

    function wfrEditFieldDI (d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "Data": {
            "HintX": ng_diInteger(10,{ Level: 'basic' }),
            "HintXY": ng_diInteger(17,{ Level: 'basic' })
          },
          "ErrorHint": ng_diControl('wfrTextHint', ng_diProperties({
            "className": ng_diString('wfrEditFieldError', { Level: 'advanced' }),
            "Data": {
              "Anchor": ng_diString('topleft|bottomleft|left', { Level: 'advanced' })
            }
          }), { Level: 'advanced' }, { InheritedFrom: 'ngTextHint' })
        })
      };
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    };

    ngRegisterControlDesignInfo('wfrEditField',wfrEditFieldDI);
    ngRegisterControlDesignInfo('wfrSearchBoxField',function(d,c,ref) {
      var di=wfrSearchBoxDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('wfrEditBoxBtnField',function(d,c,ref) {
      var di=wfrEditBoxBtnDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrEditNumField',function(d,c,ref) {
      var di=wfrEditDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
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
      return di;
    });
    ngRegisterControlDesignInfo('wfrDropDownListField',function(d,c,ref) {
      var di=wfrEditDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    ngRegisterControlDesignInfo('wfrEditDateField',function(d,c,ref) {
      var di=wfrEditDateDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrEditTimeField',function(d,c,ref) {
      var di=wfrEditTimeDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrMemoField',function(d,c,ref) {
      var di=wfrMemoDI(d,c,ref);
      ng_MergeVar(di,wfrEditFieldDI(d,c,ref));
      return di;
    });
  }
};
ngUserControls['wfr_designinfo'] = WireframeControls_DesignInfo;