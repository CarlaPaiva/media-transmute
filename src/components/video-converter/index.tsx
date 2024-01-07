import { useCallback, useState } from "react"
import DraggerUpload from "../dragger-upload"
import { Button, UploadFile } from "antd"
import './video-converter.css'
import convertFiles from "../../services/converter"

function VideoConverter(): JSX.Element {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const onUploadDone = useCallback((files: UploadFile[]) => {
        setFileList(files)
    }, [])

    const convert = useCallback(async () => {
        const blobs = await convertFiles(fileList)
        console.log(blobs)
        for (const blob of blobs) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.style.display = "none"
            a.href = url;
            a.target = "_blank"
            a.download = 'test.gif';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }, [fileList])

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

export default VideoConverter