import React, { useEffect, useState, useRef } from 'react';
import styles from "./CandidatesManager.module.scss";
import BoxV3 from 'shared/components/common/box/BoxV3';
import { useForm, useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FooterManage } from 'shared/components/common/footer';
import CustomFormProvider from 'shared/components/common/custom-form/CustomFormProvider';
import LoadingButton from 'shared/components/common/button-loading/ButtonLoading';
import FormGroupSearchRow from 'shared/components/common/form/form-search/FormGroupSearchRow';
import FormGroupSearch from 'shared/components/common/form/form-search/FormGroupSearch';
import FormItem from 'shared/components/common/form/FormItem';
import TextLabelCommon from 'shared/components/common/label/TextLabel';
import FormSelect from 'shared/components/common/custom-form/FormSelect';
import FormInput from 'shared/components/common/custom-form/FormInput';
import Constant from 'utils/Constants'
import Validator from 'utils/Validator';
import Validate from 'utils/Validate';
import FormDatePicker from '../../components/common/custom-form/FormDatePicker';
import actionProposal from '../../../redux/candidate-manager/action';
import ButtonCommon from 'shared/components/common/button/ButtonCommon';
import RouterPath from 'router/RouterPath';
import useRouter from 'hooks/use-router';
import action from '../../../redux/candidate-manager/action';
import FormImageV2 from '../../components/common/custom-form/FormImageV2';
import FormInputUpload from '../../components/common/custom-form/FormInputUpload';
import IconImageUpload from 'assets/images/icons/IconImageUpload';
import IcAdd from '../../../assets/images/icons/icon-add'
import CommonInput from 'shared/components/form';
import IcDropDetail from 'shared/components/icons/ic-drop-detail'
import moment from 'moment';
import ChangeRowExpCandidate from 'shared/components/candidate-detail/ChangeRowExpCandidate'
import ChangeRowEduCandidate from 'shared/components/candidate-detail/ChangeRowEduCandidate'

function AddNewCandidate(props) {
    const { CandidateId } = props
    const router = useRouter();
    const methods = useForm()
    const [valueTab, setValueTab] = useState(1);
    const [canSubmit, setCanSubmit] = useState(true);
    const [valueBranch, setValueBranch] = useState([]);
    const [valueWorkTypes, setValueWorkTypes] = useState([]);
    const [valuePosition, setValuePosition] = useState([]);
    const [valueFileCV, setValueFileCV] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: action.FETCH_CANDIDATES_MASTER,
            payload: {},
        });

        dispatch({
            type: action.FETCH_EMPLOYEES,
            payload: {},
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: action.GET_CANDIDATE_DETAIL,
            payload: CandidateId ?? 0
        })
    }, [CandidateId])
    const onSubmit = (data) => {
        let CandidateExperiences = []
        let CandidateEducations = []
        data?.CandidateExperiences.forEach(exp => {
            if (exp.TimeStart == null || exp.CompanyName == null && exp.Position == null) {
                return exprow
            } else {
                let genObject = { "TimeStart": exp.TimeStart ?? "", "TimeEnd": exp.TimeEnd ? exp.TimeEnd : moment().format('DD/MM/YYYY'), "CompanyName": exp.CompanyName ?? "", "Position": exp.Position ?? "" }
                CandidateExperiences.push(genObject)
            }
        });
        data?.CandidateEducations.forEach(edu => {
            if (edu.ModeOfStudy == null && edu.Major == null && edu.School == null) {
                return edurow
            } else {
                let genObject = { "Type": edu.Type, "ModeOfStudy": edu.ModeOfStudy ?? 0, "Major": edu.Major ?? "", "School": edu.School ?? "" }
                CandidateEducations.push(genObject)
            }
        });
        let params = {
            "Id": 0,
            "Name": data?.Name ?? "",
            "FileImage": data?.FileImage,
            "Birthday": data?.Birthday,
            "Gender": data?.Gender ?? "",
            "IDCard": data?.IDCard,
            "Phone": data?.Phone ? Number(data?.Phone) : 0,
            "Email": data.Email ?? "",
            "LinkFacebook": data?.LinkFacebook ?? "",
            "RecruitmentId": data?.RecruitmentId ? Number(data?.RecruitmentId) : 0,
            "Block": data?.Block ? Number(data?.Block) : 0,
            "TakeRecruitmentinfoby": data?.TakeRecruitmentinfoby ? Number(data?.TakeRecruitmentinfoby) : 0,
            "CandidateReferences": CandidateEducations ?? edurow,
            "CandidateExperiences": CandidateExperiences ?? exprow,
            "IsOnBusinessTrip": data?.IsOnBusinessTrip ? String(data?.IsOnBusinessTrip) : "false",
            "Height": data?.Height ? Number(data?.Height) : 0,
            "Weight": data?.Weight ? Number(data?.Weight) : 0,
            "IntroducerId": data?.IntroducerId ?? 0,
            "collaborators": data?.collaborators ? String(data?.collaborators) : 0,
            "MaritalStatus": data?.MaritalStatus ? Number(data?.MaritalStatus) : 0,
            "BranchId": data?.BranchId ?? 0,
            "FileCv": data?.FileCv,
            "DateOfIDCard": data?.DateOfIDCard,
            "Position": data?.Position ? String(data?.Position) : "",
            "WorkType": data?.WorkType ? Number(data?.WorkType) : "",
        }
        if (CandidateId) {
            params['Id'] = Number(CandidateId);
            dispatch({
                type: actionProposal.UPDATE_CANDIDATES,
                payload: params,
                callback: (id) => {
                    router.push({
                        pathname: RouterPath.getRouteWithId(RouterPath.CANDIDATE_DETAILS, id)
                    })
                }
            });
        } else {
            dispatch({
                type: actionProposal.CREATE_CANDIDATES,
                payload: params,
                callback: (id) => {
                    router.push({
                        pathname: RouterPath.getRouteWithId(RouterPath.CANDIDATE_DETAILS, id)
                    })
                }
            })
        }
    }
    const handleCancel = () => {
        router.push({ pathname: RouterPath.CANDIDATES })
    }
    const { Blocks, CandidateDetail, Type, Genders, Recruitment, Recruiments, Employees, Positions, MaritalStatus, TakeRecruitmentInfoBy, ModeOfStudy, WorkTypes } = useSelector(
        (state) => state.AppCandidates, WorkTypes
    );
    let proposeDetail = CandidateDetail
    let Employee = []
    Employees.forEach(em => {
        Employee.push({ value: em.EmployeeId, label: em.FullName })
    });
    const ConvertStringData = (data) => {
        let textLabel = []
        const objReturn = Object.entries(data);
        for (let i = 0; i < objReturn.length; i++) {
            let element = objReturn[i]
            textLabel.push({ value: element[0], label: element[1] })
        }
        return (
            { textLabel }
        )
    }
    let Gender = ConvertStringData(Genders).textLabel
    let TakeRecruiinfoby = ConvertStringData(TakeRecruitmentInfoBy).textLabel
    let WorkType = ConvertStringData(WorkTypes).textLabel
    let EducationLv = ConvertStringData(Type).textLabel
    let MaritalSt = ConvertStringData(MaritalStatus).textLabel
    let Position = ConvertStringData(Positions).textLabel
    let Recruiment = ConvertStringData(Recruiments).textLabel
    let Block = ConvertStringData(Blocks).textLabel
    let ModeOfStudys = ConvertStringData(ModeOfStudy).textLabel

    useEffect(() => {
        let Branche = []
        let arrWorkType = []
        let arrPosition = []
        if (Recruitment) {
            let changeBranch = Recruitment?.Branches
            changeBranch && changeBranch.forEach(br => {
                Branche.push({
                    "value": br.Id,
                    "label": br.Name
                })
            });
            setValueBranch(Branche)

            const objWorkTypes = Object.entries(WorkTypes);
            objWorkTypes.forEach(wt => {
                Recruitment.WorkTypes && Recruitment.WorkTypes.forEach(rc => {
                    if (Number(wt[0]) === rc) {
                        arrWorkType.push({
                            "value": wt[0],
                            "label": wt[1]
                        })
                    }
                });
            });
            setValueWorkTypes(arrWorkType)

            Positions.forEach(ps => {
                Recruitment.Position && Recruitment.Position.forEach(position => {
                    if (ps?.Id === position) {
                        arrPosition.push({
                            "value": ps?.Id,
                            "label": ps?.Name
                        })
                    }
                })
            });
            setValuePosition(arrPosition)
            methods.setValue("Position", proposeDetail?.Position)
            methods.setValue("BranchId", proposeDetail?.BranchId)
            methods.setValue("WorkType", proposeDetail?.WorkType)
        }
    }, [Recruitment])
    useEffect(() => {
        if (!CandidateId) {
            methods.setValue("Position", "")
            methods.setValue("BranchId", "")
            methods.setValue("WorkType", "")
            setValueBranch([])
            setValueWorkTypes([])
            setValuePosition([])
        }
    }, [CandidateId])
    useEffect(() => {
        if (proposeDetail && CandidateId) {
            setValueFileCV([{ "FileName": proposeDetail?.FileNameCv, "Id": Number(CandidateId) }])
            methods.setValue("Name", proposeDetail?.Name)
            methods.setValue("FileImage", [{ data_url: proposeDetail?.Avatar }])
            methods.setValue("Birthday", proposeDetail?.Birthday)
            methods.setValue("Gender", proposeDetail?.GenderId)
            methods.setValue("IDCard", proposeDetail?.IDCard)
            methods.setValue("Phone", proposeDetail?.Phone)
            methods.setValue("Email", proposeDetail?.Email)
            methods.setValue("LinkFacebook", proposeDetail?.LinkFacebook)
            methods.setValue("RecruitmentId", proposeDetail?.RecruitmentId)
            dispatch({
                type: action.GET_RECRUITMENT_BY_ID,
                payload: proposeDetail?.RecruitmentId,
            });
            methods.setValue("Block", proposeDetail?.BlockId)
            methods.setValue("TakeRecruitmentinfoby", proposeDetail?.TakeRecruitmentInfoById)
            proposeDetail?.CandidateEducations && proposeDetail?.CandidateEducations.forEach((value, index, array) => {
                methods.setValue("CandidateEducations." + index + ".Major", proposeDetail?.CandidateEducations[index].Major)
                methods.setValue("CandidateEducations." + index + ".School", proposeDetail?.CandidateEducations[index].School)
                methods.setValue("CandidateEducations." + index + ".Type", proposeDetail?.CandidateEducations[index].Type)
                methods.setValue("CandidateEducations." + index + ".ModeOfStudy", proposeDetail?.CandidateEducations[index].ModeOfStudy)
            });
            proposeDetail?.CandidateExperiences && proposeDetail?.CandidateExperiences.forEach((value, index, array) => {
                methods.setValue("CandidateExperiences." + index + ".TimeStart", proposeDetail?.CandidateExperiences[index].TimeStart)
                methods.setValue("CandidateExperiences." + index + ".TimeEnd", proposeDetail?.CandidateExperiences[index].TimeEnd)
                methods.setValue("CandidateExperiences." + index + ".Position", proposeDetail?.CandidateExperiences[index].Position)
                methods.setValue("CandidateExperiences." + index + ".CompanyName", proposeDetail?.CandidateExperiences[index].CompanyName)
            });
            methods.setValue("IsOnBusinessTrip", proposeDetail?.IsOnBusinessTrip)
            methods.setValue("Height", proposeDetail?.Height)
            methods.setValue("Weight", proposeDetail?.Weight)
            methods.setValue("IntroducerId", proposeDetail?.IntroducerId)
            methods.setValue("collaborators", Number(proposeDetail?.Collaborators))
            methods.setValue("MaritalStatus", proposeDetail?.MaritalStatusId)
            methods.setValue("DateOfIDCard", proposeDetail?.DateOfIDCard)
            methods.setValue("FileCV", proposeDetail?.DateOfIDCard)
        } else {
            methods.setValue(""), ""
            setValueFileCV([])
        }
    }, [proposeDetail])

    const { register, control, reset } = useForm({
        defaultValues: {
            CandidateEducations: [{ Type: 0, ModeOfStudy: 0, Major: "", School: "" }],
            CandidateExperiences: [{ TimeStart: "", TimeEnd: "", Position: "", CompanyName: "" }]
        }
    });

    const { fields: edurow, append: appendEdurow, remove: removeEdurow } = useFieldArray({
        control,
        name: 'CandidateEducations',
    });

    const handleAaddEdu = () => {
        appendEdurow({ Type: "", ModeOfStudy: "", Major: "", School: "" });
    };

    const { fields: exprow, append: appendExprow, remove: removeExprow } = useFieldArray({
        control,
        name: 'CandidateExperiences',
    });

    const handleAaddExp = () => {
        appendExprow({ TimeStart: "", TimeEnd: "", Position: "", CompanyName: "" });
    };

    useEffect(() => {
        if (proposeDetail?.CandidateEducations) {
            reset({ CandidateEducations: proposeDetail?.CandidateEducations });
        }
    }, [proposeDetail?.CandidateEducations]);

    useEffect(() => {
        if (proposeDetail?.CandidateExperiences) {
            reset({ CandidateExperiences: proposeDetail?.CandidateExperiences });
        }
    }, [proposeDetail?.CandidateExperiences]);

    const onChangeSelect = (e) => {
        dispatch({
            type: action.GET_RECRUITMENT_BY_ID,
            payload: e,
        });
    }
    const handleDeleEdu = (index) => {
        removeEdurow(index)
        methods.setValue("CandidateEducations." + index + ".Major", null)
        methods.setValue("CandidateEducations." + index + ".School", null)
        methods.setValue("CandidateEducations." + index + ".Type", null)
        methods.setValue("CandidateEducations." + index + ".ModeOfStudy", null)
    }
    const handleDeleExp = (index) => {
        removeExprow(index)
        methods.setValue("CandidateExperiences." + index + ".TimeStart", null)
        methods.setValue("CandidateExperiences." + index + ".TimeEnd", null)
        methods.setValue("CandidateExperiences." + index + ".Position", null)
        methods.setValue("CandidateExperiences." + index + ".CompanyName", null)
    }
    return (
        <CustomFormProvider {...methods}>
            <form id="hook-form" onSubmit={methods.handleSubmit(onSubmit)}>
                <div className={styles['box-container']}>
                    {
                        valueTab == 1 && <>
                            <BoxV3 iconTitleLeft={<IcDropDetail />} boxTitle='Thông tin cá nhân'>
                                <FormGroupSearchRow
                                    componentLeft={
                                        <div style={{ display: 'flex', alignItems: 'start' }}>
                                            <div className={styles['custom-form-upload']}>
                                                <FormItem>
                                                    <FormImageV2
                                                        width={112}
                                                        height={140}
                                                        align={'center'}
                                                        fieldName={`FileImage`}
                                                        validate={[Validator.required]}
                                                        iconNull={<div className={styles['custom-icon-upload']}>
                                                            <IconImageUpload />
                                                            <p>Tải hình ảnh lên từ thiết bị</p>
                                                        </div>}
                                                    />
                                                </FormItem>
                                            </div>
                                            <div className={styles['custom-form-input']}>
                                                <FormGroupSearch>
                                                    <FormItem className="w-100 form-item">
                                                        <TextLabelCommon className="form-proposal mb-1" require>Họ và tên</TextLabelCommon>
                                                        <FormInput
                                                            fieldName="Name"
                                                            validate={[Validator.required, Validator.minLength(5), Validator.maxLength(50)]}
                                                            placeholder={"Nhập họ tên"}
                                                        />
                                                    </FormItem>
                                                    <FormItem className="w-100 form-item">
                                                        <TextLabelCommon className="form-proposal mb-1" require>Ngày sinh</TextLabelCommon>
                                                        <FormDatePicker
                                                            fieldName="Birthday"
                                                            validate={[Validator.maxDate, Validator.required]}
                                                            placeholder="Chọn ngày sinh"
                                                        />
                                                    </FormItem>
                                                    <FormItem className="w-100 form-item">
                                                        <TextLabelCommon className="form-proposal mb-1" require>Giới tính</TextLabelCommon>
                                                        <FormSelect
                                                            options={Gender ?? []}
                                                            fieldName="Gender"
                                                            validate={[Validator.required]}
                                                            placeholder={"Chọn giới tính"}
                                                        />
                                                    </FormItem>
                                                </FormGroupSearch>
                                                <FormGroupSearch style={{ marginTop: "10px" }}>
                                                    <FormItem className="w-100 form-item">
                                                        <TextLabelCommon className="form-proposal mb-1" require>Tình trạng hôn nhân</TextLabelCommon>
                                                        <FormSelect
                                                            options={MaritalSt ?? []}
                                                            fieldName="MaritalStatus"
                                                            validate={[Validator.required]}
                                                            placeholder={"Chọn tình trạng hôn nhân"}
                                                        />
                                                    </FormItem>
                                                    <FormItem className="w-100 form-item">
                                                        <TextLabelCommon className="form-proposal mb-1" require>CMND/CCCD</TextLabelCommon>
                                                        <CommonInput
                                                            fieldName="IDCard"
                                                            placeholder={"0123456789"}
                                                            rules={[Validate.required(), Validate.minLength(13), Validate.maxLength(50), Validate.number()]}
                                                        />
                                                    </FormItem>
                                                    <FormItem className="w-100 form-item">
                                                        <TextLabelCommon className="form-proposal mb-1" require>Ngày cấp</TextLabelCommon>
                                                        <FormDatePicker
                                                            fieldName="DateOfIDCard"
                                                            validate={[Validator.maxDate, Validator.required]}
                                                            placeholder="Chọn ngày cấp"
                                                        />
                                                    </FormItem>
                                                </FormGroupSearch>
                                            </div>
                                        </div>
                                    }
                                />
                            </BoxV3>
                            <BoxV3 iconTitleLeft={<IcDropDetail />} boxTitle='Thông tin liên hệ'>
                                <FormGroupSearchRow
                                    componentLeft={
                                        <FormGroupSearch>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Số điện thoại</TextLabelCommon>
                                                <CommonInput
                                                    fieldName="Phone"
                                                    placeholder={"0123456789"}
                                                    rules={[Validate.required(), Validate.number()]}
                                                />
                                            </FormItem>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Email</TextLabelCommon>
                                                <CommonInput
                                                    fieldName="Email"
                                                    placeholder={"abc123@gmail.com"}
                                                    rules={[Validate.required(), Validate.email()]}
                                                />
                                            </FormItem>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1">Link facebook(Không điền tên)</TextLabelCommon>
                                                <CommonInput
                                                    fieldName="LinkFacebook"
                                                    placeholder={"Nhập liên kết MXH"}
                                                    rules={[Validate.url()]}
                                                />
                                            </FormItem>
                                        </FormGroupSearch>
                                    }
                                />

                            </BoxV3>
                            <BoxV3 iconTitleLeft={<IcDropDetail />} boxTitle='Thông tin ứng tuyển'>
                                <FormGroupSearchRow
                                    componentLeft={
                                        <FormGroupSearch>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Tuyển dụng</TextLabelCommon>
                                                <FormSelect
                                                    options={Recruiment ?? []}
                                                    fieldName="RecruitmentId"
                                                    validate={[Validator.required]}
                                                    placeholder={"Chọn tuyển dụng ứng viên apply"}
                                                    onChangeSelect={onChangeSelect}
                                                />
                                            </FormItem>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Khối</TextLabelCommon>
                                                <FormSelect
                                                    options={Block ?? []}
                                                    fieldName="Block"
                                                    validate={[Validator.required]}
                                                    placeholder={"Chọn khối"}
                                                />
                                            </FormItem>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Vị trí ứng tuyển</TextLabelCommon>
                                                <FormSelect
                                                    options={valuePosition ?? []}
                                                    fieldName="Position"
                                                    validate={[Validator.required]}
                                                    placeholder={"Chọn vị trí ứng tuyển"}
                                                />
                                            </FormItem>
                                        </FormGroupSearch>
                                    }
                                />
                                <FormGroupSearchRow
                                    componentLeft={
                                        <FormGroupSearch>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Chi nhánh ứng tuyển</TextLabelCommon>
                                                <FormSelect
                                                    options={valueBranch ?? []}
                                                    fieldName="BranchId"
                                                    validate={[Validator.required]}
                                                    placeholder={"Chọn chi nhánh"}
                                                />
                                            </FormItem>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Hình thức làm việc</TextLabelCommon>
                                                <FormSelect
                                                    options={valueWorkTypes ?? []}
                                                    fieldName="WorkType"
                                                    validate={[Validator.required]}
                                                    placeholder={"Chọn hình thức"}
                                                />
                                            </FormItem>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Nguồn tuyển dụng</TextLabelCommon>
                                                <FormSelect
                                                    options={TakeRecruiinfoby ?? []}
                                                    fieldName="TakeRecruitmentinfoby"
                                                    validate={[Validator.required]}
                                                    placeholder={"Chọn nguồn ứng viên apply"}
                                                />
                                            </FormItem>
                                        </FormGroupSearch>
                                    }
                                />
                                <FormGroupSearchRow
                                    componentLeft={
                                        <FormGroupSearch>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Sẵn sàng đi công tác</TextLabelCommon>
                                                <FormSelect
                                                    options={Constant.ISONBUSiIESSTRIP ?? []}
                                                    fieldName="IsOnBusinessTrip"
                                                    validate={[Validator.required]}
                                                    placeholder={"Chọn hình thức"}
                                                />
                                            </FormItem>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Chiều cao (cm)</TextLabelCommon>
                                                <FormInput
                                                    fieldName="Height"
                                                    validate={[Validator.required]}
                                                    placeholder={"Nhập chiều cao"}
                                                />
                                            </FormItem>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Cân nặng</TextLabelCommon>
                                                <FormInput
                                                    fieldName="Weight"
                                                    validate={[Validator.required]}
                                                    placeholder={"Nhập cân nặng"}
                                                />
                                            </FormItem>
                                        </FormGroupSearch>
                                    }
                                />
                                <FormGroupSearchRow
                                    componentLeft={
                                        <FormGroupSearch>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1" require>Nhân sự thu hút</TextLabelCommon>
                                                <FormSelect
                                                    options={Employee ?? []}
                                                    fieldName="IntroducerId"
                                                    validate={[Validator.required]}
                                                    placeholder={"Chọn nhân sự thu hút"}
                                                />
                                            </FormItem>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1">Cộng tác viên</TextLabelCommon>
                                                <FormSelect
                                                    options={Employee ?? []}
                                                    fieldName="collaborators"
                                                    validate={[]}
                                                    placeholder={"Chọn cộng tác viên"}
                                                />
                                            </FormItem>
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-proposal mb-1">CV ứng viên</TextLabelCommon>
                                                <FormInputUpload
                                                    fieldName="FileCv"
                                                    validate={[]}
                                                    placeholder={"Chọn CV"}
                                                    listFile={valueFileCV}
                                                />
                                            </FormItem>
                                        </FormGroupSearch>
                                    }
                                />
                            </BoxV3>
                            <BoxV3 iconTitleLeft={<IcDropDetail />} boxTitle='Trình độ học vấn'>
                                <FormGroupSearchRow>
                                    {edurow.map((row, index) => (
                                        <ChangeRowEduCandidate
                                            stt={index}
                                            handleDeleteEdu={handleDeleEdu}
                                            nameTable={"CandidateEducations"}
                                            EducationLv={EducationLv}
                                            ModeOfStudys={ModeOfStudys}
                                        />
                                    ))}
                                </FormGroupSearchRow>
                                <div className={"add_new"} style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        handleAaddEdu();
                                    }}>
                                    <IcAdd />
                                </div>
                            </BoxV3>
                            <BoxV3 iconTitleLeft={<IcDropDetail />} boxTitle='Kinh nghiệm làm việc'>
                                <FormGroupSearchRow>
                                    {exprow.map((row, index) => (
                                        <ChangeRowExpCandidate
                                            stt={index}
                                            handleDeleteExp={handleDeleExp}
                                            nameTable={"CandidateExperiences"}
                                            methods={methods}
                                        />
                                    ))}
                                </FormGroupSearchRow>
                                <div className={"add_new"} style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        handleAaddExp();
                                    }}>
                                    <IcAdd />
                                </div>
                            </BoxV3>
                        </>
                    }
                    <FooterManage titleBack={'Quay lại '} back={true}>
                        <div className="d-flex justify-content-end align-items-center">
                            <ButtonCommon
                                // loading={isLoading}
                                disabled={!canSubmit}
                                className='mr-3'
                                type='button' onClick={() => handleCancel()}
                                typeColor='border-red'>
                                Hủy bỏ
                            </ButtonCommon>
                            <LoadingButton
                                // loading={isLoading}
                                disabled={!canSubmit}
                                type='submit'>
                                Lưu
                            </LoadingButton>
                        </div>
                    </FooterManage>
                </div>
            </form>
        </CustomFormProvider >
    )
}
export default AddNewCandidate