import React, { Component } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button } from "antd";
import uid from "uid";


export default class CustomTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
        };
    }
    static defaultProps = {
        handleSearch: (selectedKeys, confirm) => {
            confirm();
        },
        loading: false,
    };
    handleReset = (clearFilters) => {
        clearFilters && clearFilters();
        this.setState({ searchText: "" });
    };
    getColumnSearchProps = (
        dataIndex,
        secondIndex = null
    ) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() => {
                            this.props.handleSearch &&
                                this.props.handleSearch(selectedKeys, confirm, dataIndex);
                            this.setState({ searchText: selectedKeys[0].toString() });
                        }}
                        style={{ width: 188, marginBottom: 8, display: "block" }}
                    />
                    <Button
                        type="primary"
                        onClick={() => {
                            this.props.handleSearch &&
                                this.props.handleSearch(selectedKeys, confirm, dataIndex);
                            this.setState({ searchText: selectedKeys[0].toString() });
                        }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (
            value,
            record
        ) => {
            if (secondIndex) {
                return record[dataIndex][secondIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toString().toLowerCase());
            } else {
                return record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toString().toLowerCase());
            }
        },
    });
    render() {
        const itemNumberColumn = {
            key: "action",
            title: "No",
            dataIndex: "key",
            render: (value, recordy, index) => index + 1,
        };
        const tableColumns = this.props.columns.map((column) => {
            const dataIndex = column.dataIndex || "";
            const secondIndex = column.secondIndex || "";
            if (column.key === "status" || column.key === "isActive" || "isFilter" in column) {
                return { ...column };
            }
            if ("isCurrency" in column) {
                return {
                    ...column,
                    render: (value, record, index) => parseInt(value).toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                    })
                }
            }
            return column.key !== "action"
                ? {
                    ...column,
                    ...this.getColumnSearchProps(
                        dataIndex.toString(),
                        secondIndex.toString()
                    ),
                }
                : { ...column };
        });
        return (
            <div>
                <Table
                    rowKey={(record) => uid()}
                    columns={[itemNumberColumn, ...tableColumns]}
                    dataSource={this.props.data}
                    loading={this.props.loading}
                />
            </div>
        );
    }
}
