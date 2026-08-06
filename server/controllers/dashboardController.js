import WasteListing from '../models/WasteListing.js';

export const getDashboardStats = async (req, res) => {
  try {
    const listings = await WasteListing.find();

    const totalListings = listings.length;

    const availableListings = listings.filter(
      (item) => item.status === 'Available'
    ).length;

    const soldListings = listings.filter(
      (item) => item.status === 'Sold'
    ).length;

    const totalCarbonSaved = listings.reduce(
      (sum, item) => sum + (item.carbonSaving || 0),
      0
    );

    const totalEstimatedValue = listings.reduce(
      (sum, item) => sum + (item.aiEstimatedPrice || 0),
      0
    );

    const categoryStats = {};

    listings.forEach((item) => {
      categoryStats[item.category] =
        (categoryStats[item.category] || 0) + item.quantity;
    });

    res.json({
      totalListings,
      availableListings,
      soldListings,
      totalCarbonSaved,
      totalEstimatedValue,
      categoryStats
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};