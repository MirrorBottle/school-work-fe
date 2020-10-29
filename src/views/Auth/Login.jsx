/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { withRouter } from "react-router-dom"; // reactstrap components
import {
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    FormFeedback,
    Alert,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import API from "../../api";
import { LoadingButton } from "components/Shared/Shared";

class Login extends React.Component {
    state = {
        loading: false,
    };
    handleSubmit = (values, props) => {
        this.setState(() => ({
            loading: true,
        }));
        API()
            .post("auth/login", values)
            .then((resp) => {
                const { status, message, ...data } = resp.data;
                console.log(data);
                localStorage.setItem(
                    "auth",
                    btoa(
                        JSON.stringify(data)
                    )
                );
                this.setState(
                    () => ({ loading: false }),
                    () => this.props.history.push("/admin/index")
                );
            })
            .catch((err) => {
                this.setState(
                    () => ({ loading: false }),
                    () => {
                        const { message } = err.response.data;
                        props.setValues({ ...values, isLoading: false, isError: message });
                    })
            });
    };
    render() {
        const loginSchema = Yup.object().shape({
            email: Yup.string().email("Email harus valid").required("Tolong masukan email anda"),
            password: Yup.string().required("Password harus diisi"),
        });
        const { loading } = this.state;
        return (
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <Row>
                        <div className="col-12 text-center">
                            <img
                                alt="..."
                                src={require("assets/img/brand/Koperasi-Simpan-Pinjam-Logo.svg")}
                                style={{ width: "100%", height: "150px" }}
                            />
                        </div>
                    </Row>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={loginSchema}
                        validateOnChange
                        onSubmit={this.handleSubmit}
                    >
                        {({
                            errors,
                            touched,
                            handleSubmit,
                            handleChange,
                            values,
                            setValues
                        }) => (
                                <CardBody className="px-lg-5 py-lg-5">

                                    <Alert color="danger" isOpen={!!values.isError} toggle={() => setValues({ ...values, isError: !values.isError })}>
                                        <h4 className="text-white mb-0 font-weight-normal">{values.isError}</h4>
                                    </Alert>
                                    <Form role="form" onSubmit={handleSubmit}>
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fas fa-user-circle" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="email"
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    onChange={handleChange}
                                                    disabled={loading}
                                                />
                                            </InputGroup>
                                            {errors.email && touched.email ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.email}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fas fa-lock" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Password"
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    onChange={handleChange}
                                                    disabled={loading}
                                                />
                                            </InputGroup>
                                            {errors.password && touched.password ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.password}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <div className="d-flex justify-content-center">
                                            <LoadingButton
                                                className="my-4 text-center"
                                                color="primary"
                                                type="submit"
                                                isLoading={loading}
                                            >
                                                Sign In
                                            </LoadingButton>
                                        </div>
                                    </Form>
                                </CardBody>
                            )}
                    </Formik>
                </Card>
            </Col>
        );
    }
}

export default withRouter(Login);
