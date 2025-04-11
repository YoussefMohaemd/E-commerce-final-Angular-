


export interface OkResponse {

    message: String,
    user: {
        name:string,
        email: string,
        role: string
    },
    token:string;
}