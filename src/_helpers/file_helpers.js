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
   let icon='fa fa-file';
   switch(fileExtension.toLowerCase()){
    case 'txt':
        icon='fa fa-file-text';
        break;
        // icon='fa fa-file-archive-o';
        // icon='fa fa-file-audio-o';	
        // icon='fa fa-file-code-o';
        // icon='fa fa-file-excel-o';	
        // icon='fa fa-file-image-o';	
        // icon='fa fa-file-movie-o';	
        // icon='fa fa-file-o';	
        // icon='fa fa-file-pdf-o';	
        // icon='fa fa-file-photo-o';	
        // icon='fa fa-file-picture-o';	
        // icon='fa fa-file-powerpoint-o';	
        // icon='fa fa-file-text-o';
        // icon='fa fa-file-video-o';	
        // icon='fa fa-file-word-o';	
        // icon='fa fa-file-zip-o';	

   }
   return icon;
  }
  function downloadDoc(data,type,filename) {
    let blob=new Blob([data]);
    saveAs(blob,filename);
   }
  