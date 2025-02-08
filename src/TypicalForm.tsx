import { ChangeEvent, SyntheticEvent, useState } from "react";
import { getRenderCount } from "./utils/useRenderCount";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};

type FoodDeliveryFormErrorsType = {
  customerName: string;
  mobile: string;
};

const RenderCount = getRenderCount()

export const TypicalForm = () => {

  const [values, setValues] = useState<FoodDeliveryFormType>({
    customerName: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<FoodDeliveryFormErrorsType>({
    customerName: "",
    mobile: "",
  });
  console.log("🚀 ~ FoodDeliveryForm ~ errors:", errors)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validteFormData = () => {
    const temp: FoodDeliveryFormErrorsType = {
      customerName: "",
      mobile: "",
    };

    if (values?.customerName === "") {
      temp.customerName = "Customer Name is required";
    }

    if (values?.mobile === "") {
      temp.mobile = "Mobile is required";
    }

    setErrors(temp);

    return Object.values(temp).every((x) => x === "");
  };

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validteFormData()) {
      console.log("form data", values);
    } else {
      console.log("from is invalid");
    }
  };

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <RenderCount/>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          name="customerName"
          placeholder="Customer Name"
          value={values.customerName}
          onChange={handleInputChange}
        />
        <label>Customer Name </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          name="mobile"
          placeholder="Mobile"
          value={values.mobile}
          onChange={handleInputChange}
        />
        <label>Mobile</label>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
