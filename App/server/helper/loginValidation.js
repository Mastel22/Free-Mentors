function validateEmail(Email){
    var em = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return em.test(String(email).toLowerCase());
}
const  loginValidation = (firstName,email,password) =>{
     
    
    let value=true;


    if(!firstName || !email || !password){
        value = false;
    }
    else if(!validateEmail()){
        message: "Check your Email";
    }
    else{
        return value;
    }
   

}