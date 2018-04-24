import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {maskCurrency, maskDate} from 'mask-js';
import './Table.scss';
import Entity from "../RestFlex/Entity";

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    }
  }

  componentDidMount() {
    // when data is a promise
    if (this.state.data.then) {
      this.state.data.then((data) => {
        this.setState({
          data,
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      if (nextProps.data.then) {
        nextProps.data.then((data) => {
          this.setState({
            data,
          });
        });
        return;
      }
      this.setState({
        data: nextProps.data,
      });
    }
  }

  renderProperty(property, record) {
    const propertyValue = record[property];
    if (!propertyValue) return '';
    if (typeof propertyValue === 'string') return propertyValue;
    if (typeof propertyValue.getMonth === 'function') return maskDate(propertyValue, 'pt-BR');
    throw new Error(`Unexpected state on '${property}' on this record: ${JSON.stringify(record)}`);
  }

  render() {
    return (
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
                {this.renderProperty(column.property, record)}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.arrayOf(Entity.properties).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.shape({
      then: PropTypes.func.isRequired,
      catch: PropTypes.func.isRequired,
    }),
    PropTypes.array,
  ]).isRequired,
};

export default Table;
