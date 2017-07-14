import React from "react"
import ContentLoader, { Rect } from 'react-content-loader'

export default ()=> {
    return(
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-10 col-sm-8 col-sm-6">
                <div style={{
                    height: "auto",
                    background: "rgba(255, 255, 255, 0.75)",
                    textAlign: "center",
                    marginTop: "5%",
                    padding: "15px 0",
                }}>
                    <ContentLoader height={100} speed={1} primaryColor={'#F3F1F3'} secondaryColor={'#999'}>
                        <Rect x={50} y={10} height={20} radius={2} width={300} />
                        <Rect x={50} y={50} height={10} radius={2} width={300} />
                        <Rect x={50} y={70} height={10} radius={2} width={300} />
                        <Rect x={75} y={90} height={10} radius={2} width={250} />
                    </ContentLoader>
                </div>
            </div>
        </div>
    </div>
    )
}