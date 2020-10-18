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
import { Table, ActionDropdown } from "components/Shared/Shared";
import withFadeIn from "components/HOC/withFadeIn";
import moment from "moment";
import API from "api"
class EmployeeIndex extends React.Component {
    state = {
        users: [],
        isLoading: true,
    }
    componentDidMount() {
        API()
            .get('employee')
            .then((resp) => this.setState({
                users: resp.data.users,
                isLoading: false
            }, () => console.log(resp)))
            .catch((err) => console.log(err, err.response))
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
                render: (text) => text === "0" ? "Perempuan" : "Laki-laki"
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
                key: "action",
                title: "Aksi",
                dataIndex: "action",
                render: () => <ActionDropdown />
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
                                        <Button color="dark">
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

export default withFadeIn(EmployeeIndex);
