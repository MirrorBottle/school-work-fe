import React from "react";
import { Container } from "reactstrap";

class Header extends React.PureComponent {
  render() {
    return (
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">{this.props.children}</div>
        </Container>
      </div>
    );
  }
}

export default Header;