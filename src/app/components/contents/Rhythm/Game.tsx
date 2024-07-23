'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './Game.module.css';

const easy = {
    note :[
        261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00, // C C G G A A G
    349.23, 349.23, 329.63, 329.63, 293.66, 293.66, 261.63, // F F E E D D C
    392.00, 392.00, 349.23, 349.23, 329.63, 329.63, 293.66, // G G F F E E D
    392.00, 392.00, 349.23, 349.23, 329.63, 329.63, 293.66, // G G F F E E D
    261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00, // C C G G A A G
    349.23, 349.23, 329.63, 329.63, 293.66, 293.66, 261.63  // F F E E D D C
],
    speed: 600
};

const hard = {
    note : [
        329.63, 293.66, 261.63, 293.66, 329.63, 329.63, 329.63,
        293.66, 293.66, 293.66, 329.63, 392.00, 392.00,
        329.63, 293.66, 261.63, 293.66, 329.63, 329.63, 329.63,
        329.63, 293.66, 293.66, 329.63, 293.66, 261.63,
        329.63, 293.66, 261.63, 293.66, 329.63, 329.63, 329.63,
        293.66, 293.66, 293.66, 329.63, 392.00, 392.00,
        329.63, 293.66, 261.63, 293.66, 329.63, 329.63, 329.63,
        329.63, 293.66, 293.66, 329.63, 293.66, 261.63
    ],
    speed:200
};

const levelSeq = [easy, hard]

type Note = {
    id: number;
    top: number;
    left: number;
    clicked: boolean;
};

const Game = (props:{level:number}) => {
    const [score, setScore] = useState<number>(0);
    const [notes, setNotes] = useState<Note[]>([]);
    const [missedNotes, setMissedNotes] = useState<number>(0);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [combo, setCombo] = useState<number>(0);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
    const [noteCount, setNoteCount] = useState<number>(0);
    const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);
    const tile = [2, 22, 42, 62, 82];
    const keyMapping = {
        'd': 2,
        'f': 22,
        'g': 42,
        'j': 62,
        'k': 82
    };
    const successThreshold = 10;
    const audioCtxRef = useRef<AudioContext | null>(null);
    const notesSequence = levelSeq[props.level].note
    const maxNotes = notesSequence.length;

    useEffect(() => {
        audioCtxRef.current = new (window.AudioContext)();
    }, []);

    useEffect(() => {
        if (isGameStarted && !isGameEnded) {
            const interval = setInterval(() => {
                if (noteCount < maxNotes) {
                    const note: Note = { id: Date.now(), top: 0, left: tile[Math.floor(Math.random() * 5)], clicked: false };
                    setNotes((prevNotes) => [...prevNotes, note]);
                    setNoteCount(noteCount + 1);
                } else {
                    clearInterval(interval);
                }
            }, levelSeq[props.level].speed);
            return () => clearInterval(interval);
        }
    }, [isGameStarted, noteCount, isGameEnded]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key;
            if (keyMapping.hasOwnProperty(key)) {
                handleKeyPress(keyMapping[key as keyof typeof keyMapping]);
            }
        };

        if (isGameStarted && !isGameEnded) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [notes, isGameStarted, isGameEnded]);

    const playSound = (frequency: number) => {
        const oscillator = audioCtxRef.current!.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioCtxRef.current!.currentTime);
        oscillator.connect(audioCtxRef.current!.destination);
        oscillator.start();
        oscillator.stop(audioCtxRef.current!.currentTime + 0.1);
    };

    const handleKeyPress = (left: number) => {
        setNotes((prevNotes) => {
            let noteClicked = false;
            const newNotes = prevNotes.map((note) => {
                if (!noteClicked && note.left === left && note.top >= (90 - successThreshold) && note.top <= 90) {
                    noteClicked = true;
                    setScore((prevScore) => prevScore + 1);
                    setCombo((prevCombo) => prevCombo + 1);
                    setSuccessMessage(`Success! Combo: ${combo + 1}`);
                    setTimeout(() => setSuccessMessage(''), 1000);
                    playSound(notesSequence[currentNoteIndex]);
                    setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % notesSequence.length);
                    return { ...note, clicked: true };
                }
                return note;
            });
            if (!noteClicked) {
                setCombo(0);
            }
            if (noteClicked) {
                setTimeout(() => {
                    setNotes((prevNotes) => prevNotes.filter(note => note.clicked !== true));
                }, 500);
            }
            return newNotes;
        });
    };

    useEffect(() => {
        if (isGameStarted && !isGameEnded) {
            const interval = setInterval(() => {
                setNotes((prevNotes) => {
                    const newNotes = prevNotes.filter((note) => {
                        if (!note.clicked && note.top >= 90) {
                            setMissedNotes((prevMissed) => prevMissed + 1);
                            setCombo(0);
                            setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % notesSequence.length);
                        }
                        return note.top < 90;
                    });
                    return newNotes.map((note) => ({ ...note, top: note.top + 1 }));
                });
            }, 20);

            return () => clearInterval(interval);
        }
    }, [isGameStarted, isGameEnded]);

    useEffect(() => {
        if (noteCount === maxNotes && notes.length === 0) {
            setIsGameEnded(true);
        }
    }, [notes, noteCount]);

    const startGame = () => {
        setScore(0);
        setNotes([]);
        setMissedNotes(0);
        setSuccessMessage('');
        setCombo(0);
        setIsGameStarted(true);
        setIsGameEnded(false);
        setNoteCount(0);
        setCurrentNoteIndex(0);
    };

    return (
        <div className={styles.gameContainer}>
            {!isGameStarted && !isGameEnded && (
                <button className={styles.startButton} onClick={startGame}>Start</button>
            )}
            {isGameEnded && (
                <div className={styles.endMessage}>End</div>
            )}
            <div className={styles.successMessage}>{successMessage}</div>
            <div className={styles.notesContainer}>
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className={`${styles.note} ${note.clicked ? styles.clicked : ''}`}
                        style={{ top: `${note.top}%`, left: `${note.left}%`, backgroundColor: getColor(note.left) }}
                    />
                ))}
                {tile.map((left, index) => (
                    <div
                        key={index}
                        className={styles.reactiveZone}
                        style={{ left: `${left}%`, backgroundColor: getColor(left) }}
                    />
                ))}
            </div>
            <div className={styles.score}>Score: {score}</div>
            <div className={styles.missedNotes}>Missed Notes: {missedNotes}</div>
        </div>
    );
};

const getColor = (left: number): string => {
    switch (left) {
        case 2:
            return '#bee5be';
        case 22:
            return '#e8d5a7';
        case 42:
            return '#bee5be';
        case 62:
            return '#e8d5a7';
        case 82:
            return '#bee5be';
        default:
            return '#af6d6d';
    }
};

export default Game;
