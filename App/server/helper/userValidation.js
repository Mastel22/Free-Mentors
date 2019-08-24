const  userValidation = (firstName,email,password) =>{
    let value=true;


    if(!firstName || !email || !password){
        value = false;
    }
    return value;

}

export default  userValidation; 
