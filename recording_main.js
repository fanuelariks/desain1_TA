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


// Data Siswa
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

// RECORDING SYSTEM
// Buttons
const title = document.querySelector('.title');
const subtitel = document.querySelector('.subtitel')
const rec = document.querySelector('.rec');
const stop = document.querySelector('.stop');
const audioPlay = document.querySelector('.audio');
const stopwatch = document.querySelector('.stopwatch');
const graph = document.querySelector('#sketch-holder');
const submit = document.querySelector('.submit')

// Media
let typeOfMedia = {
    audio: true
        //, video: true
};

let chunks = [];
// Media options
var options = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: 'audio/webm'
}
let counter = 0;


// Recording Initiation
let recStream;
const recFunction = async() => {
    try {
        // Computer devices
        const mediaDevices = await navigator.mediaDevices
        .getUserMedia(typeOfMedia)
        if (mediaDevices.active === true) {
            // Media Recorder Object
            recStream = new MediaRecorder(mediaDevices, options);
            recStream.ondataavailable = e => {
                    // Push media data inside the array
                    chunks.push(e.data);
                    // If stop recording
                    if (recStream.state == 'inactive') {
                        let blob = new Blob(chunks, { 
                            type: 'audio/webm' 
                        });
                        createAudioElement(URL.createObjectURL(blob))
                    }
                }
            // Start recording
            recStream.start()
        }
    } catch (error) {
        if (error) throw error;
    }
}

// Link styles
let linkStyles = "display: block; padding: 10px; color:red; text-decoration: none; "

function createAudioElement(blobUrl) {
    // Create an element 
    const divEl = document.createElement('div');
    // Assign a class
    divEl.className = 'div-audio'
    // Create an anchor tag
    const downloadEl = document.createElement('a');
    // Give the tag's styles
    downloadEl.style = linkStyles;
    // Give it a progressive name
    downloadEl.innerHTML = `Download-${counter = counter + 1}`;
    downloadEl.download = `Audio-${counter}.webm`;
    // Define href
    downloadEl.href = blobUrl;
    // Create audio element
    const audioEl = document.createElement('audio');
    // Give it a class
    audioEl.className = 'audio'
        // Show controls play pause etc
    audioEl.controls = true;
    // Create source
    const sourceEl = document.createElement('source');
    sourceEl.src = blobUrl;
    // Audio type
    sourceEl.type = 'audio/webm';
    // Append source on audio
    audioEl.appendChild(sourceEl);
    // document.body.appendChild(audioEl);
    // document.body.appendChild(downloadEl);
    // Append child
    divEl.appendChild(audioEl)
    divEl.appendChild(downloadEl)
        // Append all in the body DOM
    document.body.appendChild(divEl);
}

// REC CLICK BUTTON EVENT LISTENER
rec.onclick = e => {
    title.innerHTML = 'Perekaman sedang berlangsung'
    subtitel.innerHTML = 'Tekan tombol stop untuk menghentikan perekaman'
    // title.style.color = 'white'
    // During registration disable rec button
    rec.disabled = true;
    // Change background color
    rec.style.backgroundColor = '#292929';
    // Animate rec button
    rec.classList.add('scale');
    // Enable stop button (default disabled)
    stop.disabled = false;
    // Change stop color back
    stop.style.background = '#BF3952';
    stop.style.color = '#ffffff';
    submit.style.visibility = 'hidden'
    // Change title back color
    // Start recording
    recFunction()
    // START STOPWATCH
    // clearInterval(swInterval);
    swInterval = setInterval(stopwatchFunction, 1000);
    stopwatch.style.visibility = 'visible'
    beginShape();
    mic.start();
}
// STOP REC BUTTON EVENT LISTENER
stop.onclick = e => {
    title.innerHTML = 'Perekaman Telah Usai'
    subtitel.innerHTML = 'Tekan tombol merah untuk mengulang perekaman atau Submit jika sudah selesai'
    // Enable rec button
    rec.disabled = false;
    // Restore red color on rec button
    rec.style.backgroundColor = '#BF3952';
    // Disable rec animation 
    rec.classList.remove('scale');
    // Disable stop button
    stop.disabled = true;
    // Change stop color back
    stop.style.backgroundColor = '#292929';
    stop.style.color = 'white';
    submit.style.visibility = 'visible'
    stopwatch.style.visibility = 'hidden'
    // STOP and Reset STOPWATCH
    clearInterval(swInterval);
    sec = 0;
    min = 0;
    // Stop Recording
    recStream.stop();
    mic.stop();
    volhistory.stop();
}

// STOPWATCH
let swInterval;
let displayStopwatch;
let sec = 0;
let min = 0;
let stopwatchFunction = () => {
    sec++
    if (sec <= 9) {
        sec = '0' + sec;
    }
    if (sec === 60) {
        sec = 0;
        min++
        if (min <= 9) {
            min = '0' + min;
        }
    }
    if (min === 60) {
        min = 0;
    }
    displayStopwatch = min + ' : ' + sec;
    // Write output to the screen
    stopwatch.innerHTML = displayStopwatch;
};

var button;
var amp;
var mic;

var volhistory = [];

  function setup() {
    var canvas = createCanvas(365, 100);
    canvas.parent('sketch-holder');
    // button = createButton('toggle');
    mic = new p5.AudioIn();
    mic_start = mic.start();
    amp = new p5.Amplitude();
    getAudioContext().resume();
    // button.mousePressed(mic_start);
  }
  
  function draw() {
    background('#BFD1D9');
    color('#404040')
    var vol = mic.getLevel();
    volhistory.push(vol);
    noFill();
    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
      stroke(255)
      var y = map(volhistory[i], 0, 1, height, 0);
      vertex(i,y);
    }
    endShape();

    if(volhistory.length > width) {
      volhistory.splice(0,1);
    }

    stroke('#8D9FA6');
    line(volhistory.length, height, volhistory.length, 0);
    // ellipse(100, 100, 200, vol * 200);
  }

// popup
submit.addEventListener('click', () => {
  let popup = document.querySelector('.popup');
  popup.classList.add('active');
})