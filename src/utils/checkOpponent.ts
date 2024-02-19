export const checkOpponent = (roomData: Game, userEmail: string): string => {
    return roomData?.status
        ? userEmail === (roomData.playerXId as UserData).email
            ? (roomData?.playerOId as UserData).name
            : (roomData.playerXId as UserData).name
        : "Not Joined Yet";
}
