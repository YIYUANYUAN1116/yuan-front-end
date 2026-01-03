import { DrawerForm } from "@ant-design/pro-components";
import { Button, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PostUserTable from "./DeptUserTable";
import { deptSelectUserAll } from "@/services/yuan/sysDeptController";

type Props = {
  deptId: string;
  reload: () => void;
  triggerText?: string;
};

const AuthUserListDrawerForm = ({ triggerText = "新增", deptId, reload }: Props) => {
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
        <PostUserTable
          model="N"
          deptId={deptId}
          title="未分配用户列表"
          actionText="批量分配"
          confirmText={(n) => `确认分配选中的 ${n} 条用户吗？`}
          onBatchAction={(keys) =>
            deptSelectUserAll({ deptId, userIds: keys })
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
