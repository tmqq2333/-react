/**
 * @desc 深拷贝
 * @param obj 被拷贝数据
 * @return {obj} data
 * */
export const deepCopy = (obj) => {
  //判断传入的值是否为一个对象
  if (obj === null && typeof obj !== "object") {
    return obj;
  }
  // 判断对象的类型 注意这里不考虑包装类对象
  if (Object.prototype.toString.call(obj) === "[object Date]") {
    return new Date(obj);
  }
  if (Object.prototype.toString.call(obj) === "[object RegExp]") {
    return new RegExp(obj);
  }
  if (Object.prototype.toString.call(obj) === "[object Undefined]") {
    return new Error(obj);
  }
  // 判断对象是类
  let newObj = Array.isArray(obj)  ? [] : {}
  for(let item in obj){
    if(typeof obj[item] === "object"&&obj[item]) {
        newObj[item] = deepCopy(obj[item])
    }else {
        newObj[item] = obj[item]
    }
  }
   return newObj 
};
/**
 * @desc 远程搜索
 * @param value 搜索的值
 * @param callback 接收的回调数据
 * @param getList 搜索接口
 * eg getMateria(newValue,getList, setData);
 * */
let timeout;
let currentValue;
export function getMateria(value,getList,callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  const fake = () => {
    getList({ material_name: value })
      .then((d) => {
        if (currentValue === value) {
          const { data } = d;
          const result = data.map((item) => ({
            value: `${item['material_name']}|${item['material_code']}`,
            label: `${item['material_name']}|${item['material_code']}`,
          }));
          callback(result);
        }
      }).catch(
        () => {
          console.log('物料接口出错');
        }
      )
  };

  timeout = setTimeout(fake, 300);//延迟，防抖
}