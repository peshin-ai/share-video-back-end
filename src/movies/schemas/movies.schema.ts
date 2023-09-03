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
  movieId: string;

  @Prop({ required: true })
  movieTitle: string;

  @Prop({ required: true })
  movieAuthor: string;

  @Prop()
  movieDescription: string;

  @Prop()
  movieLikes: number;

  @Prop()
  movieDislikes: number;

  @Prop()
  movieLikesBy?: string[];

  @Prop()
  movieDislikesBy?: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
