import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";

function Todo() {
  const [todo, setTodo] = useState([]);
  const [updated, setUpdated] = useState("");
  const [ide, setIde] = useState(null);

  const validationSchema = Yup.object().shape({
    todos: Yup.string().required("Todo is required"),
  });

  function removeTodo(id) {
    const data = todo.filter((_, i) => id !== i);
    setTodo([...data]);
  }

  function handleSubmit(values, { resetForm }) {
    if (ide !== null) {
      const updatedTodos = todo.map((val, i) => (i === ide ? values.todos : val));
      setTodo([...updatedTodos]);
      setIde(null);
      setUpdated("");
    } else {
      setTodo([...todo, values.todos]);
    }
    resetForm();
  }

  function updateTodo(id) {
    setUpdated(todo[id]);
    setIde(id);
  }

  return (
    <>
      <Formik
        initialValues={{
          todos: updated,
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="min-h-[30vh] w-full flex justify-center items-center">
              <div className="w-[90%] sm:w-[60%] lg:w-[40%] bg-gradient-to-r from-green-400 to-blue-500 shadow-2xl rounded-lg p-8 border border-gray-300">
                <h1 className="text-2xl text-white font-bold text-center mb-6">Todo List</h1>
                <label className="block text-lg font-semibold text-white mb-2">
                  Enter Your Todo
                </label>
                <Field
                  className="w-full p-3 border border-green-500 rounded-lg outline-none focus:border-blue-700 transition-all duration-300 ease-in-out shadow-md"
                  type="text"
                  name="todos"
                  placeholder="What do you need to do?"
                />
                <button
                  type="submit"
                  className="mt-4 w-full bg-white text-green-600 p-3 rounded-lg hover:bg-green-700 hover:text-white transition-all duration-300 ease-in-out font-semibold shadow-lg"
                >
                  {ide !== null ? "Update TODO" : "Add TODO"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <div className="w-full flex flex-col items-center mt-10 space-y-4">
        {todo.map((val, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-[90%] sm:w-[60%] lg:w-[40%] transition-transform duration-200 hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-gray-800">{val}</h2>
            <div className="space-x-2">
              <button
                onClick={() => removeTodo(i)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out shadow-lg"
              >
                Delete
              </button>
              <button
                onClick={() => updateTodo(i)}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
