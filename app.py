from flask import Flask, render_template, g, request, redirect, url_for, Response, abort, session, jsonify, make_response, send_file
from hamlish_jinja import HamlishExtension
from werkzeug.datastructures import ImmutableDict
import os
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin, current_user
from collections import defaultdict
from datetime import timedelta
import datetime
from flask_bootstrap import Bootstrap
from marshmallow_sqlalchemy import ModelSchema

# from reportlab.pdfgen import canvas
# from reportlab.pdfbase import pdfmetrics
# from reportlab.pdfbase.cidfonts import UnicodeCIDFont
# from reportlab.lib.pagesizes import A4, portrait
# from reportlab.platypus import Table, TableStyle
# from reportlab.lib.units import mm
# from reportlab.lib import colors
from api.database import db, ma
from models.analymain import AnalyMain, AnalyMainSchema
from models.analyhyo import AnalyHyo, AnalyHyoSchema
from models.vanalyhyo import VAnalyHyo, VAnalyHyoSchema
from models.vanalyshuekiseia import VAnalyShuekiseiA, VAnalyShuekiseiASchema #収益性ランクA・・・経常収支比率
from models.vanalyryudoanzenseia import VAnalyRyudoAnzenseiA, VAnalyRyudoAnzenseiASchema #安全性ランクA・・・流動比率
from models.vanalyruisekikessona import VAnalyRuisekiKessonA, VAnalyRuisekiKessonASchema #健全性ランクA・・・累積欠損比率
from models.vanalykigyosaiperkyusuia import VAnalyKigyosaiPerKyusuiA, VAnalyKigyosaiPerKyusuiASchema
from models.vanalykoteishokyakuritua import VAnalyKoteiShokyakurituA, VAnalyKoteiShokyakurituASchema
from models.vanalybyoshoriyoritua import VAnalyByoshoRiyorituA, VAnalyByoshoRiyorituASchema #回転率ランクA・・・病床利用率
from models.vanalynyuinhitorishuekia import VAnalyNyuinHitoriShuekiA, VAnalyNyuinHitoriShuekiASchema #収益性・・・入院患者１人１日あたり収益
from models.vanalysisetu import VAnalySisetu, VAnalySisetuSchema
from models.vanalyjugyoinhitoririekia import VAnalyJugyoinHitoriRiekiA, VAnalyJugyoinHitoriRiekiASchema
from models.vanalykeijoriekiseichoritua import VAnalyKeijoriekiSeichorituA, VAnalyKeijoriekiSeichorituASchema
from models.vanalykoteihiritua import VAnalyKoteiHirituA, VAnalyKoteiHirituASchema
from models.vanalyreturnonequitya import VAnalyReturnOnEquityA, VAnalyReturnOnEquityASchema
from models.vanalysihonseichoritua import VAnalySihonSeichorituA, VAnalySihonSeichorituASchema
from models.analykijun import AnalyKijun, AnalyKijunSchema
from models.analyjigyo import AnalyJigyo, AnalyJigyoSchema

from sqlalchemy.sql import text
from sqlalchemy import distinct
from sqlalchemy import desc
from sqlalchemy import asc
from sqlalchemy.sql import func
import json
# from rq import Queue
# from worker import conn
# import PyPDF2
# from bottle import route, run
# import smtplib
# from email.mime.text import MIMEText
# from email.utils import formatdate
import csv
import requests
from bs4 import BeautifulSoup
import pandas as pd
import math
from decimal import Decimal

DELIMIT = "@|@|@"



tdfk = {
  "01" : "北海道"   ,"02" : "青森県"   ,"03" : "岩手県"   ,"04" : "宮城県"   ,"05" : "秋田県"   ,"06" : "山形県"   ,"07" : "福島県"   ,"08" : "茨城県"   ,
  "09" : "栃木県"   ,"10" : "群馬県"   ,"11" : "埼玉県"   ,"12" : "千葉県"   ,"13" : "東京都"   ,"14" : "神奈川県" ,"15" : "新潟県"   ,"16" : "富山県"   ,
  "17" : "石川県"   ,"18" : "福井県"   ,"19" : "山梨県"   ,"20" : "長野県"   ,"21" : "岐阜県"   ,"22" : "静岡県"   ,"23" : "愛知県"   ,"24" : "三重県"   ,
  "25" : "滋賀県"   ,"26" : "京都府"   ,"27" : "大阪府"   ,"28" : "兵庫県"   ,"29" : "奈良県"   ,"30" : "和歌山県" ,"31" : "鳥取県"   ,"32" : "島根県"   ,
  "33" : "岡山県"   ,"34" : "広島県"   ,"35" : "山口県"   ,"36" : "徳島県"   ,"37" : "香川県"   ,"38" : "愛媛県"   ,"39" : "高知県"   ,"40" : "福岡県"   ,
  "41" : "佐賀県"   ,"42" : "長崎県"   ,"43" : "熊本県"   ,"44" : "大分県"   ,"45" : "宮崎県"   ,"46" : "鹿児島県" ,"47" : "沖縄県"
}


class FlaskWithHamlish(Flask):
    jinja_options = ImmutableDict(
        extensions=[HamlishExtension]
    )
app = FlaskWithHamlish(__name__)
bootstrap = Bootstrap(app)


login_manager = LoginManager()
login_manager.init_app(app)
app.config['SECRET_KEY'] = "secret"
mail_address = os.environ.get('MAIL_ADDR')
mail_password = os.environ.get('MAIL_PASS')

class User(UserMixin):
    def __init__(self, id, name, password, tenant_id):
        self.id = id
        self.name = name
        self.password = password
        self.tenant_id = tenant_id

# ログイン用ユーザー作成
users = {
    1: User(1, "yujiro", "yjrhr1102", "demo"),
    2: User(2, "seiya", "seiya7293", "hara"),
    3: User(3, "yasu", "3021", "hara"),
    100: User(100, "demo", "demo", "demo")
}

# ユーザーチェックに使用する辞書作成
nested_dict = lambda: defaultdict(nested_dict)
user_check = nested_dict()
for i in users.values():
    user_check[i.name]["password"] = i.password
    user_check[i.name]["id"] = i.id


def create_message(from_addr, to_addr, bcc_addrs, subject, body):
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = from_addr
    msg['To'] = to_addr
    msg['Bcc'] = bcc_addrs
    msg['Date'] = formatdate()
    return msg


def send(from_addr, to_addrs, my_pwd, msg):
    smtpobj = smtplib.SMTP('smtp.gmail.com', 587) # gmail
    smtpobj.ehlo()
    smtpobj.starttls()
    smtpobj.ehlo()
    smtpobj.login(from_addr, my_pwd)
    smtpobj.sendmail(from_addr, to_addrs, msg.as_string())
    smtpobj.close()


@app.route('/AccountToroku',methods=["GET", "POST"])
def SendMail_AccountToroku():
  vals = request.json["data"]
  try:
    msg = create_message(mail_address, mail_address, "", "アカウント登録申請", vals[0] + ", " + vals[1])
    send(mail_address, mail_address, mail_password, msg)
    return "0"
  except:
    # 何もしない
    import traceback  
  return "-1"

@login_manager.user_loader
def load_user(user_id):
  return users.get(int(user_id))

# db_uri = "postgresql://postgres:yjrhr1102@localhost:5432/newdb3" #開発用
db_uri = os.environ.get('HEROKU_POSTGRESQL_COBALT_URL') #本番用HEROKU_POSTGRESQL_COBALTHEROKU_POSTGRESQL_DIANA_URL
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
ma.init_app(app)
# q = Queue(connection=conn)
        
@app.route("/favicon.ico")
def favicon():
    return app.send_static_file("favicon.ico")


@app.route('/executeFileGetAndInsert/<documentName>/<chosaJiten>/<dantaiCd>/<dantaiNm>/<url>')
def executeFileGetAndInsert(documentName, chosaJiten, dantaiCd, dantaiNm, url):
  url = url.replace("|","/")
  result = ""

  try:
    res = requests.get(url)
    xl = pd.read_excel(res.content, sheet_name=None)
    fileshubetu = fileShubetu(xl)

    if fileshubetu=="sisetu":
      createSisetuMain(xl)
    elif fileshubetu=="sokatu":
      createSokatuMain(xl)
      pass
    else:
      pass
    
    result = "取込済"
  except Exception as e:
    import traceback
    traceback.print_exc()
    result = e.args[0]

  insertJotai(documentName, chosaJiten, dantaiCd, dantaiNm, url, result)

  return jsonify({'data': {"documentName" : documentName, "chosaJiten":chosaJiten, "dantaiCd":dantaiCd, "dantaiNm":dantaiNm, "url":url, "result":result}})
  # return send_file("tmp/" + timestampStr + ".pdf", as_attachment=True)


def insertJotai(document_name, chosa_jiten, dantai_cd, dantai_nm, file_url, jotai_message):
  jotai = Jotai()
  jotai.document_name = document_name
  jotai.chosa_jiten = chosa_jiten
  jotai.dantai_cd = dantai_cd
  jotai.dantai_nm = dantai_nm
  jotai.file_url = file_url
  jotai.jotai_message = jotai_message
  jotai.ymdt = datetime.datetime.now()
  db.session.add(jotai)
  
  db.session.commit()
  return "1"
# 


# @app.route('/getCityListByTdfkCd/<tdfkCd>')
# def getCityListByTdfkCd(tdfkCd):

@app.route('/executeFileCollect/<filePattern>',methods=["GET"])
def executeFileCollect(filePattern):
  link_list =[]
  for nen in ["h22","h23","h24","h25","h26","h27","h28","h29","h30", "r01"]:
    res = requests.get("https://www.soumu.go.jp/iken/zaisei/jyoukyou_shiryou/" + nen + "/index.html")
    soup = BeautifulSoup(res.content, 'html.parser')
    result = soup.select("a[href]")
    for link in result:
      href = link.get("href")
      text = link.text[1:]
      if href.endswith('xlsx') or href.endswith('xls'):
        tdfk = tdfkCodeByName(text)
        if tdfk != "":
          link_list.append({"document":filePattern, 
                            "year":nen, 
                            "dantai":tdfk, 
                            "text":text, 
                            "url" :"https://www.soumu.go.jp" + href.replace("https://www.soumu.go.jp",""),
                            "jotai" : getJotai("財政状況資料_都道府県", nen, tdfk)})

  return jsonify({'data': link_list})
  # return send_file("tmp/" + timestampStr + ".pdf", as_attachment=True)

def getJotai(document_name, chosa_jiten, dantai_cd):
    jotailist = Jotai.query.filter(Jotai.document_name==document_name,
      Jotai.chosa_jiten==chosa_jiten, Jotai.dantai_cd==dantai_cd).all()
    if jotailist == None:
      return "未取込"
    
    if len(jotailist) == 1:
      return jotailist[0].jotai_message
    else:
      return "未取込"


@app.route('/binaryTest',methods=["PUT"])
def binaryTest():
  fi = request.files['excelFile']
  # res = requests.get("https://www.soumu.go.jp" + xlfile)
  xl = pd.read_excel(fi, sheet_name=None)
  # xl = pd.read_excel(res.content, sheet_name=None)
  # fileshubetu = fileShubetu(xl)

  createSisetuMain(xl)
  # if fileshubetu=="sisetu":
  #   createSisetuMain(xl)
  # elif fileshubetu=="sokatu":
  #   createSokatuMain(xl)
  #   pass
  # else:
  #   pass

  return "1"
  # return send_file("tmp/" + timestampStr + ".pdf", as_attachment=True)

def fileShubetu(xlfile):
  for sh in xlfile:
    if xlfile[sh].columns[0] == "経年比較表（公共施設状況調）" :
      return "sisetu"
    elif "財政状況資料集" in xlfile[sh].columns[1] :
      return "sokatu"
    else:
      for row in xlfile[sh].itertuples():
          for cell in row:
            a = cell
            b = a
  return "1"

def createSokatuMain(xl):
  tokubetuShoku = ["知事","副知事","教育長","議会議長","議会副議長","議会議員"]
  ippanShoku = ["一般職員","うち消防職員","うち技能労務職員","警察官","教育公務員","臨時職員","合計"]

  timestamp = datetime.datetime.now()
  timestampStr = timestamp.strftime('%Y%m%d%H%M%S%f')
  dictData = {}
  for sh in xl:
    if sh == "総括表":
      for row in xl[sh].itertuples():
        dictData[(sh + str(row.Index+2))]=[]
        for cell in row:
          if str(cell) != "nan":
            dictData[(sh + str(row.Index+2))].append(str(cell).replace( '\n' , '' ).replace(" ",""))

  kokuChoCount = 0
  jukiJinkoCount = 0
  for rowid in dictData:
    for val in dictData[rowid]:
      if val in tokubetuShoku:
        dictData[rowid].insert(dictData[rowid].index(val)+2,val + "_給料額")
        tokubetuShoku.remove(val)
      elif "年国調" in val:
        if kokuChoCount==0:
          dictData[rowid][dictData[rowid].index(val)] = "人口_国勢調査_前回"
          kokuChoCount = 1
        else:
          dictData[rowid][dictData[rowid].index(val)] = "人口_国勢調査_前々回"
      elif isJukiJinko(val):
        if jukiJinkoCount == 0:
          dictData[rowid][dictData[rowid].index(val)] = "人口_住基台帳_当年度"
          jukiJinkoCount = 1
        else:
          dictData[rowid][dictData[rowid].index(val)] = "人口_住基台帳_前年度"
        # try:
        #   sisetuMain = SisetuMain()
        #   if isfloat(str(cell)):
        #     sisetuMain.val_num = float(cell)
        #   else:
        #     sisetuMain.val_char = str(cell)
        #   # db.session.add(sisetuMain)
        #   # db.session.commit()

        # except:
        #   # 何もしない
        #   import traceback
        #   traceback.print_exc()
  # tdfkCd = tdfkCodeByName(tdfkNm)
  try:
    nendo = seireki(dictData["総括表3"][5])
  except:
    import traceback
    traceback.print_exc()

  dictInsData = {}
  try:
    for rowid in dictData:
      for val in dictData[rowid]:
        if isfloat(str(val)):
          pass
        else:
          tmp = findPair(dictData, val)
          if tmp[1] != "" and tmp[0] != "-" and tmp[0] != "うち日本人(人)" and tmp[0] != "うち日本人(％)" :
            dictInsData[tmp[0]] = tmp[1]
  except:
    # 何もしない
    import traceback
    traceback.print_exc()
  

  colIndex = 1
  for rowid in dictInsData:
    try:
      # if colIndex <= 63:
      sisetuMain = SisetuMain()
      sisetuMain.nendo = nendo
      sisetuMain.bunrui = ""
      sisetuMain.dantai_cd =tdfkCodeByName(dictInsData["都道府県名"])
      sisetuMain.tdfk_nm = dictInsData["都道府県名"]
      sisetuMain.city_nm = dictInsData["都道府県名"]
      sisetuMain.sheet_nm = "test"
      sisetuMain.col_key1 = rowid
      sisetuMain.col_key2 = rowid
      colIndex = getColIndex(sisetuMain, colIndex)
      if colIndex <= 63:
        sisetuMain.col_index = colIndex
        cell = str(dictInsData[rowid])
        if isfloat(cell):
          sisetuMain.val_num = float(cell)
        else:
          sisetuMain.val_char = str(cell)
        db.session.add(sisetuMain)
        db.session.commit()

    except:
      # 何もしない
      import traceback
      traceback.print_exc()
          
    # colIndex += 1

  a = "1"
  b = a
  pass
  # for key in dictData:
  #     for row in dictData[key]:
  #       a = row
  #       b = a
  #       # columnId += 1


def isJukiJinko(key):
  tmp = key.split(".")
  if len(tmp)==3:
    tmp0 = tmp[0].replace("平","").replace("令","").replace("(人)","")
    tmp1 = tmp[1].replace("平","").replace("令","").replace("(人)","")
    tmp2 = tmp[1].replace("平","").replace("令","").replace("(人)","")
    if isfloat(tmp0) and isfloat(tmp1) and isfloat(tmp2) :
      return True
    # if isfloat(tmp[0]) and isfloat(tmp[1]) and isfloat(tmp[2]):
    #   if "(人)" in tmp[3]:
    #     return True

def getColIndex(sisetuMain, colIndex):
  
    datalist = db.session.query(db.func.max(SisetuMain.col_index).label("col_index")).filter( 
      SisetuMain.sheet_nm==sisetuMain.sheet_nm,
      SisetuMain.col_key1==sisetuMain.col_key1,
      SisetuMain.col_key2==sisetuMain.col_key2,
      SisetuMain.col_key3==sisetuMain.col_key3,
      SisetuMain.col_key4==sisetuMain.col_key4,
      SisetuMain.col_key5==sisetuMain.col_key5,
      SisetuMain.col_key6==sisetuMain.col_key6,
      SisetuMain.col_key7==sisetuMain.col_key7).all()
    if datalist[0].col_index == None:
      # 当該番号がすでに使われているかどうかを見る
      datalist = db.session.query(db.func.max(SisetuMain.col_index).label("col_index")).filter( 
        SisetuMain.sheet_nm==sisetuMain.sheet_nm).all()
      if datalist[0].col_index == None:
        return 1
      else:
        return datalist[0].col_index + 1
    else:
      return datalist[0].col_index


def tdfkCodeByName(tdfkName):
  try:
    cd = [k for k, v in tdfk.items() if v == tdfkName]
    return cd[0] + "0000"
  except:
    # 何もしない
    import traceback
    traceback.print_exc()
  return ""

def findPair(dictData, targetKey):
  find = False #発見フラグ
  for rowid in dictData:
    if find:
      return ["",""] #発見済みなのに次の行を見に行くのは最後列ということなので抜ける（キー：バリューの最後のバリュー）

    for val in dictData[rowid]:
      if val==targetKey:
        find=True
      else:
        if find:
          if isfloat(val) or val=="-" or (val in str(tdfk.values())) or isLeftNumeric(val):
            return [targetKey, val]
          else:
            return ["", ""]
        else:
          continue
            # if targetKey in tokubetuShoku :
            #   return [targetKey + "_定数", val]
            # elif targetKey in ippanShoku :
            #   return [targetKey + "_職員数", val]
            # else:
            #   return [targetKey, val]
  return ["", ""]

def isLeftNumeric(val):
  tmp = str(val).split("(")
  if len(tmp) == 2:
    if isfloat(tmp[0]):
      return True

  return False

def createSisetuMain(xl):
  timestamp = datetime.datetime.now()
  timestampStr = timestamp.strftime('%Y%m%d%H%M%S%f')
  dictJuchu = {}
  for sh in xl:
    for row in xl[sh].itertuples():

      columnId = 1
      for cell in row[19:117]:
        
        try:
          analyMain = AnalyMain()
          analyMain.nendo = int(row.決算年度)
          analyMain.gyomu_cd = row.業務コード
          analyMain.gyoshu_cd = row.業種コード
          analyMain.jigyo_cd = row.事業コード
          analyMain.sisetu_cd = row.施設コード
          analyMain.sisetu_nm = row.施設名
          analyMain.dantai_cd = row.団体コード
          analyMain.dantai_nm = row.団体名
          analyMain.hyo_num = row.表番号
          analyMain.gyo_num = row.行番号
          analyMain.joken_1 = row.条件1
          analyMain.joken_2 = row.条件2
          analyMain.joken_3 = row.条件3
          analyMain.joken_4 = row.条件4
          analyMain.joken_5 = row.条件5
          analyMain.joken_6 = row.条件6
          analyMain.joken_7 = row.条件7
          analyMain.joken_8 = row.条件8
          analyMain.retu_num = columnId
          if isfloat(str(cell)):
            analyMain.val_num = float(cell)
          else:
            analyMain.val_char = str(cell)
          db.session.add(analyMain)
          db.session.commit()

        except:
          # 何もしない
          import traceback
          traceback.print_exc()
        
        columnId += 1


# 
# 団体リスト
@app.route('/getDantaiListOfRadarChart/<nendo>')
def getDantaiListOfRadarChart(nendo):
    datalist = VAnalySisetu.query.filter(
        VAnalySisetu.nendo == nendo
      ).order_by(
          asc(VAnalySisetu.dantai_cd), 
          asc(VAnalySisetu.sisetu_cd)
      ).all()
    datalist_schema = VAnalySisetuSchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


# 収益性ランキングの作成（経常収支比率の昇順）
@app.route('/getShuekiRankList/<nendo>')
def getShuekiRankList(nendo):
    datalist = VAnalyShuekiseiA.query.filter(VAnalyShuekiseiA.nendo == nendo, VAnalyShuekiseiA.keijo_shusi_hiritu != None).order_by(desc(VAnalyShuekiseiA.keijo_shusi_hiritu)).all()
    datalist_schema = VAnalyShuekiseiASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})

# 安全性ランキングの作成（流動比率の昇順）
@app.route('/getAnzenRankList/<nendo>')
def getAnzenRankList(nendo):
    datalist = VAnalyRyudoAnzenseiA.query.filter(VAnalyRyudoAnzenseiA.nendo == nendo, VAnalyRyudoAnzenseiA.ryudo_hiritu != None).order_by(desc(VAnalyRyudoAnzenseiA.ryudo_hiritu)).all()
    datalist_schema = VAnalyRyudoAnzenseiASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


# 累積欠損金比率ランキングの作成（流動比率の昇順）
@app.route('/getRuisekiKessonRankList/<nendo>')
def getRuisekiKessonRankList(nendo):
    datalist = VAnalyRuisekiKessonA.query.filter(VAnalyRuisekiKessonA.nendo == nendo, VAnalyRuisekiKessonA.ruiseki_kesson_hiritu != None).order_by(desc(VAnalyRuisekiKessonA.ruiseki_kesson_hiritu)).all()
    datalist_schema = VAnalyRuisekiKessonASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


# 企業債残高対給水収益比率（％）
@app.route('/getKigyosaiKyusuiRankList/<nendo>')
def getKigyosaiKyusuiRankList(nendo):
    datalist =VAnalyKigyosaiPerKyusuiA.query.filter(VAnalyKigyosaiPerKyusuiA.nendo == nendo, VAnalyKigyosaiPerKyusuiA.kigyosai_shueki_hiritu != None).order_by(desc(VAnalyKigyosaiPerKyusuiA.kigyosai_shueki_hiritu)).all()
    datalist_schema = VAnalyKigyosaiPerKyusuiASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})



# 有形固定資産減価償却率 ※減価償却累計　割る（簿価＋減価償却累計）
@app.route('/getKoteiShokyakurituRankList/<nendo>')
def getKoteiShokyakurituRankList(nendo):
    datalist =VAnalyKoteiShokyakurituA.query.filter(VAnalyKoteiShokyakurituA.nendo == nendo, VAnalyKoteiShokyakurituA.shokyaku_hiritu != None).order_by(desc(VAnalyKoteiShokyakurituA.shokyaku_hiritu)).all()
    datalist_schema = VAnalyKoteiShokyakurituASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})

# 病床利用率
@app.route('/getByoshoRiyorituRankList/<nendo>')
def getByoshoRiyorituRankList(nendo):
    datalist = VAnalyByoshoRiyorituA.query.filter(VAnalyByoshoRiyorituA.nendo == nendo, VAnalyByoshoRiyorituA.riyoritu != None).order_by(desc(VAnalyByoshoRiyorituA.riyoritu)).all()
    datalist_schema = VAnalyByoshoRiyorituASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


# 入院患者一人１日あたり収益
@app.route('/getNyuinHitoriShuekiRankList/<nendo>')
def getNyuinHitoriShuekiRankList(nendo):
    datalist = VAnalyNyuinHitoriShuekiA.query.filter(VAnalyNyuinHitoriShuekiA.nendo == nendo, VAnalyNyuinHitoriShuekiA.hitori_ichinichi_shueki != None).order_by(desc(VAnalyNyuinHitoriShuekiA.hitori_ichinichi_shueki)).all()
    datalist_schema = VAnalyNyuinHitoriShuekiASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})

# ROE
@app.route('/getReturnOnEquityRankList/<nendo>')
def getReturnOnEquityRankList(nendo):
    datalist = VAnalyReturnOnEquityA.query.filter(VAnalyReturnOnEquityA.nendo == nendo, VAnalyReturnOnEquityA.roe != None).order_by(desc(VAnalyReturnOnEquityA.roe)).all()
    datalist_schema = VAnalyReturnOnEquityASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})

# ROA
@app.route('/getReturnOnAssetRankList/<nendo>')
def getReturnOnAssetRankList(nendo):
    datalist = VAnalyReturnOnEquityA.query.filter(VAnalyReturnOnEquityA.nendo == nendo, VAnalyReturnOnEquityA.roa != None).order_by(desc(VAnalyReturnOnEquityA.roa)).all()
    datalist_schema = VAnalyReturnOnEquityASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


# 資本比率
@app.route('/getSihonHirituRankList/<nendo>')
def getSihonHirituRankList(nendo):
    datalist = VAnalyReturnOnEquityA.query.filter(VAnalyReturnOnEquityA.nendo == nendo, VAnalyReturnOnEquityA.sihon_hiritu != None).order_by(desc(VAnalyReturnOnEquityA.sihon_hiritu)).all()
    datalist_schema = VAnalyReturnOnEquityASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


# 固定比率
@app.route('/getKoteiHirituRankList/<nendo>')
def getKoteiHirituRankList(nendo):
    datalist = VAnalyKoteiHirituA.query.filter(VAnalyKoteiHirituA.nendo == nendo, VAnalyKoteiHirituA.kotei_hiritu != None).order_by(desc(VAnalyKoteiHirituA.kotei_hiritu)).all()
    datalist_schema = VAnalyKoteiHirituASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})

# 労働生産性
@app.route('/getJugyoinHitoriRiekiRankList/<nendo>')
def getJugyoinHitoriRiekiRankList(nendo):
    datalist = VAnalyJugyoinHitoriRiekiA.query.filter(VAnalyJugyoinHitoriRiekiA.nendo == nendo, VAnalyJugyoinHitoriRiekiA.hitori_rieki != None).order_by(desc(VAnalyJugyoinHitoriRiekiA.hitori_rieki)).all()
    datalist_schema = VAnalyJugyoinHitoriRiekiASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


# 経常利益成長率
@app.route('/getKeijoriekiSeichorituRankList/<nendo>')
def getKeijoriekiSeichorituRankList(nendo):
    datalist = VAnalyKeijoriekiSeichorituA.query.filter(VAnalyKeijoriekiSeichorituA.nendo == nendo, VAnalyKeijoriekiSeichorituA.seicho_ritu != None).order_by(desc(VAnalyKeijoriekiSeichorituA.seicho_ritu)).all()
    datalist_schema = VAnalyKeijoriekiSeichorituASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})

# 資本成長率
@app.route('/getSihonSeichorituRankList/<nendo>')
def getSihonSeichorituRankList(nendo):
    datalist = VAnalySihonSeichorituA.query.filter(VAnalySihonSeichorituA.nendo == nendo, VAnalySihonSeichorituA.seicho_ritu != None).order_by(desc(VAnalySihonSeichorituA.seicho_ritu)).all()
    datalist_schema = VAnalySihonSeichorituASchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


# 基本情報タブ用の表リスト取得
@app.route('/getHyoListForProfile/<nendo>/<gyomu_cd>/<gyoshu_cd>/<jigyo_cd>/<dantai_cd>/<sisetu_cd>')
def getHyoListForProfile(nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd):
    datalist = AnalyHyo.query.filter(AnalyHyo.nendo == nendo).order_by(asc(AnalyHyo.hyo_num)).all()
    datalist_schema = AnalyHyoSchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


# 業種・事業マスタ取得
@app.route('/getAnalyJigyo/<nendo>')
def getAnalyJigyo(nendo):
    datalist = AnalyJigyo.query.filter(AnalyJigyo.nendo == nendo).order_by(asc(AnalyJigyo.gyoshu_cd),asc(AnalyJigyo.jigyo_cd)).all()
    datalist_schema = AnalyJigyoSchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


@app.route('/getHyoData/<nendo>/<gyomu_cd>/<gyoshu_cd>/<jigyo_cd>/<dantai_cd>/<sisetu_cd>/<hyo_num>')
def getHyoData(nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, hyo_num):
    datalist = VAnalyHyo.query.filter(
                  VAnalyHyo.gyomu_cd == gyomu_cd,
                  VAnalyHyo.gyoshu_cd == gyoshu_cd,
                  VAnalyHyo.jigyo_cd == jigyo_cd,
                  VAnalyHyo.dantai_cd == dantai_cd,
                  VAnalyHyo.sisetu_cd == sisetu_cd,
                  VAnalyHyo.hyo_num == hyo_num
                ).order_by(asc(VAnalyHyo.gyo_num), asc(VAnalyHyo.retu_num)).all()
    datalist_schema = VAnalyHyoSchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})



# レーダーチャートのデータを取得
def getValue(nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, hyo_num, gyo_num, retu_num):
  ret = 0
  resultset=[]
  sql = ""
  sql =  sql + "select sum(val_num) val from analy_main "
  sql =  sql + "    where nendo = " + str(nendo) + " and "
  sql =  sql + "          gyomu_cd = '" + gyomu_cd + "' and "
  sql =  sql + "          gyoshu_cd = '" + gyoshu_cd + "' and "
  sql =  sql + "          jigyo_cd = '" + jigyo_cd + "' and "
  sql =  sql + "          dantai_cd = '" + dantai_cd + "' and "
  sql =  sql + "          sisetu_cd = '" + sisetu_cd + "' and "
  sql =  sql + "          hyo_num = " + str(hyo_num) + " and "
  sql =  sql + "          gyo_num = " + str(gyo_num) +  " and "
  sql =  sql + "          retu_num = " + str(retu_num)

  if db.session.execute(text(sql)).fetchone() is not None:
    datalist = db.session.execute(text(sql))
    if datalist is not None:
      for row in datalist:
        if row["val"] == None:
          ret = 0
        else:
          ret = row["val"] #resultset.append({"source":tableNm[i], "val":row[columnNm[i]]})
    else:
      ret = 0
  else:
    ret = 0
  return ret



# 資本成長率
def getKijunValue(nendo, gyomu_cd, gyoshu_cd, jigyo_cd):
    datalist = AnalyKijun.query.filter(
        AnalyKijun.nendo == nendo, 
        AnalyKijun.gyomu_cd == gyomu_cd, 
        AnalyKijun.gyoshu_cd == gyoshu_cd, 
        AnalyKijun.jigyo_cd == jigyo_cd
    ).all()
    return datalist

def getHensaKouryoValue(resultSet, hensaSet):
  hyotei = 0
  if len(hensaSet) != 0 :
    for netRec in resultSet:
      for hensaRec in hensaSet:

        if hensaRec.average_val == None:
          hensaRec.average_val = 0
        if hensaRec.hensa_val == None:
          hensaRec.hensa_val = 0
          
        if netRec["source"] == hensaRec.kijun_cd:
          if hensaRec.average_val <= netRec["val"] <= (hensaRec.average_val + hensaRec.hensa_val):
            hyotei = 5 # 平均プラス方向に１範囲
          elif hensaRec.average_val <= netRec["val"] <= (hensaRec.average_val + (hensaRec.hensa_val*2)):
            hyotei = 6 # 平均プラス方向に２範囲
          elif hensaRec.average_val <= netRec["val"] <= (hensaRec.average_val + (hensaRec.hensa_val*3)):
            hyotei = 7 # 平均プラス方向に３範囲
          elif hensaRec.average_val <= netRec["val"] <= (hensaRec.average_val + (hensaRec.hensa_val*4)):
            hyotei = 8 # 平均プラス方向に４範囲
          elif hensaRec.average_val <= netRec["val"] <= (hensaRec.average_val + (hensaRec.hensa_val*5)):
            hyotei = 9 # 平均プラス方向に５範囲
          elif hensaRec.average_val <= netRec["val"]:
            hyotei = 10 # 平均プラス方向に６範囲
          elif hensaRec.average_val > netRec["val"] >= (hensaRec.average_val - (hensaRec.hensa_val)):
            hyotei = 4 # 平均マイナス方向に１範囲
          elif hensaRec.average_val > netRec["val"] >= (hensaRec.average_val - (hensaRec.hensa_val*2)):
            hyotei = 3 # 平均マイナス方向に２範囲
          elif hensaRec.average_val > netRec["val"] >= (hensaRec.average_val - (hensaRec.hensa_val*3)):
            hyotei = 2 # 平均マイナス方向に３範囲
          elif hensaRec.average_val > netRec["val"] >= (hensaRec.average_val - (hensaRec.hensa_val*4)):
            hyotei = 1 # 平均マイナス方向に４範囲
          else:
            hyotei = 0

          netRec["val"] = hyotei

  return resultSet

@app.route('/getRadarChartData/<nendo>/<gyomu_cd>/<gyoshu_cd>/<jigyo_cd>/<dantai_cd>/<sisetu_cd>')
def getRadarChartData(nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd):
    resultset=[]

    toki_sihonkin = getValue(nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, 22, 1, 68)
    zenki_sihonkin = getValue(int(nendo)-1, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, 22, 1, 68)

    toki_eigyo_shueki = getValue(nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, 20, 1, 2)
    toki_eigyo_gai_shueki = getValue(nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, 20, 1, 15)
    toki_eigyo_hiyo = getValue(nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, 20, 1, 26)
    toki_eigyo_gai_hiyo = getValue(nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, 20, 1, 40)
    zenki_eigyo_shueki = getValue(int(nendo)-1, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, 20, 1, 2)
    zenki_eigyo_gai_shueki = getValue(int(nendo)-1, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, 20, 1, 15)
    zenki_eigyo_hiyo = getValue(int(nendo)-1, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, 20, 1, 26)
    zenki_eigyo_gai_hiyo = getValue(int(nendo)-1, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, 20, 1, 40)

    toki_keijo_rieki = (toki_eigyo_shueki + toki_eigyo_gai_shueki) - (toki_eigyo_hiyo + toki_eigyo_gai_hiyo)
    zenki_keijo_rieki = (zenki_eigyo_shueki + zenki_eigyo_gai_shueki) - (zenki_eigyo_hiyo + zenki_eigyo_gai_hiyo)



    sihon_seicho_ritu = 0 
    if zenki_sihonkin != 0:
      sihon_seicho_ritu = round( ((toki_sihonkin - zenki_sihonkin) / zenki_sihonkin) * 100)
    resultset.append({"source":"sihon_seicho_ritu", "val":sihon_seicho_ritu })

    keijorieki_seicho_ritu = 0
    if zenki_keijo_rieki != 0:
      keijorieki_seicho_ritu = round( ((toki_keijo_rieki - zenki_keijo_rieki) / zenki_keijo_rieki) * 100)
    resultset.append({"source":"keijorieki_seicho_ritu", "val":keijorieki_seicho_ritu })



    tableNm = [
      "v_analy_shuekisei_a",    "v_analy_jugyoin_hitori_rieki_a",
      "v_analy_kotei_hiritu_a",
      "v_analy_return_on_equity_a",    "v_analy_return_on_equity_a",
      "v_analy_return_on_equity_a",
      "v_analy_ryudo_anzensei_a",    "v_analy_kotei_shokyakuritu_a",
    ]

    columnNm = [
      "keijo_shusi_hiritu",    "hitori_rieki",
      "kotei_hiritu",
      "sihon_hiritu",    "roe",
      "roa",
      "ryudo_hiritu",    "shokyaku_hiritu",
    ]

    for i in range(0, 8):
      sql = ""
      sql = sql + " select "+ columnNm[i] + " from " + tableNm[i] 
      sql =  sql + " where nendo = " + nendo + " and "
      sql =  sql + "          gyomu_cd = '" + gyomu_cd + "' and "
      sql =  sql + "          gyoshu_cd = '" + gyoshu_cd + "' and "
      sql =  sql + "          jigyo_cd = '" + jigyo_cd + "' and "
      sql =  sql + "          dantai_cd = '" + dantai_cd + "' and "
      sql =  sql + "          sisetu_cd = '" + sisetu_cd + "'  "
      if db.session.execute(text(sql)).fetchone() is not None:
        datalist = db.session.execute(text(sql))
        if datalist is not None:
          for row in datalist:
            if row[columnNm[i]] is not None:
              resultset.append({"source":columnNm[i], "val":row[columnNm[i]]})
            else:
              resultset.append({"source":columnNm[i], "val":0})
        else:
          resultset.append({"source":columnNm[i], "val":0})
      else:
        resultset.append({"source":columnNm[i], "val":0})
    
    resultset = getHensaKouryoValue(resultset, getKijunValue(nendo, gyomu_cd, gyoshu_cd, jigyo_cd))

    return jsonify({'data': json.dumps(resultset,default=decimal_default_proc)})
    # json.dumps(resultset,default=decimal_default_proc)
    # return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})


# @app.route('/getCityListByTdfkCd/<tdfkCd>')
# def getCityListByTdfkCd(tdfkCd):
#     vcitylist = VCity.query.filter(VCity.tdfk_cd==tdfkCd).order_by(asc(VCity.dantai_cd)).all()
#     vcitylist_schema = VCitySchema(many=True)
#     return jsonify({'data': vcitylist_schema.dumps(vcitylist, ensure_ascii=False)})

# @app.route('/getCityListByTdfkCd/<tdfkCd>')
# def getCityListByTdfkCd(tdfkCd):
#     vcitylist = VCity.query.filter(VCity.tdfk_cd==tdfkCd).order_by(asc(VCity.dantai_cd)).all()
#     vcitylist_schema = VCitySchema(many=True)
#     return jsonify({'data': vcitylist_schema.dumps(vcitylist, ensure_ascii=False)})


        
def isfloat(strval):
  try:
    if strval=="nan" :
      return False
      
    float(strval)  # 文字列をfloatにキャスト
    return True
  except ValueError:
    return False

def null2blank(val):
  if val == "null":
    return ""
  else:
    return val

def seireki(wareki):
  str = wareki
  word = str.split('年度')  # +以前と以降で分割
  year = word[0]  # +以前の値以外いらないので前半のみ格納
  # year = year[:-1]  # 入力値の末尾の年を削除

  jp_cal = ["明治", "大正", "昭和", "平成", "令和"]
  # 明治 1868~1911(1912),大正1912~1925(1926),昭和1926~1988(1989),平成1989~2018,令和2019~
  ad = 0  # 和暦->西暦変換した時の西暦を表す変数
  jp = year[:2]  # 年号部分の切り出し
  yy = year[2:]  # 年部分の切り出し

  # 年号によってadに値を入れていく
  if jp == jp_cal[0]:
      ad += 1868
  elif jp == jp_cal[1]:
      ad += 1912
  elif jp == jp_cal[2]:
      ad += 1926
  elif jp == jp_cal[3]:
      ad += 1989
  elif jp == jp_cal[4]:
      ad += 2019

  # 元年でないならば、その値-1(元年が1年であるため)をadに足す
  if yy != '元':
      ad += int(yy)-1

  return ad
      


@app.route('/getFullRecordByDantaiCd/<cityCd>')
def getFullRecordByDantaiCd(cityCd):
    nendos = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
    datalist = SisetuMain.query.filter( 
    SisetuMain.dantai_cd==cityCd, SisetuMain.nendo.in_(nendos)).order_by(asc(SisetuMain.sheet_nm), 
    asc(SisetuMain.col_index), 
    asc(SisetuMain.nendo)).all()
    datalist_schema = SisetuMainSchema(many=True)
    return jsonify({'data': datalist_schema.dumps(datalist, ensure_ascii=False, default=decimal_default_proc)})

def decimal_default_proc(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError


@app.route('/getCsvData/<viewnm>/<nentuki>/<groupkb>/<tanto>')
@login_required
def resJson_getCsvData(viewnm, nentuki, groupkb, tanto):

  sqlwhere=" tenant_id = '" + current_user.tenant_id + "' "
  if viewnm == "v_csv_uriage_tantobetu":
    sqlwhere = sqlwhere + " and nen = '" + nentuki[0:4] + "' and tuki = '" + nentuki[4:6] + "' and group_id = " + groupkb + " and tanto_id = '" + tanto + "' " 
  elif viewnm == "v_csv_uriage_groupbetu":
    sqlwhere = sqlwhere + " and nen = '" + nentuki[0:4] + "' and tuki = '" + nentuki[4:6] + "' and group_id = " + groupkb + " and tanto_id = '" + tanto + "' " 
  elif viewnm == "v_csv_uriage_kokyakubetu":
    sqlwhere = sqlwhere + " and nen = '" + nentuki[0:4] + "' and tuki = '" + nentuki[4:6] + "' and group_id = " + groupkb + " and tanto_id = '" + tanto + "' " 
  elif viewnm == "v_csv_hikiotosi":
    sqlwhere = sqlwhere + " and nen = '" + nentuki[0:4] + "' and tuki = '" + nentuki[4:6] + "' and group_id = " + groupkb + " and tanto_id = '" + tanto + "' " 
  elif viewnm == "v_csv_takuhai":
    sqlwhere = sqlwhere + " and group_id = " + groupkb + " and tanto_id = '" + tanto + "' " 
  else:
    None

  sqlA = "select * from " + viewnm + " where " + sqlwhere
  sqlB = "select * from mst_setting where param_id = 'VIEW_COLUMN_NAME' and param_val1 = '" + viewnm + "' and tenant_id = '"+ current_user.tenant_id +"'"

  if db.session.execute(text(sqlA)).fetchone() is not None:
    csvdata = db.session.execute(text(sqlA))

  if db.session.execute(text(sqlB)).fetchone() is not None:
    coldata = db.session.execute(text(sqlB))

  resultset=[]

  for row in coldata:
    resultset.append(row.param_val2.split(","))

  for row in csvdata:
    resultset.append(row)

  timestamp = datetime.datetime.now()
  timestampStr = timestamp.strftime('%Y%m%d%H%M%S%f')
  filename = "file_" + viewnm + "_" + timestampStr + "_" + current_user.name
  
  export_list_csv(resultset, "tmp/" + filename + ".csv")

  # response = make_response()
  # response.data = open("tmp/" + filename + ".pdf", "rb").read()

  # make_list()

  return send_file("tmp/" + filename + ".csv", as_attachment=True)

def export_list_csv(export_list, csv_dir):
  with open(csv_dir, "w", encoding='utf8') as f:
    writer = csv.writer(f, lineterminator='\n')
    writer.writerows(export_list)




@app.route('/getBunyaMap/<vendornm>')
def resJson_getBunyaMap(vendornm):
    bunyamap = VBunyaMapGroupbyVendor.query.filter(VBunyaMapGroupbyVendor.vendor_nm==vendornm).order_by(asc(VBunyaMapGroupbyVendor.bunya_cd)).all()
    bunyamap_schema = VBunyaMapGroupbyVendorSchema(many=True)
    return jsonify({'data': bunyamap_schema.dumps(bunyamap, ensure_ascii=False)})


@app.route('/getTodohuken/<vendornm>')
def resJson_getTodohuken(vendornm):
    Todohuken = VTodohukenGroupbyVendor.query.filter(VTodohukenGroupbyVendor.vendor_nm==vendornm).order_by(desc(VTodohukenGroupbyVendor.kensu)).all()
    Todohuken_schema = VTodohukenGroupbyVendorSchema(many=True)
    return jsonify({'data': Todohuken_schema.dumps(Todohuken, ensure_ascii=False)})

@app.route('/insertToko/<vendornm>/<systemnm>/<rank1>/<comment1>/<kibo>/<todohuken>')
def insertToko(vendornm, systemnm, rank1, comment1, kibo, todohuken):
  kaito = Kaito()
  kaito.vendor_nm = vendornm
  kaito.system_nm = systemnm
  kaito.situmon_kb = 1
  kaito.hyoka_shubetu = 1
  kaito.hyoka_value = rank1
  kaito.hyoka_comment = comment1
  kaito.ymdt = datetime.datetime.now()
  db.session.add(kaito)
  
  kaito = Kaito()
  kaito.vendor_nm = vendornm
  kaito.system_nm = systemnm
  kaito.situmon_kb = 1
  kaito.hyoka_shubetu = 2
  kaito.hyoka_value = kibo
  kaito.ymdt = datetime.datetime.now()
  db.session.add(kaito)
  
  kaito = Kaito()
  kaito.vendor_nm = vendornm
  kaito.system_nm = systemnm
  kaito.situmon_kb = 1
  kaito.hyoka_shubetu = 3
  kaito.hyoka_value = todohuken
  kaito.ymdt = datetime.datetime.now()
  db.session.add(kaito)
  
  db.session.commit()
  return "1"

@app.route('/insertNanajikuHyoka/<vendornm>/<vals>')
def insertNanajikuHyoka(vendornm, vals):
  vals = vals.split(",")
  for idx in range(0, 7): #0,1,2,3,4,5,6
    if vals[idx].isdecimal():
      kaito = Kaito()
      kaito.vendor_nm = vendornm
      kaito.situmon_kb = 2
      kaito.hyoka_shubetu = idx+1
      kaito.hyoka_value = vals[idx]
      kaito.ymdt = datetime.datetime.now()
      db.session.add(kaito)
  
  db.session.commit()
  return "1"

@app.route('/insertTokuiBunya/<vendornm>/<vals>')
def insertTokuiBunya(vendornm, vals):
  for chk_val in vals.split("|"):
    if len(chk_val.split(",")) == 2:
      cd = chk_val.split(",")[0]
      val = chk_val.split(",")[1]

      kaito = Kaito()
      kaito.vendor_nm = vendornm
      kaito.situmon_kb = 3
      kaito.hyoka_shubetu = cd
      kaito.hyoka_value = val
      kaito.ymdt = datetime.datetime.now()
      db.session.add(kaito)
  
  db.session.commit()
  return "1"

@app.route('/scrapeByVendorNm/<vendornm>')
def scrapeByVendorNm(vendornm):
  # スクレイピング対象の URL にリクエストを送り HTML を取得する
  res = requests.get('https://www.njss.info/bidders/view/' + vendornm + '/')
  # レスポンスの HTML から BeautifulSoup オブジェクトを作る
  soup = BeautifulSoup(res.text, 'html.parser')
  # title タグの文字列を取得する
  title_text = soup.find('title').get_text()
  author_names = [n.get_text() for n in soup.select('div.search_result__list__title search_result__list__title__wmax')]
  # for n in soup.select('div.search_result__list__title search_result__list__title__wmax'):


  # print(author_names)
  # print(title_text)
  # > Quotes to Scrape
  # ページに含まれるリンクを全て取得する
  # links = [url.get('href') for url in soup.find_all('a')]
  dictJuchu = {}
  dictJuchu['aaData']=[]     
  wrappers = soup.find_all(class_="smt_box_wrapper")
  for w in wrappers:
    anken = w.find_all(class_="search_result__list__title search_result__list__title__wmax") # soup.find_all("a", href="sample.pdf")
    if len(anken)==1:
      infos =  w.find_all(class_="search_result__list__information search_result__list__information__wmax")
      dates =  w.find_all(class_="search_result__list__date search_result__list__date__wmax")
      
      for i in infos:
        if len(i.find_all(class_="category"))==3 and len(i.find_all("a"))==3 :
          cates = i.find_all(class_="category")
          vals = i.find_all("a")
          
          d_cate = ""
          d_val = ""
          if len(dates)==1:
            d_cate = dates[0].find_all(class_="category")[0].get_text()
            d_val = dates[0].find_all(class_="category")[0].next_sibling.strip(" ")
          
          dictJuchu["aaData"].append( \
            {"anken":anken[0].get_text().replace("\n",""), \
              "todofuken": vals[0].get_text(), \
              "kikan": vals[1].get_text(), \
                "keisiki": vals[2].get_text(), \
                  "rakusatubi": d_val} 
          )

  # print(links)
  # > ['/', '/login', '/author/Albert-Einstein', '/tag/change/page/1/', '/tag/deep-thoughts/page/1/', '/tag/thinking/page/1/', '/tag/world/page/1/', '/author/J-K-Rowling', '/tag/abilities/page/1/', '/tag/choices/page/1/', '/author/Albert-Einstein', '/tag/inspirational/page/1/', '/tag/life/page/1/', '/tag/live/page/1/', '/tag/miracle/page/1/', '/tag/miracles/page/1/', '/author/Jane-Austen', '/tag/aliteracy/page/1/', '/tag/books/page/1/', '/tag/classic/page/1/', '/tag/humor/page/1/', '/author/Marilyn-Monroe', '/tag/be-yourself/page/1/', '/tag/inspirational/page/1/', '/author/Albert-Einstein', '/tag/adulthood/page/1/', '/tag/success/page/1/', '/tag/value/page/1/', '/author/Andre-Gide', '/tag/life/page/1/', '/tag/love/page/1/', '/author/Thomas-A-Edison', '/tag/edison/page/1/', '/tag/failure/page/1/', '/tag/inspirational/page/1/', '/tag/paraphrased/page/1/', '/author/Eleanor-Roosevelt', '/tag/misattributed-eleanor-roosevelt/page/1/', '/author/Steve-Martin', '/tag/humor/page/1/', '/tag/obvious/page/1/', '/tag/simile/page/1/', '/page/2/', '/tag/love/', '/tag/inspirational/', '/tag/life/', '/tag/humor/', '/tag/books/', '/tag/reading/', '/tag/friendship/', '/tag/friends/', '/tag/truth/', '/tag/simile/', 'https://www.goodreads.com/quotes', 'https://scrapinghub.com']
  # class が quote の div 要素を全て取得する
  # quote_elms = soup.find_all('div', {'class': 'quote'})
  return json.dumps(dictJuchu, skipkeys=True, ensure_ascii=False)



# ログインしないと表示されないパス
@app.route('/protected/')
@login_required
def protected():
    return Response('''
    protected<br />
    <a href="/logout/">logout</a>
    ''')

# ログインパス
@app.route('/', methods=["GET", "POST"])
@app.route('/login/', methods=["GET", "POST"])
@app.route('/demologin', methods=["GET", "POST"])
def login():
  return render_template('index.haml')
    #session.permanent = True
    #app.permanent_session_lifetime = timedelta(minutes=30)
    #if(request.method == "POST"):
    #    try:
    #      msg = create_message(mail_address, mail_address, "", "LatteCloudログイン試行", request.form["username"] + ", " + request.form["password"])
    #      send(mail_address, mail_address, mail_password, msg)
    #    except:
    #      # 何もしない
    #      import traceback
    #    # traceback.print_exc()
    #    # ユーザーチェック
    #    if(request.form["username"] in user_check and request.form["password"] == user_check[request.form["username"]]["password"] and request.form["username"] !="demo") or \
    #      (request.form["username"] == "demo" and request.form["password"]=="demo" and 'demologin' in request.url) :
    #        # ユーザーが存在した場合はログイン
    #      login_user(users.get(user_check[request.form["username"]]["id"]))
#
    #      if current_user.name=="demo":
    #        app.permanent_session_lifetime = timedelta(minutes=30)
#
    #      return render_template('index.haml')
#
    #    else:
    #        # return "401"
    #        return render_template("login.haml", result=401)
    #        # return abort(401)
    #else:
    #    return render_template("login.haml")

# ログアウトパス
@app.route('/logout/')
def logout():
    logout_user()
    return render_template("login.haml")


if __name__ == "__main__":
    app.run(debug=True)
