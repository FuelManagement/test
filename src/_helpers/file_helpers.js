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
  function fileIcon(fileExtension) {
   let icon='fa fa-file';
   switch(fileExtension.toLowerCase()){
    case 'doc':
        icon='';
        break;
   }
   return icon;
  }
  function downloadDoc(data,type,filename) {
    let blob=new Blob([data],{type:type});
    saveAs(blob,filename);
   }
  