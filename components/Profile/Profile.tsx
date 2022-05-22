import React from 'react'
import Header from './Header'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const ViewComponent = dynamic(() => import('./ViewPost'))
const AddComponent = dynamic(() => import('./AddPost'))
type Props = {}

export default function AddPost({}: Props) {
  const router = useRouter()
  const postOpType = router.query.postOpType

  let RenderComponent = <div>Unknown Route</div>
  switch (postOpType) {
    case 'view-post':
      RenderComponent = <ViewComponent />
      break
    case 'add-post':
      RenderComponent = <AddComponent />
      break
    default:
      break
  }
  return (
    <React.Fragment>
      <Header postOpType={(postOpType as string) ?? 'view-post'} />
      {RenderComponent}
    </React.Fragment>
  )
}
