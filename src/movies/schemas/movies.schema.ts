import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Movie {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  author: string;

  @Prop()
  description: string;

  @Prop()
  likes: number;

  @Prop()
  dislikes: number;

  @Prop()
  likedBy?: string[];

  @Prop()
  dislikedBy?: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
