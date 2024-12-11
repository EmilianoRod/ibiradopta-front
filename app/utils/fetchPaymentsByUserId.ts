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

export async function fetchPaymentsByUserId(token: string, userId:string): Promise<Payment[]> {
    const query = new URLSearchParams();

    const url = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/payments/userId/${userId}`;

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
