import React, { Component } from 'react'
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    Button,
    CardBody,
} from "reactstrap";
import withFadeIn from "components/HOC/withFadeIn"
import { withRouter } from "react-router-dom"
import API from "api";
import Skeleton from "react-loading-skeleton";
import { OptionalBadge, CurrencyLabel, Confirm, Alert } from "components/Shared/Shared";
import Swal from "sweetalert2";

class DepositDetail extends Component {
    state = {
        isLoading: true,
        deposit: {},
    }
    getDepositDetailData = () => {
        API().get(`deposits/${this.props.match.params.id}`)
            .then((resp) => this.setState({
                isLoading: false,
                deposit: resp.data.deposit
            }))
            .catch((err) => console.log(err, err.response))
    }
    handleStatusChange = (status) => {
        this.setState({ isLoading: true }, () => {
            API()
                .put(`deposits/status/${this.props.match.params.id}`, { status })
                .then((resp) => this.getDepositDetailData())
                .catch((err) => console.log(err, err.response))
        })
    }
    handleValidation = () => Swal.fire({
        title: "Validasi Setoran",
        text: "Untuk pertama kali, apabila disetujui maka saldo akan ditambah total setoran. Status tidak bisa diubah lagi!",
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
    handleDelete = () => {
        Confirm("Data setoran yang dihapus tidak akan mempengaruhi saldo dan tidak bisa dikembalikan!")
            .then(() => this.setState({ isLoading: true }, () => API()
                .delete(`deposits/${this.state.deposit.id}`)
                .then((resp) => {
                    Alert("success", "Hapus Setoran", "Berhasil menghapus setoran")
                })
                .catch((err) => {
                    Alert("error", "Oops..!", "Gagal menghapus setoran")
                    console.log(err, err.response)
                })
                .finally(() => this.props.history.push(`/admin/deposits`))))
    }
    componentDidMount() {
        this.getDepositDetailData()
    }
    render() {
        const { isLoading, deposit } = this.state;
        return (
            <Container className="mt--7" fluid>
                <Card className="shadow-lg">
                    <CardHeader className="border-0">
                        <Row>
                            <Col md="8" xs="12" sm="12">
                                <h1 className="mb-0">Detail Setoran</h1>
                            </Col>
                            <Col md="4" xs="12" sm="12" className="d-flex justify-content-start mt-2">
                                <Button disabled={isLoading} color="warning" onClick={() => this.props.history.push(`/admin/deposits/edit/${deposit.id}`)}>
                                    <i className="fas fa-edit mr-2"></i>
                                    Edit
                                </Button>
                                <Button disabled={isLoading} color="danger" onClick={this.handleDelete}>
                                    <i className="fas fa-trash-alt mr-2"></i>
                                    Hapus
                                </Button>
                                <Button disabled={isLoading || deposit.status !== "Belum Divalidasi"} color="primary" onClick={this.handleValidation}>
                                    <i className="fas fa-check mr-2"></i>
                                    Validasi
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">NAMA PEGAWAI</h4>
                                <h3>{isLoading ? <Skeleton /> : deposit.userName}</h3>
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">TOTAL SETORAN</h4>
                                <h3 className="text-success">{isLoading ? <Skeleton /> : <CurrencyLabel>{deposit.totalDeposit}</CurrencyLabel>}</h3>
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">STATUS</h4>
                                {isLoading ? <Skeleton /> : <OptionalBadge value={deposit.status} />}
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">TANGGAL MENYETOR</h4>
                                <h3>{isLoading ? <Skeleton /> : deposit.depositDate}</h3>
                            </div>
                            <div className="col-md-4 col-6 mt-2">
                                <h4 className="text-muted">JENIS SETORAN</h4>
                                <h3>{isLoading ? <Skeleton /> : deposit.depositType === 0 ? "Setoran Wajib" : "Setoran Pokok"}</h3>
                            </div>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default withRouter(withFadeIn(DepositDetail))
