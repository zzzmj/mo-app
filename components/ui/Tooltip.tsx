import React, { useState, useRef } from 'react';
import styles from './Tooltip.module.scss';

function Tooltip(props: any) {
    const { title, children } = props;
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    let timeoutId = useRef<any>(null);  // 使用ref来保存timeout ID，以便之后清除

    const handleMouseOver = () => {
        timeoutId.current = setTimeout(() => {
            setVisible(true);
        }, 200);  // 设置0.5秒的延迟
    };

    const handleMouseOut = () => {
        clearTimeout(timeoutId.current);  // 清除延迟，避免在鼠标移出后tooltip仍然显示
        setVisible(false);
    };

    return (
        <div className={styles.tooltipContainer} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ref={ref}>
            {children}
            {visible && <div className={styles.tooltipContent}>{title}</div>}
        </div>
    );
}

export default Tooltip;
