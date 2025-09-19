import Logo from '../../assets/pic1.svg';
import { motion } from "framer-motion";
import { slideUp } from '../../utility/Animation';
export default function Hero(){
    return(
       <>
       <div className="container overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          <div className='space-y-5 ml-4 flex flex-col items-center xl:items-center md:items-start justify-center text-center md:text-left py-16 px-10 md:py-0 md:px-0 '>
             <motion.h1 variants={slideUp(0.4)} initial='initial' animate="animate"
             className=' text-4xl xl:text-5xl font-bold mb-5'>Technology Fundamentals: An Online Learning Program</motion.h1>
             <motion.p variants={slideUp(0.6)} initial='initial' animate="animate" className='text-gray-900/80'>An introductory program that builds a solid foundation in essential digital and technology skills</motion.p>
              <motion.button variants={slideUp(0.8)} initial='initial' animate="animate" className='bg-gray-900 hover:bg-[#8863a3] duration-300 text-white py-2 px-4 rounded shadow-sm hover:shadow-md mr-4 w-max'>See More Course</motion.button>
          </div>
          <motion.div initial={{opacity:0,x:150}} animate={{opacity:1,x:0}} transition={{duration:0.8}}
           className='flex justify-center items-center'>
            <img src={Logo} alt="pic" className='w-[350px] md:w-[460px] xl:w-[500px] '  />
          </motion.div>
        </div>
       </div>
       </>
    )
}