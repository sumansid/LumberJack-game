function beep(freq, duration){
	audioCtx = new AudioContext();
	var oscillator = audioCtx.createOscillator();
	oscillator.type = 'square';
	oscillator.frequency.value = freq;
	oscillator.connect(audioCtx.destination);
  	oscillator.start(audioCtx.currentTime);
  	oscillator.stop(audioCtx.currentTime + duration * 0.001);
}