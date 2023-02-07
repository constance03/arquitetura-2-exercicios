import { CourseBusiness } from "../business/CourseBusiness"
import { Request, Response } from "express"
import { BaseError } from "../errors/BaseError"

export class CourseController {
    // busca
    public getCourses = async (req: Request, res: Response) => {
        try {
            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.getCourses()
    
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    //criacao
    public newCourse = async (req: Request, res: Response) => {
        try {
            const courseBusiness = new CourseBusiness ()
            const output = await courseBusiness.newCourse(req.body)
    
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    //edicao
    public editCourse = async (req: Request, res: Response) => {
        try {
            const idToEdit = req.params.id

            const newId = req.body.id
            const newName = req.body.name
            const newLessons = req.body.lessons

            const input = { 
                newId,
                newName,
                newLessons
            }
    
            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.editCourse(idToEdit, input)
            
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    //delecao
    public deleteCourse =  async (req: Request, res: Response) => {
        try {
            const idToDelete = req.params.id
            
            const courseBusiness = new CourseBusiness()
            courseBusiness.deleteCourse(idToDelete)
          
            res.status(200).send({message: "Curso deletado com sucesso"})
    
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }    

}