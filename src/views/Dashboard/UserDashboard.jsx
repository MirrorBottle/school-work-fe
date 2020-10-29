
import React from "react";
// react plugin used to create charts
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
} from "reactstrap";
import withFadeIn from "components/HOC/withFadeIn"
import moment from "moment";
import { Table, OptionalBadge } from "components/Shared/Shared"
import { Link } from "react-router-dom"
// core components
import API from "api";
class Index extends React.Component {
    state = {
        isLoading: true,
        loans: [],
        payments: [],
        loanSubmissions: []
    }
    componentDidMount() {
        API().get("dashboard/user")
            .then(({ data }) => {
                const { payments, loans, loanSubmissions } = data;
                this.setState({
                    isLoading: false, payments, loans, loanSubmissions
                })
            })
            .catch((err) => console.log(err, err.response))
    }
    render() {
        const { isLoading, loans, payments, loanSubmissions } = this.state;
        const LoanColumns = [
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
        const PaymentsColumns = [
            {
                key: "nearLate",
                title: "Waktu Tersisa",
                dataIndex: "dueDate",
                render: (text) => {
                    const days = moment(text, "DD-MM-YYYY").diff(moment(), 'days');
                    return (
                        <span className={`${days > 5 ? "text-warning" : "text-danger font-weight-bold"}`}>
                            <i className="fas fa-exclamation-triangle mr-2"></i>
                            {days} Hari Lagi
                        </span>
                    )
                }
            },
            {
                key: "dueDate",
                title: "Tanggal Jatuh Tempo",
                dataIndex: "dueDate",
            },

            {
                key: "totalPayment",
                title: "Angsuran Pokok",
                dataIndex: "totalPayment",
                isCurrency: true,
            },
            {
                key: "totalPaymentInterest",
                title: "Bunga",
                dataIndex: "totalPaymentInterest",
                isCurrency: true,
            },
            {
                key: "totalPaymentWithInterest",
                title: "Total Angsuran",
                dataIndex: "totalPaymentWithInterest",
                isCurrency: true,
            },
            {
                key: "action",
                title: "Aksi",
                dataIndex: "action",
                render: (value, record) => (
                    <Link to={`/admin/loans/${record.loanId}`}>
                        <Button size="sm" color="primary">
                            <i className="fas fa-eye mr-2"></i>
                            Detail
                        </Button>
                    </Link>
                )
            }
        ]
        const LoanSubmissionColumns = [
            {
                key: "createdDate",
                title: "Tanggal Mengajukan",
                dataIndex: "createdDate",
            },
            {
                key: "startDate",
                title: "Tanggal Mulai Peminjaman",
                dataIndex: "startDate",
            },
            {
                key: "totalLoan",
                title: "Total peminjaman",
                dataIndex: "totalLoan",
                isCurrency: true,
            },
            {
                key: "status",
                title: "Status",
                dataIndex: "status",
                render: (status) => <OptionalBadge value={status} />
            },
            {
                key: "message",
                title: "Pesan",
                dataIndex: "message",
                render: (message) => message === null ? "-" : message
            },
        ]
        return (
            <React.Fragment>
                <Container className="mt--7" fluid>
                    <Card className="shadow-lg">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h2 className="mb-0">Notifikasi Angsuran</h2>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Table
                                loading={isLoading}
                                data={payments}
                                columns={PaymentsColumns}
                            />
                        </CardBody>
                    </Card>
                    <Card className="shadow-lg mt-4">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h2 className="mb-0">Riwayat Pengajuan Peminjaman</h2>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Table
                                loading={isLoading}
                                data={loanSubmissions}
                                columns={LoanSubmissionColumns}
                            />
                        </CardBody>
                    </Card>
                    <Card className="shadow-lg mt-4">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h2 className="mb-0">Riwayat Peminjaman</h2>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Table
                                loading={isLoading}
                                data={loans}
                                columns={LoanColumns}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </React.Fragment>
        );
    }
}

export default withFadeIn(Index);
