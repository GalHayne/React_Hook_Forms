import { useFormContext } from "react-hook-form";
import { TextField } from "../../../controls/TextField";
import { FoodDeliveryMasterFormType } from "../../../types";

export const FoodDeliverMaster = () => {

    const {
        register,
        formState: { errors },
      } = useFormContext<FoodDeliveryMasterFormType>();

  return (
    <div>
        <div className="row mb-2">
        <div className="col">
          <TextField
            type="text"
            disabled
            label="#Order No."
            {...register("orderNo")}
          />
        </div>
        <div className="col">
          <TextField
            type="text"
            label="Mobile"
            {...register("mobile", {
              minLength: {
                value: 10,
                message: "Must be minimum 10 digists",
              },
              maxLength: {
                value: 10,
                message: "Must be maximum 10 digists",
              },
              required: "This field is required",
            })}
            error={errors.mobile}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <TextField
            type="text"
            label="Customer Name"
            {...register("customerName", {
              required: "This field is required",
            })}
            error={errors.customerName}
          />
        </div>
        <div className="col">
          <TextField
            type="email"
            label="Email"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Incorrect email format.",
              },
              required: "This field is required",
              validate: {
                notFake: (value) => {
                  return (
                    value !== "email@gmail.com" || "Particualr email is block"
                  );
                },
                notFromBlackListedDomain: (value) => {
                  return (
                    (!value.endsWith("xyz.com") &&
                      !value.endsWith("example.com")) ||
                    "The domain is not supported"
                  );
                },
              },
            })}
            error={errors.email}
          />
        </div>
      </div>
      
    </div>
  )
}

