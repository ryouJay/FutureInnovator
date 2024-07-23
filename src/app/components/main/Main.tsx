'use client'
import {useEffect, useRef, useState} from "react"
import {useGlobalState} from "../../context/GlobalStateContext"
import {Home} from "../contents/home/Home"
import {Bulls} from "../contents/bulls/Bulls"
import {Rhythm} from "../contents/Rhythm/Rhythm";

export const Main = () => {
    const {page} = useGlobalState()

    const wrap = useRef<HTMLDivElement | null>(null)
    const [content,setContent] = useState<JSX.Element>(<div/>)

    useEffect(()=>{
        wrap.current?.classList.add("opacity-0")
        setTimeout(()=>{
            sessionStorage.setItem('page', page);
            switch (page){
                case("Home"):
                    setContent(<Home/>)
                    break
                case("BullsAndCows"):
                    setContent(<Bulls/>)
                    break
                case("Rhythm"):
                    setContent(<Rhythm/>)
                    break
                default:
                    setContent(<Home/>)
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
    )
}