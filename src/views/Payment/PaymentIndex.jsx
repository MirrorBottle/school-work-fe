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
import { Table, OptionalBadge, ActionDropdown } from "components/Shared/Shared";
import withFadeIn from "components/HOC/withFadeIn";
import API from "api"
class PaymentIndex extends React.Component {
    state = {
        isLoading: true,
        payments: []
    }
    componentDidMount() {
        API()
            .get('payment')
            .then((resp) => this.setState({
                payments: resp.data.payments,
                isLoading: false
            }, () => console.log(resp)))
            .catch((err) => console.log(err, err.response))
    }
    render() {
        const { payments, isLoading } = this.state;
        const columns = [
            {
                key: "userName",
                title: "Nama Peminjam",
                dataIndex: "userName",
            },
            {
                key: "userPhoneNumber",
                title: "No. Telpon Peminjam",
                dataIndex: "userPhoneNumber",
            },
            {
                key: "dueDate",
                title: "Tanggal Jatuh Tempo",
                dataIndex: "dueDate",
            },
            {
                title: "Status",
                key: "status",
                dataIndex: "status",
                filters: [
                    {
                        text: "Belum Lunas",
                        value: "Belum Lunas",
                    },
                    {
                        text: "Lunas",
                        value: "Lunas",
                    },
                    {
                        text: "Lunas Terlambat",
                        value: "Lunas Terlambat",
                    },
                    {
                        text: "Belum Lunas Terlambat",
                        value: "Belum Lunas Terlambat",
                    },
                ],
                onFilter: (value, record) => {
                    return value === record.status;
                },
                render: (status) => <OptionalBadge value={status} />
            },
            {
                key: "paymentDate",
                title: "Tanggal Pembayaran",
                dataIndex: "paymentDate",
                render: (text) => text === "" || text === null ? "-" : text
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
                                        <h2 className="mb-0">Daftar Angsuran</h2>
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
                                    data={payments}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default withFadeIn(PaymentIndex);
