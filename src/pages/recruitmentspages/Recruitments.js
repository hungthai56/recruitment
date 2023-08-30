import React from 'react';
import WrapContainer from 'shared/components/layout/WrapContainer';
import IcplusColor from 'assets/images/icons/ic-plusColor';
import TestContainer from 'shared/containers/test/TestContainer';
import RecruitmentsContainer from 'shared/containers/listofrecruitmentscontainers/RecruitmentsContainerV2';
export default function Recruitments() {
    const breadcrumb = [
        {
            Name: 'Danh sách bài đăng tuyển dụng',
        },
    ];
    document.title = 'Danh sách bài đăng tuyển dụng';
    return (
        <WrapContainer
            Header={{
                icon: <IcplusColor />,
                title: 'Tuyển dụng',
                breadcrumb,
                menuLeft: false,
            }}
        >
            <RecruitmentsContainer />
        </WrapContainer>
    );
}
