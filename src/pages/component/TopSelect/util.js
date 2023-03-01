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
    getList({ name: value })
      .then((d) => {
        if (currentValue === value) {
          const { data } = d;
          const result = data.map((item) => ({
            value: `${item['value']}}`,
            label: `${item['name']}`,
          }));
          callback(result);
        }
      }).catch(
        () => {
          console.log('接口出错');
        }
      )
  };

  timeout = setTimeout(fake, 300);//延迟，防抖
}