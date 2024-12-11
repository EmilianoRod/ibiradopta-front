export interface Project {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    location: string;
    endDate: string;
    price: number;
    isFinished: number;
    images: { imageUrl: string; imageOrder: number }[]; // Lista de imágenes
}

export interface Payment {
    id: number;
    quantity: number;
    amount: number;
    date: string;
    userId: string;
    project: Project;
    user: User;
}

export interface User {
    id: number;
    userName: string;
    email: string;
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

    const url = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/payments/filters?${query.toString()}`;

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

    const data = await response.json();

    return data;
}
