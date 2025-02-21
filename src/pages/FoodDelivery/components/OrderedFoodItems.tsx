import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import { TextField } from "../../../controls/TextField";
import { OrderFoodItemType } from "../../../types";

const OrderedFoodItems = () => {
  const { register } = useFormContext<{ foodItems: OrderFoodItemType[] }>();

  const { errors } = useFormState<{ foodItems: OrderFoodItemType[] }>({
    name: "foodItems",
  });

  const { fields, append, prepend, insert, swap, move, update, replace, remove } =
    useFieldArray<{ foodItems: OrderFoodItemType[] }>({
      name: "foodItems",
    });
  console.log("🚀 ~ OrderedFoodItems ~ fields:", fields);

  const onRowAdd = () => {
    append({ name: "Food", quantity: fields?.length + 1 }, {focusName: `foodItems.${fields?.length}.name`});
    // prepend({ name: "Food", quantity: 1 });
    // insert(5, { name: "Food", quantity: 4 });
  };

  const onSwapAndMove = () => {
    // swap(1,3);
    move(1, 3);
  };

  const onUpdateAndReplace = () => {
    // update(1, { name: "Updated Food", quantity: 100 });
    replace([{ name: "Replaced Food", quantity: 100 }]);

  };

  const onRowDelete = (index: number) => {
    remove(index)

  };

  return (
    <>
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>
              <button
                onClick={onRowAdd}
                type="button"
                className="btn btn-sm btn-secondary"
              >
                + Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {fields?.map((field, index) => {
            return (
              <tr key={field?.id}>
                <td>
                  <TextField
                    {...register(`foodItems.${index}.name` as const, {
                      required: "This field is required",
                    })}
                    error={errors?.foodItems?.[index]?.name}
                  />
                </td>
                <td>
                  <TextField
                    type="number"
                    min={0}
                    {...register(`foodItems.${index}.quantity` as const, {
                      required: "This field is required",
                    })}
                    error={errors?.foodItems?.[index]?.quantity}
                  />
                </td>
                <td>
                  <button
                    onClick={() => onRowDelete(index)}
                    type="button"
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {fields?.length > 4 && (
        <button
          type="button"
          onClick={onSwapAndMove}
          className="btn btn-sm btn-secondary"
        >
          Swap & Move
        </button>
      )}
      {fields?.length > 4 && (
        <button
          type="button"
          onClick={onUpdateAndReplace}
          className="btn btn-sm btn-secondary"
        >
          Update & Replace
        </button>
      )}
    </>
  );
};

export default OrderedFoodItems;
