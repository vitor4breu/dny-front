// styles.ts
import styled from 'styled-components';
import { 
  Box, 
  Button, 
  Table, 
  TableRow, 
  TableCell 
} from '@mui/material';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

export const NewContractButton = styled(Button)`
  && {
    font-weight: bold;
    font-size: 0.9rem;
    line-height: 24px;
  }
`;

export const StyledTable = styled(Table)`
  && {
    border-collapse: separate;
    border-spacing: 0 5px;
  }
`;

export const HeaderRow = styled(TableRow)`
  && {
    background-color: #EFEFEF;
    
    th {
      border-bottom: none;
      padding: 4px 16px;
      font-weight: bold;
      font-size: 1rem;
    }
  }
`;

export const ContentRow = styled(TableRow)`
  && {
    background-color: #EFEFEF;
    
    td {
      border-bottom: none;
      padding: 4px 16px;
      font-weight: bold;
    }
  }
`;

export const LoadingCell = styled(TableCell)`
  && {
    text-align: center;
    padding: 16px;
  }
`;

export const DrawerContent = styled(Box)`
  padding: 24px;
`;