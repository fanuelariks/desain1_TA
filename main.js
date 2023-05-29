// Clock
setInterval(() => {
    var today = new Date().toLocaleString('id-ID', {weekday: "long", day:"2-digit", month:"long", 
    year:"numeric"});
    document.querySelector(".date").innerHTML = today;
}, 1000)

setInterval(() => {
    var time_today = new Date().toLocaleTimeString('id-ID', {hour:"numeric", minute:"numeric", second:"numeric"});
    document.querySelector(".time").innerHTML = time_today;
}, 1000)

// Data Pasien
let SHEET_ID = '1sYhE3aN37jqw7TVF-NgjsJILOATyHaoUP9e8P3bAfqA';
let SHEET_TITLE = 'data_Pasien';
let SHEET_RANGE = 'A3:E7';

let FULL_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + 
                '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE;

fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2)); //Parsing data from spreadsheet

    let nama = document.querySelector('.nama');
    let usia = document.querySelector('.usia');
    let kelamin = document.querySelector('.kelamin');
    let berat = document.querySelector('.berat');
    let foto = document.querySelector('.foto');

    // console.log(data.table.rows[0].c[1].v);
    nama.innerHTML = data.table.rows[0].c[0].v;
    usia.innerHTML = data.table.rows[0].c[1].v;
    kelamin.innerHTML = data.table.rows[0].c[2].v;
    berat.innerHTML = data.table.rows[0].c[3].v;
    // foto.innerHTML = data.table.rows[0].c[5].v;
})

// Voice Recognition
var rekam = document.querySelector('button');
var nol = document.getElementById('nol');
var satu = document.getElementById('satu');
var dua = document.getElementById('2');
var tiga = document.getElementById('3');
var empat = document.getElementById('4');
var lima = document.getElementById('5');



function setup() {
  var speechRec = new p5.SpeechRec('id-ID', gotSpeech);
  // speech.setVoice('Google Bahasa Indonesia');
  speechRec.start();

  function gotSpeech() {
    let kata = speechRec.resultValue;
    let input = speechRec.resultString;

    if (input) {  
      if (input === 'kosong') {
        nol.checked = true;
      } else if (input === 'satu') {
        satu.checked = true;
      } else if (input === 'dua') {
        dua.checked = true;
      } else if (input === 'tiga') {
        tiga.checked = true;
      } else if (input === 'empat') {
        empat.checked = true;
      } else if (input === 'lima') { 
        lima.checked = true;
      }  
      console.log(input);
    }  
  }
}

rekam.onclick = (setup) 

// popup
const submit = document.querySelector('.submit');
submit.addEventListener('click', () => {
  let popup = document.querySelector('.popup');
  popup.classList.add('active');
})

