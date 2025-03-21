import { FetchAssistantResponse } from '@/gemini-chat/hooks/useAssistantData';
import { LANGGRAPH_SERVER_BASE_URL } from '~/config';

export type fetchAssistantResponseOrThrowProps = {
  query: string;
  parameters: {
    configurable: {
      thread_id: string;
      [key: string]: any;
    };
    [key: string]: any;
  } | null;
};

export const fetchAssistantResponseOrThrow = async ({
  query,
  parameters = null,
}: fetchAssistantResponseOrThrowProps): Promise<
  FetchAssistantResponse | undefined
> => {
  try {
    const response = await fetch(`${LANGGRAPH_SERVER_BASE_URL}/invoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, parameters }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data?.message || data?.error || 'Failed to fetch data');
    }
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
