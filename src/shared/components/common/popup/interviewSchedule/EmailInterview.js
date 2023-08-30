import HeadCommonPopup from '../component/HeadCommonPopup';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import { Button } from '@findxdn/erp-theme';
import LoadingButton from '../../button-loading/ButtonLoading';
import BoxV3 from 'shared/components/common/box/BoxV3';
import style from './EmailInterview.module.scss';
import CustomFormProvider from 'shared/components/common/custom-form/CustomFormProvider';
import useRouterV2 from 'hooks/use-router-v2';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';
import FormGroupSearchRow from 'shared/components/common/form/form-search/FormGroupSearchRow';
import FormGroupSearch from 'shared/components/common/form/form-search/FormGroupSearch';
import FormItem from 'shared/components/common/form/FormItem';
import TextLabelCommon from 'shared/components/common/label/TextLabel';
import FormEditor from 'shared/components/common/custom-form/FormEditor';
import FormImage from 'shared/components/common/custom-form/FormImage';
import FormInput from 'shared/components/common/custom-form/FormInput';
import FormSelect from 'shared/components/common/custom-form/FormSelect';
import FooterManage from 'shared/components/footer/FooterManage';
import ButtonCommon from 'shared/components/common/button/ButtonCommon';
import Validator from 'utils/Validator';
import moment from 'moment';
import PopupName from '../PopupName';
import actionCandidateinterview from 'redux/interviewschedule/action';
import RouterPath from 'router/RouterPath';
import EventRegister, { EVENT_SHOW_POPUP2, LIST_PRODUCT_SHARED_POPUP, LIST_TAG_SHARED_POPUP, MODULE_PRODUCT, NEWS_POPUP, POPUP_ROUTER, RECRUITMENT_POPUP } from 'utils/EventRegister';
export default function EmailInterview(props) {
    const { showVisible, payload } = props;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const onClickCancelButton = () => {
        if (payload?.handleCancel) {
            payload?.handleCancel();
        }
        showVisible(true);
    };
    const FormWrapper = styled('form')({
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '30px 30px 20px 30px',
        maxWidth: '368px',
        textAlign: 'center',
        maxHeight: '198px',
        lineHeight: '22px',
    });

    const FormItemWrapper = styled('div')({
        textAlign: 'center',
    });

    const FormButtonWrapper = styled('div')({
        textAlign: 'center',
        padding: '10px',
    });
    const FormInputWrapper = styled('div')({
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
    });
    const DetailRow = styled('div')({
        width: '100%',
        display: '-webkit-inline-box',
        flexDirection: 'column',
        gap: '10px',
    });
    const DetailItemWrapper = styled('div')({
        display: 'flex',
        gap: '8px',
        width: '50%',
    });
    const DetailLabel = styled('p')({
        width: '200px',
        color: '#707070',
    });
    const DetailContent = styled('p')({
        width: 'calc(100% - 220px)',
        whiteSpace: 'pre-wrap'
    });
    const HourLine = styled('div')({
        position: 'absolute',
        width: '100%',
        border: '1px solid #D8D7D7',
        top: '141px',

    });
    const methods = useForm()
    const [canSubmit, setCanSubmit] = useState("");
    const [value, setValue] = React.useState(0);
    const router = useRouterV2();
    const [isLoading, setisLoading] = useState(false);
    const listCondidates = useSelector((state) => state.Candidateinterview.listCondidates);
    const listBranches = useSelector((state) => state.Candidateinterview.listBranches);
    const user = useSelector(state => state.User.user);
   useEffect(() => {
         methods.setValue("to", listCondidates?.map(x => x?.value));
    }, [listCondidates])

    const onSubmit = (data) => {

        const Dataparms = payload?.data.Data.map((item) => ({
            ...item,
            TimeStartInterview: moment(item?.TimeStartInterview || '').format("YYYY-MM-DD hh:mm")
        }));
        let params = {
            RecruitmentId: payload?.data.RecruitmentId || '',
            Candidates: Dataparms,
            BranchId: payload?.data.BranchId || '',
            CompanyName: "test",
            Type: payload?.data.typeinterview || 0,
            DateStart: moment(payload?.data.DateStart || '').format("YYYY-MM-DD"),
            TimeStart: moment(payload?.data.TimeStart || '').format("YYYY-MM-DD hh:mm"),
            InterviewTime: parseInt(payload?.data.InterviewTime || 0, 10),
            Room: "" + payload?.data.Room || '',
            Interviewer: payload?.data.Interviewer || '',
            Evaluate: payload?.data.Evaluate || 0,
            SendMailCandidate: payload?.data.SendMailCandidate === true ? 1 : 0,
            SendMailInterviewer: payload?.data.SendMailInterviewer === true ? 1 : 0,
            Status: 10,
            Note: payload?.data.Note || '',
            // emailtemplate: data.emailtemplate||0, 
            // title:data.title||"avc",
        }
        
        setLoading(true);
        const message = "Bạn có chắc chắn lưu dữ liệu này không ?";
        EventRegister.emit(EVENT_SHOW_POPUP2, {
            type: PopupName.SAVE_POPUP,
            open: true,
            payload: {
                data,
                message,
                isLoading: true,
                callback: {
                    success: (_props) => {
                        const callback = () => {
                            _props.closeLoading()
                            dispatch({
                                type: actionCandidateinterview.FETCH_CANDIDARE_INTERVIEW_LIST,
                                payload: {
                                    ...router.getAll()
                                    
                                }
                                
                            });
                            setLoading(false);
                            showVisible();
                        
                                router.push({
                                    pathname: RouterPath.INTERVIEWSCHEDULELIST
                                })
                            
                        };
                        dispatch({
                            type: actionCandidateinterview.CREATE_CANDIDARE_INTERVIEW,
                            payload: {
                                data: {
                                    ...params,
                                    
                                }, callback
                            },
                            callback: {
                                failed: () => {
                                    _props.closeLoading();
                                    setLoading(false);
                                }
                            }
                        });
                    },
                    failed: () => {
                        setLoading(false);
                    }
                },
            },
        });


    }
    return (

        <CustomFormProvider {...methods}>

            <HeadCommonPopup onHandleRight={showVisible} content="Email Thông báo" />
            <div style={{ backgroundColor: '#e5e5e5', width: '772px', padding: '10px' }}>
                <form onSubmit={methods.handleSubmit(onSubmit)} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>
                    <BoxV3 className={`${style['box-container']}`} boxTitle="Nội dung email gửi ứng viên">
                        <FormGroupSearchRow>
                            <FormGroupSearch className="col-12 p-0 column-gap-3">
                                <FormItem className="w-100 form-item" style={{ flex: 1 }}>
                                    <TextLabelCommon className="form-online" require>Mẫu Email </TextLabelCommon>
                                    <FormSelect
                                        fieldName="emailtemplate"
                                        validate={[]}
                                        options={[]}
                                        placeholder="Chọn bài đăng tuyển dụng"
                                        isPortal={true}
                                    />
                                </FormItem>
                                <FormItem className="w-100 form-item" style={{ flex: 1 }}></FormItem>
                            </FormGroupSearch>
                        </FormGroupSearchRow>
                        <FormGroupSearchRow>
                            <FormGroupSearch className="col-12 p-0 column-gap-3">
                                <FormItem className="w-100 form-item" style={{ flex: 2 }}>
                                    <TextLabelCommon className="form-online" >Tiêu đề </TextLabelCommon>
                                    <FormInput
                                        fieldName="title"
                                        validate={[]}
                                        options={[]}
                                        placeholder="Thư mời phỏng vấn"
                                        isPortal={true}
                                    />
                                </FormItem>
                            </FormGroupSearch>
                        </FormGroupSearchRow>
                        <FormGroupSearchRow>
                            <FormGroupSearch className="col-12 p-0 column-gap-3">
                                <FormItem className="w-100 form-item" style={{ flex: 1 }}>
                                    <TextLabelCommon className="form-online" require>Từ </TextLabelCommon>
                                    <FormSelect
                                        fieldName="from"
                                        validate={[]}
                                        options={[]}
                                        placeholder="chọn mail gửi"
                                        isPortal={true}
                                    />
                                </FormItem>
                            </FormGroupSearch>
                        </FormGroupSearchRow>
                        <FormGroupSearchRow>
                            <div className="" height={window.innerHeight - 360} >
                                <FormItem>
                                    <FormEditor
                                        fieldName="Content"
                                        validate={[]}
                                        placeholder=""
                                        setCanSubmit={setCanSubmit}
                                    />
                                </FormItem>
                            </div>
                        </FormGroupSearchRow>
                        <FormGroupSearchRow>
                            <FormItem>
                                <p>Tên trường trộn</p>
                            </FormItem>
                        </FormGroupSearchRow>

                    </BoxV3>
                    <BoxV3 className={`${style['box-container']}`} boxTitle="Nội dung email gửi cho người phỏng vấn tuyển dụng">
                        <div style={{ position: 'relative' }}>
                            <FormGroupSearchRow>
                                <FormGroupSearch className="col-12 p-0 column-gap-3">
                                    <FormItem className="w-100 form-item" style={{ flex: 1 }}>
                                        <TextLabelCommon className="form-online" require>Đến </TextLabelCommon>
                                        <FormSelect
                                            fieldName="to"
                                            validate={[]}
                                            options={listCondidates}
                                            placeholder=""
                                            isPortal={true}
                                            isMulti
                                        />
                                    </FormItem>

                                </FormGroupSearch>
                            </FormGroupSearchRow>
                            <FormGroupSearchRow>
                                <FormGroupSearch className="col-12 p-0 column-gap-3">
                                    <FormItem className="w-100 form-item" style={{ flex: 2 }}>
                                        <TextLabelCommon className="form-online" require>Tiêu đề </TextLabelCommon>
                                        <FormInput
                                            fieldName="titlepart"
                                            validate={[]}
                                            options={[]}
                                            placeholder="Thư mời phỏng vấn"
                                            isPortal={true}
                                        />
                                    </FormItem>
                                </FormGroupSearch>
                            </FormGroupSearchRow>
                            <HourLine />
                            <FormGroupSearchRow style={{ marginTop: '30px' }}>
                                <FormInputWrapper>
                                    <DetailRow>
                                        <DetailItemWrapper>
                                            <DetailLabel>Ngày</DetailLabel>
                                            <p>:</p>
                                            <DetailContent>{moment(payload?.data.TimeStart || '').format("YYYY-MM-DD hh:mm")}</DetailContent>
                                        </DetailItemWrapper>
                                    </DetailRow>
                                </FormInputWrapper>
                            </FormGroupSearchRow>
                            <FormGroupSearchRow style={{ marginTop: '30px' }}>
                                <FormInputWrapper>
                                    <DetailRow>
                                        <DetailItemWrapper>
                                            <DetailLabel>Thời gian</DetailLabel>
                                            <p>:</p>
                                            <DetailContent>{moment(payload?.data.TimeStart || '').format("hh:mm")}</DetailContent>
                                        </DetailItemWrapper>
                                    </DetailRow>
                                </FormInputWrapper>
                            </FormGroupSearchRow>
                            <FormGroupSearchRow style={{ marginTop: '30px' }}>
                                <FormInputWrapper>
                                    <DetailRow>
                                        <DetailItemWrapper>
                                            <DetailLabel>Địa điểm</DetailLabel>
                                            <p>:</p>
                                            <DetailContent>{payload?.data.BranchId}</DetailContent>
                                        </DetailItemWrapper>
                                    </DetailRow>
                                </FormInputWrapper>
                            </FormGroupSearchRow>
                            <FormGroupSearchRow style={{ marginTop: '30px' }}>
                                <FormInputWrapper>
                                    <DetailRow>
                                        <DetailItemWrapper>
                                            <DetailLabel>Phòng</DetailLabel>
                                            <p>:</p>
                                            <DetailContent></DetailContent>
                                        </DetailItemWrapper>
                                    </DetailRow>
                                </FormInputWrapper>
                            </FormGroupSearchRow>
                            <FormGroupSearchRow style={{ marginTop: '30px' }}>
                                <FormInputWrapper>
                                    <DetailRow>
                                        <DetailItemWrapper>
                                            <DetailLabel>Người tổ chức</DetailLabel>
                                            <p>:</p>
                                            <DetailContent>{user.LastName+""+user.FirstName}</DetailContent>
                                        </DetailItemWrapper>
                                    </DetailRow>
                                </FormInputWrapper>
                            </FormGroupSearchRow>
                            <FormGroupSearchRow style={{ marginTop: '30px' }}>
                                <FormInputWrapper>
                                    <DetailRow>
                                        <DetailItemWrapper>
                                            <DetailLabel>Mô tả</DetailLabel>
                                            <p>:</p>
                                            <DetailContent>{payload?.data.Note}</DetailContent>
                                        </DetailItemWrapper>
                                    </DetailRow>
                                </FormInputWrapper>
                            </FormGroupSearchRow>
                        </div>
                    </BoxV3>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '10px',
                        backgroundColor: '#ffffff',
                        borderRadius: '3px'
                    }}>
                        <div style={{ columnGap: 10, padding: '4px 10px 4px 490px' }} className="d-flex flex-row justify-content-center">

                            <LoadingButton
                                // onClick={() => onClickCancelButton()}
                                onClick={showVisible}
                                typeColor="background-gray"

                            >
                                Đóng
                            </LoadingButton>
                            <LoadingButton
                                loading={loading}
                                type='submit'

                            >
                                Đặt lịch và Gửi mail
                            </LoadingButton>
                        </div>
                    </div>
                </form>
            </div>
        </CustomFormProvider >

    );
}


