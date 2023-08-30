import { CustomAutocomplete, CustomSelect } from '@findxdn/erp-theme';
import { useRef, useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Utils from 'utils/Utils';
import Validator from 'utils/Validator';
import styles from './FormSelectV2.module.scss';
import { useSetState } from 'react-use';
import { logDOM } from '@testing-library/react';
function FormSelectV2(props) {
    const {
        defaultValue,
        fieldName,
        validate = [],
        placeholder,
        options,
        disabled = false,
        isTooltip = false,
        checkError = false,
        onChangeSelect = () => { },
        isMui = false,
        isPortal = false,
        group = false,
        isMulti = false,
        maxToShowProps = 3,
        hideSelectedOptions = false,
        menuPlacement = "auto",
        className,
        fillTyle
    } = props;
    const {
        formState: { errors },
        control,
    } = useFormContext();
    const [PostionOtion, SetPostionOtion] = useState([]);
    let Provinces = [];
    const resultProvince = Object.entries(PostionOtion);
    resultProvince.forEach((key) => {
        let valuer = { value: key[1] };
        Provinces.push(valuer);
    });
    const tempData = Provinces.map((item) => item.value);
    useEffect(() => {
        if (Array.isArray(fillTyle)) {
            SetPostionOtion(fillTyle);
        }
    }, [fillTyle])
    let error = {};
    let objectPortal = {}
    if (isPortal) {
        objectPortal['zIndex'] = 2;
    }
    let menuPortalTarget = {}
    if (isPortal) {
        menuPortalTarget['menuPortalTarget'] = document.body;
    }
    const wrapRef = useRef();
    const [iconHovered, setIconHovered] = useState(false);
    const handleIconHover = () => {
        setIconHovered(true);
    };
    const handleIconLeave = () => {
        setIconHovered(false);
    };
    const [Top, setTop] = useState(0);
    const [OpenHover, setOpenHover] = useState(false);
    useEffect(() => {

        if (tempData.length > 5) {
            setTop(44);
        } else {
            setTop(28);
        }
        if (tempData.length > 0) {
            setOpenHover(true);
        } else {
            setOpenHover(false);
        }

    }, [tempData]);
    return (
        <div className={styles["overflow-container"]}>
            <div className={`w-100 ${props?.className ?? ""}`} ref={wrapRef}>
                <div className={`w-100 ${styles['overflow-content']} `} onMouseEnter={handleIconHover}
                    onMouseLeave={handleIconLeave}>
                    <Controller
                        control={control}
                        name={fieldName}
                        rules={{
                            validate:  Validator.genValidate(validate, fieldName),
                        }}
                        render={({ field: { onChange, onBlur, value, ref } }) => {
                            const shouldValidate = value === undefined || value === null || value === "";
                            return (
                                <>
                                    {isMui ? (
                                        <CustomAutocomplete
                                            // _props={{ inputRef: ref}}
                                            name={fieldName}
                                            inputRef={ref}
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
                                            inputRef={ref}
                                            onChange={(e) => {
                                                onChange(e);
                                                onChangeSelect(e);
                                                Utils.triggerSubmit(wrapRef);
                                            }}
                                            onBlur={onBlur}
                                            value={isMulti ? (value ? [...value] : []) : value}
                                            options={(options || []).map((v) => {
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
                    {OpenHover && (iconHovered && (
                        <div className={styles['icon-hover-box']}>
                            <p className={styles['icon-text']}>{tempData.join(', ')}</p>
                            <span className={styles['arrow-down']} style={{ top: Top + 'px' }} ><svg xmlns="http://www.w3.org/2000/svg" width="6" height="5" viewBox="0 0 6 5" fill="none">
                                <path d="M2.14251 3.57084C2.53091 4.21818 3.46909 4.21818 3.85749 3.57085L6 0H0L2.14251 3.57084Z" fill="#131313" />
                            </svg></span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
FormSelectV2.defaultProps = {
    placeholder: 'Vui lòng nhập ...',
    className: ""
};
export default FormSelectV2;
