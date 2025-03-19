import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { PagePanel } from '@/ui/layout/page/components/PagePanel';
import styled from '@emotion/styled';

const StyledMainContainer = styled.div`
  width: 100%;
`;

const StyledBody = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const GeminiChatPage = () => {
  return (
    <StyledMainContainer>
      <PageHeader title="Gemini Chat"></PageHeader>
      <PagePanel>
        <StyledBody>Chat Goes here</StyledBody>
      </PagePanel>
    </StyledMainContainer>
  );
};
