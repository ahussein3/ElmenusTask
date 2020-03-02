import React, { Component } from "react";
import { Icon, Item, Label, Button, Modal, Form } from "semantic-ui-react";

class ItemComponent extends Component {
  state = {
    open: false,
    itemData: {
      name: "",
      description: "",
      price: "",
      id: ""
    },
    index: -1
  };
  show = size => () => this.setState({ size, open: true });
  close = () =>
    this.setState({
      itemData: { name: "", description: "", price: "" },
      open: false
    });
  showEditDialog(itemData) {
    this.setState({ itemData, open: true });
  }
  handleChange = (propertyName, event) => {
    const { itemData } = this.state;
    itemData[propertyName] = event.target.value;
    this.setState({ itemData });

  };
  handleEdit = () => {
    this.props.editItem(
      this.props.catId,
      this.state.itemData
    );
    this.setState({
      open: false
    });
  };

  render() {
    const { items } = this.props;
    const { name, description, price } = this.state.itemData;
    console.log("items", this.props);
    return (
      <Item.Group>
        {items.map((item) => (
          <Item key={item.id}>
            <Icon name="angle right" />
            <Item.Content>
              <Item.Header>{item.name}</Item.Header>
              <Item.Description>{item.description}</Item.Description>
              <Label color="blue" className="ui right floated">
                {item.price} EGP
              </Label>

              {this.props.editMode ? (
                <React.Fragment>
                  <Button
                    color="red"
                    onClick={this.props.deleteItem.bind(
                      this,
                      this.props.catId, item.id
                    )}
                    className="ui right floated"
                  >
                    Delete
                  </Button>
                  <Button
                    color="blue"
                    onClick={this.showEditDialog.bind(this, item)}
                    className="ui right floated"
                  >
                    edit
                  </Button>
                </React.Fragment>
              ) : null}
            </Item.Content>
          </Item>
        ))}

        <Modal size={"large"} open={this.state.open} onClose={this.close}>
          <Modal.Header>item edit</Modal.Header>
          <Modal.Content>
            <Form>
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
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>
              cancel
            </Button>
            <Button
              onClick={this.handleEdit}
              positive
              icon="checkmark"
              labelPosition="right"
              content="apply"
            />
          </Modal.Actions>
        </Modal>
      </Item.Group>
    );
  }
}

export default ItemComponent;
