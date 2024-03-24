export interface PostRegisterUserRequest {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export interface PostRegisterUserResponse {
    first_name: string,
    last_name: string,
    email: string
}

export interface PostLoginUserRequest {
    email: string,
    password: string
}

export interface PostLoginUserResponse {
    first_name: string,
    last_name: string,
    email: string
}