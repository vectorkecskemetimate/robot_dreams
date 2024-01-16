
let timeoutArticle = null;

// Artical read time calculation
function showArticleReadTime(){
  const articleText = document.getElementById('article').innerText;
  const wordsArray = articleText.split(' ');
  const wordCount = wordsArray.length;
  // 200 word / Minutes calculation
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  const readingInfo = `(This article will take approximately <b>${readingTime} minute(s) </b> to read)`
  let readingTimeDiv = document.createElement('div');
  readingTimeDiv.classList.add('reading-time');
  readingTimeDiv.innerHTML = readingInfo;
  document.getElementById('title').after(readingTimeDiv);
}

showArticleReadTime();


// Articel content search
document.getElementById("article-search").addEventListener("keyup", function(e) {
  var input = this.value;
  clearTimeout(timeoutArticle);
  timeoutArticle = setTimeout(function () {

    var regex = new RegExp(input, 'gi');
    var article = document.getElementById('article');

    if (!article.originalContent) article.originalContent = article.innerHTML;

    function highlightText(node) {
      if (node.nodeType === 3) {
        var nodeText = node.data;
        var replacedText = nodeText.replace(regex, '<mark>$&</mark>');
        if (replacedText !== nodeText) {
          var newNode = document.createElement('span');
          newNode.innerHTML = replacedText;
          node.parentNode.replaceChild(newNode, node);
        }
      } else if (node.nodeType === 1 ) {
        for (var i = 0; i < node.childNodes.length; i++) {
          highlightText(node.childNodes[i]);
        }
      }
    }

    article.innerHTML = article.originalContent;

    if( input !== ""){
      highlightText(article);
    }
  }, 300);
});