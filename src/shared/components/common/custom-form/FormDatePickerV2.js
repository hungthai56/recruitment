import { CustomDesktopDatePicker } from "@findxdn/erp-theme";
import moment from "moment";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Utils from "utils/Utils";
import Validator from "utils/Validator";
import styles from "./FormDatePicker.module.scss";

function FormDatePickerV2(props) {
  const {
    defaultValue = null,
    fieldName,
    validate,
    placeholder,
    disabled = false,
  } = props;
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const wrapRef = useRef();
  return (
    <div className={`Input w-100 ${styles["FormDatePicker"]}`} ref={wrapRef}>
      <div className="w-100">
        <Controller
          control={control}
          name={fieldName}
          defaultValue={defaultValue}
          rules={{ validate: Validator.genValidate(validate, fieldName) }}
          render={({ field: { onChange, onBlur, value, ref } }) => {
            const onChangeValue = (e) => {
              const date = moment(e).format("YYYY-MM-DD");
              if (e == null) {
                errors[fieldName] = null;
                onChange(null);
                return;
              }
              if (date.length <= 7) {
                onChange(e);
                return;
              }
              onChange(date);
              Utils.triggerSubmit(wrapRef);
            };
            const convertValue = (value) => {
              if (value == null) {
                return null;
              }
              return moment(value);
            }
            return (
              <CustomDesktopDatePicker
                _props={{ inputRef: ref }}
                name={fieldName}
                value={convertValue(value)}
                onChange={onChangeValue}
                onBlur={onBlur}
                defaultValue={value ?? defaultValue}
                placeholder={placeholder}
                errors={errors}
                disabled={disabled}
                isOpenTabelSetDate
              />
            );
          }}
        />
      </div>
    </div>
  );
}
FormDatePickerV2.defaultProps = {
  placeholder: "Vui lòng nhập ...",
  defaultValue: "",
};
export default FormDatePickerV2;
