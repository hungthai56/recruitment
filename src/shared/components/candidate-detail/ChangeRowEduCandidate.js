import React, { forwardRef, useEffect, useState } from 'react'
import styles from './CustomDetail.module.scss'
import FormGroupSearch from 'shared/components/common/form/form-search/FormGroupSearch';
import FormItem from 'shared/components/common/form/FormItem';
import Validator from 'utils/Validator';
import TextLabelCommon from 'shared/components/common/label/TextLabel';
import { useForm, useFieldArray, useFormContext } from 'react-hook-form';
import FormInput from 'shared/components/common/custom-form/FormInput';
import IcCloseClone from 'shared/components/icons/ic-close-clone'
import FormSelect from 'shared/components/common/custom-form/FormSelect';

function ChangeRowEduCandidate(props) {
  const { stt, handleDeleteEdu, nameTable, EducationLv, ModeOfStudys } = props
  return (
    <div>
      <FormGroupSearch key={stt} style={{ alignItems: "start", marginBottom: stt == 0 ? "10px" : "10px" }}>
        <FormItem className="w-100 form-item">
          {stt == 0 ? <TextLabelCommon className="form-proposal mb-1" require>Trình độ học vấn</TextLabelCommon> : ""}
          <FormSelect
            options={EducationLv ?? []}
            fieldName={`${nameTable}.${stt}.Type`}
            placeholder={"Chọn tuyển dụng ứng viên apply"}
            validate={[Validator.required]}
          />
        </FormItem>
        <FormItem className="w-100 form-item">
          {stt == 0 ? <TextLabelCommon className="form-proposal mb-1">Hình thức đào tạo</TextLabelCommon> : ""}
          <FormSelect
            options={ModeOfStudys ?? []}
            fieldName={`${nameTable}.${stt}.ModeOfStudy`}
            validate={[]}
            placeholder={"Chọn hình thức"}
          />
        </FormItem>
        <FormItem className="w-100 form-item">
          {stt == 0 ? <TextLabelCommon className="form-proposal mb-1">Chuyên ngành</TextLabelCommon> : ""}
          <FormInput
            fieldName={`${nameTable}.${stt}.Major`}
            validate={[Validator.maxLength(50)]}
            placeholder={"Nhập chuyên ngành"}
          />
        </FormItem>
        <FormItem className="w-100 form-item">
          {stt == 0 ? <TextLabelCommon className="form-proposal mb-1">Nơi đào tạo</TextLabelCommon> : ""}
          <FormInput
            fieldName={`${nameTable}.${stt}.School`}
            validate={[Validator.maxLength(50)]}
            placeholder={"Nhập nơi đào tạo"}
          />
        </FormItem>
        <div className={styles['flex_button']} style={{ marginBottom: "0px;" }}>
          <div className={"dep_U6nqO6JNIZqBNx6c6EkB"} onClick={() => handleDeleteEdu(stt)} >
            <div style={{ paddingTop: stt == 0 ? "26px" : "7px", marginLeft: "3px", cursor: "pointer" }}>
              <IcCloseClone />
            </div>
          </div>
        </div>
      </FormGroupSearch>
    </div>
  )
}

export default ChangeRowEduCandidate