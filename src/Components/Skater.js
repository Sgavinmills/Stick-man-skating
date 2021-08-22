import { useEffect, useRef } from "react";
import styles from './Components-CSS/Skater.module.css';

//not sure if this one needs to be a state ornot, is it OK here??
const tempTimingKeys = [];
export default function Skater({ theSkater, setTheSkater }) {

    const wheelKeys = ['s', 'f'] //s is left wheel,f is right. Can add more for right hand later.
    const leftWheels = ['s'];
    const rightWheels = ['f'];

    const keyAlreadyDown = (key) => {
        if (leftWheels.includes(key)) {
            return theSkater.isLeftWheelDown;
        } else return theSkater.isRightWheelDown
    }
    const handleKeyDown = (event) => {
        //first check should be if keys are 'wheel keys' (ie s or f,and later the right hand keys)
        //if in air check for landing timing - if both keys pressed more generous timing,if just one key then a togh timing for manual landing
        //if in trick then crash

        if (wheelKeys.includes(event.key) && !keyAlreadyDown(event.key)) {
            //check if key is aready down (since releasing a key apparently can trigger another 'down' from an already pressed key)

            if (theSkater.isCrashed || theSkater.isStationary) {
                switch (event.key) {
                    case 's':
                        setTheSkater((currSkater) => {
                            const newSkater = { ...currSkater };
                            newSkater.isLeftWheelDown = true;
                            return newSkater;
                        })
                        break;
                    case 'f':
                        setTheSkater((currSkater) => {
                            const newSkater = { ...currSkater };
                            newSkater.isRightWheelDown = true;
                            return newSkater;
                        })
                        break;
                }
            } else if (theSkater.inManual || theSkater.inNoseManual) {
                releaseManual(event.key);
            } else if (theSkater.isInAir) { // if hes in the air then we are trying to land (since keys pressed are wheel keys)
                const currentTime = new Date();
                console.log('Attempted to land this long after take off:')
                console.log(currentTime - theSkater.lastTrickTime.ollie);
                if (currentTime - theSkater.lastTrickTime.ollie < 530) {
                    setCrashed('CRASH message: landed ollie to early');
                } else { //****here buggy? */
                               //if in earlytime window then if only one key pressed do nothing
                    //if both keys pressed then land successfully

                    //do by pushing key into a temp array, if array has both the wheels then land - clear array
                    //if key already in array then crash (no double taps) - clear array

                    //****does this array need to be a state?! **** */
                    
                    //if in the late time window 
                    //if there is already a key in array then land normally - clear array
                    //if no keys in there then land in manual like a boss - clear array
                    if(currentTime - theSkater.lastTrickTime.ollie < 800) {
                        if(tempTimingKeys.includes(event.key)){
                            tempTimingKeys.length = 0;
                            setCrashed('Double tapped the manual landing - onlypress each key once when landing');
                        } else {
                            tempTimingKeys.push(event.key);
                            if(tempTimingKeys.length === 2) {
                                setTheSkater(currSkater => {
                                    const newSkater = { ...currSkater };
                                    newSkater.isInAir = false;
                                    newSkater.isSkatingNormally = true;
                                    newSkater.inManual = false;
                                    newSkater.inNoseManual = false;
                                    newSkater.isTrickReady = false;
                                    newSkater.isLeftWheelDown = true;
                                    newSkater.isRightWheelDown = true;
                                    return newSkater;
                                })
                                tempTimingKeys.length = 0;
                            }
                        }
                    } else {
                        //this means timing has been more than 850ms, ie the skill zone
                        if(tempTimingKeys.includes(event.key)){
                            tempTimingKeys.length = 0;
                            setCrashed('Double tapped the manual landing - onlypress each key once when landing');
                        } else 
                            if(tempTimingKeys.length === 1) {
                                setTheSkater(currSkater => {
                                    const newSkater = { ...currSkater };
                                    newSkater.isInAir = false;
                                    newSkater.isSkatingNormally = true;
                                    newSkater.inManual = false;
                                    newSkater.inNoseManual = false;
                                    newSkater.isTrickReady = false;
                                    newSkater.isLeftWheelDown = true;
                                    newSkater.isRightWheelDown = true;
                                    return newSkater;
                                })
                                tempTimingKeys.length = 0;
                            }
                         else {
                            //land manual
                            if(rightWheels.includes(event.key))
                              setNoseManual();
                            else setManual();
                        }
                    }
         

                  

                    //land successfully if 
                  
                }
            }
        }

    }

    const releaseManual = (key) => {
        console.log('Released manual')
        console.log(`Due to key: ${key}`)
        setTheSkater((currSkater) => {
            const newSkater = { ...currSkater };
            newSkater.isSkatingNormally = true;
            newSkater.inManual = false;
            newSkater.inNoseManual = false;
            newSkater.isLeftWheelDown = true;
            newSkater.isRightWheelDown = true;
            if (rightWheels.includes(key)) {
                newSkater.mostRecentManual = 'manual';
            } else newSkater.mostRecentManual = 'nose-manual';
            console.log(newSkater);
            return newSkater;

        })
    }
    // const setManual = (key) => {
    //     console.log('set manual')
    //     //this sets nose or normal manual depending on key 
    //     setTheSkater(currSkater => {
    //         const newSkater = { ...currSkater }
    //         newSkater.isSkatingNormally = false;
    //         newSkater.inManual = rightWheels.includes(key);
    //         newSkater.inNoseManual = leftWheels.includes(key);
    //         newSkater.isTrickReady = false;
    //         newSkater.isLeftWheelDown = rightWheels.includes(key);
    //         newSkater.isRightWheelDown = leftWheels.includes(key);
    //         newSkater.isInAir = false;
    //         console.log(newSkater);
    //         return newSkater;
    //     })
    // }

    const setManual = () => {
        setTheSkater(currSkater => {
            const newSkater = { ...currSkater }
            newSkater.isSkatingNormally = false;
            newSkater.inManual = true
            newSkater.inNoseManual = false;
            newSkater.isTrickReady = false;
            newSkater.isLeftWheelDown = true;
            newSkater.isRightWheelDown = false;
            newSkater.isInAir = false;
            newSkater.mostRecentManual = 'manual';
            return newSkater;
        })
    }
    const setNoseManual = () => {
        setTheSkater(currSkater => {
            const newSkater = { ...currSkater }
            newSkater.isSkatingNormally = false;
            newSkater.inManual = false;
            newSkater.inNoseManual = true;
            newSkater.isTrickReady = false;
            newSkater.isLeftWheelDown = false;
            newSkater.isRightWheelDown = true;
            newSkater.isInAir = false;
            newSkater.mostRecentManual = 'nose-manual';
            return newSkater;
        })
    }

    const doOllie = () => {
        setTheSkater(currSkater => {
            const newSkater = { ...currSkater }
            newSkater.isSkatingNormally = false;
            newSkater.inManual = false;
            newSkater.inNoseManual = false;
            newSkater.isTrickReady = false;
            newSkater.isLeftWheelDown = false;
            newSkater.isRightWheelDown = false;
            newSkater.isInAir = true;
            newSkater.lastTrickTime.ollie = new Date();
            return newSkater;
        })
    }

    const setCrashed = (crashMsg) => {
        setTheSkater(currSkater => {
            const newSkater = { ...currSkater }
            newSkater.isSkatingNormally = false;
            newSkater.inManual = false;
            newSkater.inNoseManual = false;
            newSkater.isTrickReady = false;
            newSkater.isLeftWheelDown = false;
            newSkater.isRightWheelDown = false;
            newSkater.isInAir = false;
            newSkater.isCrashed = true;
            newSkater.isStationary = true;
            if(crashMsg) {
                console.log(crashMsg);
            }
            return newSkater;
        })
    }
    const handleKeyUp = (event) => {
        if (wheelKeys.includes(event.key)) {
            if (theSkater.isSkatingNormally) {
                if(rightWheels.includes(event.key))
                    setManual();
                else setNoseManual();
            } else if (theSkater.inManual) {
                //do an ollie
                doOllie();
            } else if (theSkater.inNoseManual) {
                setCrashed('CRASH message: Cant ollie out of nose manual. Can only return to normal skate (use back wheels key)');
            } else {
                switch (event.key) {
                    case 's':
                        setTheSkater((currSkater) => {
                            const newSkater = { ...currSkater };
                            newSkater.isLeftWheelDown = false;
                            return newSkater;
                        })
                        break;
                    case 'f':
                        setTheSkater((currSkater) => {
                            const newSkater = { ...currSkater };
                            newSkater.isRightWheelDown = false;
                            return newSkater;
                        })
                        break;
                }
            }


        }

    }

    //end ollie and return to ground normally
    //will have button downs to trigger this later but for now can happen after 1 second
    //buttons will also trigger whether skating normally,manuals, etc.
    // useEffect(() => {
    //     if(theSkater.isInAir){
    //         setTimeout(() => {
    //             setTheSkater(currSkater => {
    //                 const newSkater = {...currSkater};
    //                 newSkater.isInAir = false;
    //                 newSkater.isSkatingNormally = true;
    //                 newSkater.inManual = false;
    //                 newSkater.inNoseManual = false;
    //                 newSkater.isTrickReady = false;
    //                 newSkater.isLeftWheelDown = true;
    //                 newSkater.isRightWheelDown = true;
    //                 return newSkater;
    //             })
    //         }, 1000)
    //     }
    // })

    //if skater is in air for longer than a second then crash
    const inAirRef = useRef(theSkater.isInAir);
    inAirRef.current = theSkater.isInAir;
    useEffect(() => {
        if (theSkater.isInAir) {
            console.log(inAirRef.current);

            setTimeout(() => {
                //if skater is still inair then crash. Need to find how to access current status not status from when timeout was set
                console.log(inAirRef.current);
                if (inAirRef.current) {
                    if(tempTimingKeys.length > 0) {
                        setCrashed('CRASH message: Tried to manual to early.');
                        tempTimingKeys.length = 0;
                    }
                    else setCrashed('CRASH message: Didnt land after 1second');
                }

            }, 1000)



        }
    }, [theSkater.isInAir])

    //prob want to store most recent key and its time in a storage somewhere
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        }
    })


    //prob want to store most recent key and its time in a storage somewhere
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    })



    const handleMouseClick = () => {
        setTheSkater((currSkater) => {
            const newSkater = { ...currSkater };
            newSkater.isSkatingNormally = false;
            newSkater.inManual = false;
            newSkater.inNoseManual = false;
            newSkater.isTrickReady = false;
            newSkater.isCrashed = false;
            newSkater.isStationary = true;
            newSkater.isInAir = false;
            newSkater.isLeftWheelDown = false;
            newSkater.isRightWheelDown = false;
            newSkater.mostRecentManual = 'none';
            return newSkater;

        })
    }
    //cheeky reset
    useEffect(() => {
        window.addEventListener('mousedown', handleMouseClick);

        return () => {
            window.removeEventListener('mousedown', handleMouseClick);
        }
    })

    useEffect(() => {
        if (theSkater.isLeftWheelDown && theSkater.isRightWheelDown) {
            setTheSkater((currSkater) => {
                const newSkater = { ...currSkater };
                newSkater.isSkatingNormally = true;
                newSkater.isStationary = false;
                newSkater.isCrashed = false;
                newSkater.inManual = false;
                newSkater.inNoseManual = false;
                newSkater.isTrickReady = false;
                newSkater.isInAir = false;

                return newSkater;
            })
        }

    }, [theSkater.isLeftWheelDown, theSkater.isRightWheelDown, setTheSkater])




    //need some logic to determine which was the more recent manual state and apply the final style accordingly    
    let movementStyle = theSkater.inManual ?
        'do-manual' : theSkater.inNoseManual ?
            'do-nose-manual' : theSkater.isInAir ?
                'do-ollie' : theSkater.isCrashed ?
                    'do-crashed' : theSkater.mostRecentManual === 'manual' ?
                        'manual-transform-origin' : 'nose-manual-transform-origin';
    const containerClasses = `${styles['stickman-container']} ${styles[movementStyle]}`

    let leftWheelAnimation = !theSkater.isCrashed && !theSkater.isStationary ? 'skateboard-wheels--animation' : '';
    let rightWheelAnimation = !theSkater.isCrashed && !theSkater.isStationary ? 'skateboard-wheels--animation' : '';
    const leftWheelClass = `${styles['skateboard-wheels-left']} ${styles[leftWheelAnimation]}`
    const rightWheelClass = `${styles['skateboard-wheels-right']} ${styles[rightWheelAnimation]}`

    return (
        <div>
            <div className={containerClasses}>
                <div className={styles['stickman__head']}></div>
                <div className={styles['stickman__body']}></div>
                <div className={styles['stickman__left-thigh']}></div>
                <div className={styles['stickman__right-thigh']}></div>
                <div className={styles['stickman__left-calf']}></div>
                <div className={styles['stickman__right-calf']}></div>
                <div className={styles['skateboard-body']}></div>
                <div className={leftWheelClass}>X</div>
                <div className={rightWheelClass}>X</div>
            </div>
        </div>
    )
}
