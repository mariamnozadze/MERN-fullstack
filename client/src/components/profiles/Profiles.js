import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../actions/profile'
import { connect } from 'react-redux'

const Profiles = ({getProfiles, profile:{profiles, loading}})=> {
    useEffect(()=> {
        getProfiles()
    }, [])
  return (
    
    <div>Profiles</div>
  )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)