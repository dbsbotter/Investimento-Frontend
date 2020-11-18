import React, { useEffect, useState } from 'react';

import { notification, Skeleton, Table } from 'antd';
import LayoutApp from '../../components/Layout';
import api from '../../services/api';
import { dinheiro } from '../../Utils/formatters';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const columns = [
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text) => {
        return dinheiro(text, 'R$');
      },
    },
  ];

  const columnsChildren = [
    { title: 'Ticker', dataIndex: 'ticker', key: 'ticker' },
    {
      title: 'Quantidade',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Preço',
      dataIndex: 'quotation',
      key: 'quotation',
      render: (text) => {
        return dinheiro(text, 'R$');
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text) => {
        return dinheiro(text, 'R$');
      },
    },
  ];

  useEffect(() => {
    (async function func() {
      setLoading(true);
      try {
        const response = await api.get('/investiments');
        setResult(response.data.data);
      } catch (err) {
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
      }
      setLoading(false);
    })();
  }, [setLoading, setResult]);

  const expandedRowRender = (x) => {
    return (
      <Table
        rowKey="id"
        columns={columnsChildren}
        dataSource={x.investimentItems}
        pagination={false}
      />
    );
  };

  return (
    <LayoutApp>
      <Skeleton loading={loading} active>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={result}
          expandable={{ expandedRowRender }}
        />
      </Skeleton>
    </LayoutApp>
  );
};

export default Dashboard;
