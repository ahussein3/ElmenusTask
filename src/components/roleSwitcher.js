import React, { Component } from "react";
import { Form, Radio } from 'semantic-ui-react'

const options = [
  { key: 1, text: "View Mode", value: 1 },
  { key: 2, text: "Edit Mode", value: 2 }
];

export default class UserDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
    this.props.changeViewMode(value);
  };

  render() {
    return (
      <div className="category-contianer">
        <Form>
          <Form.Field>
            Enable or Disable Edit Mode
        </Form.Field>
          <Form.Field>
            <Radio toggle
              label={options[0].text}
              name='radioGroup'
              value={options[0].value}
              checked={this.state.value === options[0].value}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio toggle
              label={options[1].text}
              name='radioGroup'
              value={options[1].value}
              checked={this.state.value === options[1].value}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}
