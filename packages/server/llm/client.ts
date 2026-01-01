import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';
import { Ollama } from 'ollama';

// 1st option: using OpenAI
const openAIClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

// 2nd option: using HuggingFace Inference
const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

// 3rd option: using Ollama local server
const ollamaClient = new Ollama();

type GenerateTextOptions = {
   model?: string;
   prompt: string;
   instructions?: string;
   temperature?: number;
   maxTokens?: number;
   previousResponseId?: string;
};

type GenerateTextResult = {
   id: string;
   text: string;
};

export const llmClient = {
   async generateText({
      model = 'gpt-4.1-mini',
      prompt,
      instructions,
      temperature = 0.2,
      maxTokens = 300,
      previousResponseId,
   }: GenerateTextOptions): Promise<GenerateTextResult> {
      const response = await openAIClient.responses.create({
         model,
         input: prompt,
         instructions,
         temperature,
         max_output_tokens: maxTokens,
         previous_response_id: previousResponseId,
      });

      return {
         id: response.id,
         text: response.output_text,
      };
   },

   async summarizeReviews(reviews: string) {
      // For 2nd option using Llama from HuggingFace
      // const chatCompletion = await inferenceClient.chatCompletion({
      //    model: 'meta-llama/Llama-3.1-8B-Instruct:novita',
      //    messages: [
      //       {
      //          role: 'system',
      //          content:
      //             'Summarize the following customer reviews into a short paragraph highlighting key themes, both positive and negative',
      //       },
      //       {
      //          role: 'user',
      //          content: reviews,
      //       },
      //    ],
      // });
      // return chatCompletion.choices[0]?.message.content || '';

      // For 3rd option using tinyllama from local server
      const response = await ollamaClient.chat({
         model: 'tinyllama',
         messages: [
            {
               role: 'system',
               content:
                  'Summarize the following customer reviews into a short paragraph highlighting key themes, both positive and negative',
            },
            {
               role: 'user',
               content: reviews,
            },
         ],
      });

      return response.message.content;
   },
};
