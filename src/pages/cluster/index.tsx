import PageContainer from '@/components/PageContainer';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import {
  ClusterItemResult,
  CreateClusterBody,
  createCluster,
  getClusterList,
  SelectDevices,
  updateCluster,
} from './module';
import { useRef } from 'react';
import { Button, Form, Input, Modal, Space, Tag } from 'antd';
import Header from '@/components/Header';
import { Link } from 'umi';
import { ModalType, useFormModal } from '@/hooks/useFormModal';

type TableItem = ClusterItemResult;

export default function Devices() {
  const tableRef = useRef<ActionType>();
  // const [searchParams, setSearchParams] = useState({ search_keywords: '' });
  const { form, formModal, formModalShow, formModalClose, submitHandler, formModalTitle } =
    useFormModal<CreateClusterBody & { id?: string }>({
      submit: (values, modal) => {
        if (modal.type === ModalType.UPDATE) {
          return updateCluster({
            ...values,
            id: values.id!,
          }).then(() => {
            tableRef.current?.reload();
          });
        }
        return createCluster(values).then(() => {
          tableRef.current?.reload();
        });
      },
    });

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'name',
      title: '集群名称',
      hideInSearch: true,
    },
    {
      dataIndex: 'device_list',
      title: '设备数',
      hideInSearch: true,
      render: (_, row) => {
        return row.device_list.length;
      },
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
      width: 160,
      render: (_, { name, device_list, id }) => {
        return (
          <Space>
            <a
              onClick={() => {
                form.setFieldsValue({
                  name,
                  device_list,
                  id,
                });
                formModalShow(ModalType.UPDATE);
              }}
            >
              编辑
            </a>
            <Link to={`/cluster/132`}>查看</Link>
          </Space>
        );
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
              return { data: data.data || [], total: data.data?.length || 0 };
            });
          }}
          actionRef={tableRef}
          // headerTitle={
          //   <Input.Search
          //     value={searchParams.search_keywords}
          //     onChange={(e) => {
          //       setSearchParams((state) => ({
          //         ...state,
          //         search_keywords: e.target.value.trim(),
          //       }));
          //     }}
          //     style={{ width: 400 }}
          //     placeholder="请输入集群名搜索"
          //     enterButton={<>搜索</>}
          //     onSearch={() => {
          //       tableRef.current?.reload();
          //     }}
          //   />
          // }
          toolBarRender={() => [
            <Button
              key="create"
              type="primary"
              onClick={() => {
                form.resetFields();
                formModalShow();
              }}
            >
              新建
            </Button>,
          ]}
        />
      </PageContainer>
      <Modal
        open={formModal.open}
        title={`${formModalTitle}集群`}
        onCancel={formModalClose}
        onOk={submitHandler}
      >
        <br />
        <Form form={form} labelCol={{ span: 4 }}>
          {formModal.type === ModalType.UPDATE && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}
          <Form.Item name="name" label="集群名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="device_list"
            label="设备"
            rules={[{ required: true, message: '请选择设备' }]}
          >
            <SelectDevices />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
