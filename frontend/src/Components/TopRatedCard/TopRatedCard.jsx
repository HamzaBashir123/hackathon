import './topCardStyle.css'

const TopRatedCard = () => {
    const images = [
        'https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/87428762.webp?k=de5db8fe94cbfe08d3bf16d3c86def035fd73b43ee497cffe27b03363764e0e2&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=c4092495705eab3fad626e8e1a43b1daf7c623e4ea41daf26a201b4417a71709&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/270323047.webp?k=bade09d7901e1282156f13c3b39e3a8b9c8d45170b2f1184565d3fc304c42d70&o='
    ]


    return (
        <>
            < div className='topCard'>
                <div className="topCardImg">
                    <img src='https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o=' alt="" />
                </div>
                <div className="cardBottom">
                    <div className="topCardTitles">
                        <h3>Title</h3>
                        <p>Sub title</p>
                    </div>
                    <div className="topCardRatings">
                        <div className="ratingBox">
                            9.9
                        </div>
                        <p>Excellent</p>
                        <p>100 Reviews</p>
                    </div>
                    <Pricing price={100} />
                </div>
            </ div>
        </>
    )
}

function Pricing({ price }) {
    return (
        <div className="pricing">
            <p>starting from <span className='amount'>$ {price}</span></p>
        </div>
    )
}

export default TopRatedCard