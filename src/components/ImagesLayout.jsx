/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';

const ImagesLayout = ({ images }) => {
  const IMAGE_WIDTH = 300;
  const IMAGE_HEIGHT = 300;
  return (
    images.length > 0
      ? (
        <>
          {
            images.map(image => (
              <Col
                xs={12}
                md={4}
                key={image._id}
              >
                <figure>
                  <img src={image.picUrl} alt={image.picUrl} width={`${IMAGE_WIDTH}px`} height={`${IMAGE_HEIGHT}px`} />
                  <figcaption>{image.note}</figcaption>
                </figure>
              </Col>
            ))}
        </>
      )
      : null
  );
};

ImagesLayout.defaultProps = {
  images: [],
};

ImagesLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  images: PropTypes.array,
};

export default ImagesLayout;
