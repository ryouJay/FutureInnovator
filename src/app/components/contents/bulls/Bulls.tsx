import {BullsComponent} from "./BullsComponent";

export const Bulls = () => {
    return (
        <>
            <div className={`ml-4 mt-8 mb-4 text-white text-2xl font-semibold leading-14`}>
                <div>GUESS THE <strong className="text-orange-500">NUMBER</strong><br/>WITH BASEBALL KID.</div>
            </div>
            <div className={"grid mx-auto place-items-left min-h-360px"}>
                <BullsComponent/>
            </div>
        </>
    )
}