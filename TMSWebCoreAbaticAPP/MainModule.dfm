object DataModule1: TDataModule1
  OnCreate = DataModule1Create
  OnDestroy = DataModule1Destroy
  Tag = 0
  Width = 640
  Height = 480
  object idbclientsession: TWebIndexedDbClientDataset
    IDBAutoIncrement = True
    IDBDatabaseName = 'login'
    IDBKeyFieldName = 'id'
    IDBObjectStoreName = 'TMSAbaticAppSession'
    Params = <>
    Tag = 0
    Left = 122
    Top = 104
  end
end
