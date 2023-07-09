"use client";
import {useState} from "react";
import {setQuestionData} from "../../../lib/store";

function parseQuestions(input) {
    let parts = input.split('\n').filter(e => e);
    let questions = [];

    for(let i = 0; i < parts.length; ) {
        if (!parts[i].startsWith('【例')) {
            i++;
            continue;
        }

        let content = parts[i++].replace(/【例\d+】/g, "").trim();
        let options = [];
        while(i < parts.length && !parts[i].startsWith('【解析】')) {
            options.push(parts[i++].trim());
        }
        let answer = parts[i++].replace(/【解析】[A-Za-z]./g, "").trim();
        let answerChoice = parts[i - 1].match(/【解析】([A-Za-z])/)[1];
        questions.push({
            content: content,
            answer: answer,
            options: options,
            answerChoice: answerChoice
        });
    }

    return questions;
}

// function parseQuestions(text) {
//     // 将文本分割成多个部分，每个部分包含一个问题、选项和解析
//     const parts = text.split(/\【例\d+】/).slice(1);
//
//     // 对每个部分进行解析
//     const questions = parts.map(part => {
//         const sections = part.split('【解析】');
//         const content = sections[0].split('\n').slice(0, -1).join('\n');
//         const answer = sections[1];
//         const optionsContent = content.split('\n').slice(1);
//         let options = [];
//         optionsContent.forEach((option, index) => {
//             // 我们假设选项标签是大写字母
//             // const optionLabel = String.fromCharCode(65 + index);  // ASCII value of 'A' is 65
//             // options[optionLabel] = option;
//             if (option) {
//                 options.push(option)
//             }
//         });
//
//         // 返回解析后的问题对象
//         return {
//             content: content,
//             options: options,
//             answer: answer,
//             answerChoice: answer[0]
//         };
//     });
//
//     return questions;
// }

// // 使用函数
// const questionsText = `【例1】我们也希望记忆中的歌声除了那些____的经典，还有不断诞生的新曲目。
// 百听不厌
// 脍炙人口
// 【解析】B，“脍炙人口”比喻好的诗文受到人们的称赞和传颂；（一般只用于形容文章），因此此处不能选脍炙人口
// 【例2】我们都是历史流动中的角色，我们看到的每一片天空，每一片云，或是每一次斗转星移的月食，都是一次生命的体验。
// 独一无二
// 难能可贵
// 【解析】B，“难能可贵”不容易的事情竟然做到了，通常指的是某种品质或成就非常难得，因此十分值得珍视和赞赏。因此这里比较适合选A
// 【例3】研究文学史不可能剥离其思想内涵，研究思想史也不能脱离文学这一重要的表现形式，二者从来就是的。
// 相得益彰
// 密不可分
// 【解析】B，“相得益彰”相互配合，使长处更能显现。侧重体现两种事物配合后达到1+1 > 2的状态（）体现不出两种事物不可分割。“密不可分”强调两种事物之间关系密切。`;







const Setting = () => {
    const [textareaValue, setTextareaValue] = useState('')
    const [result, setResult] = useState([])
    const handleChange = (e) => {
        setTextareaValue(e.target.value)

    }

    const handleParse = () => {
        const result = parseQuestions(textareaValue)
        setResult(result)
        setQuestionData(result)
    }

    return <div className={"container max-w-4xl xs:p-4 sm:p-8"}>
        <textarea value={textareaValue} onChange={handleChange} className={"textarea textarea-lg bg-slate-100 block w-full"}></textarea>
        <button onClick={handleParse} className={"btn mt-4 w-full"}>识别</button>

        <div className={"mt-4"}>
            {
                result.map((item, index) => {
                    return <div className={"card shadow-xl mb-4"} key={index}>
                        <p>【例题】{item.content}</p>
                        <ul>
                            {item.options.map((item, j) => {
                                return <li key={item}>{String.fromCharCode(65 + j)}.{item}</li>
                            })}
                        </ul>
                        <p>【解析】{item.answer}</p>
                    </div>

                })
            }
        </div>
    </div>
}

export default Setting