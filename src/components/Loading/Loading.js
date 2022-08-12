import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const Loading = () => <Spin indicator={loadIcon} />;

export default Loading;
