import Axios from "./axios.service";

const postTodo = async (newTodo) => {
  console.log(newTodo);
  const response = await Axios.axiosTodos.post("/todo", {
    newTodo,
  });
  // console.log(response.data);
  return response;
};

const TodosService = {
  postTodo,
};

export default TodosService;
