import $ from "jquery";
import { useEffect, useMemo, useRef, useState } from "react";
import { AutoSizer, List, WindowScroller } from "react-virtualized";
import styles from "./CustomTable.module.scss";
import EmptyTable from "./EmptyTable";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import PropTypes from "prop-types";
import TableHeaderCustom from "./TableHeaderCustom";
import TableRowV2 from "./TableRowV2";
import Constants from "utils/Constants";
function CustomTableV2(props) {
  const {
    ElementId,
    data,
    rowHeight,
    onClickRow,
    headerColumn,
    dropdownColumn,
    checkBoxColumn,
    fieldName,
    fieldKey,
    EmptyPops,
    isHaveHeader,
    isScrollWindow,
    isDropDown,
    ComponentDropDown,
    fieldId = "Id",
    isShowCheckBox,
    selectedCheckBox = [],
    sizeCollapse,
    childrenField,
    handleOnCheckBox,
    componentHeadCell,
    borderTable,
    isParent,
    dataHeaderCustom,
    activeCheckboxId,
  } = props;
  const [dataHead, setDataHead] = useState([]);
  const [isClickAll, setIsClickAll] = useState(false);
  const collapseArr = {};
  const tableRef = useRef(null);
  var ignoreScrollEvents = false;
  const listRef = useRef(null);
  const isSelected = (id) => selectedCheckBox?.findIndex((v) => v == id) !== -1;

  useEffect(() => {
    listRef.current.recomputeRowHeights();
  }, [data]);

  useMemo(() => {
    if (headerColumn) {
      let dataNew = [];
      dataNew = headerColumn?.map((v, index) => {
        return {
          ...v,
          checked: true,
        };
      });
      setDataHead(dataNew);
    }
  }, [headerColumn]);

  // useEffect(() => {
  //     excuteOnScroll();
  // }, [])

  const handleChangeHeader = (e) => {
    setDataHead([...e]);
  };

  const handelClickRow = (e, row) => {
    var text = "";
    text = window.getSelection().toString();
    if (text.length > 0) {
      return;
    } else {
      onClickRow && onClickRow(e, row);
    }
  };

  const updateCollapse = (index, val) => {
    collapseArr[index] = val;
    listRef.current.recomputeRowHeights();
  };
  const rowRenderer = ({ index, key, style }) => {
    let row = data[index];
    return (
      <TableRowV2
        index={index}
        key={row[fieldId]}
        style={style}
        row={row}
        checkBoxColumn={checkBoxColumn}
        dropdownColumn={dropdownColumn}
        dataHead={dataHead}
        isDropDown={isDropDown}
        ComponentDropDown={ComponentDropDown}
        rowHeight={rowHeight}
        isItemSelected={isSelected(row[fieldId])}
        isShowCheckBox={isShowCheckBox}
        updateCollapse={updateCollapse}
        collapseArr={collapseArr}
        childrenField={childrenField}
        fieldId={fieldId}
        handleClickCheckBox={handleClickCheckBox}
        componentHeadCell={componentHeadCell}
        handelClickRow={handelClickRow}
        isParent={isParent}
        borderTable={borderTable}
        activeCheckboxId={activeCheckboxId}
      />
    );
  };

  // const syncScroll = (element1, element2, element3) => {
  //     document.getElementById(ElementId).addEventListener(
  //         'scroll',
  //         function (event) {
  //             var $elm = $(event.target);
  //             if ($elm.hasClass(element1)) {
  //                 var ignore = ignoreScrollEvents
  //                 ignoreScrollEvents = false
  //                 if (ignore) { return; }

  //                 ignoreScrollEvents = true
  //                 $(`.${element2}`).scrollLeft($(`.${element1}`).scrollLeft())
  //                 $(`.${element3}`).scrollLeft($(`.${element1}`).scrollLeft())
  //             }
  //         },
  //         true // Capture event
  //     );
  // }
  // const excuteOnScroll = () => {
  //     syncScroll("_custom_scroll_footer", "ReactVirtualized__Grid__innerScrollContainer", "_custom_scroll_header")
  //     syncScroll("ReactVirtualized__Grid__innerScrollContainer", "_custom_scroll_footer", "_custom_scroll_header")
  // }

  const syncScroll = (...selectors) => {
    const wrapper = document.getElementById(ElementId);
    if (wrapper && selectors.length > 1) {
      wrapper.addEventListener(
        "scroll",
        ({ target }) => {
          if (target.classList.contains(selectors[0])) {
            const ignore = ignoreScrollEvents;
            ignoreScrollEvents = false;
            if (ignore) {
              return;
            }
            ignoreScrollEvents = true;
            const { scrollLeft } = target;
            selectors.forEach((selector) => {
              if (wrapper.querySelector(`.${selector}`)) {
                wrapper.querySelector(`.${selector}`).scrollLeft = scrollLeft;
              }
            });
          }
        },
        true
      );
    }
  };

  useEffect(() => {
    const executeSyncScroll = () => {
      syncScroll(
        "_custom_scroll_footer",
        "_custom_scroll_header",
        "_custom_scroll_sum_row",
        "ReactVirtualized__Grid__innerScrollContainer"
      );
      syncScroll(
        "ReactVirtualized__Grid__innerScrollContainer",
        "_custom_scroll_header",
        "_custom_scroll_sum_row",
        "_custom_scroll_footer"
      );
    };

    executeSyncScroll();
  }, []);

  const noRowsRenderer = () => {
    return <div className={styles["noRowsRenderer"]}>{EmptyPops}</div>;
  };

  const getRowHeight = ({ index }) => {
    if (collapseArr[index]) {
      return (
        rowHeight +
        sizeCollapse?.itemHeight * data[index][childrenField].length +
        sizeCollapse.overHeight
      );
    }
    return rowHeight;
  };

  const handleSelectAllClick = (event) => {
    setIsClickAll(!isClickAll);

    if (!isClickAll) {
      let dataNew = data
        .filter((item) => item.Status === activeCheckboxId)
        .map((v) => v[fieldId]);
      handleOnCheckBox(dataNew);
    } else {
      handleOnCheckBox([]);
    }
  };

  const handleClickCheckBox = (data) => {
    let params = [...selectedCheckBox];
    let indexCheckBox = params?.findIndex((x) => x == data);
    if (indexCheckBox != -1) {
      params.splice(indexCheckBox, 1);
      handleOnCheckBox(params);
    } else {
      params?.push(data);
      handleOnCheckBox(params);
    }
  };

  const getScrollElement = () => {
    if (!isScrollWindow) {
      if (tableRef.current) {
        let scrollElement = tableRef.current.closest(".ScrollPopupBody");
        if (scrollElement) {
          return scrollElement;
        }
      }
    }
    return document.window;
  };

  return (
    <div className="CustomList" id={ElementId} ref={tableRef}>
      {
        <WindowScroller scrollElement={getScrollElement()}>
          {({ height, scrollTop }) => (
            <div className="ScrollTable">
              {!dataHeaderCustom && (
                <TableHeader
                  onChangeHeader={handleChangeHeader}
                  headerColumn={dataHead}
                  checkBoxColumn={checkBoxColumn}
                  dropdownColumn={dropdownColumn}
                  dataDefault={headerColumn}
                  fieldName={fieldName}
                  fieldKey={fieldKey}
                  isHaveHeader={isHaveHeader}
                  onSelectAllClick={handleSelectAllClick}
                  isShowCheckBox={isShowCheckBox}
                  isDropDown={isDropDown}
                  selectedCheckBox={selectedCheckBox}
                  data={data}
                  componentHeadCell={componentHeadCell}
                  borderTable={borderTable}
                />
              )}
              {dataHeaderCustom && (
                <TableHeaderCustom Component={dataHeaderCustom} />
              )}
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    ref={listRef}
                    className="_custom_scroll_body"
                    autoHeight
                    height={height}
                    width={width}
                    scrollTop={scrollTop}
                    rowHeight={getRowHeight}
                    rowRenderer={rowRenderer}
                    rowCount={data.length}
                    overscanRowCount={data.length}
                    containerStyle={{ overflowX: "auto" }}
                    noRowsRenderer={noRowsRenderer}
                  />
                )}
              </AutoSizer>
              <TableFooter
                headerColumn={dataHead}
                fieldName={fieldName}
                fieldKey={fieldKey}
                checkBoxColumn={checkBoxColumn}
                dropdownColumn={dropdownColumn}
                dataDefault={headerColumn}
                isShowCheckBox={isShowCheckBox}
                isDropDown={isDropDown}
                componentHeadCell={componentHeadCell}
              />
            </div>
          )}
        </WindowScroller>
      }
    </div>
  );
}
CustomTableV2.defaultProps = {
  dropdownColumn: {
    isShowDropdownColumn: true,
    minWidth: 44,
  },
  checkBoxColumn: {
    isShowCheckBoxColumn: true,
    minWidth: 44,
  },
  fieldName: "label",
  fieldKey: "id",
  EmptyPops: <EmptyTable />,
  sizeCollapse: {
    itemHeight: 50,
    overHeight: 75,
  },
  isDropDown: false,
  isScrollWindow: true,
  ElementId: "CustomList",
  rowHeight: 50,
  childrenField: "ChildProducts",
  componentHeadCell: null,
  isParent: false,
};

CustomTableV2.propTypes = {
  onClickRow: PropTypes.func,
  handleOnCheckBox: PropTypes.func,
  selectedCheckBox: PropTypes.array,
  fieldKey: PropTypes.string,
  fieldName: PropTypes.string,
  childrenField: PropTypes.string,
  isShowCheckBox: PropTypes.bool,
  headerColumn: PropTypes.array,
  data: PropTypes.array,
  componentHeadCell: PropTypes.element,
  borderTable: PropTypes.bool,
  isParent: PropTypes.bool,
};
export default CustomTableV2;
