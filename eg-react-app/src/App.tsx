import { useEffect, useState } from "react";
import { getFoods, deleteFood } from "./api/foodsApi";

type Food = {
  id: number;
  name: string;
  qty: number;
  minQty: number;
  type: string;
};

// Exercize 2:
// 1. Add reorderPoint (number), type (string)
// 2. Display in a table.

export function App() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function callGetFoods() {
      const response = await getFoods();
      if (!response.ok) throw new Error("Call to getFoods() failed.");
      const json = await response.json();
      setFoods(json);
    }
    callGetFoods();
  }, []); // use empty array for useEffect dependencies so it will only run once

  return (
    <>
      <h1>Cojo's Pantry</h1>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Qty</th>
            <th>Reorder Point</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {/* Add delete button next to name. When clicked, alert('clicked') */}
          {foods.map((food) => {
            return (
              <tr key={food.name}>
                <td>
                  <input
                    type="button"
                    onClick={async () => {
                      await deleteFood(food.id);
                      // remove deleted food from state
                      const newFoods = foods.filter((f) => f.id !== food.id);
                      setFoods(newFoods);
                    }}
                    value="Delete"
                  />
                </td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.minQty}</td>
                <td>{food.type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
