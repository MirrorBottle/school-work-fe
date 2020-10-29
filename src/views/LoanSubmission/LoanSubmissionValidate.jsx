import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Input,
    Label,
    FormGroup,
    FormFeedback,
} from "reactstrap";
import { LoadingButton, Confirm, Alert } from "components/Shared/Shared"
import API from "api";
import { withRouter } from "react-router-dom"
class LoanSubmissionValidate extends Component {
    state = {
        message: "",
        isApprove: true,
        isLoading: false
    }
    handleSubmit = () => {
        Confirm("Status pengajuan tidak akan bisa diubah kembali!").then(() => this.setState({ isLoading: true }, () => {
            const { message, isApprove } = this.state;
            const { toggle, afterSubmit } = this.props;
            API()
                .put(`loan-submissions/status/${this.props.submission.id}`, {
                    isApprove: isApprove ? 1 : 0,
                    message
                })
                .then((resp) => {
                    Alert("success", "Status Pengajuan", "Berhasil mengubah status pengajuan")
                    resp.data.loanSubmission.is_approve === 1 && this.props.history.push(`/admin/loans/create/${resp.data.loanSubmission.id}`)
                })
                .catch((err) => {
                    console.log(err, err.response);
                    Alert("error", "Oops..!", "Gagal mengubah status pengajuan")
                })
                .finally(() => {
                    this.setState({
                        isLoading: false,
                        message: ""
                    }, () => {
                        afterSubmit()
                        toggle()
                    })
                })

        })).catch(() => this.props.toggle());
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            message: this.props.submission.message
        })
    }
    render() {
        const { isOpen, toggle, submission } = this.props;
        const { message, isLoading, isApprove } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={toggle} backdrop={isLoading ? "static" : true}>
                <ModalHeader toggle={toggle}>Validasi Pengajuan</ModalHeader>
                <ModalBody>
                    <Row>
                        {submission.submissionDate !== null && (
                            <React.Fragment>
                                <Col md={{ size: 6 }}>
                                    <Button
                                        color={isApprove ? "success" : "secondary"}
                                        block
                                        disabled={isLoading}
                                        onClick={() =>
                                            this.setState({ isApprove: true })
                                        }
                                    >
                                        <i className="fas fa-check mr-2"></i>
                                        SETUJUI
                                    </Button>
                                </Col>
                                <Col md={{ size: 6 }}>
                                    <Button
                                        block
                                        color={!isApprove ? "danger" : "secondary"}
                                        disabled={isLoading}
                                        onClick={() =>
                                            this.setState({ isApprove: false })
                                        }
                                    >
                                        <i className="fas fa-times-circle mr-2"></i>
                                        TOLAK
                                    </Button>
                                </Col>
                            </React.Fragment>
                        )}
                        <Col md={{ size: 12 }} className="mt-3">
                            <FormGroup>
                                <Label>Pesan</Label>
                                <Input
                                    type="textarea"
                                    placeholder="Pesan"
                                    required={!isApprove}
                                    onChange={(e) => this.setState({ message: e.target.value })}
                                    value={message}
                                    disabled={isLoading}
                                />
                                {(message === null || message === "") && !isApprove ? (
                                    <FormFeedback className="d-block mt-1">
                                        Pesan wajib diisi!
                                    </FormFeedback>
                                ) : null}
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" disabled={isLoading} onClick={toggle}>Batal</Button>
                    <LoadingButton color="primary" isLoading={isLoading} isDisabled={(message === null || message === "") && !isApprove} onClick={this.handleSubmit}>Validasi</LoadingButton>
                </ModalFooter>
            </Modal>
        )
    }
}

export default withRouter(LoanSubmissionValidate)
