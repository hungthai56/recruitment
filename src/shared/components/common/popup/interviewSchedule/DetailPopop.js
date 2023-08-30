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
import CandidateListTable from 'shared/containers/interviewschedulecontainers/common/CandidateListTable';

import EventRegister, { EVENT_SHOW_POPUP, EVENT_SHOW_POPUP_CONTENT,EVENT_SHOW_POPUP2, LIST_PRODUCT_SHARED_POPUP, LIST_TAG_SHARED_POPUP, MODULE_PRODUCT, NEWS_POPUP, POPUP_ROUTER, RECRUITMENT_POPUP } from 'utils/EventRegister';
import TablePopop from './TablePopop';
export default function DetailPopop(props) {
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
   const Warddetail = styled('div')({
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    });
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
    const { id } = useParams();
    const { listcandidateinterview, listCondidates, isLoading, paging, listdetail } = useSelector(
        (state) => state.Candidateinterview,
    );
    const handleMoveUpdate = (id) => {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: PopupName.UPDATE_INTERVIEW,
            open: true,
            
        });
    }

    return (<CustomFormProvider {...methods}>
        <HeadCommonPopup onHandleRight={showVisible} content="Thông tin lịch phỏng vấn" />
        <div style={{ backgroundColor: '#e5e5e5', width: '1000px', padding: '10px' }}>
            <Warddetail>
                <BoxV3 className={`${style['box-container']}`} boxTitle="Thông tin lịch phỏng vấn">
                    <FormInputWrapper>
                        <DetailRow>
                            <DetailItemWrapper>
                                <DetailLabel>Tuyển dụng</DetailLabel>
                                <p>:</p>
                                <DetailContent>{listdetail.RecruitmentTitle}</DetailContent>
                            </DetailItemWrapper>
                            <DetailItemWrapper>
                                <DetailLabel>Ngày tạo</DetailLabel>
                                <p>:</p>
                                <DetailContent>{moment(listdetail?.CreatedAt || '').format("DD/MM/YYYY hh:mm")}</DetailContent>
                            </DetailItemWrapper>
                        </DetailRow>
                        <DetailRow>
                            <DetailItemWrapper>
                                <DetailLabel>Kiểu phỏng vấn</DetailLabel>
                                <p>:</p>
                                <DetailContent></DetailContent>
                            </DetailItemWrapper>
                            <DetailItemWrapper>
                                <DetailLabel>Người tạo</DetailLabel>
                                <p>:</p>
                                <DetailContent>{listdetail?.CreatedByName}</DetailContent>
                            </DetailItemWrapper>
                        </DetailRow>
                        <DetailRow>
                            <DetailItemWrapper>
                                <DetailLabel>Ngày phỏng vấn</DetailLabel>
                                <p>:</p>
                                <DetailContent>{moment(listdetail?.TimeStart || '').format("DD/MM/YYYY")}</DetailContent>
                            </DetailItemWrapper>
                            <DetailItemWrapper>
                                <DetailLabel>Địa điểm</DetailLabel>
                                <p>:</p>
                                <DetailContent></DetailContent>
                            </DetailItemWrapper>
                        </DetailRow>
                        <DetailRow>
                            <DetailItemWrapper>
                                <DetailLabel>Giờ bắt đầu</DetailLabel>
                                <p>:</p>
                                <DetailContent>{moment(listdetail?.TimeStart || '').format("hh:mm")}</DetailContent>
                            </DetailItemWrapper>
                            <DetailItemWrapper>
                                <DetailLabel>Phòng</DetailLabel>
                                <p>:</p>
                                <DetailContent></DetailContent>
                            </DetailItemWrapper>
                        </DetailRow>
                        <DetailRow>
                            <DetailItemWrapper>
                                <DetailLabel>Thời lượng</DetailLabel>
                                <p>:</p>
                                <DetailContent>{listdetail?.InterviewTime}p</DetailContent>
                            </DetailItemWrapper>
                            <DetailItemWrapper>
                                <DetailLabel>Mẫu phỏng vấn</DetailLabel>
                                <p>:</p>
                                <DetailContent></DetailContent>
                            </DetailItemWrapper>
                        </DetailRow>
                        <DetailRow>
                            <DetailItemWrapper>
                                <DetailLabel>Người phỏng vấn</DetailLabel>
                                <p>:</p>
                                <DetailContent>{listcandidateinterview?.CompanyName}</DetailContent>
                            </DetailItemWrapper>
                            <DetailItemWrapper>
                                <DetailLabel>Số ứng viên</DetailLabel>
                                <p>:</p>
                                <DetailContent>{listdetail?.length}</DetailContent>
                            </DetailItemWrapper>
                        </DetailRow>

                    </FormInputWrapper>
                </BoxV3>
                <BoxV3 className={`${style['box-container']}`} boxTitle="Danh sách ứng viên">
                    <TablePopop
                        listCondidates={listCondidates}
                        isLoading={isLoading}
                    />
                </BoxV3>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '10px',
                    backgroundColor: '#ffffff',
                    borderRadius: '3px'
                }}>
                    <div style={{ columnGap: 10, padding: '4px 10px 4px 795px' }} className="d-flex flex-row justify-content-center">

                        <LoadingButton
                            // onClick={() => onClickCancelButton()}
                            onClick={showVisible}
                            typeColor="background-gray"

                        >
                            Đóng
                        </LoadingButton>
                        <LoadingButton
                            loading={isLoading}
                            onClick={() => handleMoveUpdate(listdetail.Id)}
                        >
                            Sửa
                        </LoadingButton>
                    </div>
                </div>
            </Warddetail>
        </div>

    </CustomFormProvider>
    );
}