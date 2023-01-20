import React, { Component } from "react";
import { connect } from "react-redux";

class Modal extends Component {
  state = {
    values: { maSV: "", name: "", email: "", phone: "" },
    errors: {
      maSV: "",
      name: "",
      email: "",
      phone: "",
    },
    isMaSVValid: false,
    isNameValid: false,
    isEmailValid: false,
    isPhoneValid: false,
    isValid: false,
  };
  closeModal = React.createRef();

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addStudent(this.state.values);
    this.closeModal.current.click();
    this.setState({
      isMaSVValid: false,
      isNameValid: false,
      isEmailValid: false,
      isPhoneValid: false,
      isValid: false,
    });
  };

  handleError = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() === "" ? ` (*) Vui long nhap ${name}` : "";
    let { isMaSVValid, isNameValid, isEmailValid, isPhoneValid } = this.state;
    switch (name) {
      case "maSV":
        let isExtant = false;
        if (!this.props.isEdit) {
          isExtant = this.props.students.some(
            (student) => student.maSV === value
          );
        }
        if (isExtant) {
          mess = "(*) Ma da ton tai";
        } else if (value && !value.match("[0-9]+")) {
          mess = "(*) Vui long nhap ma la so";
        } else {
          mess = "";
        }
        isMaSVValid = mess === "" ? true : false;

        break;
      case "name":
        if (
          value &&
          !value.match(
            "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$"
          )
        ) {
          mess = `(*) Vui long nhap ten la chu`;
        } else {
          mess = "";
        }
        isNameValid = mess === "" ? true : false;

        break;
      case "email":
        if (value && !value.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")) {
          mess = `(*) Vui long nhap email dung dinh dang`;
        } else {
          mess = "";
        }
        isEmailValid = mess === "" ? true : false;

        break;
      case "phone":
        if (value && !value.match("^[0][0-9]{9}$")) {
          mess = `(*) Vui long nhap so dien thoai dung dinh dang`;
        } else {
          mess = "";
        }
        isPhoneValid = mess === "" ? true : false;

        break;
      default:
        break;
    }
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: mess,
      },
      isMaSVValid,
      isNameValid,
      isEmailValid,
      isPhoneValid,
      isValid: isMaSVValid && isNameValid && isEmailValid && isPhoneValid,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { maSV, name, email, phone } = nextProps.student;
    if (nextProps.student !== this.props.student && nextProps.isEdit) {
      console.log(nextProps.isEdit, this.props.isEdit);
      this.setState({
        values: { ...this.state.values, maSV, name, email, phone },
        isMaSVValid: true,
      });
    } else if (!nextProps.isEdit) {
      this.setState({
        values: { maSV: "", name: "", email: "", phone: "" },
        isMaSVValid: false,
      });
    }
  }

  render() {
    const { errors } = this.state;
    const { isEdit } = this.props;

    return (
      <div
        className="modal fade"
        id="modelIdUser"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Sửa sinh viên" : "Thêm sinh viên"}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={this.closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Mã sinh viên</label>
                  {isEdit ? (
                    <input
                      onChange={this.handleOnChange}
                      name="maSV"
                      type="text"
                      className="form-control"
                      value={this.state.values.maSV}
                      disabled={true}
                    />
                  ) : (
                    <input
                      onChange={this.handleOnChange}
                      name="maSV"
                      type="text"
                      className="form-control"
                      value={this.state.values.maSV}
                      onBlur={this.handleError}
                      disabled={false}
                    />
                  )}
                  <div className="text-danger">{errors.maSV}</div>
                </div>
                <div className="form-group">
                  <label>Tên</label>
                  <input
                    onChange={this.handleOnChange}
                    name="name"
                    type="text"
                    className="form-control"
                    value={this.state.values.name}
                    onBlur={this.handleError}
                  />
                  <div className="text-danger">{errors.name}</div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    onChange={this.handleOnChange}
                    name="email"
                    type="text"
                    className="form-control"
                    onBlur={this.handleError}
                    value={this.state.values.email}
                  />
                  <div className="text-danger">{errors.email}</div>
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    onChange={this.handleOnChange}
                    name="phone"
                    type="text"
                    className="form-control"
                    onBlur={this.handleError}
                    value={this.state.values.phone}
                  />
                  <div className="text-danger">{errors.phone}</div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={!this.state.isValid ? true : false}
                >
                  {isEdit ? "Cập nhật" : "Thêm sinh viên"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.studentReducer.student,
    isEdit: state.studentReducer.isEdit,
    students: state.studentReducer.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (student) => {
      const action = {
        type: "SUBMIT",
        payload: student,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
