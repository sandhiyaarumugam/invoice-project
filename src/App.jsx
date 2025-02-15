import { useState } from 'react';
import reactLogo from './assets/react.svg'; // Corrected to lowercase
import './App.css';
import { Container } from 'react-bootstrap';
import InvoiceForm from './components/InvoiceForm';
import 'bootstrap/dist/css/bootstrap.min.css'; // Corrected CSS 

function App() {
  const [count, setCount] = useState(0); // Fixed variable name capitalization

  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <InvoiceForm />
      </Container>
    </div>
  );
}

export default App;