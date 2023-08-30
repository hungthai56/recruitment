import HeadCommonPopup from '../component/HeadCommonPopup';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import { Button } from '@findxdn/erp-theme';
import LoadingButton from '../../button-loading/ButtonLoading';
import BoxV3 from 'shared/components/common/box/BoxV3';
import style from './CreatePopop.module.scss';
import CustomFormProvider from 'shared/components/common/custom-form/CustomFormProvider';
import useRouterV2 from 'hooks/use-router-v2';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';
import FormGroupSearchRow from 'shared/components/common/form/form-search/FormGroupSearchRow';
import FormGroupSearch from 'shared/components/common/form/form-search/FormGroupSearch';
import FormActionSearch from 'shared/components/common/form/form-search/FormActionSearch';
import FormItem from 'shared/components/common/form/FormItem';
import FormAction from 'shared/components/common/form/FormAction';
import FormGroup from 'shared/components/common/form/FormGroup';
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
import FormDateTimePicker from 'shared/components/common/custom-form/FormDateTimePicker';
import FormCheckBox from 'shared/components/common/custom-form/FormCheckBox';
import FormTextArea from 'shared/components/common/custom-form/FormTextArea';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IconButton } from '@mui/material';
import { IcAdd } from 'assets/images/icons/icon-list';
import IcAddinter from 'assets/images/icons/ic-addinter';
import Iccloseindel from 'assets/images/icons/ic-closeindel';
import APITESST from 'utils/APITESST';
import EventRegister, { EVENT_SHOW_POPUP2, LIST_PRODUCT_SHARED_POPUP, LIST_TAG_SHARED_POPUP, MODULE_PRODUCT, NEWS_POPUP, POPUP_ROUTER, RECRUITMENT_POPUP } from 'utils/EventRegister';

export default function CreatePopup(props) {

    const { showVisible, payload } = props;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const onClickCancelButton = () => {
        if (payload?.handleCancel) {
            payload?.handleCancel();
        }
        showVisible(true);
    };

    const methods = useForm()
    const [canSubmit, setCanSubmit] = useState("");
    const [value, setValue] = React.useState(0);
    const router = useRouterV2();
    const [isLoading, setisLoading] = useState(false);
    const onSubmit = (data) => {
        const Dataparms = data?.Data.map((item) => ({
            ...item,
            TimeStartInterview: moment(item?.TimeStartInterview || '').format("YYYY-MM-DD hh:mm")
        }));
        let params = {
            RecruitmentId: data?.RecruitmentId || '',
            Candidates: Dataparms,
            BranchId: data?.BranchId || '',
            CompanyName: "test",
            Type: data?.typeinterview || 0,
            DateStart: moment(data?.DateStart || '').format("YYYY-MM-DD"),
            TimeStart: moment(data?.TimeStart || '').format("YYYY-MM-DD hh:mm"),
            InterviewTime: parseInt(data?.InterviewTime || 0, 10),
            Room: "" + data?.Room || '',
            Interviewer: data?.Interviewer || '',
            Evaluate: data?.Evaluate || 0,
            SendMailCandidate: data?.SendMailCandidate === true ? 1 : 0,
            SendMailInterviewer: data?.SendMailInterviewer === true ? 1 : 0,
            Status: 10,
            Note: data?.Note || '',

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
                                pathname: RouterPath.INTERVIEWSCHEDULE
                            })

                        };
                        dispatch({
                            type: actionCandidateinterview.CREATE_POPUP_CANDIDARE_INTERVIEW,
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
    const [Candidate, setCandidateId] = useState([{ CandidateId: '', Email: '', TimeStartInterview: '' }]);
    // const { control, handleSubmit, reset, watch } = useFormContext();
    const { register, handleSubmit, control, reset } = useForm();
    const { fields, move, remove, update, prepend } = useFieldArray({
        control,
        name: 'Data',
    });
    const lastIndex = fields.length - 1;
    useEffect(() => {
        reset({ Data: Candidate });
    }, [Candidate]);
    const onCreateItem = () => {
        prepend({
            CandidateId: 0,
            Phone: '',
            Email: '',
            TimeStartInterview: '',
        }, { shouldFocus: false });
    };
    const onDeleteItem = (index) => {
        remove(index);
    };
    const checkCandidateId = (e) => {

    }
    const checkRecruitmentId = (e) => {

        if (e) {
            dispatch({
                type: actionCandidateinterview.FETCH_GET_DATA_LIST_CONDIDATE,
                payload: e,

            })
        }
    }
    ///get api
    const listBranches = useSelector((state) => state.Candidateinterview.listBranches);
    const listRecruitmentss = useSelector((state) => state.Candidateinterview.listRecruitments);
    const listemployees = useSelector((state) => state.Candidateinterview.listemployees);
    const listCondidates = useSelector((state) => state.Candidateinterview.listCondidates);

    const user = useSelector(state => state.User.user);


    const interviewtype = APITESST.interviewtype;
    const Rooms = APITESST.Rooms;


    useEffect(() => {
        dispatch({
            type: actionCandidateinterview.FETCH_CANDIDARE_INTERVIEW_MASTER,
        });
    }, []);
    useEffect(() => {
        dispatch({
            type: actionCandidateinterview.FETCH_GET_DATA_EMPLOYEES,
        });
    }, []);

    return (<CustomFormProvider {...methods}>
        <HeadCommonPopup onHandleRight={showVisible} content="Tạo lịch phỏng vấn" />
        <div style={{ backgroundColor: '#e5e5e5', width: '772px', padding: '10px' }}>
            <form onSubmit={methods.handleSubmit(onSubmit)} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}>
                <BoxV3 className={`${style['box-container']}`} boxTitle="Thông tin lịch phỏng vấn">
                    <FormGroupSearchRow>
                        <FormGroupSearch className="col-12 p-0 column-gap-3">
                            <FormItem className="w-100 form-item" style={{ flex: 1 }}>
                                <TextLabelCommon className="form-online" require>Tuyển dụng </TextLabelCommon>
                                <FormSelect
                                    fieldName="RecruitmentId"
                                    validate={[]}
                                    options={listRecruitmentss ?? []}
                                    placeholder="Chọn bài đăng tuyển dụng"
                                    isPortal={true}
                                    onChangeSelect={checkRecruitmentId}
                                />
                            </FormItem>
                            <FormItem className="w-100 form-item" style={{ flex: 1 }}>
                                <TextLabelCommon className="form-online" require>Kiểu phỏng vấn </TextLabelCommon>
                                <FormSelect
                                    fieldName="typeinterview"
                                    validate={[]}
                                    options={interviewtype ?? []}
                                    placeholder="Chọn kiểu phỏng vấn"
                                    isPortal={true}
                                />
                            </FormItem>

                        </FormGroupSearch>
                    </FormGroupSearchRow>
                    <FormGroupSearchRow>
                        <FormGroupSearch className="col-12 p-0 column-gap-3">
                            <FormItem className=" form-item" style={{ width: '360px' }}>
                                <TextLabelCommon className="form-online" require>Ngày phỏng vấn </TextLabelCommon>
                                <FormDateTimePicker
                                    fieldName="DateStart"
                                    validate={[]}
                                    placeholder={('dd/mm/yyyy - hh:mm')}
                                    inputFormat='dd/MM/yyyy hh:mm aa'
                                />
                            </FormItem>
                            <FormActionSearch className="p-0 column-gap-3">
                                <FormItem className="w-100 form-item">
                                    <TextLabelCommon className="form-online" require>Giờ bắt đầu</TextLabelCommon>
                                    <FormDateTimePicker
                                        fieldName="TimeStart"
                                        validate={[]}
                                        placeholder={('hh:mm')}
                                        inputFormat='hh:mm aa'
                                    />
                                </FormItem>
                                <FormItem className="w-100 form-item">
                                    <TextLabelCommon className="form-online" >Thời lượng (phút) </TextLabelCommon>
                                    <FormInput
                                        fieldName="InterviewTime"
                                        validate={[]}
                                        placeholder="0"
                                    />

                                </FormItem>
                            </FormActionSearch>

                        </FormGroupSearch>
                    </FormGroupSearchRow>
                    <FormGroupSearchRow>
                        <FormGroupSearch className="col-12 p-0 column-gap-3">
                            <FormItem className="w-100 form-item" style={{ flex: 1 }}>
                                <TextLabelCommon className="form-online" require>Địa điểm </TextLabelCommon>
                                <FormSelect
                                    fieldName="BranchId"
                                    validate={[]}
                                    options={listBranches ?? []}
                                    placeholder="Chọn bài đăng tuyển dụng"
                                    isPortal={true}
                                />
                            </FormItem>
                            <FormItem className="w-100 form-item" style={{ flex: 1 }}>
                                <TextLabelCommon className="form-online" require>Phòng </TextLabelCommon>
                                <FormSelect
                                    fieldName="Room"
                                    validate={[]}
                                    options={Rooms ?? []}
                                    placeholder="Chọn bài đăng tuyển dụng"
                                    isPortal={true}
                                />
                            </FormItem>

                        </FormGroupSearch>
                    </FormGroupSearchRow>
                    <FormGroupSearchRow>
                        <FormGroupSearch className="col-12 p-0 column-gap-3">
                            <FormItem className="w-100 form-item" style={{ flex: 1 }}>
                                <TextLabelCommon className="form-online" require>Người phỏng vấn </TextLabelCommon>
                                <FormSelect
                                    fieldName="Interviewer"
                                    validate={[]}
                                    options={listemployees ?? []}
                                    placeholder="Chọn bài đăng tuyển dụng"
                                    isPortal={true}
                                />
                            </FormItem>
                            <FormItem className="w-100 form-item" style={{ flex: 1 }}>
                                <TextLabelCommon className="form-online" require>Mẫu đánh giá </TextLabelCommon>
                                <FormSelect
                                    fieldName="Evaluate"
                                    validate={[]}
                                    options={[]}
                                    placeholder="Chọn bài đăng tuyển dụng"
                                    isPortal={true}
                                />
                            </FormItem>

                        </FormGroupSearch>
                    </FormGroupSearchRow>
                    <FormGroupSearchRow>
                        <FormGroupSearch className="col-12 p-0 column-gap-3">
                            <FormItem className="w-100 form-item">
                                <TextLabelCommon className="form-online" >Lưu ý cho ứng viên </TextLabelCommon>
                                <FormTextArea
                                    fieldName="Note"
                                    validate={[]}
                                    placeholder="Vd:Ứng viên mang theo laptop,but...."
                                />
                            </FormItem>


                        </FormGroupSearch>
                    </FormGroupSearchRow>
                    <FormGroupSearchRow>
                        <FormGroupSearch className="col-12 p-0 column-gap-3">
                            <FormGroup className="w-100 form-item">
                                <div className={style['form-check-box']}>
                                    <FormCheckBox validate={[]} fieldName="SendMailCandidate" /></div>
                                <div className={style['title-item']}>Email thông báo cho ứng viên</div>
                            </FormGroup>
                            <FormGroup className="w-100 form-item">
                                <div className={style['form-check-box']}>
                                    <FormCheckBox validate={[]} fieldName="SendMailInterviewer" /></div>
                                <div className={style['title-item']}>Email thông báo cho người phòng vấn</div>
                            </FormGroup>


                        </FormGroupSearch>
                    </FormGroupSearchRow>
                </BoxV3>
                <BoxV3 className={`${style['box-container']}`} boxTitle="Danh sách ứng viên tham gia">
                    <FormGroupSearchRow>
                        {fields.map((item, index) => (

                            <FormGroupSearch key={index} className="col-12 p-0 column-gap-3" style={{ marginBottom: index == 0 ? "20px" : "20px" }}>
                                <FormItem className="w-100 form-item">
                                    {index == 0 ? <TextLabelCommon className="form-online" require> Ứng viên</TextLabelCommon> : ""}
                                    <FormSelect
                                        fieldName={`Data.${index}.CandidateId`}
                                        validate={[]}
                                        options={listCondidates ?? []}
                                        placeholder="Chọn nhân sự"
                                        isPortal={true}
                                        onChangeSelect={checkCandidateId}
                                    />
                                </FormItem>

                                <FormItem className="w-100 form-item">
                                    {index == 0 ? <TextLabelCommon className="form-online">Email</TextLabelCommon> : ""}
                                    <FormInput
                                        fieldName={`Data.${index}.Email`}
                                        validate={[]}
                                        placeholder="Nhập email"
                                        readOnly={true}
                                    />
                                </FormItem>
                                <FormItem className="w-100 form-item">
                                    {index == 0 ? <TextLabelCommon className="form-online" require>Giờ phỏng vấn</TextLabelCommon> : ""}
                                    <FormDateTimePicker
                                        fieldName={`Data.${index}.TimeStartInterview`}
                                        validate={[]}
                                        placeholder={('hh:mm')}
                                        inputFormat='hh:mm aa'
                                    />
                                </FormItem>
                                {index === lastIndex ? <div className={"dep_KX_tiBJ6xuGC1J1AIwSL"} style={{ marginBottom: "0px;" }} >
                                    <div className={"dep_U6nqO6JNIZqBNx6c6EkB"} onClick={() => onDeleteItem(index)} >
                                        <div style={{ paddingTop: index == 0 ? "26px" : "7px", marginLeft: "3px", cursor: "pointer" }}>
                                            <div>
                                                <Iccloseindel />
                                            </div>
                                        </div>
                                    </div>
                                </div> : <div className={"dep_KX_tiBJ6xuGC1J1AIwSL"} style={{ marginBottom: "0px;" }} >
                                    <div className={"dep_U6nqO6JNIZqBNx6c6EkB"}  >
                                        <div style={{ paddingTop: index == 0 ? "26px" : "7px", marginLeft: "3px", cursor: "pointer" }}>
                                            <div style={{ width: "24px" }}>

                                            </div>
                                        </div>
                                    </div>
                                </div>}


                            </FormGroupSearch>

                        ))}
                        <IconButton onClick={() => onCreateItem()}>
                            <IcAddinter />
                        </IconButton>

                    </FormGroupSearchRow>
                </BoxV3>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '10px',
                    backgroundColor: '#ffffff',
                    borderRadius: '3px'
                }}>
                    <div style={{ columnGap: 10, padding: '4px 10px 4px 565px' }} className="d-flex flex-row justify-content-center">

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
                            Đặt lịch
                        </LoadingButton>
                    </div>
                </div>



            </form>
        </div>
    </CustomFormProvider>
    );
}