/*
|| バニラで書いていく。
*/
var radarChart=null;
var scatterChart = null;
var gyoshuSelectStauts = null;
var apiMixLineChart = null;
var globalSelectedRow = null;

Chart.defaults.color = '#666666';
Chart.defaults.font.weight = 'Bold';
Chart.defaults.elements.point.borderWidth = 2;
Chart.defaults.elements.line.borderWidth = 2;
Chart.defaults.elements.point.radius = 2;
// Chart.defaults.font.size = 10;
//Chart.defaults.animation = false; // disables all animations
// Chart.defaults.animations.colors = false; // disables animation defined by the collection of 'colors' properties
// Chart.defaults.animations.x = false; // disables animation defined by the 'x' property
//Chart.defaults.transitions.active.animation.duration = 0; // disables the animation for 'active' mode
 
// Chart.defaults.elements.font.size = "15px";

window.onload = function(){

  // /* スーパーリロードを実装。最終的にソースが固まったら外す。*/
  // if(document.URL.indexOf("#")==-1){
  //   url = document.URL+"#";
  //   location = "#";
  //   window.location.href = window.location.href;
  // }

  createSelectGyoshuPopOver();

  createMapSummary();

  try{
    getAndCreateTable_ShuekiRankList();//収益性ランキングテーブルを作成
    getAndCreateTable_AnzenRankList();//安全性ランキングテーブルを作成
    getAndCreateTable_RuisekiKessonRankList(); //健全性ランキングテーブル（累積欠損比率）
    getAndCreateTable_KigyosaiKyusuiRankList(); //健全性ランキングテーブル（起債 割る 給水収益）
    getAndCreateTable_KoteiShokyakurituRankList(); //健全性ランキングテーブル（減価償却累計 割る 簿価＋減価償却累計）
    getAndCreateTable_ByoshoRiyorituRankList(); //効率性ランキングテーブル（延べ年間患者数　割る　延べ病床数）
    getAndCreateTable_NyuinHitoriShuekiRankList(); //収益性ランキングテーブル（入院患者一人１日あたり収益）

    getAndCreateTable_ReturnOnEquityRankList();// # ROE
    getAndCreateTable_ReturnOnAssetRankList();// # ROA
    getAndCreateTable_SihonHirituRankList();// # 資本比率
    getAndCreateTable_KoteiHirituRankList();// # 固定比率
    getAndCreateTable_JugyoinHitoriRiekiRankList();// # 労働生産性
    getAndCreateTable_KeijoriekiSeichorituRankList();// # 経常利益成長率
    getAndCreateTable_SihonSeichorituRankList();// # 資本成長率

    //getAndCreateTable_DantaiListOfRadarChart(); //レーダーチャート右の団体リスト

    //CreateRadarChart("");
    createScatterSelectXY();
    createVersionNote();

  }catch(e){
    console.log(e.message);
  }
  return;
}

document.getElementById("selectGyoshuDigestTab").addEventListener('shown.bs.popover', function () {
  if(gyoshuSelectStauts!=null){
    for(let i in gyoshuSelectStauts){
      document.getElementById(gyoshuSelectStauts[i].id).checked = isCheckON(gyoshuSelectStauts[i]);
    }
  }
});

function isCheckON(elem){
  try{
    if(elem.checked){
      return true;
    }
  }catch(e){
    return false;
  }
  return false;
}

document.getElementById("selectGyoshuDigestTab").addEventListener('hide.bs.popover', function () {
  gyoshuSelectStauts = document.querySelectorAll(".btn-check");
  var selected = "";
  for (let i in gyoshuSelectStauts){
    if(gyoshuSelectStauts[i].checked){
      selected = selected + ", " + gyoshuSelectStauts[i].nextSibling.querySelectorAll("span")[1].innerText.substring(0,4);//gyoshuSelectStauts[i].querySelector("span").innerText;
    }
  }
  document.getElementById("selectedGyoshuTxt").innerText = selected.substring(1,100).trim();

  getAndCreateTable_ShuekiRankList();//収益性ランキングテーブルを作成
  getAndCreateTable_AnzenRankList();//安全性ランキングテーブルを作成
  getAndCreateTable_RuisekiKessonRankList(); //健全性ランキングテーブル（累積欠損比率）
  getAndCreateTable_KigyosaiKyusuiRankList(); //健全性ランキングテーブル（起債 割る 給水収益）
  getAndCreateTable_KoteiShokyakurituRankList(); //健全性ランキングテーブル（減価償却累計 割る 簿価＋減価償却累計）
  getAndCreateTable_ByoshoRiyorituRankList(); //効率性ランキングテーブル（延べ年間患者数　割る　延べ病床数）
  getAndCreateTable_NyuinHitoriShuekiRankList(); //収益性ランキングテーブル（入院患者一人１日あたり収益）

  getAndCreateTable_ReturnOnEquityRankList();// # ROE
  getAndCreateTable_ReturnOnAssetRankList();// # ROA
  getAndCreateTable_SihonHirituRankList();// # 資本比率
  getAndCreateTable_KoteiHirituRankList();// # 固定比率
  getAndCreateTable_JugyoinHitoriRiekiRankList();// # 労働生産性
});

// 業種選択ポップオーバーを作成
function createSelectGyoshuPopOver(){
  var a = document.getElementById("selectGyoshuDigestTab");
    val = "2020"; // 会計年度、見直し必要。
    fetch('/getAnalyJigyo/' + val, {
      method: 'GET',
      'Content-Type': 'application/json'
    })
    .then(res => res.json())
    .then(jsonData => {
      var list = JSON.parse(jsonData.data);

      var b = new bootstrap.Popover(a,{
        html: true,
        content: createElementSelectGyoshu(list),
        sanitize: false,
        container:"body",
        animation:false,
        delay:0
      });
    })
    .catch(error => { console.log(error); });
}

function gyoshu2to3(gyoshu_nm){
  if(gyoshu_nm.length == 2){
    return gyoshu_nm.split("")[0] + "　" + gyoshu_nm.split("")[1];
  } else{
    return gyoshu_nm;
  }
}


function createElementSelectGyoshu(list){
  var mainDiv = document.createElement('div');
  var subDivA = document.createElement('div');
  var subDivB = document.createElement('div');
  var subDivC = document.createElement('div');
  subDivA.classList.add("btn-group-vertical","selectGyoshuLabelVerticalGroup");
  subDivB.classList.add("btn-group-vertical","selectGyoshuLabelVerticalGroup");
  subDivC.classList.add("btn-group-vertical","selectGyoshuLabelVerticalGroup");
  setAttributes(mainDiv, "role,group/aria-label,Basic checkbox toggle button group");
  for (let i in list){
    var chk = document.createElement('input');
    chk.classList.add("btn-check");
    chk.id = "btnCheck_" + list[i].gyoshu_cd + "_" + list[i].jigyo_cd;
    setAttributes(chk,"type,checkbox/autocomplete,off");
    chk.title = list[i].gyoshu_cd + "-" + list[i].jigyo_cd;

    var lbl = document.createElement('label');
    lbl.classList.add("btn","btn-outline-primary","selectGyoshuLabel");
    setAttributes(lbl,"for,btnCheck_" + list[i].gyoshu_cd + "_" + list[i].jigyo_cd);
    lbl.style.textAlign = "left";
    lbl.style.paddingLeft = "10px";

    var badge = document.createElement('span');
    badge.classList.add("badge"); //,"text-dark");
    badge.style.fontFamily = "monospace";
    badge.style.fontWeight = 100;
    badge.style.backgroundColor = "#666666";
    badge.innerText = gyoshu2to3(list[i].gyoshu_nm);

    lbl.appendChild(badge);
    
    var txt = document.createElement('span');
    txt.innerText = list[i].jigyo_nm;
    txt.style.paddingLeft = "10px";
    txt.style.fontSize="0.9rem";
    //setAttributes(txt,"for,btnCheck_" + list[i].gyoshu_cd + "_" + list[i].jigyo_cd);
    lbl.appendChild(txt);
    //lbl.appendChild(badge);
    //lbl.innerText = list[i].jigyo_nm;


    if(1 <= list[i].gyoshu_cd && list[i].gyoshu_cd <= 6){
      subDivA.appendChild(chk);
      subDivA.appendChild(lbl);
    } else if(7 <= list[i].gyoshu_cd && list[i].gyoshu_cd <= 16){
      subDivB.appendChild(chk);
      subDivB.appendChild(lbl);
    } else{
      subDivC.appendChild(chk);
      subDivC.appendChild(lbl);
    }
  }
  //<a class="btn btn-sm btn-primary sihyoPopOver" data-bs-toggle="popover" roll="button" data-bs-trigger="focus" tabindex="0" title="" data-bs-original-title="経常収支比率ってなに？">経常収支比率</a>
  var btn = document.createElement('button');
  btn.classList.add("btn","btn-sm","btn-primary");
  //setAttributes(btn,"roll,button")
  setAttributes(btn, "onclick,hideGyoshuPopOver();")
  btn.innerText = "決定";
  btn.id = "btnGyoshuSelect";
  
  // btn.addEventListener('click', (event) => {
  //   confirm(123);
  // });

  var bodyDiv = document.createElement('div');
  var footDiv = document.createElement('div');
  footDiv.style.textAlign="right";

  bodyDiv.appendChild(subDivA);
  bodyDiv.appendChild(subDivB);
  bodyDiv.appendChild(subDivC);
  footDiv.appendChild(btn);

  mainDiv.appendChild(bodyDiv);
  mainDiv.appendChild(footDiv);
  return mainDiv.outerHTML;
}

function hideGyoshuPopOver(){
  document.getElementById("selectGyoshuDigestTab").click();
}


//レーダーチャート右の団体リスト
function getAndCreateTable_DantaiListOfRadarChart(datalist){
  //枠内にローダーを表示
  createTableLoading("divCompareRight", "tableDivLoadingCompareRight", "団体リストを作成中...");
  var val = "2020"; // 会計年度、見直し必要。
  var jokenAll = "";
  jokenAll = jokenAll + datalist.joken_1 + ",";
  jokenAll = jokenAll + datalist.joken_2 + ",";
  jokenAll = jokenAll + datalist.joken_3 + ",";
  jokenAll = jokenAll + datalist.joken_4 + ",";
  jokenAll = jokenAll + datalist.joken_5 + ",";
  jokenAll = jokenAll + datalist.joken_6 + ",";
  jokenAll = jokenAll + datalist.joken_7 + ",";
  jokenAll = jokenAll + datalist.joken_8;

  fetch('/getDantaiListOfRadarChart/' + val + "/" + datalist.gyomu_cd + "/" + datalist.gyoshu_cd + "/" + datalist.jigyo_cd + "/" + jokenAll, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divCompareRight", "tableDivDantaiListOfRadarChart");
    var list = JSON.parse(jsonData.data);
    var hdText = ["団体名", "施設・事業名"];
    var propId = ["dantai_nm", "sisetu_nm"];
    var align = ["left", "left"];
    var width = ["70%", "70%"];
    var headRowLines = 1;
    createTableByJsonList(list, "divCompareRight", "tableDivDantaiListOfRadarChart", "同規模団体と比べてみよう", hdText, propId, align, width, 1.5, headRowLines);
    //ローダーを削除
    destroyTableLoading("divCompareRight", "tableDivLoadingCompareRight");
    return;
  })
  .catch(error => { console.log(error); });
}


// ロケーションdiv に テーブル格納用divを作る。
// このように利用　→　createTableDiv("divMainLeftTop", "tableDivShueki"); //左上エリアに、収益グリッドを作る場合
// 主にダイジェストタブで使うことを目的として実装したものの、そこに限定しない使い方になった。
function createTableDiv(locationId, tableDivId){
  let tableDiv = document.createElement('div');
  tableDiv.classList.add("table-responsive");
  tableDiv.id = tableDivId;
  document.getElementById(locationId).appendChild(tableDiv);
}


// テーブル内のデータが表示されるまでの間、小さいローダーを枠内に表示
function createTableLoading(locationId, tableDivId, messageLabel){
  var tmp = document.getElementById(locationId);
  while(tmp.lastChild){
    tmp.removeChild(tmp.lastChild);
  }
  let tableDiv = document.createElement('div');
  tableDiv.classList.add("loadingDiv");
  document.getElementById(locationId).style.height = "calc(100vh/3)";
  tableDiv.id = tableDivId;
  let messageDiv = document.createElement('div');
  messageDiv.id = locationId + "Caption";
  messageDiv.innerText = messageLabel
  document.getElementById(locationId).appendChild(messageDiv);
  document.getElementById(locationId).appendChild(tableDiv);
}

//業種条件を作る
function getGyoshuJoken(){
  var joken = "dummy";
  for (let i in gyoshuSelectStauts){
    if(gyoshuSelectStauts[i].checked){
      gyoshuSelectStauts[i].title
      joken = joken + "," + gyoshuSelectStauts[i].title;
    }
  }
  if(joken == "dummy"){
    joken = "dummy,1-0"
  }
  return joken;
}

//収益性ランキングテーブルを作成
function getAndCreateTable_ShuekiRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainLeftTop", "tableDivLoading1", "経常収支比率による収益性ランクを作成中...");
  var val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getShuekiRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainLeftTop", "tableDivShueki");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"経常収支比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"keijo_shusi_hiritu"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainLeftTop", "tableDivShueki", "経常収支比率による収益性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainLeftTop", "tableDivLoading1");
    return;
  })
  .catch(error => { console.log(error); });
}



//ROEランキングテーブルを作成
function getAndCreateTable_ReturnOnEquityRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainCenterBottom", "tableDivLoading8", "自己資本利益率(ROE)による収益性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getReturnOnEquityRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainCenterBottom", "tableDivRoe");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"自己資本利益率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"roe"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainCenterBottom", "tableDivRoe", "自己資本利益率(ROE)による収益性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainCenterBottom", "tableDivLoading8");
    return;
  })
  .catch(error => { console.log(error); });
}



//ROAランキングテーブルを作成
function getAndCreateTable_ReturnOnAssetRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainRightBottom", "tableDivLoading9", "総資産利益率(ROA)による収益性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getReturnOnAssetRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainRightBottom", "tableDivRoa");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"総資産利益率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"roa"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainRightBottom", "tableDivRoa", "総資産利益率(ROA)による収益性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainRightBottom", "tableDivLoading9");
    return;
  })
  .catch(error => { console.log(error); });
}


//資本比率ランキングテーブルを作成
function getAndCreateTable_SihonHirituRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainLeftBottom2", "tableDivLoading10", "資本比率による収益性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getSihonHirituRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainLeftBottom2", "tableDivSihonHiritu");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"資本比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"sihon_hiritu"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainLeftBottom2", "tableDivSihonHiritu", "資本比率による収益性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainLeftBottom2", "tableDivLoading10");
    return;
  })
  .catch(error => { console.log(error); });
}

//固定比率ランキングテーブルを作成
function getAndCreateTable_KoteiHirituRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainCenterBottom2", "tableDivLoading11", "固定比率による収益性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getKoteiHirituRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainCenterBottom2", "tableDivKoteiHiritu");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"固定比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"kotei_hiritu"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainCenterBottom2", "tableDivKoteiHiritu", "固定比率による収益性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainCenterBottom2", "tableDivLoading11");
    return;
  })
  .catch(error => { console.log(error); });
}


//1人当たり利益ランキングテーブルを作成
function getAndCreateTable_JugyoinHitoriRiekiRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainRightBottom2", "tableDivLoading12", "職員1人あたり利益による生産性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getJugyoinHitoriRiekiRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainRightBottom2", "tableDivHitoriRieki");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"職員1人あたり利益(千円)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"hitori_rieki"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainRightBottom2", "tableDivHitoriRieki", "職員1人あたり利益による生産性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainRightBottom2", "tableDivLoading12");
    return;
  })
  .catch(error => { console.log(error); });
}


//経常利益成長率ランキングテーブルを作成
function getAndCreateTable_KeijoriekiSeichorituRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainLeftBottom3", "tableDivLoading13", "経常利益成長率による成長性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getKeijoriekiSeichorituRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainLeftBottom3", "tableDivKeijoSeicho");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"成長率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"seicho_ritu"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainLeftBottom3", "tableDivKeijoSeicho", "経常利益成長率による成長性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainLeftBottom3", "tableDivLoading13");
    return;
  })
  .catch(error => { console.log(error); });
}


//資本成長率ランキングテーブルを作成
function getAndCreateTable_SihonSeichorituRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainCenterBottom3", "tableDivLoading14", "資本成長率による成長性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getSihonSeichorituRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainCenterBottom3", "tableDivSihonSeicho");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"成長率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"seicho_ritu"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainCenterBottom3", "tableDivSihonSeicho", "資本成長率による成長性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainCenterBottom3", "tableDivLoading14");
    return;
  })
  .catch(error => { console.log(error); });
}


//ローダーを削除
function destroyTableLoading(locationId, tableDivId){
  document.getElementById(locationId).removeChild(
    document.getElementById(tableDivId)
  )
  document.getElementById(locationId).style.height = "";
}


// トーストを作る（画面ヘッダで、選択中の組織名を表示するバッジ）
function createToasts(selectData){
  if(document.getElementById("divToast")!=null){
    document.getElementById("divToast").remove();
  }

  let divToast = document.createElement('div');
  divToast.classList.add("toast", "align-items-center", "face", "show");
  setAttributes(divToast,"role,alert/roaria-livele,assertive/aria-atomic,true");
  divToast.id = "divToast";
  //divToast.style.position = "relative";
  //divToast.style.top = "-30px";

  
  let divToastBody = document.createElement('div');
  divToastBody.classList.add("toast-body");
  divToastBody.innerText = (selectData.dantai_nm + " " + selectData.sisetu_nm).substring(0,16);

  let divToastWrap = document.createElement('div');
  divToastWrap.classList.add("d-flex");
  divToastWrap.style.alignItems = "center";
  divToastWrap.style.marginLeft = "10px";

  let btn = document.createElement('button');
  setAttributes(btn,"type,button/data-bs-dismiss,toast/aria-label,Close");
  btn.classList.add("btn", "btn-sm", "btn-secondary");
  btn.innerText = "解除";
  let span =  document.createElement('span');
  span.classList.add("badge", "bg-danger");
  span.innerText = "選択中";

  btn.addEventListener('click', (event) => {
    divToast = document.getElementById("divToast");
    divToast.classList.remove("show");
    divToast.classList.add("hide");
  });

  divToastWrap.appendChild(span);
  divToastWrap.appendChild(divToastBody);
  divToastWrap.appendChild(btn);

  divToast.appendChild(divToastWrap);

  document.getElementById("areaSelectTarget").appendChild(divToast);

}


//テーブルの見出し行を作成する。戻したDOMはtheadにappendされる想定。
function createTableHeader(hdText, width, headRowLines){
  let trow = document.createElement('tr');
  for (let hd in hdText){
    var thA = document.createElement('th');
    thA.innerHTML = hdText[hd];
    thA.style.textAlign = "center";
    thA.style.verticalAlign = "middle";
    thA.style.height = (20*headRowLines) + "px";
    if(width!=null){
      try{thA.style.width=width[hd];}catch(e){}
    }
    trow.appendChild(thA);
  }
  return trow;
}

//ランク冠用のイメージDOMを返す
function createRankingCup(rank){
  var img = document.createElement('img');
  img.classList.add("img-responsive")
  img.setAttribute("src","../static/image/ranking" + (rank) + ".png");

  return img;
}

//jsonデータからhtmlテーブルを自作する。
function createTableByJsonList(datalist, locationId, tableDivId, caption, hdText, propId, align, width, height, headRowLines){
  let table = document.createElement("table");
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let trow = document.createElement('tr');

  //見出し行作成
  thead.appendChild(createTableHeader(hdText, width,headRowLines));
  
  for(let i in datalist){
    // if(i>=200){break;}

    trow = document.createElement('tr');
    
    for (let id in propId){
      var tdataA = document.createElement('td');
      if(propId[id]=="rank"){
        var r = i*1+1;
        tdataA.innerHTML = r;
        if(r <= 3){
          tdataA.appendChild(createRankingCup(r));
          tdataA.classList.add("rank_number");
        }
      } else if(propId[id]=="checkbox"){
        var chk = document.createElement("input");
        chk.type="checkbox";
        tdataA.appendChild(chk);

      } else if(propId[id]=="sinchoku"){
        tdataA.innerText = "未開始";

      }else{
        tdataA.innerHTML = datalist[i][propId[id]];
        //divMain から始まる場合のみ。つまりはダイジェストタブで利用される場合のみ。
        if(locationId.substring(0,7) == "divMain" && (propId[id]=="dantai_nm" || propId[id]=="sisetu_nm")){
          tdataA.title = datalist[i].gyomu_cd + "-" + datalist[i].gyoshu_cd + "-" + datalist[i].jigyo_cd + "-" +  datalist[i].dantai_cd + "-" +  datalist[i].sisetu_cd;
            tdataA.addEventListener('click', (event) => {
              var key = event.target.title;
              //moveProfileTab(key);
              globalSelectedRow = datalist[i];
              createHyoVerticalNavbar(datalist[i]); //基本情報タブの左の表バー
              moveCompareTab(datalist[i]);
              CreateRadarChart(datalist[i]);
              getAndCreateTable_DantaiListOfRadarChart(datalist[i]);
              createToasts(datalist[i]);
              createScatterChart(datalist[i]);
              createApiMix(datalist[i]);
            });
        } 
      }
      tdataA.style.textAlign=align[id];
      if(width!=null){
        tdataA.style.width=width[id];
      }
      trow.appendChild(tdataA);
    }
      
    if(locationId.substring(0,7) == "v-pills"){ //v-pills始まりは、基本情報タブのメインテーブルエリア
      trow.addEventListener('click', (event) => {
        var key = event.target.title;

        var gyo_num = Number(event.target.parentElement.cells[0].innerText);
        var retu_num = Number(event.target.parentElement.cells[1].innerText);
        var name1 = event.target.parentElement.cells[2].innerText;
        var valueArray = datalist.filter(value => value["gyo_num"] ==gyo_num).filter(value => value["retu_num"] ==retu_num);

        let graphs = document.querySelectorAll("[id^='canvasChart']"); //' #divGraphArea *');
        let divGraphRow = document.createElement("div");
        divGraphRow.classList.add("row");
        divGraphRow.id = "divGraphRow1";
        document.getElementById(locationId).appendChild(divGraphRow);
        var graphId = createGraphArea(valueArray, "divGraphRow1", "aaa");
        createGraph(valueArray, graphId, name1);

      });
    } else if(locationId == "divCompareRight"){
      trow.addEventListener('click', (event) => {
        //clickCompareRight(datalist[i]);
        getRadarChartData(radarChart, datalist[i]);
      });
    } else if(locationId == "prefDantaiListTableDiv"){//
      trow.addEventListener('click', (event) => {
        //clickCompareRight(datalist[i]);
        const elements = document.querySelectorAll(".row_selected");
        if(elements.length > 0){
          for(let elem of elements){
            elem.classList.remove("row_selected");
            //btnTargetSelect
          }
        }
        event.srcElement.parentElement.classList.add("row_selected");
        //document.getElementById("btnTargetSelect").removeAttribute("disabled");
        document.getElementById('btnTargetSelect').classList.remove("disabled");
        globalSelectedRow = datalist[i];
      });
      }
    
    tbody.appendChild(trow);
  }
  table.appendChild(thead);
  table.appendChild(tbody);
  table.classList.add("table", "table-bordered", "table_sticky", "table-hover", "fs-6");
  table.style.height = "calc(100vh/" + height + ")";
  table.id = tableDivId.replace("Div","");  ;//"tableHikakuCityList";
  document.getElementById(tableDivId).appendChild(table);
  document.getElementById(tableDivId).style.width = "100%";

  if(locationId!=""){
    var popLabel = "";
    if(caption.split("による").length == 2){
      popLabel1 = caption.split("による")[0];
      popLabel2 = caption.split("による")[1];
      let btnPopover = document.createElement("a");
      btnPopover.classList.add("btn", "btn-sm", "btn-primary", "sihyoPopOver");
      btnPopover.setAttribute("data-bs-toggle","popover");
      btnPopover.setAttribute("roll","button");
      btnPopover.setAttribute("data-bs-trigger","focus");
      btnPopover.setAttribute("tabindex","0");
      btnPopover.title = popLabel1 + "ってなに？";
      btnPopover.innerText = popLabel1;
      var a = new bootstrap.Popover(btnPopover,{
        html: true,
        content:getDescribeHtml(popLabel1),
        sanitize: false,
        container:"body",
        trigger: 'focus'
      });
      let divLabel2 = document.createElement("div");
      divLabel2.style.float = "left";
      divLabel2.innerText = "による" + popLabel2;
      document.getElementById(locationId + "Caption").innerText = "";
      document.getElementById(locationId + "Caption").appendChild(btnPopover);
      document.getElementById(locationId + "Caption").appendChild(divLabel2);
    }else{
      document.getElementById(locationId + "Caption").innerText = caption;
    }
  }
}


function setAttributes(dom, str){
  var tmp = str.split("/");
  for (let a in tmp){
    b = tmp[a].split(",");
    dom.setAttribute(b[0], b[1]);
  }
}

// 基本情報タブへ移動
function moveProfileTab(key){
  try{
    document.getElementById('dataTab').querySelector("a.nav-link").classList.remove("active");
    document.getElementById('profile-tab').classList.add("active");
    document.getElementById('dataTabContent').querySelector("div.tab-pane").classList.remove("active");
    document.getElementById('dataTabContent').querySelector("div.tab-pane").classList.remove("show");
    document.getElementById('profile-panel').classList.add("active");
    document.getElementById('profile-panel').classList.add("show");

    createHyoVerticalNavbar(key);
  }catch(e){

  }
}

// レーダーチャートタブへ移動
function moveCompareTab(datalist){
  try{
    document.getElementById('dataTab').querySelector("a.nav-link").classList.remove("active");
    document.getElementById('compare-tab').classList.add("active");
    document.getElementById('dataTabContent').querySelector("div.tab-pane").classList.remove("active");
    document.getElementById('dataTabContent').querySelector("div.tab-pane").classList.remove("show");
    document.getElementById('compare-panel').classList.add("active");
    document.getElementById('compare-panel').classList.add("show");

    //createHyoVerticalNavbar(key);
    //getRadarChartData(radarChart, datalist);
  }catch(e){

  }
}

// 基本情報タブの左の表リストを作成
function createHyoVerticalNavbar(selectRow){
    var key = selectRow.gyomu_cd + "-" + selectRow.gyoshu_cd + "-" + selectRow.jigyo_cd + "-" +  selectRow.dantai_cd + "-" +  selectRow.sisetu_cd;
    var val = "2020"; // 会計年度、見直し必要。
    fetch('/getHyoListForProfile/' + val, {
      method: 'GET',
      'Content-Type': 'application/json'
    })
    .then(res => res.json())
    .then(jsonData => {
      
      var tmp = document.getElementById("profile-panel");
      while(tmp.lastChild){
        tmp.removeChild(tmp.lastChild);
      }

      let div1 = document.createElement("div");
      div1.classList.add("d-flex");
      div1.classList.add("align-items-start");

      var divTabGroup = document.createElement("div");
      divTabGroup.classList.add("nav","flex-column","nav-pills","me-3");
      divTabGroup.id = "v-pills-tab";
      divTabGroup.setAttribute("role","tablist"); //role="tablist" aria-orientation="vertical"
      divTabGroup.setAttribute("aria-orientation","vertical"); //role="tablist" aria-orientation="vertical"

      var divContentGroup = document.createElement("div");
      divContentGroup.classList.add("tab-content");
      divContentGroup.id = "v-pills-tabContent";
      //divContentGroup.classList.add("loadableTable"); //ローダーをセンタリングする
      divContentGroup.style.width="100%";

      var list = JSON.parse(jsonData.data);
      for(let i in list){
        var tabButtonA = document.createElement("a");
        tabButtonA.classList.add("nav-link");
        tabButtonA.id = "vTabHyo_" + list[i].hyo_num;
        setAttributes(tabButtonA,"data-bs-toggle,pill/" + "data-bs-target,#v-pills-" + list[i].hyo_num + "/" + "type,button/role,tab" + "/" + "aria-controls,v-pills-" + list[i].hyo_num + "/" + "aria-selected,true");
        tabButtonA.innerText = list[i].hyo_num + "." + list[i].hyo_nm;
        
        tabButtonA.addEventListener('click', (event) => {
          createHyoTableByHyoNumber(key, event.target.innerText.substring(0,2));
        });

        divTabGroup.appendChild(tabButtonA);

        //<div class="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
        var divContent = document.createElement("div");
        divContent.classList.add("tab-pane", "face", "loadableTable", "col-12");
        divContent.id = "v-pills-" + list[i].hyo_num;
        divContent.setAttribute("role","tabpanel");
        divContent.setAttribute("aria-labelledby","v-pills-" + list[i].hyo_num + "-tab");
        divContentGroup.appendChild(divContent);
      }
      div1.appendChild(divTabGroup);
      div1.appendChild(divContentGroup);
      document.getElementById('profile-panel').appendChild(div1);

      // デフォルトで20表を選択する。
      document.getElementById('vTabHyo_20').classList.add("active");
      document.getElementById('v-pills-20').classList.add("active");
      createHyoTableByHyoNumber(key, 20);
      return;
    })
    .catch(error => { console.log(error); });
}

//基本情報タブの左の表リストをクリックして、テーブルを作成
function createHyoTableByHyoNumber(key, hyo_num){
  if(document.getElementById("tableDivHyo")!=null){
    document.getElementById("tableDivHyo").remove();
  }
  if(document.getElementById("divGraphRow1")!=null){
    document.getElementById("divGraphRow1").remove();
  }
  //
  var loadingMidashi = "";
  if(event != null){
    loadingMidashi = event.target.innerText + "を読み込み中...";
  }
  createTableLoading("v-pills-" + hyo_num, "tableDivHyoLoading", loadingMidashi);

  var nendo = "2020"; // 会計年度、見直し必要。 fetch('/getHyoListForProfile/' + val + '/20/30/40/50/60', {
  var keys = key.split("-");
  fetch('/getHyoData/' + nendo + '/' + keys[0] + '/' + keys[1] + '/' + keys[2] + '/' + keys[3] + '/' + keys[4] + '/' + hyo_num, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("v-pills-" + hyo_num, "tableDivHyo");
    var list = JSON.parse(jsonData.data);
    var hdText = ["行", "列", "項目名",　"2015",　"2016",　"2017",　"2018",　"2019",　"2020",　"2021",　"2022",　"2023",　"2024"];
    var propId = ["gyo_num", "retu_num", "name1", "val_a",　"val_b", "val_c",　"val_d",　"val_e", "val_f",　"val_g",　"val_h", "val_i",　"val_j"];
    var align = ["center", "center", "left",　"right",　"right",　"right",　"right",　"right",　"right",　"right",　"right",　"right",　"right"];
    var width = ["", "", "40%",　"6%",　"6%",　"6%",　"6%",　"6%",　"6%",　"6%",　"6%",　"6%",　"6%"];
    var headRowLines = 1;
    createTableByJsonList(list, "v-pills-" + hyo_num, "tableDivHyo", "", hdText, propId, align, width, 2.75, headRowLines);

    destroyTableLoading("v-pills-" + hyo_num, "tableDivHyoLoading");
  })
  .catch(error => { console.log(error); });

}


//安全性ランキングテーブルを作成
function getAndCreateTable_AnzenRankList(){
  
  //枠内にローダーを表示
  createTableLoading("divMainCenterTop", "tableDivLoading", "流動比率による安全性ランクを作成中...");

  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getAnzenRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainCenterTop", "tableDivAnzen");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"流動比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"ryudo_hiritu"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainCenterTop", "tableDivAnzen", "流動比率による安全性ランキング", hdText, propId, align, width, 3, headRowLines);

    //ローダーを削除
    destroyTableLoading("divMainCenterTop", "tableDivLoading");

    return;
  })
  .catch(error => { console.log(error); });
}





//累積欠損比率ランキングテーブルを作成
function getAndCreateTable_RuisekiKessonRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainRightTop", "tableDivLoading2", "累積欠損比率による健全性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getRuisekiKessonRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainRightTop", "tableDivRuisekiKesson");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"累積欠損比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"ruiseki_kesson_hiritu"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainRightTop", "tableDivRuisekiKesson", "累積欠損比率による健全性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainRightTop", "tableDivLoading2");
    return;
  })
  .catch(error => { console.log(error); });
}



//企業債残高対給水収益比率による健全性ランキングテーブルを作成
function getAndCreateTable_KigyosaiKyusuiRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainLeftMiddle", "tableDivLoading4", "企業債残高対給水収益比率による健全性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getKigyosaiKyusuiRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainLeftMiddle", "tableDivKigyosaiKyusuiRankList");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"企業債残高対給水収益比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"kigyosai_shueki_hiritu"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainLeftMiddle", "tableDivKigyosaiKyusuiRankList", "企業債残高対給水収益比率による健全性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainLeftMiddle", "tableDivLoading4");
    return;
  })
  .catch(error => { console.log(error); });
}



//有形固定資産償却率による健全性ランキングテーブルを作成
function getAndCreateTable_KoteiShokyakurituRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainCenterMiddle", "tableDivLoading5", "有形固定資産償却率による健全性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getKoteiShokyakurituRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainCenterMiddle", "tableDivKoteiShokyakurituRankList");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"有形固定資産償却率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"shokyaku_hiritu"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainCenterMiddle", "tableDivKoteiShokyakurituRankList", "有形固定資産償却率による健全性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainCenterMiddle", "tableDivLoading5");
    return;
  })
  .catch(error => { console.log(error); });
}


//病床利用率による効率性ランキングテーブルを作成
function getAndCreateTable_ByoshoRiyorituRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainRightMiddle", "tableDivLoading6", "病床利用率による効率性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getByoshoRiyorituRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainRightMiddle", "tableDivByoshoRiyorituRankList");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"病床利用率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"riyoritu"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainRightMiddle", "tableDivByoshoRiyorituRankList", "病床利用率による効率性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainRightMiddle", "tableDivLoading6");
    return;
  })
  .catch(error => { console.log(error); });
}


//入院患者1人1日あたり収益による収益性ランキングテーブルを作成
function getAndCreateTable_NyuinHitoriShuekiRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainLeftBottom", "tableDivLoading7", "入院患者1人1日あたり収益による収益性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  var joken = getGyoshuJoken();
  fetch('/getNyuinHitoriShuekiRankList/' + val + "/" + joken, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainLeftBottom", "tableDivNyuinHitoriShuekiRankList");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "事業名・施設名",　"入院患者1人1日あたり収益(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"hitori_ichinichi_shueki"];
    var align = ["center", "left", "left",　"right"];
    var width = ["10%", "35%", "40%", "25%"];
    var headRowLines = 2;
    createTableByJsonList(list, "divMainLeftBottom", "tableDivNyuinHitoriShuekiRankList", "入院患者1人1日あたり収益による収益性ランキング", hdText, propId, align, width, 3, headRowLines);
    //ローダーを削除
    destroyTableLoading("divMainLeftBottom", "tableDivLoading7");
    return;
  })
  .catch(error => { console.log(error); });
}

function createGraph(datalist, canvasId, labelStr){
  document.getElementById("canvasChart" + canvasId).title = labelStr;
  const ctx = document.getElementById("canvasChart" + canvasId).getContext('2d');
  var data = [datalist[0].val_a, datalist[0].val_b,datalist[0].val_c, datalist[0].val_d,datalist[0].val_e, datalist[0].val_f,datalist[0].val_g, datalist[0].val_h,datalist[0].val_i, datalist[0].val_j];
  var objChart1 = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024], //見直し必要
          datasets: [{
              label: labelStr,
              data: data, //datalist.filter(value => value["col_index"] ==rowindex).map(item => item["val_num"]), //[12, 19, 3, 5, 2, 3],tableから取得する 
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins: {
              title: {
                  display: true,
                  align: "start",
                  text: labelStr
              }
          }
      }
  });
  return objChart1;
}



function CreateRadarChart(selectRow){
    //var ctx = document.getElementById('myChart').getContext('2d');
    var chartData = {
        type: 'radar',
        data: {
            labels: ['経常収支比率', 
              '自己資本利益率（ROE）', 
              '総資本利益率（ROA）', 
              '流動比率', 
              '自己資本比率', 
              '固定比率', 
              '有形固定資産償却率', 
              '労働生産性', 
              '経常利益成長率', 
              '資本成長率'
            ],
            datasets: []
        }, //radarChart.config.options.scales.r.pointLabels.font.size = 20;
        options: {
          animation:{
            duration:200,
            easing:""
          },
          scale: {
            beforeFit: function (scale) {
                //var pointLabelFontSize = 2; //Chart.helpers.getValueOrDefault(scale.options.pointLabels.fontSize, Chart.defaults.global.defaultFontSize);
                // scale.height *= (2 / 1.7)
                // scale.height -= pointLabelFontSize;
                scale.height = scale.height * 0.9;
            },
            afterFit: function (scale) {
                //var pointLabelFontSize = 2; //Chart.helpers.getValueOrDefault(scale.options.pointLabels.fontSize, Chart.defaults.global.defaultFontSize);
                //scale.height += pointLabelFontSize;
                //scale.height /= (2 / 1.7);
                scale.height = scale.height * 0.9;
            },
          },
          plugins: {
            htmlLegend: {
              // ID of the container to put the legend in
              containerID: 'legend-container',
            },
            legend: {
              display: false,
            }
          },
          // plugins: {
          //     legend: {
          //         labels: {
          //             // This more specific font property overrides the global property
          //             font: {
          //                 size: 16
          //             },
          //             padding:30
          //         },
          //         position:"right"
          //     }
          // },
          scales: {
              r:{
                pointLabels:{
                  font:{
                    size:16,
                    
                  },
                  fontStyle: "bold",
                },
                min: 0,
                max: 10,
                stepSize: 1
              },
          },
        },
        plugins: [htmlLegendPlugin],
    };
    //const ctx = document.getElementById("myChart").getContext('2d');
    //radarChart = new Chart(ctx, chartData);
    //var datalist = { dantai_cd:"dummy", sisetu_cd:"dummy", val:0, dantai_nm:"", sisetu_nm:"" };
    getRadarChartData(chartData, selectRow);
}

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.style.display = 'block';
    //listContainer.style.flexDirection = 'row';
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach(item => {
      const li = document.createElement('li');
      li.style.alignItems = 'center';
      li.style.cursor = 'pointer';
      li.style.display = 'flex';
      li.style.flexDirection = 'row';
      li.style.marginLeft = '10px';

      li.onclick = () => {
        chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + 'px';
      boxSpan.style.display = 'inline-block';
      boxSpan.style.height = '20px';
      boxSpan.style.marginRight = '10px';
      boxSpan.style.width = '20px';

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  }
};

// レーダーチャートに含まれるかどうかを検査
function isContainsRadarChart(chartData, datalist){
  var tuikazumi = chartData.data.datasets;
  var konkai = (datalist.dantai_nm + " " + datalist.sisetu_nm).substring(0,16);

  for(let i in tuikazumi){
    if (tuikazumi[i].label == konkai){
      return true;
    }
  }

  return false;
}

function getRadarChartData(chartData, datalist){

    var idx = chartData.data.datasets.length;
    if(idx==0){
        //var ctx = $("#myChart").get(0).getContext("2d");
        if(radarChart!=null){
            radarChart.destroy();// = new Chart(ctx, null);
        }
    } else {
      if(isContainsRadarChart(chartData, datalist)){
        return false;
      }
    }

    if(idx>=8){
      // var selectTdText = event.target.innerText;
      // var eventId = event.target.id;
      // event.target.style.backgroundColor = "red";
      // event.target.innerText = "これ以上追加できません。";
      // //setTimeout("$('#progressPrintSeikyuPercent').hide(); $('#progressPrintSeikyuPercent').html('')", 3000);
      // setTimeout('document.getElementById(' + eventId + ').innerText = ' + selectTdText + ";", 3000);
      //divCompareRadar か //myChart で間にメッセージ
      try{document.getElementById("divRadarchartMessage").remove();}catch(e){}
      let divMessage = document.createElement("div");
      divMessage.innerText = "レーダーチャートの比較機能は、最大８件までです。";
      divMessage.style.color = "red";
      divMessage.style.textAlign = "center";
      divMessage.id = "divRadarchartMessage";
      document.getElementById("divCompareRadar").insertBefore(divMessage, document.getElementById("myChart"));
      setTimeout('document.getElementById("divRadarchartMessage").remove();', 3000);
      return false;
    }

    val = "2020"; // 会計年度、見直し必要。
    fetch('/getRadarChartData/' + val + '/' + 
      datalist.gyomu_cd + '/' + 
      datalist.gyoshu_cd + '/' + 
      datalist.jigyo_cd + '/' + 
      datalist.dantai_cd + '/' + 
      datalist.sisetu_cd, {
      method: 'GET',
      'Content-Type': 'application/json'
    })
    .then(res => res.json())
    .then(jsonData => {
      chartData.data.datasets.push({
          label: '',
          backgroundColor: BgColor_RadarChart[idx],
          borderColor: BdrColor_RadarChart[idx],
          data: [],
          borderWidth: 1
      });
      chartData.data.datasets[idx].label = (datalist.dantai_nm + " " + datalist.sisetu_nm).substring(0,16); //datalist.sisetu_nm;//(idx == 0 ? selectVendor : selectVendor.substring(0,2));
      var list = JSON.parse(jsonData.data);

      if(datalist.dantai_nm != "dummy" && list.length > 0){
        chartData.data.datasets[idx].data.push(list.filter(value => value["source"] =="keijo_shusi_hiritu").map(item => item["val"])[0]);
        chartData.data.datasets[idx].data.push(list.filter(value => value["source"] =="roe").map(item => item["val"])[0]);
        chartData.data.datasets[idx].data.push(list.filter(value => value["source"] =="roa").map(item => item["val"])[0]);
        chartData.data.datasets[idx].data.push(list.filter(value => value["source"] =="ryudo_hiritu").map(item => item["val"])[0]);
        chartData.data.datasets[idx].data.push(list.filter(value => value["source"] =="sihon_hiritu").map(item => item["val"])[0]);
        chartData.data.datasets[idx].data.push(list.filter(value => value["source"] =="kotei_hiritu").map(item => item["val"])[0]);
        chartData.data.datasets[idx].data.push(list.filter(value => value["source"] =="shokyaku_hiritu").map(item => item["val"])[0]);
        chartData.data.datasets[idx].data.push(list.filter(value => value["source"] =="hitori_rieki").map(item => item["val"])[0]);
        chartData.data.datasets[idx].data.push(list.filter(value => value["source"] =="keijorieki_seicho_ritu").map(item => item["val"])[0]);
        chartData.data.datasets[idx].data.push(list.filter(value => value["source"] =="sihon_seicho_ritu").map(item => item["val"])[0]);
      }

      const ctx = document.getElementById("myChart").getContext('2d');
      if(idx==0){
        radarChart = new Chart(ctx, chartData);
      }else{
        radarChart.update();
      }
    })
    .catch(error => { console.log(error); });
}



document.getElementById("selScatterZ").addEventListener("change", function(){
  var selectRow = globalSelectedRow;
  createScatterChart(selectRow);
});



function createScatterChart(selectRow){
  //枠内にローダーを表示
  var val = "2020"; // 会計年度、見直し必要。
  var dantai_sisetu = selectRow.dantai_cd + "-" + selectRow.sisetu_cd;
  var joken_1245 = selectRow.joken_1 + "-" + selectRow.joken_2 + "-" + selectRow.joken_4 + "-" + selectRow.joken_5;
  fetch('/getDataSourceScatterXY/' + 
    val + "/" +
    selectRow.gyomu_cd + "-" + selectRow.gyoshu_cd + "-" + selectRow.jigyo_cd + "/" +
    joken_1245 + "/" +
    document.getElementById("selScatterX").value + "/" + 
    document.getElementById("selScatterY").value + "/" + 
    document.getElementById("selScatterZ").value, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {

    var list = JSON.parse(jsonData.data);
    //var bubbleRank = createBubbleRank(list.map(item => item["val_z"]));

    var plotData = {};
    var dataA = [];
    for(let i in list){
      bubbleSize = getBubbleSize(list, list[i].val_z);
      var isSelected = false;
      if(dantai_sisetu == (list[i].dantai_cd + "-" + list[i].sisetu_cd)){
        isSelected = true;
      }
      dataA.push({
        label:list[i].dantai_nm.substring(0,5), 
        pointRadius: bubbleSize, //(isSelected ? 12:8), 
        pointHoverRadius: bubbleSize*0.75, //(isSelected ? 12:8), 
        backgroundColor: getScatterColor(list[i].dantai_cd,0,isSelected), //'rgba(255, 48, 32, 0.45)',
        borderColor: getScatterColor(list[i].dantai_cd,1,isSelected),
        data:[{ x: list[i].val_x,  y:  list[i].val_y}]
      });
    }
    var dataG = {datasets:dataA};

    var chart = document.getElementById('scatterChart');
    var ctx = chart.getContext('2d');
    chart.style.height = "30vh";
    chart.style.width = "70vw";
    setAttributes(chart, "height,30vh/width,70vw");
    //var ctx = $("#myChart").get(0).getContext("2d");
    if(scatterChart!=null){
      scatterChart.destroy();// = new Chart(ctx, null);
    }

    scatterChart = new Chart(ctx, {
      type: 'scatter',
      data: dataG,
      options:  {
        plugins: {
          legend: {
            // 右上に配置
            display:true,
            align: 'start',
            position: 'right',
            left:100,
            top:100,
            // 余白
            labels: {
              padding: 8,
            }
          },
          tooltip:{
            callbacks: {
              // ツールチップの表示内容
              label: function(tooltipItem, data) {
                var groupName = tooltipItem.dataset.label; //data.datasets[tooltipItem.datasetIndex].label;
                var xAxesLabel = tooltipItem.chart.options.scales.x.title.text;
                var xValue = tooltipItem.dataset.data[0].x;
                var yAxesLabel = tooltipItem.chart.options.scales.y.title.text;
                var yValue = tooltipItem.dataset.data[0].y;
                return groupName + " | " + xAxesLabel + ":" + xValue + " | " + yAxesLabel + ":" + yValue;
              }}
          },
        },
        scales: {                          //軸設定
            y: {                      //y軸設定
                display: true,             //表示設定
                title: {              //軸ラベル設定
                   display: true,          //表示設定
                   text: document.getElementById("selScatterY").innerText,  //ラベル
                    font: {size: 18},
                },
                ticks: {                      //最大値最小値設定
                    font: {size: 18},
                },
            },
            x: {                         //x軸設定
                display: true,                //表示設定
                title: {                 //軸ラベル設定
                   display: true,             //表示設定
                   text: document.getElementById("selScatterX").innerText,  //ラベル
                    font: {size: 18},
                },
                ticks: {
                    font: {size: 18},
                },
            },
        },
        responsive: true,
      },
    });


    return;
  })
  .catch(error => { console.log(error); });

}

function getBubbleSize(list, zVal){
  var zlist = list.map(item => item["val_z"]);
  var sum = zlist.reduce((previous, current) =>
    previous + current  // 前の要素につぎの要素を足す
  );
  var ave = sum / zlist.length;

  var stddev = Math.sqrt(  // 分散の平方根を求める
    zlist.map((current) => {  // 各要素について
        let difference = current - ave;  // 平均値との差を求める
        return difference ** 2;  // 差を2乘する
    })
    .reduce((previous, current) =>
        previous + current  // 差の2乗をすべて足す
    ) / zlist.length  // 差の2乗の平均が分散
  );

  var minSize = 5;
  var step = 5;
  var ret = 0;
  if(stddev <= zVal && zVal <= (ave + stddev*1)){
    ret = minSize+(step*5);
  } else if((ave + stddev*1) < zVal && zVal <= (ave + stddev*2)){
    ret = minSize+(step*6);
  } else if((ave + stddev*2) < zVal && zVal <= (ave + stddev*3)){
    ret = minSize+(step*7);
  } else if((ave + stddev*3) < zVal && zVal <= (ave + stddev*4)){
    ret = minSize+(step*7);
  } else if((ave + stddev*4) < zVal && zVal <= (ave + stddev*5)){
    ret = minSize+(step*9);
  } else if((ave + stddev*5) < zVal){
    ret = minSize+(step*10);
  } else if(ave > zVal && zVal >= (ave - stddev*1)){
    ret = minSize+(step*4);
  } else if((ave - stddev*1) > zVal && zVal >= (ave - stddev*2)){
    ret = minSize+(step*3);
  } else if((ave - stddev*2) > zVal && zVal >= (ave - stddev*3)){
    ret = minSize+(step*2);
  } else if((ave - stddev*3) > zVal && zVal >= (ave - stddev*4)){
    ret = minSize+(step*1);
  } else {
    ret = minSize;
  } 

  return ret;
}

function getScatterColor(dantai_cd, backOrLine, isSelected){
  locationCd = getLocationCdByDantaiCd(dantai_cd);
  if(0 <= locationCd && locationCd <= 7){
    if(backOrLine==0 && !isSelected){
      return BgColor_ScatterChart[locationCd];
    } else{
      return BdrColor_ScatterChart[locationCd];
    }
  }
}

function createScatterSelectXY(){
  var selX = document.getElementById("selScatterX"); //selTdfkSub
  for(let i in SCATTER_X){
    var option = document.createElement("option");
    option.value = SCATTER_X[i].split(",")[0];
    option.text = SCATTER_X[i].split(",")[1];
    selX.appendChild(option);
  }

  var selY = document.getElementById("selScatterY"); //selTdfkSub
  for(let i in SCATTER_Y){
    var option = document.createElement("option");
    option.value = SCATTER_Y[i].split(",")[0];
    option.text = SCATTER_Y[i].split(",")[1];
    selY.appendChild(option);
  }

  var selZ = document.getElementById("selScatterZ"); //selTdfkSub
  for(let i in SCATTER_Z){
    var option = document.createElement("option");
    option.value = SCATTER_Z[i].split(",")[0];
    option.text = SCATTER_Z[i].split(",")[1];
    selZ.appendChild(option);
  }

}


function createVersionNote(){
  var noteArea = document.getElementById("versionNote");
  while(noteArea.lastChild){
    noteArea.removeChild(noteArea.lastChild);
  }

  for(let i=0; i<C_VERSION_NOTE.length; i++){
    if(getVersionHistoryDate(i) != null){
      var dt = getVersionHistoryDate(i);
      var dd = getVersionHistoryNote(i);
      if(dt == null) break;
      noteArea.appendChild(dt);
      noteArea.appendChild(dd);
    }
  }
}

document.getElementById('modalSummary').addEventListener('hidden.bs.modal', function () {
  var body = document.getElementById("modalBodySummary");
  while(body.lastChild){
    body.removeChild(body.lastChild);
  }

  var body = document.getElementById("modalBodySummaryDonuts");
  while(body.lastChild){
    body.removeChild(body.lastChild);
  }
  
  var body = document.getElementById("modalBodySummaryDescription");
  while(body.lastChild){
    body.removeChild(body.lastChild);
  }
  
  
});


function createSummaryDescription(){
  var divA = document.createElement("div");
  var divB = document.createElement("div");
  var divC = document.createElement("div");
  var divD = document.createElement("div");
  
  var txt = "";
  txt = txt + "公営企業とは、地方公共団体が住民の福祉の増進を目的として設置し、経営する企業です。\r\n";
  txt = txt + "\r\n";
  divA.innerText = txt;
  divA.classList.add("dropcap");

  txt = "";
  txt = txt + "水道、病院、交通、ガス、電気 といった、地域における社会資本の整備、生活サービスの供給、産業の振興など地域住民の生活や地域の発展に不可欠なサービスを提供し、重要な役割を果たしています。\r\n";
  txt = txt + "\r\n";
  divB.innerText = txt;
  divB.classList.add("dropcap");

  txt = "";
  txt = txt + "これらのうち、地方公営企業法が適用される事業は、民間企業と同じように発生主義会計・複式簿記を採用し、損益計算書・貸借対照表等の作成が義務付けられています。\r\n";
  txt = txt + "\r\n";
  divC.innerText = txt;
  divC.classList.add("dropcap");
  
  txt = "";
  txt = txt + "私たちは、それらの経営状況をわかりやすく可視化し、経営改善につなげるための分析と診断サービスを運営しております。\r\n";
  divD.innerText = txt;
  divD.classList.add("dropcap");
  
  document.getElementById("modalBodySummaryDescription").appendChild(divA);
  document.getElementById("modalBodySummaryDescription").appendChild(divB);
  document.getElementById("modalBodySummaryDescription").appendChild(divC);
  document.getElementById("modalBodySummaryDescription").appendChild(divD);
}
//
//公営企業とは（サマリーモーダル）
document.getElementById('modalSummary').addEventListener('show.bs.modal', function () {
  var nendo = 2020;
  fetch('/getAnalySummary/' + nendo , {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {

    createSummaryDescription();
    

    var list = JSON.parse(jsonData.data);
    var body = document.getElementById("modalBodySummary");
    var speed = 4;
    var numA = [];
    var numB = [];
    var divKessangArray = []
    var divKensuArray = []

    for(let i=0; i<list.length; i++){
      var tmpDiv1 = document.createElement("div");
      tmpDiv1.id = "divKessanG_" + list[i].gyoshu_cd + "";
      divKessangArray[i] = tmpDiv1;
      var tmpDiv2 = document.createElement("div");
      tmpDiv2.id = "divKensu_" + list[i].gyoshu_cd + "";
      divKensuArray[i] = tmpDiv2;
    }

    setInterval(function(){
      for(let i=0; i<list.length; i++){

        if(numA[i] == undefined) numA[i] = 0;
        if(numB[i] == undefined) numB[i] = 0;

        var stepA = list[i].kessan_g / 200;
        var stepB = list[i].kensu / 200;
        if(numA[i] <= list[i].kessan_g){
          divKessangArray[i].innerText = fullFormat( ((numA[i] + "").split(".")[0]) *1).split("万")[0] + "万円"; //(num <= tgt ? num:tgt);
          numA[i] = numA[i] + stepA;
        } else {
          divKessangArray[i].innerText =  fullFormat(list[i].kessan_g+0).split("万")[0]+ "万円"; //(num <= tgt ? num:tgt);
        }

        if(numB[i] <= list[i].kensu){
          divKensuArray[i].innerText =  ((numB[i] + "").split(".")[0]) + ""; //(num <= tgt ? num:tgt);
          numB[i] = numB[i] + stepB;
        } else {
          divKensuArray[i].innerText = list[i].kensu + ""; //(num <= tgt ? num:tgt);
        }
      }
    },speed);

    createTableLoading("modalBodySummaryDonuts", "SummaryDonutsDivLoading", "読み込み中...");
    setTimeout(() => {
      destroyTableLoading("modalBodySummaryDonuts", "SummaryDonutsDivLoading");
      
      var tmpCanvas = document.createElement("canvas");
      tmpCanvas.id = "donutsChart";
      document.getElementById("modalBodySummaryDonuts").appendChild(tmpCanvas);
      document.getElementById("modalBodySummaryDonutsCaption").innerText = "業種別構成比グラフ";
      createSummaryDonuts("donutsChart", list);
    }, 400);

    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var thA = document.createElement("th");
    thA.innerText = "業種";
    thA.classList.add("summaryHead");
    var thB = document.createElement("th");
    thB.innerText = "事業数";
    thB.classList.add("summaryHead");
    var thC = document.createElement("th");
    thC.innerText = "経済規模";
    thC.classList.add("summaryHead");
    tr.appendChild(thA);
    tr.appendChild(thB);
    tr.appendChild(thC);
    table.appendChild(tr);

    for(let i=0; i<list.length; i++){
      var tr = document.createElement("tr");
      var tdA = document.createElement("td");
      tdA.innerText = list[i].gyoshu_nm;
      tdA.classList.add("summaryCell");

      var tdB = document.createElement("td");
      tdB.appendChild(divKensuArray[i]);
      tdB.style.textAlign = "right";
      tdB.classList.add("summaryCell");

      var tdC = document.createElement("td");
      tdC.appendChild(divKessangArray[i]);
      tdC.style.textAlign = "right";
      tdC.classList.add("summaryCell");

      tr.appendChild(tdA);
      tr.appendChild(tdB);
      tr.appendChild(tdC);
      table.appendChild(tr);
    }
    body.appendChild(table);

  })
  .catch(error => { console.log(error); });
  
});


function fullFormat(number) {
  const formatter = new Intl.NumberFormat("ja-JP",{ 
    notation: "compact",
    useGrouping: false,
    maximumFractionDigits: 0
  })
  const fmt = (number, result = []) => {
    const bigIntNum = BigInt(number)
    const [num,notation] = formatter.formatToParts(bigIntNum)
    const numStr = bigIntNum.toString()
    if(notation === undefined){
      return [...result, numStr].join("")
    }
    const dig = num.value.length
    const value = numStr.slice(0,dig)
    const next = numStr.slice(dig)
    
    return fmt(next, [...result,`${value}${notation.value}`])
  }
  return fmt(number)
}







function createSummaryDonuts(id, list){
  //document.getElementById(id).title="";
  const ctx = document.getElementById(id).getContext('2d');
  var kessanGArray = list.map(item => item["kessan_g"]);
  var gyoshuNmArray = list.map(item => item["gyoshu_nm"]);
  //var data = kessanGArray;

  var sonota = 0;
  var newIndex = 0;
  var dataVal = [];
  var dataLabel = [];
  for (let i in kessanGArray){
    if(kessanGArray[i] >= 100000000000){
      dataVal[newIndex] = kessanGArray[i];
      dataLabel[newIndex] = gyoshuNmArray[i];
      newIndex = newIndex + 1;
    } else {
      sonota = sonota + kessanGArray[i];
    }
  }
  dataVal[newIndex] = sonota;
  dataLabel[newIndex] = "その他";

  var objChart1 = new Chart(ctx, {
      plugins: [{
        afterDatasetsDraw: function (chart, easing) {
          // To only draw at the end of animation, check for easing === 1
          var ctx = chart.ctx;
          
          chart.data.datasets.forEach(function (dataset, i) {
              var meta = chart.getDatasetMeta(i);
              if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                      // Draw the text in black, with the specified font
                      ctx.fillStyle = 'rgb(0, 0, 0)';
    
                      var fontSize = 16;
                      var fontStyle = 'normal';
                      var fontFamily = 'Helvetica Neue';
                      ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
    
                      // Just naively convert to string for now
                      var dataString = dataset.data[index].toString();
    
                      // Make sure alignment settings are correct
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
    
                      var padding = 5;
                      var position = element.tooltipPosition();

                      var sum = chart.data.datasets[0].data.reduce((previous, current) => previous + current);
                      if((dataString/sum) > 0.25){
                        ctx.fillText( donutsAmountFormat(dataString), position.x, position.y - (fontSize / 2) - padding);

                      }
                  });
              }
          });
          
          if (chart.data.datasets[0].data.length > 0) {
            const current = chart.ctx;
            const width = chart.width;
            const height = chart.height
            var fontSize = 30;
            var fontStyle = 'bold';
            var fontFamily = 'Helvetica Neue';
            current.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
            var sum = chart.data.datasets[0].data.reduce((previous, current) => previous + current);
            current.fillStyle = "#4d4cc1";
            if(donutsAmountFormat(sum).split("兆").length==2){
              var arr = donutsAmountFormat(sum).split("兆");
              current.fillText(arr[0] + "兆", width / 2, height / 2 +5);
              current.fillText(arr[1], width / 2, height / 2 +45);
            } else {
              current.fillText(donutsAmountFormat(sum), width / 2, height / 2 +25);
            }
          }
        }
      }],
      type: 'doughnut',
      data: {
          labels: dataLabel, //見直し必要
          datasets: [{
              data: dataVal, //datalist.filter(value => value["col_index"] ==rowindex).map(item => item["val_num"]), //[12, 19, 3, 5, 2, 3],tableから取得する 
              backgroundColor: BgColor_DoghnutsChart,
              borderColor: BdrColor_DoghnutsChart,
              borderWidth: 1
          }]
      },
      options: {
          plugins: {
              title: {
                  display: false,
                  align: "start",
                  text: "dummy"
              }
          }
          
      }
  });
  return objChart1;
  
}


function donutsAmountFormat(dataString){
  var am = fullFormat(dataString);
  if(am.split("億").length == 2){
    return am.split("億")[0] + "億";
  }
  return "";
}










function createMapSummary(){
  var tmpDiv = document.getElementById("mapAreaDiv");
  while(tmpDiv.lastChild){
    tmpDiv.removeChild(tmpDiv.lastChild);
  }
  
  
  var nendo = 2020;
  fetch('/getAnalyPrefecture/' + nendo , {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    document.getElementById("mapAreaDiv").appendChild(getMapHtml());
    var list = JSON.parse(jsonData.data);
    var areas = document.getElementById("japan-map").querySelectorAll(".area");
    for(let i=0; i<areas.length; i++){//for(let i in areas){
      var prefs = areas[i].querySelectorAll("div");
      for(let j=0; j<prefs.length; j++){
        var kensu = list.filter(value => value["pref_nm"].substring(0,2) == prefs[j].innerText.substring(0,2)).map(item => item["kensu"]);
        prefs[j].innerText = prefs[j].innerText + "\r\n" + kensu;
      }
    }
    document.getElementById('btnTargetSelect').classList.add("disabled");
    //document.getElementById("btnTargetSelect").setAttribute("disabled");
  console.log(123);
  })
  .catch(error => { 
    console.log(error); 
  });

}


document.getElementById('modalUse').addEventListener('show.bs.modal', function () {
  ;
  //createMapSummary();
});



function remove(str){
  var tmp = str.split(",");
  for (let i in tmp){
    if(document.getElementById(tmp[i]) != undefined){
      document.getElementById(tmp[i]).remove();
    }
  }
}


function createElementCustom(tagName, classList, id, innerText, title){
  var tmp = document.createElement(tagName);
  var tmpClassListArray = classList.split(",");
  for(let i in tmpClassListArray){
    tmp.classList.add(tmpClassListArray[i]);
  }
  tmp.id = id;
  tmp.innerText = innerText;
  if(title!=undefined){
    tmp.title = title;
  }

  return tmp;
}

document.getElementById("mapAreaDiv").addEventListener('click', function() {
  var prefCd = event.target.title;
  var gyoshuCd = "0";
  var jigyoCd = "0";
  if( prefCd.indexOf("pref") == -1){
    return;
  }
  if( prefCd.indexOf("-") > -1){
    var tmp = prefCd.split("-");
    prefCd = tmp[0];
    gyoshuCd = tmp[1];
    jigyoCd = tmp[2];
  }
  prefCd = prefCd.replace("pref","");
  if(1 <= prefCd && prefCd <= 47){
    remove("prefDantaiListTableDiv");
    if(gyoshuCd == "0" && jigyoCd == "0"){
      document.getElementById("japan-map").style.display = "none";
      remove("divSelectedPrefecture,prefDantaiListTableDiv,mapHeadRowDiv");
      var divRow = createElementCustom("div","row","mapHeadRowDiv","");
      var divCol2 = createElementCustom("div","col-2","","");
      divRow.appendChild(divCol2);
      var alert = createElementCustom("div","alert,alert-secondary","divSelectedPrefecture",event.target.innerHTML.split("<br>")[0]);
      setAttributes(alert,"role,alert");
      alert.style.cssText = "text-align:center; font-size:22px; padding:2px 2px 2px 2px";
      divCol2.appendChild(alert);
      document.getElementById("mapAreaDiv").appendChild(divRow);
    }
    
    //%div.col-4.loadableTable#divMainLeftBottom
    var loadbleTable = createElementCustom("div", "loadableTable", "prefDantaiListTableDiv") //document.createElement("div");
    document.getElementById("mapAreaDiv").appendChild(loadbleTable);
    createTableLoading("prefDantaiListTableDiv", "prefDantaiListTableDivLoading", "企業名リストを作成中...");

    var nendo = 2020;
    fetch('/getAnalySisetuByPrefCd/' + nendo + "/" + prefCd + "/" + gyoshuCd + "/" + jigyoCd , {
      method: 'GET',
      'Content-Type': 'application/json'
    })
    .then(res => res.json())
    .then(jsonData => {
      var list = JSON.parse(jsonData.data);
      createTableDiv("prefDantaiListTableDiv", "prefDantaiListTableDivMain");
      var hdText = ["団体コード", "施設コード", "団体名", "施設名", "業種名", "事業名"];
      var propId = ["dantai_cd", "sisetu_cd", "dantai_nm", "sisetu_nm", "gyoshu_nm", "jigyo_nm"];
      var align = ["left", "left", "left", "left", "left", "left"];
      var width = ["10%", "10%", "25%", "25%", "15%", "15%"];
    var headRowLines = 1;
    createTableByJsonList(list, "prefDantaiListTableDiv", "prefDantaiListTableDivMain", "企業名リスト", hdText, propId, align, width, 3, headRowLines);
      destroyTableLoading("prefDantaiListTableDiv", "prefDantaiListTableDivLoading");
      document.getElementById('btnTargetSelect').classList.add("disabled");
      if(document.getElementById("mapHeadRowDiv").querySelectorAll("span").length == 0){
        var jigyoSummaryArray = getjigyoSummary( list ); //list.map(item => item["jigyo_nm"]) );
        var divCol4 = document.createElement("div"); 
        divCol4.classList.add("col-10");
        document.getElementById("mapHeadRowDiv").appendChild(divCol4);
  
        var prefCd = list[0].dantai_cd.substring(0,2);
        for(let i=0; i<jigyoSummaryArray.length; i++){
          var span = createElementCustom("span", "badge,bg-primary,rounded-pill","gyoshuBadgeDiv_" + i,jigyoSummaryArray[i].jigyo_nm + " " + jigyoSummaryArray[i].kensu,"") //document.createElement("span");
          span.title = "pref" + prefCd + "-" + jigyoSummaryArray[i].gyoshu_cd + "-" + jigyoSummaryArray[i].jigyo_cd
          span.style.cssText = "cursor:pointer; margin-right:5px";
          span.addEventListener('click', (event) => {
            console.log(1);
          });
          divCol4.appendChild(span);
        }
      }
    })
    .catch(error => { console.log(error); });
  }
});

function getjigyoSummary(array) {
  var uniquedArray = [];
  var countArray = [];
  var codeArray = [];
  var returnArray = [];
  for (const elem of array) {
    if (!returnArray.map(item => item["jigyo_nm"]).includes(elem.jigyo_nm)){
      returnArray.push( {
        gyoshu_cd:elem.gyoshu_cd, 
        jigyo_cd:elem.jigyo_cd, 
        jigyo_nm:elem.jigyo_nm, 
        kensu:1
      } );
      //countArray.push(1);
    } else {
      var a = returnArray.filter(value => value["jigyo_nm"] ==elem.jigyo_nm).map(item => item["kensu"]);
      returnArray.filter(value => value["jigyo_nm"] ==elem.jigyo_nm)[0].kensu = a*1 + 1;
      //countArray[uniquedArray.indexOf(elem)] = countArray[uniquedArray.indexOf(elem)] + 1;
    }
  }
  // for(let a in uniquedArray){
  //   returnArray.push([uniquedArray[a], countArray[a]]);
  // }
  return returnArray;
}


function createApiMix(selectRow){
  var dantaiCd = selectRow.dantai_cd.substring(0,5);
  var prefCd = selectRow.dantai_cd.substring(0,2);
  //fetch('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=214019&prefCode=21' , {
  fetch('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=' + dantaiCd + '&prefCode=' + prefCd , {
    method: 'GET',
    'Content-Type': 'application/json;charset=UTF-8',
    headers: {"X-API-KEY": "hPDqJFreaqzQ9eK3OUfIjNoSSaMCb0nxiWWMRPjq"}
  })
  .then(res => res.json())
  .then(jsonData => {
    var list = jsonData.result.data;
    if(apiMixLineChart != null){
      apiMixLineChart.destroy();
    }
    apiMixLineChart = createApiMixGraph(list);
    
  })
  .catch(error => { console.log(error); });

}

function createApiMixGraph(list){
  //radarChart.destroy();
  const ctx = document.getElementById("apiMixChart").getContext('2d');
  var datasets = [];
  for(let i in list){
    datasets.push({
      label: list[i].label,
      data: list[i].data.map(item => item["value"]), //[12, 19, 3, 5, 2, 3],tableから取得する
      backgroundColor: BgColor_LineChart[i],
      borderColor: BdrColor_LineChart[i],
      borderWidth: 1,
      pointRadius: 6,
    })
  }
  let delayed;
  var objChart1 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: list[0].data.map(item => item["year"]),
        datasets: datasets
    },
      options: {
        //animation:false,
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: 10
        },
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins: {
              title: {
                  display: false,
                  align: "start",
                  text: "labelStr"
              },
              legend: {
                  labels: {
                      // This more specific font property overrides the global property
                      font: {
                          size: 16
                      }
                  }
              }
          }
      }
  });
  return objChart1;
}




document.getElementById("btnTargetSelect").addEventListener('click', function() {
  var selectRow = globalSelectedRow;
  globalSelectedRow = null;
  createHyoVerticalNavbar(selectRow); //基本情報タブの左の表バー
  moveCompareTab(selectRow);
  CreateRadarChart(selectRow);
  getAndCreateTable_DantaiListOfRadarChart(selectRow);
  createToasts(selectRow);
  createScatterChart(selectRow);
  createApiMix(selectRow);
  
  // var modal = document.getElementById('modalUse');
  // modal.classList.remove('show');
  // modal.setAttribute('aria-hidden', 'true');
  // modal.setAttribute('style', 'display: none');
  document.getElementById("btnCloseMapModal").click();
});

document.getElementById("btnMapOn").addEventListener('click', function() {
  document.getElementById("japan-map").style.display = "";
  if(document.getElementById("divSelectedPrefecture")!=undefined){
    document.getElementById("divSelectedPrefecture").remove();
  }
  remove("divSelectedPrefecture,prefDantaiListTableDiv,mapHeadRowDiv");
  document.getElementById('btnTargetSelect').classList.add("disabled");

  // if(document.getElementById("japan-map").style.display=="none"){

  // }
});


//
// ここからは過去資料






document.getElementById('btnExecuteImport').addEventListener('click', function() {
  document.getElementById('btnExecuteCollect').classList.add("disabled");
  document.getElementById('btnExecuteImport').classList.add("disabled");
  var tablerows = document.getElementById("tableFileCollect").querySelector("table").rows;
  for(let i=1; i<tablerows.length; i++){
    var chk = tablerows[Number(i)].cells[0].querySelector("input[type='checkbox']");
    if(chk!=null){
      if(chk.checked){
        tablerows[Number(i)].cells[6].innerHTML = "<span style='color:orange'>(計算中)</span>";
        tablerows[Number(i)].cells[0].innerHTML = "";
        var query_params = 
          tablerows[Number(i)].cells[1].innerText + "/" + 
          tablerows[Number(i)].cells[2].innerText + "/" + 
          tablerows[Number(i)].cells[3].innerText + "/" + 
          tablerows[Number(i)].cells[4].innerText.split("/").join("|").split("?").join("@");

        fetch('/executeFileGetAndInsert/' + query_params + "/0/100")
        .then(res => res.blob())
        .then(csvFile => {
          

          var saiki = function (csvFile, indexFrom, indexTo, query_params, shoriZumi){

            let formData = new FormData();
            formData.append('csvFile', csvFile);
            formData.append('indexFrom', indexFrom);
            formData.append('indexTo', indexTo);
            formData.append('shoriZumi', shoriZumi);
            formData.append('queryParams', query_params);
  
            fetch('/csvUpload', {
              method: 'PUT',
              body: formData,
            })
            .then(res => res.json())
            .then(jsonData => {
              //jsonData.data.totalKensu
              //
              if(jsonData.data.nokoriKensu>0){
                updateSinthoku(jsonData.data);
                saiki(csvFile, jsonData.data.startIndex, (jsonData.data.startIndex*1+10), query_params, jsonData.data.shoriZumi);
                updateSinthoku(jsonData.data);
              } else {
                updateJotaiResult(jsonData.data);
                return;
              }
            })
            .catch(error => { console.log(error); });

          }

          saiki(csvFile, 0, 10, query_params, 0);
          
        })
        .catch(error => { 
          console.log(error); 
        });
        //break;
        
        tablerows[Number(i)].cells[5].classList.add("loading-ss");
        tablerows[Number(i)].cells[5].innerText = "";
      }
    }
  }
  document.getElementById('btnExecuteCollect').classList.remove("disabled");
  document.getElementById('btnExecuteImport').classList.remove("disabled");
});

function updateSinthoku(list){

  //var resultArray = clientSideQueryParams.split("/");
  var tablerows = document.getElementById("tableFileCollect").querySelector("table").rows;
    for(let i=0; i<tablerows.length; i++){
      if (tablerows[i].cells[1].innerText == list.nendo &&
        tablerows[i].cells[2].innerText == getHoutekiOrHouHiteki(list.gyomu_cd) &&
        tablerows[i].cells[3].innerText == list.hyo_num){
          tablerows[i].cells[6].innerText = list.shoriZumi + "/" + list.totalKensu;
          //tablerows[i].cells[6].classList.remove("loading-ss");
          //tablerows[Number(i)].cells[0].innerHTML = "";
        }
    }
}

function getHoutekiOrHouHiteki(cd){
  if(cd==46){
    return "法適用";
  }else{
    return "法非適用";
  }
}

function updateJotaiResult(list){
  var tablerows = document.getElementById("tableFileCollect").querySelector("table").rows;
  //var tablerows = document.getElementById("tableFileCollect").rows;
    for(let i=0; i<tablerows.length; i++){
      if (tablerows[i].cells[1].innerText == list.nendo &&
        tablerows[i].cells[2].innerText == getHoutekiOrHouHiteki(list.gyomu_cd) &&
        tablerows[i].cells[3].innerText == list.hyo_num){
          tablerows[i].cells[5].innerText = "完了！";
          tablerows[i].cells[6].innerText = "100%";
          tablerows[i].cells[5].classList.remove("loading-ss");
          tablerows[Number(i)].cells[0].innerHTML = "";
          updateStatus(list.nendo, list.gyomu_cd, list.hyo_num, 0);
        }
    }

}

function updateStatus(nendo, gyomu_cd, hyo_num, hyo_num_sub){
  fetch('/updateImportStatus/' + nendo + "/" + gyomu_cd + "/" + hyo_num+ "/" + hyo_num_sub, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    var list = JSON.parse(jsonData.data);
  })
  .catch(error => { console.log(error); });
}


document.getElementById('btnExecuteCollect').addEventListener('click', function() {
  createTableLoading("tableFileCollectDiv", "abcdeLoading", "政府統計をクローリングしています...");
  document.getElementById('btnExecuteCollect').classList.add("disabled");
  document.getElementById('btnExecuteImport').classList.add("disabled");

  var filePattern = "dummy"; //getSelectedFilePatternNm();
  fetch('/executeFileCollect/' + filePattern, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("tableFileCollectDiv", "tableFileCollect");
    //CreateFileCollectTable(jsonData.data);
    var hdText = ["対象", "決算年度", "法適用区分","表番号", "検出URL", "状態","進捗"];
    var propId = ["checkbox", "year", "dantai", "text", "url", "jotai","sinchoku"];
    var align = ["left", "left", "left", "left", "left", "center"];
    var headRowLines = 1;
    createTableByJsonList(jsonData.data, "tableFileCollectDiv", "tableFileCollect", "ファイル取り込み状況", hdText, propId, align, null, 1.5, headRowLines);
    customizeFileImportTable();
    document.getElementById('btnExecuteCollect').classList.remove("disabled");
    document.getElementById('btnExecuteImport').classList.remove("disabled");
    destroyTableLoading("tableFileCollectDiv", "abcdeLoading");
    document.getElementById('btnExecuteImport').classList.remove("disabled");
})
  .catch(error => { 
    console.log(error); 
  });
  
  //document.getElementById('btnFileImport').classList.add("disabled");
});


function customizeFileImportTable(){
  var tablerows = document.getElementById("tableFileCollect").querySelector("table").rows;
    for(let i=0; i<tablerows.length; i++){
      if (tablerows[i].cells[5].innerText == "取込済"){
        tablerows[i].cells[0].innerText = "";
        tablerows[i].cells[6].innerText = "";
      }
    }
}

//ファイル取り込みモーダルを起動
//ファイルインプットタグを初期化
//
document.getElementById('modalExcelUpload').addEventListener('show.bs.modal', function () {
  //document.getElementById('btnFileImport').classList.add("disabled");
  document.getElementById('btnExecuteImport').classList.add("disabled");
  AllClearTable("tableFileCollectDiv");
  //document.getElementById('selFilePattern').selectedIndex = 0;
  //document.getElementById('btnExecuteCollect').classList.add("disabled");
});



//var tabEl = document.querySelector('button[data-bs-toggle="tab"]');
//vTabSetting-AA

let targets = document.querySelectorAll("[id^='vTabSetting']"); //' #divGraphArea *');
targets.forEach(target => {
  target.addEventListener("shown.bs.tab", function (event) {
    if(event.target.id == "vTabSetting-AA"){
      createHyoList();
    } else {
      alert(event.target.id);
    }
  });
});


// 基本情報タブの左の表リストを作成
function createHyoList(){
  //var key = selectRow.gyomu_cd + "-" + selectRow.gyoshu_cd + "-" + selectRow.jigyo_cd + "-" +  selectRow.dantai_cd + "-" +  selectRow.sisetu_cd;
  var val = "2020"; // 会計年度、見直し必要。
  fetch('/getHyoListForProfile/' + document.getElementById("settingNendo").value, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    
    var tmp = document.getElementById("divSettingHyoList");
    while(tmp.lastChild){
      tmp.removeChild(tmp.lastChild);
    }

    let group = document.getElementById("divSettingHyoList");
    
    // let div1 = document.createElement("div");
    // div1.classList.add("d-flex");
    // div1.classList.add("align-items-start");

    // var divTabGroup = document.createElement("div");
    // divTabGroup.classList.add("nav","flex-column","nav-pills","me-3");
    // divTabGroup.id = "v-pills-tab";
    // divTabGroup.setAttribute("role","tablist"); //role="tablist" aria-orientation="vertical"
    // divTabGroup.setAttribute("aria-orientation","vertical"); //role="tablist" aria-orientation="vertical"

    // var divContentGroup = document.createElement("div");
    // divContentGroup.classList.add("tab-content");
    // divContentGroup.id = "v-pills-tabContent";
    // //divContentGroup.classList.add("loadableTable"); //ローダーをセンタリングする
    // divContentGroup.style.width="100%";

    var list = JSON.parse(jsonData.data);
    for(let i in list){
      var listItem = document.createElement("a");
      listItem.classList.add("list-group-item","list-group-item-action","list-group-item-sm");
      listItem.id = "aSettingHyoItem" + list[i].hyo_num;
      listItem.innerText = list[i].hyo_num + "." + list[i].hyo_nm;
      setAttributes(listItem,"data-bs-toggle,list" + "/" + "href,#" + "/" + "aria-selected,false");
      
    //   tabButtonA.addEventListener('click', (event) => {
    //     createHyoTableByHyoNumber(key, event.target.innerText.substring(0,2));
    //   });

    //   divTabGroup.appendChild(tabButtonA);

    //   //<div class="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
    //   var divContent = document.createElement("div");
    //   divContent.classList.add("tab-pane", "face", "loadableTable", "col-12");
    //   divContent.id = "v-pills-" + list[i].hyo_num;
    //   divContent.setAttribute("role","tabpanel");
    //   divContent.setAttribute("aria-labelledby","v-pills-" + list[i].hyo_num + "-tab");
    //   divContentGroup.appendChild(divContent);
      group.appendChild(listItem);
    }
    // div1.appendChild(divTabGroup);
    // div1.appendChild(divContentGroup);
    // document.getElementById('profile-panel').appendChild(div1);

    // // デフォルトで20表を選択する。
    // document.getElementById('vTabHyo_20').classList.add("active");
    // document.getElementById('v-pills-20').classList.add("active");
    // createHyoTableByHyoNumber(key, 20);
    return;
  })
  .catch(error => { console.log(error); });
}


document.getElementById("offcanvasSetting").addEventListener("show.bs.offcanvas", function (event) {
  var settingNendoObj = document.getElementById("settingNendo");
  while(settingNendoObj.lastChild){
    settingNendoObj.removeChild(settingNendoObj.lastChild);
  }
  createNendoList();
});


function createNendoList(){
  //枠内にローダーを表示
  //createTableLoading("divMainLeftTop", "tableDivLoading1", "経常収支比率による収益性ランクを作成中...");
  //var val = "2020"; // 会計年度、見直し必要。
  //var joken = getGyoshuJoken();
  fetch('/getNendoList', {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    var list = JSON.parse(jsonData.data);
    var settingNendoObj = document.getElementById("settingNendo"); //selTdfkSub
    for(let i in list){
      var option = document.createElement("option");
      option.value = list[i].nendo;
      option.text = list[i].nendo;
      settingNendoObj.appendChild(option);
    }
    document.getElementById("settingNendo").value = list[0].nendo;
    createHyoList();
    return;
  })
  .catch(error => { console.log(error); });
}



// for(let i in targets){
//   targets[i].addEventListener("shown.bs.tab", function (event) {
//     alert(event.target);
//   });
// }


function AllClearGraphs(){
  var graphArea = document.getElementById("divGraphRow1");
  while(graphArea.lastChild){
    graphArea.removeChild(graphArea.lastChild);
  }
}

//"mainTableDiv"
function AllClearTable(tableDivId){
  var tableDiv = document.getElementById(tableDivId);
  while(tableDiv.lastChild){
    tableDiv.removeChild(tableDiv.lastChild);
  }
}


// var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
// var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
//   return new bootstrap.Offcanvas(offcanvasEl)
// })



var datalist = null;

function createTable(datalist){
  var tableDiv = document.getElementById("mainTableDiv");
  while(tableDiv.lastChild){
    tableDiv.removeChild(tableDiv.lastChild);
  }

  let table = document.createElement("table");
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  thead.appendChild(createHeader(datalist));

  var lastIndex = -1;
  var blAddRow = false;
  trow = document.createElement('tr');
  let tdataVal = document.createElement('td');
  for(let i in datalist){

    if(lastIndex != datalist[i].col_index){ //新しく行が始まったときにインデックスと見出し作成
      let tdataA = document.createElement('td');
      tdataA.innerHTML = datalist[i].col_index;
      trow.appendChild(tdataA);
  
      let tdataB = document.createElement('td');
      tdataB.innerHTML = formatCategory1(datalist[i].col_key1);
      //trow.appendChild(tdataB);
  
      let tdataC = document.createElement('td');
      tdataC.innerHTML = formatCategory2(datalist[i].col_key2);
      trow.appendChild(tdataC);
  
      let tdataD = document.createElement('td');
      tdataD.innerHTML = formatCategory3(datalist[i].col_key3);
      trow.appendChild(tdataD);
  
      let tdataE = document.createElement('td');
      tdataE.innerHTML = formatCategory4(datalist[i].col_key4);
      trow.appendChild(tdataE);
  
      let tdataF = document.createElement('td');
      tdataF.innerHTML = formatCategory5(datalist[i].col_key5);
      trow.appendChild(tdataF);
      
      let tdataG = document.createElement('td');
      tdataG.innerHTML = formatCategory6(datalist[i].col_key6, datalist[i]);
      trow.appendChild(tdataG);
      
      let tdataH = document.createElement('td');
      tdataH.innerHTML = formatCategory7(datalist[i].col_key7, datalist[i]);
      trow.appendChild(tdataH);
    }


    let tdataVal = document.createElement('td');
    tdataVal.innerHTML = formatCategoryValue(datalist[i].val_num);
    tdataVal.classList.add("text-end"); //
    trow.appendChild(tdataVal);
    
    if(IsSameTR_NextRow(datalist, i)){
      ; //継続
    } else {
      //row_selected
      trow.addEventListener('click', (event) => {
        var rowindex = Number(event.srcElement.parentElement.cells[0].innerText);
        var valueArray = datalist.filter(value => value["col_index"] ==rowindex).map(item => item["val_num"]);
        var valueMax = Math.max.apply(null, valueArray);
        var valueMin = Math.min.apply(null, valueArray);
        if(valueMax == 0 && valueMin == 0){
          return;
        }
        event.srcElement.parentElement.classList.add("row_selected");
        var title = getSelectedTdfkNm() + " " + getSelectedCityNm() 
          + " | "
          + "(" + rowindex + ") " 
          + event.srcElement.parentElement.cells[1].innerText + " / "
          + event.srcElement.parentElement.cells[2].innerText + " / "
          + event.srcElement.parentElement.cells[3].innerText + " / "
          + event.srcElement.parentElement.cells[4].innerText + " / "
          + event.srcElement.parentElement.cells[5].innerText ;

        let graphs = document.querySelectorAll("[id^='canvasChart']"); //' #divGraphArea *');
        for(let i in graphs){
          if(graphs[i].title == title){
            graphs[i].style.backgroundColor="rgba(255, 99, 132, 0.2)";
            graphs[i].style.opacity = "0.5";
            setTimeout(function(){
              graphs[i].style.backgroundColor = "";
              graphs[i].style.opacity = "";
            },100);
            return;
          }
        }

        var graphId = createGraphArea(datalist, rowindex, "divGraphRow1", title);
        createGraphTest(datalist, rowindex, graphId, title);

      });
      tbody.appendChild(trow);
      trow = document.createElement('tr');
    }
    lastIndex = datalist[i].col_index;

  }
  table.appendChild(thead);
  table.appendChild(tbody);
  table.classList.add("table");
  table.classList.add("table-bordered");
  table.classList.add("table_sticky");
  table.classList.add("table-hover");
  table.classList.add("fs-7"); //text-end
  table.id = "mainTable";
  document.getElementById('mainTableDiv').appendChild(table);
  //table = new DataTable(mainTable);
}

function IsSameTR_NextRow(datalist, i){
  try{
    // if (
    //   datalist[i].sheet_nm +
    //   datalist[i].col_key1 +
    //   datalist[i].col_key2 +
    //   datalist[i].col_key3 +
    //   datalist[i].col_key4 +
    //   datalist[i].col_key5 +
    //   datalist[i].col_key6 +
    //   datalist[i].col_key7 == datalist[Number(i)+1].sheet_nm +
    //     datalist[Number(i)+1].col_key1 +
    //     datalist[Number(i)+1].col_key2 +
    //     datalist[Number(i)+1].col_key3 +
    //     datalist[Number(i)+1].col_key4 +
    //     datalist[Number(i)+1].col_key5 +
    //     datalist[Number(i)+1].col_key6 +
    //     datalist[Number(i)+1].col_key7){
    //   return true;
    // }
    if (datalist[i].col_index == datalist[Number(i)+1].col_index){
      return true;
    }
  }catch(e){

  }
  return false;
}


function openHikakuModal(datalist, rowindex, title){
  var myModal = new bootstrap.Modal(document.getElementById('modalGraphHikaku'), {
    keyboard: false
  });

  
  var ele = document.getElementById("divGraphHikakuArea");
  while( ele.firstChild ){
    ele.removeChild( ele.firstChild );
  }

  //document.getElementById("modalGraphHikakuLabel").innerText = rowindex;
  var graphId = createGraphAreaModal(datalist, rowindex, "divGraphHikakuArea");
  graphHikakuChart = createGraphTest(datalist, rowindex, graphId, title);
  
  myModal.show();
}

document.getElementById("selTdfkSub").addEventListener("change", function(){
  //AllClearGraphs();
  getCityList();
});

function getCityList(){
  AllClearTable("tableDivHikakuCityList");
  val = document.getElementById("selTdfkSub").value;
  fetch('/getCityListByTdfkCd/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    var list = JSON.parse(jsonData.data);
    createTableRightSideCityList(list);
    //createCitySelectOption(list);
    return;
  })
  .catch(error => { console.log(error); });
  //dispLoading();
}

// function createTableRightSideCityList(datalist){
//   var tableDiv = document.getElementById("tableDivHikakuCityList");
//   while(tableDiv.lastChild){
//     tableDiv.removeChild(tableDiv.lastChild);
//   }

//   let table = document.createElement("table");
//   let thead = document.createElement('thead');
//   let tbody = document.createElement('tbody');

//   let trow = document.createElement('tr');

//   let th = document.createElement('th');
//   th.innerHTML = "市区町村";
//   trow.appendChild(th);
//   thead.appendChild(trow);

//   let tdataVal = document.createElement('td');
//   for(let i in datalist){
//     trow = document.createElement('tr');
//     let tdataA = document.createElement('td');
//     tdataA.innerHTML = datalist[i].city_nm;
//     tdataA.title = datalist[i].dantai_cd
//     trow.appendChild(tdataA);

//     trow.addEventListener('click', (event) => {
//       var cityNm = event.srcElement.parentElement.cells[0].innerText;
//       var dantaiCd = event.srcElement.parentElement.cells[0].title;
//       var graphCanvas = document.getElementById("divGraphHikakuArea").firstChild;
//       //graphHikakuChart
//       //alert(cityNm);
//       getRadarChartData(graphHikakuChart, dantaiCd)
//     });
//     tbody.appendChild(trow);
//   }
//   table.appendChild(thead);
//   table.appendChild(tbody);
//   table.classList.add("table");
//   table.classList.add("table-bordered");
//   table.classList.add("table_sticky");
//   table.classList.add("table-hover");
//   table.classList.add("fs-6"); //text-end
//   table.id = "tableHikakuCityList";
//   document.getElementById('tableDivHikakuCityList').appendChild(table);
//   //table = new DataTable(mainTable);
// }


// function funcRadarHikaku(vendornm){
//   if(graphHikakuChart.data.datasets.length > 4){
//       alert("これ以上比較対象を追加できません。");
//       return false;
//   }
//   var add = true;
//   $.each(graphHikakuChart.data.datasets, function(i, item) {
//       if(item.label==vendornm){
//           add = false;
//       }
//   });
  
//   if(add){
//       getRadarChartData(graphHikakuChart, vendornm);
//   }
// }

// function getRadarChartData(chartData, dantaiCd){
//   var idx = chartData.data.datasets.length;
//   if(idx==0){
//       if(graphHikakuChart!=null){
//           graphHikakuChart.destroy();
//       }
//   }
//   //AllClearGraphs();
//   //AllClearTable("mainTableDiv");
//   //val = document.getElementById("selCity").value;
//   fetch('/getFullRecordByDantaiCd/' + dantaiCd, {
//     method: 'GET',
//     'Content-Type': 'application/json'
//   })
//   .then(res => res.json())
//   .then(jsonData => {
//     chartData.data.datasets.push({
//         label: '',
//         backgroundColor: '', //BgColor_RadarChart[idx],
//         borderColor: '', // BdrColor_RadarChart[idx],
//         data: [],
//         borderWidth: 1
//     });
//     chartData.data.datasets[idx].label = dantaiCd;//(idx == 0 ? dantaiCd : dantaiCd.substring(0,2));
//     var list = JSON.parse(jsonData.data);
//     if(list.length > 0){
//         $.each(list, function(i, item) {
//             chartData.data.datasets[idx].data.push(item.shubetu1_avg);
//             chartData.data.datasets[idx].data.push(item.shubetu2_avg);
//             chartData.data.datasets[idx].data.push(item.shubetu3_avg);
//             chartData.data.datasets[idx].data.push(item.shubetu4_avg);
//             chartData.data.datasets[idx].data.push(item.shubetu5_avg);
//             chartData.data.datasets[idx].data.push(item.shubetu6_avg);
//             chartData.data.datasets[idx].data.push(item.shubetu7_avg);
//         });
//     }
//     //createTable(list);
//     //UndispLoading();
//     return;
//     //document.querySelector('#lblFileProperty').innerHTML = "取り込み完了！"; //jsonData.data;
//     //document.getElementById('btnFileImport').classList.remove("disabled");
//   })
//   .catch(error => { console.log(error); });
//   //dispLoading();
//           // AllClearTable("mainTableDiv");
//           // val = document.getElementById("selTdfk").value;
//           // document.getElementById("selTdfkSub").value = val;
//           // fetch('/getCityListByTdfkCd/' + val, {
//           //   method: 'GET',
//           //   'Content-Type': 'application/json'
//           // })
//           // .then(res => res.json())
//           // .then(jsonData => {
//           //   var list = JSON.parse(jsonData.data);
//           //   createCitySelectOption(list);
//           //   UndispLoading();
//           //   return;
//           // })
//           // .catch(error => { console.log(error); });
//           //   dispLoading();






//   // $.ajax({
//   //     type: "GET",
//   //     url: "/getHikakuDataByDantaiCd/" + dantaiCd + ""
//   // }).done(function(json) {
//   //     chartData.data.datasets.push({
//   //         label: '',
//   //         backgroundColor: BgColor_RadarChart[idx],
//   //         borderColor: BdrColor_RadarChart[idx],
//   //         data: [],
//   //         borderWidth: 1
//   //     });

//   //     chartData.data.datasets[idx].label = dantaiCd;//(idx == 0 ? dantaiCd : dantaiCd.substring(0,2));
//   //     list = JSON.parse(json.data);
//   //     if(list.length > 0){
//   //         $.each(list, function(i, item) {
//   //             chartData.data.datasets[idx].data.push(item.shubetu1_avg);
//   //             chartData.data.datasets[idx].data.push(item.shubetu2_avg);
//   //             chartData.data.datasets[idx].data.push(item.shubetu3_avg);
//   //             chartData.data.datasets[idx].data.push(item.shubetu4_avg);
//   //             chartData.data.datasets[idx].data.push(item.shubetu5_avg);
//   //             chartData.data.datasets[idx].data.push(item.shubetu6_avg);
//   //             chartData.data.datasets[idx].data.push(item.shubetu7_avg);
//   //         });
//   //     }
//   // }).fail(function(data) {
//   //     alert("エラー：" + data.statusText);
//   // }).always(function(json) {
//   //     list = JSON.parse(json.data);
//   //     if(idx==0){
//   //         if(list.length>0){
//   //             //比較選択に使うプルダウンを作る
//   //             $.getJSON("/getVendorNmList", function(json) {
//   //                 list = JSON.parse(json.data);
//   //                 $('#selVendorNmHikaku .dropdown-menu').empty();
//   //                 $.each(list, function(i, item) {
//   //                     $('#selVendorNmHikaku .dropdown-menu').append('<li><a onclick=funcRadarHikaku("' + item.vendor_nm + '");>' + item.vendor_nm);
//   //                 });
//   //                 $('#selVendorNmHikaku .btn').removeAttr("disabled");
//   //             });
//   //         } else {
//   //             $('#selVendorNmHikaku .btn').attr("disabled","disabled");
//   //         }
//   //     }
//   //     var ctx = $("#myChart").get(0).getContext("2d");
//   //     if(idx==0){
//   //         graphHikakuChart = new Chart(ctx, chartData);
//   //     }else{
//   //         graphHikakuChart.update();
//   //     }
//   // });
// }

//ファイル取り込みモーダルを起動
//ファイルインプットタグを初期化
//
document.getElementById('modalGraphHikaku').addEventListener('show.bs.modal', function () {
  getCityList();
});


function destroyGraph(key, gyo_num, retu_num){
  var id = key.split("_")[0]
  let graphDiv = document.querySelector("#" + id); 
  if (graphDiv) {
    document.getElementById("divGraphRow1").removeChild(graphDiv)
    var tablerows = document.getElementById("mainTable").rows;
    // for(let i=0; i<tablerows.length; i++){
    //   if(tablerows[Number(i)].cells[0].innerText == rowindex){
    //     //tablerows[Number(i)].style.backgroundColor = "";
    //     tablerows[Number(i)].classList.remove("row_selected");
    //     //bg.classList.remove('is-hide');

    //   }
    // }
  }
}

function createGraphArea(valueArray, areaId, title){
  let graphs = document.querySelectorAll("[id^='divGraphArea']"); //' #divGraphArea *');
  var max = 1;
  if(graphs.length > 0){
    for(let i =0; i<graphs.length; i++){
      if(max < Number(graphs[i].id.replace("divGraphArea",""))){
        max = Number(graphs[i].id.replace("divGraphArea",""));
      }
    }
  }

  var spanBadge1 = document.createElement("span");
  spanBadge1.innerText = "消去";
  spanBadge1.classList.add("badge", "rounded-pill", "bg-primary", "text-end", "badge-clickable"); 
  spanBadge1.id = "divGraphArea" + (max+1) + "_deleteBtn";
  spanBadge1.addEventListener('click', function() {
    destroyGraph(spanBadge1.id, valueArray[0].gyo_num, valueArray[0].retu_num);
  });

  var spanBadge2 = document.createElement("span");
  spanBadge2.innerText = "比較";
  spanBadge2.classList.add("badge", "rounded-pill", "bg-primary", "text-end", "badge-clickable"); 
  spanBadge2.id = "divGraphArea" + (max+1) + "_shosaiBtn";
  spanBadge2.addEventListener('click', function() {
    openHikakuModal(datalist, rowindex, title);
  });

  
  var sep = document.createElement("span");
  sep.innerText = " ";
  var tmpDivArea = document.createElement("div");
  tmpDivArea.classList.add("col-6");
  
  tmpDivArea.id = "divGraphArea" + (max+1);
  document.getElementById(areaId).appendChild(tmpDivArea);
  tmpDivArea.appendChild(spanBadge1);
  tmpDivArea.appendChild(sep);
  tmpDivArea.appendChild(spanBadge2);

  tmpCanvas = document.createElement("canvas");
  tmpCanvas.id = "canvasChart" + (max+1);
  document.getElementById(tmpDivArea.id).appendChild(tmpCanvas);

  return max+1;
}

function createGraphAreaModal(datalist, rowindex, areaId, title){
  //divGraphGroup
  let graphs = document.querySelectorAll("[id^='divGraphArea']"); //' #divGraphArea *');
  var max = 1;
  if(graphs.length > 0){
    for(let i =0; i<graphs.length; i++){
    //for(let i in graphs){
      if(max < Number(graphs[i].id.replace("divGraphArea",""))){
        max = Number(graphs[i].id.replace("divGraphArea",""));
      }
    }
  }

  var sep = document.createElement("span");
  sep.innerText = " ";
  var tmpDivArea = document.getElementById("divGraphHikakuArea");
  //document.getElementById(areaId).appendChild(tmpDivArea);

  tmpCanvas = document.createElement("canvas");
  tmpCanvas.id = "canvasChart" + (max+1);
  document.getElementById(tmpDivArea.id).appendChild(tmpCanvas);

  return max+1;
}

function getSelectedTdfkNm(){
  var obj1 = document.getElementById('selTdfk');
  var idx1 = obj1.selectedIndex;
  var txt1  = obj1.options[idx1].text;
  return txt1;
}


function getSelectedFilePatternNm(){
  var obj1 = document.getElementById('selFilePattern');
  var idx1 = obj1.selectedIndex;
  var txt1  = obj1.options[idx1].text;
  return txt1;
}

function getSelectedCityNm(){
  var obj1 = document.getElementById('selCity');
  var idx1 = obj1.selectedIndex;
  var txt1  = obj1.options[idx1].text;
  return txt1;
}
//var table = new DataTable("table");

// function createCitySelectOption(datalist){
//   var select = document.getElementById("selCity");
//   while(select.lastChild){
//     select.removeChild(select.lastChild);
//   }
//   var option = document.createElement("option");
//   option.value = "0";
//   option.text = "（市区町村選択）";
//   select.appendChild(option);  
//   for(let i in datalist){
//     var option = document.createElement("option");
//     option.value = datalist[i].dantai_cd;
//     option.text = datalist[i].city_nm;
//     select.appendChild(option);
//   }
// }

// function dispLoading(){
//   var bg = document.getElementById('loader-bg');
//   var loader = document.getElementById('loader');
//   bg.classList.remove('is-hide');
//   loader.classList.remove('is-hide');
//   bg.classList.remove('fadeout-bg');
//   loader.classList.remove('fadeout-loader');
// }



// //dispLoading();

// /* 読み込み完了 */
// //window.addEventListener('load', UndispLoading);

// /* 10秒経ったら強制的にロード画面を非表示にする */
// //setTimeout('UndispLoading()',10000);

// /* ロード画面を非表示にする処理 */
// function UndispLoading(){
//   var bg = document.getElementById('loader-bg');
//   var loader = document.getElementById('loader');
//     bg.classList.add('fadeout-bg');
//     loader.classList.add('fadeout-loader');
//     bg.classList.add('is-hide');
//     loader.classList.add('is-hide');
// }









function formatCategory1(str){
  var ret = str;
  var ind = ret.indexOf("(");
  if(ind >= 0){
    ret = ret.substring(0,ind);
  }
  ret = ret.replace("十六　","16 ");
  ret = ret.replace("十五　","15 ");
  ret = ret.replace("十四　","14 ");
  ret = ret.replace("十三　","13 ");
  ret = ret.replace("十二　","12 ");
  ret = ret.replace("十一　","11 ");
  ret = ret.replace("十　","10 ");
  ret = ret.replace("九　","9 ");
  ret = ret.replace("八　","8 ");
  ret = ret.replace("七　","7 ");
  ret = ret.replace("六　","6 ");
  ret = ret.replace("五　","5 ");
  ret = ret.replace("四　","4 ");
  ret = ret.replace("三　","3 ");
  ret = ret.replace("二　","2 ");
  ret = ret.replace("一　","1 ");

  return ret;
}

function formatCategory2(str){
  if(str==null) return "";

  var ret = str;
  ret = ret.replace("十六　","16 ");
  ret = ret.replace("十五　","15 ");
  ret = ret.replace("十四　","14 ");
  ret = ret.replace("十三　","13 ");
  ret = ret.replace("十二　","12 ");
  ret = ret.replace("十一　","11 ");
  ret = ret.replace("十　","10 ");
  ret = ret.replace("九　","9 ");
  ret = ret.replace("八　","8 ");
  ret = ret.replace("七　","7 ");
  ret = ret.replace("六　","6 ");
  ret = ret.replace("五　","5 ");
  ret = ret.replace("四　","4 ");
  ret = ret.replace("三　","3 ");
  ret = ret.replace("二　","2 ");
  ret = ret.replace("一　","1 ");

  ret = ret.replace("公有財産(土地・建物)","土地・建物");

  return ret;
}



function formatCategory3(str){
  if(str==null) return "";

  var ret = str;
  var ind = ret.indexOf("(");
  if(ind < 0 ){
    ind = ret.indexOf("（");
  }

  if(ind >= 0){
    ret = ret.substring(0,ind);
  }

  return ret;
}



function formatCategory4(str){
  if(str==null) return "";

  var ret = str;
  if(!isNaN(ret)){
    ret  = "";
  }
  ret = ret.substring(0,12);
  return ret;
}


function formatCategory5(str){
  if(str==null) return "";
  var ret = str;
  if(!isNaN(ret)){
    ret  = "";
  }
  ret = ret.replace("土地（地積　㎡）","土地（㎡）");
  ret = ret.replace("建物（延面積　㎡）","建物（㎡）");
  return ret;
}




function formatCategory6(str, row){
  if(str==null) return "";
  var ret = str;
  if(!isNaN(ret)){
    ret  = "";
  }
  if(row.col_key5=="前年度末現在高"){
    ret = "";
  } else if(row.col_key5=="当年度中増減高"){
    ret = "";
  } else if(row.col_key5=="当年度末現在高"){
    ret = "";
  }
  ret = ret.replace("土地（地積　㎡）","土地（㎡）");
  ret = ret.replace("建物（延面積　㎡）","建物（㎡）");
  return ret;
}


function formatCategory7(str, row){
  if(str==null) return "";
  var ret = str;
  if(!isNaN(ret)){
    ret  = "";
  }
  if(row.col_key6=="前年度末現在高"){
    ret = "";
  } else if(row.col_key6=="当年度中増減高"){
    ret = "";
  } else if(row.col_key6=="当年度末現在高"){
    ret = "";
  }
  if(ret == ""){
    ret = row.tani;
  }
  return ret;
}



function formatCategoryValue(str){
  var ret = Number(str);
  if(!isNaN(ret)){
    ret = ret.toLocaleString();
  }
  return ret;
}



function createHeader(datalist){
  let trow = document.createElement('tr');
  let th = document.createElement('th');
  th.innerHTML = "#";
  trow.appendChild(th);
  th = document.createElement('th');
  th.innerHTML = "カテゴリ1";
  trow.appendChild(th);
  th = document.createElement('th');
  th.innerHTML = "カテゴリ2";
  trow.appendChild(th);
  th = document.createElement('th');
  th.innerHTML = "カテゴリ3";
  trow.appendChild(th);
  th = document.createElement('th');
  th.innerHTML = "カテゴリ4";
  trow.appendChild(th);
  th = document.createElement('th');
  th.innerHTML = "カテゴリ5";
  trow.appendChild(th);
  th = document.createElement('th');
  th.innerHTML = "カテゴリ6";
  trow.appendChild(th);

  var nendoArray = datalist.map(item => item["nendo"]);
  var nendoMax = Math.max.apply(null, nendoArray);
  var nendoMin = Math.min.apply(null, nendoArray);

  for(let i=nendoMin; i<= nendoMax; i++){
    th = document.createElement('th');
    th.innerHTML = i;
    trow.appendChild(th);
  }
  return trow;
}


function graphBarHanrei(datalist){
  var nendoArray = datalist.map(item => item["nendo"]);
  var nendoMax = Math.max.apply(null, nendoArray);
  var nendoMin = Math.min.apply(null, nendoArray);
  var arr=[];
  for(let i=nendoMin; i<= nendoMax; i++){
    arr.push(i);
  }
  return arr;

}


function graphBarValue(datalist){
  var valueArray = datalist.filter(value => value["col_index"] ==6).map(item => item["val_num"]);
  var arr=[];
  for(let i in valueArray){
    arr.push(i);
  }
  return arr;

}


//var objChart1 = null;
function createGraphTest(datalist, rowindex, canvasId, labelStr){
  document.getElementById("canvasChart" + canvasId).title = labelStr;
  const ctx = document.getElementById("canvasChart" + canvasId).getContext('2d');
  var objChart1 = new Chart(ctx, {
      type: 'line',
      data: {
          labels: graphBarHanrei(datalist),
          datasets: [{
              label: labelStr,
              data: datalist.filter(value => value["col_index"] ==rowindex).map(item => item["val_num"]), //[12, 19, 3, 5, 2, 3],tableから取得する
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins: {
              title: {
                  display: true,
                  align: "start",
                  text: labelStr
              }
          }
      }
  });
  return objChart1
}
