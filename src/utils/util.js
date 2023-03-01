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