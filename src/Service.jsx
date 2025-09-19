import image from '../../assets/pic2.svg'
import image2 from '../../assets/pic3 (2).svg'


export default function Service(){
    return(
        <div className="container bg-[#8863a3] text-white mt-7 py-4 flex flex-col items-center justify-center">

            <div className=" flex gap-x-4 md:gap-x-[200px] justify-center items-center py-10 m-2">
                <h1 className=" md:text-2xl xl:text-3xl max-w-[300px] ">Practical technology skills made <span className="text-gray-800/80  underline uppercase">Simple</span></h1>
                <h3 className="md:text-xl xl:text-2xl">A solid start to your tech <span className="text-gray-800/80  underline uppercase">journey</span></h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 m-2 md:justify-center md:items-center md:gap-x-40 m-auto">

            <div>
           <img src={image} className='w-[200px] md:w-[300px] xl:w-[300px]' alt="pic" />
            </div>

            <div className='max-w-[250px] space-y-5 py-2'>
            <div className='flex items-center gap-x-2'>
            <img src={image2} className='w-[50px]' alt="pic " />  
             <h1 className='font-bold uppercase'>Future-Ready Tech Skills</h1>
            </div>
             <p className='text-gray-900 pl-6 border-l-2 border-gray-900/60'>Develop the confidence to use technology effectively in your studies, workplace, and everyday life.</p>
            </div>

            <div className='max-w-[250px] space-y-5 py-2 '>
            <div className='flex items-center gap-x-2'>
            <img src={image2} className='w-[50px]' alt="pic " />  
             <h1 className='font-bold uppercase'>Practical Digital Skills</h1>
            </div>
             <p className='text-gray-900 pl-6 border-l-2 border-gray-900/60'>Learn essential tools and techniques to apply technology with confidence across education, career, and daily tasks.</p>
            </div>

             <div className='max-w-[250px] space-y-5 py-2'>
            <div className='flex items-center gap-x-2'>
            <img src={image2} className='w-[50px]' alt="pic " />  
             <h1 className='font-bold uppercase'>Confident with Technology</h1>
            </div>
             <p className='text-gray-900 pl-6 border-l-2 border-gray-900/60'>Gain practical experience and build a strong foundation for applying digital skills in real-world situations.</p>
            </div>

            </div>

        </div>
    )
}