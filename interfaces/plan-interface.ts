interface Iplan{
    id?:string
    name:string
    price:string
    fidelity:boolean
    description:string
}

interface IPlanForm{
    plan:Iplan
}

interface IRenderPlans{
    plans:Iplan[]
}

export type {Iplan,IPlanForm,IRenderPlans}