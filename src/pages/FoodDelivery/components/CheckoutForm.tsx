import { useFormContext } from "react-hook-form";
import { CheckoutFormType, SelectOptionsType } from "../../../types";
import { Select } from "../../../controls/Select";

const paymentOptions: SelectOptionsType[] = [
  { value: "", text: "Select..." },
  { value: "online", text: "Paid Online" },
  { value: "COD", text: "Cash on Delivery" },
];

const deliveryInOptions: SelectOptionsType[] = [
  { value: 0, text: "Select..." },
  { value: 30, text: "Half an Hour" },
  { value: 60, text: "1 Hour" },
  { value: 120, text: "2 Hours" },
  { value: 180, text: "3 Hours" },
];

export const CheckoutForm = () => {
    const {
        register,
        formState: { errors },
      } = useFormContext<CheckoutFormType>();


  return (
    <>
      <div className="text-start dw-bold mt-4 mb-2">Checkout Details</div>
      <div className="row mb-2">
        <div className="col">
          <Select
            label="Payment Method"
            options={paymentOptions}
            {...register("paymentMethod", {
              required: "This field is required",
            })}
            error={errors.paymentMethod}
          />
        </div>
        <div className="col">
          <Select
            label="Delivery Within"
            options={deliveryInOptions}
            {...register("deliveryIn", {
              validate: {
                selectDeliveryIn: (value) => {
                  return value !== 0 || "Delivery field is required";
                },
              },
            })}
            error={errors.deliveryIn}
          />
        </div>
      </div>
    </>
  );
};
