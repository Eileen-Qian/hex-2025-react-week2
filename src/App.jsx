import { useState } from "react";
import "./assets/scss/all.scss";

import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = res.data;
      document.cookie = `hexW2Token=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;
      setIsAuth(true);
      setLoginMessage("登入成功");
    } catch (error) {
      console.error(error.response);
      setIsAuth(false);
      setLoginMessage(error.response.data.message);
    } finally {
      setTimeout(() => {
        setLoginMessage("");
      }, 1000);
    }
  };

  const checkLogin = async () => {
    try {
      // 從 Cookie 取得 Token
      // const token = document.cookie
      //   .split("; ")
      //   .find((row) => row.startsWith("hexW2Token="))
      //   ?.split("=")[1];
      //   axios.defaults.headers.common["Authorization"] = token;
      const res = await axios.post(`${API_BASE}/api/user/check`);
      console.log(res.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <>
      {isAuth ? (
        <div className="container">
          <button
            className="btn btn-danger mb-5"
            type="button"
            onClick={() => checkLogin()}
          >
            確認是否登入
          </button>
        </div>
      ) : (
        <div className="container login">
          <div className="row justify-content-center">
            <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
            <div className="col-8">
              <form id="form" className="form-signin" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="name@example.com"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                  <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button
                  className="btn btn-lg btn-primary w-100 mt-3"
                  type="submit"
                >
                  登入
                </button>
              </form>
              {loginMessage && (
                <p
                  className={`h3 mt-3 
                  ${isAuth ? "text-success" : "text-danger"}`}
                >
                  {loginMessage}
                </p>
              )}
            </div>
          </div>
          <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
        </div>
      )}
    </>
  );
}

export default App;
