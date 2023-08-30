import { TextNote } from "@findxdn/erp-theme";
import { Controller, useFormContext } from "react-hook-form";
import Constants from "utils/Constants";
import Validator from "utils/Validator";
import React, { useRef, useEffect } from "react";
import "./FormTextAreaV2.module.scss";

const FormTextAreaV2 = (props) => {
  const {
    defaultValue,
    fieldName,
    validate,
    placeholder,
    placeholderColor = "#ff0000",
    format = "",
    readOnly = false,
    isTooltip = false,
  } = props;
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const containerRef = useRef();
  useEffect(() => {
    if (errors[fieldName]) {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [errors[fieldName]]);
  return (
    <div className="Input w-100" ref={containerRef}>
      <div className="w-100">
        <Controller
          control={control}
          name={fieldName}
          rules={{
            validate: Validator.genValidate(validate, fieldName),
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <TextNote
                _props={{ ref: ref }}
                name={fieldName}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                errors={errors}
                required={false}
                disabled={readOnly}
                isTooltip={isTooltip}
                _inputProps={{
                  maxLength: props.maxLength,
                  style: {
                    textAlign:
                      format == Constants.FormInputFormat.MONEY.VALUE
                        ? "right"
                        : "left",
                  },
                }}
              />
            );
          }}
        />
      </div>
      {/* {error?.message && (
                <MessageError type={error?.type} message={error?.message} />
            )} */}
    </div>
  );
};
FormTextAreaV2.defaultProps = {
  placeholder: "Vui lòng nhập ...",
};
export default FormTextAreaV2;
