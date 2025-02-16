import { useFormContext, useFormState } from "react-hook-form";
import { FoodItemType } from "../../../types";
import { TextField } from "../../../controls/TextField";

const FoodItems = () => {
  const { register } = useFormContext<{ foodItems: FoodItemType[] }>();

  const { errors } = useFormState< {foodItems: FoodItemType[]}>({name: "foodItems"});
  console.log("🚀 ~ FoodItems ~ errors:", errors)

  return (
    <table className="table table-borderless table-hover">
      <tbody>
        <tr>
          <td>
            <TextField
              type="text"
              label="Food 1"
              {...register("foodItems.0.name", {required: "This field is required"})}
              error={errors?.foodItems?.[0]?.name}
              />
          </td>
        </tr>
        <tr>
          <td>
            <TextField
              type="text"
              label="Food 2"
              {...register("foodItems.1.name", {required: "This field 2 is required"})}
              error={errors?.foodItems?.[1]?.name}
              />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FoodItems;
