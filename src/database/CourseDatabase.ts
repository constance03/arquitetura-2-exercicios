import { BaseDatabase } from "./BaseDatabase"
import { TCourseDB } from "../types"

export class CourseDatabase extends BaseDatabase {
    public static TABLE_COURSES = "courses"

    public async findCourses () {
        const result: TCourseDB[] = await BaseDatabase.connection(CourseDatabase.TABLE_COURSES)
        return result
    }

    public async findCoursesById (id: string) {
        const [ courseDB ]: TCourseDB[] | undefined[] = await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .where({ id })

        return courseDB
    }

    public async updateCourseById(id: string, newCourseDB: TCourseDB) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .update(newCourseDB)
            .where({ id })
    }

    public async insertCourse(newCourseDB: TCourseDB) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .insert(newCourseDB)
    }

    public async deleteCourse(id: string) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .del()
            .where({id})
    }

}
