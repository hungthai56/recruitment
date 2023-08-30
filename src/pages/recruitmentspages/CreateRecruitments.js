import React from 'react';
import WrapContainer from 'shared/components/layout/WrapContainer';
import IcplusColor from 'assets/images/icons/ic-plusColor';
import TestContainer from 'shared/containers/test/TestContainer';
import RecruitmentsCreateContainer from 'shared/containers/listofrecruitmentscontainers/RecruitmentsCreateContainer';

import RouterPath from 'router/RouterPath';
export default function CreateRecruitments() {
    const breadcrumb = [
        {
            Name: 'Danh sách bài đăng tuyển dụng',
            Path: RouterPath.RECRUITMENT
        },
        {
            Name: 'Tạo mới bài đăng tuyển dụng',
        }
    ];
    document.title = 'Tạo mới bài đăng tuyển dụng';
    return (
        <WrapContainer
            Header={{
                icon: <IcplusColor />,
                title: 'Tuyển dụng',
                breadcrumb,
                menuLeft: false,
            }}
        >
            <RecruitmentsCreateContainer />
        </WrapContainer>
    );
}
