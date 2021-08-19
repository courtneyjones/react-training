import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addFood, getFood, saveFood } from "./api/foodsApi";
import { Input } from "./shared/Input";
import { Select } from "./shared/Select";
import { useHistory, useParams } from "react-router-dom";
import { Food } from "./App";

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

export function FoodForm() {
  const [food, setFood] = useState<Food | NewFood>(emptyFood);
  const history = useHistory();
  const { foodId } = useParams() as any;

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { value, id } = event.target;
    // copy existing state of newFood with spread operator and override the name for _newFood.
    const _newFood = { ...food, [id]: value }; // by convention, the id will be the same as
    // the property changed on the state object
    setFood(_newFood);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      foodId ? await saveFood({ ...food, id: foodId }) : addFood(food);
      toast.success("Food saved! 🦄");
      history.push("/");
    } catch (error) {
      toast.error("Failed to add");
    }
  }

  useEffect(() => {
    async function callGetFood() {
      const retrievedFood = await getFood(foodId);
      setFood(retrievedFood);
    }
    if (foodId) callGetFood();
  }, [foodId]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>{foodId ? "Edit" : "Add"} Food</h1>

      <Input id="name" label="Name" value={food.name} onChange={onChange} />

      <Input
        id="qty"
        label="Qty"
        value={food.qty.toString()}
        type="number"
        onChange={onChange}
      />
      <Input
        id="minQty"
        label="Min Qty"
        value={food.minQty.toString()}
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
        value={food.type}
        onChange={onChange}
      />
      <input type="submit" value="Save Food" className="btn btn-primary" />
    </form>
  );
}
