import React from 'react';
import PropTypes from 'prop-types';
import { NrqlQuery, Spinner } from 'nr1';

import EmptyState from '../../src/components/EmptyState';
import ErrorState from '../../src/components/ErrorState';

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
            return <ErrorState message="Error executing NRQL query" />;
          }

          console.log('NRQL results', data);

          return <div>done!</div>;
        }}
      </NrqlQuery>
    )
  }
}
