import React, { useState, useEffect, useRef } from 'react';
import CheckBox from "shared/components/common/checkbox/CheckBox"


import table from "./Table.module.scss";
function Table(props)
{

    const { Colums, DataRow, isboder, ischeckbox, onChangeCheck, WrapperStyle } = props
   
    const [Values, setValues] = useState([]);
    const [check, setCheck] = useState(false);
    

    const onChangeCheckbox = (e, value, isall) =>
    {

        let result = [];
        if (!isall) {

            if (e.target.checked) {
                if (!Values.includes(value)) {
                    Values.push(value)
                    result = Values
                }
            } else {
                result = Values.filter(item =>
                {

                    return value !== item
                })
            }

        } else {
            if (e.target.checked) {
                (DataRow || []).map((item, index) =>
                {
                    if (!Values.includes(item.ID)) {
                        result.push(item.ID)
                    }
                })
            } else {
                result = []
            }

        }

        setValues(result)
        setCheck(!check)
    }

    return (
        
        <div className={`${table["Table"]} box-stadius`} id={`${table["table"]}`} style={{ ...WrapperStyle }}  >
            <table className={`${table['table_standard']}`}
                cellPadding={0}
                cellSpacing={0}
                border={isboder ? 1 : 0}
            >
                <thead>
                    <tr className={`${table['color_standar']}`} >
                        {Colums && Colums.map((item, index) =>
                        {

                            return <th key={index} style={{ ...item.style }}>
                                {/* {ischeckbox && index <= 0 && <div style={{ display: "flex",marginTop: "1px"}}>

                                    <CheckBox
                                        id={"all_check"}
                                        value={"all_check"}
                                        style={{
                                            marginRight: "10px", width: "20px",
                                            height: "20px"
                                        }}
                                        onChange={(e) => onChangeCheckbox(e, "all_check", true)}
                                        checked={Values.length === DataRow.length}
                                    >


                                    </CheckBox> */}
                                    {/* <input type="checkbox" id='' value={item.id} style={{ marginRight: "10px" }} onChange={(e) => onChangeCheckbox(e, item.id, true)} /> */}

                                    {/* <span style={{marginTop: "7px"}}>{item.title}</span>
                                </div>} */}
                                {item.title}
                            </th>
                        })}


                    </tr>
                </thead>
                <tbody>

                    {DataRow && DataRow.map((item, index) =>
                    {
                        return <tr key={index} style={{ backgroundColor: Values.includes(item.id) ? "#FBFAF4" : "#FFFFFF" }}>

                            {Colums && Colums.map((el, i) =>
                            {
                             
                             
                                return <td key={i} style={{ ...el.style }} >
                                    {/* {ischeckbox && i <= 0 && <div style={{ display: "flex" }}>
                                        <CheckBox id={item.id} value={item.key}
                                            style={{
                                                marginRight: "10px",
                                                width: "20px",
                                                height: "20px"
                                            }}
                                            onChange={(e) => onChangeCheckbox(e, item.id, false)} checked={Values.includes(item.id)} >

                                        </CheckBox>


                                        {!el.render && item[el.dataIndex]}
                                        {el.render && el.render(item[el.dataIndex], item)}
                                    </div>} */}

                                    {!el.render && item[el.dataIndex]}
                                    {el.render && el.render(item[el.dataIndex], item, index)}
                                </td>
                             


                            })}
                        </tr>;
                    })}

                </tbody>
            </table>
        </div >
        
    )
}


export default Table;