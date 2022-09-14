import axios from 'axios';
import { message } from "antd";
const isDev = process.env.NODE_ENV === "development";
var service = axios.create({
    baseURL: isDev ? '' : '',  //所有的请求都会 带上/api
    "content-type": "application/json",
    timeout: 5000
})
//请求拦截器
service.interceptors.request.use(
    //可配置是否需要带上token访问
    (config) => {
        config.headers.authorization = localStorage.getItem("token") || "";
        return config;
    },
    (error) => Promise.reject(error)
)
//响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        // 相应错误处理
        // 比如： token 过期， 无权限访问， 路径不存在， 服务器问题等
        switch (error.response.status) {
            case 401:
                break
            case 403:
                break
            case 404:
                message.error("接口地址不存在")
                break
            case 500:
                message.error("服务器错误")
                break
            default:
                message.error('其他错误信息')
        }
        return Promise.reject(error)
    })

export default function request(config) {
    const { url = "", method = "GET", data = {}, headers = {} } = config;
    switch (method.toUpperCase()) {
        case "GET":
            return service.get(url, { params: data });
        case "POST":
            //原生的 form 表单
            if (headers["content-type"] === "application/x-www-form-url-encoded") {
                const p = new URLSearchParams();
                for (const key in data) {
                    p.append(key, data[key]);
                }
                return service.post(url, p, { headers });
            }
            //提交文件、非 ASCII 码的数据或者是二进制流数据
            if (headers["content-type"] === "multipart/form-data") {
                const p = new FormData();
                for (const key in data) {
                    p.append(key, data[key]);
                }
                return service.post(url, p, { headers });
            }
            //json格式，嵌套较深
            return service.post(url, data);
        case "PUT": // 修改数据
            return service.put(url, data);
        case "DELETE": // 删除数据
            return service.delete(url, { data });
        case "PATCH": // 更新局部资源
            return service.patch(url, data);
        default:
            return service(config);
    }
}