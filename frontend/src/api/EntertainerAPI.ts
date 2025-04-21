import { Entertainer, EntertainerSummary } from '../types/Entertainer';

const API_BASE = 'https://final413-backend-michael-fnc7aycthkcxbsfe.eastus-01.azurewebsites.net/api/Entertainer';

// GET all with summary
export const fetchEntertainers = async (): Promise<EntertainerSummary[]> => {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch entertainers');
    return await response.json();
};

// GET one by ID
export const fetchEntertainerById = async (id: number): Promise<Entertainer> => {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch entertainer');
    return await response.json();
};

// POST new
export const addEntertainer = async (entertainer: Entertainer): Promise<void> => {
    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entertainer),
    });
    if (!response.ok) throw new Error('Failed to add entertainer');
};

// PUT update
export const updateEntertainer = async (id: number, entertainer: Entertainer): Promise<void> => {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entertainer),
    });
    if (!response.ok) throw new Error('Failed to update entertainer');
};

// DELETE
export const deleteEntertainer = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete entertainer');
};
