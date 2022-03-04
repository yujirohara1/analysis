from api.database import db, ma

## 実テーブル
class AnalyMain(db.Model): 
    __tablename__ = "analy_main"
    
    nendo        = db.Column(db.Integer, primary_key=True) 
    gyomu_cd     = db.Column(db.String(), primary_key=True) 
    gyoshu_cd    = db.Column(db.String(), primary_key=True) 
    jigyo_cd     = db.Column(db.String(), primary_key=True) 
    dantai_cd    = db.Column(db.String(), primary_key=True) 
    dantai_nm    = db.Column(db.String(), primary_key=False) 
    sisetu_cd    = db.Column(db.String(), primary_key=True) 
    sisetu_nm    = db.Column(db.String(), primary_key=False) 
    hyo_num      = db.Column(db.Integer, primary_key=True) 
    hyo_num_sub  = db.Column(db.Integer, primary_key=False) 
    gyo_num      = db.Column(db.Integer, primary_key=True) 
    gyo_num_sub  = db.Column(db.Integer, primary_key=False)
    retu_num     = db.Column(db.Integer, primary_key=True) 
    retu_num_sub = db.Column(db.Integer, primary_key=False)
    joken_1      = db.Column(db.Integer, primary_key=False)
    joken_2      = db.Column(db.Integer, primary_key=False)
    joken_3      = db.Column(db.Integer, primary_key=False)
    joken_4      = db.Column(db.Integer, primary_key=False)
    joken_5      = db.Column(db.Integer, primary_key=False)
    joken_6      = db.Column(db.Integer, primary_key=False)
    joken_7      = db.Column(db.Integer, primary_key=False)
    joken_8      = db.Column(db.Integer, primary_key=False)
    joken_9      = db.Column(db.Integer, primary_key=False)
    tani         = db.Column(db.String(), primary_key=False) 
    val_num      = db.Column(db.Numeric, primary_key=False) 
    val_char     = db.Column(db.String(), primary_key=False) 
    val_bikoa    = db.Column(db.String(), primary_key=False) 
    val_bikob    = db.Column(db.String(), primary_key=False) 
    val_bikoc    = db.Column(db.String(), primary_key=False) 


class AnalyMainSchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = AnalyMain
            load_instance = True

# class VCity(db.Model): 
#     __tablename__ = "v_city"
#     tdfk_cd = db.Column(db.String(), primary_key=True) 
#     dantai_cd = db.Column(db.String(), primary_key=True) 
#     city_nm = db.Column(db.String(), primary_key=False) 

# class VCitySchema(ma.SQLAlchemyAutoSchema):
#       class Meta:
#             model = VCity
#             load_instance = True

# class VTokoGroupbySystem(db.Model): 
#     __tablename__ = "v_toko_groupby_system"
#     system_nm = db.Column(db.String(), primary_key=True) 
#     kensu = db.Column(db.Integer, primary_key=True) 
#     rank1_avg = db.Column(db.Float , primary_key=True) 

# class VTokoGroupbySystemSchema(ma.SQLAlchemyAutoSchema):
#       class Meta:
#             model = VTokoGroupbySystem
#             load_instance = True


# #v_tokoradar_groupby_vendor
# class VTokoRadarGroupByVendor(db.Model): 
#     __tablename__ = "v_tokoradar_groupby_vendor"
#     vendor_nm = db.Column(db.String(), primary_key=True) 
#     shubetu1_avg = db.Column(db.Float , primary_key=True) 
#     shubetu2_avg = db.Column(db.Float , primary_key=True) 
#     shubetu3_avg = db.Column(db.Float , primary_key=True) 
#     shubetu4_avg = db.Column(db.Float , primary_key=True) 
#     shubetu5_avg = db.Column(db.Float , primary_key=True) 
#     shubetu6_avg = db.Column(db.Float , primary_key=True) 
#     shubetu7_avg = db.Column(db.Float , primary_key=True) 

# class VTokoRadarGroupByVendorSchema(ma.SQLAlchemyAutoSchema):
#       class Meta:
#             model = VTokoRadarGroupByVendor
#             load_instance = True


# class VBunyaMapGroupbyVendor(db.Model): 
#     __tablename__ = "v_bunyamap_groupby_vendor"
#     vendor_nm = db.Column(db.String(), primary_key=True) 
#     bunya_cd = db.Column(db.Integer, primary_key=True) 
#     bunya_nm = db.Column(db.String(), primary_key=True) 
#     ryaku_nm = db.Column(db.String(), primary_key=True) 
#     kensu = db.Column(db.Integer, primary_key=True) 

# class VBunyaMapGroupbyVendorSchema(ma.SQLAlchemyAutoSchema):
#       class Meta:
#             model = VBunyaMapGroupbyVendor
#             load_instance = True


# class VTodohukenGroupbyVendor(db.Model): 
#     __tablename__ = "v_todohuken_groupby_vendor"
#     vendor_nm = db.Column(db.String(), primary_key=True) 
#     hyoka_value = db.Column(db.String(), primary_key=True) 
#     kensu = db.Column(db.Integer, primary_key=True) 

# class VTodohukenGroupbyVendorSchema(ma.SQLAlchemyAutoSchema):
#       class Meta:
#             model = VTodohukenGroupbyVendor
#             load_instance = True
