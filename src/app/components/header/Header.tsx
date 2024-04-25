import {HomeIcon} from "./HomeIcon";

export const Header = () => {

    return (
        <header className={"mx-auto place-items-left max-w-960px"}>
            <div className={"flex ml-4 mt-8"}>
                <HomeIcon src={"/icon_home"} target={"home"}/>
                <HomeIcon src={"/icon_bulls"} target={"bullsAndCows"}/>
                <HomeIcon src={"/icon_experience"} target={"experience"}/>
            </div>
        </header>
    )
}