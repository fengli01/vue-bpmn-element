import moment from 'moment'

export default {
  install: function (Vue) {
    Vue.prototype.dateFormat = (value, formatString) => {
      formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
      return moment(value).format(formatString);
    }
  }
}
