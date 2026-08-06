import WasteListing from '../models/WasteListing.js';
import { estimateWasteValue } from '../services/aiPricing.js';

export const createListing = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      quantity,
      unit,
      expectedPrice,
      location,
      images,
      quality
    } = req.body;

    // AI Price Estimation
    const aiResult = estimateWasteValue(category, quantity, quality);

    const listing = await WasteListing.create({
      seller: null,
      title,
      category,
      description,
      quantity,
      unit,
      expectedPrice,
      aiEstimatedPrice: aiResult.estimatedPrice,
      carbonSaving: aiResult.carbonSaved,
      location,
      images
    });

    res.status(201).json({
      message: 'Listing created successfully',
      listing
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// Get all listings
export const getListings = async (req, res) => {
  try {
    const listings = await WasteListing.find()
      .populate('seller', 'name email location')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get listing by ID
export const getListingById = async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id)
      .populate('seller', 'name email location');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update listing
export const updateListing = async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Only seller can update
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedListing = await WasteListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete listing
export const deleteListing = async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await listing.deleteOne();

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};