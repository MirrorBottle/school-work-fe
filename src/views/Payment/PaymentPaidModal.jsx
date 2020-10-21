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
    Form,
} from "reactstrap";
import { Formik } from "formik";
import { LoadingButton, Confirm } from "components/Shared/Shared"

export default class LoanStatusModal extends Component {
    state = {
        desc: "",
        isPaid: false,
        isLoading: false
    }
    handleSubmit = () => Confirm("Angsuran lunas akan masuk saldo dan tidak dapat diubah lagi").then(() => this.setState({ isLoading: true }, () => {

    })).catch(() => this.toggle());
    render() {
        const { isOpen, toggle, payment } = this.props;
        const { desc, isLoading, isPaid } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={toggle} backdrop={isLoading ? "static" : true}>
                <ModalHeader toggle={toggle}>Perubahan Angsuran</ModalHeader>
                <ModalBody>
                    <Row>
                        {(payment.status === "Lunas" || payment.status === "Lunas Terlambat") && (
                            <React.Fragment>
                                <Col md={{ size: 6 }}>
                                    <Button
                                        color={isPaid ? "success" : "secondary"}
                                        block
                                        disabled={isLoading}
                                        onClick={() =>
                                            this.setState({ isPaid: true })
                                        }
                                    >
                                        <i className="fas fa-money-bill mr-2"></i>
                                        LUNAS
                                    </Button>
                                </Col>
                                <Col md={{ size: 6 }}>
                                    <Button
                                        block
                                        color={!isPaid ? "danger" : "secondary"}
                                        disabled={isLoading}
                                        onClick={() =>
                                            this.setState({ isPaid: false })
                                        }
                                    >
                                        <i className="fas fa-times-circle mr-2"></i>
                                        BELUM LUNAS
                                    </Button>
                                </Col>
                            </React.Fragment>
                        )}
                        <Col md={{ size: 12 }} className="mt-3">
                            <FormGroup>
                                <Label>Deksripsi Tambahan</Label>
                                <Input
                                    type="textarea"
                                    placeholder="Deksripsi Tambahan"
                                    required={payment && payment.status === "Belum Lunas Terlambat"}
                                    onChange={(e) => this.setState({ desc: e.target.value })}
                                    value={desc}
                                    disabled={isLoading}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" disabled={isLoading} onClick={toggle}>Batal</Button>
                    <LoadingButton color="primary" isLoading={isLoading} isDisabled={desc === "" && payment && payment.status === "Belum Lunas Terlambat"} onClick={this.handleSubmit}>Simpan</LoadingButton>
                </ModalFooter>
            </Modal>
        )
    }
}
