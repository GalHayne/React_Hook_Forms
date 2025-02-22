import { FoodType } from "../types";

export const getFoodItems = () => {
    return [
        { foodId: 1, name: "Burger", price: 100 },
        { foodId: 2, name: "Pizza", price: 200 },
        { foodId: 3, name: "Pasta", price: 150 },
        { foodId: 4, name: "Sandwich", price: 80 },
        { foodId: 5, name: "Coke", price: 33 },
        { foodId: 6, name: "Pepsi", price: 40 },
        { foodId: 7, name: "Soup", price: 88 },
        { foodId: 8, name: "Onion Rings", price: 40 },
        { foodId: 9, name: "Sweet Tea", price: 30 },
    ] as FoodType[];
}