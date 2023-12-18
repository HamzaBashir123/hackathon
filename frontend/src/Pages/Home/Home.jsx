import React from 'react'
import ResponsiveAppBar from '../../Components/Header/Header'
import Card from '../../Components/Card/Card'
import MediaControlCard from '../../Components/MediaPlay/MediaPlayer'
import TopRatedCard from '../../Components/TopRatedCard/TopRatedCard'

const Home = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <Card />
            <TopRatedCard />
            {/* <MediaControlCard /> */}
        </div>
    )
}

export default Home