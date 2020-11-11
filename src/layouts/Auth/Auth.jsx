import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Container,
  Row, Col, Card, CardBody,
} from 'reactstrap';
import Logo from '../../components/NicaLogo';
import Login from './views/Login';
import SignUp from './views/SignUp';
import PitZone from '../../components/PitZone/PitZone';

const Auth = () => (
  <Container className="mt-5">
    <Row className="justify-content-center">
      <Col lg="6" md="8" sm="10" xs="11">
        <div className="mb-4">
          <Logo />
        </div>
        <Card className="w-100">
          <CardBody>
            <div className="mb-3">
              <PitZone />
            </div>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
            </Switch>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Auth;
