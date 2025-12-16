import { OperationMode, OperationModes } from '@/const/Const'
import { dictAdd, dictEdit } from '@/services/yuan/sysDictDataController'
import { createLoadingRequest } from '@/util/DataRequestUtils'
import { ActionType, ModalForm, ProForm, ProFormDependency, ProFormInstance, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { useRequest } from '@umijs/max'
import { ColorPicker, Space, Tag } from 'antd'
import React, { useEffect, useRef } from 'react'
import DictLabelStyleFormItem from './DictLabelStyleFormItem'



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
    const formRef = useRef<ProFormInstance | undefined>(undefined)


    return (
        <ModalForm
            formRef={formRef}
            title={isEdit ? "编辑字典项" : "新建字典项"}
            trigger={trigger}
            initialValues={{ ...record }}
            onFinish={async (values) => {
                await run(values);
                return true;
            }}
            width={520}
            modalProps={{ okButtonProps: { loading } }}
        >
            <ProFormText name="dictCode" hidden />

            <ProFormText
                width="md"
                name="dictName"
                label="字典类型"
                initialValue={dictName}
                disabled
            />

            <DictLabelStyleFormItem
                name="listClass"
                record={record}
                formRef={formRef}
            />

            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="dictLabel"
                    label="字典标签"
                    rules={[{ required: true }]}
                />
                <ProFormText
                    width="md"
                    name="dictValue"
                    label="字典键值"
                    rules={[{ required: true }]}
                />
            </ProForm.Group>

            <ProForm.Group>
                <ProFormRadio.Group
                    name="status"
                    label="状态"
                    options={[
                        { label: '启用', value: '0' },
                        { label: '禁用', value: '1' },
                    ]}
                    initialValue={record?.status || '0'}
                    radioType="button"
                />
                <ProFormRadio.Group
                    name="isDefault"
                    label="默认"
                    options={[
                        { label: '是', value: 'Y' },
                        { label: '否', value: 'N' },
                    ]}
                    initialValue={record?.isDefault == 'Y'?'Y':'N'}
                    radioType="button"
                />
            </ProForm.Group>

            <ProForm.Group>
                <ProFormText width="xs" name="dictSort" label="排序" />
                <ProFormText width="lg" name="remark" label="备注" />
            </ProForm.Group>

            <ProFormText name="dictType" initialValue={dictType} hidden />

        </ModalForm>
    )
}
