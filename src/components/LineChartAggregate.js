import React from 'react';
import PropTypes from 'prop-types';
import { LineChart } from 'nr1';

import { getLastFunnelValue } from '../utils';

const COLOR = '#a35ebf';

/**
 * @todo Better x axis labels
 *
 * @param {Object} props
 * @param {Object<string, number>[]} props.data
 * @param {string} [props.label]
 */
const LineChartAggregate = ({ data: funnelData, label }) => {
  const chartData = funnelData.map((timeEntry, index) => ({
    y: getLastFunnelValue(timeEntry),
    x: index + 1,
  }));

  const data = [
    {
      metadata: { id: label, name: label, viz: 'main', color: COLOR },
      data: chartData,
    },
  ];

  return (
    <LineChart data={data} fullWidth fullHeight />
  );
};

LineChartAggregate.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.number)
  ).isRequired,
  label: PropTypes.string,
};

LineChartAggregate.defaultProps = {
  label: 'Aggregate',
};

export default LineChartAggregate;
