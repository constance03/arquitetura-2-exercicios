import { CourseDatabase } from "../database/CourseDatabase"
import { Course } from "../models/Course"
import { TCourseDB } from "../types"


export class CourseBusiness {
    public getCourses = async () => {
        const courseDatabase = new CourseDatabase
        const coursesDB = await courseDatabase.findCourses()

        const courses: Course[] = coursesDB.map((courseDB) => new Course(
            courseDB.id,
            courseDB.name,
            courseDB.lessons
        ))

        return courses
    }

    public editCourse = async (idToEdit: string, input: any) => {
        const {newId, newName, newLessons} = input

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                throw new Error("'id' deve ser string")
            }
        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new Error("'name' deve ser string")
            }
        }
        if (newLessons !== undefined) {
            if (typeof newLessons !== "number") {
                throw new Error("'lessons' deve ser number")
            }
        }

        const courseDatabase = new CourseDatabase()
        const courseDB = await courseDatabase.findCoursesById(idToEdit)

        if (!courseDB) {
            throw new Error("'id' não encontrado")
        }

        const updatedCourse = new Course(
            newId,
            newName,
            newLessons
        )

        const updatedCourseDB: TCourseDB = {
            id: updatedCourse.getId() || courseDB.id,
            name: updatedCourse.getName() ||courseDB.name,
            lessons: isNaN(updatedCourse.getLessons()) ? courseDB.lessons : updatedCourse.getLessons()
        }

        await courseDatabase.updateCourseById(idToEdit, updatedCourseDB)

        return updatedCourse
    }
    
    public async newCourse(input : any) {
        const {id, name, lessons} = input

        if (typeof id !== "string") {
            throw new Error("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new Error("'name' deve ser string")
        }

        if (typeof lessons !== "number") {
            throw new Error("'lessons' deve ser number")
        }

        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCoursesById(id)

        if (courseDBExists) {
            throw new Error("'id' já existe")
        }

        const newCourse = new Course(
            id,
            name,
            lessons
        )

        const newCourseDB: TCourseDB = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons()
        }

        await courseDatabase.insertCourse(newCourseDB)

        return newCourse
    }

    public async deleteCourse (idToDelete : string) {
        const courseDatabase = new CourseDatabase ()
        const course = await courseDatabase.findCoursesById(idToDelete)
        
        if (!course) {
            throw new Error("'id' não encontrada")
        }

        await courseDatabase.deleteCourse(idToDelete)
    }
}