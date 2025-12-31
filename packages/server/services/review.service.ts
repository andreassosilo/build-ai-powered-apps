import { reviewRepository } from '../repositories/review.repository';
import template from '../llm/prompts/summarize-reviews.txt';
import { llmClient } from '../llm/client';

// Public interface
export const reviewService = {
   async summarizeReviews(productId: number): Promise<string> {
      // Check if there's already an existing summary
      const existingSummary =
         await reviewRepository.getReviewSummary(productId);
      if (existingSummary) {
         return existingSummary;
      }

      // Get the last 10 reviews
      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');

      // Send the reviews to a LLM
      const prompt = template.replace(`{{reviews}}`, joinedReviews);

      const response = await llmClient.generateText({
         model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
         prompt,
         temperature: 0.2,
         maxTokens: 500,
      });

      // Store in database
      const summary = response.text;
      await reviewRepository.storeReviewSummary(productId, summary);

      return summary;
   },
};
