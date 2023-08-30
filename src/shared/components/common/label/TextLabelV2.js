import React, { forwardRef, useEffect, useState } from "react";
import { TextLabel } from '@findxdn/erp-theme';
import PropTypes from 'prop-types';
import styles from './TextLabel.module.scss';
import IconInformation from 'assets/images/icons/IconInformation';
function TextLabelV2(props) {
    const { require = false, icon } = props;
    const [iconHovered, setIconHovered] = useState(false);

    const handleIconHover = () => {
        setIconHovered(true);
    };

    const handleIconLeave = () => {
        setIconHovered(false);
    };
    return (
        <TextLabel
            className={`m-0 ${props.className}`} style={{ marginBottom: '10px' }}>
            {props.title ?? props.children}
            {require ? <span className={styles['text-red-priority']}>*</span> : <></>}
            {icon ? <span className={styles['text-iconInformation']} style={{ marginLeft: "5px" }} onMouseEnter={handleIconHover}
                onMouseLeave={handleIconLeave}><IconInformation />{iconHovered && (
                    <div className={styles['icon-hover-box']}>
                        <p className={styles['icon-text']}>Người phụ trách nhận liên hệ của ứng viên</p>
                        <span className={styles['arrow-down']}><svg xmlns="http://www.w3.org/2000/svg" width="6" height="5" viewBox="0 0 6 5" fill="none">
                            <path d="M2.14251 3.57084C2.53091 4.21818 3.46909 4.21818 3.85749 3.57085L6 0H0L2.14251 3.57084Z" fill="#131313" />
                        </svg></span>
                    </div>
                )}</span> : <></>}
        </TextLabel>
    );
}
TextLabelV2.propTypes = {
    title: PropTypes.string,
    require: PropTypes.bool,
};
export default TextLabelV2;
