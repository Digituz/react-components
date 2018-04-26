import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {maskCurrency, maskDate} from 'mask-js';
import './Table.scss';
import {If} from '../';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      showLoading: false,
    }
  }

  componentDidMount() {
    // when data is a promise
    if (this.state.data.then) {
      this.state.data.then((data) => {
        this.setState({
          data,
          showLoading: false,
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      if (nextProps.data.then) {
        this.setState({
          data: nextProps.data,
          showLoading: true,
        });
        nextProps.data.then((data) => {
          this.setState({
            data,
            showLoading: false,
          });
        });
        return;
      }
      this.setState({
        data: nextProps.data,
        showLoading: false,
      });
    }
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
          { this.state.data.map && this.state.data.map((record, idx) => (
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
        <If condition={!this.state.showLoading && this.state.data.length ===0}>
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
  ]).isRequired,
};

export default Table;
