import Logo from '../../assets/pic1.svg';
import { motion } from "framer-motion";
import { slideBottom } from '../../utility/Animation';

export default function Navbar(){

    const NavbarLinks=[
        {
            id:1,
            title:'Home',
            link:'/'
        },
       {
            id:2,
            title:'Features',
            link:'#'
        },   
        {
            id:3,
            title:'Shop',
            link:'#'
        },   
        {
            id:4,
            title:'About us',
            link:'#'
        }, 
        {
            id:5,
            title:'Contact',
            link:'#'
        },                 
    ]
    return(
       <>
       <motion.div variants={slideBottom(0.4)} initial='initial' animate="animate" className="container py-4 flex justify-between items-center">
       <div className='flex items-center gap-1 ml-2'>
         <img src={Logo} alt="pic" className='w-[70px]' />
         <p className='font_bold text-2xl'>Online Tech</p>
       </div>
       <div className='hidden md:block'>
        <ul className='flex gap-3 xl:gap-6'>
            {
          NavbarLinks.map((link)=>(
           <li key={link.id}>
            <a className='hover:text-[#8863a3] uppercase
            text-sm xl:text-base' href={link.link}>{link.title}</a>
            </li> 
          ))      
            }
        </ul>
       </div>
       <div>
        <button className='bg-[#8863a3] text-white  py-2 px-4  rounded-xl shadow-sm hover:shadow-md mr-2 md:mr-4 xl:mr-4'>Request for qoutes</button>
       </div>
       </motion.div>
       </>
    )
}