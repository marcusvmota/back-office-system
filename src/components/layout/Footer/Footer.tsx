// Imports de estilos
import styles from "./Footer.module.css"

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>
                &copy; {new Date().getFullYear()} - Todos os direitos reservados
            </p>
        </footer>
    )
}

export default Footer