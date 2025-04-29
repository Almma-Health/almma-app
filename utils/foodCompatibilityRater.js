import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// Initialize the LLM
const model = new OpenAI({
  openAIApiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  temperature: 0.1,
  modelName: "gpt-3.5-turbo", // or use gpt-4 for better results
});

// Create a prompt template for analyzing food compatibility
const promptTemplate = new PromptTemplate({
  template: `
    You are a nutrition and dietary expert AI. Analyze the compatibility between a person and a food item.
    
    Person's details:
    - Name: {personName}
    - Dietary Preference: {dietaryPreference}
    - Foods They Don't Eat (No-Go Foods): {noGoFoods}
    
    Food item to analyze: {foodItem}
    
    Provide a compatibility rating on a scale of 1-3:
    - 3 (High compatibility): The food aligns perfectly with their dietary preferences and doesn't contain any no-go foods
    - 2 (Medium compatibility): The food mostly aligns with their preferences but may have minor issues
    - 1 (Low compatibility): The food conflicts with their dietary preferences or contains no-go foods
    
    Return only the numerical rating (1, 2, or 3) with no additional text.
  `,
  inputVariables: ["personName", "dietaryPreference", "noGoFoods", "foodItem"],
});

// Create the LLM chain
const foodCompatibilityChain = new LLMChain({ llm: model, prompt: promptTemplate });

/**
 * Rate food compatibility for a person
 * @param {string} personName - Person's name
 * @param {string} dietaryPreference - Dietary preference (e.g., "Vegetarian", "Vegan", "Omnivore")
 * @param {string[]} noGoFoods - Array of foods the person doesn't eat
 * @param {string} foodItem - The food item to analyze
 * @returns {Promise<{rating: number, color: string, label: string}>} - Compatibility rating, color, and label
 */
export const rateFoodCompatibility = async (
  personName,
  dietaryPreference,
  noGoFoods,
  foodItem
) => {
  try {
    // Run the LLM chain
    const response = await foodCompatibilityChain.call({
      personName,
      dietaryPreference,
      noGoFoods: noGoFoods.join(", "),
      foodItem,
    });

    // Parse the response to get the numerical rating
    const rating = parseInt(response.text.trim());
    
    // Map rating to color and label
    let color = "#F44336"; // red (default for low)
    let label = "Low compatibility";
    
    if (rating === 3) {
      color = "#4CAF50"; // green
      label = "High compatibility";
    } else if (rating === 2) {
      color = "#FFC107"; // yellow
      label = "Medium compatibility";
    }

    return {
      rating,
      color,
      label,
    };
  } catch (error) {
    console.error("Error rating food compatibility:", error);
    // Default to medium compatibility if there's an error
    return {
      rating: 2,
      color: "#FFC107",
      label: "Medium compatibility",
    };
  }
};

/**
 * Create mock compatibility ratings for demo purposes
 * @param {Object} person - Person's details
 * @param {Array} menuItems - Array of food items
 * @returns {Array} - Array of menu items with compatibility ratings
 */
export const createMockCompatibilityRatings = (person, menuItems) => {
  const { name, dietaryPreference, noGoFoods } = person;
  
  return menuItems.map(item => {
    // Simple mocking logic based on dietary preference and no-go foods
    let rating = 3; // Default to high
    const noGoFoodsArray = Array.isArray(noGoFoods) ? noGoFoods : noGoFoods.split(',');
    
    // Check if the food item contains any no-go foods
    const containsNoGoFood = noGoFoodsArray.some(food => 
      item.name.toLowerCase().includes(food.toLowerCase())
    );
    
    if (containsNoGoFood) {
      rating = 1; // Low compatibility if contains a no-go food
    } else if (
      (dietaryPreference === "Vegetarian" && item.name.toLowerCase().includes("meat")) ||
      (dietaryPreference === "Vegan" && 
        (item.name.toLowerCase().includes("meat") || 
         item.name.toLowerCase().includes("cheese") ||
         item.name.toLowerCase().includes("chicken") ||
         item.name.toLowerCase().includes("beef") ||
         item.name.toLowerCase().includes("carnitas")))
    ) {
      rating = 1; // Low compatibility if dietary preference conflicts
    } else if (
      (dietaryPreference === "Vegetarian" && item.name.toLowerCase().includes("chicken")) ||
      (dietaryPreference === "Omnivore" && item.name.toLowerCase().includes("vegetables"))
    ) {
      rating = dietaryPreference === "Vegetarian" ? 1 : 3;
    }
    
    // Map the rating to color and label
    let color = "#F44336"; // red
    let label = "Low compatibility";
    
    if (rating === 3) {
      color = "#4CAF50"; // green
      label = "High compatibility";
    } else if (rating === 2) {
      color = "#FFC107"; // yellow
      label = "Medium compatibility";
    }
    
    return {
      ...item,
      compatibility: {
        rating,
        color,
        label
      }
    };
  });
}; 