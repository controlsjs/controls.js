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

  ngUserControls['list_designinfo'] = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'ngList':
          di = {
            ControlCategory: 'Lists',
            AddData: {
              InitProperties: {
                'W': { value: 120 },
                'H': { value: 180 },
                'Data': {},
                'Data.SelectType': { value: 'nglSelectSingle' },
                'Data.Items': { value: "[{Text:'Item 1'},{Text:'Item 2'}]" }
              }
            },
            Properties: {
              Data: {
                properties: {
                  Columns: { type: 'array' },
                  Items: { type: 'array' },
                  HTMLEncode: { type: 'boolean', dVal: 'false', lvl: 3 },
                  ListIndent: { type: 'integer', lvl: 2 },
                  DefaultIndent: { type: 'integer', lvl: 2 },
                  Indent: { type: ['integer', 'object'] },
                  ShowCheckboxes: { type: 'boolean', dVal: 'false' },
                  ShowHeader: { type: 'boolean', lvl: 2 },
                  CheckImg: { type: 'object', lvl: 2 },
                  TreeImg: { type: 'object', lvl: 2 },
                  ItemImg: { type: 'object', lvl: 2 },
                  KeyEvents: { type: 'boolean', lvl: 2 },
                  PageSize: { type: 'integer', dVal: '10', lvl: 2 },
                  ItemHeight: { type: 'integer' },
                  MinItemHeight: { type: 'integer', lvl: 2 },
                  MouseEvents: { type: 'boolean', lvl: 2 },
                  ReadOnly: { type: 'boolean', dVal: 'false', lvl: 2 },
                  SelectType: { type: 'integer', readOnly: true,
                    items: ['nglSelectNone','nglSelectSingle','nglSelectMulti','nglSelectMultiExt']
                  },
                  SelCount: { type: 'integer', lvl: 2 },
                  SortColumn: { type: 'string' },
                  SortDir: { type: 'integer', readOnly: true,
                    items: ['nglSortAsc','nglSortDesc']
                  },
                  SortCaseSensitive: { type: 'boolean', dVal: 'false' },
                  CheckedChangedDelay: { type: 'integer', lvl: 2 },
                  ItemsControls: { type: 'array', lvl: 2 },
                  ParentReferences: { dVal: 'false', lvl: 2 },
                  Frame: { type: 'object', dVal: '{}' }
                }
              },
              Events: {
                properties: {
                  OnAdd: { type: 'function', dVal: 'function(c, it, parent) { return true; }', lvl: 2 },
                  OnRemove: { type: 'function', dVal: 'function(c, it, parent) { }', lvl: 2 },
                  OnItemsChanged: { type: 'function', dVal: 'function(list, items) { }', lvl: 2 },
                  OnGetText: { type: 'function', dVal: 'function(c, it, col) { return it.Text; }', lvl: 2 },
                  OnGetAlt: { type: 'function', dVal: 'function(c, it, col) { return it.Alt; }', lvl: 2 },
                  OnExpanding: { type: 'function', dVal: 'function(c, it) { return true; }', lvl: 2 },
                  OnExpanded: { type: 'function', dVal: 'function(c, it) { }', lvl: 2 },
                  OnCollapsing: { type: 'function', dVal: 'function(c, it) { return true; }', lvl: 2 },
                  OnCollapsed: { type: 'function', dVal: 'function(c, it) { }', lvl: 2 },
                  OnItemCheckChanged: { type: 'function', dVal: 'function(c, it) { }' },
                  OnCheckChanged: { type: 'function', dVal: 'function(c) { }' },
                  OnSetItemVisible: { type: 'function', dVal: 'function(c, it) { }', lvl: 2 },
                  OnSetItemEnabled: { type: 'function', dVal: 'function(c, it) { }', lvl: 2 },
                  OnSelectChanged: { type: 'function', dVal: 'function(c) { }' },
                  OnRedrawSelected: { type: 'function', dVal: 'function(c, elm, s, id) { }', lvl: 3 },
                  OnCompareItem: { type: 'function', dVal: 'function(c, a, b) { return 0; }', help: 'return values [0, -1, 1]', lvl: 3 },
                  OnClickItem: { type: 'function', dVal: 'function(e) { }' },
                  OnDblClickItem: { type: 'function', dVal: 'function(e) { }' },
                  OnClick: { type: 'function', dVal: 'function(e) { return true; }' },
                  OnDblClick: { type: 'function', dVal: 'function(e) { return true; }' },
                  OnCaptionClick: { type: 'function', dVal: 'function(e, c, cid, startElm) { }' },
                  OnCaptionDblClick: { type: 'function', dVal: 'function(e, c, cid, startElm) { }' },
                  OnKeyDown: { type: 'function', dVal: 'function(e) { return true; }', lvl: 2 },
                  OnKeyUp: { type: 'function', dVal: 'function(e) { return true; }', lvl: 2 },
                  OnScroll: { type: 'function', dVal: 'function(c, e, o) { }', lvl: 2 },
                  OnEnterRow: { type: 'function', dVal: 'function(l, it, id) { }' },
                  OnLeaveRow: { type: 'function', dVal: 'function(l, it, id) { }' },
                  OnFocus: { type: 'function', dVal: 'function(c) { }', lvl: 2 },
                  OnBlur: { type: 'function', dVal: 'function(c) { }', lvl: 2 },
                  OnDrawItem: { type: 'function', dVal: 'function(c, ret, html, it, id, level, pcollapsed) { return ret; }', lvl: 3 },
                  OnDrawItemText: { type: 'function', dVal: 'function(c, html, it, id, level) { return true; }', lvl: 3 },
                  OnGetRowClassName: { type: 'function', dVal: "function(c, it, id) { return 'Row'; }", lvl: 3 },
                  OnMeasureItem: { type: 'function', dVal: 'function(c, it, id, level) { return; }', help: 'return value: item height', lvl: 3 },
                  OnCalcIndent: { type: 'function', dVal: 'function(c, it, id, level) { return }', help: 'return value: list indent', lvl: 3 },
                  OnGetItemImg: { type: 'function', dVal: 'function(c, it, id, level) { return ngVal(it.Image, c.ItemImg); }', lvl: 3 },
                  OnGetCheckImg: { type: 'function', dVal: 'function(c, it, id) { return c.CheckImg; }', lvl: 3 },
                  OnGetTreeImg: { type: 'function', dVal: 'function(c, it, id) { return c.TreeImg; }', lvl: 3 },
                  OnGetColumnCaption: { type: 'function', dVal: 'function(c, col, i) { return ngVal(col.Caption,""); }', lvl: 3 },
                  OnGetColumnWidth: { type: 'function', dVal: 'function(c, col, i, caption) { return col.Width; }', lvl: 3 }
                }
              }
            },
            Menu: {
              Text: 'Edit List',
              Items: function(c, menu, idx) {
                var items = [
                  { Text: 'Add Item', OnMenuClick: function(e, m, it) {
                    var ref = FormEditor.GetControlRefByIdx(idx);
                    if (!ref) return false;

                    var itemCode = "{Text:'Item "+(ref.Items.length+1)+"'}";
                    FormEditor.SetObjectProperties([{ name: 'Data.Items.' + ref.Items.length, type: 'array', value: itemCode, appControlIdx: idx }],
                      function(chData){ FormEditor.UpdatePropertiesList(); }
                    );

                    return false;
                  }}
                ];

                return items;
              }
            }
          };
          break;

        case 'ngPageList':
          di = {
            ControlCategory: 'Lists',
            AddData: {
              InitProperties: {
                'W': { value: 120 },
                'H': { value: 90 },
                'Data': {},
                'Data.PagingType': { value: 'plPagingSimple' },
                'Controls': {},
//                 'Controls.List': { value: "{Data:{Items:[{Text:'Item 1'},{Text:'Item 2'},{Text:'Item 3'},{Text:'Item 4'}],SelectType:nglSelectSingle}}" }
                'Controls.List': { }
//                 'Controls.Paging': { value: '' }
              }
            },
            Properties: {
              Data: {
                properties: {
                  PagingSize: { type: 'integer', dVal: '5' },
                  DisplayMode: { type: 'integer', dVal: 'plDisplayFit', readOnly: true,
                    items: ['plDisplayFixed', 'plDisplayFit']
                  },
                  PagingType: { type: 'integer', dVal: 'plPagingSimple', readOnly: true,
                    items: [
                      'plPagingUser',
                      'plPagingSimple',
                      'plPagingSimple2',
                      'plPagingSimpleEx',
                      'plPagingPages',
                      'plPagingPages2',
                      'plPagingPagesEx',
                      'plPagingPagesEx2',
                      'plPagingDataSet',
                      'plPagingDataSetEx',
                      'plPagingAll'
                    ]
                  },
                  PagingMinSize: { type: 'integer', lvl: 2 },
                  PagingLookout: { type: 'integer', lvl: 2 },
                  PagingInside: { type: 'boolean' },
                  PagingHideDisabled: { type: 'boolean', dVal: 'false', lvl: 2 },
                  DisplayPaging: { type: 'integer', dVal: 'plDisplayPagingMorePages', readOnly: true,
                    items: ['plDisplayPagingNone', 'plDisplayPagingAlways', 'plDisplayPagingNotEmpty', 'plDisplayPagingMorePages']
                  },
                  KeyEvents: { type: 'boolean', lvl: 2 },
                  AutoSelectFirstItem: { type: 'boolean', dVal: 'false' },
                  Page: { type: 'integer', dVal: '0' },
                  TopIndex: { type: 'integer', dVal: '0', lvl: 2 },
                  DisplayedItems: { type: 'integer', dVal: '10' },
                  MaxLength: { type: 'integer', lvl: 2 },
                  CacheData: { type: 'boolean', lvl: 2 },
                  AsyncData: { type: 'boolean', lvl: 2 },
                  AsyncDataTimeout: { type: 'integer', dVal: '30', lvl: 2 },
                  AsyncDataRetryCnt: { type: 'integer', dVal: '3', lvl: 2 },
                  AsyncDataURL: {type: 'string', lvl: 2 }
                }
              },
              Controls: {
                properties: {
//                   List: { type: 'object', cType: 'ngControl',
                  List: { type: 'object', dVal: "{Data:{Items:[{Text:'Item 1'},{Text:'Item 2'},{Text:'Item 3'},{Text:'Item 4'}],SelectType:nglSelectSingle}}"
//                     properties: {
//                       Data: { type: 'object', dVal: '{}',
//                         properties: {
//                           Items: { type: 'array' }
//                         }
//                       }
//                     }
                  },
                  Paging: { type: 'object', cType: 'ngControl'
//                     properties: {
//                       FirstPage: { cType: 'ngControl' },
//                       PrevPage: { cType: 'ngControl' },
//                       PageNo: { cType: 'ngControl' },
//                       Page0: { cType: 'ngControl' },
//                       NextPage: { cType: 'ngControl' },
//                       LastPage: { cType: 'ngControl' }
//                     }
                  }
                }
              },
              Events: {
                properties: {
                  OnPageChanging: { type: 'function', dVal: 'function(c, p) { return true; }' },
                  OnPageChanged: { type: 'function', dVal: 'function(c, op) { }' },
                  OnPagingUpdating: { type: 'function', dVal: 'function(c, pginfo) { return true; }' },
                  OnPagingUpdated: { type: 'function', dVal: 'function(c, pginfo) { return true; }' },
                  OnLoadData: { type: 'function', dVal: 'function(c, list,idx,cnt) { }', help: 'return value: data' },
                  OnInvalidateData: { type: 'function', dVal: 'function(c,idx,cnt) { return true; }' },
                  OnAsyncURLRequest: { type: 'function', dVal: 'function(c,url,idx,cnt) { return url; }' },
                  OnSetAsyncData: { type: 'function', dVal: 'function(c,idx,data) { return true; }' },
                  OnSetLength: { type: 'function', dVal: 'function(c, l) { return l; }' },
                  OnShowLoading: { type: 'function', dVal: 'function(c) { }' },
                  OnHideLoading: { type: 'function', dVal: 'function(c) { }' }
                }
              }
            },
            Menu: {
              Text: 'Edit List',
              Items: function(c, menu, idx) {
                var items = [
                  { Text: 'Add Item', OnMenuClick: function(e, m, it) {
                    var ref = FormEditor.GetControlRefByIdx(idx);
                    if (!ref) return false;

                    var itemCode = "{Text:'Item "+(ref.Controls.List.Items.length+1)+"'}";
                    FormEditor.SetObjectProperties([{ name: 'Controls.List.Data.Items.' + ref.Controls.List.Items.length, type: 'array', value: itemCode, appControlIdx: idx }]);

                    return false;
                  }}
                ];

                return items;
              }
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
        def.DesignInfo = di;
      }

    }
  }
}