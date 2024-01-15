
import { useState } from 'react';
import '../styles/Login.css'

const Login = () => {
  const [register, setRegister] = useState(false);

  return (
  <div className="main_login_container">
    <div className="login_titles">
      <button className={`${!register && 'active'}`} onClick={() => setRegister(false)}>Login</button>
      <button className={`${register && 'active'}`} onClick={() => setRegister(true)}>Register</button>
    </div>
    <div className="tab-content">
      <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
        <form>
          {!register && <div className="text-center mb-2">
            <div className="fw-bold">Sign in with:</div>
            <button title='facebook' type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f fs-5"></i>
            </button>

            <button title='google' type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google fs-5"></i>
            </button>

            <button title='twitter' type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter fs-5"></i>
            </button>

            <button title='github' type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github fs-5"></i>
            </button>
          </div>}
          {!register && <p className="text-center fw-bold">or:</p>}

          {register && <div className="form-outline mb-3">
            <input type="text" id="registerName" className="form-control" />
            <label className="form-label" htmlFor="registerName">Username</label>
          </div>}

          <div className="form-outline mb-3">
            <input type="email" id="loginName" className="form-control" />
            <label className="form-label" htmlFor="loginName">Email</label>
          </div>

          <div className="form-outline mb-3">
            <input type="password" id="loginPassword" className="form-control" />
            <label className="form-label" htmlFor="loginPassword">Password</label>
          </div>

          {register && <div className="form-outline mb-3">
            <input type="password" id="confirmPassword" className="form-control" />
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
          </div>}

          {!register && <div className="row mb-3" style={{fontSize: '.94em'}}>
            <div className="col-6 d-flex justify-content-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
              </div>
            </div>

            <div className="col-6 d-flex justify-content-center">
              <a href="#!">Forgot password?</a>
            </div>
          </div>}

          <div className='d-flex justify-content-center'>
            <button type="submit" className="btn btn-primary btn-block">{register ? 'Register' : 'Sign in'}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;
