program TMSWebCoreAbaticAPP;

uses
  Vcl.Forms,
  WEBLib.Forms,
  MainForm in 'MainForm.pas' {FMainForm: TWebForm} {*.html},
  Login in 'Login.pas' {FLogin: TWebForm} {*.html},
  MainModule in 'MainModule.pas' {DataModule1: TWebDataModule},
  SignUp in 'SignUp.pas' {FSignUp: TWebForm} {*.html},
  WishList in 'WishList.pas' {FWishList: TWebForm} {*.html};

{$R *.res}

begin
  Application.Initialize;
  Application.MainFormOnTaskbar := True;
  Application.CreateForm(TDataModule1, DataModule1);
  Application.CreateForm(TFMainForm, FMainForm);
  Application.Run;
end.