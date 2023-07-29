import React from 'react';
import dayjs from 'dayjs';
import styles from './ContributionCalendar.module.scss';
import cn from '@/lib/cn';
import Tooltip from '@/components/ui/Tooltip';

function getLastThreeMonthsInChinese() {
    const chineseMonths = ["", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

    const endDate = dayjs(); // 当前日期

    const currentMonth = endDate.month() + 1; // dayjs 的 month 是从 0 开始计算的
    const lastMonth = endDate.subtract(1, 'month').month() + 1;
    const lastTwoMonths = endDate.subtract(2, 'month').month() + 1;

    const currentMonthInChinese = chineseMonths[currentMonth];
    const lastMonthInChinese = chineseMonths[lastMonth];
    const lastTwoMonthsInChinese = chineseMonths[lastTwoMonths];

    return [lastTwoMonthsInChinese, lastMonthInChinese, currentMonthInChinese];
}


function ContributionCalendar() {
    const endDate = dayjs(); // 当前日期
    const startDate = endDate.subtract(83, 'day'); // 84天前的日期

    // 生成日期数组
    const dates = [];
    for (let i = 0; i < 84; i++) {
        dates.push(startDate.add(i, 'day').format('YYYY-MM-DD'));
    }

    return (
        <div>
            <div className={styles.calendarGrid}>
                {dates.map((date, index) => {
                    return <Tooltip key={index} title={date}>
                        <div className={cn(styles.calendarCell, 'hover:bg-green-400')} title={date}>
                        </div>
                    </Tooltip>  
                })}
            </div>
            <div className='grid grid-cols-3 mt-2'>
                {
                    getLastThreeMonthsInChinese().map(item => {
                        return <div className='text-xs text-gray-400' key={item}>{item}</div>
                    })
                }
            </div>
        </div>
    );
}

export default ContributionCalendar;
