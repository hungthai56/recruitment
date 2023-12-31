import { Checkbox, Collapse, IconButton } from '@mui/material';
import styles from './CustomTable.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import Constants from 'utils/Constants';
import TextHover from '../label/TextHover';

const TableRowV2 = (props) => {
    const {
        row,
        style,
        checkBoxColumn,
        dropdownColumn,
        handelClickRow,
        dataHead,
        isShowCheckBox,
        isItemSelected,
        index,
        isDropDown,
        ComponentDropDown,
        updateCollapse,
        collapseArr,
        rowHeight,
        childrenField = '',
        handleClickCheckBox,
        fieldId = 'Id',
        componentHeadCell,
        borderTable = false,
        isParent,
        activeCheckboxId,
    } = props;
    const [isCollapse, setIsCollapse] = useState(collapseArr[index]);
    const [hoveredColumn, setHoveredColumn] = useState(null);
    const handleColapse = (e) => {
        e.stopPropagation();
        setIsCollapse(!isCollapse);
        updateCollapse(index, !isCollapse);
    };

    let isShowCheckBoxColumn = isShowCheckBox && componentHeadCell != null;

    const onHandleClickRow = (e, row) => {
        e.stopPropagation();
        handelClickRow(e, row);
    };

    return (
        <div
            style={{
                ...style,
                borderBottomWidth: isCollapse ? 1 : 0,
                backgroundColor: isCollapse ? '#FBFAF4' : 'white',
            }}
            className={`${styles['TableRow']} ${isParent && !row?.ParentId ? styles['isParent'] : ''}`}
            // onClick={(e) => handelClickRow(e, row)}
        >
            <div className={`${styles['MainRow']}`} style={{ height: rowHeight }}>
                {isDropDown && (
                    <div
                        className={`${styles['TableCell']} ${styles['FilterColumn']}`}
                        style={{
                            minWidth: dropdownColumn?.minWidth,
                            maxWidth: dropdownColumn?.minWidth,
                        }}
                    >
                        <div>
                            <IconButton aria-label="expand row" size="small" onClick={handleColapse}>
                                {isCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </div>
                    </div>
                )}
                {isShowCheckBoxColumn && (
                    <div
                        className={`${styles['TableCell']} ${styles['FilterColumn']}`}
                        style={{
                            minWidth: checkBoxColumn?.minWidth,
                            maxWidth: checkBoxColumn?.minWidth,
                        }}
                    >
                        <Checkbox
                            disabled={row?.Status !== activeCheckboxId}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleClickCheckBox(row[fieldId]);
                            }}
                            color="success"
                            checked={isItemSelected}
                        />
                    </div>
                )}
                {dataHead.map((c, i) => {
                    let CustomComponent = c['component'];
                    let stylesProps = {};
                    if (c['maxWidth']) {
                        stylesProps['maxWidth'] = c['maxWidth'];
                    }

                    if (borderTable) {
                        stylesProps['borderRight'] = '1px solid rgb(209 209 209 / 78%)';
                    }
                    if (borderTable && i == 0) {
                        stylesProps['borderLeft'] = '1px solid rgb(209 209 209 / 78%)';
                    }

                    const shouldShowPopup = c['isHoverShow'] === true;

                    return (
                        !c['isHidden'] && (
                            <div
                                key={i}
                                className={`${styles['TableCell']}`}
                                style={{
                                    minWidth: c['minWidth'],
                                    ...stylesProps,
                                    backgroundColor: isCollapse ? '#FBFAF4' : 'white',
                                }}
                                onMouseEnter={() => shouldShowPopup && setHoveredColumn(i)} // Step 2
                                onMouseLeave={() => shouldShowPopup && setHoveredColumn(null)} // Step 2
                            >
                                {CustomComponent ? (
                                    <div
                                        style={{
                                            justifyContent:
                                                c['align'] == 'left'
                                                    ? 'flex-start'
                                                    : c['align'] == 'right'
                                                    ? 'flex-end'
                                                    : 'center',
                                            alignItems: 'center',
                                        }}
                                        className="w-100 d-flex"
                                        onClick={(e) => c['isOnclick'] && onHandleClickRow(e, row)}
                                    >
                                        <CustomComponent
                                            data={row}
                                            dataId={row[c['field']]}
                                            children={row[c['field']]}
                                            fieldId="fieldId"
                                            stt={index}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="text-truncate w-100"
                                        style={{ textAlign: c['align'] }}
                                        title={row[c['field']]}
                                    >
                                        {row[c['field']]}
                                    </div>
                                )}
                                {shouldShowPopup && hoveredColumn === i && (
                                    <div style={{ position: 'absolute', width: '400px', height: '50px', zIndex: 2 }}>
                                        <TextHover text={row[c['field']]} />
                                    </div>
                                )}
                            </div>
                        )
                    );
                })}
            </div>
            <Collapse in={isCollapse} timeout={0} unmountOnExit>
                <div className={`${styles['SubRow']}`}>
                    {row[childrenField]?.length > 0 ? (
                        <ComponentDropDown data={row} />
                    ) : (
                        <div style={{ margin: '15px 75px' }}>Chưa có sản phẩm con</div>
                    )}
                </div>
            </Collapse>
        </div>
    );
};

export default TableRowV2;
