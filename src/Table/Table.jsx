import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {maskCurrency, maskDate} from 'mask-js';
import './Table.scss';
import {If} from '../';

class Table extends Component {
  constructor(props) {
    super(props);

    const showLoading = props.data === null || !!props.data.then;
    this.state = {
      data: props.data,
      showLoading,
    };
  }

  componentDidMount() {
    // when data is a promise
    if (this.state.data && this.state.data.then) {
      this.state.data.then((data) => {
        this.setState({
          data,
          showLoading: false,
        });
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data && props.data.then) return null;
    if (state.data === props.data) return null;

    const showLoading = !!props.data.then;
    return {
      data: props.data,
      showLoading,
    };
  }

  renderProperty(column, record) {
    if (column.renderer) return column.renderer(record);
    const propertyValue = record[column.property];
    if (!propertyValue) return '';
    if (column.type === 'string' && !column.format) return propertyValue;
    if (column.format === 'currency') return maskCurrency(propertyValue);
    if (column.format === 'date') return maskDate(propertyValue, 'pt-BR');
    throw new Error(`Unexpected state on '${column.property}' on this record: ${JSON.stringify(record)}`);
  }

  render() {
    return (
      <React.Fragment>
        <table className="drc-table">
          <thead>
          <tr>
            {
              this.props.columns.map((column, idx) => (
                <th className={column.headerClass} key={idx}>{column.label}</th>
              ))
            }
          </tr>
          </thead>
          <tbody>
          { this.state.data && this.state.data.map && this.state.data.map((record, idx) => (
            <tr key={idx}>
              { this.props.columns.map((column, idx) => (
                <td className={column.columnClass} key={idx}>
                  {this.renderProperty(column, record)}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
        <If condition={this.state.showLoading}>
          <div className="drc-loading-data">
            Loading Data
            <span>.</span>
          </div>
        </If>
        <If condition={!this.state.showLoading && this.state.data && this.state.data.length === 0}>
          <div className="drc-no-data">
            No Data
          </div>
        </If>
      </React.Fragment>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    property: PropTypes.string,
    renderer: PropTypes.func,
    headerClass: PropTypes.string,
    columnClass: PropTypes.string,
  })).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.shape({
      then: PropTypes.func.isRequired,
      catch: PropTypes.func.isRequired,
    }),
    PropTypes.array,
  ]),
};

export default Table;
