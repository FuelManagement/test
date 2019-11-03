import { saveAs } from 'file-saver';
export const fileUtility = {
   
    bytesToSize,
    fileIcon,
    downloadDoc
  };
  
 
  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }
  function fileIcon(file) {
    let fileExtension=file.split('.').pop();
   let icon='file';
   switch(fileExtension.toLowerCase()){
    
        case 'zip':
            case 'rar':
         icon='file-archive';
         break;
         case 'mp3':
        icon='file-audio';	
        break;
        case 'xls':
            case 'xlsx':
         icon='file-excel';
         break;	
         case 'jpg':
            case 'png':
                case 'gif':
         icon='file-image';	
         break;
         case 'pdf':
       icon='file-pdf';	
       break;
       case 'ppt':
         icon='file-powerpoint';	
        break;
        case 'doc':
            case 'docx':
         icon='file-word';
        break;
        default	:
        icon='file';
        break;

   }

   return icon;
  }
  function downloadDoc(data,type,filename) {
    let blob=new Blob([data]);
    saveAs(blob,filename);
   }
  