import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useParams, useRouteMatch } from 'react-router';
import useRouter from 'hooks/use-router';
import style from './RecruitmentsDetailContainer.module.scss';
import Constants from 'utils/Constants';
import TabTable from 'shared/components/common/tab-table/TabTable';
import TabTableV2 from 'shared/components/common/tab-table/TabTableV2';
import useRouterV2 from 'hooks/use-router-v2';
import SelectionCommitteeDetail from './common/SelectionCommitteeDetail';
import Popover from 'shared/components/commonV2/popover/Popover';
import actionListOfRecruiters from 'redux/listofrecruitment/action';
import entries from 'lodash/entries';
import IcDropDown from 'assets/icon/Icon-Drop';
import FormTagsInput from 'shared/components/common/custom-form/FormTagsInput';
import { forEach } from 'lodash';
import { styled } from '@mui/system';
import BoxV3 from 'shared/components/common/box/BoxV3';
import moment from 'moment';
import Image from 'material-ui-image';
import FooterManage from 'shared/components/footer/FooterManage';
import FooterManageV2 from 'shared/components/footer/FooterManageV2';
import ButtonCommon from 'shared/components/common/button/ButtonCommon';
import LoadingButton from 'shared/components/common/button-loading/ButtonLoading';
import RecruitmentTable from 'shared/components/common/tablev2/RecruitmentTableV1';
import RecruitmentTableV2 from 'shared/components/common/tablev2/RecruitmentTableV2';
import Box from 'shared/components/common/box/Box';
import RouterPath from 'router/RouterPath';
import FormTextArea from 'shared/components/common/custom-form/FormTextArea';
import EventRegister, { EVENT_SHOW_POPUP, EVENT_SHOW_POPUP_CONTENT, EVENT_SHOW_POPUP2 } from 'utils/EventRegister';
import PopupName from 'shared/components/common/popup/PopupName';
import CodeLink from "shared/components/common/label/CodeLink";
import CodeLinkV2 from "shared/components/common/label/CodeLinkV2";
import RecruitmentsCandidate from './RecruitmentsCandidate';
import {
    convertToCurrency,
    convertToCurrencyDot,
    getValueCurrency,
    setValueCurrency,
} from "utils/Helper";
function RecruitmentsDetailContainer(props) {
    const [value, setValue] = React.useState(0);
    const router = useRouterV2();
    const TabScreen = [
        {
            id: Constants.TEXT_RECRUITER.STATUS_EMPLOYMENT_INFORMATION.VALUE,
            type: Constants.TEXT_RECRUITER.STATUS_EMPLOYMENT_INFORMATION.VALUE,
            text: Constants.TEXT_RECRUITER.STATUS_EMPLOYMENT_INFORMATION.NAME,
        },
        {
            id: Constants.TEXT_RECRUITER.WOMANRECRUITMENTCOUNCIL.VALUE,
            type: Constants.TEXT_RECRUITER.WOMANRECRUITMENTCOUNCIL.VALUE,
            text: Constants.TEXT_RECRUITER.WOMANRECRUITMENTCOUNCIL.NAME,
        },
        {
            id: Constants.TEXT_RECRUITER.FORMOFAPPLICATIONFORWOMAN.VALUE,
            type: Constants.TEXT_RECRUITER.FORMOFAPPLICATIONFORWOMAN.VALUE,
            text: Constants.TEXT_RECRUITER.FORMOFAPPLICATIONFORWOMAN.NAME,
        }

    ];
    const handleChange = (newValue) => {
        if (newValue != -1) {
            setValue(Number(newValue));

        }
    };
    const [Optionss, setOptionss] = useState([
        { label: "Hiển thị", value: 1 },
        { label: "Ẩn", value: 2 },
    ]);

    //////
    const DetailWrapper = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '30px',
        minWidth: '770px',
    });

    const FormInputWrapper = styled('div')({
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
    });

    const DetailItemWrapper = styled('div')({
        display: 'flex',
        gap: '8px',
        width: '50%',
    });

    const FormButtonWrapper = styled('div')({
        display: 'flex',
        gap: '15px',
        justifyContent: 'flex-end',
    });

    const DetailLabel = styled('p')({
        width: '200px',
        color: '#707070',
    });

    const DetailContent = styled('p')({
        width: 'calc(100% - 220px)',
        whiteSpace: 'pre-wrap'
    });

    const ImageWrapper = styled('div')({
        // width: '33%',
        // display: 'flex',
        // flexDirection: 'column',
        // gap: '10px',
        display: 'flex',
        width: '560px',
        height: '292px',
        padding: '8px 20px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        // border: '1px solid #757575',
        borderRadius: '3px',
        background: 'var(--neutral-1-f-6, #F6F6F6)',
    });

    const DetailRow = styled('div')({
        width: '100%',
        display: '-webkit-inline-box',
        flexDirection: 'column',
        gap: '10px',
    });

    const history = useHistory();
    const methods = useForm();
    const { id } = useParams();
    const [canSubmit, setCanSubmit] = useState(true);
    const [valueTab, setValueTab] = useState(1);
    const { recruitment, isLoading, paging, listRecruitmentCouncils, listRecruitmentCandidates } = useSelector(
        (state) => state.Recruitment,
    );
    const [contactInfoObject, setcontactInfoObject] = useState({});
    const [SalaryFrom, setSalaryFrom] = useState(0);
    const [SalaryTo, setSalaryTo] = useState(0);
    useEffect(() => {
        if (recruitment) {
            const contactInfo = recruitment.ContactInfo;

            if (contactInfo !== null && contactInfo !== undefined) {
                try {
                    const contactInfoObject = JSON.parse(contactInfo);
                    setcontactInfoObject(contactInfoObject);
                } catch (error) {
                    console.error("Error parsing ContactInfo:", error);
                    setcontactInfoObject({});
                }
            } else {
                setcontactInfoObject({});
            }

            const SalaryFrom = recruitment.SalaryFrom;
            setSalaryFrom(SalaryFrom ? SalaryFrom : 0);
            const SalaryTo = recruitment.SalaryTo;
            setSalaryTo(SalaryTo ? SalaryTo : 0);
        }
    }, [recruitment])

    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            dispatch({
                type: actionListOfRecruiters.GET_DATA_RECRUITMENTS_DETAIL,
                payload: id
            });
        }
    }, [id])
    const handleMoveUpdate = (id) => {
        router.push({
            pathname: RouterPath.getRouteWithId(RouterPath.RECRUITMENT_UPDATES, id)
        })
    }
    const [Province, SetProvince] = useState("");
    const provincedetail = recruitment?.BranchName;
    useEffect(() => {
        const provincelist = entries({ provincedetail }).map(({ value }) => ({
            label: value,
        }))
        SetProvince(provincelist)
    }, [provincedetail])
    const onchangeStatus = (e) => {
        dispatch({
            type: actionListOfRecruiters.POST_STATUS_DATA_ID,
            payload: {
                data: { Status: e, recruitment, Id: id }
            },
            callback: (payload) => {
                dispatch({
                    type: actionListOfRecruiters.GET_DATA_RECRUITMENTS_DETAIL,
                    payload: id
                });
            },
        });



    }
    const [Colums, setColums] = useState([
        {
            title: 'Mã bài đăng',
            dataIndex: 'postcode',
            style: {
                textAlign: "center"
            },
            render: (text, record) => {
                return <span style={{ marginTop: "3px" }}>{text}</span>
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            style: {
                textAlign: "left"
            },
        },
        {
            title: 'Đề xuất',
            dataIndex: 'propose',
            style: {
                textAlign: "left"
            }
        },
    ]);
    const handleCancel = () => {
        router.push({ pathname: RouterPath.RECRUITMENT })
    }
    const handleDelete = (data) => {
        const message = "Bạn có chắc chắn muốn xoá dữ liệu này không?";
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
                            _props?.closeLoading();
                            router.push({
                                pathname: RouterPath.getRouteWithId(RouterPath.RECRUITMENT),
                            });
                        };
                        dispatch({
                            type: actionListOfRecruiters.DELETE_RECRUITMENTS_DATA_DETAIL_ID,
                            payload: { callback, data: [data?.Id?.toString()] },
                            callback: (id) => {
                                router.push({
                                    pathname: RouterPath.getRouteWithId(
                                        RouterPath.RECRUITMENT
                                    ),
                                });
                            },
                        });
                    },
                },
            },
        });
    }
    const handleClickDetail = (value) => {
        history.push(RouterPath.getRouteWithId(RouterPath.RECRUITMENT_PROPOSAL_DETAIL, value));
    };
    return <div className={style['Detailrecruiters']}>
        <TabTableV2
            marginTop={false}
            handleChange={handleChange}
            value={Number(value)}
            tabTable={TabScreen}
            numberValue={20}
            iconRight={
                <div className={`${style["Search"]} ${style["stand_radius"]}`} id={style["search_chitiet"]} >
                    <div className={style['inputs_chitiet']}>
                        <Popover
                            title={""}
                            body={
                                <div className={style['btn-chitiet']} style={{ display: "flex", flexDirection: "column" }}>
                                    {Optionss && Optionss.map((item, idel) => {
                                        let textAlign = item.value === 1 ? style["text-success"] : style["text-danger"];
                                        return <button className={style['btn-status-chitiet']} onClick={() => {
                                            onchangeStatus(item.value)
                                        }}>
                                            <span className={textAlign}>{item.label}</span>

                                        </button>

                                    })}

                                </div>
                            }
                            style={{ width: "95px", height: "auto", }}
                        >
                            <button className={style['btn-reset-chitiet']}>

                                <div className={style['icon_']}>
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Icon &#196;&#145;&#225;&#187;&#149;i l&#225;&#186;&#161;i">
                                            <path id="Ellipse 1642 (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M8.50013 2.5C6.64214 2.5 4.99863 3.42125 4.00256 4.83333H5.1668C5.44294 4.83333 5.6668 5.05719 5.6668 5.33333C5.6668 5.60948 5.44294 5.83333 5.1668 5.83333H3.12381C2.90501 5.83333 2.71162 5.69107 2.64648 5.48218L2.0228 3.48218C1.9406 3.21856 2.08766 2.93821 2.35128 2.856C2.6149 2.7738 2.89526 2.92086 2.97746 3.18448L3.27381 4.13479C4.45755 2.53683 6.35744 1.5 8.50013 1.5C11.053 1.5 13.2612 2.97177 14.3242 5.11082C14.4471 5.35811 14.3463 5.6582 14.099 5.78109C13.8517 5.90398 13.5516 5.80314 13.4287 5.55585C12.5281 3.74365 10.6589 2.5 8.50013 2.5ZM2.9013 10.2189C3.14859 10.096 3.44868 10.1969 3.57157 10.4442C4.47216 12.2564 6.34137 13.5 8.50013 13.5C10.3581 13.5 12.0016 12.5788 12.9977 11.1667H11.8335C11.5573 11.1667 11.3335 10.9428 11.3335 10.6667C11.3335 10.3905 11.5573 10.1667 11.8335 10.1667H13.8765C14.0953 10.1667 14.2886 10.3089 14.3538 10.5178L14.9775 12.5178C15.0597 12.7814 14.9126 13.0618 14.649 13.144C14.3854 13.2262 14.105 13.0791 14.0228 12.8155L13.7265 11.8652C12.5427 13.4632 10.6428 14.5 8.50013 14.5C5.94727 14.5 3.73907 13.0282 2.67606 10.8892C2.55316 10.6419 2.65401 10.3418 2.9013 10.2189Z" fill="#138300" />
                                        </g>
                                    </svg>
                                </div>

                                <span className={style['text-again']} style={{ marginTop: "5px" }}>Trạng Thái</span>
                            </button>

                        </Popover>
                    </div>
                </div>

            }

        />
        {value === 0 && <>

            <BoxV3 className={`${style['box-container']}`} boxTitle="Thông tin tuyển dụng" icon={<IcDropDown />}>
                <FormInputWrapper>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Đề xuất tuyển dụng</DetailLabel>
                            <p>:</p>
                            <DetailContent onClick={() => handleClickDetail(recruitment?.RecruitmentProposalId)}><CodeLinkV2 path={RouterPath.RECRUITMENT_PROPOSAL_DETAIL} Id={recruitment?.RecruitmentProposalId} {...recruitment} /> </DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Hình thức làm việc</DetailLabel>
                            <p>:</p>
                            <DetailContent>  {recruitment?.WorkType?.map((workType) => {
                                return workType === 1
                                    ? 'Toàn thời gian'
                                    : workType === 2
                                        ? 'Bán thời gian'
                                        : 'Thời vụ';
                            }).join(', ')}</DetailContent>

                        </DetailItemWrapper>
                    </DetailRow>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Mã bài đăng</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.Code}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Người tạo</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.CreatedByName}-{recruitment?.EmployeeCode}</DetailContent>
                        </DetailItemWrapper>
                    </DetailRow>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Bộ phận</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.DepartmentName}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Ngày tạo</DetailLabel>
                            <p>:</p>
                            <DetailContent>{moment(recruitment?.CreatedAt || '').format("DD/MM/YYYY hh:mm")}</DetailContent>
                        </DetailItemWrapper>
                    </DetailRow>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Tiêu đề tuyển dụng</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.Title}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Trạng thái</DetailLabel>
                            <p>:</p>
                            {/* <DetailContent>{recruitment?.Status == 1 ? 'Hiển thị' : 'Ẩn'}</DetailContent> */}
                            <p style={{
                                color: recruitment?.Status === 1 ? "#008A5A" : "#F85555", fontFamily: "Roboto",
                                fontSize: "14px", fontWeight: "600", letterSpacing: "0.168px"
                            }}>{recruitment?.Status == 1 ? 'Hiển thị' : 'Ẩn'}</p>
                        </DetailItemWrapper>
                    </DetailRow>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Vị trí tuyển dụng</DetailLabel>
                            <p>:</p>
                            <DetailContent>{(recruitment?.PositionName)?.join(', ')}</DetailContent>
                        </DetailItemWrapper>

                    </DetailRow>
                    <DetailRow>
                        <DetailLabel>Địa chỉ làm việc</DetailLabel>
                        <p>:</p>
                        <DetailContent>{(recruitment?.BrancheNames)?.join('/ ')}</DetailContent>
                    </DetailRow>
                </FormInputWrapper>
            </BoxV3>
            <BoxV3 className={`${style['box-container']}`} boxTitle="Kế hoạch tuyển" icon={<IcDropDown />}>
                <FormInputWrapper>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Giới tính cần tuyển</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.Gender == "M" ? "Nam" : "Nữ"}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Từ ngày</DetailLabel>
                            <p>:</p>
                            <DetailContent>{moment(recruitment?.From || '').format("DD/MM/YYYY")}</DetailContent>
                        </DetailItemWrapper>
                    </DetailRow>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Số lượng</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.Quantity}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Hạn cuối</DetailLabel>
                            <p>:</p>
                            <DetailContent>{moment(recruitment?.To || '').format("DD/MM/YYYY")}</DetailContent>
                        </DetailItemWrapper>
                    </DetailRow>
                </FormInputWrapper>
            </BoxV3>
            <BoxV3 className={`${style['box-container']}`} boxTitle="Mức lương" icon={<IcDropDown />}>
                <FormInputWrapper>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Mức lương từ</DetailLabel>
                            <p>:</p>
                            <DetailContent>{convertToCurrencyDot(SalaryFrom)}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Loại tiền</DetailLabel>
                            <p>:</p>
                            <DetailContent>VND</DetailContent>
                        </DetailItemWrapper>
                    </DetailRow>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Mức lương đến</DetailLabel>
                            <p>:</p>
                            <DetailContent>{convertToCurrencyDot(SalaryTo)}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Hiển thị trên web</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.ShowTypeSalary === 1
                                ? 'Chi tiết mức lương' : recruitment?.ShowTypeSalary === 2
                                    ? 'Thỏa thuận' : recruitment?.ShowTypeSalary === 3 ? 'Từ' : 'Up to...'}</DetailContent>
                        </DetailItemWrapper>
                    </DetailRow>
                </FormInputWrapper>
            </BoxV3>
            <BoxV3 className={`${style['box-container']}`} boxTitle="Thông tin liên hệ" icon={<IcDropDown />}>
                <FormInputWrapper>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Người liên hệ</DetailLabel>
                            <p>:</p>
                            <DetailContent>{contactInfoObject?.Contact}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Email</DetailLabel>
                            <p>:</p>
                            <DetailContent>{contactInfoObject?.Email}</DetailContent>
                        </DetailItemWrapper>
                    </DetailRow>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Số điện thoại </DetailLabel>
                            <p>:</p>
                            <DetailContent> {contactInfoObject?.Phonenumber}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Fanpage Facebook</DetailLabel>
                            <p>:</p>
                            <DetailContent>{contactInfoObject?.Fanpagefacebook}</DetailContent>
                        </DetailItemWrapper>
                    </DetailRow>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Địa chỉ liên hệ</DetailLabel>
                            <p>:</p>
                            <DetailContent>{contactInfoObject?.Addressnew}</DetailContent>
                        </DetailItemWrapper>

                    </DetailRow>
                </FormInputWrapper>
            </BoxV3>
            <BoxV3 className={`${style['box-container']}`} boxTitle="Mô tả công việc" icon={<IcDropDown />}>
                <FormInputWrapper>
                    <DetailRow>
                        <ImageWrapper>
                            <Image
                                style={{ paddingTop: 0 }}
                                imageStyle={{
                                    width: '332px',
                                    height: '278px',
                                    flexShrink: '0',
                                    position: 'unset',
                                    borderRadius: '5px',

                                }}
                                src={recruitment?.Image}
                            />
                        </ImageWrapper>
                    </DetailRow>
                    <DetailRow><DetailContent dangerouslySetInnerHTML={{ __html: recruitment?.Descriptions }}></DetailContent></DetailRow>
                </FormInputWrapper>
            </BoxV3>
            <BoxV3 className={`${style['box-container']}`} boxTitle="Yêu cầu công việc" icon={<IcDropDown />}>
                <FormInputWrapper>
                    <DetailRow>

                        <DetailContent dangerouslySetInnerHTML={{ __html: recruitment?.Requirements }}></DetailContent>
                    </DetailRow>
                </FormInputWrapper>
            </BoxV3>
            <BoxV3 className={`${style['box-container']}`} boxTitle="Quyền lợi/chế độ" icon={<IcDropDown />}>
                <FormInputWrapper>
                    <DetailRow>

                        <DetailContent dangerouslySetInnerHTML={{ __html: recruitment?.Benefit }}></DetailContent>
                    </DetailRow>
                </FormInputWrapper>
            </BoxV3>
            <BoxV3 className={`${style['box-container']}`} boxTitle="Hồ sơ yêu cầu" icon={<IcDropDown />}>
                <FormInputWrapper>
                    <DetailRow>

                        <DetailContent dangerouslySetInnerHTML={{ __html: recruitment?.Cv }}></DetailContent>
                    </DetailRow>
                </FormInputWrapper>
            </BoxV3>
            <BoxV3 className={`${style['box-container']}`} boxTitle="Onine" icon={<IcDropDown />}>
                <FormInputWrapper>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Slug</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.Slug}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Meta description</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.MetaDescriptions}</DetailContent>
                        </DetailItemWrapper>
                    </DetailRow>
                    <DetailRow>
                        <DetailItemWrapper>
                            <DetailLabel>Meta title</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.MetaTitle}</DetailContent>
                        </DetailItemWrapper>
                        <DetailItemWrapper>
                            <DetailLabel>Meta keyword</DetailLabel>
                            <p>:</p>
                            <DetailContent>{recruitment?.MetaKeyword}</DetailContent>
                        </DetailItemWrapper>
                    </DetailRow>
                </FormInputWrapper>
            </BoxV3>
        </>}
        {value === 30 && <>
            <Box className={`${style['box-container']}`} boxTitle="Hội đồng tuyển dụng">
                <FormInputWrapper>
                    <RecruitmentTableV2
                        listRecruitment={listRecruitmentCouncils}
                        isLoading={isLoading}
                        isShowCheckBox={false}
                    />
                </FormInputWrapper>
            </Box>
        </>}

        {value != 20 ? <FooterManageV2
            titleBack={'Quay lại '}
            back={true}
            routerPath={RouterPath.RECRUITMENT}
        >
            <div className="d-flex justify-content-end align-items-center">
                <ButtonCommon
                    loading={isLoading}
                    disabled={!canSubmit}
                    className='mr-3'
                    type='button' onClick={() => handleDelete(recruitment)}
                    typeColor='border-red'>
                    Xóa
                </ButtonCommon>
                <LoadingButton
                    loading={isLoading}
                    disabled={!canSubmit}
                    onClick={() => handleMoveUpdate(recruitment?.Id)}
                    type='button'>
                    Sửa
                </LoadingButton>
            </div>
        </FooterManageV2> : ''}

        {value === 20 && <><RecruitmentsCandidate listRecruitmentCandidates={listRecruitmentCandidates} /></>}
    </div>
}
export default RecruitmentsDetailContainer;