import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getFragranceRecommendation(preferences: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Actúa como un experto sommelier de perfumes de lujo. 
      Basado en estas preferencias del cliente: "${preferences}", 
      recomienda un tipo de fragancia (Floral, Amaderado, Cítrico u Oriental) 
      y describe qué sensaciones debería buscar. 
      Responde de forma elegante, breve y seductora en español.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Lo sentimos, nuestro sommelier está ocupado en este momento. Por favor, intenta de nuevo más tarde.";
  }
}
