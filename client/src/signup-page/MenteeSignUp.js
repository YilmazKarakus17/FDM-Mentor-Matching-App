import React from 'react';

import ReactDOM from 'react-dom';
import Axios from 'axios';


export default class MenteeSignUp extends React.Component{
  constructor(props){
    super(props)
  }

  getIDs(){
    let fdmId = 'fdm21'
    Axios.get(`http://localhost:3001/api/get/fdm-ids/check-exists/${fdmId}`).then((response) => {
      let s=response.data.length
    //  if (s==0){
    //    console.log("good it doesnt exist")
    //  }else{
    //    console.log("bad it does exist")
    //  }

    });
    
  }

  addMentee()
{
      Axios.post('http://localhost:3001/api/update/mentee/mentor-id', {
      mentorId: "fdm2",
      fdmEmail: "fdm0007@fdm.co.uk"
    }).then((response) => {
      console.log(response)
    });
}
  render(){
    //logic code

    return (
      <div>
          <button onClick={this.getIDs}>Post</button>
          <h1>hi</h1>
      </div>

      
    )
  }
}

// import React, { Component } from "react";
// import MenteeSignUp from "./MenteeSignUp";
// //import validator from 'validator';


// const emailRegex = RegExp(
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );



// const formValid = ({ formErrors, ...rest }) => {
//   let valid = true;
  
//   // validate form errors being empty
//   Object.values(formErrors).forEach(val => {
//     val.length > 0 && (valid = false);
//   });

//   // validate the form was filled out
//   Object.values(rest).forEach(val => {
//     val === null && (valid = false);
//   });

  
//   return valid;
// };

// // validatePhoneNumber = (number) => {
// //   const isValidPhoneNumber = validator.isMobilePhone(number)
// //   return (isValidPhoneNumber)
// //  };


// class MentorSignUp extends Component {
//     constructor(props) {
//         super(props);
    
//         this.state = {
//           firstname: null,
//           lastname: null,
//           email: null,
//           fdm_email: null,
//           pwd: null,
//           description: null,
//           img: "image",
//           phone: null,
//           mentor_id: "mentor who?",
//           formErrors: {
//             firstname: "",
//             lastName: "",
//             email: "",
//             pwd: "",
//             description: "",
//             img: "",
//             phone: "",
//             mentor_id: "",
//             fdm_email: ""
//           }
//         };
//       }
    
//       handleSubmit = e => {
//         e.preventDefault();
    
//         if (formValid(this.state)) {
//           console.log(`
//             First Name: ${this.state.firstname}
//             Last Name: ${this.state.lastname}
//             Email: ${this.state.email}
//             Password: ${this.state.pwd}
//             Fdm_Email: ${this.state.fdm_email}
//             Description: ${this.state.description}
            
//           `);
//         } else {
//           console.error(" INVALID  form OOF");
          
//         }
//       };

//       // isPhone(){
//       //   let errors = {};
//       //   let valid = true;
//       //   if ( this.phone !== "undefined") {
          
//       //     var pattern = new RegExp(/^[0-9\b]+$/);
//       //     if (!pattern.test(this.phone)) {
//       //       valid = false;
//       //       errors["phone"] = "Please enter only number.";
//       //     }else if(this.phone.length != 10){
//       //       valid = false;
//       //       errors["phone"] = "Please enter valid phone number.";
//       //     }
//       //   }
//       //    return valid
//       // }

      
//       handleChange = e => {
//         e.preventDefault();
//         const { name, value } = e.target;
//         let formErrors = { ...this.state.formErrors };
        
//         switch (name) {
          
//           case "firstname":
//             formErrors.firstname =
//               value.length < 3 ? " minimum 3 characaters required" : "";
//             break;
//           case "lastname":
//             formErrors.lastname =
//               value.length < 3 ? "minimum 3 characaters required" : "";
//             break;
//           case "fdm_email":
//             formErrors.fdm_email = emailRegex.test(value)
//               ? ""
//               : "invalid fdm_email address";
//             break;
//           case "email":
//                     formErrors.email = emailRegex.test(value)
//                     ? ""
//                     : "invalid email address";
//              break;
//           case "description":
//             formErrors.description =
//             value.length < 20 ? "minimum 20 characaters required" : "";
//           break;
//            break;
//           case "password":
//             formErrors.pwd =
//               value.length < 6 ? "minimum 6 characaters required" : "";
//             break;
//           case "phone":
//               formErrors.phone =
//               value.length !=10 || value.length>10 ? " wrong number of digits" : "";
//             break;
             
//           default:
//             break;
//         }
    
//         this.setState({ formErrors, [name]: value }, () => console.log(this.state));
//       };
    
//       render() {
//         const { formErrors } = this.state;
//         //console.log(this.isPhone('0987654321')); //=> false
//         return (
          
//           <div className="wrapper">
//             <div className="form-wrapper">
//               <h1>Create Account</h1>
//               <form onSubmit={this.handleSubmit} noValidate>
                  
//                 <div className="">
//                   <label htmlFor="first name">First Name</label>
//                   <input
//                     className={formErrors.firstname.length > 0 ? "error" : null}
//                     placeholder="  type first name here"
//                     type="text"
//                     name="firstname"
//                     noValidate
//                     onChange={this.handleChange}
//                   />
//                   {formErrors.firstname.length > 0 && (
//                     <span className="errorMessage">{formErrors.firstname}</span>
//                   )}
//                 </div>
               
//                 <div className="">
//                   <label htmlFor="last name">Last Name</label>
//                   <input
//                     className={formErrors.firstname.length > 0 ? "error" : null}
//                     placeholder=" type last name here"
//                     type="text"
//                     name="lastname"
//                     noValidate
//                     onChange={this.handleChange}
//                   />    
//                 </div>

//                  {/* fdm email text field */}
//                 <div className="">
//                   <label htmlFor="fdm_email">FDM Email</label>
//                   <input
//                     className={formErrors.email.length > 0 ? "error" : null}
//                     placeholder=" type your fdm_email"
//                     type="email"
//                     name="fdm_email"
//                     noValidate
//                     onChange={this.handleChange}
//                   />
//                   {formErrors.fdm_email.length > 0 && (
//                     <span className="errorMessage">{formErrors.fdm_email}</span>
//                   )}
//                 </div>


//                  {/* personal email text field */}
//                  <div className="email">
//                   <label htmlFor="email">Personal Email</label>
//                   <input
//                     className={formErrors.email.length > 0 ? "error" : null}
//                     placeholder=" Email"
//                     type="email"
//                     name="email"
//                     noValidate
//                     onChange={this.handleChange}
//                   />
//                   {formErrors.email.length > 0 && (
//                     <span className="errorMessage">{formErrors.email}</span>
//                   )}
//                 </div>

//                 {/* password text field */}
//                 <div className="password">
//                   <label htmlFor="password">Password  </label>
//                   <input
//                     className={formErrors.pwd.length > 0 ? "error" : null}
//                     placeholder=" Password"
//                     type="password"
//                     name="pwd"
//                     noValidate
//                     onChange={this.handleChange}
//                   />
//                   {formErrors.pwd.length > 0 && (
//                     <span className="errorMessage">{formErrors.pwd}</span>
//                   )}
//                 </div>

//                 {/* description text field */}
//                 <div className="description">
//                   <label htmlFor="password">Description  </label>
//                   <input
//                     className={formErrors.pwd.length > 0 ? "error" : null}
//                     placeholder=" Type your description here"
//                     type="description"
//                     name="description"
//                     noValidate
//                     onChange={this.handleChange}
//                   />
//                   {formErrors.description.length > 0 && (
//                     <span className="errorMessage">{formErrors.description}</span>
//                   )}
//                 </div>

//                  {/* phone text field */}
//                 <div className="">
//                   <label htmlFor="phone number">Phone number  </label>
//                   <input
//                     className={formErrors.phone.length > 0 ? "error" : null}
//                     placeholder=" Type your phone no. here"
//                     type="phone"
//                     name="phone"
//                     noValidate
//                     onChange={this.handleChange}
//                   />
//                  { formErrors.phone.length > 0 && (
//                     <span className="errorMessage">{formErrors.phone}</span>
//                   )}
                
//                 </div>

              
//                 <div className="">
//                   <button type="signUp">Create Account</button>
                 
//                 </div>
//               </form>
//             </div>
//           </div>
//         );
//       }
//     }
    
//     export default MentorSignUp;
    