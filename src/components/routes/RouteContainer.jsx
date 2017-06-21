import React, { Component } from 'react';
import NavBar from '../Navbar.jsx';
import RightBar from '../RightBar.jsx';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class RouteContainer extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <Container className="main-app-container" fluid={true}>
          <Row>
            <Col className="layout-column column-left" md="2"></Col>
            <Col className="layout-column column-mid" xs="18" md="7">
              <div className="inner-app-container">
                <div className="main-middle-column">                        
                  { this.props.routes }                  
                </div>
              </div>
            </Col>
            <Col className="layout-column column-right" xs="0" md="3"><RightBar /></Col>
          </Row>
        </Container>
      </div>
    );

  }

}

export default RouteContainer;
