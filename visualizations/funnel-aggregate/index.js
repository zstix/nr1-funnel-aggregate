import React from 'react';
import PropTypes from 'prop-types';
import { NrqlQuery, Spinner } from 'nr1';

import EmptyState from '../../src/components/EmptyState';
import ErrorState from '../../src/components/ErrorState';

/**
 * Given a response, return the correct chart type. For simple funnel queries
 * this is a billboard chart. For TIMESERIES funnel queries, this is a line
 * chart.
 *
 * @param {{ data: Object[] }} data NRQL response data.
 * @returns {JSX.Element} Chart component or error.
 */
const getChartForData = ({ data }) => {
  switch (true) {
    case data.length === 1:
      console.log('billboard with', data[0]);
      return <div>Billboard</div>;

    case data.length > 1:
      console.log('line chart with', data);
      return <div>Line</div>;

    default:
      console.error(e);
      return <ErrorState message="Invalid query response." />;
  };
};

const FunnelAggregateVisualization = ({ accountId, query }) => {
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
          return <ErrorState message="Error executing NRQL query." />;
        }

        // TODO: remove this
        console.log('NRQL results', data[0]);

        return getChartForData(data[0]);
      }}
    </NrqlQuery>
  )
};

FunnelAggregateVisualization.propTypes = {
  accountId: PropTypes.number,
  query: PropTypes.string,
};

export default FunnelAggregateVisualization;
