import express, { Request, Response, Router } from 'express'

import { routes } from '../constants/routes'

const paypalRouter: Router = express.Router({ mergeParams: true })

const handleRequest = async (req: Request, res: Response): Promise<void> => {
  res.status(200).end()
}

paypalRouter.post(routes.webhook, handleRequest)

export default paypalRouter
