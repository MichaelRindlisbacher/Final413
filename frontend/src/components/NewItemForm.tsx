import { useState } from 'react';
import { addItem } from '../api/GenericAPI';

interface NewItemFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

type Item = {
    id: number;
    name: string;
    description: string;
    // attribute1: string;
    // attribute2: number;
    // attribute3: string;
};

const NewItemForm = ({ onSuccess, onCancel }: NewItemFormProps) => {
    const [formData, setFormData] = useState<Item>({
        id: 0,
        name: '',
        description: '',
        // attribute1: '',
        // attribute2: 0,
        // attribute3: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData({ ...formData, [name]: parsedValue });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addItem(formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Item</h2>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={formData.description} onChange={handleChange} />
            </label>
            {/* <label>
                Attribute1:
                <input type="text" name="attribute1" value={formData.attribute1} onChange={handleChange} />
            </label>
            <label>
                Attribute2:
                <input type="number" name="attribute2" value={formData.attribute2} onChange={handleChange} />
            </label>
            <label>
                Attribute3:
                <input type="text" name="attribute3" value={formData.attribute3} onChange={handleChange} />
            </label> */}
            <button type="submit">Add Item</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default NewItemForm;
