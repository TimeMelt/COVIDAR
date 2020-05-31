// Axios API Requests
import axios from 'axios';

// invoke api request
export function invoke(url) {
    var req = axios({ method: 'get', url: url})
    return req;
}

// set timeout/wait duration
export function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
