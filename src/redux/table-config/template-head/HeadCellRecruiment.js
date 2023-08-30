import moment from "moment";
import ReadMoreContent from "shared/components/common/read-more-content/ReadMoreContent";
import Constants from "utils/Constants";
import Utils from "utils/Utils";
import WaringPost from "shared/components/social/WaringPost/WaringPost";
import CodeLink from "shared/components/common/label/CodeLink";
import CodeStatus from "shared/components/common/label/CodeStatus";
import RouterPath from "router/RouterPath";
import ButtonDropdown from 'shared/components/commonV2/buttondropdown/ButtonDropdown';
import styles from './HeadCellRecruiment.module.scss';
// import React, { useEffect, useState } from 'react';

export const HeadCellRecruiment = [
    {
        label: 'Mã bài đăng',
        field: 'Code',
        id: 'Code',
        minWidth: 150,
        align: 'left',
        component: (props) => {
            return (
                <CodeLink path={RouterPath.RECRUITMENT_DETAILS} Id={props.data?.Id} {...props} />

            );
        },
        isOnclick: true,
        sort: false,
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        unEnabled: true,
        isOnclick: true
    },
    {
        label: 'Tiêu đề',
        field: 'Title',
        id: 'Title',
        minWidth: 240,
        align: 'left',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        component: (props) => {
            return <div style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }}>
                {props?.children}
            </div>
        },
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        isHoverShow: true,
    },
    {
        label: 'Đề xuất',
        field: 'RecruitmentProposalTitle',
        id: 'RecruitmentProposalTitle',
        minWidth: 180,
        align: 'left',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        isHoverShow: true,
    },
    {
        label: 'Vị trí',
        field: 'PositionName',
        id: 'PositionName',
        minWidth: 180,
        align: 'left',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        component: (props) => {
            return <div style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }}> {(props?.data?.PositionName)?.join(', ')}
            </div>
        },
        isHoverShow: true,
    },
    {
        label: 'Địa chỉ làm việc',
        field: 'BrancheNames',
        id: 'BrancheNames',
        minWidth: 220,
        align: 'left',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        isHoverShow: true,
    },
    {
        label: 'Trạng thái',
        field: 'Status',
        id: 'Status',
        minWidth: 100,
        align: 'left',
        component: (props, text, record, index) => {
           let backgroundColor = props.data.Status === 1 ? "#008A5A" : "#D72F2F"
            let Options = [
                { label: "Hiển thị", value: 1 },
                { label: "Ẩn", value: 2 },
            ];
            return <CodeStatus {...props} Options={Options} backgroundColor={backgroundColor} />;
        },
        type: Constants.TYPE_RENDER_TABLE.CHOOSE,
    },
    {
        label: 'SL tuyển',
        field: 'Quantity',
        id: 'Quantity',
        minWidth: 75,
        align: 'right',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
    },
    {
        label: 'Ứng tuyển',
        field: 'NumberOfApplicants',
        id: 'NumberOfApplicants',
        minWidth: 85,
        align: 'right',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
    },
    {
        label: 'Đã tuyển',
        field: 'NumberOfCandidatesRecruited',
        id: 'NumberOfCandidatesRecruited',
        minWidth: 76,
        align: 'right',
        type: Constants.TYPE_RENDER_TABLE.TEXT,

    },
    {
        label: 'Thời gian',
        field: 'From',
        id: 'From',
        minWidth: 250,
        align: 'center',
        component: (props) => {
            return <div style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }}> {props?.data?.From ? moment(props?.data?.From).format('DD/MM/YYYY') + " " + "-" + " " + moment(props?.data?.To).format('DD/MM/YYYY') : ''}
            </div>
        },
        type: Constants.TYPE_RENDER_TABLE.DATE,
    }, {
        label: 'Người tạo',
        field: 'creator',
        id: 'creator',
        minWidth: 150,
        align: 'left',
        component: (props) => {
            return <div style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }}> {props?.data?.EmployeeCode + " " + "-" + " " + props?.data?.CreatedByName}
            </div>
        }
    }, {
        label: 'Ngày tạo',
        field: 'CreatedAt',
        id: 'CreatedAt',
        minWidth: 200,
        align: 'center',
        component: (props) => {
            return props?.data?.CreatedAt ? moment(props?.data?.CreatedAt).format('DD/MM/YYYY hh:mm') : ''
        },
        type: Constants.TYPE_RENDER_TABLE.DATE,
    },
]