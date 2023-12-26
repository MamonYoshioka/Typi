const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("Display")

/* 非同期処理 */
function GetSentence() {
  return fetch(RANDOM_SENTENCE_URL_API).then((response) => response.json()).then((data) => data.content);
}

/* 非同期処理で取得した文章を表示 */
async function RenderNextSentence() {
  const sentence = await GetSentence();
  console.log(sentence)

  typeDisplay.innerText = sentence;
}

RenderNextSentence();