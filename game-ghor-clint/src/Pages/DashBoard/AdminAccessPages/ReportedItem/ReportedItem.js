import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ReportItemTable from './ReportItemTable';
import Spanner2 from '../../../Shared/Spanner/Spanner2';

const ReportedItem = () => {
    const [loader, setLoader] = useState(false)

    const { data: Reports = [], refetch, isLoading } = useQuery({
        queryKey: ['Reports'],
        queryFn: async () => {
            const res = await fetch(`https://mobile-ghor-sesrver.vercel.app/Reports`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }

            })
            const data = await res.json();
            return data;
        }
    })

    const handelDelete = (id) => {
        setLoader(true)

        fetch(`https://mobile-ghor-sesrver.vercel.app/user/delete/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {

                if (data.deletedCount > 0) {
                    toast.success('User deleted successfully.');
                    refetch()
                    setLoader(false)
                }
            })
            .catch(err => {
                toast.error(err.message)
                setLoader(false)
            });
    }

    if (isLoading || loader) {
        return <Spanner2 />
    }
    return (
        <div>

            <h3 className='text-center text-3xl my-10'>Reported Items</h3>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                {
                    Reports.map(reports => <ReportItemTable
                        reports={reports}
                        handelDelete={handelDelete}
                        key={reports._id}
                    />)
                }


            </div>

        </div>
    );
};

export default ReportedItem;