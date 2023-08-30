import React from 'react';
import checkbo from "./CheckBox.module.scss"
function CheckBox(props) {
    const { value, onChange, id, style, checked, children } = props;
    return (
        <div className={checkbo["CheckBox"]} id={checkbo["checkbox"]}>
            {/* value={value} onChange={(e) => onChange(e, value, true)} checked={checked}  */}
            <input type="checkbox" id={id} value={value} onChange={(e) => onChange(e, value, true)} checked={checked} />
            <label htmlFor={id} style={style}>{children}</label>

        </div>
    )
}
export default CheckBox;