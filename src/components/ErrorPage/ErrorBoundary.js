import React from 'react';
import { Button, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {
      hasError: true,
      errorInfo: error,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error, errorInfo) {
    // 将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      // 降级后的 UI 并渲染
      return (
        <Result
          status='error'
          title='操作错误'
          subTitle='请刷新页面或返回上次操作'
          extra={[
            <Button type='primary' key='console'>
              刷新
            </Button>,
            <Button>返回</Button>,
          ]}
        >
          <div className='desc'>
            <Paragraph>
              <Text strong>
                {errorInfo.code}: {errorInfo.message}
              </Text>
            </Paragraph>
          </div>
        </Result>
      );
    }
    // 正常渲染
    return this.props.children;
  }
}
export default ErrorBoundary;
