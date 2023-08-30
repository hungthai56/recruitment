import React, { useState, useEffect, useRef } from 'react';
import style from "./Dropdown.module.scss";

function Dropdown(props) {

    const [Position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, });
    const [Postioncustom, setPostioncustom] = useState({ top: 0 });
    const [isClick, setIsClick] = useState(false);
    const popRef = useRef(null)
    const { Options, value, id, placeholder, onChange, isHover, icon, topcoustom, change, iconclone, onchanreset } = props;
    const [valuesearch, setvalueseacrch] = useState({});
    const [isTitle, setIsTitle] = useState("");
    const [heightDropdown, setHeightDropdown] = useState("");
    const [isHovering, setIsHovering] = useState("");
    const [valueset, setvalue] = useState({});
    useEffect(() => {
        const pop = popRef.current;
        const Optionslen = Options.length;
        setHeightDropdown(Optionslen * 10);
        setPosition({ top: pop.offsetHeight, bottom: 0, left: 0, right: 0 })
    }, []);
    useEffect(() => {
        if (Position.top != 0) {
            setPostioncustom({ top: Position.top });
        } else {
            setPostioncustom({ top: topcoustom });
        }
    }, [Position])
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (popRef.current && !popRef.current.contains(event.target)) {
            setIsClick(false);
        }
    };
    const [display, setdisplay] = useState("none");
    useEffect(() => {

        if (value != undefined && value != "undefined") {
            setIsClick(true);
            setdisplay("block")
        } else {
            setdisplay("none")
            setIsClick(false);
        }
        if (value < 0) {
            setdisplay("block")
            setIsClick(true);
        }
        if (value) {
            setIsClick(false);
        }
        setvalue(value)
    }, [value, display])
    return (
        <div className={`Dropdown ${props.className ?? ""}`}
            id={"dropdown"} onClick={() => { setIsClick(!isClick) }} ref={popRef} style={{ ...props?.style ?? "" }}>
            <div className={"inputs_item"}>
                <div className={`icon_float ${isClick ? "is_change" : ""}`}>
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1371 0.671771C15.3644 0.931544 15.3381 1.3264 15.0783 1.5537L8.41164 7.38703C8.176 7.59322 7.82415 7.59322 7.58851 7.38703L0.921839 1.5537C0.662066 1.3264 0.635743 0.931544 0.863045 0.671771C1.09035 0.411999 1.4852 0.385675 1.74497 0.612976L8.00007 6.08619L14.2552 0.612976C14.5149 0.385675 14.9098 0.411999 15.1371 0.671771Z" fill="#707070" />
                    </svg>
                </div>
                <div className={"icon_clone"} style={{ display: display }} onClick={(e) => { onchanreset(e) }}>
                    <img style={{ marginLeft: "3px", width: "12px" }} src={iconclone} className={'icon_drop'} />
                </div>
                <input className={"input_item"} id={id ?? ""} name={props.name ?? ""} placeholder={placeholder ?? ""}
                    value={valueset ?? ""}
                    autoComplete={("off").toString()} onChange={(e) => { change(e) }} />
            </div>
            <div className={`dropdown_body  stand_radius ${props.classNameBody ?? ""} ${isClick ? "show" : ""}`}
                style={{

                    top: Postioncustom.top,

                }} ref={popRef} >
                <div className={"dropdown_body_stand"}>
                    <ul className={"dropdown_body_stand_stand_input"}>
                        {Options && Options.map((item, index) => {

                            return <li className={"stand_input_li"} key={index} onClick={() => { setIsTitle(item); onChange(item) }} >{item.Name}</li>
                        })}


                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Dropdown;