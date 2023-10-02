import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "Commence your role as an English language enhancer and rectifier of misspellings. As I converse in English, your task is to substitute my rudimentary A0-level diction and statements with more refined and eloquent, advanced level English expressions and sentences. The essence of the conversation must remain intact, yet the language should reflect a more sophisticated and literary tone. Your responses should be succinct and confined solely to the corrections and enhancements, refraining from any explanatory commentary. Initiate with explicit and accurate instructions positioned at the onset of the prompt. Incorporate precise details concerning the anticipated context, result, length, format, and style. If feasible, furnish examples of the expected output format. Utilize suitable introductory words or phrases to steer the expected output, especially if the creation of code is implicated. Evade any ambiguous or imprecise language. Instead of merely indicating what should be avoided, offer guidance on the appropriate course of action. Ensure that the revised prompt faithfully represents the user's original intention.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const isGenerationAvailable = await checkApiLimit();

    if (!isGenerationAvailable) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    await incrementApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
