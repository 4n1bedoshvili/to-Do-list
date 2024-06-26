import styled from "styled-components";
import "./App.css";
import { Button } from "@mui/material";
import { FC, useState } from "react";

interface ISingleItem {
  task: string;
  id: number;
  onDelete: (id: number) => void;
}

const SingleItem: FC<ISingleItem> = ({ task, id, onDelete }) => {
  return (
    <ListItem>
      <span>{task}</span>
      <Button
        style={{
          color: "rgb(151, 49, 49)",
          border: "1px solid rgb(151, 49, 49)",
        }}
        variant="outlined"
        onClick={() => onDelete(id)}
      >
        Delete
      </Button>
    </ListItem>
  );
};

const ListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(166, 123, 91);
  padding: 5px;
  border-radius: 10px;
`;

const H1 = styled.h1`
  color: rgb(151, 49, 49);
  font-size: 4rem;
`;

const ListContainer = styled.div`
  background-color: rgba(182, 199, 170, 0.5);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  gap: 10px;
`;

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ id: number; task: string }[]>([]);

  const handleAddTask = () => {
    if (task.trim() === "") return;

    setTasks((state) => {
      const newTask = {
        task,
        id: state.length ? state[state.length - 1].id + 1 : 1,
      };
      return [...state, newTask];
    });
    setTask("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks((state) => state.filter((task) => task.id !== id));
  };

  return (
    <ListContainer>
      <ListItem>
        <input
          style={{
            background: "none",
            padding: "10px",
            border: "none",
          }}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task for today :)"
        />
        <Button
          onClick={handleAddTask}
          style={{
            color: "rgb(151, 49, 49)",
            border: "1px solid rgb(151, 49, 49)",
          }}
          variant="outlined"
        >
          Add
        </Button>
      </ListItem>
      <H1>To Do List</H1>
      {tasks.map((task) => (
        <SingleItem key={task.id} id={task.id} task={task.task} onDelete={handleDeleteTask} />
      ))}
    </ListContainer>
  );
}

export default App;
