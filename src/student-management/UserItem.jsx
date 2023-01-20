import React, { Component } from "react";
import { connect } from "react-redux";

class UserItem extends Component {
  render() {
    const { student, deleteStudent, editStudent } = this.props;
    return (
      <tr>
        <td>{student.maSV}</td>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{student.phone}</td>
        <td>
          <button
            className="btn btn-info mr-2"
            data-toggle="modal"
            data-target="#modelIdUser"
            onClick={() => {
              editStudent(student);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteStudent(student.maSV);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (maSV) => {
      const action = {
        type: "DELETE",
        payload: maSV,
      };
      dispatch(action);
    },
    editStudent: (student) => {
      const action = {
        type: "EDIT",
        payload: student,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(UserItem);
