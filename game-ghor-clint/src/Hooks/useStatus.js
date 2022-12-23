const { useState, useEffect } = require("react");



const useRole = (email) => {
    const [loading, setLoading] = useState()
    const [role, setRole] = useState(false);
    useEffect(() => {
        setLoading(true)
        if (email) {
            fetch(`https://mobile-ghor-sesrver.vercel.app/user?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setRole(data)
                    setLoading(false)
                })
        }
    }, [email])
    return [role, loading]
};

export default useRole;