const initialState = {
  students: [
    {
      maSV: 1,
      name: "Huyyy",
      email: "vominhhuy0911@gmail.com",
      phone: "0902437085",
    },
    {
      maSV: 2,
      name: "Huy",
      email: "vominhhuy0911@gmail.com",
      phone: "0902437085",
    },
  ],
  student: "",
  isEdit: false,
  keyword: "",
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT": {
      if (state.isEdit) {
        const students = [...state.students];
        const index = students.findIndex(
          (student) => student.maSV == action.payload.maSV
        );
        students[index] = action.payload;
        state.students = students;
        return { ...state };
      } else {
        const student = action.payload;
        const students = [...state.students];
        students.push(student);
        state.students = students;
      }
      return { ...state };
    }
    case "DELETE": {
      const students = [...state.students];
      state.students = students.filter(
        (student) => student.maSV !== action.payload
      );
      return { ...state };
    }
    case "EDIT":
      state.student = action.payload;
      state.isEdit = true;
      return { ...state };

    case "ISADD":
      state.isEdit = false;
      return { ...state };
    case "SEARCH":
      state.keyword = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default studentReducer;
