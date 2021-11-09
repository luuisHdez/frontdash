export class Goals{
    _idmetas:any;
    monto:any;
    datefrom:any;
    responsable:any;
    dateto:any;
    _namearea:any;
    _name:any;
    lastnamef:any;
    lastnamem:any;

    constructor(_idmetas:any,monto:any,datefrom:any,responsable:any,dateto:any,_namearea:any,_name:any,lastnamef:any,lastnamem:any){
      this._idmetas = _idmetas;
        this.monto = monto;
        this.datefrom = datefrom;
        this.responsable = responsable;
        this.dateto = dateto;
        this._namearea = _namearea;
        this._name = _name;
        this.lastnamef = lastnamef;
        this.lastnamem = lastnamem;
    }
}