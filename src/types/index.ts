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
};

export type OrderFoodItemType = {
  name: string,
  quantity: number
}

export type FoodDeliveryFormType = {
  address: AddressFormType
  foodItems:OrderFoodItemType[]
} & CheckoutFormType & MasterFoodDeliveryFormType;

export type SelectOptionsType =
  | string
  | { value: string; text: string }
  | { value: number; text: string };
