import express from "express";
import { CourseController } from "../controller/CourseController";


export const courseRouter = express.Router()
const courseController = new CourseController()

courseRouter.get("/", courseController.getCourses)
courseRouter.put("/:id", courseController.editCourse)
courseRouter.post("/", courseController.newCourse)
courseRouter.delete("/:id", courseController.deleteCourse)