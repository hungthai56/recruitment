import React, { useState, useEffect, useRef } from "react";
import style from "./FromItemDropdown.module.scss";
import { logDOM } from "@testing-library/react";

function DropdownItem(props) {
    // const [Position, setPosition] = useState({ top:"213px", bottom: 0, left: 0, right: 0, });
    const [isClick, setIsClick] = useState(false);
    const popref = useRef();

    const { Options, value, id, placeholder, onChange, isHover, icon, top, title, valide, children } = props;


    const [isTitle, setIsTitle] = useState("");

    const [heightDropdown, setHeightDropdown] = useState("");
    const [Valueset, setValue] = useState("");
    const popRef = useRef()


    return <div className={style["dropitem-from"]}>
        <div className={style["title-valied"]}>
            <label className={style["title-item"]}>{title}</label>
            <label className={style["valide-item"]}>{valide}</label>
        </div>
        {/* <div className={style["dropitem-from-con"]}> */}
            {props.children}
        {/* </div> */}
    </div>

}
export default DropdownItem