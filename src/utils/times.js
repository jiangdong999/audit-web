import moment from "moment";

let dateUtils = {
    formatDate: function (date) {
        if (date instanceof Date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
        return '';
    },
    toServerDateString: function(date) {
      if (date instanceof Date) {
        return moment(date).format("YYYYMMDDHHmmssSSS");
      }
    },
    byPattern: function(date, pattern) {
      if (date instanceof Date) {
        return moment(date).format(pattern);
      }
    },
    toClientDate: function(dateString) {
      if (dateString) {
        return moment(dateString, "YYYYMMDDHHmmssSSS").toDate();
      }
    },
    toTimestamp: function(date) {
      if (date instanceof Date) {
        return moment(date).valueOf();
      }
    },
    toClientDateFormat: function(dateString) {
      if (dateString) {
        return moment(dateString, "YYYYMMDDHHmmssSSS").format(this.dateFormat());
      }
    },
    toDateFormat: function(dateString) {
      if (dateString) {
        return moment(dateString, this.sysDateTimeFormat()).format("YYYYMMDDHHmmssSSS");
      }
    },
    // YYYY-MM-DD加n天后的日期
    toAddDays: function(dateString,num) {
      if (dateString) {
        let time = this.toClientDateFormat(dateString)
        return moment(time, this.dateFormat()).add(num,'days').format("YYYYMMDDHHmmssSSS");
      }
    },
    // YYYYMMDDHHmmssSSS转时间戳
    strToTimestamp: function(dateString) {
      if (dateString) {
        return moment(dateString,"YYYYMMDDHHmmssSSS").valueOf();
      }
    },
    dateFormat: function () {
      return "YYYY-MM-DD"
    },
    dateFormatWithDot: function() {
      return "YYYY.MM.DD"
    },
    datePlain: function() {
      return "YYYYMMDD";
    },
    dateTimeFormat: function () {
      return  "YYYY-MM-DD HH:mm:ss";
    },
    dateTimeHHmmFormat: function () {
      return  "YYYY-MM-DD HH:mm";
    },
    sysDateTimeFormat: function () {
      return "YYYYMMDDHHmmssZZZ";
    },
    addTimeFormat: function(time, key, date){
      return moment(date).add(time, key);
    }
};
export default dateUtils;
