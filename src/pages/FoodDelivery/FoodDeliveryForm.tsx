import { FieldErrors, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { getRenderCount } from "../../utils/useRenderCount";
import { CheckoutForm } from "./components/CheckoutForm";
import { FoodDeliveryFormType } from "../../types";
import { DeliveryAddressForm } from "./components/DeliveryAddressForm";
import { SubmitButton } from "../../controls/SubmitButton";
import OrderedFoodItems from "./components/OrderedFoodItems";
import { MasterFoodDeliveryForm } from "./components/MasterFoodDeliveryForm";


const RenderCount = getRenderCount();

export const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      shouldFocusError: true,
      mode: "onChange",
      defaultValues: {
        orderNo: new Date().valueOf(),
        customerName: "",
        mobile: "",
        email: "",
        gTotal: 0,
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
      },
    });
    
    const {
      handleSubmit,
      control,
      setValue, 
      getValues
    } = methods;

    
    const onSubmit = async (fomrData: FoodDeliveryFormType) => {
      await new Promise(resolve => setTimeout(resolve,3000))
      console.log("🚀 ~ onSubmit ~ fomrData:", fomrData);
    };

    const onDemo = () => {
      // setValue("paymentMethod", "COD", {shouldValidate: false})
      getValues("foodItems.0.foodId")
      console.log("🚀 ~ onDemo ~ getValues:", getValues("foodItems.0"))
      console.log("🚀 ~ onDemo ~ getValues:", typeof getValues("foodItems.0.foodId"))

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
