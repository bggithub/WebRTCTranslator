
var startBtn = document.getElementById('startBtn');
var stopBtn=document.getElementById('stopBtn');
var video = document.querySelector('video');
var recognition='';
var inputTxt = document.getElementById("textvoice");
//All these values will be taken as input from user or device
var pitch=2 // from 0 to 2
var rate=1;//from 0.1 to 10
var volume=1; // from 0 to 1
var voices = [];// default voice is Alex
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
processSpeech(stream);
console.log('exiting success call back');
};


//function for webAudioAPI

function processSpeech(stream) {

console.log("entering  Processingspeech");
   // window.AudioContext = window.AudioContext || window.webkitAudioContext;
//    var audioContext = new AudioContext();

    // Create an AudioNode from the stream.
  //  var mediaStreamSource = audioContext.createMediaStreamSource( stream );

    // Connect it to the destination to hear yourself (or any other node for processing!)
    //mediaStreamSource.connect( audioContext.destination );

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
console.log('SpeechRecognition',SpeechRecognition);
//window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//if (!('window.SpeechRecognition' in window)) {
  //upgrade();
//} else {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.start();
 final_transcript = ''

 console.log('SpeechRecognition Language', recognition.lang);
  recognition.onresult = function (event) {
    var interim_transcript = '';
     console.log('entering on result',event);    
        if (typeof (event.results) == 'undefined') {
            recognition.onend = null;
            recognition.stop();
            upgrade();
            return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
           
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
                 console.log('Confidence: ' + event.results[i][0].confidence);
            } else {
                interim_transcript += event.results[i][0].transcript;
                 console.log('Confidence: ' + event.results[i][0].confidence);
                  if(interim_transcript.length>350)
                      {
                        console.log('inside empty block');
                        interim_transcript='';
                    }
            }
        }

        console.log('intermediate',interim_transcript);
        console.log('final result is',final_transcript)
        //document.getElementById('voicetext').innerText = '';
        document.getElementById('voicetext').innerText = interim_transcript;
    
    //recognition end event
    recognition.onend=function()
     {
      console.log('recognition ended');
       //intermeidate results will stop the recoginition; so starting the recognition again.
      recognition.start();

     };
     recognition.onstart=function()
     {
      console.log('recognition started'); 
     }
     

    
     

}
//console.log(mediaStreamSource);
console.log('exited processing speech');
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

//functions for voice2Text
function speak() {
console.log('entering speak function');
console.log('input text value is',inputTxt.value);
var speechmsg = new SpeechSynthesisUtterance(inputTxt.value);
speechmsg.pitch=pitch;
speechmsg.rate=rate;
speechmsg.volume=volume;
//speechmsg.voices=voices;
speechmsg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google español'; })[0];
window.speechSynthesis.speak(speechmsg);
speechSynthesis.getVoices().forEach(function(voice) {
  console.log(voice.name, voice.default ? '(default)' :'');
});
console.log('exiting the speak function');
};


