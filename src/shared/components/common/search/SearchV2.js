import React, { useState, useEffect, useRef } from 'react';
import Dropdown from '../dropdown/Dropdown';
import InputSeach from '../inputseach/InputSeach';
// import Notification from '../Notification/Notification';

import seach from "./Search.module.scss"
import { useForm } from 'react-hook-form';

import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import tr from 'date-fns/esm/locale/tr/index.js';
import IconSettingFilter from 'assets/icon/IconSettingFilter';
import IcSetting from 'assets/images/icons/ic-general-setting';
import IconSeeMore from 'assets/images/icons/ic-see-more';
import FormItem from 'shared/components/common/form/FormItem';

import FormDatePicker from 'shared/components/common/custom-form/FormDatePicker';
import Validator from 'utils/Validator';

function SearchV2(props) {
    const dispatch = useDispatch;
    const { reacode, onchangeSearch, datastatus
        , ValueStatus, ValueAddress, ValueSearch, resetitem, btnsearch,
        idsa, idstatus, idaddress, valuesearch, onchangeStatus, dataprovin, onchangeinput, valueinput, onchanresetstatus, idvacancies
        , idrecruitmentproposal, idday
    } = props

    const { titel_chitiet } = props;
    const popRef = useRef(null)

    const [Optionss, setOptionss] = useState([
        { id: 1, Name: "Giao dịch" },
        { id: 2, Name: "Tạm dừng" }
    ])
    let location = useLocation();

    const [isChangeData, setisChangeData] = useState(false);
    const [issetvalue, setissetvakue] = useState({})

    const [isClick, setIsClick] = useState(false);
    const [clickis, setclickis] = useState(false)

    let defaultValue = {
        Search: '',
        TimeFrom: null,
        TimeTo: null
    }
    const methods = useForm({
        defaultValues: defaultValue
    });



    return (
        <div className={"box-context Search stand_radius"} id={'search'}  >
            <div className={"search_item_btn"} >
                {/* <form > */}
                <div className={'search_item_search'}>
                    <div className={'inputs_search_dropdow'} style={{ flex: "1 1 0%" }}>
                        <div className={'inputs_'}>
                            <InputSeach className={`search_input inputs_item`}
                                placeholder={"Tìm kiếm mã NCC, tên NCC, email, "} id={idsa} name={idsa}
                                onChange={onchangeSearch}
                                value={valuesearch ?? ""}

                            />
                            <Dropdown className={"_select_input inputs_item"} placeholder={"Trạng thái"}
                                id={idstatus} name={idstatus}
                                Options={Optionss}
                                onChange={(e) => { onchangeSearch(e, 'status') }}
                                // value={valuesearch.status ? (valuesearch.status == 1 ? "Giao dịch" : "Tạm dừng") : valueinput.status}
                                //value={valuesearch.status}
                                isHover={true}
                                icon={"images/icon-statuscenter.svg"}
                                iconclone={"images/icon-close.svg"}
                                change={(e) => { onchangeinput(e) }}
                                onchanreset={(e) => { onchanresetstatus(e, 'status') }}

                            />
                            {/* className={`${seach["_select_input"]} ${seach["inputs_item"]}`} */}
                            <Dropdown
                                placeholder={"Vị trí tuyển dụng"} id={idvacancies} name={idvacancies}
                                Options={Optionss}
                                onChange={(e) => { onchangeSearch(e, 'vacancies') }}
                                // value={valuesearch.provin ? valuesearch.provin : valueinput.provin}
                                isHover={true}
                                icon={"images/icon-statuscenter.svg"}
                                iconclone={"images/icon-close.svg"}
                                change={(e) => { onchangeinput(e) }}
                                onchanreset={(e) => { onchanresetstatus(e, 'vacancies') }}
                            />
                        </div>
                    </div>

                    <div className={"action_btn"}>
                        <button className={'btn-setup-reset'}
                            onClick={() => {
                                resetitem();
                            }}>
                            Thiết lập lại</button>
                        <div className={"btn_search_dropdow"}>
                            <button className={'btn-setup-seach'}
                                onClick={() => {
                                    btnsearch();
                                }}>Tìm kiếm</button>
                            <button className={'btn-setup-seach-dropdow'} onClick={() => { setIsClick(!isClick) }} ref={popRef} >
                                <div className={`${isClick ? "is_change" : ""}`} style={{ paddingTop: "2px" }}>
                                    {/* <img src='images/Icon-dropdown-btn.svg' className={'icon_btn-setting'} /> */}
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Icon dropdown">
                                            <path id="Vector 1842 (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M17.1344 6.6717C17.3617 6.93147 17.3354 7.32632 17.0756 7.55362L10.409 13.387C10.1733 13.5931 9.82146 13.5931 9.58582 13.387L2.91915 7.55362C2.65938 7.32632 2.63306 6.93147 2.86036 6.6717C3.08766 6.41192 3.48251 6.3856 3.74228 6.6129L9.99739 12.0861L16.2525 6.6129C16.5123 6.3856 16.9071 6.41192 17.1344 6.6717Z" fill="white" />
                                        </g>
                                    </svg>
                                </div>
                            </button>
                        </div>
                        <button className={'btn-setting'}>
                            {/* <img src='images/icon-caidat.svg' className={'icon_btn-setting'} /> */}
                            <IconSettingFilter color="#138300" />
                        </button>

                        <button className={"btn-seedetail"}>
                            {/* <img src='images/icon-xemchitiet.svg' className={"icon_btn-seedetail"} /> */}
                            <IconSeeMore />
                        </button>
                    </div>
                </div>


                <div className={`${"inputs_search_dropdow_show"} ${isClick ? "show" : ""}`} style={{
                    flex: "1 1 0%"
                }}>

                    <Dropdown
                        placeholder={"Địa chỉ làm việc"} id={idaddress} name={idaddress}
                        Options={Optionss}
                        onChange={(e) => { onchangeSearch(e, 'address') }}
                        // value={valuesearch.provin ? valuesearch.provin : valueinput.provin}
                        isHover={true}
                        icon={"images/icon-statuscenter.svg"}
                        iconclone={"images/icon-close.svg"}
                        change={(e) => { onchangeinput(e) }}
                        onchanreset={(e) => { onchanresetstatus(e, 'address') }}
                        topcoustom={"32px"}
                        style={{ flex: "1 1 0%" }}
                    />
                    <Dropdown
                        placeholder={"Đề xuất tuyển dụng"} id={idrecruitmentproposal} name={idrecruitmentproposal}
                        Options={Optionss}
                        onChange={(e) => { onchangeSearch(e, 'recruitmentproposal') }}
                        // value={valuesearch.provin ? valuesearch.provin : valueinput.provin}
                        isHover={true}
                        icon={"images/icon-statuscenter.svg"}
                        iconclone={"images/icon-close.svg"}
                        change={(e) => { onchangeinput(e) }}
                        onchanreset={(e) => { onchanresetstatus(e, 'recruitmentproposal') }}
                        topcoustom={"32px"}
                        style={{ flex: "1 1 0%" }}
                    />
                    <Dropdown
                        placeholder={"Ngày tạo "} id={idday} name={idday}
                        Options={Optionss}
                        onChange={(e) => { onchangeSearch(e, 'day') }}
                        // value={valuesearch.provin ? valuesearch.provin : valueinput.provin}
                        isHover={true}
                        icon={"images/icon-statuscenter.svg"}
                        iconclone={"images/icon-close.svg"}
                        change={(e) => { onchangeinput(e) }}
                        onchanreset={(e) => { onchanresetstatus(e, 'day') }}
                        topcoustom={"32px"}
                        style={{ flex: "1 1 0%" }}
                    />
                    <FormItem style={{ flex: 1 }}>
                        <FormDatePicker
                            fieldName="TimeTo"
                            validate={[Validator.maxDate, Validator.CheckedDate(methods.getValues('TimeFrom'), 2)]}
                            // placeholder={"dd/mm/yyyy"}
                            placeholder="Ngày đăng đến"
                        />
                    </FormItem>


                </div>
                {/* </form> */}

            </div>
        </div>
    )

}


export default SearchV2;