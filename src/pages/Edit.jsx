import React from 'react'
import {message } from "antd";
import { connect } from 'react-redux'

export const Edit = (props) => {
  
 const handleExportMarketingList=()=> {
    message.info('嘿嘿')
}
  return (
    <button onClick={handleExportMarketingList}>Edit</button>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)