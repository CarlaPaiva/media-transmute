import { memo, useCallback, useMemo, useState } from "react"
import DraggerUpload from "../dragger-upload"
import { Button, Input, Select, Steps, UploadFile } from "antd"
import convertFiles from "../../services/converter"
import { Format } from "../../model/format"
import { ConvertedFile } from "../../model/converted-file"

import './converter.css'
/** Properties of Converter */
type ConverterProps = {
    /** Define allowed types to be uploaded */
    allowedUploadingFormats: Format[]
    /** Formats available to be converted at */
    optionsToConvertTo: Format[]
}

// enum FileStep {
//     Uploading,
//     Finished
// }

function Converter(props: ConverterProps): JSX.Element {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const options = useMemo(() => {
        return props.optionsToConvertTo.map((item) => {
            return { value: item.extension, label: item.name }
        })
    }, [props.optionsToConvertTo])

    const onUploadDone = useCallback((files: UploadFile[]) => {
        setFileList(files)
    }, [])

    const downloadBlob = useCallback((convertedFile: ConvertedFile) => {
        const url = window.URL.createObjectURL(convertedFile.blob);
        const a = document.createElement("a")
        document.body.appendChild(a)
        a.style.display = "none"
        a.href = url;
        a.target = "_blank"
        a.download = convertedFile.newFileName;
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
        <div style={{"maxWidth": "700px", "margin": "0 auto"}}>
            <DraggerUpload
                onUploadDone={onUploadDone} />
            <div>
                <Select
                    placeholder="Convert all to..."
                    size="large"
                    style={{ width: "100%" }}
                    options={options}
                >
                </Select>
                <Button 
                    size="large" 
                    type="primary" 
                    className="button-convert"
                    onClick={convert}>Convert</Button>
            </div>
            
        </div>
    )
}


export default memo(Converter)