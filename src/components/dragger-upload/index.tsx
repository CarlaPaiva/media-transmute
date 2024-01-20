import { memo, useCallback } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Upload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';

type DraggerUploadProps = {
    accept: string
    onUploadDone(file: UploadFile[]): void | Promise<void>
}

const DraggerUpload = (props: DraggerUploadProps): JSX.Element => {

    const onChange = useCallback((info: UploadChangeParam<UploadFile<unknown>>) => {
        props.onUploadDone(info.fileList)
    }, [props])

    return (
        <Upload.Dragger
        accept={props.accept}
        name='file'
        multiple={true}
        
        onChange={onChange}
        beforeUpload={() => false}
        onDrop={() => {}}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload.
        </p>
      </Upload.Dragger>
    )

};

export default memo(DraggerUpload);