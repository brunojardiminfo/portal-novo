
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiHealthAssistant = async (prompt: string) => {
  if (!API_KEY) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    Você é o Assistente Virtual da Urgetrauma, clínica especializada em traumato-ortopedia. 
    Seu objetivo é ajudar pacientes com dúvidas sobre o portal, processos de pré-check-in, 
    informações sobre especialidades de traumatologia e fisioterapia.
    
    Slogan: "Saúde e movimento".
    
    Sobre o Pré-Check-in: Explique que ele serve para validar a sessão antes de chegar à clínica, 
    gerando um token que agiliza o atendimento na recepção.
    
    IMPORTANTE: Você NÃO é um médico. Suas respostas não substituem consultas. Se houver relatos de 
    emergência grave (fraturas expostas, dor intensa súbita), oriente ida imediata ao Pronto Atendimento 24h da Urgetrauma ou ligue para o SAMU.
    
    Responda em Português do Brasil de forma profissional, ética e eficiente.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Tivemos um problema técnico ao acessar o assistente Urgetrauma. Por favor, tente em instantes.";
  }
};
