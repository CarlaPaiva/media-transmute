import { Layout } from 'antd'
import './header.css'

const { Header } = Layout

export function HeaderComponent(): JSX.Element {
  return (
    <Header className="header">
      <div className="header__logo">
        <a href="/">
          <h1 className="header__logo__title">MediaTransmute</h1>
          <p className="header__logo__tagline">
            Online video and audio converter
          </p>
        </a>
      </div>
    </Header>
  )
}
export default HeaderComponent
