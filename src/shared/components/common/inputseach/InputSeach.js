import React, { useState, useEffect, useRef } from 'react';
import inputse from "./InputSeach.module.scss"
import { IcSearch } from 'library/components/assets/icons'
function InputSeach(props) {
    const { id, name, value, placeholder, onChange } = props
    return (
        <div className={`InputSeach ${props.className ?? ""} `} id={'inputsearch'} style={{ ...props?.style ?? "" }}>
            <div className={`inputs_item ${props.className ?? ""}`}>
                <div className={"icon_float"}><IcSearch /></div>
                <input
                    className={`input_item ${props.classNameinput ?? ""}`}
                    id={id ? id : ""}
                    name={name ? name : ""}
                    placeholder={placeholder ? placeholder : ""} value={value ? value : ""}
                    onChange={(e) => onChange(e)} />
            </div>
        </div>
    )
}
export default InputSeach;