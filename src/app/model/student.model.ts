export  interface Student{
  id:string,
  code:string,
  firstname:string,
  lastname:string,
  programId:string,
  photo:string
}

export  interface Payment{
  id:number,
  date:string,
  amount:number,
  type:PaymentType,
  status:string,
  file:string,
  student:Student
}

export enum PaymentType{
  CASH,CHECK,TRANSFER,DEPOSIT
}

export enum PaymentStatus{
  CREATED,VALIDATED,REJECTED
}
