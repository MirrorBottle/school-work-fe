/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class AdminNavbar extends React.Component {
  handleLogout = () => {
    localStorage.removeItem("auth");
    this.props.history.push("/auth/login");
  };
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <div className="d-block d-sm-block d-md-none d-flex justify-content-center align-items-center">
                <h2 className='font-weight-bold text-white'>Koperasi Simpan Pinjam</h2>
              </div>
            </NavbarBrand>
            <button className="navbar-toggler d-none" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <div className="d-none d-md-block">
                        <img
                          alt="..."
                          src={require("assets/img/brand/argon-react.png")}
                        />
                      </div>
                      <div className="d-block d-sm-block d-md-block">
                        <h2 className='font-weight-bold text-primary'>Koperasi Simpan Pinjam</h2>
                      </div>
                    </Link>
                  </Col>

                </Row>
              </div>
              <Nav className="ml-auto" navbar></Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
