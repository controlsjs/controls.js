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
ngUserControls['list_designinfo'] = {
  OnFormEditorInit: function(FE) {
    var list_types = [
      // ngListCol
      {
        TypeID: 'ngListCol',
        TypeBase: 'object',
        Name: 'ngListCol',
        ShortName: 'col',
        Basic: false,
        Options: {
          ObjectProperties: {
            "ID": { DefaultType: 'string', Level: 'basic', Order: 0.4 },
            "Caption": { DefaultType: 'string', Level: 'basic', Order: 0.41 },
            "Align": ng_DIPropertyStrings('left', ['left','center','right'], { Level: 'basic' }),
            "VAlign": ng_DIPropertyStrings('top', ['top','middle','bottom','baseline'], { Level: 'basic' }),
            "Width": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic',
              Types: {
                'integer': {
                  InitValue: 100
                }
              }
            }
          }
        }
      },
      // ngListItem
      {
        TypeID: 'ngListItem',
        TypeBase: 'object',
        Name: 'ngListItem',
        ShortName: 'item',
        Basic: false,
        Options: {
          ObjectProperties: {
            "Text": { DefaultType: 'undefined', InitType: 'string', Level: 'basic', Order: 0.4,
              Types: {
                'string': {},
                'object': {
                  ChildDesignInfo: {
                    DefaultType: 'string'
                  }
                }
              },
              OnPropertyInit: function(ch)
              {
                if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'string'))
                {
                  var tmp = ch.Name.split('.');
                  var itemID = ng_toInteger(tmp[tmp.length - 2]);
                  if (!isNaN(itemID)) ch.Value = 'Item ' + (itemID + 1);
                }

                return true;
              }
            },
            "Action": { DefaultType: 'string', Level: 'basic'
              // TODO: browse from existing actions
            },
            "Alt": { DefaultType: 'undefined', InitType: 'string', Level: 'basic',
              Types: {
                'string': {},
                'object': {
                  ChildDesignInfo: {
                    DefaultType: 'string'
                  }
                }
              }
            },
            "ID": { DefaultType: 'undefined', InitType: 'string', Level: 'basic' },
            "Checked": ng_DIPropertyIntConstants(0,['nglUnchecked','nglChecked','nglGrayed'],{ Level: 'basic' }),
            "CheckGroup": ng_DIPropertyBool(false, { DefaultType: 'undefined', InitType: 'boolean', Level: 'basic' }),
            "AllowGrayed": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Collapsed": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Visible": ng_DIPropertyBool(true, { Level: 'basic' }),
            "Enabled": ng_DIPropertyBool(true, { Level: 'basic' }),
            "RadioGroup": { DefaultType: 'undefined', InitType: 'string', Level: 'basic'
              // TODO: browse from existing radio groups
            },
            "RadioAllowUncheck": ng_DIPropertyBool(false, { Level: 'basic' }),
            "H": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic' },
            "MinHeight": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic' },
            "Image": { DefaultType: 'image', Level: 'basic' },
            "Parent": { DefaultType: 'undefined', Level: 'hidden',
              Types: {
                'object': {},
                'null': {}
              }
            },
            "Items": { DefaultType: 'undefined', InitType: 'ngListItems', Level: 'basic',
              Types: {
                'ngListStringItems': {}
              }
            },
            "Controls": { DefaultType: 'controls', Level: 'basic',
              PropertyGroup: 'Controls',
              Types: {
                'controls': {
                  DestroyIfEmpty: true,
                  ChildDesignInfo: {
                    PropertyGroup: 'Controls'
                  }
                }
              }
            },
            "ControlsHolder": { DefaultType: 'undefined', Level: 'hidden',
              Types: {
                'object': {}
              }
            },
            "OnClick": ng_DIPropertyEvent('function(e) { return true; }', { Order: 0.9 }),
            "OnDblClick": ng_DIPropertyEvent('function(e) { return true; }', { Order: 0.9 }),
            "OnClickItem": ng_DIPropertyEvent('function(e) {}', { Order: 0.9 }),
            "OnCollapsing": ng_DIPropertyEvent('function(c, it) { return true; }', { Order: 0.9 }),
            "OnCollapsed": ng_DIPropertyEvent('function(c, it) {}', { Order: 0.9 }),
            "OnExpanding": ng_DIPropertyEvent('function(c, it) { return true; }', { Order: 0.9 }),
            "OnExpanded": ng_DIPropertyEvent('function(c, it) {}', { Order: 0.9 })
          }
        }
      },

      // ngListColumns
      {
        TypeID: 'ngListColumns',
        TypeBase: 'array',
        Name: 'ngListColumns',
        ShortName: 'cols',
        Basic: false,
        Options: {
          Priority: 0.52,
          ChildDesignInfo: {
            DefaultType: 'ngListCol', Level: 'basic',
            Collapsed: true,
            OnPropertyInit: function(ch)
            {
              if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'object'))
              {
                var pname = ch.Name.substring(0, ch.Name.lastIndexOf('.'));
                if (pname)
                {
                  var controlsprops = FormEditor.GetControlsProperty(pname, [ch.ControlID]);
                  var itemscnt = (controlsprops[0] && (ng_IsArrayVar(controlsprops[0].PropertyValue)) ) ? controlsprops[0].PropertyValue.length : 0;

                  if (!ch.Value || typeof ch.Value !== 'object') ch.Value = {};
                  ch.Value.Caption = "'Column" + (itemscnt + 1) + "'";
                  ch.Value.ID = "'c" + (itemscnt + 1) + "'";
                }
              }
              return true;
            }
          }
        }
      },

      // ngListItems
      {
        TypeID: 'ngListItems',
        TypeBase: 'array',
        Name: 'ngListItems',
        ShortName: 'items',
        Basic: false,
        Options: {
          Priority: 0.52,
          ChildDesignInfo: {
            DefaultType: 'ngListItem', Level: 'basic',
            Collapsed: false,
            OnPropertyInit: function(ch)
            {
              if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'object'))
              {
                var pname = ch.Name.substring(0, ch.Name.lastIndexOf('.'));
                if (pname)
                {
//                  var columns = FormEditor.GetControlsProperty('Columns', [ch.ControlID]);
//                  var hascolumns = (columns[0] && (ng_IsArrayVar(columns[0].PropertyValue))) ? columns[0].PropertyValue.length>0 : false;

                  var controlsprops = FormEditor.GetControlsProperty(pname, [ch.ControlID]);
                  var itemscnt = (controlsprops[0] && (ng_IsArrayVar(controlsprops[0].PropertyValue)) ) ? controlsprops[0].PropertyValue.length : 0;

                  if (!ch.Value || typeof ch.Value !== 'object') ch.Value = {};
                  var columnid = FormEditor.GetControlsProperty('Data.Columns.0.ID', [ch.ControlID]);
                  if((columnid[0])&&(columnid[0].PropertyType==='string')&&(ngVal(columnid[0].PropertyValue,'')!='')) {
                    ch.Value.Text = "{ '" + columnid[0].PropertyValue + "': 'Item " + (itemscnt + 1) + "' }";
                  }
                  else ch.Value.Text = "'Item " + (itemscnt + 1) + "'";
                }
              }

              return true;
            }
          }
        },
        Detect: function(esprimanode, raw, options)
        {
          if (ng_IsOverriden(this.Detect))
          {
            if (!this.Detect.callParent.apply(this, arguments)) return false;
          }

          // exclude arrays of strings
          var elms = esprimanode.elements;
          if (elms && elms.length > 0)
          {
            for (var i = 0; i < elms.length; i++)
            {
              if (!elms[i] || elms[i].type !== 'Literal' || typeof elms[i].value !== 'string')
              {
                return true;
              }
            }
            return false;
          }

          return true;
        },
        Read: function(v, type, Interface)
        {
          if (ng_IsOverriden(this.Read)) v = this.Read.callParent.apply(this, arguments);

          if (FormEditor.PropertyTypeInheritsFrom(type, 'ngListStringItems'))
          {
            if (ng_IsArrayVar(v))
            {
              for (var i = 0; i < v.length; i++)
              {
                v[i] = "{ Text: " + v[i] + " }";
              }
            }
          };

          return v;
        }
      },

      // ngListStringItems
      {
        TypeID: 'ngListStringItems',
        TypeBase: 'array_strings',
        Name: 'ngListStringItems',
        ShortName: 'items',
        Basic: false,
        Parse: true,
        Options: {
          Priority: 0.51,
          ChildDesignInfo: {
            DefaultType: 'string', Level: 'basic',
            Collapsed: false,
            OnPropertyInit: function(ch)
            {
              if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'string'))
              {
                var tmp = ch.Name.split('.'),
                    itemID = ng_toInteger(tmp[tmp.length - 1]);
                if (!isNaN(itemID)) ch.Value = 'Item ' + (itemID + 1);
              }

              return true;
            }
          }
        },
        Read: function(v, type, Interface)
        {
          if (ng_IsOverriden(this.Read)) v = this.Read.callParent.apply(this, arguments);

          if (FormEditor.PropertyTypeInheritsFrom(type, 'ngListItems'))
          {
            if (ng_IsArrayVar(v))
            {
              var node = Interface.GetEsprimaNode();
              if (node)
              {
                var v2 = [];
                for (var i = 0; i < node.elements.length; i++)
                {
                  var str = '';
                  if (node.elements[i])
                  {
                    switch(node.elements[i].type)
                    {
                      case 'ObjectExpression':
                        var props = node.elements[i].properties;
                        for (var j in props)
                        {
                          if (props[j] && props[j].key && props[j].key.name === 'Text' && props[j].value && props[j].value.type === 'Literal' && typeof props[j].value.value === 'string')
                          {
                            str = props[j].value.value;
                            break;
                          }
                        }
                        break;

                      case 'Literal':
                        if (typeof node.elements[i].value === 'string') str = node.elements[i].value;
                        break;
                    }
                  }

                  v2.push("'" + str + "'");
                }

                return v2;
              }
            }
          };

          return v;
        }
      }
    ];

    FormEditor.RegisterPropertyType(list_types);
  },

  //OnControlDesignInfo: function(def, c, ref) {},

  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngList',function(d,c,ref) {
      return {
        ControlCategory: 'Lists',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 200 },
              "Data": {
                ObjectProperties: {
                  "HTMLEncode": { Value: true },
                  "Items": { Type: 'ngListItems',
                    ObjectProperties: {
                      0: {
                        Type: 'ngListItem',
                        Value: {
                          Text: "'Item 1'"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "Multi Column": {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 200 },
              "Data": {
                ObjectProperties: {
                  "HTMLEncode": { Value: true },
                  "Columns": { Type: 'ngListColumns',
                    ObjectProperties: {
                      0: {
                        Type: 'ngListCol',
                        Value: {
                          Caption: "'Column1'",
                          ID: "'c1'"
                        }
                      }
                    }
                  },
                  "Items": { Type: 'ngListItems',
                    ObjectProperties: {
                      0: {
                        Type: 'ngListItem',
                        Value: {
                          Text: "{ 'c1': 'Item 1' }"
                        }
                      }
                    }
                  }
                }
              }
            }
          }

        },
        Properties: ng_DIProperties({
          "Data": {
            "Columns": { DefaultType: 'ngListColumns', Level: 'basic' },
            "Items": { DefaultType: 'ngListItems', Level: 'basic',
              Collapsed: true,
              Types: {
                'ngListItems': {},
                'ngListStringItems': {}
              }
            },
            "HTMLEncode": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  DefaultValue: ngVal(ngDefaultHTMLEncoding,false),
                  InitValue: true
                }
              }
            },
            "ListIndent": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic' },
            "DefaultIndent": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic' },
            "Indent": { DefaultType: 'null', InitType: 'integer', Level: 'basic',
              Types: {
                'null': {},
                'integer': {},
                'array': {
                  ChildDesignInfo: {
                    DefaultType: 'integer'
                  }
                }
              }
            },
            "ShowCheckboxes": ng_DIPropertyBool(false, { Level: 'basic' }),
            "RadioAllowUncheck": ng_DIPropertyBool(false, { Level: 'basic' }),
            "ShowHeader": ng_DIPropertyBool(true, { Level: 'basic' }),
            "CheckImg": { DefaultType: 'image', Level: 'basic' },
            "TreeImg": { DefaultType: 'image', Level: 'basic' },
            "ItemImg": { DefaultType: 'image', Level: 'basic' },
            "KeyEvents": ng_DIPropertyBool(true, { Level: 'basic' }),
            "PageSize": ng_DIProperty('integer', 10, { Level: 'basic' }),
            "ItemHeight": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic',
              Types: {
                'integer': {
                  InitValue: 12
                }
              }
            },
            "MinItemHeight": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic' },
            "MouseEvents": ng_DIPropertyBool(true, { Level: 'basic' }),
            "ReadOnly": ng_DIPropertyBool(false, { Level: 'basic' }),
            "SelectType": ng_DIPropertyIntConstants(0,['nglSelectNone','nglSelectSingle','nglSelectMulti','nglSelectMultiExt','nglSelectSingleExt'],{ Level: 'basic' }),
            "SelCount": { DefaultType: 'integer', Level: 'hidden' },
            "SortColumn": { DefaultType: 'string', Level: 'basic' },
            "SortDir": ng_DIPropertyIntConstants(0,['nglSortAsc','nglSortDesc'],{ Level: 'basic' }),
            "SortCaseSensitive": ng_DIPropertyBool(false, { Level: 'basic' }),
            "CheckedChangedDelay": { DefaultType: 'integer', Level: 'basic' },
            "ItemsControls": { DefaultType: 'controls_array', Level: 'hidden' },
            "ParentReferences": { Level: 'basic' },
            "Frame": { DefaultType: 'img_frame', Level: 'basic',
              Collapsed: true
            }
          },
          "Events": {
            "OnAdd": ng_DIPropertyEvent('function(c, it, parent) { return true; }', { Level: 'basic' }),
            "OnRemove": ng_DIPropertyEvent('function(c, it, parent) {}', { Level: 'basic' }),
            "OnItemsChanged": ng_DIPropertyEvent('function(c, items) {}', { Level: 'basic' }),
            "OnExpanding": ng_DIPropertyEvent('function(c, it) { return true; }', { Level: 'basic' }),
            "OnExpanded": ng_DIPropertyEvent('function(c, it) {}', { Level: 'basic' }),
            "OnCollapsing": ng_DIPropertyEvent('function(c, it) { return true; }', { Level: 'basic' }),
            "OnCollapsed": ng_DIPropertyEvent('function(c, it) {}', { Level: 'basic' }),
            "OnItemCheckChanged": ng_DIPropertyEvent('function(c, it) {}', { Level: 'basic' }),
            "OnCheckChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnSetItemVisible": ng_DIPropertyEvent('function(c, it) {}', { Level: 'basic' }),
            "OnSetItemEnabled": ng_DIPropertyEvent('function(c, it) {}', { Level: 'basic' }),
            "OnSelectChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnRedrawSelected": ng_DIPropertyEvent('function(c, elm, selected, itemid) {}', { Level: 'advanced' }),
            "OnClickItem": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnDblClickItem": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnDblClick": ng_DIPropertyEvent('function(e) { return true; }'),
            "OnClick": ng_DIPropertyEvent('function(e) { return true; }'),
            "OnCaptionClick": ng_DIPropertyEvent('function(e, list, colid, startelm) {}', { Level: 'basic' }), // TODO: Check startelm
            "OnCaptionDblClick": ng_DIPropertyEvent('function(e, list, colid, startelm) {}', { Level: 'basic' }), // TODO: Check startelm'
            "OnKeyDown": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnKeyUp": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnScroll": ng_DIPropertyEvent('function(c, e, contentelm) { return true; }', { Level: 'basic' }),
            "OnMouseEnter": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnMouseLeave": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnEnterRow": ng_DIPropertyEvent('function(c, it, eid) {}', { Level: 'basic' }),
            "OnLeaveRow": ng_DIPropertyEvent('function(c, it, eid) {}', { Level: 'basic' }),
            "OnFocus": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnBlur": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnDrawItem": ng_DIPropertyEvent('function(c, retval, html, it, id, level, pcollapsed) { return true; }', { Level: 'basic' }),
            "OnDrawItemText": ng_DIPropertyEvent('function(c, html, it, id, level) { return true; }', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetText": ng_DIPropertyEvent('function(c, it, colid) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c, it, colid) { return ""; }', { Level: 'basic' }),
            "OnCompareItem": ng_DIPropertyEvent('function(c, a, b) { return 0; }', { Level: 'basic' }),
            "OnGetRowClassName": ng_DIPropertyEvent('function(c, it, id) { return ""; }', { Level: 'basic' }),
            "OnMeasureItem": ng_DIPropertyEvent('function(c, it, id, level) { return it.H; }', { Level: 'basic' }),
            "OnCalcIndent": ng_DIPropertyEvent('function(c, it, id, level) { return level*10; }', { Level: 'basic' }),
            "OnGetItemImg": ng_DIPropertyEvent('function(c, it, id, level) { return null; }', { Level: 'basic' }),
            "OnGetCheckImg": ng_DIPropertyEvent('function(c, it, id) { return null; }', { Level: 'basic' }),
            "OnGetTreeImg": ng_DIPropertyEvent('function(c, it, id) { return null; }', { Level: 'basic' }),
            "OnGetColumnCaption": ng_DIPropertyEvent('function(c, col, i) { return "Column"+(i+1); }', { Level: 'basic' }),
            "OnGetColumnWidth": ng_DIPropertyEvent('function(c, col, i, caption) { return 0; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngPageList',function(d,c,ref) {
      return {
        ControlCategory: 'Lists',
        IsContainer: false,
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 200 },
              "ModifyControls": {
                ObjectProperties: {
                  "List": {
                    ObjectProperties: {
                      "Data": {
                        Type: 'object',
                        ObjectProperties: {
                          "HTMLEncode": { Type: 'boolean', Value: true },
                          "Items": { Type: 'ngListItems',
                            ObjectProperties: {
                              0: {
                                Type: 'ngListItem',
                                Value: {
                                  Text: "'Item 1'"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "Multi Column": {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 200 },
              "ModifyControls": {
                ObjectProperties: {
                  "List": {
                    ObjectProperties: {
                      "Data": {
                        Type: 'object',
                        ObjectProperties: {
                          "HTMLEncode": { Type: 'boolean', Value: true },
                          "Columns": { Type: 'ngListColumns',
                            ObjectProperties: {
                              0: {
                                Type: 'ngListCol',
                                Value: {
                                  Caption: "'Column1'",
                                  ID: "'c1'"
                                }
                              }
                            }
                          },
                          "Items": { Type: 'ngListItems',
                            ObjectProperties: {
                              0: {
                                Type: 'ngListItem',
                                Value: {
                                  Text: "{ 'c1': 'Item 1' }"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "DisplayMode": ng_DIPropertyIntConstants(1,['plDisplayFixed','plDisplayFit'],{ Level: 'basic' }),
            "PagingType": { DefaultType: 'bitmask', Level: 'basic',
              Types: {
                'bitmask': {
                  DefaultValue: {
                    value: plPagingSimple
                  },
                  EditorOptions: {
                    BitMaskIdentifiers: [
                      {value: plPaging_First,        id: 'plPaging_First'},
                      {value: plPaging_Prev,         id: 'plPaging_Prev'},
                      {value: plPaging_Next,         id: 'plPaging_Next'},
                      {value: plPaging_Last,         id: 'plPaging_Last'},
                      {value: plPaging_Pages,        id: 'plPaging_Pages'},
                      {value: plPaging_PageNo,       id: 'plPaging_PageNo'},
                      {value: plPaging_HideDisabled, id: 'plPaging_HideDisabled'},

                      {value: plPagingSimple,        id: 'plPagingSimple'},
                      {value: plPagingSimple2,       id: 'plPagingSimple2'},
                      {value: plPagingSimpleEx,      id: 'plPagingSimpleEx'},
                      {value: plPagingPages,         id: 'plPagingPages'},
                      {value: plPagingPages2,        id: 'plPagingPages2'},
                      {value: plPagingPagesEx,       id: 'plPagingPagesEx'},
                      {value: plPagingPagesEx2,      id: 'plPagingPagesEx2'},
                      {value: plPagingDataSet,       id: 'plPagingDataSet'},
                      {value: plPagingDataSetEx,     id: 'plPagingDataSetEx'},
                      {value: plPagingAll,           id: 'plPagingAll'}
                    ]
                  }
                }
              }
            },
            "PagingSize": ng_DIProperty('integer', 5, { Level: 'basic' }),
            "PagingMinSize": { DefaultType: 'integer', Level: 'basic' },
            "PagingLookout": ng_DIProperty('integer', 2, { Level: 'basic' }),
            "PagingInside": ng_DIPropertyBool(true, { Level: 'basic' }),
            "PagingHideDisabled": ng_DIPropertyBool(false, { Level: 'basic' }),
            "DisplayPaging": ng_DIPropertyIntConstants(3,['plDisplayPagingNone','plDisplayPagingAlways','plDisplayPagingNotEmpty','plDisplayPagingMorePages'],{ Level: 'basic' }),
            "KeyEvents": ng_DIPropertyBool(true, { Level: 'basic' }),
            "AutoSelectFirstItem": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Page": { DefaultType: 'integer', Level: 'basic' },
            "DisplayedItems": ng_DIProperty('integer', 10, { Level: 'basic' }),
            "TopIndex": { DefaultType: 'integer', Level: 'hidden' },
            "AverageItemHeight": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic',
              Types: {
                'undefined': {},
                'integer': {
                  InitValue: 12
                }
              }
            },
            "MaxLength": { DefaultType: 'undefined', InitType: 'integer', Level: 'optional',
              Types: {
                'undefined': {},
                'integer': {}
              }
            },
            "CacheData": ng_DIPropertyBool(true, { Level: 'basic' }),
            "MinDataBatch": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic',
              Types: {
                'undefined': {},
                'integer': {
                  InitValue: 50
                }
              }
            },
            "AsyncData": ng_DIPropertyBool(true, { Level: 'basic' }),
            "AsyncDataTimeout": ng_DIProperty('integer', 30, { Level: 'basic' }),
            "AsyncDataRetryCnt": ng_DIProperty('integer', 3, { Level: 'basic' }),
            "AsyncDataURL": { DefaultType: 'url', Level: 'basic' }
          },
          "Events": {
            "OnPageChanging": ng_DIPropertyEvent('function(c, page) { return true; }', { Level: 'basic' }),
            "OnPageChanged": ng_DIPropertyEvent('function(c, oldpage) {}', { Level: 'basic' }),
            "OnPagingUpdating": ng_DIPropertyEvent('function(c, pginfo) { return true; }', { Level: 'basic' }),
            "OnPagingUpdated": ng_DIPropertyEvent('function(c, pginfo) { return true; }', { Level: 'basic' }),
            "OnInvalidateData": ng_DIPropertyEvent('function(c, idx, cnt) { return true; }', { Level: 'basic' }),
            "OnSetAsyncData": ng_DIPropertyEvent('function(c, idx, data) { return true; }', { Level: 'basic' }),
            "OnShowLoading": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnShowLoading": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnHideLoading": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnLoadData": ng_DIPropertyEvent('function(c, list, idx, cnt) { return []; }', { Level: 'basic' }),
            "OnAsyncURLRequest": ng_DIPropertyEvent('function(c, url, idx, cnt) { return url; }', { Level: 'basic' }),
            "OnSetLength": ng_DIPropertyEvent('function(c, len) { return len; }', { Level: 'basic' })
          },
          "ModifyControls": {
            "List": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngList',
                  InheritedFrom: 'ngList'
                }
              }
            },
            "Paging": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngToolBar',
                  InheritedFrom: 'ngToolBar'
                }
              }
            },
            "FirstPage": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngButton',
                  InheritedFrom: 'ngButton'
                }
              }
            },
            "PrevPage": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngButton',
                  InheritedFrom: 'ngButton'
                }
              }
            },
            "PageNo": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngEdit',
                  InheritedFrom: 'ngEdit'
                }
              }
            },
            "Page0": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngButton',
                  InheritedFrom: 'ngButton'
                }
              }
            },
            "NextPage": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngButton',
                  InheritedFrom: 'ngButton'
                }
              }
            },
            "LastPage": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngButton',
                  InheritedFrom: 'ngButton'
                }
              }
            }
          }
        },{
          Properties: {
            "ModifyControls": { Level: 'basic' }
          }
        })
      };
    });

  }
};