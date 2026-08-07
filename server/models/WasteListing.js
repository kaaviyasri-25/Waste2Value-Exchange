import mongoose from 'mongoose';

const wasteListingSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },

    title: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: [
        'Plastic',
        'Paper',
        'Metal',
        'Glass',
        'E-Waste',
        'Organic',
        'Textile',
        'Construction'
      ],
      required: true
    },

    description: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    unit: {
      type: String,
      enum: ['kg', 'ton', 'piece', 'bag'],
      default: 'kg'
    },

    expectedPrice: {
      type: Number,
      required: true
    },

    aiEstimatedPrice: {
      type: Number,
      default: 0
    },

    carbonSaving: {
      type: Number,
      default: 0
    },

    location: {
      type: String,
      required: true
    },

    images: [
      {
        type: String
      }
    ],

    status: {
      type: String,
      enum: ['Available', 'Reserved', 'Sold'],
      default: 'Available'
    }
  },
  { timestamps: true }
);

const WasteListing = mongoose.model('WasteListing', wasteListingSchema);

export default WasteListing;