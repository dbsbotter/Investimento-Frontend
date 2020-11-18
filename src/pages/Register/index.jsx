import React, { useCallback, useState } from 'react';
import { Layout, Form, Input, Button, notification } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { SectionStyled, ButtonStyle } from './styles';
import { useAuth } from '../../hooks/auth';
import { tratarErrosForm } from '../../Utils/errors';

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { Content } = Layout;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { offset: 6, span: 12 },
      lg: { offset: 9, span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { offset: 6, span: 12 },
      lg: { offset: 9, span: 6 },
    },
  };

  const { register } = useAuth();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true);

        await register(data);

        history.push('/');
      } catch (err) {
        setLoading(false);

        notification.error({
          message: 'Ocorreu um erro',
          description:
            err?.response?.data?.detail || 'Ocorreu um erro insperado',
          style: {
            color: '#721c24',
            backgroundColor: '#f8d7da',
            bordercolor: '#f5c6cb',
          },
        });

        const { errors } = err?.response?.data || {};

        tratarErrosForm(errors, form);
      }
    },
    [register],
  );

  return (
    <SectionStyled>
      <Layout>
        <Content>
          <Form
            {...formItemLayout}
            name="signin"
            onFinish={handleSubmit}
            layout="vertical"
            size="middle"
            requiredMark="optional"
            form={form}
          >
            <Form.Item
              label="Usuário"
              name="username"
              rules={[{ required: true, message: 'Informe seu usuário!' }]}
            >
              <Input placeholder="Usuário" />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[{ required: true, message: 'Informe sua senha!' }]}
            >
              <Input.Password placeholder="Senha" />
            </Form.Item>

            <ButtonStyle className="teste">
              <Link to="/">
                <Button type="default" htmlType="button">
                  Voltar
                </Button>
              </Link>
              <Button loading={loading} type="primary" htmlType="submit">
                Cadastrar-se
              </Button>
            </ButtonStyle>
          </Form>
        </Content>
      </Layout>
    </SectionStyled>
  );
};

export default Register;
