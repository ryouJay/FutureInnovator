import RhythmComponent from "./RhythmComponent";
import {useState} from "react";
import {levelSeq} from "./Songs";

export const Rhythm = () => {
    const [level, setLevel] = useState<number>(0)

    const levelControl = (num:number) => {
        if (num > 0){
            setLevel((prevLevel)=>{return Math.min(prevLevel + 1,levelSeq.length - 1)})
        } else {
            setLevel((prevLevel)=>{return Math.max(prevLevel - 1,0)})
        }
    }

    return (
        <>
            <div className={`ml-4 mt-8 mb-4 text-white text-2xl font-semibold leading-14`}>
                <p>PRESS IT ACCORDING TO THE <strong className={"text-orange-500"}>TIMING!</strong></p>
            </div>
            <div className={`flex justify-center items-center mb-4`}>
                <div className={`text-white mr-4 cursor-pointer`} onClick={()=>{levelControl(-1)}}>◀</div>
                <div className={`text-white text-xl text-center font-semibold`}>{levelSeq[level].name}</div>
                <div className={`text-white ml-4 cursor-pointer`} onClick={()=>{levelControl(1)}}>▶</div>
            </div>
            <div className={"grid justify-center justify-items-center mx-auto place-items-left min-h-360px"}>
                <RhythmComponent level={level}/>
            </div>
        </>
    )
}