import React from 'react'
import LuxList from '../TestComp/luxList/LuxList'

function RelativeProduct({subChildCat,productId,childCat,parentCat}) {
  return (
    <div className='my-3'>
         {/* <LuxList productId={productId} title={'Most Relative Product'} subChildCat={subChildCat}  /> */}
         <LuxList productId={productId} title={'Relavent Product'} childCat={childCat}  />
          <LuxList productId={productId} title={'Luxury Items'}   />
    
         {/* <LuxList productId={productId} title={'Categorized Product'} parentCat={parentCat}  /> */}  
    </div>
  )
}

export default RelativeProduct