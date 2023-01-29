import PageContainer from '@/components/PageContainer';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { ClusterItemResult, getClusterList } from './module';
import { useRef, useState } from 'react';
import { Button, Form, Input, Modal, Tag } from 'antd';
import Header from '@/components/Header';
import { Link } from 'umi';
import { useFormModal } from '@/hooks/useFormModal';

type TableItem = ClusterItemResult;

export default function Devices() {
  const tableRef = useRef<ActionType>();
  const [searchParams, setSearchParams] = useState({ search_keywords: '' });
  const { form, formModal, formModalShow, formModalClose, formModalTitle } = useFormModal();

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'name',
      title: '集群名称',
      hideInSearch: true,
    },
    {
      dataIndex: 'port',
      title: '端口',
      hideInSearch: true,
    },
    {
      dataIndex: 'status',
      title: '状态',
      hideInSearch: true,
      render: (_, row) => {
        return row.status ? <Tag color="green">正常</Tag> : <Tag color="red">异常</Tag>;
      },
    },
    {
      dataIndex: 'operate',
      title: '操作',
      hideInSearch: true,
      render: () => {
        return <Link to={`/cluster/132`}>查看</Link>;
      },
    },
  ];

  return (
    <>
      <Header />
      <PageContainer>
        <ProTable<TableItem>
          size="small"
          columns={columns}
          rowKey="code"
          bordered
          search={false}
          request={() => {
            return getClusterList().then(({ data }) => {
              return { data: data.data || [], total: data.data.length };
            });
          }}
          actionRef={tableRef}
          headerTitle={
            <Input.Search
              value={searchParams.search_keywords}
              onChange={(e) => {
                setSearchParams((state) => ({
                  ...state,
                  search_keywords: e.target.value.trim(),
                }));
              }}
              style={{ width: 400 }}
              placeholder="请输入集群名搜索"
              enterButton={<>搜索</>}
              onSearch={() => {
                tableRef.current?.reload();
              }}
            />
          }
          toolBarRender={() => [
            <Button
              key="create"
              type="primary"
              onClick={() => {
                formModalShow();
              }}
            >
              新建
            </Button>,
          ]}
        />
      </PageContainer>
      <Modal open={formModal.open} title={`${formModalTitle}集群`} onCancel={formModalClose}>
        <br />
        <Form form={form} labelCol={{ span: 4 }}>
          <Form.Item name="name" label="集群名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="port" label="端口号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
