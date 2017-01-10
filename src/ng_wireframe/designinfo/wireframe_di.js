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

if (typeof ngUserControls === 'undefined') ngUserControls = [];
var WireframeControls_DesignInfo = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('wfrPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_DIProperties({
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
        Properties: ng_DIProperties({
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
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wfrToolBar'
              }
            }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('wfrText',function(d,c,ref) {
      return {
        ControlCategory: 'Labels',
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wfrText'
              }
            }
          },
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
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wfrButton'
              }
            }
          },
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.DefButton.LeftImg' }
              }
            },
            "MiddleImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.DefButton.MiddleImg' }
              }
            },
            "RightImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.DefButton.RightImg' }
              }
            }
           }
        })
       };
    });
    ngRegisterControlDesignInfo('wfrCheckBox',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wfrCheckBox'
              }
            }
          },
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.CheckBoxLeft'}
              }
            },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.CheckBoxRight' }
              }
            }
           }
        })
       };
    });
    ngRegisterControlDesignInfo('wfrRadioButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wfrRadio'
              }
            }
          },
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.RadioLeft'}
              }
            },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.RadioRight' }
              }
            }
           }
        })
       };
    });
    ngRegisterControlDesignInfo('wfrLabel',function(d,c,ref) {
      return {
        ControlCategory: 'Labels',
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wfrLabel'
              }
            }
          },
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
        Properties: ng_DIProperties({
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wfrLink'
              }
            }
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
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrEdit'),
          "DropDown": {
            Types: {
              'control': {
                ObjectProperties: ng_DIProperties({
                  "className": ng_DIProperty('string', 'wfrDropDown', { Level: 'advanced' })
                })
              }
            }
          },
          "Data": {
            "LeftImg": ng_DIProperty('image', 'WireframeControls.Images.Edit.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_DIProperty('image', 'WireframeControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_DIProperty('image', 'WireframeControls.Images.Edit.RightImg', { Level: 'advanced' })
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
        Properties: ng_DIProperties({
          "Buttons": { Level: 'advanced' },
          "Events": {
            "OnElipsis": ng_DIPropertyEvent('function(c, text) {}', { Level: 'basic' })
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
        Properties: ng_DIProperties({
          "Data": {
            "TextAlign": ng_DIProperty('string', 'center', { Level: 'advanced' })
          },
          "Methods": {
            "GetColor": ng_DIProperty('function','function() { ng_CallParent(this, "GetColor", arguments); }')
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
        Properties: ng_DIProperties({
          "Data": {
            "H": ng_DIProperty('integer', 'WireframeControls.Images.Edit.MiddleImg.H', { Level: 'advanced' }),
            "LeftDef": { Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: {
                    "W": ng_DIProperty('integer', 'WireframeControls.Images.LeftImg.W', { Level: 'advanced' }),
                    "LeftImg": ng_DIProperty('image', 'WireframeControls.Images.Edit.LeftImg', { Level: 'advanced' }),
                    "MiddleImg": ng_DIProperty('image', 'WireframeControls.Images.Edit.MiddleImg', { Level: 'advanced' })
                  }
                }
              }
            },
            "EditDef": { Level: 'advanced',
              Types: {
                'control': {
                  Type: 'wfrEdit',
                  ObjectProperties: {
                    "MiddleImg": ng_DIProperty('image', 'WireframeControls.Images.Edit.MiddleImg', { Level: 'advanced' })
                  }
                }
              }
            },
            "StaticDef": { Level: 'advanced',
              Types: {
                'control': {
                  Type: 'wfrLabel',
                  ObjectProperties: {
                    "MiddleImg": ng_DIProperty('image', 'WireframeControls.Images.Edit.MiddleImg', { Level: 'advanced' })
                  }
                }
              }
            },
            "RightDef": { Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: {
                    "W": ng_DIProperty('integer', 'WireframeControls.Images.Edit.RightImg.W', { Level: 'advanced' }),
                    "MiddleImg": ng_DIProperty('image', 'WireframeControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
                    "RightImg": ng_DIProperty('image', 'WireframeControls.Images.Edit.RightImg', { Level: 'advanced' })
                  }
                }
              }
            }
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
        Properties: ng_DIProperties({
          "Buttons": { Level: 'advanced' },
          "Methods": {
            "Search": ng_DIProperty('function','function(text) { ng_CallParent(this, "Search", arguments); }')
          },
          "Events": {
            "OnSearch": ng_DIPropertyEvent('function(c, text) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    }
    ngRegisterControlDesignInfo('wfrSearchBox', wfrSearchBoxDI);

    ngRegisterControlDesignInfo('wfrProgressBar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrProgressBar', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_DIProperty('image', 'WireframeControls.Images.ProgressBar.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_DIProperty('image', 'WireframeControls.Images.ProgressBar.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_DIProperty('image', 'WireframeControls.Images.ProgressBar.RightImg', { Level: 'advanced' }),
            "BarImg": ng_DIProperty('image', 'WireframeControls.Images.ProgressBar.BarImg', { Level: 'advanced' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrProgressDot',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrLabel', { Level: 'advanced' }),
          "Data": {
            "TextAlign": ng_DIProperty('string', 'center', { Level: 'advanced' }),
            "HTMLEncode": ng_DIPropertyBool(false)
          }
        })
      };
    });

    function wfrListDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrListBox', { Level: 'advanced' }),
          "Data": {
            "TreeImg": ng_DIProperty('image', 'WireframeControls.Images.TreeImgTriangle', { Level: 'advanced' })
          },
          "Methods": {
            "DoUpdate": ng_DIProperty('function','function() { ng_CallParent(this, "DoUpdate", arguments); }')
          },
          "Events": {
            "OnGetCheckImg": ng_DIPropertyEvent('function(c,item) { return true; }', { Level: 'basic' }),
            "OnUpdated": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' })
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
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrListBox', { Level: 'advanced' }),
          "Data": {
            "AverageItemHeight" : ng_DIProperty('integer', 20, { Level: 'advanced' })
          },
          "Methods": {
            "DoUpdate": ng_DIProperty('function','function() { ng_CallParent(this, "DoUpdate", arguments); }')
          },
          "ModifyControls": {
            DefaultType: 'controls',
            Level: 'advanced',
            "List": ng_DIPropertyControl('wfrList', { Level: 'basic' }, 'ngList'),
            "Loading": ng_DIPropertyControl('wfrProgressDot', { Level: 'advanced' }),
            "Paging": {
              Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: ng_DIProperties({
                    "className": ng_DIProperty('string', 'wxpPageListPaging', { Level: 'advanced' })
                  })
                }
              }
            },
            'FirstPage': ng_DIPropertyControl(
              'ngButton', { Level: 'advanced' }, 'ngButton',
              ng_DIProperties({
                "className": ng_DIProperty('string', 'wfrPgListPagingButton', { Level: 'advanced' }),
                "Data": {
                  "ToolBarHPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'advanced', Order: 0.8 },
                  "Img": ng_DIProperty('image', 'WireframeControls.Images.PagingFirst', { Level: 'advanced' })
                }
              })
            ),
            'PrevPage': ng_DIPropertyControl(
              'ngButton', { Level: 'advanced' }, 'ngButton',
              ng_DIProperties({
                "className": ng_DIProperty('string', 'wfrPgListPagingButton', { Level: 'advanced' }),
                "Data": {
                  "ToolBarHPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'advanced', Order: 0.8 },
                  "Img": ng_DIProperty('image', 'WireframeControls.Images.PagingPrev', { Level: 'advanced' })
                }
              })
            ),
            'PageNo': ng_DIPropertyControl(
              'wfrEdit', { Level: 'advanced' }, 'wfrEdit',
              ng_DIProperties({
                "Data": {
                  "ToolBarHPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'advanced', Order: 0.8 },
                  "Text": ng_DIProperty('string', '1', { Level: 'advanced' }),
                  "TextAlign": ng_DIProperty('string', 'center', { Level: 'advanced' })
                }
              })
            ),
            'Page0': ng_DIPropertyControl(
              'ngButton', { Level: 'advanced' }, 'ngButton',
              ng_DIProperties({
                "className": ng_DIProperty('string', 'wfrPgListPagingButton', { Level: 'advanced' }),
                "Data": {
                  "ToolBarHPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'advanced', Order: 0.8 },
                  "MinWidth": { DefaultType: 'undefined', InitType: 'integer', Level: 'advanced', Order: 0.8 },
                  "MiddleImg": ng_DIProperty('image', 'WireframeControls.Images.PagingPage', { Level: 'advanced' }),
                  "TextAlign": ng_DIProperty('string', 'center', { Level: 'advanced' }),
                  "Text": ng_DIProperty('string', '1', { Level: 'advanced' })
                }
              })
            ),
            'NextPage': ng_DIPropertyControl(
              'ngButton', { Level: 'advanced' }, 'ngButton',
              ng_DIProperties({
                "className": ng_DIProperty('string', 'wfrPgListPagingButton', { Level: 'advanced' }),
                "Data": {
                  "ToolBarHPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'advanced', Order: 0.8 },
                  "ImgAlign": ng_DIProperty('string', 'right', { Level: 'advanced' }),
                  "Img": ng_DIProperty('image', 'WireframeControls.Images.PagingNext', { Level: 'advanced' })
                }
              })
            ),
            'LastPage': ng_DIPropertyControl(
              'ngButton', { Level: 'advanced' }, 'ngButton',
              ng_DIProperties({
                "className": ng_DIProperty('string', 'wfrPgListPagingButton', { Level: 'advanced' }),
                "Data": {
                  "ToolBarHPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'advanced', Order: 0.8 },
                  "ImgAlign": ng_DIProperty('string', 'right', { Level: 'advanced' }),
                  "Img": ng_DIProperty('image', 'WireframeControls.Images.PagingLast', { Level: 'advanced' })
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
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrGroupBox', { Level: 'advanced' })
        })
      };
    });

    ngRegisterControlDesignInfo('wfrGroupBox',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrGroupBox', { Level: 'advanced' })
        }),
        ControlCategory: false
      };
    });

    function wfrWindowDI(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_DIProperties({
          "Data": {
            "FormID": { Level: 'advanced' },
            "LeftTop": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.Window.LeftTop' }
              }
            },
            "Top": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.Window.Top' }
              }
            },
            "RightTop": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.Window.RightTop' }
              }
            },
            "Left": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.Window.Left' }
              }
            },
            "Right": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.Window.Right' }
              }
            },
            "LeftBottom": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.Window.LeftBottom' }
              }
            },
            "Bottom": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.Window.Bottom' }
              }
            },
            "RightBottom": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.Window.RightBottom' }
              }
            }
          },
          "Events": {
            "OnDblClick": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('wfrWindow',function(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrWindow', { Level: 'advanced' })
        })
      };
      ng_MergeVar(di,wfrWindowDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('wfrDialog',function(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrDialog', { Level: 'advanced' }),
          "Modal": ng_DIPropertyBool(true),
          "Visible": ng_DIPropertyBool(false),
          "Sizeable": ng_DIPropertyBool(false),
          "Centered": ng_DIPropertyBool(true)
        })
      };
      ng_MergeVar(di,wfrWindowDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('wfrHint',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrHint', { Level: 'advanced' })
        })
      };
    });

    ngRegisterControlDesignInfo('wfrTextHint',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrTextHint', { Level: 'advanced' })
        })
      };
    });

    ngRegisterControlDesignInfo('wfrCalendar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrCalendar', { Level: 'advanced' }),
          "Events": {
            "OnUpdated": ng_DIPropertyEvent('function(calendar) { return true; }', { Level: 'advanced' })
          }
        })
      };
    });

    function wfrEditDateDI(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrEdit', { Level: 'advanced' }),
          "ModifyControls": {
            "DropDown": { DefaultType: 'control', Level: 'advanced',
              Types: {
                'control': {
                  Type: 'wfrCalendar',
                  InheritedFrom: 'ngCalendar',
                  ObjectProperties: ng_DIProperties({
                    "padding": { DefaultType: 'string', Level: 'optional' }
                  })
                }
              }
            }
          }
        })
      };
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('wfrEditDate',wfrEditDateDI);

    function wfrEditTimeDI(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrEdit', { Level: 'advanced' }),
          "Events": {
            "OnDropDown": ng_DIPropertyEvent('function(c, l) { return true; }', { Level: 'basic' }),
            "OnListItemChanged": ng_DIPropertyEvent('function(c, l, it, oit) { return false; }', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('wfrEditTime',wfrEditTimeDI);

    function wfrMemoDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrMemo', { Level: 'advanced' }),
          "Data": {
            "Frame": ng_DIProperty('img_frame', 'WireframeControls.Images.Memo', { Level: 'advanced' })
          },
          "Methods": {
            "DoMouseLeave": ng_DIProperty('function','function(e, mi, elm) { ng_CallParent(this, "DoMouseLeave", arguments); }', { Level: 'advanced'} )
          }
        })
      };
    };
    ngRegisterControlDesignInfo('wfrMemo', wfrMemoDI);

    ngRegisterControlDesignInfo('wfrSplitPanel',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrSplitPanel', { Level: 'advanced' })
        })
      };
    });

    ngRegisterControlDesignInfo('wfrDropPanel',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrDropPanel', { Level: 'advanced' })
        })
      };
    });

    ngRegisterControlDesignInfo('wfrMenu',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrMenu', { Level: 'advanced' }),
          "Data": {
            "SubMenuDef": { Level: 'advanced',
              Types: {
                'control': {
                  Type: 'wfrMenu'
                }
              }
            },
            "SubMenuImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.Menu.SubMenu' }
              }
            },
            "Frame": { Level: 'advanced',
              Types: {
                'img_frame': { DefaultValue: 'WireframeControls.Images.Menu.Frame' }
              }
            },
            "SeparatorImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WireframeControls.Images.Menu.Separator' }
              }
            }
          },
          "Methods": {
            "DoUpdate": ng_DIProperty('function','function(c) { ng_CallParent(this, "DoUpdate", arguments); }'),
            "DrawItemText": ng_DIProperty('function','function(html, it, id, level) { ng_CallParent(this, "DrawItemText", arguments); }', { Level: 'advanced' })
          },
          "Events": {
            "OnGetCheckImg": ng_DIPropertyEvent('function(c,item) { return true; }', { Level: 'basic' }),
            "OnUpdated": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrMenuBar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrMenuBar', { Level: 'advanced' }),
          "Data": {
            "SubMenuDef": { Level: 'advanced',
              Types: {
                'control': {
                  Type: 'wfrMenu'
                }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrMenuBarButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrMenuBarButton', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_DIProperty('image', 'WireframeControls.Images.MenuBar.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_DIProperty('image', 'WireframeControls.Images.MenuBar.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_DIProperty('image', 'WireframeControls.Images.MenuBar.RightImg', { Level: 'advanced' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrSplitButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wfrSplitButton', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_DIProperty('image', 'WireframeControls.Images.Button.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_DIProperty('image', 'WireframeControls.Images.Button.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_DIProperty('image', 'WireframeControls.Images.Menu.SplitButton', { Level: 'advanced' })
          }
        })
      };
    });

    function wfrMessageDlgDI(d,c,ref) {
      return {
        ControlCategory: 'Dialogs',
        IsContainer: false,
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','wfrDialog',{Level: 'advanced'}),
          "ModifyControls": {
            "Message": ng_DIPropertyControl('wfrText', { Level: 'advanced' }, 'ngText'),
            "OK": ng_DIPropertyControl('wfrButton', { Level: 'advanced' }, 'ngButton'),
            "Yes": ng_DIPropertyControl('wfrButton', { Level: 'advanced' }, 'ngButton'),
            "No": ng_DIPropertyControl('wfrButton', { Level: 'advanced' }, 'ngButton'),
            "Cancel": ng_DIPropertyControl('wfrButton', { Level: 'advanced' }, 'ngButton'),
            "CheckBox": ng_DIPropertyControl('wfrCheckBox', { Level: 'advanced' }, 'ngCheckBox')
          }
        })
      };
    };
    ngRegisterControlDesignInfo('wfrMessageDlg',wfrMessageDlgDI);
    ngRegisterControlDesignInfo('wfrMessageBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Icon": ng_DIPropertyControl('ngImage', { Level: 'advanced' }, 'ngText')
          }
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    function wfrDlgInputBoxDI(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','wfrMessageDlg',{Level: 'advanced'})
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('wfrDlgInputBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('wfrEdit', { Level: 'advanced' }, 'ngEdit')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDlgDropDownBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('wfrDropDown', { Level: 'advanced' }, 'ngDropDown')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDlgDropDownListBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('wfrDropDownList', { Level: 'advanced' }, 'ngDropDownList')
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDlgDropDownTreeListBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('wfrDropDownList', { Level: 'advanced' }, 'ngDropDownList')
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('wfrDlgMemoBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('wfrMemo', { Level: 'advanced' }, 'ngMemo')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrDlgInputBoxDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('wfrDlgListBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','wfrMessageDlg',{Level: 'advanced'}),
          "ModifyControls": {
            "List": ng_DIPropertyControl('wfrList', { Level: 'advanced' }, 'ngList')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    ngRegisterControlDesignInfo('wfrDlgProgressBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Progress": ng_DIPropertyControl('wfrProgressBar', { Level: 'advanced' }, 'ngProgressBar')
          }
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    ngRegisterControlDesignInfo('wfrDlgWaitBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Progress": ng_DIPropertyControl('wfrProgressDot', { Level: 'advanced' }, 'ngProgressDot')
          }
        })
      };
      ng_MergeVar(di,wfrMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    ngRegisterControlDesignInfo('wfrDlgAbout',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','wfrDlgMessageBox',{Level: 'advanced'}),
          "DlgIcon": ng_DIProperty(['null','ngListStringItems'],undefined, { InitType: 'ngListItems', Level: 'basic' }),
          "ModifyControls": {
            "Message": { DefaultType: 'control', Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: ng_DIProperties({
                    "className": ng_DIProperty('string', 'wfrAboutMessage', { Level: 'advanced' })
                  })
                }
              }
            },
            "AppInfo": ng_DIPropertyControl('wfrTreeList', { Level: 'advanced' }, 'ngTreeList')
          }
        })
      };
    });

    ngRegisterControlDesignInfo('wfrViewModelForm',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "ErrorHint": ng_DIPropertyControl('wfrTextHint', { Level: 'advanced' }, 'ngTextHint', ng_DIProperties({
              "className": ng_DIProperty('string', 'wfrEditFieldError', { Level: 'advanced' })
            }))
          }
        })
      };
    });

    function wfrEditFieldDI (d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "Data": {
            "HintX": ng_DIProperty('integer',10,{ Level: 'basic' }),
            "HintXY": ng_DIProperty('integer',17,{ Level: 'basic' })
          },
          "ErrorHint": ng_DIPropertyControl('wfrTextHint', { Level: 'advanced' }, 'ngTextHint', ng_DIProperties({
            "className": ng_DIProperty('string', 'wfrEditFieldError', { Level: 'advanced' }),
            "Data": {
              "Anchor": ng_DIProperty('string', 'topleft|bottomleft|left', { Level: 'advanced' })
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