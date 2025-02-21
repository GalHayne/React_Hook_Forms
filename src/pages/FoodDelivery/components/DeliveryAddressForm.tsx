import { useFormContext, useFormState } from "react-hook-form";
import { TextField } from "../../../controls/TextField";
import { AddressFormType } from "../../../types";
// import { getRenderCount } from "../../../utils/useRenderCount";

// const RenderCount = getRenderCount();

export const DeliveryAddressForm = () => {
  const {
    register
  } = useFormContext<{ address: AddressFormType }>();

  const { errors } = useFormState< {address: AddressFormType}>({name: "address"});

  return (
    <>
      {/* <RenderCount /> */}
      <div className="text-start dw-bold mt-4 mb-2">Delivery Address</div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Street Address"
            error={errors.address?.streetAddress}
            {...register("address.streetAddress", {
              required: "This field is required.",
            })}
          />
        </div>
        <div className="col">
          <TextField
            label="landmark"
            {...register("address.landmark", {
              required: "This field is required.",
            })}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="city"
            error={errors.address?.city}
            {...register("address.city", {
              required: "This field is required.",
            })}
          />
        </div>
        <div className="col">
          <TextField
            label="state"
            {...register("address.state", {
              required: "This field is required.",
            })}
          />
        </div>
      </div>
    </>
  );
};
