import React from 'react';
import Box from 'shared/components/common/box/Box';
 import styles from './HeadCandidates.module.scss';
import PropTypes from 'prop-types';

function HeadCandidates(props) {
    const {
        value,
        handleChange,
        tabTable,
        showQuantity = false,
        marginTop=false,
        iconRight,
        iconLeft
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
                            {iconLeft}
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                        <div className={styles.tabListIcon}>
                            {iconRight}
                        </div>
                    </div>
                </Box>
            </div>
        </>
    );
}

HeadCandidates.propTypes = {
    value: PropTypes.number,
    handleChange: PropTypes.func,
    tabTable: PropTypes.array,
    quantity: PropTypes.number,
    showQuantity: PropTypes.bool,
    marginTop: PropTypes.bool,
};

export default HeadCandidates;
