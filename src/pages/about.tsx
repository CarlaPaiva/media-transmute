import { theme, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'

export default function AboutPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Content className="content" style={{ background: colorBgContainer }}>
      <Typography style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <Title level={1}>About MediaTransmute</Title>

        <Title level={2} id="what">
          What is MediaTransmute
        </Title>
        <Paragraph>
          MediaTransmute is a client-side media converter that runs entirely in
          your browser.
        </Paragraph>
        <Paragraph>
          All conversions are performed locally using client-side technologies.
          Files are never uploaded to a server.
        </Paragraph>
        <Title level={2} id="privacy">
          Privacy
        </Title>
        <Paragraph>
          Files are processed locally on your device. No files are uploaded,
          stored, or sent to any server.
        </Paragraph>
        <Paragraph>
          Cloudflare Web Analytics is used for anonymous usage insights.
        </Paragraph>

        <Title level={2} id="license">
          Open Source & License
        </Title>
        <Paragraph>
          MediaTransmute is an open-source project licensed under the MIT
          License.
        </Paragraph>
        <Paragraph>
          The tool is provided as-is, without warranties. Users are responsible
          ensuring they have the right to convert their files.
        </Paragraph>

        <Title level={2} id="contact">
          Contact
        </Title>
        <Paragraph>
          Please use{' '}
          <a
            href="https://github.com/CarlaPaiva/media-transmute/issues"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Issues
          </a>{' '}
          to report bugs or request features. Support and maintenance are
          provided on a best-effort basis, when time allows. There are no
          guarantees of response time or feature implementation.
        </Paragraph>
      </Typography>
    </Content>
  )
}
