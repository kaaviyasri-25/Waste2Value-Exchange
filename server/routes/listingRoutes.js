import express from 'express';
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing
} from '../controllers/listingController.js';

const router = express.Router();

router.get('/', getListings);
router.get('/:id', getListingById);

// Temporary: remove authentication for demo
router.post('/', createListing);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);

export default router;