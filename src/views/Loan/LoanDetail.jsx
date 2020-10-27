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
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import withFadeIn from "components/HOC/withFadeIn"
import { withRouter, Link } from "react-router-dom"
import PaymentPaidModal from "views/Payment/PaymentPaidModal"
import API from "api";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { Table, OptionalBadge, CurrencyLabel, Confirm, Alert } from "components/Shared/Shared";
import Swal from "sweetalert2";
class LoanDetail extends Component {
    state = {
        isLoading: true,
        loan: {},
        isPaymentPaidModalOpen: false,
        selectedPayment: {},
    }
    getLoanDetailData = () => API()
        .get(`loans/${this.props.match.params.id}`)
        .then((resp) => this.setState({
            isLoading: false,
            loan: resp.data.loan
        }, () => console.log(resp)))
        .catch((err) => console.log(err, err.response))

    handlePaymentPaidModalToggle = () => this.setState({ isPaymentPaidModalOpen: !this.state.isPaymentPaidModalOpen })

    afterStatusChange = () => this.setState({
        isLoading: true
    }, () => this.getLoanDetailData())

    handleStatusChange = (status) => {
        this.setState({ isLoading: true }, () => {
            API()
                .put(`loans/status/${this.props.match.params.id}`, { status })
                .then((resp) => {
                    Alert("success", "Status Peminjaman", "Berhasil mengubah status peminjaman")
                    this.getLoanDetailData();
                })
                .catch((err) => console.log(err, err.response))
        })
    }
    handlePrint = () => {
        window.open(`${process.env.REACT_APP_BASE_URL}/loan/print/${this.state.loan.id}`, "_blank")
    }
    handleValidation = () => Swal.fire({
        title: "Validasi Peminjaman",
        text: "Untuk pertama kali, apabila disetujui maka saldo akan dikurang sesuai dengan total Peminjaman.",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Batal",
        confirmButtonColor: "#2DCE89",
        denyButtonColor: "#F5365C",
        confirmButtonText: "Setujui!",
        showDenyButton: true,
        denyButtonText: "Tolak!",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            this.handleStatusChange(1)
        } else if (result.isDenied) {
            this.handleStatusChange(2)
        }
    });
    handlePaidClick = () => {
        Confirm("Peminjaman akan diubah menjadi LUNAS dan tidak bisa diubah kembali!")
            .then(() => this.handleStatusChange(3))
    }
    handlePaymentDelete = (id) => {
        Confirm("Angsuran LUNAS yang dihapus tidak akan bisa dikembalikan dan tidak akan mengubah saldo dan peminjaman yang bersangkutan!")
            .then(() => this.setState({ isLoading: true }, () => API().delete(`payments/${id}`)
                .then(resp => Alert("success", "Hapus Angsuran", "Berhasil menghapus angsuran!"))
                .catch(err => Alert("error", "Hapus Angsuran", err.response.data.message))
                .finally(() => this.getLoanDetailData())
            ))
    }
    handleLoanDelete = () => {
        Confirm("Peminjaman LUNAS yang dihapus tidak akan bisa dikembalikan dan tidak akan mengubah saldo!")
            .then(() => this.setState({ isLoading: true }, () => API().delete(`loans/${this.state.loan.id}`)
                .then(resp => Alert("success", "Hapus Peminjaman", "Berhasil menghapus peminjaman!"))
                .catch(err => Alert("error", "Hapus Peminjaman", err.response.data.message))
                .finally(() => this.props.history.push('/admin/loans'))
            ))
    }
    componentDidMount() {
        this.getLoanDetailData();
    }

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
                key: "description",
                title: "Keterangan",
                dataIndex: "description",
                render: (text) => text === null ? "-" : text
            },
            {
                key: "action",
                title: "Aksi",
                dataIndex: "action",
                render: (text, record) => (
                    <React.Fragment>
                        {((record.status === "Belum Lunas" || record.status === "Belum Lunas Terlambat") && record.paymentDate === null) && (
                            <Button color="success" className="ml-2 mt-1" size="sm" onClick={() => this.setState({
                                selectedPayment: record
                            }, () => this.handlePaymentPaidModalToggle())} disabled={this.state.loan.status === "Ditolak" || this.state.loan.status === "Belum Divalidasi"}>
                                <i className="fas fa-money-bill"></i>
                            </Button>
                        )}
                        {(record.status === "Lunas" || record.status === "Lunas Terlambat" || record.paymentDate !== null) && (
                            <Button color="primary" className="ml-2 mt-1" size="sm" disabled={this.state.loan.status === "Ditolak" || this.state.loan.status === "Belum Divalidasi"} onClick={() => this.setState({
                                selectedPayment: record
                            }, () => this.handlePaymentPaidModalToggle())}>
                                <i className="fas fa-sync"></i>
                            </Button>
                        )}
                        <Button color="warning" className="ml-2 mt-1" size="sm" disabled={this.state.loan.status === "Ditolak" || this.state.loan.status === "Belum Divalidasi"}>
                            <i className="fas fa-edit"></i>
                        </Button>
                        <Button color="danger" className="ml-2 mt-1" disabled={this.state.loan.status === "Ditolak" || this.state.loan.status === "Belum Divalidasi"} onClick={() => this.handlePaymentDelete(record.id)} size="sm">
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </React.Fragment>
                )
            },
        ]
        return (
            <Container className="mt--7" fluid>
                <PaymentPaidModal payment={selectedPayment} isOpen={isPaymentPaidModalOpen} toggle={this.handlePaymentPaidModalToggle} afterSubmit={this.afterStatusChange} />
                <Card className="shadow-lg">
                    <CardHeader className="border-0">
                        <Row>
                            <Col md="7" xs="12" sm="12">
                                <h1 className="mb-0">Detail Peminjaman</h1>
                            </Col>
                            <Col md="5" xs="12" sm="12" className="d-flex justify-content-end mt-2">
                                <UncontrolledButtonDropdown className="mr-2">
                                    <DropdownToggle caret color="info">
                                        Pilihan
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem disabled={isLoading} onClick={() => this.props.history.push('/admin/loans/create')} style={{ cursor: "pointer" }}>
                                            <i className="fas fa-edit mr-2 text-warning"></i>
                                            Edit
                                        </DropdownItem>
                                        <DropdownItem disabled={isLoading || loan.status === "Lunas" || loan.status === "Belum Lunas"} onClick={this.handleValidation} style={{ cursor: "pointer" }}>
                                            <i className="fas fa-check mr-2 text-primary"></i>
                                            Validasi
                                        </DropdownItem>
                                        <DropdownItem disabled={isLoading} onClick={this.handlePrint} style={{ cursor: "pointer" }}>
                                            <i className="fas fa-print mr-2 text-info"></i>
                                            Print
                                        </DropdownItem>
                                        <DropdownItem disabled={isLoading} onClick={this.handleLoanDelete} style={{ cursor: "pointer" }}>
                                            <i className="fas fa-trash-alt text-danger mr-2"></i>
                                            Hapus
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                                <Button disabled={isLoading || loan.status === "Ditolak" || loan.status === "Lunas" || loan.payments.filter((payment) => payment.status === "Belum Lunas" || payment.status === "Belum Lunas Terlambat").length > 0} color="success" onClick={this.handlePaidClick}>
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
                                {isLoading ? <Skeleton /> : <OptionalBadge value={loan.status} />}
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
                                <h4 className="text-muted">TANGGAL PEMBAYARAN/LUNAS</h4>
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
