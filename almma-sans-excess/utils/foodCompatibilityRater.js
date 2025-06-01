// import { OpenAI } from "langchain/llms/openai";
// import { PromptTemplate } from "langchain/prompts";
// import { LLMChain } from "langchain/chains";

// const llm = new OpenAI({
//   openAIApiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
//   temperature: 0.7,
// });

// const template = `
// You are a food compatibility expert. Given a dish and a user's dietary preferences and restrictions, 
// rate how well the dish matches their needs on a scale of 1-10.

// Dish: {dish}
// Dietary Preference: {dietaryPreference}
// No-Go Foods: {noGoFoods}

// Provide a rating (1-10) and a brief explanation.
// Format: Rating: X/10 - [explanation]
// `;

// const prompt = new PromptTemplate({
//   template: template,
//   inputVariables: ["dish", "dietaryPreference", "noGoFoods"],
// });

// const chain = new LLMChain({ llm: llm, prompt: prompt });

export const rateFoodCompatibility = async (dish, dietaryPreference, noGoFoods) => {
  try {
    // const result = await chain.call({
    //   dish,
    //   dietaryPreference,
    //   noGoFoods: noGoFoods.join(", "),
    // });
    
    // return result.text;
    
    // Temporary mock response
    return `Rating: 7/10 - This dish appears to be compatible with your dietary preferences.`;
  } catch (error) {
    console.error("Error rating food compatibility:", error);
    return "Unable to rate compatibility at this time.";
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