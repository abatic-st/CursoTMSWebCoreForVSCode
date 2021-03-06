object FWishList: TFWishList
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
  Height = 592
  Left = 0
  OnShow = FWishListShow
  ParentFont = False
  TabOrder = 0
  Top = 0
  Width = 640
  object WebPanel1: TWebPanel
    ChildOrder = 0
    Color = clBtnFace
    ElementID = 'formNuevoItem'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 300
    Left = 0
    ParentFont = False
    Role = 'null'
    Top = 0
    Width = 400
  end
  object bCerrar: TWebButton
    Caption = 'Cerrar'
    ChildOrder = 0
    Color = clNone
    ElementID = 'bCerrar'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    Left = 0
    OnClick = bCerrarClick
    ParentFont = False
    Role = 'button'
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object bNuevo: TWebButton
    Caption = 'bNuevo'
    ChildOrder = 0
    Color = clNone
    ElementID = 'bNuevo'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    Left = 0
    OnClick = bNuevoClick
    ParentFont = False
    Role = 'button'
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object eNombreDeseo: TWebEdit
    Alignment = taLeftJustify
    AutoCompletion = acOff
    AutoFocus = False
    AutoSelect = False
    AutoSize = False
    CharCase = wecNormal
    ChildOrder = 0
    Color = clWindow
    EditType = weString
    ElementID = 'eNombreDeseo'
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
    ParentFont = False
    Required = False
    ShowFocus = True
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object eDescripcionDeseo: TWebEdit
    Alignment = taLeftJustify
    AutoCompletion = acOff
    AutoFocus = False
    AutoSelect = False
    AutoSize = False
    CharCase = wecNormal
    ChildOrder = 0
    Color = clWindow
    EditType = weString
    ElementID = 'eDescripción'
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
    ParentFont = False
    Required = False
    ShowFocus = True
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object cbConseguido: TWebCheckBox
    Caption = '¿Conseguido?'
    ChildOrder = 0
    ElementID = 'cbConseguido'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    Left = 0
    ParentFont = False
    Role = 'null'
    ShowFocus = True
    State = cbUnchecked
    TabOrder = 0
    Top = 0
    Width = 100
  end
  object eURL: TWebEdit
    Alignment = taLeftJustify
    AutoCompletion = acOff
    AutoFocus = False
    AutoSelect = False
    AutoSize = False
    CharCase = wecNormal
    ChildOrder = 0
    Color = clWindow
    EditType = weString
    ElementID = 'eURL'
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
    ParentFont = False
    Required = False
    ShowFocus = True
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object bCrearDeseo: TWebButton
    Caption = 'Crear Deseo'
    ChildOrder = 0
    Color = clNone
    ElementID = 'bCrearDeseo'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    Left = 0
    OnClick = bCrearDeseoClick
    ParentFont = False
    Role = 'button'
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object bCancelarDeseo: TWebButton
    Caption = 'Cancelar Deseo'
    ChildOrder = 0
    Color = clNone
    ElementID = 'bCancelarDeseo'
    ElementPosition = epRelative
    Font.Charset = ANSI_CHARSET
    Font.Color = clBlack
    Font.Height = 0
    Font.Name = 'Arial'
    Font.Size = 8
    Font.Style = []
    Height = 25
    Left = 0
    OnClick = bCancelarDeseoClick
    ParentFont = False
    Role = 'button'
    TabOrder = 0
    TextDirection = tdDefault
    Top = 0
    Width = 100
  end
  object conWishList: TWebClientConnection
    Active = False
    Headers.Strings = (
      'Accept=application/json'
      'Content-Type=application/json'
      'Authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFtYWRvciIsImVtYWlsIjoiYW1hZG9yQGFiYXRpYy5lcyIsImlhdCI6MTU5ODQyMjg5NSwiZXhwIjoxNTk4NDI2NDk1fQ.slACY9o3oOjTYiD-IzTLVeDNu95KTc5bafGmjp9DbgI'
    )
    Tag = 0
    URI = 'http://localhost:3000/wishlist'
    Left = 496
    Top = 73
  end
  object cdsWishList: TWebClientDataSet
    AfterOpen = cdsWishListAfterOpen
    Connection = conWishList
    Params = <>
    Tag = 0
    Left = 516
    Top = 156
  end
  object httpTaskItem: TWebHTTPRequest
    Command = httpGET
    OnRequestResponse = httpTaskItemRequestResponse
    Tag = 0
    Left = 43
    Top = 496
  end
end
