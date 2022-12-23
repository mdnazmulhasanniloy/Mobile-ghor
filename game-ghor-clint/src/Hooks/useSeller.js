import React, { useEffect, useState } from 'react';

const useSeller = email => {
    const [SellerLoading, setSellerLoading] = useState(true)
    const [isSellers, setSeller] = useState(false);
    useEffect(() => {
        setSellerLoading(true)
        if (email) {
            fetch(`https://mobile-ghor-sesrver.vercel.app/user/sellers/${email}`)
                .then(res => res.json())
                .then(data => {
                    setSeller(data.isSellers)
                    setSellerLoading(false)
                })
        }
    }, [email])
    return [isSellers, SellerLoading]
}

export default useSeller;
