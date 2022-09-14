/**
 * title String 卡片标题
 * 其他为slot 如果要加在头部 slot name 为option
 * 中间内容直接写
 *  <BasicCard title="自定义title">
 *          // 头部
 *           <div slot="option" className="fr">
 *             <Button
 *               type="primary"
 *               onClick={()=>{getData()}}
 *             >
 *               刷新
 *             </Button>
 *           </div>
 *
 *           // 中间内容
 *           <div>
 *             <CarTable data={tableData}></CarTable>
 *            </div>
 *         </BasicCard>
 * */
 function Card(props) {
  // console.log(props)
  const { title, children, className } = props
  // console.log(children)
  let slots = {
      default: []
  }
  if(children) {
      let childrens = Array.isArray(children) ? children : [children];
      // 这种处理如果有多个没有slot的div, 只会读取最后一个div
      // slots = childrens.reduce((slots,item)=>{
      //     if(item.props.slot) {
      //         slots[item.props.slot] = item
      //     } else {
      //         slots['default'] = item
      //     }
      //     return slots
      // }, {})
      childrens.forEach(item => {
              if(item.props.slot) {
                  slots[item.props.slot] = item
              } else {
                  slots['default'].push(item)
              }
      })
  }
  // console.log(slots)
  return (
      <div className={`g-card-container ${className ? className : ''}`}>
          <div className="g-card-header">
              <b>{title}</b>
              {slots['option']}
          </div>
          <div className="g-card-content">
              {slots['default']}
              {/*{children}*/}
          </div>
      </div>
  );
}

export default Card
