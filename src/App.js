// import logo from './logo.svg';
// import React, {Component} from "react";
import  { useState,useCallback } from "react";

import Particles from "react-tsparticles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

// import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';




import './App.css';

import Navigation from './components/Navigation/Navigation'

import Logo from './components/Logo/logo';
import ImageLinkForm from './components/imageformlink/ImageLinkForm';

import FaceRecognition from './components/faceRecog/faceRecognition';
import Rank from './components/Rank/Rank';

// import Login from "./login";
import Login from "./components/signin and login/login";
import Register from "./components/signin and login/register";



// function App() {

// const App = () => {

// class App extends Component{



const App = () => {
    // constructor(){
    //     super();
    //     this.state = {
    //         input: '',
    //         imageUrl: ''
    //          box: {} or []
    //          route: 'login'
    //     }
    // } using class base

    const [input,setInput] = useState('');

    const [imageUrl, setImageUrl] = useState('');
    // const [imageUrl, setImageUrl] = useState(input);

    const [faceBox, setFaceBox] = useState([]);
    // const [faceBox, setFaceBox] = useState({});

    const [route,setRoute] = useState('login');
    const [isLogin, setLogin] = useState(false)



    const onInputChange = (event) => {
        // console.log(event.target.value);
        setInput(event.target.value);
    };


    
    // const PAT = '088c6374147e4d0f824f0e87f67211c0';
    // const MODEL_ID = 'color-recognition';
    // const MODEL_VERSION_ID = 'dd9458324b4b45c2be1a7ba84d27cd04';

    const PAT = '088c6374147e4d0f824f0e87f67211c0';  
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    // const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    
    
    // Using Node.js
    // const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc")
    // const stub = ClarifaiStub.grpc();   
    // const metadata = new grpc.Metadata();
    // metadata.set("authorization", "Key " + PAT);

    //Using JavaScript

    
    

    // https://www.snexplores.org/wp-content/uploads/2019/11/860_main_beauty.png
    const onButtonSubmit = () =>{
        // console.log('click: ',input)
        // Update imageUrl using the callback function
        setImageUrl(input)


        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            // "url": IMAGE_URL
                            "url": input
                            // "base64": IMAGE_BYTES_STRING
                        }
                    }
                }
            ]
        });
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };

        function calculateFaceLocation(data) {
            // console.log(data)
            // const regions = data.outputs[0].data.regions[0].region_info.bounding_box;
            // const image = document.getElementById('InputImage');
            // const width = Number(image.width);
            // const height = Number(image.height);
            // console.log(regions.left_col * width);
            // return{
            //      left_column: regions.left_col * width,
            //      topRow: regions.top_row * height,
            //      right_column: width - (regions.right_col * width),
            //      bottomRow: height - (regions.bottom_row * height)

            // }
            console.log(data)
            const regions = data.outputs[0].data.regions;
            // console.log(regions)
            const faceBoxes = []  ;
            const image = document.getElementById('InputImage');
            const width = Number(image.width);
            const height = Number(image.height);
            // console.log(height, width);
            

            regions.forEach(region => {
                // Accessing and rounding the bounding box values
                const boundingBox = region.region_info.bounding_box;

                // console.log(boundingBox.top_row, boundingBox.bottom_row);
                // console.log(boundingBox.left_col, boundingBox.right_col);


                const topRow = boundingBox.top_row.toFixed(3) * height;
                const leftCol = boundingBox.left_col.toFixed(3) * width;
                const bottomRow =height - (boundingBox.bottom_row.toFixed(3) * height);
                const rightCol = width- (boundingBox.right_col.toFixed(3) * width);
                region.data.concepts.forEach(concept => {
                    // Accessing and rounding the concept value
                    const name = concept.name;
                    const value = concept.value.toFixed(4);
    
                    // console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                    
                    const faceBox = {
                        left_column: leftCol,
                        topRow: topRow,
                        right_column: rightCol,
                        bottomRow: bottomRow
                    };
                 
                    faceBoxes.push(faceBox)
                    // return faceBox
                });        
            });
            // console.log(faceBox)
            // console.log(faceBoxes)
            return faceBoxes

        }
        function displayFaceBox(box){
            // console.log('check 1', box)
            // console.log('box 1',box[0].left_column)
            setFaceBox(box)
            // console.log('check 2',box)
            // console.log('bypasse', faceBox)

        }
    
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
            .then(response => response.json())
            .then(data =>displayFaceBox(calculateFaceLocation(data)))
            .catch(err => console.log(err));
        
    }
    // render() {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    const onRouteChange = (link_address) => {
        setRoute(link_address);
        if (link_address === 'signout'){
            setLogin(false)
        }else if (link_address === 'home'){
            setLogin(true)
        }   
    }
    

    return (
        <div className="App">
            <Particles className="particles"
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                // params={particlesOptions}
                options={{
                    // background: {
                    //     color: {
                    //         value: "#0d47a1",
                    //     },
                    // },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />            
            <Navigation onRouteChange= {onRouteChange} isLogin = {isLogin} /> 
            {route === 'home' ? 
                <div>
                    <Logo />
                    <Rank />
                    <ImageLinkForm
                        onInputChange={onInputChange}
                        onButtonSubmit={onButtonSubmit}
                    />
                    <FaceRecognition imageUrl={imageUrl} faceBox={faceBox} />
                </div>
            :(route === 'login' 
                ? <Login onRouteChange= {onRouteChange} />
                : <Register onRouteChange={onRouteChange} />
            )}
            {/* <Logo />
            <Rank />
            <ImageLinkForm 
                onInputChange={onInputChange} 
                onButtonSubmit ={onButtonSubmit}                    
            /> 
            <FaceRecognition imageUrl={imageUrl} faceBox={faceBox}/> */}
            


            
            {/* <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                        <>
                            <Navigation />
                            <Logo />
                            <Rank />
                            <ImageLinkForm />
                        </>
                        }
                    />
                </Routes>
            </Router> */}
            



            {/* <header className="App-header"> */}
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                {/* <p>
                Edit <code>src/App.js</code> and save to reload.
                </p> */}
                {/* <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a> */}
            {/* </header> */}
        </div>
    );
    // }
}

export default App;
