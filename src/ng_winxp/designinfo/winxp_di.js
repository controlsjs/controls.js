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
var WinXP_DesignInfo = {
  OnInit: function() {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('stdPanel',function(d,c,ref) {
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
    ngRegisterControlDesignInfo('stdFrame',function(d,c,ref) {
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
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpText'
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
    ngRegisterControlDesignInfo('stdImage',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpImage'
              }
            }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdCheckBox',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpCheckBox'
              }
            }
          },
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
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
            "LeftImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.CheckBoxLeft' }
              }
            },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdRadioButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpRadio'
              }
            }
          },
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
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
            "LeftImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.RadioLeft' }
              }
            },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpButton'
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
                'image': { DefaultValue: 'WinXPControls.Images.DefButton.LeftImg' }
              }
            },
            "MiddleImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.DefButton.MiddleImg' }
              }
            },
            "RightImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.DefButton.RightImg' }
              }
            }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdFlatButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "style": {
            "color": { Level: 'advanced' },
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpFlatButton'
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
    ngRegisterControlDesignInfo('stdLabel',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpLabel'
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
    ngRegisterControlDesignInfo('stdLink',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpLink'
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

    function stdGroupDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpGroupBox'
              }
            }
          },
          "Data": {
            "Frame": { Level: 'advanced',
              Types: {
                'img_frame': {
                  ObjectProperties: {
                    "LeftTop": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.LeftTop' }
                      }
                    },
                    "Top": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.Top' }
                      }
                    },
                    "RightTop": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.RightTop' }
                      }
                    },
                    "Left": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.Left' }
                      }
                    },
                    "Right": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.Right' }
                      }
                    },
                    "LeftBottom": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.LeftBottom' }
                      }
                    },
                    "Bottom": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.Bottom' }
                      }
                    },
                    "RightBottom": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.RightBottom' }
                      }
                    }
                  }
                }
              }
            }
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
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpEdit'),
          "DropDown": {
            Types: {
              'control': {
                ObjectProperties: ng_DIProperties({
                  "className": ng_DIProperty('string', 'wxpDropDown', { Level: 'advanced' })
                })
              }
            }
          },
          "Data": {
            "LeftImg": ng_DIProperty('image', 'WinXPControls.Images.Edit.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_DIProperty('image', 'WinXPControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_DIProperty('image', 'WinXPControls.Images.Edit.RightImg', { Level: 'advanced' })
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
        Properties: ng_DIProperties({
          "Buttons": { Level: 'advanced' },
          "Events": {
            "OnElipsis": ng_DIPropertyEvent('function(c, text) {}', { Level: 'basic' })
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
        Properties: ng_DIProperties({
          "Data": {
            "H": ng_DIProperty('integer', 'WinXPControls.Images.Edit.MiddleImg.H', { Level: 'advanced' }),
            "LeftDef": { Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: {
                    "W": ng_DIProperty('integer', 'WinXPControls.Images.Edit.LeftImg.W', { Level: 'advanced' }),
                    "LeftImg": ng_DIProperty('image', 'WinXPControls.Images.Edit.LeftImg', { Level: 'advanced' }),
                    "MiddleImg": ng_DIProperty('image', 'WinXPControls.Images.Edit.MiddleImg', { Level: 'advanced' })
                  }
                }
              }
            },
            "EditDef": { Level: 'advanced',
              Types: {
                'control': {
                  Type: 'stdEdit',
                  ObjectProperties: {
                    "MiddleImg": ng_DIProperty('image', 'WinXPControls.Images.Edit.MiddleImg', { Level: 'advanced' })
                  }
                }
              }
            },
            "StaticDef": { Level: 'advanced',
              Types: {
                'control': {
                  Type: 'stdLabel',
                  ObjectProperties: {
                    "MiddleImg": ng_DIProperty('image', 'WinXPControls.Images.Edit.MiddleImg', { Level: 'advanced' })
                  }
                }
              }
            },
            "RightDef": { Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: {
                    "W": ng_DIProperty('integer', 'WinXPControls.Images.Edit.RightImg.W', { Level: 'advanced' }),
                    "MiddleImg": ng_DIProperty('image', 'WinXPControls.Images.Edit.MiddleImg', { Level: 'advanced' }),
                    "RightImg": ng_DIProperty('image', 'WinXPControls.Images.Edit.RightImg', { Level: 'advanced' })
                  }
                }
              }
            }
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
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpMemo', { Level: 'advanced' }),
          "Data": {
            "Frame": ng_DIProperty('img_frame', 'WinXPControls.Images.Memo', { Level: 'advanced' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('stdMemo', stdMemoDI);
    
    ngRegisterControlDesignInfo('stdPages',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpPages', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdToolBar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpToolBar', { Level: 'advanced' })
        })
      };
    });
    
    /*ngRegisterControlDesignInfo('stdWebBrowser',function(d,c,ref) {
      return {
      };
    });*/
    
    ngRegisterControlDesignInfo('stdProgressBar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpProgressBar', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_DIProperty('image', 'WinXPControls.Images.ProgressBar.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_DIProperty('image', 'WinXPControls.Images.ProgressBar.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_DIProperty('image', 'WinXPControls.Images.ProgressBar.RightImg', { Level: 'advanced' }),
            "BarImg": ng_DIProperty('image', 'WinXPControls.Images.ProgressBar.BarImg', { Level: 'advanced' })
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
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpLabel', { Level: 'advanced' }),
          "Data": {
            "TextAlign": ng_DIProperty('string', 'center', { Level: 'advanced' }),
            "HTMLEncode": ng_DIPropertyBool(false),
          }
        })
      };
    });

    function stdListDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpListBox', { Level: 'advanced' }),
          Data: {
            "TreeImg": ng_DIProperty('image', 'WinXPControls.Images.TreeImgTriangle', { Level: 'advanced' })
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
    ngRegisterControlDesignInfo('stdList',stdListDI);
    ngRegisterControlDesignInfo('stdListBox',function(d,c,ref) {
      var di=stdListDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    ngRegisterControlDesignInfo('stdTreeList',function(d,c,ref) {
      var di=stdListDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function stdPageListDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpListBox', { Level: 'advanced' }),
          Data: {
            "AverageItemHeight" : ng_DIProperty('integer', 20, { Level: 'advanced' })
          },
          "ModifyControls": {
            "List": ng_DIPropertyControl('stdList', { Level: 'basic' }, 'ngList'),
            "Loading": ng_DIPropertyControl('stdProgressDot', { Level: 'advanced' }),
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
            "FirstPage": ng_DIPropertyControl('stdFlatButton', { Level: 'advanced' }, 'ngButton'),
            "PrevPage": ng_DIPropertyControl('stdFlatButton', { Level: 'advanced' }, 'ngButton'),
            "PageNo": ng_DIPropertyControl('stdEdit', { Level: 'advanced' }, 'ngEdit'),
            "Page0": ng_DIPropertyControl('stdFlatButton', { Level: 'advanced' }, 'ngButton'),
            "NextPage": ng_DIPropertyControl('stdFlatButton', { Level: 'advanced' }, 'ngButton'),
            "LastPage": ng_DIPropertyControl('stdFlatButton', { Level: 'advanced' }, 'ngButton')
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdPageList',stdPageListDI);
    ngRegisterControlDesignInfo('stdPageTreeList',function(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "ModifyControls": {
            "List": ng_DIPropertyControl('stdTreeList', { Level: 'basic' }, 'ngList')
          }
        })
      };
      ng_MergeVar(di,stdPageListDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('stdSplitPanel',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpSplitPanel', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdDropPanel',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpDropPanel', { Level: 'advanced' })
        })
      };
    });
    
    function stdWindowDI(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_DIProperties({
          "Data": {
            "FormID": { Level: 'advanced' },
            "LeftTop": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Window.LeftTop' }
              }
            },
            "Top": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Window.Top' }
              }
            },
            "RightTop": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Window.RightTop' }
              }
            },
            "Left": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Window.Left' }
              }
            },
            "Right": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Window.Right' }
              }
            },
            "LeftBottom": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Window.LeftBottom' }
              }
            },
            "Bottom": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Window.Bottom' }
              }
            },
            "RightBottom": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Window.RightBottom' }
              }
            }
          },
          "Events": {
            "OnDblClick": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdWindow',function(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpWindow', { Level: 'advanced' })
        })
      };
      ng_MergeVar(di,stdWindowDI(d,c,ref));
      return di;
    });    
    ngRegisterControlDesignInfo('stdDialog',function(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpDialog', { Level: 'advanced' }),
          "Modal": ng_DIPropertyBool(true),
          "Visible": ng_DIPropertyBool(false),
          "Sizeable": ng_DIPropertyBool(false),
          "Centered": ng_DIPropertyBool(true)
        })
      };
      ng_MergeVar(di,stdWindowDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('stdHint',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpHint', { Level: 'advanced' })
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdTextHint',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpTextHint', { Level: 'advanced' })
        })
      };
    });
    
    function stdMessageDlgDI(d,c,ref) {
      return {
        ControlCategory: 'Dialogs',
        IsContainer: false,
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','stdDialog',{Level: 'advanced'}),
          "ModifyControls": {
            "Message": ng_DIPropertyControl('stdText', { Level: 'advanced' }, 'ngText'),
            "OK": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton'),
            "Yes": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton'),
            "No": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton'),
            "Cancel": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton'),
            "CheckBox": ng_DIPropertyControl('stdCheckBox', { Level: 'advanced' }, 'ngCheckBox')
          }
        })
      };
    };
    ngRegisterControlDesignInfo('stdMessageDlg',stdMessageDlgDI);
    ngRegisterControlDesignInfo('dlgMessageBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Icon": ng_DIPropertyControl('stdImage', { Level: 'advanced' }, 'ngText')
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      return di;
    });
    
    function dlgInputBoxDI(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','stdMessageDlg',{Level: 'advanced'})
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('dlgInputBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('stdEdit', { Level: 'advanced' }, 'ngEdit')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('dlgDropDownBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('stdDropDown', { Level: 'advanced' }, 'ngDropDown')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('dlgDropDownListBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('stdDropDownList', { Level: 'advanced' }, 'ngDropDownList')
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('dlgMemoBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Edit": ng_DIPropertyControl('stdMemo', { Level: 'advanced' }, 'ngMemo')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgListBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','stdMessageDlg',{Level: 'advanced'}),
          "ModifyControls": {
            "List": ng_DIPropertyControl('stdList', { Level: 'advanced' }, 'ngList')
          },
          "Events": {
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgProgressBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Progress": ng_DIPropertyControl('stdProgressBar', { Level: 'advanced' }, 'ngProgressBar')
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgWaitBox',function(d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "Progress": ng_DIPropertyControl('stdProgressDot', { Level: 'advanced' }, 'ngProgressDot')
          }
        })
      };
      ng_MergeVar(di,stdMessageDlgDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });
    
    ngRegisterControlDesignInfo('dlgAbout',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','dlgMessageBox',{Level: 'advanced'}),
          "DlgIcon": ng_DIProperty(['null','ngListStringItems'],undefined, { InitType: 'ngListItems', Level: 'basic' }),
          "ModifyControls": {
            "Message": { DefaultType: 'control', Level: 'advanced',
              Types: {
                'control': {
                  ObjectProperties: ng_DIProperties({
                    "className": ng_DIProperty('string', 'wxpAboutMessage', { Level: 'advanced' })
                  })
                }
              }
            },
            "AppInfo": ng_DIPropertyControl('stdTreeList', { Level: 'advanced' }, 'ngTreeList')
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdCalendar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpCalendar', { Level: 'advanced' })
        })
      };
    });
    
    function stdEditDateDI(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpEdit', { Level: 'advanced' }),
          "DropDown": ng_DIPropertyControl('stdCalendar', { Level: 'basic' }, 'ngCalendar', ng_DIProperties({
            "Data": {
              "className": ng_DIProperty('string', 'wxpCalendar', { Level: 'advanced' })
            }
          }))
        })
      };
      ng_MergeVar(di,stdEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('stdEditDate',stdEditDateDI);
    
    function stdEditTimeDI(d,c,ref) {
      var di={
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpEdit', { Level: 'advanced' }),
          "DropDown": ng_DIPropertyControl('stdList', { Level: 'basic' }, 'ngList', ng_DIProperties({
            "Data": {
              "className": ng_DIProperty('string', 'wxpDropDown', { Level: 'advanced' })
            }
          })),
          "Events": {
            "OnDropDown": ng_DIPropertyEvent('function(c, l) { return true; }', { Level: 'basic' }),
            "OnListItemChanged": ng_DIPropertyEvent('function(c, l, it, oit) { return false; }', { Level: 'basic' })
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
        Properties: ng_DIProperties({
          'Data': {
            'AutoHeight': ng_DIPropertyBool(true, { Level: 'basic' }),
            'AsToolbar': ng_DIPropertyBool(true, { Level: 'basic' }),
            'Vertical': ng_DIPropertyBool(true, { Level: 'basic' })
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
        Properties: ng_DIProperties({
          'DropDown': ng_DIPropertyControl('stdColorPickerBox', { Level: 'basic' }, 'stdColorPickerBox', ng_DIProperties({
            'Data': {
              'MaxHeight': ng_DIProperty('integer',480,{ Level: 'basic' })
            }
          }))
        })
      };
    });

    ngRegisterControlDesignInfo('stdColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        NewControl: {
          _noMerge:true
        },
        Properties: ng_DIProperties({
          'ModifyControls': {
            'Picker': ng_DIPropertyControl('stdColorPickerBox', { Level: 'basic' }, 'stdColorPickerBox', ng_DIProperties({
              'W': ng_DIProperty('bounds',196,{ Level: 'basic' })
            }))
          }
        }, { "ModifyControls": { Level: 'basic' } })
      };
    }); 
    
    ngRegisterControlDesignInfo('stdMenu',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpMenu', { Level: 'advanced' }),
          "ModifyControls": {
            "SubMenuDef": ng_DIPropertyControl('stdNenu', { Level: 'advanced' }, 'ngMenu')
          },
          "Events": {
            "OnGetCheckImg": ng_DIPropertyEvent('function(c, l, i) { return true; }', { Level: 'basic' })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdMenuBar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpMenuBar', { Level: 'advanced' })
        })
      };
    });
    
    /*ngRegisterControlDesignInfo('stdMenuBarButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpMenuBarButton', { Level: 'advanced' })
        })
      };
    });*/
    
    ngRegisterControlDesignInfo('stdSplitButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpSplitButton', { Level: 'advanced' }),
          "Data": {
            "LeftImg": ng_DIProperty('image', 'WinXPControls.Images.Button.LeftImg', { Level: 'advanced' }),
            "MiddleImg": ng_DIProperty('image', 'WinXPControls.Images.Button.MiddleImg', { Level: 'advanced' }),
            "RightImg": ng_DIProperty('image', 'WinXPControls.Images.Button.MenuRightBtnImg', { Level: 'advanced' }),
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdFileUploader',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpFileUploader', { Level: 'advanced' }),
          /*"Events": {
            "OnError": ng_DIPropertyEvent('function(c, error, data) {}', { Level: 'basic' }),
            "OnUploadProgress": ng_DIPropertyEvent('function(c, p) { return true; }', { Level: 'basic' }),
            "OnShowWaiting": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnHideWaiting": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          },*/
          "ModifyControls": {
            "ListFiles": ng_DIPropertyControl('stdList', { Level: 'advanced' }, 'ngList'),
            "DragAndDropInfo": ng_DIPropertyControl('stdText', { Level: 'advanced' }),
            "BtnAddFile": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton'),
            "BtnRemoveFiles": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton')
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('stdViewModelForm',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "ErrorHint": ng_DIPropertyControl('stdTextHint', { Level: 'advanced' }, 'ngTextHint', ng_DIProperties({
              "className": ng_DIProperty('string', 'wxpEditFieldError', { Level: 'advanced' })
            }))
          }
        })
      };
    });
    
    function stdEditFieldDI (d,c,ref) {
      var di = {
        Properties: ng_DIProperties({
          "Data": {
            "HintX": ng_DIProperty('integer',0,{ Level: 'basic' }),
          },
          "ErrorHint": ng_DIPropertyControl('stdTextHint', { Level: 'advanced' }, 'ngTextHint', ng_DIProperties({
            "className": ng_DIProperty('string', 'wxpEditFieldError', { Level: 'advanced' })
          }))
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
    ngRegisterControlDesignInfo('stdDataSet',function(d,c,ref) {
      var di=stdPageListDI(d,c,ref);
      ng_MergeVar(di,stdEditFieldDI(d,c,ref));
      return di;
    });
    
    /*ngRegisterControlDesignInfo('stdDBViewModelForm',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "Events": {
            "OnDeleteQuery": ng_DIPropertyEvent('function(c,querytxt,successfnc,failfnc) {}', { Level: 'basic' }),
            "OnChangedQuery": ng_DIPropertyEvent('function(c,querytxt,successfnc,failfnc) {}', { Level: 'basic' })
          }
        })
      };
    });*/
    
    ngRegisterControlDesignInfo('stdDBToolBar',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": ng_DIProperty('string', 'wxpToolBar', { Level: 'advanced' }),
          "ModifyControls": {
            "New": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton'),
            "Delete": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton'),
            "Insert": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton'),
            "Update": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton'),
            "Cancel": ng_DIPropertyControl('stdButton', { Level: 'advanced' }, 'ngButton')
          }
        })
      };
    });
    

    ngRegisterControlDesignInfo('stdDBDataSet',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "ModifyControls": {
            "NewRecord": ng_DIPropertyControl('stdFlatButton', { Level: 'advanced' }, 'ngButton'),
            "LoadRecord": ng_DIPropertyControl('stdFlatButton', { Level: 'advanced' }, 'ngButton'),
            "DeleteRecord": ng_DIPropertyControl('stdFlatButton', { Level: 'advanced' }, 'ngButton'),
            "Refresh": ng_DIPropertyControl('stdFlatButton', { Level: 'advanced' }, 'ngButton')
          }
        })
      };
    });
  }
};
ngUserControls['winxp_designinfo'] = WinXP_DesignInfo;