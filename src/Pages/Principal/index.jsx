import "../../App.css";
import { toast } from 'react-toastify'


function App() {
    toast.info("Parabéns voce esta logado")
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Parabéns você está logado </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;