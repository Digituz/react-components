import PropTypes from 'prop-types';

export default {
  url: PropTypes.string.isRequired,
  audience: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  plural: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  properties: PropTypes.shape({
    columnClass: PropTypes.string,
    format: PropTypes.string,
    headerClass: PropTypes.string,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    placeholder: PropTypes.string,
    render: PropTypes.func,
  }).isRequired,
};
