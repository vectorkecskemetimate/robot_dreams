
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

// Artical Author Datas
function showArticleAuthor(){
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {

      let user = json[Math.floor(Math.random() * json.length)];
      let authorData = document.getElementById('author-data');

      document.getElementById('author-name').textContent = user.name;
      document.getElementById('author-email').href  = 'mailto:'+ user.email;
      document.getElementById('author-email').textContent = user.email;
      document.getElementById('author-tel').textContent = user.phone;
      document.getElementById('author-company').textContent = user.company.name;

      authorData.classList.remove('d-none');
    })
}

showArticleReadTime();
showArticleAuthor();


// Articel content search
document.getElementById("article-search").addEventListener("keyup", function(e) {
  let input = this.value;
  clearTimeout(timeoutArticle);
  timeoutArticle = setTimeout(function () {

    let regex = new RegExp(input, 'gi');
    let article = document.getElementById('article');

    if (!article.originalContent) article.originalContent = article.innerHTML;

    function highlightText(node) {
      if (node.nodeType === 3) {
        let nodeText = node.data;
        let replacedText = nodeText.replace(regex, '<mark>$&</mark>');
        if (replacedText !== nodeText) {
          let newNode = document.createElement('span');
          newNode.innerHTML = replacedText;
          node.parentNode.replaceChild(newNode, node);
        }
      } else if (node.nodeType === 1 ) {
        for (let i = 0; i < node.childNodes.length; i++) {
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