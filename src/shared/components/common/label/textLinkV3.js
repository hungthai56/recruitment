import React from 'react';
import PropTypes from 'prop-types';
import { TextLink as Link } from '@findxdn/erp-theme';


function textLinkV3(props) {
    const { children, titlerecruite } = props
    return (
        <div style={{display: 'flex'}}>
            <Link url={`${window.location.origin}${props?.to}`} >{children}</Link>
            <p style={{marginLeft: '5px',}}>{"-"}</p>
            <p style={{marginLeft: '5px',}}>{titlerecruite}</p>
        </div>

    );
}

textLinkV3.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
};

textLinkV3.defaultProps = {
    title: '',
    className: '',
    children: null,
};

export default textLinkV3;
