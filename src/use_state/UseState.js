import TodoList from "../components/TodoList";
import "../index.css"
import Textfield from '@atlaskit/textfield';
import Button from "@atlaskit/button";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

const TODO_LIST = "TODO_LIST"

function App() {
  // state, props
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  const onTextInputChange = useCallback((event) => {
    setTextInput(event.target.value)
  }, []);

  useEffect(() => {
    const storaged = localStorage.getItem(TODO_LIST)
    if (storaged) {
      setTodoList(JSON.parse(storaged));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_LIST, JSON.stringify(todoList))
  }, [todoList])

  const onAddBtnClick = useCallback((event) => {
    setTodoList([
      { id: v4(), name: textInput, isCompleted: false },
      ...todoList
    ]);

    setTextInput("")

  }, [todoList, textInput]);

  const onCheckBtnClick = useCallback((id, status) => {
    setTodoList((prevState) => prevState.map((todo) =>
      todo.id == id ? { ...todo, isCompleted: status } : todo
    ));
  }, []);

  return (
    <>
      <h2>Todo list</h2>
      <Textfield
        name="add-todo"
        placeholder="Input todo list"
        elemAfterInput={
          <Button
            appearance="primary"
            isDisabled={!textInput}
            onClick={onAddBtnClick}
            css={{ padding: "2px 4px 2px" }}>
            Add
          </Button>
        }
        value={textInput}
        onChange={onTextInputChange}
      />

      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
