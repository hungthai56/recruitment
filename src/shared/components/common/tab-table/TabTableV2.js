import React from 'react';
import Box from 'shared/components/common/box/Box';
import styles from './TabTable.module.scss';
import PropTypes from 'prop-types';

function TabTableV2(props) {
    const {
        value,
        handleChange,
        tabTable,
        showQuantity = false,
        marginTop=false,
        iconRight,
        numberValue
    } = props;

    function capitalizeFirstLetter(s) {
        s = s?.toLowerCase();
        return (s = s.charAt(0).toUpperCase() + s.slice(1));
    }
    return (
        <>
        {/* ${styles.listProductTable} */}
            <div className={`${styles.listProductTable} ${marginTop ? 'mt-3': ''}`}>
                <Box className={`list-product-tablebox-order d-flex flex-row`}>
                    <div className="d-flex flex-row">
                        <div className={styles.tabList}>
                            {tabTable.map((x, key) => {
                                return (
                                    <div
                                        className={`${styles.tabListItem} ${
                                            value == x.id
                                                ? styles.tabListActive
                                                : ''
                                        }`}
                                        key={key}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleChange(x.id);
                                        }}
                                    >
                                        {capitalizeFirstLetter(x?.text)}
                                        {showQuantity && (
                                            <span
                                                className={`${
                                                    value == x.id
                                                        ? styles.active
                                                        : ''
                                                }`}
                                            >
                                                {x?.number}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {value!=numberValue ?  <div className="d-flex flex-row">
                        <div className={styles.tabListIcon}>
                            {iconRight}
                        </div>
                    </div>:''}
                   
                </Box>
            </div>
        </>
    );
}

TabTableV2.propTypes = {
    value: PropTypes.number,
    handleChange: PropTypes.func,
    tabTable: PropTypes.array,
    quantity: PropTypes.number,
    showQuantity: PropTypes.bool,
    marginTop: PropTypes.bool,
};

export default TabTableV2;
