import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRouterV2 from 'hooks/use-router-v2';
import styles from './RecruitmentProposalDetail.module.scss';
import CustomDetail from '../../components/recruitment-proposal/CustomDetail';
import CustomFieldDetail from '../../components/recruitment-proposal/CustomFieldDetail';
import { FooterManage } from 'shared/components/common/footer';
import ButtonCommon from 'shared/components/common/button/ButtonCommon';
import LoadingButton from 'shared/components/common/button-loading/ButtonLoading';
import RouterPath from 'router/RouterPath';
import action from '../../../redux/recruitment-proposal/action';
import moment from 'moment';
import Utils from 'utils/Utils';
import ChangeStatusDetail from '../../components/recruitment-proposal/ChangeStatusDetail';
import EventRegister, { EVENT_SHOW_POPUP } from 'utils/EventRegister';
import PopupName from 'shared/components/common/popup/PopupName';
import Constants from 'utils/Constants';
import { formatValue, getNamesByIds } from 'utils/Helper';
import FooterManageV2 from 'shared/components/footer/FooterManageV2';

function RecruitmentProposalDetail(props) {
  const { ProposeId } = props;
  const router = useRouterV2();
  const dispatch = useDispatch();
  const [canSubmit, setCanSubmit] = useState(true);
  const [item, setItem] = useState([]);
  const [statusChange, setstatusChange] = useState(null);

  const handleEdit = () => {
    router.push({
      pathname: RouterPath.UPDATE_PROPOSAL.replace(':id', ProposeId),
    });
  };
  useEffect(() => {
    dispatch({
      type: action.GET_PROPOSE_DETAIL_START,
      payload: ProposeId,
    });
  }, [ProposeId]);

  useEffect(() => {
    dispatch({
      type: action.FETCH_PROPOSED_MASTER,
      payload: {},
    });
  }, []);
  const proposeDetail = useSelector(
    (state) => state.AppReruitmentProposal?.ProposeDetail
  );
  const testla = useSelector((state) => state.AppReruitmentProposal?.statusId);
  const { ForeignLanguage, WorkType, Gender, Level } = useSelector(
    (state) => state.AppReruitmentProposal
  );

  useEffect(
    () => {
      if (proposeDetail) {
        setItem(proposeDetail);
      } else {
        setItem([]);
      }
    },
    [proposeDetail],
    [testla?.Id]
  );
  const ChangeStatus = (e) => {
    let params = {
      Id: Number(ProposeId),
      Status: String(e),
    };
    dispatch({
      type: action.CHANGE_STATUS_PROPOSE,
      payload: params,
      callback: (payload) => {
        setCanSubmit(true);
        setstatusChange(payload.payload.Status);
      },
    });
  };
  const handleDeletePropose = (data) => {
    const message = 'Bạn có chắc chắn muốn xoá dữ liệu này không?';
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: PopupName.DELETE_POPUP,
      open: true,
      payload: {
        data: data,
        message,
        isLoading: true,
        callback: {
          success: (_props) => {
            const callback = () => {
              _props?.closeLoading();
              router.push({
                pathname: RouterPath.getRouteWithId(RouterPath.RECRUITMENTPRO),
              });
            };
            dispatch({
              type: action.DELETE_PROPOSED_LOCATION,
              payload: { callback, data: [data?.Id] },
              callback: (id) => {
                router.push({
                  pathname: RouterPath.getRouteWithId(
                    RouterPath.RECRUITMENTPRO
                  ),
                });
              },
            });
          },
        },
      },
    });
  };
  let status = '';
  if (statusChange == Constants.TEXT_STATUS.STATUS_APPROVE.VALUE) {
    status = (
      <span style={{ color: '#008A5A', fontWeight: 600 }}>
        {Constants.TEXT_STATUS.STATUS_APPROVE.NAME}
      </span>
    );
  }
  if (statusChange == Constants.TEXT_STATUS.STATUS_WAIT_APPROVE.VALUE) {
    status = (
      <span style={{ color: '#FF8246', fontWeight: 600 }}>
        {Constants.TEXT_STATUS.STATUS_WAIT_APPROVE.NAME}
      </span>
    );
  }
  if (statusChange == Constants.TEXT_STATUS.STATUS_NOT_APPROVE.VALUE) {
    status = (
      <span style={{ color: '#F85555', fontWeight: 600 }}>
        {Constants.TEXT_STATUS.STATUS_NOT_APPROVE.NAME}
      </span>
    );
  }
  useEffect(() => {
    setstatusChange(item.Status);
  }, [item.Status]);

  return (
    <>
      <div className={styles['recruitment__detail']}>
        <ChangeStatusDetail
          valueApprove={item.RecruitmentId}
          value={statusChange}
          titleCheck="Duyệt"
          titleClose="Không duyệt"
          titleReApprove="Hoàn duyệt"
          ChangeStatus={ChangeStatus}
        />
        <CustomDetail title="Thông tin chung">
          <CustomFieldDetail textTitle="Mã đề xuất" valueForm={item.Code} />
          <CustomFieldDetail
            textTitle="Người tạo"
            valueForm={item.CreatedByName}
          />
          <CustomFieldDetail textTitle="Tên đề xuất" valueForm={item.Title} />
          <CustomFieldDetail
            textTitle="Hình thức làm việc"
            valueForm={getNamesByIds(item.WorkType, WorkType)}
          />
          <CustomFieldDetail
            textTitle="Bộ phận đề xuất"
            valueForm={item.DepartmentName}
          />
          <CustomFieldDetail
            textTitle="Mức lương"
            valueForm={formatValue(item, 'salary')}
          />
          <CustomFieldDetail
            textTitle="Vị trí đề xuất"
            valueForm={item.PositionName ? item.PositionName.join(', ') : ''}
          />
          <CustomFieldDetail
            textTitle="Hạn tuyển"
            valueForm={moment(item.DateTo).format('DD/MM/YYYY')}
          />
          <CustomFieldDetail
            textTitle="Nơi làm việc"
            valueForm={item.BrancheNames ? item.BrancheNames.join(' / ') : ''}
          />
          <CustomFieldDetail
            textTitle="Số lượng tuyển"
            valueForm={item.Quantity}
          />
          <CustomFieldDetail textTitle="Lý do tuyển" valueForm={item.Reason} />
          <CustomFieldDetail textTitle="Trạng thái" valueForm={status} />
        </CustomDetail>
        <CustomDetail title="Yêu cầu ứng viên">
          <CustomFieldDetail
            textTitle="Tuổi"
            valueForm={formatValue(item, 'age')}
          />
          <CustomFieldDetail
            textTitle="Trình độ"
            valueForm={getNamesByIds(item.Level, Level)}
          />
          <CustomFieldDetail
            textTitle="Giới tính"
            valueForm={getNamesByIds(item.Gender, Gender)}
          />
          <CustomFieldDetail
            textTitle="Chuyên ngành"
            valueForm={item.Specialized}
          />
          <CustomFieldDetail
            textTitle="Kinh nghiệm"
            valueForm={
              item.Experience == 1 ? 'Có kinh nghiệm' : 'Không có kinh nghiệm'
            }
          />
          <CustomFieldDetail
            textTitle="Ngoại ngữ"
            valueForm={getNamesByIds(item.ForeignLanguage, ForeignLanguage)}
          />
        </CustomDetail>
        <CustomDetail title="Mô tả công việc">
          <div className={styles['box__text']}>
            <div dangerouslySetInnerHTML={{ __html: item.Descriptions }} />
          </div>
        </CustomDetail>
        <FooterManageV2
          titleBack={'Quay lại'}
          back={true}
          routerPath={RouterPath.RECRUITMENTPRO}
        >
          {statusChange == Constants.STATUS_POST.STATUS_WAIT_APPROVE ? (
            <div className="d-flex justify-content-end align-items-center">
              <ButtonCommon
                className="mr-3"
                type="button"
                onClick={() => handleDeletePropose(item)}
                typeColor="border-red"
              >
                Xóa
              </ButtonCommon>
              <LoadingButton
                disabled={!canSubmit}
                type="button"
                onClick={() => handleEdit()}
              >
                Sửa
              </LoadingButton>
            </div>
          ) : (
            ''
          )}
        </FooterManageV2>
      </div>
    </>
  );
}
export default RecruitmentProposalDetail;
