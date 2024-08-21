const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch("http://localhost:4000/api/catagoryWiseProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch category-wise products');
    }
  
    const dataResponse = await response.json();
    return dataResponse;
  };
  
  export default fetchCategoryWiseProduct;
  