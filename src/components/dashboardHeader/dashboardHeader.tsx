import React from 'react'

const DashboardHeader = ({headerMessage}:DashboardHeader) => {
  return (
    <div>
      <div className="">
          <h1 className="text-2xl font-sans italic font-medium text-gradient-to-r from-cyan-500 to-blue-500">
            Welcome to online multiplayer Tic Tac Toe game
          </h1>
          <h2 className="w-fit text-gradient text-xl font-medium font-serif italic">
            {headerMessage}
          </h2>
        </div>
    </div>
  )
}

export default DashboardHeader
