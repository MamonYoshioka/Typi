const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer")

/* テキストボックスと問題文の合致を判定 */
typeInput.addEventListener("input", () => {
  const sentenceArray =  typeDisplay.querySelectorAll("span");
  //console.log(sentenceArray);
  const arrayValue = typeInput.value.split("");
  sentenceArray.forEach((characterSpan, index) => {
    if((arrayValue[index] == null)) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove( "incorrect");
    }else if(characterSpan.innerText == arrayValue[index]) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove( "incorrect");
    }else{
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
    }
  });
});

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
    
    //characterSpan.classList.add("correct")
  });

  /* テキストボックス内更新（クリアにする） */
  typeInput.value = "";

  /* タイマー機能 */
  Timer();
}

let countTime;
let originTime = 30;

function Timer(){
  timer.innerText = originTime;
  countTime = new Date();
  //console.log(countTime);

  /* 1000は1000ミリ秒を表す */
  setInterval(() => {
    timer.innerText = originTime - getTimerTime();
    if(timer.innerText <= 0) TimeUp();
  }, 1000)
}

function getTimerTime() {
   /* 小数点切り捨てでカウントするようにする */
   return Math.floor((new Date() - countTime) / 1000); 
}

function TimeUp() {
  RenderNextSentence();
}

RenderNextSentence();
