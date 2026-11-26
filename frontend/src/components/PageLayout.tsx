import React from 'react'
import { useDarkMode } from '../context/DarkModeProvider'

type PageLayoutProps = {
    children: React.ReactNode
    darkMode?: boolean
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    const { darkMode } = useDarkMode()
    React.useEffect(() => {
        document.documentElement.classList.toggle('dark-mode', darkMode)
    }, [darkMode])
    
    return (
        <>
            {children}
        </>
    )
}

// const PageLayout: React.FC<PageLayoutProps> = ({children, darkMode}) => {
//     return (
//         <html className={`h-full ${darkMode ?  "light-mode" : "dark-mode" }`}>
//             <body className="h-full"> {children} </body>
//         </html>
//     )
// }

export default PageLayout


