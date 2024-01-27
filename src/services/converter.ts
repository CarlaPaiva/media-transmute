import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { UploadFile } from "antd";
import { ConvertedFile } from "../model/converted-file";

const mimeType = {
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".avi": "video/x-msvideo",
  ".wmv": "video/x-ms-wmv",
  ".mp3": "audio/mp3",
}

async function convertFiles(fileList: UploadFile[], extension: string): Promise<ConvertedFile[]>{
    const blobList: ConvertedFile[] = []

    for (const file of fileList) {
        const sourceBuffer = await file.originFileObj?.arrayBuffer() as ArrayBuffer
        console.log('sourceBuffer', sourceBuffer)
        const nameWithoutExt = file.name.split('.')[0]
        const outputName = `${nameWithoutExt}${extension}`

        const ffmpeg = createFFmpeg({ log: true });
        await ffmpeg.load();

        ffmpeg.FS(
            "writeFile",
            file.name,
            new Uint8Array(sourceBuffer, 0, sourceBuffer.byteLength)
          );
        
          await ffmpeg.run("-i", file.name, outputName);

          const output = ffmpeg.FS("readFile", outputName);
          
          if (output === null || output.buffer.byteLength <= 0 ) {
            blobList.push({
              newFileName: outputName,
              result: "error",
              blob: new Blob()
            })
          } else {
            const blob = new Blob([output.buffer], { type: mimeType[extension as keyof typeof mimeType] })
            blobList.push({
              newFileName: outputName,
              blob,
              result: "success"
            })
          }
    }

    return blobList
}

export default convertFiles
