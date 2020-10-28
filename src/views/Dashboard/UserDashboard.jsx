/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
    Col
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
        payments: []
    }
    componentDidMount() {
        API().get("dashboard/user")
            .then(({ data }) => {
                const { payments, loans } = data;
                this.setState({
                    isLoading: false, payments, loans
                })
            })
            .catch((err) => console.log(err, err.response))
    }
    render() {
        const { isLoading, loans, payments } = this.state;
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