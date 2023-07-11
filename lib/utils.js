const mapLetterToIndex = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
}

export function parseQuestions(input) {
    let parts = input.split('\n').filter(e => e);
    let questions = [];

    for (let i = 0; i < parts.length;) {
        if (!parts[i].startsWith('【例')) {
            i++;
            continue;
        }

        let content = parts[i++].replace(/【例\d+】/g, "").trim();
        let options = [];
        while (i < parts.length && !parts[i].startsWith('【解析】')) {
            options.push(parts[i++].trim());
        }
        let answer = parts[i++].replace(/【解析】[A-Za-z]./g, "").trim();
        let answerChoice = parts[i - 1].match(/【解析】([A-Za-z])/)[1];
        questions.push({
            content: content,
            answer: answer,
            options: options,
            answerChoice: mapLetterToIndex[answerChoice]
        });
    }

    return questions;
}