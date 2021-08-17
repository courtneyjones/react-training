type Food = {
  name: string;
  qty: number;
  minQty: number;
  type: string;
};

// Exercize 2:
// 1. Add reorderPoint (number), type (string)
// 2. Display in a table.
const foods: Food[] = [
  { name: "carrot", qty: 1, minQty: 1, type: "veggie" },
  { name: "potato", qty: 2, minQty: 1, type: "veggie" },
];

export function App() {
  function renderFood(food: Food) {
    return (
      <tr key={food.name}>
        <td>{food.name}</td>
        <td>{food.qty}</td>
        <td>{food.minQty}</td>
        <td>{food.type}</td>
      </tr>
    );
  }

  return (
    <>
      <h1>Cojo's Pantry</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Qty</th>
          <th>Reorder Point</th>
          <th>Type</th>
        </thead>
        <tbody>{foods.map((food) => renderFood(food))}</tbody>
      </table>
    </>
  );
}
