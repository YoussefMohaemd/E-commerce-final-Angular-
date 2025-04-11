export interface registerData extends LoginData ,email {
    name:string;
   
    rePassword:string;
    phone:string;
}


export interface LoginData extends email {
    password:string;
   
}


export interface NewPassword extends email {
    newPassword:string;
   
}


export interface email  {
    email:string;

}



export interface code  {
    resetCode:string;

}


export interface address{
    details: string
    phone: string
    city: string


}