import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const GetStarted = lazy(() => import('../pages/get-started'))
const Onboarding = lazy(() => import('../pages/onboarding'))
const Home = lazy(() => import('../pages/home'))

const MainRoute = () => {
    const router = createBrowserRouter([
        {
            index: true,
            path: '/',
            element: <GetStarted />
        },
        {
            path: '/onboarding',
            element: <Onboarding />
        },
        {
            path: '/home',
            element: <Home />
        }
    ])
    return (
        <Suspense fallback={<div>Loading....</div>}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default MainRoute
