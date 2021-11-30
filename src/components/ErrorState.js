import React from 'react';
import PropTypes from 'prop-types'

const ErrorState = ({ message }) => (
  <Card className="ErrorState">
    <CardBody className="ErrorState-cardBody">
      <HeadingText
        className="ErrorState-headingText"
        spacingType={[HeadingText.SPACING_TYPE.LARGE]}
        type={HeadingText.TYPE.HEADING_3}
      >
        Oops! Something went wrong.
        {message && <p>{message}</p>}
      </HeadingText>
    </CardBody>
  </Card>
);

ErrorState.propTypes = {
  /** Additional message to display */
  message: PropTypes.string,
};

export default ErrorState;
