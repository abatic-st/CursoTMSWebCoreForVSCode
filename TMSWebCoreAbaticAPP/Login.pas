unit Login;

interface

uses
  System.SysUtils, System.Classes, JS, Web, WEBLib.Graphics, WEBLib.Controls,
  WEBLib.Forms, WEBLib.Dialogs, WEBLib.StdCtrls, WEBLib.IndexedDb, WEBLib.REST,
  Weblib.JSON;

type
  TFLogin = class(TWebForm)
    eEmail: TWebEdit;
    ePassword: TWebEdit;
    bLogin: TWebButton;
    bSignUp: TWebButton;
    bForgotPassword: TWebButton;
    httpSignIn: TWebHTTPRequest;
    bCancelar: TWebButton;
    procedure bLoginClick(Sender: TObject);
    procedure SignIn(email: string; pass: string);
    procedure httpSignInRequestResponse(Sender: TObject; ARequest: TJSXMLHttpRequestRecord; AResponse: string);
    procedure bCancelarClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FLogin: TFLogin;

implementation

uses
  MainModule;

{$R *.dfm}



procedure TFLogin.bCancelarClick(Sender: TObject);
begin
  Self.Close;  
end;

procedure TFLogin.httpSignInRequestResponse(Sender: TObject; ARequest: TJSXMLHttpRequestRecord; AResponse: string);
var
  jsonParser : TJSon;
  jsonObject: TJSONObject;
begin
  try
    jsonParser := TJSON.Create;
    jSonObject := jsonParser.Parse(AResponse);
    if (jsonObject.Count = 0) then
      begin
        ShowMessage('Es posible que el API no esté en funcionamiento.');
        exit;
      end;
    if (jSonObject.count = 3) then
      begin
        ShowMessage('Error: ' + jsonObject.GetJSONValue('error') + ', status code: ' + jsonObject.GetJSONValue('statuscode') + ' -> ' + jsonObject.GetJSONValue('message'));
        exit;
      end;
    DataModule1.AddSessionData( eEmail.Text, ePassword.Text, jsonObject.GetJSONValue('accessToken') );
  finally
    jsonObject.Free;
    jsonParser.Free;
    if DataModule1.HasSession then
      Self.Close;
  end;
end;

procedure TFLogin.bLoginClick(Sender: TObject);
begin
  if (eEmail.text = '') or (ePassword.Text = '') then
    begin
      ShowMessage('No ha insertado ni email ni password.');
      exit;
    end;
  SignIn(eEMail.Text, ePassword.Text);
end;

procedure TFLogin.SignIn(email: string; pass: string);
const
  strBody = '{"email":"%s","password":"%s"}';
  strUrl = 'http://localhost:3000/auth/signin';
  strHeader1 = 'Accept=application/json';
  strHeader2 = 'Content-Type=application/json';
begin
  httpSignIn.Command := httpPOST;
  httpSignIn.URL := strUrl;
  httpSignIn.Headers.Clear;
  httpSignIn.Headers.add(strHeader1);
  httpSignIn.Headers.Add(strHeader2);
  httpSignIn.PostData := Format(strBody, [email, pass]);
  httpSignIn.Execute;
end;


end.       