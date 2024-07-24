'use client'
import React, { useState, useEffect, useRef } from 'react';
import { levelSeq } from './Songs';
import {getColor, keyMapping, Note, ratio, tile} from "./RhythmFunc";

const RhythmComponent = (props: { level: number }) => {
    const [score, setScore] = useState<number>(0);
    const [note, setNote] = useState<Note[]>([]);
    const [missedNote, setMissedNote] = useState<number>(0);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [combo, setCombo] = useState<number>(0);
    const [isStart, setGameStart] = useState<boolean>(false);
    const [isEnd, setGameEnd] = useState<boolean>(false);
    const [noteCount, setNoteCount] = useState<number>(0);
    const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const noteSequence = levelSeq[props.level].note;
    const maxNotes = noteSequence.length;

    useEffect(() => {
        audioCtxRef.current = new (window.AudioContext)();
    }, []);

    useEffect(() => {
        if (isStart && !isEnd) {
            const interval = setInterval(() => {
                if (noteCount < maxNotes) {
                    const note: Note = { id: Date.now(), top: 0, left: tile[Math.floor(Math.random() * 5)], clicked: false };
                    setNote((prevNotes) => [...prevNotes, note]);
                    setNoteCount(noteCount + 1);
                } else {
                    clearInterval(interval);
                }
            }, levelSeq[props.level].speed);
            return () => clearInterval(interval);
        }
    }, [isStart, noteCount, isEnd]);

    useEffect(() => {
        if (isStart && !isEnd) {
            const interval = setInterval(() => {
                setNote((prevNotes) => {
                    const newNotes = prevNotes.filter((note) => {
                        if (!note.clicked && note.top >= 90) {
                            setMissedNote((prevMissed) => prevMissed + 1);
                            setCombo(0);
                            setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % noteSequence.length);
                        }
                        return note.top < 90;
                    });
                    return newNotes.map((note) => ({ ...note, top: note.top + 1 }));
                });
            }, 20);

            return () => clearInterval(interval);
        }
    }, [isStart, isEnd]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key;
            if (keyMapping.hasOwnProperty(key)) {
                handleKeyPress(keyMapping[key]);
            }
        };

        if (isStart && !isEnd) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [note, isStart, isEnd]);

    useEffect(() => {
        if (noteCount === maxNotes && note.length === 0) {
            setGameEnd(true);
        }
    }, [note, noteCount]);

    const playSound = (frequency: number) => {
        const oscillator = audioCtxRef.current!.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioCtxRef.current!.currentTime);
        oscillator.connect(audioCtxRef.current!.destination);
        oscillator.start();
        oscillator.stop(audioCtxRef.current!.currentTime + 0.1);
    };

    const handleKeyPress = (left: number) => {
        setNote((prevNotes) => {
            let noteClicked = false;
            const newNotes = prevNotes.map((note) => {
                if (!noteClicked && note.left === left && note.top >= (90 - ratio) && note.top <= 90) {
                    noteClicked = true;
                    setScore((prevScore) => prevScore + 1);
                    setCombo((prevCombo) => prevCombo + 1);
                    setSuccessMessage(`Success! Combo: ${combo + 1}`);
                    setTimeout(() => setSuccessMessage(''), 1000);
                    playSound(noteSequence[currentNoteIndex]);
                    setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % noteSequence.length);
                    return { ...note, clicked: true };
                }
                return note;
            });
            if (!noteClicked) {
                setCombo(0);
            }
            if (noteClicked) {
                setTimeout(() => {
                    setNote((prevNotes) => prevNotes.filter(note => !note.clicked));
                }, 1000);
            }
            return newNotes;
        });
    };

    const startGame = () => {
        setScore(0);
        setNote([]);
        setMissedNote(0);
        setSuccessMessage('');
        setCombo(0);
        setGameStart(true);
        setGameEnd(false);
        setNoteCount(0);
        setCurrentNoteIndex(0);
    };

    return (
        <div className="flex flex-col items-center bg-gray-200 relative">
            {!isStart && !isEnd && (
                <button className="px-10 py-5 text-lg cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" onClick={startGame}>
                    Start
                </button>
            )}
            {isEnd && (
                <div className="text-red-500 my-2 text-lg cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" onClick={startGame}>
                    ReStart?
                </div>
            )}
            <div className="text-2xl text-green-500 my-2 h-8">{successMessage}</div>
            <div className="relative w-72 h-96 bg-gray-200 overflow-hidden">
                {note.map((note) => (
                    <div
                        key={note.id}
                        className={`absolute w-12 h-4 rounded cursor-pointer transition-transform duration-[4s] linear ${note.clicked ? 'animate-clickEffect' : ''}`}
                        style={{ top: `${note.top}%`, left: `${note.left}%`, backgroundColor: getColor(note.left) }}
                    />
                ))}
                {tile.map((left, index) => (
                    <div
                        key={index}
                        className="absolute bottom-0 w-12 h-12 border-2 border-dashed border-black box-border opacity-20"
                        style={{ left: `${left}%`, backgroundColor: getColor(left) }}
                    />
                ))}
            </div>
            <div className="mt-5 text-2xl bg-cornflowerblue">Score: {score}</div>
            <div className="mt-5 text-2xl bg-cornflowerblue">Missed Notes: {missedNote}</div>
        </div>
    );
};



export default RhythmComponent;
