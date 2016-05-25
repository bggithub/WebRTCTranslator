var inputTxt = document.getElementById("textvoice");
//All these values will be taken as input from user or device
var pitch=2 // from 0 to 2
var rate=1;//from 0.1 to 10
var volume=1; // from 0 to 1
var voices = [];// default voice is Alex
function speak() {
console.log('entering speak function');
console.log('input text value is',inputTxt.value);
var speechmsg = new SpeechSynthesisUtterance(inputTxt.value);
speechmsg.pitch=pitch;
speechmsg.rate=rate;
speechmsg.volume=volume;
//speechmsg.voices=voices;
//speechmsg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google español'; })[0];
window.speechSynthesis.speak(speechmsg);
speechSynthesis.getVoices().forEach(function(voice) {
  console.log(voice.name, voice.default ? '(default)' :'');
});
console.log('exiting the speak function');
};
function stop(){
	console.log('entering stop function');
	console.log('exiting the stop')
}