import { OperationMode, OperationModes } from '@/const/Const'
import { dictAdd, dictEdit } from '@/services/yuan/sysDictDataController'
import { ActionType, ModalForm, ProForm, ProFormInstance, ProFormRadio, ProFormText } from '@ant-design/pro-components'
import React, { useRef } from 'react'
import DictLabelStyleFormItem from './DictLabelStyleFormItem'
import { useActionRequest } from '@/hooks/action/useActionRequest'
import { dictCache } from '@/hooks/dict/dictCache'



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
    const { run: run, loading: loading } = useActionRequest(isEdit ? dictEdit : dictAdd, reload)
    const formRef = useRef<ProFormInstance | undefined>(undefined)


    return (
        <ModalForm
            formRef={formRef}
            title={isEdit ? "编辑字典项" : "新建字典项"}
            trigger={trigger}
            initialValues={{ ...record }}
            onFinish={async (values) => {
                run(values);
                console.log(record?.dictType)
                dictCache.delete(record?.dictType)
                return true;
            }}
            width={520}
            size='middle'
            modalProps={{ okButtonProps: { loading } }}
        >
            <ProFormText name="dictCode" hidden />

            <ProFormText
               
                name="dictName"
                label="字典类型"
                initialValue={dictName}
                disabled
            />

            <DictLabelStyleFormItem
                name="listClass"
                record={record}
            />

            <ProForm.Group>
                <ProFormText
                   
                    name="dictLabel"
                    label="字典标签"
                    rules={[{ required: true }]}
                />
                <ProFormText
                   
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
                    radioType="button"
                    fieldProps={{
                        buttonStyle: "solid",
                        defaultValue: '0'
                    }}
                />
                <ProFormRadio.Group
                    name="isDefault"
                    label="默认"
                    options={[
                        { label: '是', value: 'Y' },
                        { label: '否', value: 'N' },
                    ]}
                    fieldProps={{
                        buttonStyle: "solid",
                        defaultValue: 'Y'
                    }}
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
