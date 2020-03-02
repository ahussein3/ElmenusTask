import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: {
        id: "",
        name: "",
        description: "",
        items: [],
      }
    };
  }

  handleChange = (propertyName, event) => {
    const { categoryData } = this.state;
    categoryData[propertyName] = event.target.value;
    this.setState({ categoryData });
  };

  resetForm() {
    this.setState({
      categoryData: { id: "", name: "", description: "", items: [] }
    });
  }

  handleSubmit = () => {
    this.props.addCatogery({ ...this.state.categoryData, ...{ id: Date.now() } });
    this.resetForm();
  };

  render() {
    const { name, description } = this.state.categoryData;

    return (
      <div className="category-contianer">
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
            <Form.Button positive content="create category" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default CreateCategory;
