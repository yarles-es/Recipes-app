const DrinkIngredientsApi = async (token) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${token}`;
  try {
  const request = await fetch(url);
  const response = await request.json();
  const NUMBER_MAGIC = 11;
  if (response.drinks === null) return [];
  const currencyDrinks = response.drinks.filter((_d, i) => i <= NUMBER_MAGIC);
  return currencyDrinks;
  } catch (error) {
    console.log(error)
  }
};

export default DrinkIngredientsApi;
