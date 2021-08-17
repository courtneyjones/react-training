
type Food = {
	name: string;
	qty: number;
}

const foods: Food[] = [
	{ name: 'carrot', qty: 1 },
	{ name: 'potato', qty: 2 }
];

export function App() {
	function renderFoods() {
		return foods.map(food => <li>{ food.name }</li>);
	}

	return (
		<>
			<h1>Cojo's Pantry</h1>
			<ul>
				{ renderFoods() }
			</ul>
		</>
	)
}