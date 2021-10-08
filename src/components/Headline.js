import { motion } from "framer-motion"

const Headline = ({text}) => {
    return (
        <motion.div
            className='headline'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h1>{text}</h1>
        </motion.div>
    )
}

export default Headline
