import React from 'react';
import '../../css/main.css';
import '../../css/util.css';
import { Link, useNavigate } from 'react-router-dom';
import logoSvg from '../../images/logo.svg';
import useAuth from '../hooks/useAuth';
import { getFirestore, doc, getDocs, collection, updateDoc } from '@firebase/firestore'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../Firebase/firebase.config';
import { ThreeDotLoader } from '../ThreeDotLoader/ThreeDotLoader';
import '../../spinner.css';

export const Availability = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth()
    const [typeOfStation, setTypeOfStation] = React.useState('Bus_Station');
    const [stationList, setStationList] = React.useState([]);
    const [station, setStation] = React.useState('Bus_1');
    const [availavility, setAvailavility] = React.useState(false);
    const [initialLoading, setInitialLoading] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    React.useEffect(() => {
        getDocsData();
        // eslint-disable-next-line
    }, [typeOfStation]);

    console.log(stationList);
    console.log(station)
    const getDocsData = async () => {
        const colRef = collection(db, typeOfStation);
        const docsSnap = await getDocs(colRef);
        const dockData = docsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInitialLoading(false);
        setStationList(dockData);
    }

    const updateFireStoreData = async (e) => {
        e.preventDefault()
        setLoading(true);
        const docRef = doc(db, typeOfStation, station);
        await updateDoc(docRef, {
            Available: availavility === 'true' ? true : false
        }).then(() => {
            alert('Updated successfully.');
            setAvailavility(false);
            setLoading(false);
        })
    }

    let content = null;
    if (initialLoading) content = <div className="loading">Loading&#8230;</div>
    else if (stationList.length === 0) content = <div className="loading">No Data Found</div>
    else if (stationList.length > 0) content = (<div>

        <section className="header_req">`
            <nav>
                {
                    // eslint-disable-next-line
                    <a href="HomePage.php"><img id="logo" src={logoSvg} alt="" /></a>}
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

            <div className="Add_form2">
                <h1>Update Stations Availability</h1>
                <form onSubmit={updateFireStoreData} >


                    <div className="section"><span className="num">1</span>Type Of Station</div>
                    <div className="inner-wrap">
                        <select name="services" id="services" required onChange={({ target }) => setTypeOfStation(target.value)}>
                            <option selected value="" disabled >Select your option</option>
                            <option value="Bus_Station">Bus Station</option>
                            <option value="Metro_Station">Metro Station</option>
                        </select>
                    </div>

                    <div className="section"><span className="num">2</span>Stations List</div>

                    <div className="inner-wrap">
                        <select name="services" id="stationList" required onClick={({ target }) => setStation(target.value)}>
                            <option value="" disabled selected>Select your option</option>
                            {
                                stationList.map((station, index) => (<option key={index} value={station.id} >{station.Name} {station.Number}</option>))
                            }
                        </select>
                    </div>

                    <div className="section"><span className="num">3</span>Status</div>

                    <div className="inner-wrap">
                        <select
                            defaultValue={stationList?.find(s => s.id === station)?.OnTime ? 'true' : 'false'}
                            name="availability" id="availability" required onClick={({ target }) => setAvailavility(target.value)}>
                            <option value="" disabled selected> </option>
                            <option value={true}
                                selected={
                                    stationList?.find(s => s.id === station)?.Available ? true : false
                                }
                            >Availabile</option>
                            <option value={false}
                                selected={
                                    stationList?.find(s => s.id === station)?.Available ? false : true
                                }
                            >Not Availabile</option>
                        </select>
                    </div>



                    <div className="button-section" style={{
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }} >
                        <br />
                        {
                            loading ? <ThreeDotLoader /> : <input type="submit" value="Update" />
                        }
                        <br />
                    </div>
                </form>
                <br /> <br /> <br /><br /><br />
            </div>

        </main>
    </div>)
    return (content)
}
