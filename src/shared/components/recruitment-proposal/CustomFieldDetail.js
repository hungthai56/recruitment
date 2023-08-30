import React, { forwardRef, useEffect, useState } from 'react'
import styles from './CustomDetail.module.scss'

function CustomFieldDetail(props) {
  const { textTitle, valueForm } = props
  return (
    <div className={styles.itemBoxInfo}>
      <span className={styles['title__detail']}>{textTitle}</span>
      <span className={styles["box__text"]}>: {valueForm}</span>
    </div>
  )
}

export default CustomFieldDetail