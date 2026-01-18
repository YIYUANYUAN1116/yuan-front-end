import { OperationMode, OperationModes } from '@/const/Const';
import { DictEnum } from '@/const/dict-enum';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { wfDefinitionAdd, wfDefinitionEdit } from '@/services/yuan/wfDefinitionController';
import { type ActionType, DrawerForm, ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
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
    const bizTypeEnum = useDictDataValueEnum(DictEnum.WF_BIZ_TYPE);

    return (
        <DrawerForm<API.WfDefinitionBo>
            title={isEdit ? '编辑' : '新建'}
            trigger={trigger}
            form={form}
            initialValues={record}
            onFinish={async (values) => {
                run(values);
                return true;
            }}
            width={520}
            size='middle'

        >
            <ProFormText
                name="definitionName"
                label="流程名称"
                placeholder="请输入流程名称"
                rules={[{ required: true, message: '请输入流程名称' }]}
            />
            <ProFormSelect
                name="definitionKey"
                label="流程业务标识"
                placeholder="请输入流程业务标识"
                valueEnum={bizTypeEnum}
                rules={[{ required: true, message: '请选择流程业务标识' }]}
            />

            {/* <ProFormText
                name="version"
                label="版本号"
                placeholder="请输入版本号"
                rules={[{ required: true, message: '请输入版本号' }]}
            /> */}

            <ProFormText
                name="remark"
                label="备注"
                placeholder="请输入备注"

            />

            {/* 隐藏的id，只在编辑时用 */}
            <ProFormText name="id" hidden />
        </DrawerForm>
    );
};

export default DefinitionModalForm;
