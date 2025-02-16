import { FieldErrors, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { getRenderCount } from "../../utils/useRenderCount";
import { CheckoutForm } from "./components/CheckoutForm";
import { FoodDeliveryFormType } from "../../types";
import { DeliveryAddressForm } from "./components/DeliveryAddressForm";
import { FoodDeliverMaster } from "./components/FoodDeliverMaster";
import { SubmitButton } from "../../controls/SubmitButton";


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
      formState: {isSubmitting}
    } = methods;
    
    console.log("🚀 ~ FoodDeliveryForm ~ isSubmitting:", isSubmitting)
  
  const onSubmit = async (fomrData: FoodDeliveryFormType) => {
    await new Promise(resolve => setTimeout(resolve,2000))
    console.log("🚀 ~ onSubmit ~ fomrData:", fomrData);
  };

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
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>

      <SubmitButton value="Submit" isSubmitting={isSubmitting}/>
    </form>
  );
};
