import React, { useEffect, useState } from "react";
import style from "./RecruitmentsCandidate.module.scss";
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
import CustomSearchCandidate from './common/CustomSearchCandidate';
import HeadCandidates from "./common/HeadCandidates";
import CustomKanbanCandidates from "./common/CustomKanbanCandidates";

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
const HourLine = styled('div')(({ fromtop }) => ({
    position: 'absolute',
    width: '100%',
    border: '1px solid #D8D7D7',
    top: `${fromtop}px`,

}));
function RecruitmentsCandidate(props) {
    const {listRecruitmentCandidates}= props;
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
    // useEffect(() => {
    //     dispatch({
    //         type: actionListOfRecruiters.GET_ALL_DATA_RECRUITMENTS,
    //         payload: { ...router.getAll() },
    //     });
    // }, [
    //     router.get(Constants.QueryParam.Limit.VALUE),
    //     router.get(Constants.QueryParam.Offset.VALUE),
    //     router.get(Constants.QueryParam.Page.VALUE),
    //     router.get(Constants.QueryParam.Search.VALUE),
    //     router.get(Constants.QueryParam.Status.VALUE),
    //     router.get(Constants.QueryParam.Position.VALUE),
    //     router.get(Constants.QueryParam.BranchId.VALUE),
    //     router.get(Constants.QueryParam.ProposalId.VALUE),
    //     router.get(Constants.QueryParam.CreatedAt.VALUE),
    //     router.get(Constants.QueryParam.From.VALUE),
    //     router.get(Constants.QueryParam.To.VALUE),
    // ]);
    // const { recruitmentList, isLoading, paging, dataMaster, isLoadingheader } = useSelector(
    //     (state) => state.Recruitment,
    // );
    // const statusOptions = useSelector((state) => state.Recruitment.listStatus);
    // const postionOptions = useSelector((state) => state.Recruitment.listPositions);
    // const provinceOptions = useSelector((state) => state.Recruitment.provinces);
    // const recruitmentProposalslist = useSelector((state) => state.Recruitment.listrecruitmentProposals);
    const [isLoading, setisLoading] = useState(false);
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
    
    const NameTable = Constant.TABLE_SCREEN.RECRUITMENTTABLECANDIDATES.VALUE;
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
                            // isDisabled: !Permission.IsEnabledFunction(Permission.FUNCTIONS.UPDATE_BANNER),
                        });
                        menuAction.push({
                            title: <span style={{ color: '#FF3434' }}>Xoá</span>,
                            icon: <IcRemove />,
                            onClick: () => {
                                handleDelete(props?.data);
                            },
                            // isDisabled: !Permission.IsEnabledFunction(Permission.FUNCTIONS.DELETE_BANNER),
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
    const [showAlternateTable, setShowAlternateTable] = useState(false);
    const handleClickList = () => {
        setShowAlternateTable(!showAlternateTable);
    }
    return (
        <BannerWrapper>
            <Box>
                <CustomSearchCandidate
                    statusOptions={[]}
                    NameTable={NameTable}

                />
            </Box>

            <div style={{ position: "relative" }}>
                <HeadCandidates
                    iconLeft={
                        <p>Danh sách hồ sơ ứng viên</p>
                    }
                    iconRight={
                        <button className={style['btn-reset']} onClick={() => handleClickList()} style={{
                            border: 'none',
                            marginTop: '10px',
                            background: 'none',
                        }}>
                            <div className={style['icon_']}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 1C0.5 0.723858 0.723858 0.5 1 0.5H13C13.2761 0.5 13.5 0.723858 13.5 1C13.5 1.27614 13.2761 1.5 13 1.5H1C0.723858 1.5 0.5 1.27614 0.5 1Z" fill="#138300" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8307 3.522C11.8201 3.51227 11.798 3.5 11.7645 3.5H8.90737C8.87388 3.5 8.85178 3.51227 8.84117 3.522C8.83852 3.52442 8.83688 3.5264 8.83594 3.5277V9.80563C8.83688 9.80693 8.83852 9.80891 8.84117 9.81134C8.85178 9.82106 8.87388 9.83333 8.90737 9.83333H11.7645C11.798 9.83333 11.8201 9.82106 11.8307 9.81134C11.8334 9.80891 11.835 9.80693 11.8359 9.80563V3.5277C11.835 3.5264 11.8334 3.52442 11.8307 3.522ZM11.7645 2.5C12.3144 2.5 12.8359 2.91831 12.8359 3.52381V9.80952C12.8359 10.415 12.3144 10.8333 11.7645 10.8333H8.90737C8.35748 10.8333 7.83594 10.415 7.83594 9.80952L7.83594 3.52381C7.83594 2.91831 8.35748 2.5 8.90737 2.5L11.7645 2.5Z" fill="#138300" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.16332 3.53034C2.16326 3.53033 2.16335 3.52998 2.16374 3.52929L2.16332 3.53034ZM2.16406 3.52876C2.16495 3.52737 2.16675 3.52508 2.17017 3.52193C2.1809 3.51204 2.20272 3.5 2.23549 3.5H5.09263C5.12541 3.5 5.14722 3.51204 5.15796 3.52193C5.16138 3.52508 5.16318 3.52737 5.16406 3.52876V12.4712C5.16318 12.4726 5.16138 12.4749 5.15796 12.4781C5.14722 12.488 5.12541 12.5 5.09263 12.5H2.23549C2.20272 12.5 2.1809 12.488 2.17017 12.4781C2.16675 12.4749 2.16495 12.4726 2.16406 12.4712V3.52876ZM2.16332 12.4697C2.16337 12.4697 2.16356 12.47 2.16374 12.4707L2.16332 12.4697ZM5.1648 12.4697C5.16487 12.4696 5.16479 12.47 5.16438 12.4707L5.1648 12.4697ZM5.16481 3.53034C5.16476 3.53034 5.16456 3.53 5.16438 3.52929L5.16481 3.53034ZM1.16406 3.52632C1.16406 2.92158 1.68327 2.5 2.23549 2.5H5.09263C5.64486 2.5 6.16406 2.92158 6.16406 3.52632V12.4737C6.16406 13.0784 5.64486 13.5 5.09263 13.5H2.23549C1.68327 13.5 1.16406 13.0784 1.16406 12.4737V3.52632Z" fill="#138300" />
                                </svg>
                            </div>

                            <span className={style['text-again']} style={{ marginTop: "5px" }}>{showAlternateTable == false ? 'Kanban' : 'Danh sách'}</span>
                        </button>
                    }
                />
                {showAlternateTable == false ? <WrapLoading
                    Loader={() => {
                        return <ProductTableLoader />;
                    }}
                    loading={isLoading && listRecruitmentCandidates?.length == -1}
                >
                    <Box>
                        <CustomTableV3
                            headerColumn={headCellsData}
                            rowHeight={50}
                            data={listRecruitmentCandidates ?? []}
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
                </WrapLoading> :
                    <WrapLoading
                        Loader={() => {
                            return <ProductTableLoader />;
                        }}
                        loading={isLoading && CandidatesData?.length == -1}
                    >
                        <Box>
                            <CustomKanbanCandidates />
                        </Box>
                    </WrapLoading>


                }

            </div>
            {showAlternateTable == false ?
                <PaginationWrapper>
                    <CustomPagination
                        Total={0} />
                </PaginationWrapper> : ''}
        </BannerWrapper>
    );
}
export default RecruitmentsCandidate;
