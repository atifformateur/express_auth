//importer l'outil de gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
//import de la key api
import { env } from '../config/env.js'

//initialise un objet du client gemini ( on initialise l'outil qui nous permet de communiquer avec l'ia)
const genAI = new GoogleGenerativeAI(env.geminiApiKey);
//le model de l'ia quon souhaite utiliser 
const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash'});

export async function test() {
    
    const prompt = "le meilleur framework dev est ? ";


    const result = await model.generateContent(prompt);
    const response = result.response;

    const text = response.text();

    console.log(text);
    
}