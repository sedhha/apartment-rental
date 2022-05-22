import React, { useEffect } from 'react'
import Header from './Header'
import { useRouter } from 'next/router'
import { useAppSelector } from '@redux-imports/tools/hooks'
import { NAVIGATION_ROUTES } from 'constants/routes'
import ViewPost from './ViewPost'
import AddPost from './AddPost'
import MyPosts from './MyPosts'

export default function Profile() {
  const router = useRouter()
  const postOpType = router.query.postOpType
  const { isLoggedIn } = useAppSelector((state) => state.user)
  useEffect(() => {
    if (!isLoggedIn) router.push(NAVIGATION_ROUTES.LOGIN)
  }, [isLoggedIn])

  let RenderComponent = <div>Unknown Route</div>
  switch (postOpType) {
    case 'view-post': {
      RenderComponent = <ViewPost />
      break
    }
    case 'add-post': {
      RenderComponent = <AddPost />
      break
    }
    case 'my-posts': {
      RenderComponent = <MyPosts />
      break
    }
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
