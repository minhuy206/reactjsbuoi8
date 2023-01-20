import React, { Component } from "react";
import UserItem from "./UserItem";
import { connect } from "react-redux";

class Users extends Component {
  renderStudent = () => {
    let { students, keyword } = this.props;
    if (keyword) {
      students = students.filter(
        (student) =>
          student.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      );
      return students.map((student) => (
        <UserItem student={student} key={student.maSV} />
      ));
    } else {
      return students.map((student) => (
        <UserItem student={student} key={student.maSV} />
      ));
    }
  };
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Mã số sinh viên</th>
              <th>Tên sinh viên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
            </tr>
          </thead>
          <tbody>{this.renderStudent()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.studentReducer.students,
    keyword: state.studentReducer.keyword,
  };
};
export default connect(mapStateToProps, null)(Users);
