import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineGoogle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { authcontext } from '../../Authprovider/Authprovider';
import UseToken from '../../Hook/useToken';

const Regester = () => {


  const {user, registerUser, googleUser, userUpdet} = useContext(authcontext)
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [currentUser, setCurrentUser] = useState('')
  const [token] = UseToken(currentUser)
  const navigate = useNavigate()

  const handleForm = (data) =>{
         registerUser(data.email, data.password)
         .then(result =>{
          const user = result.user
          console.log(user);
          
          const userInfo = {
            displayName: data.name
          }
          userUpdet(userInfo)
          .then(() =>{
            saveUser(data.name, data.email, data.role)
           })
          .catch(() =>{})


          })
          .catch(err =>{
            console.log(err);
            toast.error(`already you use this email ${user.email}`)
         })
}
 


      // ==for google signin
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
                setCurrentUser(email)
              }
            })
      }


   

  if(token){
    navigate('/')
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
    >Create Your Account
    </p>
    <p className="text-sm mt-4 font-medium leading-none text-gray-500">
      Do you have already account
      <span
        tabIndex={0}
        role="link"
        aria-label="Sign up here"
        className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
      >
        {" "}
        <Link to="/login" className="text-cyan-500">
          Please sign in here
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

    <form onSubmit={handleSubmit(handleForm)}>

    <div>
        <lable className="text-sm font-medium leading-none text-gray-800">
          Name
        </lable>
        <input
          aria-label="enter email adress"
          type="text"
          className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
          {...register("name",{
            required: true
          })}
        />
      </div>

      <div className='mt-6 w-full'>
        <lable className="text-sm font-medium leading-none text-gray-800">
          Email
        </lable>
        <input
          aria-label="enter email adress"
          type="email" 
          className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
          {...register("email",{
            required: true
          })}
        />
        {errors.email && <p className='text-red-600'>Email is required</p>}
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
            required: true,
            minLength:{value:6 , message: "Password must be 6 Charaters or longer"}
          })}
        />
        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
      </div>

      <div className='mt-6 w-full'>
      <lable className="text-sm font-medium leading-none text-gray-800 ">
          Select Your Identity
        </lable><br></br>
        <select {...register('role')}  className="select select-bordered w-full max-w-xs mt-3">
        <option>User</option>
        <option>Seller</option>
        </select>
            </div>
      <div className="mt-8">
        <button
          type="submit"
          aria-label="create my account"
          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
        >
          Create an account
        </button>
      </div>
    </form>
  </div>
</div>
</div>
        </div>
    );
};

export default Regester;