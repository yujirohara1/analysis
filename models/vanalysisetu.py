from api.database import db, ma

## 実テーブル
class VAnalySisetu(db.Model): 
    __tablename__ = "v_analy_sisetu"
    nendo = db.Column(db.Integer, primary_key=False)
    gyomu_cd = db.Column(db.String(), primary_key=True) 
    gyoshu_cd = db.Column(db.String(), primary_key=True) 
    jigyo_cd = db.Column(db.String(), primary_key=True) 
    dantai_cd = db.Column(db.String(), primary_key=True) 
    dantai_nm = db.Column(db.String(), primary_key=True) 
    sisetu_cd = db.Column(db.String(), primary_key=True) 
    sisetu_nm = db.Column(db.String(), primary_key=True) 

class VAnalySisetuSchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = VAnalySisetu
            load_instance = True
