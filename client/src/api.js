const API_BASE_URL = 'https://requesttracker-6x3y.onrender.com';

export async function fetchRequests(status = '') {
    try {
        const url = status
            ? `${API_BASE_URL}/tasks?status=${encodeURIComponent(status)}`
            : `${API_BASE_URL}/tasks`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data.tasks || [];
    } catch (error) {
        console.error('Error fetching requests:', error);
        return [];
    }
}

export async function submitRequest(requestData) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/create_tasks`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting request:', error);
        return null;
    }
}

export async function updateRequestStatus(id, status) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/update/${id}/status`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating request status:', error);
        return null;
    }
}

export async function deleteRequest(id) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/delete/${id}/task`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting request:', error);
        return null;
    }
}