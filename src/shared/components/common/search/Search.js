import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Constants from 'utils/Constants';
import FormActionSearch from 'shared/components/common/form/form-search/FormActionSearch';
import ButtonCommon from 'shared/components/common/button/ButtonCommon';
import { convertParamsToArray } from 'utils/Utils';
import FormGroupSearchRow from 'shared/components/common/form/form-search/FormGroupSearchRow';
import FormItem from 'shared/components/common/form/FormItem';
import FormGroupSearch from 'shared/components/common/form/form-search/FormGroupSearch';
import FormSelect from 'shared/components/common/custom-form/FormSelect';
import useRouterV2 from 'hooks/use-router-v2';
import CustomFormProvider from 'shared/components/common/custom-form/CustomFormProvider';
import Permission from 'utils/Permission';
import IconSearch from 'assets/images/icons/icon-search';
import FormInput from 'shared/components/common/custom-form/FormInput';
import ButtonSearch from 'shared/components/common/button/ButtonSearch';
import useQuery from 'hooks/use-query';
import { useSelector } from 'react-redux';
import Validator from 'utils/Validator';
import FormDatePicker from 'shared/components/common/custom-form/FormDatePicker';
import style from './Search.module.scss';
import entries from 'lodash/entries';
export default function Search(props) {
    const [openisload, setOpens] = useState(true);
    const { statusOptions, postionOptions, Province, optionsRecruitmentProposals, NameTable } = props;
    let defaultValues = { Search: '', Status: null, Position: null, BranchId: null, ProposalId: null, CreatedAt: null, From: null, To: null };
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { reset,
    } = methods;
    const [open, setOpen] = useState(false);
    const router = useRouterV2();
    const query = useQuery();
    const onSubmit = (data) => {
        let paramsNew = {
            [`${Constants.QueryParam.Status.VALUE}`]: data?.Status,
            [`${Constants.QueryParam.Position.VALUE}`]: data?.Position,
            [Constants.QueryParam.BranchId.VALUE]: data?.BranchId,
            [Constants.QueryParam.ProposalId.VALUE]: data?.ProposalId,
            [Constants.QueryParam.CreatedAt.VALUE]: data?.CreatedAt,
            [Constants.QueryParam.From.VALUE]: data?.From,
            [Constants.QueryParam.To.VALUE]: data?.To,
            [Constants.QueryParam.Page.VALUE]: Constants.PRODUCT_LIST_PAGINATION.OFFSET,
            [Constants.QueryParam.Limit.VALUE]: Constants.PRODUCT_LIST_PAGINATION.LIMIT,
            [Constants.QueryParam.Search.VALUE]: data?.Search,
        };

        router.replace({
            params: paramsNew,
        });
    };

    const handleResetButton = () => {
        reset(defaultValues);
        router.replace({
            params: {

            }
        })
    };
    useEffect(() => {
        if (router.get(Constants.QueryParam.Status.VALUE)) {
            methods.setValue('Status', router.get(Constants.QueryParam.Status.VALUE), { shouldDirty: true });
        } else {
            methods.setValue('Status', null, { shouldDirty: false })
        }
        if (router.get(Constants.QueryParam.Position.VALUE)) {
            methods.setValue('Position', router.get(Constants.QueryParam.Position.VALUE), { shouldDirty: true });
        } else {
            methods.setValue('Position', null, { shouldDirty: false })
        }
        if (router.get(Constants.QueryParam.BranchId.VALUE)) {
            methods.setValue("BranchId", router.get(Constants.QueryParam.BranchId.VALUE), { shouldDirty: true }, { open: true })
            setOpen(!open)
        } else {
            methods.setValue("BranchId", null,{ shouldDirty: false })
        }
        if (router.get(Constants.QueryParam.ProposalId.VALUE)) {
            methods.setValue("ProposalId", router.get(Constants.QueryParam.ProposalId.VALUE), { shouldDirty: true }, { open: true })
            setOpen(!open)
        } else {
            methods.setValue("ProposalId", null, { shouldDirty: false })
        }
        if (router.get(Constants.QueryParam.CreatedAt.VALUE)) {
            methods.setValue("CreatedAt", router.get(Constants.QueryParam.CreatedAt.VALUE), { shouldDirty: true })
            setOpen(!open)
        } else {
            methods.setValue("CreatedAt", null, { shouldDirty: false })
        }
        if (router.get(Constants.QueryParam.From.VALUE)) {
            methods.setValue("From", router.get(Constants.QueryParam.From.VALUE), { shouldDirty: true })
            setOpen(!open)
        } else {
            methods.setValue("From", null, { shouldDirty: false })
        }
        if (router.get(Constants.QueryParam.To.VALUE)) {
            methods.setValue("To", router.get(Constants.QueryParam.To.VALUE), { shouldDirty: true })
            setOpen(!open)
        } else {
            methods.setValue("To", null, { shouldDirty: false })
        }
        if (router.get(Constants.QueryParam.Search.VALUE)) {
            methods.setValue("Search", router.get(Constants.QueryParam.Search.VALUE), { shouldDirty: true })
        } else {
            methods.setValue("Search", '', { shouldDirty: false })
        }
    }, [
        router.get(Constants.QueryParam.Status.VALUE),
        router.get(Constants.QueryParam.Position.VALUE),
        router.get(Constants.QueryParam.BranchId.VALUE),
        router.get(Constants.QueryParam.ProposalId.VALUE),
        router.get(Constants.QueryParam.CreatedAt.VALUE),
        router.get(Constants.QueryParam.From.VALUE),
        router.get(Constants.QueryParam.To.VALUE),
        router.get(Constants.QueryParam.Search.VALUE),
    ])
   
    React.useEffect(() => {
        let queryParams = router.getAll();
        delete queryParams[Constants.QueryParam.Page.VALUE];
        delete queryParams[Constants.QueryParam.Limit.VALUE];
        delete queryParams[Constants.QueryParam.Offset.VALUE];
        const paramsArray = convertParamsToArray(queryParams);
        if (paramsArray.length == 0) {
            const values = methods.getValues()
            methods.reset(values)
        }
    }, [methods.isSubmitted, methods.getValues, methods.reset, router.get(Constants.ROUTER_URL.TYPE), query]);
  

    let Provinces = [];
    const resultProvince = Object.entries(Province);
    resultProvince.forEach((key) => {
        let valuer = { value: key[1].Id, label: key[1].Name };
        Provinces.push(valuer);
    });
    let Proposalslist = [];
    const recruitmentProposalslist = Object.entries(optionsRecruitmentProposals);
    recruitmentProposalslist.forEach((key) => {
        key[1].forEach((value) => {
            let valuers = { value: value.Id, label: value.Title };
            Proposalslist.push(valuers);
        });
    });

    return (
        <CustomFormProvider {...methods}>
            <form className='quick-submit' onSubmit={methods.handleSubmit(onSubmit)}>
                <FormGroupSearchRow
                    isShowFilter
                    type={NameTable}
                    isRequest={false}
                    isShowFilterColumnTable
                    componentLeft={
                        <FormGroupSearch isWrap={false}>
                            <FormItem style={{ flex: 2 }}>
                                <FormInput
                                    validate={[]}
                                    fieldName="Search"
                                    placeholder={'Tìm kiếm mã bài đăng, Tiêu đề'}
                                    icon={<IconSearch />}
                                />
                            </FormItem>
                            <FormItem style={{ flex: 1 }}>
                                <FormSelect
                                    validate={[]}
                                    options={statusOptions}
                                    fieldName="Status"
                                    placeholder={'Trạng thái'}
                                    isPortal={true}
                                />
                            </FormItem>
                            <FormItem style={{ flex: 1 }}>
                                <FormSelect
                                    validate={[]}
                                    options={postionOptions}
                                    fieldName="Position"
                                    placeholder={'Vị trí tuyển dụng'}
                                    isPortal={true}
                                />
                            </FormItem>

                        </FormGroupSearch>
                    }
                    componentRight={
                        <FormActionSearch>
                            <ButtonCommon
                                type="button"
                                onClick={() => {
                                    handleResetButton();
                                }}
                                typeColor="border-green"
                                disabled={!methods?.formState?.isDirty ? true : false}
                            >
                                Thiết lập lại
                            </ButtonCommon>
                            {
                                Permission.IsEnabledFunction(Permission.FUNCTIONS.SEARCH_JOBPOSTINGRECRUITMENT) && <ButtonSearch
                                    onClickSelect={() => setOpen(!open)}
                                    type="submit"
                                    typeColor="background-green"
                                >
                                    Tìm kiếm
                                </ButtonSearch>
                            }
                        </FormActionSearch>
                    }
                />
                {open && <FormGroupSearchRow
                    isShowFilter
                    type={NameTable}
                    isRequest={false}
                    isShowFilterColumnTable
                    componentLeft={
                        <FormGroupSearch isWrap={false}>
                            <FormItem style={{ flex: 1 }}>
                                <FormSelect
                                    fieldName="BranchId"
                                    validate={[]}
                                    options={Provinces ?? []}
                                    placeholder="Chi nhánh"
                                    isPortal={true}


                                />
                            </FormItem>
                            <FormItem style={{ flex: 1 }}>
                                <FormSelect
                                    validate={[]}
                                    options={Proposalslist}
                                    fieldName="ProposalId"
                                    placeholder={'Đề xuất tuyển dụng'}
                                    isPortal={true}
                                />
                            </FormItem>
                            <FormItem style={{ flex: 1 }}>
                                <FormDatePicker
                                    fieldName="CreatedAt"
                                    validate={[]}
                                    placeholder="Ngày tạo"
                                />
                            </FormItem>
                            <FormItem style={{ flex: 1 }}>
                                <FormDatePicker
                                    fieldName="From"
                                    validate={[]}
                                    // placeholder={"dd/mm/yyyy"}
                                    placeholder="Hạn tuyển từ"
                                />
                            </FormItem>
                            <FormItem style={{ flex: 1 }}>
                                <FormDatePicker
                                    fieldName="To"
                                    validate={[]}
                                    // placeholder={"dd/mm/yyyy"}
                                    placeholder="Hạn tuyển đến"
                                />
                            </FormItem>

                        </FormGroupSearch>
                    }
                />
                }
            </form>
        </CustomFormProvider>
    );
}
