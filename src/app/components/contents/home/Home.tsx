import {HomeComponent} from "./HomeComponent";
import {Footer} from "../../footer/Footer";

export const Home = () => {
    return (
        <>
            <div className={`ml-4 mt-8 mb-4 text-white text-2xl font-semibold leading-14`}>
                <p>FULL STACK DEVELOPER<br/>WITH A <strong className={"text-orange-500"}>PASSION.</strong></p>
            </div>
            <div className={"grid justify-center justify-items-center mx-auto place-items-left min-h-360px"}>
                <HomeComponent/>
            </div>
            <Footer/>
        </>
    )
}