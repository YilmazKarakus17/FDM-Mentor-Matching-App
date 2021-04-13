export default class EditProfilePageValidator{
    constructor(chngdAccountDetails,errMsgElement){
        this.chngdAccountDetails = chngdAccountDetails;
        this.errMsgElement = errMsgElement;
    }

    validate = () => {
        let numbers = /^[0-9]+$/;
        if(this.chngdAccountDetails.firstname.replace(/\s/g,"").length == 0){
            this.errMsgElement.innerHTML = "Please enter a first name!";
            return false;
        }
        if(this.chngdAccountDetails.firstname.length > 200){
            this.errMsgElement.innerHTML = "First Name too large, our database limits to the storage of maximum 200 characters!";
            return false;
        }
        if(this.chngdAccountDetails.lastname.replace(/\s/g,"").length == 0){
            this.errMsgElement.innerHTML = "Please enter a last name!";
            return false;
        }
        if(this.chngdAccountDetails.lastname.length > 200){
            this.errMsgElement.innerHTML = "Last Name too large, our database limits to the storage of maximum 200 characters!";
            return false;
        }
        if(this.chngdAccountDetails.email.replace(/\s/g,"").length == 0){
            this.errMsgElement.innerHTML = "Please enter a email!";
            return false;
        }
        if(this.chngdAccountDetails.email.length > 200){
            this.errMsgElement.innerHTML = "Email too large, our database limits to the storage of maximum 200 characters!";
            return false;
        }
        if(this.chngdAccountDetails.email.indexOf('@') == -1){
            this.errMsgElement.innerHTML = "Please enter a valid email!";
            return false;
        }
        if(this.chngdAccountDetails.phone.replace(/\s/g,"").length < 10){
            this.errMsgElement.innerHTML = "Please enter a phone number please!";
            return false;
        }
        if(!this.chngdAccountDetails.phone.length > 40){
            this.errMsgElement.innerHTML = "Phone number must be less than 40 characters!";
            return false;
        }
        if(!this.chngdAccountDetails.phone.match(numbers)){
            this.errMsgElement.innerHTML = "Phone number must only be in digits!";
            return false;
        }
        if(this.chngdAccountDetails.description.replace(/\s/g,"").length == 20){
            this.errMsgElement.innerHTML = "Please enter a description!";
            return false;
        }
        if(this.chngdAccountDetails.description.length < 20 || this.chngdAccountDetails.description.length > 255){
            this.errMsgElement.innerHTML = "Please enter a description of 20-450 characters (~ max 85 words)!";
            return false;
        }
        this.errMsgElement.innerHTML = "";
        return true;
    }
}