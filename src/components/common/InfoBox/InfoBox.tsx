//Imports de estilos
import styles from "./InfoBox.module.css"

interface InfoBoxProps {
  title: string
  values: number | string
  icon?: React.ReactNode
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, values, icon }) => {
  return (
    <div className={styles.infobox}>
      <h3>{title}</h3>
      <div className={styles.infoContainer}>
        {icon}
        <h1>{values}</h1>
      </div>
    </div>
  )
}

export default InfoBox
