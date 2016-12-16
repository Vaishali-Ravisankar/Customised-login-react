import React from 'react';
import { Link } from 'react-router';
import { activateUser } from '../actions/authActions';
import { connect } from 'react-redux';



function getUrlParameter(token) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class Activation extends React.Component {

componentDidMount(){
    console.log("Component is mounted");
    let activatetoken = getUrlParameter(token);
    console.log(activatetoken);

    this.props.activateUser(activatetoken).then(
        (res) => {    
            
        },
        (err) => {this.setState({ errors: err.response.data.errors, isLoading: false })}
      );

}

    


   render() {
       const activate= (
       <div>
       <p>User Link Activated..Click <Link to="/login">here</Link> to Login</p>
       </div>
    );
       return activate;
  }
}



Activation.propTypes = {
  activateUser: React.PropTypes.func.isRequired
}

Activation.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { activateUser })(Activation);
