import Link from "next/link";
import React from 'react'

const MyDonationsButton = () => {
    return (
        <li>
            <Link href="/MyDonations" className="text-moss-green block px-4 py-2 text-lg lg:text-2xl hover:text-green-700">Mis Donaciones</Link>
        </li>
    )
}

export default MyDonationsButton
