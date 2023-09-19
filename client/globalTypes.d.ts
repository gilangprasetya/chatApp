/** types */

declare type Message = {
    _id: string;
    content: string;
    sender: string;
    receiver: string;
}

declare type UserData = {
    _id: string;
    username: string;
}