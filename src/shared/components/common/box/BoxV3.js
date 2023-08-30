import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import styles from './BoxV3.module.scss';
function BoxV3(props) {
    const {
        className,
        style,
        children,
        boxTitle,
        isHaveBorderTitle,
        iconTitleLeft,
        iconTitleRight,
        icon,
        titlebox,
        require = false,
        key
    } = props
    const [isClick, setIsClick] = useState(true);
    const popRef = useRef(null)
    const renderHeaderBox = (param) => {
        const { pTitle = '', isBorder = true } = param
        // justify-content-between align-items-center
        return (
            <div className={` ${styles['box-title']} `}  onClick={() => { setIsClick(!isClick) }}  ref={popRef}>
                {icon ? <div className={`${styles['icon_drop']} ${isBorder ? styles['is_change'] : styles['']}`}>
                    {icon}
                </div> :''}
                
                <div className={`${styles["box_change_title"]} ${isClick ? styles["roll_icon"] : styles["none_roll_icon"]}`} >
                    {iconTitleLeft && iconTitleLeft}
                    <p className={`${iconTitleLeft ? 'bases__margin-left--15' : ''} font-weight-bold`}>{pTitle} {require ? <span className={styles['text-red-priority']}>*</span> : <></>} </p>
                </div>
                <div>
                    {iconTitleRight && iconTitleRight}
                </div>

            </div>
        )
    }

    return (
        <div className={`${styles['findx-box']} ${className}`} style={style} key={key}>
            <div className={`${styles['findx-box-context']}`}>
                {
                    boxTitle && renderHeaderBox({ pTitle: boxTitle, isBorder: isClick })
                }
                <p className={`${styles['titelbox_contexnt']}`}>{titlebox}</p>
                <div className={`${styles['box-content']} ${isClick ? styles["show"] : ""}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

BoxV3.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any,
    boxTitle: PropTypes.string,
    isHaveBorderTitle: PropTypes.bool,
    iconTitleLeft: PropTypes.element,
    iconTitleRight: PropTypes.element,
}

BoxV3.defaultProps = {
    className: '',
    style: {},
    children: null,
    boxTitle: '',
    isHaveBorderTitle: false,
    iconTitleLeft: null,
    iconTitleRight: null,
}

export default BoxV3;
