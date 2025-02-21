import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDrZEogRkINfN1ow8T8whhU-_5Wr5AryGs"; // ⚠️ Don't expose API keys in production
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Use a valid Gemini model
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

async function run(userInput) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Include history if needed
    });

    const result = await chatSession.sendMessage(userInput); // Pass a plain string

    console.log("Bot Response:", result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function to test
run("Hello! How are you?");
