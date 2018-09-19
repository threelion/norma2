  export const localTimeFromUTC = (date: Date) => {

    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();

    return (hh < 10 ? "0"+hh : hh) + ":" + (mm < 10 ? "0"+mm : mm) + ":" + (ss < 10 ? "0"+ss : ss);
  }

  export const localDateFromUTC = (date: Date) => {
    var yy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    return yy + "-" + (mm < 10 ? "0"+mm : mm) + "-" + (dd < 10 ? "0"+dd : dd);
  }

  export const UTCFromlocalDateTime = (date, time) => {
    var tmp = (new Date()).getTimezoneOffset();

    var yy = date.substr(0,4);
    var mm = date.substr(5,2) - 1;
    var dd = date.substr(8,2);
    var hh = time.substr(0,2);
    var min = time.substr(3,2);

    var res = new Date(yy, mm, dd, hh, min);

    return res.toISOString();
  }