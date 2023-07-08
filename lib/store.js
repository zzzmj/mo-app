
export const setQuestionData = (dataList) => {
    localStorage.setItem('questionList', JSON.stringify(dataList))
}

export const getQuestionData = () => {
    const dataList = localStorage.getItem('questionList')
    try {
        return JSON.parse(dataList)
    } catch (err) {
        return null
    }
}