import React, { Component } from 'react';
import axios from 'axios';
import './styles.scss';

class Header extends React.Component {
 render() {
   return (
     <div className="leaderboard" id="header"><img src="" /></div>
   );
 }
}

class Tab extends React.Component {
 handleChange(e) {
   this.props.handleData(e.target.id);
 }

 render() {
   return (
     <div className="leaderboard" id="tab-wrapper">
       <div id="recent" className="tabs" onClick={this.handleChange.bind(this)}>Past 30 Days</div>
       <div id="alltime" className="tabs" onClick={this.handleChange.bind(this)}>All Time</div>
     </div>
   );
 }
}

class Board extends React.Component {
 render() {
   return (
     <div className="leaderboard" id="board">
       <h1>{this.props.title}</h1>
       <table>
         <thead>
           <tr>
             <th>Position</th>
             <th> Name</th>
             {/* <th>Points in past 30 days</th>
             <th>All the Points</th> */}
           </tr>
         </thead>
         <tbody>
           {this.props.data.map((user, index) => (
             <tr key={user.username}>
               <td>
#
                   {index + 1}
                 </td>
               <td>
                   <a href={'' + user.username} >
                     <img src={user.img} className="profilePic" />
                     <span className="userName">{user.username}</span>
                   </a>

                 </td>
               <td>{user.recent}</td>
               <td>{user.alltime}</td>
             </tr>
             ))
           }
         </tbody>
       </table>
     </div>
   );
 }
}

class Footer extends React.Component {
 render() {
   return (
     <div className="leaderboard" id="footer">
Coded by
       {' '}
       <a href="Project-3 Team">{this.props.author}</a>
     </div>
   );
 }
}

class Leaderboard extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     data: [],
   };

   // Bind methods to component instance.
   this.handleData = this.handleData.bind(this);
 }

 componentDidMount() {
   this.handleData('alltime');
 }

 componentWillUnmount() {
   this.serverRequest.abort();
 }


 handleData(key) {
   axios
     .get(`${key}`)
     .then((res) => {
       this.setState({
         data: res.data,
       });
     })
     .catch((err) => {
       console.log(err.response.data);
     });
 }

 render() {
   return (
     <div className="leaderboard" id="app">
       <Header logo="" />
       <Tab handleData={this.handleData.bind(this)} />
       <Board title="Leaderboard" data={this.state.data} />
     </div>
   );
 }
}

export default Leaderboard;
// ReactDOM.render(<App />, document.getElementById('react-target'));
