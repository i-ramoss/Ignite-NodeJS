import { Request, Response } from 'express';
import CreateCourseService from './CreateCourseService'

export function createCourse(request: Request, response: Response) {
  CreateCourseService.execute({
    name: 'Ignite NodeJS',
    educator: 'Dani Evengalista'
  })

  CreateCourseService.execute({
    name: 'Ignite ReactJS',
    educator: 'Diego Fernandes',
    duration: 10
  })

  return response.json()
}