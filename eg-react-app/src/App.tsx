import React, { useEffect, useState } from "react"; // no path denotes this is from node_modules
import { getFoods, deleteFood } from "./api/foodsApi"; // always begin with ./
import { Input } from "./shared/Input";
import { Select } from "./shared/Select";

export type Food = {
  id: number;
  name: string;
  qty: number;
  minQty: number;
  type: string;
};

export type NewFood = {
  name: string;
  qty: number;
  minQty: number;
  type: string;
};

const emptyFood: NewFood = {
  name: "",
  qty: 0,
  minQty: 0,
  type: "",
};

// Exercize 2:
// 1. Add reorderPoint (number), type (string)
// 2. Display in a table.

export function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [newFood, setNewFood] = useState<NewFood>(emptyFood);

  useEffect(() => {
    async function callGetFoods() {
      const retrievedFoods = await getFoods();
      setFoods(retrievedFoods);
    }
    callGetFoods();
  }, []); // use empty array for useEffect dependencies so it will only run once
  // any values in the dependency list that have changed would trigger the effect again.
  // No array of dependencies makes the effect trigger on every render.

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { value, id } = event.target;
    // copy existing state of newFood with spread operator and override the name for _newFood.
    const _newFood = { ...newFood, [id]: value }; // by convention, the id will be the same as
    // the property changed on the state object
    setNewFood(_newFood);
  }

  return (
    <>
      <h1>Cojo's Pantry</h1>

      {/* Create Select and consume for Food Type
          1. Veggie
          2. Grain
          3. Fruit
*/}
      <form>
        <Input
          id="name"
          label="Name"
          value={newFood.name}
          onChange={onChange}
        />
        <Input
          id="qty"
          label="Qty"
          value={newFood.qty.toString()}
          type="number"
          onChange={onChange}
        />
        <Input
          id="minQty"
          label="Min Qty"
          value={newFood.minQty.toString()}
          type="number"
          onChange={onChange}
        />
        <Select
          id="type"
          label="Type"
          options={[
            { label: "Veggie", value: "veg" },
            { label: "Grain", value: "grain" },
            { label: "Fruit", value: "fruit" },
          ]}
          value={newFood.type}
          onChange={onChange}
        />
      </form>

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
