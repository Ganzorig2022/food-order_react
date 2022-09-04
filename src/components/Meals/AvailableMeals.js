import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    //1. Fetch data
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-ecb71-default-rtdb.firebaseio.com/meals.json'
      );

      //2. true or false returns
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      //m1: {description: 'Finest fish and veggies', name: 'Sushi', price: 22.99},
      //m2: {description: "A german specialty! "name: "Schnitzel"price: 16.5 },
      //m3: {description: 'American, raw, meaty', name: 'Barbecue Burger', price: 12.99 },
      //m4: {description: 'Healthy...and green...', name: 'Green Bowl', price: 18.99 },
      const responseData = await response.json();

      const loadedMeals = [];

      //4. Push to new array []
      for (const key in responseData) {
        // key =m1,m2,m3,m4
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      //5. Set meal array
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    //6. if something is wrong...
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  //7. loading text
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  //8. Rendering
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
