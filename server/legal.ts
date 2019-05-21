import path from 'path';
import express, { Request, Response } from 'express';

const legalRouter = express.Router();

legalRouter.get('/privacy-policy', (_req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../src/privacy-policy.html'));
});

legalRouter.get('/tos', (_req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../src/tos.html'));
});

export default legalRouter;
