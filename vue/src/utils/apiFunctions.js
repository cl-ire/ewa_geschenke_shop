// utils/apiFunctions.js

const BASE_URL = "/api";

// Fetch all products from the database
export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
}

// Update the Lagerbestand for a product by its ID
export async function updateProductLagerbestand(productId, newLagerbestand) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Lagerbestand: newLagerbestand }),
    });

    if (!response.ok) {
      throw new Error(`Error updating Lagerbestand: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in updateProductLagerbestand:", error);
    throw error;
  }
}

// Add a new user to the database
export async function addUser(userDetails) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
      throw new Error(`Error adding user: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in addUser:", error);
    throw error;
  }
}
