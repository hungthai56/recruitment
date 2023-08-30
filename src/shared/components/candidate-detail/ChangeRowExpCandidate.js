import React, { forwardRef, useEffect, useState } from 'react'
import styles from './CustomDetail.module.scss'
import FormGroupSearch from 'shared/components/common/form/form-search/FormGroupSearch';
import FormItem from 'shared/components/common/form/FormItem';
import Validator from 'utils/Validator';
import Validate from 'utils/Validate';
import TextLabelCommon from 'shared/components/common/label/TextLabel';
import FormDatePicker from 'shared/components/common/custom-form/FormDatePicker';
import { dateIsAfter, formatDate } from 'utils/DateTime';
import { useForm, useFieldArray, useFormContext } from 'react-hook-form';
import FormInput from 'shared/components/common/custom-form/FormInput';
import IcCloseClone from 'shared/components/icons/ic-close-clone'

function ChangeRowExpCandidate(props) {
  const { stt, handleDeleteExp, nameTable, methods } = props
  const TimeStart = `${nameTable}.${stt}.TimeStart`;
  const TimeEnd = `${nameTable}.${stt}.TimeEnd`;

  const watchTimeStart = formatDate(methods.watch(TimeStart));
  const watchTimeEnd = formatDate(methods.watch(TimeEnd));

  useEffect(() => {
    if (!watchTimeStart || !watchTimeEnd) {
      return;
    }
    if (!!dateIsAfter(watchTimeStart, watchTimeEnd)) {
      methods.trigger([TimeStart, TimeEnd]);
    } else {
      methods.clearErrors([TimeStart, TimeEnd]);
    }
  }, [watchTimeStart, watchTimeEnd]);
  return (
    <div>
      <FormGroupSearch key={stt} style={{ alignItems: "start", marginBottom: stt == 0 ? "10px" : "10px" }}>
        <FormItem className="w-100 form-item">
          {stt == 0 ? <TextLabelCommon className="form-proposal mb-1">Từ ngày</TextLabelCommon> : ""}
          <FormDatePicker
            fieldName={TimeStart}
            validate={[Validate.required, Validator.CheckedDate(methods.getValues(TimeEnd), 1, true)]}
            placeholder="Chọn từ ngày"
          />
        </FormItem>
        <FormItem className="w-100 form-item">
          {stt == 0 ? <TextLabelCommon className="form-proposal mb-1">Đến ngày</TextLabelCommon> : ""}
          <FormDatePicker
            fieldName={TimeEnd}
            validate={[Validate.required, Validator.CheckedDate(methods.getValues(TimeStart), 2)]}
            placeholder="Chọn đến ngày"
          />
        </FormItem>
        <FormItem className="w-100 form-item">
          {stt == 0 ? <TextLabelCommon className="form-proposal mb-1">Công ty</TextLabelCommon> : ""}
          <FormInput
            fieldName={`${nameTable}.${stt}.CompanyName`}
            validate={[Validator.maxLength(50)]}
            placeholder={"Nhập công ty"}
          />
        </FormItem>
        <FormItem className="w-100 form-item">
          {stt == 0 ? <TextLabelCommon className="form-proposal mb-1">Vị trí</TextLabelCommon> : ""}
          <FormInput
            fieldName={`${nameTable}.${stt}.Position`}
            validate={[Validator.maxLength(50)]}
            placeholder={"Nhập vị trí"}
          />
        </FormItem>
        <div className={styles['flex_button']} style={{ marginBottom: "0px;" }}>
          <div className={"dep_U6nqO6JNIZqBNx6c6EkB"} onClick={() => handleDeleteExp(stt)} >
            <div style={{ paddingTop: stt == 0 ? "26px" : "7px", marginLeft: "3px", cursor: "pointer" }}>
              <IcCloseClone />
            </div>
          </div>
        </div>
      </FormGroupSearch>
    </div>
  )
}

export default ChangeRowExpCandidate