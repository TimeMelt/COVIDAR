// Axios API Requests
import axios from 'axios';

export function invoke(url) {
    var req = axios({ method: 'get', url: url})
    return req;
}
