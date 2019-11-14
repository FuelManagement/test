export const formatutility = {
    MMMDDYYYY: "MMM dd YYYY",
    MM_DD_YYYY: "mm-dd-yyyy",
    DD_MM_YYYY: "dd-mm-yyyy",
    YYYY_MM_DD: "yyyy-mm-dd",
    MMDDYYYY: "mm/dd/yyyy",
    DDMMYYYY: "dd/mm/yyyy",
    YYYYMMDD: "yyyy/mm/dd",
    MMDDYYYYHHMMSS:"MM/dd/yyyy hh:mm:ss",
    MMDDYYYYHHMMSSMS: "MM/dd/yyyy hh:mm:ss:ms",
    MMDDYYYYHHMMSS:"MM/dd/yyyy hh:mm:ss",
    MMDDYYYYHHMM:"MM/dd/yyyy hh:mm",
    isEmpty
  };
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }