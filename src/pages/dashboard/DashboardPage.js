import React from "react";
import WrapContainer from "shared/components/layout/WrapContainer";
import IcplusColor from "assets/images/icons/ic-plusColor";

function DashboardPage() {
  const breadcrumb = [
    {
      Name: "Tổng quan",
    },
  ];
  document.title = "Tổng Quan";
  return (
    <WrapContainer
      Header={{
        icon: <IcplusColor />,
        title: "Tuyển dụng",
        breadcrumb,
        menuLeft: false,
      }}
    >
      Dashboard
    </WrapContainer>
  );
}
export default DashboardPage;
