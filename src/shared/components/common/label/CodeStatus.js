import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextLink from './textLink';
import RouterPath from 'router/RouterPath';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import actionListOfRecruiters from 'redux/listofrecruitment/action';
import ButtonDropdown from 'shared/components/commonV2/buttondropdown/ButtonDropdown';
import IconDropdown from 'assets/images/icons/ic-dropdownn';
import useRouterV2 from 'hooks/use-router-v2';
function CodeStatus(props) {
    const {Options,backgroundColor,style}=props;
    
    const history = useHistory();
    const router = useRouterV2();
    const dispatch = useDispatch();
        
    const onchangeStatus = (e, item) => {
        dispatch({
            type: actionListOfRecruiters.POST_STATUS_DATA,
            payload: {
                data: { Status: e, item }
            },
            
        });
        router.push({
            pathname: RouterPath.RECRUITMENT
        });
    }
    const getStatusText = (e) => {
       return (Options.filter(item => {
            return e === item.value
        }))[0].label
    }
    return (
        <ButtonDropdown className={"_select_input inputs_item"} placeholder={"Trạng thái "} id="status" name="status"
            Options={Options}
            onChange={(e) => { onchangeStatus(e, props.data) }}
            value={props.data.Status}
            style={{
                backgroundColor: backgroundColor ,
                style
            }}
            icon={<IconDropdown />}
            isHover={false}
        >
            <button style={{
                border: "none",
                outline: "none",
                background: "none",
                color: "white",
                fontWeight: "600",
                fontSize: "12px",
                lineHeight: "16px",
                width: "74px",
                height: "16px",
                marginTop: "-6px",
            }}>{getStatusText(props.data.Status)}</button>
        </ButtonDropdown>
    );
}
export default CodeStatus;