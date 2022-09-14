import React from 'react'
import { connect } from 'react-redux'
import './scss/list.scss'
export const List = (props) => {
  return (
    <div className='table-list'>List</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(List)