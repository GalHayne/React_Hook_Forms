export type CheckoutFormType = {
  paymentMethod: string;
  deliveryIn: number;
};

export type AddressFormType = {
    streetAddress: string;
    landmark: string;
    city: string;
    state: string;
};

export type MasterFoodDeliveryFormType = {
  orderNo: number;
  mobile: string;
  customerName: string;
  email: string;
  gTotal: number;
};

export type OrderFoodItemType = {
  foodId: number,
  price: number,
  quantity: number
  totalPrice: number,
}

export type FoodType = {
  foodId: number,
  name: string,
  price: number
}

export type FoodDeliveryFormType = {
  address: AddressFormType
  foodItems:OrderFoodItemType[]
} & CheckoutFormType & MasterFoodDeliveryFormType;

export type SelectOptionsType =
  | string
  | { value: string; text: string }
  | { value: number; text: string };
