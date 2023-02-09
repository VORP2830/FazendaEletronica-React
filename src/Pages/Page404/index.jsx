import { Link } from "react-router-dom";
import "../../App.css";
import logo from "../../Imagens/boi.png"
import "./style.css"

function App() {

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">

          <span className="login-form-title">
              <img src={logo} alt="Logo" />
            </span>

            <span className="login-form-title">
            </span>

            <br>
            </br>

            <br>
            </br>

            <div className="container-login-form-button">
              <h1 className="erro">Pagina 404</h1>
            </div>

            <div className="container-login-form-button">
              <Link className="erro-btn" to="/login">Login</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;