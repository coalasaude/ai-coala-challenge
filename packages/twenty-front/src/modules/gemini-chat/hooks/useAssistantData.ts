import { ChatMessages } from '@/gemini-chat/states/chatState';
import {
  fetchAssistantResponseOrThrow,
  fetchAssistantResponseOrThrowProps,
} from '@/gemini-chat/utils/fetchAssistantResponseOrThrow';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { useCallback } from 'react';

export type FetchAssistantResponse = {
  thread_id: string;
  messages: ChatMessages[];
};

export const useAssistantData = () => {
  const { enqueueSnackBar } = useSnackBar();

  const fetchAssistantResponse = useCallback(
    async ({
      query,
      parameters,
    }: fetchAssistantResponseOrThrowProps): Promise<
      FetchAssistantResponse | undefined
    > => {
      try {
        return await fetchAssistantResponseOrThrow({
          query,
          parameters,
        });
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackBar(
            `Something went wrong while fetching webhook usage: ${error.message}`,
            {
              variant: SnackBarVariant.Error,
            },
          );
        }
      }
    },
    [enqueueSnackBar],
  );

  return { fetchAssistantResponse };
};
