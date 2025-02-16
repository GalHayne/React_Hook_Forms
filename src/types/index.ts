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

export type FoodDeliveryMasterFormType = {
  orderNo: number;
  mobile: string;
  customerName: string;
  email: string;
};

export type FoodItemType = {
  name: string
}

export type FoodDeliveryFormType = {
  address: AddressFormType
  foodItems:FoodItemType[]
} & CheckoutFormType & FoodDeliveryMasterFormType;

export type SelectOptionsType =
  | string
  | { value: string; text: string }
  | { value: number; text: string };
