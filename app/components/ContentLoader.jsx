import React from "react"
import ContentLoader, { Rect } from 'react-content-loader'

export default ()=> {
    return(
        <ContentLoader height={100} speed={1} primaryColor={'#333'} secondaryColor={'#999'}>
            <Rect x={50} y={10} height={10} radius={2} width={300} />
            <Rect x={75} y={30} height={10} radius={2} width={250} />
        </ContentLoader>
    )
}