import { DrawerForm } from "@ant-design/pro-components";
import RoleUserTable from "./RoleUserTable";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { selectAuthUserAll, unallocatedUserList } from "@/services/yuan/sysRoleController";

type Props = {
  roleId:  string;
  reload: () => void;
  triggerText?: string;
};

const AuthUserListDrawerForm = ({ triggerText = "新增", roleId, reload }: Props) => {
  return (
    <DrawerForm
      title="可分配用户列表"
      trigger={
        <Button type="primary" icon={<PlusOutlined />}>
          {triggerText}
        </Button>
      }
      drawerProps={{
        destroyOnClose: true,
        closable: true,
      }}
      submitter={false}
    >
      <RoleUserTable
        model="N"
        roleId={roleId}
        title="未分配用户列表"
        actionText="批量授权"
        confirmText={(n) => `确认授权选中的 ${n} 条用户吗？`}
        onBatchAction={(keys) => selectAuthUserAll({ roleId, userIds: keys })}
        reloadParent={reload}
      />
    </DrawerForm>
  );
};

export default AuthUserListDrawerForm;
