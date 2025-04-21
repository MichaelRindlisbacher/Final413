import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    fetchEntertainerById,
    updateEntertainer,
    deleteEntertainer
} from '../api/EntertainerAPI';
import { Entertainer } from '../types/Entertainer';

const EditEntertainerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Entertainer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEntertainer = async () => {
            const data = await fetchEntertainerById(Number(id));
            setFormData(data);
            setLoading(false);
        };

        loadEntertainer();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData || !formData.entertainerID) return;
        try {
            await updateEntertainer(formData.entertainerID, formData);
            navigate('/entertainers');
        } catch {
            alert('Failed to update entertainer');
        }
    };

    const handleDelete = async () => {
        if (!formData || !formData.entertainerID) return;
        const confirmDelete = window.confirm('Are you sure you want to delete this entertainer?');
        if (!confirmDelete) return;

        try {
            await deleteEntertainer(formData.entertainerID);
            navigate('/entertainers');
        } catch {
            alert('Failed to delete entertainer');
        }
    };

    if (loading || !formData) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h2>Edit Entertainer</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(formData).map(([key, value]) =>
                    key !== 'entertainerID' ? (
                        <div className="mb-3" key={key}>
                            <label className="form-label">{key}</label>
                            <input
                                className="form-control"
                                type="text"
                                name={key}
                                value={value}
                                onChange={handleChange}
                            />
                        </div>
                    ) : null
                )}
                <button type="submit" className="btn btn-primary me-2">Save</button>
                <button type="button" className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/entertainers')}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditEntertainerForm;
