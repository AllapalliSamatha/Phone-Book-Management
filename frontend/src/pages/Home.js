// // // src/pages/Home.js
// // import React from 'react';
// // import Navbar from '../components/Navbar';
// // import Contact from '../components/Contact';
// // import AddContact from '../components/AddContact';
// // import { Routes, Route } from 'react-router-dom'; // Only import Routes and Route

// // function Home() {
// //     return (
// //         <div>
// //             <Navbar />
// //             <div className="home">
// //                 <Routes>
// //                     <Route path="/" element={<Contact />} />
// //                     <Route path="/add" element={<AddContact />} />
// //                 </Routes>
// //             </div>
// //             {/* Add more content for the home page here if needed */}
// //         </div>
// //     );
// // }

// // export default Home;

// // src/pages/Home.js
// // import React from 'react';
// // import Navbar from '../components/Navbar';
// // import Contact from '../components/Contact';
// // import AddContact from '../components/AddContact';
// // import { Routes, Route } from 'react-router-dom';

// // function Home() {
// //     return (
// //         <div>
// //             <Navbar />
// //             <div className="home">
// //                 <Routes>
// //                     <Route path="/" element={<Contact />} />
// //                     <Route path="/add" element={<AddContact />} />
// //                 </Routes>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Home;


// // src/pages/Home.js
// // src/pages/Home.js
// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Contact from '../components/Contact';
// import AddContact from '../components/AddContact';
// import UpdateContact from '../components/UpdateContact';

// function Home() {
//     return (
//         <div>
//             <Navbar />
//             <div className="home">
//                 <Routes>
//                     <Route path="/" element={<Contact />} />
//                     <Route path="/add" element={<AddContact />} />
//                     <Route path="/update/:id" element={<UpdateContact/>}/>
//                 </Routes>
//             </div>
//         </div>
//     );
// }

// export default Home;




// src/pages/Home.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import AddContact from '../components/AddContact';
import UpdateContact from '../components/UpdateContact';
import Weather from '../components/Weather'; // Correct path for Weather component
// import './Home.css'; // Uncomment if you have styling for Home

function Home() {
    return (
        <div>
            <Navbar />
            <Weather /> {/* Add the Weather component here */}
            <div className="home">
                <Routes>
                    <Route path="/" element={<Contact />} />
                    <Route path="/add" element={<AddContact />} />
                    <Route path="/update/:id" element={<UpdateContact />} />
                </Routes>
            </div>
        </div>
    );
}

export default Home;
