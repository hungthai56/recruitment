import React from "react";
import formdetails from './FormDetail.module.scss';
function FormDetail(props){
    const { data , title } = props;

    return <div className={formdetails["FormDetail"]}>
                <div className={formdetails["title-detail"]}>
                    {title}
                </div>
                <div className={formdetails["form-focus-detail"]}>
                    {data && data.map((item,indexl)=>{
                        return<div className={formdetails["item_detali"]}>
                            <div className="item_lable">{item.lable}</div>
                            <div className="item-icon">
                            <span className={formdetails["item-icon-front"]}>:</span>
                                 {item.text}
                            </div>
                        </div>
                    })}

                </div>
                
            </div>

}
export default FormDetail