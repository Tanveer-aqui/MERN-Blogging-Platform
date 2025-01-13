import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Show from './pages/Show'
import Edit from './pages/Edit'
import Create from './pages/Create'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar'
import NotFound from './components/404/NotFound'
import Footer from './components/Footer/Footer'
import TagPosts from './pages/TagPosts'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Contact from './pages/Contact'
import TermsOfUse from './pages/TermsOfUse'
import Bookmark from './pages/Bookmark'
import HelpCenter from './pages/HelpCenter'
import PopularTags from './pages/PopularTags'
import Profile from './pages/Profile'
import Signup from './components/User/Signup'
import Login from './components/User/Login'
import Search from './pages/Search'


function App() {
  const location = useLocation();

  const hideNavAndFooter = ['/signup', '/login'];
  const shouldHideNavAndFooter = hideNavAndFooter.includes(location.pathname);

  return (
      <div className="flex flex-col min-h-screen">
        <ToastContainer />
      
        <Navbar visibility={!shouldHideNavAndFooter}/>

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Home />} />
            <Route path="/blogs/create" element={<Create />}/>
            <Route path="/blogs/:id" element={<Show />} />
            <Route path="/blogs/edit/:id" element={<Edit />}/>

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/blogs/search" element={<Search />} />
            <Route path="/blogs/tag/:tagName" element={<TagPosts/>}/>

            <Route path="/profile" element={<Profile />}/>
            <Route path="/bookmarks" element={<Bookmark />}/>

            <Route path="/tags" element={<PopularTags/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/terms" element={<TermsOfUse/>}/>
            <Route path="/help" element={<HelpCenter />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      
        <Footer visibility={!shouldHideNavAndFooter}/>
    </div>
  )
}

export default App