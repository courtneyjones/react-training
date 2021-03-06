import React, { useEffect, useState } from "react"; // no path denotes this is from node_modules
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFoods, deleteFood } from "./api/foodsApi"; // always begin with ./

export type Food = {
  id: number;
  name: string;
  qty: number;
  minQty: number;
  type: string;
};

// Exercize 2:
// 1. Add reorderPoint (number), type (string)
// 2. Display in a table.

export function Pantry() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function callGetFoods() {
      const retrievedFoods = await getFoods();
      setFoods(retrievedFoods);
    }
    callGetFoods();
  }, []); // use empty array for useEffect dependencies so it will only run once
  // any values in the dependency list that have changed would trigger the effect again.
  // No array of dependencies makes the effect trigger on every render.

  return (
    <>
      <ToastContainer />
      <h1>Cojo's Pantry</h1>

      <Link to="/food">Add Food</Link>

      {foods.length ? table() : emptyPantry()}
    </>
  );

  function emptyPantry() {
    return <p>Uh, oh! No food in pantry!!</p>;
  }

  function table() {
    return (
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
                <td>
                  <Link to={`/food/${food.id}`}>{food.name}</Link>
                </td>
                <td>
                  <span
                    style={
                      food.qty < food.minQty
                        ? { color: "red", fontWeight: "bold" }
                        : {}
                    }
                  >
                    {food.qty}
                  </span>
                </td>
                <td>{food.minQty}</td>
                <td>{food.type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
