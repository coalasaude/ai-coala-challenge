import { ChatTextInput } from '@/gemini-chat/components/ChatTextInput';
import { MessagesDisplay } from '@/gemini-chat/components/MessagesDisplay';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { PagePanel } from '@/ui/layout/page/components/PagePanel';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { IconMessage } from 'twenty-ui';

const StyledMainContainer = styled.div`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

const StyledBody = styled.div`
  box-sizing: border-box;
  color: ${({ theme }) => theme.font.color.primary};
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  justify-content: end;
  position: relative;
`;

export const GeminiChatPage = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!!divRef.current === true) {
      const topOffset = divRef.current.getBoundingClientRect().top;
      const leftOffset = divRef.current.getBoundingClientRect().left;
      divRef.current.style.setProperty(
        'height',
        `calc(100vh - ${topOffset}px)`,
      );
      divRef.current.style.setProperty(
        'width',
        `calc(100vw - ${leftOffset}px)`,
      );
    }
  }, []);
  return (
    <StyledMainContainer>
      <PageHeader title="Gemini Chat" Icon={IconMessage}></PageHeader>
      <PagePanel>
        <StyledBody ref={divRef}>
          <MessagesDisplay />
          <ChatTextInput />
        </StyledBody>
      </PagePanel>
    </StyledMainContainer>
  );
};
