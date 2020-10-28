import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Button,
    DropdownItem
} from "reactstrap";
import { Table, ActionDropdown, Confirm, Alert } from "components/Shared/Shared";
import withFadeIn from "components/HOC/withFadeIn";
import { withRouter } from "react-router-dom";
import moment from "moment";
import API from "api";
class UserIndex extends React.Component {
    state = {
        isLoading: true,
        users: []
    }
    getUsersData = () => {
        API().get('users')
            .then((resp) => this.setState({
                users: resp.data.users,
                isLoading: false
            }))
            .catch((err) => console.log(err, err.response))
    }
    handleDelete = (id) => {
        this.setState({ isLoading: true }, () => {
            API().delete(`users/${id}`)
                .then((resp) => {
                    Alert("success", "Hapus Pengguna", "Berhasil menghapus pengguna")
                    this.getUsersData()
                })
                .catch((err) => {
                    if (err.response.status === 403) {
                        Confirm("Pengguna sudah membuat peminjaman, apakah anda yakin ingin menghapus data pengguna dan semua peminjaman baik lunas maupun belum?")
                            .then(() => API().delete(`users/${id}/force`)
                                .then((resp) => Alert("success", "Hapus Pengguna", "Berhasil menghapus pengguna"))
                                .catch((err) => {
                                    Alert("error", "Hapus Pengguna", "Gagal menghapus pengguna");
                                    console.log(err, err.response)
                                })
                                .finally(() => this.getUsersData())
                            )
                    } else {
                        Alert("error", "Hapus Pengguna", "Gagal menghapus pengguna");
                        console.log(err, err.response)
                    }
                })
        })
    }
    componentDidMount() {
        this.getUsersData()
    }
    render() {
        const { users, isLoading } = this.state;
        const columns = [
            {
                key: "name",
                title: "Nama",
                dataIndex: "name",
            },
            {
                key: "gender",
                title: "Jenis Kelamin",
                dataIndex: "gender"
            },
            {
                key: "email",
                title: "Email",
                dataIndex: "email",
            },
            {
                key: "phoneNumber",
                title: "No. Telpon",
                dataIndex: "phoneNumber",
            },
            {
                key: "joinDate",
                title: "Tanggal Bergabung",
                dataIndex: "joinDate",
                render: (text) =>
                    moment(text, "DD-MM-YYYY").locale('id').format("DD MMMM, YYYY"),
            },
            {
                key: "action",
                title: "Aksi",
                dataIndex: "action",
                render: (text, record) => <ActionDropdown
                    onEditClick={() => this.props.history.push(`/admin/users/edit/user/${record.id}`)}
                    onDetailClick={() => this.props.history.push(`/admin/users/${record.id}`)}
                    onDeleteClick={() => this.handleDelete(record.id)}
                    onDeleteClickMessage="Data pengguna yang sudah memiliki relasi akan diminta konfirmasi kembali apabila benar-benar ingin dihapus"
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
                                        <h2 className="mb-0">Daftar Pengguna</h2>
                                    </Col>
                                    <Col md="8" xs="8" sm="12" className="d-flex justify-content-end">
                                        <Button color="dark" onClick={() => this.props.history.push("/admin/users/create/user")}>
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
                                    data={users}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default withRouter(withFadeIn(UserIndex));
