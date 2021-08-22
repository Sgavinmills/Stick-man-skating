import styles from './Components-CSS/Background.module.css';
const Background = ({theSkater}) => {



    let houseOneAnimationStyle = !theSkater.isCrashed && !theSkater.isStationary ? 'house-one--animation' : '';
    let houseTwoAnimationStyle = !theSkater.isCrashed && !theSkater.isStationary ? 'house-two--animation' : '';

    const houseOneClass = `${styles['house-one']} ${styles[houseOneAnimationStyle]}`
    const houseTwoClass = `${styles['house-two']} ${styles[houseTwoAnimationStyle]}`


    return (
        <div className={styles['background-container']}>

            <div className={styles['road-line']}></div>

            <div className={houseOneClass}>
                <div className={styles['house-one-window-one']}></div>
                <div className={styles['house-one-window-two']}></div>
                <div className={styles['house-one-window-three']}></div>
                <div className={styles['house-one-door']}></div>
            </div>


            <div className={houseTwoClass}>
                <div className={styles['house-two-window-one']}></div>
                <div className={styles['house-two-window-two']}></div>
                <div className={styles['house-two-window-three']}></div>
                <div className={styles['house-two-window-four']}></div>
                <div className={styles['house-two-window-five']}></div>
                <div className={styles['house-two-window-six']}></div>
                <div className={styles['house-two-window-seven']}></div>
                <div className={styles['house-two-window-eight']}></div>
                <div className={styles['house-two-window-nine']}></div>
                <div className={styles['house-two-window-ten']}></div>
                <div className={styles['house-two-window-eleven']}></div>
                <div className={styles['house-two-window-twelve']}></div>
                <div className={styles['house-two-window-thirteen']}></div>
                <div className={styles['house-two-window-fourteen']}></div>
                <div className={styles['house-two-window-fifteen']}></div>
                <div className={styles['house-two-window-sixteen']}></div>
                <div className={styles['house-two-door']}></div>
            </div>

            

        </div>
    );
}

export default Background;