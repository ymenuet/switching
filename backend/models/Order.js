import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        formation: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Formation',
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      // status: { type: String },
      // update_time: { type: String },
      // email_adress: { type: String },
      // TBD with Stripe
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Timestamps give us created_at and updated_at fields automatically

const Order = mongoose.model('Order', orderSchema)

export default Order
