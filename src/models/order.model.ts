export interface Order{
    id:string;
    productName:string;
    quantity:number;
    pricePerUnit:number;
    totalAmount:number;
    discount:number;
    finalAmount:number;
    timestamp:string;
}

export const orders:Order[] = []