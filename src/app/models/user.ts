//export para usar esta clase en otro archivo
export class User{
  constructor(
      public id: number,
      public name: string,
      public surname: string,
      public role: string,
      public password: string,
      public image: string
    ){}
}
