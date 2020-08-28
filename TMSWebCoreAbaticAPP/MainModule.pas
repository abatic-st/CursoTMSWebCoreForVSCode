unit MainModule;

interface

uses
  System.SysUtils, System.Classes, JS, Web, WEBLib.Modules, WEBLib.IndexedDb, WEBLib.CDS, Data.DB, WEBLib.REST;

type
  TDataModule1 = class(TWebDataModule)
    idbclientsession: TWebIndexedDbClientDataset;
    procedure DataModule1Create(Sender: TObject);
    procedure DataModule1Destroy(Sender: TObject);
  private
    { Private declarations }
    procedure CreateDataSessionStruct;
    function GetHasSession: boolean;
  public
    { Public declarations }
    procedure AddSessionData(strEmail, strPassword, strToken: String);
    procedure ClearSessionData;
    property HasSession: boolean read GetHasSession;
  end;

var
  DataModule1: TDataModule1;

implementation

uses
  Login;

{%CLASSGROUP 'Vcl.Controls.TControl'}

{$R *.dfm}

procedure TDataModule1.DataModule1Destroy(Sender: TObject);
begin
  idbclientsession.Active := False;  
end;

procedure TDataModule1.DataModule1Create(Sender: TObject);
begin
  CreateDataSessionStruct;  
end;

procedure TDataModule1.CreateDataSessionStruct;
begin
  idbclientsession.AddIDBIndex('ByEmail', 'email');
  idbclientsession.IDBActiveIndex := 'ByEmail';
  idbclientsession.FieldDefs.Add('id', ftInteger, 0, true, 3);
  idbclientsession.FieldDefs.Items[0].Attributes :=  idbclientsession.FieldDefs.Items[0].Attributes + [faHiddenCol];
  idbclientsession.FieldDefs.add('email', ftString);
  idbclientsession.FieldDefs.add('password', ftString);
  idbclientsession.FieldDefs.add('token', ftString);
  idbclientsession.Active := True;
end;

function TDataModule1.GetHasSession: boolean;
begin
  Result := False;
  if (idbclientsession.RecordCount > 0) then
    begin
      idbclientsession.First;
      Result := (not idbclientsession.FieldByName('token').IsNull);
    end;
end;


procedure TDataModule1.AddSessionData(strEmail: String; strPassword: String; strToken: String);
begin
  if strToken = '' then Exit;
  idbclientsession.Append;
  idbclientsession.FieldByName('email').AsString := strEmail;
  idbclientsession.FieldByName('password').AsString := strPassword;
  idbclientsession.FieldByName('token').AsString := strToken;
  idbclientsession.Post;
end;

procedure TDataModule1.ClearSessionData;
begin
  idbclientsession.First;
  while not idbclientsession.EOF do
    idbclientsession.Delete;
end;

end.    