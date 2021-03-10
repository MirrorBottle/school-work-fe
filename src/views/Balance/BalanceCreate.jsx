import React, { Component } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Button,
    FormGroup,
    Label,
} from "reactstrap";
import withFadeIn from "components/HOC/withFadeIn";
import moment from "moment";
import { Spin, Alert as AntdAlert } from "antd";
import CurrencyInput from "react-currency-input-field"
import { LoadingButton } from "components/Shared/Shared"
import API from "api"
class BalanceCreate extends Component {
    state = {
        balance: {},
        isLoading: true,
        isSubmitting: false,
        currentBalance: 0,
    }
    handleSubmit = (values, actions) => {
        window.open(`${process.env.REACT_APP_BASE_URL}/api/loans/export/${moment(values.startDate, "DD-MM-YYYY").format("YYYY-MM-DD")}/${moment(values.endDate, "DD-MM-YYYY").format("YYYY-MM-DD")}`, "_blank")
        actions.setSubmitting(false);
        actions.resetForm();
    }
    componentDidMount() {
        API()
            .get('balances')
            .then((resp) => this.setState({
                balance: resp.data.balances[0],
                isLoading: false
            }, () => console.log(resp)))
            .catch((err) => console.log(err, err.response))
    }
    render() {
        const { isLoading, isSubmitting, currentBalance } = this.state;
        return (
            <Container className="mt--7" fluid>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h2 className="mb-0">Buat Catatan Saldo</h2>
                    </CardHeader>
                    <CardBody>
                        <Spin spinning={isLoading}>
                            <Row className="mb-2">
                                <div className="col-md-10 col-xl-10 col-12">
                                    <FormGroup>
                                        <Label className="d-block">Saldo Perubahan</Label>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Rp</div>
                                            </div>
                                            <CurrencyInput
                                                disabled={isSubmitting}
                                                className="form-control"
                                                placeholder="Masukkan Total Pinjaman"
                                                defaultValue={currentBalance}
                                                precision="0"
                                                onChange={(value, name) => console.log(value)}
                                            />
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="col-md-1 col-xl-1 col-6 d-flex align-items-center">
                                    <Button color="danger" block>
                                        <i className="fas fa-minus"></i>
                                    </Button>
                                </div>
                                <div className="col-md-1 col-xl-1 col-6 d-flex align-items-center">
                                    <Button color="success" block>
                                        <i className="fas fa-plus"></i>
                                    </Button>
                                </div>
                            </Row>
                            <AntdAlert
                                message="Peringatan!"
                                description="Saldo akan berubah sesuai dengan selisih total deposit sebelum perubahan dan setelah perubahan. Hal ini mungkin saja mengubah data yang tidak diinginkan nantinya."
                                type="warning"
                                showIcon
                                closable
                            />
                            <Row>
                                <div className="col-12 mt-4">
                                    <LoadingButton type="submit" color="primary" className="btn-block" isLoading={isSubmitting}>
                                        <i className="fas fa-money-bill mr-2"></i>
                                        Buat Catatan Saldo
                                    </LoadingButton>
                                </div>
                            </Row>
                        </Spin>
                    </CardBody>
                </Card>
            </Container >
        )
    }
}

export default withFadeIn(BalanceCreate)
