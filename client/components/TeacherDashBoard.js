import React from 'react';
import { RoleAwareComponent } from 'react-router-role-authorization';



class TeacherDashboard extends RoleAwareComponent {
  constructor(props) {
    super(props);
    this.allowedRoles = ['teacher'];
    this.userRoles = [localStorage.role];
  }


  render() {
      console.log(this.userRoles);
    const jsx = (
     <div className="jumbotron">
            <h2> Hello Teacher </h2>
    </div>
    );

    return this.rolesMatched() ? jsx : null ;
  }
}

export default TeacherDashboard;