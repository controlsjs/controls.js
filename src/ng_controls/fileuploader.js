// --- English Resources -------------------------------------------------------
if (typeof(ngc_Lang)==='undefined') ngc_Lang = new Array();
if (typeof(ngc_Lang['en'])==='undefined') ngc_Lang['en'] = new Array();

ngc_Lang['en']['ngfup_IFrame'] = '<iframe id="IFRAME_FileUploader_%s_%s" scrolling="no" frameborder="0" '+
                              'style="overflow:hidden;border:0px;width:%spx;height:%spx;"></iframe>';

ngc_Lang['en']['ngfup_ColFile'] = 'File';

ngc_Lang['en']['ngfup_AddFile']            = 'Add file';
ngc_Lang['en']['ngfup_RemoveCheckedFiles'] = 'Remove selected files';
ngc_Lang['en']['ngfup_Uploading']          = 'Uploading in progress... Please wait.';

ngc_Lang['en']['ngfup_Error_General']   = 'An error has occurred. Please try again.';
ngc_Lang['en']['ngfup_Error_Size']      = 'File size has been exceeded.';
ngc_Lang['en']['ngfup_Error_Extension'] = 'This file type is not allowed.';


// --- Czech Resources ---------------------------------------------------------
if (typeof(ngc_Lang['cz'])==='undefined') ngc_Lang['cz'] = new Array();

ngc_Lang['cz']['ngfup_ColFile'] = 'Soubor';

ngc_Lang['cz']['ngfup_AddFile']            = 'Přidat soubor';
ngc_Lang['cz']['ngfup_RemoveCheckedFiles'] = 'Odebrat vybrané soubory';
ngc_Lang['cz']['ngfup_Uploading']          = 'Probíhá nahrávání souboru... Prosím čekejte.';

ngc_Lang['cz']['ngfup_Error_General']   = 'Došlo k chybě. Zkuste to prosím znovu.';
ngc_Lang['cz']['ngfup_Error_Size']      = 'Byla překročena maximální velikost souboru.';
ngc_Lang['cz']['ngfup_Error_Extension'] = 'Tento typ souboru není povolen.';

// --- Slovak Resources --------------------------------------------------------
if (typeof(ngc_Lang['sk'])==='undefined') ngc_Lang['sk'] = new Array();

ngc_Lang['sk']['ngfup_ColFile'] = 'Súbor';

ngc_Lang['sk']['ngfup_AddFile']            = 'Pridať súbor';
ngc_Lang['sk']['ngfup_RemoveCheckedFiles'] = 'Odobrať vybrané súbory';
ngc_Lang['sk']['ngfup_Uploading']          = 'Prebieha nahrávanie súboru... Prosím čakajte.';

ngc_Lang['sk']['ngfup_Error_General']   = 'Došlo k chybe. Skúste to prosím znova.';
ngc_Lang['sk']['ngfup_Error_Size']      = 'Bola prekročená maximálna veľkosť súboru.';
ngc_Lang['sk']['ngfup_Error_Extension'] = 'Tento typ súboru nie je povolený.';


var FileUploaderControl = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    /*  Class: ngFileUploader
     *  Standard control for uploading files.
     */
    function Create_ngFileUploader(def, ref, parent)
    {
      if (typeof(def.Data)==='undefined') def.Data = new Object();

      var base = ngVal(def.Base, 'ngPanel');
      var id   = ngVal(def.Data.FileUploaderID, 'Main');

      ng_MergeDef(def, {
        W: 400, H: 200,
        ParentReferences: false,
        Data: {
          FileUploaderID: id,
          UploadURL: ngLibPath('ng_controls')+'fileuploader.php'
        },
        Controls: {
          UploadIFrame: {
            Type: 'ngText',
            L: 0, B: 0, W: 0, H: 0,
            Data: {
              Text: ng_sprintf(ngTxt('ngfup_IFrame'), id, '1', '1', '1')
            }
          },
          UploadWindow: {
            Type: 'ngWindow',
            W: 260, H: 80,
            Data: {
              ngText: 'ngfup_AddFile',
              Visible: false,
              IFrameSize: { W: 250, H: 45 }
            },
            Controls: {
              TxtAddFile: {
                L: 5, T: 5, R: 0, B: 0,
                Type: 'ngText'
              }
            },
            Events: {
              OnVisibleChanged: function (o) {
                if ((o) && (ngVal(o.Visible, true)) && (o.Controls.TxtAddFile.GetText()==''))
                  o.Controls.TxtAddFile.SetText(ng_sprintf(ngTxt('ngfup_IFrame'), id, '2', o.IFrameSize.W, o.IFrameSize.H));
              }
            }
          },
          WaitPanel: {
            Type: 'ngPanel',
            L: 0, T: 0, W: 0, H: 0,
            Data: {
              Visible: false
            },
            Events: {
              OnVisibleChanged: function (o) {
                if (typeof(o)==='undefined') return;

                if (ngVal(o.Visible, true)) { if (o.OnShowWaiting) o.OnShowWaiting(o); }
                else                        { if (o.OnHideWaiting) o.OnHideWaiting(o); }
              }
            }
          },
          EdtFile: {
            Type: 'ngEdit',
            L: 0, T: 0, R: 140,
            Data: {
              ReadOnly: true
            },
            Events: {
              OnFocus: function () { c.ShowForm(); }
            }
          },
          BtnAddFile: {
            Type: 'ngButton',
            T: 0, R: 0, W: 120,
            Data: {
              ngText: 'ngfup_AddFile'
            },
            Events: {
              OnClick: function () { AddFile(); }
            }
          },
          ListFiles: {
            Type: 'ngList',
            L: 0, T: 40, B: 40, R: 0,
            Data: {
              SelectType: nglSelectNone,
              ShowCheckboxes: true,
              Columns: new Array(
                new ngListCol('File', ngTxt('ngfup_ColFile'))
              )
            },
            Events: {
              OnClickItem: function (o) {
                if ((o) && (o.listPart==0)) o.Owner.CheckItem(o.listItem, !ngVal(o.listItem.Checked, false));
              }
            }
          },
          BtnRemoveCheckedFiles: {
            Type: 'ngButton',
            R: 0, B: 0,
            Data: {
              ngText: 'ngfup_RemoveCheckedFiles'
            },
            Events: {
              OnClick: function () { c.RemoveCheckedFiles(); }
            }
          }
        }
      });

      var c = ngCreateControlAsType(def, base, ref, parent);
      if (!c) return c;

      // ===== PROPERTIES =====

      /*
       *  Group: Properties
       */
      /*  Variable: FileUploaderID
       *  ...
       *  Type: string
       *  Default value: *Main*
       */
      c.FileUploaderID = '';

      // ===== METHODS =====

      function AddFile()
      {
        var File = c.Controls.EdtFile.GetText();

        if ((c.OnFileAdding) && (!ngVal(c.OnFileAdding(c, File), false))) return false;
        if (File=='') return false;

        c.Controls.EdtFile.SetText('');
        c.Controls.WaitPanel.SetVisible(true);

        var Form = c.GetForm();
        if (!Form) return false;

        Form.submit();

        return true;
      }

      window['ngfup_action'] = function (id, action, data)
      {
        if ((typeof(id)==='undefined') || (typeof(action)==='undefined')) return false;
        data = ngVal(data, null);

        var c = ngGetControlById(id);
        if ((!c) || (!ng_inArray('ngFileUploader', c.CtrlInheritedFrom))) return false;

        if (c[action]) c[action](data);

        return true;
      }

      /*
       *  Group: Methods
       */
      /*  Function: ServerData
       *  ...
       *
       *  Syntax:
       *    bool *ServerData* (object data)
       *
       *  Parameters:
       *    data - ...
       *
       *  Returns:
       *    -
       */

      c.ServerData = function (data) {
        if (typeof(data)==='undefined') return false;

        c.Controls.WaitPanel.SetVisible(false);

        if (data.Error)
        {
          if (c.OnServerError) c.OnServerError(c, ngTxt(data.Error), data);
          else alert(ngTxt(data.Error));

          return false;
        }

        c.Controls.ListFiles.Add({ Text: { File: data.Name } });
        c.Controls.ListFiles.Update();

        if (c.OnFileAdded) c.OnFileAdded(c, data.Name, data);

        return true;
      }

      /*  Function: ChangeFile
       *  ...
       *
       *  Syntax:
       *    bool *ChangeFile* ()
       *
       *  Returns:
       *    -
       */

      c.ChangeFile = function () {
        var Form = c.GetForm();
        if (!Form) return false;

        var Value = Form.ngfup_File.value;
        Value = Value.substring(Value.lastIndexOf('\\')+1, Value.length);  //Remove "fake" path (C:\fakepath\)

        if ((c.OnFileChanging) && (!ngVal(c.OnFileChanging(c, Value), false))) return false;

        c.Controls.EdtFile.SetText(Value);
        c.ShowWindow(false);

        if (c.OnFileChanged) c.OnFileChanged(c, Value);

        return true;
      }

      /*  Function: RemoveCheckedFiles
       *  ...
       *
       *  Syntax:
       *    bool *RemoveCheckedFiles* ()
       *
       *  Returns:
       *    -
       */

      c.RemoveCheckedFiles = function () {
        var Checked = c.Controls.ListFiles.GetChecked();
        if (Checked.length==0) return false;

        c.Controls.ListFiles.BeginUpdate();
        for (var i=0;i<Checked.length;i++)
        {
          if ((c.OnFileDeleting) && (!ngVal(c.OnFileDeleting(c, Checked[i], i), false))) continue;
          c.Controls.ListFiles.Remove(Checked[i]);
          if (c.OnFileDeleted) c.OnFileDeleted(c, Checked[i], i);
        }
        c.Controls.ListFiles.EndUpdate();

        return true;
      }

      /*  Function: GetForm
       *  ...
       *
       *  Syntax:
       *    object *GetForm* ()
       *
       *  Returns:
       *    -
       */

      c.GetForm = function () {
        var IFrame;

        //Get IFrame
        if (ngIExplorer) IFrame = document.getElementById('IFRAME_FileUploader_'+c.FileUploaderID+'_1');
        else IFrame = document.getElementById('IFRAME_FileUploader_'+c.FileUploaderID+'_2');
        if (!IFrame) return false;

        //Get Document
        var Doc = (IFrame.contentDocument ? IFrame.contentDocument : IFrame.contentWindow.document);
        if (!Doc) return false;

        //Get Form
        var Form = Doc.getElementById('ngfup_Form_'+id);
        if (!Form)  //Create Form if necessary
        {
          var CurDate = new Date();

          Doc.open();
          Doc.write('<html><body><form id="ngfup_Form_'+id+'" enctype="multipart/form-data" action="'+c.UploadURL+'?id='+c.ID+'&action=upload&ts='+CurDate.getTime()+'&lang='+ngApp.Lang+'" method="POST">');
          Doc.write('<input name="ngfup_File" type="file" onchange="if (typeof(parent.ngfup_action)===\'function\') parent.ngfup_action(\''+c.ID+'\', \'ChangeFile\');" size="20" />');
          Doc.write('</form></body></html>');
          Doc.close();

          Form = Doc.getElementById('ngfup_Form_'+id);
        }

        if (!Form) return false;

        return Form;
      }

      /*  Function: ShowForm
       *  ...
       *
       *  Syntax:
       *    bool *ShowForm* ()
       *
       *  Returns:
       *    -
       */

      c.ShowForm = function () {
        if (ngIExplorer)
        {
          var Form = c.GetForm();
          if (!Form) return false;

          Form.ngfup_File.click();
          c.Controls.EdtFile.SetCaretPos(0);  //IE: Double Upload file fix
        } else c.ShowWindow();

        return true;
      }

      /*  Function: ShowWindow
       *  ...
       *
       *  Syntax:
       *    bool *ShowWindow* ([bool show = true])
       *
       *  Parameters:
       *    show - ...
       *
       *  Returns:
       *    -
       */

      c.ShowWindow = function (show) {
        show = ngVal(show, true);

        c.Controls.UploadWindow.SetVisible(show);
        if (show) c.GetForm();

        return true;
      }

      /*  Function: GetFiles
       *  ...
       *
       *  Syntax:
       *    array *GetFiles* ()
       *
       *  Returns:
       *    -
       */

      c.GetFiles = function () {
        return c.Controls.ListFiles.Items;
      }

      // ===== EVENTS =====

      /*
       *  Group: Events
       */
      /*
       *  Event: OnServerError
       */
      c.OnServerError = null;

      /*
       *  Event: OnFileAdding
       */
      c.OnFileAdding = null;
      /*
       *  Event: OnFileAdded
       */
      c.OnFileAdded  = null;

      /*
       *  Event: OnFileChanging
       */
      c.OnFileChanging = null;
      /*
       *  Event: OnFileChanged
       */
      c.OnFileChanged  = null;

      /*
       *  Event: OnFileDeleting
       */
      c.OnFileDeleting = null;
      /*
       *  Event: OnFileDeleted
       */
      c.OnFileDeleted  = null;

      return c;
    }
    ngRegisterControlType('ngFileUploader', function(def, ref, parent) { return Create_ngFileUploader(def, ref, parent); });

  }
};

if (typeof(ngUserControls)==='undefined') ngUserControls = new Array();
ngUserControls['fileuploader'] = FileUploaderControl;
