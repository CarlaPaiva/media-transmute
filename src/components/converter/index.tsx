import { memo, useCallback, useState } from "react"
import DraggerUpload from "../dragger-upload"
import { Button, UploadFile } from "antd"
import convertFiles from "../../services/converter"
import { Format } from "../../model/format"
import './converter.css'

/** Properties of Converter */
type ConverterProps = {
    /** Define allowed types to be uploaded */
    allowedUploadingFormats: Format[]
    /** Formats available to be converted at */
    optionsToConvertTo: Format[]
}

function Converter(props: ConverterProps): JSX.Element {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const onUploadDone = useCallback((files: UploadFile[]) => {
        setFileList(files)
    }, [])

    const downloadBlob = useCallback((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a")
        document.body.appendChild(a)
        a.style.display = "none"
        a.href = url;
        a.target = "_blank"
        a.download = 'test.gif';
        a.click();
        window.URL.revokeObjectURL(url);
    }, [])

    const convert = useCallback(async () => {
        const blobs = await convertFiles(fileList)

        for (const blob of blobs) {
            downloadBlob(blob)
        }
    }, [downloadBlob, fileList])

    return (
        <div>
            <DraggerUpload
                onUploadDone={onUploadDone} />
            <Button 
                size="large" 
                type="primary" 
                className="button-convert"
                onClick={convert}>Convert</Button>
        </div>
    )
}


export default memo(Converter)