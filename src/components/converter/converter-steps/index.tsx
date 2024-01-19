import { useCallback, useState } from "react"
import UploadStep from "./upload-step/upload-step"
import { Format } from "../../../model/format"
import { UploadFile } from "antd"

enum Steps {
    Upload = "upload",
    Result = "result"
}

type ConverterStepsProps = {
    extensionOptions:Format[]
    populateFileList: (files: UploadFile[]) => void
}

function ConverterSteps(props: ConverterStepsProps): JSX.Element {
    const [ currentStep, setCurrentStep ] = useState<Steps>(Steps.Upload)

    const onConvertClick = useCallback(() => {
        setCurrentStep(Steps.Result)
    }, [])

    const getUploadStep = useCallback(() => {
        return <UploadStep 
                    extensionOptions={props.extensionOptions}
                    onConvertClick={props.onConvertClick}
                    populateFileList={props.populateFileList} />
    }, [props.extensionOptions, props.onConvertClick, props.populateFileList])

    const converterSteps = {
        upload:  getUploadStep(),
        result: getUploadStep()
    }


    return (
        converterSteps[currentStep]
    )
}

export default ConverterSteps