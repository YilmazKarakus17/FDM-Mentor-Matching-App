import React, { Component } from "react";

//import validator from 'validator';
import Axios from 'axios';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  
  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  
  return valid;
};

// validatePhoneNumber = (number) => {
//   const isValidPhoneNumber = validator.isMobilePhone(number)
//   return (isValidPhoneNumber)
//  };


class MentorSignUp extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          firstname: null,
          lastname: null,
          email: null,
          fdm_id: null,
          pwd: null,
          description: null,
          img: "image",
          phone: null,
          mentor_id: "mentor who?",
          formErrors: {
            firstname: "",
            lastName: "",
            email: "",
            pwd: "",
            description: "",
            img: "",
            phone: "",
            mentor_id: "",
            fdm_id: ""
          }
        };
      }
    
      handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) {
          // console.log(`
          //   First Name: ${this.state.firstname}
          //   Last Name: ${this.state.lastname}
          //   Email: ${this.state.email}
          //   Password: ${this.state.pwd}
          //   Fdm_id: ${this.state.fdm_id}
          //   Description: ${this.state.description}
            
          // `),
          console.log(this.state.pwd);
          this.addMentorApplication(this.state.fdm_id, this.state.pwd, this.state.firstname, this.state.lastname,
             this.state.description, this.state.email, this.state.img,this.state.phone);
        } else {
          console.error(" INVALID  form OOF");
          
        }
      };

      
      handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        
        switch (name) {
          
          case "firstname":
            console.log("rlly", this.firstname);
            // formErrors.firstname =
            //   value.length < 3 ? " minimum 3 characaters required" : "";
            this.setState({
                [e.target.name]: e.target.value
                
            });
            console.log("rlly", this.firstname);
            console.log("rlly", e.target.name, e.target.value)
           
            break;
          case "lastname":
            formErrors.lastname =
              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          case "fdm_id":
            formErrors.fdm_id = 
              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          case "email":
                    formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
             break;
          case "description":
            formErrors.description =
            value.length < 20 ? "minimum 20 characaters required" : "";
          break;
           break;
          case "password":
            formErrors.pwd =
              value.length < 6 ? "minimum 6 characaters required" : "";
            break;
          case "phone":
              formErrors.phone =
              value.length !=10 || value.length>10 ? " wrong number of digits" : "";
            break;
             
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
        
      };


          addMentorApplication(fdm_id,pwd, firstname, lastname, description, email,img,phone )
    {
     
      console.log("amazing is", pwd, fdm_id, firstname, lastname, description, email, img, phone  );
      //console.log();
      Axios.post('http://localhost:3001/api/insert/mentor-application', {
        id: 'fdm199',//fdm_id,
        pwd: document.getElementById('pwd'),
        fname: 'ddedd',
        lname: 'fdm199',
        desc: 'fdm199',
        img: 'fdm199',
        email: 'fdm199',
        phone: 'fdm199',
      }).then((response) => {
        console.log(response)
      });
    }
        
      render() {
        const { formErrors } = this.state;
        //console.log(this.isPhone('0987654321')); //=> false
        return (
          
          <div className="wrapper">
            <div className="form-wrapper">
              <h1>Create Account</h1>
              <form onSubmit={this.handleSubmit} noValidate>
                  
                <div className="">
                  <label htmlFor="first name">First Name</label>
                  <input
                    className={formErrors.firstname.length > 0 ? "error" : null}
                    placeholder="  type first name here"
                    type="text"
                    name="firstname"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.firstname.length > 0 && (
                    <span className="errorMessage">{formErrors.firstname}</span>
                  )}
                </div>
               
                <div className="">
                  <label htmlFor="last name">Last Name</label>
                  <input
                    className={formErrors.firstname.length > 0 ? "error" : null}
                    placeholder=" type last name here"
                    type="text"
                    name="lastname"
                    noValidate
                    onChange={this.handleChange}
                  />    
                </div>

                 {/* fdm email text field */}
                <div className="">
                  <label htmlFor="fdm_idl">FDM ID</label>
                  <input
                    className={formErrors.email.length > 0 ? "error" : null}
                    placeholder=" type your fdm_id"
                    type="fdm_id"
                    name="fdm_id"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.fdm_id.length > 0 && (
                    <span className="errorMessage">{formErrors.fdm_id}</span>
                  )}
                </div>


                 {/* personal email text field */}
                 <div className="email">
                  <label htmlFor="email">Personal Email</label>
                  <input
                    className={formErrors.email.length > 0 ? "error" : null}
                    placeholder=" Email"
                    type="email"
                    name="email"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                  )}
                </div>

                {/* password text field */}
                <div className="password">
                  <label htmlFor="password">Password  </label>
                  <input
                    className={formErrors.pwd.length > 0 ? "error" : null}
                    placeholder=" Password"
                    type="password"
                    name="pwd"
                    id="pwd"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.pwd.length > 0 && (
                    <span className="errorMessage">{formErrors.pwd}</span>
                  )}
                </div>

                {/* description text field */}
                <div className="description">
                  <label htmlFor="password">Description  </label>
                  <input
                    className={formErrors.pwd.length > 0 ? "error" : null}
                    placeholder=" Type your description here"
                    type="description"
                    name="description"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.description.length > 0 && (
                    <span className="errorMessage">{formErrors.description}</span>
                  )}
                </div>

                 {/* phone text field */}
                <div className="">
                  <label htmlFor="phone number">Phone number  </label>
                  <input
                    className={formErrors.phone.length > 0 ? "error" : null}
                    placeholder=" Type your phone no. here"
                    type="phone"
                    name="phone"
                    noValidate
                    onChange={this.handleChange}
                  />
                 { formErrors.phone.length > 0 && (
                    <span className="errorMessage">{formErrors.phone}</span>
                  )}
                
                </div>

              
                <div className="">
                  
                  <button type="signUp" onClick={this.addMentorApplication(this.fdm_id, this.pwd, this.firstname, this.lastname, this.description, this.email, this.img,this.phone)}>Create Account</button>
                 
                </div>
              </form>
            </div>
          </div>
        );
      }
    }
    
    export default MentorSignUp;
    