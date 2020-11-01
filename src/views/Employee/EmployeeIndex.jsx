import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Button,
} from "reactstrap";
import { Table, ActionDropdown, Confirm, Alert } from "components/Shared/Shared";
import withFadeIn from "components/HOC/withFadeIn";
import { withRouter } from "react-router-dom";
import API from "api"
class EmployeeIndex extends React.Component {
    state = {
        users: [],
        isLoading: true,
    }
    getEmployeesData = () => {
        API()
            .get('employees')
            .then((resp) => this.setState({
                users: resp.data.users,
                isLoading: false
            }, () => console.log(resp)))
            .catch((err) => console.log(err, err.response))
    }
    handleDelete = (id) => {
        Confirm("Data pegawai yang sudah memiliki relasi akan diminta konfirmasi kembali apabila benar-benar ingin dihapus").then(() => this.setState({ isLoading: true }, () => {
            this.setState({ isLoading: true }, () => {
                API().delete(`employees/${id}`)
                    .then((resp) => {
                        Alert("success", "Hapus Pegawai", "Berhasil menghapus pegawai")
                        this.props.history.push('/admin/employees')
                    })
                    .catch((err) => {
                        if (err.response.status === 403) {
                            Confirm("Pegawai sudah melakukan setoran, apakah anda yakin ingin menghapus data pegawai dan semua setoran?")
                                .then(() => API().delete(`users/${id}/force`)
                                    .then((resp) => Alert("success", "Hapus Pegawai", "Berhasil menghapus pegawai"))
                                    .catch((err) => {
                                        Alert("error", "Hapus Pegawai", "Gagal menghapus pegawai");
                                        console.log(err, err.response)
                                    })
                                    .finally(() => this.getEmployeesData())
                                )
                        } else {
                            Alert("error", "Hapus Pegawai", "Gagal menghapus pegawai");
                            console.log(err, err.response)
                        }
                    })
            })
        }))
    }
    componentDidMount() {
        this.getEmployeesData()
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
                dataIndex: "gender",
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
                key: "role",
                title: "Hak Akses",
                dataIndex: "role",
            },
            {
                key: "action",
                title: "Aksi",
                dataIndex: "action",
                render: (text, record) => <ActionDropdown
                    onEditClick={() => this.props.history.push(`/admin/users/edit/employee/${record.id}`)}
                    onDetailClick={() => this.props.history.push(`/admin/employees/${record.id}`)}
                    onDeleteClick={() => this.handleDelete(record.id)}
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
                                        <h2 className="mb-0">Daftar Pegawai</h2>
                                    </Col>
                                    <Col md="8" xs="8" sm="12" className="d-flex justify-content-end">
                                        <Button color="dark" onClick={() => this.props.history.push("/admin/users/create/employee")}>
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

export default withRouter(withFadeIn(EmployeeIndex));
