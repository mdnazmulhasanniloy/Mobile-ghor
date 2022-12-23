import React, { useEffect, useState } from 'react';

const useAdmin = email => {
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        setIsAdminLoading(true)
        if (email) {
            fetch(`https://mobile-ghor-sesrver.vercel.app/user/admins/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin)
                    setIsAdminLoading(false)
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;  