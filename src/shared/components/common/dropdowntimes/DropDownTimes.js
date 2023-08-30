import style from './DropDownTimes.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import  CustomDesktopDatePicker  from '@findxdn/erp-theme';
import moment from 'moment';
function DropDownTimes(props) {
    const {
        defaultValue = null,
        fieldName,
        validate,
        placeholder,
        disabled = false
    } = props;
    console.log(CustomDesktopDatePicker);
    console.log(props);
    const onChangeValue = (e) => {
        const date = moment(e).format("YYYY-MM-DD");
        if (e == null) {
            onChange(null)
            return
        }
        if (date.length <= 7) {
            onChange(e)
            return
        }
        onChange(date)
        Utils.triggerSubmit(wrapRef)

    }
    return <CustomDesktopDatePicker
        _props={{ inputRef: ref }}
        name={fieldName}
        value={value}
        onChange={onChangeValue}
        onBlur={onBlur}
        defaultValue={value ?? defaultValue}
        placeholder={placeholder}
        errors={errors}
        disabled={disabled}
        isOpenTabelSetDate
    />
}
export default DropDownTimes;