unit MainForm;

interface

uses
  System.SysUtils, System.Classes, JS, Web, WEBLib.Graphics, WEBLib.Controls,
  WEBLib.Forms, WEBLib.Dialogs, Login, WEBLib.ExtCtrls, WEBLib.Menus, WEBLib.StdCtrls, SignUp, WishList;

type
  TFMainForm = class(TWebForm)
    bIniciarSesion: TWebButton;
    bCrearUsuario: TWebButton;
    bCerrarSesion: TWebButton;
    bListaDeseos: TWebButton;
    llIniciarSesion: TWebLinkLabel;
    llCrearUsuario: TWebLinkLabel;
    procedure FMainFormCreate(Sender: TObject);
    procedure FMainFormShow(Sender: TObject);
    procedure bIniciarSesionClick(Sender: TObject);
    procedure bCrearUsuarioClick(Sender: TObject);
    procedure bCerrarSesionClick(Sender: TObject);
    procedure bListaDeseosClick(Sender: TObject);
  private
    myWIshListForm: TFWishList;
    mySignUForm: TFSignUp;
    myLoginForm: TFLogin;
    { Private declarations }
    procedure LoginResultModal(AValue: TModalResult);
    procedure SignUpResultModal(AValue: TModalResult);
    procedure WishResultModal(AValue: TModalResult);
    procedure RefreshVisibleObjects;
  public
    { Public declarations }
  end;

var
  FMainForm: TFMainForm;

implementation

uses
  MainModule;

{$R *.dfm}

procedure TFMainForm.bListaDeseosClick(Sender: TObject);
begin
  if not Assigned(myWIshListForm) then
    begin
      myWIshListForm := TFWishList.CreateNew();
      myWIshListForm.ShowModal(@WishResultModal);
    end;
  myWIshListForm.BringToFront;
end;

procedure TFMainForm.bCerrarSesionClick(Sender: TObject);
begin
  if Assigned(myWIshListForm) then
    begin      
      myWIshListForm.close;
      FreeAndNil(myWIshListForm);
    end;
  if Assigned(mySignUForm) then
    begin
      mySignUForm.close;
      FreeAndNil(mySignUForm);
    end;
  if Assigned(myLoginForm) then
    begin
      myLoginForm.close;
      FreeAndNil(myLoginForm);
    end;
  DataModule1.ClearSessionData;
  RefreshVisibleObjects;  
end;

procedure TFMainForm.bCrearUsuarioClick(Sender: TObject);
begin
  if not Assigned(mySignUForm) then
    begin
      mySignUForm := TFSignUp.CreateNew();
      mySignUForm.ShowModal(@SignUpResultModal);
    end;
  mySignUForm.BringToFront;
end;

procedure TFMainForm.bIniciarSesionClick(Sender: TObject);
begin
  if not Assigned(myLoginForm) then
    begin
      myLoginForm := TFLogin.CreateNew();
      myLoginForm.ShowModal(@LoginResultModal);
    end;
  myLoginForm.BringToFront;
end;

procedure TFMainForm.FMainFormShow(Sender: TObject);
begin
  RefreshVisibleObjects;  
end;

procedure TFMainForm.FMainFormCreate(Sender: TObject);
begin
  ;
end;

procedure TFMainForm.LoginResultModal(AValue: TModalResult);
begin
  FreeAndNil(myLoginForm);
  RefreshVisibleObjects;
end;

procedure TFMainForm.RefreshVisibleObjects;
var
  boolHasSession: boolean;
begin
  boolHasSession := DataModule1.HasSession;
  bIniciarSesion.Visible := boolHasSession = False;
  bCrearUsuario.Visible := boolHasSession = False;
  bCerrarSesion.Visible := boolHasSession = True;
  bListaDeseos.Visible := boolHasSession = True; 
  llIniciarSesion.Visible := boolHasSession = False;
  llCrearUsuario.Visible := boolHasSession = False;
end;

procedure TFMainForm.SignUpResultModal(AValue: TModalResult);
begin
  FreeAndNil(mySignUForm);
  RefreshVisibleObjects;  
end;

procedure TFMainForm.WishResultModal(AValue: TModalResult);
begin
  FreeAndNil(myWIshListForm);
  RefreshVisibleObjects;    
end;

end.               