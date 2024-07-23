// const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export const playNote = (noteName:string, duration:number, audio:any) => {
    const notes: { [key: string]: number }  = {
        'C': 261.63,
        'D': 293.66,
        'E': 329.63,
        'F': 349.23,
        'G': 392.00,
        'A': 440.00,
        'B': 493.88
    };

    const frequency = notes[noteName.toUpperCase()];
    if (!frequency) {
        console.error('Invalid note name');
        return;
    }
    let oscillator = audio.createOscillator();
    let gainNode = audio.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audio.currentTime);
    gainNode.gain.setValueAtTime(0.1, audio.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audio.destination);

    oscillator.start();
    oscillator.stop(audio.currentTime + duration);
}