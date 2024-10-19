import React from "react";

const Login = () => {
  return (
    <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
      <form action="#">
        <div className="login-form">
          <h4 className="login-title">Login</h4>
          <div className="row">
            <div className="col-md-12 col-12">
              <label>Email Address*</label>
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="col-12">
              <label>Password</label>
              <input type="password" placeholder="Password" />
            </div>
            <div className="col-sm-6">
              <div className="check-box d-inline-block ml-0 ml-md-2">
                <input type="checkbox" id="remember_me" />
                <label htmlFor="remember_me">Remember me</label>
              </div>
            </div>
            <div className="col-sm-6 text-start text-sm-end">
              <a href="#" className="forget-pass-link">
                {" "}
                Forgotten pasward?
              </a>
            </div>
            <div className="col-md-12">
              <button className="register-button">Login</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
