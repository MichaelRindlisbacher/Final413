import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mt-5">
            <h1 className="display-4">Welcome to the Entertainment Agency</h1>
            <p className="lead">
                Book top-tier entertainers and view booking statistics.
            </p>
            <Link to="/entertainers" className="btn btn-primary btn-lg">
                View Entertainers
            </Link>
        </div>
    );
};

export default Home;
