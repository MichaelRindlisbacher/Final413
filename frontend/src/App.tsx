import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AdminEntertainersPage from './pages/AdminEntertainersPage';
import NewEntertainerForm from './components/NewEntertainerForm';
import EditEntertainerForm from './components/EditEntertainerForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            {/* Fixed navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Entertainment Agency
                    </Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/entertainers">Entertainers</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main content with proper padding for fixed navbar */}
            <div className="wrapper" style={{ paddingTop: '70px' }}>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/entertainers" element={<AdminEntertainersPage />} />
                        <Route path="/entertainer/new" element={<NewEntertainerForm />} />
                        <Route path="/entertainer/:id" element={<EditEntertainerForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;