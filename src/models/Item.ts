import mongoose,{Document, Schema} from 'mongoose';

export interface IItem extends Document{
  name: string,
  price: number,
  amount: number,
  image: string
}

const itemSchema: Schema<IItem> = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }},
    {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
})

var Item = mongoose.model('Item', itemSchema);

export default Item;