import { Request, Response } from 'express';
import CreateCourseService from './CreateCourseService'

export function createCourse(request: Request, response: Response) {
  CreateCourseService.execute({
    name: 'Ignite NodeJS',
    educator: 'Dani Evengalista',
    duration: 8
  })

  return response.json()
}