import { Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import notFound from '../../notFound.svg';

const NotFound = (props) => {
  return (
    <Row className="align-items-center">
      <Col>
        <img src={notFound} alt="notFound" />
      </Col>

      <Col>
        <Badge pill variant="secondary">
          Page not found
        </Badge>

        <h1>Oh No! Error 404</h1>

        <p className="font-weight-bold">
          Maybe Bigfoot has broken this page. <br /> Come back to the homepage
        </p>

        <Link to="/" className="btn btn-primary">
          Back to Homepage
        </Link>
      </Col>
    </Row>
  );
};

export default NotFound;
