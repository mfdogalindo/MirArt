import 'server-only';

import { OpenAIApi, Configuration, CreateChatCompletionResponse } from 'openai';

export class OpenAIService {
  private configuration: Configuration;
  private openai : OpenAIApi;

  constructor () {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  getProductDescription (prompt: string): Promise<CreateChatCompletionResponse> {
    const response = this.openai.createChatCompletion({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 1,
      max_tokens: 512
    });
    return response.then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
      return error;
    }
    );
  }
}