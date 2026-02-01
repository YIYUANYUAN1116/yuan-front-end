import WfFlowProgressBar from '@/components/WorkFlow/WfFlowProgressBar';
import WorkFlowActionPanel from '@/components/WorkFlow/WorkFlowActionPanel';
import WorkFlowHistory from '@/components/WorkFlow/WorkFlowHistory';
import LeaveDetail from '@/pages/oa/leave/detail/LeaveDetail';
import { wfInstanceDetail } from '@/services/yuan/wfInstanceController';
import { PageContainer, ProCard, ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components'
import { useRequest, useSearchParams } from '@umijs/max';
import { Space } from 'antd';
import { useEffect, useMemo } from 'react'



const index = () => {

    const [sp] = useSearchParams();
    const bizNo = useMemo(() => {
        return sp.get('bizNo') ?? undefined;
    }, [sp]);

    const {
        data: wfData, run: fetchWFDetail,
    } = useRequest(wfInstanceDetail, { manual: true });

    useEffect(() => {
        reload()
    }, [bizNo]);

    const reload = async () => {
        if (bizNo) await fetchWFDetail({ bizNo });
    };

    return (
        <PageContainer
            title="请假详情"
            onBack={() => history.back()}
            footer={[
                <WorkFlowActionPanel
                    bizNo={bizNo}
                    wfData={wfData}
                    reload={reload}
                />
            ]}
        >
            <Space orientation='vertical'>
                {
                    wfData?.biz?.bizType == "Leave" && (<LeaveDetail
                        bizNo={bizNo}
                    />)
                }

                <WfFlowProgressBar
                    layers={wfData?.layers}
                    timeline={wfData?.timeline}
                />

                <WorkFlowHistory
                    bizNo={bizNo}
                    wfData={wfData}
                />
            </Space>


        </PageContainer >

    )
}

export default index