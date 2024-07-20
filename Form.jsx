// Create React form component that renders a form with input fields for name, email, dob, role ( drop-down with some values ) password and confirm password.(done) When the form is submitted, it validates the input fields to ensure they are not empty, both password fields should be same and that the email is in a valid format.(done) If the validation passes, it displays the input values in an alert box. If there's an error, it displays an error message below that input.(done)
import React, { Component, useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === cPassword) {
      setError(false);
      alert(
        `Name: ${name} \nEmail: ${email} \nDate of Birth: ${dob} \nRole: ${role} \nPassword has been set successfully.`
      );
    } else {
      setError(true);
      setPassword("");
      setCPassword("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        <hr />
        <label>Email Address:</label>
        <input
          type="email"
          value={email}
          placeholder="email123@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <hr />
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        ></input>
        <hr />
        <label>Role:</label>
        <select
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="Assistant">Assistant</option>
          <option value="Engineer">Engineer</option>
          <option value="HR">HR</option>
          <option value="CEO">CEO</option>
          <option value="CFO">CFO</option>
        </select>
        <hr />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <hr />
        <label>Confirm password:</label>
        <input
          type="password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
          required
        ></input>
        <hr />
        <label>
          <button type="submit">Submit</button>
        </label>
      </form>
      {error && <div>Passwords don't match! Re-enter your passwords</div>}
    </div>
  );
}

export default Form;
