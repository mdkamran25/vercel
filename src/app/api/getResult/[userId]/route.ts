import { NextResponse } from "next/server";
import connectMongoDb from "../../../../utils/dbConnection";
import Result from "../../../../../models/resultModel";

export async function GET(
  _req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    await connectMongoDb();

    const aggregationPipeline = [
      {
        $match: {
          $or: [{ "player.x": userId }, { "player.o": userId }],
        },
      },
      {
        $group: {
          _id: null,
          totalGames: { $sum: 1 },
          totalWins: {
            $sum: {
              $cond: [
                { $eq: ["$winner", "X"] },
                {
                  $cond: [{ $eq: ["$player.x", userId] }, 1, 0],
                },
                {
                  $cond: [
                    { $eq: ["$winner", "O"] },
                    {
                      $cond: [{ $eq: ["$player.o", userId] }, 1, 0],
                    },
                    0,
                  ],
                },
              ],
            },
          },
          totalLosses: {
            $sum: {
              $cond: [
                { $eq: ["$winner", "X"] },
                {
                  $cond: [{ $eq: ["$player.x", userId] }, 0, 1],
                },
                {
                  $cond: [
                    { $eq: ["$winner", "O"] },
                    {
                      $cond: [{ $eq: ["$player.o", userId] }, 0, 1],
                    },
                    0,
                  ],
                },
              ],
            },
          },
          totalDraws: {
            $sum: {
              $cond: [{ $eq: ["$winner", "Match Draw"] }, 1, 0],
            },
          },
        },
      },
    ];

    const resultAggregation = await Result.aggregate(aggregationPipeline);
    const aggregatedResult = resultAggregation[0];

    if (!aggregatedResult) {
      return NextResponse.json(
        {
          message: "Results found",
          data: {
            _id: null,
            totalGames: 0,
            totalWins: 0,
            totalLosses: 0,
            totalDraws: 0,
          },
          status: true,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "Results found",
        data: aggregatedResult,
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, status: false },
        { status: 500 }
      );
    }
  }
}
