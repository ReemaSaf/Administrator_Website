import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/main.css';
import '../../css/util.css';
import logoSvg from '../../images/logo.svg';
import useAuth from '../hooks/useAuth';
import { getFirestore, doc, getDocs, collection, updateDoc } from '@firebase/firestore'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../Firebase/firebase.config';
import { ThreeDotLoader } from '../ThreeDotLoader/ThreeDotLoader';
// import 'react-toastify/dist/ReactToastify.css';
import '../../spinner.css';
export const Delay = () => {
    const navigate = useNavigate();              //the main source of the code was W3Shoole website and stackOoerflow.
    const { logOut } = useAuth();                //for reading and writing from DB we use firebase website.
                                                 //Also we use react which is JavaScript library for building user interfaces.
    const [stationList, setStationList] = React.useState([]);
    const [station, setStation] = React.useState('Bus_1');
    const [timeSchedule, setTimeSchedule] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [initialLoading, setInitialLoading] = React.useState(true);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    React.useEffect(() => {

        getDocsData();

        // eslint-disable-next-line
    }, [station]);

    const getDocsData = async () => {
        const colRef = collection(db, "Bus_Station");
        const docsSnap = await getDocs(colRef);
        const dockData = docsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInitialLoading(false);
        setStationList(dockData);
    }

    const updateFireStoreData = async (e) => {
        e.preventDefault()
        setLoading(true);
        const docRef = doc(db, "Bus_Station", station);
        await updateDoc(docRef, {
            OnTime: timeSchedule === 'true' ? true : false
        }).then(() => {
            setLoading(false);
            // toast.success('Updated successfully.', {
            //     position: toast.POSITION.BOTTOM_LEFT,
            // });
            alert('Updated successfully.');
            setTimeSchedule(false);
            setStation('');
        })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }
    let content = null;
    if (initialLoading) content = <div className="loading">Loading&#8230;</div>
    else if (stationList.length > 0) {
        return content = (
            <div>
                <section className="header_req">`
                    <nav>
                        <Link to="/"><img id="logo" src={logoSvg} alt="" /></Link>
                        <div className="nav-links" id="logout_div">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li>{
                                    // eslint-disable-next-line
                                    <a href="#" onClick={() => logOut(navigate)}>Log Out</a>}</li>
                            </ul>
                        </div>
                    </nav>
                </section>
                <main>
                                    
                    <div className="Add_form">
                        <h1>Announce Delay</h1>
                        <form onSubmit={  //code for updating the database after submision
                            updateFireStoreData}>
                            <div className="section"><span className="num">1</span>
                                List Of Bus Stations
                            </div>
                            <div className="inner-wrap">
                                <select name="" id="" required onClick={({ target }) => setStation(target.value)//read stations from DB
                                } >
                                    <option value="" disabled selected>Select your option</option>
                                    {
                                        stationList.map((station, index) => (<option key={index} value={station.id} >
                                            {station.Name} {station.Number}</option>))
                                    }
                                </select>
                            </div>

                            <div className="section"><span className="num">2</span>Status</div>

                            <div className="inner-wrap">
                                <select
                                    defaultValue={stationList?.find(s => s.id === station)?.OnTime ? 'true' : 'false'}
                                    name="services" id="services" required onChange={({ target }) => setTimeSchedule(target.value) 
                                    //Read the states of the chosen station and print here
                                    } >
                                    <option value=""  selected disabled> </option>
                                    <option value="true"
                                        selected={
                                            stationList?.find(s => s.id === station)?.OnTime ? true : false
                                        }
                                    >On time</option>
                                    <option value="false"
                                        selected={
                                            stationList?.find(s => s.id === station)?.OnTime ? false : true
                                            //from line 105 till end for changing the states and reflict on DB
                                        }
                                    >Delayed</option> 
                                </select>
                            </div>

                            <div className="button-section" style={{
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}>
                                <br />
                                {
                                    loading ? <ThreeDotLoader /> : <input type="submit" value="Announce" />
                                    //Styling the button
                                }

                                <br />
                            </div>
                        </form>
                    </div>
                    <br /> <br /> <br /><br /><br />


                </main>
            </div>
        )
    }
    return (
        <>
            {content}
        </>
    )
}
