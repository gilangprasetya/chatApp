/** types */

declare type Message = {
    _id: string;
    content: string;
    sender: string;
    receiver: string;
    isDeleted?: boolean;
}

declare type UserData = {
    _id: string;
    username: string;
}