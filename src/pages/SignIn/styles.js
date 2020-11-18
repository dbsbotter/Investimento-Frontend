import styled from 'styled-components';
import { Form } from 'antd';

const FormItem = Form.Item;

export const SectionStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonStyle = styled(FormItem)`
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: space-between;
  }
`;
