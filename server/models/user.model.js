class User {
    constructor(userId,firstName,lastName,email,password,address,bio,occupation,expertise,role = "user"){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.bio = bio;
        this.occupation = occupation;
        this.expertise = expertise;
        this.role = role;
    }
}

export default User;