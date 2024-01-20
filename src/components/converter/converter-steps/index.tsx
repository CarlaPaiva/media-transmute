import { memo, useCallback, useState } from "react"
import UploadStep from "./upload-step/upload-step"
import { Format } from "../../../model/format"
import { Spin, UploadFile } from "antd"

enum Steps {
    Upload = "upload",
    Result = "result"
}

type ConverterStepsProps = {
    extensionOptions:Format[]
    populateFileList: (files: UploadFile[]) => void
    convert: () => Promise<void>
}

const ConverterSteps = memo(function ConverterStepsComponent(props: ConverterStepsProps): JSX.Element {
    const [ currentStep, setCurrentStep ] = useState<Steps>(Steps.Upload)
    const [ isConverting, setIsConverting ] = useState(false)

    const onConvertClick = useCallback(async () => {
        setIsConverting(true)
        await props.convert()

        setCurrentStep(Steps.Result)
        setIsConverting(false)
    }, [props])

    const getUploadStep = useCallback(() => {
        return <UploadStep 
                    extensionOptions={props.extensionOptions}
                    onConvertClick={onConvertClick}
                    populateFileList={props.populateFileList} />
    }, [props.extensionOptions, onConvertClick, props.populateFileList])

    const converterSteps = {
        upload:  getUploadStep(),
        result: getUploadStep()
    }


    return (
        <>
            { converterSteps[currentStep] }
            <Spin 
                tip="Converting..." 
                size="large" 
                spinning={isConverting}
                fullscreen
            />
            
        </>
    )
})

export default ConverterSteps