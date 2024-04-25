export const InfoBox = (props:{className:string,title:string,content:string,onclick:()=>void}) => {
    return (
        <div className={props.className}>
            <p>{props.title}</p>
            <div onClick={props.onclick} className={"text-l underline whitespace-normal break-all cursor-pointer"}>
                {props.content}
            </div>
        </div>
    )
}