import { DrawerForm, ProTable } from "@ant-design/pro-components";
import { userBaseColumns } from "../../user/components/userColumns";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { postAllocatedUserList } from "@/services/yuan/sysPostController";

type Props = {
  postId: string;
  postName?: string;
  reload?: () => void;
};

const PostUserListDrawerForm = ({ postId, postName, reload }: Props) => {
  const request = useTableRequest(postAllocatedUserList)
  return (
    <DrawerForm
      title={postName + ` - 已分配用户列表`}
      trigger={
        <a>已分配用户</a>
      }
      size="middle"
      width={960}
    >
      <ProTable
        params={{ postId }}
        columns={userBaseColumns}
        request={request}
      />
    </DrawerForm>
  );
};

export default PostUserListDrawerForm;
