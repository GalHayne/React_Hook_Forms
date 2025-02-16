import { FieldErrors, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { getRenderCount } from "../../utils/useRenderCount";
import { CheckoutForm } from "./components/CheckoutForm";
import { FoodDeliveryFormType } from "../../types";
import { DeliveryAddressForm } from "./components/DeliveryAddressForm";
import { FoodDeliverMaster } from "./components/FoodDeliverMaster";
import { SubmitButton } from "../../controls/SubmitButton";
import FoodItems from "./components/FoodItems";


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
        paymentMethod: "",
        deliveryIn: 0,
        foodItems: [
          { name: "Chiecken Tender" },
          { name: "Sweet Potato Fries" },
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
    } = methods;

    
    const onSubmit = async (fomrData: FoodDeliveryFormType) => {
      await new Promise(resolve => setTimeout(resolve,3000))
      console.log("🚀 ~ onSubmit ~ fomrData:", fomrData);
    };

    const onDemo = () => {
      setValue("paymentMethod", "COD", {shouldValidate: false})
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
        <FoodDeliverMaster />
        <FoodItems/>
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>

      <SubmitButton value="Submit" control={control}/>
      <button onClick={onDemo} className="btn btn-secondary ms-2">Demo</button>
    </form>
  );
};
