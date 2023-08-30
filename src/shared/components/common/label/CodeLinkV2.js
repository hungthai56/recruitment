import React from 'react';
import PropTypes from 'prop-types';
import TextLinkV3 from './textLinkV3';
import RouterPath from 'router/RouterPath';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
function CodeLinkV2(props) {
    const { path } = props
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <TextLinkV3 to={RouterPath.getRouteWithId(path, props?.RecruitmentProposalId)} title={props?.RecruitmentProposalCode} children={props?.RecruitmentProposalCode} titlerecruite={props?.RecruitmentProposalTitle} />
    );
}
CodeLinkV2.propTypes = {
    path: PropTypes.string
};

CodeLinkV2.defaultProps = {
};
export default CodeLinkV2;