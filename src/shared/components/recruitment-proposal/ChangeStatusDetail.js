import React, { forwardRef, useEffect, useState } from "react";
import styles from "./CustomDetail.module.scss";
import IcCheck from "../../../assets/images/icons/ic-check";
import IcBack from "../../../assets/images/icons/ic-back";
import IcClose from "../icons/ic-close";
import Constants from "utils/Constants";

function ChangeStatusDetail(props) {
  const { value, titleCheck, titleClose, titleReApprove, ChangeStatus, valueApprove } = props;

  let buttonsToShow;

  if (parseInt(value) === Constants.STATUS_POST.STATUS_WAIT_APPROVE) {
    buttonsToShow = (
      <>
        <button
          onClick={() => {
            ChangeStatus(Constants.STATUS_POST.STATUS_APPROVE);
          }}
          className={styles[("icon__check", "button__icon")]}
        >
          <IcCheck />
          <span>{titleCheck}</span>
        </button>
        <button
          onClick={() => {
            ChangeStatus(Constants.STATUS_POST.STATUS_NOT_APPROVE);
          }}
          className={styles[("icon__close", "button__icon")]}
        >
          <IcClose />
          <span>{titleClose}</span>
        </button>
      </>
    );
  } else {
    buttonsToShow = (
      <>
        <button
          disabled = {valueApprove !== 0 ? true : false}
          onClick={() => {
            ChangeStatus(Constants.STATUS_POST.STATUS_WAIT_APPROVE);
          }}
          className={styles[("icon__close", "button__icon")]}
        >
          <IcBack />
          <span>{titleReApprove}</span>
        </button>
      </>
    );
  }

  return (
    <div className={styles["box__status"]}>
      <div className={styles["box__status-change"]}>{buttonsToShow}</div>
    </div>
  );
}

export default ChangeStatusDetail;
