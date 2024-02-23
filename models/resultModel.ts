import mongoose, { Schema, Document } from "mongoose";

interface Result extends Document, ResultSchema {
  gameId: {
    type: typeof Schema.Types.ObjectId;
    ref: string;
  };
  player: {
    x: {
      type: typeof Schema.Types.ObjectId | null;
      ref: string;
    };
    o: {
      type: typeof Schema.Types.ObjectId | null;
      ref: string;
    };
  };
}

const ResultSchema: Schema<Result> = new Schema<Result>(
  {
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
    gameStatus: {
      type: String,
      default: null,
    },
    player: {
      x: { type: Schema.Types.ObjectId, ref: "User", default: null },
      o: { type: Schema.Types.ObjectId, ref: "User", default: null },
    },
    winner: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ResultModel =
  mongoose.models.Result || mongoose.model<Result>("Result", ResultSchema);
export default ResultModel;
