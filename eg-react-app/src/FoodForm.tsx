import { useState } from "react";
import { toast } from "react-toastify";
import { addFood } from "./api/foodsApi";
import { Input } from "./shared/Input";
import { Select } from "./shared/Select";
import { useHistory } from "react-router-dom";

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
  const [newFood, setNewFood] = useState<NewFood>(emptyFood);
  const history = useHistory();

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { value, id } = event.target;
    // copy existing state of newFood with spread operator and override the name for _newFood.
    const _newFood = { ...newFood, [id]: value }; // by convention, the id will be the same as
    // the property changed on the state object
    setNewFood(_newFood);
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await addFood(newFood);
      toast.success("Food saved! 🦄");
      history.push("/");
    } catch (error) {
      toast.error("Failed to add");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input id="name" label="Name" value={newFood.name} onChange={onChange} />
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
      <input type="submit" value="Save Food" className="btn btn-primary" />
    </form>
  );
}
