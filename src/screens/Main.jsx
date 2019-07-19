import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../utils/API';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';
import ImagesLayout from '../components/ImagesLayout';

const Main = (props) => {
  const { isLoggedIn, email } = props;
  const [description, setDescription] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [arrMediaInfo, setMediaInfo] = useState([]);
  let cloudinaryUrl = '';
  let source = {};

  // get user's stored pictures
  const getMediaInfo = useCallback(() => {
    API
      .getMediaInfo(source)
      .then(res => setMediaInfo(res.data.pics))
      .catch((err) => {
        console.log(`Something went wrong in data retrieval ${JSON.stringify(err)}`);
      });
  }, [arrMediaInfo]);

  useEffect(() => {
    source = axios.CancelToken.source();
    getMediaInfo();

    return function cleanup() { // like ComponentWillUnmount
      API.cancelRequest(source);
    };
  }, []); // like ComponentDidMount()

  const resetValues = () => {
    setIsValid(true);
    setDescription('');
    setIsSubmitted(true);
    cloudinaryUrl = '';
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setDescription(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!(cloudinaryUrl && description)) {
      setIsValid(false);
      return;
    }
    API
      .postInfo({
        picUrl: cloudinaryUrl,
        note: description,
      }, source)
      .then(() => {
        getMediaInfo();
        resetValues();
      })
      .catch(err => console.log(err));
  };

  const setCloudinaryInfo = (imgUrl) => {
    cloudinaryUrl = imgUrl;
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={8}>
          <h3 className="text-center">
            Main page
            {' '}
            {email}
          </h3>
          <Form>
            <h3>Upload Picture</h3>
            <Form.Group>
              <Form.Label htmlFor="description">
              Description
                <Form.Control
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleOnChange}
                  placeholder="Enter description"
                />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <CloudinaryUploadWidget
                cloudinaryInfo={setCloudinaryInfo}
                isSubmitted={isSubmitted}
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Add to Album
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {
          !isValid
            ? (
              <p className="bg-danger text-white font-weight-bold">
            Both description and url must be entered to complete submission.
              </p>
            )
            : null
        }
      </Row>
      <Row className="justify-content-center">
        <ImagesLayout images={arrMediaInfo} />
      </Row>
    </Container>
  );
};

Main.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

export default Main;
