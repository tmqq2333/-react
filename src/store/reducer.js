const defaultstate = {
  msg: '你好世界'
}
//导出一个函数
// eslint-disable-next-line
export default (state = defaultstate,action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch(action.type){
    case 'changTitle':
      newState.msg=action.value
      break;
      default:break
  }

  return newState
}
