import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineGoogle } from "react-icons/ai";
import { authcontext } from '../../Authprovider/Authprovider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import UseToken from '../../Hook/useToken';


const Login = () => {


  const {loginUser, googleUser} = useContext(authcontext)
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [loginUserEmail, setLoginUserEmail] = useState('')
  const [token] = UseToken(loginUserEmail)
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  if(token){
    navigate(from, { replace: true });

  }



  const handleLogin = (data) =>{
    console.log(data.email, data.password);
    loginUser(data.email, data.password)
    .then(result =>{
      const user = result.user
      setLoginUserEmail(user?.email)
      toast.success("Successfully Login")
    })
    .catch(err=>{
      console.log(err);
      toast.error("Your are not a valid user")
    })
    
  }


  const handleGoogle=()=>{
    googleUser()
    .then((result)=>{
       const user = result.user

           const name = user.displayName;
           const email = user.email;
           const role = "User"
       
       saveUser(name, email, role)
    })
    .catch(()=>{})
  }


  const saveUser =(name, email, role)=>{
        const userInfo={
          name,
          email,
          role
        }
        fetch('http://localhost:5000/alluser',{
          method:'POST',
          headers:{
            'content-type' : 'application/json'
          },
          body:JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(data => {
          if(data.acknowledged){
            toast.success("Successfully Created your account")
            navigate('/')
          }
        })
  }




    return (
        <div>
             <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">

<div className="flex flex-col items-center justify-center">
  <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
    <p
      tabIndex={0}
      aria-label="Login to your account"
      className="text-2xl font-extrabold leading-6 text-gray-800"
    >
      Login to your account
    </p>
    <p className="text-sm mt-4 font-medium leading-none text-gray-500">
      Do not have account
      <span
        tabIndex={0}
        role="link"
        aria-label="Sign up here"
        className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
      >
        {" "}
        <Link to="/regester" className="text-cyan-500">
          Please sign Up here
        </Link>
      </span>
    </p>


    <div className='text-center mt-12 mb-2'>

<button onClick={handleGoogle} className='btn btn-outline w-full' > <span className='pr-2 font-2xl'><AiOutlineGoogle/></span> Google</button>
</div>


    <div className="w-full flex items-center justify-between py-5">
      <hr className="w-full bg-gray-400" />
      <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
        OR
      </p>
      <hr className="w-full bg-gray-400  " />
    </div>

    <form onSubmit={handleSubmit(handleLogin)}>
      <div>
        <lable className="text-sm font-medium leading-none text-gray-800">
          Email
        </lable>
        <input
          aria-label="enter email adress"
          type="email"
          name="email"
          className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
          {...register("email",{
            required:true
          })}
        />
     {errors.email && <p className='text-red-600'>Please Provide your valid email</p>}
      </div>
      <div className="mt-6 w-full">
        <lable className="text-sm font-medium leading-none text-gray-800">
          Password
        </lable>
        <input
          aria-label="enter Password"
          type="password"
          name="password"
          className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
          {...register("password",{
            required:true
          })}
        />
        {errors.password && <p className='text-red-600'>Please Provide your valid password</p>}
      </div>
      <div className="mt-8">
        <button
          type="submit"
          aria-label="create my account"
          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
        >
          Login my account
        </button>
      </div>
    </form>
  </div>
</div>
</div>
        </div>
    );
};

export default Login;
