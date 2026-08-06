// AI-based price estimation engine

const priceTable = {
  Plastic: 22,
  Paper: 14,
  Metal: 48,
  Glass: 10,
  'E-Waste': 75,
  Organic: 6,
  Textile: 16,
  Construction: 9
};

const carbonTable = {
  Plastic: 1.5,
  Paper: 0.9,
  Metal: 3.2,
  Glass: 0.4,
  'E-Waste': 4.8,
  Organic: 0.3,
  Textile: 1.2,
  Construction: 0.7
};

export const estimateWasteValue = (category, quantity, quality = 'Medium') => {
  const basePrice = priceTable[category] || 10;

  let qualityMultiplier = 1;

  if (quality === 'High') qualityMultiplier = 1.2;
  if (quality === 'Low') qualityMultiplier = 0.8;

  const estimatedPrice = basePrice * quantity * qualityMultiplier;

  const carbonSaved = (carbonTable[category] || 0.5) * quantity;

  return {
    estimatedPrice: Number(estimatedPrice.toFixed(2)),
    carbonSaved: Number(carbonSaved.toFixed(2))
  };
};