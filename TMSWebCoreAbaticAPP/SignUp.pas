unit SignUp;

interface

uses
  System.SysUtils, System.Classes, JS, Web, WEBLib.Graphics, WEBLib.Controls,
  WEBLib.Forms, WEBLib.Dialogs, WEBLib.StdCtrls, WEBLib.REST, WebLib.JSON;

type
  TFSignUp = class(TWebForm)
    eFirstName: TWebEdit;
    eLastName: TWebEdit;
    eEmail: TWebEdit;
    ePassword: TWebEdit;
    eConfirmPassword: TWebEdit;
    bCreateUser: TWebButton;
    bCancel: TWebButton;
    httpSignUp: TWebHTTPRequest;
    procedure bCancelClick(Sender: TObject);
    procedure httpSignUpRequestResponse(Sender: TObject; ARequest: TJSXMLHttpRequestRecord; AResponse: string);
    procedure bCreateUserClick(Sender: TObject);
    procedure FSignUpShow(Sender: TObject);
    procedure eFirstNameChange(Sender: TObject);
  private
    { Private declarations }
    procedure SignUp(strName, strLastName, strEmail, strPassword: String);
    procedure RefreshStateCreateButton;
  public
    { Public declarations }
  end;

var
  FSignUp: TFSignUp;

implementation

{$R *.dfm}




procedure TFSignUp.eFirstNameChange(Sender: TObject);
begin
  RefreshStateCreateButton;  
end;

procedure TFSignUp.FSignUpShow(Sender: TObject);
begin
  RefreshStateCreateButton;  
end;

procedure TFSignUp.httpSignUpRequestResponse(Sender: TObject; ARequest: TJSXMLHttpRequestRecord; AResponse: string);
var
  jsonParser : TJSon;
  jsonObject: TJSONObject;
  strMessage: String;
begin
  try
    if AResponse <> '' then
      begin
        jsonParser := TJSON.Create;
        jSonObject := jsonParser.Parse(AResponse);
        case ARequest.req.Status of
          201: strMessage := 'Inicie sesión: ' + jsonObject.GetJSONValue('name')+'. Gracias por confiar en Abatic Soluciones Tecnológicas.';
          409: strMessage := 'Error: ' + jsonObject.GetJSONValue('statusCode')+' al crear el usuario por: ' + jsonObject.GetJSONValue('message');
          else strMessage := 'Error desconocido con código: ' + IntTostr(ARequest.req.Status);
        end;
      end;
  finally
    jsonParser.Free;
    jSonObject.Free;
    ShowMessage(strMessage);
    Self.close;
  end;
end;


procedure TFSignUp.bCancelClick(Sender: TObject);
begin
  Self.Close;  
end;

procedure TFSignUp.bCreateUserClick(Sender: TObject);
begin
  if (eEmail.text = '') or (ePassword.Text = '') or (eFirstName.Text = '') or (eLastName.Text = '') then
    begin
      ShowMessage('No ha insertado alguno de estos campos: correo electrónico, contraseña o nombre o apellidos.');
      exit;
    end;
  SignUp(eFirstName.Text, eLastName.Text, eEMail.Text, ePassword.Text);
end;

procedure TFSignUp.SignUp(strName: String; strLastName: String; strEmail: String; strPassword: String);
const
  strBody = '{"email":"%s","password":"%s","name": "%s","lastname":"%s"}';
  strUrl = 'http://localhost:3000/users/appendUser';
  strHeader1 = 'Accept=application/json';
  strHeader2 = 'Content-Type=application/json';
begin
  httpSignUp.Command := httpPOST;
  httpSignUp.URL := strUrl;
  httpSignUp.Headers.Clear;
  httpSignUp.Headers.add(strHeader1);
  httpSignUp.Headers.Add(strHeader2);
  httpSignUp.PostData := Format(strBody, [strEmail, strPassword, strName, strLastName]);
  httpSignUp.Execute;
end;

procedure TFSignUp.RefreshStateCreateButton;
begin
  bCreateUser.Visible := (eFirstName.text <> '') and (elastname.Text <> '') and (eemail.Text <> '') and (ePassword.Text <> '') and (eConfirmPassword.text <> '') and (eConfirmPassword.text = ePassword.Text);
end;

end.   