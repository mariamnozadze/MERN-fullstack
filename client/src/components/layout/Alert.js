import React from "react";
import PropTypes from "prop-types";

// Connecting the component to the Redux store
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

// Prop types validation for the alerts prop
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// Mapping state from the Redux store to component props
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
