import Link from "next/link";
import React from 'react'

const MyDonationsButton = () => {
    return (
        <div>
            <Link href="/MyDonations" className="text-moss-green block px-4 py-2 text-lg lg:text-2xl hover:text-green-700 text-shadow transition-all duration-200 transform hover:scale-105 whitespace-nowrap">Mis Donaciones</Link>
        </div>
    )
}

export default MyDonationsButton
