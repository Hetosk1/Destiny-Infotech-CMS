import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import Swal from "sweetalert2";
import './index.css';

import { useFormik } from "formik";
import axios from "axios";
import { ip } from "vars";
// import { useTransform } from "framer-motion/dist/cjs";

export default function Admin(props) {
  const [tokenWeb, setTokenWeb] = useState('');
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  const token = localStorage.getItem('token');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      console.log(formik.values);
      const {email, password} = formik.values;

      fetch(`http://${ip}:5000/misc/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formik.values) 
      })
      .then(response => {
        return response.json();
      })
      .then( data => {
        console.log('aasdfs')
        console.log(data);

        if (data.message === 'Invalid credentials'){
          Swal.fire({
              title: 'Login failed!',
              icon: 'error',
              timer: 2000, // The alert will automatically close after 2 seconds
              showConfirmButton: false,
          })
        } else {
          Swal.fire({
              title: 'Login successfull!',
              icon: 'success',
              timer: 2000, // The alert will automatically close after 2 seconds
              showConfirmButton: false,
          })
          localStorage.setItem('token', data.token)
          setTokenWeb(data.token);
        }
      })
      .catch(err => {
        console.log('eheheheh');
      });

    }
  });

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };


  const name = 'het'
  document.documentElement.dir = "ltr";

  return (
    <div>
      {localStorage.getItem('token')
       ? <div className="flex h-full w-full">
          <Sidebar open={open} onClose={() => setOpen(false)} />
          {/* Navbar & Main Content */}
          <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
            {/* Main Content */}
            <main
              className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
            >
              {/* Routes */}
              <div className="h-full">
                <Navbar
                  onOpenSidenav={() => setOpen(true)}
                  logoText={"Horizon UI Tailwind React"}
                  brandText={currentRoute}
                  secondary={getActiveNavbar(routes)}
                  {...rest}
                />
                <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                  <Routes>
                    {getRoutes(routes)}

                    <Route
                      path="/"
                      element={<Navigate to="/admin/default" replace />}
                    />
                  </Routes>
                </div>
                <div className="p-3">
                  <Footer />
                </div>
              </div>
            </main>
          </div>
           </div>
       :  
            <div className="container">
              <div>
              
              <div className="login">Log in</div>
              <form className="form" onSubmit={formik.handleSubmit}>
                <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  />
                </div>

                <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                </div>
          
                <button className="login-button" type="submit">Log in</button>
              </form>
              </div>
            </div>
      }
    
    </div>
  );
}
