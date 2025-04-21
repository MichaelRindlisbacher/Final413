import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEntertainers } from '../api/EntertainerAPI';
import { EntertainerSummary } from '../types/Entertainer';

const AdminEntertainersPage = () => {
    const [entertainers, setEntertainers] = useState<EntertainerSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadEntertainers = async () => {
            try {
                const data = await fetchEntertainers();
                setEntertainers(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadEntertainers();
    }, []);

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <h1 className="mb-4 text-center">Admin - Entertainers</h1>

                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Stage Name</th>
                                    <th>Times Booked</th>
                                    <th>Last Booking Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entertainers.map((e) => (
                                    <tr key={e.entertainerID}>
                                        <td>{e.entertainerID}</td>
                                        <td>{e.entStageName}</td>
                                        <td>{e.timesBooked}</td>
                                        <td>{e.lastBookingDate || 'Never'}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm w-100"
                                                onClick={() => navigate(`/entertainer/${e.entertainerID}`)}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center mb-3">
                        <button className="btn btn-success" onClick={() => navigate('/entertainer/new')}>
                            Add Entertainer
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEntertainersPage;