import React, { useState, useEffect, useRef } from 'react';
import inputse from "./InputSeach.module.scss"
function InputSeach(props)
{


    const { id, name, value, placeholder, onChange } = props
 
    useEffect(() =>
    {

    }, []);



    return (
        <div className={`${inputse["InputSeach"]} ${props.className ?? ""}`} id={inputse['inputsearch']} style={{ ...props?.style ?? "" }}>
            <div className= {`${inputse["inputs_item"]} ${props.className ?? ""}`}>
                <div className={`${inputse["icon_float"]}`}><img src='images/Icon-kinhlup.svg' className={inputse["icon_"]} /></div>
                <input
                    className={`${inputse["input_item"]} ${props.classNameinput ?? ""}`}
                    id={id ? id : ""}
                    name={name ? name : ""}
                    placeholder={placeholder ? placeholder : ""} value={value ? value : ""}
                    onChange={(e) => onChange(e)} />
            </div>
        </div>
    )
}


export default InputSeach;