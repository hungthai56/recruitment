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
import styles from './RecruitmentTableV1.module.scss'
import { TextLink } from 'shared/components/typography';
import ButtonDropdown from 'shared/components/commonV2/buttondropdown/ButtonDropdown';
import IconDropdown from 'assets/images/icons/ic-dropdownn';
import EventRegister, { EVENT_SHOW_POPUP, EVENT_SHOW_POPUP_CONTENT } from 'utils/EventRegister';
import Permission from 'utils/Permission';
export default function RecruitmentTable({ listRecruitment, isLoading, statusOptions }) {
    const [headCell, setHeadCell] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const router = useRouterV2();
    let [select, setSelect] = useState([]);
    
    const [Position, SetPosition] = useState([]);
    useEffect(() => {
        if (Array.isArray(statusOptions)) {
            SetPosition(statusOptions)
        }
    }, [statusOptions])
    const handleClickUpdate = (value) => {
        history.push(RouterPath.getRouteWithId(RouterPath.RECRUITMENT_UPDATES, value));
    };
    
     const handleDelete = (data) => {
        const message = "Bạn có chắc chắn muốn xoá dữ liệu này không ?"
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: PopupName.DELETE_POPUP,
            open: true,
            payload: {
                data: data,
                message,
                isLoading: true,
                callback: {
                    success: (_props) => {
                        const callback = () => {
                            _props?.closeLoading()
                            dispatch({
                                type: actionListOfRecruiters.GET_ALL_DATA_RECRUITMENTS,
                                payload: { ...router.getAll() },
                            });
                        };
                        dispatch({
                            type: actionListOfRecruiters.DELETE_RECRUITMENTS_DATA,
                            payload: { callback, data: [data?.Id?.toString()] },
                            callback: {
                                failed: () => {
                                    _props?.closeLoading()
                                }
                            }
                        });
                    }
                }
            },
        });
    }
    // const NameTable = Constants.TABLE_SCREEN.RECRUITMENT.VALUE;
    const NameTable ='SRC0900601'
    const SettingTable = useSelector(state => state.TableConfig);
    useEffect(() => {
        if (SettingTable?.template) {
            let data = SettingTable?.template?.find(x => x?.Key == NameTable);
           
            if (data) {
                let arr = [...data.HeadCell];
                arr.push({
                    id: 'Action',
                    numeric: '2',
                    disablePadding: false,
                    label: 'Tác vụ',
                    minWidth: 130,
                    code: '10',
                    field: 'Edit',
                    align: 'center',
                    sort: false,
                    cursorPointer: true,
                    component: (props) => {
                        let menuAction = [];
                        menuAction.push({
                            title: <span style={{ color: '#138300' }}>Sửa</span>,
                            icon: <IcEdit />,
                            onClick: () => {
                                handleClickUpdate(props?.data?.Id);
                            },
                            isDisabled: !Permission.IsEnabledFunction(Permission.FUNCTIONS.UPDATE_BANNER),
                        });
                        menuAction.push({
                            title: <span style={{ color: '#FF3434' }}>Xoá</span>,
                            icon: <IcRemove />,
                            onClick: () => {
                                handleDelete(props?.data);
                            },
                            isDisabled: !Permission.IsEnabledFunction(Permission.FUNCTIONS.DELETE_BANNER),
                        });
                        return <ConfigButton menuList={menuAction} />;
                    },
                });

                setHeadCell(arr);
            }
        }
    }, [SettingTable])

    const handleDeleteAll = () => {
        const message = "Bạn có chắn chắc xoá dữ liệu này không ?";
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: PopupName.DELETE_POPUP,
            open: true,
            payload: {
                data: {
                    Id: select?.join(",")
                },
                message,
                handleSave: () => {
                    dispatch({
                        type: actionRecruitment.DELETE_RECRUITMENT,
                        payload: select?.map(x => x),
                        callback: {
                            success: () => {
                                setSelect([])
                                _props?.closeLoading()
                                router.push({ pathname: RouterPath.RECRUITMENT })
                            },
                            failed: () => {
                                _props?.closeLoading()
                            },
                        }
                    });
                },
            },
        });
    }

    return <>
        <WrapLoading loading={isLoading && listRecruitment?.length == 0} Loader={() => {
            return <ProductTableLoader />
        }}>
            <CustomTable
                data={listRecruitment}
                rowHeight={60}
                headerColumn={headCell}
                isShowCheckBox
                selectedCheckBox={select}
                handleOnCheckBox={(data) => {
                    setSelect(data)
                }}
                componentHeadCell={<div style={{
                    pointerEvents: 'fill',
                    cursor: 'pointer'
                }}>
                    <ActionDelete onClick={handleDeleteAll} />
                </div>}
            />
        </WrapLoading>
    </>
}
