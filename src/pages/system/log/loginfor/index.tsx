
import { PageContainer } from '@ant-design/pro-components';
import LogininforTable from './components/LoginforProTable';

export default () => {
  return (
    <PageContainer>
      <LogininforTable
        onlySelf={false}
        showBatch={true}
      />
    </PageContainer>
  );
};