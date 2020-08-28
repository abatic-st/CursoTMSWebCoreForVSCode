object FSignUp: TFSignUp
  CSSLibrary = cssNone
  Color = clWhite
  Font.Charset = ANSI_CHARSET
  Font.Color = clBlack
  Font.Height = 0
  Font.Name = 'Arial'
  Font.Size = 8
  Font.Style = []
  FormContainer = 'body'
  FormStyle = fsNormal
  Height = 616
  Left = 0
  OnShow = FSignUpShow
  ParentFont = False
  TabOrder = 0
  Top = 0
  Width = 800
  object eFirstName: TWebEdit
    Alignment = taLeftJustify
    AutoCompletion = acOff
    AutoFocus = False
    AutoSelect = False
    AutoSize = False
    CharCase = wecNormal
    ChildOrder = 0
    Color = clWindow
    EditType = weString
    ElementID = 'inputFirstName'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    HideSelection = False
    Left = 0
    MaxLength = 0
    OnChange = eFirstNameChange
    ParentFont = False
    Required = False
    ShowFocus = True
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object eLastName: TWebEdit
    Alignment = taLeftJustify
    AutoCompletion = acOff
    AutoFocus = False
    AutoSelect = False
    AutoSize = False
    CharCase = wecNormal
    ChildOrder = 0
    Color = clWindow
    EditType = weString
    ElementID = 'inputLastName'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    HideSelection = False
    Left = 0
    MaxLength = 0
    OnChange = eFirstNameChange
    ParentFont = False
    Required = False
    ShowFocus = True
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object eEmail: TWebEdit
    Alignment = taLeftJustify
    AutoCompletion = acOff
    AutoFocus = False
    AutoSelect = False
    AutoSize = False
    CharCase = wecNormal
    ChildOrder = 0
    Color = clWindow
    EditType = weString
    ElementID = 'inputEmailAddress'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    HideSelection = False
    Left = 0
    MaxLength = 0
    OnChange = eFirstNameChange
    ParentFont = False
    Required = False
    ShowFocus = True
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object ePassword: TWebEdit
    Alignment = taLeftJustify
    AutoCompletion = acOff
    AutoFocus = False
    AutoSelect = False
    AutoSize = False
    CharCase = wecNormal
    ChildOrder = 0
    Color = clWindow
    EditType = weString
    ElementID = 'inputPassword'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    HideSelection = False
    Left = 0
    MaxLength = 0
    OnChange = eFirstNameChange
    ParentFont = False
    Required = False
    ShowFocus = True
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object eConfirmPassword: TWebEdit
    Alignment = taLeftJustify
    AutoCompletion = acOff
    AutoFocus = False
    AutoSelect = False
    AutoSize = False
    CharCase = wecNormal
    ChildOrder = 0
    Color = clWindow
    EditType = weString
    ElementID = 'inputConfirmPassword'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    HideSelection = False
    Left = 0
    MaxLength = 0
    OnChange = eFirstNameChange
    ParentFont = False
    Required = False
    ShowFocus = True
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object bCreateUser: TWebButton
    Caption = 'Crear Usuario'
    ChildOrder = 0
    Color = clNone
    ElementID = 'bCreateUser'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    Left = 0
    OnClick = bCreateUserClick
    ParentFont = False
    Role = 'button'
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object bCancel: TWebButton
    Caption = 'Cancelar'
    ChildOrder = 0
    Color = clNone
    ElementID = 'bCancel'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    Left = 0
    OnClick = bCancelClick
    ParentFont = False
    Role = 'button'
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object httpSignUp: TWebHTTPRequest
    Command = httpPOST
    Headers.Strings = (
      'Accept:application/json'
      'Content-Type:application/json'
    )
    OnRequestResponse = httpSignUpRequestResponse
    Tag = 0
    Left = 298
    Top = 260
  end
end