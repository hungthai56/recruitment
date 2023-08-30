import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './RecruitmentsContainer.module.scss';
import useRouter from 'hooks/use-router';
import Constants from 'utils/Constants';
import InputSeach from 'shared/components/common/inputseach/InputSeach';
import Dropdown from 'shared/components/common/dropdown/Dropdown';
import Seacrch from 'shared/components/common/search/Search';
import TableV2 from 'shared/components/common/tablev2/Table';
import CommonPagination from 'shared/components/pagination/CommonPagination';
import CommonPaginationV2 from 'shared/components/pagination/CommonPaginationV2';
import { styled } from '@mui/system';
import { useSetState } from 'react-use';
import actionListOfRecruiters from 'redux/listofrecruitment/action';
import listofrecruits from 'App';
import mapKeys from 'lodash/mapKeys';
import { Box } from '@findxdn/erp-theme';
import entries from 'lodash/entries';
import RecruitmentTable from 'shared/components/common/tablev2/RecruitmentTableV1';
import useRouterV2 from 'hooks/use-router-v2';
function RecruitmentsContainer(props) {
    const dispatch = useDispatch();
    const router = useRouterV2();
    const { recruitmentList, isLoading, paging, dataMaster, isLoadingheader } = useSelector(
        (state) => state.Recruitment,
    );
    const statusOptions = useSelector((state) => state.Recruitment.listStatus);
    const postionOptions = useSelector((state) => state.Recruitment.listPositions);
    const provinceOptions = useSelector((state) => state.Recruitment.provinces);
    const recruitmentProposalslist = useSelector((state) => state.Recruitment.listrecruitmentProposals);
    useEffect(() => {
        dispatch({
            type: actionListOfRecruiters.GET_ALL_DATA_RECRUITMENTS,
            payload: { ...router.getAll() },
        });
    }, [router.get(Constants.QueryParam.Limit.VALUE),
    router.get(Constants.QueryParam.Offset.VALUE),
    router.get(Constants.QueryParam.Page.VALUE),
    router.get(Constants.QueryParam.Search.VALUE),
    router.get(Constants.QueryParam.Status.VALUE),
    router.get(Constants.QueryParam.Position.VALUE),
    router.get(Constants.QueryParam.BranchId.VALUE),
    router.get(Constants.QueryParam.ProposalId.VALUE),
    router.get(Constants.QueryParam.CreatedAt.VALUE),
    router.get(Constants.QueryParam.From.VALUE),
    router.get(Constants.QueryParam.To.VALUE),
    ]);
    useEffect(() => {
        dispatch({
            type: actionListOfRecruiters.GET_DATA_RECRUITMENTS_MARTER,
        });
    }, []);
    // useEffect(() => {
    //     dispatch({
    //         type: actionListOfRecruiters.GET_DATA_LIST_RECRUITMENT_PROPOSSAL,
    //         payload: 0,
    //     });
    // }, [])

    const PaginationWrapper = styled('div')({
        padding: '0 10px',
        backgroundColor: 'white',
        borderRadius: ' 3px',
    });
    const BannerWrapper = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    });
    const NameTable = Constants.TABLE_SCREEN.RECRUITMENTTABLE.VALUE;

    return <BannerWrapper>
        <Box>
            <Seacrch
                statusOptions={statusOptions}
                postionOptions={postionOptions}
                Province={provinceOptions}
                optionsRecruitmentProposals={recruitmentProposalslist}
                NameTable={NameTable}

            />
        </Box>
        <Box>
            <RecruitmentTable
                listRecruitment={recruitmentList}
                isLoading={isLoading}
                statusOptions={statusOptions}
            />
        </Box>
        <PaginationWrapper>
            <CommonPagination total={paging?.TotalRecord ?? 0} />
        </PaginationWrapper>
    </BannerWrapper>

}
export default RecruitmentsContainer;