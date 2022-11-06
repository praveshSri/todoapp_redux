import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";

import TaskList from "./TaskList";
import "./Todo.css";

const categories = [
  {
    name: "Work",
    color: "crimson",
  },
  {
    name: "Personal",
    color: "coral",
  },
  {
    name: "Study",
    color: "aquamarine",
  },
  {
    name: "sports",
    color: "aqua",
  },
];

function Todo() {
  const inputTextRef = useRef();

  const [getDate, setDate] = useState(null);
  const [toDoList, setToDoList] = useState([]);
  const [sortOrder, setSortOrder] = React.useState(true);
  const [category, setCategory] = React.useState("");

  function deadlineMaker(dateDifference, timeType) {
    if (dateDifference < 0) {
      return `Deadline in ${Math.abs(dateDifference)} ${timeType}`;
    } else {
      return `Deadline expired ${Math.abs(dateDifference)} ${timeType} ago`;
    }
  }

  /* function inputHandler(event) {
    if (!(event.target.value.trim() === "")) {
      setInputText(event.target.value);
    } else {
      setInputText("");
    }
  } */
  function addToHandler() {
    console.log("sggg", inputTextRef.current.value);
    // calculate deadline
    let deadline;
    if (moment(new Date()).diff(moment(new Date(getDate)), "days") !== 0) {
      deadline = deadlineMaker(
        moment(new Date()).diff(moment(new Date(getDate)), "days"),
        "days"
      );
    } else if (
      moment(new Date()).diff(moment(new Date(getDate)), "hours") !== 0
    ) {
      deadline = deadlineMaker(
        moment(new Date()).diff(moment(new Date(getDate)), "hours"),
        "hours"
      );
    } else if (
      moment(new Date()).diff(moment(new Date(getDate)), "minutes") !== 0
    ) {
      deadline = deadlineMaker(
        moment(new Date()).diff(moment(new Date(getDate)), "minutes"),
        "minutes"
      );
    } else {
      deadline = deadlineMaker(
        moment(new Date()).diff(moment(new Date(getDate)), "seconds"),
        "seconds"
      );
    }
    setToDoList([
      ...toDoList,
      {
        id: new Date().getTime(),
        task: inputTextRef.current.value,
        completed: false,
        category,
        deadline,
        createdAt: getDate,
      },
    ]);
    localStorage.setItem(
      "Tasks",
      JSON.stringify([
        ...toDoList,
        {
          id: new Date().getTime(),
          task: inputTextRef.current.value,
          completed: false,
          category,
          deadline,
          createdAt: getDate,
        },
      ])
    );
    inputTextRef.current.value = "";
    // setInputText("");
  }
  function onEnter(e) {
    if (inputTextRef.current.value && inputTextRef.current.value === "") return;
    if (e.key === "Enter") {
      e.preventDefault();
      // calculate deadline
      let deadline = null;
      if (getDate && getDate !== "") {
        if (moment(new Date()).diff(moment(new Date(getDate)), "days") !== 0) {
          deadline = deadlineMaker(
            moment(new Date()).diff(moment(new Date(getDate)), "days"),
            "days"
          );
        } else if (
          moment(new Date()).diff(moment(new Date(getDate)), "hours") !== 0
        ) {
          deadline = deadlineMaker(
            moment(new Date()).diff(moment(new Date(getDate)), "hours"),
            "hours"
          );
        } else if (
          moment(new Date()).diff(moment(new Date(getDate)), "minutes") !== 0
        ) {
          deadline = deadlineMaker(
            moment(new Date()).diff(moment(new Date(getDate)), "minutes"),
            "minutes"
          );
        } else {
          deadline = deadlineMaker(
            moment(new Date()).diff(moment(new Date(getDate)), "seconds"),
            "seconds"
          );
        }
      }
      setToDoList([
        ...toDoList,
        {
          id: new Date().getTime(),
          task: inputTextRef.current.value,
          completed: false,
          category,
          deadline,
          createdAt: getDate,
        },
      ]);
      localStorage.setItem(
        "Tasks",
        JSON.stringify([
          ...toDoList,
          {
            id: new Date().getTime(),
            task: inputTextRef.current.value,
            completed: false,
            category,
            createdAt: getDate,
          },
        ])
      );
      inputTextRef.current.value = "";
    }
  }
  function handleEdit(taskId, editData, setCurrentEditedTaskId) {
    console.log("object", editData);
    const tempList = toDoList.map((task) => {
      if (task.id === taskId) {
        task.task = editData;
      }
      return task;
    });
    setToDoList([...tempList]);
    localStorage.setItem("Tasks", JSON.stringify([...tempList]));
    setCurrentEditedTaskId(null);
  }
  function handleDelete(taskId) {
    const tempList = [...toDoList];
    setToDoList(tempList.filter((item) => item.id !== taskId));
  }

  React.useEffect(() => {
    console.log("tasks", localStorage.getItem("Tasks"));
    if (!localStorage.getItem("Tasks")) return;
    const taskList = JSON.parse(localStorage.getItem("Tasks")).map((item) => {
      if (!item.createdAt && item.created == null) return item;
      // calculate deadline again
      let deadline;
      if (
        moment(new Date()).diff(moment(new Date(item.createdAt)), "days") !== 0
      ) {
        deadline = deadlineMaker(
          moment(new Date()).diff(moment(new Date(item.createdAt)), "days"),
          "days"
        );
      } else if (
        moment(new Date()).diff(moment(new Date(item.createdAt)), "hours") !== 0
      ) {
        deadline = deadlineMaker(
          moment(new Date()).diff(moment(new Date(item.createdAt)), "hours"),
          "hours"
        );
      } else if (
        moment(new Date()).diff(moment(new Date(item.createdAt)), "minutes") !==
        0
      ) {
        deadline = deadlineMaker(
          moment(new Date()).diff(moment(new Date(item.createdAt)), "minutes"),
          "minutes"
        );
      } else {
        deadline = deadlineMaker(
          moment(new Date()).diff(moment(new Date(item.createdAt)), "seconds"),
          "seconds"
        );
      }
      item.deadline = deadline;
      return item;
    });
    setToDoList(taskList);
  }, []);

  function setTaskStatus(taskId) {
    const tempList = toDoList.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    setToDoList([...tempList]);
    localStorage.setItem("Tasks", JSON.stringify([...tempList]));
  }
  function resetTasks() {
    setToDoList([]);
    localStorage.setItem("Tasks", "");
  }

  // Bottom Actions
  function showAllTasks() {
    setToDoList(JSON.parse(localStorage.getItem("Tasks")));
  }
  function showActiveTasks() {
    const tempList = JSON.parse(localStorage.getItem("Tasks"));
    setToDoList(tempList.filter((item) => !item.completed));
  }
  function showCompletedTasks() {
    const tempList = JSON.parse(localStorage.getItem("Tasks"));
    setToDoList(tempList.filter((item) => item.completed));
  }
  function sortByLocale() {
    const tempList = [...toDoList];
    if (sortOrder) {
      setSortOrder(false);
      setToDoList(tempList.sort((a, b) => a.task.localeCompare(b.task)));
    } else {
      setSortOrder(true);
      setToDoList(tempList.sort((a, b) => b.task.localeCompare(a.task)));
    }
  }
  return (
    <div className="main">
      <div className="header">
        <h1>Todo App</h1>
      </div>
      <div className="body">
        <div className="inputBox">
          <TextField
            id="outlined-textarea"
            placeholder="Type 'Todo' and press enter"
            multiline
            // value={getInputText}
            // name
            inputRef={inputTextRef}
            // onChange={inputHandler}
            onKeyDown={(e) => onEnter(e)}
            size="small"
            fullWidth
          />

          {/* <InputLabel id="demo-simple-select-helper-label">
            Select Category
          </InputLabel> */}
          <Select
            sx={{ width: "22%", height: "72%" }}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={category}
            placeholder="Select Category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            {categories.map((category) => {
              return <MenuItem value={category}>{category.name}</MenuItem>;
            })}
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={getDate}
              onChange={(newDate) => {
                setDate(newDate);
              }}
            />
          </LocalizationProvider>
          <Button
            sx={{ width: "12%", height: "75%" }}
            variant="contained"
            size="small"
            onClick={addToHandler}
          >
            Add
          </Button>
        </div>
        <>
          <TaskList
            toDoList={toDoList}
            setTaskStatus={setTaskStatus}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            resetTasks={resetTasks}
          />
        </>
      </div>
      <div className="viewButtons">
        <Button variant="outlined" color="success" onClick={showAllTasks}>
          All Tasks
        </Button>
        <Button variant="outlined" color="success" onClick={showActiveTasks}>
          Active Tasks
        </Button>
        <Button variant="outlined" color="success" onClick={showCompletedTasks}>
          Completed Tasks
        </Button>
        <Button variant="outlined" color="success" onClick={sortByLocale}>
          Sort
        </Button>
        <Button variant="outlined" color="error" onClick={resetTasks}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Todo;
