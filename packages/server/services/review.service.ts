import OpenAI from 'openai';
import { type Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';

// Implementation detail
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

// Public interface
export const reviewService = {
   async getReviews(productId: number): Promise<Review[]> {
      return reviewRepository.getReviews(productId);
   },

   async summarizeReviews(productId: number): Promise<string> {
      // Get the last 10 reviews
      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');

      // Send the reviews to a LLM
      const prompt = `Summarize the following customer reviews into a short paragraph highlighting key themes, both positive and negative: ${joinedReviews}`;

      const response = await client.responses.create({
         model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 500,
      });

      return response.output_text;
   },
};
