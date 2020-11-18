import React, { useCallback, useEffect, useState } from 'react';

import { Form, Input, Button, InputNumber, Space, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LayoutApp from '../../components/Layout';
import api from '../../services/api';
import { tratarErrosForm } from '../../Utils/errors';

const Cadastro = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      investimentItems: [{}],
    });
  }, [form]);

  const handlerSave = useCallback(async (data) => {
    setLoading(true);

    try {
      await api.post('/investiments', data);

      history.push('/dashboard');
    } catch (err) {
      notification.error({
        message: 'Ocorreu um erro',
        description: err?.response?.data?.detail || 'Ocorreu um erro insperado',
        style: {
          color: '#721c24',
          backgroundColor: '#f8d7da',
          bordercolor: '#f5c6cb',
        },
      });

      const { errors } = err?.response?.data || {};

      tratarErrosForm(errors, form);
    }

    setLoading(false);
  }, []);

  const onGetQuoteStock = useCallback(async (stock) => {
    const response = await api.get(
      `/alpha-vantage/global-quote?stock=${stock}`,
    );

    const { note } = response.data?.data;

    if (note) {
      notification.warning({
        key: 'alertRateLimit',
        duration: 10,
        message: 'Aviso - Rate Limit',
        description: note || 'API com Rate',
        style: {
          color: '#856404',
          backgroundColor: '#fff3cd',
          bordercolor: '#ffeeba',
        },
      });
    }

    return response.data?.data?.globalQuote || {};
  }, []);

  const onValidatorTicker = useCallback(async (value, cb, fieldKey) => {
    if (value) {
      const globalQuote = await onGetQuoteStock(value);

      const { price } = globalQuote;

      if (!price) return cb('Ticker inválido.');

      form.setFields([
        {
          value: price,
          name: ['investimentItems', fieldKey, 'quotation'],
        },
      ]);
    }

    return cb();
  }, []);

  return (
    <LayoutApp>
      <Form
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 16 },
          md: { span: 12 },
          lg: { span: 8 },
          xl: { span: 6 },
        }}
        name="investiments"
        form={form}
        onFinish={handlerSave}
        autoComplete="off"
        requiredMark="optional"
        layout="vertical"
      >
        <Form.Item
          label="Descrição"
          name="description"
          rules={[{ required: true, message: 'Informe a descrição' }]}
        >
          <Input placeholder="Descrição" />
        </Form.Item>

        <Form.List name="investimentItems">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex' }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    wrapperCol={{
                      xs: { span: 24 },
                    }}
                    label="Ticker"
                    name={[field.name, 'ticker']}
                    fieldKey={[field.fieldKey, 'ticker']}
                    rules={[
                      { required: true, message: 'Informe o Ticker' },
                      {
                        validator: (_, value, cb) => {
                          onValidatorTicker(value, cb, field.fieldKey);
                        },
                      },
                    ]}
                    hasFeedback
                    normalize={(value) => (value || '').toUpperCase()}
                  >
                    <Input placeholder="Ticker" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    wrapperCol={{
                      xs: { span: 24 },
                    }}
                    label="Quantidade"
                    name={[field.name, 'amount']}
                    fieldKey={[field.fieldKey, 'amount']}
                    rules={[
                      { required: true, message: 'Informe a quantidade' },
                    ]}
                  >
                    <InputNumber placeholder="Quantidade" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, 'quotation']}
                    fieldKey={[field.fieldKey, 'quotation']}
                    hidden
                  >
                    <InputNumber style={{ width: '200px' }} />
                  </Form.Item>

                  {field.fieldKey !== 0 && (
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  disabled={fields.length === 3}
                  block
                  icon={<PlusOutlined />}
                >
                  Adicionar investimento
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </LayoutApp>
  );
};

export default Cadastro;
