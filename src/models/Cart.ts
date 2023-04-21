import mongoose,{Document, Schema} from 'mongoose';

export interface ICart extends Document{
  userId: string,
  itemIds: Object[]
}

const cartSchema: Schema<ICart> = new Schema({
    userId: {
      type: String,
      required: true
    },
    itemIds: {
      type: [
        {
          id: Schema.Types.ObjectId,
          amount: Number
        }
      ],
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