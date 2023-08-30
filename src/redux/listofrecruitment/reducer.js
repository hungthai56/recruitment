import { produce } from "immer";
import actions from "./action";

const initState = {
    isLoading: false,
    isLoadingheader: false,
    recruitmentList: [],
    paging: [],
    listStatus: [],
    recruitment: [],
    id: 0,
    dataMaster: [],
    listPositions: [],
    provinces: [],
    recruitmentDetail: [],
    statusupdate: [],
    listdepartments: [],
    listrecruitmentProposals: [],
    listemployees: [],
    listRecruitmentProposalsID: [],
    listRecruitmentCouncils: [],
    listrecruitmentproposalsidnew: [],
    listRecruitmentCandidates:[],
};

export default (state = initState, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case actions.GET_ALL_DATA_RECRUITMENTS:
                draft.isLoading = true;
                draft.isLoadingheader = true;
                break;
            case actions.GET_ALL_DATA_RECRUITMENTS_SUCCESS:
                draft.isLoading = false;
                draft.recruitmentList = payload.Recruitments;
                draft.paging = payload.Paging;
                break;
            case actions.GET_ALL_DATA_RECRUITMENTS_FAILURE:
                draft.isLoading = false;
            case actions.GET_DATA_RECRUITMENTS_MARTER:
                draft.isLoading = true;
                break;
            case actions.GET_DATA_RECRUITMENTS_MARTER_SUCCESS:
                draft.isLoading = false;
                draft.listStatus = payload.Status;
                draft.listPositions = payload.Positions;
                draft.provinces = payload.Provinces.flatMap(province => province.Branches);
                draft.dataMaster = payload;
                draft.listdepartments = payload.Departments;
                draft.listrecruitmentProposals = payload.RecruitmentProposals;
                break;
            case actions.GET_DATA_RECRUITMENTS_MARTER_FAILURE:
                draft.isLoading = false;
            case actions.GET_DATA_RECRUITMENTS_DETAIL:
                draft.isLoading = true;
                break;
            case actions.GET_DATA_RECRUITMENTS_DETAIL_SUCCESS:
                draft.isLoading = false;
                draft.recruitment = payload?.Recruitment;
                draft.listRecruitmentCouncils = payload?.RecruitmentCouncils;
                draft.listRecruitmentCandidates= payload?.ListCandidates;
                break;
            case actions.GET_DATA_RECRUITMENTS_DETAIL_FAILURE:
                draft.isLoading = false;
            case actions.POST_ADD_RECRUITMENTS:
                draft.isLoading = true;
                break;
            case actions.POST_ADD_RECRUITMENTS_SUCCESS:
                draft.isLoading = false;
                draft.id = payload.Data.Id;
                break;
            case actions.POST_ADD_RECRUITMENTS_FAILURE:
                draft.isLoading = false;
                break;
            case actions.POST_STATUS_DATA:
                draft.isLoading = true;
                break;
            case actions.POST_STATUS_DATA_SUCCESS:
                draft.isLoading = false;
                draft.id = payload.Data;
                break;
            case actions.POST_STATUS_DATA_FAILURE:
                draft.isLoading = false;
                break;
            case actions.DELETE_RECRUITMENTS_DATA:
                draft.isLoading = true;
                break;
            case actions.DELETE_RECRUITMENTS_DATA_SUCCESS:
                draft.isLoading = false;
                draft.id = payload.Data.Id;
                break;
            case actions.DELETE_RECRUITMENTS_DATA_FAILURE:
                draft.isLoading = false;
                break;
            case actions.POST_STATUS_DATA_ID:
                draft.isLoading = true;
                break;
            case actions.POST_STATUS_DATA_ID_SUCCESS:
             
                draft.isLoading = false;
                draft.recruitment = payload.Recruitment;
                break;
            case actions.POST_STATUS_DATA_ID_FAILURE:
                draft.isLoading = false;
            case actions.UPDATE_RECRUITMENTS_DATA:
                draft.isLoading = true;
                break;
            case actions.UPDATE_RECRUITMENTS_DATA_SUCCESS:
                draft.isLoading = false;
                draft.recruitment = payload.Recruitment;
                break;
            case actions.UPDATE_RECRUITMENTS_DATA_FAILURE:
                draft.isLoading = false;
                break;
            case actions.GET_DATA_EMPLOYEES:
                draft.isLoading = true;
                break;
            case actions.GET_DATA_EMPLOYEES_SUCCESS:
                draft.isLoading = false;
                draft.listemployees = payload.Employees;
                break;
            case actions.GET_DATA_EMPLOYEES_FAILURE:
                draft.isLoading = false;
                break;
            /////
            case actions.GET_DATA_RECRUITMENT_PROPOSSAL_ID:
                draft.isLoading = true;
                break;
            case actions.GET_DATA_RECRUITMENT_PROPOSSAL_ID_SUCCESS:
                draft.isLoading = false;
                draft.listRecruitmentProposalsID = payload;
                break;
            case actions.GET_DATA_RECRUITMENT_PROPOSSAL_ID_FAILURE:
                draft.isLoading = false;
                break;
            case actions.GET_DATA_LIST_RECRUITMENT_PROPOSSAL:
                draft.isLoading = true;
                break;
            case actions.GET_DATA_LIST_RECRUITMENT_PROPOSSAL_ID_SUCCESS:
                draft.isLoading = false;
                draft.listrecruitmentproposalsidnew = payload.RecruitmentProposals;
                break;
            case actions.GET_DATA_LIST_RECRUITMENT_PROPOSSAL_ID_FAILURE:
                draft.isLoading = false;
                break;
            ///
            case actions.DELETE_RECRUITMENTS_DATA_ALL_ID:
                draft.isLoading = true;
                break;
            case actions.DELETE_RECRUITMENTS_DATA_ALL_ID_SUCCESS:
                draft.isLoading = false;
                draft.id = payload.Data.Id;
                break;
            case actions.DELETE_RECRUITMENTS_DATA_ALL_ID_FAILURE:
                draft.isLoading = false;
                break;
            ////
            case actions.DELETE_RECRUITMENTS_DATA_ALL_ID:
                draft.isLoading = true;
                break;
            case actions.DELETE_RECRUITMENTS_DATA_ALL_ID_SUCCESS:
                draft.isLoading = false;
                draft.id = payload.Data.Id;
                break;
            case actions.DELETE_RECRUITMENTS_DATA_ALL_ID_FAILURE:
                draft.isLoading = false;
                break;

      default:
        return draft;
    }
  });
