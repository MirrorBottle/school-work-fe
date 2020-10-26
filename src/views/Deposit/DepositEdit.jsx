import React, { Component } from 'react'
import withFadeIn from "components/HOC/withFadeIn"
import {
    Card,
    CardHeader,
    Container,
    Row,
    Form,
    FormGroup,
    Input,
    CardBody,
    CustomInput,
    Label,
    Button,
    Col,
    FormFeedback,
} from "reactstrap";
import { Formik } from "formik";
import { DatePicker } from "antd";
import * as Yup from "yup";
import moment from "moment";
import CurrencyInput from "react-currency-input-field"
import Select from "react-select"
import { LoadingButton, Alert } from "components/Shared/Shared"
import { Link, Redirect, withRouter } from "react-router-dom"
import { Spin, Alert as AntdAlert } from "antd";
import API from "api";
import { DepositFormSchemaShape as CreateSchemaShape, DepositTypeSelects } from "./DepositCreate";
import axios from "axios";

const DepositFormSchemaShape = {
    ...CreateSchemaShape,
    userId: Yup.string().required("Wajib memilih peminjam!")
}
class DepositEdit extends Component {
    state = {
        isLoading: true,
        users: [],
        deposit: {}
    }
    componentDidMount() {
        const usersQuery = API().get("employees");
        const depositQuery = API().get(`deposits/${this.props.match.params.id}`)
        axios.all([usersQuery, depositQuery])
            .then(axios.spread((...responses) => {
                const usersResponse = responses[0];
                const depositResponse = responses[1];
                this.setState({
                    isLoading: false,
                    users: usersResponse.data.users.map((user) => ({
                        value: user.id,
                        label: user.name
                    })),
                    deposit: depositResponse.data.deposit
                })
            }))
    }
    handleSubmit = (values) => {
        API()
            .put(`deposits/${this.props.match.params.id}`, {
                ...values,
                depositDate: moment(values.depositDate, "DD-MM-YYYY").format("YYYY-MM-DD")
            })
            .then((resp) => {
                Alert("success", "Ubah Setoran", "Ubah setoran berhasil!")
            })
            .catch((err) => {
                Alert("error", "Oops!", "Ubah setoran gagal!")
                console.log(err, err.response)
            })
            .finally(() => this.props.history.push("/admin/deposits"))
    }
    render() {
        const { users, isLoading, deposit } = this.state;
        const DepositFormSchema = Yup.object().shape(DepositFormSchemaShape)
        const { userName, status, id, ...initialValues } = deposit;
        return (
            <Container className="mt--7" fluid>
                <Formik
                    initialValues={{ ...initialValues, isChangeBalance: false }}
                    enableReinitialize
                    onSubmit={this.handleSubmit}
                    validationSchema={DepositFormSchema}
                >{({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    isSubmitting
                }) => (
                        <Form onSubmit={handleSubmit}>
                            <Card className="shadow-lg">
                                <CardHeader className="border-0">
                                    <h1 className="mb-0">Edit Setoran</h1>
                                </CardHeader>
                                <Spin spinning={isLoading}>
                                    <CardBody>
                                        <FormGroup check inline className="mb-3">
                                            <CustomInput
                                                type="checkbox"
                                                id="isChangeBalance"
                                                className="mr-4"
                                                label="Sekaligus Merubah Saldo Sesuai Selisih"
                                                value=""
                                                checked={values.isChangeBalance}
                                                onChange={() =>
                                                    setFieldValue(
                                                        "isChangeBalance", !values.isChangeBalance
                                                    )}
                                                disabled={isSubmitting}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Anggota Penyetor</Label>
                                            <Select
                                                placeholder="Pilih Anggota"
                                                options={users}
                                                isDisabled={true}
                                                value={users.filter((user) => user.value === values.userId)[0]}
                                                onChange={(value) => setFieldValue("userId", value.value)}
                                            />
                                            {errors.userId && touched.userId ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.userId}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="totalDeposit">Total Setoran</Label>
                                            <CurrencyInput
                                                disabled={isSubmitting}
                                                className="form-control"
                                                prefix="Rp. "
                                                placeholder="Masukkan Total Setoran"
                                                value={values.totalDeposit}
                                                precision="0"
                                                onChange={(value, name) => setFieldValue("totalDeposit", parseInt(value))}
                                            />
                                            {errors.totalDeposit && touched.totalDeposit ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.totalDeposit}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="d-block">Tanggal Penyetoran</Label>
                                            <DatePicker
                                                disabled={isSubmitting}
                                                format="DD-MM-YYYY"
                                                value={moment(values.depositDate, "DD-MM-YYYY")}
                                                onChange={(date, dateString) => setFieldValue("depositDate", moment(date).format("YYYY-MM-DD HH:mm:ss"))}
                                            />
                                            {errors.depositDate && touched.depositDate ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.depositDate}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Jenis Setoran</Label>
                                            {console.log(users, values, values.depositType, DepositTypeSelects.filter((type) => type.value === values.depositType)[0])}
                                            <Select
                                                placeholder="Pilih Jenis Setoran"
                                                options={DepositTypeSelects}
                                                value={DepositTypeSelects.filter((type) => type.value === values.depositType)[0]}
                                                isDisabled={isSubmitting}
                                                onChange={(value) => setFieldValue("depositType", value.value)}
                                            />
                                        </FormGroup>
                                        {values.isChangeBalance && (
                                            <AntdAlert
                                                message="Peringatan!"
                                                description="Saldo akan berubah sesuai dengan selisih total deposit sebelum perubahan dan setelah perubahan. Hal ini mungkin saja mengubah data yang tidak diinginkan nantinya."
                                                type="warning"
                                                showIcon
                                                closable
                                            />
                                        )}
                                    </CardBody>
                                </Spin>
                            </Card>
                            <Row className="mt-1">
                                <div className="text-right mt-3 offset-md-7 col-md-2" sm="12">
                                    <Link to="/admin/user">
                                        <Button color="primary" block outline>
                                            Batal
                                        </Button>
                                    </Link>
                                </div>
                                <Col md="3" sm="12" className="text-right mt-3">
                                    <LoadingButton
                                        color="primary"
                                        className="btn-block"
                                        isLoading={isSubmitting}
                                        type="submit"
                                    >
                                        Simpan
                                    </LoadingButton>
                                </Col>
                            </Row>
                        </Form>
                    )}</Formik>
            </Container >
        )
    }
}

export default withRouter(withFadeIn(DepositEdit))
