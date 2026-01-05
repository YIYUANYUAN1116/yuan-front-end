import { DrawerForm, ProTable } from "@ant-design/pro-components";
import { userBaseColumns } from "../../user/components/userColumns";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { roleAllocatedUserList } from "@/services/yuan/sysRoleController";


type Props = {
  roleId: string;
  roleName?: string;
  reload?: () => void;
};

const RoleUserListDrawerForm = ({ roleId, roleName, reload }: Props) => {
  const request =  useTableRequest(roleAllocatedUserList)
  return (
    <DrawerForm
      title={roleName + ` - 已分配用户列表`}
      trigger={
        <a>已分配用户</a>
      }
      size="middle"
      width={960}
    >
      <ProTable
        params={{roleId}}
        columns={userBaseColumns}
        request={request}
        />
    </DrawerForm>
  );
};

export default RoleUserListDrawerForm;
