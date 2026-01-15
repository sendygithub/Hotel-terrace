import { array, coerce, gt, object, string } from "zod";
export const RoomSchema = object({
    name: string().min(1),
    description: string().min(50),
    capacity: coerce.number().gt(0),
    price: coerce.number().gt(0),
    amenities: array(string()).nonempty(),

});

export const ContactSchema = object({
    name : string().min(6, "name at least 6 characters"),
    email: string().min(6, "email at least 6 characterS").email("please enter a valid email"),
    subject: string().min(6, "subject at least 6 characters"),
    message: string().min(50, "message at least 50 charactres").max(200, "messsage ,maximum 200 characters"),
});