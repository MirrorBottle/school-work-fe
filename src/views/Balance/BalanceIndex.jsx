import React, { Component } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Button,
} from "reactstrap";
import { Table, OptionalBadge, ActionDropdown, Confirm, Alert } from "components/Shared/Shared";
import withFadeIn from "components/HOC/withFadeIn";
import { Link } from "react-router-dom";
import API from "api";
import moment from "moment";
class BalanceIndex extends Component {
    state = {
        balances: [],
        isLoading: true,
    }
    getBalancesData = () => {
        API()
            .get('balances')
            .then((resp) => this.setState({
                balances: resp.data.balances,
                isLoading: false
            }, () => console.log(resp)))
            .catch((err) => console.log(err, err.response))
    }
    handleDelete = (id) => {
        Confirm("Catatan saldo tidak akan bisa dikembalikan lagi!").then(() => this.setState({ isLoading: true }, () => API()
            .delete(`balances/${id}`)
            .then((resp) => {
                Alert("success", "Hapus Catatan Saldo", "Berhasil menghapus catatan saldo")
            })
            .catch((err) => Alert("error", "Hapus Catatan Saldo", "Gagal menghapus catatan saldo"))
            .finally(() => this.getBalancesData())
        ))
    }
    componentDidMount() {
        this.getBalancesData();
    }
    render() {
        const { balances, isLoading } = this.state;
        const columns = [
            {
                key: "balance",
                title: "Saldo",
                dataIndex: "balance",
                isCurrency: true,
            },
            {
                key: "status",
                title: "Status",
                dataIndex: "status",
                filters: [
                    {
                        text: "Penurunan",
                        value: "Penurunan",
                    },
                    {
                        text: "Peningkatan",
                        value: "Peningkatan",
                    }
                ],
                onFilter: (value, record) => {
                    return value === record.status;
                },
                render: (status) => <span className={`text-${status === "Penurunan" ? "danger" : "success"} font-weight-bold text-uppercase`}>{status}</span>
            },
            {
                key: "type",
                title: "Data Perubahan",
                dataIndex: "type",
                isFilter: true,
                filters: [
                    {
                        text: "Angsuran",
                        value: "Angsuran",
                    },
                    {
                        text: "Peminjaman",
                        value: "Peminjaman",
                    },
                    {
                        text: "Setoran",
                        value: "Setoran",
                    }
                ],
                onFilter: (value, record) => {
                    return value === record.type;
                },
                render: (type) => <OptionalBadge value={type} />
            },
            {
                key: "doType",
                title: "Tipe Perubahan",
                dataIndex: "doType",
                isFilter: true,
                filters: [
                    {
                        text: "Membuat",
                        value: "Membuat",
                    },
                    {
                        text: "Mengubah",
                        value: "Mengubah",
                    },
                    {
                        text: "Menghapus",
                        value: "Menghapus",
                    }
                ],
                onFilter: (value, record) => {
                    return value === record.doType;
                },
                render: (doType) => <OptionalBadge value={doType} />
            },
            {
                key: "userName",
                title: "Pengubah",
                dataIndex: "userName",
            },
            {
                key: "changedAt",
                title: "Waktu Perubahan",
                dataIndex: "changedAt",
                render: (text) => moment(text, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm:ss")
            },
            {
                key: "action",
                title: "Aksi",
                dataIndex: "action",
                render: (text, record, index) => index !== 0 && (<Button size="sm" onClick={() => this.handleDelete(record.id)} color="danger" >
                    <i className="fas fa-trash-alt mr-2"></i>
                    Hapus
                </Button>)
            }
        ];
        return (
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row>
                                    <Col md="4" xs="4" sm="12" >
                                        <h2 className="mb-0">Catatan Saldo</h2>
                                    </Col>
                                    {/* <Col md="8" xs="8" sm="12" className="d-flex justify-content-end">
                                        <Link to="/admin/balances/create">
                                            <Button color="dark">
                                                <i className="fas fa-plus mr-2"></i>
                                                Tambah
                                            </Button>
                                        </Link>
                                    </Col> */}
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    loading={isLoading}
                                    columns={columns}
                                    data={balances}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default withFadeIn(BalanceIndex)
