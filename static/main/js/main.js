/*
|| バニラで書いていく。
*/
//graphHikakuChart = null;
const BgColor_RadarChart =  ["rgba(2,35,199,.2)", "rgba(199,2,2,.2)", "rgba(42,199,2,.2)", "rgba(153,2,199,.2)", "rgba(199,120,2,.2)"];
const BdrColor_RadarChart = ["rgba(2,35,199,1)",  "rgba(199,2,2,1)",  "rgba(42,199,2,1)",  "rgba(153,2,199,1)",  "rgba(199,120,2,1)"];
var nanajikuRadarChart=null;

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

  /* スーパーリロードを実装。最終的にソースが固まったら外す。*/
  if(document.URL.indexOf("#")==-1){
    url = document.URL+"#";
    location = "#";
    window.location.href = window.location.href;
  }

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
    //getAndCreateTable_KeijoriekiSeichorituRankList();// # 経常利益成長率
    //getAndCreateTable_SihonSeichorituRankList();// # 資本成長率

    getAndCreateTable_DantaiListOfRadarChart(); //レーダーチャート右の団体リスト

    CreateRadarChart("");
    
    document.getElementById("btnMock1").addEventListener('click', (event) => {
      CreateRadarChart("a");
      //var dantaiCnt = nanajikuRadarChart.data.datasets.length;
      //getRadarChartData(nanajikuRadarChart, "a" + dantaiCnt);
    });
    
    document.getElementById("btnMock2").addEventListener('click', (event) => {
      var dantaiCnt = nanajikuRadarChart.data.datasets.length;
      //getRadarChartData(nanajikuRadarChart, "b" + dantaiCnt);
    });
    

  }catch(e){
    console.log(e.message);
  }
  return;
}

//レーダーチャート右の団体リスト
function getAndCreateTable_DantaiListOfRadarChart(){
  //枠内にローダーを表示
  createTableLoading("divCompareRight", "tableDivLoadingCompareRight", "団体リストを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  fetch('/getDantaiListOfRadarChart/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divCompareRight", "tableDivDantaiListOfRadarChart");
    var list = JSON.parse(jsonData.data);
    var hdText = ["団体名", "施設名"];
    var propId = ["dantai_nm", "sisetu_nm"];
    var align = ["left", "left"];
    createTableByJsonList(list, "divCompareRight", "tableDivDantaiListOfRadarChart", "登録団体リスト", hdText, propId, align, null, 1.5);
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

//収益性ランキングテーブルを作成
function getAndCreateTable_ShuekiRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainLeftTop", "tableDivLoading1", "経常収支比率による収益性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  fetch('/getShuekiRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainLeftTop", "tableDivShueki");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"経常収支比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"keijo_shusi_hiritu"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainLeftTop", "tableDivShueki", "経常収支比率による収益性ランキング", hdText, propId, align, null, 3);
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
  fetch('/getReturnOnEquityRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainCenterBottom", "tableDivRoe");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"自己資本利益率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"roe"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainCenterBottom", "tableDivRoe", "自己資本利益率(ROE)による収益性ランキング", hdText, propId, align, null, 3);
    //ローダーを削除
    destroyTableLoading("divMainCenterBottom", "tableDivLoading8");
    return;
  })
  .catch(error => { console.log(error); });
}



//ROAランキングテーブルを作成
function getAndCreateTable_ReturnOnAssetRankList(){
  //枠内にローダーを表示
  createTableLoading("divMainRightBottom", "tableDivLoading9", "自己資本利益率(ROA)による収益性ランクを作成中...");
  val = "2020"; // 会計年度、見直し必要。
  fetch('/getReturnOnAssetRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainRightBottom", "tableDivRoa");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"総資産利益率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"roa"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainRightBottom", "tableDivRoa", "自己資本利益率(ROA)による収益性ランキング", hdText, propId, align, null, 3);
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
  fetch('/getSihonHirituRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainLeftBottom2", "tableDivSihonHiritu");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"資本比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"sihon_hiritu"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainLeftBottom2", "tableDivSihonHiritu", "資本比率による収益性ランキング", hdText, propId, align, null, 3);
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
  fetch('/getKoteiHirituRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainCenterBottom2", "tableDivKoteiHiritu");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"固定比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"kotei_hiritu"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainCenterBottom2", "tableDivKoteiHiritu", "固定比率による収益性ランキング", hdText, propId, align, null, 3);
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
  fetch('/getJugyoinHitoriRiekiRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainRightBottom2", "tableDivHitoriRieki");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"職員1人あたり利益(千円)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"hitori_rieki"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainRightBottom2", "tableDivHitoriRieki", "職員1人あたり利益による生産性ランキング", hdText, propId, align, null, 3);
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
  fetch('/getKeijoriekiSeichorituRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainLeftBottom3", "tableDivKeijoSeicho");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"成長率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"seicho_ritu"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainLeftBottom3", "tableDivKeijoSeicho", "経常利益成長率による成長性ランキング", hdText, propId, align, null, 3);
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
  fetch('/getSihonSeichorituRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainCenterBottom3", "tableDivSihonSeicho");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"成長率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"seicho_ritu"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainCenterBottom3", "tableDivSihonSeicho", "資本成長率による成長性ランキング", hdText, propId, align, null, 3);
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

  
  let divToastBody = document.createElement('div');
  divToastBody.classList.add("toast-body");
  divToastBody.innerText = (selectData.dantai_nm + " " + selectData.sisetu_nm).substring(0,16);

  let divToastWrap = document.createElement('div');
  divToastWrap.classList.add("d-flex");
  divToastWrap.style.alignItems = "center";
  divToastWrap.style.marginLeft = "10px";

  let btn = document.createElement('button');
  setAttributes(btn,"type,button/data-bs-dismiss,toast/aria-label,Close");
  // btn.setAttribute("type","button");
  // btn.setAttribute("data-bs-dismiss","toast");
  // btn.setAttribute("aria-label","Close");
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
function createTableHeader(hdText){
  let trow = document.createElement('tr');
  for (let hd in hdText){
    var thA = document.createElement('th');
    thA.innerHTML = hdText[hd];
    thA.style.textAlign = "center";
    thA.style.verticalAlign = "middle";
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
function createTableByJsonList(datalist, locationId, tableDivId, caption, hdText, propId, align, width, height){
  let table = document.createElement("table");
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let trow = document.createElement('tr');

  //見出し行作成
  thead.appendChild(createTableHeader(hdText));
  
  for(let i in datalist){
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
      }else{
        tdataA.innerHTML = datalist[i][propId[id]];
        //divMain から始まる場合のみ。つまりはダイジェストタブで利用される場合のみ。
        if(locationId.substring(0,7) == "divMain" && (propId[id]=="dantai_nm" || propId[id]=="sisetu_nm")){
          tdataA.title = datalist[i].gyomu_cd + "-" + datalist[i].gyoshu_cd + "-" + datalist[i].jigyo_cd + "-" +  datalist[i].dantai_cd + "-" +  datalist[i].sisetu_cd;
            tdataA.addEventListener('click', (event) => {
              var key = event.target.title;
              moveProfileTab(key);
              createToasts(datalist[i]);
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
        getRadarChartData(nanajikuRadarChart, datalist[i]);
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

// function clickCompareRight(data){
//   //alert();
//   var nendo = 2020;
//   fetch('/aaaaa/' + nendo + '/' + data.dantai_cd + '/' + data.sisetu_cd, {
//     method: 'GET',
//     'Content-Type': 'application/json'
//   })
//   .then(res => res.json())
//   .then(jsonData => {
//     var list = JSON.parse(jsonData.data);
//     console.log(list)
//     // createTableDiv("v-pills-" + hyo_num, "tableDivHyo");
//     // var list = JSON.parse(jsonData.data);
//     // var hdText = ["行", "列", "項目名",　"2015",　"2016",　"2017",　"2018",　"2019",　"2020",　"2021",　"2022",　"2023",　"2024"];
//     // var propId = ["gyo_num", "retu_num", "name1", "val_a",　"val_b", "val_c",　"val_d",　"val_e", "val_f",　"val_g",　"val_h", "val_i",　"val_j"];
//     // var align = ["center", "center", "left",　"right",　"right",　"right",　"right",　"right",　"right",　"right",　"right",　"right",　"right"];
//     // var width = ["", "", "40%",　"6%",　"6%",　"6%",　"6%",　"6%",　"6%",　"6%",　"6%",　"6%",　"6%"];
//     // createTableByJsonList(list, "v-pills-" + hyo_num, "tableDivHyo", "", hdText, propId, align, width, 2.75);

//     // destroyTableLoading("v-pills-" + hyo_num, "tableDivHyoLoading");
//   })
//   .catch(error => { console.log(error); });
// }

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

function createHyoVerticalNavbar(key){
    val = "2020"; // 会計年度、見直し必要。
    fetch('/getHyoListForProfile/' + val + '/20/30/40/50/60', {
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
      // divTabGroup.classList.add();
      // divTabGroup.classList.add();
      // divTabGroup.classList.add();
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
        tabButtonA.setAttribute("data-bs-toggle","pill");
        tabButtonA.setAttribute("data-bs-target","#v-pills-" + list[i].hyo_num);
        tabButtonA.setAttribute("type","button");
        tabButtonA.setAttribute("role","tab");
        tabButtonA.setAttribute("aria-controls","v-pills-" + list[i].hyo_num);
        tabButtonA.setAttribute("aria-selected","true");
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
        divContent.innerText = "aaaaaaaaaaaaaaaaaaaaaaaaa";
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
    createTableByJsonList(list, "v-pills-" + hyo_num, "tableDivHyo", "", hdText, propId, align, width, 2.75);

    destroyTableLoading("v-pills-" + hyo_num, "tableDivHyoLoading");
  })
  .catch(error => { console.log(error); });

}


document.getElementById('btnFileImport').addEventListener('click', function() {
  var files = document.querySelector('#inputGroupFile').files
  let formData = new FormData();
  formData.append('excelFile', files[0]);

  fetch('/binaryTest', {
    method: 'PUT',
    body: formData,
  })
  .then(res => res.json())
  .then(jsonData => {
    document.querySelector('#lblFileProperty').innerHTML = "取り込み完了！"; //jsonData.data;
    document.getElementById('btnFileImport').classList.remove("disabled");
  })
  .catch(error => { console.log(error); });
  document.getElementById('btnFileImport').classList.add("disabled");
});


//安全性ランキングテーブルを作成
function getAndCreateTable_AnzenRankList(){
  
  //枠内にローダーを表示
  createTableLoading("divMainCenterTop", "tableDivLoading", "流動比率による安全性ランクを作成中...");

  val = "2020"; // 会計年度、見直し必要。
  fetch('/getAnzenRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainCenterTop", "tableDivAnzen");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"流動比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"ryudo_hiritu"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainCenterTop", "tableDivAnzen", "流動比率による安全性ランキング", hdText, propId, align, null, 3);

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
  fetch('/getRuisekiKessonRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainRightTop", "tableDivRuisekiKesson");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"累積欠損比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"ruiseki_kesson_hiritu"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainRightTop", "tableDivRuisekiKesson", "累積欠損比率による健全性ランキング", hdText, propId, align, null, 3);
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
  fetch('/getKigyosaiKyusuiRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainLeftMiddle", "tableDivKigyosaiKyusuiRankList");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"企業債残高対給水収益比率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"kigyosai_shueki_hiritu"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainLeftMiddle", "tableDivKigyosaiKyusuiRankList", "企業債残高対給水収益比率による健全性ランキング", hdText, propId, align, null, 3);
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
  fetch('/getKoteiShokyakurituRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainCenterMiddle", "tableDivKoteiShokyakurituRankList");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"有形固定資産償却率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"shokyaku_hiritu"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainCenterMiddle", "tableDivKoteiShokyakurituRankList", "有形固定資産償却率による健全性ランキング", hdText, propId, align, null, 3);
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
  fetch('/getByoshoRiyorituRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainRightMiddle", "tableDivByoshoRiyorituRankList");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"病床利用率(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"riyoritu"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainRightMiddle", "tableDivByoshoRiyorituRankList", "病床利用率による効率性ランキング", hdText, propId, align, null, 3);
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
  fetch('/getNyuinHitoriShuekiRankList/' + val, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    createTableDiv("divMainLeftBottom", "tableDivNyuinHitoriShuekiRankList");
    var list = JSON.parse(jsonData.data);
    var hdText = ["ランク", "団体名", "施設名",　"入院患者1人1日あたり収益(%)"];
    var propId = ["rank", "dantai_nm", "sisetu_nm",　"hitori_ichinichi_shueki"];
    var align = ["center", "left", "left",　"right"];
    createTableByJsonList(list, "divMainLeftBottom", "tableDivNyuinHitoriShuekiRankList", "入院患者1人1日あたり収益による収益性ランキング", hdText, propId, align, null, 3);
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
    var dummy = "左の表から企業名を選択してください。"
    var selectVendor = "aaaaa"; //(selectRowData == undefined ? dummy : selectRowData.vendor_nm);
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
        }, //nanajikuRadarChart.config.options.scales.r.pointLabels.font.size = 20;
        options: {
          animation:{
            duration:200,
            easing:""
          },
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 16
                        }
                    }
                }
            },
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
        }
    };
    //const ctx = document.getElementById("myChart").getContext('2d');
    //nanajikuRadarChart = new Chart(ctx, chartData);
    var datalist = { dantai_cd:"dummy", sisetu_cd:"dummy", val:0, dantai_nm:"", sisetu_nm:"" };
    getRadarChartData(chartData, datalist);
}


function getRadarChartData(chartData, datalist){
    var idx = chartData.data.datasets.length;
    if(idx==0){
        //var ctx = $("#myChart").get(0).getContext("2d");
        if(nanajikuRadarChart!=null){
            nanajikuRadarChart.destroy();// = new Chart(ctx, null);
        }
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
        // for(let i in list){
        //   var rate = list[i].val;
        //   if(rate < 0){
        //     rate = 0
        //   }
        //   if(rate > 100){
        //     rate = 100
        //   }
        //   chartData.data.datasets[idx].data.push(rate);
        // }
          // $.each(list, function(i, item) {
          //     chartData.data.datasets[idx].data.push(item.shubetu1_avg);
          //     chartData.data.datasets[idx].data.push(item.shubetu2_avg);
          //     chartData.data.datasets[idx].data.push(item.shubetu3_avg);
          //     chartData.data.datasets[idx].data.push(item.shubetu4_avg);
          //     chartData.data.datasets[idx].data.push(item.shubetu5_avg);
          //     chartData.data.datasets[idx].data.push(item.shubetu6_avg);
          //     chartData.data.datasets[idx].data.push(item.shubetu7_avg);
          // });
      }

      const ctx = document.getElementById("myChart").getContext('2d');
      if(idx==0){
        nanajikuRadarChart = new Chart(ctx, chartData);
      }else{
        nanajikuRadarChart.update();
      }
  
  
  
    })
    .catch(error => { console.log(error); });

    //list = JSON.parse(json.data);
    // if(idx==0){
    //     if(list.length>0){
    //         //比較選択に使うプルダウンを作る
    //         $.getJSON("/getVendorNmList", function(json) {
    //             list = JSON.parse(json.data);
    //             $('#selVendorNmHikaku .dropdown-menu').empty();
    //             $.each(list, function(i, item) {
    //                 $('#selVendorNmHikaku .dropdown-menu').append('<li><a onclick=funcRadarHikaku("' + item.vendor_nm + '");>' + item.vendor_nm);
    //             });
    //             $('#selVendorNmHikaku .btn').removeAttr("disabled");
    //         });
    //     } else {
    //         $('#selVendorNmHikaku .btn').attr("disabled","disabled");
    //     }
    // }
    // var ctx = $("#myChart").get(0).getContext("2d");



    
}


// function funcRadarHikaku(vendornm){
//     if(nanajikuRadarChart.data.datasets.length > 4){
//         alert("これ以上比較対象を追加できません。");
//         return false;
//     }
//     var add = true;
//     $.each(nanajikuRadarChart.data.datasets, function(i, item) {
//         if(item.label==vendornm){
//             add = false;
//         }
//     });
    
//     if(add){
//         getRadarChartData(nanajikuRadarChart, "abcde");
//     }
// }







// ここからは過去資料












































document.getElementById('btnExecuteImport').addEventListener('click', function() {
  document.getElementById('btnExecuteCollect').classList.add("disabled");
  document.getElementById('btnExecuteImport').classList.add("disabled");
  var tablerows = document.getElementById("tableFileCollect").rows;
  for(let i=1; i<tablerows.length; i++){
    var chk = tablerows[Number(i)].cells[0].querySelector("input[type='checkbox']");
    if(chk!=null){
      if(chk.checked){
        // var query_params = new URLSearchParams({
        //   documentName:tablerows[Number(i)].cells[1].innerText,
        //   chosaJiten:tablerows[Number(i)].cells[2].innerText,
        //   dantaiCd:tablerows[Number(i)].cells[3].innerText,
        //   dantaiNm:tablerows[Number(i)].cells[4].innerText,
        //   url: tablerows[Number(i)].cells[5].innerText.split("/").join("|")    // encodeURIComponent(tablerows[Number(i)].cells[5].innerText)
        // }); 
        var query_params = 
          tablerows[Number(i)].cells[1].innerText + "/" + 
          tablerows[Number(i)].cells[2].innerText + "/" + 
          tablerows[Number(i)].cells[3].innerText + "/" + 
          tablerows[Number(i)].cells[4].innerText + "/" + 
          tablerows[Number(i)].cells[5].innerText.split("/").join("|");
        fetch('/executeFileGetAndInsert/' + query_params)
        .then(res => res.json())
        .then(jsonData => {
          updateJotaiResult(jsonData.data);
          //CreateFileCollectTable(jsonData.data);
        })
        .catch(error => { 
          console.log(error); 
        });
        //break;
        
        tablerows[Number(i)].cells[6].classList.add("loading-ss");
        tablerows[Number(i)].cells[6].innerText = "";
      }
    }
  }
  document.getElementById('btnExecuteCollect').classList.remove("disabled");
  document.getElementById('btnExecuteImport').classList.remove("disabled");
});

// function executeFileGetAndInsert(rowIndex){
//   var i = rowindex;
//   var tablerows = document.getElementById("tableFileCollect").rows;
//   var chk = tablerows[Number(i)].cells[0].querySelector("input[type='checkbox']");
//   if(chk!=null){
//     if(chk.checked){
//       var query_params = new URLSearchParams({
//         documentName:tablerows[Number(i)].cells[1].innerText,
//         chosaJiten:tablerows[Number(i)].cells[2].innerText,
//         dantaiCd:tablerows[Number(i)].cells[3].innerText,
//         dantaiNm:tablerows[Number(i)].cells[4].innerText,
//         url:tablerows[Number(i)].cells[5].innerText    // encodeURIComponent(tablerows[Number(i)].cells[5].innerText)
//       }); 
//       fetch('/executeFileGetAndInsert?' + query_params)
//       .then(res => res.json())
//       .then(jsonData => {
//         updateJotaiResult(jsonData.data);
//         executeFileGetAndInsert(rowIndex++);
//       })
//       .catch(error => { 
//         console.log(error); 
//       });
//     }
//   }
// }

// document.getElementById('btnExecuteImport').addEventListener('click', function() {
//   executeFileGetAndInsert(1);
// });


function updateJotaiResult(resultJson){
  var tablerows = document.getElementById("tableFileCollect").rows;
    for(let i=0; i<tablerows.length; i++){
      if (tablerows[i].cells[1].innerText == resultJson.documentName &&
        tablerows[i].cells[2].innerText == resultJson.chosaJiten &&
        tablerows[i].cells[3].innerText == resultJson.dantaiCd){
          tablerows[i].cells[6].innerText = resultJson.result;
          tablerows[i].cells[6].classList.remove("loading-ss");
          //var chk = tablerows[Number(i)].cells[0].querySelector("input[type='checkbox']");
          tablerows[Number(i)].cells[0].innerHTML = "";
        }
    }

}

document.getElementById('btnExecuteCollect').addEventListener('click', function() {
  document.getElementById('btnExecuteCollect').classList.add("disabled");
  var filePattern = getSelectedFilePatternNm();
  fetch('/executeFileCollect/' + filePattern, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    AllClearTable("tableFileCollectDiv");
    CreateFileCollectTable(jsonData.data);
    document.getElementById('btnExecuteCollect').classList.remove("disabled");
    document.getElementById('btnExecuteImport').classList.remove("disabled");
})
  .catch(error => { 
    console.log(error); 
  });
  
  //document.getElementById('btnFileImport').classList.add("disabled");
});




// document.getElementById("selTdfk").addEventListener("change", function(){
//   //AllClearGraphs();
//   AllClearTable();
//   val = document.getElementById("selTdfk").value;
//   fetch('/getCityListByTdfkCd/' + val, {
//     method: 'GET',
//     'Content-Type': 'application/json'
//   })
//   .then(res => res.json())
//   .then(jsonData => {
//     var list = JSON.parse(jsonData.data);
//     createCitySelectOption(list);
//     UndispLoading();
//     return;
//     //document.querySelector('#lblFileProperty').innerHTML = "取り込み完了！"; //jsonData.data;
//     //document.getElementById('btnFileImport').classList.remove("disabled");
//   })




function CreateFileCollectTable(datalist){
  var tableDiv = document.getElementById("tableFileCollectDiv");
  while(tableDiv.lastChild){
    tableDiv.removeChild(tableDiv.lastChild);
  }

  let table = document.createElement("table");
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');


  var trow = document.createElement('tr');

  let tdataA = document.createElement('th');
  var chk = document.createElement("input");
  chk.type="checkbox";
  //chk.id = "chkCollectAll";
  
  chk.addEventListener("change", function(){
    chk.checked = !chk.checked;
    chkOnAllRow(chk.checked);
  });
  tdataA.appendChild(chk);
  let tdataB = document.createElement('th');
  tdataB.innerText = "資料の種類";
  let tdataC = document.createElement('th');
  tdataC.innerText = "調査時点";
  let tdataD = document.createElement('th');
  tdataD.innerText = "団体コード";
  let tdataE = document.createElement('th');
  tdataE.innerText = "団体名";
  let tdataF = document.createElement('th');
  tdataF.innerText = "ファイルURL";
  let tdataG = document.createElement('th');
  tdataG.innerText = "状態";
  trow.appendChild(tdataA);
  trow.appendChild(tdataB);
  trow.appendChild(tdataC);
  trow.appendChild(tdataD);
  trow.appendChild(tdataE);
  trow.appendChild(tdataF);
  trow.appendChild(tdataG);
  thead.appendChild(trow);


  for(let i in datalist){
    var trow = document.createElement('tr');

    let tdataA = document.createElement('td');

    let tdataB = document.createElement('td');
    tdataB.innerText = datalist[i].document;
    let tdataC = document.createElement('td');
    tdataC.innerText = datalist[i].year;
    let tdataD = document.createElement('td');
    tdataD.innerText = datalist[i].dantai;
    let tdataE = document.createElement('td');
    tdataE.innerText = datalist[i].text;
    let tdataF = document.createElement('td');
    tdataF.innerText = datalist[i].url;
    let tdataG = document.createElement('td');
    tdataG.innerText = datalist[i].jotai;

    if(datalist[i].jotai == "未取込"){
      var chk = document.createElement("input");
      chk.type="checkbox";
      tdataA.appendChild(chk);
    }

    trow.appendChild(tdataA);
    trow.appendChild(tdataB);
    trow.appendChild(tdataC);
    trow.appendChild(tdataD);
    trow.appendChild(tdataE);
    trow.appendChild(tdataF);
    trow.appendChild(tdataG);
    tbody.appendChild(trow);
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  table.classList.add("table");
  table.classList.add("table-bordered");
  table.classList.add("table_sticky");
  table.classList.add("table-hover");
  table.classList.add("fs-7"); //text-end
  table.id = "tableFileCollect";
  document.getElementById('tableFileCollectDiv').appendChild(table);
  //table = new DataTable(mainTable);
  
}



function chkOnAllRow(isChecked){
  var tablerows = document.getElementById("tableFileCollect").rows;
  for(let i=0; i<tablerows.length; i++){
    var chk = tablerows[Number(i)].cells[0].querySelector("input[type='checkbox']");
    if(chk!=null){
      chk.checked = isChecked;
    }
  }
}

//ファイル取り込みモーダルを起動
//ファイルインプットタグを初期化
//
document.getElementById('modalExcelUpload').addEventListener('show.bs.modal', function () {
  document.getElementById('inputGroupFile').value="";
  document.getElementById("lblFileProperty").innerHTML = "";
  document.getElementById('btnFileImport').classList.add("disabled");
  document.getElementById('btnExecuteImport').classList.add("disabled");
  AllClearTable("tableFileCollectDiv");
  document.getElementById('selFilePattern').selectedIndex = 0;
  document.getElementById('btnExecuteCollect').classList.add("disabled");
});



document.getElementById("inputGroupFile").addEventListener("change", function(){
  let nBytes = 0,
      oFiles = this.files,
      nFiles = oFiles.length;

  for (let nFileId = 0; nFileId < nFiles; nFileId++) {
    nBytes += oFiles[nFileId].size;
  }
  let sOutput = nBytes + " bytes";
  // 倍数近似のための任意のコード
  const aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  for (nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
    sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
  }
  // 任意コードの末尾
  if(nFiles==1){
    document.getElementById("lblFileProperty").innerHTML = sOutput;
    document.getElementById('btnFileImport').classList.remove("disabled");
  }
}, false);


// document.getElementById("selTdfk").addEventListener("change", function(){
//   //AllClearGraphs();
//   AllClearTable("mainTableDiv");
//   val = document.getElementById("selTdfk").value;
//   document.getElementById("selTdfkSub").value = val;
//   fetch('/getCityListByTdfkCd/' + val, {
//     method: 'GET',
//     'Content-Type': 'application/json'
//   })
//   .then(res => res.json())
//   .then(jsonData => {
//     var list = JSON.parse(jsonData.data);
//     createCitySelectOption(list);
//     UndispLoading();
//     return;
//   })
//   .catch(error => { console.log(error); });
//     dispLoading();
// });


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




document.getElementById("selFilePattern").addEventListener("change", function(){
  if(document.getElementById("selFilePattern").value==0){
    document.getElementById('btnExecuteCollect').classList.add("disabled");
  }else{
    document.getElementById('btnExecuteCollect').classList.remove("disabled");
  }
});


var datalist = null;

// document.getElementById("selCity").addEventListener("change", function(){
//   //AllClearGraphs();
//   AllClearTable("mainTableDiv");
//   val = document.getElementById("selCity").value;
//   fetch('/getFullRecordByDantaiCd/' + val, {
//     method: 'GET',
//     'Content-Type': 'application/json'
//   })
//   .then(res => res.json())
//   .then(jsonData => {
//     var list = JSON.parse(jsonData.data);
//     datalist = list;
//     createTable(list);
//     UndispLoading();
//     return;
//     //document.querySelector('#lblFileProperty').innerHTML = "取り込み完了！"; //jsonData.data;
//     //document.getElementById('btnFileImport').classList.remove("disabled");
//   })
//   .catch(error => { console.log(error); });
//   dispLoading();
// });

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
    //UndispLoading();
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
  tmpDivArea.classList.add("col-4");
  
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

function createCitySelectOption(datalist){
  var select = document.getElementById("selCity");
  while(select.lastChild){
    select.removeChild(select.lastChild);
  }
  var option = document.createElement("option");
  option.value = "0";
  option.text = "（市区町村選択）";
  select.appendChild(option);  
  for(let i in datalist){
    var option = document.createElement("option");
    option.value = datalist[i].dantai_cd;
    option.text = datalist[i].city_nm;
    select.appendChild(option);
  }
}


// 都道府県プルダウンの作成
// べた書きでいくよ
// selTdfk
function createTdfkSelectOption(){
  var vSelTdfk = document.getElementById("selTdfk"); //selTdfkSub
  for(let i=1; i<=47; i++){
    
    if(i==2 || i==8 || i==16 || i==19 || i==25 || i==31 || i==36 || i==40){ //東北
      var separator = document.createElement("option");
      separator.value =  (i==2 ? '91' : (i==8 ? '92' : (i==16 ? '93' : (i==19 ? '94' : (i==25 ? '95' : (i==31 ? '96' : (i==36 ? '97' : (i==40 ? '97' : '')))))))); //"91";
      separator.text = (i==2 ? '─── 東北地方 ───' : (i==8 ? '─── 関東地方 ───' : (i==16 ? '─── 北陸地方 ───' : (i==19 ? '─── 中部地方 ───' : (i==25 ? '─── 関西地方 ───' : (i==31 ? '─── 中国地方 ───' : (i==36 ? '─── 四国地方 ───' : (i==40 ? '─── 九州地方 ───' : '')))))))); //"91";
      separator.setAttribute("disabled","disabled");
      vSelTdfk.appendChild(separator);
    }

    var option = document.createElement("option");
    var val = ( '0' + i).slice(-2);
    option.value = val;
    option.text = c_tdfk[val];
    vSelTdfk.appendChild(option);
  }
  var vSelTdfkSub = document.getElementById("selTdfkSub"); //
  const options = document.getElementById('selTdfk').options
  Array.from(options).forEach(function(option) {
    var opt = document.createElement("option");
    opt.value = option.value;
    opt.text = option.text
    vSelTdfkSub.appendChild(opt);
  });

}

const c_tdfk = {
  "01" : "北海道"   ,"02" : "青森県"   ,"03" : "岩手県"   ,"04" : "宮城県"   ,"05" : "秋田県"   ,"06" : "山形県"   ,"07" : "福島県"   ,"08" : "茨城県"   ,
  "09" : "栃木県"   ,"10" : "群馬県"   ,"11" : "埼玉県"   ,"12" : "千葉県"   ,"13" : "東京都"   ,"14" : "神奈川県" ,"15" : "新潟県"   ,"16" : "富山県"   ,
  "17" : "石川県"   ,"18" : "福井県"   ,"19" : "山梨県"   ,"20" : "長野県"   ,"21" : "岐阜県"   ,"22" : "静岡県"   ,"23" : "愛知県"   ,"24" : "三重県"   ,
  "25" : "滋賀県"   ,"26" : "京都府"   ,"27" : "大阪府"   ,"28" : "兵庫県"   ,"29" : "奈良県"   ,"30" : "和歌山県" ,"31" : "鳥取県"   ,"32" : "島根県"   ,
  "33" : "岡山県"   ,"34" : "広島県"   ,"35" : "山口県"   ,"36" : "徳島県"   ,"37" : "香川県"   ,"38" : "愛媛県"   ,"39" : "高知県"   ,"40" : "福岡県"   ,
  "41" : "佐賀県"   ,"42" : "長崎県"   ,"43" : "熊本県"   ,"44" : "大分県"   ,"45" : "宮崎県"   ,"46" : "鹿児島県" ,"47" : "沖縄県"
};


function createFilePatternSelectOption(){
  var select = document.getElementById("selFilePattern");
  for(let i=1; i<=Object.keys(c_filePattern).length; i++){
    var option = document.createElement("option");
    option.value = i;
    option.text = c_filePattern[i];
    select.appendChild(option);
  }
}
const c_filePattern = {
  1:"財政状況資料_都道府県", 2:"ファイル２"
}





function dispLoading(){
  var bg = document.getElementById('loader-bg');
  var loader = document.getElementById('loader');
  bg.classList.remove('is-hide');
  loader.classList.remove('is-hide');
  bg.classList.remove('fadeout-bg');
  loader.classList.remove('fadeout-loader');
}



//dispLoading();

/* 読み込み完了 */
//window.addEventListener('load', UndispLoading);

/* 10秒経ったら強制的にロード画面を非表示にする */
//setTimeout('UndispLoading()',10000);

/* ロード画面を非表示にする処理 */
function UndispLoading(){
  var bg = document.getElementById('loader-bg');
  var loader = document.getElementById('loader');
    bg.classList.add('fadeout-bg');
    loader.classList.add('fadeout-loader');
    bg.classList.add('is-hide');
    loader.classList.add('is-hide');
}









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
