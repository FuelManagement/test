export const dateutility = {
    datefunction,
    addDaysToCurrentdate,
    addDays,
    getMonthName
  };
  function getMonthName(date) {
    var DateValue = new Date(date);
    var month_names = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var month_index = DateValue.getMonth();
    return month_names[month_index];
  }
  function datefunction(date, format) {
    var DateValue = new Date(date);
    var datepart = DateValue.getDate();
    var month_index = DateValue.getMonth();
    var month = month_index + 1;
    var year = DateValue.getFullYear();
    var zero = "0";
    var month_names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var day_names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var day_index = DateValue.getDay();
    var seconds = DateValue.getSeconds();
    var hour = DateValue.getHours();
    var minutes = DateValue.getMinutes();
    var millisec = DateValue.getMilliseconds();
    return formatteddate(
      datepart,
      month,
      month_index,
      year,
      zero,
      day_index,
      day_names,
      month_names,
      seconds,
      hour,
      minutes,
      millisec,
      format
    );
  }
  
  function formatteddate(
    date,
    month,
    month_index,
    year,
    zero,
    day_index,
    day_names,
    month_names,
    seconds,
    hour,
    minutes,
    millisec,
    type
  ) {
    var strdate, strmonth, strseconds, strhour, strminutes;
    if (date < 10) {
      strdate = zero + date.toString();
    } else {
      strdate = date.toString();
    }
    if (month < 10) {
      strmonth = zero + month.toString();
    } else {
      strmonth = month.toString();
    }
    if (seconds < 10) {
      strseconds = zero + seconds.toString();
    } else {
      strseconds = seconds.toString();
    }
    if (hour < 10) {
      strhour = zero + hour.toString();
    } else {
      strhour = hour.toString();
    }
    if (minutes < 10) {
      strminutes = zero + minutes.toString();
    } else {
      strminutes = minutes.toString();
    }
  
    switch (type) {
      case "MMM dd YYYY":
        return (
          month_names[month_index] +
          " " +
          date +
          ", " +
          year +
          " (" +
          day_names[day_index] +
          ") "
        );
      case "mm-dd-yyyy":
        return strmonth + "-" + strdate + "-" + year;
      case "dd-mm-yyyy":
        return strdate + "-" + strmonth + "-" + year;
      case "yyyy-mm-dd":
        return year + "-" + strmonth + "-" + strdate;
      case "mm/dd/yyyy":
        return strmonth + "/" + strdate + "/" + year;
      case "dd/mm/yyyy":
        return strdate + "/" + strmonth + "/" + year;
      case "yyyy/mm/dd":
        return year + "/" + strmonth + "/" + strdate;
      case "MM/dd/yyyy hh:mm:ss:ms":
        return (
          strmonth +
          "/" +
          strdate +
          "/" +
          year +
          " " +
          strhour +
          ":" +
          strminutes +
          ":" +
          strseconds +
          ":" +
          millisec
        );
        case "MM/dd/yyyy hh:mm:ss":
        return (
          strmonth +
          "/" +
          strdate +
          "/" +
          year +
          " " +
          strhour +
          ":" +
          strminutes +
          ":" +
          strseconds 
        );
      default:
        return strmonth + "/" + strdate + "/" + year;
    }
  }
  function addDaysToCurrentdate(days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
  function addDays(date, days) {
    var val = new Date(date);
    val.setDate(val.getDate() + days);
    return val;
  }
  