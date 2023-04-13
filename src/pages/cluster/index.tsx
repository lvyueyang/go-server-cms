import PageContainer from '@/components/PageContainer';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import {
  ClusterItemResult,
  CreateClusterBody,
  createCluster,
  getClusterList,
  SelectDevices,
  updateCluster,
  deleteCluster,
} from './module';
import { useRef } from 'react';
import {
  Alert,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Tag,
  Tooltip,
} from 'antd';
import Header from '@/components/Header';
import { Link } from 'umi';
import { ModalType, useFormModal } from '@/hooks/useFormModal';
import { CLUSTER_TYPE } from '@/constants';
import { redundancyCount } from '@/utils';

type TableItem = ClusterItemResult;

export default function Cluster() {
  const tableRef = useRef<ActionType>();
  // const [searchParams, setSearchParams] = useState({ search_keywords: '' });
  const {
    submitLoading,
    form,
    formModal,
    formModalShow,
    formModalClose,
    submitHandler,
    formModalTitle,
  } = useFormModal<CreateClusterBody & { id?: string }>({
    submit: (values, modal) => {
      if (modal.type === ModalType.UPDATE) {
        return updateCluster({
          ...values,
          raid_status: !!values.raid_status,
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

  const cluster_type = Form.useWatch('cluster_type', form);
  const device_list = Form.useWatch('device_list', form);
  const redundancy_count = redundancyCount(device_list?.length || 0);
  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'name',
      title: '集群名称',
      hideInSearch: true,
    },
    {
      dataIndex: 'cluster_type',
      title: '集群类型',
      hideInSearch: true,
      render: (value, row) => {
        const cname =
          Object.values(CLUSTER_TYPE).find((item) => item.id === row.cluster_type)?.label || value;
        if (value === CLUSTER_TYPE.GLUSTERD.id) {
          return (
            <>
              {cname}{' '}
              <Tooltip title="冗余盘数">
                <Tag>{redundancyCount(row.device_list.length)}</Tag>
              </Tooltip>
            </>
          );
        }
        return cname;
      },
    },
    {
      dataIndex: 'raid_status',
      title: '是否 raid',
      renderText: (_, row) => {
        return row.raid_status ? '是' : '否';
      },
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
      render: (_, { name, device_list, id, cluster_type }) => {
        return (
          <Space>
            <a
              onClick={() => {
                form.setFieldsValue({
                  name,
                  device_list,
                  id,
                  cluster_type,
                });
                formModalShow(ModalType.UPDATE);
              }}
            >
              编辑
            </a>
            <Popconfirm
              title="确定要删除这个集群吗？"
              onConfirm={() => {
                const close = message.loading('删除中...');
                deleteCluster(id)
                  .then(() => {
                    message.success('删除成功');
                    tableRef.current?.reload();
                  })
                  .finally(() => {
                    close();
                  });
              }}
            >
              <a>删除</a>
            </Popconfirm>
            <Link to={`/cluster/${id}`}>查看</Link>
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
          columns={columns}
          rowKey="id"
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
        maskClosable={false}
        open={formModal.open}
        title={`${formModalTitle}集群`}
        onCancel={formModalClose}
        onOk={submitHandler}
        okButtonProps={{
          loading: submitLoading,
        }}
      >
        <br />
        <Form form={form} labelCol={{ span: 4 }} initialValues={{ redundancy_count: 1 }}>
          {formModal.type === ModalType.UPDATE && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}
          <Form.Item name="name" label="集群名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cluster_type" label="集群类型" rules={[{ required: true }]}>
            <Select
              disabled={formModal.type === ModalType.UPDATE}
              options={Object.values(CLUSTER_TYPE).map((item) => ({
                value: item.id,
                label: item.label,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item name="raid_status" label="是否raid">
            <Switch />
          </Form.Item>
          <Form.Item
            name="device_list"
            label="设备"
            rules={[{ required: true, message: '请选择设备' }]}
          >
            <SelectDevices clusterType={cluster_type} />
          </Form.Item>
          {cluster_type === CLUSTER_TYPE.GLUSTERD.id && (
            <Form.Item label="冗余盘数" name="redundancy_count">
              <Space align="center">{redundancy_count}</Space>
            </Form.Item>
          )}
          {formModal.type === ModalType.CREATE && (
            <Alert message="请先确保设备已初始化和格式化" type="warning" showIcon />
          )}
        </Form>
      </Modal>
    </>
  );
}
