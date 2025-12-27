import { DrawerForm } from "@ant-design/pro-components";
import RoleUserTable from "./RoleUserTable";
import { Button, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { selectAuthUserAll, unallocatedUserList } from "@/services/yuan/sysRoleController";
import { useState } from "react";

type Props = {
  roleId: string;
  reload: () => void;
  triggerText?: string;
};

const AuthUserListDrawerForm = ({ triggerText = "新增", roleId, reload }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        {triggerText}
      </Button>

      <Drawer
        title="未分配用户列表"
        open={open}
        onClose={() => setOpen(false)}
        destroyOnHidden 
        size={720}
      >
        <RoleUserTable
          model="N"
          roleId={roleId}
          title="未分配用户列表"
          actionText="批量授权"
          confirmText={(n) => `确认授权选中的 ${n} 条用户吗？`}
          onBatchAction={(keys) =>
            selectAuthUserAll({ roleId, userIds: keys })
          }
          reloadParent={() => {
            reload();
            setOpen(false);
          }}
        />
      </Drawer>
    </>
  );
};

export default AuthUserListDrawerForm;
