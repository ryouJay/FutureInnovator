
export const FloatingModal = (props:{display:boolean}) => {

    const display = props.display ? "opacity-1 !visible" : "opacity-0"

    return (
        <div className={"fixed z-10 inset-0 overflow-y-auto custom-transition invisible " + display}>
            <div className={"flex items-center justify-center min-h-screen"}>
                <div className={"floating-circle bg-black grid items-center "}>
                    <p className={"mx-auto text-white text-xl font-semibold"}>copied!</p>
                </div>
            </div>
        </div>
    )
}