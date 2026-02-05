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

    //未发起申请的携带 bizType
    const bizType = useMemo(() => {
        return sp.get('bizType') ?? undefined;
    }, [sp]);
    console.log("123", bizNo)
    console.log("123", bizType)
    const {
        data: wfData, run: fetchWFDetail, loading: loading
    } = useRequest(wfInstanceDetail, { manual: true });

    useEffect(() => {
        reload()
    }, [bizNo]);

    const reload = async () => {
        if (bizNo) await fetchWFDetail({ bizNo });
    };

    return (
        <PageContainer
            title="申请详细"
            onBack={() => history.back()}
            loading={loading}
            footer={[
                <WorkFlowActionPanel
                    bizNo={bizNo}
                    wfData={wfData}
                    reload={reload}
                />
            ]}
        >
            <Space orientation='vertical' >
                {
                    (bizType == 'Leave' || wfData?.biz?.bizType == "Leave") && (<LeaveDetail
                        bizNo={bizNo}
                    />)
                }

                {
                    (wfData && <WfFlowProgressBar
                        layers={wfData?.layers}
                        timeline={wfData?.timeline}
                    />)
                }

                {
                    wfData && <WorkFlowHistory
                        bizNo={bizNo}
                        wfData={wfData}
                    />
                }

            </Space>


        </PageContainer >

    )
}

export default index