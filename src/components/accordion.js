import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import CreateItemComponent from "./createItem";
import ItemComponent from "./item";

export default class AccordionComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }



  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const { categories } = this.props;
    console.log("categories", categories);
    return (
      <Accordion>
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <Accordion.Title
              color="blue"
              active={activeIndex === category.id}
              index={category.id}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              {category.name}
            </Accordion.Title>
            <Accordion.Content
              className="itemContainer"
              active={activeIndex === category.id}
            >
              {this.props.editMode ? (
                <CreateItemComponent addItem={this.props.addItem} index={category.id} />
              ) : null}
              <ItemComponent
                editMode={this.props.editMode}
                deleteItem={this.props.deleteItem}
                editItem={this.props.editItem}
                catId={category.id}
                items={category.items}
              />
            </Accordion.Content>
          </React.Fragment>
        ))}
      </Accordion>
    );
  }
}
