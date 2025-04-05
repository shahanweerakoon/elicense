import { AlignJustify,ShieldUser } from 'lucide-react';

export function DmtHeader() {
    return(
        <div>
            <div className="flex items-center justify-between py-3.5 px-6 h-fit w-full">
            <AlignJustify />
            <img src="/logo.png" alt="Logo" className="w-28  mr-2" />
            <ShieldUser/>   
        </div>
        <div className='absolute hidden h-screen w-48 bg-dark-blue left-0 top-0'>
            <div className='flex w-full py-3.5 px-6'>
                <AlignJustify className='text-white ' size={25} />
            </div>
            <div className='flex w-full py-3.5 px-6'>
                <AlignJustify className='text-white ' size={25} />
            </div>
            <div className='flex w-full py-3.5 px-6'>
                <AlignJustify className='text-white ' size={25} />
            </div>
        </div>
        </div>
        
    )
}