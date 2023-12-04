import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom' //withRouter
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'

const AddExperience = props => {
  return (
    <div>AddExperience</div>
  )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, {addExperience})(AddExperience)