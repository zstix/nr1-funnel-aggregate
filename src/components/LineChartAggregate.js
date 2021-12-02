import React from 'react';
import PropTypes from 'prop-types';
import { LineChart } from 'nr1';

const COLOR = '#a35ebf';

/**
 * @todo Determine a more reliable way to find the last step in the funnel?
 * @todo Better x axis labels
 *
 * @param {Object} props
 * @param {Object<string, number>[]} props.data
 * @param {string} [props.label]
 */
const LineChartAggregate = ({ data: funnelData, label }) => {
  const chartData = funnelData.map((timeEntry, index) => ({
    y: Object.values(timeEntry).sort()[0],
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
