import React, { useEffect, useState } from "react";
import classes from "./RecruitmentsContainer.module.scss";
import { styled } from "@mui/system";
import { Box } from "@findxdn/erp-theme";
import WrapLoading from "shared/components/common/wrap-loading/WrapLoading";
import BoxCommon from "shared/components/common/box/BoxV2";
import CustomSearch from "shared/components/recruitment-proposal/CustomSearch";
import Constants from "utils/Constants";
import action from "redux/recruitment-proposal/action";
import { useDispatch, useSelector } from "react-redux";
import EventRegister, { EVENT_SHOW_POPUP } from "utils/EventRegister";
import CustomPagination from "shared/components/common/pagination/custom-pagination";
import useRouterV2 from "hooks/use-router-v2";
import CustomTable from "shared/components/common/custom-table/CustomTable";
import ActionDelete from "shared/components/common/table/HeaderTable/ActionDelete";
import PopupName from "shared/components/common/popup/PopupName";
import ConfigButton from "shared/components/common/config-button/ConfigButton";
import IcEdit from "assets/icon/IcEdit";
import Permission from "utils/Permission";
import { useHistory } from "react-router";
import ProductTableLoader from "../../components/common/loading-skeleton/product-table-loader/ProductTableLoader";
import Constant from "utils/Constants";
import moment from "moment";
import IcRemove from "assets/icon/IcRemove";
import RouterPath from "router/RouterPath";
import CustomTableV2 from "shared/components/common/custom-table/CustomTableV2";
import CustomTableV3 from "shared/components/common/custom-table/CustomTableV3";
import actionListOfRecruiters from 'redux/listofrecruitment/action';
import CustomSearchFrom from './common/CustomSearchFrom';
const BannerWrapper = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
});
const PaginationWrapper = styled("div")({
    padding: "0 10px",
    backgroundColor: "white",
    borderRadius: " 3px",
});
function RecruitmentsContainerV2() {
    const router = useRouterV2();
    const dispatch = useDispatch();
    const history = useHistory();
    let [headCellsData, setHeadCellsData] = useState([]);
    let [select, setSelect] = useState([]);

    useEffect(() => {
        dispatch({
            type: actionListOfRecruiters.GET_DATA_RECRUITMENTS_MARTER,
            payload: {},
        });
    }, []);
    useEffect(() => {
        dispatch({
            type: actionListOfRecruiters.GET_ALL_DATA_RECRUITMENTS,
            payload: { ...router.getAll() },
        });
    }, [
        router.get(Constants.QueryParam.Limit.VALUE),
        router.get(Constants.QueryParam.Offset.VALUE),
        router.get(Constants.QueryParam.Page.VALUE),
        router.get(Constants.QueryParam.Search.VALUE),
        router.get(Constants.QueryParam.Status.VALUE),
        router.get(Constants.QueryParam.Position.VALUE),
        router.get(Constants.QueryParam.BranchId.VALUE),
        router.get(Constants.QueryParam.ProposalId.VALUE),
        router.get(Constants.QueryParam.CreatedAt.VALUE),
        router.get(Constants.QueryParam.From.VALUE),
        router.get(Constants.QueryParam.To.VALUE),
    ]);
    // useEffect(() => {
    //     dispatch({
    //         type: actionListOfRecruiters.GET_DATA_LIST_RECRUITMENT_PROPOSSAL,
    //         payload: 0,
    //     });
    // }, [])

    const { recruitmentList, isLoading, paging, dataMaster, isLoadingheader } = useSelector(
        (state) => state.Recruitment,
    );
    const statusOptions = useSelector((state) => state.Recruitment.listStatus);
    const postionOptions = useSelector((state) => state.Recruitment.listPositions);
    const provinceOptions = useSelector((state) => state.Recruitment.provinces);
    const recruitmentProposalslist = useSelector((state) => state.Recruitment.listrecruitmentProposals);
    
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
                        type: actionListOfRecruiters.DELETE_RECRUITMENTS_DATA_ALL_ID,
                        payload: select?.map(x => x),
                        callback: {
                            success: () => {
                                setSelect([])
                                _props?.closeLoading()
                                router.push({ pathname: RouterPath.RECRUITMENT })
                            },
                            
                            
                        }
                    });
                },
            },
        });
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
                            router.push({
                                pathname: RouterPath.RECRUITMENT
                            });
                        };
                        dispatch({
                            type: actionListOfRecruiters.DELETE_RECRUITMENTS_DATA,
                            payload: { callback, data: [data?.Id?.toString()] },
                            callback: {
                                failed: () => {
                                    _props?.closeLoading();
                                  
                                }
                            }

                        });
                    }
                }
            },
        });
    }

    const NameTable = 'SRC0900601'
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
                        });
                        menuAction.push({
                            title: <span style={{ color: '#FF3434' }}>Xoá</span>,
                            icon: <IcRemove />,
                            onClick: () => {
                                handleDelete(props?.data);
                            },
                         });
                        return <ConfigButton menuList={menuAction} />;
                    },
                });

                setHeadCellsData(arr);
            }
        }
    }, [SettingTable])

    const handleClickUpdate = (value) => {
        history.push(RouterPath.getRouteWithId(RouterPath.RECRUITMENT_UPDATES, value));
    };
    return (
        <BannerWrapper>
            <Box>
                <CustomSearchFrom
                    statusOptions={statusOptions}
                    postionOptions={postionOptions}
                    Province={provinceOptions}
                    optionsRecruitmentProposals={[recruitmentProposalslist]}
                    NameTable={NameTable}

                />
            </Box>
            <WrapLoading
                Loader={() => {
                    return <ProductTableLoader />;
                }}
                loading={isLoading && recruitmentList?.length == -1}
            >
                <Box>
                    <CustomTableV3
                        headerColumn={headCellsData}
                        rowHeight={50} 
                        data={recruitmentList ?? []}
                        isShowCheckBox
                        isScrollWindow
                        selectedCheckBox={select}
                        handleOnCheckBox={(data) => {
                            setSelect(data);
                        }}
                        componentHeadCell={
                            <div
                                style={{
                                    pointerEvents: "fill",
                                    cursor: "pointer",
                                }}
                            >
                                <ActionDelete onClick={handleDeleteAll} />
                            </div>
                        }
                    />
                </Box>
            </WrapLoading>
            <PaginationWrapper>
                <CustomPagination
                    Total={paging?.TotalRecord}/>
            </PaginationWrapper>
        </BannerWrapper>
    );
}
export default RecruitmentsContainerV2;
