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
ngUserControls['list_designinfo'] = (function(){
  function getpropertytext(p) {
    return (p.PropertyType==='string' ? ngVal(p.PropertyValue,'') : '');
  }

  function editor_listradiogroups(api) {
    var citems,items=[];

    function scanitems(citems,it,ref,cid) {
      var its=it.PropertyValue;
      if(ng_IsArrayVar(its)) {
        for(var j=0;j<its.length;j++) {
          var idprops = FormEditor.GetControlsProperty(ref+j+'.RadioGroup', [cid]);
          if(idprops.length>0) {
            var s=getpropertytext(idprops[0]);
            if(s!='') citems.push(s);
          }
          var itprops = FormEditor.GetControlsProperty(ref+j+'.Items', [cid]);
          if(itprops.length>0) {
            scanitems(citems,itprops[0],ref+j+'.Items.',cid);
          }
        }
      }
    }

    var litems = FormEditor.GetSelectedControlsProperty('Data.Items');
    for(var i=0;i<litems.length;i++) {
      citems=[];
      scanitems(citems,litems[i],'Data.Items.',litems[i].ControlID);
      if(!i) items=citems;
      else ng_ArrayIntersect(items,citems);
    }
    return items;
  }

  function editor_listcolumns(api) {
    var citems,s,col,idprops,items=[];
    var cols = FormEditor.GetSelectedControlsProperty('Data.Columns');
    for(var i=0;i<cols.length;i++) {
      citems=[];
      col=cols[i].PropertyValue;
      if(ng_IsArrayVar(col)) {
        for(var j=0;j<col.length;j++) {
          idprops = FormEditor.GetControlsProperty('Data.Columns.'+j+'.ID', [cols[i].ControlID]);
          if(idprops.length>0) {
            s=getpropertytext(idprops[0]);
            if(s!='') citems.push(s);
          }
        }
      }
      if(!i) items=citems;
      else ng_ArrayIntersect(items,citems);
    }
    return items;
  }

return {
  EditorListColumns: editor_listcolumns,

  OnFormEditorInit: function(FE) {
    var undefined;

    function nitemstring(prefix,ch)
    {
      var val='';
      var tmp = ch.Name.split('.');
      var itemID = ng_toInteger(tmp[tmp.length - 2]);
      if (!isNaN(itemID)) val = prefix + (itemID + 1);

      ch.Type = 'string';
      ch.Value = val;

      return true;
    }

    var list_types = [
      // ngListColClass
      {
        TypeID: 'ngListColClass',
        TypeBase: 'callee',
        Name: 'ngListCol class',
        ShortName: 'col',
        Basic: false,
        Options: {
          Callee: 'ngListCol',
          NewExpression: true,
          DefaultCode: "new ngListCol()",
          DefaultValue: [],
          InitValue: ["'colid'"],
          Add: false,
          ObjectProperties: {
            0: ng_diString('', { DisplayName: 'ID', Required: true, Level: 'basic',
              OnPropertyInit: function(ch) {
                return nitemstring('c', ch);
              }
            }),
            1: ng_diString('', { DisplayName: 'Caption', Level: 'basic',
              OnPropertyInit: function(ch) {
                return nitemstring('Column', ch);
              }
            }),
            2: ng_diStringValues('left', ['left', 'center', 'right'], { DisplayName: 'Align', Level: 'basic' }),
            3: ng_diMixed([
                 ng_diUndefined(),
                 ng_diInteger(0, undefined, { InitValue: 100 })
               ], { DisplayName: 'Width', InitType: 'integer', Level: 'basic' }),
            4: ng_diBoolean(true, { DisplayName: 'Visible', Level: 'basic' })
          }
        }
      },

      // ngListCol
      {
        TypeID: 'ngListCol',
        TypeBase: 'object',
        Name: 'ngListCol',
        ShortName: 'col',
        Basic: false,
        Options: {
          ObjectProperties: {
            "ID": ng_diString('', { Level: 'basic', Order: 0.4,
              OnPropertyInit: function(ch) {
                return nitemstring('c', ch);
              }
            }),
            "Caption": ng_diString('', { Level: 'basic', Order: 0.41,
              OnPropertyInit: function(ch) {
                return nitemstring('Column', ch);
              }
            }),
            "Align": ng_diStringValues('left', ['left','center','right'], { Level: 'basic' }),
            "VAlign": ng_diStringValues('top', ['top','middle','bottom','baseline'], { Level: 'basic' }),
            "Width": ng_diMixed([
              ng_diUndefined(),
              ng_diInteger(0, undefined, { InitValue: 100 })
            ], { InitType: 'integer', Level: 'basic' }),
            "Visible": ng_diBoolean(true, { Level: 'basic' })
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
            "Text": ng_diMixed([
              ng_diUndefined(),
              ng_diString(),
              ng_diObject(undefined, undefined, {
                ChildDesignInfo: ng_diString()
              })
            ], { InitType: 'string', Level: 'basic', Order: 0.4,
              OnPropertyInit: function(ch)
              {
                var val='';
                var tmp = ch.Name.split('.');
                var itemID = ng_toInteger(tmp[tmp.length - 2]);
                if (!isNaN(itemID)) val = 'Item ' + (itemID + 1);

                var columns = FormEditor.GetControlsProperty('Data.Columns', [ch.ControlID]);
                var columnscnt = (columns[0] && (ng_IsArrayVar(columns[0].PropertyValue))) ? columns[0].PropertyValue.length : 0;
                if(columnscnt>0) {
                  var columnid,f=true,it={};
                  for(var i=0;i<columnscnt;i++) {
                    columnid = FormEditor.GetControlsProperty('Data.Columns.'+i+'.ID', [ch.ControlID]);
                    if((columnid[0])&&(columnid[0].PropertyType==='string')&&(ngVal(columnid[0].PropertyValue,'')!='')) {
                      it[columnid[0].PropertyValue]=(f ? val : '');
                      f=false;
                    }
                  }
                  ch.Type = 'object';
                  ch.Value= JSON.stringify(it);
                }
                else {
                  ch.Type = 'string';
                  ch.Value = val;
                }

                return true;
              }
            }),
            "Action": ng_diString('', { Level: 'basic' }, {
              Editor: 'ngfeEditor_DropDown',
              EditorOptions: {
                Items: function() {
                  var items;
                  if(typeof CoreUI_DesignInfo==='object') items=CoreUI_DesignInfo.EditorActionIDs();
                  return items;
                }
              }
            }),
            "Alt": ng_diMixed([
              ng_diUndefined(),
              ng_diString(),
              ng_diObject(undefined, undefined, {
                ChildDesignInfo: ng_diString()
              })
            ], { InitType: 'string', Level: 'basic' }),
            "ID": ng_diMixed(['undefined','string'], { InitType: 'string', Level: 'basic',
              OnPropertyInit: function(ch) {
                return nitemstring('item', ch);
              }
            }),
            "Checked": ng_diIntegerIdentifiers(0,['nglUnchecked','nglChecked','nglGrayed'],{ Level: 'basic' }),
            "CheckGroup": ng_diMixed([
              ng_diUndefined(),
              ng_diBoolean(false)
            ], { InitType: 'boolean', Level: 'basic' }),
            "AllowGrayed": ng_diBoolean(false, { Level: 'basic' }),
            "Collapsed": ng_diBoolean(false, { Level: 'basic' }),
            "Visible": ng_diBoolean(true, { Level: 'basic' }),
            "Enabled": ng_diBoolean(true, { Level: 'basic' }),
            "RadioGroup": ng_diMixed(['undefined',ng_diString('', {}, {
              Editor: 'ngfeEditor_DropDown',
              EditorOptions: {
                Items: editor_listradiogroups
              }
            })], { InitType: 'string', Level: 'basic' }),
            "RadioAllowUncheck": ng_diBoolean(false, { Level: 'basic' }),
            "H": ng_diMixed(['undefined','integer'], { InitType: 'integer', Level: 'basic' }),
            "MinHeight": ng_diMixed(['undefined','integer'], { InitType: 'integer', Level: 'basic' }),
            "Image": ng_diType('image', { Level: 'basic' }),
            "Parent": ng_diMixed(['undefined','object','null'], { Level: 'hidden' }),
            "Controls": ng_diMixed([
              // TODO: Check priority 'object' vs 'controls'
              ng_diControls(undefined, { Level: 'basic' }, {
                DestroyIfEmpty: true,
                ChildDesignInfo: {
                  Level: 'basic',
                  PropertyGroup: 'Controls'
                }
              }),
              ng_diObject(undefined, { Level: 'basic' }, {
                DestroyIfEmpty: true,
                ChildDesignInfo: ng_diControls(undefined, { Level: 'basic', PropertyGroup: 'Controls' }, {
                  DestroyIfEmpty: true,
                  ChildDesignInfo: {
                    Level: 'basic',
                    PropertyGroup: 'Controls'
                  }
                })
              })
            ], {
              Level: 'basic', PropertyGroup: 'Controls',
              OnPropertyInit: function(ch)
              {
                var columns = FormEditor.GetControlsProperty('Data.Columns', [ch.ControlID]);
                var columnscnt = (columns[0] && (ng_IsArrayVar(columns[0].PropertyValue))) ? columns[0].PropertyValue.length : 0;
                if(columnscnt>0) {
                  var columnid,it={};
                  for(var i=0;i<columnscnt;i++) {
                    columnid = FormEditor.GetControlsProperty('Data.Columns.'+i+'.ID', [ch.ControlID]);
                    if((columnid[0])&&(columnid[0].PropertyType==='string')&&(ngVal(columnid[0].PropertyValue,'')!='')) {
                      it[columnid[0].PropertyValue]={};
                    }
                  }
                  ch.Type = 'object';
                  for (var j in it) it[j] = JSON.stringify(it[j]);
                  ch.Value=it;
                }
                else {
                  ch.Type = 'controls';
                  ch.Value ='{}';
                }

                return true;
              }
            }),
            "ControlsHolder": ng_diMixed(['undefined','object'], { Level: 'hidden' }),
            "OnClick": ng_diEvent('function(e) { return true; }', { Level: 'advanced', Order: 0.8 }),
            "OnDblClick": ng_diEvent('function(e) { return true; }', { Level: 'advanced', Order: 0.8 }),
            "OnClickItem": ng_diEvent('function(e) {}', { Level: 'advanced', Order: 0.8 }),
            "OnCollapsing": ng_diEvent('function(c, it) { return true; }', { Level: 'advanced', Order: 0.8 }),
            "OnCollapsed": ng_diEvent('function(c, it) {}', { Level: 'advanced', Order: 0.8 }),
            "OnExpanding": ng_diEvent('function(c, it) { return true; }', { Level: 'advanced', Order: 0.8 }),
            "OnExpanded": ng_diEvent('function(c, it) {}', { Level: 'advanced', Order: 0.8 }),

            "Items": ng_diMixed(['ngListItems','ngListStringItems'], {  InitType: 'ngListItems', Level: 'basic', Order: 0.9 })
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
          ChildDesignInfo: ng_diMixed([
            ng_diType('ngListCol', undefined, { Level: 'basic' }),
            ng_diType('ngListColClass', undefined, { Level: 'hidden' })
          ], {
            Level: 'basic',
            DisplayName: function(pname, dispname) {
              var txt='';
              var props = FormEditor.GetSelectedControlsProperty(pname);
              var capprop, idprop,cids;
              for(var i=0;i<props.length;i++) {
                cids=[props[i].ControlID];
                if(props[i].PropertyType==='ngListColClass') {
                  idprop = FormEditor.GetSelectedControlsProperty(pname+'.0',cids);
                  capprop = FormEditor.GetSelectedControlsProperty(pname+'.1',cids);
                }
                else
                {
                  capprop = FormEditor.GetSelectedControlsProperty(pname+'.Caption',cids);
                  idprop = FormEditor.GetSelectedControlsProperty(pname+'.ID',cids);
                }
                if((capprop)&&(capprop.length>0)) capprop = capprop[0];
                if((idprop)&&(idprop.length>0)) idprop = idprop[0];
                var t=getpropertytext(capprop);
                if(t=='') t=getpropertytext(idprop);
                if(!i) txt=t;
                else if(t!=txt) { txt=''; break; }
              }
              var dn=dispname;
              if(txt!='') dn=dn+': '+txt;
              return dn;
            },
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
          })
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
            DisplayName: function(pname, dispname) {
              function gettextobj(p) {
                if(p.PropertyType==='object') {
                  var v=ngVal(p.PropertyValue,{});
                  for(var j in v) {
                    var cprops = FormEditor.GetSelectedControlsProperty(pname+'.Text.'+j, [p.ControlID]);
                    if(cprops.length>0) p=cprops[0];
                    break;
                  }
                }
                return getpropertytext(p);
              }
              var pprops = FormEditor.GetSelectedControlsProperty(pname);
              for(var i=0;i<pprops.length;i++) {
                if (pprops[i] && pprops[i].PropertyType!=='ngListItem') return dispname;
              }
              var txt='';
              var txtprops = FormEditor.GetSelectedControlsProperty(pname+'.Text');
              var idprops = FormEditor.GetSelectedControlsProperty(pname+'.ID');
              var acprops = FormEditor.GetSelectedControlsProperty(pname+'.Action');
              for(var i=0;i<txtprops.length;i++) {
                var t=gettextobj(txtprops[i]);
                if(t=='') t=getpropertytext(idprops[i]);
                if(t=='') t=getpropertytext(acprops[i]);
                if(!i) txt=t;
                else if(t!=txt) { txt=''; break; }
              }
              var dn=dispname;
              if(txt!='') dn=dn+': '+txt;
              return dn;
            },
            OnPropertyInit: function(ch)
            {
              if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'object'))
              {
                var pname = ch.Name.substring(0, ch.Name.lastIndexOf('.'));
                if (pname)
                {
                  var columns = FormEditor.GetControlsProperty('Data.Columns', [ch.ControlID]);
                  var columnscnt = (columns[0] && (ng_IsArrayVar(columns[0].PropertyValue))) ? columns[0].PropertyValue.length : 0;

                  var controlsprops = FormEditor.GetControlsProperty(pname, [ch.ControlID]);
                  var itemscnt = (controlsprops[0] && (ng_IsArrayVar(controlsprops[0].PropertyValue)) ) ? controlsprops[0].PropertyValue.length : 0;

                  if (!ch.Value || typeof ch.Value !== 'object') ch.Value = {};
                  if(columnscnt>0) {
                    var columnid,f=true,it={};
                    for(var i=0;i<columnscnt;i++) {
                      columnid = FormEditor.GetControlsProperty('Data.Columns.'+i+'.ID', [ch.ControlID]);
                      if((columnid[0])&&(columnid[0].PropertyType==='string')&&(ngVal(columnid[0].PropertyValue,'')!='')) {
                        it[columnid[0].PropertyValue]=(f ? 'Item ' + (itemscnt + 1) : '');
                        f=false;
                      }
                    }
                    ch.Value.Text=JSON.stringify(it);
                  }
                  else ch.Value.Text = "'Item " + (itemscnt + 1) + "'";
                }
              }

              return true;
            }
          }
        },
        Detect: function(esprimanode, raw, IFace)
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
        Read: function(v, type, IFace)
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
        Read: function(v, type, IFace)
        {
          if (ng_IsOverriden(this.Read)) v = this.Read.callParent.apply(this, arguments);

          if (FormEditor.PropertyTypeInheritsFrom(type, 'ngListItems'))
          {
            if (ng_IsArrayVar(v))
            {
              var node = IFace.GetEsprimaNode();
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

  OnControlCreated: function(def,c) {
    if(!FormEditor.Params.creatingform) return;
    switch(c.CtrlType)
    {
      case 'ngList':
        if(typeof CoreUI_DesignInfo === 'object') {
          c.Scan(function(l, it, parent) {
            if(typeof it.Action==='string') CoreUI_DesignInfo.RegisterActionID(it.Action);
          });
        }
        break;
    }
  },
  //OnControlDesignInfo: function(def, c, ref) {},

  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngList',function(d,c,ref) {
      return {
        ControlCategory: 'List',
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
        Properties: ng_diProperties({
          "Data": {
            "Columns": ng_diType('ngListColumns', { Collapsed: false, Level: 'basic' }),
            "Items": ng_diMixed(['ngListItems','ngListStringItems'], { Collapsed: false, Level: 'basic' }),
            "HTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "ListIndent": ng_diMixed(['undefined','integer'], { InitType: 'integer', Level: 'advanced' }),
            "DefaultIndent": ng_diMixed(['undefined','integer'], { InitType: 'integer', Level: 'advanced' }),
            "Indent": ng_diMixed([
              ng_diNull(),
              ng_diInteger(),
              ng_diArrayOf('integer')
            ], { InitType: 'integer', Level: 'advanced' }),
            "ShowCheckboxes": ng_diBoolean(false, { Level: 'basic' }),
            "RadioAllowUncheck": ng_diBoolean(false, { Level: 'basic' }),
            "ShowHeader": ng_diBoolean(true, { Level: 'basic' }),
            "CheckImg": ng_diType('image', { Level: 'advanced' }),
            "TreeImg": ng_diType('image', { Level: 'advanced' }),
            "ItemImg": ng_diType('image', { Level: 'advanced' }),
            "KeyEvents": ng_diBoolean(true, { Level: 'advanced' }),
            "PageSize": ng_diInteger(10, { Level: 'advanced' }),
            "ItemHeight": ng_diMixed([
              ng_diUndefined(),
              ng_diInteger(0, undefined, { InitValue: 12 })
            ], { InitType: 'integer', Level: 'basic' }),
            "MinItemHeight": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic' }),
            "MouseEvents": ng_diBoolean(true, { Level: 'advanced' }),
            "ReadOnly": ng_diBoolean(false, { Level: 'basic' }),
            "SelectType": ng_diIntegerIdentifiers(0,['nglSelectNone','nglSelectSingle','nglSelectMulti','nglSelectMultiExt','nglSelectSingleExt','nglSelectCheck'], { Level: 'basic' }),
            "SelCount": ng_diInteger(0, { Level: 'hidden' }),
            "SortColumn": ng_diString('', { Level: 'basic' },{
              Editor: 'ngfeEditor_DropDown',
              EditorOptions: {
                Items: editor_listcolumns
              }
            }),
            "SortDir": ng_diIntegerIdentifiers(0,['nglSortAsc','nglSortDesc'], { Level: 'basic' }),
            "SortCaseSensitive": ng_diBoolean(false, { Level: 'basic' }),
            "CheckedChangedDelay": ng_diInteger(0, { Level: 'advanced' }),
            "ItemsControls": ng_diArrayOfControls(undefined, { Level: 'hidden' }),
            "ParentReferences": ng_diBoolean(true, { Level: 'advanced' }),
            "Frame": ng_diType( 'img_frame', { Level: 'advanced' })
          },
          "Methods": {
            "DoItemsChanged": ng_diFunction('function() { ng_CallParent(this, "DoLoadData", arguments); }', { Level: 'advanced' }),
            "DoDrawItemText": ng_diFunction('function(html, text, it, col, id, level) { ng_CallParent(this, "DoDrawItemText", arguments); }', { Level: 'advanced' }),
            "DoDropDown": ng_diFunction('function(edit) { ng_CallParent(this, "DoDropDown", arguments); }', { Level: 'advanced' }),
            "DoDropDownFinished": ng_diFunction('function(edit) { ng_CallParent(this, "DoDropDownFinished", arguments); }', { Level: 'advanced' })
          },
          "Events": {
            "OnAdd": ng_diEvent('function(c, it, parent) { return true; }', { Level: 'basic' }),
            "OnRemove": ng_diEvent('function(c, it, parent) {}', { Level: 'basic' }),
            "OnItemsChanged": ng_diEvent('function(c, items) {}', { Level: 'basic' }),
            "OnExpanding": ng_diEvent('function(c, it) { return true; }', { Level: 'basic' }),
            "OnExpanded": ng_diEvent('function(c, it) {}', { Level: 'basic' }),
            "OnCollapsing": ng_diEvent('function(c, it) { return true; }', { Level: 'basic' }),
            "OnCollapsed": ng_diEvent('function(c, it) {}', { Level: 'basic' }),
            "OnItemCheckChanged": ng_diEvent('function(c, it) {}', { Level: 'basic' }),
            "OnCheckChanged": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnSetItemVisible": ng_diEvent('function(c, it) {}', { Level: 'basic' }),
            "OnSetItemEnabled": ng_diEvent('function(c, it) {}', { Level: 'basic' }),
            "OnSetColumnVisible": ng_diEvent('function(c, col) {}', { Level: 'basic' }),
            "OnSelectChanged": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnRedrawSelected": ng_diEvent('function(c, elm, selected, itemid) {}', { Level: 'advanced' }),
            "OnClickItem": ng_diEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnDblClickItem": ng_diEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnDblClick": ng_diEvent('function(e) { return true; }', { Level: 'advanced' }),
            "OnClick": ng_diEvent('function(e) { return true; }', { Level: 'advanced' }),
            "OnCaptionClick": ng_diEvent('function(e, list, colid, startelm) {}', { Level: 'basic' }), // TODO: Check startelm
            "OnCaptionDblClick": ng_diEvent('function(e, list, colid, startelm) {}', { Level: 'basic' }), // TODO: Check startelm'
            "OnKeyDown": ng_diEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnKeyUp": ng_diEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnScroll": ng_diEvent('function(c, e, contentelm) { return true; }', { Level: 'basic' }),
            "OnMouseEnter": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnMouseLeave": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnEnterRow": ng_diEvent('function(c, it, eid) {}', { Level: 'basic' }),
            "OnLeaveRow": ng_diEvent('function(c, it, eid) {}', { Level: 'basic' }),
            "OnFocus": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnBlur": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnDrawItem": ng_diEvent('function(c, retval, html, it, id, level, pcollapsed) { return true; }', { Level: 'basic' }),
            "OnDrawItemText": ng_diEvent('function(c, html, it, id, level) { return true; }', { Level: 'basic' }),
            "OnSetReadOnly": ng_diEvent('function(c, state) { return true; }', { Level: 'basic' }),
            "OnReadOnlyChanged": ng_diEvent('function(c, state) { }', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetText": ng_diEvent('function(c, it, col) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c, it, col) { return ""; }', { Level: 'basic' }),
            "OnCompareItem": ng_diEvent('function(c, a, b) { return 0; }', { Level: 'basic' }),
            "OnGetRowClassName": ng_diEvent('function(c, it, id, level) { return ""; }', { Level: 'basic' }),
            "OnGetRowGroupClassName": ng_diEvent('function(c, it, id, level) { return ""; }', { Level: 'basic' }),
            "OnMeasureItem": ng_diEvent('function(c, it, id, level) { return it.H; }', { Level: 'basic' }),
            "OnCalcIndent": ng_diEvent('function(c, it, id, level) { return level*10; }', { Level: 'basic' }),
            "OnGetItemImg": ng_diEvent('function(c, it, id, level) { return null; }', { Level: 'basic' }),
            "OnGetCheckImg": ng_diEvent('function(c, it, id) { return null; }', { Level: 'basic' }),
            "OnGetTreeImg": ng_diEvent('function(c, it, id) { return null; }', { Level: 'basic' }),
            "OnGetColumnCaption": ng_diEvent('function(c, col, i) { return "Column"+(i+1); }', { Level: 'basic' }),
            "OnGetColumnWidth": ng_diEvent('function(c, col, i, caption) { return 0; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngPageList',function(d,c,ref) {
      return {
        ControlCategory: 'List',
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
        Properties: ng_diProperties({
          "Data": {
            "DisplayMode": ng_diIntegerIdentifiers(1,['plDisplayFixed','plDisplayFit'],{ Level: 'basic' }),
            "PagingType": ng_diTypeVal('bitmask', plPagingSimple, { Level: 'basic' }, {
              EditorOptions: {
                BitMaskIdentifiers: [
                  {Value: plPaging_First,        ID: 'plPaging_First'},
                  {Value: plPaging_Prev,         ID: 'plPaging_Prev'},
                  {Value: plPaging_Next,         ID: 'plPaging_Next'},
                  {Value: plPaging_Last,         ID: 'plPaging_Last'},
                  {Value: plPaging_Pages,        ID: 'plPaging_Pages'},
                  {Value: plPaging_PageNo,       ID: 'plPaging_PageNo'},
                  {Value: plPaging_HideDisabled, ID: 'plPaging_HideDisabled'},

                  {Value: plPagingSimple,        ID: 'plPagingSimple'},
                  {Value: plPagingSimple2,       ID: 'plPagingSimple2'},
                  {Value: plPagingSimpleEx,      ID: 'plPagingSimpleEx'},
                  {Value: plPagingPages,         ID: 'plPagingPages'},
                  {Value: plPagingPages2,        ID: 'plPagingPages2'},
                  {Value: plPagingPagesEx,       ID: 'plPagingPagesEx'},
                  {Value: plPagingPagesEx2,      ID: 'plPagingPagesEx2'},
                  {Value: plPagingDataSet,       ID: 'plPagingDataSet'},
                  {Value: plPagingDataSetEx,     ID: 'plPagingDataSetEx'},
                  {Value: plPagingAll,           ID: 'plPagingAll'}
                ]
              }
            }),
            "PagingSize": ng_diInteger(5, { Level: 'basic' }),
            "PagingMinSize": ng_diInteger(0, { Level: 'basic' }),
            "PagingLookout": ng_diInteger(2, { Level: 'basic' }),
            "PagingInside": ng_diBoolean(true, { Level: 'basic' }),
            "PagingHideDisabled": ng_diBoolean(false, { Level: 'basic' }),
            "DisplayPaging": ng_diIntegerIdentifiers(3,['plDisplayPagingNone','plDisplayPagingAlways','plDisplayPagingNotEmpty','plDisplayPagingMorePages'],{ Level: 'basic' }),
            "KeyEvents": ng_diBoolean(true, { Level: 'basic' }),
            "AutoSelectFirstItem": ng_diBoolean(false, { Level: 'basic' }),
            "Page": ng_diInteger(0, { Level: 'basic' }),
            "DisplayedItems": ng_diInteger(10, { Level: 'basic' }),
            "TopIndex": ng_diInteger(0, { Level: 'hidden' }),
            "AverageItemHeight": ng_diMixed([
              ng_diUndefined(),
              ng_diInteger(undefined, undefined, { InitValue: 12 })
            ], { InitType: 'integer', Level: 'basic' }),
            "MaxLength": ng_diMixed(['undefined','integer'], { InitType: 'integer', Level: 'optional' }),
            "CacheData": ng_diBoolean(true, { Level: 'basic' }),
            "MinDataBatch": ng_diMixed([
              ng_diUndefined(),
              ng_diInteger(undefined, undefined, { InitValue: 50 })
            ], { InitType: 'integer', Level: 'basic' }),
            "AsyncData": ng_diBoolean(true, { Level: 'basic' }),
            "AsyncDataTimeout": ng_diInteger(30, { Level: 'basic' }),
            "AsyncDataRetryCnt": ng_diInteger(3, { Level: 'basic' }),
            "AsyncDataURL": ng_diType('url', { Level: 'basic' }),
            "NoDataText": ng_diString('', { Level: 'basic' }, { Editor: 'ngfeEditor_Lang' }),
            "DesignLive": ng_diBoolean(false, { Level: 'basic', Order: 0.95 })
          },
          "Methods": {
            "DoLoadData": ng_diFunction('function(idx, cnt, retry) { return ng_CallParent(this, "DoLoadData", arguments, true); }', { Level: 'advanced' })
          },
          "Events": {
            "OnPageChanging": ng_diEvent('function(c, page) { return true; }', { Level: 'basic' }),
            "OnPageChanged": ng_diEvent('function(c, oldpage) {}', { Level: 'basic' }),
            "OnPagingUpdating": ng_diEvent('function(c, pginfo) { return true; }', { Level: 'basic' }),
            "OnPagingUpdated": ng_diEvent('function(c, pginfo) { return true; }', { Level: 'basic' }),
            "OnInvalidateData": ng_diEvent('function(c, idx, cnt) { return true; }', { Level: 'basic' }),
            "OnSetAsyncData": ng_diEvent('function(c, idx, data) { return true; }', { Level: 'basic' }),
            "OnShowLoading": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnHideLoading": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnShowNoData": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnHideNoData": ng_diEvent('function(c) {}', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnLoadData": ng_diEvent('function(c, list, idx, cnt) { return []; }', { Level: 'basic' }),
            "OnAsyncURLRequest": ng_diEvent('function(c, url, idx, cnt) { return url; }', { Level: 'basic' }),
            "OnSetLength": ng_diEvent('function(c, len) { return len; }', { Level: 'basic' }),
            "OnNoDataText": ng_diEvent('function(c) { return ""; }', { Level: 'basic' })
          },
          "ModifyControls": {
            "List": ng_diControl('ngList', null, { Level: 'basic' }, { InheritedFrom: 'ngList' }),
            "Paging": ng_diControl('ngToolBar', null, { Level: 'basic' }, { InheritedFrom: 'ngToolBar' }),
            "FirstPage": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "PrevPage": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "PageNo": ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
            "Page0": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "NextPage": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "LastPage": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' })
          }
        },{
          "ModifyControls": { Level: 'basic' }
        })
      };
    });

  }
};
})();