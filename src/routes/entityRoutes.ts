import express from 'express';
import { entityService } from '../services';

const entityRoutes = express.Router();

entityRoutes.get('/', async (req, res, next) => {
  try {
    const searchTerm = String(req.query.searchTerm) || '';

    const results = await entityService.extractEntities(searchTerm);

    res.json(results);
  } catch (err) {
    console.log('Entities[GET]:', err);
    next(err);
  }
});

export default entityRoutes;
