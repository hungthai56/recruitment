import { all, fork, call, takeEvery, put } from "redux-saga/effects";
import entries from "lodash/entries";
import parseInt from "lodash/parseInt";
import { toast } from "react-toastify";
import { GetMsg } from "utils/Message";
import actionBanner from "./action";
import appActions from "../app/actions";
import actionRecruiters from "./action";
import AppFactory from "./factory";
import { getToast } from "utils/Utils";

function* _watchGetData(payload) {
  const data = payload?.payload;
  try {
    const response = yield call(() => AppFactory.fetchGetData(data));

    yield put({
      type: actionRecruiters.GET_ALL_DATA_RECRUITMENTS_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: actionRecruiters.GET_ALL_DATA_RECRUITMENTS_FAILURE,
    });
  }
}
function* _watchGetDataMater() {
  try {
    const response = yield call(() => AppFactory.dataMaster());
    // response.Positions = entries(response.Positions).map(([key, value]) => ({
    //     value: value.Id,
    //     label: value.Name,

    // }));
    response.Positions = Object.values(response.Positions).reduce(
      (acc, value) => {
        const existingItem = acc.find((item) => item.value === value.Id);
        if (!existingItem) {
          acc.push({
            value: value.Id,
            label: value.Name,
          });
        }
        return acc;
      },
      []
    );

    response.Status = entries(response.Status).map(([key, value]) => ({
      value: parseInt(key),
      label: value,
    }));

    response.Departments = entries(response.Departments).map(
      ([key, value]) => ({
        value: value.Id,
        label: value.Name,
      })
    );

    response.RecruitmentProposals = entries(response.RecruitmentProposals).map(
      ([key, value]) => ({
        value: value.Id,
        label: value.Title,
      })
    );
    yield put({
      type: actionBanner.GET_DATA_RECRUITMENTS_MARTER_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: actionBanner.GET_DATA_RECRUITMENTS_MARTER_FAILURE,
    });
  }
}
function* _watchGetDataDetail(payload) {
  const data = payload?.payload;
  try {
    const response = yield call(() => AppFactory.fetchGetDataDetail(data));
    yield put({
      type: actionRecruiters.GET_DATA_RECRUITMENTS_DETAIL_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: actionRecruiters.GET_DATA_RECRUITMENTS_DETAIL_FAILURE,
    });
  }
}
function* _watchPostData(payload) {
  try {
    const response = yield call(() => AppFactory.postAddData(payload.payload));
    if (response.Code === 200) {
      yield put({
        type: actionRecruiters.POST_ADD_RECRUITMENTS_SUCCESS,
        payload: response,
      });

      const message = GetMsg("S001");
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      if (payload.callback) {
        payload.callback(response.Data.Id);
      }
    }
  } catch (e) {
    yield put({
      type: actionRecruiters.POST_ADD_RECRUITMENTS_FAILURE,
    });
  }
}
function* _watchPostStatusData(payload) {
  const data = payload?.payload;
  try {
    const response = yield call(() => AppFactory.postStatusData(data));
    yield put({
      type: actionRecruiters.POST_STATUS_DATA_SUCCESS,
      payload: response,
    });
    getToast("Thay đổi trạng thái thành công.");
    yield put({
      type: actionRecruiters.GET_ALL_DATA_RECRUITMENTS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: actionRecruiters.POST_STATUS_DATA_FAILURE,
    });
    const message = "Lỗi hệ thống !";
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  }
}
function* _watchDeleteData(payload) {
  try {
    const response = yield call(() =>
      AppFactory.deleteRecruitment(payload.payload)
    );
    if (response.Code === 200) {
      yield put({
        type: actionRecruiters.DELETE_RECRUITMENTS_DATA_SUCCESS,
        payload: response,
      });
      yield put({
        type: actionRecruiters.GET_ALL_DATA_RECRUITMENTS,
        payload: response,
      });
      getToast("Xoá thành công");
      payload?.callback?.success && payload?.callback?.success();
    } else {
      getToast(GetMsg(response?.MsgNo), "error");
      payload.callback?.failed && payload.callback?.failed();
      yield put({
        type: actionRecruiters.DELETE_RECRUITMENTS_DATA_FAILURE,
      });
    }
  } catch (e) {
    yield put({
      type: actionRecruiters.DELETE_RECRUITMENTS_DATA_FAILURE,
    });
    const message = "Lỗi hệ thống !";
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  }
}
function* _watchStatusDetail(payload) {
  const data = payload?.payload;
  try {
    const response = yield call(() => AppFactory.fetchStatusDetail(data));

    yield put({
      type: actionRecruiters.POST_STATUS_DATA_ID_SUCCESS,
      payload: response,
    });
    getToast("Thay đổi trạng thái thành công.");
    if (payload.callback) {
      payload.callback(payload);
    }
  } catch (e) {
    yield put({
      type: actionRecruiters.POST_STATUS_DATA_ID_FAILURE,
    });
    const message = "Lỗi hệ thống !";
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  }
}
function* _watchUpdateRecruitment(payload) {
  try {
    const response = yield call(() =>
      AppFactory.updateRecruitment(payload.payload)
    );
    if (response.Code === 200) {
      yield put({
        type: actionRecruiters.UPDATE_RECRUITMENTS_DATA_SUCCESS,
        payload: response,
      });
      const message = GetMsg("S001");
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      if (payload.callback?.success) {
        payload.callback.success(response.Data.Id);
      }
    }
  } catch (e) {
    yield put({
      type: actionRecruiters.UPDATE_RECRUITMENTS_DATA_FAILURE,
    });
  }
}
function* _watchGetEmployees() {
  try {
    const response = yield call(() => AppFactory.fetchGetEmployees());
    yield put({
      type: actionBanner.GET_DATA_EMPLOYEES_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: actionBanner.GET_DATA_EMPLOYEES_FAILURE,
    });
  }
}
function* _watchRecruitmentPopossal(payload) {
  const data = payload?.payload;
  try {
    const response = yield call(() =>
      AppFactory.fetchGetDataRecruitmentPopossalId(data)
    );
    yield put({
      type: actionRecruiters.GET_DATA_RECRUITMENT_PROPOSSAL_ID_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: actionRecruiters.GET_DATA_RECRUITMENT_PROPOSSAL_ID_FAILURE,
    });
  }
}
function* _watchRecruitmentPopossalId(payload) {
  const data = payload?.payload;
  try {
    const response = yield call(() =>
      AppFactory.fetchGetDataListRecruitmentPopossalId(data)
    );
    yield put({
      type: actionRecruiters.GET_DATA_LIST_RECRUITMENT_PROPOSSAL_ID_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: actionRecruiters.GET_DATA_LIST_RECRUITMENT_PROPOSSAL_ID_FAILURE,
    });
  }
}
function* _watchDeleteDataAll(payload) {
  try {
    const response = yield call(() =>
      AppFactory.deleteRecruitmentAll(payload.payload)
    );
    if (response.Code === 200) {
      yield put({
        type: actionRecruiters.DELETE_RECRUITMENTS_DATA_ALL_ID_SUCCESS,
        payload: response,
      });

      yield put({
        type: actionRecruiters.GET_ALL_DATA_RECRUITMENTS,
        payload: response,
      });
      getToast("Xoá thành công");
      payload?.callback.success && payload?.callback.success();
    }
  } catch (e) {
    yield put({
      type: actionRecruiters.DELETE_RECRUITMENTS_DATA_ALL_ID_FAILURE,
    });
  }
}
function* _watchDeleteDataDetail(payload) {
  const { data, callback } = payload.payload;
  try {
    const response = yield call(() => AppFactory.deleteRecruitmentDetail(data));
    if (response.Code === 200) {
      yield put({
        type: actionRecruiters.DELETE_RECRUITMENTS_DATA_DETAIL_ID_SUCCESS,
        payload: response,
      });
      getToast("Xoá thành công.");
      if (callback) {
        callback(payload);
      }
    } else {
      payload?.callback?.failed();
      getToast(GetMsg(response?.MsgNo), "error");
    }
  } catch (e) {
    yield put({
      type: actionRecruiters.DELETE_RECRUITMENTS_DATA_DETAIL_ID_FAILURE,
    });
    const message = "Lỗi hệ thống !";
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  }
}
function* watchRecruitmentPopossal() {
  yield takeEvery(
    actionRecruiters.GET_DATA_RECRUITMENT_PROPOSSAL_ID,
    _watchRecruitmentPopossal
  );
}
function* watchUpdateRecruitment() {
  yield takeEvery(
    actionRecruiters.UPDATE_RECRUITMENTS_DATA,
    _watchUpdateRecruitment
  );
}
function* watchStatusDetail() {
  yield takeEvery(actionRecruiters.POST_STATUS_DATA_ID, _watchStatusDetail);
}
function* watchDeleteData() {
  yield takeEvery(actionRecruiters.DELETE_RECRUITMENTS_DATA, _watchDeleteData);
}
function* watchPostStatusData() {
  yield takeEvery(actionRecruiters.POST_STATUS_DATA, _watchPostStatusData);
}
function* watchPostData() {
  yield takeEvery(actionRecruiters.POST_ADD_RECRUITMENTS, _watchPostData);
}
function* watchGetDataDetail() {
  yield takeEvery(
    actionRecruiters.GET_DATA_RECRUITMENTS_DETAIL,
    _watchGetDataDetail
  );
}
function* watchGetData() {
  yield takeEvery(actionRecruiters.GET_ALL_DATA_RECRUITMENTS, _watchGetData);
}
function* watchGetDataMater() {
  yield takeEvery(
    actionRecruiters.GET_DATA_RECRUITMENTS_MARTER,
    _watchGetDataMater
  );
}
function* watchGetEmployees() {
  yield takeEvery(actionRecruiters.GET_DATA_EMPLOYEES, _watchGetEmployees);
}
function* watchRecruitmentPopossalPd() {
  yield takeEvery(
    actionRecruiters.GET_DATA_LIST_RECRUITMENT_PROPOSSAL,
    _watchRecruitmentPopossalId
  );
}
function* watchDeleteDataAll() {
  yield takeEvery(
    actionRecruiters.DELETE_RECRUITMENTS_DATA_ALL_ID,
    _watchDeleteDataAll
  );
}
function* watchDeleteDataDetail() {
  yield takeEvery(
    actionRecruiters.DELETE_RECRUITMENTS_DATA_DETAIL_ID,
    _watchDeleteDataDetail
  );
}

export default function* RecruitmentSaga() {
  yield all([
    fork(watchGetData),
    fork(watchGetDataMater),
    fork(watchGetDataDetail),
    fork(watchPostData),
    fork(watchPostStatusData),
    fork(watchDeleteData),
    fork(watchStatusDetail),
    fork(watchGetEmployees),
    fork(watchUpdateRecruitment),
    fork(watchRecruitmentPopossalPd),
    fork(watchRecruitmentPopossal),
    fork(watchDeleteDataAll),
    fork(watchDeleteDataDetail),
  ]);
}
