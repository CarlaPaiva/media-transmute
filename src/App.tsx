import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from './components/header'
import ConverterContent from './components/converter-content';

const { Footer } = Layout;

const App: React.FC = () => {


  return (
    <Layout>
      <HeaderComponent/>
      <ConverterContent/>
      <Footer style={{ textAlign: 'center' }}>
        MediaTransmute ©{new Date().getFullYear()} Created by <a href='https://github.com/CarlaPaiva' target='_blank'>Carla Paiva</a>
      </Footer>
    </Layout>
  );
};

export default App;