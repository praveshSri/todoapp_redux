import { Button, CardContent, Checkbox, Chip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import "./SingleTask.css";

function SingleTask({ task, setTaskStatus, handleEdit, handleDelete }) {
  const [currentEditedTaskId, setCurrentEditedTaskId] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState("");

  function editTask(event) {
    if (event.target.value) {
      setIsEditing(event.target.value);
    }
  }

  return (
    <>
      <CardContent sx={{ flex: "1 0 auto", justifyContent: "space-around" }}>
        <Checkbox
          checked={task.completed}
          onChange={() => setTaskStatus(task.id)}
          inputProps={{ "aria-label": "controlled" }}
        />

        {task.id === currentEditedTaskId ? (
          <input
            type="text"
            required
            placeholder={task.task}
            onChange={editTask}
          />
        ) : (
          <>
            <span className={task.completed ? "strike" : ""} key={task.id}>
              {task.task}
            </span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "100%",
                width: "30%",
                marginLeft: "30%",
              }}
              key={task.id}
            >
              {task ? task.deadline: ''}
            </span>
          </>
        )}
      </CardContent>
      <Chip
        sx={{
          alignItems: "center",
          color: "white",
          width: "10%",
          background:
            task.category && task.category.color ? task.category.color : "red",
          marginRight: "20%",
          marginTop: "2%",
          fontSize: "80%",
          // background: "linear-gradient(to right bottom, yellow,green )",
        }}
        label={
          task.category && task.category.name ? task.category.name : "Other"
        }
      ></Chip>
      <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
        {task.id === currentEditedTaskId ? (
          <Button
            label="submit"
            variant="contained"
            size="small"
            onClick={() =>
              handleEdit(task.id, isEditing, setCurrentEditedTaskId)
            }
          >
            Submit
          </Button>
        ) : (
          <IconButton
            aria-label="edit"
            onClick={() => setCurrentEditedTaskId(task.id)}
          >
            <EditIcon />
          </IconButton>
        )}

        <IconButton aria-label="delete" onClick={() => handleDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </>
  );
}

export default SingleTask;
