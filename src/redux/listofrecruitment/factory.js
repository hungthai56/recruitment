import ApiConstants from 'adapter/ApiConstants';
import ApiOperation from 'adapter/ApiOperation';
import Constants from 'utils/Constants';

const AppFactory = {
    dataMaster: () =>
        ApiOperation.request({
            url: ApiConstants.GET_RECRUITMENT_MASTER,
            method: 'GET',
        }),
    fetchGetData: (data) => {
        let param = {};
        if (data[Constants.QueryParam.Limit.VALUE]) {
            param["PageSize"] = data[Constants.QueryParam.Limit.VALUE];
        } else {
            param["PageSize"] = Constants.RECRUITMENT.LIMIT;
        }
        if (data[Constants.QueryParam.Page.VALUE] && data[Constants.QueryParam.Page.VALUE] != -1) {
            param['CurrentPage'] = data[Constants.QueryParam.Page.VALUE];
        } else {
            param['CurrentPage'] = Constants.RECRUITMENT.OFFSET;
        }
        if (data[Constants.QueryParam.Position.VALUE]) {
            param['Position'] = data[Constants.QueryParam.Position.VALUE];
        }
        if (data[Constants.QueryParam.Status.VALUE]) {
            param['Status'] = data[Constants.QueryParam.Status.VALUE];
        }
        if (data[Constants.QueryParam.BranchId.VALUE]) {
            param['BranchId'] = data[Constants.QueryParam.BranchId.VALUE];
        }
        if (data[Constants.QueryParam.ProposalId.VALUE]) {
            param['ProposalId'] = data[Constants.QueryParam.ProposalId.VALUE];
        }
        if (data[Constants.QueryParam.CreatedAt.VALUE]) {
            param['CreatedAt'] = data[Constants.QueryParam.CreatedAt.VALUE];
        }
        if (data[Constants.QueryParam.From.VALUE]) {
            param['From'] = data[Constants.QueryParam.From.VALUE];
        }
        if (data[Constants.QueryParam.To.VALUE]) {
            param['To'] = data[Constants.QueryParam.To.VALUE];
        }
        if (data[Constants.QueryParam.Search.VALUE]) {
            param['Search'] = data[Constants.QueryParam.Search.VALUE];
        }
        return ApiOperation.request({
            url: ApiConstants.GET_RECRUITMENT_LIST,
            method: 'GET',
            params: param,
        })
    },
    fetchGetDataDetail: (payload) => {
        return ApiOperation.request({
            url: `${ApiConstants.GET_RECRUITMENT_DETAIL_LIST}/${payload}`,
            method: 'GET',
        })
    },
    postAddData: (data) => {
        let Branches = data?.Branches;
        let FileImage = data?.FileImage;
        let RecruitmentCouncils ="";
        if(data?.RecruitmentCouncils?.length>0){
             RecruitmentCouncils = data?.RecruitmentCouncils.map(x => x?.member);
        }
        const formData = new FormData();
        Object.keys(data).map(key => {
            if (typeof data[key] === 'object') {
            } else {
                formData.append(`${key}`, data[key] ? data[key] : '')
            }
        })
        if (Branches?.length > 0) {
            Branches?.map((x, index) => {
                formData.append(`Branches[${index}].Id`, x)
            })
        }
        if (RecruitmentCouncils?.length > 0) {
            RecruitmentCouncils?.map((x, index) => {
                formData.append(`RecruitmentCouncils[${index}].Id`, x)
            })
        }
        if (FileImage?.length > 0) {
            formData.append('FileImage', FileImage?.[0].file);
        }
        return ApiOperation.request({
            url: `${ApiConstants.CREATE_RECRUITMENT_DATA}`,
            method: 'POST',
            data: formData,
        })
    },
    postStatusData: (payload) => {
        let params = {
            "Id": payload.data.item.Id,
            "Status": payload.data.Status
        }
        const jsonData = JSON.stringify(params);
        return ApiOperation.request({
            url: `${ApiConstants.STATUS_RECRUITMENT_DATA}`,
            method: 'POST',
            data: jsonData,
        })

    },
    deleteRecruitment: (data) => {
        let dataarr = data.data;
        const convertedArr = dataarr.map(item => parseInt(item));
        return ApiOperation.request({
            url: `${ApiConstants.DELETE_RECRUITMENT_DATA}`,
            method: 'POST',
            data: convertedArr,
        })

    },
    deleteRecruitmentAll: (data) => {
        return ApiOperation.request({
            url: `${ApiConstants.DELETE_RECRUITMENT_DATA}`,
            method: 'POST',
            data: [...data],
        })

    },
    deleteRecruitmentDetail: (data) => {
        let dataarr = data;
        const convertedArr = dataarr.map(item => parseInt(item));
        return ApiOperation.request({
            url: `${ApiConstants.DELETE_RECRUITMENT_DATA}`,
            method: 'POST',
            data: convertedArr,
        })

    },
    fetchStatusDetail: (payload) => {
        let paramstatus = {
            "Id": payload.data.recruitment.Id,
            "Status": payload.data.Status
        }
        const jsonData = JSON.stringify(paramstatus);
        ApiOperation.request({
            url: `${ApiConstants.STATUS_RECRUITMENT_DATA}`,
            method: 'POST',
            data: jsonData,
        })
        return ApiOperation.request({
            url: `${ApiConstants.GET_RECRUITMENT_DETAIL_LIST}/${payload.data.recruitment.Id}`,
            method: 'GET',
        })
    },
    updateRecruitment: (data) => {
        const formData = new FormData();
        let Branches = data?.Branches;
        let RecruitmentCouncils ="";
        if(data?.RecruitmentCouncils?.length>0){
             RecruitmentCouncils = data?.RecruitmentCouncils.map(x => x?.member);
        }
        delete data['Branches'];
        Object.keys(data).map(key => {
            if (typeof data[key] === 'object' && key !== 'Branches') {
                // update những file có thay đổi
                if (data[key][0].file) {
                    formData.append(key, data[key][0].file);
                }
            } else {
                formData.append(`${key}`, data[key] ? data[key] : '')
            }
        })
        if (Branches?.length > 0) {
            Branches?.map((x, index) => {
                formData.append(`Branches[${index}].Id`, x)
            })
        }
        if (RecruitmentCouncils?.length > 0) {
            RecruitmentCouncils?.map((x, index) => {

                formData.append(`RecruitmentCouncils[${index}].Id`, x)
            })
        }
        return ApiOperation.request({
            url: `${ApiConstants.UPDATE_RECRUITMENT_DATA}`,
            method: 'PUT',
            data: formData,
        })
    },
    fetchGetEmployees: () =>
        ApiOperation.request({
            url: ApiConstants.EMPLOYEES,
            method: 'GET',
        }),
    fetchGetDataRecruitmentPopossalId: (payload) => {
       return ApiOperation.request({
            url: `${ApiConstants.RECRUITMENT_PROPOSSAL}/${payload}`,
            method: 'GET',
        })
    },
    fetchGetDataListRecruitmentPopossalId: (payload) => {
        return ApiOperation.request({
            url: `${ApiConstants.LIST_RECRUITMENT_PROPOSSAL}/${payload}`,
            method: 'GET',
        })
    }
};

export default AppFactory;
