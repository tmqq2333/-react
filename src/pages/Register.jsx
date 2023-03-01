import React,{useEffect} from 'react'
import { connect } from 'react-redux'

export const Register = (props) => {
  let ss=[{id:110}]
  useEffect(()=>{
    
  },[])
 
  return (
    <div id='flag'>Register
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Register)