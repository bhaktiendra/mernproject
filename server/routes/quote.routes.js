import { Router } from 'express';
import * as QuoteController from '../controllers/quote.controller';
const router = new Router();

// Get all Quotes
router.route('/quotes').get(QuoteController.getQuotes);

// Get one Quote by cuid
router.route('/quotes/:cuid').get(QuoteController.getQuote);

// Add a new Quote
router.route('/quotes').post(QuoteController.addQuote);

// Delete a Quote by cuid
router.route('/quotes/:cuid').delete(QuoteController.deleteQuote);

export default router;
