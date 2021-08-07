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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const displayErrors = () => errors.map((error, i) => <p key={i}>{error}</p>);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((signedUser) => {
          console.log(signedUser);
        })
        .catch((error) => {
          console.log(error);
          setErrors(errors.concat(error.message));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const isFormValid = () => email && password;

  const handleInputError = (inputName) =>
    errors.some((error) => error.toLowerCase().includes(inputName))
      ? "error"
      : "";

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
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

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="violet"
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
          Don't have an account?<Link to="/register">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
export default Login;
