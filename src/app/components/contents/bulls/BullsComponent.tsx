'use client'
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {NumberBoxes} from "./NumberBoxes";
import {createAnswer, judgeNumber} from "./BullsFunc";

export const BullsComponent = () => {

    const imageDiv = useRef<HTMLDivElement>(null);

    const [chance, setChance] = useState<number>(10)
    const [sentence, setSentence] = useState<Array<string>>([])
    const [answer, setAnswer ] = useState<Array<string>>(["1","1","1"])
    const [imageSrc, setImageSrc ] = useState<string>("/baseball_kid_resize.png")

    useEffect(()=>{
        setAnswer(createAnswer())
    },[])

    const reset = () => {
        imageDiv.current?.classList.remove("animate-winner")
        imageDiv.current?.classList.remove("animate-loser")
        setImageSrc("/baseball_kid_resize.png")
        setSentence([])
        setAnswer(createAnswer())
        setChance(10)
    }

    const guessNumber = (event:React.MouseEvent<HTMLButtonElement>) => {
        if (chance > 0){
            const eventValue = event.currentTarget.getAttribute("data-value")
            if (eventValue === null) return alert("Empty answer submission")
            const targetArray = eventValue.split(",")

            judgeNumber(targetArray, answer, sentence, setSentence, chance, setChance, imageDiv.current, setImageSrc)
        } else {
            confirm("restart?") ? reset() : alert("ok ...")
        }
    }

    return (
        <div className={"grid grid-cols-2 ml-4"}>
            <article>
                <NumberBoxes guessNumber={guessNumber}/>
                <p className={"text-white text-xl"}>remain {chance} chance</p>
                <div className={"text-white text-xl mt-4 grid grid-cols-2"}>
                    {sentence.map((string, index)=>(
                        <p key={index}>{string}</p>
                    ))}
                </div>
            </article>
            <aside>
                <div ref={imageDiv} style={{width:300}}>
                    <Image src={imageSrc} alt={"baseball_kid"} width={300} height={450}/>
                </div>
            </aside>
        </div>
    )
}
