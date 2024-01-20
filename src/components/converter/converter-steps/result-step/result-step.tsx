import { memo, useCallback, useMemo } from "react"
import { ConvertedFile } from "../../../../model/converted-file"
import "./result-steps.css"
import { Button, List, Result } from "antd"
import { SmileOutlined } from "@ant-design/icons"

type ResultStepProps = {
    convertedItems: ConvertedFile[]
    downloadFiles: () => void
    convertMoreFiles: () => void
}


const ResultStep = memo(function ResultStepComponent(props: ResultStepProps): JSX.Element {

    const filesWithError = useMemo(() => {
        return props.convertedItems.filter(file => file.result === "error")
    }, [props.convertedItems])

    const filesWithSuccess = useMemo(() => {
        return props.convertedItems.filter(file => file.result === "success")
    }, [props.convertedItems])

    const getResult = useCallback(() => {
        if (filesWithError.length > 0) {
            return (
                <Result
                    status="warning"
                    title="There are some problems with your operation."
                    subTitle={`${filesWithSuccess} files converted, ${filesWithError} files with error.`}
              />
            )
        } else {
            return (
                <Result
                    icon={<SmileOutlined />}
                    title="Great, we have done all the operations!"
              />
            )
        }

    }, [filesWithError, filesWithSuccess])

    return (
        <div className="container">
            { getResult() }
            {
                filesWithError.length > 0 && (
                    <List
                    size="small"
                    className="container__items"
                    header={<div className="container__failed-list">Failed to convert these files</div>}
                    bordered
                    dataSource={filesWithError}
                    renderItem={(item) => <List.Item>{item.newFileName}</List.Item>}
                    />
                    
                ) 
            }
            {
                filesWithSuccess.length > 0 && (
                    <Button 
                        size="large" 
                        type="primary" 
                        className="container__items"
                        htmlType="button"
                        onClick={props.downloadFiles}>Download converted files</Button>
                ) 
            }
            <Button 
                size="large" 
                type="default" 
                className="container__items"
                htmlType="button"
                onClick={props.convertMoreFiles}>Convert more files</Button>
        </div>
    )
})


export default ResultStep