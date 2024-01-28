import { Layout, Tabs, theme } from 'antd'
import './converter-content.css'
import VideoConverter from '../video-converter'

const items = [
  {
    label: 'Video Converter',
    key: '1',
    children: <VideoConverter />,
  },
]

function ConverterContent(): JSX.Element {
  const { Content } = Layout
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Content className="content" style={{ background: colorBgContainer }}>
      <Tabs
        defaultActiveKey="1"
        type="line"
        size="large"
        tabPosition="top"
        items={items}
      />
    </Content>
  )
}

export default ConverterContent
