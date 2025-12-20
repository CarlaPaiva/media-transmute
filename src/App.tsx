import React from 'react'
import { Layout } from 'antd'
import HeaderComponent from './components/header'
import ConverterContent from './components/converter-content'
import { Content } from 'antd/es/layout/layout'
import { Link, Route, Routes } from 'react-router-dom'
import AboutPage from './pages/about'

const { Footer } = Layout

const App: React.FC = () => {
  return (
    <Layout>
      <HeaderComponent />
      <Content>
        <Routes>
          <Route path="/" element={<ConverterContent />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        MediaTransmute ©{new Date().getFullYear()} Created by{' '}
        <a href="https://www.carlapaiva.com/" target="_blank" rel="noreferrer">
          Carla Paiva
        </a>
        <div>
          <Link to="/about#what">About</Link>
          {' · '}
          <Link to="/about#privacy">Privacy</Link>
          {' · '}
          <Link to="/about#license">License</Link>
          {' · '}
          <Link to="/about#contact">Contact</Link>
        </div>
      </Footer>
    </Layout>
  )
}

export default App
