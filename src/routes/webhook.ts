import express, { Request, Response, Router } from 'express'

const paypalRouter: Router = express.Router({ mergeParams: true })

const handleRequest = async (req: Request, res: Response): Promise<void> => {
  res.status(500).end()
}

paypalRouter.post('/paypal-webhook', handleRequest)

export default paypalRouter
