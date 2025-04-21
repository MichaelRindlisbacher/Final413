import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEntertainer } from '../api/EntertainerAPI';
import { Entertainer } from '../types/Entertainer';

const NewEntertainerForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Entertainer>({
        entStageName: '',
        entSSN: '',
        entStreetAddress: '',
        entCity: '',
        entState: '',
        entZipCode: '',
        entPhoneNumber: '',
        entWebPage: '',
        entEmailAddress: '',
        dateEntered: new Date().toISOString().split('T')[0]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addEntertainer(formData);
            navigate('/entertainers');
        } catch {
            alert('Failed to add entertainer');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Entertainer</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(formData).map(([key, value]) => (
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
                ))}
                <button type="submit" className="btn btn-success me-2">Add</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/entertainers')}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default NewEntertainerForm;
