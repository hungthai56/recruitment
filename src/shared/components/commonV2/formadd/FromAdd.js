import React from "react";
import addfrom from "./FromAdd.module.scss";

function AddFrom(props){
    const { data , loading , children , title} = props;
// return<div className={`${props.className ?? ""} ${addfrom["container-addfrom"]} `} style={{ ...props?.style ?? "" }}>
return <div className={ `${props.className ?? ""}`}>
               <p style={{    fontSize: "14px",fontWeight: "500",backgroundColor: "rgb(255, 255, 255)", marginBottom: "15px"}}>{title}</p>
                {/* <div className={addfrom["form-forcus-addfrom"]}> */}
                    {children}
                {/* </div> */}
            </div>
// </div>

}
export default AddFrom