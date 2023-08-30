import useRouter from 'hooks/use-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import RouterPath from 'router/RouterPath';
import useRouterV2 from 'hooks/use-router-v2';
import Box from 'shared/components/common/box/Box';
import LoadingButton from 'shared/components/common/button-loading/ButtonLoading';
import CustomFormProvider from 'shared/components/common/custom-form/CustomFormProvider';
import FooterManage from 'shared/components/footer/FooterManage';
import ButtonCommon from 'shared/components/common/button/ButtonCommon';
import moment from 'moment';
import { styled } from '@mui/system';
import BoxV3 from 'shared/components/common/box/BoxV3';
import Image from 'material-ui-image'
// import IconEye from 'shared/components/icons/icon-eye';
import EventRegister, { EVENT_SHOW_POPUP, EVENT_SHOW_POPUP_CONTENT } from 'utils/EventRegister';
import PopupName from 'shared/components/common/popup/PopupName';
import TabTable from 'shared/components/common/tab-table/TabTable';
import { forEach } from 'lodash';
import style from './SelectionCommitteeDetail.module.scss';
import IcDropDown from 'assets/icon/Icon-Drop';
import FormTagsInput from 'shared/components/common/custom-form/FormTagsInput';
import RecruitmentTable from 'shared/components/common/tablev2/RecruitmentTableV1';
import RecruitmentTableV2 from 'shared/components/common/tablev2/RecruitmentTableV2';
import TableV2 from 'shared/components/common/tablev2/Table';
function SelectionCommitteeDetail(props) {
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
        width: '33%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    });

    const DetailRow = styled('div')({
        width: '100%',
        display: '-webkit-inline-box',
        flexDirection: 'column',
        gap: '10px',
    });
    const router = useRouterV2();
    const { history } = useHistory();
    const methods = useForm()
    const [canSubmit, setCanSubmit] = useState(true);
    const [valueTab, setValueTab] = useState(1);
    const [isLoading, setisLoading] = useState("");
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

    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "40px",
    }}>
        <Box className={`${style['box-container']}`} boxTitle="Hội đồng tuyển dụng">
            <FormInputWrapper>
                <RecruitmentTableV2
                    listRecruitment={[]}
                    isLoading={isLoading}
                    isShowCheckBox={false}
                />
            </FormInputWrapper>
        </Box>
    </div>
}
export default SelectionCommitteeDetail;
