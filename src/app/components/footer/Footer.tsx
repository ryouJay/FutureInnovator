"use client"
import {FloatingModal} from "../FloatingModal"
import {useState} from "react"
import {urlCheck} from "../Utils"
import {InfoBox} from "./InfoBox"

export const Footer = () => {

    const [showing,setShowing] = useState<boolean>(false);

    const email = "ryoujaydev@gmail.com";
    const github = "https://github.com/ryouJay/FutureInnovator";

    const emailCopy = () => {
        navigator.clipboard.writeText(email).then(()=>{
            if (!showing){
                setShowing(true);
                setTimeout(()=>{
                    setShowing(false);
                },500);
            }
        }).catch(()=>{
            console.error("## copied failed ##");
        })
    }

    const goGithub = () => {
        if (urlCheck(github)){
            window.open(github);
        } else {
            console.error("## wrong url ##");
        }
    }

    return(
        <footer className={"mx-auto place-items-left max-w-960px h-12 mt-8 mb-8"}>
            <div className={"grid text-white justify-around grid-cols-2"}>
                <FloatingModal display={showing}/>
                <InfoBox className={"ml-8"} title={"Contact"} content={email} onclick={emailCopy}/>
                <InfoBox className={"ml-8"} title={"Github"} content={github} onclick={goGithub}/>
            </div>
        </footer>
    )
}