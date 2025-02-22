import { FieldErrors, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { getRenderCount } from "../../utils/useRenderCount";
import { CheckoutForm } from "./components/CheckoutForm";
import { FoodDeliveryFormType } from "../../types";
import { DeliveryAddressForm } from "./components/DeliveryAddressForm";
import { SubmitButton } from "../../controls/SubmitButton";
import OrderedFoodItems from "./components/OrderedFoodItems";
import { MasterFoodDeliveryForm } from "./components/MasterFoodDeliveryForm";
import { createOrder, fetchLastOrder } from "../../db";


const RenderCount = getRenderCount();

const id:number = 0;

const defaultValues: FoodDeliveryFormType = {

  orderId: 0,
  orderNo: new Date().valueOf(),
  customerName: "",
  mobile: "",
  email: "",
  gTotal: 0,
  placeOn: new Date(),
  paymentMethod: "",
  deliveryIn: 0,
  foodItems: [
    { foodId: 0, price: 0 , quantity: 0 , totalPrice: 0},
  ],
  address: {
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
  },
}

export const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onChange",
      defaultValues: async (): Promise<FoodDeliveryFormType> => {
        if (id === 0){
          return new Promise(resolve => resolve(defaultValues))
        }else{
          const tempOrder = await fetchLastOrder();
          return new Promise(resolve => resolve(tempOrder ? tempOrder : defaultValues))
           
        }
      }
    });
    
    const {
      handleSubmit,
      control,
      setValue, 
      getValues,
      setFocus
    } = methods;

    
    const onSubmit = async (formData: FoodDeliveryFormType) => {
      await new Promise(resolve => setTimeout(resolve,3000))
      formData.orderId = 1;
      formData.placeOn = new Date();
      createOrder(formData);
    };

    const onDemo = () => {
      // setValue("paymentMethod", "COD", {shouldValidate: false})
      // getValues("foodItems.0.foodId")
      setFocus("customerName")

    }
    
    const onError = (error: FieldErrors) => {
      console.log("🚀 ~ onSubmit ~ error:", error);
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RenderCount />
      <div>list of ordered food items</div>
      <FormProvider {...methods}>
        <MasterFoodDeliveryForm/>
        <OrderedFoodItems/>
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>

      <SubmitButton value="Submit" control={control}/>
      <button onClick={onDemo} className="btn btn-secondary ms-2">Demo</button>
    </form>
  );
};
