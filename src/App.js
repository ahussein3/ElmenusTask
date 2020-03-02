import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import Accordion from "./components/accordion";
import CreateCategory from "./components/createCategory";
import RoleSwitcher from "./components/roleSwitcher";
import "semantic-ui-css/semantic.min.css";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const data = require("./assets/Butcher's burger menu-2.json");
    this.props.setIntialData(data);
    if (this.props.userRole !== "admin") {
      this.props.changeViewMode(1);
    }
    this.setState({
      isLoading: false
    });
  }


  render() {
    if (this.state.isLoading) {
      return <span>loading...</span>;
    }
    const { categories } = this.props.data;
    return (
      <div className="App" >
        <Container>
          {this.props.userRole === "admin" ? (
            <React.Fragment>
              <RoleSwitcher changeViewMode={this.props.changeViewMode} />
              {this.props.editMode ? (
                <CreateCategory addCatogery={this.props.addCategory} />
              ) : null}
            </React.Fragment>
          ) : null}
          <Accordion
            editMode={this.props.editMode}
            addItem={this.props.addItem}
            deleteItem={this.props.deleteItem}
            editItem={this.props.editItem}
            categories={categories}
          />
        </Container>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    data: state.data,
    userRole: state.userRole,
    editMode: state.editMode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setIntialData: data => {
      const action = { type: "SET_DATA", data: data };
      dispatch(action);
    },
    addCategory: catogeryData => {
      const action = { type: "ADD_CATEGORY", catogeryData: catogeryData };
      dispatch(action);
    },
    addItem: (ItemData, index) => {
      const action = {
        type: "ADD_ITEM",
        item: { ItemData, index }
      };
      dispatch(action);
    },
    deleteItem: (catId, itemId) => {
      const action = {
        type: "DELETE_ITEM",
        catId,
        itemId,
      };
      dispatch(action);
    },
    editItem: (catId, ItemData) => {
      const action = {
        type: "EDIT_ITEM",
        catId,
        ItemData
      };
      dispatch(action);
    },

    changeViewMode: viewValue => {
      const action = { type: "CHANGE_VIEW", viewValue };
      dispatch(action);
    }
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
