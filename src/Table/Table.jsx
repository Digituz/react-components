import React, {Component} from 'react';
import PropTypes from 'prop-types';
import If from '../If/If';
import './Table.scss';

class Table extends Component {
  render() {
    return (
      <table className="digituz-react-table">
        <thead>
        <tr>
        {
          this.props.columns.map((column, idx) => (
            <th key={idx}>{column.title}</th>
          ))
        }
        </tr>
        </thead>
        <tbody>
        { this.props.data.map((record, idx) => (
          <tr key={idx}>
            { this.props.columns.map((column, idx) => (
                <td className={column.columnClass} key={idx}>
                  <If condition={column.render === undefined}>
                    {record[column.property]}
                  </If>
                  <If condition={column.render !== undefined}>
                    {column.render && column.render(record)}
                  </If>
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
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    property: PropTypes.string,
    columnClass: PropTypes.string,
    render: PropTypes.func,
  })).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.objectOf({
      then: PropTypes.func.isRequired,
      catch: PropTypes.func.isRequired,
    }),
    PropTypes.array.isRequired,
  ]).isRequired,
};

export default Table;
