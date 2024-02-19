import mongoose, { Schema, Document } from "mongoose";

interface Game extends Document, GameSchema {
  playerXId: {
    type: typeof Schema.Types.ObjectId;
    ref: string;
    required: boolean;
  };
  playerOId: { type: typeof Schema.Types.ObjectId; ref: string };
}


const GameSchema: Schema<Game> = new Schema<Game>(
  {
    roomCode: {
      type: String,
      required: true,
    },
    playerXId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    playerOId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    board: {
      type: [String],
      default: ["", "", "", "", "", "", "", "", ""],
    },
    turn: {
      type: String,
      default: "X",
    },
    winner: {
      type: String,
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
    leftGame: {
      playerX: {
        type: Boolean,
        default: false,
      },
      playerO: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const GameModel =
  mongoose.models.Game || mongoose.model<Game>("Game", GameSchema);
export default GameModel;
