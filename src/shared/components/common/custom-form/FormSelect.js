import { CustomAutocomplete, CustomSelect } from '@findxdn/erp-theme';
import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Utils from 'utils/Utils';
import Validator from 'utils/Validator';
function FormSelect(props) {
    const {
        defaultValue,
        fieldName,
        validate = [],
        placeholder,
        options,
        disabled = false,
        isTooltip = false,
        checkError = false,
        onChangeSelect = () => {},
        isMui = false,
        isPortal = false,
        group = false,
        isMulti = false,
        maxToShowProps = 1,
        hideSelectedOptions = false,
        menuPlacement = 'auto',
        className,
    } = props;
    const {
        formState: { errors },
        control,
    } = useFormContext();

    let objectPortal = {};
    if (isPortal) {
        objectPortal['zIndex'] = 2;
    }

    let menuPortalTarget = {};

    if (isPortal) {
        menuPortalTarget['menuPortalTarget'] = document.body;
    }
    const fieldRef = useRef();
    const wrapRef = useRef();
    return (
        <div className={`w-100 ${props?.className ?? ''}`} ref={wrapRef}>
            <div className="w-100">
                <Controller
                    control={control}
                    name={fieldName}
                    rules={{
                        validate: Validator.genValidate(validate, fieldName),
                    }}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                        return (
                            <>
                                {isMui ? (
                                    <CustomAutocomplete
                                        name={fieldName}
                                        inputRef={(el) => {
                                            ref(el);
                                            fieldRef.current = el;
                                        }}
                                        onChange={(e) => {
                                            onChangeSelect(e);
                                            onChange(e);
                                            Utils.triggerSubmit(wrapRef);
                                        }}
                                        onBlur={onBlur}
                                        value={value}
                                        options={options}
                                        defaultValue={defaultValue}
                                        placeholder={placeholder}
                                        errors={errors}
                                        disabled={disabled}
                                        isTooltip={isTooltip}
                                    />
                                ) : (
                                    <CustomSelect
                                        name={fieldName}
                                        fieldref={(el) => {
                                            ref(el);
                                            fieldRef.current = el;
                                        }}
                                        onChange={(e) => {
                                            onChange(e);
                                            onChangeSelect(e);
                                            Utils.triggerSubmit(wrapRef);
                                        }}
                                        onBlur={onBlur}
                                        value={isMulti ? (value ? [...value] : []) : value}
                                        options={options?.map((v) => {
                                            return {
                                                ...v,
                                                key: v?.value,
                                            };
                                        })}
                                        defaultValue={defaultValue}
                                        placeholder={placeholder}
                                        errors={errors}
                                        disabled={disabled}
                                        isTooltip={isTooltip}
                                        styles={{
                                            menuPortal: (base) => ({ ...base, ...objectPortal }),
                                        }}
                                        {...menuPortalTarget}
                                        group={group}
                                        isMulti={isMulti}
                                        maxToShowProps={maxToShowProps}
                                        hideSelectedOptions={hideSelectedOptions}
                                        _props={{
                                            menuPlacement: menuPlacement,
                                        }}
                                    />
                                )}
                            </>
                        );
                    }}
                />
            </div>
        </div>
    );
}
FormSelect.defaultProps = {
    placeholder: 'Vui lòng nhập ...',
    className: '',
};
export default FormSelect;
