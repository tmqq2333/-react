import request from "@/config/service";
export function getPassword(data) {
  return request({
    method: "GET",
    url: "/data.json",
    data
  });
}
export function postPassword(data) {
  return request({
    method: "POST",
    url: "/data.json",
    data
  });
}