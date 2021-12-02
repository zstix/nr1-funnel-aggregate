import React from 'react';
import PropTypes from 'prop-types';
import { BillboardChart } from 'nr1';

import { getLastFunnelValue } from '../utils';

/**
 * @param {Object} props
 * @param {Object<string, number>} props.data
 * @param {string} [props.label]
 */
const BillboardAggregate = ({ data: funnelData, label }) => {
  const data = [
    {
      metadata: { id: label, name: label, viz: 'main' },
      data: [
        { y: getLastFunnelValue(funnelData) },
      ],
    },
  ];

  return (
    <BillboardChart data={data} fullWidth fullHeight />
  );
};

BillboardAggregate.propTypes = {
  data: PropTypes.objectOf(PropTypes.number).isRequired,
  label: PropTypes.string,
};

BillboardAggregate.defaultProps = {
  label: 'Aggregate',
};

export default BillboardAggregate;
