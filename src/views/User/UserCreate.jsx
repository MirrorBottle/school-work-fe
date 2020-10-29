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
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import { Formik } from "formik";
import { DatePicker } from "antd";
import * as Yup from "yup";
import moment from "moment";
import { LoadingButton, Alert } from "components/Shared/Shared"
import { Link, withRouter } from "react-router-dom"
import { Input as AntdInput } from "antd";
import API from "api";

export const UserFormSchema = Yup.object().shape({
    name: Yup.string().required("Nama wajib diisi!"),
    gender: Yup.string().required("Kelamin wajib dipilih!"),
    email: Yup.string().email("Email harus valid!").required("Email wajib diisi!"),
    phoneNumber: Yup.string().required("Nomor telpon wajib diisi!"),
    password: Yup.string().required("Password wajib diisi!"),
    joinDate: Yup.string().required("Tanggal bergabung wajib dipilih!"),
    dateOfBirth: Yup.string().required("Tanggal lahir wajib dipilih!"),
    address: Yup.string().required("Alamat wajib diisi!"),
    job: Yup.string().required("Pekerjaan wajib diisi!")
})

class UserCreate extends Component {
    handleSubmit = (values) => {
        API()
            .post(`${this.props.match.params.type}s`, {
                ...values,
                role: parseInt(values.role)
            })
            .then((resp) => {
                Alert("success", `Tambah ${this.props.match.params.type === "employee" ? "Pegawai" : "Pengguna"}`, `Tambah ${this.props.match.params.type === "employee" ? "pegawai" : "pengguna"} berhasil!`)
            })
            .catch((err) => {
                Alert("error", "Oops!", `Tambah ${this.props.match.params.type === "employee" ? "pegawai" : "pengguna"} gagal!`)
                console.log(err, err.response)
            })
            .finally(() => this.props.history.push(`/admin/${this.props.match.params.type}s`))
    }
    render() {
        const isEmployee = this.props.match.params.type === "employee";
        return (
            <Container className="mt--7" fluid>
                <Formik
                    initialValues={{
                        name: "",
                        gender: "",
                        email: "",
                        phoneNumber: "",
                        joinDate: moment().format("YYYY-MM-DD"),
                        dateOfBirth: "",
                        address: "",
                        job: "",
                        password: "",
                        role: 2,
                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={UserFormSchema}
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
                                    <h1 className="mb-0">Tambah {isEmployee ? "Pegawai" : "Pengguna"}</h1>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup>
                                        <Label htmlFor="name">Nama Lengkap</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="off"
                                            placeholder="masukkan nama lengkap"
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && touched.name ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.name}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="password">
                                            <h3>Password</h3>
                                        </Label>
                                        <AntdInput.Password
                                            name="password"
                                            id="password"
                                            placeholder="Masukkan Password Default"
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        />
                                        {errors.password && touched.password ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.password}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="d-block">
                                            Jenis Kelamin
                                        </Label>
                                        <FormGroup check inline>
                                            <CustomInput
                                                key={1}
                                                type="checkbox"
                                                id="gender1"
                                                className="mr-4"
                                                label="Perempuan"
                                                value={0}
                                                checked={values.gender === 0
                                                }
                                                onChange={() =>
                                                    setFieldValue("gender", 0)}
                                                disabled={isSubmitting}
                                            />
                                            <CustomInput
                                                key={2}
                                                type="checkbox"
                                                id="gender2"
                                                className="mr-4"
                                                label="Laki-laki"
                                                value={1}
                                                checked={values.gender === 1
                                                }
                                                onChange={() =>
                                                    setFieldValue("gender", 1)}
                                                disabled={isSubmitting}
                                            />
                                        </FormGroup>
                                        {errors.gender && touched.gender ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.gender}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type="text"
                                            name="email"
                                            id="email"
                                            autoComplete="off"
                                            placeholder="masukkan email"
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && touched.email ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.email}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="phoneNumber">No. Telpon</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>+62</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                autoComplete="off"
                                                placeholder="82934039293"
                                                onChange={(e) => setFieldValue("phoneNumber", `+62${e.target.value}`)}
                                                disabled={isSubmitting}
                                            />
                                        </InputGroup>
                                        {errors.phoneNumber && touched.phoneNumber ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.phoneNumber}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="d-block">Tanggal Lahir</Label>
                                        <DatePicker
                                            disabled={isSubmitting}
                                            placeholder="Pilih tanggal lahir"
                                            format="DD-MM-YYYY"
                                            onChange={(date, dateString) => setFieldValue("dateOfBirth", moment(date).format("YYYY-MM-DD"))}
                                        />
                                        {errors.dateOfBirth && touched.dateOfBirth ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.dateOfBirth}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="d-block">Tanggal Bergabung</Label>
                                        <DatePicker
                                            disabled={isSubmitting}
                                            placeholder="Pilih tanggal bergabung"
                                            format="DD-MM-YYYY"
                                            value={moment()}
                                            onChange={(date, dateString) => setFieldValue("joinDate", moment(date).format("YYYY-MM-DD"))}
                                        />
                                        {errors.joinDate && touched.joinDate ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.joinDate}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="address">Alamat</Label>
                                        <Input
                                            type="textarea"
                                            name="address"
                                            id="address"
                                            autoComplete="off"
                                            placeholder="masukkan alamat"
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        />
                                        {errors.address && touched.address ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.address}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="job">Pekerjaan</Label>
                                        <Input
                                            type="text"
                                            name="job"
                                            id="job"
                                            autoComplete="off"
                                            placeholder="masukkan pekerjaan"
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        />
                                        {errors.job && touched.job ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.job}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    {isEmployee && (
                                        <FormGroup>
                                            <Label for="role">Hak Akses</Label>
                                            <CustomInput disabled={isSubmitting} value={values.role} type="select" id="role" name="role" onChange={handleChange}>
                                                <option value={2}>Pegawai</option>
                                                <option value={1}>Admin</option>
                                            </CustomInput>
                                        </FormGroup>
                                    )}
                                </CardBody>
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

export default withRouter(withFadeIn(UserCreate))
