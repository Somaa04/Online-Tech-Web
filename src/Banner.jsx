import chatBot from '../../assets/chatBot.svg';
import { motion } from "framer-motion";
import { slideUp } from '../../utility/Animation';
export default function Banner(){
    return(
       <>
       <div className="container overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          <div className='space-y-5 ml-4 flex flex-col items-center xl:items-start md:items-start justify-center text-center md:text-left py-16 md:pr-10 px-10 md:py-0 md:px-0 '>
             <motion.h1 variants={slideUp(0.4)} initial='initial' whileInView="animate"
             className=' text-4xl xl:text-5xl font-bold mb-5'>Smart Chatbot Assistance</motion.h1>
              <motion.button variants={slideUp(0.4)} initial='initial' whileInView="animate" className='hover:bg-gray-900 bg-[#8863a3] duration-300 text-white py-2 px-4 rounded shadow-sm hover:shadow-md mr-4 w-max'>See More Course</motion.button>
            
            <div className='flex gap-3 '>
           <motion.div variants={slideUp(0.8)} initial='initial' whileInView="animate" className='max-w-[300px]'>
            <p className='font-semibold'>AI Learning Assistant</p>
            <p>A smart chatbot that helps answer questions, guide your learning, and provide quick support throughout the course.</p>
            </motion.div> 

            <motion.div variants={slideUp(0.8)} initial='initial' whileInView="animate" className='max-w-[300px] '>
            <p className=' font-semibold ' >24/7 Digital Helper</p>
            <p>Always available to assist with explanations, resources, and problem-solving whenever you need it.</p>
            </motion.div> 
          </div>

          </div>

        

          <motion.div initial={{opacity:0,x:150}} whileInView={{opacity:1,x:0}} transition={{duration:0.9}}
           className='flex justify-center items-center'>
            <img src={chatBot} alt="pic" className='w-[350px] md:w-[460px] xl:w-[500px] '  />
          </motion.div>
        </div>
       </div>
       </>
    )
}