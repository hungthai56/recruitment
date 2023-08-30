import React from 'react';
import PropTypes from 'prop-types';
import { TextLink as Link } from '@findxdn/erp-theme';
import styles from './textLinkV2.module.scss'

function textLinkV2 (props) {
    const { children } = props
    return (
        <Link url={`${window.location.origin}${props?.to}`} className={styles['coloers']} >{children}</Link>
    );
}

textLinkV2.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
};

textLinkV2.defaultProps = {
    title: '',
    className: '',
    children: null,
};

export default textLinkV2;
