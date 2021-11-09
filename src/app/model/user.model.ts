

export class User {
    _id: any;
    _name: any;
    email: any;
    lastnamef: any;
    lastnamem:any;
    namearea: any;
    puesto: any;
    creado: any;
    rolename: any;
    _idrole: any;
    status:any

    constructor(_id: any,_name: any, _idrole:any, email:any,lastnamef: any,lastnamem: any,status:any,namearea: any,puesto: any,creado: any, rolename: any){
        this._id =_id;
        this._name = _name;
        this.lastnamef = lastnamef;
        this.lastnamem = lastnamem;
        this.namearea = namearea;
        this.puesto = puesto;
        this.creado = creado;
        this.rolename = rolename;
        this.email = email;
        this._idrole = _idrole;
        this.status = status;
    }
}