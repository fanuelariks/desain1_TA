// function setup() {
//   noCanvas();
//   let lang = navigator.language || 'en-US';
//   let speechRec = new p5.SpeechRec(lang, gotSpeech);
//   speechRec.start();
  
//   function gotSpeech() {
//     console.log(speechRec);
//   }
// }






var tombol = document.querySelector('button');
tombol
.onclick = () => {
  var speechRec = new p5.SpeechRec('id-ID', gotSpeech);
  // speech.setVoice('Google Bahasa Indonesia');
  speechRec.start();

  function gotSpeech() {
    let kata = speechRec.resultValue;
    let input = speechRec.resultString;
    let tombol = document.querySelector('button');

    if (kata) {  
      if (input === 'berhitung mulai') {
        tombol.setAttribute('style', 'background: red;')
        console.log(input);
      }
    }
  }
}

// if (speechRec.resultValue) {
//   let input = speechRec.resultString;
//   console.log(input);
// }

// function setup(){
//   noCanvas();
//   let speechRec = new p5.SpeechRec();
//   speechRec.setLang('id-ID');
//   speechRec.start();

// }
// tombol.addEventListener('click', ()=>{
//     var speech = new p5.Speech();
//     speech.speak('Welcome to Siloam Hospital');
//   }) 





// const texts = document.querySelector(".texts");

// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// const recognition = new window.SpeechRecognition();
// recognition.interimResults = true;

// let p = document.createElement("p");

// recognition.addEventListener("result", (e) => {
//     const text = Array.from(e.results)
//         .map(result => result[0])
//         .map(result => result.transcript)
//         .join('');

//     p.innerHTML = text;
//     texts.appendChild(p);    
//     console.log(text);
// })    

// recognition.addEventListener('end', () => {
//     recognition.start();
// })

// recognition.start();

// //   texts.appendChild(p);
// //   const text = Array.from(e.results)
// //     .map((result) => result[0])
// //     .map((result) => result.transcript)
// //     .join("");

// //   p.innerText = text;
// //   if (e.results[0].isFinal) {
// //     if (text.includes("how are you")) {
// //       p = document.createElement("p");
// //       p.classList.add("replay");
// //       p.innerText = "I am fine";
// //       texts.appendChild(p);
// //     }
// //     if (
// //       text.includes("what's your name") ||
// //       text.includes("what is your name")
// //     ) {
// //       p = document.createElement("p");
// //       p.classList.add("replay");
// //       p.innerText = "My Name is Cifar";
// //       texts.appendChild(p);
// //     }
// //     if (text.includes("open my YouTube")) {
// //       p = document.createElement("p");
// //       p.classList.add("replay");
// //       p.innerText = "opening youtube channel";
// //       texts.appendChild(p);
// //       console.log("opening youtube");
// //       window.open("https://www.youtube.com/channel/UCdxaLo9ALJgXgOUDURRPGiQ");
// //     }
// //     p = document.createElement("p");
// //   }
// // });

// // recognition.addEventListener("end", () => {
// //   recognition.start();
// // });