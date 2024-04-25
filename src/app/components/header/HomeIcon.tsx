"use client"
import React from 'react';
import Image from "next/image";
import {useGlobalState} from "../../context/GlobalStateContext";

export const HomeIcon = (props:{src:string, target:string}) => {
    const {page, setPage, load, setLoad} = useGlobalState();

    const target = props.target;
    const src = props.src;

    let imageSrc:string = page.toString() === target ? src + "_fill.png" : src + ".png";
    let imageAlt:string = page.toString() === target ? src + "_fill" : src;

    const goTarget = () => {
        if (load){
            setLoad(false);
            setPage(target);
            window.scrollTo({top:0,behavior: 'smooth'})
            setTimeout(()=>{
                setLoad(true);
            },1000)
        }
    }

    const naviFontStyle = "flex w-auto text-white text-xl font-semibold leading-14 cursor-pointer mr-8";

    return (
        <div onClick={goTarget} className={naviFontStyle}>
            <Image src={imageSrc} alt={imageAlt} width={36} height={36}/>
            <p className={"ml-2"}>{target}</p>
        </div>
    );
};