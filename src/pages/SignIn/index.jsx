import React, { useCallback, useState } from 'react';
import { Layout, Form, Input, Button, Col, Row, notification } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { SectionStyled, ButtonStyle } from './styles';
import { useAuth } from '../../hooks/auth';
import { tratarErrosForm } from '../../Utils/errors';

const SignIn = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true);

        await signIn(data);
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
    [signIn],
  );

  return (
    <SectionStyled>
      <Layout>
        <Content>
          <Row className="text-center">
            <Col {...formItemLayout.wrapperCol}>
              <DollarOutlined style={{ fontSize: '120px', color: '#08c' }} />
            </Col>
          </Row>
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

            <ButtonStyle>
              <Button loading={loading} type="primary" htmlType="submit">
                Entrar
              </Button>
              <Link to="/register">
                <Button type="ghost" htmlType="button">
                  Registrar
                </Button>
              </Link>
            </ButtonStyle>
          </Form>
        </Content>
      </Layout>
    </SectionStyled>
  );
};

export default SignIn;
