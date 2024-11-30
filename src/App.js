import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './routes/Routes';
import NavigationBar from './components/NavigationBar';
import { Container } from 'react-bootstrap';

function App() {
    return (
        <Router>
            <NavigationBar />

            <Container className='mt-3'>
                <AppRoutes />
            </Container>
        </Router>
    );
}

export default App;
