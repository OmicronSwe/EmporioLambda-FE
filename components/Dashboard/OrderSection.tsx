import React from "react";
import { Button, Table } from "react-bootstrap";

class OrderSection extends React.Component<{}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h1>Orders Section</h1>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Date</th>
              <th>Total cost</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Matthew</td>
              <td>2021-01-01</td>
              <td>32.99$</td>
              <td>
                <Button>Details</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Gabriel</td>
              <td>2021-01-02</td>
              <td>23.99$</td>
              <td>
                <Button>Details</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

export default OrderSection;
