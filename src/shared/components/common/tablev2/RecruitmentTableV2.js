import React, { useEffect, useState } from 'react';
import moment from 'moment';
import RouterPath from "router/RouterPath";
import useRouterV2 from 'hooks/use-router-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CustomTable from 'shared/components/common/custom-table/CustomTable';
import WrapLoading from 'shared/components/common/wrap-loading/WrapLoading';
import ProductTableLoader from 'shared/components/common/loading-skeleton/product-table-loader/ProductTableLoader';
import ConfigButton from 'shared/components/common/config-button/ConfigButton';
// import Image from 'shared/components/common/image/Image';
// import { TextLink } from 'shared/components/typography';
// import actionRecruitment from 'redux/recruitment/action';
import IcEdit from 'assets/icon/IcEdit';
import IcRemove from 'assets/icon/IcRemove';
import IconEye from 'shared/components/icons/icon-eye';
// import EventRegister, { EVENT_SHOW_POPUP, EVENT_SHOW_POPUP_CONTENT } from 'utils/EventRegister';
// import PopupName from 'shared/components/common/popup/PopupName';
// import ButtonCommon from 'shared/components/common/button/ButtonCommon';
// import ActionDelete from 'shared/components/common/table/HeaderTable/ActionDelete';
import Constants from "utils/Constants";
import styles from './RecruitmentTableV2.module.scss'
import { TextLink } from 'shared/components/typography';
export default function RecruitmentTableV2({ listRecruitment, isLoading, isShowCheckBox }) {
    const [headCell, setHeadCell] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const router = useRouterV2();
    let [select, setSelect] = useState([]);
    const handleClickDetail = (value) => {
        history.push(RouterPath.getRouteWithId(RouterPath.LISTOFRECRUITERSVIEW_DETAIL, value));
    };

    const columns = [
        {
            label: 'Thành viên',
            field: 'Name',
            id: 'Name',
            minWidth: 150,
            align: 'left',

            isOnclick: true
        },
        {
            label: 'Bộ phận',
            field: 'PositionName',
            id: 'PositionName',
            minWidth: 150,
            align: 'left',
            type: Constants.TYPE_RENDER_TABLE.TEXT,
        },
        {
            label: 'Vị trí',
            field: 'PositionId',
            id: 'PositionId',
            minWidth: 150,
            align: 'left',
        },

    ];
    useEffect(() => {
        let arr = [...columns];
        setHeadCell(arr);
    }, [])
    return <>
        <WrapLoading loading={isLoading && listRecruitment?.length == 0} Loader={() => {
            return <ProductTableLoader />
        }}>
            <CustomTable
                data={listRecruitment}
                rowHeight={60}
                headerColumn={headCell}
                isShowCheckBox={isShowCheckBox}
                selectedCheckBox={select}
                handleOnCheckBox={(data) => {
                    setSelect(data)
                }}
                style={{ width: "100%" }}
                componentHeadCell={<div style={{
                    pointerEvents: 'fill',
                    cursor: 'pointer'
                }}>


                </div>}
            />
        </WrapLoading>
    </>
}
