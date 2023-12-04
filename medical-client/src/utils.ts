
export const BACKEND_URL = "http://ec2-18-117-153-42.us-east-2.compute.amazonaws.com:5000/"

// export const BACKEND_URL = "http://127.0.0.1:5000/"


export interface Order {
    id: number;
    customer_id: number;
    date_created: string;
    date_completed: string | null;
    status: string;
    order_payment_id: number;
    amount: string;
    delivery_address: string;
    order_items: OrderItem[];
    last_updated_date: string;
    payment_details: PaymentDetails;
  }
  
  interface OrderItem {
    id: number;
    order_id: number;
    medicine_id: number;
    amount: number;
    quantity: number;
    medicine: Medicine;
  }
  
  interface Medicine {
    id: number;
    created_by: string | null;
    updated_by: string | null;
    date_created: string;
    last_updated_date: string;
    name: string;
    price: string;
    discount: string;
    description: string;
    medicine_category_id: number;
    medicine_inventory_id: number;
    manufacture_id: number;
    dose_id: string;
    prescription_status: string;
    category: MedicineCategory;
    inventory: MedicineInventory;
    dose: MedicineDose;
    images: MedicineImage[];
  }
  
  interface MedicineCategory {
    id: number;
    created_by: string | null;
    updated_by: string | null;
    date_created: string;
    last_updated_date: string;
    name: string;
    image_url: string;
    description: string;
  }
  
  interface MedicineInventory {
    id: number;
    created_by: string | null;
    updated_by: string | null;
    date_created: string;
    last_updated_date: string;
    medicine_short_name: string;
    current_quantity: string;
  }
  
  interface MedicineDose {
    id: number;
    created_by: string | null;
    updated_by: string | null;
    date_created: string;
    last_updated_date: string;
    dose_stg: string;
  }
  
  interface MedicineImage {
    id: number;
    created_by: string | null;
    updated_by: string | null;
    date_created: string;
    last_updated_date: string;
    name: string;
    url: string;
    medicine_id: number;
  }
  
  interface PaymentDetails {
    id: number;
    payment_method_id: number;
    payment_id: string | null;
  }
  
