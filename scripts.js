
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

// wait for the page to load
document.addEventListener("DOMContentLoaded", function() {
  showArticleReadTime();
});

