import React from 'react'
import Card from './Card'
import Card1  from './Card1'
import Card2 from './Card2'
import Card3 from './Card3'

const Dashboard = () => {
  return (
    <div className=' flex gap-10 items-center justify-center mt-10'>
        {/* no one div */}
<Card/>
{/* no 2 div */}
<Card2/>
{/* no 3 div */}
<Card1/>
{/* no 4 div */}
<Card3/>
    </div>
  )
}

export default Dashboard