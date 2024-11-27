import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  const handleAddFood = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const food = { name, price };
    console.log(food);

    fetch("http://localhost:5000/foods", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(food),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newFoods = [...foods, data];
        setFoods(newFoods);
        form.reset();
      });
  };
  return (
    <>
      <h1>Food Item</h1>
      <h3>All Food : {foods.length}</h3>
      <form onSubmit={handleAddFood}>
        <input type="text" name="name" />
        <br />
        <input type="text" name="price" />
        <br />
        <input type="submit" name="Add Food" />
      </form>
      <div>
        {foods.map((food, idx) => (
          <p key={idx}>
            {food.id} : {food.name} : {food.price}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
