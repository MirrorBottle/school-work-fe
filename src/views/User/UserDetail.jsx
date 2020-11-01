import React, { Component } from "react"
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    Button,
    CardBody,
} from "reactstrap";
import withFadeIn from "components/HOC/withFadeIn"
import { withRouter } from "react-router-dom"
import API from "api";
import Skeleton from "react-loading-skeleton";
import { Table, OptionalBadge, Confirm, Alert } from "components/Shared/Shared";
import User from "user"
class UserDetail extends Component {
    state = {
        isLoading: true,
        user: {}
    }
    getUserDetailData = () => {
        API()
            .get(`users/${this.props.match.params.id}`)
            .then((resp) => this.setState({
                isLoading: false,
                user: resp.data.user
            }, () => console.log(resp)))
            .catch((err) => console.log(err, err.response))
    }
    handleDelete = () => {
        Confirm("Data pengguna yang sudah memiliki relasi akan diminta konfirmasi kembali apabila benar-benar ingin dihapus").then(() => this.setState({ isLoading: true }, () => {
            API().delete(`users/${this.props.match.params.id}`)
                .then((resp) => {
                    Alert("success", "Hapus Pengguna", "Berhasil menghapus pengguna")
                    this.props.history.push('/admin/users')
                })
                .catch((err) => {
                    if (err.response.status === 403) {
                        Confirm("Pengguna sudah membuat peminjaman, apakah anda yakin ingin menghapus data pengguna dan semua peminjaman baik lunas maupun belum?")
                            .then(() => API().delete(`users/${this.props.match.params.id}/force`)
                                .then((resp) => Alert("success", "Hapus Pengguna", "Berhasil menghapus pengguna"))
                                .catch((err) => {
                                    Alert("error", "Hapus Pengguna", "Gagal menghapus pengguna");
                                    console.log(err, err.response)
                                })
                                .finally(() => this.props.history.push('/admin/users'))
                            )
                    } else {
                        Alert("error", "Hapus Pengguna", "Gagal menghapus pengguna");
                        console.log(err, err.response)
                    }
                })
        }))
    }

    componentDidMount() {
        this.getUserDetailData()
    }
    render() {
        const { isLoading, user } = this.state;
        const columns = [
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
                key: "paidDate",
                title: "Tanggal Pembayaran/Lunas",
                dataIndex: "paidDate",
                render: (text) => text === null ? "-" : text
            },
            {
                key: "totalLoan",
                title: "Total Pinjaman",
                dataIndex: "totalLoan",
                isCurrency: true,
            },
            {
                key: "paymentCount",
                title: "Total Angsuran",
                dataIndex: "paymentCount",
                render: (text) => `${text} Kali`
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
                key: "action",
                title: "Aksi",
                dataIndex: "action",
                render: (value, record) => (
                    <Button size="sm" color="primary" onClick={() => this.props.history.push(`/admin/loans/${record.id}`)}>
                        <i className="fas fa-eye mr-2"></i>
                        Detail
                    </Button>
                )
            }
        ];
        return (
            <Container className="mt--7" fluid>
                <Card className="shadow-lg">
                    <CardHeader className="border-0">
                        <Row>
                            <Col md="9" xs="12" sm="12">
                                <h1 className="mb-0">Detail Pengguna</h1>
                            </Col>
                            <Col md="3" xs="12" sm="12" className="d-flex justify-content-start mt-2">
                                {User("role") === "Admin" && (
                                    <Button disabled={isLoading} color="warning" onClick={() => this.props.history.push(`/admin/users/edit/user/${user.id}`)}>
                                        <i className="fas fa-edit mr-2"></i>
                                        Edit
                                    </Button>
                                )}
                                {User("role") === "Admin" && (
                                    <Button disabled={isLoading} color="danger" onClick={this.handleDelete}>
                                        <i className="fas fa-trash-alt mr-2"></i>
                                        Hapus
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">NAMA</h4>
                                <h3>{isLoading ? <Skeleton /> : user.name}</h3>
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">NO. TELPON</h4>
                                <h3 className="text-success">{isLoading ? <Skeleton /> : user.phoneNumber}</h3>
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">EMAIL</h4>
                                <h3 className="text-success">{isLoading ? <Skeleton /> : user.email}</h3>
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">JENIS KELAMIN</h4>
                                <h3>{isLoading ? <Skeleton /> : user.gender}</h3>
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">TANGGAL LAHIR</h4>
                                <h3>{isLoading ? <Skeleton /> : user.dateOfBirth}</h3>
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">TANGGAL BERGABUNG</h4>
                                <h3>{isLoading ? <Skeleton /> : user.joinDate}</h3>
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">PEKERJAAN</h4>
                                <h3>{isLoading ? <Skeleton /> : user.job}</h3>
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">ALAMAT</h4>
                                <h3>{isLoading ? <Skeleton /> : user.address}</h3>
                            </div>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="shadow-lg mt-4">
                    <CardHeader className="border-0">
                        <h2 className="mb-0">Riwayat Peminjaman</h2>
                    </CardHeader>
                    <CardBody>
                        <Table
                            loading={isLoading}
                            columns={columns}
                            data={user.loans}
                        />
                    </CardBody>
                </Card>
            </Container>
        )
    }
}
export default withRouter(withFadeIn(UserDetail))