import { useEffect, useState } from 'react';
import { fetchItems, deleteItem } from '../api/GenericAPI';
import NewItemForm from '../components/NewItemForm';
import EditItemForm from '../components/EditItemForm';

type Item = {
    id: number;
    name: string;
    // attribute1: string;
    // attribute2: number;
    // attribute3: string;
    // ...
};

const AdminItemsPage = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    const loadItems = async () => {
        try {
            const data = await fetchItems(); // Assumes returns { items: Item[] }
            setItems(data.items);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const handleDelete = async (itemId: number) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete?'
        );
        if (!confirmDelete) return;

        try {
            await deleteItem(itemId);
            setItems(items.filter((item) => item.id !== itemId));
        } catch {
            alert('Failed to delete item. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1>Admin - Items</h1>

            {!showForm && (
                <button
                    className="btn btn-success mb-3"
                    onClick={() => setShowForm(true)}
                >
                    Add Item
                </button>
            )}

            {showForm && (
                <NewItemForm
                    onSuccess={() => {
                        setShowForm(false);
                        loadItems();
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingItem && (
                <EditItemForm
                    item={editingItem}
                    onSuccess={() => {
                        setEditingItem(null);
                        loadItems();
                    }}
                    onCancel={() => setEditingItem(null)}
                />
            )}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        {/* <th>Attribute1</th>
                        <th>Attribute2</th>
                        <th>Attribute3</th>
                        ... */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            {/* <td>{item.attribute1}</td>
                            <td>{item.attribute2}</td>
                            <td>{item.attribute3}</td>
                            ... */}
                            <td>
                                <button
                                    className="btn btn-primary btn-sm w-100 mb-1"
                                    onClick={() => setEditingItem(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm w-100"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminItemsPage;
