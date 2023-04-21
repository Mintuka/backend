import mongoose,{Document, Schema} from 'mongoose';

export interface ICart extends Document{
  userId: string,
  itemId: string,
}

const cartSchema: Schema<ICart> = new Schema({
    userId: {
      type: String,
      required: true
    },
    itemId: {
      type: String,
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