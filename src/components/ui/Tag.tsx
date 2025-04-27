// src/components/ui/Tag.tsx
import { motion } from "framer-motion";

interface TagProps {
    text: string;
    glowOnHover?: boolean;
}

const Tag = ({ text, glowOnHover = false }: TagProps) => {
    return (
        <motion.span
            key={text}
            className="px-3 py-1 border border-current rounded-full text-sm whitespace-nowrap"
            whileHover={{
                backgroundColor: "var(--color-text)",
                color: "var(--color-background)",
                boxShadow: glowOnHover ? "0 0 6px var(--color-text)" : "",
            }}
            transition={{ duration: 0.2 }}
        >
            {text}
        </motion.span>
    );
};

export default Tag;
