import { OperationMode, OperationModes } from '@/const/Const'
import { dictAdd, dictEdit } from '@/services/yuan/sysDictDataController'
import { createLoadingRequest } from '@/util/DataRequestUtils'
import { ActionType, ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components'
import { useRequest } from '@umijs/max'
import React, { useEffect } from 'react'


interface DictDataModalFormProps {
    mode: OperationMode
    trigger?: React.ReactNode
    record?: API.SysDictDataVo
    reload?: ActionType['reload'],
    dictName?: string,
    dictType?: string
}

export default function DictDataModalForm(props: DictDataModalFormProps) {
    const { mode, trigger, record, reload, dictName, dictType } = props;
    const isEdit = mode == OperationModes.EDIT
    const { run: run, loading: loading } = createLoadingRequest(isEdit ? dictEdit : dictAdd, reload)
    return (
        <ModalForm
            title={isEdit ? "编辑字典项" : "新建字典项"}
            trigger={trigger}
            initialValues={{ ...record }}
            onFinish={async (values) => {
                await run(values);
                return true;
            }}
            width={400}
            modalProps={{ okButtonProps: { loading } }}
        >
            <ProFormText width="md" name="dictCode" hidden />

            <ProFormText
                width="md"
                name="dictName"
                label="字典类型"
                initialValue={dictName}
                disabled
            />

            <ProFormText
                width="md"
                name="dictLabel"
                label="字典标签"
                rules={[{ required: true, message: '请输入字典标签' }]}
                placeholder="请输入字典标签"
            />

            <ProFormText
                width="md"
                name="dictValue"
                label="字典键值"
                rules={[{ required: true, message: '请输入字典键值' }]}
                placeholder="请输入字典键值"
            />

            <ProFormText
                width="md"
                name="dictType"
                label="字典类型"
                initialValue={dictType}
                hidden
            />

            <ProFormRadio.Group
                name="isDefault"
                label="默认"
                options={[
                    { label: '是', value: 'Y' },
                    { label: '否', value: 'N' }
                ]}
                initialValue={record?.isDefault || 'N'}
                fieldProps={{
                    buttonStyle: "solid",
                }}
            />

            <ProFormRadio.Group
                width="md"
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
                options={[
                    { label: '启用', value: '0' },
                    { label: '禁用', value: '1' }
                ]}
                initialValue={record?.status || '0'}
                fieldProps={{
                    buttonStyle: "solid",
                }}
                radioType="button"
            />

            <ProFormText
                width="md"
                name="dictSort"
                label="排序"
            />

            <ProFormText
                width="md"
                name="remark"
                label="备注"
            />

        </ModalForm>
    )
}
