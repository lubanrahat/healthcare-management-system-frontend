import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <h2 className='text-5xl text-red-500'>404 - Page Not Found</h2>
                <p className='text-2xl text-gray-500'>Could not find requested resource</p>
                <Link className='text-blue-500 hover:text-blue-600' href="/">Return Home</Link>
            </div>
        </div>
    )
}