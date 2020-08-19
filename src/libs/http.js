import axios from 'axios'

let baseUrl = '/api/'
export default {
  install: function (Vue) {
    Vue.prototype.get = function (url, data, success) {
      let _options = {
        url: baseUrl.concat(url),
        params: data
      }
      callServer(_options, success, this);
    }
    Vue.prototype.post = function (url, data, success) {
      let _options = {
        url: baseUrl.concat(url),
        data: data,
        method: 'post'
      }
      callServer(_options, success, this);
    }
    Vue.prototype.put = function (url, data, success) {
      let _options = {
        url: baseUrl.concat(url),
        data: data,
        method: 'put'
      }
      callServer(_options, success, this);
    }
    Vue.prototype.delete = function (url, data, success) {
      let _options = {
        url: baseUrl.concat(url),
        params: data,
        method: 'delete'
      }
      callServer(_options, success, this);
    }
    Vue.prototype.getCallUrl = function (url) {
      return baseUrl + url;
    }
  }
}

function handler(respose, success) {
  let status = respose.status;
  if (status != 200) {
    return;
  }
  success(respose.data);
}

function getHeader() {
  return {
    "token": localStorage.getItem("token"),
    "Content-Type": "application/json;charset=UTF-8"
  }
}

function callServer(options, success, that) {
  options = options || {};
  options.headers = getHeader();
  axios(options).then((respose) => {
    handler(respose, success)
  }).catch(reason => {
    console.log(reason)
    that.$message.error("" + reason);
  })
}
