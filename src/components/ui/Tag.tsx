// src/components/ui/Tag.tsx
import { motion } from "framer-motion";

const Tag = ({ text }: { text: string }) => {
    return (
        <motion.span
            key={text}
            className="px-3 py-1 border border-current rounded-full text-sm whitespace-nowrap"
            whileHover={{
                backgroundColor: "var(--color-text)",
                color: "var(--color-background)",
                boxShadow: "0 0 8px var(--color-text)",
            }}
            transition={{ duration: 0.3 }}
        >
            {text}
        </motion.span>
    );
};

export default Tag;