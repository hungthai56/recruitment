import { produce } from 'immer';
import actions from './action';
const initState = {
    isLoading: false,
    paging: {},
    titleProposal: [],
    listProposal: [],
    ProposeDetail: {},
    Positions: [],
    PositionByDepartment: [],
    Provinces: [],
    ForeignLanguage: [],
    Level: [],
    Branches: [],
    Status: [],
    WorkType: [],
    Employees: [],
    Departments: [],
    Gender: [],
    id: 0,
    statusId: {},
};
export default (stateRull = initState, { type, payload }) =>
    produce(stateRull, (draft) => {
        switch (type) {
            case actions.FETCH_POSITION_LIST:
                draft.isLoading = true;
                break;
            case actions.FETCH_POSITION_LIST_SUCCESS:
                draft.isLoading = false;
                draft.PositionByDepartment = payload;

                break;
            case actions.FETCH_POSITION_LIST_FAILURE:
                draft.isLoading = false;
                break;

            case actions.FETCH_PROPOSED_LOCATION:
                draft.isLoading = true;
                break;
            case actions.FETCH_PROPOSED_LOCATION_SUCCESS:
                draft.isLoading = false;
                draft.listProposal = payload.RecruitmentProposals;
                draft.paging = payload.Paging;
                break;
            case actions.FETCH_PROPOSED_LOCATION_FAILURE:
                draft.isLoading = false;
                break;
            case actions.FETCH_PROPOSED_LOCATION_LIST:
                draft.isLoading = true;
                break;
            case actions.FETCH_PROPOSED_LOCATION_LIST_SUCCESS:
                draft.listBanner = payload.Sliders;
                draft.paging = payload.Paging;
                draft.isLoading = false;
                break;
            case actions.FETCH_PROPOSED_LOCATION_LIST_FAILURE:
                draft.isLoading = false;
                break;
            case actions.GET_PROPOSE_DETAIL_START:
                draft.isLoading = true;
                break;
            case actions.GET_PROPOSE_DETAIL_START_SUCCESS:
                draft.isLoading = false;
                draft.ProposeDetail = payload.RecruitmentProposals;
                break;
            case actions.FETCH_PROPOSED_MASTER:
                draft.isLoading = true;
                break;
            case actions.FETCH_PROPOSED_MASTER_SUCCESS:
                draft.isLoading = false;
                draft.Branches = payload.Provinces.flatMap((province) => province.Branches);
                draft.Provinces = payload.Provinces;
                draft.ForeignLanguage = payload.ForeignLanguage;
                draft.Level = payload.Level;
                draft.Gender = payload.Gender;
                draft.Status = payload.Status;
                draft.WorkType = payload.WorkType;
                draft.Departments = payload.Departments;
                draft.Positions = payload.Positions;
                break;
            case actions.CREATE_PROPOSED_LOCATION:
                draft.isLoading = true;
                break;
            case actions.CREATE_PROPOSED_LOCATION_SUCCESS:
                draft.isLoading = false;
                draft.id = payload.Data.Id;
                break;
            case actions.CREATE_PROPOSED_LOCATION_FAILED:
                draft.isLoading = false;
                break;
            case actions.CHANGE_STATUS_PROPOSE:
                draft.isLoading = true;
                break;
            case actions.CHANGE_STATUS_PROPOSE_SUCCESS:
                draft.isLoading = false;
                draft.statusId = payload.payload;
                break;
            case actions.CHANGE_STATUS_PROPOSE_FAILED:
                draft.isLoading = false;
                break;
            case actions.DELETE_PROPOSED_LOCATION:
                draft.isLoading = true;
                break;
            case actions.DELETE_PROPOSED_LOCATION_SUCCESS:
                draft.isLoading = false;
                draft.statusId = payload.payload;
                break;
            case actions.DELETE_PROPOSED_LOCATION_FAILED:
                draft.isLoading = false;
                break;
            case actions.FETCH_EMPLOYEE_LIST:
                draft.isLoading = true;
                break;
            case actions.FETCH_EMPLOYEE_LIST_SUCCESS:
                draft.isLoading = false;
                draft.Employees = payload.Employees;
                break;
            case actions.FETCH_EMPLOYEE_LIST_FAILURE:
                draft.isLoading = false;
                break;

            default:
                return draft;
        }
    });
