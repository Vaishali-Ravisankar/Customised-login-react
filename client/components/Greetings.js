import React from 'react';
import AdSense from 'react-adsense';
import TeacherDashBoard from "./TeacherDashBoard";
import StudentDashBoard from "./StudentDashBoard";


class Greetings extends React.Component {
componentDidMount(){
(adsbygoogle = window.adsbygoogle || []).push({});
}

    render() {
         const greet = (
            <div className="jumbotron">
                <h1>Education Exchange</h1>
                <TeacherDashBoard />
                <StudentDashBoard />
              

<AdSense.Google client='ca-pub-7292810486004926'
                slot='7806394673'
                style={{width: 500, height: 300, float: 'left'}}
                format='' />
                
            </div>
            
            
        ); 
        return greet ;   
    }
}

export default Greetings;