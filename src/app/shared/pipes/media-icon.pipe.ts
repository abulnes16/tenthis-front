import { Pipe, PipeTransform } from '@angular/core';
import {
  faFileWord,
  faFilePdf,
  faFilePowerpoint,
  faFile,
  faFileVideo,
  faFileAudio,
  faFileCsv,
  faFileExcel,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

@Pipe({
  name: 'mediaIcon'
})
export class MediaIconPipe implements PipeTransform {

  transform(name: string): any {
    const extension = name.split('.').pop();
    switch (extension) {
      case 'docx':
        return faFileWord;
      case 'xlsx':
        return faFileExcel;
      case 'pptx':
        return faFilePowerpoint;
      case 'pdf':
        return faFilePdf;
      case 'csv':
        return faFileCsv;
      case 'mp3':
      case 'aac':
        return faFileAudio;
      case 'mp4':
      case 'wav':
        return faFileVideo;
      case 'jpg':
      case 'png':
      case 'jpeg':
      case 'svg':
      case 'gif':
        return faImage;
      default:
        return faFile;
    }
  }

}
