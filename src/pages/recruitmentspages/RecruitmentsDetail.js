import React from 'react';
import WrapContainer from 'shared/components/layout/WrapContainer';
import IcplusColor from 'assets/images/icons/ic-plusColor';
import TestContainer from 'shared/containers/test/TestContainer';

import RecruitmentsDetailContainer from 'shared/containers/listofrecruitmentscontainers/RecruitmentsDetailContainer';
import RouterPath from 'router/RouterPath';
export default function RecruitmentsDetail() {
    const breadcrumb = [
        {
            Name: 'Danh sách bài đăng tuyển dụng',
            Path: RouterPath.RECRUITMENT
        },
        {
            Name: 'Chi tiết bài đăng tuyển dụng',
        }
    ];
    document.title = 'Chi tiết bài đăng tuyển dụng';
    return (
        <WrapContainer
            Header={{
                icon: <IcplusColor />,
                title: 'Tuyển dụng',
                breadcrumb,
                menuLeft: false,
            }}
        >
            <RecruitmentsDetailContainer />
        </WrapContainer>
    );
}
