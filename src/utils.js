/**
 * Given data for a funnel, this will get the last step and return the
 * numerical value.
 *
 * @todo Determine a more reliable way to find the last step in the funnel?
 *
 * @param {Object<string, number>} data
 * @returns {number}
 */
export const getLastFunnelValue = (data) =>
  Object.values(data)
    .sort((a, b) => a - b)
    .filter(n => n !== undefined)[0];
