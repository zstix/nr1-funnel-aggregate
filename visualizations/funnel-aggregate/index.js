import React from 'react';
import PropTypes from 'prop-types';
import { NrqlQuery, Spinner } from 'nr1';

import EmptyState from '../../src/components/EmptyState';
import ErrorState from '../../src/components/ErrorState';
import BillboardAggregate from '../../src/components/BillboardAggregate';

/**
 * Given a response, return the correct chart type. For simple funnel queries
 * this is a billboard chart. For TIMESERIES funnel queries, this is a line
 * chart.
 *
 * @param {{ data: Object[] }} data NRQL response data.
 * @param {string} label the label to display in the chart (if applicable).
 */
const getChartForData = ({ data }, label) => {
  switch (true) {
    case data.length === 1:
      return <BillboardAggregate data={data[0]} label={label} />

    case data.length > 1:
      console.log('line chart with', data);
      return <div>Line</div>;

    default:
      console.error(e);
      return <ErrorState message="Invalid query response." />;
  };
};

/**
 * @param {Object} props
 * @param {number} props.accountId
 * @param {string} props.query
 * @param {string} props.label
 */
const FunnelAggregateVisualization = ({ accountId, query, label }) => {
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

        return getChartForData(data[0], label);
      }}
    </NrqlQuery>
  )
};

FunnelAggregateVisualization.propTypes = {
  accountId: PropTypes.number,
  query: PropTypes.string,
  label: PropTypes.string,
};

export default FunnelAggregateVisualization;
