import React, { useEffect, useState } from 'react';
import styles from './AddNewRecuitmentProposal.module.scss';
import { Box } from '@findxdn/erp-theme';
import { useForm } from 'react-hook-form';
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
import FormEditor from 'shared/components/common/custom-form/FormEditor';
import Constant from 'utils/Constants';
import Validator from 'utils/Validator';
import FormDatePicker from '../../components/common/custom-form/FormDatePicker';
import actionProposal from '../../../redux/recruitment-proposal/action';
import ButtonCommon from 'shared/components/common/button/ButtonCommon';
import RouterPath from 'router/RouterPath';
import useRouter from 'hooks/use-router';
import action from '../../../redux/recruitment-proposal/action';
import FormInputV2 from 'shared/components/common/custom-form/FormInputV2';
import FormTextArea from 'shared/components/common/custom-form/FormTextArea';
import FormDatePickerV2 from 'shared/components/common/custom-form/FormDatePickerV2';
import BoxV3 from 'shared/components/common/box/BoxV3';
import FormTextAreaV2 from 'shared/components/common/custom-form/FormTextAreaV2';
import FooterManageV2 from 'shared/components/footer/FooterManageV2';

function AddNewRecuitmentProposal(props) {
    const { ProposeId } = props;
    const router = useRouter();
    const methods = useForm();
    const [valueTab, setValueTab] = useState(1);
    const [canSubmit, setCanSubmit] = useState(true);
    const [editorReady, setEditorReady] = useState(false);
    const [listBranches, setListBranches] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const proposeDetail = useSelector((state) => state.AppReruitmentProposal?.ProposeDetail);
    const dispatch = useDispatch();

    let watchValue = methods.watch(['SalaryFrom', 'SalaryTo', 'AgeFrom', 'AgeTo']);
    useEffect(() => {
        if (!watchValue[0]) {
            return;
        }
        if (!watchValue[1]) {
            return;
        }

        methods.trigger('SalaryFrom');
        methods.trigger('SalaryTo');
    }, [watchValue[0], watchValue[1]]);
    useEffect(() => {
        if (!watchValue[2]) {
            return;
        }
        if (!watchValue[3]) {
            return;
        }

        methods.trigger('AgeFrom');
        methods.trigger('AgeTo');
    }, [watchValue[2], watchValue[3]]);

    useEffect(() => {
        dispatch({
            type: action.FETCH_PROPOSED_MASTER,
            payload: {},
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: action.GET_PROPOSE_DETAIL_START,
            payload: ProposeId ?? 0,
        });
    }, [ProposeId]);

    const onSubmit = (data) => {
        let params = {
            Id: 0,
            Department: String(data?.Department),
            Quantity: Number(data?.Quantity) ?? 0,
            Gender: data?.Gender ?? '',
            Reason: data?.Reason ? String(data?.Reason) : '',
            Title: data.Title ?? '',
            DateTo: data?.DateTo,
            SalaryFrom: data?.SalaryFrom ? Number(data?.SalaryFrom) : 0,
            SalaryTo: data?.SalaryTo ? Number(data?.SalaryTo) : 0,
            Descriptions: data?.Descriptions || '',
            AgeFrom: data?.AgeFrom ? Number(data?.AgeFrom) : 0,
            AgeTo: data?.AgeTo ? Number(data?.AgeTo) : 0,
            Level: data?.Level ? Number(data?.Level) : 0,
            Specialized: data?.Specialized ? String(data?.Specialized) : '',
            Experience: data?.Experience ? String(data?.Experience) : '',
            Branches: [],
            Positions: [],
            ForeignLanguage: [],
            WorkTypes: [],
            Note: '',
        };

        try {
            const parseIds = (field, idType) => {
                return field.split(',').map((id) => ({
                    Id: idType === 'string' ? id.trim() : parseInt(id.trim()),
                }));
            };

            if (data?.Provinces) {
                params.Branches = parseIds(String(data?.Provinces), 'int');
            }
            if (data?.ForeignLanguage) {
                params.ForeignLanguage = parseIds(String(data?.ForeignLanguage), 'int');
            }
            if (data?.WorkType) {
                params.WorkTypes = parseIds(String(data?.WorkType), 'int');
            }
            if (data?.Position) {
                params.Positions = parseIds(String(data?.Position), 'string');
            }

            if (proposeDetail?.Id) {
                if (
                    Array.isArray(params.ForeignLanguage) &&
                    params.ForeignLanguage.length === 1 &&
                    isNaN(params.ForeignLanguage[0].Id)
                ) {
                    params.ForeignLanguage = [];
                }
                params['Id'] = Number(proposeDetail?.Id);
                dispatch({
                    type: actionProposal.UPDATE_PROPOSED_LOCATION,
                    payload: params,
                    callback: (id) => {
                        router.push({
                            pathname: RouterPath.getRouteWithId(RouterPath.RECRUITMENT_PROPOSAL_DETAIL, id),
                        });
                    },
                });
            } else {
                dispatch({
                    type: actionProposal.CREATE_PROPOSED_LOCATION,
                    payload: params,
                    callback: () => {
                        router.push({
                            pathname: RouterPath.RECRUITMENTPRO,
                        });
                    },
                });
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleCancel = () => {
        router.push({ pathname: RouterPath.RECRUITMENTPRO });
    };
    const {
        PositionByDepartment,
        Branches,
        Provinces,
        Gender,
        Level,
        ForeignLanguage,
        Status,
        WorkType,
        listProposal,
        isLoading,
        paging,
        Departments,
    } = useSelector((state) => state.AppReruitmentProposal);
    const ConvertStringData = (data, type) => {
        let textLabel = [];
        const objReturn = Object.entries(data);
        for (let i = 0; i < objReturn.length; i++) {
            let element = objReturn[i];
            let value = element[0];
            if (type === 'Gender' || type === 'Department') {
                textLabel.push({ value, label: element[1] });
            } else {
                value = parseInt(value);
                textLabel.push({ value, label: element[1] });
            }
        }
        return { textLabel };
    };

    const ConvertStringDataProvinces = (data) => {
        let textLabel = [];
        for (let i = 0; i < data.length; i++) {
            let province = data[i];
            let value = parseInt(province.Id);
            let label = province.Name;
            textLabel.push({ value, label });
        }
        return { textLabel };
    };

    let ForeignLanguages = ConvertStringData(ForeignLanguage).textLabel;
    let Province = ConvertStringDataProvinces(Branches).textLabel;
    let Department = ConvertStringData(Departments, 'Department').textLabel;
    let Genders = ConvertStringData(Gender, 'Gender').textLabel;
    let Levels = ConvertStringData(Level).textLabel;
    let workTypeCustom = ConvertStringData(WorkType).textLabel;

    let Position = [];
    let existingValues = {};
    if (PositionByDepartment) {
        for (let i = 0; i < PositionByDepartment.length; i++) {
            let element = PositionByDepartment[i];
            if (!existingValues[element.Id]) {
                Position.push({
                    key: element.Id,
                    value: element.Id,
                    label: element.Name,
                });
                existingValues[element.Id] = true;
            }
        }
    }

    useEffect(() => {
        if (proposeDetail && ProposeId) {
            methods.setValue('Title', proposeDetail?.Title),
                methods.setValue('Department', proposeDetail?.Department),
                methods.setValue('Position', proposeDetail?.Position),
                methods.setValue('WorkType', proposeDetail?.WorkType),
                methods.setValue('Provinces', proposeDetail?.BranchId),
                methods.setValue('Quantity', proposeDetail?.Quantity),
                methods.setValue('DateTo', proposeDetail?.DateTo),
                methods.setValue('SalaryFrom', proposeDetail?.SalaryFrom),
                methods.setValue('SalaryTo', proposeDetail?.SalaryTo),
                methods.setValue('Gender', proposeDetail?.Gender),
                methods.setValue('AgeFrom', proposeDetail?.AgeFrom),
                methods.setValue('AgeTo', proposeDetail?.AgeTo),
                methods.setValue('Reason', proposeDetail?.Reason),
                methods.setValue('Level', proposeDetail?.Level),
                methods.setValue('Specialized', proposeDetail?.Specialized),
                methods.setValue('ForeignLanguage', proposeDetail?.ForeignLanguage),
                methods.setValue('Experience', proposeDetail?.Experience),
                methods.setValue('Descriptions', proposeDetail?.Descriptions);
        } else {
            methods.setValue(''), '';
        }
    }, [proposeDetail, ProposeId]);

    useEffect(() => {
        if (methods.watch('Department') !== null && methods.watch('Department') !== undefined) {
            setIsDisabled(false);
            dispatch({
                type: action.FETCH_POSITION_LIST,
                payload: methods.watch('Department'),
            });
        } else {
            setIsDisabled(true);
        }
    }, [methods.watch('Department')]);

    useEffect(() => {
        if (!methods.watch('Reason')) {
            return;
        }
        methods.trigger('Reason');
    }, [methods.watch('Reason')]);

    useEffect(() => {
        if (!methods.watch('DateTo')) {
            return;
        }
        methods.trigger('DateTo');
    }, [methods.watch('DateTo')]);

    return (
        <CustomFormProvider {...methods}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginBottom: '44px',
                }}
            >
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <div className={styles['box-container']}>
                        {valueTab == 1 && (
                            <>
                                <Box boxTitle="Thông tin đề xuất">
                                    <FormGroupSearchRow
                                        componentLeft={
                                            <FormGroupSearch className="col-12 p-0 column-gap-3">
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online" require>
                                                        Tên đề xuất
                                                    </TextLabelCommon>
                                                    <FormInput
                                                        fieldName="Title"
                                                        validate={[Validator.required]}
                                                        placeholder={'Nhập tên đề xuất'}
                                                    />
                                                </FormItem>
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online" require>
                                                        Bộ phận đề xuất
                                                    </TextLabelCommon>
                                                    <FormSelect
                                                        onChangeSelect={(value) => {
                                                            methods.setValue('Position', '');
                                                        }}
                                                        isPortal={true}
                                                        options={Department ?? []}
                                                        fieldName="Department"
                                                        validate={[Validator.required]}
                                                        placeholder={'Chọn bộ phận'}
                                                    />
                                                </FormItem>
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online" require>
                                                        Vị trí đề xuất
                                                    </TextLabelCommon>
                                                    <FormSelect
                                                        disabled={isDisabled}
                                                        isPortal={true}
                                                        isMulti
                                                        options={Position ?? []}
                                                        fieldName="Position"
                                                        validate={isDisabled ? [] : [Validator.required]}
                                                        placeholder={'Chọn vị trí'}
                                                    />
                                                </FormItem>
                                            </FormGroupSearch>
                                        }
                                    />
                                    <FormGroupSearchRow
                                        componentLeft={
                                            <FormGroupSearch className="col-12 p-0 column-gap-3">
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online" require>
                                                        Hình thức làm việc
                                                    </TextLabelCommon>
                                                    <FormSelect
                                                        isPortal={true}
                                                        isMulti
                                                        options={workTypeCustom ?? []}
                                                        fieldName="WorkType"
                                                        validate={[Validator.required]}
                                                        placeholder={'Chọn hình thức làm việc'}
                                                    />
                                                </FormItem>
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online" require>
                                                        Địa chỉ làm việc
                                                    </TextLabelCommon>
                                                    <FormSelect
                                                        isPortal={true}
                                                        isMulti
                                                        options={Province ?? []}
                                                        fieldName="Provinces"
                                                        validate={[Validator.required]}
                                                        placeholder={'Chọn chi nhánh'}
                                                    />
                                                </FormItem>
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online" require>
                                                        Số lượng tuyển
                                                    </TextLabelCommon>
                                                    <FormInputV2
                                                        format="money"
                                                        min={0}
                                                        max={100}
                                                        fieldName="Quantity"
                                                        validate={[Validator.required]}
                                                        placeholder={'0'}
                                                    />
                                                </FormItem>
                                            </FormGroupSearch>
                                        }
                                    />
                                    <FormGroupSearchRow
                                        componentLeft={
                                            <FormGroupSearch className="col-12 p-0 column-gap-3">
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online" require>
                                                        Hạn tuyển
                                                    </TextLabelCommon>
                                                    <FormDatePickerV2
                                                        fieldName="DateTo"
                                                        validate={[Validator.required, Validator.checkMinDate]}
                                                        placeholder="dd/mm/yyyy"
                                                    />
                                                </FormItem>
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online">
                                                        Mức lương (từ)
                                                    </TextLabelCommon>
                                                    <FormInputV2
                                                        format="money"
                                                        fieldName="SalaryFrom"
                                                        validate={[Validator.CheckedNumber(watchValue[1], 1)]}
                                                        placeholder={'1.000.0000'}
                                                    />
                                                </FormItem>
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online">
                                                        Mức lương (đến)
                                                    </TextLabelCommon>
                                                    <FormInputV2
                                                        format="money"
                                                        fieldName="SalaryTo"
                                                        validate={[Validator.CheckedNumber(watchValue[0], 2)]}
                                                        placeholder={'1.000.0000'}
                                                    />
                                                </FormItem>
                                            </FormGroupSearch>
                                        }
                                    />
                                    <FormGroupSearchRow
                                        componentLeft={
                                            <FormItem className="w-100 form-item">
                                                <TextLabelCommon className="form-online" require>
                                                    Lý do tuyển
                                                </TextLabelCommon>
                                                <FormTextAreaV2
                                                    className={styles['form-textarea']}
                                                    fieldName="Reason"
                                                    validate={[Validator.maxLength(1000), Validator.required]}
                                                    placeholder={'Nhập lý do tuyển'}
                                                />
                                            </FormItem>
                                        }
                                    />
                                </Box>
                                <Box boxTitle="Yêu cầu ứng viên">
                                    <FormGroupSearchRow
                                        componentLeft={
                                            <FormGroupSearch className="col-12 p-0 column-gap-3">
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online">Giới tính</TextLabelCommon>
                                                    <FormSelect
                                                        isPortal={true}
                                                        options={Genders ?? []}
                                                        fieldName="Gender"
                                                        validate={[]}
                                                        placeholder={'Chọn giới tính'}
                                                    />
                                                </FormItem>
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online">
                                                        Độ tuổi từ
                                                    </TextLabelCommon>
                                                    <FormInputV2
                                                        format="money"
                                                        min={0}
                                                        max={65}
                                                        fieldName="AgeFrom"
                                                        validate={[Validator.CheckedNumber(watchValue[3], 1)]}
                                                        placeholder={'1'}
                                                    />
                                                </FormItem>
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online">
                                                        Độ tuổi đến
                                                    </TextLabelCommon>
                                                    <FormInputV2
                                                        format="money"
                                                        min={0}
                                                        max={65}
                                                        fieldName="AgeTo"
                                                        validate={[Validator.CheckedNumber(watchValue[2], 2)]}
                                                        placeholder={'65'}
                                                    />
                                                </FormItem>
                                            </FormGroupSearch>
                                        }
                                    />
                                    <FormGroupSearchRow
                                        componentLeft={
                                            <FormGroupSearch className="col-12 p-0 column-gap-3">
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online">Trình độ</TextLabelCommon>
                                                    <FormSelect
                                                        isPortal={true}
                                                        options={Levels ?? []}
                                                        fieldName="Level"
                                                        validate={[]}
                                                        placeholder={'Chọn trình độ'}
                                                    />
                                                </FormItem>
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online">
                                                        Chuyên ngành
                                                    </TextLabelCommon>
                                                    <FormInput
                                                        fieldName="Specialized"
                                                        validate={[]}
                                                        placeholder={'Nhập chuyên ngành'}
                                                    />
                                                </FormItem>
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online">Ngoại ngữ</TextLabelCommon>
                                                    <FormSelect
                                                        isPortal={true}
                                                        isMulti
                                                        options={ForeignLanguages ?? []}
                                                        fieldName="ForeignLanguage"
                                                        validate={[]}
                                                        placeholder={'Chọn ngoại ngữ'}
                                                    />
                                                </FormItem>
                                            </FormGroupSearch>
                                        }
                                    />
                                    <FormGroupSearchRow
                                        componentLeft={
                                            <FormGroupSearch className="col-12 p-0 column-gap-3">
                                                <FormItem className="w-100 form-item">
                                                    <TextLabelCommon className="form-online">
                                                        Kinh nghiệm
                                                    </TextLabelCommon>
                                                    <FormSelect
                                                        isPortal={true}
                                                        options={Constant.INPUT_EXP ?? []}
                                                        fieldName="Experience"
                                                        validate={[]}
                                                        placeholder={'Chọn kinh nghiệm'}
                                                    />
                                                </FormItem>
                                            </FormGroupSearch>
                                        }
                                    />
                                </Box>
                                <Box boxTitle="Mô tả công việc">
                                    <FormGroupSearchRow
                                        componentLeft={
                                            <FormItem className="w-100 form-item">
                                                <div className="" height={window.innerHeight - 360}>
                                                    <FormEditor
                                                        fieldName="Descriptions"
                                                        validate={[]}
                                                        placeholder="Nhập chính sách khách hàng thành viên..."
                                                        setCanSubmit={setCanSubmit}
                                                    />
                                                </div>
                                            </FormItem>
                                        }
                                    />
                                </Box>
                            </>
                        )}
                        <FooterManageV2 titleBack={'Quay lại'} back={true} routerPath={RouterPath.RECRUITMENTPRO}>
                            <div className="d-flex justify-content-end align-items-center">
                                <ButtonCommon
                                    disabled={!canSubmit}
                                    className="mr-3"
                                    type="button"
                                    onClick={handleCancel}
                                    typeColor="border-red"
                                >
                                    Huỷ bỏ
                                </ButtonCommon>
                                <LoadingButton loading={isLoading} disabled={!canSubmit} type="submit">
                                    Lưu
                                </LoadingButton>
                            </div>
                        </FooterManageV2>
                    </div>
                </form>
            </div>
        </CustomFormProvider>
    );
}
export default AddNewRecuitmentProposal;
