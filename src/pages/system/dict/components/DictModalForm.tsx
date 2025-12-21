import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { dictTypeAdd, dictTypeEdit } from '@/services/yuan/sysDictTypeController';

import { ActionType, ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import React from 'react'

interface DictModalFormProps {
    mode: OperationMode;
    trigger?: React.ReactNode;
    reload?: ActionType['reload'];
    record?: API.SysDictTypeVo;
}

const DictModalForm = (props: DictModalFormProps) => {
    const { mode, trigger, reload, record } = props;
    const isEdit = mode == OperationModes.EDIT
    const { run: run, loading: loading } = useActionRequest(isEdit ? dictTypeEdit : dictTypeAdd, reload)

    return (
        <ModalForm
            title={isEdit ? "编辑字典" : "新建字典"}
            trigger={trigger}
            initialValues={{ ...record }}
            onFinish={async (values) => {
                run(values);
                return true;
            }}
            width={400}
            modalProps={{ okButtonProps: { loading } }}
        >
            <ProFormText width="md" name="dictId" hidden />
            <ProFormText
                width="md"
                name="dictName"
                label="字典名称"
                placeholder="请输入字典名称"
                rules={[{ required: true, message: '请输入字典名称' }]}
            />

            <ProFormText
                width="md"
                name="dictType"
                label="字典类型"
                rules={[{ required: true, message: '请输入字典类型' }]}
                placeholder="请输入字典类型"
                tooltip="使用英文/下划线命名, 如:sys_normal_disable"
            />
            <ProFormText
                width="md"
                name="remark"
                label="备注"
            />
        </ModalForm>
    )
}

export default DictModalForm