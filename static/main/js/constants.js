
const BgColor_RadarChart =  ["rgba(2,35,199,.2)", "rgba(199,2,2,.2)", "rgba(42,199,2,.2)", "rgba(153,2,199,.2)", "rgba(199,120,2,.2)"];
const BdrColor_RadarChart = ["rgba(2,35,199,1)",  "rgba(199,2,2,1)",  "rgba(42,199,2,1)",  "rgba(153,2,199,1)",  "rgba(199,120,2,1)"];
const BgColor_ScatterChart =  ["rgba(2,35,199,.2)", "rgba(199,2,2,.2)", "rgba(42,199,2,.2)", "rgba(153,2,199,.2)", "rgba(199,120,2,.2)", "rgba(255,255,10,.2)", "rgba(255,122,255,.2)", "rgba(0,161,233,.2)"];
const BdrColor_ScatterChart = ["rgba(2,35,199,1)",  "rgba(199,2,2,1)",  "rgba(42,199,2,1)",  "rgba(153,2,199,1)",  "rgba(199,120,2,1)", "rgba(204,204,0,1)", "rgba(255,71,255,1)", "rgba(0,161,233,1)"];
//R:255 G:71 B:255

// 01      北海道      0 北海道地方
// 02      青森県      1 東北地方
// 03      岩手県      1 東北地方
// 04      宮城県      1 東北地方
// 05      秋田県      1 東北地方
// 06      山形県      1 東北地方
// 07      福島県      1 東北地方
// 08      茨城県      2 関東地方
// 09      栃木県      2 関東地方
// 10      群馬県      2 関東地方
// 11      埼玉県      2 関東地方
// 12      千葉県      2 関東地方
// 13      東京都      2 関東地方
// 14      神奈川県    2 関東地方
// 15      新潟県      3 中部地方
// 16      富山県      3 中部地方
// 17      石川県      3 中部地方
// 18      福井県      3 中部地方
// 19      山梨県      3 中部地方
// 20      長野県      3 中部地方
// 21      岐阜県      3 中部地方
// 22      静岡県      3 中部地方
// 23      愛知県      3 中部地方
// 24      三重県      4 近畿地方
// 25      滋賀県      4 近畿地方
// 26      京都府      4 近畿地方
// 27      大阪府      4 近畿地方
// 28      兵庫県      4 近畿地方
// 29      奈良県      4 近畿地方
// 30      和歌山県    4 近畿地方
// 31      鳥取県      5 中国地方
// 32      島根県      5 中国地方
// 33      岡山県      5 中国地方
// 34      広島県      5 中国地方
// 35      山口県      5 中国地方
// 36      徳島県      6 四国地方
// 37      香川県      6 四国地方
// 38      愛媛県      6 四国地方
// 39      高知県      6 四国地方
// 40      福岡県      7 九州地方
// 41      佐賀県      7 九州地方
// 42      長崎県      7 九州地方
// 43      熊本県      7 九州地方
// 44      大分県      7 九州地方
// 45      宮崎県      7 九州地方
// 46      鹿児島県    7 九州地方
// 47      沖縄県      7 九州地方

function getLocationCdByDantaiCd(dantai_cd){
  var tdfkCd = (("00" + dantai_cd).slice(-6).slice(0,2))*1;
  if(tdfkCd == 1){
    return 0;
  } else if(2 <= tdfkCd && tdfkCd <= 7){
    return 1;
  } else if(8 <= tdfkCd && tdfkCd <= 14){
    return 2;
  } else if(15 <= tdfkCd && tdfkCd <= 23){
    return 3;
  } else if(24 <= tdfkCd && tdfkCd <= 30){
    return 4;
  } else if(31 <= tdfkCd && tdfkCd <= 35){
    return 5;
  } else if(36 <= tdfkCd && tdfkCd <= 39){
    return 6;
  } else if(40 <= tdfkCd && tdfkCd <= 47){
    return 7;
  } else {
    return 9;
  }
}

