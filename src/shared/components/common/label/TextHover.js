import React, { forwardRef, useEffect, useState } from 'react';
import { TextLabel } from '@findxdn/erp-theme';
import PropTypes from 'prop-types';
import styles from './TextHover.module.scss';
import IconInformation from 'assets/images/icons/IconInformation';
function TextHover(props) {
  const { text } = props;
  return (
    <div className={styles['bg-content']}>
      <span className={styles['content']}>{text}</span>
      <div className={styles['arrow-down']}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="5"
          viewBox="0 0 6 5"
          fill="none"
        >
          <path
            d="M2.14251 3.57084C2.53091 4.21818 3.46909 4.21818 3.85749 3.57085L6 0H0L2.14251 3.57084Z"
            fill="#131313"
          />
        </svg>
      </div>
    </div>
  );
}
TextHover.propTypes = {
  text: PropTypes.string,
};
export default TextHover;
