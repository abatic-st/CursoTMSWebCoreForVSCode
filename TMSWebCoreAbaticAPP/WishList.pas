unit WishList;

interface

uses
  System.SysUtils, System.Classes, JS, Web, WEBLib.Graphics, WEBLib.Controls,
  WEBLib.Forms, WEBLib.Dialogs, WEBLib.Grids, WEBLib.CDS, WEBLib.ClientConnector, WEBLib.REST, WEBLib.DB, DB,
  WEBLib.DBCtrls, WEBLib.StdCtrls, WEBLib.ExtCtrls;

const
  strHeaderAcept = 'Accept=application/json';
  strHeaderContent = 'Content-Type=application/json';
  strHeaderBearer = 'Authorization=Bearer %s';
  strPostData = '{"wishname":"%s","wishdescription":"%s","wishgot":%s,"wishurl":"%s"}';
  strPutData = '{"wishgot":%s}';

type
  TFWishList = class(TWebForm)
    conWishList: TWebClientConnection;
    cdsWishList: TWebClientDataSet;
    dbgWishList: TWebDBGrid;
    bCerrar: TWebButton;
    httpTaskItem: TWebHTTPRequest;
    bNuevo: TWebButton;
    WebPanel1: TWebPanel;
    eNombreDeseo: TWebEdit;
    eDescripcionDeseo: TWebEdit;
    cbConseguido: TWebCheckBox;
    eURL: TWebEdit;
    bCrearDeseo: TWebButton;
    bCancelarDeseo: TWebButton;
    procedure FWishListShow(Sender: TObject);
    procedure cdsWishListAfterOpen(DataSet: TDataSet);
    procedure acordionWishDataExpanded(Sender: TObject; ASection: TAccordionSection);
    procedure acordionWishDataCollapsed(Sender: TObject; ASection: TAccordionSection);
    procedure bCerrarClick(Sender: TObject);
    procedure DeleteItem(Sender: TObject);
    procedure EditItem(Sender: TObject);
    procedure bNuevoClick(Sender: TObject);
    procedure bCrearDeseoClick(Sender: TObject);
    procedure bCancelarDeseoClick(Sender: TObject);
    procedure httpTaskItemRequestResponse(Sender: TObject; ARequest: TJSXMLHttpRequestRecord; AResponse: string);
  private
    { Private declarations }
    acordionWishData: TWebAccordion;
    procedure GetData(conection: TWebClientConnection);
    procedure ShowData(datasetWish: TWebClientDataSet; acordionControl: TWebAccordion);
    procedure InitObjectsForm;
    procedure LoadHttpRequest(strURL: String; httpCommand: THTTPCommand; httpObject: TWebHTTPRequest);
  public
    { Public declarations }
  end;

var
  FWishList: TFWishList;

implementation

uses
  MainModule;

{$R *.dfm}

procedure TFWishList.httpTaskItemRequestResponse(Sender: TObject; ARequest: TJSXMLHttpRequestRecord; AResponse: string);
begin
  if acordionWishData.Sections.Count > 0 then
    acordionWishData.Sections.Clear; 
  if (ARequest.req.Status = 200) then
    begin
      cdsWishList.Active := False;
      GetData(conWishList);
      cdsWishList.Connection := conWishList;
      cdsWishList.Active := True;
    end;  
  if (ARequest.req.Status = 201) then
    begin
      cdsWishList.Active := False;
      GetData(conWishList);
      cdsWishList.Connection := conWishList;
      cdsWishList.Active := True;
      bCancelarDeseo.Click;
    end;
end;

procedure TFWishList.bCancelarDeseoClick(Sender: TObject);
begin
  InitObjectsForm;
  WebPanel1.Visible := False;
end;

procedure TFWishList.bCrearDeseoClick(Sender: TObject);
const
  strCreateItemURL = 'http://localhost:3000/wishlist/appendWish';
var
  strBoolean, strURL: string;
  httpCommand: THTTPCommand;
begin
  case (Sender as TWebButton).Tag of
    1: 
      begin
      httpCommand := httpPOST;
      strURL := strCreateItemURL;
      end;
  end;
  LoadHttpRequest(
      strURL,
      httpCommand,
      httpTaskItem
  );
  httpTaskItem.PostData := Format(strPostData, [
    eNombreDeseo.Text,
    eDescripcionDeseo.Text,
    cbConseguido.Checked.ToString,
    eurl.Text
  ]);
  httpTaskItem.Execute;  
end;


procedure TFWishList.bNuevoClick(Sender: TObject);
begin
  InitObjectsForm;
  bCrearDeseo.Caption := 'Crear deseo';
  bCrearDeseo.tag := 1;
  WebPanel1.Visible := True;
  WebPanel1.tag := 0;
  eNombreDeseo.SetFocus;
end;

procedure TFWishList.bCerrarClick(Sender: TObject);
begin
  if Assigned(acordionWishData) then
    acordionWishData.Sections.Clear;
  FreeAndNil(acordionWishData);
  Self.Close;
end;

procedure TFWishList.acordionWishDataCollapsed(Sender: TObject; ASection: TAccordionSection);
begin
  //ASection.Tag;
  if Assigned(Self) then
    begin
      if ((Self as TFWishList).FindComponent('bEliminarItem'+ASection.Tag.ToString) <> nil) then
        FreeAndNil((Self as TFWishList).FindComponent('bEliminarItem'+ASection.Tag.ToString));    
      if ((Self as TFWishList).FindComponent('bEditarItem'+ASection.Tag.ToString) <> nil) then
        FreeAndNil((Self as TFWishList).FindComponent('bEditarItem'+ASection.Tag.ToString));        
    end;
end;

procedure TFWishList.acordionWishDataExpanded(Sender: TObject; ASection: TAccordionSection);
var
  bEliminar: TWebButton;
  bEditar: TWebButton;
begin
  acordionWishDataCollapsed(acordionWishData, ASection);
  bEliminar := TWebButton.create(Self);
  bEliminar.ElementID := 'btnEliminar' + ASection.Tag.toString;
  bEliminar.Tag := ASection.Tag;
  bEliminar.OnClick := @DeleteItem;
  bEliminar.Caption := 'Eliminar';
  bEliminar.Name := 'bEliminarItem' + ASection.Tag.toString;

  bEditar := TWebButton.create(Self);
  bEditar.ElementID := 'btnEditar' + ASection.Tag.toString;
  bEditar.Tag := ASection.Tag;
  bEditar.OnClick := @EditItem;
  if Pos('Conseguido', ASection.caption) > 0 then
    bEditar.Caption := 'Marcar como no conseguido'
  else
    bEditar.Caption := 'Marcar como conseguido';
  bEditar.Name := 'bEditarItem' + ASection.Tag.toString;
end;

procedure TFWishList.cdsWishListAfterOpen(DataSet: TDataSet);
begin
  if not Assigned(acordionWishData) then
    acordionWishData := TWebAccordion.create(self);
  acordionWishData.Align := alClient;
  acordionWishData.OnCollapsed := @acordionWishDataCollapsed;
  acordionWishData.OnExpanded := @acordionWishDataExpanded;
  acordionwishdata.AlignWithMargins := True;
  acordionWishData.ElementID := 'wishDataContainer1';
  if (DataSet.Active) and (DataSet.RecordCount > 0) then
    ShowData((DataSet as TWebClientDataSet), acordionWishData);
end;


procedure TFWishList.FWishListShow(Sender: TObject);
begin
  webpanel1.Visible := False;
  cdsWishList.Active := False;
  GetData(conWishList);
  cdsWishList.Connection := conWishList;
  cdsWishList.Active := True;
end;


procedure TFWishList.ShowData(datasetWish: TWebClientDataSet; acordionControl: TWebAccordion);
const
  strBootStrapCard = '<div class="container-fluid">'+
	'<div class="row">'+
		'<div class="col-md-12">'+
			'<div class="card text-white %s mb-3">'+
				'<h5 class="card-header">'+
					'<i class="fas fa-gifts">%s</i>'+
				'</h5>'+
				'<div class="card-body">'+
					'<p class="card-text">'+
						'%s'+
					'</p>'+
          '<div class="btn-group" role="group">'+
            '<button class="btn btn-warning" type="button" id="%s">Eliminar</button>'+
            '<button class="btn btn-secundary" type="button" id="%s">Editar</button>'+
          '</div>'+
				'</div>'+
				'<div class="card-footer"><a href="%s" class="btn btn-primary" target="_blank">%s</a></div>'+
			'</div>'+
		'</div>'+
	'</div>';
  strGotWishClass = 'bg-success';
  strNotGotWishClass = 'bg-danger';
var
  strCard, strGotCSS, strGotText, strURL, strURLLabel: String;
  asItem: TAccordionSection;
begin
  if datasetWish.Active = False then Exit;
  datasetWish.First;
  while not datasetWish.EOF do
    begin
      strGotCSS := strGotWishClass;
      strGotText := 'Conseguido';
      if datasetWish.FieldByName('wishgot').AsBoolean = False then
        begin
        strGotCSS := strNotGotWishClass;
        strGotText := 'Sin conseguir';
        end;
      strURL := '#';
      strURLLabel := 'Sin Web';
      if datasetWish.FieldByName('wishurl').AsString <> '' then
        begin
          StrURL := datasetWish.FieldByName('wishurl').AsString;
          strURLLabel := 'Su Web';
        end;
      
      strCard := Format(strBootStrapCard, [
        strGotCss,
        datasetWish.FieldByName('wishname').AsString,
        datasetWish.FieldByName('wishdescription').AsString,
        'btnEliminar' + datasetWish.FieldByName('id').AsString,
        'btnEditar' + datasetWish.FieldByName('id').AsString,
        strURL,
        strURLLabel
      ]);

      asItem := acordionControl.sections.Add;
      asItem.Tag := datasetWish.FieldByName('id').AsInteger;
      asItem.Content := strCard;
      asItem.Caption := datasetWish.FieldByName('wishname').AsString + ' - ' + strGotText;

      datasetWish.next;
    end;
end;

procedure TFWishList.GetData(conection: TWebClientConnection);
const
  strURL = 'http://localhost:3000/wishlist';
begin
  conection.Active := False;
  conection.URI := strURL;
  conection.Headers.Clear;
  conection.Headers.Add(strHeaderAcept);
  conection.Headers.add(strHeaderContent);
  conection.Headers.Add(Format(strHeaderBearer, [DataModule1.idbclientsession.FieldByName('token').AsString]));
  conection.Active := True;
end;

procedure TFWishList.DeleteItem(Sender: TObject);
const
  strDeleteItemURL = 'http://localhost:3000/wishlist/%d';
var
  asSeccion: TAccordionSection;
  intCounter: Integer;
begin
  LoadHttpRequest(
      Format(strDeleteItemURL, [(Sender as TWebButton).Tag]),
      httpDELETE,
      httpTaskItem
  );  
  intCounter := 0;
  asSeccion := nil;
  while (intCounter <= acordionWishData.Sections.Count -1) and (asSeccion = nil) do
    begin
      if (acordionWishData.Sections.Items[intCounter].tag = (Sender as TWebButton).Tag) then
        asSeccion :=  TAccordionSection(acordionWishData.Sections.Items[intCounter]);
      Inc(intCounter);
    end;

  httpTaskItem.Execute;
end;

procedure TFWishList.InitObjectsForm;
begin
  eNombreDeseo.Text := '';
  eDescripcionDeseo.Text := '';
  cbConseguido.Checked := False;
  eurl.Text := '';
end;

procedure TFWishList.LoadHttpRequest(strURL: String; httpCommand: THTTPCommand; httpObject: TWebHTTPRequest);
begin
  httpObject.URL := strURL;
  httpObject.Headers.Clear;
  httpObject.Headers.Add(strHeaderAcept);
  httpObject.Headers.add(strHeaderContent);
  httpObject.Headers.Add(Format(strHeaderBearer, [DataModule1.idbclientsession.FieldByName('token').AsString]));
  httpObject.Command := httpCommand;  
end;

procedure TFWishList.EditItem(Sender: TObject);
const
  strEditItemURL = 'http://localhost:3000/wishlist/%d';  
var
  strBoolValue: String;
begin
  if (Sender as TWebButton).caption = 'Marcar como no conseguido' then
    strBoolValue := 'false'
  else
    strBoolValue := 'true';

  LoadHttpRequest(
      Format(strEditItemURL, [(Sender as TWebButton).Tag]),
      httpPUT,
      httpTaskItem
  );
  httpTaskItem.PostData := Format(strPutData, [strBoolValue]);
  httpTaskItem.Execute;     
end;




end.                           