import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, HeadingText, NrqlQuery, Spinner } from 'nr1';

export default class FunnelAggregateVisualization extends React.Component {
  static propTypes = {
    accountId: PropTypes.number,
    query: PropTypes.string,
  };

  render() {
    const { accountId, query } = this.props;

    if (!accountId || !query) {
      return <EmptyState />;
    }

    return (
      <NrqlQuery
        query={query}
        accountId={accountId}
        pollInterval={NrqlQuery.AUTO_POLL_INTERVAL}
      >
        {({data, loading, error}) => {
          if (loading) {
            return <Spinner />;
          }

          if (error) {
            return <ErrorState />;
          }

          console.log('NRQL results', data);

          return <div>done!</div>;
        }}
      </NrqlQuery>
    )
  }
}

const EmptyState = () => (
  <Card className="EmptyState">
    <CardBody className="EmptyState-cardBody">
      <HeadingText
        spacingType={[HeadingText.SPACING_TYPE.LARGE]}
        type={HeadingText.TYPE.HEADING_3}
      >
        Please provide at least one NRQL query & account ID pair
      </HeadingText>
      <HeadingText
        spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
        type={HeadingText.TYPE.HEADING_4}
      >
        An example NRQL query you can try is:
      </HeadingText>
      <code>
        FROM NrUsage SELECT sum(usage) FACET metric SINCE 1 week ago
      </code>
    </CardBody>
  </Card>
);

const ErrorState = () => (
  <Card className="ErrorState">
    <CardBody className="ErrorState-cardBody">
      <HeadingText
        className="ErrorState-headingText"
        spacingType={[HeadingText.SPACING_TYPE.LARGE]}
        type={HeadingText.TYPE.HEADING_3}
      >
        Oops! Something went wrong.
      </HeadingText>
    </CardBody>
  </Card>
);
