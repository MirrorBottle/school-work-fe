import React, { Component } from 'react'
import withFadeIn from "components/HOC/withFadeIn"
import {
    Card,
    CardHeader,
    Container,
    Row,
    Form,
    FormGroup,
    CardBody,
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
import { Link, withRouter } from "react-router-dom"
import { Spin } from "antd";
import API from "api";
import user from "user";

export let DepositFormSchemaShape = {
    totalDeposit: Yup.number("Jumlah setoran tidak boleh kosong").min(1, "Masukkan jumlah setoran"),
    depositDate: Yup.string().required("Pilih tanggal penyetoran"),
}
export const DepositTypeSelects = [
    {
        value: 0,
        label: "Setoran Wajib"
    },
    {
        value: 1,
        label: "Setoran Pokok"
    }
]
class DepositCreate extends Component {
    state = {
        isLoading: true,
        users: []
    }
    handleSubmit = (values) => {
        API()
            .post("deposits", {
                ...values,
                userId: user("role") === "Admin" ? values.userId : user("id")
            })
            .then((resp) => {
                Alert("success", "Tambah Setoran", "Tambah setoran berhasil!")
            })
            .catch((err) => {
                Alert("error", "Oops!", "Tambah setoran gagal!")
                console.log(err, err.response)
            })
            .finally(() => this.props.history.push(`/admin/${user("role") === "Admin" ? 'deposits' : 'profile'}`))
    }
    componentDidMount() {
        user("role") === "Admin" ? API().get("employees")
            .then((resp) => this.setState({
                users: resp.data.users.map((user) => ({
                    value: user.id,
                    label: user.name
                })),
                isLoading: false
            }))
            .catch((err) => console.log(err, err.response)) : this.setState({
                isLoading: false
            })
        if (user("role") === "Admin") {
            DepositFormSchemaShape.userId = Yup.string().required("Wajib memilih peminjam!");
        }
    }

    render() {
        const { users, isLoading } = this.state;
        const DepositFormSchema = Yup.object().shape(DepositFormSchemaShape)
        return (
            <Container className="mt--7" fluid>
                <Formik
                    initialValues={{
                        userId: "",
                        depositDate: "",
                        totalDeposit: "",
                        depositType: 0,
                    }}
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
                                    <h1 className="mb-0">Tambah Setoran</h1>
                                </CardHeader>
                                <Spin spinning={isLoading}>
                                    <CardBody>
                                        {user("role") === "Admin" && (
                                            <FormGroup>
                                                <Label>Anggota Penyetor</Label>
                                                <Select
                                                    placeholder="Pilih Anggota"
                                                    options={users}
                                                    isDisabled={isSubmitting}
                                                    onChange={(value) => setFieldValue("userId", value.value)}
                                                />
                                                {errors.userId && touched.userId ? (
                                                    <FormFeedback className="d-block mt-1">
                                                        {errors.userId}
                                                    </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        )}
                                        <FormGroup>
                                            <Label htmlFor="totalDeposit">Total Setoran</Label>
                                            <CurrencyInput
                                                disabled={isSubmitting}
                                                className="form-control"
                                                prefix="Rp. "
                                                placeholder="Masukkan Total Setoran"
                                                defaultValue={values.totalDeposit}
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
                                            <Select
                                                placeholder="Pilih Jenis Setoran"
                                                options={DepositTypeSelects}
                                                defaultValue={DepositTypeSelects[0]}
                                                isDisabled={isSubmitting}
                                                onChange={(value) => setFieldValue("depositType", value.value)}
                                            />
                                        </FormGroup>
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
            </Container>
        )
    }
}

export default withRouter(withFadeIn(DepositCreate))
