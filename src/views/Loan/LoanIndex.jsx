import React from "react";
import { withRouter } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Button,
} from "reactstrap";
import { Table, OptionalBadge, ActionDropdown, Alert } from "components/Shared/Shared";
import withFadeIn from "components/HOC/withFadeIn";
import API from "api";
import user from "user";
class LoanIndex extends React.Component {
    state = {
        isLoading: true,
        loans: []
    }
    getLoanData = () => {
        API()
            .get("loans")
            .then((resp) => this.setState({
                isLoading: false,
                loans: resp.data.loans
            }, () => console.log(resp)))
            .catch((err) => console.log(err, err.response))
    }
    handleDelete = (id) => {
        this.setState({ isLoading: true }, () => API().delete(`loans/${id}`)
            .then(resp => Alert("success", "Hapus Peminjaman", "Berhasil menghapus peminjaman!"))
            .catch(err => Alert("error", "Hapus Peminjaman", err.response.data.message))
            .finally(() => this.getLoanData()))
    }
    componentDidMount() {
        this.getLoanData()
    }
    render() {
        const { loans, isLoading } = this.state;
        const columns = [
            {
                key: "userName",
                title: "Nama Peminjam",
                dataIndex: "userName",
            },
            {
                key: "startDate",
                title: "Tanggal Peminjaman",
                dataIndex: "startDate",
            },
            {
                key: "dueDate",
                title: "Tanggal Jatuh Tempo",
                dataIndex: "dueDate",
            },
            {
                key: "totalLoan",
                title: "Total Pinjaman",
                dataIndex: "totalLoan",
                render: (loan) => loan.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                })
            },
            {
                title: "Status",
                key: "status",
                dataIndex: "status",
                filters: [
                    {
                        text: "Belum Divalidasi",
                        value: "Belum Divalidasi",
                    },
                    {
                        text: "Lunas",
                        value: "Lunas",
                    },
                    {
                        text: "Belum Lunas",
                        value: "Belum Lunas",
                    },
                    {
                        text: "Ditolak",
                        value: "Ditolak",
                    },
                ],
                onFilter: (value, record) => {
                    return value === record.status;
                },
                render: (status) => <OptionalBadge value={status} />
            },
            {
                key: "employeeName",
                title: "Pegawai Pencatat",
                dataIndex: "employeeName",
                render: (text) => text === "" || text === null ? "Tidak ada" : text
            },
            {
                key: "action",
                title: "Aksi",
                dataIndex: "action",
                render: (value, record) => <ActionDropdown
                    onDetailClick={() => this.props.history.push(`/admin/loans/${record.id}`)}
                    onDeleteClick={() => this.handleDelete(record.id)}
                    withoutDelete={user("role") !== "Admin"}
                    withoutEdit={true}
                    onDeleteClickMessage="Peminjaman LUNAS yang dihapus tidak akan bisa dikembalikan dan tidak akan mengubah saldo!"
                />
            }
        ];
        return (
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row>
                                    <Col md="4" xs="4" sm="12">
                                        <h2 className="mb-0">Daftar Peminjaman</h2>
                                    </Col>
                                    <Col md="8" xs="8" sm="12" className="d-flex justify-content-end">
                                        <Button color="dark" onClick={() => this.props.history.push('/admin/loans/create')}>
                                            <i className="fas fa-plus mr-2"></i>
                                            Tambah
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    loading={isLoading}
                                    columns={columns}
                                    data={loans}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default withRouter(withFadeIn(LoanIndex));
