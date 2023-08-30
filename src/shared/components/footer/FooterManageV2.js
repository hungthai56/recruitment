import React from 'react';
import PropTypes from 'prop-types';
import styles from './footer.module.scss';
import IconLeftArrow from './../../../assets/images/icons/ic-left-arrow';
import { useHistory } from 'react-router'
import TextLink from 'shared/components/common/label/textLink';
import TextLinkV2 from '../common/label/textLinkV2';
import RouterPath from 'router/RouterPath';
function FooterManageV2(props) {
    const {
        className,
        children,
        isShowBack,
        routerPath = '',
        back,
        isShareScreen,
    } = props;

    const history = useHistory();

    const handleBack = () => {
        if (back) {
            window.history.back();
        } else {
            if (routerPath == '') {
                history.goBack();
            } else {
                history.push(routerPath);
            }
        }
    }
    
    return (
        <>
            {
                isShowBack &&
                <div onClick={handleBack} className={styles.containerGoBackCommon}>
                    <div className={styles.iconGoBack}>
                        <IconLeftArrow />
                    </div>
                    <p className={`${styles.titleGoBack}`} >
                        <TextLinkV2 to={RouterPath.getRouteWithId(routerPath, props?.Id)} title={props?.titleBack} className={styles['color']} children={props?.titleBack} />
                    </p>

                </div>
            }
            <div className={`${styles.findXFooter} ${className} ${!isShareScreen && styles.positionFix}`}>
                <div className="w-100 d-flex align-items-center justify-content-end">
                    {/* <div
                        onClick={handleBack}
                        className={`d-flex align-items-center justify-content-start flex-row ${styles.buttonBack}`}
                    >
                        <IconLeftArrow />
                        <a className="ml-2">Quay lại danh sách sản phẩm</a>
                    </div> */}
                    <div>{children}</div>
                </div>
            </div>
        </>
    );
}

FooterManageV2.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.element,
    isShowBack: PropTypes.bool,
    titleBack: PropTypes.string,
    routerPath: PropTypes.string,
    back: PropTypes.bool,
    isShareScreen: PropTypes.bool,
};

FooterManageV2.defaultProps = {
    className: '',
    style: {},
    children: null,
    isShowBack: true,
    titleBack: "Quay lại",
    routerPath: '',
    back: false,
    isShareScreen: false,
};
export default FooterManageV2;
