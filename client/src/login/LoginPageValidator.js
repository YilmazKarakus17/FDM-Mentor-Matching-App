export default class LoginPageValidator{
    constructor(errMsgElement){
        this.errMsgElement = errMsgElement;
    }

    //Method used to validate if an fdm Id or email exists
    userNameExists = (uname) => {
        if(uname.replace(/\s/g,"").length == 0){
            this.errMsgElement.innerHTML = "Please enter either a FDM Email or FDM ID!";
            return false;
        }
        return true;
    }

    //Method used to validate if an password exists
    pwdExists = (pwd) => {
        if(pwd.replace(/\s/g,"").length == 0){
            this.errMsgElement.innerHTML = "Please enter a password!";
            return false;
        }
        return true;
    }

    //Method used to validate if an fdm Id exists
    fdmIdExists = (fdmId) => {
        if(fdmId.replace(/\s/g,"").length == 0){
            this.errMsgElement.innerHTML = "Please enter your FDM ID!";
            return false;
        }
        return true;
    }

    //Method used to validate if an input exists
    isEmail = (input) => {
        if(input.indexOf('@') === -1){
            return false;
        }
        return true;
    }
}