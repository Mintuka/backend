import mongoose,{Document, Schema} from 'mongoose';

export interface ICart extends Document{
  _id: Schema.Types.ObjectId,
  userId: string,
  itemsId: [string]
}

const cartSchema: Schema<ICart> = new Schema({
    userId: {
      type: String,
      required: true
    },
    itemsId: {
      type: [String],
      default: [],
      required: true
    }},
    {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
})

var Cart = mongoose.model('Cart', cartSchema);

export default Cart;