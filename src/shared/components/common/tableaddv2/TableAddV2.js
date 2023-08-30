import React, { useState, useEffect, useRef } from 'react';
import style from './TableAddV2.module.scss';
import FormItem from 'shared/components/common/form/FormItem';
import FormSelect from 'shared/components/common/custom-form/FormSelect';
import Dropdown from '../dropdown/Dropdown';
import InputSeach from '../inputseach/InputSeach';
function TableAddV2(props) {
    const [isClick, setIsClick] = useState(true);
    const popRef = useRef(null);
    const [positionData, setPositionData] = useState([]);

    return <div className={'tabledropdown'} onClick={() => { setIsClick(!isClick) }} ref={popRef}>
        <div className={`item_dropdown`}>
            <div className={`title_tablev2 ${isClick ? "is_change" : ""}`} >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1371 0.671771C15.3644 0.931544 15.3381 1.3264 15.0783 1.5537L8.41164 7.38703C8.176 7.59322 7.82415 7.59322 7.58851 7.38703L0.921839 1.5537C0.662066 1.3264 0.635743 0.931544 0.863045 0.671771C1.09035 0.411999 1.4852 0.385675 1.74497 0.612976L8.00007 6.08619L14.2552 0.612976C14.5149 0.385675 14.9098 0.411999 15.1371 0.671771Z" fill="#707070" />
                </svg>
            </div>
            <div>
                <span>Thông tin tuyển dụng</span>
            </div>
        </div>

       

        <div className={` dropdown_body stand_radius  ${isClick ? "show" : ""}`} ref={popRef} >
            <div>
                <Dropdown className={"_select_input inputs_item"} placeholder={"Trạng thái"}
                                id="dropdowx" name="dropdowx"
                                Options={positionData}
                                // onChange={(e) => { onchangeSearch(e, 'status') }}
                                // value={valuesearch.status ? (valuesearch.status == 1 ? "Giao dịch" : "Tạm dừng") : valueinput.status}
                                //value={valuesearch.status}
                                isHover={true}
                                // icon={"images/icon-statuscenter.svg"}
                                // iconclone={"images/icon-close.svg"}
                                // change={(e) => { onchangeinput(e) }}
                                // onchanreset={(e) => { onchanresetstatus(e, 'status') }}

                            />
            </div>
                


        </div>
    </div>
    

}

export default TableAddV2;