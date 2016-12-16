import React from 'react';
import { RoleAwareComponent } from 'react-router-role-authorization';



class StudentDashboard extends RoleAwareComponent {
  constructor(props) {
    super(props);
    this.allowedRoles = ['student'];
    this.userRoles = [localStorage.role];
  }


  render() {
      console.log(this.userRoles);
    const jsxstudent = (
     <div className="jumbotron">
            <h2> Hello Student </h2>
    </div>
    );

    return this.rolesMatched() ? jsxstudent : null ;
  }
}

export default StudentDashboard;