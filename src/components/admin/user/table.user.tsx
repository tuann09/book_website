import { getUsersAPI } from "@/services/api";
import { dateRangeValidate } from "@/services/helper";
import {
    CloudUploadOutlined,
    DeleteTwoTone,
    EditOutlined,
    EditTwoTone,
    ExportOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Space, Tag } from "antd";
import { useRef, useState } from "react";
import DetailUser from "./detail.user";
import CreateUser from "./create.user";
import ImportUser from "./data/import.user";

type TSearch = {
    fullName: string;
    email: string;
    createdAt: string;
    createdAtRange: string;
};
const TableUser = () => {
    const actionRef = useRef<ActionType>();
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState<IUserTable | null>(
        null
    );

    const [openModalImport, setOpenModalImport] = useState<boolean>(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const refreshTable = () => {
        actionRef.current?.reload();
    };
    const columns: ProColumns<IUserTable>[] = [
        {
            dataIndex: "index",
            valueType: "indexBorder",
            width: 48,
        },
        {
            title: "_id",
            dataIndex: "_id",
            hideInSearch: true,
            render(dom, entity, index, action, schema) {
                return (
                    <a
                        onClick={() => {
                            setDataViewDetail(entity);
                            setOpenViewDetail(true);
                        }}
                        href="#"
                    >
                        {entity._id}
                    </a>
                );
            },
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            copyable: true,
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            valueType: "date",
            sorter: true,
            hideInSearch: true,
        },
        {
            title: "Created At",
            dataIndex: "createdAtRange",
            valueType: "dateRange",
            hideInTable: true,
        },
        {
            title: "Action",
            hideInSearch: true,
            render(dom, entity, index, action, schema) {
                return (
                    <>
                        <EditTwoTone
                            twoToneColor="#f57800"
                            style={{ cursor: "pointer", marginRight: 15 }}
                        />
                        <DeleteTwoTone
                            twoToneColor="#ff4d4f"
                            style={{ cursor: "pointer" }}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <>
            <ProTable<IUserTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(params, sort, filter);
                    let query = "";
                    if (params) {
                        query += `current=${params.current}&pageSize=${params.pageSize}`;
                        if (params.email) {
                            query += `&email=/${params.email}/i`;
                        }
                        if (params.fullName) {
                            query += `&fullName=/${params.fullName}/i`;
                        }
                        const createdDateRange = dateRangeValidate(
                            params.createdAtRange
                        );
                        if (createdDateRange) {
                            query += `&createdAt>=${createdDateRange[0]}&createdAt<=${createdDateRange[1]}`;
                        }
                    }
                    query += `&sort=-createdAt`;
                    if (sort && sort.createdAt) {
                        query += `&sort=${
                            sort.createdAt === "ascend"
                                ? "createdAt"
                                : "-createdAt"
                        }`;
                    }
                    const res = await getUsersAPI(query);
                    if (res.data) {
                        setMeta(res.data.meta);
                    }

                    return {
                        data: res.data?.result,
                        page: 1,
                        success: true,
                        total: res.data?.meta.total,
                    };
                }}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    showSizeChanger: true,
                    total: meta.total,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {range[0]}-{range[1]} trên {total} rows
                            </div>
                        );
                    },
                }}
                headerTitle="Table user"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<ExportOutlined />}
                        onClick={() => {}}
                        type="primary"
                    >
                        Export
                    </Button>,
                    <Button
                        key="button"
                        icon={<CloudUploadOutlined />}
                        onClick={() => setOpenModalImport(true)}
                        type="primary"
                    >
                        Import
                    </Button>,
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setOpenModalCreate(true);
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>,
                ]}
            />
            <DetailUser
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
            <CreateUser
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                refreshTable={refreshTable}
            />
            <ImportUser
                openModalImport={openModalImport}
                setOpenModalImport={setOpenModalImport}
                refreshTable={refreshTable}
            />
        </>
    );
};

export default TableUser;
