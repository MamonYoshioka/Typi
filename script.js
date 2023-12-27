const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");

/* 非同期処理 */
function GetRandomSentence() {
  return fetch(RANDOM_SENTENCE_URL_API).then((response) => response.json()).then((data) => data.content); 
}

/* 非同期処理で取得した文章を表示 */
async function RenderNextSentence() {
  const sentence = await GetRandomSentence();
  console.log(sentence);
  
  typeDisplay.innerText = "";

  /* 文字を1文字ずつ判別していく */
  let word = sentence.split("");
  //console.log(word);

  word.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    //conso le.log(characterSpan);
    typeDisplay.appendChild(characterSpan);

    characterSpan.classList.add("correct")
  });

}

RenderNextSentence();
