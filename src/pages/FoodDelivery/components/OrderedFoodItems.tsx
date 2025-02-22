import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import { TextField } from "../../../controls/TextField";
import { FoodType, OrderFoodItemType, SelectOptionsType } from "../../../types";
import { ChangeEvent, useEffect, useState } from "react";
import { getFoodItems } from "../../../db";
import { Select } from "../../../controls/Select";

const OrderedFoodItems = () => {
  const { register, getValues, setValue } = useFormContext<
    { gTotal: number } & { foodItems: OrderFoodItemType[] }
  >();

  const { errors } = useFormState<{ foodItems: OrderFoodItemType[] }>({
    name: "foodItems",
  });

  const [foodList, setFoodList] = useState<FoodType[]>([]);
  const [foodOptions, setFoodOptions] = useState<SelectOptionsType[]>([]);

  const { fields, append, move, replace, remove } = useFieldArray<{
    foodItems: OrderFoodItemType[];
  }>({
    name: "foodItems",
    rules: {
      // minLength: {
      //   value: 3, message: "Minimum 3 items required"
      // },
      required: {
        value: true,
        message: "Please add food items",
      },
      // validate: {
      //   noDuplicate: (value,values) => {
      //   console.log("🚀 ~ OrderedFoodItems ~ value:", value) //field array
      //   console.log("🚀 ~ OrderedFoodItems ~ values:", values) //its all values in form
      //   if (value?.length === 0){
      //     return "No food in the order."
      //   }
      //   return false
      //   }
      // }
    },
  });

  useWatch({name: "gTotal"})

  const selectedFoodItems: OrderFoodItemType[] = useWatch({
    name: "foodItems",
  });

  useEffect(() => {
    updateGTotal();
  },[selectedFoodItems])

  const updateGTotal = () => {
    let gTotal = 0;
    if (selectedFoodItems && selectedFoodItems.length > 0) {
      gTotal = selectedFoodItems.reduce((sum, curr) => {
        return sum + curr.totalPrice;
      }, 0);
      setValue("gTotal", gTotal);
    }
  };



  useEffect(() => {
    const tempList: FoodType[] = getFoodItems();
    setFoodList(tempList);
    const tempOptions: SelectOptionsType[] = tempList?.map((x) => {
      return {
        value: x?.foodId,
        text: x?.name,
      };
    });
    setFoodOptions([{ value: 0, text: "Select" }, ...tempOptions]);
  }, []);

  const onRowAdd = () => {
    append({ foodId: 0, price: 0, quantity: 0, totalPrice: 0 });
    // prepend({ name: "Food", quantity: 1 });
    // insert(5, { name: "Food", quantity: 4 });
  };

  const onSwapAndMove = () => {
    // swap(1,3);
    move(1, 3);
  };

  const onUpdateAndReplace = () => {
    // update(1, { name: "Updated Food", quantity: 100 });
    // replace([{ name: "Replaced Food", quantity: 100 }]);
  };

  const onRowDelete = (index: number) => {
    remove(index);
  };

  const onFoodChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const foodId = parseInt(e.target.value);
    let price: number;
    if (foodId === 0) {
      price = 0;
    } else {
      price = foodList.find((x) => x.foodId === foodId)?.price || 0;
    }

    setValue(`foodItems.${index}.price`, price);
    updateRowTotalPrice(index);
  };

  const updateRowTotalPrice = (index: number) => {
    const { price, quantity } = getValues(`foodItems.${index}`);
    let totalPrice = 0;
    if (quantity && quantity > 0) {
      totalPrice = price * quantity;
    }
    setValue(`foodItems.${index}.totalPrice`, totalPrice);
  };

  return (
    <>
      <div className="text-start dw-bold mt-4 mb-2">Order Food Items</div>
      <table id="foodItems" className="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th className="text-start">Price</th>
            <th>Quantity</th>
            <th className="text-start">Total Price</th>

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
                  {/* <TextField
                    {...register(`foodItems.${index}.foodId` as const, {
                      required: "This field is required",
                    })}
                    error={errors?.foodItems?.[index]?.foodId}
                  /> */}
                  <Select
                    options={foodOptions}
                    error={errors.foodItems && errors.foodItems[index]?.foodId}
                    {...register(`foodItems.${index}.foodId` as const, {
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Select food",
                      },
                      onChange: (e) => {
                        onFoodChange(e, index);
                      },
                    })}
                  />
                </td>
                <td className="text-start align-middle">{"$" + getValues(`foodItems.${index}.price`)}</td>
                <td>
                  <TextField
                    type="number"
                    error={
                      errors.foodItems && errors.foodItems[index]?.quantity
                    }
                    min={0}
                    {...register(`foodItems.${index}.quantity` as const, {
                      valueAsNumber: true,
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      onChange: () => {
                        updateRowTotalPrice(index);
                      },
                      min: {
                        value: 1,
                        message: "< 1",
                      },
                    })}
                  />
                </td>
                <td className="text-start align-middle">{"$" + getValues(`foodItems.${index}.totalPrice`)}</td>
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
        <tfoot>
          {fields && fields.length > 0 && (
            <tr className="border-top">
              <td colSpan={2}></td>
              <td>G. Total</td>
              <td className="text-start align-middle">{"$" + getValues("gTotal")}</td>
              <td></td>
            </tr>
          )}
          {errors?.foodItems?.root && (
            <tr>
              <td colSpan={5}>
                <span className="error-feedback">
                  {errors.foodItems?.root?.message}
                </span>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
      {/* {fields?.length > 4 && (
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
      )} */}
    </>
  );
};

export default OrderedFoodItems;
