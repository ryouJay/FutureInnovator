
export const createAnswer = ()=>{
    const newArray = Array.from({ length: 9 }, (v,k) => k+1);
    const targetLength = 3;
    const answerArray = [];
    for (let i=0; i< targetLength; i++){
        const targetIndex = (Math.floor(Math.random()*newArray.length));
        answerArray.push(newArray[targetIndex] .toString())
        newArray.splice(targetIndex,1)
    }
    return answerArray;
}

interface stats {
    strike: number;
    ball: number;
}

export const judgeNumber = (target:Array<string>, answer:Array<string>, sentence:Array<string>
    , setSentence:any, chance:number, setChance:any, imageDiv:any, setImageSrc:any) => {

    const result:stats = { strike:0, ball:0 }

    if (!Array.isArray(target)) return alert("Incorrect answer submission")

    for (let i = 0; i < answer.length; i++){
        if(answer.includes(target[i])){
            if(target[i] === answer[i]) {
                result.strike += 1
            } else {
                result.ball += 1
            }
        }
    }

    if (result["strike"] === 3) {
        setChance(0)
        setImageSrc("/baseball_kid_resize.png")
        imageDiv.classList.add("animate-winner")
        alert("HOME RUN!! \nYOUR WINNER!!!")
        return sentence.push("HOME RUN !!")
    }

    const strikeSentence = result["strike"] > 0 ? result["strike"] + ' strike ' : ""
    const ballSentence = result["ball"] > 0 ? result["ball"] + ' ball' : ""

    const resultSentence = (result["strike"] + result["ball"]) > 0 ? strikeSentence + ballSentence : "OUT"

    sentence.push(resultSentence + " || " + target.toString())
    setSentence(sentence)
    setChance(chance - 1)

    if(chance < 6){
        setImageSrc("/baseball_kid_normal_resize.png")
    }

    if(chance === 1) {
        imageDiv.classList.add("animate-loser")
        alert("YOUR FAILED T_T")
    }
}