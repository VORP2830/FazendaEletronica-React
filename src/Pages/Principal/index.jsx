import "../../App.css";
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const Botao = () =>{
  cookies.remove('Token')
  window.location.reload()
}

function App() {
    toast.info("Parabéns voce esta logado")
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Parabéns você está logado </span>
          </form>
          <br></br>
          <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={Botao}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;