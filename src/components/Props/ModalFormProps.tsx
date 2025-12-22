import { OperationMode } from "@/const/Const";
import { ActionType } from "@ant-design/pro-components";

export interface ModalFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysTenantVo;
}