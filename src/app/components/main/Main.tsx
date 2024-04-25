'use client'
import {useEffect, useRef, useState} from "react";
import {useGlobalState} from "../../context/GlobalStateContext";
import {Home} from "../contents/home/Home";
import {Bulls} from "../contents/bulls/Bulls";

export const Main = () => {
    const {page} = useGlobalState()

    const wrap = useRef<HTMLDivElement>(null)
    const [content,setContent] = useState<JSX.Element>(<div/>)

    useEffect(()=>{
        wrap.current?.classList.add("opacity-0")
        setTimeout(()=>{
            switch (page){
                case("home"):
                    setContent(<Home/>)
                    break
                case("bullsAndCows"):
                    setContent(<Bulls/>)
                    break
            }
            wrap.current?.classList.remove("opacity-0")
        },500)
    },[page])

    return(
        <main className={"mx-auto max-w-960px"}>
            <div ref={wrap} className={"custom-transition opacity-0"}>
                {content}
            </div>
        </main>
    );
}