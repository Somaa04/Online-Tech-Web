import certificate from '../../assets/certificate.svg';
import connection from '../../assets/connection.svg';
import about from '../../assets/about.svg';
import { slideUp } from '../../utility/Animation';
import { motion } from "framer-motion";

export default function Cards(){
    return(
        <>
        <div className='container mt-5 '>
         <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4  py-4 place-items-center">
            <motion.div variants={slideUp(0.4)} initial='initial' whileInView="animate" className='w-[300px] md:w-[250px] flex flex-col justify-center items-center space-y-2 bg-[#8863a3] py-4 rounded-xl shadow-xl h-[300px] px-2'>
                <img src={about} alt="pic" className='w-[100px] ' />
                <h2 className='font-bold text-white text-xl'>About</h2>
                <p className='text-center text-gray-900/90'>An online program that introduces core technology skills for today’s digital world.</p>
                <p><a href="#" className='underline hover:text-gray-900'>Learn More</a></p>
            </motion.div>   

            <motion.div variants={slideUp(0.6)} initial='initial' whileInView="animate"  className='w-[300px] md:w-[250px] flex flex-col justify-center items-center space-y-2  bg-[#8863a3] py-4 rounded-xl shadow-xl h-[300px] px-2'>
                <img src={connection} alt="pic" className='w-[100px] ' />
                <h2 className='font-bold text-white text-xl'>Connection</h2>
                <p className='text-center text-gray-900/90'>Stay connected with our team for guidance and assistance.</p>
                <p><a href="#" className='underline hover:text-gray-900'>Learn More</a></p>
            </motion.div>   

            <motion.div variants={slideUp(0.8)} initial='initial' whileInView="animate" className='w-[300px] md:w-[250px] flex flex-col justify-center items-center space-y-2  bg-[#8863a3] py-4 rounded-xl shadow-xl h-[300px] px-2'>
                <img src={certificate} alt="pic" className='w-[60px] ' />
                <h2 className='font-bold text-white text-xl'>Certificate</h2>
                <p className='text-center text-gray-900/90'>Learners who successfully complete the program will receive a digital Certificate of Completion.</p>
                 <p><a href="#" className='underline hover:text-gray-900'>Learn More</a></p>
            </motion.div>   

        </div>
        </div>
        </>
    )
}