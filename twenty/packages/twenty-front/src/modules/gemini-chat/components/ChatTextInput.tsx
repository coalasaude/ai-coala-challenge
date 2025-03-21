import { useAssistantData } from '@/gemini-chat/hooks/useAssistantData';
import { chatState, ChatState } from '@/gemini-chat/states/chatState';
import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

const StyledContainer = styled.div`
  box-sizing: border-box;
  margin: ${({ theme }) => theme.spacing(4)};
  display: flex;
  position: relative;
  z-index: 10;
`;

const StyledTextInput = styled.input<{ loading: boolean }>`
  background: ${({ theme }) => theme.background.noisy};
  padding: ${({ theme }) => theme.spacing(4.5)};
  color: ${({ theme }) => theme.font.color.primary};
  appearance: none;
  border: 1px solid ${({ theme }) => theme.border.color.strong};
  border-radius: ${({ theme }) => theme.border.radius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.strong};
  flex-grow: 1;

  &:focus {
    outline: none;
    border-width: 2px;
    padding: ${({ theme }) => theme.spacing(4.25)};
    box-shadow: none;
    appearance: none;
  }
`;

const StyledButton = styled.button`
  align-items: center;
  appearance: none;
  border: 1px solid ${({ theme }) => theme.border.color.strong};
  border-radius: ${({ theme }) => theme.border.radius.md};
  background: none;
  color: ${({ theme }) => theme.font.color.primary};
  cursor: pointer;
  letter-spacing: 0.5px;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  position: absolute;
  right: ${({ theme }) => theme.spacing(2)};
  top: ${({ theme }) => theme.spacing(2)};

  &:hover {
    background: ${({ theme }) => theme.accent.accent4060};
    border: 1px solid ${({ theme }) => theme.accent.accent4060};
    transition: all 0.5s ease-in-out;
    box-shadow: ${({ theme }) => theme.boxShadow.underline};
  }

  &:disabled {
    background: ${({ theme }) => theme.background.quaternary};
    border: 1px solid ${({ theme }) => theme.background.tertiary};
    color: ${({ theme }) => theme.font.color.tertiary};
    cursor: default;
  }
`;

export const ChatTextInput = () => {
  const [chat, setChat] = useRecoilState<ChatState>(chatState);
  const [loading, setLoading] = useState(false);
  const parameters = useMemo(
    () =>
      chat.threadId ? { configurable: { thread_id: chat.threadId } } : null,
    [chat.threadId],
  );
  const { fetchAssistantResponse } = useAssistantData();

  const handleSubmit = async () => {
    setLoading(true);
    setChat((oldChat) => ({
      ...oldChat,
      messages: [...oldChat.messages, { type: 'human', content: chat.query }],
    }));
    const response = await fetchAssistantResponse({
      query: chat.query,
      parameters,
    });
    if (!!response === true) {
      setChat((oldChat) => ({
        threadId: response.thread_id,
        messages: [...oldChat.messages, ...response.messages],
        query: '',
      }));
    } else {
      setChat((oldChat) => ({
        ...oldChat,
        messages: [...oldChat.messages.slice(0, -1)],
      }));
    }
    setLoading(false);
  };

  return (
    <StyledContainer>
      <StyledTextInput
        type="text"
        placeholder="Qual sua dúvida?"
        loading={loading}
        value={chat.query}
        onChange={(event) =>
          setChat((oldChat) => ({
            ...oldChat,
            query: event.currentTarget.value,
          }))
        }
      />
      <StyledButton
        type="button"
        disabled={!chat.query || loading}
        onClick={() => handleSubmit()}
      >
        Enviar
      </StyledButton>
    </StyledContainer>
  );
};
