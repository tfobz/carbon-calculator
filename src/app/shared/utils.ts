
export function generateId(): string{
    const OPTIONS: string = "QWERTZUIOPASDFGHJKLYXCVBNMqwertzuiopasdfghjklyxcvbnm";
    const LENGTH: number = 10;

    let id = "";
    for(let i = 0; i < LENGTH; i++){
        id += OPTIONS.charAt(Math.floor(Math.random() * OPTIONS.length));
    }
    return id;
}