import React from 'react'
import LuxList from '../TestComp/luxList/LuxList'

function RelativeProduct({subChildCat,childCat,parentCat}) {
  return (
    <div className='my-3'>
         <LuxList title={'Most Relative Product'} subChildCat={subChildCat}  />
          <LuxList title={'Luxury Items'}   />
         <LuxList title={'Extra Relavent Product'} childCat={childCat}  />
         <LuxList title={'Categorized Product'} parentCat={parentCat}  />
    </div>
  )
}

export default RelativeProduct