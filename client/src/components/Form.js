import React from "react";

function Form() {
  return (
    <form method="post">
      <div className="form__input-box">
        <input required type="text" placeholder="Username" minLength="3" />
        <input required type="password" placeholder="Password" minLength="10" />
      </div>
      <div className="form__button-box">
        <button>Log in</button>
        <button>Sign up</button>
      </div>
    </form>
  );
}

export default Form;
