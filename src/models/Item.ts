import mongoose,{Document, Schema} from 'mongoose';

export interface IItem extends Document{
  name: string,
  price: string,
  image: string
}

const itemSchema: Schema<IItem> = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
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