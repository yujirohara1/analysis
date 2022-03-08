/* 
 ポップオーバーで表示する各指標の説明ＵＩを作ります。
 htmlを返す必要がありますが、べた書きせず、domからouterHTMLを返すよう実装していく。
*/

function getDescribeHtml(indexName){
  var ret = document.createElement("div");
  if(indexName=="経常収支比率"){
    ret = getKeijoShushiSetumeiDOM();
  }else if(indexName=="流動比率"){
    ret = getRyudoHirituSetumeiDOM();
  }else if(indexName=="累積欠損比率"){
    ret = getRuisekiKessonHiritu();
  }else if(indexName=="企業債残高対給水収益比率"){
    ret = getKigyosaiZandakaKyusuiShuekiHiritu();
  }
  

  return ret.outerHTML;
}

/*
 累積欠損比率　説明文
*/
function getKigyosaiZandakaKyusuiShuekiHiritu(){

  var popContent = document.createElement("div");
  var popTitle = document.createElement("div");
  popTitle.innerText = "（企業債現在高合計　÷　給水収益）　×　100";
  popTitle.setAttribute("role","alert");
  popTitle.classList.add("alert");
  popTitle.classList.add("alert-primary");
  popTitle.classList.add("alert-index");
  popContent.appendChild(popTitle)

  popContent.appendChild(createDivText("収益１単位に、借入がどの程度あるかを表します。"));
  popContent.appendChild(document.createElement("br"));
  popContent.appendChild(createDivText("明確な良否の基準値はないものの、過去の決算値や類似団体と比較して"));
  popContent.appendChild(createDivText("適正な水準を見定めていく必要があります。"));
  popContent.appendChild(createDivText("一見するとゼロに近づくほど良いと思われますが、住民サービスにより"));
  popContent.appendChild(createDivText("得た収益を、適切に設備更新に回せているかどうかを見定める必要があります。"));

  return popContent;
}



/*
 累積欠損比率　説明文
*/
function getRuisekiKessonHiritu(){

  var popContent = document.createElement("div");
  var popTitle = document.createElement("div");
  popTitle.innerText = "（当年度未処理欠損金　÷　（営業収益　－　受託工事収益））　×　100";
  popTitle.setAttribute("role","alert");
  popTitle.classList.add("alert");
  popTitle.classList.add("alert-primary");
  popTitle.classList.add("alert-index");
  popContent.appendChild(popTitle)

  popContent.appendChild(createDivText("累積欠損比率は、補填できなかった赤字の累積です。0%であることが求められます。"));
  popContent.appendChild(document.createElement("br"));
  popContent.appendChild(createDivText("過去年度に発生した赤字決算が経年に影響するため、単年度の収支（経常収支比率）"));
  popContent.appendChild(createDivText("と合わせて、両面から分析する必要があります。"));

  return popContent;
}


/*
 経常収支比率　説明文
*/
function getKeijoShushiSetumeiDOM(){

  var popContent = document.createElement("div");
  var popTitle = document.createElement("div");
  popTitle.innerText = "（経常収益　÷　経常費用）　×　100";
  popTitle.setAttribute("role","alert");
  popTitle.classList.add("alert");
  popTitle.classList.add("alert-primary");
  popTitle.classList.add("alert-index");
  popContent.appendChild(popTitle)

  popContent.appendChild(createDivText("経常収支比率は、100% であれば、単年度収支が黒字であることを意味し、健全な状態であると言えます。"));
  popContent.appendChild(createDivText("この指標では営業外収益を加味しているため、繰入金（営業外収入）や利息（営業外支出）を"));
  popContent.appendChild(createDivText("除外した本業による収支比率も合わせて分析する必要があります。"));
  popContent.appendChild(document.createElement("br"));
  popContent.appendChild(createDivText("本業とは、病院であれば医業収益、水道であれば給水収益等を指します。"));

  return popContent;
}


/*
 流動比率　説明文
*/
function getRyudoHirituSetumeiDOM(){

  var popContent = document.createElement("div");
  var popTitle = document.createElement("div");
  popTitle.innerText = "（流動資産　÷　流動負債）　×　100";
  popTitle.setAttribute("role","alert");
  popTitle.classList.add("alert");
  popTitle.classList.add("alert-primary");
  popTitle.classList.add("alert-index");
  popContent.appendChild(popTitle)

  popContent.appendChild(createDivText("流動比率は、短期的な支払能力を表す指標です。"));
  popContent.appendChild(createDivText("民間企業では200%以上であれば優、120%以上であれば可 のように判断されます。"));
  popContent.appendChild(document.createElement("br"));
  
  popContent.appendChild(createDivText("100%に満たない場合、手元の運転資金が足りていないことを意味しており、"));
  popContent.appendChild(createDivText("債権の早期回収や固定資産売却による現金化、また短期借入金を長期借入金に"));
  popContent.appendChild(createDivText("借り換えるといった対応が必要です。"));

  return popContent;
}


function createDivText(txt){
  var div = document.createElement("div");
  div.innerText = txt;
  return div;
  
}