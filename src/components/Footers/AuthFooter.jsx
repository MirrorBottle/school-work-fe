
import React from "react";

import { Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2020{" "}
                  <span
                    className="font-weight-bold ml-1"
                  >
                    Koperasi Simpan Pinjam
                  </span>
                </div>
              </Col>

            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
