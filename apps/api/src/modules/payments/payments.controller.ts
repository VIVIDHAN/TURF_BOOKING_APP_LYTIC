import { Request, Response, NextFunction } from 'express';
import { paymentsService } from './payments.service';
import { sendSuccess } from '../../utils/response';

export class PaymentsController {
  async initiate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await paymentsService.initiatePayment(req.user!.userId, req.body);
      sendSuccess(res, order, 'Payment order initiated', 201);
    } catch (error) {
      next(error);
    }
  }

  async verify(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await paymentsService.verifyPayment(req.user!.userId, req.body);
      sendSuccess(res, result, 'Payment verified and booking confirmed');
    } catch (error) {
      next(error);
    }
  }
}

export const paymentsController = new PaymentsController();
