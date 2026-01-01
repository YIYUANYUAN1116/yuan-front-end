import React, { useMemo, useState } from 'react';
import { DrawerForm, ModalForm } from '@ant-design/pro-components';
import { Button, Space, Typography, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Text } = Typography;

interface PreviewJsonFormProps {
    trigger?: React.ReactNode;
    jsonData?: any; // 传 lf.getGraphData() 或你后端需要的结构
    title?: string;
    definitionName?:string;
}

export const PreviewJsonForm: React.FC<PreviewJsonFormProps> = (props) => {
    const { trigger, jsonData, title = 'JSON 预览' ,definitionName} = props;
    const [pretty, setPretty] = useState(true);
    const [msgApi, ctx] = message.useMessage();

    const jsonText = useMemo(() => {
        try {
            return pretty
                ? JSON.stringify(jsonData ?? {}, null, 2)
                : JSON.stringify(jsonData ?? {});
        } catch {
            return String(jsonData ?? '');
        }
    }, [jsonData, pretty]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(jsonText);
            msgApi.success('已复制到剪贴板');
        } catch {
            msgApi.error('复制失败（可能浏览器权限限制）');
        }
    };

    const download = () => {
        const blob = new Blob([jsonText], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = definitionName+'-流程Json.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            {ctx}
            <DrawerForm
                title={title+' - '+definitionName}
                trigger={trigger}
                submitter={false}
                drawerProps={{
                    destroyOnClose: true,
                }}
                width={720}
            >
                <Space style={{ marginBottom: 12 }}>
                    <Button onClick={() => setPretty((v) => !v)}>
                        {pretty ? '切换为压缩' : '切换为格式化'}
                    </Button>
                    <Button onClick={copy}>复制</Button>
                    <Button onClick={download}>下载 JSON</Button>
                    <Text type="secondary">（建议提交给后端前先预览确认）</Text>
                </Space>

                <TextArea
                    value={jsonText}
                    readOnly
                    spellCheck={false}
                    autoSize={{ minRows: 24, maxRows: 32 }}
                    style={{
                        fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        fontSize: 12,
                        lineHeight: 1.6,
                    }}
                />
            </DrawerForm>
        </>
    );
};
