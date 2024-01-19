import { Alert, Button, Select, UploadFile } from "antd"
import DraggerUpload from "../../../dragger-upload"
import "./upload-step.css"
import { memo, useCallback, useState } from "react"
import { Format } from "../../../../model/format"

type UploadStepProps = {
    extensionOptions:Format[]
    populateFileList: (files: UploadFile[]) => void
    onConvertClick: () => void
}

const UploadStep = memo(function UploadStepComponent(props: Readonly<UploadStepProps>): JSX.Element {
    const [ isErrorMessageVisible, setIsErrorMessageVisible ] = useState(false)
    const [ files, setFiles ] = useState<UploadFile[]>([])

    const onUploadDone = useCallback((files: UploadFile[]) => {
        setIsErrorMessageVisible(false)
        setFiles(files)
        props.populateFileList(files)
    }, [props])
    
    const onClick = useCallback(() => {

        if (files.length <= 0) {
            setIsErrorMessageVisible(true)
            return
        }

        props.onConvertClick()
    }, [files, props])
    
    return (
        <div className="container">
            <DraggerUpload
                onUploadDone={onUploadDone} />
            <Select
                placeholder="Convert all to..."
                size="large"
                className="container__items"
                options={props.extensionOptions}
            >
            </Select>
            <Button 
                size="large" 
                type="primary" 
                className="container__items"
                onClick={onClick}>Convert</Button>

            { isErrorMessageVisible ?? <Alert 
                className="container__items"
                description="Please upload at least one file." 
                message="Error"
                type="error"
                showIcon />
            }            
        </div>
    )
})

export default UploadStep