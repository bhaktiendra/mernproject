import Quote from '../models/quote';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all quotes
 * @param req
 * @param res
 * @returns void
 */
export function getQuotes(req, res) {
  Quote.find().sort('-dateAdded').exec((err, quotes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ quotes });
  });
}

/**
 * Save a quote
 * @param req
 * @param res
 * @returns void
 */
export function addQuote(req, res) {
  if (!req.body.quote.name || !req.body.quote.title || !req.body.quote.content) {
    res.status(403).end();
  }

  const newQuote = new Quote(req.body.quote);

  // Let's sanitize inputs
  newQuote.title = sanitizeHtml(newQuote.title);
  newQuote.name = sanitizeHtml(newQuote.name);
  newQuote.content = sanitizeHtml(newQuote.content);

  newQuote.slug = slug(newQuote.title.toLowerCase(), { lowercase: true });
  newQuote.cuid = cuid();
  newQuote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ quote: saved });
  });
}

/**
 * Get a single quote
 * @param req
 * @param res
 * @returns void
 */
export function getQuote(req, res) {
  Quote.findOne({ cuid: req.params.cuid }).exec((err, quote) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ quote });
  });
}

/**
 * Delete a quote
 * @param req
 * @param res
 * @returns void
 */
export function deleteQuote(req, res) {
  Quote.findOne({ cuid: req.params.cuid }).exec((err, quote) => {
    if (err) {
      res.status(500).send(err);
    }

    quote.remove(() => {
      res.status(200).end();
    });
  });
}
