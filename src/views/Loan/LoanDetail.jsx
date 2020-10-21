import React, { Component } from 'react'
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    Button,
    CardBody,
    Badge,
    UncontrolledButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import withFadeIn from "components/HOC/withFadeIn"
import { withRouter, Link } from "react-router-dom"
import PaymentPaidModal from "views/Payment/PaymentPaidModal"
import API from "api";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { Table, OptionalBadge, CurrencyLabel } from "components/Shared/Shared";
class LoanDetail extends Component {
    state = {
        isLoading: true,
        loan: {},
        isPaymentPaidModalOpen: false,
        selectedPayment: {},
    }
    getLoanDetailData = () => API()
        .get(`loan/${this.props.match.params.id}`)
        .then((resp) => this.setState({
            isLoading: false,
            loan: resp.data.loans
        }, () => console.log(resp)))
        .catch((err) => console.log(err, err.response))
    componentDidMount() {
        this.getLoanDetailData();
    }

    handlePaymentPaidModalToggle = () => this.setState({ isPaymentPaidModalOpen: !this.state.isPaymentPaidModalOpen })

    afterStatusChange = () => this.setState({
        isLoading: true
    }, () => this.getLoanDetailData())

    render() {
        const { isLoading, loan, selectedPayment, isPaymentPaidModalOpen } = this.state
        const PaymentsColumns = [
            {
                key: "dueDate",
                title: "Tanggal Jatuh Tempo",
                dataIndex: "dueDate",
                render: (text) => <span className="text-danger">{text}</span>
            },
            {
                key: "paymentDate",
                title: "Tanggal Pembayaran",
                dataIndex: "paymentDate",
                render: (text) => text === null ? "-" : text
            },
            {
                key: "status",
                title: "Status",
                dataIndex: "status",
                render: (text) => <OptionalBadge value={text} />
            },
            {
                key: "totalPayment",
                title: "Jumlah Pembayaran",
                dataIndex: "totalPayment",
                render: () => <CurrencyLabel>{loan.totalPaymentWithInterest}</CurrencyLabel>
            },
            {
                key: "action",
                title: "Aksi",
                dataIndex: "action",
                render: (text, record) => (
                    <React.Fragment>
                        {(record.status === "Belum Lunas" || record.status === "Belum Lunas Terlambat") && (
                            <Button color="success" className="ml-2 mt-1" size="sm" onClick={() => this.setState({
                                selectedPayment: record
                            }, () => this.handlePaymentPaidModalToggle())}>
                                <i className="fas fa-money-bill"></i>
                            </Button>
                        )}
                        {(record.status === "Lunas" || record.status === "Lunas Terlambat") && (
                            <Button color="primary" className="ml-2 mt-1" size="sm" onClick={() => this.setState({
                                selectedPayment: record
                            }, () => this.handlePaymentPaidModalToggle())}>
                                <i className="fas fa-sync"></i>
                            </Button>
                        )}
                        <Button color="warning" className="ml-2 mt-1" size="sm">
                            <i className="fas fa-edit"></i>
                        </Button>
                        <Button color="danger" className="ml-2 mt-1" size="sm">
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </React.Fragment>
                )
            },
        ]
        return (
            <Container className="mt--7" fluid>
                <PaymentPaidModal payment={selectedPayment} isOpen={isPaymentPaidModalOpen} toggle={this.handlePaymentPaidModalToggle} />
                <Card className="shadow-lg">
                    <CardHeader className="border-0">
                        <Row>
                            <Col md="7" xs="12" sm="12">
                                <h1 className="mb-0">Detail Peminjaman</h1>
                            </Col>
                            <Col md="5" xs="12" sm="12" className="d-flex justify-content-start mt-2">
                                <Button disabled={isLoading} color="warning" onClick={() => this.props.history.push('/admin/loans/create')}>
                                    <i className="fas fa-edit mr-2"></i>
                                    Edit
                                </Button>
                                <Button disabled={isLoading} color="danger" onClick={() => this.props.history.push('/admin/loans/create')}>
                                    <i className="fas fa-trash-alt mr-2"></i>
                                    Hapus
                                </Button>
                                <Button disabled={isLoading} color="primary" onClick={() => this.props.history.push('/admin/loans/create')}>
                                    <i className="fas fa-check mr-2"></i>
                                    Validasi
                                </Button>
                                <Button disabled={isLoading} color="success" onClick={() => this.props.history.push('/admin/loans/create')}>
                                    <i className="fas fa-money-bill mr-2"></i>
                                    Lunas
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">NAMA PEMINJAM</h4>
                                <h3>{isLoading ? <Skeleton /> : loan.userName}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">NO. TELPON PEMINJAM</h4>
                                <h3 className="text-success">{isLoading ? <Skeleton /> : loan.userPhoneNumber}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">PEGAWAI PENCATAT</h4>
                                <h3>{isLoading ? <Skeleton /> : loan.employeeName}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">STATUS</h4>
                                <h3>{isLoading ? <Skeleton /> : <OptionalBadge value={loan.status} />}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">TANGGAL PEMINJAMAN</h4>
                                <h3>{isLoading ? <Skeleton /> : loan.startDate}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">TANGGAL JATUH TEMPO</h4>
                                <h3 className="text-danger">{isLoading ? <Skeleton /> : loan.dueDate}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">TANGGAL PEMBAYARAN</h4>
                                <h3 className="text-success">{isLoading ? <Skeleton /> : (loan.paidDate !== null ? loan.paidDate : "-")}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">TOTAL ANGSURAN</h4>
                                <h3>{isLoading ? <Skeleton /> : `${loan.paymentCount} Kali`}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">TOTAL PEMINJAMAN</h4>
                                <h3 className="text-success font-weight-bold">{isLoading ? <Skeleton /> : <CurrencyLabel>{loan.totalLoan}</CurrencyLabel>}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">BUNGA</h4>
                                <h3>{isLoading ? <Skeleton /> : `${loan.loanInterest}%`}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">TOTAL PEMINJAMAN PLUS BUNGA</h4>
                                <h3 className="text-success font-weight-bold">{isLoading ? <Skeleton /> : <CurrencyLabel>{loan.loanWithInterest}</CurrencyLabel>}</h3>
                            </div>
                            <div className="col-md-3 col-6 mt-2">
                                <h4 className="text-muted">PEMBAYARAN PER ANGSURAN</h4>
                                <h3 className="text-success font-weight-bold">{isLoading ? <Skeleton /> : <CurrencyLabel>{loan.totalPaymentWithInterest}</CurrencyLabel>}</h3>
                            </div>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="shadow-lg mt-4">
                    <CardHeader className="border-0">
                        <h1 className="mb-0">Angsuran</h1>
                    </CardHeader>
                    <CardBody>
                        <Table
                            loading={isLoading}
                            data={loan.payments}
                            columns={PaymentsColumns}
                        />
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default withRouter(withFadeIn(LoanDetail))
