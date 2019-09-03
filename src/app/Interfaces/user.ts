export type status = 'En línea' | 'Desconectado' | 'Ocupado' | 'Ausente';

export interface User {
    uid: any;
    fullName: string;
    nick?: string;
    age: number;
    email: string;
    status: status;
    avatar?: string;
    friends?: any;
    messagEveryday?: any;
}
