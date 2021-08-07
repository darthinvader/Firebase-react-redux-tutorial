import { useState } from "react";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) return;
    setErrors([]);
    setLoading(true);
    console.log(username, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((createdUser) => {
        console.log(createdUser);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setErrors(errors.concat(err.message));
      });
  };

  const isFormValid = () => {
    let errors = [];
    let error;
    if (isFormEmpty()) {
      error = "Fill in all fields";
      setErrors(errors.concat(error));
      return false;
    } else if (!isPasswordValid()) {
      error = "Password is invalid";
      setErrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = () => {
    return (
      !username.length ||
      !email.length ||
      !password.length | !passwordConfirm.length
    );
  };

  const isPasswordValid = () => {
    return (
      password === passwordConfirm &&
      password.length > 6 &&
      passwordConfirm.length > 6
    );
  };

  const displayErrors = () => errors.map((error, i) => <p key={i}>{error}</p>);

  const handleInputError = (inputName) =>
    errors.some((error) => error.toLowerCase().includes(inputName))
      ? "error"
      : "";

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register from DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className={handleInputError("username")}
              type="text"
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={handleInputError("email")}
              type="email"
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={handleInputError("password")}
              type="password"
            />

            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              className={handleInputError("password")}
              type="password"
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="orange"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors()}
          </Message>
        )}
        <Message>
          Already a user?<Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
