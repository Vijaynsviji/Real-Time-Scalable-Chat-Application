



export type Status = "sent" | "delivered" | "read"


export type Message = {
    id: Number | String | null,
    text: string,
    person: string,
    date: Date,
    status : Status
}