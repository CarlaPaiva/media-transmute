import { Layout } from 'antd'
import './header.css'

const { Header } = Layout

export function HeaderComponent(): JSX.Element {
  return (
    <Header className="header">
      <div className="header__logo">
        <h1 className="header__logo__title">MediaTransmute</h1>
      </div>
    </Header>
  )
}
export default HeaderComponent
