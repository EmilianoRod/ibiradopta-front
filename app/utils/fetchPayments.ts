export interface Project {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    location: string;
    endDate: string;
    isFinished: number;
}

export interface User {
    id: string;
    userName: string;
    email: string;
}

export interface Payment {
    id: number;
    amount: number;
    date: string;
    user: User;
    project: Project;
}

interface PaymentFilters {
    projectId?: number;
    userId?: string;
    startDate?: string;
    endDate?: string;
}

export async function fetchPayments(token: string, filters: PaymentFilters = {}): Promise<Payment[]> {
    const query = new URLSearchParams();

    if (filters.projectId) query.append("projectId", filters.projectId.toString());
    if (filters.userId) query.append("userId", filters.userId);
    if (filters.startDate) query.append("startDate", filters.startDate);
    if (filters.endDate) query.append("endDate", filters.endDate);

    const url = `http://localhost:9090/payments/filters?${query.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch payments');
    }
    return await response.json();
}
