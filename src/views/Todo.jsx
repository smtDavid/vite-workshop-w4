import { useEffect, useState } from "react";
import empty from "../assets/img/empty.png";
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //引入FontAwesomeIcon 元件
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const { VITE_APP_HOST } = import.meta.env;
const Todo = () => {
  const [userName, setUserName] = useState("");
  const [toDoList, setTodoList] = useState([]);
  const [todo, setToDo] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [newTodoList, setNewToDoList] = useState([toDoList]);
  const [todoStatus, setToDoStatus] = useState("");

  const verifyToken = async () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    axios.defaults.headers.common["Authorization"] = cookieValue;
    try {
      const res = await axios.get(`${VITE_APP_HOST}/users/checkout`);
      setUserName(res.data.nickname);
    } catch (err) {
      navigate("/auth/sign_in");
      console.dir(err);
    }
  };
  const handleText = (e) => {
    setToDo(e.target.value);
  };
  const postTodo = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (todo === "") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `請輸入代辦事項`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const obj = {
        content: todo,
      };
      try {
        const res = await axios.post(`${VITE_APP_HOST}/todos/`, obj);
        console.log(res);
        getTodo();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `代辦事項新增成功`,
          showConfirmButton: false,
          timer: 1000,
        });
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `代辦事項新增失敗，請重新輸入`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    setToDo("");
    setIsLoading(false);
  };
  const getTodo = async () => {
    try {
      const res = await axios.get(`${VITE_APP_HOST}/todos/`);
      setTodoList(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${VITE_APP_HOST}/todos/${id}`);
      console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `代辦事項刪除成功`,
        showConfirmButton: false,
        timer: 1000,
      });
      getTodo();
    } catch (err) {
      console.log(err);
    }
  };
  const changeState = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.patch(`${VITE_APP_HOST}/todos/${id}/toggle`);
      console.log(res);
      getTodo();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const deleteAll = () => {
    const deleteItem = toDoList.filter((item) => {
      return item.status == true;
    });
    if (deleteItem.length == 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `尚未有已完成項目`,
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      deleteItem.forEach(async (item) => {
        try {
          const res = await axios.delete(`${VITE_APP_HOST}/todos/${item.id}`);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      });
      getTodo();
    }
  };
  const signOut = async () => {
    try {
      const res = await axios.post(`${VITE_APP_HOST}/users/sign_out`);
      console.log("登出", res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `登出`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/auth/sign_in");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    verifyToken();
    getTodo();
  }, []);
  const changeStatePage = () => {
    if (todoStatus == "待完成") {
      setNewToDoList(toDoList.filter((item) => item.status == false));
    } else if (todoStatus == "已完成") {
      setNewToDoList(toDoList.filter((item) => item.status == true));
    } else {
      setNewToDoList(toDoList.map((item) => item));
    }
  };
  useEffect(() => {
    changeStatePage();
  }, [toDoList, todo, todoStatus]);

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              ONLINE TODO LIST
            </a>
          </h1>
          <ul>
            <li className="todo_sm">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span>{userName}的代辦</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                登出
              </a>
            </li>
          </ul>
        </nav>
        <div className="container todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input
                type="text"
                placeholder="請輸入待辦事項"
                onChange={handleText}
                disabled={isLoading}
                value={todo}
              />
              <a href="#" onClick={postTodo} disabled={isLoading}>
                <FontAwesomeIcon icon={faPlus} />
              </a>
            </div>
            {toDoList.length !== 0 ? (
              <div className="todoList_list">
                <ul className="todoList_tab">
                  <li>
                    <a
                      href="#"
                      className={`${todoStatus == "" && "active"}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setToDoStatus("");
                      }}
                    >
                      全部
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`${todoStatus == "待完成" && "active"}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setToDoStatus("待完成");
                      }}
                    >
                      待完成
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`${todoStatus == "已完成" && "active"}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setToDoStatus("已完成");
                      }}
                    >
                      已完成
                    </a>
                  </li>
                </ul>
                <div className="todoList_items">
                  <ul className="todoList_item">
                    {newTodoList.map((item) => {
                      return (
                        <li key={item.id}>
                          <label className="todoList_label">
                            <input
                              className="todoList_input cursor-pointer"
                              type="checkbox"
                              value={!item.status}
                              checked={item.status}
                              disabled={isLoading}
                              onChange={() => {
                                changeState(item.id);
                              }}
                            />
                            <span>{item.content}</span>
                          </label>
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              deleteTodo(item.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faX} />
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="todoList_statistics">
                    <p>{`${
                      toDoList.filter((item) => item.status == true).length
                    } 個已完成項目`}</p>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteAll();
                      }}
                    >
                      清除已完成項目
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-center">目前尚無待辦事項</p>
                <img src={empty} className="img-fluid" alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
