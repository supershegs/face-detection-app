import './faceRecognition.css'

const FaceRecognition = ({imageUrl, faceBox}) => {
    // console.log('fisrt data', faceBox)
    if (!faceBox || !Array.isArray(faceBox)) {
        // <img id="InputImage" src={imageUrl} alt="AIimage" width="500px" height="Auto" />
        // console.log('facebox is not an array')
        // return null; // or render a default state if faceBox is not valid
        
      }
    
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="InputImage" src={imageUrl} alt="AIimage" width="500px" height="Auto" />
                {/* {console.log('output data', faceBox)} */}
                {/* <div className="bounding-box" style = {{
                        // top: faceBox.left_column,
                        // right: faceBox.topRow,
                        // bottom: faceBox.right_column,
                        // left: faceBox.bottomRow
                        // top: `${faceBox.left_column}px`,
                        // right: `${faceBox.topRow}px`,
                        // bottom: `${faceBox.right_column}px`,
                        // left: `${faceBox.bottomRow}px`,        
                    }}>
                </div>*/}
                <div className="face-box">
                    {faceBox.map((box, index) => (
                        <div
                            className="bounding-box" // Use the same class for each face box
                            key={index}
                            style={{
                                    top: `${box.topRow}px`,
                                    right: `${box.right_column}px`,
                                    bottom: `${box.bottomRow}px`,
                                    left: `${box.left_column}px`,
                                }}
                        ></div>
                        //, console.log({
                        //     top: `${box.topRow}px`,
                        //     right: `${box.right_column}px`,
                        //     bottom: `${box.bottomRow}px`,
                        //     left: `${box.left_column}px`,
                        // })
                    ))}
                </div>

            </div>    
        </div>
    )
}

export default FaceRecognition;