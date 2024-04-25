import React from "react";

export const NumberBox = (props:{dataKey:number, defaultValue:number, numbers:string, setNumbers:(v:string)=>void}) => {

    const onChangeNumberBox = (event:React.ChangeEvent<HTMLInputElement>) => {
        let newNumber = Number(event.target.value)
        if (isNaN(newNumber)) newNumber = 1

        const newNumbers:Array<any> = props.numbers.split(",")
        const key = Number(event.target.getAttribute("data-key"))

        if (newNumber < 10 && newNumber > 0){
            newNumbers[key]= newNumber
            props.setNumbers(newNumbers.toString())
        }
    }

    return  <input
        className={"bg-client-gray text-black text-2xl text-semibold text-center w-12 h-16 rounded-lg"}
        type="number"
        data-key={props.dataKey}
        defaultValue={props.defaultValue}
        onChange={onChangeNumberBox}
        min={1}
        max={9}
    />
}