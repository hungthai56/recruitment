import React from "react";
import iteminputt from "./ItemInput.module.scss";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";

function ItemInput(props) {
        const { data, loading, children, id, placeholder, onChange, title, valide, value, name, style } = props
        return <div className={iteminputt["inputitem"]}>
                <div className={iteminputt["inputitem-stand"]}>
                        <p className={iteminputt["inputitem-stand"]}>{title}
                                <span className={iteminputt["valide"]}>{valide}</span>
                        </p>
                </div>
                <div className={iteminputt["inputitem-stand-input"]} style={{ position: "relative" }}>

                        <input className={`${iteminputt["input-item"]} ${props.className}`} id={id}
                                name={name} placeholder={placeholder} value={value} onChange={onChange} style={style}
                                autoComplete="off"
                        />

                </div>



        </div>





}
export default ItemInput