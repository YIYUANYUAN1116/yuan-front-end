import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { wfDefinitionAdd, wfDefinitionEdit } from '@/services/yuan/wfDefinitionController';
import { type ActionType, ModalForm, ProFormText } from '@ant-design/pro-components';
import { Form } from 'antd';
import { type FC } from 'react';


interface DefinitionModalFormProps {
    mode: OperationMode;
    trigger?: React.ReactNode;
    reload?: ActionType['reload'];
    record?: API.WfDefinitionVo;
}

const DefinitionModalForm: FC<DefinitionModalFormProps> = ({
    mode,
    trigger,
    reload,
    record,
}) => {
    const isEdit = mode === OperationModes.EDIT;
    const { run: run, loading: loading } = useActionRequest(isEdit ? wfDefinitionEdit : wfDefinitionAdd, reload)
    const [form] = Form.useForm<API.WfDefinitionBo>();


    return (
        <ModalForm<API.WfDefinitionBo>
            title={isEdit ? '编辑' : '新建'}
            trigger={trigger}
            form={form}
            initialValues={record}
            modalProps={{ okButtonProps: { loading } }}
            onFinish={async (values) => {
                run(values);
                return true;
            }}

        >
            <ProFormText
                width="md"
                name="definitionName"
                label="流程名称"
                placeholder="请输入流程名称"
                rules={[{ required: true, message: '请输入流程名称' }]}
            />
            <ProFormText
                width="md"
                name="definitionKey"
                label="流程业务标识"
                placeholder="请输入流程业务标识"
                rules={[{ required: true, message: '请输入流程业务标识' }]}
            />

            <ProFormText
                width="md"
                name="version"
                label="版本号"
                placeholder="请输入版本号"
                rules={[{ required: true, message: '请输入版本号' }]}
            />


            <ProFormText
                width="md"
                name="remark"
                label="备注"
                placeholder="请输入备注"

            />

            <ProFormText
                width="md"
                name="status"
                label="状态"
                placeholder="请输入状态"

            />

            {/* 隐藏的id，只在编辑时用 */}
            <ProFormText name="id" hidden />
        </ModalForm>
    );
};

export default DefinitionModalForm;
