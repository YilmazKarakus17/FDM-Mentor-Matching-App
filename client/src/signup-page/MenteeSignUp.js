import React, { Component } from "react";
import Axios from 'axios';
import Select from 'react-select';
import './SignUpPage.css';
//
// dependencies: npm add react-select
//


var dict= new Object();
var dict={
        id: 0,
        comm:  0,
        confidence: 0, 
        timeMng: 0, 
        teamWrk: 0, 
        ldr: 0,
        organisation: 0, 
        cldComp: 0, 
        sales: 0,
        rec: 0,
        mrkt: 0, 
        hr: 0,
        fin: 0,
        acdmy: 0,
        it: 0, 
        consultant: 0,
        prgm: 0, 
        sftTst: 0,
        bsnIntel: 0, 
        auto: 0, 
  
};

//soft skills
const options1 = [
  { value: 'teamWrk', label: 'Teamwork' },
  { value: 'comm', label: 'Communication' },
  { value: 'ldr', label: 'Leadership' },
  { value: 'organisation', label: 'Organisation' },
  { value: 'timeMng', label: 'Time management' },
  { value: 'confidence', label: 'Confidence' },
 
];

//hard skills
const options2 = [
  { value: 'prgm', label: 'Programming' },
  { value: 'sftTst', label: 'Software Testing' },
  { value: 'bubsnIntel', label: 'Business Intelligence' },
  { value: 'auto', label: 'Automation' },
];

//departments
const options3 = [
  { value: 'mrkt', label: 'Marketing' },
  { value: 'hr', label: 'HR' },
  { value: 'fin', label: 'Finance' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'it', label: 'IT' },
  { value: 'acdmy', label: 'Academy' },
  { value: 'sales', label: 'Sales' },
  { value: 'rec', label: 'Recruitment' },
  { value: 'cldComp', label: 'Cloud Computing' },
];

//globally save the values of the drop down menus and add them later to the dict
window.choice1 = ""; window.choice2 = ""; window.choice3 = ""; window.choice4 = "";
window.choice5 = ""; window.choice6 = ""; window.choice7 = ""; 
//******************************************************************************

export default class MentorSignUp extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loadPageContent: this.props.loadPageContent,
        variable: ''
      };
    }
    
    //for the drop down
    state = {
      selectedOption: null,
      selectedOption2: null,
      selectedOption3: null,
      selectedOption4: null,
      selectedOption5: null,
      selectedOption6: null,
      selectedOption7: null,
    };
    
    handleChange1 = selectedOption => {
      this.setState(
        { selectedOption },
        () => console.log(`Option selected:`, this.state.selectedOption),
        this.choice1=selectedOption.value,
      );
    };
    handleChange2 = selectedOption2 => {
      this.setState(
        { selectedOption2 },
        () => console.log(`Option selected:`, this.state.selectedOption2),
        this.choice2=selectedOption2.value,
      );
    };
    handleChange3 = selectedOption3 => {
      this.setState(
        { selectedOption3 },
        () => console.log(`Option selected:`, this.state.selectedOption3),
        this.choice3=selectedOption3.value,
      );
    };
    handleChange4 = selectedOption4 => {
      this.setState(
        { selectedOption4 },
        () => console.log(`Option selected:`, this.state.selectedOption4),
        this.choice4=selectedOption4.value,
      );
    };
    handleChange5 = selectedOption5 => {
      this.setState(
        { selectedOption5 },
        () => console.log(`Option selected:`, this.state.selectedOption5),
        this.choice5=selectedOption5.value,
      );
    };
    handleChange6 = selectedOption6 => {
      this.setState(
        { selectedOption6 },
        () => console.log(`Option selected:`, this.state.selectedOption6),
        this.choice6=selectedOption6.value,
      );
    };
    handleChange7 = selectedOption7 => {
      this.setState(
        { selectedOption7 },
        () => console.log(`Option selected:`, this.state.selectedOption7),
        this.choice7=selectedOption7.value,
      );
    };

     //*********************************** */

  
  submitEventHandler = () =>{
    //get rid of all previous errors
    document.getElementById('error-hard').innerHTML = ""
    document.getElementById('error-soft').innerHTML = ""
    document.getElementById('error-phone').innerHTML = ""
    document.getElementById('error-email').innerHTML = ""
    document.getElementById('error-id').innerHTML = ""
    document.getElementById('error-f').innerHTML = ""
    document.getElementById('error-l').innerHTML = ""
    document.getElementById('error-pwd').innerHTML = ""
    document.getElementById('error-desc').innerHTML = ""
    document.getElementById('error-db').innerHTML = ""
    document.getElementById('error-dep').innerHTML = ""

    // update the dictionary with the final choices of expertise
    dict[this.choice1]=1;  dict[this.choice6]=1;  dict[this.choice5]=1;  dict[this.choice4]=1;   dict[this.choice3]=1; 
    dict[this.choice2]=1;  dict[this.choice7]=1; 
    // verify if its printed out correctly
    let id=document.getElementById('fdm_id').value
    
    //first validate the fdm_if field
    if (document.getElementById('fdm_id').value.length ==0 || !id.includes('@fdm.co.uk')) {
          // wrong fdm id
      document.getElementById('error-id').innerHTML = "Error: wrong email format"
      document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
      return
    }else if (document.getElementById('pwd').value.length ==0 || document.getElementById('pwd').value.length <6){
      document.getElementById('error-pwd').innerHTML = "Password must be at least 6 characters"
      document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
      return 
    }else if (document.getElementById('firstname').value.length ==0){
      document.getElementById('error-f').innerHTML = "First Name Required"
      document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
      return
    }else if (document.getElementById('lastname').value.length<3){
      document.getElementById('error-l').innerHTML = "Last Name Required"
      document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
      return
    } else if(document.getElementById('email').value.length ==0){
      document.getElementById('error-email').innerHTML = "Email Address Required"
      document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
      return 
    } else if(document.getElementById('email').value.length !=0 && !document.getElementById('email').value.includes('@')){
      document.getElementById('error-email').innerHTML = "Wrong Email Format"
      document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
      return 
    }else if(document.getElementById('phone').value.length <10 || document.getElementById('phone').value.length >11){
          document.getElementById('error-phone').innerHTML = "Invalid Phone Number"
          document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
          return
    }else if(document.getElementById('description').value.length <20){
      document.getElementById('error-desc').innerHTML = "Error: Description requires minimum 20 characters"
      document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
      return 
    } else if(this.choice1 == this.choice3 ||this.choice1 == this.choice4 || this.choice3 == this.choice4){
      document.getElementById('error-soft').innerHTML = "Error: Choices are not different! Please check again."
      document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
      return 
    } else if(this.choice2 == this.choice5){
      document.getElementById('error-hard').innerHTML = "Error: Choices are not different! Please check again."
      document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
      return 
    } else if(this.choice6 == this.choice7){
      document.getElementById('error-dep').innerHTML = "Error: Choices are not different! Please check again."
      document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
      return 
    } else {
      Axios.get(`http://localhost:3001/api/get/fdm-emails/check-exists/${id}`).then((response) => {
        if (response.data.length==0){
          //doesnt exist in database
          document.getElementById('error-id').innerHTML = "Invalid FDM Email"
          console.log("id does not exists")
          document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
          return 
        } 
        else 
        {
          Axios.get(`http://localhost:3001/api/get/mentee/check-exists/${id}`).then((response) => {
            console.log("mehhh", response.data.length)
            if (response.data.length==1){
              //mentee exists
              document.getElementById('error-id').innerHTML = "Error: Mentee already registered"
              console.log("mentee already exists")
              document.getElementById('error-db').innerHTML = "Sign up failed, please complete all fields."
              return 
            } 
            else
            {
              //post everything
              //post everything
              let fdmEmailInput = document.getElementById('fdm_id').value;
              let pwdInput = document.getElementById('pwd').value;
              Axios.post('http://localhost:3001/api/insert/mentee',{
                fdmEmail: document.getElementById('fdm_id').value,
                pwd: document.getElementById('pwd').value,
                fname: document.getElementById('firstname').value,
                lname: document.getElementById('lastname').value,
                desc: document.getElementById('description').value,
                img: "defaultImg.png",
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
              }).then((response) =>{
                    // areas of expertise
                    Axios.post('http://localhost:3001/api/insert/areas-of-improvement', {
                      fdmEmail: document.getElementById('fdm_id').value,
                      comm:  dict['comm'] ,
                      confidence: dict['confidence'], 
                      timeMng: dict['timeMng'], 
                      teamWrk: dict['teamWrk'], 
                      ldr: dict['ldr'],
                      organisation: dict['ldr'], 
                      cldComp: dict['cldComp'], 
                      sales: dict['sales'],
                      rec: dict['rec'],
                      mrkt: dict['mrkt'], 
                      hr: dict['hr'],
                      fin: dict['fin'],
                      acdmy: dict['acdmy'],
                      it: dict['it'], 
                      consultant: dict['consultant'],
                      prgm: dict['prgm'], 
                      sftTst: dict['sftTst'],
                      bsnIntel: dict['bsnIntel'],
                      auto: dict['auto'], 
                    
                  }).then((response) =>{
                    document.getElementById('error-db').innerHTML = "";
                    localStorage.setItem("fdmEmail", fdmEmailInput);
                    localStorage.setItem("pwd", pwdInput);
                    this.state.loadPageContent();
                  });
                });      
            }
          });
        }
      });
    }
  }
  
  render(){
    const { selectedOption } = this.state;
    const { selectedOption2 } = this.state;
    const { selectedOption3 } = this.state;
    const { selectedOption4 } = this.state;
    const { selectedOption5 } = this.state;
    const { selectedOption6 } = this.state;
    const { selectedOption7 } = this.state;

    return(
      <div id="signup-content" className="container">
        <div className="row">
          <h2 className="col-12">Mentee Sign Up</h2>
        </div>
        <div className="row">
          <div className="col-6">
            <input className="form-control" placeholder="Fdm Email" type="fdm_id" name="fdm_id" id="fdm_id"/>
            <small id="error-id" className="form-text text-danger"></small>
          </div>
          <div className="col-6">
            <input className="form-control" placeholder="Password" type="password" name="pwd" id="pwd" />
            <small id="error-pwd" className="form-text text-danger"></small>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input className="form-control" placeholder="First Name" type="text" name="firstname" id="firstname"/>
            <small id="error-f" className="form-text text-danger"></small>
          </div>
          <div className="col-6">
            <input className="form-control" placeholder="Last Name" type="text" name="lastname"id="lastname" />
            <small id="error-l" className="form-text text-danger"></small>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input className="form-control" placeholder="Email" type="email" name="email" id="email" />
            <small id="error-email" className="form-text text-danger"></small>
          </div>
          <div className="col-6">
            <input className="form-control" placeholder="Phone" type="phone" name="phone" id="phone" />
            <small id="error-phone" className="form-text text-danger"></small>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <textarea  className="form-control" placeholder="Description" type="description" name="description" id="description"></textarea>
            <small id="error-desc" className="form-text text-danger"></small>
          </div>
        </div>
        <div className="row">
          <h5 className="col-12"> Choose three different soft skills that you would like to improve from the following lists:</h5>
        </div>
        <div className="row soft-skills">
          <div className="col-12">
            <Select value={selectedOption} onChange={this.handleChange1} id="changed" options={options1} />
          </div>
        </div>
        <div className="row soft-skills">
          <div className="col-12">
            <Select value={selectedOption3} onChange={this.handleChange3} id="changed3" options={options1} />
          </div>
        </div>
        <div className="row soft-skills">
          <div className="col-12">
            <Select value={selectedOption4} onChange={this.handleChange4} id="changed4" options={options1} />
          </div>
        </div>
        <div className="row">
          <small id="error-soft" className="col-12 form-text text-danger"></small>
        </div>


        <div className="row">
          <h5 className="col-12"> Choose two different hard skills that you would like to improve from the following lists:</h5>
        </div>
        <div className="row hard-skills">
          <div className="col-12">
            <Select value={selectedOption2} onChange={this.handleChange2} id="changed2" options={options2} />
          </div>
        </div>
        <div className="row hard-skills">
          <div className="col-12">
            <Select value={selectedOption5} onChange={this.handleChange5} id="changed5" options={options2} />
          </div>
        </div>
        <div className="row">
          <small id="error-hard" className="col-12 form-text text-danger"></small>
        </div>


        <div className="row">
          <h5 className="col-12">Choose two different departments of improvement from the following lists:</h5>
        </div>
        <div className="row departments">
          <div className="col-12">
            <Select value={selectedOption6} onChange={this.handleChange6} id="changed6" options={options3} />
          </div>
        </div>
        <div className="row departments">
          <div className="col-12">
            <Select value={selectedOption7} onChange={this.handleChange7} id="changed7" options={options3} />
          </div>
        </div>

        <div className="row">
          <small id="error-dep" className="col-12 form-text text-danger"></small>
        </div>

        <div className="row">
          <small id="error-db" className="col-12 form-text text-danger"></small>
        </div>


        <div className="row">
          <div className="col-12">
            <button className="btn btn-primary" onClick={() => this.submitEventHandler()}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}