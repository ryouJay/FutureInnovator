'use client'
import React, {useState} from "react";
import {NumberBox} from "./NumberBox";

export const NumberBoxes = (props:{guessNumber:(event: React.MouseEvent<HTMLButtonElement>) => void}) => {
    const guessNumber = props.guessNumber;
    const [numbers,setNumbers] = useState<string>("1,2,3");

    return (
        <div className={"grid grid-cols-2 mt-4"}>
            <div className={"grid grid-cols-3"}>
                <NumberBox defaultValue={1} dataKey={0} numbers={numbers} setNumbers={setNumbers}/>
                <NumberBox defaultValue={2} dataKey={1} numbers={numbers} setNumbers={setNumbers}/>
                <NumberBox defaultValue={3} dataKey={2} numbers={numbers} setNumbers={setNumbers}/>
            </div>
            <button className={"text-black text-2xl ml-2 bg-client-gray w-24 h-16 rounded-lg"} data-value={numbers} onClick={guessNumber}>CLICK</button>
        </div>

    )
}