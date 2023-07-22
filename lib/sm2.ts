// 定义数据类型
export type SuperMemoItem = {
    interval: number; // 下一次复习的时间间隔，初始值应该为0
    repetition: number; // 用户已经重复复习过的次数，初始值应该为0
    efactor: number; // 难度因子 初始值应该为2.5
};

export type SuperMemoGrade = 0 | 1 | 2;

// 定义SuperMemo算法
export function supermemo(item: SuperMemoItem, grade: SuperMemoGrade): SuperMemoItem {
    let nextInterval: number;
    let nextRepetition: number;
    let nextEfactor: number;

    if (grade >= 1) {
        if (item.repetition === 0) {
            nextInterval = 1;
            nextRepetition = 1;
        } else if (item.repetition === 1) {
            nextInterval = grade === 2 ? 6 : 3; // 如果评分为2，则间隔为6天，否则间隔为3天
            nextRepetition = 2;
        } else {
            nextInterval = Math.round(item.interval * item.efactor);
            nextRepetition = item.repetition + 1;
        }
    } else {
        nextInterval = 1;
        nextRepetition = 0;
    }

    nextEfactor = item.efactor + (0.1 - (2 - grade) * (0.08 + (2 - grade) * 0.02));

    if (nextEfactor < 1.3) {
        nextEfactor = 1.3;
    }

    return {
        interval: nextInterval,
        repetition: nextRepetition,
        efactor: nextEfactor,
    };
}
