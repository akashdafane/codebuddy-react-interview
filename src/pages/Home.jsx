import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common.js';

const Home = () => {
  const navigate = useNavigate();

  const onSubmit = () => navigate('/posts');

  return (
    <main>
      <div className="bg-light p-5 mb-5">
        <h1>React + Bootstrap v4</h1>
        <p>React template with Bootstrap version v4</p>
        <p>
          <Button variant="primary" label="Learn more" />
        </p>
      </div>
      <Container>
        <Form>
          <Button onClick={onSubmit} label="Goto Posts" />
        </Form>
      </Container>
    </main>
  );
};

export default Home;
