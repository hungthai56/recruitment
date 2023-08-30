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
import actionListOfRecruiters from 'redux/listofrecruitment/action';
import IcEdit from 'assets/icon/IcEdit';
import IcRemove from 'assets/icon/IcRemove';
import IconEye from 'shared/components/icons/icon-eye';
// import EventRegister, { EVENT_SHOW_POPUP, EVENT_SHOW_POPUP_CONTENT } from 'utils/EventRegister';
import PopupName from 'shared/components/common/popup/PopupName';
// import ButtonCommon from 'shared/components/common/button/ButtonCommon';
import ActionDelete from 'shared/components/common/table/HeaderTable/ActionDelete';
import Constants from "utils/Constants";
// import styles from './InterviewScheduleTable.module.scss'
import { TextLink } from 'shared/components/typography';
import ButtonDropdown from 'shared/components/commonV2/buttondropdown/ButtonDropdown';
import IconDropdown from 'assets/images/icons/ic-dropdownn';
import EventRegister, { EVENT_SHOW_POPUP, EVENT_SHOW_POPUP_CONTENT } from 'utils/EventRegister';
// import SchedulerHead from './SchedulerHead';
// import style from './FromCanlenderCommon.module.scss';
import { styled } from '@mui/system';
import Image from "shared/components/common/image/Image"
export default function TablePopop({ listCondidates, isLoading }) {
    
    const [headCell, setHeadCell] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const router = useRouterV2();
    let [select, setSelect] = useState([]);
    // const handleClickDetail = (value) => {
    //     history.push(RouterPath.getRouteWithId(RouterPath.INTERVIEWSCHEDULELIST_DETAIL, value));
    // };
    
    const [Options, setOptions] = useState([
        { label: "Hiển thị", value: 1 },
        { label: "Ẩn", value: 2 },

    ]);

    // const handleClickUpdate = (value) => {
    //     history.push(RouterPath.getRouteWithId(RouterPath.RECRUITERSVIEW_UPDATE, value));
    // };
    
    const columns = [
        {
            label: 'Mã',
            field: 'Code',
            id: 'Code',
            minWidth: 100,
            align: 'left',
            
            isOnclick: true
        },
        {
            label: 'Ảnh',
            field: 'Avatar',
            id: 'Avatar',
            minWidth: 100,
            align: 'center',
            type: Constants.TYPE_RENDER_TABLE.TEXT,
            component: (props) => {
                return <div style={{
                    width: '152px',
                    height: 60
                }}>
                    { <Image width={152} height={60} src={props?.data.Avatar} />}
                </div>
            }
           
        },
        {
            label: 'Tên ứng viên',
            field: 'CandidateName',
            id: 'CandidateName',
            minWidth: 100,
            align: 'left',
            
        },
        {
            label: 'Điện thoại ',
            field: 'Phone',
            id: 'Phone',
            minWidth: 100,
            align: 'left',
            
        },
        {
            label: 'Email',
            field: 'Email',
            id: 'Email',
            minWidth: 100,
            align: 'left',
        },
        {
            label: 'Trạng thái',
            field: 'Status',
            id: 'Status',
            minWidth: 100,
            align: 'right',
            component: (props) => {
                return props?.data?.Status == 10 ? 'Ứng tuyển' : 'Phỏng vấn'
            }
        },
        {
            label: 'Giờ hẹn',
            field: 'Quantity',
            id: 'Quantity',
            minWidth: 100,
            align: 'right',
            component: (props) => {
                return <div  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}> {moment(props?.data?.TimeStart).format('hh:mm')}
                </div>
            }

        },
        {
            label: 'CV ứng viên',
            field: 'CreatedAt',
            id: 'CreatedAt',
            minWidth: 100,
            align: 'center',
           
        },
        
    ];

    // const handleDelete = (data) => {
    //     const message = "Bạn có chắc chắn muốn xoá dữ liệu này không ?"
    //     EventRegister.emit(EVENT_SHOW_POPUP, {
    //         type: PopupName.DELETE_POPUP,
    //         open: true,
    //         payload: {
    //             data: data,
    //             message,
    //             isLoading: true,
    //             callback: {
    //                 success: (_props) => {
    //                     const callback = () => {
    //                         _props?.closeLoading()
    //                         dispatch({
    //                             type: actionListOfRecruiters.GET_ALL_DATA_RECRUITERS,
    //                             payload: { ...router.getAll() },
    //                         });
    //                     };
    //                     dispatch({
    //                         type: actionListOfRecruiters.DELETE_RECRUITMENTS_DATA,
    //                         payload: { callback, data: [data?.Id?.toString()] },
    //                         callback: {
    //                             failed: () => {
    //                                 _props?.closeLoading()
    //                             }
    //                         }
    //                     });
    //                 }
    //             }
    //         },
    //     });
    // }

    useEffect(() => {
        let arr = [...columns];
        // arr.push({
        //     id: 'Action',
        //     numeric: '2',
        //     disablePadding: false,
        //     label: 'Tác vụ',
        //     minWidth: 130,
        //     code: '10',
        //     field: 'Edit',
        //     align: 'center',
        //     sort: false,
        //     cursorPointer: true,
        //     component: (props) => {
        //         let menuAction = [];
        //         menuAction.push({
        //             title: <span style={{ color: '#138300' }}>Sửa</span>,
        //             icon: <IcEdit />,
        //             onClick: () => {
        //                 handleClickUpdate(props?.data?.Id);
        //             },
        //         });
                
        //         return <ConfigButton menuList={menuAction} />;
        //     },
        // });

        setHeadCell(arr);
    }, [])

    // const handleDeleteAll = () => {
    //     const message = "Bạn có chắn chắc xoá dữ liệu này không ?";
    //     EventRegister.emit(EVENT_SHOW_POPUP, {
    //         type: PopupName.DELETE_POPUP,
    //         open: true,
    //         payload: {
    //             data: {
    //                 Id: select?.join(",")
    //             },
    //             message,
    //             handleSave: () => {
    //                 dispatch({
    //                     type: actionRecruitment.DELETE_RECRUITMENT,
    //                     payload: select?.map(x => x),
    //                     callback: {
    //                         success: () => {
    //                             setSelect([])
    //                             _props?.closeLoading()
    //                             router.push({ pathname: RouterPath.RECRUITMENT })
    //                         },
    //                         failed: () => {
    //                             _props?.closeLoading()
    //                         },
    //                     }
    //                 });
    //             },
    //         },
    //     });
    // }

    const HourLine = styled('div')(({ fromtop }) => ({
        position: 'absolute',
        width: '100%',
        border: '1px solid #D8D7D7',
        top: `${fromtop}px`,

    }));
    const handleClickList = () => {
        history.push(RouterPath.INTERVIEWSCHEDULE);
    };

    return <>
       
            <WrapLoading loading={isLoading && listCondidates?.length == 0} Loader={() => {
                return <ProductTableLoader />
            }}>
                <CustomTable
                    data={listCondidates}
                    rowHeight={60}
                    headerColumn={headCell}
                    isShowCheckBox
                    selectedCheckBox={select}
                    handleOnCheckBox={(data) => {
                        setSelect(data)
                    }}
                    style={{ marginTop: "15px" }}
                    componentHeadCell={<div style={{
                        pointerEvents: 'fill',
                        cursor: 'pointer'
                    }}>

                        {/* <ActionDelete onClick={handleDeleteAll} /> */}
                    </div>}
                />
            </WrapLoading>
     
    </>
}
