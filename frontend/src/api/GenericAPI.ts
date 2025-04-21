export interface FetchItemsResponse<T> {
    items: T[];
    totalCount: number;
}

const API_URL = 'https://your-api-url/api'; // Replace on test day

export const fetchItems = async <T>(
    entity: string,
    pageSize: number,
    pageNum: number,
    orderBy: string,
    direction: string = 'asc'
): Promise<FetchItemsResponse<T>> => {
    try {
        const response = await fetch(
            `${API_URL}/${entity}/All?pageHowMany=${pageSize}&pageNum=${pageNum}&order=${orderBy}&direction=${direction}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }

        const data = await response.json();
        return {
            items: data[`${entity.toLowerCase()}s`] ?? [], // e.g. "books"
            totalCount: data[`total${entity}s`] ?? 0, // e.g. "totalBooks"
        };
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

export const addItem = async <T>(entity: string, newItem: T): Promise<T> => {
    try {
        const response = await fetch(`${API_URL}/${entity}/Add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        if (!response.ok) {
            throw new Error('Failed to add item');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
};

export const updateItem = async <T>(
    entity: string,
    id: number,
    updatedItem: T
): Promise<T> => {
    try {
        const response = await fetch(`${API_URL}/${entity}/Update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        });

        if (!response.ok) {
            throw new Error('Failed to update item');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};

export const deleteItem = async (
    entity: string,
    id: number
): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/${entity}/Delete/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};
