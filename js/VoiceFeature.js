
var startBtn = document.getElementById('startBtn');
var stopBtn=document.getElementById('stopBtn');
var video = document.querySelector('video');
var recognition='';
//function for start

function start() {
console.log('entering start function');
navigator.getMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

if (navigator.getMedia) {
console.log('inside media');
var constraints = {
  video:true,
audio:true
};
navigator.getMedia(
         constraints,successCallBack,errorCallback);
}
else
{
console.log('your browser doesnt support');
}};

//function to process successCallBack

function successCallBack(stream) {
console.log('entering success callBack');
video.src=window.URL.createObjectURL(stream);
console.log(stream);
startBtn.disabled=true;
processStream(stream);
console.log('exiting success call back');
};


//function for webAudioAPI

function processStream(stream) {

console.log("entering  webAudio");
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
//    var audioContext = new AudioContext();

    // Create an AudioNode from the stream.
  //  var mediaStreamSource = audioContext.createMediaStreamSource( stream );

    // Connect it to the destination to hear yourself (or any other node for processing!)
    //mediaStreamSource.connect( audioContext.destination );

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.start();
final_transcript = ''
 console.log('SpeechRecognition Language', recognition.lang);
  recognition.onresult = function (event) {
   console.log('entering on result',event);    
    var interim_transcript = '';
        if (typeof (event.results) == 'undefined') {
            recognition.onend = null;
            recognition.stop();
            upgrade();
            return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        console.log('final transcript is',final_transcript);
        document.getElementById('voicetext').innerText = final_transcript;
    };

}
//console.log(mediaStreamSource);
console.log('exited webAudio');
}

function errorCallback(error) {
    console.log(error.name + ": " + error.message);
 };


function stop()
{
console.log('entering stop');
//recognition.stop();
startBtn.disabled=false;
stopBtn.disabled=true;
console.log('exited stop');
}


