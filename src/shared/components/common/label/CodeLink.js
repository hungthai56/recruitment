import React from 'react';
import PropTypes from 'prop-types';
import TextLink from './textLink';
import RouterPath from 'router/RouterPath';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
function CodeLink (props) {
  const { path } = props
    const history = useHistory();
    const dispatch = useDispatch();
    const handleClickDetail = (value) => {
        history.push(RouterPath.getRouteWithId(RouterPath.RECRUITMENT_DETAILS, value));
    };
    return (
        <div
            className=" cursor-pointer btn-link text-truncate"
            style={{ ...props?.style, fontSize: 14, color: 'rgb(0, 74, 223)' }}
            title={props?.data?.children}
            onClick={() => handleClickDetail(props?.Id)}
        >
            <TextLink to={RouterPath.getRouteWithId(path, props?.Id)} title={props?.children} children={props?.children} />
        </div>
    );
}
CodeLink.propTypes = {
    path: PropTypes.string
};

CodeLink.defaultProps = {
};
export default CodeLink;