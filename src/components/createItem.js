import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: {
        name: "",
        description: "",
        price: "",
        id: "",
      }
    }
  };

  handleChange = (propertyName, event) => {
    const { itemData } = this.state;
    itemData[propertyName] = event.target.value;
    this.setState({ itemData });
  };

  resetForm() {
    this.setState({
      itemData: { name: "", description: "", price: "", id: "" }
    });
  }

  handleSubmit = () => {
    if (this.state.itemData.name) {
      const index = this.props.index;
      this.props.addItem({ ...this.state.itemData, ...{ id: Date.now() } }, index);
      this.resetForm();
    }
  };

  render() {
    const { name, description, price } = this.state.itemData;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="english name"
            name="name"
            value={name}
            onChange={this.handleChange.bind(this, "name")}
          />
          <Form.Input
            placeholder="english description"
            name="description"
            value={description}
            onChange={this.handleChange.bind(this, "description")}
          />
          <Form.Input
            placeholder="price"
            name="price"
            value={price}
            onChange={this.handleChange.bind(this, "price")}
          />
          <Form.Button positive content="create Item" />
        </Form.Group>
      </Form>
    );
  }
}

export default CreateItem;
