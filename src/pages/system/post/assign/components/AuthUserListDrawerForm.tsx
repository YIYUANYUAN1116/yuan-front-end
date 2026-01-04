import { DrawerForm } from "@ant-design/pro-components";
import { Button, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PostUserTable from "./PostUserTable";
import { postSelectUserAll } from "@/services/yuan/sysPostController";

type Props = {
  postId: string;
  reload: () => void;
  triggerText?: string;
};

const AuthUserListDrawerForm = ({ triggerText = "新增", postId, reload }: Props) => {
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
        size={920}
      >
        <PostUserTable
          model="N"
          postId={postId}
          title="未分配用户列表"
          actionText="批量分配"
          confirmText={(n) => `确认分配选中的 ${n} 条用户吗？`}
          onBatchAction={(keys) =>
            postSelectUserAll({ postId, userIds: keys })
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
