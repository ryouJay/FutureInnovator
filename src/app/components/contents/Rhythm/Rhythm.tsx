import Game from "./Game";

export const Rhythm = () => {
    return (
        <>
            <div className={`ml-4 mt-8 mb-4 text-white text-2xl font-semibold leading-14`}>
                <p>PRESS IT ACCORDING TO THE <strong className={"text-orange-500"}>TIMING!</strong></p>
            </div>
            <div className={"grid justify-center justify-items-center mx-auto place-items-left min-h-360px"}>
                <Game level={1}/>
            </div>
        </>
    )
}