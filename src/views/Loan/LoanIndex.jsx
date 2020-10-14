import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Badge,
    Col,
    Button,
} from "reactstrap";
import { Table, OptionalBadge, ActionDropdown } from "components/Shared/Shared";
import withFadeIn from "components/HOC/withFadeIn";
class LoanIndex extends React.Component {
    state = {
        loans: [
            {
                id: 1,
                userId: 1,
                userName: "Shyna",
                dueDate: "20-12-2020",
                totalLoan: "10000000",
                status: "Belum Divalidasi",
                employeeName: "Mirana"
            },
            {
                id: 2,
                userId: 1,
                userName: "Shyna",
                dueDate: "25-12-2020",
                totalLoan: "20000000",
                status: "Belum Lunas",
                employeeName: null
            }
        ]
    }
    render() {
        const { loans } = this.state;
        const columns = [
            {
                key: "userName",
                title: "Nama Peminjam",
                dataIndex: "userName",
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
                                        <h2 className="mb-0">Daftar Peminjaman</h2>
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

export default withFadeIn(LoanIndex);
