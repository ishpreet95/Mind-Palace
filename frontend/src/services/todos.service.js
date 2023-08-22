import Axios from "./axios.service";

const postTodo = async (newTodo) => {
  // console.log(newTodo);
  const response = await Axios.axiosTodos.post("/todo", {
    newTodo,
  });
  // console.log(response.data);
  return response;
};

const getTodos = async () => {
  const response = await Axios.axiosTodos.get("/", {});
  // console.log(response.data);
  return response;
};

const updateTodo = async (id, data) => {
  // console.log(newTodo);
  const response = await Axios.axiosTodos.put(`/todo`, {
    data,
  });
  // console.log(response.data);
  return response;
};

const TodosService = {
  postTodo,
  getTodos,
  updateTodo,
};

export default TodosService;
