import React from 'react';
import styles from './CustomTable.module.scss';
export default function EmptyTable() {
    return (
        <div className={styles.EmptyTable}>
            <p className={styles.titleEmpty}>Không tìm thấy kết quả</p>
        </div>
    );
}
