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
import API from "api";
class DepositIndex extends React.Component {
    state = {
        deposits: [],
        isLoading: true,
    }
    componentDidMount() {
        API()
            .get('deposit')
            .then((resp) => this.setState({
                deposits: resp.data.deposits,
                isLoading: false
            }, () => console.log(resp)))
            .catch((err) => console.log(err, err.response))
    }
    render() {
        const { deposits, isLoading } = this.state;
        const columns = [
            {
                key: "employeeName",
                title: "Nama Pegawai",
                dataIndex: "employeeName",
            },
            {
                key: "depositDate",
                title: "Tanggal Setoran",
                dataIndex: "depositDate",
            },
            {
                key: "totalDeposit",
                title: "Total Setoran",
                dataIndex: "totalDeposit",
                render: (text) => parseInt(text).toLocaleString('id-ID', {
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
                        text: "Disetujui",
                        value: "Disetujui",
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
                                    <Col md="4" xs="4" sm="12" >
                                        <h2 className="mb-0">Daftar Setoran</h2>
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
                                    columns={columns}
                                    data={deposits}
                                    loading={isLoading}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default withFadeIn(DepositIndex);
