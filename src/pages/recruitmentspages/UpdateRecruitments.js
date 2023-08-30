import React from 'react';
import WrapContainer from 'shared/components/layout/WrapContainer';
import IcplusColor from 'assets/images/icons/ic-plusColor';
import TestContainer from 'shared/containers/test/TestContainer';
import RecruitmentsUpdateContainer from 'shared/containers/listofrecruitmentscontainers/RecruitmentsUpdateContainer';

import RouterPath from 'router/RouterPath';
export default function UpdateRecruitments() {
    const breadcrumb = [
        {
            Name: 'Danh sách bài đăng tuyển dụng',
            Path: RouterPath.RECRUITMENT
        },
        {
            Name: 'Chỉnh sửa bài đăng tuyển dụng',
        }
    ];
    document.title = 'Chỉnh sửa bài đăng tuyển dụng';
    return (
        <WrapContainer
            Header={{
                icon: <IcplusColor />,
                title: 'Tuyển dụng',
                breadcrumb,
                menuLeft: false,
            }}
        >
            <RecruitmentsUpdateContainer />
        </WrapContainer>
    );
}
