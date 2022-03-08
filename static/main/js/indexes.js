function getDescribeHtml(indexName){

  var popContent = document.createElement("div");
  if(indexName=="経常収支比率"){

    var popTitle = document.createElement("div");
    popTitle.innerText = "（経常収益　÷　経常費用）　×　100";
    popTitle.setAttribute("role","alert");
    popTitle.classList.add("alert");
    popTitle.classList.add("alert-primary");
    var popBody = document.createElement("div");
    popBody.innerText = "経常収支比率は・・・・";

    popContent.appendChild(popTitle)
    popContent.appendChild(popBody)
  }

  return popContent.outerHTML;
}