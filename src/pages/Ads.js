import React,{useEffect} from 'react'

const Ads = () => {
useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://www.star-clicks.com/secure/ads.php?pid=69811193650677154';
    script.async = true;

    document.getElementsByClassName('ad__bruno').appendChild(script);
    //<script type='text/javascript' src='https://www.star-clicks.com/secure/ads.php?pid=69811193650677154'></script>

}, [])


    return (
        <div className='ad__bruno'>            
            
        </div>
    )
}

export default Ads;