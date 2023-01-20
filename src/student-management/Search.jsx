import React, { Component } from "react";
import { connect } from "react-redux";

class Search extends Component {
  handleOnChange = (e) => {
    const { value } = e.target;
    console.log(value);
    this.props.search(e.target.value);
  };
  render() {
    return (
      <input
        type="text"
        className="form-control mb-3 w-50"
        onChange={this.handleOnChange}
      />
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    search: (keyword) => {
      const action = {
        type: "SEARCH",
        payload: keyword,
      };
      dispatch(action);
    },
  };
};
export default connect(null, mapDispatchToProps)(Search);
