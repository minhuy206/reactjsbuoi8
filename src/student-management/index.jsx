import React, { Component } from "react";
import Search from "./Search";
import Users from "./Users";
import Modal from "./Modal";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { markAdd } = this.props;
    return (
      <div className="container">
        <h1 className="display-4 text-center my-3">Quản lí sinh viên</h1>
        <div className="d-flex justify-content-between align-items-center">
          <Search />
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#modelIdUser"
            onClick={markAdd}
          >
            Thêm sinh viên
          </button>
        </div>
        <Users />
        <Modal />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markAdd: () => {
      const action = {
        type: "ISADD",
        payload: null,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(Home);
