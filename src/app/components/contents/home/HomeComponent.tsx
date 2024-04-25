import Image from "next/image";

export const HomeComponent = () => {
    return (<>
        <div className={"ml-4 max-w-960px"}>
            <div className={"flex max-w-960px"}>
                <Image src={"/image_left.png"} alt={"day_engineer"} width={480} height={485}/>
                <Image src={"/image_right.png"} alt={"night_engineer"} width={480} height={485}/>
            </div>
        </div>
        <div className={"middle-content bg-basic-gray mt-12 "}>
            <div className={"flex justify-between max-w-960px mx-auto pt-10 pb-10"}>
                <div className={"relative left-0 max-w-720px ml-4 indent-2 text-pretty text-white text-2xl font-semibold leading-14 "}>
                    <p>
                        With my passion in coding and design pattern, I am eager to join your journey.
                    </p>
                    <br/>
                    <p>
                        {`I am prepared to collaborate closely with the team, working tirelessly towards the company's goals and ready to contribute to its growth.`}
                    </p>
                </div>
                <Image className={"relative right-0 middle-photo"} src={"/my_photo.jpg"} alt={"my_photo"} width={210} height={210}/>
            </div>
        </div>
    </>)
}