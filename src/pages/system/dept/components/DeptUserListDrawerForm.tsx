import { DrawerForm, ProTable } from "@ant-design/pro-components";
import { userBaseColumns } from "../../user/components/userColumns";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { deptAllocatedUserList } from "@/services/yuan/sysDeptController";

type Props = {
  deptId: string;
  deptName?: string;
  reload?: () => void;
};

const DeptUserListDrawerForm = ({ deptId, deptName, reload }: Props) => {
  const request = useTableRequest(deptAllocatedUserList)
  return (
    <DrawerForm
      title={deptName + ` - 已分配用户列表`}
      trigger={
        <a>已分配用户</a>
      }
      size="middle"
      width={960}
    >
      <ProTable
        params={{ deptId }}
        columns={userBaseColumns}
        request={request}
      />
    </DrawerForm>
  );
};

export default DeptUserListDrawerForm;
